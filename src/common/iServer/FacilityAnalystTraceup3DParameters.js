/**
 * Class: SuperMap.FacilityAnalystTraceup3DParameters
 * 上游追踪资源参数类
 */

require('./FacilityAnalyst3DParameters');
SuperMap.FacilityAnalystTraceup3DParameters = SuperMap.Class(SuperMap.FacilityAnalyst3DParameters, {

    /**
     * Constructor: SuperMap.FacilityAnalystTraceup3DParameters
     * 上游追踪资源参数类构造函数。
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
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
    },

    CLASS_NAME: "SuperMap.FacilityAnalystTraceup3DParameters"
});

module.exports = function (options) {
    return new SuperMap.FacilityAnalystTraceup3DParameters(options);
};