/*
 * Class: SuperMap.FindTSPPathsParameters
 * 旅行商分析参数类
 * 旅行商分析是路径分析的一种，它从起点开始（默认为用户指定的第一点）查找能够遍历所有途经点且花费最小的路径。旅行商分析也
 * 可以指定到达的终点，这时查找从起点能够遍历所有途经点最后到达终点，且花费最小的路径。
 * 旅行商分析和最佳路径分析都是在网络中寻找遍历所有站点的最经济的路径，区别是在遍历网络所有站点的过程中对结点访问顺序不同
 * 最佳路径分析必须按照指定顺序对站点进行访问，而旅行商分析是无序的路径分析。
 */
var SuperMap = require('../SuperMap');
var TransportationAnalystParameter = require('./TransportationAnalystParameter');

/**
 * @class SuperMap.FindTSPPathsParameters
 * @description 旅行商分析参数类
 * @param options - {Object} 可选参数。如：<br>
 *        endNodeAssigned - {Boolean} 是否指定终止点，将指定的途经点的最后一个点作为终止点。<br>
 *        true 表示指定终止点，则旅行商必须最后一个访问终止点。默认为 false。<br>
 *        isAnalyzeById - {Boolean} 是否通过节点 ID 号来指定配送中心点和配送目的点，默认为 false，即通过坐标点指定。<br>
 *        nodes - {Array(<Point>/Number)} 配送目标集合，必设字段。<br>
 *        parameter - {<SuperMap.TransportationAnalystParameter>} 交通网络分析通用参数。<br>
 */
SuperMap.FindTSPPathsParameters = SuperMap.Class({
    /**
     * APIProperty: endNodeAssigned
     * @member SuperMap.FindTSPPathsParameters.prototype.endNodeAssigned -{Boolean}
     * @description 是否指定终止点，将指定的途经点的最后一个点作为终止点。<br>
     *               true 表示指定终止点，则旅行商必须最后一个访问终止点。默认为 false。
     */
    endNodeAssigned: false,

    /**
     * APIProperty: isAnalyzeById
     * @member SuperMap.FindTSPPathsParameters.prototype.isAnalyzeById -{Boolean}
     * @description 是否通过节点 ID 号来指定途经点，默认为 false，即通过坐标点指定。
     */
    isAnalyzeById: false,

    /**
     * APIProperty: nodes
     * @member SuperMap.FindTSPPathsParameters.prototype.nodes -{Array(<Point>/Number)}
     * @description 旅行商分析途经点数组，必设字段。<br>
     *               当 SuperMap.FindTSPPathsParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；<br>
     *               当 SuperMap.FindTSPPathsParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */
    nodes: null,

    /**
     * APIProperty: parameter
     * @member SuperMap.FindTSPPathsParameters.prototype.parameter -{SuperMap.TransportationAnalystParameter}
     * @description 交通网络分析通用参数。通过本类可以设置障碍边、障碍点、<br>
     *               权值字段信息的名称标识、转向权值字段等信息。<br>
     *               SuperMap.TransportationAnalystParameter 类型，它虽然为可选参数，但是如果不设置其中的 resultSetting<br>
     *              字段，则返回结果空间信息等都为空。
     */
    parameter: null,

    /*
     * Constructor: SuperMap.FindTSPPathsParameters
     * 旅行商分析参数类构造函数。
     */

    initialize: function (options) {
        var me = this;
        me.parameter = new TransportationAnalystParameter();
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.endNodeAssigned = null;
        me.isAnalyzeById = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    },

    CLASS_NAME: "SuperMap.FindTSPPathsParameters"
});
module.exports = SuperMap.FindTSPPathsParameters;