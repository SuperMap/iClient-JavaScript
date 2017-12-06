import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {FilterParameter} from './FilterParameter';
import {GetFeaturesParametersBase} from './GetFeaturesParametersBase';

/**
 * @class SuperMap.GetFeaturesByIDsParameters
 * @classdesc ID查询参数类。
 * @param options - {Object} 可选参数。如:</br>
 *        IDs - {Array<integer>} 所要查询指定的元素ID信息。</br>
 *        fields - {Array<string>} 设置查询结果返回字段。默认返回所有字段。</br>
 *        dataSetNames - {Array<string>} 数据集集合中的数据集名称列表。</br>
 *        returnContent - {boolean} 是否直接返回查询结果。</br>
 *        fromIndex - {integer} 查询结果的最小索引号。</br>
 *        toIndex - {integer} 查询结果的最大索引号。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export class GetFeaturesByIDsParameters extends GetFeaturesParametersBase {
    /**
     * @member SuperMap.GetFeaturesByIDsParameters.prototype.getFeatureMode - {string}
     * @description 数据集查询模式。
     */
    getFeatureMode = "ID";

    /**
     * @member SuperMap.GetFeaturesByIDsParameters.prototype.IDs - {Array<integer>}
     * @description 所要查询指定的元素ID信息。
     */
    IDs = null;

    /**
     *  @member SuperMap.GetFeaturesByIDsParameters.prototype.fields - {Array<string>}
     *  @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
     */
    fields = null;


    constructor(options) {
        super(options);
        if (!options) {
            return;
        }
        Util.extend(this, options);
    }


    /**
     * @function SuperMap.GetFeaturesByIDsParameters.prototype.destroy
     * @override
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
     * @description 将SuperMap.GetFeaturesByIDsParameters对象转换为JSON字符串。
     * @param params - {SuperMap.GetFeaturesByIDsParameters} ID查询参数对象。
     * @return {string} 转化后的JSON字符串。
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
        return Util.toJSON(parasByIDs);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByIDsParameters"
}

SuperMap.GetFeaturesByIDsParameters = GetFeaturesByIDsParameters;