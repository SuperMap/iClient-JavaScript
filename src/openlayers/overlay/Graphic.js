/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../core/Util';
import { HitCloverShape } from './graphic/HitCloverShape';
import { CloverShape } from './graphic/CloverShape';
import { Util as CommonUtil} from '@supermap/iclient-common/commontypes/Util';
import { GraphicWebGLRenderer } from './graphic/WebGLRenderer';
import { GraphicCanvasRenderer } from './graphic/CanvasRenderer';
import { Graphic as OverlayGraphic } from './graphic/Graphic';
import ImageCanvasSource from 'ol/source/ImageCanvas';
import Style from 'ol/style/Style';
import CircleStyle from 'ol/style/Circle';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
import * as olExtent from 'ol/extent';
import Polygon from 'ol/geom/Polygon';
import Point from 'ol/geom/Point';
import ImageLayer from 'ol/layer/Image';

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

const Renderer = ['canvas', 'webgl'];

/**
 * @class Graphic
 * @browsernamespace ol.source
 * @category  Visualization Graphic
 * @classdesc 高效率点图层源。能够支持前端百万点数据的渲染，并支持 GeoJSON、TopoJSON、二维表等多种数据格式，支持修改样式，
 * 支持属性筛选、鼠标事件等交互操作。
 * @param {Object} options - 参数。
 * @param {ol.Map} options.map - OpenLayers 地图对象。
 * @param {OverlayGraphic} options.graphics - 高效率点图层点要素。
 * @param {string} [options.render ='canvas']  -  指定使用的渲染器。可选值："webgl"，"canvas"（webgl 渲染目前只支持散点）。
 * @param {boolean} [options.isHighLight=true] - 事件响应是否支持要素高亮。
 * @param {ol.style.Style} [options.highLightStyle=defaultHighLightStyle] - 高亮风格。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 要素颜色。当 {@link OverlayGraphic} 的 style 参数传入设置了 fill 的 {@link HitCloverShape} 或 {@link CloverShape}，此参数无效。
 * @param {Array.<number>} [options.highlightColor] - webgl 渲染时要素高亮颜色。
 * @param {number} [options.opacity=0.8] - 要素不透明度。当 {@link OverlayGraphic} 的 style 参数传入设置了 fillOpacity 或 strokeOpacity 的 {@link HitCloverShape} 或 {@link CloverShape}，此参数无效。
 * @param {number} [options.radius=10] - 要素半径，单位为像素。当 {@link OverlayGraphic} 的 style 参数传入设置了 radius 的 {@link HitCloverShape} 或 {@link CloverShape}，此参数无效。
 * @param {number} [options.radiusScale=1] - webgl 渲染时的要素放大倍数。
 * @param {number} [options.radiusMinPixels=0] - webgl 渲染时的要素半径最小值，单位为像素。
 * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - webgl 渲染时的要素半径最大值，单位为像素。
 * @param {number} [options.strokeWidth=1] - 边框大小。
 * @param {boolean} [options.outline=false] - 是否显示边框。
 * @param {function} [options.onHover] -  图层鼠标悬停响应事件（只有 webgl 渲染时有用）。
 * @param {function} [options.onClick] -  图层鼠标点击响应事件（webgl、canvas 渲染时都有用）。
 * @extends {ol.source.ImageCanvas}
 * @usage
 */
export class Graphic extends ImageCanvasSource {
    constructor(options) {
        super({
            attributions: options.attributions,
            canvasFunction: canvasFunctionInternal_,
            logo: Util.getOlVersion() === '4' ? options.logo : null,
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
        this.isHighLight = typeof options.isHighLight === 'undefined' ? true : options.isHighLight;
        this.hitGraphicLayer = null;
        this._forEachFeatureAtCoordinate = _forEachFeatureAtCoordinate;
        this._options = options;
        const me = this;
        if (options.onClick) {
            me.map.on('click', function(e) {
              if (me.isDeckGLRender) {
                const params = me.renderer.deckGL.pickObject({ x: e.pixel[0], y: e.pixel[1] });
                options.onClick(params);
                return;
              }
              const graphic = me.findGraphicByPixel(e, me);
              if (graphic) {
                  options.onClick(graphic, e);
                  if (me.isHighLight) {
                    me._highLight(
                        graphic.getGeometry().getCoordinates(),
                        new Style({
                            image: graphic.getStyle()
                        }).getImage(),
                        graphic,
                        e.pixel
                    );
                  }
                
              }
            });
        }
          me.map.on('pointermove', function(e) {
            if (me.isDeckGLRender) {
              const params = me.renderer.deckGL.pickObject({ x: e.pixel[0], y: e.pixel[1] });
              if (options.onHover) {
                  options.onHover(params);
              }
            }
          });
        //eslint-disable-next-line no-unused-vars
        function canvasFunctionInternal_(extent, resolution, pixelRatio, size, projection) {
            var mapWidth = size[0] / pixelRatio;
            var mapHeight = size[1] / pixelRatio;
            var width = me.map.getSize()[0];
            var height = me.map.getSize()[1];
            if (!me.renderer) {
                me.renderer = createRenderer(size, pixelRatio);
            }
            me.renderer.mapWidth = mapWidth;
            me.renderer.mapHeight = mapHeight;
            me.renderer.pixelRatio = pixelRatio;
            me.renderer.offset = [(mapWidth - width) / 2, (mapHeight - height) / 2];
            let graphics = this.getGraphicsInExtent(extent);
            me.renderer._clearBuffer();
            me.renderer.selected = this.selected;
            me.renderer.drawGraphics(graphics);
            me.isDeckGLRender = me.renderer instanceof GraphicWebGLRenderer;
            if(me.isDeckGLRender){
              if (!me.context) {
                me.context = Util.createCanvasContext2D(mapWidth, mapHeight);
              }
              return me.context.canvas;
            }
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
                opt.container = me.map.getViewport().getElementsByClassName('ol-overlaycontainer')[0];
                opt.onBeforeRender = function() {
                    return false;
                };
                opt.onAfterRender = function() {
                    return false;
                };

                renderer = new GraphicWebGLRenderer(me, opt);
            }
            return renderer;
        }

        /**
         * @private
         * @function Graphic.prototype._forEachFeatureAtCoordinate
         * @description 获取在视图上的要素。
         * @param {string} coordinate -坐标。
         * @param {number} resolution -分辨率。
         * @param {RequestCallback} callback -回调函数。
         * @param {ol.Pixel} evtPixel - 当前选中的屏幕像素坐标。
         */
        function _forEachFeatureAtCoordinate(coordinate, resolution, callback, evtPixel, e) {
            let graphics = me.getGraphicsInExtent();
            // FIX 无法高亮元素
            me._highLightClose();
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
                let image = new Style({
                    image: style
                }).getImage();

                let contain = false;
                //icl-1047  当只有一个叶片的时候，判断是否选中的逻辑处理的更准确一点
                if (image instanceof CloverShape && image.getCount() === 1) {
                    const ratation = (image.getRotation() * 180) / Math.PI;
                    const angle = Number.parseFloat(image.getAngle());
                    const r = image.getRadius() * resolution;
                    //if(image.getAngle() )
                    let geo = null;
                    if (angle > 355) {
                        geo = new CircleStyle(center, r);
                    } else {
                        const coors = [];
                        coors.push(center);
                        const perAngle = angle / 8;
                        for (let index = 0; index < 8; index++) {
                            const radian = ((ratation + index * perAngle) / 180) * Math.PI;
                            coors.push([center[0] + r * Math.cos(radian), center[1] - r * Math.sin(radian)]);
                        }
                        coors.push(center);
                        geo = new Polygon([coors]);
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
                    if (olExtent.containsCoordinate(extent, coordinate)) {
                        contain = true;
                    }
                }

                if (contain === true) {
                    if (callback) {
                        callback(graphics[i], e);
                    }
                    continue;
                }
                // if (me.isHighLight) {
                //   // me._highLightClose();
                // }
            }
            return undefined;
        }
    }

    findGraphicByPixel(e, me) {
      const features = me.map.getFeaturesAtPixel(e.pixel) || [];
      for (let index = 0; index < features.length; index++) {
          const graphic = features[index];
          if (me.graphics.indexOf(graphic) > -1) {
            return graphic;
          }
      }
      return undefined;
    }

    /**
     * @function Graphic.prototype.setGraphics
     * @description 设置绘制的点要素，会覆盖之前的所有要素。
     * @param {Array.<OverlayGraphic>}  graphics - 点要素对象数组。
     */
    setGraphics(graphics) {
        this.graphics = this.graphics || [];
        this.graphics.length = 0;
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = [].concat(sGraphics);
        this.update();
    }

    /**
     * @function Graphic.prototype.addGraphics
     * @description 追加点要素，不会覆盖之前的要素。
     * @param {Array.<OverlayGraphic>}  graphics - 点要素对象数组。
     */
    addGraphics(graphics) {
        this.graphics = this.graphics || [];
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = this.graphics.concat(sGraphics);
        this.update();
    }

    /**
     * @function Graphic.prototype.getGraphicBy
     * @description 在 Vector 的要素数组 graphics 里面遍历每一个 graphic，当 graphic[property]===value 时，返回此 graphic（并且只返回第一个）。
     * @param {string} property - graphic 的属性名称。
     * @param {string} value - property 所对应的值。
     * @returns {OverlayGraphic} 一个匹配的 graphic。
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
     * @function Graphic.prototype.getGraphicById
     * @description 通过给定一个 ID，返回对应的矢量要素。
     * @param {string} graphicId - 矢量要素的属性 ID。
     * @returns {OverlayGraphic} 一个匹配的 graphic。
     */
    getGraphicById(graphicId) {
        return this.getGraphicBy('id', graphicId);
    }

    /**
     * @function Graphic.prototype.getGraphicsByAttribute
     * @description 通过给定一个属性的 key 值和 value 值，返回所有匹配的要素数组。
     * @param {string} attrName - 属性的 key 值。
     * @param {string} attrValue - 属性的 value 值。
     * @returns {Array.<OverlayGraphic>} 一个匹配的 graphic 数组。
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
     * @function Graphic.prototype.removeGraphics
     * @description 删除要素数组，默认将删除所有要素。
     * @param {Array.<OverlayGraphic>} [graphics] - 删除的 graphics 数组。
     */
    removeGraphics(graphics = null) {
        //当 graphics 为 null 、为空数组，或 === this.graphics，则清除所有要素
        if (!graphics || graphics.length === 0 || graphics === this.graphics) {
            this.graphics.length = 0;
            this.update();
            return;
        }

        if (!CommonUtil.isArray(graphics)) {
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
     * @function Graphic.prototype.clear
     * @description 释放图层资源。
     */
    clear() {
        this.removeGraphics();
    }

    /**
     * @function Graphic.prototype.update
     * @description 更新图层。
     */
    update() {
        this.renderer.update(this.graphics, this._getDefaultStyle());
    }

    _getDefaultStyle() {
        const target = {};
        if (this.color) {
            target.fill = new FillStyle({
                color: this.toRGBA(this.color)
            });
        }
        if (this.radius) {
            target.radius = this.radius;
        }
        if (this.outline) {
            target.stroke = new FillStyle({
                color: this.toRGBA(this.color),
                width: this.strokeWidth
            });
        }
        return new CircleStyle(target);
    }

    toRGBA(colorArray) {
        return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3] || 255) / 255})`;
    }

    /**
     * @function Graphic.prototype.setStyle
     * @description 设置图层要素整体样式（接口仅在 webgl 渲染时有用）。
     * @param {Object} styleOptions - 样式对象。
     * @param {Array.<number>} [styleOptions.color=[0, 0, 0, 255]] - 点颜色。
     * @param {number} [styleOptions.radius=10] - 点半径，单位为像素。
     * @param {number} [styleOptions.opacity=0.8] - 不透明度。
     * @param {Array}  [styleOptions.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
     * @param {number} [styleOptions.radiusScale=1] - 点放大倍数。
     * @param {number} [styleOptions.radiusMinPixels=0] - 半径最小值，单位为像素。
     * @param {number} [styleOptions.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值，单位为像素。
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
     * @function Graphic.prototype.getLayerState
     * @description 获取当前地图及图层状态。
     * @returns {Object} 地图及图层状态，包含地图状态信息和本图层相关状态信息。
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

        let rotation = (-rotationRadians * 180) / Math.PI;

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
     * @function Graphic.prototype._highLightClose
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
     * @function Graphic.prototype._highLight
     * @description 高亮显示选中要素。
     * @param {Array.<number>} center - 中心点。
     * @param {ol.style.Style} image - 点样式。
     * @param {OverlayGraphic} selectGraphic - 高效率点图层点要素。
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
            var angle = (Math.atan2(evtPixel[1] - pixel[1], evtPixel[0] - pixel[0]) / Math.PI) * 180;
            angle = angle > 0 ? angle : 360 + angle;
            //确定扇叶
            var index = Math.ceil(angle / (image.getAngle() + image.getSpaceAngle()));
            //扇叶的起始角度
            var sAngle = (index - 1) * (image.getAngle() + image.getSpaceAngle());
            //渲染参数
            var opts = {
                stroke: new StrokeStyle({
                    color: '#ff0000',
                    width: 1
                }),
                fill: new FillStyle({
                    color: '#0099ff'
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
            var hitGraphic = new OverlayGraphic(new Point(center));
            hitGraphic.setStyle(new HitCloverShape(opts));
            this.hitGraphicLayer = new ImageLayer({
                source: new Graphic({
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
     * @function Graphic.prototype.getGraphicsInExtent
     * @description 在指定范围中获取几何要素面积。
     * @param {Object} extent - 长度范围。
     */
    getGraphicsInExtent(extent) {
        var graphics = [];
        if (!extent) {
            this.graphics.forEach(graphic => {
                graphics.push(graphic);
            });
            return graphics;
        }
        this.graphics.forEach(graphic => {
            if (olExtent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
        });
        return graphics;
    }
}
