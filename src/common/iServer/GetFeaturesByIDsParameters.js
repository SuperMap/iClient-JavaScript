require('./GetFeaturesParametersBase');
var SuperMap = require('../SuperMap');
var FilterParameter = require('./FilterParameter');
SuperMap.GetFeaturesByIDsParameters = SuperMap.Class(SuperMap.GetFeaturesParametersBase, {
    /**
     * @class SuperMap.GetFeaturesByIDsParameters
     * @constructs SuperMap.GetFeaturesByIDsParameters
     * @classdesc
     * ID 查询参数类。
     * @extends {SuperMap.GetFeaturesParametersBase}
     * @api
     */
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
     * @method SuperMap.GetFeaturesBySQLParameters.initialize
     * @description SQL 查询参数类构造函数。
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * IDs - {Array(Integer)} 所要查询指定的元素ID信息。</br>
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。</br>
     * dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
     * returnContent - {Boolean} 是否直接返回查询结果。</br>
     * fromIndex - {Integer} 查询结果的最小索引号。</br>
     * toIndex - {Integer} 查询结果的最大索引号。</br>
     */
    initialize: function (options) {
        SuperMap.GetFeaturesParametersBase.prototype.initialize.apply(this, arguments);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        SuperMap.GetFeaturesParametersBase.prototype.destroy.apply(me, arguments);
        me.IDs = null;
        me.getFeatureMode = null;
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
    },
    CLASS_NAME: "SuperMap.GetFeaturesByIDsParameters"
});

/**
 * @method SuperMap.GetFeaturesByIDsParameters.toJsonParameters
 * @description 将<SuperMap.GetFeaturesByIDsParameters>对象参数转换为json字符串。
 * @param params - {SuperMap.GetFeaturesByIDsParameters} IDs查询参数。
 * @return {String} 转化后的 json字符串。
 */
SuperMap.GetFeaturesByIDsParameters.toJsonParameters = function (params) {
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
module.exports = SuperMap.GetFeaturesByIDsParameters;