/**
 * Class: GetFeaturesByBufferService
 * 数据集Buffer查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByBufferService');

ol.supermap.GetFeaturesByBufferService = function (url, options) {
    ol.supermap.GetFeaturesServiceBase.call(this, url, options);
    this.options.bufferDistance = null;
    this.options.geometry = null;
    if (options && options.geometry && options.geometry instanceof ol.geom.Geometry) {
        var geometry = ol.supermap.Util.toSuperMapGeometry(ol.format.GeoJSON.writeGeometry_(options.geometry));
        this.options.geometry = geometry;
    }
}
ol.inherits(ol.supermap.GetFeaturesByBufferService, ol.supermap.GetFeaturesServiceBase);

ol.supermap.GetFeaturesByBufferService.prototype.getFeatures = function () {
    var me = this,
        getFeatureParameter, getFeatureService;
    getFeatureParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
        bufferDistance: me.options.bufferDistance,
        geometry: me.options.geometry,
        datasetNames: me.options.dataSetNames,
        returnContent: me.options.returnContent,
        fromIndex: me.options.fromIndex,
        toIndex: me.options.toIndex
    });
    getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeatureService.processAsync(getFeatureParameter);
    return me;
}

module.exports = ol.supermap.GetFeaturesByBufferService;