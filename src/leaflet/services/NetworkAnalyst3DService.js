/**
 * Class: NetworkAnalyst3DService
 * 3D网络分析服务类
 * 用法：
 *      L.superMap.networkAnalyst3DService(url).sinksFacilityAnalyst({
 *          nodeID:xxx,
 *          weightName:xxx
 *      }).on("complete",function(result){
 *           //doSomething
 *      }).on("failed",function(result){
 *           //doSomething
 *      });
 */
require('./ServiceBase');
require('../../common/iServer/FacilityAnalystSinks3DService');
require('../../common/iServer/FacilityAnalystSources3DService');
require('../../common/iServer/FacilityAnalystTraceup3DService');
require('../../common/iServer/FacilityAnalystTracedown3DService');
require('../../common/iServer/FacilityAnalystUpstream3DService');

NetworkAnalyst3DService = ServiceBase.extend({

    /**
     * url - {String} 网络分析服务地址。请求网络分析服务，URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * @param url
     * @param options
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 汇查找服务
     * @param params
     *      <FacilityAnalystSinks3DParameters>
     */
    sinksFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystSinks3DService = new SuperMap.REST.FacilityAnalystSinks3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystSinks3DService.processAsync(params);
        return me;
    },
    /**
     * 源查找服务
     * @param params
     *      <FacilityAnalystSources3DParameters>
     */
    sourcesFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystSources3DService = new SuperMap.REST.FacilityAnalystSources3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystSources3DService.processAsync(params);
        return me;
    },
    /**
     * 上游追踪资源服务
     * @param params
     *      <FacilityAnalystTraceup3DParameters>
     */
    traceUpFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystTraceup3DService = new SuperMap.REST.FacilityAnalystTraceup3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystTraceup3DService.processAsync(params);
        return me;
    },
    /**
     * 下游追踪资源服务
     * @param params
     *      <FacilityAnalystTracedown3DParameters>
     */
    traceDownFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystTracedown3DService = new SuperMap.REST.FacilityAnalystTracedown3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystTracedown3DService.processAsync(params);
        return me;
    },

    /**
     * 上游关键设施查找服务
     * @param params
     *      <FacilityAnalystUpstream3DParameters>
     */
    upstreamFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystUpstream3DService = new SuperMap.REST.FacilityAnalystUpstream3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystUpstream3DService.processAsync(params);
        return me;
    }
});

L.supermap.networkAnalyst3DService = function (url, options) {
    return new NetworkAnalyst3DService(url, options);
};

module.exports = L.supermap.networkAnalyst3DService;