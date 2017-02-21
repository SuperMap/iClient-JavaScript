/**
 * Class: ChartFeatureInfoSpecsService
 * 海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。
 */
require('./ServiceBase');
require('../../../Core/iServer/ChartFeatureInfoSpecsService');

ol.supermap.ChartFeatureInfoSpecsService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.ChartFeatureInfoSpecsService, ol.supermap.ServiceBase);

ol.supermap.ChartFeatureInfoSpecsService.prototype.getChartFeatureInfoSpecs = function () {
    var me = this;
    var ChartFeatureInfoSpecsService = new SuperMap.REST.ChartFeatureInfoSpecsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    ChartFeatureInfoSpecsService.processAsync();
    return me;
};

module.exports = ol.supermap.ChartFeatureInfoSpecsService;