/**
 * Class: NetworkAnalyst3DService
 * 3D网络分析服务类
 * 用法：
 *      L.supermap.networkAnalyst3DService(url)
 *      .sinksFacilityAnalyst(params,function(result){
 *           //doSomething
 *      })
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var FacilityAnalystSinks3DService = require('../../common/iServer/FacilityAnalystSinks3DService');
var FacilityAnalystSources3DService = require('../../common/iServer/FacilityAnalystSources3DService');
var FacilityAnalystTraceup3DService = require('../../common/iServer/FacilityAnalystTraceup3DService');
var FacilityAnalystTracedown3DService = require('../../common/iServer/FacilityAnalystTracedown3DService');
var FacilityAnalystUpstream3DService = require('../../common/iServer/FacilityAnalystUpstream3DService');

var NetworkAnalyst3DService = ServiceBase.extend({

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
     * <FacilityAnalystSinks3DParameters>
     * @param callback
     */
    sinksFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSinks3DService = new FacilityAnalystSinks3DService(me.options.url, {
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
     * 源查找服务
     * @param params
     * <FacilityAnalystSources3DParameters>
     * @param callback
     */
    sourcesFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystSources3DService = new FacilityAnalystSources3DService(me.options.url, {
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
     * 上游追踪资源服务
     * @param params
     * <FacilityAnalystTraceup3DParameters>
     * @param callback
     */
    traceUpFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTraceup3DService = new FacilityAnalystTraceup3DService(me.options.url, {
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
     * 下游追踪资源服务
     * @param params
     *  <FacilityAnalystTracedown3DParameters>
     * @param callback
     */
    traceDownFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystTracedown3DService = new FacilityAnalystTracedown3DService(me.options.url, {
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
     * 上游关键设施查找服务
     * @param params
     * <FacilityAnalystUpstream3DParameters>
     * @param callback
     */
    upstreamFacilityAnalyst: function (params, callback) {
        var me = this;
        var facilityAnalystUpstream3DService = new FacilityAnalystUpstream3DService(me.options.url, {
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

L.supermap.networkAnalyst3DService = function (url, options) {
    return new NetworkAnalyst3DService(url, options);
};

module.exports = NetworkAnalyst3DService;