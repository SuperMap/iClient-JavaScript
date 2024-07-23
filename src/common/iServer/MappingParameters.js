/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {RangeMode, ColorGradientType} from '../REST';

/**
 * @class MappingParameters
 * @deprecatedclass SuperMap.MappingParameters
 * @category  iServer ProcessingService
 * @classdesc 分析后结果可视化的参数类。此类用于设置分布式分析结果可视化得到的专题图的子项数组、精度、分段模式、分段个数和颜色渐变模式等参数。
 * @param {Object} options - 参数。
 * @param {Array.<ThemeGridRangeItem>} [options.items] - 栅格分段专题图子项数组。
 * @param {number} [options.numericPrecision=1] - 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
 * @param {RangeMode} [options.rangeMode=RangeMode.EQUALINTERVAL] - 专题图分段模式。
 * @param {number} [options.rangeCount] - 专题图分段个数。
 * @param {ColorGradientType} [options.colorGradientType=ColorGradientType.YELLOW_RED] - 专题图颜色渐变模式。
 * @usage
 */
export class MappingParameters {

    constructor(options) {

        /**
         * @member {Array.<ThemeGridRangeItem>} [MappingParameters.prototype.items]
         * @description 栅格分段专题图子项数组。
         */
        this.items = null;

        /**
         * @member {number} [MappingParameters.prototype.numericPrecision=1]
         * @description 精度，此字段用于设置分析结果标签专题图中标签数值的精度，如“1”表示精确到小数点的后一位。
         */
        this.numericPrecision = 1;

        /**
         * @member {RangeMode} [MappingParameters.prototype.RangeMode=RangeMode.EQUALINTERVAL]
         * @description 专题图分段模式。
         */
        this.rangeMode = RangeMode.EQUALINTERVAL;

        /**
         * @member {number} [MappingParameters.prototype.rangeCount]
         * @description 专题图分段个数。
         */
        this.rangeCount = "";

        /**
         * @member {ColorGradientType} [MappingParameters.prototype.colorGradientType=ColorGradientType.YELLOW_RED]
         * @description 专题图颜色渐变模式。
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.MappingParameters";
    }

    /**
     * @function MappingParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.items) {
            if (me.items.length > 0) {
                for (var item in me.items) {
                    me.items[item].destroy();
                    me.items[item] = null;
                }
            }
            me.items = null;
        }
        me.numericPrecision = null;
        me.rangeMode = null;
        me.rangeCount = null;
        me.colorGradientType = null;
    }

}
