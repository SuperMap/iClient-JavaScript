/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class BurstPipelineAnalystParameters
 * @deprecatedclass SuperMap.BurstPipelineAnalystParameters
 * @category iServer NetworkAnalyst BurstAnalyse
 * @classdesc 爆管分析参数类。此类用于设置爆管分析中设施点、弧段或结点等参数，还可以对不确定流向是否有效进行设置。<br>
 * 爆管分析可应用于查找爆管点上游或下游最近的阀门位置（关键设施点），根据管道流向指示，
 * 迅速找到上游中需要关闭的最临近且最少数量的阀门。关闭这些阀门后，爆裂管段与它的上游不再连通，从而阻止水的流出，
 * 防止灾情加重和资源浪费。爆管分析的结果将给出影响爆管位置上下游的关键设施点和弧段、受爆管位置影响的上下游的普通设施点和弧段，
 * 即返回关键结点 ID 数组，普通结点 ID 数组及其上下游弧段 ID 数组。
 * @param {Object} options - 参数。
 * @param {Array.<number>} options.sourceNodeIDs - 指定的设施点 ID 数组。
 * @param {number} [options.edgeID] - 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
 * @param {number} [options.nodeID] - 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
 * @param {boolean} [options.isUncertainDirectionValid=false] - 指定不确定流向是否有效。
 * @usage
 */
export class BurstPipelineAnalystParameters {


    constructor(options) {
        var me = this;
        /**
         * @member {Array.<number>} BurstPipelineAnalystParameters.prototype.sourceNodeIDs
         * @description 指定的设施点 ID 数组。
         */
        this.sourceNodeIDs = null;

        /**
         * @member {number} [BurstPipelineAnalystParameters.prototype.edgeID]
         * @description 指定的弧段 ID，edgeID 与 nodeID 必须指定一个。
         */
        this.edgeID = null;

        /**
         * @member {number} [BurstPipelineAnalystParameters.prototype.nodeID]
         * @description 指定的结点 ID，edgeID 与 nodeID 必须指定一个。
         */
        this.nodeID = null;

        /**
         * @member {boolean} [BurstPipelineAnalystParameters.prototype.isUncertainDirectionValid=false]
         * @description 指定不确定流向是否有效。
         * 指定为 true，表示不确定流向有效，遇到不确定流向时分析继续进行。
         * 指定为 false，表示不确定流向无效，遇到不确定流向将停止在该方向上继续查找。
         */
        this.isUncertainDirectionValid = false;

        Util.extend(me, options);

        this.CLASS_NAME = "SuperMap.BurstPipelineAnalystParameters";
    }

    /**
     * @function BurstPipelineAnalystParameters.prototype.destroy
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
