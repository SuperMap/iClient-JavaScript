/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 */
require('../../../Core/base');
require('../../../Core/iServer/QueryByBoundsService');
require('../../../Core/iServer/QueryByDistanceService');
require('../../../Core/iServer/QueryBySQLService');
require('../../../Core/iServer/QueryByGeometryService');
require('./ServiceBase');

ol.supermap.QueryService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.QueryService, ol.supermap.ServiceBase);

/**
 * 地图bounds查询服务
 * @param params:
 *     <QueryByBoundsParameters>
 */
ol.supermap.QueryService.prototype.queryByBounds = function (params) {
    var me = this;
    var queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图距离查询服务
 * @param params:
 *     <QueryByDistanceParameters>
 */
ol.supermap.QueryService.prototype.queryByDistance = function (params) {
    var me = this;
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryByDistanceService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图SQL查询服务
 * @param params:
 *     <QueryBySQLParameters>
 */
ol.supermap.QueryService.prototype.queryBySQL = function (params) {
    var me = this;
    var queryBySQLService = new SuperMap.REST.QueryBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryBySQLService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图几何查询服务
 * @param params:
 *     <QueryByGeometryParameters>
 */
ol.supermap.QueryService.prototype.queryByGeometry = function (params) {
    var me = this;
    var queryByGeometryService = new SuperMap.REST.QueryByGeometryService(url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
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

module.exports = ol.supermap.QueryService;
