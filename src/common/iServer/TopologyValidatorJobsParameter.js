import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TopologyValidatorRule} from '../REST';

/**
 * @class SuperMap.TopologyValidatorJobsParameter
 * @classdesc 拓扑检查分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{string} 数据集名。 <br>
 *         datasetTopology -{string} 检查对象所在的数据集名称。 <br>
 *         rule -{{@link SuperMap.TopologyValidatorRule}} 拓扑检查规则 。 <br>
 *         tolerance -{string} 容限 <br>
 */
export class TopologyValidatorJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.TopologyValidatorJobsParameter.prototype.datasetName -{string}
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member SuperMap.TopologyValidatorJobsParameter.prototype.datasetTopology -{string}
         * @description 拓扑检查对象所在的数据集名称。
         */
        this.datasetTopology = "";

        /**
         * @member SuperMap.TopologyValidatorJobsParameter.prototype.tolerance -{string}
         * @description 容限，指定的拓扑错误检查时使用的容限。
         */
        this.tolerance = "";

        /**
         * @member SuperMap.TopologyValidatorJobsParameter.prototype.rule -{SuperMap.TopologyValidatorRule}
         * @description 拓扑检查模式 。
         */
        this.rule = TopologyValidatorRule.REGIONNOOVERLAP;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TopologyValidatorJobsParameter";
    }

    /**
     * @function SuperMap.TopologyValidatorJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetTopology = null;
        this.tolerance = null;
        this.rule = null;
    }

    /**
     * @function SuperMap.TopologyValidatorJobsParameter.toObject
     * @param TopologyValidatorJobsParameter -{Object} 拓扑检查分析任务参数
     * @param tempObj - {Object} 目标对象
     * @description 生成拓扑检查分析任务对象
     */
    static toObject(TopologyValidatorJobsParameter, tempObj) {
        for (var name in TopologyValidatorJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = TopologyValidatorJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = TopologyValidatorJobsParameter[name];
        }
    }
}

SuperMap.TopologyValidatorJobsParameter = TopologyValidatorJobsParameter;