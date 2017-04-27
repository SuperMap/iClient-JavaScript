/**
 * Class: SuperMap.FacilityAnalystTracedown3DParameters
 * 下游追踪资源参数类
 */
require('./FacilityAnalyst3DParameters');
var SuperMap = require('../SuperMap');
SuperMap.FacilityAnalystTracedown3DParameters = SuperMap.Class(SuperMap.FacilityAnalyst3DParameters, {

    /**
     * Constructor: SuperMap.FacilityAnalystTracedown3DParameters
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

    CLASS_NAME: "SuperMap.FacilityAnalystTracedown3DParameters"
});

module.exports = SuperMap.FacilityAnalystTracedown3DParameters;