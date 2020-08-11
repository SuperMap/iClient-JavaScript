/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { WebPrintingJobImage } from './WebPrintingJobImage';
import { WebPrintingJobLayers } from './WebPrintingJobLayers';

/**
 * @class SuperMap.WebPrintingJobLittleMapOptions
 * @classdesc Web 打印内容参数类。
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>} option.center - 小地图的中心点。
 * @param {number} [option.scale] - 小地图的比例尺。
 * @param {Array.<string>} [option.layerNames] - 指定 WebMap中图层名称的列表，用于渲染小地图。
 * @param {SuperMap.WebPrintingJobImage} [option.image] - 表达小地图的静态图类。
 * @param {SuperMap.WebPrintingJobLayers} [option.layers] - 指定 WebMap 中的 layers 图层类。
 */

export class WebPrintingJobLittleMapOptions {
    constructor(option) {
        /**
         * @member {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>} SuperMap.WebPrintingJobLittleMapOptions.prototype.center
         * @description 小地图的中心点。
         */
        this.center = null;
        /**
         * @member {number} [SuperMap.WebPrintingJobLittleMapOptions.prototype.scale]
         * @description 小地图的比例尺。
         */
        this.scale = null;
        /**
         * @member {Array.<string>} SuperMap.WebPrintingJobLittleMapOptions.prototype.layerNames
         * @description 指定 WebMap中图层名称的列表，用于渲染小地图。
         */
        this.layerNames = null;
        /**
         * @member {SuperMap.WebPrintingJobImage} [SuperMap.WebPrintingJobLittleMapOptions.prototype.image]
         * @description 表达小地图的静态图类。暂不支持
         */
        this.image = null;
        /**
         * @member {SuperMap.WebPrintingJobLayers} [SuperMap.WebPrintingJobLittleMapOptions.prototype.layers]
         * @description 指定 WebMap 中的 layers 图层类。
         */
        this.layers = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobLittleMapOptions';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobLittleMapOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.center = null;
        this.scale = null;
        this.layerNames = null;
        if (this.image instanceof WebPrintingJobImage) {
            this.image.destroy();
            this.image = null;
        }
        if (this.layers instanceof WebPrintingJobLayers) {
            this.layers.destroy();
            this.layers = null;
        }
    }

    /**
     * @function SuperMap.WebPrintingJobLittleMapOptions.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobLittleMapOptions 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            scale: this.scale,
            center: this.center
        };
        if (this.layerNames) {
            params.layerNames = this.layerNames;
        } else if (this.layers) {
            params.layers = this.layers;
        }
        return Util.toJSON(params);
    }
}

SuperMap.WebPrintingJobLittleMapOptions = WebPrintingJobLittleMapOptions;
