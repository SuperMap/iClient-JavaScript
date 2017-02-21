/**
 * Class: GetFeaturesService
 * 数据集查询类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询
 */
require('../../../Core/iServer/GetFeaturesByIDsService');
require('../../../Core/iServer/GetFeaturesBySQLService');
require('../../../Core/iServer/GetFeaturesByBoundsService');
require('../../../Core/iServer/GetFeaturesByBufferService');
require('../../../Core/iServer/GetFeaturesByGeometryService');
require('./ServiceBase');

ol.supermap.GetFeaturesService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.GetFeaturesService, ol.supermap.ServiceBase);

/**
 * 数据集ID查询服务
 * @param params
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByIDs = function (params) {
    var me = this, param = me._processParams(params);
    var getFeaturesByIDsParameters = new SuperMap.REST.GetFeaturesByIDsParameters(param);
    var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeaturesByIDsService.processAsync(getFeaturesByIDsParameters);
    return me;

};
/**
 * 数据集Bounds查询服务
 * @param params
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByBounds = function (params) {
    var me = this, param = me._processParams(params);
    var getFeaturesByBoundsParameters = new SuperMap.REST.GetFeaturesByBoundsParameters(param);
    var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeaturesByBoundsService.processAsync(getFeaturesByBoundsParameters);
    return me;
};
/**
 * 数据集Buffer查询服务
 * @param params
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByBuffer = function (params) {
    var me = this, param = me._processParams(params);
    var getFeatureByBufferParameter = new SuperMap.REST.GetFeaturesByBufferParameters(param);
    var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeatureService.processAsync(getFeatureByBufferParameter);
    return me;
};
/**
 * 数据集SQL查询服务
 * @param params
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesBySQL = function (params) {
    var me = this, param = me._processParams(params);
    param.queryParameter = new SuperMap.REST.FilterParameter(param);
    var getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters(param);
    var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });

    getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    return me;
};
/**
 * 数据集几何查询服务类
 * @param params
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByGeometry = function (params) {
    var me = this, param = me._processParams(params);
    var getFeaturesByGeometryParameters = new SuperMap.REST.GetFeaturesByGeometryParameters(param);
    var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    getFeaturesByGeometryService.processAsync(getFeaturesByGeometryParameters);
    return me;
};

ol.supermap.GetFeaturesService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    params.datasetNames = params.datasetNames;
    params.fromIndex = params.fromIndex ? params.fromIndex : 0;
    params.toIndex = params.fromIndex ? params.fromIndex : -1;
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
    if (params.geometry) {
        params.geometry = ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
    }
    return params;
}

module.exports = ol.supermap.GetFeaturesService;