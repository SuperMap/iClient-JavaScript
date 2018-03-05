import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import * as Util from '../core/Util';
import {CommontypesConversion} from '../core/CommontypesConversion';
import {
    GeometryPoint,
    DataFormat,
    QueryByBoundsService,
    QueryByDistanceService,
    QueryBySQLService,
    QueryByGeometryService
} from '@supermap/iclient-common';

/**
 * @class  L.supermap.queryService
 * @classdesc 地图查询服务类。
 * @category  iServer Map QueryResults
 * @extends L.supermap.ServiceBase
 * @param url - {string} 地图查询服务访问地址。
 * @param - options - {Object} 服务交互时所需的可选参数。如：<br>
 *          serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 * @example
 * L.supermap.queryService(url).queryByBounds(param,function(result){
 *   //doSomething
 * })
 */
export var QueryService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.queryService.prototype.queryByBounds
     * @description bounds查询地图服务
     * @param params - {SuperMap.QueryByBoundsParameters} 通过Bounds查询的相关参数类
     * @param callback -{function} 回掉函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByBounds: function (params, callback, resultFormat) {
        var me = this;
        var queryService = new QueryByBoundsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.queryService.prototype.queryByDistance
     * @description 地图距离查询服务
     * @param params - {SuperMap.QueryByDistanceParameters} Distance查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    queryByDistance: function (params, callback, resultFormat) {
        var me = this;
        var queryByDistanceService = new QueryByDistanceService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByDistanceService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.queryService.prototype.queryBySQL
     * @description 地图SQL查询服务
     * @param params - {SuperMap.QueryBySQLParameters} SQL查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     */
    queryBySQL: function (params, callback, resultFormat) {
        var me = this;
        var queryBySQLService = new QueryBySQLService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryBySQLService.processAsync(me._processParams(params));
    },

    /**
     * @function L.supermap.queryService.prototype.queryByGeometry
     * @description 地图几何查询服务
     * @param params - {SuperMap.QueryByGeometryParameters} Geometry查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     */
    queryByGeometry: function (params, callback, resultFormat) {
        var me = this;
        var queryByGeometryService = new QueryByGeometryService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: me._processFormat(resultFormat)
        });

        queryByGeometryService.processAsync(me._processParams(params));
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.queryParams && !L.Util.isArray(params.queryParams)) {
            params.queryParams = [params.queryParams];
        }

        if (params.bounds) {
            params.bounds = CommontypesConversion.toSuperMapBounds(params.bounds);
        }

        if (params.geometry) {
            if (params.geometry instanceof L.Point) {
                params.geometry = new GeometryPoint(params.geometry.x, params.geometry.y);
            } else {
                params.geometry = Util.toSuperMapGeometry(params.geometry);
            }
        }

        return params;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }
});

export var queryService = function (url, options) {
    return new QueryService(url, options);
};

L.supermap.queryService = queryService;