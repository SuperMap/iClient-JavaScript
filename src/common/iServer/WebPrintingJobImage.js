/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.WebPrintingJobImage
 * @classdesc 表达小地图的静态图片参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {string} [option.picAsUrl] - 小地图的图片 url 地址。
 * @param {string} [option.picAsBase64] - 小地图的base64位图片信息。
 */
export class WebPrintingJobImage {
    constructor(option) {
        /**
         * @member {string} [SuperMap.WebPrintingJobImage.prototype.picAsUrl]
         * @description 小地图的图片 url 地址。
         */
        this.picAsUrl = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobImage.prototype.picAsBase64]
         * @description 小地图的base64位图片信息。
         */
        this.picAsBase64 = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobImage';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobImage.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.picAsUrl = null;
        this.picAsBase64 = null;
    }

    /**
     * @function SuperMap.WebPrintingJobImage.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobImage 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
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

SuperMap.WebPrintingJobImage = WebPrintingJobImage;
