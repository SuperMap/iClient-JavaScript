/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { SpatialQueryMode } from '../REST';
import { FilterParameter } from './FilterParameter';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';

/**
 * @class GetFeaturesByBoundsParameters
 * @deprecatedclass SuperMap.GetFeaturesByBoundsParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集范围查询参数类，该类用于设置数据集范围查询的相关参数。
 * @param {Object} options - 参数。
 * @param {(Bounds|L.Bounds|ol.extent)} options.bounds - 用于查询的范围对象。
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。
 * @param {string} [options.attributeFilter] - 范围查询属性过滤条件。
 * @param {Array.<string>} [options.fields] - 设置查询结果返回字段。默认返回所有字段。
 * @param {SpatialQueryMode} [options.spatialQueryMode=SpatialQueryMode.CONTAIN] - 空间查询模式常量。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。 如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @param {MetricsAggParameter|GeoHashGridAggParameter} [options.aggregations] - 聚合查询参数。该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */

export class GetFeaturesByBoundsParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {string} GetFeaturesByBoundsParameters.prototype.getFeatureMode
         * @description 数据集查询模式。范围查询有 "BOUNDS"，"BOUNDS_ATTRIBUTEFILTER" 两种，当用户设置 attributeFilter 时会自动切换到 BOUNDS_ATTRIBUTEFILTER 访问服务。
         */
        this.getFeatureMode = GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS;

        /**
         * @member {(Bounds|L.Bounds|ol.extent)} GetFeaturesByBoundsParameters.prototype.bounds
         * @description 用于查询的范围对象。
         *
         */
        this.bounds = null;

        /**
         * @member {Array.<string>} GetFeaturesByBoundsParameters.prototype.fields
         * @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;

        /**
         * @member {string} GetFeaturesByBoundsParameters.prototype.attributeFilter
         * @description 范围查询属性过滤条件。
         */
        this.attributeFilter = null;

        /**
         * @member {SpatialQueryMode} [GetFeaturesByBoundsParameters.prototype.spatialQueryMode=SpatialQueryMode.CONTAIN]
         * @description 空间查询模式常量。
         */
        this.spatialQueryMode = SpatialQueryMode.CONTAIN;

        Util.extend(this, options);
        this.CLASS_NAME = 'SuperMap.GetFeaturesByBoundsParameters';
    }

    /**
     * @function GetFeaturesByBoundsParameters.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
        var me = this;
        if (me.bounds) {
            me.bounds.destroy();
            me.bounds = null;
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
     * @function GetFeaturesByBoundsParameters.toJsonParameters
     * @description 将 {@link GetFeaturesByBoundsParameters} 对象参数转换为 JSON 字符串。
     * @param {GetFeaturesByBoundsParameters} params - 范围查询参数。
     * @returns {string} 转化后的 JSON 字符串。
     *
     */
    static toJsonParameters(params) {
        var filterParameter, bounds, parasByBounds;

        bounds = {
            leftBottom: { x: params.bounds.left, y: params.bounds.bottom },
            rightTop: { x: params.bounds.right, y: params.bounds.top }
        };
        parasByBounds = {
            datasetNames: params.datasetNames,
            getFeatureMode: GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS,
            bounds: bounds,
            spatialQueryMode: params.spatialQueryMode
        };
        if (params.fields) {
            filterParameter = new FilterParameter();
            filterParameter.name = params.datasetNames;
            filterParameter.fields = params.fields;
            parasByBounds.queryParameter = filterParameter;
        }
        if (params.attributeFilter) {
            parasByBounds.attributeFilter = params.attributeFilter;
            parasByBounds.getFeatureMode = GetFeaturesByBoundsParameters.getFeatureMode.BOUNDS_ATTRIBUTEFILTER;
        }
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            parasByBounds.maxFeatures = params.maxFeatures;
        }

        if (typeof params.hasGeometry === 'boolean') {
          parasByBounds.hasGeometry = params.hasGeometry;
        }

        if (params.targetEpsgCode) {
            parasByBounds.targetEpsgCode = params.targetEpsgCode;
        }
        if (!params.targetEpsgCode && params.targetPrj) {
            parasByBounds.targetPrj = params.targetPrj;
        }
        if (params.aggregations) {
            parasByBounds.aggregations = params.aggregations;
        }

        return Util.toJSON(parasByBounds);
    }
}

GetFeaturesByBoundsParameters.getFeatureMode = {
    BOUNDS: 'BOUNDS',
    BOUNDS_ATTRIBUTEFILTER: 'BOUNDS_ATTRIBUTEFILTER'
};

