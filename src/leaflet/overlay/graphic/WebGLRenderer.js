/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";

const emptyFunc = L.Util.falseFn;
/**
 * @private
 * @class GraphicWebGLRenderer
 * @classdesc 高效率点图层 webgl 渲染器。
 * @category Visualization Graphic
 * @extends {L.Layer}
 * @param {Array.<L.supermap.graphicLayer>} layer - 高效率点图层。
 * @param {Object} options - 图层参数。
 * @param {number} options.width - 地图宽度。
 * @param {number} options.height - 地图高度。
 * @param {HTMLElement} options.container - 放置渲染器的父元素。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]]  - 颜色，目前只支持 rgba 数组。
 * @param {number} [options.radius=10] - 半径。
 * @param {number} [options.opacity=0.8] - 不透明度。
 * @param {Array}  [options.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
 * @param {number} [options.radiusScale=1] - 点放大倍数。
 * @param {number} [options.radiusMinPixels=0] - 半径最小值(像素)。
 * @param {number} [options.radiusMaxPixels=Number.MAX_SAFE_INTEGER] - 半径最大值(像素)。
 * @param {number} [options.strokeWidth=1] - 边框大小。
 * @param {boolean} [options.outline=false] - 是否显示边框。
 * @param {Function} [options.onClick] - 点击事件。
 * @param {Function} [options.onHover] - 悬停事件。

 */
const CSS_TRANSFORM = (function () {
    let div = document.createElement('div');
    let props = [
        'transform',
        'WebkitTransform',
        'MozTransform',
        'OTransform',
        'msTransform'
    ];

    for (let i = 0; i < props.length; i++) {
        let prop = props[i];
        if (div.style[prop] !== undefined) {
            return prop;
        }
    }
    return props[0];
})();
export var GraphicWebGLRenderer = L.Class.extend({
    initialize: function (layer, options) {
        this.layer = layer;
        let opt = options || {};
        L.Util.setOptions(this, opt);
        this.options.radius = this._pixelToMeter(this.options.radius);
        this._initContainer();
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.getRenderer
     * @description 返回渲染器本身给图层，提供图层后续的数据增删改。
     * @returns {GraphicWebGLRenderer}
     */
    getRenderer: function () {
        return this;
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.update
     * @description  更新图层，数据或者样式改变后调用。
     */
    update: function (graphics) {

        if (graphics && graphics.length > -1) {
            this._data = graphics;
        }
        this._renderLayer.setChangeFlags({
            dataChanged: true,
            propsChanged: true,
            viewportChanged: true,
            updateTriggersChanged: true
        });

        this._refreshData();
        let state = this._getLayerState();
        state.data = this._data || [];
        this._layerDefaultStyleCache = null;
        this._renderLayer.setNeedsRedraw(true);
        this._renderLayer.setState(state);
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.drawGraphics
     * @description 绘制点要素。
     */
    drawGraphics: function (graphics) {
        this._clearBuffer();
        let size = this.layer._map.getSize();
        if (this._container.width !== size.x) {
            this._container.width = size.x;
        }
        if (this._container.height !== size.y) {
            this._container.height = size.y;
        }
        let mapPane = this.layer._map.getPanes().mapPane;
        let point = mapPane._leaflet_pos;

        this._container.style[CSS_TRANSFORM] = 'translate(' +
            -Math.round(point.x) + 'px,' +
            -Math.round(point.y) + 'px)';

        this._data = graphics || [];
        if (!this._renderLayer) {
            this._createInnerRender();
        }
        this._draw();
    },


    _initContainer: function () {
        this._container = this._createCanvas(this.options.width, this.options.height);
        this._layerContainer = this.options.container;
        this._wrapper = L.DomUtil.create('div', "deck-wrapper", this._layerContainer);
        this._wrapper.appendChild(this._container);
    },

    _createCanvas: function (width, height) {
        //leaflet-layer 对应的css会自动设置position
        let canvas = L.DomUtil.create('canvas', 'graphicLayer  leaflet-layer leaflet-zoom-hide');
        canvas.oncontextmenu = L.Util.falseFn;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        return canvas;
    },
    _pixelToMeter: function (pixel) {
        const bounds = this.layer._map.getBounds();
        const latlngRes = (bounds.getEast() - bounds.getWest()) / this.layer._map.getSize().x
        const meterRes = latlngRes * (Math.PI * 6378137 / 180);
        return pixel * meterRes;
    },
    _createInnerRender: function () {
        let me = this;
        let state = this._getLayerState();
        let {
            color,
            radius,
            opacity,
            highlightColor,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline
        } = state;
        let innerLayerOptions = {
            id: 'scatter-plot',
            data: me._data,
            pickable: Boolean(this.options.onClick) || Boolean(this.options.onHover),
            autoHighlight: true,
            color: color,
            opacity: opacity,
            radius: radius,
            radiusScale: radiusScale,
            highlightColor: highlightColor,
            radiusMinPixels: radiusMinPixels,
            radiusMaxPixels: radiusMaxPixels,
            strokeWidth: strokeWidth,
            outline: outline,
            getPosition: function (point) {
                if (!point) {
                    return [0, 0, 0];
                }
                let lngLat = point.getLatLng();
                return lngLat && [lngLat.lng, lngLat.lat, 0];
            },
            getColor: function (point) {
                let defaultStyle = me._getLayerDefaultStyle();
                let style = point && point.options;
                return style && style.color || defaultStyle.color
            },
            getRadius: function (point) {
                let defaultStyle = me._getLayerDefaultStyle();
                let style = point && point.getStyle();
                return style && style.radius || defaultStyle.radius
            },
            updateTriggers: {
                getColor: [color],
                getRadius: [radius]
            }
        };
        let _self = this;
        if (this.options.onClick) {
            innerLayerOptions.onClick = function () {
                _self._container.style.cursor = "pointer";
                _self.options.onClick.apply(_self, arguments)
            };
        }
        if (this.options.onHover) {
            innerLayerOptions.onHover = function () {
                _self._container.style.cursor = "pointer";
                _self.options.onHover.apply(_self, arguments)
            };
        }
        me._renderLayer = new window.DeckGL.ScatterplotLayer(innerLayerOptions);
    },

    _getLayerDefaultStyle: function () {
        if (this._layerDefaultStyleCache) {
            return this._layerDefaultStyleCache;
        }
        let {
            color,
            opacity,
            radius,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline
        } = this.layer.options;
        radius = this._pixelToMeter(radius);
        this._layerDefaultStyleCache = {
            color,
            opacity,
            radius,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline
        }
        return this._layerDefaultStyleCache

    },

    _getLayerState: function () {
        let state = this.layer.getState();
        state.zoom = state.zoom - 1;
        return state;
    },

    _draw: function () {
        let state = this._getLayerState();
        this._refreshData();
        state.data = this._data || [];
        let deckOptions = {};

        for (let key in state) {
            deckOptions[key] = state[key];
        }
        this._layerDefaultStyleCache = null;
        this._renderLayer.setNeedsRedraw(true);
        deckOptions.layers = [this._renderLayer];
        deckOptions.canvas = this._container;
        deckOptions.onBeforeRender = this._onBeforeRender.bind(this);
        deckOptions.onAfterRender = this._onAfterRender.bind(this);
        if (!this.deckGL) {
            this.deckGL = new window.DeckGL.experimental.DeckGLJS(deckOptions);
        } else {
            this.deckGL.setProps(deckOptions);
        }
    },

    _clearBuffer: function () {
        if (this.deckGL) {
            let lm = this.deckGL.layerManager;
            lm && lm.context.gl.clear(lm.context.gl.COLOR_BUFFER_BIT);
        }
        return this;
    },

    _refreshData: function () {
        let graphics = this._data || [];
        let sGraphics = !L.Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
        if (!this._renderLayer.props.data) {
            this._renderLayer.props.data = [];
        }
        this._renderLayer.props.data.length = 0;
        for (let i = 0; i < sGraphics.length; i++) {
            this._renderLayer.props.data.push(sGraphics[i]);
        }
        this._data = this._renderLayer.props.data;
    },

    _handleClick: emptyFunc,

    //deck渲染开始前调用，可以重写
    _onBeforeRender: emptyFunc,

    //deck渲染结束后调用，可以重写
    _onAfterRender: emptyFunc,

    //以下为leaflet再带的renderer的方法,为了保持接口正常调用，故增加这几个方法
    _removePath: function () {
        this._wrapper.parentElement.removeChild(this._wrapper);
        this._container = null;
        this._wrapper = null;
        return this;
    },
    _initPath: emptyFunc,
    _addPath: emptyFunc

});