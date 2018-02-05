import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {MapvRenderer} from "./mapv/MapvRenderer";

/**
 * @class mapboxgl.supermap.MapvLayer
 * @category  Visualization MapV
 * @classdesc Mapv图层
 * @param map - {Object} 地图
 * @param dataSet -{Object} 数据集
 * @param mapVOptions -{Object} Mapv参数
 */
export class MapvLayer {

    constructor(map, dataSet, mapVOptions) {
        this.map = map;
        this.layerID = mapVOptions.layerID;
        delete mapVOptions["layerID"];
        this.renderer = new MapvRenderer(map, this, dataSet, mapVOptions);
        this.mapVOptions = mapVOptions;
        this.canvas = this._createCanvas();
        this.renderer._canvasUpdate();
        this.mapContainer = map.getCanvasContainer();
        this.mapContainer.appendChild(this.canvas);
        this.mapContainer.style.perspective = this.map.transform.cameraToCenterDistance + 'px';
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getTopLeft
     * @description 获取左上的距离
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
     * @description 追加数据
     * @param data - {Object} 要追加的数据
     * @param options -{Object} 要追加的值
     */
    addData(data, options) {
        this.renderer.addData(data, options);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.update
     * @description 更新图层
     * @param opt - {Object} 待更新的数据<br>
     *        data -{Object} mapv数据集<br>
     *        options -{Object} mapv绘制参数<br>
     */
    update(opt) {
        this.renderer.update(opt);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.getData
     * @description 获取数据
     * @return {mapv.DataSet} mapv数据集
     */
    getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.removeData
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
    removeData(filter) {
        this.renderer && this.renderer.removeData(filter);
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.clearData
     * @description 清除数据
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
        canvas.id = this.layerID;
        canvas.style.position = 'absolute';
        canvas.style.top = 0 + "px";
        canvas.style.left = 0 + "px";
        canvas.width = parseInt(this.map.getCanvas().style.width);
        canvas.height = parseInt(this.map.getCanvas().style.height);
        canvas.style.width = this.map.getCanvas().style.width;
        canvas.style.height = this.map.getCanvas().style.height;
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio;
        if (this.mapVOptions.context == '2d') {
            canvas.getContext(this.mapVOptions.context).scale(devicePixelRatio, devicePixelRatio);
        }
        return canvas;
    }

    /**
     * @function mapboxgl.supermap.MapvLayer.prototype.moveTo
     * @description 将图层移动到某个图层之前。
     * @param layerID - {string} 待插入的图层ID。
     * @param before - {boolean} 是否将本图层插入到图层id为layerID的图层之前(默认为true，如果为false则将本图层插入到图层id为layerID的图层之后)。
     */
    moveTo(layerID, before) {
        var layer = document.getElementById(this.layerID);
        before = before !== undefined ? before : true;
        if (before) {
            var beforeLayer = document.getElementById(layerID);
            if (layer && beforeLayer) {
                beforeLayer.parentNode.insertBefore(layer, beforeLayer);
            }
            return;
        }
        var nextLayer = document.getElementById(layerID);
        if (layer) {
            if (nextLayer.nextSibling) {
                nextLayer.parentNode.insertBefore(layer, nextLayer.nextSibling);
                return;
            }
            nextLayer.parentNode.appendChild(layer);
        }
    }

}

mapboxgl.supermap.MapvLayer = MapvLayer;