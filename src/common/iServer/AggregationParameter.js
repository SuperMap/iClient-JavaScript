/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util } from '../commontypes/Util';

/**
 * @class AggregationParameter
 * @deprecatedclass SuperMap.AggregationParameter
 * @classdesc 聚合查询参数设置，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 参数。
 * @param {string} options.aggName - 聚合名称。
 * @param {string} options.aggFieldName - 聚合字段。
 * @usage
 */
export class AggregationParameter {
    constructor(options) {
        /**
         * @member {string} AggregationParameter.prototype.aggName
         * @description 聚合名称。
         */
        this.aggName = null;
        /**
         * @member {string} AggregationParameter.prototype.aggFieldName
         * @description 聚合字段。
         */
        this.aggFieldName = null;

        this.CLASS_NAME = 'SuperMap.AggregationParameter';
        Util.extend(this, options);
    }

    destroy() {
        var me = this;
        me.aggName = null;
        me.aggFieldName = null;
        me.aggType = null;
    }
}

