/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {CommonUtil,Unit} from "@supermap/iclient-common";
import {Util} from "../../core/Util";
import BaseObject from 'ol/Object';
import * as olProj from 'ol/proj';

const emptyFunc = () => false;
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

/**
 * @private
 * @class GraphicWebGLRenderer
 * @classdesc 高效率点图层 webgl 渲染器。
 * @category Visualization Graphic
 * @extends {ol/Object}
 * @param {ol.source.Graphic} layer - 高效率点图层。
 * @param {Object} options - 图层参数。
 * @param {number} options.width - 地图宽度。
 * @param {number} options.height - 地图高度。
 * @param {HTMLElement} options.container - 放置渲染器的父元素。
 * @param {Array.<number>} [options.color=[0, 0, 0, 255]] - 颜色，目前只支持 rgba 数组。 
 * @param {number} [options.radius=10] - 半径。
 * @param {number} [options.opacity=0.8] - 不透明度。
 * @param {Array}  [options.highlightColor] - 高亮颜色，目前只支持 rgba 数组。
 * @param {number} [options.radiusScale = 1] - 点放大倍数。
 * @param {number} [options.radiusMinPixels = 0] - 半径最小值（像素）。
 * @param {number} [options.radiusMaxPixels = Number.MAX_SAFE_INTEGER] - 半径最大值（像素）。
 * @param {number} [options.strokeWidth = 1] - 边框大小。
 * @param {boolean} [options.outline = false] - 是否显示边框。
 * @param {function} [options.onClick] - 点击事件。
 * @param {function} [options.onHover] - 悬停事件。
 */
export class GraphicWebGLRenderer extends BaseObject {
    constructor(layer, options) {
        super();
        this.layer = layer;
        this.map = layer.map;
        let opt = options || {};
        CommonUtil.extend(this, opt);

        let pixelRatio = this.pixelRatio = window ? window.devicePixelRatio : 1;

        this.width = this.map.getSize()[0] * pixelRatio;
        this.height = this.map.getSize()[1] * pixelRatio;
        this.center = this.map.getView().getCenter();
        this._initContainer();
        this._registerEvents();
    }

    _registerEvents() {
        let map = this.map;
        let view = map.getView();
        map.on('change:size', this._resizeEvent.bind(this), this);
        view.on('change:resolution', this._moveEndEvent.bind(this), this);
        view.on('change:center', this._moveEvent.bind(this), this);
        view.on('change:rotation', this._moveEndEvent.bind(this), this);
        map.on('moveend', this._moveEndEvent.bind(this), this)
    }

    _resizeEvent() {
        this._resize();
        this._clearAndRedraw();
    }

    _moveEvent() {

        let oldCenterPixel = this.map.getPixelFromCoordinate(this.center);
        let newCenterPixel = this.map.getPixelFromCoordinate(this.map.getView().getCenter());

        let offset = [oldCenterPixel[0] - newCenterPixel[0], oldCenterPixel[1] - newCenterPixel[1]];
        this._canvas.style[CSS_TRANSFORM] = 'translate(' + Math.round(offset[0]) + 'px,' + Math.round(offset[1]) + 'px)';
    }

    _moveEndEvent() {
        this._canvas.style[CSS_TRANSFORM] = 'translate(0,0)';
        this.center = this.map.getView().getCenter();
        this._clearAndRedraw();
    }

    _clearAndRedraw() {
        this._clearBuffer();
        this.layer.changed();
    }

    _resize() {
        const size = this.map.getSize();
        const width = size[0] * this.pixelRatio;
        const height = size[1] * this.pixelRatio;
        this._canvas.width = width;
        this._canvas.height = height;
        this._canvas.style.width = width + 'px';
        this._canvas.style.height = height + 'px';
    }

    _clearBuffer() {
        if (!this.deckGL) {
            return;
        }
        let lm = this.deckGL.layerManager;
        lm && lm.context.gl.clear(lm.context.gl.COLOR_BUFFER_BIT);
        return this;
    }

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.getCanvas
     * @description 返回画布。
     * @returns {HTMLCanvasElement} canvas 对象。
     */
    getCanvas() {
        return this._canvas;
    }

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.update
     * @description  更新图层，数据或者样式改变后调用。
     */
    update(graphics) {
        if (graphics && graphics.length > -1) {
            this._data = graphics;
        }
        if (!this._renderLayer) {
            return;
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
    }

    /**
     * @private
     * @function  GraphicWebGLRenderer.prototype.drawGraphics
     * @description 绘制点要素。
     */
    drawGraphics(graphics) {
        this._data = graphics ? graphics : this._data ? this._data : [];
        if (!this._renderLayer) {
            this._createInnerRender();
        }
        this._clearBuffer();
        this._draw();
    }

    _initContainer() {
        this._canvas = this._createCanvas(this.width, this.height);
        this._layerContainer = this.container;
        this._wrapper = document.createElement('div');
        this._wrapper.className = "deck-wrapper";
        this._wrapper.style.position = "absolute";
        this._wrapper.style.top = "0";
        this._wrapper.style.left = "0";
        this._wrapper.appendChild(this._canvas);
        this._layerContainer && this._layerContainer.appendChild(this._wrapper);
    }

    _createCanvas(width, height) {

        let canvas = document.createElement('canvas');
        canvas.oncontextmenu = emptyFunc;
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";
        return canvas;
    }

    _createInnerRender() {
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
        radius = this._pixelToMeter(radius);
        let innerLayerOptions = {
            id: 'scatter-plot',
            data: [],
            pickable: Boolean(this.onClick) || Boolean(this.onHover),
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
            getPosition(point) {
                if (!point) {
                    return [0, 0, 0];
                }
                let geometry = point.getGeometry();
                let coordinates = geometry && geometry.getCoordinates();
                coordinates = me._project(coordinates);
                return coordinates && [coordinates[0], coordinates[1], 0];
            },
            getColor(point) {
                let defaultStyle = me._getLayerDefaultStyle();
                let style = point && point.getStyle();
                return style && style.getColor() || defaultStyle.color
            },
            getRadius(point) {
                let defaultStyle = me._getLayerDefaultStyle();
                let style = point && point.getStyle();
                return style && style.getRadius() || defaultStyle.radius
            },
            updateTriggers: {
                getColor: [color],
                getRadius: [radius]
            }
        };
        let _self = this;
        if (this.onClick) {
            innerLayerOptions.onClick = function () {
                _self._canvas.style.cursor = "pointer";
                _self.onClick.apply(_self, arguments)
            };
        }
        if (this.onHover) {
            innerLayerOptions.onHover = function () {
                _self._canvas.style.cursor = "pointer";
                _self.onHover.apply(_self, arguments)
            };
        }
        me._renderLayer = new window.DeckGL.ScatterplotLayer(innerLayerOptions);
    }

    _getLayerDefaultStyle() {
        let {
            color,
            opacity,
            radius,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline
        } = this._getLayerState();
        radius = this._pixelToMeter(radius);
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

    }

    _getLayerState() {
        let state = this.layer.getLayerState();
        let view = this.map.getView();
        let projection = view.getProjection().getCode();
        let center = olProj.transform([state.longitude, state.latitude], projection, 'EPSG:4326')
        state.longitude = center[0];
        state.latitude = center[1];
        state.zoom = state.zoom - 1;
        return state;
    }

    _draw() {
        this._refreshData();
        let state = this._getLayerState();
        state.data = this._data || [];
        let deckOptions = {};

        for (let key in state) {
            deckOptions[key] = state[key];
        }
        this._renderLayer.setNeedsRedraw(true);
        deckOptions.layers = [this._renderLayer];
        deckOptions.canvas = this._canvas;
        if (this.onBeforeRender) {
            deckOptions.onBeforeRender = this.onBeforeRender.bind(this);
        }
        if (this.onAfterRender) {
            deckOptions.onAfterRender = this.onAfterRender.bind(this);
        }
        if (!this.deckGL) {
            this.deckGL = new window.DeckGL.experimental.DeckGLJS(deckOptions);
        } else {
            this.deckGL.setProps(deckOptions);
        }
    }

    _refreshData() {
        let graphics = this._data || [];
        let sGraphics = !Util.isArray(graphics) ? [graphics] : [].concat(graphics);
        //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
        if (!this._renderLayer.props.data) {
            this._renderLayer.props.data = [];
        }
        this._renderLayer.props.data.length = 0;
        for (let j = 0; j < sGraphics.length; j++) {
            this._renderLayer.props.data.push(sGraphics[j]);
        }
        this._data = this._renderLayer.props.data;
    }

    _project(coordinates) {
        let view = this.map.getView();
        let projection = view.getProjection().getCode();
        if ("EPSG:4326" === projection) {
            return coordinates;
        }
        return olProj.transform(coordinates, projection, 'EPSG:4326');
    }
    _pixelToMeter(pixel) {
        let view = this.map.getView();
        let projection = view.getProjection();

        let unit = projection.getUnits() || 'degrees';
        if (unit === 'degrees') {
            unit = Unit.DEGREE;
        }
        if (unit === 'm') {
            unit = Unit.METER;
        }
        const res = view.getResolution();
        if (unit === Unit.DEGREE) {
            let meterRes= res*(Math.PI * 6378137 / 180);
            return pixel * meterRes;
        }else{
            return pixel * res;
        }
    }

}