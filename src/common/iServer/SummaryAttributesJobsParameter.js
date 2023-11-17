/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { OutputSetting } from './OutputSetting';
import { MappingParameters } from './MappingParameters';

/**
 * @class SummaryAttributesJobsParameter
 * @deprecatedclass SuperMap.SummaryAttributesJobsParameter
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析任务参数类。此类用于设置属性汇总分析的数据集、分组字段、属性字段、统计模式等参数，还可以对分析结果的输出参数、可视化参数进行一系列设置。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名称。
 * @param {string} options.groupField - 分组字段。
 * @param {string} options.attributeField - 属性字段。
 * @param {StatisticAnalystMode} options.statisticModes - 属性汇总统计模式。可设置多个字段，使用逗号“，”分离。该长度必须和属性字段保持一致。
 * @param {OutputSetting} [options.output] -输出参数设置。
 * @param {MappingParameters} [options.mappingParameters] - 分析后结果可视化的参数类。
 * @usage
 */
export class SummaryAttributesJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SummaryAttributesJobsParameter.prototype.datasetName
         * @description 汇总数据集名称。
         */
        this.datasetName = "";
        /**
         * @member {string} SummaryAttributesJobsParameter.prototype.groupField
         * @description 分组字段。根据属性字段里的属性值进行分组，相同属性值的对象分为一组，
         * 将分好的组根据属性字段进行统计。可设置多个字段，使用逗号“，”分离。若不设置该参数，
         * 将对所有对象进行属性统计。仅支持系统字段以外的字段。
         */
        this.groupField = "";
        /**
         * @member {string} SummaryAttributesJobsParameter.prototype.attributeField
         * @description 属性字段。将分组后的对象根据该字段进行统计。可设置多个字段，使用逗号“，”分离。
         * 若不设置该参数，不进行任何统计。若分组字段为空，则把属性表中所有对象视为一组，进行属性字段统计。
         * 该长度必须和统计模式保持一致。仅支持系统字段以外的数值型的字段。
         */
        this.attributeField = "";
        /**
         * @member {StatisticAnalystMode} SummaryAttributesJobsParameter.prototype.statisticModes
         * @description 属性汇总统计模式。可设置多个字段，使用逗号“，”分离。该长度必须和属性字段保持一致。
         */
        this.statisticModes = "";
        /**
         * @member {OutputSetting} SummaryAttributesJobsParameter.prototype.output
         * @description 输出参数设置类。
         */
        this.output = null;
        /**
         * @member {MappingParameters} [SummaryAttributesJobsParameter.prototype.mappingParameters]
         * @description 分析后结果可视化的参数类。
         */
        this.mappingParameters = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.SummaryAttributesJobsParameter";
    }

    /**
     * @function SummaryAttributesJobsParameter.prototype.destroy
     * @description 释放资源，将资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.groupField = null;
        this.attributeField = null;
        this.statisticModes = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
        if (this.mappingParameters instanceof MappingParameters){
            this.mappingParameters.destroy();
            this.mappingParameters = null;
        }
    }

    /**
     * @function SummaryAttributesJobsParameter.toObject
     * @param {Object} SummaryAttributesJobsParameter - 属性汇总任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成属性汇总分析任务对象。
     */
    static toObject(SummaryAttributesJobsParameter, tempObj) {
        for (var name in SummaryAttributesJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = SummaryAttributesJobsParameter[name];
                continue;
            }
            if (name === "output") {
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = SummaryAttributesJobsParameter[name];
                continue;
            }

            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = SummaryAttributesJobsParameter[name];
            if(name === 'mappingParameters'){
                tempObj['analyst'][name] = tempObj['analyst'][name] || {};
                tempObj['analyst']['mappingParameters'] = SummaryAttributesJobsParameter[name];
            }
        }
    }

}
