import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {SpatialQueryMode} from '../REST';
import {FilterParameter} from './FilterParameter';
import {GetFeaturesParametersBase} from './GetFeaturesParametersBase';
import {ServerGeometry} from './ServerGeometry';

/**
 * @class SuperMap.GetFeaturesByGeometryParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集几何查询参数类。该类用于设置数据集几何查询的相关参数。
 * @param {Object} options - 参数。  
 * @param {Object} options.geometry - 用于查询的几何对象。  
 *                                    点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。  
 *                                    线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。  
 *                                    面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON。  
 * @param {string} [options.attributeFilter] - 几何查询属性过滤条件。  
 * @param {Array.<string>} [options.fields] - 设置查询结果返回字段。默认返回所有字段。  
 * @param {SuperMap.SpatialQueryMode} [options.spatialQueryMode=SuperMap.SpatialQueryMode.CONTAIN] - 空间查询模式常量。  
 * @param {SuperMap.FilterParameter} [options.queryParameter] - 查询过滤条件参数。  
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。  
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。  
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。  
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。  
 * @extends {SuperMap.GetFeaturesParametersBase}
 */
export class GetFeaturesByGeometryParameters extends GetFeaturesParametersBase {


    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.GetFeaturesByGeometryParameters.prototype.getFeatureMode
         * @description 数据集查询模式。几何查询有"SPATIAL"，"SPATIAL_ATTRIBUTEFILTER"两种，当用户设置attributeFilter时会自动切换到SPATIAL_ATTRIBUTEFILTER访问服务。
         */
        this.getFeatureMode = "SPATIAL";

        /**
         * @member {Object} SuperMap.GetFeaturesByGeometryParameters.prototype.geometry
         * @description 用于查询的几何对象。 
         * 点类型可以是：SuperMap.Geometry.Point|L.Point|L.GeoJSON|ol.geom.Point|ol.format.GeoJSON。 
         * 线类型可以是：SuperMap.Geometry.LineString|SuperMap.Geometry.LinearRing|L.Polyline|L.GeoJSON|ol.geom.LineString|ol.format.GeoJSON。</br>
         * 面类型可以是：SuperMap.Geometry.Polygon|L.Polygon|L.GeoJSON|ol.geom.Polygon|ol.format.GeoJSON
         */
        this.geometry = null;

        /**
         * @member {Array.<string>} SuperMap.GetFeaturesByGeometryParameters.prototype.fields
         * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;

        /**
         * @member {string} SuperMap.GetFeaturesByGeometryParameters.prototype.attributeFilter
         *  @description 几何查询属性过滤条件。
         */
        this.attributeFilter = null;

        /**
         * @member {SuperMap.SpatialQueryMode} [SuperMap.GetFeaturesByGeometryParameters.prototype.spatialQueryMode=SuperMap.SpatialQueryMode.CONTAIN]
         * @description 空间查询模式常量。
         */
        this.spatialQueryMode = SpatialQueryMode.CONTAIN;
        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetFeaturesByGeometryParameters";
    }


    /**
     * @function SuperMap.GetFeaturesByGeometryParameters.prototype.destroy
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
     * @description 将 SuperMap.GetFeaturesByGeometryParameters 对象参数转换为 JSON 字符串。
     * @param {SuperMap.GetFeaturesByGeometryParameters} params - 何查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var filterParameter,
            geometry,
            parasByGeometry;

        geometry = ServerGeometry.fromGeometry(params.geometry);
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

        return Util.toJSON(parasByGeometry);
    }

}

SuperMap.GetFeaturesByGeometryParameters = GetFeaturesByGeometryParameters;