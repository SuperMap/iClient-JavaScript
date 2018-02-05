import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {StopQueryService, TransferPathService, TransferSolutionService} from '@supermap/iclient-common';

/**
 * @class L.supermap.trafficTransferAnalystService
 * @classdesc 交通换乘分析服务类
 * @category  iServer TrafficTransferAnalyst
 * @example
 * L.supermap.trafficTransferAnalystService(url).queryStop(params,function(result){
 *   //doSomething
 * })
 * @extends L.supermap.ServiceBase
 * @param url - {string} 服务地址
 * @param option - {Object} 可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
 */
export var TrafficTransferAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function  L.supermap.trafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务
     * @param params - {SuperMap.StopQueryParameters} 站点查询参数类
     * @param callback - {function} 回调函数
     */
    queryStop: function (params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        stopQueryService.processAsync(params);
    },
    /**
     * @function  L.supermap.trafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务
     * @param params - {SuperMap.TransferPathParameters} 交通换乘线路查询参数类
     * @param callback - {function} 回调函数
     */
    analysisTransferPath: function (params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferPathService.processAsync(me._processParams(params));
    },
    /**
     * @function  L.supermap.trafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务
     * @param params {SuperMap.TransferSolutionParameters} 交通换乘方案查询参数类
     * @param callback - {function} 回调函数
     */
    analysisTransferSolution: function (params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferSolutionService.processAsync(me._processParams(params));
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }

        if (params.points && L.Util.isArray(params.points)) {
            params.points.map(function (point, key) {
                params.points[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
                return params.points[key];
            });
        }
        return params;
    }
});

export var trafficTransferAnalystService = function (url, options) {
    return new TrafficTransferAnalystService(url, options);
};

L.supermap.trafficTransferAnalystService = trafficTransferAnalystService;