/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class FacilityAnalyst3DParameters
 * @deprecatedclass SuperMap.FacilityAnalyst3DParameters
 * @category  iServer FacilityAnalyst3D
 * @classdesc 三维设施网络分析参数基类。此类存储了三维设施网络分析中的权值字段信息、弧段或结点信息、不确定流向是否有效等参数。<br>
 * 三维设施网络分析是基于创建了流向的三维网络数据集的分析。相对于传统的二维设施网络分析，三维设施网络分析由于其真实的三维展现，从而能够更好地为设施网络的设计、施工、突发事故处理等提供指导和决策支持。
 * @param {Object} options - 参数。
 * @param {string} options.weightName - 指定的权值字段信息对象的名称。
 * @param {number} [options.edgeID] - 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
 * @param {number} [options.nodeID] - 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 *                                                      指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 * @usage
 */
export class FacilityAnalyst3DParameters {


    constructor(options) {
        /**
         * @member {number} [FacilityAnalyst3DParameters.prototype.edgeID]
         * @description 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
         */
        this.edgeID = null;

        /**
         * @member {number} [FacilityAnalyst3DParameters.prototype.nodeID]
         * @description 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
         */
        this.nodeID = null;

        /**
         * @member {string} FacilityAnalyst3DParameters.prototype.weightName
         * @description 指定的权值字段信息对象的名称。
         */
        this.weightName = null;

        /**
         * @member {boolean} [FacilityAnalyst3DParameters.prototype.isUncertainDirectionValid=false]
         * @description 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
         *              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
         */
        this.isUncertainDirectionValid = false;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalyst3DParameters";

    }

    /**
     * @function FacilityAnalyst3DParameters.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        var me = this;
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
    }
}
