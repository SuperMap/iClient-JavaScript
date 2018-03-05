import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SummaryType, AnalystSizeUnit} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @category  iServer ProcessingService SummaryRegion
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
 *         output -{SuperMap.OutputSetting} 输出参数设置  <br>
 */
export class SummaryRegionJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.datasetName -{string}
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.regionDataset -{string}
         * @description 汇总数据源（多边形汇总时用到的参数）。
         */
        this.regionDataset = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.sumShape -{boolean}
         * @description 是否统计长度或面积。
         */
        this.sumShape = true;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.query
         * @description 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。
         */
        this.query = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields -{boolean}
         * @description 以标准属字段统计。
         */
        this.standardSummaryFields = false;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.standardFields -{string}
         * @description 以标准属字段统计的字段名称。
         */
        this.standardFields = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes -{SuperMap.StatisticAnalystMode}
         * @description 以标准属字段统计的统计模式。
         */
        this.standardStatisticModes = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields -{boolean}
         * @description 以权重字段统计。
         */
        this.weightedSummaryFields = false;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.weightedFields -{string}
         * @description 以权重字段统计的字段名称。
         */
        this.weightedFields = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes -{SuperMap.StatisticAnalystMode}
         * @description 以权重字段统计的统计模式。
         */
        this.weightedStatisticModes = "";

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.meshType -{number}
         * @description 网格面汇总类型。
         */
        this.meshType = 0;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.resolution -{number}
         * @description 网格大小。
         */
        this.resolution = 100;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit -{SuperMap.AnalystSizeUnit}
         * @description 网格大小单位。
         */
        this.meshSizeUnit = AnalystSizeUnit.METER;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.type -{SuperMap.SummaryType}
         * @description 汇总类型。
         */
        this.type = SummaryType.SUMMARYMESH;

        /**
         * @member SuperMap.SummaryRegionJobParameter.prototype.output -{SuperMap.OutputSetting}
         * @description 输出参数设置类
         */
        this.output = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SummaryRegionJobParameter";
    }

    /**
     * @function SuperMap.SummaryRegionJobParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        this.datasetName = null;
        this.sumShape = null;
        this.regionDataset = null;
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
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
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
            if (name === "type") {
                tempObj['type'] = summaryRegionJobParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = summaryRegionJobParameter[name];
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
