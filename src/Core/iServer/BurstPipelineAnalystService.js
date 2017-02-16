/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.BurstPipelineAnalystService
 * 爆管分析服务类;即将给定弧段或节点作为爆管点来进行分析，返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
 *
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('./CoreServiceBase');

SuperMap.REST.BurstPipelineAnalystService = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     * Constructor: SuperMap.REST.BurstPipelineAnalystService
     * 爆管分析服务类构造函数。
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

    initialize: function(url, options) {
        SuperMap.CoreServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function() {
        SuperMap.CoreServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.BurstPipelineAnalystParameters>}
     */
    processAsync: function(params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject;
        var end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "burstAnalyse" : "/burstAnalyse") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");

        jsonObject = {
            sourceNodeIDs: params.sourceNodeIDs,
            isUncertainDirectionValid: params.isUncertainDirectionValid
        };

        //必传参数不正确，就终止
        if(params.edgeID !== null && params.nodeID !== null ) return;
        if(params.edgeID === null && params.nodeID === null ) return;
        if(params.edgeID !== null)
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

    CLASS_NAME: "SuperMap.REST.BurstPipelineAnalystService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.BurstPipelineAnalystService(url, options);
};