/**
 * Class: FieldService
 * 字段服务类
 * 用法：
 *      L.supermap.fieldService(url).getFields(function(result){
 *           //doSomething
 *      });
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var GetFieldsService = require('../../common/iServer/GetFieldsService');
var FieldStatisticService = require('../../common/iServer/FieldStatisticService');

var FieldService = ServiceBase.extend({

    options: {
        dataSourceName: null,
        dataSetName: null
    },

    initialize: function (url, options) {
        this.options.dataSourceName = options.dataSourceName;
        this.options.dataSetName = options.dataSetName;
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     *  字段查询服务
     * @param callback
     */
    getFields: function (callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            datasource: me.options.dataSourceName,
            dataset: me.options.dataSetName
        });
        getFieldsService.processAsync();
        return me;
    },

    /**
     * 字段统计服务
     * @param params
     * <SuperMap.FieldStatisticsParameters>
     * @param callback
     */

    getFieldStatisticsInfo: function (params, callback) {
        var me = this,
            fieldName = params.fieldName,
            modes = params.statisticMode;
        if (modes && !L.Util.isArray(modes)) {
            modes = [modes];
        }
        me.currentStatisticResult = {fieldName: fieldName};
        me._statisticsCallback = callback;
        //针对每种统计方式分别进行请求
        for (var mode in modes) {
            me.currentStatisticResult[modes[mode]] = null;
            me._fieldStatisticRequest(fieldName, modes[mode]);
        }
        return me;
    },

    _fieldStatisticRequest: function (fieldName, statisticMode) {
        var me = this;
        var statisticService = new FieldStatisticService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: me._processCompleted,
                processFailed: me._statisticsCallback
            },
            datasource: me.options.dataSourceName,
            dataset: me.options.dataSetName,
            field: fieldName,
            statisticMode: statisticMode
        });
        statisticService.processAsync();
    },

    _processCompleted: function (fieldStatisticResult) {
        var me = this;
        var getAll = true,
            result = fieldStatisticResult.result;
        if (this.currentStatisticResult) {
            if (null == me.currentStatisticResult[result.mode]) {
                this.currentStatisticResult[result.mode] = result.result;
            }
        }
        for (var mode in me.currentStatisticResult) {
            if (null == me.currentStatisticResult[mode]) {
                getAll = false;
                break;
            }
        }
        if (getAll) {
            me._statisticsCallback({result: me.currentStatisticResult});
        }
    }
});
L.supermap.fieldService = function (url, options) {
    return new FieldService(url, options);
};
module.exports = FieldService;
