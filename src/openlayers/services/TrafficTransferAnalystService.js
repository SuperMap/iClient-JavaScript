/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {StopQueryService, TransferPathService, TransferSolutionService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.TrafficTransferAnalystService
 * @extends {ol.supermap.ServiceBase}
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类。
 * @example
 *      new ol.supermap.TrafficTransferAnalystService(url)
 *      .queryStop(params,function(result){
 *           //doSomething
 *      })
 * @param {String} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。
     * @param {SuperMap.StopQueryParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    queryStop(params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @description 交通换乘线路查询服务。
     * @param {SuperMap.TransferPathParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferPath(params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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
     * @description 交通换乘方案查询服务。
     * @param {SuperMap.TransferSolutionParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferSolution(params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
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