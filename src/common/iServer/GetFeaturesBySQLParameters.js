import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {GetFeaturesParametersBase} from './GetFeaturesParametersBase';
import './FilterParameter';

/**
 * @class SuperMap.GetFeaturesBySQLParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据服务中数据集SQL查询参数类。
 * @param {Object} options - 参数。</br>
 * @param {SuperMap.FilterParameter} options.queryParameter - 查询过滤条件参数。</br>
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。</br>
 * @param {boolean} options.returnContent - 是否直接返回查询结果。</br>
 * @param {number} options.fromIndex - 查询结果的最小索引号。</br>
 * @param {number} options.toIndex - 查询结果的最大索引号。</br>
 * @extends {SuperMap.GetFeaturesParametersBase}
 */
export class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {


    constructor(options) {
        super(options);
        /**
         * @function {string} SuperMap.GetFeaturesBySQLParameters.prototype.getFeatureMode
         * @description 数据集查询模式。
         */
        this.getFeatureMode = "SQL";

        /**
         * @function {SuperMap.FilterParameter} SuperMap.GetFeaturesBySQLParameters.prototype.queryParameter
         * @description 查询过滤条件参数类。
         */
        this.queryParameter = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetFeaturesBySQLParameters";
    }

    /**
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.destroy
     * @override
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
     * @description 将SuperMap.GetFeaturesBySQLParameters对象转换为JSON字符串。
     * @param {SuperMap.GetFeaturesBySQLParameters} params - 数据集SQL查询参数对象。
     * @returns {string} 转化后的JSON字符串。
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
        if (params.aggregations) {
            paramsBySql.aggregations = params.aggregations;
        }
        return Util.toJSON(paramsBySql);
    }

}

SuperMap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;