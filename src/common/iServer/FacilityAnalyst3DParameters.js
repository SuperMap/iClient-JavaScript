/*
 * Class: SuperMap.FacilityAnalyst3DParameters
 * 最近设施分析参数基类。
 * 最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。
 * 设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。
 * 例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。
 * 最近设施查找实际上也是一种路径分析，因此对路径分析起作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 */
var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.FacilityAnalyst3DParameters
 * @description 最近设施分析参数基类。<br>
 *               最近设施分析是指在网络上给定一个事件点和一组设施点，查找从事件点到设施点(或从设施点到事件点)以最小耗费能到达的最佳路径。<br>
 *               设施点一般为学校、超市、加油站等服务设施；事件点为需要服务设施的事件位置。<br>
 *               例如事件发生点是一起交通事故，要求查找在10分钟内能到达的最近医院，超过10分钟能到达的都不予考虑。此例中，事故发生地即是一个事件点，周边的医院则是设施点。<br>
 *               最近设施查找实际上也是一种路径分析，因此对路径分析起作用的障碍边、障碍点、转向表、耗费等属性在最近设施分析时同样可设置。
 * @param options - {Object} 可选参数。如：<br>
 *         edgeID - {Number} 指定的弧段ID。<br>
 *         nodeID - {Integer} 指定的结点ID。<br>
 *         weightName -{String} 指定的权值字段信息对象的名称。<br>
 *         isUncertainDirectionValid -{Boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 */
SuperMap.FacilityAnalyst3DParameters = SuperMap.Class({

    /**
     * APIProperty: edgeID
     * @member SuperMap.FacilityAnalyst3DParameters.prototype.edgeID -{Number}
     * @description 指定的弧段ID
     */
    edgeID: null,

    /**
     * APIProperty: nodeID
     * @member SuperMap.FacilityAnalyst3DParameters.prototype.nodeID -{Number}
     * @description 指定的结点ID
     */
    nodeID: null,

    /**
     * APIProperty: weightName
     * @member SuperMap.FacilityAnalyst3DParameters.prototype.weightName -{String}
     * @description 指定的权值字段信息对象的名称
     */
    weightName: null,

    /**
     * APIProperty: isUncertainDirectionValid
     * @member SuperMap.FacilityAnalyst3DParameters.prototype.isUncertainDirectionValid -{Boolean}:
     * @description 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
     *                指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找
     */
    isUncertainDirectionValid: false,

    /*
     * Constructor: SuperMap.FacilityAnalyst3DParameters
     * 最近设施分析参数类构造函数。
     */
    initialize: function (options) {
        var me = this;
        if (!options) {
            return;
        }
        SuperMap.Util.extend(me, options);
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
    },

    CLASS_NAME: "SuperMap.FacilityAnalyst3DParameters"
});

module.exports = SuperMap.FacilityAnalyst3DParameters;