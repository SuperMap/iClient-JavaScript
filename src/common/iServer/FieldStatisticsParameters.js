/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {FieldParameters} from './FieldParameters';

/**
 * @class SuperMap.FieldStatisticsParameters
 * @category iServer Data Field
 * @classdesc 字段统计信息查询参数类。
 * @param {Object} options - 参数。 
 * @param {string} options.datasource - 数据源名称。 
 * @param {string} options.dataset - 数据集名称。 
 * @param {string} options.fieldName - 字段名。 
 * @param {(string.<SuperMap.StatisticMode>|Array.<string.<SuperMap.StatisticMode>>)} statisticMode - 字段统计方法类型。
 * @extends {SuperMap.FieldParameters}
 */
export class FieldStatisticsParameters extends FieldParameters {


    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.FieldStatisticsParameters.prototype.fieldName
         * @description 字段名
         */
        this.fieldName = null;

        /**
         * @member {(string.<SuperMap.StatisticMode>|Array.<string.<SuperMap.StatisticMode>>)} SuperMap.FieldStatisticsParameters.prototype.statisticMode
         * @description 字段统计方法类型
         */
        this.statisticMode = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FieldStatisticsParameters";
    }

    /**
     * @function SuperMap.FieldStatisticsParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.fieldName = null;
        me.statisticMode = null;
    }

}

SuperMap.FieldStatisticsParameters = FieldStatisticsParameters;
