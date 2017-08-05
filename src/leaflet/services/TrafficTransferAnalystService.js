
import L from "leaflet";
import {ServiceBase} from './ServiceBase';
import StopQueryService from '../../common/iServer/StopQueryService';
import TransferPathService from '../../common/iServer/TransferPathService';
import TransferSolutionService from '../../common/iServer/TransferSolutionService';
/**
 * @class L.supermap.TrafficTransferAnalystService
 * @constructs L.supermap.TrafficTransferAnalystService
 * @classdesc
 * 交通换乘分析服务类
 * @example 用法：
 * L.supermap。/trafficTransferAnalystService(url).queryStop(params,function(result){
 *      //doSomething
 *    })
 * @extends ServiceBase
 * @api
 */
export var TrafficTransferAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @method  L.supermap.TrafficTransferAnalystService.queryStop
     * @description 站点查询服务
     * @param params {StopQueryParameters}
     * @param callback
     */
    queryStop: function (params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        stopQueryService.processAsync(params);
        return me;
    },
    /**
     * @method  L.supermap.TrafficTransferAnalystService.analysisTransferPath
     * @description 交通换乘线路查询服务
     * @param params {TransferPathParameters}
     * @param callback
     */
    analysisTransferPath: function (params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferPathService.processAsync(me._processParams(params));
        return me;
    },
    /**
     * @method  L.supermap.TrafficTransferAnalystService.analysisTransferSolution
     * @description 交通换乘方案查询服务
     * @param params {TransferSolutionParameters}
     * @param callback
     */
    analysisTransferSolution: function (params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferSolutionService.processAsync(me._processParams(params));
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }

        if (params.points && L.Util.isArray(params.points)) {
            params.points.map(function (point, key) {
                params.points[key] = (point instanceof L.LatLng) ? {x: point.lng, y: point.lat} : point;
            });
        }
        return params;
    }
});

export var trafficTransferAnalystService = function (url, options) {
    return new TrafficTransferAnalystService(url, options);
};

L.supermap.trafficTransferAnalystService = trafficTransferAnalystService;