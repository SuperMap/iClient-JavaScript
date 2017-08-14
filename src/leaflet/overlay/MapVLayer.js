import L from "leaflet";
import MapVRenderer from "./mapv/MapVRenderer";

/**
 * @class L.supermap.mapVLayer
 * @classdesc MapV图层
 * @param dataSet - {DataSet} MapV图层数据集
 * @param mapVOptions - {object} MapV图层参数
 * @param options - {object} 可选参数。如：<br>
 *        attributionPrefix - {String} 版权信息前缀。<br>
 *        attribution - {String} 版权信息。
 */
export var MapVLayer = L.Layer.extend({

    /**
     * @member L.supermap.mapVLayer.protptype.options
     * @description 可选参数。
     */
    options: {
        attributionPrefix: null,
        attribution: " © 2017 百度 MapV with <span>© <a href='http://iclient.supermapol.com' target='_blank'>SuperMap iClient</a></span>"
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
     * @function L.supermap.mapVLayer.protptype.onAdd
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

    _hide: function () {
        this.canvas.style.display = 'none';
    },

    _show: function () {
        this.canvas.style.display = 'block';
    },

    /**
     * @function L.supermap.mapVLayer.protptype.onRemove
     * @description 删除地图图层
     * @param map - {L.map} 要删除的图层
     */
    onRemove: function (map) {
        L.DomUtil.remove(this.container);
        map.off({
            moveend: this.draw,
            zoomstart: this._hide,
            zoomend: this._show
        }, this);
    },

    /**
     * @function L.supermap.mapVLayer.protptype.addData
     * @description 追加数据
     * @param data - {object} 要追加的数据
     * @param options -{object} 要追加的值
     */
    addData: function (data, options) {
        this.renderer.addData(data, options);
    },

    /**
     * @function L.supermap.mapVLayer.protptype.update
     * @description 更新数据
     * @param data - {object} 要更新的数据
     * @param options -{object} 要更新的值
     */
    update: function (data, options) {
        this.renderer.updateData(data, options);
    },

    /**
     * @function L.supermap.mapVLayer.protptype.getData
     * @description 获取数据
     */
    getData: function () {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * @function L.supermap.mapVLayer.protptype.removeData
     * @description 删除数据
     * @param filter - {String} 过滤条件
     */
    removeData: function (filter) {
        this.renderer && this.renderer.removeData(filter);
    },

    /**
     * @function L.supermap.mapVLayer.protptype.clearData
     * @description 清除数据
     */
    clearData: function () {
        this.renderer.clearData();
    },

    /**
     * @function L.supermap.mapVLayer.protptype.draw
     * @description 绘制
     */
    draw: function () {
        return this._reset();
    },

    /**
     * @function L.supermap.mapVLayer.protptype.setZIndex
     * @description 设置叠加优先级
     * @param zIndex - {number} 优先级
     */
    setZIndex: function (zIndex) {
        this.canvas.style.zIndex = zIndex;
    },

    /**
     * @function L.supermap.mapVLayer.protptype.render
     * @description 着色
     */
    render: function () {
        this.renderer._canvasUpdate();
    },

    /**
     * @function L.supermap.mapVLayer.protptype.getCanvas
     * @description 获取画布
     */
    getCanvas: function () {
        return this.canvas;
    },

    /**
     * @function L.supermap.mapVLayer.protptype.getContainer
     * @description 获取容器
     */
    getContainer: function () {
        return this.container;
    },

    /**
     * @function L.supermap.mapVLayer.protptype.getTopLeft
     * @description 获取左上角坐标
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
    },

});

export var mapVLayer = function (dataSet, mapVOptions, options) {
    return new MapVLayer(dataSet, mapVOptions, options);
};
L.supermap.mapVLayer = mapVLayer;

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
    },
});