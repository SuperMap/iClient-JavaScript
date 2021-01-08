/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.WebPrintingJobExportOptions
 * @classdesc Web 打印的输出参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {SuperMap.WebExportFormatType} option.format - Web 打印输出的格式，目前支持：PNG、PDF。
 * @param {number} [option.dpi=96] - Web 打印输出的分辨率，单位为每英寸点数。默认值为 96 dpi。
 * @param {number} [option.scale] - Web 打印输出的地图比例尺。
 * @param {number} [option.rotation] - Web 打印输出的地图角度。
 * @param {SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>} [option.center] - Web 打印输出的地图中心点。
 */
export class WebPrintingJobExportOptions {
    constructor(option) {
        /**
         * @member {SuperMap.WebExportFormatType} SuperMap.WebPrintingJobExportOptions.prototype.format
         * @description Web 打印输出的格式。
         */
        this.format = null;
        /**
         * @member {number} [SuperMap.WebPrintingJobExportOptions.prototype.dpi=96]
         * @description  Web 打印输出的分辨率，单位为每英寸点数。
         */
        this.dpi = 96;
        /**
         * @member {number} [SuperMap.WebPrintingJobExportOptions.prototype.scale]
         * @description Web 打印输出的地图比例尺。
         */
        this.scale = null;
        /**
         * @member {number} [SuperMap.WebPrintingJobExportOptions.prototype.rotation]
         * @description Web 打印输出的地图角度。
         */
        this.rotation = null;
        /**
         * @member {Array.<(SuperMap.Geometry.Point|L.Point|L.LatLng|ol.geom.Point)>} [SuperMap.WebPrintingJobExportOptions.prototype.center]
         * @description Web 打印输出的地图中心点。
         */
        this.center = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobExportOptions';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobExportOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.format = null;
        this.dpi = null;
        this.scale = null;
        this.rotation = null;
        this.center = null;
        this.outputSize = null;
    }

    /**
     * @function SuperMap.WebPrintingJobExportOptions.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobExportOptions 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            format: this.format || "PDF",
            dpi: this.dpi,
            scale: this.scale,
            center: this.center
        };
        if (this.rotation) {
            params.rotation = this.rotation;
        }
        if (this.outputSize) {
            params.outputSize = this.outputSize;
        }
        return Util.toJSON(params);
    }
}

SuperMap.WebPrintingJobExportOptions = WebPrintingJobExportOptions;
