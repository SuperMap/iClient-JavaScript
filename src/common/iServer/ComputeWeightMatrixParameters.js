/*
 * Class: SuperMap.ComputeWeightMatrixParameters
 * 耗费矩阵分析参数类。
 * 根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 */
var SuperMap = require('../SuperMap');
var TransportationAnalystParameter = require('./TransportationAnalystParameter');

/**
 * @class SuperMap.ComputeWeightMatrixParameters
 * @description 耗费矩阵分析参数类。<br>
 *               根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 * @param options - {Object} 可选参数。如：<br>
 *         isAnalyzeById - {Boolean} 是否通过节点 ID 指定路径分析的结点。<br>
 *         nodes - {Array<{SuperMap.Point}|Number>} 要计算耗费矩阵的点数组，必设字段。<br>
 *         parameter - {SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
SuperMap.ComputeWeightMatrixParameters = SuperMap.Class({

    /**
     * APIProperty: isAnalyzeById
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.isAnalyzeById {Boolean}
     * @description 是否通过节点 ID 指定路径分析的结点，默认为 false，即通过坐标点指定。
     */
    isAnalyzeById: false,

    /**
     * APIProperty: nodes
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.nodes {Array(Point/Number)}
     * @description 要计算耗费矩阵的点数组，必设字段。<br>
     *               当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；<br>
     *               当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */
    nodes: null,

    /**
     * APIProperty: parameter
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.parameter {SuperMap.TransportationAnalystParameter}
     * @description 交通网络分析通用参数。
     */
    parameter: null,

    /*
     * Constructor: SuperMap.ComputeWeightMatrixParameters
     * 耗费矩阵分析参数类构造函数。
     *
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
        me.isAnalyzeById = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    },

    CLASS_NAME: "SuperMap.ComputeWeightMatrixParameters"
});
module.exports = SuperMap.ComputeWeightMatrixParameters;
