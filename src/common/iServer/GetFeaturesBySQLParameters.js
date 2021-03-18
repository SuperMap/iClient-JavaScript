/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';
import './FilterParameter';

/**
 * @class SuperMap.GetFeaturesBySQLParameters
 * @category iServer Data FeatureResults
 * @classdesc 数据服务中数据集 SQL 查询参数类。
 * @param {Object} options - 参数。
 * @param {SuperMap.FilterParameter} options.queryParameter - 查询过滤条件参数。
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。 如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @param {SuperMap.MetricsAggParameter|SuperMap.GeoHashGridAggParameter} [options.aggregations] - 聚合查询参数。该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @extends {SuperMap.GetFeaturesParametersBase}
 */
export class GetFeaturesBySQLParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.GetFeaturesBySQLParameters.prototype.getFeatureMode
         * @description 数据集查询模式。
         */
        this.getFeatureMode = 'SQL';

        /**
         * @member {SuperMap.FilterParameter} SuperMap.GetFeaturesBySQLParameters.prototype.queryParameter
         * @description 查询过滤条件参数类。
         */
        this.queryParameter = null;

        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.GetFeaturesBySQLParameters';
    }

    /**
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.destroy
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
     * @function SuperMap.GetFeaturesBySQLParameters.prototype.toJsonParameters
     * @description 将 SuperMap.GetFeaturesBySQLParameters 对象转换为 JSON 字符串。
     * @param {SuperMap.GetFeaturesBySQLParameters} params - 数据集 SQL 查询参数对象。
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

SuperMap.GetFeaturesBySQLParameters = GetFeaturesBySQLParameters;
