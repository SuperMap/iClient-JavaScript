import {SuperMap} from "../SuperMap";
import {AggregationType} from '../REST';
import {Util} from '../commontypes/Util';
import {AggregationParameter} from "./AggregationParameter";
import "./AggQueryBuilderParameter";

/**
 * @class SuperMap.FilterAggParameter
 * @classdesc 过滤条件参数设置,该参数仅支持数据来源Elasticsearch服务的数据服务
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数 <br>
 * @param {SuperMap.AggQueryBuilderParameter} options.filterParam - 过滤条件参数设置类 <br>
 * @param {SuperMap.AggregationType} [options.aggType=SuperMap.AggregationType.FILTER] - 聚合类型 <br>
 */
export class FilterAggParameter extends AggregationParameter {

    constructor(options) {
        super(options);
        /**
         * @member {SuperMap.AggQueryBuilderParameter} SuperMap.FilterAggParameter.prototype.filterParam
         * @description 过滤条件参数设置类
         */
        this.filterParam = null;
        /**
         * @member {SuperMap.AggregationType} [SuperMap.FilterAggParameter.prototype.aggType=SuperMap.AggregationType.FILTER]
         * @description 聚合类型
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