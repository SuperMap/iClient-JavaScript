/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {FacilityAnalyst3DParameters} from './FacilityAnalyst3DParameters';

/**
 * @class FacilityAnalystTraceup3DParameters
 * @deprecatedclass SuperMap.FacilityAnalystTraceup3DParameters
 * @category iServer FacilityAnalyst3D TraceUpResult
 * @classdesc 上游追踪资源参数类。
 * @extends {FacilityAnalyst3DParameters}
 * @param {Object} options - 参数。
 * @param {string} options.weightName - 指定的权值字段信息对象的名称。
 * @param {number} [options.edgeID] - 指定的弧段ID，edgeID 与 nodeID 必须指定一个。
 * @param {number} [options.nodeID] - 指定的结点ID，edgeID 与 nodeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 * @usage
 */
export class FacilityAnalystTraceup3DParameters extends FacilityAnalyst3DParameters {

    constructor(options) {
        super(options);
        this.CLASS_NAME = "SuperMap.FacilityAnalystTraceup3DParameters";
    }

    /**
     * @function FacilityAnalystTraceup3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }


}
