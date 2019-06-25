/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {
    MapvRenderer
} from "./mapv/MapvRenderer";
import {
    CommonUtil
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv 图层。
 * @param {mapboxgl.Map} map - mapboxgl 地图对象，将在下个版本弃用，请用 map.addLayer() 方法添加图层。
 * @param {Mapv.DataSet} dataSet - MapV 图层数据集。
 * @param {Object} mapVOptions - Mapv 参数。
 * @param {string} [mapVOptions.layerID] - 图层 ID。默认使用 CommonUtil.createUniqueID("mapvLayer_") 创建专题图层 ID。
 */
export class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.id = mapVOptions.layerID ? mapVOptions.layerID : CommonUtil.createUniqueID("mapvLayer_");
        delete mapVOptions["layerID"];

        this.mapVOptions = mapVOptions;
        this.dataSet = dataSet;
        this.visibility = true;

        //保留之前的用法
        if (this.map) {
            this.map.addLayer(this);
        }

    }

    onAdd(map) {
        this.map = map;
        this.renderer = new MapvRenderer(this.map, this, this.dataSet, this.mapVOptions);
        this.canvas = this._createCanvas();
        this.renderer._canvasUpdate();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.removeFromMap
     * @description 移除图层。
     */
    removeFromMap() {
        this.mapContainer.removeChild(this.canvas);
        this.clearData();
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.setVisibility
     * @description 设置图层可见性，设置图层的隐藏，显示，重绘的相应的可见标记。
     * @param {boolean} [visibility] - 是否显示图层（当前地图的 resolution 在最大最小 resolution 之间）。
     */
    setVisibility(visibility) {
        if (visibility !== this.visibility) {
            this.visibility = visibility;
            if (visibility) {
                this.show();
            } else {
                this.hide();
            }
        }
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param {string} layerID - 待插入的图层 ID。
     * @param {boolean} [before=true] - 是否将本图层插入到图层 id 为 layerID 的图层之前(如果为 false 则将本图层插入到图层 id 为 layerID 的图层之后)。
     */
    moveTo(layerID, before) {
        const layer = document.getElementById(this.canvas.id);
        before = before !== undefined ? before : true;
        if (before) {
            const beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        const nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }


    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getTopLeft
     * @description 获取左上的距离。
     */
    getTopLeft() {
        var map = this.map;
        var topLeft;
        if (map) {
            var bounds = map.getBounds();
            topLeft = bounds.getNorthWest();
        }
        return topLeft;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.addData
     * @description 追加数据。
     * @param {Object} data - 要追加的数据。
     * @param {Object} options - 要追加的值。
     */
    addData(data, options) {
        this.renderer.addData(data, options);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.update
     * @description 更新图层。
     * @param {Object} opt - 待更新的数据。
     * @param {Object} opt.data - mapv 数据集。
     * @param {Object} opt.options - mapv 绘制参数。
     */
    update(opt) {
        this.renderer.update(opt);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getData
     * @description 获取数据。
     * @returns {mapv.DataSet} mapv 数据集。
     */
    getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} [filter] - 过滤条件。条件参数为数据项，返回值为 true,表示删除该元素；否则表示不删除。
     * @example
     * filter=function(data){
     *    if(data.id=="1"){
     *      return true
     *    }
     *    return false;
     * }
     */
    removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.renderer.clearData();
    }

    show() {
        if (this.renderer) {
            this.renderer._show();
        }
        return this;
    }

    hide() {
        if (this.renderer) {
            this.renderer._hide();
        }
        return this;
    }

    _createCanvas() {
        var canvas = document.createElement('canvas');
        canvas.id = this.id;
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        canvas.width = parseInt(this.map.getCanvas().style.width) * devicePixelRatio;
        canvas.height = parseInt(this.map.getCanvas().style.height) * devicePixelRatio;
        if (!this.mapVOptions.context || this.mapVOptions.context == '2d') {
            canvas.getContext('2d').scale(devicePixelRatio, devicePixelRatio);
        }
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        return canvas;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.setZIndex
     * @description 设置 canvas 层级。
     * @param {number} zIndex - canvas 层级。
     */
    setZIndex(z) {
        this.canvas.style.zIndex = z;
    }

}

mapboxgl.supermap.MapvLayer = MapvLayer;