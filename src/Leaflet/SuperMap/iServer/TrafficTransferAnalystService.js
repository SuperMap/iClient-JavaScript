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
     * @param params
     *    keyWord , returnPosition
     */
    queryStop: function (params) {
        var me = this;
        var stopQueryParams = new SuperMap.REST.StopQueryParameters(params);
        var stopQueryService = new SuperMap.REST.StopQueryService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        stopQueryService.processAsync(stopQueryParams);
        return me;
    },
    /**
     * @param params
     *    transferLines(array):本换乘分段内可乘车的路线集合,TransferLine参数包括lineID，lineName，lineAliasName，startStopIndex，
     *                         startStopName，startStopAliasName，endStopIndex，endStopName，endStopAliasName
     *    points(array)： 1. 按照公交站点的起止ID进行查询,[起点ID、终点ID] 2. 按照起止点的坐标进行查询,[{"x":44,"y":39},{"x":45,"y":40}]
     */
    analysisTransferPath: function (params) {
        var me = this, param = me._processParams(params);

        var transferPathParams = new SuperMap.REST.TransferPathParameters(param);
        var transferPathService = new SuperMap.REST.TransferPathService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        transferPathService.processAsync(transferPathParams);
        return me;
    },
    /**
     * @param params
     *    solutionCount
     *    transferPreference:地铁优先、公交优先、不乘地铁、无偏好
     *    transferTactic:时间最短、距离最短、最少换乘、最少步行
     *    walkingRatio：步行与公交的消耗权重比，默认值为 10。此值越大，则步行因素对于方案选择的影响越大
     *    points(array)： 1. 按照公交站点的起止ID进行查询,[起点ID、终点ID] 2. 按照起止点的坐标进行查询,[{"x":44,"y":39},{"x":45,"y":40}]
     *    evadeLines(IDs),evadeStops(IDs),priorLines(IDs),priorStops(IDs),travelTime(08:30)
     */
    analysisTransferSolution: function (params) {
        var me = this, param = me._processParams(params);
        var transferSolutionParams = new SuperMap.REST.TransferSolutionParameters(param);
        var transferSolutionService = new SuperMap.REST.TransferSolutionService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        transferSolutionService.processAsync(transferSolutionParams);
        return me;
    },

    _processParams: function (params) {
        if (!params) {
            return {};
        }
        if (params.transferLines && !L.Util.isArray(params.transferLines)) {
            params.transferLines = [params.transferLines];
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