import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SummaryType, AnalystSizeUnit} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SummaryRegionJobParameter
 * @category  iServer ProcessingService SummaryRegion
 * @classdesc 区域汇总分析任务参数类
 * @param {Object} options - 参数。<br>
 * @param {string} options.datasetName - 数据集名。<br>
 * @param {boolean} options.sumShape - 是否统计长度或面积。<br>
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.query -分析范围。<br>
 * @param {boolean} options.standardSummaryFields 以标准属字段统计。<br>
 * @param {string} options.standardFields - 以标准属字段统计的字段名称。<br>
 * @param {SuperMap.StatisticAnalystMode} options.standardStatisticModes - 以标准属字段统计的统计模式。<br>
 * @param {boolean} options.weightedSummaryFields - 以权重字段统计。<br>
 * @param {string} options.weightedFields - 以权重字段统计的字段名称。<br>
 * @param {SuperMap.StatisticAnalystMode} options.weightedStatisticModes - 以权重字段统计的统计模式。<br>
 * @param {number} options.resolution - 网格大小。<br>
 * @param {number} options.meshType - 网格面汇总类型。 <br>
 * @param {SuperMap.AnalystSizeUnit} options.meshSizeUnit - 网格大小单位。<br>
 * @param {SuperMap.SummaryType} options.type - 汇总类型。<br>
 * @param {SuperMap.OutputSetting} options.output - 输出参数设置。<br>
 */
export class SummaryRegionJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }

        /**
         * @member {string} SuperMap.SummaryRegionJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {string} SuperMap.SummaryRegionJobParameter.prototype.regionDataset
         * @description 汇总数据源（多边形汇总时用到的参数）。
         */
        this.regionDataset = "";

        /**
         * @member {boolean} SuperMap.SummaryRegionJobParameter.prototype.sumShape
         * @description 是否统计长度或面积。
         */
        this.sumShape = true;

        /**
         * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.SummaryRegionJobParameter.prototype.query
         * @description 分析范围。
         */
        this.query = "";

        /**
         * @member {boolean} SuperMap.SummaryRegionJobParameter.prototype.standardSummaryFields
         * @description 以标准属字段统计。
         */
        this.standardSummaryFields = false;

        /**
         * @member {string} SuperMap.SummaryRegionJobParameter.prototype.standardFields
         * @description 以标准属字段统计的字段名称。
         */
        this.standardFields = "";

        /**
         * @member {SuperMap.StatisticAnalystMode} SuperMap.SummaryRegionJobParameter.prototype.standardStatisticModes
         * @description 以标准属字段统计的统计模式。
         */
        this.standardStatisticModes = "";

        /**
         * @member {boolean} SuperMap.SummaryRegionJobParameter.prototype.weightedSummaryFields
         * @description 以权重字段统计。
         */
        this.weightedSummaryFields = false;

        /**
         * @member {string} SuperMap.SummaryRegionJobParameter.prototype.weightedFields
         * @description 以权重字段统计的字段名称。
         */
        this.weightedFields = "";

        /**
         * @member {SuperMap.StatisticAnalystMode} SuperMap.SummaryRegionJobParameter.prototype.weightedStatisticModes
         * @description 以权重字段统计的统计模式。
         */
        this.weightedStatisticModes = "";

        /**
         * @member {number} SuperMap.SummaryRegionJobParameter.prototype.meshType
         * @description 网格面汇总类型。
         */
        this.meshType = 0;

        /**
         * @member {number} SuperMap.SummaryRegionJobParameter.prototype.resolution
         * @description 网格大小。
         */
        this.resolution = 100;

        /**
         * @member {SuperMap.AnalystSizeUnit} SuperMap.SummaryRegionJobParameter.prototype.meshSizeUnit
         * @description 网格大小单位。
         */
        this.meshSizeUnit = AnalystSizeUnit.METER;

        /**
         * @member {SuperMap.SummaryType} SuperMap.SummaryRegionJobParameter.prototype.type
         * @description 汇总类型。
         */
        this.type = SummaryType.SUMMARYMESH;

        /**
         * @member {SuperMap.OutputSetting} SuperMap.SummaryRegionJobParameter.prototype.output
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
     * @param {Object} summaryRegionJobParameter - 矢量裁剪分析任务参数。
     * @param {Object} tempObj - 目标对象。
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
