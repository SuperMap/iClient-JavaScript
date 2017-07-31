require('./FilterParameter');
require('./SurfaceAnalystParameters');
var SuperMap = require('../SuperMap');
var FilterParameter = require('./FilterParameter');
var DataReturnOption = require('./DataReturnOption');
SuperMap.DatasetSurfaceAnalystParameters = SuperMap.Class(SuperMap.SurfaceAnalystParameters, {
    /**
     * @class SuperMap.DatasetSurfaceAnalystParameters
     * @constructs SuperMap.DatasetSurfaceAnalystParameters
     * @classdesc
     * 数据集表面分析参数类。
     * 该类对数据集表面分析所用到的参数进行设置。
     * @extends {SuperMap.SurfaceAnalystParameters}
     * @api
     */

    /**
     * APIProperty: dataset
     * {String} 要用来做数据集表面分析的数据源中数据集的名称。
     * 该名称用形如"数据集名称@数据源别名"形式来表示，例如：Country@World。必设字段。
     */
    dataset: null,

    /**
     * APIProperty: filterQueryParameter
     * {SuperMap.FilterParameter} 获取或设置查询过滤条件参数。
     */
    filterQueryParameter: null,

    /**
     * APIProperty: zValueFieldName
     * {String} 获取或设置用于提取操作的字段名称。
     * 提取等值线时，将使用该字段中的值，对点记录集中的点数据进行插值分析，得到栅格数据集（中间结果），接着从栅格数据集提取等值线。
     */
    zValueFieldName: null,

    /**
     * @method SuperMap.GetFeaturesByBufferService.initialize
     * @param options - {Object} 可选参数。
     * Allowed options properties:</br>
     * dataset - {String} 要用来做数据集表面分析的数据源中数据集的名称。</br>
     * filterQueryParameter - {SuperMap.FilterParameter} 获取或设置查询过滤条件参数。</br>
     * zValueFieldName - {String} 获取或设置用于提取操作的字段名称。</br>
     * extractParameter - {SuperMap.SurfaceAnalystParametersSetting} 表面分析参数设置类。获取或设置表面分析参数。</br>
     * resolution - {Integer} 获取或设置指定中间结果（栅格数据集）的分辨率。</br>
     * resultSetting - {SuperMap.DataReturnOption} 结果返回设置类。</br>
     * surfaceAnalystMethod - {SuperMap.SurfaceAnalystMethod} 获取或设置表面分析的提取方法，提取等值线和提取等值面。</br>
     */
    initialize: function (options) {
        var me = this;
        me.filterQueryParameter = new FilterParameter();
        SuperMap.SurfaceAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.SurfaceAnalystParameters.prototype.destroy.apply(this, arguments);
        var me = this;
        me.dataset = null;
        if (me.filterQueryParameter) {
            me.filterQueryParameter.destroy();
            me.filterQueryParameter = null;
        }
        me.zValueFieldName = null;
    },

    CLASS_NAME: "SuperMap.DatasetSurfaceAnalystParameters"
});

SuperMap.DatasetSurfaceAnalystParameters.toObject = function (datasetSurfaceAnalystParameters, tempObj) {
    for (var name in datasetSurfaceAnalystParameters) {
        if (name === "filterQueryParameter") {
            tempObj.filterQueryParameter = datasetSurfaceAnalystParameters.filterQueryParameter;
        }
        if (name === "extractParameter") {
            tempObj.extractParameter = datasetSurfaceAnalystParameters.extractParameter;
        }
        else if (name === "dataset") {
        }
        else if (name === "surfaceAnalystMethod") {
        }
        else {
            tempObj[name] = datasetSurfaceAnalystParameters[name];
        }
    }
};

module.exports = function (options) {
    return new SuperMap.DatasetSurfaceAnalystParameters(options);
};