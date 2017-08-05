import SuperMap from '../SuperMap';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';
import FilterParameter from './FilterParameter';

/**
 * @class SuperMap.GetFeaturesByBufferParameters
 * @constructs SuperMap.GetFeaturesByBufferParameters
 * @classdesc
 * 数据服务中数据集缓冲区查询参数类。
 * @extends {SuperMap.GetFeaturesParametersBase}
 * @api
 */
export default  class GetFeaturesByBufferParameters extends GetFeaturesParametersBase {


    /**
     * APIProperty: bufferDistance
     * {Number} buffer距离,单位与所查询图层对应的数据集单位相同。
     */
    bufferDistance = null;

    /**
     * APIProperty: queryParameter
     * {String} 属性查询条件。
     */
    attributeFilter = null;

    /**
     * APIProperty: geometry
     * {Object} 空间查询条件。
     */
    geometry = null;

    /**
     * APIProperty: fields
     * {Array(String)} 设置查询结果返回字段。
     *                 当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。
     *                 不设置即返回全部字段。
     */
    fields = null;

    /**
     * @constructor: SuperMap.GetFeaturesByBufferParameters
     * @classdesc 缓冲区查询参数类构造函数。
     * @method SuperMap.GetFeaturesByBufferParameters.initialize
     * @param options - {Object} 参数。
     *
     * Allowed options properties:
     * bufferDistance - {Number} buffer 距离，单位与所查询图层对应的数据集单位相同。</br>
     * attributeFilter - {String} 属性查询条件。 </br>
     * fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。</br>
     * geometry - {Object} 空间查询条件。</br>
     * dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
     * returnContent - {Boolean} 是否直接返回查询结果。</br>
     * fromIndex - {Integer} 查询结果的最小索引号。</br>
     * toIndex - {Integer} 查询结果的最大索引号。</br>
     */
    constructor(options) {
        super(options);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /*
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
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
    }

    /**
     * @method SuperMap.GetFeaturesByBufferParameters.toJsonParameters
     * @description 对象参数转换为json字符串。
     * @param params -{SuperMap.GetFeaturesByBufferParameters} SQL查询参数。
     * @return {String} 转化后的 json字符串。
     */
    static toJsonParameters(params) {
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
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsBySql.maxFeatures = params.maxFeatures;
        }
        return SuperMap.Util.toJSON(paramsBySql);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByBufferParameters"
}

SuperMap.GetFeaturesByBufferParameters = GetFeaturesByBufferParameters;