/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';
import { FilterParameter } from './FilterParameter';
import { ServerGeometry } from './ServerGeometry';

/**
 * @class GetFeaturesByBufferParameters
 * @deprecatedclass SuperMap.GetFeaturesByBufferParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集缓冲区查询参数类。此类用于指定进行缓冲区查询的数据集列表，设置缓冲距离、空间查询条件、属性查询条件以及一些通用的查询参数。
 * * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">推荐设置 returnFeaturesOnly 配置为 true 来提升性能，如果需要获取总数量与数据集信息，FeatureService 提供了 getFeaturesCount 和 getFeaturesDatasetInfo 方法</p>
 * </div>
 * @param {Object} options - 参数。
 * @param {number} options.bufferDistance - 缓冲距离，单位与所查询图层对应的数据集单位相同。
 * @param {GeoJSONObject} options.geometry - 空间查询条件。
 * @param {Array.<string>} options.dataSetNames - 数据集集合中的数据集名称列表。
 * @param {Array.<string>} [options.fields] - 查询结果返回字段。默认返回所有字段。
 * @param {string} [options.attributeFilter] - 属性查询条件。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {boolean} [options.returnFeaturesOnly=false] - 是否仅返回要素信息。当 returnContent 为 true 时设置有效。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class GetFeaturesByBufferParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {number} GetFeaturesByBufferParameters.prototype.bufferDistance
         * @description 缓冲距离，单位与所查询图层对应的数据集单位相同。
         */
        this.bufferDistance = null;

        /**
         * @member {string} GetFeaturesByBufferParameters.prototype.attributeFilter
         * @description 属性查询条件。
         */
        this.attributeFilter = null;

        /**
         * @member {GeoJSONObject} GetFeaturesByBufferParameters.prototype.geometry
         * @description 空间查询条件。<br>
         * 点类型可以是：{@link GeometryPoint}|{@link L.Marker}|{@link L.CircleMarker}|{@link L.Circle}|{@link L.GeoJSON}|{@link ol.geom.Point}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLat}|{@link mapboxgl.Point}|{@link GeoJSONObject}。</br>
         * 线类型可以是：{@link GeometryLineString}|{@link GeometryLinearRing}|{@link L.Polyline}|{@link L.GeoJSON}|{@link ol.geom.LineString}|{@link ol.format.GeoJSON}|{@link GeoJSONObject}。</br>
         * 面类型可以是：{@link GeometryPolygon}|{@link L.Polygon}|{@link L.GeoJSON}|{@link ol.geom.Polygon}|{@link ol.format.GeoJSON}|{@link mapboxgl.LngLatBounds}|{@link GeoJSONObject}。
         */
        this.geometry = null;

        /**
         * @member {Array.<string>} GetFeaturesByBufferParameters.prototype.fields
         * @description 查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;
        Util.extend(this, options);
        this.CLASS_NAME = 'SuperMap.GetFeaturesByBufferParameters';
    }

    /**
     * @function GetFeaturesByBufferParameters.prototype.destroy
     * @override
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
     * @function GetFeaturesByBufferParameters.toJsonParameters
     * @description 将 GetFeaturesByBufferParameters 对象转换为 JSON 字符串。
     * @param {GetFeaturesByBufferParameters} params - 数据集缓冲区查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var filterParameter, paramsByBuffer, geometry;
        geometry = ServerGeometry.fromGeometry(params.geometry);
        paramsByBuffer = {
            datasetNames: params.datasetNames,
            getFeatureMode: 'BUFFER',
            bufferDistance: params.bufferDistance,
            geometry: geometry
        };
        if (params.fields) {
            filterParameter = new FilterParameter();
            filterParameter.name = params.datasetNames;
            filterParameter.fields = params.fields;
            paramsByBuffer.queryParameter = filterParameter;
        }
        if (params.attributeFilter) {
            paramsByBuffer.attributeFilter = params.attributeFilter;
            paramsByBuffer.getFeatureMode = 'BUFFER_ATTRIBUTEFILTER';
        }
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsByBuffer.maxFeatures = params.maxFeatures;
        }

        if (typeof params.hasGeometry === 'boolean') {
            paramsByBuffer.hasGeometry = params.hasGeometry;
        }

        if (params.targetEpsgCode) {
            paramsByBuffer.targetEpsgCode = params.targetEpsgCode;
        }
        if (!params.targetEpsgCode && params.targetPrj) {
            paramsByBuffer.targetPrj = params.targetPrj;
        }
        return Util.toJSON(paramsByBuffer);
    }
}

