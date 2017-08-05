import SuperMap from '../SuperMap';

/**
 * @class SuperMap.UpdateTurnNodeWeightParameters
 * @description 转向耗费权重更新服务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         nodeId - {String} 转向结点的id。<br>
 *        fromEdgeId - {String} 起始边的id。<br>
 *        toEdgeId - {String} 终止边的id。<br>
 *        weightField - {String} 转向结点的耗费字段。<br>
 *        turnNodeWeight - {String} 耗费权重
 */
export default  class UpdateTurnNodeWeightParameters {

    /**
     * APIProperty:  nodeId
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.nodeId -{String}
     * @description 转向结点的id
     */
    nodeId = "";

    /**
     * APIProperty: fromEdgeId
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.fromEdgeId -{String}
     * @description 起始边的id
     */
    fromEdgeId = "";

    /**
     * APIProperty: toEdgeId
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.toEdgeId -{String}
     * @description 终止边的id
     */
    toEdgeId = "";

    /**
     * APIProperty: weightField
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.weightField -{String}
     * @description 转向结点的耗费字段
     */
    weightField = "";

    /**
     * APIProperty: turnNodeWeight
     * @member SuperMap.UpdateTurnNodeWeightParameters.prototype.turnNodeWeight -{String}
     * @description 耗费权重
     */
    turnNodeWeight = "";

    /*
     * Constructor: SuperMap.UpdateTurnNodeWeightParameters
     * 转向耗费权重更新服务参数类构造函数。
     */
    constructor(option) {
        if (!option) return;

        option.nodeId && (this.nodeId = option.nodeId);
        option.fromEdgeId && (this.fromEdgeId = option.fromEdgeId);
        option.toEdgeId && (this.toEdgeId = option.toEdgeId);
        option.weightField && (this.weightField = option.weightField);
        option.turnNodeWeight && (this.turnNodeWeight = option.turnNodeWeight);
    }


    /**
     * APIMethod: destroy
     * @function destroy
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