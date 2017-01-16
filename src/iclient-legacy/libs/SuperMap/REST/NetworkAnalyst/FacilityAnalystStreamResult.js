/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FacilityAnalystStreamResult
 * 上游/下游关键设施查找资源服务结果类。
 */
SuperMap.REST.FacilityAnalystStreamResult = SuperMap.Class({

    /**
     * APIProperty: edges
     * {Array(Number)} 下游弧段的ID数组。
     */
    edges: null,

    /**
     * APIProperty: nodes
     * {Array(Number)} 关键结点 ID 数组。
     */
    nodes: null,

    /**
     * APIProperty: cost
     * {Number} 响应时间。
     */
    cost: null,

    /**
     * Constructor: SuperMap.REST.FacilityAnalystStreamResult
     * 上游/下游关键设施查找资源服务结果类构造函数。
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
        me.nodes = null;
        me.cost = null;
    },

    CLASS_NAME: "SuperMap.REST.FacilityAnalystStreamResult"
});

/**
 * Function: SuperMap.REST.FacilityAnalystStreamResult.fromJson
 * 将 JSON 对象转换为 FacilityAnalystStreamResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象
 *
 * Returns:
 * {<SuperMap.REST.FacilityAnalystStreamResult>} 转化后的 FacilityAnalystStreamResult 对象。
 */
SuperMap.REST.FacilityAnalystStreamResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FacilityAnalystStreamResult();
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