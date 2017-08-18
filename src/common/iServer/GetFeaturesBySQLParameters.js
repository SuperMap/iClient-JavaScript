import SuperMap from '../SuperMap';
import FilterParameter from './FilterParameter';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';

/**
 * @class SuperMap.GetFeaturesBySQLParameters
 * @classdesc 数据服务中数据集SQL查询参数类。
 * @param options - {Object} 可選参数。如:</br>
 *        queryParameter - {SuperMap.FilterParameter} 查询过滤条件参数。</br>
 *         datasetNames - {Array<string>} 数据集集合中的数据集名称列表。</br>
 *         returnContent - {boolean} 是否直接返回查询结果。</br>
 *         fromIndex - {Integer} 查询结果的最小索引号。</br>
 *         toIndex - {Integer} 查询结果的最大索引号。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export default  class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {

    /**
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.getFeatureMode -{string}
     * @description 数据集查询模式。
     */
    getFeatureMode = "SQL";

    /**
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.queryParameter -{SuperMap.FilterParameter}
     * @description 查询过滤条件参数类。
     */
    queryParameter = null;


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
        me.getFeatureMode = null;
        if (me.queryParameter) {
            me.queryParameter.destroy();
            me.queryParameter = null;
        }
    }

    /**
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.toJsonParameters
     * @description  将<SuperMap.GetFeaturesBySQLParameters>对象参数转换为json字符串。
     * @param params - {SuperMap.GetFeaturesBySQLParameters} SQL查询参数。
     * @return {string} 转化后的 json字符串。
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