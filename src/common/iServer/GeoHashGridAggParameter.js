import {SuperMap} from "../SuperMap";
import {AggregationType} from '../REST';
import {Util} from '../commontypes/Util';
import {AggregationParameter} from "./AggregationParameter";

/**
 * @class   SuperMap.GeoHashGridAggParameter
 * @classdesc   格网聚合查询参数类,该参数仅支持数据来源Elasticsearch服务的数据服务
 * @category    iServer Data FeatureResults
 * @param   {object} option 初始化参数   <br>
 * @param   {number}  precision   网格中数字的精度  <br>
 * @param   {String}    aggType 格网聚合类型  <br>
 */
export class GeoHashGridAggParameter extends AggregationParameter {
    constructor(option) {
        super(option);
        /**
         * @member  SuperMap.GeoHashGridAggParameter.prototype.precision -{number}
         * @description 网格中数字的精度，默认为5
         */
        this.precision = 5;
        /**
         * @member  SuperMap.GeoHashGridAggParameter.aggType.precision -{String}
         * @description 格网聚合类型
         */
        this.aggType = AggregationType.GEOHASH_GRID;

        Util.extend(this, option);

        this.CLASS_NAME = "SuperMap.GeoHashGridAggParameter";
    }

    destroy() {
        super.destroy();
        this.aggType = null;
    }

    /**
     * @function    SuperMap.GeoHashGridAggParameter.toJsonParameters
     * @description 将对象转为json格式
     * @param param 转换对象
     * @returns {string|Object}
     */
    static toJsonParameters(param) {
        var parameters = {
            aggName: param.aggName,
            aggFieldName: param.aggFieldName,
            aggType: param.aggType,
            precision: param.precision
        };
        if (param.subAgg) {
            parameters.subAgg = param.subAgg;
        }
        return Util.toJson(parameters);
    }
}

SuperMap.GeoHashGridAggParameter = GeoHashGridAggParameter;

