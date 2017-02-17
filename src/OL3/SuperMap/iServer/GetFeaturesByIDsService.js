/**
 * Class: GetFeaturesByIDsService
 * 数据集ID查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByIDsService');

ol.supermap.GetFeaturesByIDsService = function (url, options) {
    ol.supermap.GetFeaturesServiceBase.call(this, url, options);
    this.option.IDs = null;
}
ol.inherits(ol.supermap.GetFeaturesByIDsService, ol.supermap.GetFeaturesServiceBase);

ol.supermap.GetFeaturesByIDsService.prototype.getFeatures = function () {
    var me = this;
    var getFeaturesByIDsParameters, getFeaturesByIDsService;
    getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
        returnContent: me.options.returnContent,
        datasetNames: me.options.dataSetNames,
        fromIndex: me.options.fromIndex,
        toIndex: me.options.toIndex,
        IDs: me.options.IDs
    });
    getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
    return me;
}
module.exports = ol.supermap.GetFeaturesByIDsService;