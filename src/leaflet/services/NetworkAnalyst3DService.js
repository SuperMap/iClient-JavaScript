/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
* This program are made available under the terms of the Apache License, Version 2.0
* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {
    FacilityAnalystSinks3DService,
    FacilityAnalystSources3DService,
    FacilityAnalystTraceup3DService,
    FacilityAnalystTracedown3DService,
    FacilityAnalystUpstream3DService
} from '@supermap/iclient-common';

/**
 * @class L.supermap.networkAnalyst3DService
 * @classdesc 3D 网络分析服务类。
 * @category  iServer FacilityAnalyst3D
 * @extends {L.supermap.ServiceBase}
 * @example
 * L.supermap.networkAnalyst3DService(url)
 *  .sinksFacilityAnalyst(params,function(result){
 *     //doSomething
 * })
 * @param {string} url - 网络分析服务地址。请求网络分析服务，URL应为:
 *                      "http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export var NetworkAnalyst3DService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务。
     * @param {SuperMap.FacilityAnalystSinks3DParameters} params - 最近设施分析参数类（汇查找资源）。
     * @param {RequestCallback} callback - 回调函数。
     */
    sinksFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystSinks3DService.processAsync(params);
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务。
     * @param {SuperMap.FacilityAnalystSources3DParameters} params - 最近设施分析参数类（源查找服务）。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {this} this
     */
    sourcesFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystSources3DService.processAsync(params);
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务。
     * @param {SuperMap.FacilityAnalystTraceup3DParameters} params - 上游追踪资源参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {this} this
     */
    traceUpFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystTraceup3DService.processAsync(params);
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务。
     * @param {SuperMap.FacilityAnalystTracedown3DParameters} params - 下游追踪资源服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    traceDownFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystTracedown3DService.processAsync(params);
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务。
     * @param {SuperMap.FacilityAnalystUpstream3DParameters} params - 上游关键设施查找服务参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    upstreamFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystUpstream3DService.processAsync(params);
    }
});

export var networkAnalyst3DService = function (url, options) {
    return new NetworkAnalyst3DService(url, options);
};

L.supermap.networkAnalyst3DService = networkAnalyst3DService;