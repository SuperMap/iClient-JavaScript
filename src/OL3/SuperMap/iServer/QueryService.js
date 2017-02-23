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

ol.supermap.QueryService.prototype.queryByBounds = function (params) {
    var me = this, param = me._processParams(params);
    var queryByBoundsParams = new SuperMap.REST.QueryByBoundsParameters(param);
    var queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryService.processAsync(queryByBoundsParams);
    return me;
};

ol.supermap.QueryService.prototype.queryByDistance = function (params) {
    var me = this, param = me._processParams(params);
    var queryByDistanceParams = new SuperMap.REST.QueryByDistanceParameters(param);
    var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryByDistanceService.processAsync(queryByDistanceParams);
    return me;
};

ol.supermap.QueryService.prototype.queryBySQL = function (params) {
    var me = this, param = me._processParams(params);
    var queryBySQLParams = new SuperMap.REST.QueryBySQLParameters(param);
    var queryBySQLService = new SuperMap.REST.QueryBySQLService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryBySQLService.processAsync(queryBySQLParams);
    return me;
};

ol.supermap.QueryService.prototype.queryByGeometry = function (params) {
    var me = this, param = me._processParams(params);
    var queryByGeometryParameters = new SuperMap.REST.QueryByGeometryParameters(param);
    var queryByGeometryService = new SuperMap.REST.QueryByGeometryService(url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    queryByGeometryService.processAsync(queryByGeometryParameters);
    return me;
};

ol.supermap.QueryService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    params.returnContent = (params.returnContent == null) ? true : params.returnContent;
    params.queryParams = ol.supermap.Util.isArray(params.filter) ? params.filter : [params.filter];
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
