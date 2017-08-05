import SuperMap from '../SuperMap';
import FilterParameter from './FilterParameter';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';

/**
 * @class SuperMap.GetFeaturesBySQLParameters
 * @constructs SuperMap.GetFeaturesBySQLParameters
 * @classdesc
 * 数据服务中数据集SQL查询参数类。
 * @extends {SuperMap.GetFeaturesParametersBase}
 * @api
 */
export default  class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {


    /**
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     */
    getFeatureMode = "SQL";
    /**
     * APIProperty: queryParameter
     * {SuperMap.FilterParameter} 查询过滤条件参数类。
     */
    queryParameter = null;

    /**
     * @method SuperMap.GetFeaturesBySQLParameters.initialize
     * @description  SQL 查询参数类构造函数。
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * queryParameter - {SuperMap.FilterParameter} 查询过滤条件参数。</br>
     * datasetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
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
        me.getFeatureMode = null;
        if (me.queryParameter) {
            me.queryParameter.destroy();
            me.queryParameter = null;
        }
    }

    /**
     * @method SuperMap.GetFeaturesBySQLParameters.toJsonParameters
     * @description  将<SuperMap.GetFeaturesBySQLParameters>对象参数转换为json字符串。
     * @param params - {SuperMap.GetFeaturesBySQLParameters} SQL查询参数。
     * @return {String} 转化后的 json字符串。
     */
    static toJsonParameters(params) {
        var paramsBySql = {
            datasetNames: params.datasetNames,
            getFeatureMode: "SQL",
            queryParameter: params.queryParameter
        };
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsBySql.maxFeatures = params.maxFeatures;
        }
        return SuperMap.Util.toJSON(paramsBySql);
    }

    CLASS_NAME = "SuperMap.GetFeaturesBySQLParameters"
}

SuperMap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;