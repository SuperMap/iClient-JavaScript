/**
 * Class: FieldStatisticService
 * 字段查询服务类
 */
require('./FieldsServiceBase');
require('../../../Core/iServer/FieldStatisticService');

ol.supermap.FieldStatisticService = function (url, options) {
    ol.supermap.FieldsServiceBase.call(this, url, options);
    this.options.fieldName = options.fieldName;
    this.currentStatisticResult = {fieldName: options.fieldName};
    this.options.statisticMode = options.statisticMode;
    if (!options.statisticMode || (typeof options.statisticMode !== "Array")) {
        this.options.statisticMode = SuperMap.REST.StatisticMode;
    }
}
ol.inherits(ol.supermap.FieldStatisticService, ol.supermap.FieldsServiceBase);


ol.supermap.FieldStatisticService.prototype.getFieldStatisticInfo = function () {
    var me = this;
    var modes = me.options.statisticMode;
    //针对每种统计方式分别进行请求
    for (var mode in modes) {
        this.currentStatisticResult[modes[mode]] = null;
        this._fieldStatisticRequest(modes[mode]);
    }
    return me;
}

ol.supermap.FieldStatisticService.prototype._fieldStatisticRequest = function (statisticMode) {
    var me = this, statisticService;
    statisticService = new SuperMap.REST.FieldStatisticService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        datasource: me.options.dataSourceName,
        dataset: me.options.dataSetName,
        field: me.options.fieldName,
        statisticMode: statisticMode
    });
    statisticService.processAsync();
}

ol.supermap.FieldStatisticService.prototype.processCompleted = function (fieldStatisticResult) {
    var getAll = true,
        result = fieldStatisticResult.result;
    if (this.currentStatisticResult) {
        if (null == this.currentStatisticResult[result.mode]) {
            this.currentStatisticResult[result.mode] = result.result;
        }
    }
    for (var mode in this.currentStatisticResult) {
        if (null == this.currentStatisticResult[mode]) {
            getAll = false;
            break;
        }
    }
    if (getAll) {
        this.dispatchEvent(new ol.Collection.Event('complete', {result: this.currentStatisticResult}))
    }
}

module.exports = ol.supermap.FieldStatisticService;