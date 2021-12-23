/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { Util } from '../commontypes/Util';
import { BucketAggParameter } from './BucketAggParameter';

/**
 * @class SuperMap.GeoHashGridAggParameter
 * @classdesc 格网聚合查询参数类，该参数仅支持数据来源 Elasticsearch 服务的Supermap iServer的rest数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 初始化参数。
 * @param {number} [options.precision=5] - 精度。
 * @extends {SuperMap.BucketAggParameter}
 */
export class GeoHashGridAggParameter extends BucketAggParameter {
    constructor(options) {
        super();
        /**
         * @member {number} [SuperMap.GeoHashGridAggParameter.prototype.precision=5]
         * @description 网格中数字的精度。
         */
        this.precision = 5;
        Util.extend(this, options);
        /**
         * @member {SuperMap.BucketAggType} [SuperMap.GeoHashGridAggParameter.prototype.aggType=SuperMap.BucketAggType.GEOHASH_GRID]
         * @description 格网聚合类型。
         */
        this.aggType = SuperMap.BucketAggType.GEOHASH_GRID;

        this.CLASS_NAME = 'SuperMap.GeoHashGridAggParameter';
    }

    destroy() {
        super.destroy();
        this.aggType = null;
        this.precision = null;
    }

    /**
     * @function SuperMap.GeoHashGridAggParameter.toJsonParameters
     * @description 将对象转为 JSON 格式。
     * @param param 转换对象。
     * @returns {object}
     */
    static toJsonParameters(param) {
        var parameters = {
            aggName: param.aggName,
            aggFieldName: param.aggFieldName,
            aggType: param.aggType,
            precision: param.precision
        };
        return Util.toJson(parameters);
    }
}

SuperMap.GeoHashGridAggParameter = GeoHashGridAggParameter;
