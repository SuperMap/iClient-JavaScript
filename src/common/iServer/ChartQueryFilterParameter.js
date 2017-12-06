import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.ChartQueryFilterParameter
 * @classdesc 海图查询过滤参数类，用于设置海图查询的过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
 * @param options - {Object} 可选参数。如：<br>
 *        isQueryPoint - {boolean} 是否查询点。<br>
 *        isQueryLine  - {boolean} 是否查询线。<br>
 *        isQueryRegion  - {boolean} 是否查询面。<br>
 *        attributeFilter - {string} 属性字段过滤条件。<br>
 *        chartFeatureInfoSpecCode - {number}查询的物标代号。
 */
export class ChartQueryFilterParameter {

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryPoint -{boolean}
     * @description 是否查询点。
     */
    isQueryPoint = null;

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryLine -{boolean}
     * @description 是否查询线。
     */
    isQueryLine = null;

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryRegion -{boolean}
     * @description 是否查询面。
     */
    isQueryRegion = null;

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.attributeFilter -{string}
     * @description 属性字段过滤条件。
     */
    attributeFilter = null;

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.chartFeatureInfoSpecCode -{number}
     * @description 查询的物标代号。
     */
    chartFeatureInfoSpecCode = null;

    constructor(options) {
        if (!options) {
            return;
        }
        Util.extend(this, options);
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
     * @function  SuperMap.ChartQueryFilterParameter.prototype.toJson
     * @description 将属性信息转化成JSON格式字符串。
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

    CLASS_NAME = "SuperMap.ChartQueryFilterParameter"
}

SuperMap.ChartQueryFilterParameter = ChartQueryFilterParameter;