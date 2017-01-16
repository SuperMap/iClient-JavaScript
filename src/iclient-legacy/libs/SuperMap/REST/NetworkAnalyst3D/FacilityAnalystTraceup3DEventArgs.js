/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.FacilityAnalystTraceup3DEventArgs
 * 上游追踪资源服务数据类
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.FacilityAnalystTraceup3DEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.FacilityAnalystTraceup3DResult>} 服务端返回的最近设施分析结果数据，结果中包含了查找的最近设施点、设施点与事件点间的弧段、结点等信息。  
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.FacilityAnalystTraceup3DEventArgs
     * 上游追踪资源服务数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.FacilityAnalystTraceup3DResult>}
     * originResult - {Object} 服务端返回的存储了最近设施分析结果数据的 JSON 字符串。 
     */
    initialize: function(result,originResult) {
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
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystTraceup3DEventArgs"
});