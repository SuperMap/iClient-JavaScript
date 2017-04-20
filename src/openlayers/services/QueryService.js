/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 */
require('./ServiceBase');
require('../../common/iServer/QueryByBoundsService');
require('../../common/iServer/QueryByDistanceService');
require('../../common/iServer/QueryBySQLService');
require('../../common/iServer/QueryByGeometryService');

ol.supermap.QueryService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.QueryService, ol.supermap.ServiceBase);

/**
 * 地图bounds查询服务
 * @param params:
 *     <QueryByBoundsParameters>
 * @param resultFormat
 */
ol.supermap.QueryService.prototype.queryByBounds = function (params, resultFormat) {
    var me = this;
    var queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    queryService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图距离查询服务
 * @param params:
 *     <QueryByDistanceParameters>
 * @param resultFormat
 */
ol.supermap.QueryService.prototype.queryByDistance = function (params, resultFormat) {
    var me = this;
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    queryByDistanceService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图SQL查询服务
 * @param params:
 *     <QueryBySQLParameters>
 * @param resultFormat
 */
ol.supermap.QueryService.prototype.queryBySQL = function (params, resultFormat) {
    var me = this;
    var queryBySQLService = new SuperMap.REST.QueryBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    queryBySQLService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图几何查询服务
 * @param params:
 *     <QueryByGeometryParameters>
 * @param resultFormat
 */
ol.supermap.QueryService.prototype.queryByGeometry = function (params, resultFormat) {
    var me = this;
    var queryByGeometryService = new SuperMap.REST.QueryByGeometryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        },
        format: me._processFormat(resultFormat)
    });
    queryByGeometryService.processAsync(me._processParams(params));
    return me;
};

ol.supermap.QueryService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    if (params.queryParams && !ol.supermap.Util.isArray(params.queryParams)) {
        params.queryParams = [params.queryParams];
    }
    if (params.bounds) {
        params.bounds = new SuperMap.Bounds(
            params.bounds[0],
            params.bounds[1],
            params.bounds[2],
            params.bounds[3]
        );
    }
    if (params.geometry) {
        if (params.geometry instanceof ol.geom.Point) {
            params.geometry = new SuperMap.Geometry.Point(params.geometry.flatCoordinates[0], params.geometry.flatCoordinates[1]);
        } else {
            params.geometry = ol.supermap.Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
        }
    }
    return params;
};
ol.supermap.QueryService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.Format.GEOJSON;
};

module.exports = ol.supermap.QueryService;
