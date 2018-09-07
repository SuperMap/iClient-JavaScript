/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.AggregationParameter
 * @classdesc 聚合查询参数设置，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {string} options.aggName - 聚合名称。
 * @param {SuperMap.AggregationType} options.aggType - 聚合类型设置。
 * @param {string} options.aggFieldName - 聚合字段。
 * @param {SuperMap.AggregationParameter} options.subAgg - 子聚合类。
 *
 */
export class AggregationParameter {
    constructor(options) {
        /**
         * @member {string} SuperMap.AggregationParameter.prototype.aggName
         * @description 聚合名称。
         */
        this.aggName = null;
        /**
         * @member {SuperMap.AggregationType} SuperMap.AggregationParameter.prototype.aggType
         * @description 聚合类型设置类。
         */
        this.aggType = null;
        /**
         * @member {string} SuperMap.AggregationParameter.prototype.aggFieldName
         * @description 聚合字段。
         */
        this.aggFieldName = null;
        /**
         * @member {SuperMap.AggregationParameter} SuperMap.AggregationParameter.prototype.subAgg
         * @description 子聚合。
         */
        this.subAgg = null;

        this.CLASS_NAME = "SuperMap.AggregationParameter";
        Util.extend(this, options);
    }

    destroy() {
        var me = this;
        me.aggName = null;
        me.aggFieldName = null;
        me.aggType = null;
        if (me.subAgg) {
            me.subAgg = null;
        }
    }
}

SuperMap.AggregationParameter = AggregationParameter;