/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {
    Detector
} from "../core/Detector";
import {
    GraphicCanvasRenderer,
    GraphicWebGLRenderer,
    CircleStyle
} from './graphic';

const Renderer = ["canvas", "webgl"];

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
/**
 * @class L.supermap.graphicLayer
 * @classdesc 高效率点图层类。
 * @category Visualization Graphic
 * @extends {L.Path}
 * @param {Array.<L.supermap.graphic>} graphics - 要素对象。
 * @param {Object} options - 图层参数。
 * @param {string}   [options.render='canvas']  -  指定使用的渲染器。可选值："webgl","canvas"（webgl渲染目前只支持散点）。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 要素颜色。
 * @param {Array.<number>} [options.highlightColor] - webgl 渲染时要素高亮颜色。
 * @param {number} [options.opacity=0.8] - 要素透明度。
 * @param {number} [options.radius=10] - 要素半径，单位像素。
 * @param {number} [options.radiusScale=1] - webgl 渲染时的要素放大倍数。
 * @param {number} [options.radiusMinPixels=0] - webgl 渲染时的要素半径最小值(像素)。
 * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - webgl 渲染时的要素半径最大值（像素）。
 * @param {number} [options.strokeWidth=1] - 边框大小。
 * @param {boolean} [options.outline=false] - 是否显示边框。
 * @param {Function} [options.onClick] -  图层鼠标点击响应事件（webgl、canvas 渲染时都有用）。
 * @param {Function} [options.onHover] -  图层鼠标悬停响应事件（只有 webgl 渲染时有用）。
 */
export var GraphicLayer = L.Path.extend({

    initialize: function (graphics, options) {
        this.graphics = [].concat(graphics);
        let opt = options || {};
        L.Util.setOptions(this, opt);
        //因为跟基类的renderer冲突，所以采用render这个名字
        this.options.render = this.options.render || Renderer[0];
        //浏览器支持webgl并且指定使用webgl渲染才使用webgl渲染
        if (!Detector.supportWebGL2()) {
            this.options.render = Renderer[0];
        }
    },

    /**
     * @private
     * @function L.supermap.graphicLayer.prototype.getEvents
     * @description 获取事件。
     * @returns {Object} 返回该图层支持的事件对象。
     */
    getEvents: function () {
        return {
            click: this._handleClick.bind(this),
            resize: this._resize.bind(this),
            moveend: this._moveEnd.bind(this)
        };
    },

    /**
     * @private
     * @function L.supermap.graphicLayer.prototype.onAdd
     * @description 添加图形。
     */
    onAdd: function (map) {
        this._map = map;
        this.defaultStyle = this._getDefaultStyle(this.options);
        this._renderer = this._createRenderer();
        this._container = this._renderer._container;
        L.Path.prototype.onAdd.call(this);

    },

    /**
     * @private
     * @override
     * @function L.supermap.graphicLayer.prototype.onRemove
     * @description 移除图层。
     */
    onRemove: function () {
        this._renderer._removePath(this);
    },

    /**
     * @function L.supermap.graphicLayer.prototype.setGraphics
     * @description 设置绘制的点要素数据，会覆盖之前的所有要素。
     * @param {Array.<L.supermap.graphic>} graphics - 点要素对象数组。
     */
    setGraphics: function (graphics) {
        this.graphics = this.graphics || [];
        this.graphics.length = 0;
        let sGraphics = !L.Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = [].concat(sGraphics);
        this.update();
    },

    /**
     * @function L.supermap.graphicLayer.prototype.addGraphics
     * @description 追加点要素，不会覆盖之前的要素。
     * @param {Array.<L.supermap.graphic>}  graphics - 点要素对象数组。
     */
    addGraphics: function (graphics) {
        this.graphics = this.graphics || [];
        let sGraphics = !L.Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        this.graphics = this.graphics.concat(sGraphics);
        this.update();
    },

    /**
     * @function L.supermap.graphicLayer.prototype.setStyle
     * @description 设置图层要素整体样式。
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
    setStyle: function (styleOptions) {
        let _opt = this.options;
        let styleOpt = {
            color: _opt.color,
            radius: _opt.radius,
            opacity: _opt.opacity,
            highlightColor: _opt.highlightColor,
            radiusScale: _opt.radiusScale,
            radiusMinPixels: _opt.radiusMinPixels,
            radiusMaxPixels: _opt.radiusMaxPixels,
            strokeWidth: _opt.strokeWidth,
            outline: _opt.outline
        };
        this.options = L.Util.extend(this.options, styleOpt, styleOptions);
        this.defaultStyle = this._getDefaultStyle(this.options);
        this.update();
    },

    /**
     * @function L.supermap.graphicLayer.prototype.update
     * @description 更新图层，数据或者样式改变后调用。
     */
    update: function () {
        this._layerRenderer.update(this.graphics);
    },

    /**
     * @function L.supermap.graphicLayer.prototype.clear
     * @description 释放图层资源。
     */
    clear: function () {
        this.removeGraphics();
    },

    /**
     * @function L.supermap.graphicLayer.prototype.removeGraphics
     * @description 移除所有要素。
     */
    removeGraphics: function () {
        this.graphics.length = 0;
        this.update();
    },

    /**
     * @function L.supermap.graphicLayer.prototype.getRenderer
     * @description 获取渲染器。
     * @returns {Object} 内部渲染器。
     */
    getRenderer: function () {
        return this._renderer;
    },

    /**
     * @function L.supermap.graphicLayer.prototype.getState
     * @description 获取当前地图及图层状态。
     * @returns {Object} 地图及图层状态，包含地图状态信息和本图层相关状态。
     */
    getState: function () {
        let map = this._map;
        let width = map.getSize().x;
        let height = map.getSize().y;

        let center = map.getCenter();
        let longitude = center.lng;
        let latitude = center.lat;
        let zoom = map.getZoom();
        let maxZoom = map.getMaxZoom();

        let mapViewport = {
            longitude: longitude,
            latitude: latitude,
            zoom: zoom,
            maxZoom: maxZoom,
            pitch: 0,
            bearing: 0
        };
        let state = {};
        for (let key in mapViewport) {
            state[key] = mapViewport[key];
        }
        state.width = width;
        state.height = height;
        let options = this.options;
        state.color = options.color;
        state.radius = options.radius;
        state.opacity = options.opacity;
        state.highlightColor = options.highlightColor;
        state.radiusScale = options.radiusScale;
        state.radiusMinPixels = options.radiusMinPixels;
        state.radiusMaxPixels = options.radiusMaxPixels;
        state.strokeWidth = options.strokeWidth;
        state.outline = options.outline;
        return state;
    },

    _resize: function () {
        let size = this._map.getSize();
        this._container.width = size.x;
        this._container.height = size.y;
        this._container.style.width = size.x + "px";
        this._container.style.height = size.y + "px";

        let mapOffset = this._map.containerPointToLayerPoint([0, 0]);
        L.DomUtil.setPosition(this._container, mapOffset);
        this._update();
    },
    _moveEnd: function () {
        if (this._layerRenderer instanceof GraphicWebGLRenderer) {
            this._update();
        }
    },
    //使用canvas渲染或webgl渲染
    _createRenderer: function () {
        let map = this._map;
        let width = map.getSize().x;
        let height = map.getSize().y;
        let _renderer;
        if (this.options.render === Renderer[0]) {
            _renderer = new GraphicCanvasRenderer(this, {
                width: width,
                height: height,
                renderer: map.getRenderer(this)
            });
        } else {
            let optDefault = L.Util.setOptions({}, defaultProps);
            let opt = L.Util.setOptions({
                options: optDefault
            }, this.options);
            opt = L.Util.setOptions(this, opt);
            opt.container = map.getPane("overlayPane");
            opt.width = width;
            opt.height = height;

            _renderer = new GraphicWebGLRenderer(this, opt);
        }
        _renderer.defaultStyle = this.defaultStyle;
        this._layerRenderer = _renderer;
        return this._layerRenderer.getRenderer();
    },

    /**
     * @private
     * @override
     */
    _update: function () {
        if (this._map) {
            this._updatePath();
        }
    },

    /**
     * @private
     * @override
     */
    _updatePath: function () {
        let graphics = this._getGraphicsInBounds();
        this._renderer.drawGraphics(graphics, this.defaultStyle);
    },

    /**
     * @private
     * @override
     */
    _project: function () {
        let me = this;
        me._getGraphicsInBounds().map(function (graphic) {
            let point = me._map.latLngToLayerPoint(graphic.getLatLng());
            let w = me._clickTolerance();
            let p = [graphic._anchor + w, graphic._anchor + w];
            graphic._pxBounds = new L.Bounds(point.subtract(p), point.add(p));
            return graphic;
        });
        me._pxBounds = L.bounds(L.point(0, 0), L.point(this._container.width, this._container.height));
    },
    _getDefaultStyle: function (options) {
        const target = {};
        if (options.color) {
            target.fill = true;
            const color = this.toRGBA(options.color);
            target.color = color;
            target.fillColor = color;
        }
        if (options.opacity) {
            target.opacity = options.opacity;
            target.fillOpacity = options.opacity;
        }
        if (options.radius) {
            target.radius = options.radius;
        }
        if (options.strokeWidth) {
            target.weight = options.strokeWidth;
        }
        if (options.outline) {
            target.stroke = options.outline;
        }
        return new CircleStyle(target).getStyle();

    },
    toRGBA(colorArray) {
        return `rgba(${colorArray[0]},${colorArray[1]},${colorArray[2]},${(colorArray[3]||255)/255})`;
    },
    _getGraphicsInBounds: function () {
        let me = this;
        let graphicsInBounds = [];
        let viewBounds = me._map.getBounds();
        this.graphics.map(function (graphic) {
            if (viewBounds.contains(graphic.getLatLng())) {
                graphicsInBounds.push(graphic);
            }
            return graphic;
        });
        return graphicsInBounds;
    },


    _handleClick: function (evt) {
        this._layerRenderer._handleClick(evt);
    },
    /**
     * @private
     * @override
     */
    beforeAdd: L.Util.falseFn,

    /**
     * @private
     * @override
     */
    _containsPoint: L.Util.falseFn

});

export let graphicLayer = function (graphics, options) {
    return new GraphicLayer(graphics, options);
};

L.supermap.graphicLayer = graphicLayer;