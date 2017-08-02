var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.SummaryMeshJobParameter
 * @description 格网聚合分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *        datasetName -{String} 数据集名。<br>
 *        query -{SuperMap.Bounds} 分析范围。<br>
 *        resolution -{number} 分辨率。<br>
 *        statisticModes -{String} 分析模式。<br>
 *        meshType -{number} 分析类型。<br>
 *        fields -{number} 权重索引。<br>
 *        type -{String} 聚合类型。
 */
SuperMap.SummaryMeshJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.regionDataset -{String}
     * @description 聚合面数据集(聚合类型为多边形聚合时使用的参数)。
     */
    regionDataset: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围(聚合类型为网格面聚合时使用的参数)。
     */
    query: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.resolution -{number}
     * @description 分辨率(聚合类型为网格面聚合时使用的参数)。
     */
    resolution: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.meshType -{number}
     * @description  网格面类型(聚合类型为网格面聚合时使用的参数)。
     */
    meshType: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.statisticModes -{String}
     * @description 统计模式。
     */
    statisticModes: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.fields -{number}
     * @description 权重字段。
     */
    fields: null,

    /**
     * @member SuperMap.SummaryMeshJobParameter.prototype.type -{String}
     * @description 聚合类型。
     */
    type: null,

    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.statisticModes = null;
        this.meshType = null;
        this.fields = null;
        this.regionDataset = null;
        this.type = null;
    }

});

SuperMap.SummaryMeshJobParameter.toObject = function (summaryMeshJobParameter, tempObj) {
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
            tempObj['analyst'][name] = summaryMeshJobParameter[name];
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
};

module.exports = SuperMap.SummaryMeshJobParameter;