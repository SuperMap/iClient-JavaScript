import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import FacilityAnalystSinks3DService from '../../common/iServer/FacilityAnalystSinks3DService';
import FacilityAnalystSources3DService from '../../common/iServer/FacilityAnalystSources3DService';
import FacilityAnalystTraceup3DService from '../../common/iServer/FacilityAnalystTraceup3DService';
import FacilityAnalystTracedown3DService from '../../common/iServer/FacilityAnalystTracedown3DService';
import FacilityAnalystUpstream3DService from '../../common/iServer/FacilityAnalystUpstream3DService';

/**
 * @class L.supermap.networkAnalyst3DService
 * @classdesc 3D网络分析服务类
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
     * @return {this}
     */
    sinksFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystSinks3DService.processAsync(params);
        return me;
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务
     * @param params -{SuperMap.FacilityAnalystSources3DParameters} 最近设施分析参数类(源查找服务)
     * @param callback - {function} 回调函数
     *  @return {this}
     */
    sourcesFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystSources3DService.processAsync(params);
        return me;
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务
     * @param params - {SuperMap.FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
     * @param callback - {function} 回调函数
     *  @return {this}
     */
    traceUpFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystTraceup3DService.processAsync(params);
        return me;
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务
     * @param params {SuperMap.FacilityAnalystTracedown3DParameters} 下游追踪资源服务参数类
     * @param callback - {function} 回调函数
     * @return {this}
     */
    traceDownFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystTracedown3DService.processAsync(params);
        return me;
    },

    /**
     * @function L.supermap.networkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务
     * @param params -{SuperMap.FacilityAnalystUpstream3DParameters} 上游关键设施查找服务参数类
     * @param callback - {function} 回调函数
     * @return {this}
     */
    upstreamFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        facilityAnalystUpstream3DService.processAsync(params);
        return me;
    }
});

export var networkAnalyst3DService = function (url, options) {
    return new NetworkAnalyst3DService(url, options);
};

L.supermap.networkAnalyst3DService = networkAnalyst3DService;