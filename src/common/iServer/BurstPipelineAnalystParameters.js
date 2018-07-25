import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.BurstPipelineAnalystParameters
 * @category iServer NetworkAnalyst BurstAnalyse
 * @classdesc 爆管分析参数类。
 * @param {Object} options - 参数。 
 * @param {Array.<number>} options.sourceNodeIDs - 指定的设施点ID数组。 
 * @param {number} [options.edgeID] - 指定的弧段ID，edgeID 与 nodeID 必须指定一个。 
 * @param {number} [options.nodeID] - 指定的结点ID，edgeID 与 nodeID 必须指定一个。 
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。
 */
export class BurstPipelineAnalystParameters {


    constructor(options) {
        var me = this;
        /**
         * @member {Array.<number>} SuperMap.BurstPipelineAnalystParameters.prototype.sourceNodeIDs
         * @description 指定的设施点ID数组。
         */
        this.sourceNodeIDs = null;

        /**
         * @member {number} [SuperMap.BurstPipelineAnalystParameters.prototype.edgeID]
         * @description 指定的弧段ID，edgeID 与 nodeID 必须指定一个。 
         */
        this.edgeID = null;

        /**
         * @member {number} [SuperMap.BurstPipelineAnalystParameters.prototype.nodeID]
         * @description 指定的结点ID，edgeID 与 nodeID 必须指定一个。 
         */
        this.nodeID = null;

        /**
         * @member {boolean} [SuperMap.BurstPipelineAnalystParameters.prototype.isUncertainDirectionValid=false]
         * @description 指定不确定流向是否有效。
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