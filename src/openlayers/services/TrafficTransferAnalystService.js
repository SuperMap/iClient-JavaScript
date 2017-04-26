/**
 * Class: TrafficTransferAnalystService
 * 交通换乘分析服务类
 * 用法：
 *      new ol.supermap.TrafficTransferAnalystService(url)
 *      .queryStop(params,function(result){
 *           //doSomething
 *      })
 */
require('./ServiceBase');
require('../../common/iServer/StopQueryService');
require('../../common/iServer/TransferPathService');
require('../../common/iServer/TransferSolutionService');

ol.supermap.TrafficTransferAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
};

ol.inherits(ol.supermap.TrafficTransferAnalystService, ol.supermap.ServiceBase);

/**
 * 站点查询服务
 * @param params
 * {StopQueryParameters}
 * @param callback
 */
ol.supermap.TrafficTransferAnalystService.prototype.queryStop = function (params, callback) {
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
};

/**
 * 交通换乘线路查询服务
 * @param params
 * {TransferPathParameters}
 * @param callback
 */
ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferPath = function (params, callback) {
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
};

/**
 * 交通换乘方案查询服务
 * @param params
 *{TransferSolutionParameters}
 * @param callback
 */
ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferSolution = function (params, callback) {
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
};

ol.supermap.TrafficTransferAnalystService.prototype._processParams = function (params) {
    if (!params) {
        return {};
    }
    if (params.transferLines && !ol.supermap.Util.isArray(params.transferLines)) {
        params.transferLines = [params.transferLines];
    }
    if (params.points && ol.supermap.Util.isArray(params.points)) {
        params.points.map(function (point, key) {
            params.points[key] = (point instanceof ol.geom.Point) ? {
                x: point.flatCoordinates[0],
                y: point.flatCoordinates[1]
            } : point;
        });
    }
    return params;
};

module.exports = ol.supermap.TrafficTransferAnalystService;