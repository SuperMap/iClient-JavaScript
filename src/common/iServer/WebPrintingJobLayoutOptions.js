/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { WebPrintingJobScaleBarOptions } from './WebPrintingJobScaleBarOptions';
import { WebPrintingJobNorthArrowOptions } from './WebPrintingJobNorthArrowOptions';
import { WebPrintingJobLittleMapOptions } from './WebPrintingJobLittleMapOptions';
import { WebPrintingJobLegendOptions } from './WebPrintingJobLegendOptions';

/**
 * @class WebPrintingJobLayoutOptions
 * @deprecatedclass SuperMap.WebPrintingJobLayoutOptions
 * @classdesc Web 打印的布局参数类。
 * @version 10.1.0
 * @category iServer WebPrintingJob
 * @param {Object} option - 参数。
 * @param {string} option.templateName - 布局模板的名称。
 * @param {string} option.title - 地图主标题名称。
 * @param {string} option.subTitle - 地图副标题名称。
 * @param {string} option.author - 地图作者名称。
 * @param {string} option.copyright - 版权描述信息。
 * @param {string} [option.summaryText] - 自定义描述信息。
 * @param {string} [option.time] - 打印时间。
 * @param {WebPrintingJobLittleMapOptions} [option.littleMapOptions] - 小地图参数类。
 * @param {WebPrintingJobLegendOptions} [option.legendOptions] - 图例参数类。
 * @param {WebPrintingJobScaleBarOptions} [option.scaleBarOptions] - 地图比例尺参数类。
 * @param {WebPrintingJobNorthArrowOptions} [option.northArrowOptions] - 地图指北针参数类。
 * @usage
 */
export class WebPrintingJobLayoutOptions {
    constructor(option) {
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.templateName
         * @description 布局模板的名称。
         */
        this.templateName = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.title
         * @description 地图主标题名称。
         */
        this.title = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.subTitle
         * @description 地图副标题名称。
         */
        this.subTitle = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.author
         * @description 地图作者名称。
         */
        this.author = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.copyright
         * @description 地图版权信息。
         */
        this.copyright = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.summaryText
         * @description 自定义描述信息。
         */
        this.summaryText = null;
        /**
         * @member {string} WebPrintingJobLayoutOptions.prototype.time
         * @description 打印时间
         */
        this.time = null;
        /**
         * @member {WebPrintingJobScaleBarOptions} [WebPrintingJobLayoutOptions.prototype.scaleBarOptions]
         * @description 地图比例尺参数类。
         */
        this.scaleBarOptions = null;
        /**
         * @member {WebPrintingJobNorthArrowOptions} [WebPrintingJobLayoutOptions.prototype.northArrowOptions]
         * @description 地图指北针参数类。
         */
        this.northArrowOptions = null;
        /**
         * @member {WebPrintingJobLittleMapOptions} WebPrintingJobLayoutOptions.prototype.littleMapOptions
         * @description 小地图参数类。
         */
        this.littleMapOptions = null;
        /**
         * @member {WebPrintingJobLegendOptions} WebPrintingJobLayoutOptions.prototype.legendOptions
         * @description 图例参数类。
         */
        this.legendOptions = null;

        this.CLASS_NAME = 'SuperMap.WebPrintingJobLayoutOptions';
        Util.extend(this, option);
    }

    /**
     * @function WebPrintingJobLayoutOptions.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.templateName = null;
        this.title = null;
        this.subTitle = null;
        this.author = null;
        this.copyright = null;
        this.summaryText = null;
        this.time = null;
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
}

