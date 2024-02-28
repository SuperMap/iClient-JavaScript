/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class MinDistanceAnalystParameters
 * @deprecatedclass SuperMap.MinDistanceAnalystParameters
 * @category iServer SpatialAnalyst MinDistanceAnalyst
 * @classdesc 最近距离分析参数基类。该类存储了进行最近距离分析的数据集、属性过滤条件、查询范围的最大/最小距离等参数。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {string} options.referenceDatasetName - 参考数据集的名称。可以是二维点、线、面数据集或二维网络数据集。
 * @param {FilterParameter} [options.referenceFilterQueryParameter=null] - 对参考数据集中的要素进行过滤的属性过滤条件。不设置时默认为 null，即以参考数据集中的所有要素为参考要素进行计算。
 * @param {boolean} [options.createResultDataset] - 是否创建结果数据集。
 * @param {string} [options.resultDatasetName] - 结果数据集名称。
 * @param {string} [options.resultDatasourceName] - 结果数据集所在数据源的名称。
 * @param {number} options.minDistance - 指定的查询范围的最小距离。取值范围为大于或等于 0。单位与被计算记录集所属数据集的单位相同。
 * @param {number} options.maxDistance - 指定的查询范围的最大距离。取值范围为大于 0 的值及 -1。当设置为 -1 时，表示不限制最大距离。单位与被计算记录集所属数据集的单位相同。
 * @usage
 */
export class MinDistanceAnalystParameters {

    constructor(options) {
        /**
         * @member {string} MinDistanceAnalystParameters.prototype.referenceDatasetName
         * @description 参考数据集的名称。可以是二维点、线、面数据集或二维网络数据集。
         */
        this.referenceDatasetName = null;

        /**
         * @member {FilterParameter} [MinDistanceAnalystParameters.prototype.referenceFilterQueryParameter=null]
         * @description 对参考数据集中的要素进行过滤的属性过滤条件。不设置时默认为 null，即以参考数据集中的所有要素为参考要素进行计算。
         */
        this.referenceFilterQueryParameter = null;

        /**
         * @member {boolean} [MinDistanceAnalystParameters.prototype.createResultDataset]
         * @description 是否创建结果数据集。
         */
        this.createResultDataset = null;

        /**
         * @member {string} [MinDistanceAnalystParameters.prototype.resultDatasetName]
         * @description 结果数据集名称。
         */
        this.resultDatasetName = null;

        /**
         * @member {string} [MinDistanceAnalystParameters.prototype.resultDatasourceName]
         * @description 结果数据集所在数据源的名称。
         */
        this.resultDatasourceName = null;

        /**
         * @member {number} MinDistanceAnalystParameters.prototype.minDistance
         * @description 指定的查询范围的最小距离。取值范围为大于或等于 0。单位与被计算记录集所属数据集的单位相同。
         */
        this.minDistance = null;

        /**
         * @member {number} MinDistanceAnalystParameters.prototype.maxDistance
         * @description 指定的查询范围的最大距离。取值范围为大于 0 的值及 -1。当设置为 -1 时，表示不限制最大距离。单位与被计算记录集所属数据集的单位相同。
         */
        this.maxDistance = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.MinDistanceAnalystParameters";
    }

    /**
     * @function MinDistanceAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.referenceDatasetName = null;
        me.dataset = null;
        me.referenceFilterQueryParameter = null;
        me.createResultDataset = null;
        me.resultDatasetName = null;
        me.resultDatasourceName = null;
        me.minDistance = null;
        me.maxDistance = null;
    }

}
