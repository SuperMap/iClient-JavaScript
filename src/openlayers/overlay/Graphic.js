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
    GraphicCanvasRenderer,
    GraphicWebGLRenderer
} from './graphic/';

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
 * @param {string} [options.render ='canvas']  -  指定使用的渲染器。可选值："webgl","canvas"(webgl渲染目前只支持散点)。
 * @param {boolean} [options.isHighLight=true] - 事件响应是否支持要素高亮。即默认支持高亮。
 * @param {ol.style} [options.highLightStyle=defaultHighLightStyle] - 高亮风格。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 要素颜色。
 * @param {Array.<number>} [options.highlightColor] - webgl渲染时要素高亮颜色。
 * @param {number} [options.opacity=0.8] - 要素透明度。
 * @param {number} [options.radius=10] - 要素半径，单位像素。
 * @param {number} [options.radiusScale=1] - webgl渲染时的要素放大倍数。
 * @param {number} [options.radiusMinPixels=0] - webgl渲染时的要素半径最小值(像素)。
 * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - webgl渲染时的要素半径最大值(像素)。
 * @param {number} [options.strokeWidth=1] - 边框大小。
 * @param {boolean} [options.outline=false] - 是否显示边框。
 * @param {function} [options.onHover] -  图层鼠标悬停响应事件(只有webgl渲染时有用)。
 * @extends {ol.source.ImageCanvas}
 * 
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
        this.graphics_ = [].concat(options.graphics);
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
                let coordinate = e.coordinate;
                let resolution = e.frameState.viewState.resolution;
                let pixel = e.pixel;
                me._forEachFeatureAtCoordinate(coordinate, resolution, options.onClick, pixel);
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
        function _forEachFeatureAtCoordinate(coordinate, resolution, callback, evtPixel) {
            let graphics = me.getGraphicsInExtent();
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
                let extent = [];
                extent[0] = center[0] - image.getAnchor()[0] * resolution;
                extent[2] = center[0] + image.getAnchor()[0] * resolution;
                extent[1] = center[1] - image.getAnchor()[1] * resolution;
                extent[3] = center[1] + image.getAnchor()[1] * resolution;
                if (ol.extent.containsCoordinate(extent, coordinate)) {
                    if (me.isHighLight) {
                        me._highLight(center, image, graphics[i], evtPixel);
                    }
                    if (callback) {
                        callback(graphics[i]);
                    }
                    return;
                }
                if (me.isHighLight) {
                    me._highLightClose();
                }
            }
            return undefined;
        }

    }

    /**
     * @function ol.source.Graphic.prototype.setGraphics
     * @description 设置绘制的点要素，会覆盖之前的所有要素。
     * @param {Array.<ol.Graphic>}  graphics - 点要素对象数组。
     */
    setGraphics(graphics) {
        this.graphics_ = this.graphics_ || [];
        this.graphics_.length = 0;
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics_ = [].concat(sGraphics);
        this.update();
    }

    /**
     * @function ol.source.Graphic.prototype.addGraphics
     * @description 追加点要素，不会覆盖之前的要素。
     * @param {Array.<ol.Graphic>}  graphics - 点要素对象数组。
     */
    addGraphics(graphics) {
        this.graphics_ = this.graphics_ || [];
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics_ = this.graphics_.concat(sGraphics);
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
     * @function ol.source.Graphic.prototype.removeGraphics
     * @description 清除所有要素。
     */
    removeGraphics() {
        this.graphics_.length = 0;
        this.update();
    }

    /**
     * @function ol.source.Graphic.prototype.update
     * @description 更新图层。
     */
    update() {
        this.renderer.update(this.graphics_, this._getDefaultStyle());
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
        return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3]||255)/255})`;
    }
    /**
     * @function ol.source.Graphic.prototype.setStyle
     * @description 设置图层要素整体样式(接口仅在webgl渲染时有用)。
     * @param {Object} styleOptions - 样式对象。
     * @param {Array.<number>} styleOptions.color - 点颜色。
     * @param {number} styleOptions.radius - 点半径。
     * @param {number} styleOptions.opacity - 不透明度。
     * @param {Array}  styleOptions.highlightColor - 高亮颜色，目前只支持rgba数组。
     * @param {number} styleOptions.radiusScale - 点放大倍数。
     * @param {number} styleOptions.radiusMinPixels - 半径最小值(像素)。
     * @param {number} styleOptions.radiusMaxPixels - 半径最大值(像素)。
     * @param {number} styleOptions.strokeWidth - 边框大小。
     * @param {boolean} styleOptions.outline - 是否显示边框。
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
     * @returns {Object} 地图及图层状态，包含地图状态信息和本图层相关状态
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
                sAngle: sAngle
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
            this.graphics_.map(function (graphic) {
                graphics.push(graphic);
                return graphic;
            });
            return graphics;
        }
        this.graphics_.map(function (graphic) {
            if (ol.extent.containsExtent(extent, graphic.getGeometry().getExtent())) {
                graphics.push(graphic);
            }
            return graphic;
        });
        return graphics;
    }

}

ol.source.Graphic = Graphic;