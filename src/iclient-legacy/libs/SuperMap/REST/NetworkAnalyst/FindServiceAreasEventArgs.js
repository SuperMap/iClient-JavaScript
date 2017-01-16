/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/FindServiceAreasResult.js
 */

/**
 * Class: SuperMap.REST.FindServiceAreasEventArgs
 * 服务区分析服务事件数据类。
 * 类包含了从服务端传回的服务区分析结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.FindServiceAreasEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.FindServiceAreasResult>} 服务端返回的服务区分析结果数据，FindServiceAreasResult 类，其中包含了服务区域、路由对象、分析途经的结点以及弧段等信息。  
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.FindServiceAreasEventArgs
     * 服务区分析服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.FindServiceAreasResult>} 服务端返回的服务区分析结果数据。
     * originResult - {Object} 服务端返回的存储了服务区分析结果数据的 JSON 字符串。 
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
    
    CLASS_NAME: "SuperMap.REST.FindServiceAreasEventArgs"
});