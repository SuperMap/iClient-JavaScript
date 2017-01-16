/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.BurstPipelineAnalystResult
 * 爆管分析服务结果类。
 */
SuperMap.REST.BurstPipelineAnalystResult = SuperMap.Class({

    /**
     * APIProperty: edges
     * {Array(Number)} 上下游弧段的ID数组。
     */
    edges: null,

    /**
     * APIProperty: criticalNodes
     * {Array(Number)} 关键结点 ID 数组。
     */
    criticalNodes: null,

    /**
     * APIProperty: normalNodes
     * {Array(Number)} 普通节点 ID 数组。
     */
    normalNodes: null,

    /**
     * Constructor: SuperMap.REST.BurstPipelineAnalystResult
     * 爆管分析服务结果类构造函数。
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
        me.edges = null;
        me.criticalNodes = null;
        me.normalNodes = null;
    },

    CLASS_NAME: "SuperMap.REST.FacilityAnalystStreamResult"
});

/**
 * Function: SuperMap.REST.BurstPipelineAnalystResult.fromJson
 * 将 JSON 对象转换为 BurstPipelineAnalystResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象
 *
 * Returns:
 * {<SuperMap.REST.BurstPipelineAnalystResult>} 转化后的 BurstPipelineAnalystResult 对象。
 */
SuperMap.REST.BurstPipelineAnalystResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.BurstPipelineAnalystResult();
    if (jsonObject.edges) {
        result.edges = [];
        for (var i=0,edges=jsonObject.edges,len=edges.length; i<len; i++) {
            result.edges[i] = edges[i];
        }
    }
    if (jsonObject.criticalNodes) {
        result.criticalNodes = [];
        for (var i=0,criticalNodes=jsonObject.criticalNodes,len=criticalNodes.length; i<len; i++) {
            result.criticalNodes[i] = criticalNodes[i];
        }
    }
    if (jsonObject.normalNodes) {
        result.normalNodes = [];
        for (var i=0,normalNodes=jsonObject.normalNodes,len=normalNodes.length; i<len; i++) {
            result.normalNodes[i] = normalNodes[i];
        }
    }
    return result;
};