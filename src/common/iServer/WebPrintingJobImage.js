/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class WebPrintingJobImage
 * @deprecatedclass SuperMap.WebPrintingJobImage
 * @classdesc 表达小地图的静态图片参数类。此类用于设置小地图使用的静态图片的 URL 或 Base64 位图片信息等参数。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 参数。
 * @param {string} option.picAsUrl - 小地图的图片 URL 地址。
 * @param {string} [option.picAsBase64] - 小地图的 Base64 位图片信息。如果已填了 URL 参数，此参数可不传。
 * @usage
 */
export class WebPrintingJobImage {
    constructor(option) {
        /**
         * @member {string} [WebPrintingJobImage.prototype.picAsUrl]
         * @description 小地图的图片 URL 地址。
         */
        this.picAsUrl = null;
        /**
         * @member {string} [WebPrintingJobImage.prototype.picAsBase64]
         * @description 小地图的 Base64 位图片信息。
         */
        this.picAsBase64 = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobImage';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobImage.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.picAsUrl = null;
        this.picAsBase64 = null;
    }

    /**
     * @function WebPrintingJobImage.prototype.toJSON
     * @description 将 WebPrintingJobImage 对象转化为 JSON 字符串。
     * @returns {string} 转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {};
        if (this.picAsUrl) {
            params.picAsUrl = this.picAsUrl;
        }
        if (this.picAsBase64) {
            params.picAsBase64 = this.picAsBase64.replace(/^data:.+;base64,/, '');
        }
        return Util.toJSON(params);
    }
}

