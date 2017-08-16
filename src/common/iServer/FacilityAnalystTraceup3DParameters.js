import SuperMap from '../SuperMap';
import FacilityAnalyst3DParameters from './FacilityAnalyst3DParameters';

/**
 * @class SuperMap.FacilityAnalystTraceup3DParameters
 * @classdesc 上游追踪资源参数类
 * @extends SuperMap.FacilityAnalyst3DParameters
 * @param options - {Object} 可选参数。如：<br>
 *         edgeID - {number}指定的弧段ID。<br>
 *         nodeID - {Integer} 指定的结点ID。<br>
 *         weightName -{string} 指定的权值字段信息对象的名称。<br>
 *         isUncertainDirectionValid -{boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；<br>
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
 */
export default  class FacilityAnalystTraceup3DParameters extends FacilityAnalyst3DParameters {

    constructor(options) {
        super(options);
    }

    /**
     * @inheritDoc
     */
    destroy() {
        super.destroy();
    }

    CLASS_NAME = "SuperMap.FacilityAnalystTraceup3DParameters"
}

SuperMap.FacilityAnalystTraceup3DParameters = FacilityAnalystTraceup3DParameters;