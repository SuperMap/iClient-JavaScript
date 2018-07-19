import {SuperMap} from "../SuperMap";
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.AggQueryBuilderParameter
 * @classdesc 聚合查询 QueryBuilder 参数基类，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} option - 初始化参数。
 * @param {string} option.name - 查询结果名称。
 * @param {SuperMap.AggregationQueryBuilderType} option.queryType - 查询类型。
 */
export class AggQueryBuilderParameter {
    constructor(option) {

        /**
         * @member {string} SuperMap.AggQueryBuilderParameter.prototype.name
         * @description 查询结果名称。
         */
        this.name = null;
        /**
         * @member {SuperMap.AggregationQueryBuilderType} SuperMap.AggQueryBuilderParameter.prototype.queryType
         * @description 查询类型。
         */
        this.queryType = null;
        this.CLASS_NAME = "SuperMap.AggQueryBuilderParameter";
        Util.extend(this, option);
    }

    destroy() {
        var me = this;
        me.name = null;
        me.queryType = null;
    }
}

SuperMap.AggQueryBuilderParameter = AggQueryBuilderParameter;