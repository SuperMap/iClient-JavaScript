/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from "../SuperMap";
import {AggregationType} from '../REST';
import {Util} from '../commontypes/Util';
import {AggregationParameter} from "./AggregationParameter";
import "./AggQueryBuilderParameter";

/**
 * @class SuperMap.FilterAggParameter
 * @classdesc 过滤条件参数设置，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {SuperMap.AggQueryBuilderParameter} options.filterParam - 过滤条件参数设置类。
 * @param {SuperMap.AggregationType} [options.aggType=AggregationType.FILTER] - 聚合类型。
 */
export class FilterAggParameter extends AggregationParameter {

    constructor(options) {
        super(options);
        /**
         * @member {SuperMap.AggQueryBuilderParameter} SuperMap.FilterAggParameter.prototype.filterParam
         * @description 过滤条件参数设置类。
         */
        this.filterParam = null;
        /**
         * @member {SuperMap.AggregationType} [SuperMap.FilterAggParameter.prototype.aggType=AggregationType.FILTER]
         * @description 聚合类型。
         */
        this.aggType = AggregationType.FILTER;
        this.CLASS_NAME = "SuperMap.FilterAggParameter";
        Util.extend(this, options);
    }

    destroy() {
        super.destroy();
        var me = this;
        if (me.filterParam) {
            me.filterParam = null;
        }
    }
}

SuperMap.FilterAggParameter = FilterAggParameter;