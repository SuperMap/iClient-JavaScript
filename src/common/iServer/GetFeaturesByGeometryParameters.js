import SuperMap from '../SuperMap';
import {SpatialQueryMode} from '../REST';
import FilterParameter from './FilterParameter';
import GetFeaturesParametersBase from './GetFeaturesParametersBase';
/**
 * @class SuperMap.GetFeaturesByGeometryParameters
 * @classdesc 数据集几何查询参数类。该类用于设置数据集几何查询的相关参数。
 * @param options - {Object} 可選参数。如:</br>
 *        geometry - {Object} 用于查询的几何对象。</br>
 *        attributeFilter - {string} 几何查询属性过滤条件。</br>
 *        fields - {Array<string>} 设置查询结果返回字段。默认返回所有字段。</br>
 *        spatialQueryMode - {SuperMap.SpatialQueryMode} 空间查询模式常量,必设参数。</br>
 *        queryParameter - {SuperMap.FilterParameter} 查询过滤条件参数。</br>
 *        datasetNames - {Array<string>} 数据集集合中的数据集名称列表。</br>
 *        returnContent - {boolean} 是否直接返回查询结果。</br>
 *        fromIndex - {Integer} 查询结果的最小索引号。</br>
 *        toIndex - {Integer} 查询结果的最大索引号。</br>
 * @extends SuperMap.GetFeaturesParametersBase
 */
export default  class GetFeaturesByGeometryParameters extends GetFeaturesParametersBase {


    /**
     * @member SuperMap.GetFeaturesByGeometryParameters.prototype.getFeatureMode
     * @description 数据集查询模式。
     * 几何查询有"SPATIAL"，"SPATIAL_ATTRIBUTEFILTER"两种,当用户设置attributeFilter时会自动切换到SPATIAL_ATTRIBUTEFILTER访问服务。
     */
    getFeatureMode = "SPATIAL";

    /**
     * @member SuperMap.GetFeaturesByGeometryParameters.prototype.geometry {Object}
     * @description 用于查询的几何对象。
     */
    geometry = null;

    /**
     * @member SuperMap.GetFeaturesByGeometryParameters.prototype.fields {Array<string>}
     * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
     */
    fields = null;

    /**
     * @member SuperMap.GetFeaturesByGeometryParameters.prototype.attributeFilter -{string}
     *  @description 几何查询属性过滤条件。
     */
    attributeFilter = null;

    /**
     * @member SuperMap.GetFeaturesByGeometryParameters.prototype.spatialQueryMode -{SuperMap.SpatialQueryMode}
     * @description 空间查询模式常量，必设参数，默认为CONTAIN。
     */
    spatialQueryMode = SpatialQueryMode.CONTAIN;

    constructor(options) {
        super(options);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    }


    /**
     * @function SuperMap.BuildCacheJobsService.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
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
    }

    /**
     * @function SuperMap.GetFeaturesByGeometryParameters.toJsonParameters
     * @description 将<SuperMap.GetFeaturesByGeometryParameters>对象参数转换为json字符串。
     * @param params - {SuperMap.GetFeaturesByGeometryParameters} 几何查询参数。
     * @return {string} 转化后的 json字符串。
     */
    static toJsonParameters(params) {
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
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            parasByGeometry.maxFeatures = params.maxFeatures;
        }

        return SuperMap.Util.toJSON(parasByGeometry);
    }

    CLASS_NAME = "SuperMap.GetFeaturesByGeometryParameters"
}

SuperMap.GetFeaturesByGeometryParameters = GetFeaturesByGeometryParameters;