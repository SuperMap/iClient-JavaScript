/**
 * Class: SuperMap.GetFeaturesByBufferParameters
 * 数据服务中数据集缓冲区查询参数类。
 *
 * Inherits from:
 *  - < SuperMap.GetFeaturesParametersBase>
 */
require('./GetFeaturesParametersBase');
var SuperMap = require('../SuperMap');
var FilterParameter = require('./FilterParameter');
SuperMap.GetFeaturesByBufferParameters = SuperMap.Class(SuperMap.GetFeaturesParametersBase, {
    /**
     * APIProperty: bufferDistance
     * {Number} buffer距离,单位与所查询图层对应的数据集单位相同。
     */
    bufferDistance: null,

    /**
     * APIProperty: queryParameter
     * {String} 属性查询条件。
     */
    attributeFilter: null,

    /**
     * APIProperty: geometry
     * {<Object>} 空间查询条件。
     */
    geometry: null,

    /**
     * APIProperty: fields
     * {Array(String)} 设置查询结果返回字段。
     *                 当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。
     *                 不设置即返回全部字段。
     */
    fields: null,

    /**
     * Constructor: SuperMap.GetFeaturesByBufferParameters
     * 缓冲区查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * bufferDistance - {Number} buffer 距离，单位与所查询图层对应的数据集单位相同。
     * attributeFilter - {String} 属性查询条件
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。
     * geometry - {<Object>} 空间查询条件
     * dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。
     * returnContent - {Boolean} 是否直接返回查询结果。
     * fromIndex - {Integer} 查询结果的最小索引号。
     * toIndex - {Integer} 查询结果的最大索引号。
     */
    initialize: function (options) {
        SuperMap.GetFeaturesParametersBase.prototype.initialize.apply(this, arguments);
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
        SuperMap.GetFeaturesParametersBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.bufferDistance = null;
        me.attributeFilter = null;
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
    },
    CLASS_NAME: "SuperMap.GetFeaturesByBufferParameters"
});
/**
 * 将<SuperMap.GetFeaturesByBufferParameters>对象参数转换为json字符串。
 *
 * Parameters:
 * params - {<SuperMap.GetFeaturesByBufferParameters>} SQL查询参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.GetFeaturesByBufferParameters.toJsonParameters = function (params) {
    var filterParameter,
        paramsBySql,
        geometry;

    geometry = SuperMap.REST.ServerGeometry.fromGeometry(params.geometry);
    paramsBySql = {
        datasetNames: params.datasetNames,
        getFeatureMode: "BUFFER",
        bufferDistance: params.bufferDistance,
        geometry: geometry
    };
    if (params.fields) {
        filterParameter = new FilterParameter();
        filterParameter.name = params.datasetNames;
        filterParameter.fields = params.fields;
        paramsBySql.queryParameter = filterParameter;
    }
    if (params.attributeFilter) {
        paramsBySql.attributeFilter = params.attributeFilter;
        paramsBySql.getFeatureMode = "BUFFER_ATTRIBUTEFILTER";
    }
    return SuperMap.Util.toJSON(paramsBySql);
};
module.exports = SuperMap.GetFeaturesByBufferParameters;