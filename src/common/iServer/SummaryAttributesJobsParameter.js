import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SummaryAttributesJobsParameter
 * @category  iServer ProcessingService SummaryAttributes
 * @classdesc 属性汇总分析任务参数类
 * @param {Object} options - 参数。<br>
 * @param {string} options.datasetName - 数据集名。<br>
 * @param {string} options.groupField - 分组字段。<br>
 * @param {string} options.attributeField - 属性字段。<br>
 * @param {string} options.statisticModes - 统计模式。<br>
 * @param {SuperMap.OutputSetting} options.output -输出参数设置。<br>
 */
export class SummaryAttributesJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.datasetName
         * @description 汇总数据集名称
         */
        this.datasetName = "";
        /**
         * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.groupField
         * @description 分组字段
         */
        this.groupField = "";
        /**
         * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.attributeField
         * @description 属性字段
         */
        this.attributeField = "";
        /**
         * @member {string} SuperMap.SummaryAttributesJobsParameter.prototype.statisticModes
         * @description 属性汇总统计模式
         */
        this.statisticModes = "";
        /**
         * @member {SuperMap.OutputSetting} SuperMap.SummaryAttributesJobsParameter.prototype.output
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.SummaryAttributesJobsParameter";
    }

    /**
     * @function SuperMap.SummaryAttributesJobsParameter.destroy
     * @override
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
    }

    /**
     * @function SuperMap.SummaryAttributesJobsParameter.toObject
     * @param {Object} SummaryAttributesJobsParameter - 属性汇总任务参数
     * @param {Object} tempObj - 目标对象
     * @description 生成属性汇总分析任务对象
     */
    static toObject(SummaryAttributesJobsParameter, tempObj) {
        for (var name in SummaryAttributesJobsParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = SummaryAttributesJobsParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = SummaryAttributesJobsParameter[name];
                continue;
            }
            tempObj['analyst'] = tempObj['analyst'] || {};
            tempObj['analyst'][name] = SummaryAttributesJobsParameter[name];
        }
    }

}
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;