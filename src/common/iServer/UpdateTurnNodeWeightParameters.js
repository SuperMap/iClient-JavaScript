import SuperMap from '../SuperMap';

/**
 * @class SuperMap.UpdateTurnNodeWeightParameters
 * @classdesc 转向耗费权重更新服务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         nodeId - {string} 转向结点的id。<br>
 *        fromEdgeId - {string} 起始边的id。<br>
 *        toEdgeId - {string} 终止边的id。<br>
 *        weightField - {string} 转向结点的耗费字段。<br>
 *        turnNodeWeight - {string} 耗费权重
 */
export default  class UpdateTurnNodeWeightParameters {

    /**
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.nodeId -{string}
     * @description 转向结点的id
     */
    nodeId = "";

    /**
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.fromEdgeId -{string}
     * @description 起始边的id
     */
    fromEdgeId = "";

    /**
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.toEdgeId -{string}
     * @description 终止边的id
     */
    toEdgeId = "";

    /**
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.weightField -{string}
     * @description 转向结点的耗费字段
     */
    weightField = "";

    /**
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.turnNodeWeight -{string}
     * @description 耗费权重
     */
    turnNodeWeight = "";

    constructor(option) {
        if (!option) return;

        option.nodeId && (this.nodeId = option.nodeId);
        option.fromEdgeId && (this.fromEdgeId = option.fromEdgeId);
        option.toEdgeId && (this.toEdgeId = option.toEdgeId);
        option.weightField && (this.weightField = option.weightField);
        option.turnNodeWeight && (this.turnNodeWeight = option.turnNodeWeight);
    }

    /**
     * @function SuperMap.UpdateTurnNodeWeightParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.nodeId = null;
        this.fromEdgeId = null;
        this.toEdgeId = null;
        this.weightField = null;
        this.turnNodeWeight = null;
    }


    CLASS_NAME = "SuperMap.UpdateTurnNodeWeightParameters"
}

SuperMap.UpdateTurnNodeWeightParameters = UpdateTurnNodeWeightParameters;