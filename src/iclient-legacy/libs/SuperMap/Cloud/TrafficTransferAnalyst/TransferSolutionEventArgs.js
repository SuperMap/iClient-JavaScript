/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/EditFeaturesResult.js
 */

/**
 * Class: SuperMap.Cloud.TransferSolutionEventArgs
 * 公交换乘方案查询结果类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.Cloud.TransferSolutionEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.TransferSolutionResult>} 服务端返回的公交换乘方案查询的结果数据。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.Cloud.TransferSolutionEventArgs
     * 公交换乘事件类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.Cloud.TransferSolutionResult>} 服务端返回的公交换乘结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的公交换乘结果数据。
     */
    initialize: function(result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        SuperMap.Util.reset(this);
    },
    
    CLASS_NAME: "SuperMap.Cloud.TransferSolutionEventArgs"
});