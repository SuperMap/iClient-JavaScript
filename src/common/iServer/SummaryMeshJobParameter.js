var SuperMap = require('../SuperMap');
/**
 * Class: SuperMap.KernelDensityJobParameter
 * 核密度分析任务参数类
 */

SuperMap.SummaryMeshJobParameter = SuperMap.Class({

    /**
     * APIProperty: datasetName
     * {String} 数据集名。
     */
    datasetName: null,

    /**
     * APIProperty: query
     * {<SuperMap.Bounds>} 分析范围。
     */
    query: null,

    /**
     * APIProperty: resolution
     * {number} 分辨率。
     */
    resolution: null,

    /**
     * APIProperty: statisticModes
     * {String} 分析模式。
     */
    statisticModes: null,

    /**
     * APIProperty: resultFieldNames
     * {String} 结果字段名。
     */
    resultFieldNames: null,

    /**
     * APIProperty: separator
     * {numbert} 分析类型。
     */
    meshType: null,

    /**
     * APIProperty: separator
     * {numbert} 权重索引。
     */
    fields: null,

    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        this.datasetName = null;
        this.query = null;
        this.resolution = null;
        this.statisticModes = null;
        this.resultFieldNames = null;
        this.meshType = null;
        this.fields = null;
    }

});

SuperMap.SummaryMeshJobParameter.toObject = function (summaryMeshJobParameter, tempObj) {
    for (var name in summaryMeshJobParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = summaryMeshJobParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = summaryMeshJobParameter[name];
    }
};

module.exports = SuperMap.SummaryMeshJobParameter;