/**
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 * 用法：
 *      L.superMap.queryService(url)
 *      .queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/QueryByBoundsService');
require('../../common/iServer/QueryByDistanceService');
require('../../common/iServer/QueryBySQLService');
require('../../common/iServer/QueryByGeometryService');

QueryService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 地图bounds查询服务
     * @param params:
     * <SuperMap.QueryByBoundsParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     *
     */
    queryByBounds: function (params, callback, resultFormat) {
        var me = this;
        var queryService = new SuperMap.REST.QueryByBoundsService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 地图距离查询服务
     * @param params:
     * <QueryByDistanceParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    queryByDistance: function (params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new SuperMap.REST.QueryByDistanceService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByDistanceService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 地图SQL查询服务
     * @param params:
     * <SuperMap.QueryBySQLParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    queryBySQL: function (params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new SuperMap.REST.QueryBySQLService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryBySQLService.processAsync(me._processParams(params));
        return me;
    },

    /**
     * 地图几何查询服务
     * @param params:
     * <SuperMap.QueryByGeometryParameters>
     * @param callback
     * @param resultFormat
     * <SuperMap.DataFormat>
     */
    queryByGeometry: function (params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new SuperMap.REST.QueryByGeometryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByGeometryService.processAsync(me._processParams(params));
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
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

L.supermap.queryService = function (url, options) {
    return new QueryService(url, options);
};

module.exports = L.supermap.queryService;
