/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.WebPrintingJobContent
 * @classdesc Web 打印内容参数类。
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {string} option.type - Web 打印内容支持的类型。目前支持的类型：WEBMAP
 * @param {string} [option.url] - 待打印的 SuperMap iPortal WebMap 的 url 地址。例如：http://supermapiportal:8190/iportal/web/maps/{mapid}/map.rjson
 * @param {string} [option.token] - 如果待打印的是 SuperMap iPortal 用户私有的 WebMap，需要提供 SuperMap iPortal 用户的 token。
 * @param {WebMapSummaryObject} [option.value] - 传递的是一个符合 SuperMap WebMap 规范的 WebMap 的 JSON 表达，也可以是一个完整的 SuperMap iPortal 数据上图制作的 WebMap 的 json 表达。如果已填了 url 参数，此参数可不传
 */
export class WebPrintingJobContent {
    constructor(option) {
        /**
         * @member {string} SuperMap.WebPrintingJobContent.prototype.type
         * @description Web 打印内容支持的类型。
         */
        this.type = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobContent.prototype.url]
         * @description 待打印的 SuperMap iPortal WebMap 的 url 地址。
         */
        this.url = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobContent.prototype.token]
         * @description 如果待打印的是 SuperMap iPortal 用户私有的 WebMap，需要提供 SuperMap iPortal 用户的 token。
         */
        this.token = null;
        /**
         * @member {WebMapSummaryObject} [SuperMap.WebPrintingJobContent.prototype.value]
         * @description 传递的是一个符合 SuperMap WebMap 规范的 WebMap 的 JSON 表达，也可以是一个完整的 SuperMap iPortal 数据上图制作的 WebMap 的 json 表达。
         */
        this.value = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobContent';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobContent.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.type = null || "WEBMAP";
        this.url = null;
        this.token = null;
        this.value = null;
    }

    /**
     * @function SuperMap.WebPrintingJobContent.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobContent 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            type: this.type
        };
        if (this.token) {
            params.token = this.token;
        }
        if (this.url) {
            params.url = this.url;
        } else if (this.value) {
            params.value = this.value;
        }
        return Util.toJSON(params);
    }
}

SuperMap.WebPrintingJobContent = WebPrintingJobContent;
