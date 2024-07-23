/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';

/**
 * @class GetFeaturesBySQLParameters
 * @deprecatedclass SuperMap.GetFeaturesBySQLParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据集 SQL 查询参数类。 此类用于指定进行 SQL 查询的数据集列表，设置查询过滤条件以及一些通用的查询参数。
 * <div style="padding: 20px;border: 1px solid #eee;border-left-width: 5px;border-radius: 3px;border-left-color: #ce4844;">
 *      <p style="color: #ce4844">Notice</p>
 *      <p style="font-size: 13px">推荐设置 returnFeaturesOnly 配置为 true 来提升性能，如果需要获取总数量与数据集信息，FeatureService 提供了 getFeaturesCount 和 getFeaturesDatasetInfo 方法</p>
 * </div>
 * @param {Object} options - 参数。
 * @param {FilterParameter} options.queryParameter - 查询过滤条件参数。
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。
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
export class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {string} GetFeaturesBySQLParameters.prototype.getFeatureMode
         * @description 数据集查询模式。
         */
        this.getFeatureMode = 'SQL';

        /**
         * @member {FilterParameter} GetFeaturesBySQLParameters.prototype.queryParameter
         * @description 查询过滤条件参数类。
         */
        this.queryParameter = null;

        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.GetFeaturesBySQLParameters';
    }

    /**
     * @function GetFeaturesBySQLParameters.prototype.destroy
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
     * @function GetFeaturesBySQLParameters.prototype.toJsonParameters
     * @description 将 GetFeaturesBySQLParameters 对象转换为 JSON 字符串。
     * @param {GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var paramsBySql = {
            datasetNames: params.datasetNames,
            getFeatureMode: 'SQL',
            queryParameter: params.queryParameter
        };
        if (params.maxFeatures && !isNaN(params.maxFeatures)) {
            paramsBySql.maxFeatures = params.maxFeatures;
        }
        if (typeof params.hasGeometry === 'boolean') {
            paramsBySql.hasGeometry = params.hasGeometry;
        }
        if (params.aggregations) {
            paramsBySql.aggregations = params.aggregations;
        }
        if (params.targetEpsgCode) {
            paramsBySql.targetEpsgCode = params.targetEpsgCode;
        }
        if (!params.targetEpsgCode && params.targetPrj) {
            paramsBySql.targetPrj = params.targetPrj;
        }
        if (params.aggregations) {
            paramsBySql.aggregations = params.aggregations;
        }
        return Util.toJSON(paramsBySql);
    }
}

