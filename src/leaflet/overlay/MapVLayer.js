/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {MapVRenderer} from "./mapv/MapVRenderer";
import Attributions from '../core/Attributions'

/**
 * @class MapVLayer
 * @deprecatedclassinstance L.supermap.mapVLayer
 * @classdesc MapV 图层。
 * @category Visualization MapV
 * @extends {L.Layer}
 * @param {Mapv.DataSet} dataSet - MapV 图层数据集。
 * @param {Object} mapVOptions - MapV 图层参数。
 * @param {Object} options - 参数。
 * @param {string} [options.attributionPrefix] - 版权信息前缀。
 * @param {string} [options.attribution='© 2018 百度 MapV'] - 版权信息。
 * @fires MapVLayer#loaded
 * @usage
 */
export var MapVLayer = L.Layer.extend({

    options: {
        attributionPrefix: null,
        attribution: Attributions.MapV.attribution
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
     * @function MapVLayer.prototype.onAdd
     * @description 添加地图图层。
     * @param {L.Map} map - Leaflet Map 对象。
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
        /**
         * @event MapVLayer#loaded
         * @description 图层添加完成之后触发。
         */
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
     * @function MapVLayer.prototype.onRemove
     * @description 删除地图图层。
     */
    onRemove: function () {
        L.DomUtil.remove(this.container);
        this.renderer.destroy();
    },

    /**
     * @function MapVLayer.prototype.addData
     * @description 添加数据。
     * @param {Object} data - 需要添加的数据。
     * @param {Object} options - 参数。
     */
    addData: function (data, options) {
        this.renderer.addData(data, options);
    },

    /**
     * @function MapVLayer.prototype.update
     * @description 更新图层。
     * @param {Object} opt - 待更新的数据。
     * @param {Object} data - mapv 数据集。
     * @param {Object} options - 参数。
     */
    update: function (opt) {
        this.renderer.update(opt);
    },

    /**
     * @function MapVLayer.prototype.getData
     * @description 获取数据。
     * @returns {Mapv.DataSet} mapv 数据集。
     */
    getData: function () {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    },

    /**
     * @function MapVLayer.prototype.removeData
     * @description 删除数据。
     * @param {Function} filter - 过滤条件。指定数据项后，返回值为 true，表示删除该元素；否则表示不删除。
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
     * @function MapVLayer.prototype.clearData
     * @description 清除数据。
     */
    clearData: function () {
        this.renderer.clearData();
    },

    /**
     * @function MapVLayer.prototype.draw
     * @description 绘制图层。
     */
    draw: function () {
        return this._reset();
    },

    /**
     * @function MapVLayer.prototype.setZIndex
     * @description 设置 canvas 层级。
     * @param {number} zIndex - canvas 层级。
     */
    setZIndex: function (zIndex) {
        this.canvas.style.zIndex = zIndex;
    },

    /**
     * @function MapVLayer.prototype.render
     * @description 渲染。
     */
    render: function () {
        this.renderer._canvasUpdate();
    },

    /**
     * @function MapVLayer.prototype.getCanvas
     * @description 获取 canvas。
     * @returns {HTMLElement} 返回 mapV 图层包含的 canvas 对象。
     */
    getCanvas: function () {
        return this.canvas;
    },

    /**
     * @function MapVLayer.prototype.getContainer
     * @description 获取容器。
     * @returns {HTMLElement} 返回包含 mapV 图层的 dom 对象。
     */
    getContainer: function () {
        return this.container;
    },

    /**
     * @function MapVLayer.prototype.getTopLeft
     * @description 获取左上角坐标。
     * @returns {L.Bounds} 返回左上角坐标。
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
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio || 1;
        if (!this.mapVOptions.context || this.mapVOptions.context === '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
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
