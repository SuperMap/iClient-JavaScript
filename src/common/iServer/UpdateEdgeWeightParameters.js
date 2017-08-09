import SuperMap from '../SuperMap';

/**
 * @class SuperMap.UpdateEdgeWeightParameters
 * @classdesc 边的耗费权重更新服务参数类。
 * @param options - {Object} 可选参数。如：<br>
 *        edgeId - {String} 所在边的id。<br>
 *        fromNodeId - {String} 起始转向点的id。<br>
 *        toNodeId - {String} 终止转向点的id。<br>
 *        weightField - {String} 边的耗费字段。<br>
 *        edgeWeight - {String} 耗费权重。
 */
export default  class UpdateEdgeWeightParameters {

    /**
     * @member SuperMap.UpdateEdgeWeightParameters.prototype.edgeId -{String}
     * @description 所在边的id
     */
    edgeId = "";

    /**
     * @member SuperMap.UpdateEdgeWeightParameters.prototype.fromNodeId -{String}
     * @description 起始转向点的id
     */
    fromNodeId = "";

    /**
     * @member SuperMap.UpdateEdgeWeightParameters.prototype.toNodeId -{String}
     * @description 终止转向点的id
     */
    toNodeId = "";

    /**
     * @member SuperMap.UpdateEdgeWeightParameters.prototype.weightField -{String}
     * @description 边的耗费字段
     */
    weightField = "";

    /**
     * @member SuperMap.UpdateEdgeWeightParameters.prototype.edgeWeight -{String}
     * @description 耗费权重
     */
    edgeWeight = "";

    /*
     * Constructor: SuperMap.UpdateEdgeWeightParameters
     * 边的耗费权重更新服务参数类构造函数。
     */
    constructor(option) {
        if (!option) return;

        option.edgeId && (this.edgeId = option.edgeId);
        option.fromNodeId && (this.fromNodeId = option.fromNodeId);
        option.toNodeId && (this.toNodeId = option.toNodeId);
        option.weightField && (this.weightField = option.weightField);
        option.edgeWeight && (this.edgeWeight = option.edgeWeight);
    }


    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.edgeId = null;
        this.fromNodeId = null;
        this.toNodeId = null;
        this.weightField = null;
        this.edgeWeight = null;
    }


    CLASS_NAME = "SuperMap.UpdateEdgeWeightParameters"
}

SuperMap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;