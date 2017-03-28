/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.FacilityAnalystStreamService
 * 上游/下游 关键设施查找资源服务类;即查找给定弧段或节点的上游/下游中的关键设施结点，返回关键结点 ID 数组及其下游弧段 ID 数组。
 *
 * Inherits from:
 *  - <SuperMap.REST.NetworkAnalystServiceBase>
 */
require('./NetworkAnalystServiceBase');
require('./FacilityAnalystStreamParameters');
SuperMap.REST.FacilityAnalystStreamService = SuperMap.Class(SuperMap.REST.NetworkAnalystServiceBase, {

    /**
     * Constructor: SuperMap.REST.FacilityAnalystStreamService
     * 上游/下游关键设施查找资源服务类构造函数。
     *
     * Parameters:
     * url - {String} 网络分析服务地址。请求网络分析服务，URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如: "http://localhost:8090/iserver/services/test/rest/networkanalyst/WaterNet@FacilityNet";
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */

    initialize: function (url, options) {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.REST.NetworkAnalystServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<FacilityAnalystStreamParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject;
        var end = me.url.substr(me.url.length - 1, 1);

        //URL 通过参数类型来判断是 上游 还是下游 查询
        if (params.queryType === 0) {
            me.url = me.url + ((end === "/") ? "upstreamcirticalfaclilities" : "/upstreamcirticalfaclilities") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        }
        else if (params.queryType === 1) {
            me.url = me.url + ((end === "/") ? "downstreamcirticalfaclilities" : "/downstreamcirticalfaclilities") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        }
        else return;

        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        if (params.edgeID !== null && params.nodeID !== null) return;
        if (params.edgeID === null && params.nodeID === null) return;
        if (params.edgeID !== null)
            jsonObject.edgeID = params.edgeID;
        else
            jsonObject.nodeID = params.nodeID;

        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.FacilityAnalystStreamService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.FacilityAnalystStreamService(url, options);
};