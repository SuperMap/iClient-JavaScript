/*
 * Class: SuperMap.FacilityAnalystTraceup3DService
 * 上游追踪资源服务类
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./FacilityAnalystTraceup3DParameters');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.FacilityAnalystTraceup3DService
 * @description 上游追踪资源服务类
 * @augments SuperMap.ServiceBase
 * @param url - {String} 网络分析服务地址。请求网络分析服务，URL应为：<br>
 *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
 *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
 * @param options - {Object} 互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.FacilityAnalystTraceup3DService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * @function SuperMap.FacilityAnalystTraceup3DService.initialize
     * @description 上游追踪资源服务类构造函数。
     * @param url - {String} 网络分析服务地址。请求网络分析服务，URL应为：<br>
     *                        http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；<br>
     *                        例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * @param options - {Object} 互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.FacilityAnalystTraceup3DService.processAsync
     * @description 负责将客户端的查询参数传递到服务端。
     * @param params - {SuperMap.FacilityAnalystTraceup3DParameters} 上游追踪资源参数类
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "traceupresult" : "/traceupresult") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            edgeID: params.edgeID,
            nodeID: params.nodeID,
            weightName: params.weightName,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.FacilityAnalystTraceup3DService"
});

module.exports = SuperMap.FacilityAnalystTraceup3DService;