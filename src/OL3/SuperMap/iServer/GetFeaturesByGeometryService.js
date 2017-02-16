/**
 * Class: GetFeaturesByGeometryService
 * 数据集Geometry查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByGeometryService');

ol.supermap.GetFeaturesByGeometryService = function (url, options) {
    ol.supermap.GetFeaturesServiceBase.call(this, url, options);
    this.options.spatialQueryMode = SuperMap.REST.SpatialQueryMode.CONTAIN;
    this.options.geometry = null;
    if (options && options.geometry) {
        var geometry = ol.supermap.Util.toSuperMapGeometry(ol.format.GeoJSON.writeGeometry_(options.geometry));
        this.options.geometry = geometry;
    }
}

ol.inherits(ol.supermap.GetFeaturesByGeometryService, ol.supermap.GetFeaturesServiceBase);

ol.supermap.GetFeaturesByGeometryService.prototype.getFeatures = function () {
    var me = this,
        getFeaturesByGeometryParameters, getFeaturesByGeometryService;
    getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
        datasetNames: me.options.dataSetNames,
        spatialQueryMode: me.options.spatialQueryMode,
        geometry: me.options.geometry,
        returnContent: me.options.returnContent,
        fromIndex: me.options.fromIndex,
        toIndex: me.options.toIndex
    });
    getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
    return me;
}

module.exports = ol.supermap.GetFeaturesByGeometryService;