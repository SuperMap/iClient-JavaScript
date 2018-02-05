import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.BurstPipelineAnalystParameters
 * @category  iServer NetworkAnalyst
 * @classdesc 爆管分析参数类。
 * @param options - {Object} 可选参数。如：<br>
 *         sourceNodeIDs - {Array<number>} 指定的设施点ID数组。<br>
 *         edgeID - {number} 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。<br>
 *         nodeID - {number} 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。<br>
 *         isUncertainDirectionValid - {boolean} 指定不确定流向是否有效；默认false，无效。
 */
export class BurstPipelineAnalystParameters {


    constructor(options) {
        var me = this;
        /**
         * @member SuperMap.BurstPipelineAnalystParameters.prototype.sourceNodeIDs -{Array<number>}
         * @description 指定的设施点ID数组,可以为空。
         */
        this.sourceNodeIDs = null;

        /**
         * @member SuperMap.BurstPipelineAnalystParameters.prototype.edgeID -{number}
         * @description 指定的弧段ID（注：edgeID 与 nodeID 不能同时使用）。
         */
        this.edgeID = null;

        /**
         * @member SuperMap.BurstPipelineAnalystParameters.prototype.nodeID -{number}
         * @description 指定的结点ID （注：edgeID 与 nodeID 不能同时使用）。
         */
        this.nodeID = null;

        /**
         * @member SuperMap.BurstPipelineAnalystParameters.prototype.isUncertainDirectionValid -{boolean}
         * @description 指定不确定流向是否有效，默认为false。
         * 指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行。
         * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
         */
        this.isUncertainDirectionValid = false;

        Util.extend(me, options);

        this.CLASS_NAME = "SuperMap.BurstPipelineAnalystParameters";
    }

    /**
     * @function SuperMap.BurstPipelineAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.sourceNodeIDs = null;
        me.edgeID = null;
        me.nodeID = null;
        me.isUncertainDirectionValid = null;
    }


}

SuperMap.BurstPipelineAnalystParameters = BurstPipelineAnalystParameters;