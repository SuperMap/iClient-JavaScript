/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: GetFeaturesByIDsParameters
 * ID 查询参数类。
 *
 * Inherits from:
 *  - <GetFeaturesParametersBase>
 */
require('./GetFeaturesParametersBase');
GetFeaturesByIDsParameters = SuperMap.Class(GetFeaturesParametersBase, {

    /**
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     */
    getFeatureMode: "ID",

    /**
     * APIProperty: IDs
     * {Array(Integer)} 所要查询指定的元素ID信息。
     */
    IDs: null,

    /**
     * APIProperty: fields
     * {Array(String)} 设置查询结果返回字段。
     *                 当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。
     *                 不设置即返回全部字段。
     */
    fields: null,

    /**
     * Constructor: GetFeaturesBySQLParameters
     * SQL 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * IDs - {Array(Integer)} 所要查询指定的元素ID信息。
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。
     * dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。
     * returnContent - {Boolean} 是否直接返回查询结果。
     * fromIndex - {Integer} 查询结果的最小索引号。
     * toIndex - {Integer} 查询结果的最大索引号。
     */
    initialize: function (options) {
        GetFeaturesParametersBase.prototype.initialize.apply(this, arguments);
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
        var me = this;
        GetFeaturesParametersBase.prototype.destroy.apply(me, arguments);
        me.IDs = null;
        me.getFeatureMode = null;
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
    },
    CLASS_NAME: "GetFeaturesByIDsParameters"
});

/**
 * Function: GetFeaturesByIDsParameters.toJsonParameters
 * 将<GetFeaturesByIDsParameters>对象参数转换为json字符串。
 *
 * Parameters:
 * params - {<GetFeaturesByIDsParameters>} IDs查询参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
GetFeaturesByIDsParameters.toJsonParameters = function (params) {
    var parasByIDs, filterParameter;

    parasByIDs = {
        datasetNames: params.datasetNames,
        getFeatureMode: "ID",
        ids: params.IDs
    };
    if (params.fields) {
        filterParameter = new FilterParameter();
        filterParameter.name = params.datasetNames;
        filterParameter.fields = params.fields;
        parasByIDs.queryParameter = filterParameter;
    }
    return SuperMap.Util.toJSON(parasByIDs);
};
module.exports = function (options) {
    return new GetFeaturesByIDsParameters(options);
};