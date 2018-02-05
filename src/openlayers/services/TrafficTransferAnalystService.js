import ol from 'openlayers';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {StopQueryService, TransferPathService, TransferSolutionService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.TrafficTransferAnalystService
 * @extends ol.supermap.ServiceBase
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类
 * @example
 *      new ol.supermap.TrafficTransferAnalystService(url)
 *      .queryStop(params,function(result){
 *           //doSomething
 *      })
 * @param url - {String} 服务地址
 * @param option - {Object} 参数。<br>
 *        serverType - {String} 服务来源 iServer|iPortal|online
 */
export class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务
     * @param params - {SuperMap.StopQueryParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     */
    queryStop(params, callback) {
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
    }

    /**
     * @function ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务
     * @param params - {SuperMap.TransferPathParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     */
    analysisTransferPath(params, callback) {
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
    }

    /**
     * @function ol.supermap.TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务
     * @param params - {SuperMap.TransferSolutionParameters} 查询相关参数类
     * @param callback - {function} 回调函数
     */
    analysisTransferSolution(params, callback) {
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
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.transferLines && !Util.isArray(params.transferLines)) {
            params.transferLines = [params.transferLines];
        }
        if (params.points && Util.isArray(params.points)) {
            params.points.map(function (point, key) {
                params.points[key] = (point instanceof ol.geom.Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.points[key];
            });
        }
        return params;
    }

}
ol.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;