/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/GetFeaturesEventArgs.js
 */

/**
 * Class: SuperMap.REST.GetFeaturesEventArgs
 * 数据集查询服务事件数据类。
 * 该类包含了从服务端传回的查询结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.GetFeaturesEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.GetFeaturesResult>} 服务端返回的查询结果数据，其中包含了查询记录集或查询结果资源的相关信息。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.GetFeaturesEventArgs
     * 数据集查询服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.GetFeaturesEventArgs>} 服务端返回的查询结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的查询结果数据。
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
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.GetFeaturesEventArgs"
});