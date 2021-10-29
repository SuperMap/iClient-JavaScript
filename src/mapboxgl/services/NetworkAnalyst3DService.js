/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import { FacilityAnalystSinks3DService } from '@supermap/iclient-common/iServer/FacilityAnalystSinks3DService';
import { FacilityAnalystSources3DService } from '@supermap/iclient-common/iServer/FacilityAnalystSources3DService';
import { FacilityAnalystTraceup3DService } from '@supermap/iclient-common/iServer/FacilityAnalystTraceup3DService';
import { FacilityAnalystTracedown3DService } from '@supermap/iclient-common/iServer/FacilityAnalystTracedown3DService';
import { FacilityAnalystUpstream3DService } from '@supermap/iclient-common/iServer/FacilityAnalystUpstream3DService';

/**
 * @class mapboxgl.supermap.NetworkAnalyst3DService
 * @category  iServer FacilityAnalyst3D
 * @classdesc 3D 网络分析服务类。
 * @extends {mapboxgl.supermap.ServiceBase}
 * @example
 * new mapboxgl.supermap.NetworkAnalyst3DService(url)
 *  .sinksFacilityAnalyst(params,function(result){
 *     //doSomething
 * })
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为：</br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}。
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 服务所需可选参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class NetworkAnalyst3DService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务。
     * @param {SuperMap.FacilityAnalystSinks3DParameters} params - 最近设施分析参数类（汇查找资源）。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {mapboxgl.supermap.NetworkAnalyst3DService} 3D 网络分析服务。
     */
    sinksFacilityAnalyst(params, callback) {
        var me = this;
        var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.url, {
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
        facilityAnalystSinks3DService.processAsync(params);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务。
     * @param {SuperMap.FacilityAnalystSources3DParameters} params - 最近设施分析参数类（源查找服务）。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {mapboxgl.supermap.NetworkAnalyst3DService} 3D 网络分析服务。
     */
    sourcesFacilityAnalyst(params, callback) {
        var me = this;
        var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.url, {
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
        facilityAnalystSources3DService.processAsync(params);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务。
     * @param {SuperMap.FacilityAnalystTraceup3DParameters} params - 上游追踪资源参数类。
     * @param {RequestCallback} callback 回调函数。
     * @returns {mapboxgl.supermap.NetworkAnalyst3DService} 3D 网络分析服务。
     */

    traceUpFacilityAnalyst(params, callback) {
        var me = this;
        var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.url, {
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
        facilityAnalystTraceup3DService.processAsync(params);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务。
     * @param {SuperMap.FacilityAnalystTracedown3DParameters} params - 下游追踪资源服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @returns {mapboxgl.supermap.NetworkAnalyst3DService} 3D 网络分析服务。
     */
    traceDownFacilityAnalyst(params, callback) {
        var me = this;
        var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.url, {
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
        facilityAnalystTracedown3DService.processAsync(params);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务。
     * @param {SuperMap.FacilityAnalystUpstream3DParameters} params - 上游关键设施查找服务参数类。
     * @param {RequestCallback} callback 回调函数。
     * @returns {mapboxgl.supermap.NetworkAnalyst3DService} 3D 网络分析服务。
     */
    upstreamFacilityAnalyst(params, callback) {
        var me = this;
        var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.url, {
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
        facilityAnalystUpstream3DService.processAsync(params);
    }
}

mapboxgl.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;