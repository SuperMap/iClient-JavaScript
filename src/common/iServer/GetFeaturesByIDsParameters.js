import SuperMap from '../SuperMap';
import FilterParameter from './FilterParameter';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';

/**
 * @class SuperMap.GetFeaturesByIDsParameters
 * @classdesc ID 查询参数类。
 * @param options - {Object} 可选参数。如:</br>
 *        IDs - {Array<Integer>} 所要查询指定的元素ID信息。</br>
 *        fields - {Array<String>} 设置查询结果返回字段。默认返回所有字段。</br>
 *        dataSetNames - {Array<String>} 数据集集合中的数据集名称列表。</br>
 *        returnContent - {boolean} 是否直接返回查询结果。</br>
 *        fromIndex - {Integer} 查询结果的最小索引号。</br>
 *        toIndex - {Integer} 查询结果的最大索引号。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export default  class GetFeaturesByIDsParameters extends GetFeaturesParametersBase {
    /**
     * @member SuperMap.GetFeaturesByIDsParameters.prototype.getFeatureMode -{string}
     * @description 数据集查询模式。
     */
    getFeatureMode = "ID";

    /**
     * @member SuperMap.GetFeaturesByIDsParameters.prototype.IDs -{Array<Integer>}
     * @description 所要查询指定的元素ID信息。
     */
    IDs = null;

    /**
     *  @member SuperMap.GetFeaturesByIDsParameters.prototype.fields -{Array<String>}
     *  @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
     */
    fields = null;


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
        me.IDs = null;
        me.getFeatureMode = null;
        if (me.fields) {
            while (me.fields.length > 0) {
                me.fields.pop();
            }
            me.fields = null;
        }
    }

    /**
     * @function SuperMap.GetFeaturesByIDsParameters.toJsonParameters
     * @description 将<SuperMap.GetFeaturesByIDsParameters>对象参数转换为json字符串。
     * @param params - {SuperMap.GetFeaturesByIDsParameters} IDs查询参数。
     * @return {string} 转化后的 json字符串。
     */
    static toJsonParameters(params) {
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
    }

    CLASS_NAME = "SuperMap.GetFeaturesByIDsParameters"
}

SuperMap.GetFeaturesByIDsParameters = GetFeaturesByIDsParameters;