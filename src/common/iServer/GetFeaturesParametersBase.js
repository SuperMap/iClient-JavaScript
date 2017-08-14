import SuperMap from '../SuperMap';
/**
 * @class SuperMap.GetFeaturesParametersBase
 * @classdesc 要素查询参数基类
 * @param options - {Object} 参数。如：<br>
 *        datasetNames - {Array(String)} 数据集集合中的数据集名称列表。</br>
 *        returnContent - {SuperMap.FilterParameter} 是否直接返回查询结果。</br>
 *        fromIndex - {Integer} 查询结果的最小索引号。</br>
 *        toIndex - {Integer} 查询结果的最大索引号。</br>
 */
export default  class GetFeaturesParametersBase {

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.datasetName -{Array(String)}
     * @description 数据集集合中的数据集名称列表。
     */
    datasetNames = null;

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.returnContent -{Boolean}
     * @description 是否立即返回新创建资源的表述还是返回新资源的URI。
     *              如果为 true，则直接返回新创建资源，即查询结果的表述。
     *              如果为 false，则返回的是查询结果资源的 URI。默认为 true。
     */
    returnContent = true;

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.fromIndex -{Integer}
     * @description 查询结果的最小索引号。默认值是0，如果该值大于查询结果的最大索引号，则查询结果为空。
     */
    fromIndex = 0;

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.toIndex -{Integer}
     * @description 查询结果的最大索引号。默认值是19，如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
     */
    toIndex = 19;

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.returnCountOnly -{Boolean}
     * @description 只返回查询结果的总数，默认为false。
     */
    returnCountOnly = false;

    /**
     * @member SuperMap.GetFeaturesParametersBase.prototype.maxFeatures -{Integer}
     * @description 进行SQL查询时，用于设置服务端返回查询结果条目数量，默认为1000。
     */
    maxFeatures = null;

    constructor(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }

    /**
     *
     * @function SuperMap.GetFeaturesParametersBase.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
    }


    CLASS_NAME = "SuperMap.GetFeaturesParametersBase"
}

SuperMap.GetFeaturesParametersBase = GetFeaturesParametersBase;