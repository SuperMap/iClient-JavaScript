/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import {StopQueryService, TransferPathService, TransferSolutionService} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.TrafficTransferAnalystService
 * @extends mapboxgl.supermap.ServiceBase
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类。
 * @example
 * new mapboxgl.supermap.TrafficTransferAnalystService(url)
 *  .queryStop(params,function(result){
 *      //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} option - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 */
export class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。
     * @param {SuperMap.StopQueryParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    queryStop(params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function mapboxgl.supermap.TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。
     * @param {SuperMap.TransferPathParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferPath(params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @function mapboxgl.supermap.TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。
     * @param {SuperMap.TransferSolutionParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferSolution(params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
                params.points[key] = (point instanceof mapboxgl.LngLat) ? {
                    x: point.lng,
                    y: point.lat
                } : point;
                return params.points[key];
            });
        }
        return params;
    }

}

mapboxgl.supermap.TrafficTransferAnalystService = TrafficTransferAnalystService;