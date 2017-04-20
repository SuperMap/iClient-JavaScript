/**
 * Class: GetFeaturesService
 * 数据集查询类。
 * 提供：ID查询，范围查询，SQL查询，几何查询，bounds查询，缓冲区查询
 */
require('./ServiceBase');
require('../../common/iServer/GetFeaturesByIDsService');
require('../../common/iServer/GetFeaturesBySQLService');
require('../../common/iServer/GetFeaturesByBoundsService');
require('../../common/iServer/GetFeaturesByBufferService');
require('../../common/iServer/GetFeaturesByGeometryService');


ol.supermap.GetFeaturesService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.GetFeaturesService, ol.supermap.ServiceBase);

/**
 * 数据集ID查询服务
 * @param params <GetFeaturesByIDsParameters>
 * @param resultFormat
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByIDs = function (params, resultFormat) {
    var me = this;
    var getFeaturesByIDsService = new SuperMap.REST.GetFeaturesByIDsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByIDsService.processAsync(me._processParams(params));
    return me;

};
/**
 * 数据集Bounds查询服务
 * @param params <GetFeaturesByBoundsParameters>
 * @param resultFormat
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByBounds = function (params, resultFormat) {
    var me = this;
    var getFeaturesByBoundsService = new SuperMap.REST.GetFeaturesByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByBoundsService.processAsync(me._processParams(params));
    return me;
};
/**
 * 数据集Buffer查询服务
 * @param params <GetFeaturesByBufferParameters>
 * @param resultFormat
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByBuffer = function (params, resultFormat) {
    var me = this;
    var getFeatureService = new SuperMap.REST.GetFeaturesByBufferService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    getFeatureService.processAsync(me._processParams(params));
    return me;
};
/**
 * 数据集SQL查询服务
 * @param params <GetFeaturesBySQLParameters>
 * @param resultFormat
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesBySQL = function (params, resultFormat) {
    var me = this;
    var getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });

    getFeatureBySQLService.processAsync(me._processParams(params));
    return me;
};
/**
 * 数据集几何查询服务类
 * @param params <GetFeaturesByGeometryParameters>
 * @param resultFormat
 */
ol.supermap.GetFeaturesService.prototype.getFeaturesByGeometry = function (params, resultFormat) {
    var me = this;
    var getFeaturesByGeometryService = new SuperMap.REST.GetFeaturesByGeometryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    getFeaturesByGeometryService.processAsync(me._processParams(params));
    return me;
};

ol.supermap.GetFeaturesService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
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
};

ol.supermap.GetFeaturesService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.Format.GEOJSON;
};

module.exports = ol.supermap.GetFeaturesService;