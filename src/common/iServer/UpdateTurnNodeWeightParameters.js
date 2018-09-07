/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.UpdateTurnNodeWeightParameters
 * @category  iServer NetworkAnalyst TurnNodeWeight
 * @classdesc 转向耗费权重更新服务参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.nodeId - 转向结点的  ID。 
 * @param {string} options.fromEdgeId - 起始边的  ID。 
 * @param {string} options.toEdgeId - 终止边的  ID。 
 * @param {string} options.weightField - 转向结点的耗费字段。 
 * @param {string} options.turnNodeWeight - 耗费权重。
 */
export class UpdateTurnNodeWeightParameters {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.UpdateTurnNodeWeightParameters.prototype.nodeId
         * @description 转向结点的  ID。
         */
        this.nodeId = "";

        /**
         * @member {string} SuperMap.UpdateTurnNodeWeightParameters.prototype.fromEdgeId
         * @description 起始边的  ID。
         */
        this.fromEdgeId = "";

        /**
         * @member {string} SuperMap.UpdateTurnNodeWeightParameters.prototype.toEdgeId
         * @description 终止边的  ID。
         */
        this.toEdgeId = "";

        /**
         * @member {string} SuperMap.UpdateTurnNodeWeightParameters.prototype.weightField
         * @description 转向结点的耗费字段。
         */
        this.weightField = "";

        /**
         * @member {string} SuperMap.UpdateTurnNodeWeightParameters.prototype.turnNodeWeight
         * @description 耗费权重。
         */
        this.turnNodeWeight = "";
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.UpdateTurnNodeWeightParameters";
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

}

SuperMap.UpdateTurnNodeWeightParameters = UpdateTurnNodeWeightParameters;