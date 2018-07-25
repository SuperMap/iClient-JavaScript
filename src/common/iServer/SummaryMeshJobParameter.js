import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {StatisticAnalystMode, SummaryType} from '../REST';
import {OutputSetting} from './OutputSetting';

/**
 * @class SuperMap.SummaryMeshJobParameter
 * @category  iServer ProcessingService AggregatePoints
 * @classdesc 点聚合分析任务参数类。
 * @param {Object} options - 参数。
 * @param {string} options.datasetName - 数据集名。
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.query - 分析范围。
 * @param {number} [options.resolution=100] - 分辨率。
 * @param {SuperMap.StatisticAnalystMode} [options.statisticModes=SuperMap.StatisticAnalystMode.AVERAGE] - 分析模式。
 * @param {number} [options.meshType=0] - 分析类型。
 * @param {number} options.fields - 权重索引。
 * @param {SuperMap.SummaryType} [options.type=SuperMap.SummaryType.SUMMARYMESH] - 聚合类型。
 * @param {SuperMap.OutputSetting} [options.output] - 输出参数设置。
 */
export class SummaryMeshJobParameter {

    constructor(options) {
        if (!options) {
            return;
        }
        /**
         * @member {string} SuperMap.SummaryMeshJobParameter.prototype.datasetName
         * @description 数据集名。
         */
        this.datasetName = "";

        /**
         * @member {string} SuperMap.SummaryMeshJobParameter.prototype.regionDataset
         * @description 聚合面数据集(聚合类型为多边形聚合时使用的参数)。
         */
        this.regionDataset = "";

        /**
         * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.SummaryMeshJobParameter.prototype.query
         * @description 分析范围(聚合类型为网格面聚合时使用的参数)。
         */
        this.query = "";

        /**
         * @member {number} [SuperMap.SummaryMeshJobParameter.prototype.resolution=100]
         * @description 分辨率(聚合类型为网格面聚合时使用的参数)。
         */
        this.resolution = 100;

        /**
         * @member {number} [SuperMap.SummaryMeshJobParameter.prototype.meshType=0]
         * @description  网格面类型(聚合类型为网格面聚合时使用的参数)，取值：0或1。
         */
        this.meshType = 0;

        /**
         * @member {SuperMap.StatisticAnalystMode} [SuperMap.SummaryMeshJobParameter.prototype.statisticModes=SuperMap.StatisticAnalystMode.AVERAGE]
         * @description 统计模式。
         */
        this.statisticModes = StatisticAnalystMode.AVERAGE;

        /**
         * @member {number} SuperMap.SummaryMeshJobParameter.prototype.fields
         * @description 权重字段。
         */
        this.fields = "";

        /**
         * @member {SuperMap.SummaryType} [SuperMap.SummaryMeshJobParameter.prototype.type=SuperMap.SummaryType.SUMMARYMESH]
         * @description 聚合类型。
         */
        this.type = SummaryType.SUMMARYMESH;

        /**
         * @member {SuperMap.OutputSetting} SuperMap.SummaryMeshJobParameter.prototype.output
         * @description 输出参数设置类。
         */
        this.output = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.SummaryMeshJobParameter";
    }


    /**
     * @function SuperMap.SummaryMeshJobParameter.destroy
     * @override
     */
    destroy() {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.statisticModes = null;
        this.meshType = null;
        this.fields = null;
        this.regionDataset = null;
        this.type = null;
        if (this.output instanceof OutputSetting) {
            this.output.destroy();
            this.output = null;
        }
    }

    /**
     * @function SuperMap.SummaryMeshJobParameter.toObject
     * @param {Object} summaryMeshJobParameter - 点聚合分析任务参数。
     * @param {Object} tempObj - 目标对象。
     * @description 生成点聚合分析任务对象。
     */
    static toObject(summaryMeshJobParameter, tempObj) {
        for (var name in summaryMeshJobParameter) {
            if (name === "datasetName") {
                tempObj['input'] = tempObj['input'] || {};
                tempObj['input'][name] = summaryMeshJobParameter[name];
                continue;
            }
            if (name === "type") {
                tempObj['type'] = summaryMeshJobParameter[name];
                continue;
            }
            if (name === "output"){
                tempObj['output'] = tempObj['output'] || {};
                tempObj['output'] = summaryMeshJobParameter[name];
                continue;
            }
            if (summaryMeshJobParameter.type === 'SUMMARYMESH' && name !== 'regionDataset' || summaryMeshJobParameter.type === 'SUMMARYREGION' && !contains(['meshType', 'resolution', 'query'], name)) {
                tempObj['analyst'] = tempObj['analyst'] || {};
                if (name === 'query') {
                    tempObj['analyst'][name] = summaryMeshJobParameter[name].toBBOX();
                } else {
                    tempObj['analyst'][name] = summaryMeshJobParameter[name];
                }
            }

        }

        function contains(arr, obj) {
            var i = arr.length;
            while (i--) {
                if (arr[i] === obj) {
                    return true;
                }
            }
            return false;
        }
    }

}

SuperMap.SummaryMeshJobParameter = SummaryMeshJobParameter;
