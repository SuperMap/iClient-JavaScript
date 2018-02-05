import L from "leaflet";
import '../core/Base';
import {MapVRenderer} from "./mapv/MapVRenderer";

/**
 * @class L.supermap.mapVLayer
 * @classdesc MapV图层
 * @category Visualization MapV
 * @extends L.Layer{@linkdoc-leaflet/#layer}
 * @param dataSet - {mapv.DataSet} MapV图层数据集
 * @param mapVOptions - {Object} MapV图层参数
 * @param options - {Object} 可选参数。如：<br>
 *        attributionPrefix - {string} 版权信息前缀。<br>
 *        attribution - {string} 版权信息。
 */
export var MapVLayer = L.Layer.extend({

    options: {
        attributionPrefix: null,
        attribution: " © 2017 百度 MapV with <span>© <a href='http://iclient.supermap.io' target='_blank'>SuperMap iClient</a></span>"
    },

    initialize: function (dataSet, mapVOptions, options) {
        options = options || {};
        this.dataSet = dataSet || {};
        this.mapVOptions = mapVOptions || {};
        this.render = this.render.bind(this);
        L.Util.setOptions(this, options);
        if (this.options.attributionPrefix) {
            this.options.attribution = this.options.attributionPrefix + this.options.attribution;
        }

        this.canvas = this._createCanvas();
        L.stamp(this);
    },

    /**
     * @private
     * @function L.supermap.mapVLayer.prototype.onAdd
     * @description 添加地图图层
     * @param map - {L.map} 要添加的地图
     */
    onAdd: function (map) {
        this._map = map;
        var overlayPane = this.getPane();
        var container = this.container = L.DomUtil.create("div", "leaflet-layer leaflet-zoom-animated", overlayPane);
        container.appendChild(this.canvas);
        var size = map.getSize();
        container.style.width = size.x + "px";
        container.style.height = size.y + "px";
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.mapVOptions);
        this.draw();
        this.fire("loaded");
    },

    // _hide: function () {
    //     this.canvas.style.display = 'none';
    // },

    // _show: function () {
    //     this.canvas.style.display = 'block';
    // },

    /**
     * @private
     * @function L.supermap.mapVLayer.prototype.onRemove
     * @description 删除地图图层
     */
    onRemove: function () {
        L.DomUtil.remove(this.container);
        this.renderer.unbindEvent();
    },

    /**
     * @function L.supermap.mapVLayer.prototype.addData
     * @description 追加数据
     * @param data - {Object} 要追加的数据
     * @param options -{Object} 要追加的值
     */
    addData: function (data, options) {
        this.renderer.addData(data, options);
    },

    /**
     * @function L.supermap.mapVLayer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */
    update: function (opt) {
        this.renderer.update(opt);
    },

    /**
     * @function L.supermap.mapVLayer.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */
    getData: function () {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * @function L.supermap.mapVLayer.prototype.removeData
     * @description 删除符合过滤条件的数据
     * @param filter - {function} 过滤条件。条件参数为数据项，返回值为true,表示删除该元素；否则表示不删除
     * @example
     *  filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     *  }
     */
    removeData: function (filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    /**
     * @function L.supermap.mapVLayer.prototype.clearData
     * @description 清除数据
     */
    clearData: function () {
        this.renderer.clearData();
    },

    /**
     * @function L.supermap.mapVLayer.prototype.draw
     * @description 绘制图层
     */
    draw: function () {
        return this._reset();
    },

    /**
     * @function L.supermap.mapVLayer.prototype.setZIndex
     * @description 设置canvas层级
     * @param zIndex - {number} canvas层级
     */
    setZIndex: function (zIndex) {
        this.canvas.style.zIndex = zIndex;
    },

    /**
     * @function L.supermap.mapVLayer.prototype.render
     * @description 渲染
     */
    render: function () {
        this.renderer._canvasUpdate();
    },

    /**
     * @function L.supermap.mapVLayer.prototype.getCanvas
     * @description 获取canvas
     * @return {HTMLElement} 返回mapV图层包含的canvas对象
     */
    getCanvas: function () {
        return this.canvas;
    },

    /**
     * @function L.supermap.mapVLayer.prototype.getContainer
     * @description 获取容器
     * @return {HTMLElement} 返回包含mapV图层的dom对象
     */
    getContainer: function () {
        return this.container;
    },

    /**
     * @function L.supermap.mapVLayer.prototype.getTopLeft
     * @description 获取左上角坐标
     * @return {L.Bounds} 返回左上角坐标
     */
    getTopLeft: function () {
        var map = this._map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;

    },

    _createCanvas: function () {
        var canvas = document.createElement('canvas');
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.style.pointerEvents = "none";
        canvas.style.zIndex = this.options.zIndex || 600;
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    },


    _resize: function () {
        var canvas = this.canvas;
        if (!canvas) {
            return;
        }

        var map = this._map;
        var size = map.getSize();
        canvas.width = size.x;
        canvas.height = size.y;
        canvas.style.width = size.x + 'px';
        canvas.style.height = size.y + 'px';
        var bounds = map.getBounds();
        var topLeft = map.latLngToLayerPoint(bounds.getNorthWest());
        L.DomUtil.setPosition(canvas, topLeft);

    },

    _reset: function () {
        this._resize();
        this._render()
    },
    redraw: function () {
        this._resize();
        this._render()
    },
    _render: function () {
        this.render();
    }

});

export var mapVLayer = function (dataSet, mapVOptions, options) {
    return new MapVLayer(dataSet, mapVOptions, options);
};

L.Map.include({
    /*
     * 获取精确的像素坐标.
     * 当需要绘制比较平滑的曲线的时候可调用此方法代替latLngToContainerPoint
     * @param latlng
     */
    latLngToAccurateContainerPoint: function (latlng) {
        var projectedPoint = this.project(L.latLng(latlng));
        var layerPoint = projectedPoint._subtract(this.getPixelOrigin());
        return L.point(layerPoint).add(this._getMapPanePos());
    }
});

L.supermap.mapVLayer = mapVLayer;