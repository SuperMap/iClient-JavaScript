/**
 * Class: FieldService
 * 字段服务类
 * 用法：
 *      new ol.supermap.FieldService(url).getFields(function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
var ol = require('openlayers');
var Util = require('../core/Util');
var GetFieldsService = require('../../common/iServer/GetFieldsService');
var FieldStatisticService = require('../../common/iServer/FieldStatisticService');

ol.supermap.FieldService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
    this.options.dataSourceName = options.dataSourceName;
    this.options.dataSetName = options.dataSetName;
};

ol.inherits(ol.supermap.FieldService, ol.supermap.ServiceBase);

/**
 *  字段查询服务
 * @param callback
 */
ol.supermap.FieldService.prototype.getFields = function (callback) {
    var me = this;
    var getFieldsService = new GetFieldsService(me.options.url, {
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
};

/**
 * 字段统计服务
 * @param params
 * <SuperMap.FieldStatisticsParameters>
 * @param callback
 */
ol.supermap.FieldService.prototype.getFieldStatisticsInfo = function (params, callback) {
    var me = this,
        fieldName = params.fieldName,
        modes = params.statisticMode;
    if (modes && !Util.isArray(modes)) {
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
};

ol.supermap.FieldService.prototype._fieldStatisticRequest = function (fieldName, statisticMode) {
    var me = this;
    var statisticService = new FieldStatisticService(me.options.url, {
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
};

ol.supermap.FieldService.prototype._processCompleted = function (fieldStatisticResult) {
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
};

module.exports = ol.supermap.FieldService;
