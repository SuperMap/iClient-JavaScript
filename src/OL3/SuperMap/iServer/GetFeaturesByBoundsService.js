/**
 * Class: GetFeaturesByBoundsService
 * 数据集Bounds查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByBoundsService');

ol.supermap.GetFeaturesByBoundsService = function (url, options) {
    ol.supermap.GetFeaturesServiceBase.call(this, url, options);
    this.options.spatialQueryMode = SuperMap.REST.SpatialQueryMode.CONTAIN;
    this.options.bounds = null;
    var bounds = this.options.bounds = options.bounds;
    if (bounds instanceof L.LatLngBounds) {
        this.options.bounds = new SuperMap.Bounds(
            bounds.getSouthWest().lng,
            bounds.getSouthWest().lat,
            bounds.getNorthEast().lng,
            bounds.getNorthEast().lat
        );
    }
}
ol.inherits(ol.supermap.GetFeaturesByBoundsService, ol.supermap.GetFeaturesServiceBase);

ol.supermap.GetFeaturesByBoundsService.prototype.getFeatures = function () {
    var me = this,
        getFeaturesByBoundsParameters, GetFeaturesByBoundsService;
    getFeaturesByBoundsParameters = new SuperMap.REST.GetFeaturesByBoundsParameters({
        returnContent: me.options.returnContent,
        datasetNames: me.options.dataSetNames,
        spatialQueryMode: me.options.spatialQueryMode,
        fromIndex: me.options.fromIndex,
        toIndex: me.options.toIndex,
        bounds: me.options.bounds
    });
    GetFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    GetFeaturesByBoundsService.processAsync(getFeaturesByBoundsParameters);
    return me;
}
module.exports = ol.supermap.GetFeaturesByBoundsService;