import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SummaryAttributesJobsParameter
 * @category  iServer ProcessingService
 * @classdesc 属性汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{string} 数据集名。<br>
 *        groupField -{string}分组字段。<br>
 *        attributeField -{string} 属性字段。<br>
 *        statisticModes -{string} 统计模式。<br>
 *        output -{SuperMap.OutputSetting} 输出参数设置  <br>
 */
export class SummaryAttributesJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member SuperMap.SummaryAttributesJobsParameter.prototype.datasetName -{string}
         * @description 汇总数据集名称
         */
        this.datasetName = "";
        /**
         * @member SuperMap.SummaryAttributesJobsParameter.prototype.groupField -{string}
         * @description 分组字段
         */
        this.groupField = "";
        /**
         * @member SuperMap.SummaryAttributesJobsParameter.prototype.attributeField -{string}
         * @description 属性字段
         */
        this.attributeField = "";
        /**
         * @member SuperMap.SummaryAttributesJobsParameter.prototype.statisticModes -{string}
         * @description 属性汇总统计模式
         */
        this.statisticModes = "";
        /**
         * @member SuperMap.SummaryAttributesJobsParameter.prototype.output -{SuperMap.OutputSetting}
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
     * @param SummaryAttributesJobsParameter -{Object} 属性汇总任务参数
     * @param tempObj - {Object} 目标对象
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