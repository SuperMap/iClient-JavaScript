/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { WebPrintingJobLayers } from './WebPrintingJobLayers';
import { WebPrintingJobCustomItems } from './WebPrintingJobCustomItems';

/**
 * @class SuperMap.WebPrintingJobLegendOptions
 * @classdesc 图例参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {string} [option.title] - 图例名称。
 * @param {string} [option.picAsUrl] - 图例的图片 url 地址。
 * @param {string} [option.picAsBase64] - 图例的 base64 位图片信息。
 * @param {SuperMap.WebPrintingJobLayers} [option.layers] - 图例的布局业务图层参数类。
 * @param {SuperMap.WebPrintingJobCustomItems} [option.customItems] - 自定义图例元素参数类。
 */
export class WebPrintingJobLegendOptions {
    constructor(option) {
        /**
         * @member {string} SuperMap.WebPrintingJobLegendOptions.prototype.title
         * @description  图例名称。
         */
        this.title = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobLegendOptions.prototype.picAsUrl]
         * @description  图例的图片 url 地址。
         */
        this.picAsUrl = null;
        /**
         * @member {string} [SuperMap.WebPrintingJobLegendOptions.prototype.picAsBase64]
         * @description  图例的 base64 位图片信息。
         */
        this.picAsBase64 = null;
        /**
         * @member {SuperMap.WebPrintingJobLayers} [SuperMap.WebPrintingJobLegendOptions.prototype.layers]
         * @description  图例的布局业务图层参数类。
         */
        this.layers = null;
        /**
         * @member {SuperMap.WebPrintingJobCustomItems} [SuperMap.WebPrintingJobLegendOptions.prototype.customItems]
         * @description  自定义图例元素参数类。
         */
        this.customItems = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobLegendOptions';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobLegendOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.title = null;
        this.picAsUrl = null;
        this.picAsBase64 = null;
        if (this.layers instanceof WebPrintingJobLayers) {
            this.layers.destroy();
            this.layers = null;
        }
        if (this.customItems instanceof WebPrintingJobCustomItems) {
            this.customItems.destroy();
            this.customItems = null;
        }
    }

    /**
     * @function SuperMap.WebPrintingJobLegendOptions.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobLegendOptions 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            title: this.title || ""
        };
        if (this.picAsUrl) {
            params.picAsUrl = this.picAsUrl;
        } else if (this.picAsBase64) {
            params.picAsBase64 = this.picAsBase64.replace(/^data:.+;base64,/, '');
        } else if (this.customItems) {
            params.customItems = this.customItems;
        }
        return Util.toJSON(params);
    }
}

SuperMap.WebPrintingJobLegendOptions = WebPrintingJobLegendOptions;
