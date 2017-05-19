/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 * 用法：
 *      new ol.supermap.QueryService(url)
 *      .queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
require('./ServiceBase');
var ol = require('openlayers');
var Util = require('../core/Util');
var SuperMap = require('../../common/SuperMap');
var QueryByBoundsService = require('../../common/iServer/QueryByBoundsService');
var QueryByDistanceService = require('../../common/iServer/QueryByDistanceService');
var QueryBySQLService = require('../../common/iServer/QueryBySQLService');
var QueryByGeometryService = require('../../common/iServer/QueryByGeometryService');

ol.supermap.QueryService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.QueryService, ol.supermap.ServiceBase);

/**
 * 地图bounds查询服务
 * @param params:
 * <SuperMap.QueryByBoundsParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 *
 */
ol.supermap.QueryService.prototype.queryByBounds = function (params, callback, resultFormat) {
    var me = this;
    var queryService = new QueryByBoundsService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });

    queryService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图距离查询服务
 * @param params:
 * <QueryByDistanceParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.QueryService.prototype.queryByDistance = function (params, callback, resultFormat) {
    var me = this;
    var queryByDistanceService = new QueryByDistanceService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });

    queryByDistanceService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图SQL查询服务
 * @param params:
 * <SuperMap.QueryBySQLParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.QueryService.prototype.queryBySQL = function (params, callback, resultFormat) {
    var me = this;
    var queryBySQLService = new QueryBySQLService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
        },
        format: me._processFormat(resultFormat)
    });

    queryBySQLService.processAsync(me._processParams(params));
    return me;
};

/**
 * 地图几何查询服务
 * @param params:
 * <SuperMap.QueryByGeometryParameters>
 * @param callback
 * @param resultFormat
 * <SuperMap.DataFormat>
 */
ol.supermap.QueryService.prototype.queryByGeometry = function (params, callback, resultFormat) {
    var me = this;
    var queryByGeometryService = new QueryByGeometryService(me.options.url, {
        serverType: me.options.serverType,
        eventListeners: {
            scope: me,
            processCompleted: callback,
            processFailed: callback
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
    if (params.queryParams && !Util.isArray(params.queryParams)) {
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
            params.geometry = Util.toSuperMapGeometry(JSON.parse((new ol.format.GeoJSON()).writeGeometry(params.geometry)));
        }
    }
    return params;
};

ol.supermap.QueryService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

module.exports = ol.supermap.QueryService;
