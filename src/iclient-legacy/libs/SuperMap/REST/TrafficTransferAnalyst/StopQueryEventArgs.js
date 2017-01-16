/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/EditFeaturesResult.js
 */

/**
 * Class: SuperMap.REST.StopQueryEventArgs
 * 站点查询事件类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.StopQueryEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.StopQueryResult>} 获取服务端返回的站点查询结果。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.StopQueryEventArgs
     * 站点查询事件类。
     *
     * Parameters:
     * result - {<SuperMap.REST.StopQueryResult>} 服务端返回的站点查询数据。
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
    
    CLASS_NAME: "SuperMap.REST.StopQueryEventArgs"
});