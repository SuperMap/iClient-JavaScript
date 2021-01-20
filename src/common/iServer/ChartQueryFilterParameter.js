/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ChartQueryFilterParameter
 * @category  iServer Map Chart
 * @classdesc 海图查询过滤参数类，用于设置海图查询的过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
 * @param {Object} options - 参数。 
 * @param {string} options.attributeFilter - 属性字段过滤条件。 
 * @param {number} options.chartFeatureInfoSpecCode - 查询的物标代号。
 * @param {boolean} [options.isQueryPoint] - 是否查询点。 
 * @param {boolean} [options.isQueryLine] - 是否查询线。 
 * @param {boolean} [options.isQueryRegion] - 是否查询面。 
 */
export class ChartQueryFilterParameter {


    constructor(options) {
        /**
         * @member {boolean} [SuperMap.ChartQueryFilterParameter.prototype.isQueryPoint]
         * @description 是否查询点。
         */
        this.isQueryPoint = null;

        /**
         * @member {boolean} [SuperMap.ChartQueryFilterParameter.prototype.isQueryLine]
         * @description 是否查询线。
         */
        this.isQueryLine = null;

        /**
         * @member {boolean} [SuperMap.ChartQueryFilterParameter.prototype.isQueryRegion]
         * @description 是否查询面。
         */
        this.isQueryRegion = null;

        /**
         * @member {string} SuperMap.ChartQueryFilterParameter.prototype.attributeFilter
         * @description 属性字段过滤条件。
         */
        this.attributeFilter = null;

        /**
         * @member {number} SuperMap.ChartQueryFilterParameter.prototype.chartFeatureInfoSpecCode
         * @description 查询的物标代号。
         */
        this.chartFeatureInfoSpecCode = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.ChartQueryFilterParameter";
    }

    /**
     * @function SuperMap.ChartQueryFilterParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isQueryPoint = null;
        me.isQueryLine = null;
        me.isQueryRegion = null;
        me.attributeFilter = null;
        me.chartFeatureInfoSpecCode = null;
    }

    /**
     * @function SuperMap.ChartQueryFilterParameter.prototype.toJson
     * @description 将属性信息转化成 JSON 格式字符串。
     */
    toJson() {
        var json = "";
        json += "\"isQueryPoint\":" + this.isQueryPoint + ",";
        json += "\"isQueryLine\":" + this.isQueryLine + ",";
        json += "\"isQueryRegion\":" + this.isQueryRegion + ",";
        if (this.attributeFilter) {
            json += "\"attributeFilter\": \"" + this.attributeFilter + "\",";
        }
        json += "\"chartFeatureInfoSpecCode\":" + this.chartFeatureInfoSpecCode;
        json = "{" + json + "}";
        return json;
    }


}

SuperMap.ChartQueryFilterParameter = ChartQueryFilterParameter;