/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import '../core/MapExtend';
import {
    Util
} from '../core/Util';
import {
    HitCloverShape
} from './graphic/HitCloverShape';
import {
    CloverShape
} from './graphic/CloverShape';
import {
    CommonUtil
} from '@supermap/iclient-common';
import {
    GraphicWebGLRenderer
} from './graphic/WebGLRenderer';
import {
    GraphicCanvasRenderer
} from './graphic/CanvasRenderer';

const defaultProps = {
    color: [0, 0, 0, 255],
    opacity: 0.8,
    radius: 10,
    radiusScale: 1,
    radiusMinPixels: 0,
    radiusMaxPixels: Number.MAX_SAFE_INTEGER,
    strokeWidth: 1,
    outline: false
};

const Renderer = ["canvas", "webgl"];

/**
 * @class ol.source.Graphic
 * @category  Visualization Graphic
 * @classdesc 高效率点图层源。
 * @param {Object} options - 图形参数。
 * @param {ol.map} options.map - openlayers 地图对象。
 * @param {ol.Graphic} options.graphics - 高效率点图层点要素。
 * @param {string} [options.render ='canvas']  -  指定使用的渲染器。可选值："webgl"，"canvas"（webgl 渲染目前只支持散点）。
 * @param {boolean} [options.isHighLight=true] - 事件响应是否支持要素高亮。
 * @param {ol.style} [options.highLightStyle=defaultHighLightStyle] - 高亮风格。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 要素颜色。
 * @param {Array.<number>} [options.highlightColor] - webgl 渲染时要素高亮颜色。
 * @param {number} [options.opacity=0.8] - 要素透明度。
 * @param {number} [options.radius=10] - 要素半径，单位像素。
 * @param {number} [options.radiusScale=1] - webgl 渲染时的要素放大倍数。
 * @param {number} [options.radiusMinPixels=0] - webgl 渲染时的要素半径最小值（像素）。
 * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - webgl 渲染时的要素半径最大值（像素）。
 * @param {number} [options.strokeWidth=1] - 边框大小。
 * @param {boolean} [options.outline=false] - 是否显示边框。
 * @param {function} [options.onHover] -  图层鼠标悬停响应事件（只有 webgl 渲染时有用）。
 * @param {function} [options.onClick] -  图层鼠标点击响应事件（webgl、canvas 渲染时都有用）。
 * @extends {ol.source.ImageCanvas}
 */
export class Graphic extends ol.source.ImageCanvas {

    constructor(options) {
        super({
            attributions: options.attributions,
            canvasFunction: canvasFunctionInternal_,
            logo: options.logo,
            projection: options.projection,
            ratio: options.ratio,
            resolutions: options.resolutions,
            state: options.state
        });
        this.graphics = [].concat(options.graphics);
        this.map = options.map;
        CommonUtil.extend(this, options);
        this.render = options.render || Renderer[0];
        if (!Util.supportWebGL2()) {
            this.render = Renderer[0];
        }
        this.highLightStyle = options.highLightStyle;
        //是否支持高亮，默认支持
        this.isHighLight = typeof options.isHighLight === "undefined" ? true : options.isHighLight;
        this.hitGraphicLayer = null;
        this._forEachFeatureAtCoordinate = _forEachFeatureAtCoordinate;

        const me = this;

        if (options.onClick) {
            me.map.on('click', function (e) {
                me.map.forEachFeatureAtPixel(e.pixel, options.onClick, {}, e);
            });
        }


        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) { // eslint-disable-line no-unused-vars
            if (!me.renderer) {
                me.renderer = createRenderer(size, pixelRatio);
            }
            let graphics = this.getGraphicsInExtent(extent);
            me.renderer._clearBuffer();
            me.renderer.selected = this.selected;
            me.renderer.drawGraphics(graphics);
            return me.renderer.getCanvas();
        }


        function createRenderer(size, pixelRatio) {
            let renderer;
            if (me.render === Renderer[0]) {
                renderer = new GraphicCanvasRenderer(me, {
                    size,
                    pixelRatio
                });
            } else {
                let optDefault = CommonUtil.extend({}, defaultProps);
                let opt = CommonUtil.extend(optDefault, {
                    color: me.color,
                    opacity: me.opacity,
                    radius: me.radius,
                    radiusScale: me.radiusScale,
                    radiusMinPixels: me.radiusMinPixels,
                    radiusMaxPixels: me.radiusMaxPixels,
                    strokeWidth: me.strokeWidth,
                    outline: me.outline,
                    onClick: me.onClick,
                    onHover: me.onHover
                });
                opt = CommonUtil.extend(me, opt);
                opt.pixelRatio = pixelRatio;
                opt.container = me.map.getViewport().getElementsByClassName("ol-overlaycontainer")[0];
                opt.onBeforeRender = function () {
                    return false;
                };
                opt.onAfterRender = function () {
                    return false;
                };

                renderer = new GraphicWebGLRenderer(me, opt);
            }
            return renderer;
        }

        /**
         * @private
         * @function ol.source.Graphic.prototype._forEachFeatureAtCoordinate
         * @description 获取在视图上的要素。
         * @param {string} coordinate -坐标。
         * @param {number} resolution -分辨率。
         * @param {RequestCallback} callback -回调函数。
         * @param {ol.Pixel} evtPixel - 当前选中的屏幕像素坐标。
         */
        function _forEachFeatureAtCoordinate(coordinate, resolution, callback, evtPixel, e) {
            let graphics = me.getGraphicsInExtent();
            let includeGraphics = []; // 点密集的时候，符合条件的有多个 还需精确计算
            for (let i = graphics.length - 1; i >= 0; i--) {
                let style = graphics[i].getStyle();
                if (!style) {
                    return;
                }
                //已经被高亮的graphics 不被选选中
                if (style instanceof HitCloverShape) {
                    continue;
                }
                let center = graphics[i].getGeometry().getCoordinates();
                let image = new ol.style.Style({
                    image: style
                }).getImage();

                let contain = false;
                //icl-1047  当只有一个叶片的时候，判断是否选中的逻辑处理的更准确一点
                if (image instanceof CloverShape && image.getCount() === 1) {
                    const ratation = image.getRotation() * 180 / Math.PI;
                    const angle = Number.parseFloat(image.getAngle());
                    const r = image.getRadius() * resolution;
                    //if(image.getAngle() )
                    let geo = null;
                    if (angle > 355) {
                        geo = new ol.geom.Circle(center, r);
                    } else {
                        const coors = [];
                        coors.push(center);
                        const perAngle = angle / 8;
                        for (let index = 0; index < 8; index++) {
                            const radian = (ratation + index * perAngle) / 180 * Math.PI;
                            coors.push([center[0] + r * Math.cos(radian),
                            center[1] - r * Math.sin(radian)
                            ]);
                        }
                        coors.push(center);
                        geo = new ol.geom.Polygon([
                            coors
                        ]);

                    }
                    if (geo.intersectsCoordinate(this.map.getCoordinateFromPixel(evtPixel))) {
                        contain = true;
                    }
                } else {
                    let extent = [];
                    extent[0] = center[0] - image.getAnchor()[0] * resolution;
                    extent[2] = center[0] + image.getAnchor()[0] * resolution;
                    extent[1] = center[1] - image.getAnchor()[1] * resolution;
                    extent[3] = center[1] + image.getAnchor()[1] * resolution;
                    if (ol.extent.containsCoordinate(extent, coordinate)) {
                        includeGraphics.push(graphics[i]);
                        // contain = true;
                    }
                }

                if (contain === true) {
                    if (me.isHighLight) {
                        me._highLight(center, image, graphics[i], evtPixel);
                    }
                    if (callback) {
                        callback(graphics[i], e);
                    }
                    continue;
                }
                if (me.isHighLight) {
                    me._highLightClose();
                }
            }
            // 精确计算
            let exactGraphic = this._getExactGraphic(includeGraphics, evtPixel);
            if (exactGraphic) {
                let _style = exactGraphic.getStyle(),
                    _center = exactGraphic.getGeometry().getCoordinates(),
                    _image = new ol.style.Style({
                        image: _style
                    }).getImage();

                if (me.isHighLight) {
                    me._highLight(_center, _image, exactGraphic, evtPixel);
                }
                if (callback) {
                    callback(exactGraphic, e);
                }
            } else {
                if (me.isHighLight) {
                    me._highLightClose();
                }
            }
            return undefined;
        }

    }

    /**
     * @private
     * @function ol.source.Graphic.prototype._getExactGraphic
     * @description 获取到精确的graphic。
     * @param {Array.<ol.Graphic>}  graphics - 点要素对象数组。
     * @param {ol.Pixel} evtPixel - 当前选中的屏幕像素坐标。
     */
    _getExactGraphic(graphics, evtPixel) {
        if (graphics.length === 0) {
            return false;
        } else if (graphics.length === 1) {
            return graphics[0];
        } else {
            let distances = [];
            graphics.map((graphic, index) => {
                let center = graphic.getGeometry().getCoordinates(),
                    centerPixel = this.map.getPixelFromCoordinate(center),
                    distance = Math.sqrt(Math.pow((centerPixel[0] - evtPixel[0]), 2) + Math.pow((centerPixel[1] - evtPixel[1]), 2));
                distances.push({ distance: distance, index: index });
                return null;
            });

            distances.sort((a, b) => {
                return a.distance - b.distance
            });
            return graphics[distances[0].index];
        }
    }

    /**
     * @function ol.source.Graphic.prototype.setGraphics
     * @description 设置绘制的点要素，会覆盖之前的所有要素。
     * @param {Array.<ol.Graphic>}  graphics - 点要素对象数组。
     */
    setGraphics(graphics) {
        this.graphics = this.graphics || [];
        this.graphics.length = 0;
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = [].concat(sGraphics);
        this.update();
    }

    /**
     * @function ol.source.Graphic.prototype.addGraphics
     * @description 追加点要素，不会覆盖之前的要素。
     * @param {Array.<ol.Graphic>}  graphics - 点要素对象数组。
     */
    addGraphics(graphics) {
        this.graphics = this.graphics || [];
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = this.graphics.concat(sGraphics);
        this.update();
    }

    /**
     * @function ol.source.Graphic.prototype.getGraphicBy
     * @description 在 Vector 的要素数组 graphics 里面遍历每一个 graphic，当 graphic[property]===value 时，返回此 graphic（并且只返回第一个）。
     * @param {string} property - graphic 的某个属性名称。
     * @param {string} value - property 所对应的值。
     * @returns {ol.Graphic} 一个匹配的 graphic。
     */
    getGraphicBy(property, value) {
        let graphic = null;
        for (let index in this.graphics) {
            if (this.graphics[index][property] === value) {
                graphic = this.graphics[index];
                break;
            }
        }
        return graphic;
    }

    /**
     * @function ol.source.Graphic.prototype.getGraphicById
     * @description 通过给定一个 id，返回对应的矢量要素。
     * @param {string} graphicId - 矢量要素的属性 id
     * @returns {ol.Graphic} 一个匹配的 graphic。
     */
    getGraphicById(graphicId) {
        return this.getGraphicBy("id", graphicId);
    }

    /**
     * @function ol.source.Graphic.prototype.getGraphicsByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - graphic 的某个属性名称。
     * @param {string} attrValue - property 所对应的值。
     * @returns {Array.<ol.Graphic>} 一个匹配的 graphic 数组。
     */
    getGraphicsByAttribute(attrName, attrValue) {
        var graphic,
            foundgraphics = [];
        for (let index in this.graphics) {
            graphic = this.graphics[index];
            if (graphic && graphic.attributes) {
                if (graphic.attributes[attrName] === attrValue) {
                    foundgraphics.push(graphic);
                }
            }
        }
        return foundgraphics;
    }

    /**
     * @function ol.source.Graphic.prototype.removeGraphics
     * @description 删除要素数组，默认将删除所有要素。
     * @param {Array.<ol.Graphic>} [graphics] - 删除的 graphics 数组。
     */
    removeGraphics(graphics = null) {
        //当 graphics 为 null 、为空数组，或 === this.graphics，则清除所有要素
        if (!graphics || graphics.length === 0 || graphics === this.graphics) {
            this.graphics.length = 0;
            this.update();
            return;
        }

        if (!(CommonUtil.isArray(graphics))) {
            graphics = [graphics];
        }

        for (let i = graphics.length - 1; i >= 0; i--) {
            let graphic = graphics[i];

            //如果我们传入的grapchic在graphics数组中没有的话，则不进行删除，
            //并将其放入未删除的数组中。
            let findex = CommonUtil.indexOf(this.graphics, graphic);

            if (findex === -1) {
                continue;
            }
            this.graphics.splice(findex, 1);
        }

        //删除完成后重新设置 setGraphics，以更新
        this.update();
    }

    /**
     * @function ol.source.Graphic.prototype.clear
     * @description 释放图层资源。
     */
    clear() {
        this.removeGraphics();
    }

    /**
     * @function ol.source.Graphic.prototype.update
     * @description 更新图层。
     */
    update() {
        this.renderer.update(this.graphics, this._getDefaultStyle());
    }

    _getDefaultStyle() {
        const target = {};
        if (this.color) {
            target.fill = new ol.style.Fill({
                color: this.toRGBA(this.color)
            })
        }
        if (this.radius) {
            target.radius = this.radius;
        }
        if (this.outline) {
            target.stroke = new ol.style.Fill({
                color: this.toRGBA(this.color),
                width: this.strokeWidth
            })
        }
        return new ol.style.Circle(target);

    }

    toRGBA(colorArray) {
        return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] || 255) / 255})`;
    }

    /**
     * @function ol.source.Graphic.prototype.setStyle
     * @description 设置图层要素整体样式（接口仅在 webgl 渲染时有用）。
     * @param {Object} styleOptions - 样式对象。
     * @param {Array.<number>} [styleOptions.color=[0, 0, 0, 255]] - 点颜色。
     * @param {number} [styleOptions.radius=10] - 点半径。
     * @param {number} [styleOptions.opacity=0.8] - 不透明度。
     * @param {Array}  [styleOptions.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
     * @param {number} [styleOptions.radiusScale=1] - 点放大倍数。
     * @param {number} [styleOptions.radiusMinPixels=0] - 半径最小值(像素)。
     * @param {number} [styleOptions.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值(像素)。
     * @param {number} [styleOptions.strokeWidth=1] - 边框大小。
     * @param {boolean} [styleOptions.outline=false] - 是否显示边框。
     */
    setStyle(styleOptions) {
        let self = this;
        let styleOpt = {
            color: self.color,
            radius: self.radius,
            opacity: self.opacity,
            highlightColor: self.highlightColor,
            radiusScale: self.radiusScale,
            radiusMinPixels: self.radiusMinPixels,
            radiusMaxPixels: self.radiusMaxPixels,
            strokeWidth: self.strokeWidth,
            outline: self.outline
        };

        CommonUtil.extend(self, CommonUtil.extend(styleOpt, styleOptions));
        self.update();
    }

    /**
     * @function ol.source.Graphic.prototype.getLayerState
     * @description 获取当前地图及图层状态。
     * @returns {Object} 地图及图层状态，包含地图状态信息和本图层相关状态。
     */
    getLayerState() {
        let map = this.map;
        let width = map.getSize()[0];
        let height = map.getSize()[1];

        let view = map.getView();
        let center = view.getCenter();
        let longitude = center[0];
        let latitude = center[1];

        let zoom = view.getZoom();
        let maxZoom = view.getMaxZoom();
        let rotationRadians = view.getRotation();

        let rotation = -rotationRadians * 180 / Math.PI;

        let mapViewport = {
            longitude: longitude,
            latitude: latitude,
            zoom: zoom,
            maxZoom: maxZoom,
            pitch: 0,
            bearing: rotation
        };
        let state = {};
        for (let key in mapViewport) {
            state[key] = mapViewport[key];
        }
        state.width = width;
        state.height = height;

        state.color = this.color;
        state.radius = this.radius;
        state.opacity = this.opacity;
        state.highlightColor = this.highlightColor;
        state.radiusScale = this.radiusScale;
        state.radiusMinPixels = this.radiusMinPixels;
        state.radiusMaxPixels = this.radiusMaxPixels;
        state.strokeWidth = this.strokeWidth;
        state.outline = this.outline;
        return state;
    }

    /**
     * @function ol.source.Graphic.prototype._highLightClose
     * @description 关闭高亮要素显示。
     * @private
     */
    _highLightClose() {
        this.selected = null;
        if (this.hitGraphicLayer) {
            this.map.removeLayer(this.hitGraphicLayer);
            this.hitGraphicLayer = null;
        }
        this.changed();
    }

    /**
     * @function ol.source.Graphic.prototype._highLight
     * @description 高亮显示选中要素。
     * @param {Array.<number>} center - 中心点。
     * @param {ol.style.Style} image - 点样式。
     * @param {ol.Graphic} selectGraphic - 高效率点图层点要素。
     * @param {ol.Pixel} evtPixel - 当前选中的屏幕像素坐标。
     * @private
     */
    _highLight(center, image, selectGraphic, evtPixel) {
        if (selectGraphic.getStyle() instanceof CloverShape) {
            if (this.hitGraphicLayer) {
                this.map.removeLayer(this.hitGraphicLayer);
                this.hitGraphicLayer = null;
            }
            var pixel = this.map.getPixelFromCoordinate([center[0], center[1]]);
            //点击点与中心点的角度
            evtPixel = evtPixel || [0, 0];
            var angle = (Math.atan2(evtPixel[1] - pixel[1], evtPixel[0] - pixel[0])) / Math.PI * 180;
            angle = angle > 0 ? angle : 360 + angle;
            //确定扇叶
            var index = Math.ceil(angle / (image.getAngle() + image.getSpaceAngle()));
            //扇叶的起始角度
            var sAngle = (index - 1) * (image.getAngle() + image.getSpaceAngle());
            //渲染参数
            var opts = {
                stroke: new ol.style.Stroke({
                    color: "#ff0000",
                    width: 1
                }),
                fill: new ol.style.Fill({
                    color: "#0099ff"
                }),
                radius: image.getRadius(),
                angle: image.getAngle(),
                eAngle: sAngle + image.getAngle(),
                sAngle: sAngle,
                rotation: image.getRotation()
            };
            if (this.highLightStyle && this.highLightStyle instanceof HitCloverShape) {
                opts.stroke = this.highLightStyle.getStroke();
                opts.fill = this.highLightStyle.getFill();
                opts.radius = this.highLightStyle.getRadius();
                opts.angle = this.highLightStyle.getAngle();
            }
            var hitGraphic = new ol.Graphic(new ol.geom.Point(center));
            hitGraphic.setStyle(new HitCloverShape(opts));
            this.hitGraphicLayer = new ol.layer.Image({
                source: new ol.source.Graphic({
                    map: this.map,
                    graphics: [hitGraphic]
                })
            });
            this.map.addLayer(this.hitGraphicLayer);
        } else {
            this.selected = selectGraphic;
            this.changed();
        }
    }

    /**
     * @function ol.source.Graphic.prototype.getGraphicsInExtent
     * @description 在指定范围中获取几何要素面积。
     * @param {Object} extent - 长度范围。
     */
    getGraphicsInExtent(extent) {
        var graphics = [];
        if (!extent) {
            this.graphics.map(function (graphic) {
                graphics.push(graphic);
                return graphic;
            });
            return graphics;
        }
        this.graphics.map(function (graphic) {
            if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
            return graphic;
        });
        return graphics;
    }

}

ol.source.Graphic = Graphic;