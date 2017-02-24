/**
 * Class: TrafficTransferAnalystService
 * 交通换乘分析服务类
 * 用法：
 *      L.superMap.trafficTransferAnalystService(url).queryStop({
 *           keyWord:xxx
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('../../../Core/base');
require('../../../Core/iServer/StopQueryService');
require('../../../Core/iServer/TransferPathService');
require('../../../Core/iServer/TransferSolutionService');
require('./ServiceBase');

TrafficTransferAnalystService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 站点查询服务
     * @param params
     * {StopQueryParameters}
     */
    queryStop: function (params) {
        var me = this;
        var stopQueryService = new SuperMap.REST.StopQueryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        stopQueryService.processAsync(params);
        return me;
    },
    /**
     * 交通换乘线路查询服务
     * @param params
     *    {TransferPathParameters}
     */
    analysisTransferPath: function (params) {
        var me = this, param = me._processParams(params);
        var transferPathService = new SuperMap.REST.TransferPathService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        transferPathService.processAsync(param);
        return me;
    },
    /**
     * 交通换乘方案查询服务
     * @param params
     *    {TransferSolutionParameters}
     */
    analysisTransferSolution: function (params) {
        var me = this, param = me._processParams(params);
        var transferSolutionService = new SuperMap.REST.TransferSolutionService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        transferSolutionService.processAsync(param);
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