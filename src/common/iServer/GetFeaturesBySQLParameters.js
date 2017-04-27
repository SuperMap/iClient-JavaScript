/**
 * Class: SuperMap.GetFeaturesBySQLParameters
 * 数据服务中数据集SQL查询参数类。
 *
 * Inherits from:
 *  - <SuperMap.GetFeaturesParametersBase>
 */
require('./FilterParameter');
require('./GetFeaturesParametersBase');
var SuperMap = require('../SuperMap');
SuperMap.GetFeaturesBySQLParameters = SuperMap.Class(SuperMap.GetFeaturesParametersBase, {
    /**
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     */
    getFeatureMode: "SQL",
    /**
     * APIProperty: queryParameter
     * {<SuperMap.FilterParameter>} 查询过滤条件参数类。
     */
    queryParameter: null,

    /**
     * Constructor: SuperMap.GetFeaturesBySQLParameters
     * SQL 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * queryParameter - {<SuperMap.FilterParameter>} 查询过滤条件参数。
     * datasetNames - {Array(String)} 数据集集合中的数据集名称列表。
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
        me.getFeatureMode = null;
        if (me.queryParameter) {
            me.queryParameter.destroy();
            me.queryParameter = null;
        }
    },

    CLASS_NAME: "SuperMap.GetFeaturesBySQLParameters"
});
/**
 * Function: SuperMap.GetFeaturesBySQLParameters.toJsonParameters
 * 将<SuperMap.GetFeaturesBySQLParameters>对象参数转换为json字符串。
 *
 * Parameters:
 * params - {<SuperMap.GetFeaturesBySQLParameters>} SQL查询参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.GetFeaturesBySQLParameters.toJsonParameters = function (params) {
    var paramsBySql = {
        datasetNames: params.datasetNames,
        getFeatureMode: "SQL",
        queryParameter: params.queryParameter
    };
    return SuperMap.Util.toJSON(paramsBySql);
};
module.exports = SuperMap.GetFeaturesBySQLParameters;