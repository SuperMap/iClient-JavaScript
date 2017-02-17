/**
 * Class: GetFeaturesService
 * 数据集查询类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询
 */
require('../../../Core/base');
require('../../../Core/iServer/GetFeaturesByIDsService');
require('../../../Core/iServer/GetFeaturesBySQLService');
require('../../../Core/iServer/GetFeaturesByBoundsService');
require('../../../Core/iServer/GetFeaturesByBufferService');
require('../../../Core/iServer/GetFeaturesByGeometryService');
require('./ServiceBase');

GetFeaturesService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 数据集ID查询服务
     * @param params
     */
    getFeaturesByIDsService: function (params) {
        var me = this, param = me._processParams(params);
        var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters({
            returnContent: param.returnContent,
            datasetNames: param.dataSetNames,
            fromIndex: param.fromIndex,
            toIndex: param.toIndex,
            IDs: param.IDs
        });
        var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
        return me;

    },
    /**
     * 数据集Bounds查询服务
     * @param params
     */
    getFeaturesByBoundsService: function (params) {
        var me = this, param = me._processParams(params), bounds = params.bounds, spatialQueryMode;
        if (bounds instanceof L.LatLngBounds) {
            bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
        spatialQueryMode = (param.spatialQueryMode) ? param.spatialQueryMode : SuperMap.REST.SpatialQueryMode.CONTAIN;
        var getFeaturesByBoundsParameters = new SuperMap.REST.GetFeaturesByBoundsParameters({
            bounds: bounds,
            spatialQueryMode: spatialQueryMode,
            datasetNames: param.dataSetNames,

            returnContent: param.returnContent,
            fromIndex: param.fromIndex,
            toIndex: param.toIndex

        });
        var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByBoundsService.processAsync(getFeaturesByBoundsParameters);
        return me;
    },
    /**
     * 数据集Buffer查询服务
     * @param params
     */
    getFeaturesByBufferService: function (params) {
        var me = this, geometry, param = me._processParams(params);
        if (param && param.geometry && param.geometry instanceof L.Path) {
            geometry = L.Util.toSuperMapGeometry(param.geometry.toGeoJSON());
        }
        var getFeatureByBufferParameter = new SuperMap.REST.GetFeaturesByBufferParameters({
            geometry: geometry,
            bufferDistance: param.bufferDistance,
            datasetNames: param.dataSetNames,

            returnContent: param.returnContent,
            fromIndex: param.fromIndex,
            toIndex: param.toIndex
        });
        var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeatureService.processAsync(getFeatureByBufferParameter);
        return me;
    },
    /**
     * 数据集SQL查询服务
     * @param params
     */
    getFeaturesBySQLService: function (params) {
        var me = this, param = me._processParams(params);
        var getFeatureParam = new SuperMap.REST.FilterParameter({
            name: param.name,
            attributeFilter: param.attributeFilter
        });
        var getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: param.dataSetNames,

            returnContent: param.returnContent,
            fromIndex: param.fromIndex,
            toIndex: param.fromIndex
        });
        var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });

        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
        return me;
    },
    /**
     * 数据集几何查询服务类
     * @param params
     */
    getFeaturesByGeometryService: function (params) {
        var me = this, geometry, spatialQueryMode, param = me._processParams(params);
        if (param && param.geometry && param.geometry instanceof L.Path) {
            geometry = L.Util.toSuperMapGeometry(param.geometry.toGeoJSON());
        }
        spatialQueryMode = (param.spatialQueryMode) ? param.spatialQueryMode : SuperMap.REST.SpatialQueryMode.CONTAIN;
        var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters({
            spatialQueryMode: spatialQueryMode,
            geometry: geometry,
            datasetNames: param.dataSetNames,

            returnContent: param.returnContent,
            fromIndex: param.fromIndex,
            toIndex: param.toIndex
        });
        var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
        return me;
    },
    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        params.fromIndex = params.fromIndex ? params.fromIndex : 0;
        params.toIndex = params.fromIndex ? params.fromIndex : -1;
        return params;
    }
});

L.supermap.getFeaturesService = function (url, options) {
    return new GetFeaturesService(url, options);
};

module.exports = L.supermap.getFeaturesService;
