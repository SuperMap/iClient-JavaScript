/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.FacilityAnalystSinks3DService 
 * 最近设施分析服务类(汇查找资源)
 * 最近设施分析是指在网络上给定一个事件点和一组设施点，
 * 查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 * 该类负责将客户端指定的最近设施分析参数传递给服务端，并接收服务端返回的结果数据。
 * 最近设施分析结果通过该类支持的事件的监听函数参数获取
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('./CoreServiceBase');
SuperMap.REST.FacilityAnalystSinks3DService = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     * Constructor: SuperMap.REST.FacilityAnalystSinks3DService
     * 最近设施分析服务类构造函数。     
     *
     * 例如：
     * (start code)     
     * var myFacilityAnalystSinks3DService = new SuperMap.REST.FacilityAnalystSinks3DService(url, {
     *     eventListeners: {
     *	       "processCompleted": facilityAnalystSinks3DCompleted,
     *		   "processFailed": facilityAnalystSinks3DError
     *		   }
     * });
     * (end)     
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
     * params - {<SuperMap.REST.FacilityAnalystSinks3DParameters>} 
     */
    processAsync: function(params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "sinks" : "/sinks") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
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
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystSinks3DService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.FacilityAnalystSinks3DService(url, options);
};