/*
 * Class: SuperMap.FacilityAnalystTracedown3DParameters
 * 下游追踪资源参数类
 */
require('./FacilityAnalyst3DParameters');
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.FacilityAnalystTracedown3DParameters
 * @description 下游追踪资源参数类
 * @augments SuperMap.FacilityAnalyst3DParameters
 * @param options - {Object} 可选参数。如：<br>
 *         edgeID - {Number} 指定的弧段ID。<br>
 *         nodeID - {Integer} 指定的结点ID。<br>
 *         weightName -{String} 指定的权值字段信息对象的名称。<br>
 *         isUncertainDirectionValid -{Boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。

 */
SuperMap.FacilityAnalystTracedown3DParameters = SuperMap.Class(SuperMap.FacilityAnalyst3DParameters, {

    /*
     * Constructor: SuperMap.FacilityAnalystTracedown3DParameters
     * 下游追踪资源参数类构造函数。
     */
    initialize: function (options) {
        var me = this;
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @inheritDoc
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