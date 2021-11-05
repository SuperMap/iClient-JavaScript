/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.WebPrintingJobCustomItems
 * @classdesc Web 打印图例元素参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {string} option.name - 图例元素的名称。
 * @param {string} [option.picAsUrl] - 图例元素 Base64 格式图片。
 * @param {string} [option.picAsBase64] - 图例元素图片的获取地址。
 */
export class WebPrintingJobCustomItems {
    constructor(option) {
        /**
         * @member {string} SuperMap.WebPrintingJobCustomItems.prototype.name
         * @description  图例元素的名称。
         */
        this.name = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobCustomItems.prototype.picAsUrl]
         * @description  图例元素 Base64 格式图片。
         */
        this.picAsUrl = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobCustomItems.prototype.picAsBase64]
         * @description  图例元素图片的获取地址。
         */
        this.picAsBase64 = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobCustomItems';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobCustomItems.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.name = null;
        me.picAsUrl = null;
        me.picAsBase64 = null;
    }

    /**
     * @function SuperMap.WebPrintingJobCustomItems.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobCustomItems 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            name: this.name
        };
        if (this.title) {
            params.title = this.title;
        }
        if (this.picAsUrl) {
            params.picAsUrl = this.picAsUrl;
        } else if (this.picAsBase64) {
            params.picAsBase64 = this.picAsBase64.replace(/^data:.+;base64,/, '');
        }
        return Util.toJSON(params);
    }
}

