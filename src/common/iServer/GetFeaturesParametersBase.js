/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.GetFeaturesParametersBase
 * @category  iServer Data FeatureResults
 * @classdesc 要素查询参数基类。
 * @param {Object} options - 参数。 
 * @param {Array.<string>} options.datasetNames - 数据集集合中的数据集名称列表。 
 * @param {boolean} [options.returnContent=true] - 是否直接返回查询结果。 
 * @param {number} [options.fromIndex=0] - 查询结果的最小索引号。 
 * @param {number} [options.toIndex=19] - 查询结果的最大索引号。 
 */
export class GetFeaturesParametersBase {


    constructor(options) {
        /**
         * @member {Array.<string>} SuperMap.GetFeaturesParametersBase.prototype.datasetName
         * @description 数据集集合中的数据集名称列表。
         */
        this.datasetNames = null;

        /**
         * @member {boolean} [SuperMap.GetFeaturesParametersBase.prototype.returnContent=true]
         * @description 是否立即返回新创建资源的表述还是返回新资源的 URI。
         *              如果为 true，则直接返回新创建资源，即查询结果的表述。
         *              如果为 false，则返回的是查询结果资源的 URI。
         */
        this.returnContent = true;

        /**
         * @member {number} [SuperMap.GetFeaturesParametersBase.prototype.fromIndex=0]
         * @description 查询结果的最小索引号。如果该值大于查询结果的最大索引号，则查询结果为空。
         */
        this.fromIndex = 0;

        /**
         * @member {number} [SuperMap.GetFeaturesParametersBase.prototype.toIndex=19]
         * @description 查询结果的最大索引号。如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
         */
        this.toIndex = 19;

        /**
         * @member {boolean} [SuperMap.GetFeaturesParametersBase.prototype.returnCountOnly=false]
         * @description 只返回查询结果的总数。
         */
        this.returnCountOnly = false;

        /**
         * @member {number} [SuperMap.GetFeaturesParametersBase.prototype.maxFeatures=1000]
         * @description 进行 SQL 查询时，用于设置服务端返回查询结果条目数量。
         */
        this.maxFeatures = null;

        /**
         * @member {Object} SuperMap.GetFeaturesParametersBase.prototype.aggregations
         * @description 聚合查询参数，该参数仅支持数据来源 Elasticsearch 服务的数据服务。
         */
        this.aggregations = null;

        Util.extend(this, options);

        this.CLASS_NAME = "SuperMap.GetFeaturesParametersBase";
    }

    /**
     *
     * @function SuperMap.GetFeaturesParametersBase.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
        if (me.aggregation) {
            me.aggregation = null;
        }
    }
}

SuperMap.GetFeaturesParametersBase = GetFeaturesParametersBase;