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
require('../../../Core/base');
require('../../../Core/iServer/FacilityAnalystSinks3DService');
require('../../../Core/iServer/FacilityAnalystSources3DService');
require('../../../Core/iServer/FacilityAnalystTraceup3DService');
require('../../../Core/iServer/FacilityAnalystTracedown3DService');
require('../../../Core/iServer/FacilityAnalystUpstream3DService');
require('./ServiceBase');

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
     * edgeID: {Number} 指定的弧段ID
     * nodeID:  {Number}: 指定的结点ID
     * weightName: {String}: 指定的权值字段信息对象的名称
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效。
     */
    sinksFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystSinks3DParams = new SuperMap.REST.FacilityAnalystSinks3DParameters(param);
        var facilityAnalystSinks3DService = new SuperMap.REST.FacilityAnalystSinks3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystSinks3DService.processAsync(facilityAnalystSinks3DParams);
        return me;
    },
    /**
     * 源查找服务
     * @param params
     * edgeID: {Number} 指定的弧段ID
     * nodeID:  {Number}: 指定的结点ID
     * weightName: {String}: 指定的权值字段信息对象的名称
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效。
     */
    sourcesFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystSources3DParams = new SuperMap.REST.FacilityAnalystSources3DParameters(param);
        var facilityAnalystSources3DService = new SuperMap.REST.FacilityAnalystSources3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystSources3DService.processAsync(facilityAnalystSources3DParams);
        return me;
    },
    /**
     * 上游追踪资源服务
     * @param params
     * edgeID: {Number} 指定的弧段ID
     * nodeID:  {Number}: 指定的结点ID
     * weightName: {String}: 指定的权值字段信息对象的名称
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效。
     */
    traceUpFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystTraceup3DParams = new SuperMap.REST.FacilityAnalystTraceup3DParameters(param);
        var facilityAnalystTraceup3DService = new SuperMap.REST.FacilityAnalystTraceup3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystTraceup3DService.processAsync(facilityAnalystTraceup3DParams);
        return me;
    },
    /**
     * 下游追踪资源服务
     * @param params
     * edgeID: {Number} 指定的弧段ID
     * nodeID:  {Number}: 指定的结点ID
     * weightName: {String}: 指定的权值字段信息对象的名称
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效。
     */
    traceDownFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystTracedown3DParames = new SuperMap.REST.FacilityAnalystTracedown3DParameters(param);
        var facilityAnalystTracedown3DService = new SuperMap.REST.FacilityAnalystTracedown3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystTracedown3DService.processAsync(facilityAnalystTracedown3DParames);
        return me;
    },

    /**
     * 上游关键设施查找服务
     * @param params
     * sourceNodeIDs:{Array<Number>} 指定的设施点ID数组
     * edgeID: {Number} 指定的弧段ID
     * nodeID:  {Number}: 指定的结点ID
     * weightName: {String}: 指定的权值字段信息对象的名称
     * isUncertainDirectionValid: {Boolean}: 指定不确定流向是否有效。
     */
    upstreamFacilityAnalyst: function (params) {
        var me = this;
        var facilityAnalystUpstream3DParams = new SuperMap.REST.FacilityAnalystUpstream3DParameters(param);
        var facilityAnalystUpstream3DService = new SuperMap.REST.FacilityAnalystUpstream3DService(me.options.url, {
            eventListeners: {
                scope: me,
                processCompleted: me.processCompleted,
                processFailed: me.processFailed
            }
        });
        facilityAnalystUpstream3DService.processAsync(facilityAnalystUpstream3DParams);
        return me;
    }
});

L.supermap.networkAnalyst3DService = function (url, options) {
    return new NetworkAnalyst3DService(url, options);
};

module.exports = L.supermap.networkAnalyst3DService;