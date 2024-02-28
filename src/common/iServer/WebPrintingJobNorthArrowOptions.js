/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class WebPrintingJobNorthArrowOptions
 * @deprecatedclass SuperMap.WebPrintingJobNorthArrowOptions
 * @classdesc Web 打印地图指北针参数类。此类用于设置 Web 打印地图指北针的图片元素，可传入 Base64 位图片信息，也可传入图片 URL 地址。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 参数。
 * @param {string} option.picAsUrl - 指北针的图片 URL 地址。
 * @param {string} [option.picAsBase64] - 指北针的 Base64 位图片信息。
 * @usage
 */
export class WebPrintingJobNorthArrowOptions {
    constructor(option) {
        /**
         * @member {string} WebPrintingJobNorthArrowOptions.prototype.picAsUrl
         * @description 指北针的图片 URL 地址。
         */
        this.picAsUrl = null;
        /**
         * @member {string} [WebPrintingJobNorthArrowOptions.prototype.picAsBase64]
         * @description 指北针的 Base64 位图片信息。
         */
        this.picAsBase64 = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobNorthArrowOptions';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobNorthArrowOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.picAsUrl = null;
        this.picAsBase64 = null;
    }

    /**
     * @function WebPrintingJobNorthArrowOptions.prototype.toJSON
     * @description 将 WebPrintingJobNorthArrowOptions 对象转化为 JSON 字符串。
     * @returns {string} 转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {};
        if (this.picAsUrl) {
            params.picAsUrl = this.picAsUrl;
        } else if (this.picAsBase64) {
            params.picAsBase64 = this.picAsBase64.replace(/^data:.+;base64,/, '');
        }
        return Util.toJSON(params);
    }
}

