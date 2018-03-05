import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {GetFieldsService, FieldStatisticService, FieldStatisticsParameters} from '@supermap/iclient-common';

/**
 * @class  L.supermap.fieldService
 * @classdesc 字段服务类
 * @category iServer Data Field
 * @extends L.supermap.ServiceBase
 * @example
 *   L.supermap.fieldService(url).getFields(function(result){
 *     //doSomething
 *   });
 * @param url - {string} 字段服务地址
 * @param options - {Object} 字段服务类可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        dataSourceName - {string} 数据资源名称 <br>
 *        dataSetName - {string} 数据集名称
 */
export var FieldService = ServiceBase.extend({

    initialize: function (url) {
        ServiceBase.prototype.initialize.call(this, url);
    },

    /**
     * @function L.supermap.fieldService.prototype.getFields
     * @description 字段查询服务
     * @param params {SuperMap.FieldParameters} 字段信息查询参数类
     * @param callback - {function} 回调函数
     */
    getFields: function (params, callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            datasource: params.datasource,
            dataset: params.dataset
        });
        getFieldsService.processAsync();
    },

    /**
     * @function L.supermap.fieldService.prototype.getFieldStatisticsInfo
     * @description 字段统计服务
     * @param params {SuperMap.FieldStatisticsParameters} 字段统计信息查询参数类
     * @param callback - {function} 回调函数
     */
    getFieldStatisticsInfo: function (params, callback) {
        if (!(params instanceof FieldStatisticsParameters)) {
            return;
        }
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
            me._fieldStatisticRequest(params.datasource, params.dataset, fieldName, modes[mode]);
        }
    },

    _fieldStatisticRequest: function (dataSourceName, dataSetName, fieldName, statisticMode) {
        var me = this;
        var statisticService = new FieldStatisticService(me.url, {
            eventListeners: {
                scope: me,
                processCompleted: me._processCompleted,
                processFailed: me._statisticsCallback
            },
            datasource: dataSourceName,
            dataset: dataSetName,
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
export var fieldService = function (url, options) {
    return new FieldService(url, options);
};

L.supermap.fieldService = fieldService;