/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/TransferPathResult.js
 */

/**
 * Class: SuperMap.REST.TransferPathEventArgs
 * 换乘路线查询事件类。
 * 该类包含了从服务端传回的换乘线路查询结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.TransferPathEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.TransferPathResult>} 服务端返回的换乘线路结果数据。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.TransferPathEventArgs
     * 换乘线路查询事件类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.TransferPathResult>} 服务端返回的换乘线路结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的换乘线路结果数据。
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
    
    CLASS_NAME: "SuperMap.REST.TransferPathEventArgs"
});