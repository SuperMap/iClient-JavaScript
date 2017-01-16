/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FacilityAnalystTraceup3DResult
 * 上游追踪资源结果类
 */
SuperMap.REST.FacilityAnalystTraceup3DResult = SuperMap.Class({
     
    /** 
     * APIProperty: edges
     * {Array(<Number>)} 指定的弧段ID数组
     * 数组中的第 i 个元素对应第 i 个弧段的相关信息。
     */
    edges: null,

	/** 
     * APIProperty: nodes
     * {Array(<Number>)} 指定的结点ID数组
     * 数组中的第 i 个元素对应第 i 个结点的相关信息。
     */
	nodes: null,

	/** 
     * APIProperty: cost
     * {Number} 响应时间
     */
	cost: null,
    
    /**
     * Constructor: SuperMap.REST.FacilityAnalystTraceup3DResult
     * 上游追踪资源结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     */
    initialize: function(options) {
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        var me = this;
        if (me.edges) {
            for (var i=0,edges=me.edges,len=edges.length; i<len; i++) {
                edges[i].destroy();
            }
            me.edges = null;
        }
		if (me.nodes) {
            for (var i=0,nodes=me.nodes,len=nodes.length; i<len; i++) {
                nodes[i].destroy();
            }
            me.nodes = null;
        }
		me.cost = null;
    },
    
    CLASS_NAME: "SuperMap.REST.FacilityAnalystTraceup3DResult"
});

/**
 * Function: SuperMap.REST.FacilityAnalystTraceup3DResult.fromJson
 * 将 JSON 对象转换为 FacilityAnalystTraceup3DResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象
 *
 * Returns:
 * {<SuperMap.REST.FacilityAnalystTraceup3DResult>} 转化后的 FacilityAnalystTraceup3DResult 对象。
 */
SuperMap.REST.FacilityAnalystTraceup3DResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FacilityAnalystTraceup3DResult();
    if (jsonObject.edges) {
        result.edges = [];
        for (var i=0,edges=jsonObject.edges,len=edges.length; i<len; i++) {
            result.edges[i] = edges[i];
        }
    }
	if (jsonObject.nodes) {
        result.nodes = [];
        for (var i=0,nodes=jsonObject.nodes,len=nodes.length; i<len; i++) {
            result.nodes[i] = nodes[i];
        }
    }
	result.cost = jsonObject.cost;
    return result;
};