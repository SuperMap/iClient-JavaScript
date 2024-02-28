/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';
import { AggregationParameter } from './AggregationParameter';

/**
 * @class BucketAggParameter
 * @deprecatedclass SuperMap.BucketAggParameter
 * @classdesc 子聚合类查询参数设置类。此类用于设置子聚合类查询的聚合名称、聚合字段、子聚合类集合等参数。<br>
 * 注意：该参数仅支持数据来源为 Elasticsearch 服务的 SuperMap iServer REST 数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 参数。
 * @param {Array.<MetricsAggParameter>} options.subAggs - 子聚合类集合。
 * @extends {AggregationParameter}
 * @usage
 */
export class BucketAggParameter extends AggregationParameter {
    constructor(options) {
        super();
        /**
         * @member {Array.<MetricsAggParameter>} BucketAggParameter.prototype.subAggs
         * @description 子聚合类集合。
         */
        this.subAggs = null;
        this.aggType = null;

        this.CLASS_NAME = 'SuperMap.BucketAggParameter';
        Util.extend(this, options);
    }

    destroy() {
        var me = this;
        if (me.subAggs) {
            me.subAggs = null;
        }
    }
}

