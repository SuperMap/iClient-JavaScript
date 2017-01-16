/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/



/**
 * Class: SuperMap.REST.FacilityAnalystTracedown3DEventArgs
 * 下游追踪资源服务事件数据类
 * 该类包含了从服务端传回的最近设施分析结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.FacilityAnalystTracedown3DEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.FacilityAnalystTracedown3DResult>}
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.FacilityAnalystTracedown3DEventArgs
     * 下游追踪资源服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.FacilityAnalystTracedown3DResult>}
     * originResult - {Object}
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
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystTracedown3DEventArgs"
})