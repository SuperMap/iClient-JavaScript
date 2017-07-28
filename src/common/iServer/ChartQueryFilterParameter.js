var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.ChartQueryFilterParameter
 * @description 海图查询过滤参数类，用于设置海图查询的过滤参数。包括：物标代码、物标可应用对象的选择（是否查询点、线或面）、属性字段过滤条件。
 * @param options - {Object} 可选参数。如：<br>
 *        isQueryPoint - {Boolean} 是否查询点。
 *        isQueryLine  - {Boolean} 是否查询线。
 *        isQueryRegion  - {Boolean} 是否查询面。
 *        attributeFilter - {String} 属性字段过滤条件。
 *        chartFeatureInfoSpecCode - {Number} 查询的物标代号。
 */
SuperMap.ChartQueryFilterParameter = SuperMap.Class({

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryPoint -{Boolean}
     * @description 是否查询点。
     */
    isQueryPoint: null,

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryLine -{Boolean}
     * @description 是否查询线。
     */
    isQueryLine: null,

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.isQueryRegion -{Boolean}
     * @description 是否查询面。
     */
    isQueryRegion: null,

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.attributeFilter -{String}
     * @description 属性字段过滤条件。
     */
    attributeFilter: null,

    /**
     * @member SuperMap.ChartQueryFilterParameter.prototype.chartFeatureInfoSpecCode -{Number}
     * @description 查询的物标代号。
     */
    chartFeatureInfoSpecCode: null,

    /*
     * Constructor: ChartQueryFilterParameter
     * 初始化 ChartQueryFilterParameter 类的新实例。
     */
    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.isQueryPoint = null;
        me.isQueryLine = null;
        me.isQueryRegion = null;
        me.attributeFilter = null;
        me.chartFeatureInfoSpecCode = null;
    },

    /**
     * @function  SuperMap.ChartQueryFilterParameter.prototype.toJson
     * @description 将属性信息转化成JSON格式字符串。
     */
    toJson: function () {
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


    CLASS_NAME: "SuperMap.ChartQueryFilterParameter"
});
module.exports = SuperMap.ChartQueryFilterParameter;