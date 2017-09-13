import SuperMap from '../SuperMap';
import TransportationAnalystParameter from './TransportationAnalystParameter';
import '../commontypes/geometry/Point';

/**
 * @class SuperMap.ComputeWeightMatrixParameters
 * @classdesc 耗费矩阵分析参数类。根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 * @param options - {Object} 可选参数。如：<br>
 *         isAnalyzeById - {boolean} 是否通过节点 ID 指定路径分析的结点。<br>
 *         nodes - {Array<Object>} 要计算耗费矩阵的点数组，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *         parameter - {@link SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
export default class ComputeWeightMatrixParameters {

    /**
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.isAnalyzeById {Boolean}
     * @description 是否通过节点 ID 指定路径分析的结点，默认为 false，即通过坐标点指定。
     */
    isAnalyzeById = false;

    /**
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.nodes {Array<Object>|Array<number>}
     * @description 要计算耗费矩阵的点数组，必设字段。<br>
     *              点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
     *              当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；<br>
     *              当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
     */
    nodes = null;

    /**
     * @member SuperMap.ComputeWeightMatrixParameters.prototype.parameter {SuperMap.TransportationAnalystParameter}
     * @description 交通网络分析通用参数。
     */
    parameter = null;

    constructor(options) {
        var me = this;
        me.parameter = new TransportationAnalystParameter();
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     * @function SuperMap.ComputeWeightMatrixParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.isAnalyzeById = null;
        me.nodes = null;
        if (me.parameter) {
            me.parameter.destroy();
            me.parameter = null;
        }
    }

    CLASS_NAME = "SuperMap.ComputeWeightMatrixParameters"
}
SuperMap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;