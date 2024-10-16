/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { MapVRenderer } from './mapv/MapVRenderer';

/**
 * @class SuperMap.Layer.MapVLayer
 * @category  Visualization MapV
 * @classdesc MapV 图层类。
 * @modulecategory Overlay
 * @extends {SuperMap.Layer}
 * @param {string} name - 图层名。
 * @param {Object} options - 可选参数。
 * @param {Mapv.DataSet} options.dataSet - MapV 的 dataSet 对象。
 * @param {Object} options.options - MapV 绘图风格配置信息。
 */
export class MapVLayer extends SuperMap.Layer {
    constructor(name, options) {
        super(name, options);

        /**
         * @member {Mapv.DataSet} SuperMap.Layer.MapVLayer.prototype.dataSet
         * @description MapV 的 dataset 对象。
         */
        this.dataSet = null;

        /**
         * @member {Object} SuperMap.Layer.MapVLayer.prototype.options
         * @description MapV 绘图风格配置信息。
         */
        this.options = null;

        /**
         * @member {boolean} [SuperMap.Layer.MapVLayer.prototype.supported=false]
         * @description 当前浏览器是否支持 canvas 绘制。决定了 MapV 图是否可用，内部判断使用。
         */
        this.supported = false;

        /**
         * @member {HTMLCanvasElement} SuperMap.Layer.MapVLayer.prototype.canvas
         * @description MapV 图主绘制面板。
         */
        this.canvas = null;

        /**
         * @private
         * @member {CanvasContext} SuperMap.Layer.MapVLayer.prototype.canvasContext
         * @description MapV 图主绘制对象。
         */
        this.canvasContext = null;

        if (options) {
          SuperMap.Util.extend(this, options);
        }

        //MapV图要求使用canvas绘制，判断是否支持
        this.canvas = document.createElement('canvas');
        if (!this.canvas.getContext) {
            return;
        }
        this.supported = true;
        //构建绘图面板
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = 0 + 'px';
        this.canvas.style.left = 0 + 'px';
        this.div.appendChild(this.canvas);
        var context = (this.options && this.options.context) || '2d';
        this.canvasContext = this.canvas.getContext(context);
        var global$2 = typeof window === 'undefined' ? {} : window;
        var devicePixelRatio = this.devicePixelRatio = global$2.devicePixelRatio || 1;
        if (context === '2d') {
            this.canvasContext.scale(devicePixelRatio, devicePixelRatio);
        }
        this.attribution =
            "© 2018 百度 <a href='https://mapv.baidu.com' target='_blank'>MapV</a> with <span>© <a target='_blank' href='https://iclient.supermap.io' " +
            "style='color: #08c;text-decoration: none;'>SuperMap iClient</a></span>";

        this.CLASS_NAME = 'SuperMap.Layer.MapVLayer';
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.destroy
     * @description 销毁此图层，销毁后此图层的所有属性为 null。
     * @override
     */
    destroy() {
        if (this.renderer && this.renderer.animator) {
            this.renderer.animator.stop();
            this.renderer.animator = null;
        }
        this.dataSet = null;
        this.options = null;
        this.renderer = null;
        this.supported = null;
        this.canvas = null;
        this.canvasContext = null;
        this.maxWidth = null;
        this.maxHeight = null;
        super.destroy();
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.addData
     * @description 追加数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
    addData(dataSet, options) {
        this.renderer && this.renderer.addData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.
     * @description 设置数据。
     * @param {Mapv.DataSet} dataSet - MapV 的 dataSet 对象。
     * @param {Object} options - MapV 绘图风格配置信息。
     */
    setData(dataSet, options) {
        this.renderer && this.renderer.setData(dataSet, options);
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.getData
     * @description 获取数据。
     * @returns {Mapv.DataSet} MapV 的 dataSet 对象。
     */
    getData() {
        if (this.renderer) {
            this.dataSet = this.renderer.getData();
        }
        return this.dataSet;
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.removeData
     * @description 删除符合过滤条件的数据。
     * @param {function} filter - 过滤条件。条件参数为数据项，返回值为 true，表示删除该元素；否则表示不删除。
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
     * @function SuperMap.Layer.MapVLayer.prototype.clearData
     * @description 清除数据。
     */
    clearData() {
        this.renderer.clearData();
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.setMap
     * @description 图层已经添加到 Map 中。
     *              如果当前浏览器支持 canvas，则开始渲染要素；如果不支持则移除图层。
     * @param {SuperMap.Map} map - 需要绑定的 map 对象。
     */
    setMap(map) {
        super.setMap(map);
        this.renderer = new MapVRenderer(map, this, this.dataSet, this.options);
        this.renderer.devicePixelRatio = this.devicePixelRatio;
        if (!this.supported) {
            this.map.removeLayer(this);
        } else {
            this.redraw();
        }
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.moveTo
     * @description 重置当前 MapV 图层的 div，再一次与 Map 控件保持一致。
     *              修改当前显示范围，当平移或者缩放结束后开始重绘 MapV 图的渲染效果。
     * @param {SuperMap.Bounds} bounds - 图层范围。
     * @param {boolean} [zoomChanged] - 缩放级别是否改变。
     * @param {boolean} [dragging] - 是否拖动。
     */
    moveTo(bounds, zoomChanged, dragging) {
        super.moveTo(bounds, zoomChanged, dragging);
        if (!this.supported) {
            return;
        }
        this.zoomChanged = zoomChanged;
        if (!dragging) {
            this.div.style.visibility = 'hidden';
            this.div.style.left = -parseInt(this.map.layerContainerDiv.style.left) + 'px';
            this.div.style.top = -parseInt(this.map.layerContainerDiv.style.top) + 'px';
            /*this.canvas.style.left = this.div.style.left;
             this.canvas.style.top = this.div.style.top;*/
            var size = this.map.getSize();
            this.div.style.width = parseInt(size.w) + 'px';
            this.div.style.height = parseInt(size.h) + 'px';
            if (this.options.draw === 'heatmap') {
                this.canvas.width = parseInt(size.w) * this.devicePixelRatio;
                this.canvas.height = parseInt(size.h) * this.devicePixelRatio;
            } else {
                this.canvas.width = parseInt(size.w);
                this.canvas.height = parseInt(size.h);
            }

            this.canvas.style.width = this.div.style.width;
            this.canvas.style.height = this.div.style.height;
            this.maxWidth = size.w;
            this.maxHeight = size.h;
            this.div.style.visibility = '';
            if (!zoomChanged) {
                this.renderer && this.renderer.render();
            }
        }

        if (zoomChanged) {
            this.renderer && this.renderer.render();
        }
    }

    /**
     * @function SuperMap.Layer.MapVLayer.prototype.transferToMapLatLng
     * @description 将经纬度转成底图的投影坐标。
     * @param {SuperMap.LonLat} latLng - 经纬度坐标。
     * @deprecated
     */
    transferToMapLatLng(latLng) {
        var source = 'EPSG:4326',
            dest = 'EPSG:4326';
        var unit = this.map.getUnits() || 'degree';
        if (['m', 'meter'].indexOf(unit.toLowerCase()) > -1) {
            dest = 'EPSG:3857';
        }
        return new SuperMap.LonLat(latLng.lon, latLng.lat).transform(source, dest);
    }
}
SuperMap.Layer.MapVLayer = MapVLayer;
