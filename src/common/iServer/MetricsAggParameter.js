/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { AggregationParameter } from './AggregationParameter';
import { Util } from '../commontypes/Util';

/**
 * @class SuperMap.MetricsAggParameter
 * @classdesc 指标聚合查询参数类，该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {SuperMap.MetricsAggType} [options.aggType = 'avg'] - 聚合类型设置。
 */
export class MetricsAggParameter extends AggregationParameter {
    constructor(option) {
        super();
        /**
         * @member {SuperMap.MetricsAggType} [SuperMap.MetricsAggParameter.prototype.aggType=SuperMap.MetricsAggType.AVG]
         * @description 指标聚合类型。
         */
        this.aggType = SuperMap.MetricsAggType.AVG;

        Util.extend(this, option);
        this.CLASS_NAME = 'SuperMap.MetricsAggParameter';
    }

    destroy() {
        super.destroy();
        var me = this;
        me.aggType = null;
    }
}

SuperMap.MetricsAggParameter = MetricsAggParameter;
