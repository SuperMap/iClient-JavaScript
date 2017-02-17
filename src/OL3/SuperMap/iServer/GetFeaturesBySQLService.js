/**
 * Class: GetFeaturesBySQLService
 * 数据集SQL查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesBySQLService');

ol.supermap.GetFeaturesBySQLService = function (url, options) {
    ol.supermap.GetFeaturesServiceBase.call(this, url, options);
    this.options.name = null;
    this.options.attributeFilter = null;
}
ol.inherits(ol.supermap.GetFeaturesBySQLService, ol.supermap.GetFeaturesServiceBase);

ol.supermap.GetFeaturesBySQLService.prototype.getFeatures = function () {
    var me = this,
        getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;

    getFeatureParam = new SuperMap.REST.FilterParameter({
        name: me.options.name,
        attributeFilter: me.options.attributeFilter
    });

    getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        returnContent: me.options.returnContent,
        queryParameter: getFeatureParam,
        datasetNames: me.options.dataSetNames,
        fromIndex: me.options.fromIndex,
        toIndex: me.options.toIndex
    });

    getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });

    getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    return me;
}
module.exports = ol.supermap.GetFeaturesBySQLService;