/**
 * Class: TrafficTransferAnalystService
 * 交通换乘分析服务类
 */
require('../../../Core/iServer/StopQueryService');
require('../../../Core/iServer/TransferPathService');
require('../../../Core/iServer/TransferSolutionService');

require('../../../Core/iServer/StopQueryParameters');
require('../../../Core/iServer/TransferPathParameters');
require('../../../Core/iServer/TransferSolutionParameters');
require('./ServiceBase');

ol.supermap.TrafficTransferAnalystService = function (url, options) {
    ol.supermap.ServiceBase.call(this, url, options);
}
ol.inherits(ol.supermap.TrafficTransferAnalystService, ol.supermap.ServiceBase);

/**
 * @param params {StopQueryParameters}
 */
ol.supermap.TrafficTransferAnalystService.prototype.queryStop = function (params) {
    var me = this;
    var stopQueryService = new SuperMap.REST.StopQueryService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    stopQueryService.processAsync(me._processParams(params));
    return me;
};

/**
 * @param params {TransferPathParameters}
 */
ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferPath = function (params) {
    var me = this;
    var transferPathService = new SuperMap.REST.TransferPathService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
        }
    });
    transferPathService.processAsync(me._processParams(params));
    return me;
};

/**
 * @param params {TransferSolutionParameters}
 */
ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferSolution = function (params) {
    var me = this;
    var transferSolutionService = new SuperMap.REST.TransferSolutionService(me.options.url, {
        eventListeners: {
            scope: me,
            processCompleted: me.processCompleted,
            processFailed: me.processFailed
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