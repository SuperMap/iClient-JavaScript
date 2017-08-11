import SuperMap from '../SuperMap';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';
import FilterParameter from './FilterParameter';

/**
 * @class SuperMap.GetFeaturesByBufferParameters
 * @classdesc 数据服务中数据集缓冲区查询参数类。
 * @param options - {Object} 可選参数。如:</br>
 *        bufferDistance - {Number} buffer 距离，单位与所查询图层对应的数据集单位相同。</br>
 *        attributeFilter - {String} 属性查询条件。 </br>
 *        fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。</br>
 *        geometry - {Object} 空间查询条件。</br>
 *        dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
 *        returnContent - {Boolean} 是否直接返回查询结果。</br>
 *        fromIndex - {Integer} 查询结果的最小索引号。</br>
 *        toIndex - {Integer} 查询结果的最大索引号。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export default  class GetFeaturesByBufferParameters extends GetFeaturesParametersBase {


    /**
     * @member SuperMap.GetFeaturesByBufferParameters.prototype.bufferDistance - {Number}
     * @description buffer距离,单位与所查询图层对应的数据集单位相同。
     */
    bufferDistance = null;

    /**
     * @member SuperMap.GetFeaturesByBufferParameters.prototype.queryParameter - {String}
     * @description 属性查询条件。
     */
    attributeFilter = null;

    /**
     * @member SuperMap.GetFeaturesByBufferParameters.prototype.geometry - {Object}
     * @description 空间查询条件。
     */
    geometry = null;

    /**
     * @member SuperMap.GetFeaturesByBufferParameters.prototype.fields -{Array(String)}
     * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
     */
    fields = null;

    /*
     * @classdesc 缓冲区查询参数类构造函数。
     * @function SuperMap.GetFeaturesByBufferParameters.prototype.constructor
     * @param options - {Object} 可選参数。如:</br>
     *        bufferDistance - {Number} buffer 距离，单位与所查询图层对应的数据集单位相同。</br>
     *        attributeFilter - {String} 属性查询条件。 </br>
     *        fields - {Array(String)} 设置查询结果返回字段。默认返回所有字段。</br>
     *        geometry - {Object} 空间查询条件。</br>
     *        dataSetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
     *        returnContent - {Boolean} 是否直接返回查询结果。</br>
     *        fromIndex - {Integer} 查询结果的最小索引号。</br>
     *        toIndex - {Integer} 查询结果的最大索引号。</br>
     */
    constructor(options) {
        super(options);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @inheritDoc
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
     * @function SuperMap.GetFeaturesByBufferParameters.prototype.toJsonParameters
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