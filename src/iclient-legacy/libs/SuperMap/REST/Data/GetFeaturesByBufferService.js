/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/GetFeaturesServiceBase.js
 * @requires SuperMap/REST/GetFeaturesByBufferParameters.js
 */

/**
 * Class: SuperMap.REST.GetFeaturesByBufferService
 * 数据服务中数据集缓冲区查询服务类。
 * 
 * Inherits from:
 *  - <SuperMap.REST.GetFeaturesServiceBase> 
 */
SuperMap.REST.GetFeaturesByBufferService = SuperMap.Class(SuperMap.REST.GetFeaturesServiceBase, {

    /**
     * Constructor: SuperMap.REST.GetFeaturesByBufferService
     * 数据服务缓冲区查询服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var myGetFeaturesByBufferService = new SuperMap.REST.GetFeaturesByBufferService(url, {
     *     eventListeners: {
     *           "processCompleted": GetFeaturesCompleted, 
     *           "processFailed": GetFeaturesError
     *           }
     * });
     * function GetFeaturesCompleted(QueryEventArgs){//todo};
     * function GetFeaturesError(QueryEventArgs){//todo};
     * (end)
     *      
     * Parameters:
     * url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.REST.GetFeaturesServiceBase.prototype.initialize.apply(this, arguments);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.REST.GetFeaturesServiceBase.prototype.destroy.apply(this, arguments); 
    },
    
    /**
     * Method: getJsonParameters
     * 将查询参数转化为 JSON 字符串。
     * 在本类中重写此方法，可以实现不同种类的查询（IDs, SQL, Buffer, Geometry等）。
     *
     * Parameters:
     * params - {<SuperMap.REST.GetFeaturesByBufferParameters>} 
     *
     * Returns:
     * {Object} 转化后的 JSON 字符串。
     */
    getJsonParameters: function(params) {
        return  SuperMap.REST.GetFeaturesByBufferParameters.toJsonParameters(params);
    },
    
    CLASS_NAME: "SuperMap.REST.GetFeaturesByBufferService"
});