import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.UpdateEdgeWeightParameters
 * @category  iServer NetworkAnalyst EdgeWeight
 * @classdesc 边的耗费权重更新服务参数类。
 * @param options - {Object} 可选参数。如：<br>
 *        edgeId - {string} 所在边的id。<br>
 *        fromNodeId - {string} 起始转向点的id。<br>
 *        toNodeId - {string} 终止转向点的id。<br>
 *        weightField - {string} 边的耗费字段。<br>
 *        edgeWeight - {string} 耗费权重。
 */
export class UpdateEdgeWeightParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.UpdateEdgeWeightParameters.prototype.edgeId -{string}
         * @description 所在边的id
         */
        this.edgeId = "";

        /**
         * @member SuperMap.UpdateEdgeWeightParameters.prototype.fromNodeId -{string}
         * @description 起始转向点的id
         */
        this.fromNodeId = "";

        /**
         * @member SuperMap.UpdateEdgeWeightParameters.prototype.toNodeId -{string}
         * @description 终止转向点的id
         */
        this.toNodeId = "";

        /**
         * @member SuperMap.UpdateEdgeWeightParameters.prototype.weightField -{string}
         * @description 边的耗费字段
         */
        this.weightField = "";

        /**
         * @member SuperMap.UpdateEdgeWeightParameters.prototype.edgeWeight -{string}
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