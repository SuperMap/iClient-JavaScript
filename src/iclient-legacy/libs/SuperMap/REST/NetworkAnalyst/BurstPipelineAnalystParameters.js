/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.BurstPipelineAnalystParameters
 * 爆管分析参数类。
 */
SuperMap.REST.BurstPipelineAnalystParameters = SuperMap.Class({

    /**
     * APIProperty: sourceNodeIDs
     * {Array(Number)} 指定的设施点ID数组,可以为空。
     */
    sourceNodeIDs: null,

    /**
     * APIProperty: edgeID
     * {Number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     */
    edgeID: null,

    /**
     * APIProperty: nodeID
     * {Number}: 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     */
    nodeID: null,

    /**
     * APIProperty: isUncertainDirectionValid
     * {Boolean}: 指定不确定流向是否有效，默认为false。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
     */
    isUncertainDirectionValid: false,

    /**
     * Constructor: SuperMap.REST.BurstPipelineAnalystParameters
     * 爆管分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * sourceNodeIDs - {Array<Number>} 指定的设施点ID数组。
     * edgeID - {Number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     * nodeID - {Number} 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     * isUncertainDirectionValid - {Boolean} 指定不确定流向是否有效；默认false，无效。
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

    CLASS_NAME: "SuperMap.REST.BurstPipelineAnalystParameters"
});