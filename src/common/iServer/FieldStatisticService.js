/**
 * Class: SuperMap.REST.FieldStatisticService
 * 字段查询统计服务类。用来完成对指定数据集指定字段的查询统计分析，即求平均值，最大值等。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./FieldStatisticsParameters');
SuperMap.REST.FieldStatisticService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * APIProperty: datasource
     * {String} 数据集所在的数据源名称。
     */
    datasource: null,

    /**
     * APIProperty: dataset
     * {String} 数据集名称。
     */
    dataset: null,

    /**
     * APIProperty: field
     * {String} 查询统计的目标字段名称。
     */
    field: null,

    /**
     * APIProperty: statisticMode
     * {<StatisticMode>} 字段查询统计的方法类型。
     */
    statisticMode: null,

    /**
     * Constructor: SuperMap.REST.FieldStatisticService
     * 字段查询统计服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.FieldStatisticService(url, {eventListeners: {
     *     "processCompleted": fieldStatisticCompleted, 
     *     "processFailed": fieldStatisticError
     *     }，
     *     datasource: "World",
     *     dataset: "Countries",
     *     field: "SmID",
     *     statisticMode: StatisticMode.AVERAGE
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/data-world/rest/data 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * datasource - {String} 数据集所在的数据源名称。
     * dataset - {String} 数据集名称。
     * field - {String} 查询统计的目标字段名称。
     * statisticMode - {<StatisticMode>} 字段查询统计的方法类型。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.datasource = null;
        me.dataset = null;
        me.field = null;
        me.statisticMode = null;
    },

    /**
     * APIMethod: processAsync
     * 执行服务，进行指定字段的查询统计。
     */
    processAsync: function () {
        var me = this,
            end = me.url.substr(me.url.length - 1, 1),
            fieldStatisticURL = "datasources/" + me.datasource + "/datasets/" + me.dataset + "/fields/" + me.field + "/" + me.statisticMode;
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? fieldStatisticURL + ".json?" : "/" + fieldStatisticURL + ".json?";
        } else {
            me.url += (end == "/") ? fieldStatisticURL + ".jsonp?" : "/" + fieldStatisticURL + ".jsonp?";
        }

        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.FieldStatisticService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.FieldStatisticService(url, options);
};