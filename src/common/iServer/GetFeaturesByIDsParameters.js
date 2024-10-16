/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { FilterParameter } from './FilterParameter';
import { GetFeaturesParametersBase } from './GetFeaturesParametersBase';

/**
 * @class GetFeaturesByIDsParameters
 * @deprecatedclass SuperMap.GetFeaturesByIDsParameters
 * @category  iServer Data FeatureResults
 * @classdesc ID 查询参数类。
 * @param {Object} options - 参数。
 * @param {Array.<number>} options.IDs - 指定查询的元素 ID 信息。
 * @param {Array.<string>} [options.fields] - 设置查询结果返回字段。默认返回所有字段。
 * @param {Array.<string>} options.dataSetNames - 数据集集合中的数据集名称列表。
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。
 * @param {string|number} [options.targetEpsgCode] - 动态投影的目标坐标系对应的 EPSG Code，使用此参数时，returnContent 参数需为 true。
 * @param {Object} [options.targetPrj] - 动态投影的目标坐标系。使用此参数时，returnContent 参数需为 true。如：prjCoordSys={"epsgCode":3857}。当同时设置 targetEpsgCode 参数时，此参数不生效。
 * @param {MetricsAggParameter|GeoHashGridAggParameter} [options.aggregations] - 聚合查询参数。该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @extends {GetFeaturesParametersBase}
 * @usage
 */
export class GetFeaturesByIDsParameters extends GetFeaturesParametersBase {
    constructor(options) {
        super(options);
        /**
         * @member {string} GetFeaturesByIDsParameters.prototype.getFeatureMode
         * @description 数据集查询模式。
         */
        this.getFeatureMode = 'ID';

        /**
         * @member {Array.<number>} GetFeaturesByIDsParameters.prototype.IDs
         * @description 所要查询指定的元素 ID 信息。
         */
        this.IDs = null;

        /**
         *  @member {Array.<string>} GetFeaturesByIDsParameters.prototype.fields
         *  @description 设置查询结果返回字段。当指定了返回结果字段后，则 GetFeaturesResult 中的 features 的属性字段只包含所指定的字段。不设置即返回全部字段。
         */
        this.fields = null;
        Util.extend(this, options);

        this.CLASS_NAME = 'SuperMap.GetFeaturesByIDsParameters';
    }

    /**
     * @function GetFeaturesByIDsParameters.prototype.destroy
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
     * @function GetFeaturesByIDsParameters.toJsonParameters
     * @description 将 GetFeaturesByIDsParameters 对象转换为 JSON 字符串。
     * @param {GetFeaturesByIDsParameters} params - ID 查询参数对象。
     * @returns {string} 转化后的 JSON 字符串。
     */
    static toJsonParameters(params) {
        var parasByIDs, filterParameter;

        parasByIDs = {
            datasetNames: params.datasetNames,
            getFeatureMode: 'ID',
            ids: params.IDs
        };
        if (params.fields) {
            filterParameter = new FilterParameter();
            filterParameter.name = params.datasetNames;
            filterParameter.fields = params.fields;
            parasByIDs.queryParameter = filterParameter;
        }
        if (params.targetEpsgCode) {
            parasByIDs.targetEpsgCode = params.targetEpsgCode;
        }

        if (typeof params.hasGeometry === 'boolean') {
            parasByIDs.hasGeometry = params.hasGeometry;
        }

        if (!params.targetEpsgCode && params.targetPrj) {
            parasByIDs.targetPrj = params.targetPrj;
        }
        if (params.aggregations) {
            parasByIDs.aggregations = params.aggregations;
        }

        return Util.toJSON(parasByIDs);
    }
}

