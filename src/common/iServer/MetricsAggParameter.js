/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { AggregationParameter } from './AggregationParameter';
import { Util } from '../commontypes/Util';
import { MetricsAggType } from '../REST';


/**
 * @class MetricsAggParameter
 * @deprecatedclass SuperMap.MetricsAggParameter
 * @classdesc 指标聚合查询参数类，此类用于设置聚合查询的聚合类型等参数，支持的聚合类型包括：平均值、最大值、最小值、求和，默认类型为平均值。<br>
 * 注意：该参数仅支持数据来源为 Elasticsearch 服务的 SuperMap iServer 的 REST 数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 可选参数。
 * @param {MetricsAggType} [options.aggType = 'avg'] - 聚合类型。
 * @extends {AggregationParameter}
 * @usage
 */
export class MetricsAggParameter extends AggregationParameter {
    constructor(option) {
        super();
        /**
         * @member {MetricsAggType} [MetricsAggParameter.prototype.aggType=MetricsAggType.AVG]
         * @description 指标聚合类型。
         */
        this.aggType = MetricsAggType.AVG;

        Util.extend(this, option);
        this.CLASS_NAME = 'SuperMap.MetricsAggParameter';
    }

    destroy() {
        super.destroy();
        var me = this;
        me.aggType = null;
    }
}

