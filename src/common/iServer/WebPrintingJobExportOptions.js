/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class WebPrintingJobExportOptions
 * @deprecatedclass SuperMap.WebPrintingJobExportOptions
 * @classdesc Web 打印的输出参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 参数。
 * @param {WebExportFormatType} option.format - Web 打印输出的格式，目前支持：PNG、PDF。
 * @param {number} [option.dpi=96] - Web 打印输出的分辨率，单位为每英寸点数。默认值为 96 dpi。
 * @param {number} [option.scale] - Web 打印输出的地图比例尺。
 * @param {number} [option.rotation] - Web 打印输出的地图角度。
 * @param {GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>} [option.center] - Web 打印输出的地图中心点。
 * @usage
 */
export class WebPrintingJobExportOptions {
    constructor(option) {
        /**
         * @member {WebExportFormatType} WebPrintingJobExportOptions.prototype.format
         * @description Web 打印输出的格式。
         */
        this.format = null;
        /**
         * @member {number} [WebPrintingJobExportOptions.prototype.dpi=96]
         * @description  Web 打印输出的分辨率，单位为每英寸点数。
         */
        this.dpi = 96;
        /**
         * @member {number} [WebPrintingJobExportOptions.prototype.scale]
         * @description Web 打印输出的地图比例尺。
         */
        this.scale = null;
        /**
         * @member {number} [WebPrintingJobExportOptions.prototype.rotation]
         * @description Web 打印输出的地图角度。
         */
        this.rotation = null;
        /**
         * @member {GeometryPoint|L.Point|L.LatLng|ol.geom.Point|mapboxgl.LngLat|mapboxgl.Point|Array.<number>} [WebPrintingJobExportOptions.prototype.center]
         * @description Web 打印输出的地图中心点。
         */
        this.center = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobExportOptions';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobExportOptions.prototype.destroy
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
     * @function WebPrintingJobExportOptions.prototype.toJSON
     * @description 将 WebPrintingJobExportOptions 对象转化为 JSON 字符串。
     * @returns {string} 转换后的 JSON 字符串。
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

