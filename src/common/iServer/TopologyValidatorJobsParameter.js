/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { TopologyValidatorRule } from '../REST';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class TopologyValidatorJobsParameter
 * @deprecatedclass SuperMap.TopologyValidatorJobsParameter
 * @category  iServer ProcessingService TopologyValidator
 * @classdesc 拓扑检查分析任务参数类。此类用于设置拓扑检查分析的数据集、拓扑检查规则、容限等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.datasetTopology -检查对象所在的数据集名称。
 * @param {TopologyValidatorRule} [options.rule=TopologyValidatorRule.REGIONNOOVERLAP] - 拓扑检查规则。
 * @param {string} [options.tolerance] - 容限。
 * @param {OutputSetting} [options.output] - 输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class TopologyValidatorJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} TopologyValidatorJobsParameter.prototype.datasetName
         * @description 数据集名称。
         */
        this.datasetName = "";

        /**
         * @member {string} TopologyValidatorJobsParameter.prototype.datasetTopology
         * @description 拓扑检查对象所在的数据集名称。
         */
        this.datasetTopology = "";

        /**
         * @member {string} [TopologyValidatorJobsParameter.prototype.tolerance]
         * @description 容限，指定的拓扑错误检查时使用的容限。单位与进行拓扑错误检查的数据集单位相同。取值范围为大于等于 0，小于 0 将抛出异常。（默认值：0.000001）
         */
        this.tolerance = "";

        /**
         * @member {TopologyValidatorRule} [TopologyValidatorJobsParameter.prototype.rule=TopologyValidatorRule.REGIONNOOVERLAP]
         * @description 拓扑检查规则。
         */
        this.rule = TopologyValidatorRule.REGIONNOOVERLAP;

        /**
         * @member {OutputSetting} [TopologyValidatorJobsParameter.prototype.output]
         * @description 输出参数设置类。
         */
        this.output = null;

        /**
         * @member {MappingParameters} [TopologyValidatorJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.TopologyValidatorJobsParameter";
    }

    /**
     * @function TopologyValidatorJobsParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.datasetTopology = null;
        this.tolerance = null;
        this.rule = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters) {
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function TopologyValidatorJobsParameter.toObject
     * @param {Object} TopologyValidatorJobsParameter -拓扑检查分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成拓扑检查分析任务对象。
     */
    static toObject(TopologyValidatorJobsParameter, tempObj) {
        for (var name in TopologyValidatorJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = TopologyValidatorJobsParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = TopologyValidatorJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = TopologyValidatorJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = TopologyValidatorJobsParameter[name];
            }
        }
    }
}
