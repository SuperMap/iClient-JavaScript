import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.SummaryAttributesJobsParameter
 * @classdesc 属性汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{string} 数据集名。<br>
 *        groupField -{string}分组字段。<br>
 *        attributeField -{string} 属性字段。<br>
 *        statisticModes -{string} 统计模式。<br>
 */
export class SummaryAttributesJobsParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        this.datasetName = "";
        this.groupField = "";
        this.attributeField = "";
        this.statisticModes = "";
        Util.extend(this, options);
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
            tempObj['analyst'] = tempObj['analyst'] || {};
                tempObj['analyst'][name] = SummaryAttributesJobsParameter[name];
        }
    }

}
SuperMap.SummaryAttributesJobsParameter = SummaryAttributesJobsParameter;