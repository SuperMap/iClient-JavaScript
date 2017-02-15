/**
 * Class: FieldStatisticService
 * 字段查询服务类
 * 用法：
 *      L.superMap.getFieldsService(url,{
 *            projection:projection
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./FieldsServiceBase');
require('../../../Core/iServer/FieldStatisticService');

FieldStatisticService = FieldsServiceBase.extend({
    options: {
        fieldName: null,
        /**
         * 数组形式，形如["AVERAGE","MAX","MIN"]
         */
        statisticMode: null
    },
    initialize: function (url, options) {
        FieldsServiceBase.prototype.initialize.call(this, url, options);
        this.options.fieldName = options.fieldName;
        this.currentStatisticResult = {fieldName: options.fieldName};
        this.options.statisticMode = options.statisticMode;
        if (!options.statisticMode || (typeof options.statisticMode !== "Array")) {
            this.options.statisticMode = SuperMap.REST.StatisticMode;
        }
        this._fieldStatistic();
    },

    _fieldStatistic: function () {
        var me = this;
        var modes = me.options.statisticMode;
        //针对每种统计方式分别进行请求
        for (var mode in modes) {
            this.currentStatisticResult[modes[mode]] = null;
            this._fieldStatisticRequest(modes[mode]);
        }
    },
    _fieldStatisticRequest: function (statisticMode) {
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
    },
    processCompleted: function (fieldStatisticResult) {
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
            this.fire('complete', {data:this.currentStatisticResult});
        }
    }
});

L.supermap.fieldStatisticService = function (url, options) {
    return new FieldStatisticService(url, options);
};

module.exports = L.supermap.fieldStatisticService;