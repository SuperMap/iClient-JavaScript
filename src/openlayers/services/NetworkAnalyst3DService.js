import ol from 'openlayers';
import {ServiceBase} from './ServiceBase';
import {
    FacilityAnalystSinks3DService,
    FacilityAnalystSources3DService,
    FacilityAnalystTraceup3DService,
    FacilityAnalystTracedown3DService,
    FacilityAnalystUpstream3DService
} from '@supermap/iclient-common';

/**
 * @class ol.supermap.NetworkAnalyst3DService
 * @category  iServer FacilityAnalyst3D
 * @classdesc 3D网络分析服务类
 * @extends ol.supermap.ServiceBase
 * @example
 *      new ol.supermap.NetworkAnalyst3DService(url)
 *      .sinksFacilityAnalyst(params,function(result){
 *           //doSomething
 *      })
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param {Object} options - 服务所需可选参数。
 * @param {string} options.proxy - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 */
export class NetworkAnalyst3DService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务
     * @param {SuperMap.FacilityAnalystSinks3DParameters} params - 最近设施分析参数类(汇查找资源)
     * @param {RequestCallback} callback 回调函数
     * @return {ol.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    sinksFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function ol.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务
     * @param {SuperMap.FacilityAnalystSources3DParameters} params - 最近设施分析参数类(源查找服务)
     * @param {RequestCallback} callback 回调函数
     * @return {ol.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    sourcesFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function ol.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务
     * @param {SuperMap.FacilityAnalystTraceup3DParameters} params - 上游追踪资源参数类
     * @param {RequestCallback} callback 回调函数
     * @return {ol.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */

    traceUpFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function ol.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务
     * @param {SuperMap.FacilityAnalystTracedown3DParameters} params - 下游追踪资源服务参数类
     * @param {RequestCallback} callback 回调函数
     * @return {ol.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    traceDownFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function ol.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务
     * @param {SuperMap.FacilityAnalystUpstream3DParameters} params - 上游关键设施查找服务参数类
     * @param {RequestCallback} callback 回调函数
     * @return {ol.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    upstreamFacilityAnalyst(params, callback) {
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
}

ol.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;