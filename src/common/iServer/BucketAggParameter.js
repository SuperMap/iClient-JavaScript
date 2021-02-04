/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { AggregationParameter } from './AggregationParameter';

/**
 * @class SuperMap.BucketAggParameter
 * @classdesc 子聚合类查询参数设置，该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {Array.<SuperMap.MetricsAggParameter>} options.subAggs - 子聚合类集合。
 *
 */
export class BucketAggParameter extends AggregationParameter {
    constructor(options) {
        super();
        /**
         * @member {Array.<SuperMap.MetricsAggParameter>} SuperMap.BucketAggParameter.prototype.subAggs
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

SuperMap.BucketAggParameter = BucketAggParameter;
