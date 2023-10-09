/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {MinDistanceAnalystParameters} from './MinDistanceAnalystParameters';

/**
 * @class DatasetMinDistanceAnalystParameters
 * @deprecatedclass SuperMap.DatasetMinDistanceAnalystParameters
 * @category iServer SpatialAnalyst MinDistanceAnalyst
 * @classdesc 数据集最近距离分析参数类。该类用于设置要进行最近距离分析的数据集、属性过滤条件、查询范围的最大/最小距离等参数。
 * @version 11.1.1
 * @param {Object} options - 参数。
 * @param {FilterParameter} [options.inputFilterQueryParameter] - 对被计算数据集的要素进行过滤的属性过滤条件。只有满足此条件的要素才参与最近距离计算。
 * @param {string} options.referenceDatasetName - 参考数据集的名称。可以是二维点、线、面数据集或二维网络数据集。
 * @param {FilterParameter} [options.referenceFilterQueryParameter=null] - 对参考数据集中的要素进行过滤的属性过滤条件。不设置时默认为 null，即以参考数据集中的所有要素为参考要素进行计算。
 * @param {boolean} [options.createResultDataset] - 是否创建结果数据集。
 * @param {string} [options.resultDatasetName] - 结果数据集名称。
 * @param {string} [options.resultDatasourceName] - 结果数据集所在数据源的名称。
 * @param {number} options.minDistance - 指定的查询范围的最小距离。取值范围为大于或等于 0。单位与被计算记录集所属数据集的单位相同。
 * @param {number} options.maxDistance - 指定的查询范围的最大距离。取值范围为大于 0 的值及 -1。当设置为 -1 时，表示不限制最大距离。单位与被计算记录集所属数据集的单位相同。
 * @extends {MinDistanceAnalystParameters}
 * @usage
 */
export class DatasetMinDistanceAnalystParameters extends MinDistanceAnalystParameters{

    constructor(options) {
        super(options);
        /**
         *  @member {string} DatasetMinDistanceAnalystParameters.prototype.dataset
         *  @description 源数据集名称。
         */
            this.dataset = null;

        /**
         * @member {FilterParameter} [DatasetMinDistanceAnalystParameters.prototype.inputFilterQueryParameter]
         * @description 对被计算数据集的要素进行过滤的属性过滤条件。只有满足此条件的要素才参与最近距离计算。
         */
        this.inputFilterQueryParameter = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.DatasetMinDistanceAnalystParameters";
    }

    /**
     * @function DatasetMinDistanceAnalystParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        super.destroy();
        var me = this;
        this.dataset = null;
        me.inputFilterQueryParameter = null;
    }
}
