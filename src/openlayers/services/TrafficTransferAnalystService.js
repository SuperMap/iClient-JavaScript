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
var ol = require('openlayers');
var Util = require('../core/Util');
var StopQueryService = require('../../common/iServer/StopQueryService');
var TransferPathService = require('../../common/iServer/TransferPathService');
var TransferSolutionService = require('../../common/iServer/TransferSolutionService');

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
    var stopQueryService = new StopQueryService(me.options.url, {
        serverType: me.options.serverType,
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
    var transferPathService = new TransferPathService(me.options.url, {
        serverType: me.options.serverType,
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
    var transferSolutionService = new TransferSolutionService(me.options.url, {
        serverType: me.options.serverType,
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
    if (params.transferLines && !Util.isArray(params.transferLines)) {
        params.transferLines = [params.transferLines];
    }
    if (params.points && Util.isArray(params.points)) {
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