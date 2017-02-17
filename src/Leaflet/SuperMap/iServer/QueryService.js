/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 * 用法：
 *      L.superMap.QueryService(url).queryByBoundsService{
 *           filter:{name:name},
 *           bounds:bounds
 *      }.on("complete",function(result){
 *          //doSomething like L.geoJSON(result.data[0]).addTo(map)
 *      }).on("failed",function(result){
 *          //doSomething
 *      });
 */
require('../../../Core/base');
require('../../../Core/iServer/QueryByBoundsService');
require('../../../Core/iServer/QueryByDistanceService');
require('../../../Core/iServer/QueryBySQLService');
require('../../../Core/iServer/QueryByGeometryService');
require('./ServiceBase');

QueryService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 地图bounds查询服务
     * @param params:
     *      bounds,returnContent,filter
     *      customParams,prjCoordSys,expectCount,networkType,queryOption,,startRecord,holdTime,returnCustomResult
     */
    queryByBoundsService: function (params) {
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
    },

    /**
     * 地图距离查询服务
     * @param params:
     *      distance,geometry,isNearest,returnContent,filter
     *      customParams,prjCoordSys,expectCount,networkType,queryOption,,startRecord,holdTime,returnCustomResult
     */
    queryByDistanceService: function (params) {
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
    },

    /**
     * 地图SQL查询服务
     * @param params:
     *      returnContent,filter
     *      customParams,prjCoordSys,expectCount,networkType,queryOption,,startRecord,holdTime,returnCustomResult
     */
    queryBySQLService: function (params) {
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
    },

    /**
     * 地图几何查询服务
     * @param params:
     *      geometry,returnContent,spatialQueryMode,filter
     *      customParams,prjCoordSys,expectCount,networkType,queryOption,,startRecord,holdTime,returnCustomResult
     */
    queryByGeometryService: function (params) {
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
    },
    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        //对外接口调用使用filter,内部参数使用queryParams，跟iClient保持一致
        params.queryParams = L.Util.isArray(params.filter) ? params.filter : [params.filter];
        if (params.bounds && params.bounds instanceof L.LatLngBounds) {
            params.bounds = new SuperMap.Bounds(
                params.bounds.getSouthWest().lng,
                params.bounds.getSouthWest().lat,
                params.bounds.getNorthEast().lng,
                params.bounds.getNorthEast().lat
            );
        }
        if (params.geometry) {
            if (params.geometry instanceof L.Point) {
                params.geometry = new SuperMap.Geometry.Point(params.geometry.x, params.geometry.y);
            } else {
                params.geometry = L.Util.toSuperMapGeometry(params.geometry);
            }
        }

        return params;
    }


});

L.supermap.queryService = function (url, options) {
    return new QueryService(url, options);
};

module.exports = L.supermap.queryService;
