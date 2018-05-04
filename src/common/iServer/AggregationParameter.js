import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class   SuperMap.AggregationParameter
 * @classdesc   聚合查询参数设置,该参数仅支持数据来源Elasticsearch服务的数据服务
 * @category    iServer Data FeatureResults
 * @param   {object} options 初始化参数 <br>
 * @param   {String} aggName 聚合名称   <br>
 * @param   {String} aggType 聚合类型设置 <br>
 * @param   {String} aggFieldName 聚合字段 <br>
 * @param   {object} subAgg 子聚合类 </br>
 *
 */
export class AggregationParameter {
    constructor(options) {
        /**
         * @member  SuperMap.AggregationParameter.prototype.aggName - {String}
         * @description 聚合名称
         */
        this.aggName = null;
        /**
         * @member  SuperMap.AggregationParameter.prototype.aggType - {String}
         * @description 聚合类型设置类
         */
        this.aggType = null;
        /**
         * @member  SuperMap.AggregationParameter.prototype.aggFieldName - {String}
         * @description 聚合字段
         */
        this.aggFieldName = null;
        /**
         * @member  SuperMap.AggregationParameter.prototype.subAgg - {object}
         * @description 子聚合
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