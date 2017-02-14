/**
 * Class: GetFeaturesByBoundsService
 * 数据集Bounds查询服务类
 */
require('./GetFeaturesServiceBase');
require('../../../Core/iServer/GetFeaturesByBoundsService');
require('leaflet');

GetFeaturesByBoundsService = GetFeaturesServiceBase.extend({

    options: {
        bounds: null,
        spatialQueryMode: SuperMap.REST.SpatialQueryMode.CONTAIN,
    },

    initialize: function (url, options) {
        GetFeaturesServiceBase.prototype.initialize.call(this, url, options);
        L.setOptions(this, options);
        var bounds = this.options.bounds = options.bounds;
        if (bounds instanceof L.LatLngBounds) {
            this.options.bounds = new SuperMap.Bounds(
                bounds.getSouthWest().lng,
                bounds.getSouthWest().lat,
                bounds.getNorthEast().lng,
                bounds.getNorthEast().lat
            );
        }
        this._getFeaturesByBounds();
    },

    _getFeaturesByBounds: function () {
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
        GetFeaturesByBoundsService = new SuperMap.iServer.GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        GetFeaturesByBoundsService.processAsync(getFeaturesByBoundsParameters);
    }
});

L.supermap.getFeaturesByBoundsService = function (url, options) {
    return new GetFeaturesByBoundsService(url, options);
};

module.exports = L.supermap.getFeaturesByBoundsService;