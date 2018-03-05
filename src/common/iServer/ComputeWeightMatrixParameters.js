import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TransportationAnalystParameter} from './TransportationAnalystParameter';

/**
 * @class SuperMap.ComputeWeightMatrixParameters
 * @category  iServer NetworkAnalyst WeightMatrix
 * @classdesc 耗费矩阵分析参数类。根据交通网络分析参数中的耗费字段返回一个耗费矩阵。该矩阵是一个二维数组，用来存储任意两点间的资源消耗。
 * @param options - {Object} 可选参数。如：<br>
 *         isAnalyzeById - {boolean} 是否通过节点 ID 指定路径分析的结点。<br>
 *         nodes - {Array<Object>} 要计算耗费矩阵的点数组，必设字段。点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
 *         parameter - {@link SuperMap.TransportationAnalystParameter} 交通网络分析通用参数。
 */
export class ComputeWeightMatrixParameters {


    constructor(options) {
        /**
         * @member SuperMap.ComputeWeightMatrixParameters.prototype.isAnalyzeById {Boolean}
         * @description 是否通过节点 ID 指定路径分析的结点，默认为 false，即通过坐标点指定。
         */
        this.isAnalyzeById = false;

        /**
         * @member SuperMap.ComputeWeightMatrixParameters.prototype.nodes {Array<Object>|Array<number>}
         * @description 要计算耗费矩阵的点数组，必设字段。<br>
         *              点坐标类型可以是SuperMap.Geometry.Point|L.LatLng|L.Point|ol.geom.Point。<br>
         *              当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = false 时，nodes 应为点的坐标数组；<br>
         *              当 SuperMap.ComputeWeightMatrixParameters.isAnalyzeById = true 时，nodes 应为点的 ID 数组。
         */
        this.nodes = null;

        /**
         * @member SuperMap.ComputeWeightMatrixParameters.prototype.parameter {SuperMap.TransportationAnalystParameter}
         * @description 交通网络分析通用参数。
         */
        this.parameter = new TransportationAnalystParameter();

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.ComputeWeightMatrixParameters";
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
}

SuperMap.ComputeWeightMatrixParameters = ComputeWeightMatrixParameters;