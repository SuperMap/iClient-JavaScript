import {SuperMap} from "../SuperMap";
import {Util} from '../commontypes/Util';

/**
 * @class   SuperMap.AggQueryBuilderParameter
 * @classdesc   聚合查询QueryBuilder参数基类,该参数仅支持数据来源Elasticsearch服务的数据服务
 * @category    iServer Data FeatureResults
 * @param   {object} option 初始化参数   <br>
 * @param   {String} name 查询结果名称   <br>
 * @param   {String} queryType  查询类型 <br>
 */
export class AggQueryBuilderParameter {
    constructor(option) {

        /**
         * @member  SuperMap.AggQueryBuilderParameter.prototype.name -{String}
         * @description 查询结果名称
         */
        this.name = null;
        /**
         * @member  SuperMap.AggQueryBuilderParameter.prototype.queryType -{String}
         * @description 查询类型
         */
        this.queryType = null;
        this.CLASS_NAME = "SuperMap.AggQueryBuilderParameter";
        Util.extend(this, option);
    }

    destroy() {
        var me = this;
        me.name = null;
        me.queryType = null;
    }
}

SuperMap.AggQueryBuilderParameter = AggQueryBuilderParameter;