import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import * as Util from  '../core/Util';
import QueryByBoundsService from  '../../common/iServer/QueryByBoundsService';
import QueryByDistanceService from  '../../common/iServer/QueryByDistanceService';
import QueryBySQLService from  '../../common/iServer/QueryBySQLService';
import QueryByGeometryService from  '../../common/iServer/QueryByGeometryService';
import CommontypesConversion from '../core/CommontypesConversion';
/**
 * @class  L.supermap.queryService
 * @classdesc 地图查询服务类。
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
     * @return {this}
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
     * @function L.supermap.queryService.prototype.queryByDistance
     * @description 地图距离查询服务
     * @param params - {SuperMap.QueryByDistanceParameters} Distance查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     * @return {this}
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
     * @function L.supermap.queryService.prototype.queryBySQL
     * @description 地图SQL查询服务
     * @param params - {SuperMap.QueryBySQLParameters} SQL查询相关参数类
     * @param callback -{function} 回调函数
     * @param resultFormat -{SuperMap.DataFormat} 返回结果类型
     * @return {this}
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
     * @function L.supermap.queryService.prototype.queryByGeometry
     * @description 地图几何查询服务
     * @param params - {SuperMap.QueryByGeometryParameters} Geometry查询相关参数类
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回结果类型
     * @return {this}
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
            params.bounds=CommontypesConversion.toSuperMapBounds(params.bounds);
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

export var queryService = function (url, options) {
    return new QueryService(url, options);
};

L.supermap.queryService = queryService;
