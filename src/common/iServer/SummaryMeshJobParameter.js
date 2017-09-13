import SuperMap from '../SuperMap';
import {StatisticAnalystMode, SummaryType} from '../REST'

/**
 * @class SuperMap.SummaryMeshJobParameter
 * @classdesc 点聚合分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{string} 数据集名。<br>
 *        query -{Object} 分析范围。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
 *        resolution -{number}分辨率。<br>
 *        statisticModes -{{@link SuperMap.StatisticAnalystMode}} 分析模式。<br>
 *        meshType -{number}分析类型。<br>
 *        fields -{number}权重索引。<br>
 *        type -{{@link SuperMap.SummaryType}} 聚合类型。
 */
export default class SummaryMeshJobParameter {

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.datasetName -{string}
     * @description 数据集名。
     */
    datasetName = "";

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.regionDataset -{string}
     * @description 聚合面数据集(聚合类型为多边形聚合时使用的参数)。
     */
    regionDataset = "";

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.query -{Object}
     * @description 分析范围(聚合类型为网格面聚合时使用的参数)。范围类型可以是SuperMap.Bounds|L.Bounds|ol.extent。<br>
     */
    query = "";

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.resolution -{number}
     * @description 分辨率(聚合类型为网格面聚合时使用的参数)。
     */
    resolution = 100;

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.meshType -{number}
     * @description  网格面类型(聚合类型为网格面聚合时使用的参数),取值：0或1。
     */
    meshType = 0;

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.statisticModes -{SuperMap.StatisticAnalystMode}
     * @description 统计模式。
     */
    statisticModes = "";

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.fields -{number}
     * @description 权重字段。
     */
    fields = "";

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.type -{SuperMap.SummaryType}
     * @description 聚合类型。
     */
    type = SummaryType.SUMMARYMESH;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
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
    }

    /**
     * @function SuperMap.SummaryMeshJobParameter.toObject
     * @param summaryMeshJobParameter - {Object} 点聚合分析任务参数。
     * @param tempObj - {Object} 目标对象。
     * @description 生成点聚合分析任务对象
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
