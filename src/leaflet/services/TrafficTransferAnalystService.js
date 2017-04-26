/**
 * Class: TrafficTransferAnalystService
 * 交通换乘分析服务类
 * 用法：
 *      L.superMap
 *      .trafficTransferAnalystService(url)
 *      .queryStop(params,function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/StopQueryService');
require('../../common/iServer/TransferPathService');
require('../../common/iServer/TransferSolutionService');

TrafficTransferAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 站点查询服务
     * @param params
     * {StopQueryParameters}
     * @param callback
     */
    queryStop: function (params, callback) {
        var me = this;
        var stopQueryService = new SuperMap.REST.StopQueryService(me.options.url, {
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
     * 交通换乘线路查询服务
     * @param params
     * {TransferPathParameters}
     * @param callback
     */
    analysisTransferPath: function (params, callback) {
        var me = this;
        var transferPathService = new SuperMap.REST.TransferPathService(me.options.url, {
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
     * 交通换乘方案查询服务
     * @param params
     *{TransferSolutionParameters}
     * @param callback
     */
    analysisTransferSolution: function (params, callback) {
        var me = this;
        var transferSolutionService = new SuperMap.REST.TransferSolutionService(me.options.url, {
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

L.supermap.trafficTransferAnalystService = function (url, options) {
    return new TrafficTransferAnalystService(url, options);
};

module.exports = L.supermap.trafficTransferAnalystService;