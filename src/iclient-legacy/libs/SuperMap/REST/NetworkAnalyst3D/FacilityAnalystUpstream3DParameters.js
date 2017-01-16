/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FacilityAnalystUpstream3DParameters
 * 上游关键设施查找资源参数类
 */
SuperMap.REST.FacilityAnalystUpstream3DParameters = SuperMap.Class(SuperMap.REST.FacilityAnalyst3DParameters,{

	/** 
     * APIProperty: sourceNodeIDs
     * {Array<Number>} 指定的设施点ID数组
     */
	sourceNodeIDs: null,
 
    /**
     * Constructor: SuperMap.REST.FacilityAnalystUpstream3DParameters
     * 上游关键设施查找资源参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
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
		me.sourceNodeIDs = null;
        me.edgeID = null;
        me.nodeID = null;
        me.isUncertainDirectionValid = null;
    },
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystUpstream3DParameters"
}); 