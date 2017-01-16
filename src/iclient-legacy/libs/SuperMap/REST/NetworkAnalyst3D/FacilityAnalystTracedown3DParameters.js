/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FacilityAnalystTracedown3DParameters
 * 下游追踪资源参数类
 */
SuperMap.REST.FacilityAnalystTracedown3DParameters = SuperMap.Class(SuperMap.REST.FacilityAnalyst3DParameters,{
 
    /**
     * Constructor: SuperMap.REST.FacilityAnalystTracedown3DParameters
     * 下游追踪资源参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     */
    initialize: function(options) {
        var me = this;
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() { 
        var me = this;
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
    },
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystTracedown3DParameters"
}); 