/**
 * Class: SuperMap.FacilityAnalystUpstream3DService
 * 上游关键设施查找资源服务类
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./FacilityAnalystUpstream3DParameters');
var SuperMap = require('../SuperMap');
SuperMap.FacilityAnalystUpstream3DService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constructor: SuperMap.FacilityAnalystUpstream3DService
     * 上游关键设施查找资源服务类构造函数。
     *
     * Parameters:
     * url - {String} 网络分析服务地址。请求网络分析服务，URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */

    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.FacilityAnalystUpstream3DParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "upstreamcirticalfaclilities" :
                "/upstreamcirticalfaclilities") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            edgeID: params.edgeID,
            nodeID: params.nodeID,
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

    CLASS_NAME: "SuperMap.FacilityAnalystUpstream3DService"
});

module.exports = SuperMap.FacilityAnalystUpstream3DService;
