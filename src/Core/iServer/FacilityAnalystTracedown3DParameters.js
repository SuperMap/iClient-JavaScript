require('../base');
require('./FacilityAnalyst3DParameters');

/**
 * Class: FacilityAnalystTracedown3DParameters
 * 下游追踪资源参数类
 */
FacilityAnalystTracedown3DParameters = SuperMap.Class(FacilityAnalyst3DParameters, {

    /**
     * Constructor: FacilityAnalystTracedown3DParameters
     * 下游追踪资源参数类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
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

    CLASS_NAME: "FacilityAnalystTracedown3DParameters"
});

module.exports = function (options) {
    return new FacilityAnalystTracedown3DParameters(options);
};