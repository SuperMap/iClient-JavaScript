/*
 * Class:QueryService
 * 地图查询服务类
 * 提供：范围查询，SQL查询，几何查询，距离查询
 * 用法：
 *      L.supermap.queryService(url).queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var Util = require('../core/Util');
var QueryByBoundsService = require('../../common/iServer/QueryByBoundsService');
var QueryByDistanceService = require('../../common/iServer/QueryByDistanceService');
var QueryBySQLService = require('../../common/iServer/QueryBySQLService');
var QueryByGeometryService = require('../../common/iServer/QueryByGeometryService');
/**
 * @class  L.supermap.QueryService
 * @description 地图查询服务类。
 * @augments L.supermap.ServiceBase
 * @param url - {String} 地图查询服务访问地址。
 * @param - options - {Object} 服务交互时所需的可选参数。
 * @example
 * 用法：
 *      L.supermap.queryService(url).queryByBounds(param,function(result){
 *          //doSomething
 *      })
 */
var QueryService = ServiceBase.extend({

    /**
     * @function L.supermap.queryService.initialize
     * @description L.supermap.queryService类的构造函数。
     * @param url - {String} 地图查询服务访问地址。
     * @param options - {Object} 服务交互时所需的可选参数。
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.queryService.queryByBounds
     * @description bounds查询地图服务
     * @param params - {SuperMap.QueryByBoundsParameters} 通过Bounds查询的相关参数类
     * @param callback -{function} 回掉函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByBounds: function (params, callback, resultFormat) {
        var me = this;
        var queryService = new QueryByBoundsService(me.url, {
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
    },

    /**
     * @function L.supermap.queryService.queryByDistance
     * @description 地图距离查询服务
     * @param params - {QueryByDistanceParameters} Distance查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    queryByDistance: function (params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new QueryByDistanceService(me.url, {
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
    },

    /**
     * @function L.supermap.queryService.queryBySQL
     * @description 地图SQL查询服务
     * @param params - {SuperMap.QueryBySQLParameters} SQL查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    queryBySQL: function (params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(me.url, {
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
    },

    /**
     * @function L.supermap.queryService.queryByGeometry
     * @description 地图几何查询服务
     * @param params - {SuperMap.QueryByGeometryParameters} Geometry查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByGeometry: function (params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new QueryByGeometryService(me.url, {
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
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.queryParams && !L.Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }

        if (params.bounds ) {
            params.bounds=L.supermap.CommontypesConversion.toSuperMapBounds(params.bounds);
        }

        if (params.geometry) {
            if (params.geometry instanceof L.Point) {
                params.geometry = new SuperMap.Geometry.Point(params.geometry.x, params.geometry.y);
            } else {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
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

module.exports = QueryService;
