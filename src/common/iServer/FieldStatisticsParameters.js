/**
 * Class: SuperMap.FieldStatisticsParameters
 * 字段统计信息查询参数类
 */
var SuperMap = require('../SuperMap');
SuperMap.FieldStatisticsParameters = SuperMap.Class({
    /**
     * APIProperty: fieldName
     * {String}字段名
     */
    fieldName: null,
    /**
     * APIProperty: statisticMode
     * {SuperMap.StatisticMode}字段统计方法类型
     */
    statisticMode: null,

    initialize: function (options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    },

    CLASS_NAME: "SuperMap.FieldStatisticsParameters"
});

module.exports = SuperMap.FieldStatisticsParameters;
