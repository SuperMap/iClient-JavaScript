/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { WebPrintingJobScaleBarOptions } from './WebPrintingJobScaleBarOptions';
import { WebPrintingJobNorthArrowOptions } from './WebPrintingJobNorthArrowOptions';
import { WebPrintingJobLittleMapOptions } from './WebPrintingJobLittleMapOptions';
import { WebPrintingJobLegendOptions } from './WebPrintingJobLegendOptions';

/**
 * @class SuperMap.WebPrintingJobLayoutOptions
 * @classdesc Web 打印的布局参数类。
 * @category iServer WebPrintingJob
 * @param {Object} option - 初始化参数。
 * @param {string} option.templateName - 布局模板的名称。
 * @param {string} option.title - 地图主标题名称。
 * @param {string} option.subTitle - 地图副标题名称。
 * @param {string} option.author - 地图作者名称。
 * @param {string} option.copyright - 地图版权信息。
 * @param {SuperMap.WebPrintingJobLittleMapOptions} option.littleMapOptions - 小地图参数类。
 * @param {SuperMap.WebPrintingJobLegendOptions} option.legendOptions - 图例参数类。
 * @param {SuperMap.WebPrintingJobScaleBarOptions} [option.scaleBarOptions] - 地图比例尺参数类。
 * @param {SuperMap.WebPrintingJobNorthArrowOptions} [option.northArrowOptions] - 地图指北针参数类。
 */
export class WebPrintingJobLayoutOptions {
    constructor(option) {
        /**
         * @member {string} SuperMap.WebPrintingJobLayoutOptions.prototype.templateName
         * @description 布局模板的名称。
         */
        this.templateName = null;
        /**
         * @member {string} SuperMap.WebPrintingJobLayoutOptions.prototype.title
         * @description 地图主标题名称。
         */
        this.title = null;
        /**
         * @member {string} SuperMap.WebPrintingJobLayoutOptions.prototype.subTitle
         * @description 地图副标题名称。
         */
        this.subTitle = null;
        /**
         * @member {string} SuperMap.WebPrintingJobLayoutOptions.prototype.author
         * @description 地图作者名称。
         */
        this.author = null;
        /**
         * @member {string} SuperMap.WebPrintingJobLayoutOptions.prototype.copyright
         * @description 地图版权信息。
         */
        this.copyright = null;
        /**
         * @member {SuperMap.WebPrintingJobScaleBarOptions} [SuperMap.WebPrintingJobLayoutOptions.prototype.scaleBarOptions]
         * @description 地图比例尺参数类。
         */
        this.scaleBarOptions = null;
        /**
         * @member {SuperMap.WebPrintingJobNorthArrowOptions} [SuperMap.WebPrintingJobLayoutOptions.prototype.northArrowOptions]
         * @description 地图指北针参数类。
         */
        this.northArrowOptions = null;
        /**
         * @member {SuperMap.WebPrintingJobLittleMapOptions} SuperMap.WebPrintingJobLayoutOptions.prototype.littleMapOptions
         * @description 小地图参数类。
         */
        this.littleMapOptions = null;
        /**
         * @member {SuperMap.WebPrintingJobLegendOptions} SuperMap.WebPrintingJobLayoutOptions.prototype.legendOptions
         * @description 图例参数类。
         */
        this.legendOptions = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobLayoutOptions';
        Util.extend(this, option);
    }

    /**
     * @function SuperMap.WebPrintingJobLayoutOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.templateName = null;
        this.title = null;
        this.subTitle = null;
        this.author = null;
        this.copyright = null;
        if (this.scaleBarOptions instanceof WebPrintingJobScaleBarOptions) {
            this.scaleBarOptions.destroy();
            this.scaleBarOptions = null;
        }
        if (this.northArrowOptions instanceof WebPrintingJobNorthArrowOptions) {
            this.northArrowOptions.destroy();
            this.northArrowOptions = null;
        }
        if (this.littleMapOptions instanceof WebPrintingJobLittleMapOptions) {
            this.littleMapOptions.destroy();
            this.littleMapOptions = null;
        }
        if (this.legendOptions instanceof WebPrintingJobLegendOptions) {
            this.legendOptions.destroy();
            this.legendOptions = null;
        }
    }

    /**
     * @function SuperMap.WebPrintingJobLayoutOptions.prototype.toJSON
     * @description 将 SuperMap.WebPrintingJobLayoutOptions 对象转化为 JSON 字符串。
     * @returns {string} 返回转换后的 JSON 字符串。
     */
    toJSON() {
        var params = {
            templateName: this.templateName,
            title: this.title,
            subTitle: this.subTitle,
            author: this.author,
            copyright: this.copyright
        };
        if (this.scaleBarOptions) {
            params.scaleBarOptions = this.scaleBarOptions;
        }
        if (this.northArrowOptions) {
            params.northArrowOptions = this.northArrowOptions;
        }
        if (this.littleMapOptions) {
            params.littleMapOptions = this.littleMapOptions;
        }
        if (this.legendOptions) {
            params.legendOptions = this.legendOptions;
        }
        return Util.toJSON(params);
    }
}

SuperMap.WebPrintingJobLayoutOptions = WebPrintingJobLayoutOptions;
