var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.SingleObjectQueryJobsParameter
 * @description 单对象空间查询分析任务参数类
 * @param options - {Object} 必填参数。<br>
 *         datasetName -{String} 数据集名。 <br>
 *         datasetQuery -{String} 查询对象所在的数据集名称。 <br>
 *         mode -{SuperMap.SpatialQueryMode} 空间查询模式 。 <br>
 */
SuperMap.SingleObjectQueryJobsParameter = SuperMap.Class({

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetName -{String}
     * @description 数据集名。
     */
    datasetName: "",

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.datasetQuery -{String}
     * @description 查询对象所在的数据集名称。
     */
    datasetQuery: "",

    /**
     * @member SuperMap.SingleObjectQueryJobsParameter.prototype.mode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式 。
     */
    mode: "CONTAIN",

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
        this.datasetQuery = null;
        this.mode = null;
    }

});

SuperMap.SingleObjectQueryJobsParameter.toObject = function (singleObjectQueryJobsParameter, tempObj) {
    for (var name in singleObjectQueryJobsParameter) {
        if (name === "datasetName") {
            tempObj['input'] = tempObj['input'] || {};
            tempObj['input'][name] = singleObjectQueryJobsParameter[name];
            continue;
        }
        tempObj['analyst'] = tempObj['analyst'] || {};
        tempObj['analyst'][name] = singleObjectQueryJobsParameter[name];
    }
};

module.exports = SuperMap.SingleObjectQueryJobsParameter;