var SuperMap = require('../SuperMap');

/**
 * @class SuperMap.KernelDensityJobParameter
 * @description 密度分析任务参数类
 * @param options - {Object} 可选参数。如：<br>
 *         datasetName -{String} 数据集名。 <br>
 *         query -{SuperMap.Bounds} 分析范围。 <br>
 *         resolution -{number} 分辨率。 <br>
 *         method -{number} 分析方法。 <br>
 *         meshType -{number} 分析类型。 <br>
 *         fields -{String} 权重索引。 <br>
 *         radius -{number} 分析的影响半径。
 */
SuperMap.KernelDensityJobParameter = SuperMap.Class({

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.query -{SuperMap.Bounds}
     * @description 分析范围。
     */
    query: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.resolution -{number}
     * @description 分辨率。
     */
    resolution: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.method -{numbert}
     * @description 分析方法。
     */
    method: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.meshType -{numbert}
     * @description 分析类型。
     */
    meshType: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.fields -{String}
     * @description 权重索引。
     */
    fields: null,

    /**
     * @member SuperMap.KernelDensityJobParameter.prototype.radius -{number}
     * @description 分析的影响半径。
     */
    radius: null,

    initialize: function (options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
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