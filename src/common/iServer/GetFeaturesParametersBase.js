/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class GetFeaturesParametersBase
 * @deprecatedclass SuperMap.GetFeaturesParametersBase
 * @category  iServer Data FeatureResults
 * @classdesc 要素查询参数基类。
 * @param {Object} options - 参数。
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。 如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @param {MetricsAggParameter|GeoHashGridAggParameter} [options.aggregations] - 聚合查询参数。该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @usage
 */
export class GetFeaturesParametersBase {
    constructor(options) {
        /**
         * @member {Array.<string>} GetFeaturesParametersBase.prototype.datasetName
         * @description 数据集集合中的数据集名称列表。
         */
        this.datasetNames = null;

        /**
         * @member {string} GetFeaturesParametersBase.prototype.targetEpsgCode
         * @description 动态投影的目标坐标系对应的 EPSG Code，使用时需设置 returnContent 参数为 true。
         */
        this.targetEpsgCode = null;

        /**
         * @member {Object} GetFeaturesParametersBase.prototype.targetEpsgCode
         * @description 动态投影的目标坐标系。使用时需设置 returnContent 参数为 true。 如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
         */
        this.targetPrj = null;

        /**
         * @member {boolean} [GetFeaturesParametersBase.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *              如果为 true，则直接返回新创建资源，即查询结果的表述。
         *              如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;

        /**
         * @member {number} [GetFeaturesParametersBase.prototype.fromIndex=0]
         * @description 查询结果的最小索引号。如果该值大于查询结果的最大索引号，则查询结果为空。
         */
        this.fromIndex = 0;

        /**
         * @member {number} [GetFeaturesParametersBase.prototype.toIndex=19]
         * @description 查询结果的最大索引号。如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
         */
        this.toIndex = 19;

        /**
         * @member {boolean} [GetFeaturesParametersBase.prototype.returnCountOnly=false]
         * @description 只返回查询结果的总数。
         */
        this.returnCountOnly = false;

        /**
         * @member {number} [GetFeaturesParametersBase.prototype.maxFeatures=1000]
         * @description 进行 SQL 查询时，用于设置服务端返回查询结果条目数量。
         */
        this.maxFeatures = null;

        /**
         * @member {number} [GetFeaturesParametersBase.prototype.hasGeometry=true]
         * @description 返回结果是否包含Geometry
         */
        this.hasGeometry = true;

        /**
         * @member {MetricsAggParameter|GeoHashGridAggParameter} GetFeaturesParametersBase.prototype.aggregations
         * @description 聚合查询参数，该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
         */
        this.aggregations = null;

        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.GetFeaturesParametersBase';
    }

    /**
     *
     * @function GetFeaturesParametersBase.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.hasGeometry = null;
        me.maxFeatures = null;
        me.targetEpsgCode = null;
        me.targetPrj = null;
        if (me.aggregation) {
            me.aggregation = null;
        }
    }
}
