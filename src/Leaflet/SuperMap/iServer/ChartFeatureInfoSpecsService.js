/**
 * Class: ChartFeatureInfoSpecsService
 * 海图物标信息服务
 * 用法：
 *      L.superMap.chartFeatureInfoSpecsService(url)
 *      .getChartFeatureInfo()
 *      .on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../../Core/iServer/ChartFeatureInfoSpecsService');

ChartFeatureInfoSpecsService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    getChartFeatureInfo: function () {
        var me = this;
        var chartFeatureInfoSpecsService = SuperMap.REST.ChartFeatureInfoSpecsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        chartFeatureInfoSpecsService.processAsync();
        return me;
    }
});

L.supermap.chartFeatureInfoSpecsService = function (url, options) {
    return new ChartFeatureInfoSpecsService(url, options);
};

module.exports = L.supermap.chartFeatureInfoSpecsService;