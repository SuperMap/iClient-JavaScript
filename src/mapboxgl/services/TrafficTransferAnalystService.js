/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { StopQueryService } from '@supermap/iclient-common/iServer/StopQueryService';
import { TransferPathService } from '@supermap/iclient-common/iServer/TransferPathService';
import { TransferSolutionService } from '@supermap/iclient-common/iServer/TransferSolutionService';
/**
 * @class TrafficTransferAnalystService
 * @extends ServiceBase
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类。
 * @example
 * new TrafficTransferAnalystService(url)
 *  .queryStop(params,function(result){
 *      //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。
     * @param {StopQueryParameters} params - 站点查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    queryStop(params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        stopQueryService.processAsync(params);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。
     * @param {TransferPathParameters} params - 交通换乘线路查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferPath(params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        transferPathService.processAsync(me._processParams(params));
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。
     * @param {TransferSolutionParameters} params - 交通换乘方案查询参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferSolution(params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,

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
