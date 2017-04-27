/**
 * Class: SuperMap.GetFeaturesByGeometryParameters
 * 数据集几何查询参数类。
 * 该类用于设置数据集几何查询的相关参数。
 *
 * Inherits from:
 *  - <SuperMap.GetFeaturesParametersBase>
 */
require('../REST');
require('./GetFeaturesParametersBase');
var SuperMap = require('../SuperMap');
var FilterParameter = require('./FilterParameter');
SuperMap.GetFeaturesByGeometryParameters = SuperMap.Class(SuperMap.GetFeaturesParametersBase, {

    /**
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     * 几何查询有"SPATIAL"，"SPATIAL_ATTRIBUTEFILTER"两种,当用户设置attributeFilter时会自动切换到SPATIAL_ATTRIBUTEFILTER访问服务。
     */
    getFeatureMode: "SPATIAL",

    /**
     * APIProperty: geometry
     * {<Object>} 用于查询的几何对象。
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
     * APIProperty: attributeFilter
     * {String} 几何查询属性过滤条件。
     */
    attributeFilter: null,

    /**
     * APIProperty: spatialQueryMode
     * {<SuperMap.SpatialQueryMode>} 空间查询模式常量，必设参数，默认为CONTAIN。
     */
    spatialQueryMode: SuperMap.SpatialQueryMode.CONTAIN,

    /**
     * Constructor: SuperMap.SuperMap.GetFeaturesByGeometryParameters
     * 几何空间查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * geometry - {<Object>} 用于查询的几何对象。
     * attributeFilter - {String} 几何查询属性过滤条件。
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。
     * spatialQueryMode - {<SuperMap.SpatialQueryMode>} 空间查询模式常量,必设参数。
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
        var me = this;
        SuperMap.GetFeaturesParametersBase.prototype.destroy.apply(me, arguments);
        if (me.geometry) {
            me.geometry.destroy();
            me.geometry = null;
        }
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
        me.attributeFilter = null;
        me.spatialQueryMode = null;
        me.getFeatureMode = null;
    },
    CLASS_NAME: "SuperMap.GetFeaturesByGeometryParameters"
});

/**
 * Function: SuperMap.GetFeaturesByGeometryParameters.toJsonParameters
 * 将<SuperMap.GetFeaturesByGeometryParameters>对象参数转换为json字符串。
 *
 * Parameters:
 * params - {<SuperMap.GetFeaturesByGeometryParameters>} 几何查询参数。
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
SuperMap.GetFeaturesByGeometryParameters.toJsonParameters = function (params) {
    var filterParameter,
        geometry,
        parasByGeometry;

    geometry = SuperMap.REST.ServerGeometry.fromGeometry(params.geometry);
    parasByGeometry = {
        datasetNames: params.datasetNames,
        getFeatureMode: "SPATIAL",
        geometry: geometry,
        spatialQueryMode: params.spatialQueryMode
    };
    if (params.fields) {
        filterParameter = new FilterParameter();
        filterParameter.name = params.datasetNames;
        filterParameter.fields = params.fields;
        parasByGeometry.queryParameter = filterParameter;
    }
    if (params.attributeFilter) {
        parasByGeometry.attributeFilter = params.attributeFilter;
        parasByGeometry.getFeatureMode = "SPATIAL_ATTRIBUTEFILTER";
    }

    return SuperMap.Util.toJSON(parasByGeometry);
};
module.exports = SuperMap.GetFeaturesByGeometryParameters;