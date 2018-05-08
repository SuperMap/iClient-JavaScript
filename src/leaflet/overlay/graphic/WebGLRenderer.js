import L from "leaflet";

const emptyFunc = L.Util.falseFn;
/**
 * @private
 * @class GraphicWebGLRenderer
 * @classdesc 高效率点图层 webgl渲染器。
 * @category Visualization Graphic
 * @extends L.Layer{@linkdoc-leaflet/#layer}
 * @param layer - {Array<L.supermap.graphicLayer>} 高效率点图层
 * @param {Object} options - 图层参数。
 * @param {number} options.width - 地图宽度
 * @param {number} options.height - 地图高度
 * @param {HTMLElement} options.container - 放置渲染器的父元素
 *
 * @param {Array<number>} options.color - 颜色,目前只支持rgba数组。默认[0, 0, 0, 255],
 * @param {number} options.radius - 半径,默认10
 * @param {number} options.opacity - 不透明度,默认0.8
 * @param {Array}  options.highlightColor - 高亮颜色，目前只支持rgba数组
 * @param {number} options.radiusScale - 点放大倍数
 * @param {number} options.radiusMinPixels - 半径最小值(像素)
 * @param {number} options.radiusMaxPixels - 半径最大值(像素)
 * @param {number} options.strokeWidth - 边框大小
 * @param {boolean} options.outline - 是否显示边框
 *
 * @param {function} options.onClick - 点击事件
 * @param {function} options.onHover - 悬停事件
 */
export var GraphicWebGLRenderer = L.Class.extend({
    initialize: function (layer, options) {
        this.layer = layer;
        let opt = options || {};
        L.Util.setOptions(this, opt);
        this._initContainer();
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.getRenderer
     * @description 返回渲染器本身给图层，提供图层后续的数据增删改
     * @return {GraphicWebGLRenderer}
     */
    getRenderer: function () {
        return this;
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.update
     * @description  更新图层，数据或者样式改变后调用
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
        this._renderLayer.setNeedsRedraw(true);
        this._renderLayer.setState(state);
    },

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.drawGraphics
     * @description 绘制点要素
     */
    drawGraphics: function (graphics) {
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
                if(!point){
                    return [0,0,0];
                }
                let lngLat = point && point.getLatLng();
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
        return {
            color,
            opacity,
            radius,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline
        }

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
        let lm = this.deckGL.layerManager;
        lm && lm.context.gl.clear(lm.context.gl.COLOR_BUFFER_BIT);
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