/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {GetFieldsService, FieldStatisticService, FieldStatisticsParameters} from '@supermap/iclient-common';

/**
 * @class  L.supermap.fieldService
 * @classdesc 字段服务类。
 * @category iServer Data Field
 * @extends {L.supermap.ServiceBase}
 * @example
 *   L.supermap.fieldService(url).getFields(function(result){
 *     //doSomething
 *   });
 * @param {string} url - 字段服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export var FieldService = ServiceBase.extend({

    initialize: function (url,options) {
        ServiceBase.prototype.initialize.call(this, url,options);
    },

    /**
     * @function L.supermap.fieldService.prototype.getFields
     * @description 字段查询服务。
     * @param {SuperMap.FieldParameters} params - 字段信息查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    getFields: function (params, callback) {
        var me = this;
        var getFieldsService = new GetFieldsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @description 字段统计服务。
     * @param {SuperMap.FieldStatisticsParameters} params - 字段统计信息查询参数类。
     * @param {RequestCallback} callback - 回调函数。
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