var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.VectorClipJobsParameter
 * @description 矢量裁剪分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{String} 数据集名。 <br>
 *         datasetOverlay -{String} 裁剪对象数据集。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 裁剪分析模式 。 <br>
 */
SuperMap.VectorClipJobsParameter = SuperMap.Class({

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: null,

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.datasetOverlay -{String}
     * @description 裁剪对象数据集。
     */
    datasetOverlay: null,

    /**
     * @member SuperMap.VectorClipJobsParameter.prototype.mode -{SuperMap.ClipAnalystMode}
     * @description 裁剪分析模式 。
     */
    mode: null,

    initialize: function (options) {
        options = options || {};
        if (options.mode && typeof options.mode === "string") {
            options.mode = options.mode.toLowerCase();
        }
        SuperMap.Util.extend(this, options);
    },

    /**
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        this.datasetName = null;
        this.datasetOverlay = null;
        this.mode = null;
    }

});

SuperMap.VectorClipJobsParameter.toObject = function (vectorClipJobsParameter, tempObj) {
    for (var name in vectorClipJobsParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = vectorClipJobsParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = vectorClipJobsParameter[name];
    }
};

module.exports = SuperMap.VectorClipJobsParameter;