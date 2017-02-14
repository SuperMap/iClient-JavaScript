/**
 * Class: GetFeaturesByGeometryService
 * 数据集Bounds查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByGeometryService');
require('leaflet');

GetFeaturesByGeometryService = GetFeaturesServiceBase.extend({

    options: {
        geometry: null,
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.CONTAIN,
    },

    initialize: function (url, options) {
        GetFeaturesServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
        if (options && options.geometry) {
            var geometry = L.Util.toSuperMapGeometry(options.geometry.toGeoJSON());
            this.options.geometry = geometry;
        }
        this._getFeaturesByGeometry();
    },

    _getFeaturesByGeometry: function () {
        var me = this,
            getFeaturesByGeometryParameters, getFeaturesByGeometryService;
        getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
            datasetNames: me.options.dataSetNames,
            spatialQueryMode: me.options.spatialQueryMode,
            geometry: me.options.geometry,

            returnContent: me.options.returnContent,
            fromIndex: me.options.fromIndex,
            toIndex: me.options.toIndex,
        });
        getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
    }
});

L.supermap.getFeaturesByGeometryService = function (url, options) {
    return new GetFeaturesByGeometryService(url, options);
};

module.exports = L.supermap.getFeaturesByGeometryService;