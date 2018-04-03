import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {CommonUtil} from "@supermap/iclient-common";
import {ScatterplotLayer, experimental} from 'deck.gl';
import {Util} from "../core/Util";
import './graphic';

const defaultProps = {
    color: [0, 0, 0, 255],
    opacity: 0.8,
    radius: 10,
    radiusScale: 1,
    radiusMinPixels: 0,
    radiusMaxPixels: Number.MAX_SAFE_INTEGER,
    strokeWidth: 1,
    outline: false,
    fp64: false
};

/**
 * @class mapboxgl.supermap.GraphicLayer
 * @category  Visualization Graphic
 * @classdesc 高效率点图层
 * @param id - {string} 图层id
 * @param {Object} options -  图层配置项
 * @param {Array<mapboxgl.supermap.Graphic>} options.graphics - 点要素对象数组
 * @param {Array<number>} options.color - 颜色,目前只支持rgba数组。默认[0, 0, 0, 255],
 * @param {number} options.radius - 半径,默认10
 * @param {number} options.opacity - 不透明度,默认0.8
 * @param {Array} options.highlightColor - 高亮颜色，目前只支持rgba数组
 * @param {number} options.radiusScale - 点放大倍数
 * @param {number} options.radiusMinPixels - 半径最小值(像素)
 * @param {number} options.radiusMaxPixels - 半径最大值(像素)
 * @param {number} options.strokeWidth - 边框大小
 * @param {boolean} options.outline - 是否显示边框
 * @param {boolean} options.fp64 - 是否启用64位计算
 */
export class GraphicLayer {

    constructor(id, options) {
        let opt = Util.extend(this, defaultProps, options);
        /**
         * @member mapboxgl.supermap.GraphicLayer.prototype.id - {string}
         * @description 高效率点图层id
         */
        this.id = id || CommonUtil.createUniqueID("graphicLayer_");
        /**
         * @member mapboxgl.supermap.GraphicLayer.prototype.graphics - {Array<mapboxgl.supermap.Graphic>}
         * @description 点要素对象数组
         */
        this.graphics = opt.graphics;

    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.addTo
     * @description 图层添加到地图
     * @param {Object}  map - 地图对象
     * @return this
     */
    addTo(map) {
        this.map = map;
        if (this.canvas) {
            this.mapContainer = this.map.getCanvasContainer();
            this.mapContainer.appendChild(this.canvas);
            return this;
        }
        this._initContainer();
        let mapState = this.getState();
        let {
            data,
            color,
            radius,
            opacity,
            highlightColor,
            radiusScale,
            radiusMinPixels,
            radiusMaxPixels,
            strokeWidth,
            outline,
            fp64
        } = mapState;
        let me = this;
        let layerOptions = {
            id: 'scatter-plot',
            data,
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
            fp64: fp64,
            getPosition: function (point) {
                let lngLat = point && point.getLngLat();
                return lngLat && [lngLat.lng, lngLat.lat, 0];
            },
            getColor: function (point) {
                let style = point && point.getStyle();
                return style && style.color || me.color
            },
            getRadius: function (point) {
                let style = point && point.getStyle();
                return style && style.radius || me.radius
            },
            updateTriggers: {
                getColor: [color],
                getRadius: [radius]
            }
        };
        if (this.onClick) {
            layerOptions.onClick = this.onClick;
        }
        if (this.onHover) {
            layerOptions.onHover = this.onHover;
        }

        this.layer = new ScatterplotLayer(layerOptions);
        let deckOptions = {};
        for (let key in mapState) {
            deckOptions[key] = mapState[key];
        }
        deckOptions.layers = [this.layer];
        deckOptions.canvas = this.canvas;
        this.deckGL = new experimental.DeckGLJS(deckOptions);
        this.map.on('move', this._moveEvent.bind(this));
        this.map.on('resize', this._resizeEvent.bind(this));
        this.draw();
        return this;
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.remove
     * @description 删除该图层
     */
    remove() {
        this.map.off('move', this._moveEvent.bind(this));
        this.map.off('resize', this._resizeEvent.bind(this));
        this.map.getCanvasContainer().removeChild(this.canvas);
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.removeFromMap
     * @deprecated
     * @description 删除该图层
     */
    removeFromMap() {
        this.remove();
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.getState
     * @description 获取当前地图及图层状态
     * @return {Object} 地图及图层状态，包含地图状态信息和本图层相关状态
     */
    getState() {
        let map = this.map;
        let width = map.getCanvas().width;
        let height = map.getCanvas().height;
        let center = map.getCenter();
        let longitude = center.lng;
        let latitude = center.lat;
        let zoom = map.getZoom();
        let maxZoom = map.getMaxZoom();
        let pitch = map.getPitch();
        let bearing = map.getBearing();

        let mapViewport = {
            longitude: longitude,
            latitude: latitude,
            zoom: zoom,
            maxZoom: maxZoom,
            pitch: pitch,
            bearing: bearing
        };
        let state = {};
        for (let key in mapViewport) {
            state[key] = mapViewport[key];
        }
        state.width = width;
        state.height = height;
        state.data = this.graphics;
        state.color = this.color;
        state.radius = this.radius;
        state.opacity = this.opacity;
        state.highlightColor = this.highlightColor;
        state.radiusScale = this.radiusScale;
        state.radiusMinPixels = this.radiusMinPixels;
        state.radiusMaxPixels = this.radiusMaxPixels;
        state.strokeWidth = this.strokeWidth;
        state.outline = this.outline;
        state.fp64 = this.fp64;
        return state;
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.draw
     * @description 绘制图层
     */
    draw() {
        let mapState = this.getState();
        let deckOptions = {};

        for (let key in mapState) {
            deckOptions[key] = mapState[key];
        }
        deckOptions.layers = [this.layer];
        deckOptions.canvas = this.canvas;
        this.deckGL.setProps(deckOptions);
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.update
     * @description 更新图层
     */
    update() {
        this.layer.setChangeFlags({
            dataChanged: true,
            propsChanged: true,
            viewportChanged: true,
            updateTriggersChanged: true
        });
        let state = this.getState();
        this.layer.setState(state);
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.setStyle
     * @description 设置图层整体样式
     * @param {Object} styleOptions - 样式对象
     * @param {Array<number>} styleOptions.color - 点颜色
     * @param {number} styleOptions.radius - 点半径
     * @param {number} styleOptions.opacity - 不透明度
     * @param {Array}  styleOptions.highlightColor - 高亮颜色，目前只支持rgba数组
     * @param {number} styleOptions.radiusScale - 点放大倍数
     * @param {number} styleOptions.radiusMinPixels - 半径最小值(像素)
     * @param {number} styleOptions.radiusMaxPixels - 半径最大值(像素)
     * @param {number} styleOptions.strokeWidth - 边框大小
     * @param {boolean} styleOptions.outline - 是否显示边框
     * @param {boolean} styleOptions.fp64 - 是否启用64位计算
     */
    setStyle(styleOptions) {
        let styleOpt = {
            color: this.color,
            radius: this.radius,
            opacity: this.opacity,
            highlightColor: this.highlightColor,
            radiusScale: this.radiusScale,
            radiusMinPixels: this.radiusMinPixels,
            radiusMaxPixels: this.radiusMaxPixels,
            strokeWidth: this.strokeWidth,
            outline: this.outline,
            fp64: this.fp64
        };

        Util.extend(this, styleOpt, styleOptions);
        this.update();
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.addData
     * @description 添加点要素
     * @param {Array<mapboxgl.supermap.Graphic>}  graphics - 点要素对象数组
     */
    addData(graphics) {
        this.graphics = this.graphics || [];
        let sGraphics = !Util.isArray(graphics) ? [graphics] : graphics.concat([]);
        //this.layer.props.data不能被重新赋值，只能在原数组上进行操作
        if (!this.layer.props.data) {
            this.layer.props.data = [];
        }
        for (let i = 0; i < sGraphics.length; i++) {
            this.layer.props.data.push(sGraphics[i]);
        }
        this.update();
    }

    /**
     * @function mapboxgl.supermap.GraphicLayer.prototype.removeFeatures
     * @description 移除所有要素
     */
    removeFeatures() {
        this.graphics = [];

        if (this.layer.props.data) {
            this.layer.props.data.length = 0;
        }
        this.update();
    }

    _moveEvent() {
        this.draw();
    }

    _resizeEvent() {
        let canvas = this.canvas;
        let map = this.map;
        canvas.width = parseInt(map.getCanvas().style.width);
        canvas.height = parseInt(map.getCanvas().style.height);
        canvas.style.width = map.getCanvas().style.width;
        canvas.style.height = map.getCanvas().style.height;
        this.draw();
    }

    _initContainer() {
        this.canvas = this._createCanvas();
        this.mapContainer = this.map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
    }

    _createCanvas() {
        let canvas = document.createElement('canvas');
        if (this.id) {
            canvas.id = this.id;
        }
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.style.cursor = "";
        let map = this.map;
        canvas.width = parseInt(map.getCanvas().style.width);
        canvas.height = parseInt(map.getCanvas().style.height);
        canvas.style.width = map.getCanvas().style.width;
        canvas.style.height = map.getCanvas().style.height;
        return canvas;
    }

}

mapboxgl.supermap.GraphicLayer = GraphicLayer;