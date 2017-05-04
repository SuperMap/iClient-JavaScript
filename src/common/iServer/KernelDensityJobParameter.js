var SuperMap = require('../SuperMap');
/**
 * Class: SuperMap.KernelDensityJobParameter
 * 核密度分析任务参数类
 */

SuperMap.KernelDensityJobParameter = SuperMap.Class({

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
     * APIProperty: separator
     * {numbert} 分析方法。
     */
    method: null,

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

    /**
     * APIProperty: radius
     * {number} 分析的影响半径。
     */
    radius: null,

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
        this.method = null;
        this.radius = null;
        this.meshType = null;
        this.fields = null;
    }

});

SuperMap.KernelDensityJobParameter.toObject = function (kernelDensityJobParameter, tempObj) {
    for (var name in kernelDensityJobParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = kernelDensityJobParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = kernelDensityJobParameter[name];
    }
};

module.exports = SuperMap.KernelDensityJobParameter;