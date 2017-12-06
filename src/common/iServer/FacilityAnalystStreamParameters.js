import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.FacilityAnalystStreamParameters
 * @classdesc 上游/下游关键设施查找资源参数类。
 * @param options - {Object} 可选参数。如:<br>
 *         sourceNodeIDs - {Array<number>} 指定的设施点ID数组，可以为空。<br>
 *         edgeID - {number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。<br>
 *         nodeID - {number} 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。<br>
 *         isUncertainDirectionValid - {boolean} 指定不确定流向是否有效；默认false，无效。<br>
 *         queryType - {number} 分析类型，只能是 0 (上游关键设施查询) 或者是 1（下游关键设施查询）。
 */
export class FacilityAnalystStreamParameters {

    /**
     * @member SuperMap.FacilityAnalystStreamParameters.prototype.sourceNodeIDs - {Array<number>}
     * @description 指定的设施点ID数组,可以为空。
     */
    sourceNodeIDs = null;

    /**
     * @member SuperMap.FacilityAnalystStreamParameters.prototype.edgeID - {number}
     * @description 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
     */
    edgeID = null;

    /**
     * @member SuperMap.FacilityAnalystStreamParameters.prototype.nodeID - {number}
     * @description 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
     */
    nodeID = null;

    /**
     * @member SuperMap.FacilityAnalystStreamParameters.prototype.isUncertainDirectionValid - {boolean}
     * @description 指定不确定流向是否有效，默认为false。指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行；
     *                指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
     */
    isUncertainDirectionValid = false;

    /**
     * @member SuperMap.FacilityAnalystStreamParameters.prototype.queryType - {number}
     * @description 分析类型，只能是 0 (上游关键设施查询) 或者是 1（下游关键设施查询）。
     */
    queryType = null;

    constructor(options) {
        var me = this;
        if (!options) {
            return;
        }
        Util.extend(me, options);
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


    CLASS_NAME = "SuperMap.FacilityAnalystStreamParameters"
}

SuperMap.FacilityAnalystStreamParameters = FacilityAnalystStreamParameters;