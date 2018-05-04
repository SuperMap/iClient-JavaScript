import {SuperMap} from "../SuperMap";
import {AggregationType} from '../REST';
import {Util} from '../commontypes/Util';
import {AggregationParameter} from "./AggregationParameter";

/**
 * @class   SuperMap.FilterAggParameter
 * @classdesc   过滤条件参数设置,该参数仅支持数据来源Elasticsearch服务的数据服务
 * @category    iServer Data FeatureResults
 * @param   {object}    option  初始化参数   <br>
 * @param   {object}    filterParam 过滤条件参数设置类   <br>
 * @param   {String}    aggType 聚合类型    <br>
 */
export class FilterAggParameter extends AggregationParameter {

    constructor(options) {
        super(options);
        /**
         * @member  SuperMap.FilterAggParameter.prototype.filterParam -{object}
         * @description  过滤条件参数设置类
         */
        this.filterParam = null;
        /**
         * @member  SuperMap.FilterAggParameter.prototype.aggType -{String}
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