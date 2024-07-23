/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {FacilityAnalyst3DParameters} from './FacilityAnalyst3DParameters';

/**
 * @class FacilityAnalystUpstream3DParameters
 * @deprecatedclass SuperMap.FacilityAnalystUpstream3DParameters
 * @category iServer FacilityAnalyst3D UpstreamCirticalFaclilities
 * @classdesc 上游关键设施查找资源参数类。此类用于设置上游关键设施查找中的权值字段信息、弧段或结点等参数，还可以对不确定流向是否有效进行设置。
 * @extends {FacilityAnalyst3DParameters}
 * @param {Object} options - 参数。
 * @param {Array.<number>} options.sourceNodeIDs - 指定的设施点 ID 数组。
 * @param {number} [options.edgeID] - 指定的弧段 ID。edgeID 与 nodeID 必须指定一个。
 * @param {number} [options.nodeID] - 指定的结点 ID。edgeID 与 edgeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 * @usage
 */
export class FacilityAnalystUpstream3DParameters extends FacilityAnalyst3DParameters {


    constructor(options) {
        super(options);
        options = options || {};
        this.sourceNodeIDs = null;
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystUpstream3DParameters";
    }


    /**
     * @function FacilityAnalystUpstream3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.sourceNodeIDs = null;
    }


}
