require('../base');
require('./FacilityAnalyst3DParameters');

/**
 * Class: FacilityAnalystTraceup3DParameters
 * 上游追踪资源参数类
 */
FacilityAnalystTraceup3DParameters = SuperMap.Class(FacilityAnalyst3DParameters, {

    /**
     * Constructor: FacilityAnalystTraceup3DParameters
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

    CLASS_NAME: "FacilityAnalystTraceup3DParameters"
});

module.exports = function (options) {
    return new FacilityAnalystTraceup3DParameters(options);
};