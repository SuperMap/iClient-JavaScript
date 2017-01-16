/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.ChartQueryFilterParameter
 *      海图查询过滤参数类，用于设置海图查询的过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
 */
SuperMap.REST.ChartQueryFilterParameter = SuperMap.Class({

    /**
     * APIProperty: isQueryPoint
     * {Boolean} 是否查询点。
     */
    isQueryPoint:null,

    /**
     * APIProperty: isQueryLine
     * {Boolean} 是否查询线。
     */
    isQueryLine:null,

    /**
     * APIProperty: isQueryRegion
     * {Boolean} 是否查询面。
     */
    isQueryRegion:null,

    /**
     * APIProperty: attributeFilter
     * {String} 属性字段过滤条件。
     */
    attributeFilter:null,

    /**
     * APIProperty: chartFeatureInfoSpecCode
     * {Number} 查询的物标代号。
     */
    chartFeatureInfoSpecCode:null,

    /**
     * Constructor: SuperMap.REST.ChartQueryFilterParameter
     * 初始化 ChartQueryFilterParameter 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * isQueryPoint - {Boolean} 是否查询点。
     * isQueryLine  - {Boolean} 是否查询线。
     * isQueryRegion  - {Boolean} 是否查询面。
     * isQueryLine  - {Boolean} 是否查询点。
     * attributeFilter - {String} 属性字段过滤条件。
     * chartFeatureInfoSpecCode - {Number} 查询的物标代号。
     */
    initialize:function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.isQueryPoint = null;
        me.isQueryLine = null;
        me.isQueryRegion = null;
        me.attributeFilter = null;
        me.chartFeatureInfoSpecCode = null;
    },

    /**
     * Method: toJson
     * 将属性信息转化成JSON格式字符串。
     */
    toJson:function () {
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
    },


    CLASS_NAME:"SuperMap.REST.ChartQueryFilterParameter"
})