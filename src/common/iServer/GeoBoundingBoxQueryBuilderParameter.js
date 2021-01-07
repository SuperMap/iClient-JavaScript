/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from "../SuperMap";
import {Util} from '../commontypes/Util';
import {AggregationQueryBuilderType} from "../REST";
import {AggQueryBuilderParameter} from "./AggQueryBuilderParameter";

/**
 * @class SuperMap.GeoBoundingBoxQueryBuilderParameter
 * @classdesc bounds 查询参数设置类，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
 * @category iServer Data FeatureResults
 * @param {Object} options - 参数。 
 * @param {(SuperMap.Bounds|L.Bounds|ol.extent)} options.bounds - 查询范围。 
 * @param {SuperMap.AggregationQueryBuilderType} [options.queryType=SuperMap.AggregationQueryBuilderType.GEO_BOUNDING_BOX] - 查询类型。 
 */
export class GeoBoundingBoxQueryBuilderParameter extends AggQueryBuilderParameter {
    constructor(options) {
        super(options);
        /**
         * @member {(SuperMap.Bounds|L.Bounds|ol.extent)} SuperMap.GeoBoundingBoxQueryBuilderParameter.prototype.bounds
         * @description 查询范围。
         */
        this.bounds = null;

        /**
         * @member {SuperMap.AggregationQueryBuilderType} [SuperMap.GeoBoundingBoxQueryBuilderParameter.prototype.queryType=SuperMap.AggregationQueryBuilderType.GEO_BOUNDING_BOX]
         * @description 查询类型。
         */
        this.queryType = AggregationQueryBuilderType.GEO_BOUNDING_BOX;
        this.CLASS_NAME = "SuperMap.GeoBoundingBoxQueryBuilderParameter";
        Util.extend(this, options);
    }

    destroy() {
        super.destroy();
        this.bounds = null;
        this.queryType = null;
    }
}

SuperMap.GeoBoundingBoxQueryBuilderParameter = GeoBoundingBoxQueryBuilderParameter