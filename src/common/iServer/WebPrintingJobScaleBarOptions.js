/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class WebPrintingJobScaleBarOptions
 * @deprecatedclass SuperMap.WebPrintingJobScaleBarOptions
 * @classdesc Web 打印比例尺参数类。
 * @category iServer WebPrintingJob
 * @version 10.1.0
 * @param {Object} option - 参数。
 * @param {string} [option.scaleText] - 比例尺文本信息。例如：1:1000000。
 * @param {WebScaleOrientationType} [option.orientation] - 比例尺的方位样式。
 * @param {WebScaleType} [option.type] - 比例尺的样式。
 * @param {number} [option.intervals] - 比例尺条的段数。
 * @param {WebScaleUnit} [option.unit] - 比例尺的单位制。
 * @usage
 */
export class WebPrintingJobScaleBarOptions {
    constructor(option) {
        /**
         * @member {string} WebPrintingJobScaleBarOptions.prototype.scaleText
         * @description 比例尺文本信息。
         */
        this.scaleText = null;
        /**
         * @member {WebScaleOrientationType} [WebPrintingJobScaleBarOptions.prototype.orientation]
         * @description 比例尺的方位样式。
         */
        this.orientation = null;
        /**
         * @member {WebScaleType} [WebPrintingJobScaleBarOptions.prototype.type]
         * @description 比例尺的样式。
         */
        this.type = null;
        /**
         * @member {Object} [WebPrintingJobScaleBarOptions.prototype.intervals]
         * @description 比例尺条的段数。
         */
        this.intervals = null;
        /**
         * @member {WebScaleUnit} [WebPrintingJobScaleBarOptions.prototype.unit]
         * @description 比例尺的单位制。
         */
        this.unit = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobScaleBarOptions';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobScaleBarOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.scaleText = null;
        this.orientation = null;
        this.type = null;
        this.intervals = null;
        this.unit = null;
    }

    /**
     * @function WebPrintingJobScaleBarOptions.prototype.toJSON
     * @description 将 WebPrintingJobScaleBarOptions 对象转化为 JSON 字符串。
     * @returns {string} 转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            scaleText: this.scaleText || "",
            type: this.type || "BAR",
            intervals: this.intervals || "",
            unit: this.unit || "METER"
        };
        if (this.orientation) {
            params.orientation = this.orientation;
        }
        return Util.toJSON(params);
    }
}

