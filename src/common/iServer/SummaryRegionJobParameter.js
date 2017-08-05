import SuperMap from '../SuperMap';
import {StatisticAnalystMode, SummaryType, AnalystSizeUnit} from '../REST'

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @description 范围汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{String} 数据集名。 <br>
 *         sumShape -{Boolean} 是否统计长度或面积。 <br>
 *         query -{SuperMap.Bounds} 分析范围。 <br>
 *         standardSummaryFields -{Boolean} 以标准属字段统计。 <br>
 *         standardFields -{String} 以标准属字段统计的字段名称。 <br>
 *         standardStatisticModes -{String} 以标准属字段统计的统计模式。 <br>
 *         weightedSummaryFields -{Boolean} 以权重字段统计。 <br>
 *         weightedFields -{String} 以权重字段统计的字段名称。 <br>
 *         weightedStatisticModes -{String} 以权重字段统计的统计模式。 <br>
 *         resolution -{number} 网格大小。 <br>
 *         meshType -{number} 网格面汇总类型。 <br>
 *         meshSizeUnit -{String} 网格大小单位。 <br>
 *         type -{String} 汇总类型。 <br>
 */
export default class SummaryRegionJobParameter {

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.regionDataset -{String}
     * @description 汇总数据源（多边形汇总时用到的参数）。
     */
    regionDataset = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.sumShape -{Boolean}
     * @description 是否统计长度或面积。
     */
    sumShape = true;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围。
     */
    query = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields -{Boolean}
     * @description 以标准属字段统计。
     */
    standardSummaryFields = false;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardFields -{String}
     * @description 以标准属字段统计的字段名称。
     */
    standardFields = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes -{SuperMap.StatisticAnalystMode}
     * @description 以标准属字段统计的统计模式。
     */
    standardStatisticModes = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields -{Boolean}
     * @description 以权重字段统计。
     */
    weightedSummaryFields = false;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedFields -{String}
     * @description 以权重字段统计的字段名称。
     */
    weightedFields = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes -{SuperMap.StatisticAnalystMode}
     * @description 以权重字段统计的统计模式。
     */
    weightedStatisticModes = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshType -{number}
     * @description 网格面汇总类型。
     */
    meshType = 0;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.resolution -{number}
     * @description 网格大小。
     */
    resolution = 100;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit -{SuperMap.AnalystSizeUnit}
     * @description 网格大小单位。
     */
    meshSizeUnit = AnalystSizeUnit.METER;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.type -{SuperMap.SummaryType}
     * @description 汇总类型。
     */
    type = SummaryType.SUMMARYMESH;


    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.sumShape = null;
        this.query = null;
        this.standardSummaryFields = null;
        this.standardFields = null;
        this.standardStatisticModes = null;
        this.weightedSummaryFields = null;
        this.weightedFields = null;
        this.weightedStatisticModes = null;
        this.meshType = null;
        this.resolution = null;
        this.meshSizeUnit = null;
        this.type = null;
    }

    static toObject(summaryRegionJobParameter, tempObj) {
        for (var name in summaryRegionJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = summaryRegionJobParameter[name];
                continue;
            }
            if (name === "type") {
                tempObj['type'] = summaryRegionJobParameter[name];
                continue;
            }
            if (summaryRegionJobParameter.type === "SUMMARYREGION" || summaryRegionJobParameter.type === "SUMMARYMESH" && name !== "regionDataset") {
                tempObj['analyst'] = tempObj['analyst'] || {};
                tempObj['analyst'][name] = summaryRegionJobParameter[name];
            }
        }
    }

}

SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter;
