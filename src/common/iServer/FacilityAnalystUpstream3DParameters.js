/**
 * Class: SuperMap.FacilityAnalystUpstream3DParameters
 * 上游关键设施查找资源参数类
 */
require('../Base');
require('./FacilityAnalyst3DParameters');
SuperMap.FacilityAnalystUpstream3DParameters = SuperMap.Class(SuperMap.FacilityAnalyst3DParameters, {

    /**
     * APIProperty: sourceNodeIDs
     * {Array<Number>} 指定的设施点ID数组
     */
    sourceNodeIDs: null,

    /**
     * Constructor: SuperMap.FacilityAnalystUpstream3DParameters
     * 上游关键设施查找资源参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     */
    initialize: function (options) {
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
    destroy: function () {
        var me = this;
        me.sourceNodeIDs = null;
        me.edgeID = null;
        me.nodeID = null;
        me.isUncertainDirectionValid = null;
    },

    CLASS_NAME: "SuperMap.FacilityAnalystUpstream3DParameters"
});

module.exports = function (options) {
    return new SuperMap.FacilityAnalystUpstream3DParameters(options);
};