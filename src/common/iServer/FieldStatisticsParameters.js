/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {FieldParameters} from './FieldParameters';

/**
 * @class FieldStatisticsParameters
 * @deprecatedclass SuperMap.FieldStatisticsParameters
 * @category iServer Data Field
 * @classdesc 字段统计信息查询参数类。此类可用于设置需要统计的字段信息的数据源、数据集、字段名以及字段统计方法等参数，
 * 支持的字段统计方法包括平均值、最大值、最小值、标准差、总和、方差。
 * @param {Object} options - 参数。
 * @param {string} options.datasource - 数据源名称。
 * @param {string} options.dataset - 数据集名称。
 * @param {string} options.fieldName - 字段名称。
 * @param {(string.<StatisticMode>|Array.<string.<StatisticMode>>)} statisticMode - 字段统计方法类型。
 * @extends {FieldParameters}
 * @usage
 */
export class FieldStatisticsParameters extends FieldParameters {


    constructor(options) {
        super(options);
        /**
         * @member {string} FieldStatisticsParameters.prototype.fieldName
         * @description 字段名称。
         */
        this.fieldName = null;

        /**
         * @member {(string.<StatisticMode>|Array.<string.<StatisticMode>>)} FieldStatisticsParameters.prototype.statisticMode
         * @description 字段统计方法类型。
         */
        this.statisticMode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldStatisticsParameters";
    }

    /**
     * @function FieldStatisticsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    }

}

