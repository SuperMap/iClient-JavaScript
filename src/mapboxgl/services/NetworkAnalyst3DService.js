import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {
    FacilityAnalystSinks3DService,
    FacilityAnalystSources3DService,
    FacilityAnalystTraceup3DService,
    FacilityAnalystTracedown3DService,
    FacilityAnalystUpstream3DService
} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.NetworkAnalyst3DService
 * @category  iServer FacilityAnalyst3D
 * @classdesc 3D网络分析服务类
 * @extends mapboxgl.supermap.ServiceBase
 * @example
 *      new mapboxgl.supermap.NetworkAnalyst3DService(url)
 *      .sinksFacilityAnalyst(params,function(result){
 *           //doSomething
 *      })
 * @param url - {string} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 服务所需可选参数。如：<br>
 *        eventListeners - {Object} 需要被注册的监听器对象
 */
export class NetworkAnalyst3DService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.sinksFacilityAnalyst
     * @description 汇查找服务
     * @param params - {SuperMap.FacilityAnalystSinks3DParameters} 最近设施分析参数类(汇查找资源)
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    sinksFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.sourcesFacilityAnalyst
     * @description 源查找服务
     * @param params -{SuperMap.FacilityAnalystSources3DParameters} 最近设施分析参数类(源查找服务)
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    sourcesFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.traceUpFacilityAnalyst
     * @description 上游追踪资源服务
     * @param params - {SuperMap.FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */

    traceUpFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.traceDownFacilityAnalyst
     * @description 下游追踪资源服务
     * @param params - {SuperMap.FacilityAnalystTracedown3DParameters} 下游追踪资源服务参数类
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    traceDownFacilityAnalyst(params, callback) {
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
    }

    /**
     * @function mapboxgl.supermap.NetworkAnalyst3DService.prototype.upstreamFacilityAnalyst
     * @description 上游关键设施查找服务
     * @param params -{SuperMap.FacilityAnalystUpstream3DParameters} 上游关键设施查找服务参数类
     * @param callback - {function} 回调函数
     * @return {mapboxgl.supermap.NetworkAnalyst3DService} 3D网络分析服务
     */
    upstreamFacilityAnalyst(params, callback) {
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
}

mapboxgl.supermap.NetworkAnalyst3DService = NetworkAnalyst3DService;