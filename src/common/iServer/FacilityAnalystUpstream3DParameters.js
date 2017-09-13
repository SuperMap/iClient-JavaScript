import SuperMap from '../SuperMap';
import FacilityAnalyst3DParameters from './FacilityAnalyst3DParameters';

/**
 * @class SuperMap.FacilityAnalystUpstream3DParameters
 * @classdesc 上游关键设施查找资源参数类。
 * @extends SuperMap.FacilityAnalyst3DParameters
 * @param options - {Object} 可选参数。如:<br>
 *        edgeID - {number} 指定的弧段ID。<br>
 *        nodeID - {integer} 指定的结点ID。<br>
 *        weightName - {string} 指定的权值字段信息对象的名称。<br>
 *        isUncertainDirectionValid - {boolean} 指定不确定流向是否有效。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
 *                                              指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。<br>
 *        sourceNodeIDs - {Array<number>} 指定的设施点ID数组。
 */
export default  class FacilityAnalystUpstream3DParameters extends FacilityAnalyst3DParameters {

    /**
     * @member SuperMap.FacilityAnalystUpstream3DParameters.prototype.sourceNodeIDs - {Array<number>}
     * @description 指定的设施点ID数组。
     */
    sourceNodeIDs = null;

    constructor(options) {
        super(options);
        options = options || {};
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.FacilityAnalystUpstream3DParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        this.sourceNodeIDs = null;
    }

    CLASS_NAME = "SuperMap.FacilityAnalystUpstream3DParameters"
}

SuperMap.FacilityAnalystUpstream3DParameters = FacilityAnalystUpstream3DParameters;