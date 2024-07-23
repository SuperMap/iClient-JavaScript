/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { SpatialQueryMode } from '../REST';
import { FilterParameter } from './FilterParameter';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';
import { ServerGeometry } from './ServerGeometry';

/**
 * @class GetFeaturesByGeometryParameters
 * @deprecatedclass SuperMap.GetFeaturesByGeometryParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集几何查询参数类。此类用于指定进行几何查询的数据集列表，设置查询的几何对象、属性过滤条件、空间查询模式以及一些通用的查询参数。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">推荐设置 returnFeaturesOnly 配置为 true 来提升性能，如果需要获取总数量与数据集信息，FeatureService 提供了 getFeaturesCount 和 getFeaturesDatasetInfo 方法</p>
 * </div>
 * @param {Object} options - 参数。
 * @param {GeoJSONObject} options.geometry - 查询的几何对象。
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。
 * @param {string} [options.attributeFilter] - 几何查询属性过滤条件。
 * @param {Array.<string>} [options.fields] - 查询结果返回字段。默认返回所有字段。
 * @param {SpatialQueryMode} [options.spatialQueryMode=SpatialQueryMode.CONTAIN] - 空间查询模式。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {boolean} [options.returnFeaturesOnly=false] - 是否仅返回要素信息。当 returnContent 为 true 时设置有效。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @param {MetricsAggParameter|GeoHashGridAggParameter} [options.aggregations] - 聚合查询参数。该参数仅支持数据来源为 Elasticsearch 服务的 SuperMap iServer 的 REST 数据服务。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class GetFeaturesByGeometryParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {string} GetFeaturesByGeometryParameters.prototype.getFeatureMode
         * @description 数据集查询模式。几何查询有 "SPATIAL"，"SPATIAL_ATTRIBUTEFILTER" 两种，当用户设置 attributeFilter 时会自动切换到 SPATIAL_ATTRIBUTEFILTER 访问服务。
         */
        this.getFeatureMode = 'SPATIAL';

        /**
         * @member {GeoJSONObject} GetFeaturesByGeometryParameters.prototype.geometry
         * @description 用于查询的几何对象。 </br>
         * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLat}|{@link mapboxgl.Point}|{@link GeoJSONObject}。</br>
         * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。</br>
         * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLatBounds}|{@link GeoJSONObject}。
         */
        this.geometry = null;

        /**
         * @member {Array.<string>} GetFeaturesByGeometryParameters.prototype.fields
         * @description 查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;

        /**
         * @member {string} GetFeaturesByGeometryParameters.prototype.attributeFilter
         *  @description 几何查询属性过滤条件。
         */
        this.attributeFilter = null;

        /**
         * @member {SpatialQueryMode} [GetFeaturesByGeometryParameters.prototype.spatialQueryMode=SpatialQueryMode.CONTAIN]
         * @description 空间查询模式。
         */
        this.spatialQueryMode = SpatialQueryMode.CONTAIN;
        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.GetFeaturesByGeometryParameters';
    }

    /**
     * @function GetFeaturesByGeometryParameters.prototype.destroy
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
     * @function GetFeaturesByGeometryParameters.toJsonParameters
     * @description 将 GetFeaturesByGeometryParameters 对象参数转换为 JSON 字符串。
     * @param {GetFeaturesByGeometryParameters} params - 查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var filterParameter, geometry, parasByGeometry;

        geometry = ServerGeometry.fromGeometry(params.geometry);
        parasByGeometry = {
            datasetNames: params.datasetNames,
            getFeatureMode: 'SPATIAL',
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
            parasByGeometry.getFeatureMode = 'SPATIAL_ATTRIBUTEFILTER';
        }

        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            parasByGeometry.maxFeatures = params.maxFeatures;
        }

        if (typeof params.hasGeometry === 'boolean') {
            parasByGeometry.hasGeometry = params.hasGeometry;
        }

        if (params.targetEpsgCode) {
            parasByGeometry.targetEpsgCode = params.targetEpsgCode;
        }
        if (!params.targetEpsgCode && params.targetPrj) {
            parasByGeometry.targetPrj = params.targetPrj;
        }
        if (params.aggregations) {
            parasByGeometry.aggregations = params.aggregations;
        }

        return Util.toJSON(parasByGeometry);
    }
}

