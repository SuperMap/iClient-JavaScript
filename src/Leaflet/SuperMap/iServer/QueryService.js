/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 * 用法：
 *      L.superMap.queryService(url).queryByBounds{
 *           filter:{name:name},
 *           bounds:bounds
 *      }.on("complete",function(result){
 *          //doSomething
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
     *     <QueryByBoundsParameters>
     * @param resultFormat
     */
    queryByBounds: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        queryService.processAsync(param);
        return me;
    },

    /**
     * 地图距离查询服务
     * @param params:
     *     <QueryByDistanceParameters>
     * @param resultFormat
     */
    queryByDistance: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        queryByDistanceService.processAsync(param);
        return me;
    },

    /**
     * 地图SQL查询服务
     * @param params:
     *     <QueryBySQLParameters>
     * @param resultFormat
     */
    queryBySQL: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var queryBySQLService = new SuperMap.REST.QueryBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        queryBySQLService.processAsync(param);
        return me;
    },

    /**
     * 地图几何查询服务
     * @param params:
     *     <QueryByGeometryParameters>
     * @param resultFormat
     */
    queryByGeometry: function (params, resultFormat) {
        var me = this, param = me._processParams(params), format = me._processFormat(resultFormat);
        var queryByGeometryService = new SuperMap.REST.QueryByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            },
            format: format
        });

        queryByGeometryService.processAsync(param);
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.queryParams && !L.Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }

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
    },
    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : Format.GEOJSON;
    }
});

L.supermap.queryService = function (url, options) {
    return new QueryService(url, options);
};

module.exports = L.supermap.queryService;
