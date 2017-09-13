import SuperMap from '../SuperMap';
import {StatisticAnalystMode, SummaryType, AnalystSizeUnit} from '../REST'

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @classdesc 区域汇总分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{string} 数据集名。 <br>
 *         sumShape -{boolean} 是否统计长度或面积。 <br>
 *         query -{Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。 <br>
 *         standardSummaryFields -{boolean} 以标准属字段统计。 <br>
 *         standardFields -{string} 以标准属字段统计的字段名称。 <br>
 *         standardStatisticModes -{{@link SuperMap.StatisticAnalystMode}} 以标准属字段统计的统计模式。 <br>
 *         weightedSummaryFields -{boolean} 以权重字段统计。 <br>
 *         weightedFields -{string} 以权重字段统计的字段名称。 <br>
 *         weightedStatisticModes -{{@link SuperMap.StatisticAnalystMode}} 以权重字段统计的统计模式。 <br>
 *         resolution -{number}网格大小。 <br>
 *         meshType -{number}网格面汇总类型。 <br>
 *         meshSizeUnit -{{@link SuperMap.AnalystSizeUnit}} 网格大小单位。 <br>
 *         type -{{@link SuperMap.SummaryType}} 汇总类型。 <br>
 */
export default class SummaryRegionJobParameter {

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.regionDataset -{string}
     * @description 汇总数据源（多边形汇总时用到的参数）。
     */
    regionDataset = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.sumShape -{boolean}
     * @description 是否统计长度或面积。
     */
    sumShape = true;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.query
     * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。
     */
    query = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields -{boolean}
     * @description 以标准属字段统计。
     */
    standardSummaryFields = false;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardFields -{string}
     * @description 以标准属字段统计的字段名称。
     */
    standardFields = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes -{SuperMap.StatisticAnalystMode}
     * @description 以标准属字段统计的统计模式。
     */
    standardStatisticModes = "";

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields -{boolean}
     * @description 以权重字段统计。
     */
    weightedSummaryFields = false;

    /**
     * @member SuperMap.SummaryRegionJobParameter.prototype.weightedFields -{string}
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
     * @function SuperMap.SummaryRegionJobParameter.prototype.destroy
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

    /**
     * @function SuperMap.SummaryRegionJobParameter.toObject
     * @param summaryRegionJobParameter -{Object} 矢量裁剪分析任务参数。
     * @param tempObj - {Object} 目标对象。
     * @description 生成区域汇总分析服务对象
     */
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
                if (name === 'query') {
                    tempObj['analyst'][name] = summaryRegionJobParameter[name].toBBOX();
                } else {
                    tempObj['analyst'][name] = summaryRegionJobParameter[name];
                }
            }
        }
    }

}

SuperMap.SummaryRegionJobParameter = SummaryRegionJobParameter;
