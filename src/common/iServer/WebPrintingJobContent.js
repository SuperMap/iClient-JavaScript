/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class WebPrintingJobContent
 * @deprecatedclass SuperMap.WebPrintingJobContent
 * @classdesc Web 打印内容参数类。此类用于设置Web打印内容的类型、待打印Web地图的URL地址、JSON表达等参数。<br>
 * 目前支持打印的 Web 内容为 WebMap，即：在线创建的地图。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 参数。
 * @param {string} option.type - Web 打印内容支持的类型。目前支持的类型：WEBMAP。
 * @param {string} [option.url] - 待打印的 SuperMap iPortal WebMap 的 URL 地址。例如：http://supermapiportal:8190/iportal/web/maps/{mapid}/map.rjson 。
 * @param {string} [option.token] - 如果待打印的是 SuperMap iPortal 用户私有的 WebMap，需要提供 SuperMap iPortal 用户的 token。
 * @param {WebMapSummaryObject} [option.value] - 传递的是一个符合 SuperMap WebMap 规范的 WebMap 的 JSON 表达，也可以是一个完整的 SuperMap iPortal 数据上图制作的 WebMap 的 JSON 表达。如果已填了 URL 参数，此参数可不传。
 * @usage
 */
export class WebPrintingJobContent {
    constructor(option) {
        /**
         * @member {string} WebPrintingJobContent.prototype.type
         * @description Web 打印内容支持的类型。
         */
        this.type = null;
        /**
         * @member {string} [WebPrintingJobContent.prototype.url]
         * @description 待打印的 SuperMap iPortal WebMap 的 URL 地址。
         */
        this.url = null;
        /**
         * @member {string} [WebPrintingJobContent.prototype.token]
         * @description 如果待打印的是 SuperMap iPortal 用户私有的 WebMap，需要提供 SuperMap iPortal 用户的 token。
         */
        this.token = null;
        /**
         * @member {WebMapSummaryObject} [WebPrintingJobContent.prototype.value]
         * @description 传递的是一个符合 SuperMap WebMap 规范的 WebMap 的 JSON 表达，也可以是一个完整的 SuperMap iPortal 数据上图制作的 WebMap 的 JSON 表达。
         */
        this.value = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobContent';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobContent.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.type = null || "WEBMAP";
        this.url = null;
        this.token = null;
        this.value = null;
    }

    /**
     * @function WebPrintingJobContent.prototype.toJSON
     * @description 将 WebPrintingJobContent 对象转化为 JSON 字符串。
     * @returns {string} 转换后的 JSON 字符串。
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

