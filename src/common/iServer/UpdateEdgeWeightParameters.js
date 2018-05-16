import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.UpdateEdgeWeightParameters
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 边的耗费权重更新服务参数类。
 * @param {Object} options - 参数。<br>
 * @param {string} options.edgeId - 所在边的id。<br>
 * @param {string} options.fromNodeId - 起始转向点的id。<br>
 * @param {string} options.toNodeId - 终止转向点的id。<br>
 * @param {string} options.weightField - 边的耗费字段。<br>
 * @param {string} options.edgeWeight - 耗费权重。
 */
export class UpdateEdgeWeightParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.UpdateEdgeWeightParameters.prototype.edgeId
         * @description 所在边的id
         */
        this.edgeId = "";

        /**
         * @member {string} SuperMap.UpdateEdgeWeightParameters.prototype.fromNodeId
         * @description 起始转向点的id
         */
        this.fromNodeId = "";

        /**
         * @member {string} SuperMap.UpdateEdgeWeightParameters.prototype.toNodeId
         * @description 终止转向点的id
         */
        this.toNodeId = "";

        /**
         * @member {string} SuperMap.UpdateEdgeWeightParameters.prototype.weightField
         * @description 边的耗费字段
         */
        this.weightField = "";

        /**
         * @member {string} SuperMap.UpdateEdgeWeightParameters.prototype.edgeWeight
         * @description 耗费权重
         */
        this.edgeWeight = "";

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.UpdateEdgeWeightParameters";
    }


    /**
     * @function SuperMap.UpdateEdgeWeightParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.edgeId = null;
        this.fromNodeId = null;
        this.toNodeId = null;
        this.weightField = null;
        this.edgeWeight = null;
    }

}

SuperMap.UpdateEdgeWeightParameters = UpdateEdgeWeightParameters;