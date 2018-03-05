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
 * @classdesc 3D网络分析服务类
 * @category  iServer FacilityAnalyst3D
 * @extends L.supermap.ServiceBase
 * @example
 * L.supermap.networkAnalyst3DService(url)
 *  .sinksFacilityAnalyst(params,function(result){
 *     //doSomething
 * })
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                      "http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 服务所需可选参数
 */
export var NetworkAnalyst3DService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function  L.supermap.networkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务
     * @param params - {SuperMap.FacilityAnalystSinks3DParameters} 最近设施分析参数类(汇查找资源)
     * @param callback - {function} 回调函数
     */
    sinksFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.url, {
            proxy: me.options.proxy,
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
     * @description 源查找服务
     * @param params -{SuperMap.FacilityAnalystSources3DParameters} 最近设施分析参数类(源查找服务)
     * @param callback - {function} 回调函数
     *  @return {this} this
     */
    sourcesFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.url, {
            proxy: me.options.proxy,
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
     * @description 上游追踪资源服务
     * @param params - {SuperMap.FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
     * @param callback - {function} 回调函数
     *  @return {this} this
     */
    traceUpFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.url, {
            proxy: me.options.proxy,
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
     * @description 下游追踪资源服务
     * @param params {SuperMap.FacilityAnalystTracedown3DParameters} 下游追踪资源服务参数类
     * @param callback - {function} 回调函数
     */
    traceDownFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.url, {
            proxy: me.options.proxy,
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
     * @description 上游关键设施查找服务
     * @param params -{SuperMap.FacilityAnalystUpstream3DParameters} 上游关键设施查找服务参数类
     * @param callback - {function} 回调函数
     */
    upstreamFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.url, {
            proxy: me.options.proxy,
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