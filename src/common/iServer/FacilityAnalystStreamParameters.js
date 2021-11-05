/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.FacilityAnalystStreamParameters
 * @category iServer NetworkAnalyst UpstreamCriticalFacilities
 * @classdesc 上游/下游关键设施查找资源参数类。
 * @param {Object} options - 参数。 
 * @param {Array.<number>} options.sourceNodeIDs - 指定的设施点 ID 数组。 
 * @param {number} options.queryType - 分析类型，只能是 0 (上游关键设施查询) 或者是 1（下游关键设施查询）。
 * @param {number} [options.edgeID] - 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。  
 * @param {number} [options.nodeID] - 指定的结点 ID，edgeID 与 nodeID 必须指定一个。  
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。
 */
export class FacilityAnalystStreamParameters {


    constructor(options) {
        /**
         * @member {Array.<number>} [SuperMap.FacilityAnalystStreamParameters.prototype.sourceNodeIDs]
         * @description 指定的设施点 ID 数组。
         */
        this.sourceNodeIDs = null;

        /**
         * @member {number} [SuperMap.FacilityAnalystStreamParameters.prototype.edgeID]
         * @description 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。 
         */
        this.edgeID = null;

        /**
         * @member {number} [SuperMap.FacilityAnalystStreamParameters.prototype.nodeID]
         * @description 指定的结点 ID，edgeID 与 nodeID 必须指定一个。 
         */
        this.nodeID = null;

        /**
         * @member {boolean} [SuperMap.FacilityAnalystStreamParameters.prototype.isUncertainDirectionValid=false]
         * @description 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
         *              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
         */
        this.isUncertainDirectionValid = false;

        /**
         * @member {number} SuperMap.FacilityAnalystStreamParameters.prototype.queryType
         * @description 分析类型，只能是 0 (上游关键设施查询) 或者是 1（下游关键设施查询）。
         */
        this.queryType = null;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystStreamParameters";
    }


    /**
     * @function SuperMap.FacilityAnalystStreamParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.edgeID = null;
        me.nodeID = null;
        me.weightName = null;
        me.isUncertainDirectionValid = null;
        me.type = null;
    }

}
