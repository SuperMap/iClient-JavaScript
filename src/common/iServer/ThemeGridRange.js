/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ThemeGridRangeItem} from './ThemeGridRangeItem';
import {RangeMode, ColorGradientType} from '../REST';

/**
 * @class ThemeGridRange
 * @deprecatedclass SuperMap.ThemeGridRange
 * @category  iServer Map Theme
 * @classdesc 栅格分段专题图。栅格分段专题图，是将所有单元格的值按照某种分段方式分成多个范围段，值在同一个范围段中的单元格使用相同的颜色进行显示。一般用来反映连续分布现象的数量或程度特征。
 * 比如某年的全国降水量分布图，将各气象站点的观测值经过内插之后生成的栅格数据进行分段显示。
 * 该类类似于分段专题图类，不同点在于分段专题图的操作对象是矢量数据，而栅格分段专题图的操作对象是栅格数据。
 * @extends {CommonTheme}
 * @param {Object} options - 参数。
 * @param {Array.<ThemeGridRangeItem>} options.items - 栅格分段专题图子项数组。
 * @param {boolean} [options.reverseColor=false] - 是否对栅格分段专题图中分段的颜色风格进行反序显示。
 * @param {RangeMode} [options.rangeMode=RangeMode.EQUALINTERVAL] - 分段专题图的分段模式。
 * @param {number} [options.rangeParameter=0] - 分段参数。
 * @param {ColorGradientType} [options.colorGradientType=ColorGradientType.YELLOW_RED] - 渐变颜色枚举类。
 * @usage
 */
export class ThemeGridRange extends Theme {

    constructor(options) {
        super("GRIDRANGE", options);
        /**
         * @member {Array.<ThemeGridRangeItem>} ThemeGridRange.prototype.items
         * @description 栅格分段专题图子项数组。<br>
         *              在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。
         *              本类用来设置每个栅格范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
         */
        this.items = null;

        /**
         * @member {RangeMode} [ThemeGridRange.prototype.rangeMode=RangeMode.EQUALINTERVAL]
         * @description 分段专题图的分段模式。<br>
         *              在栅格分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段。
         *              目前 SuperMap 提供的分段方式包括：等距离分段法、平方根分段法、标准差分段法、对数分段法、等计数分段法和自定义距离法，
         *              显然这些分段方法根据一定的距离进行分段，因而范围分段专题图所基于的专题变量必须为数值型。
         */
        this.rangeMode = RangeMode.EQUALINTERVAL;

        /**
         * @member {number} [ThemeGridRange.prototype.rangeParameter=0]
         * @description 分段参数。<br>
         *              当分段模式为等距离分段法，平方根分段，对数分段法，等计数分段法其中一种模式时，该参数用于设置分段个数，必设；当分段模式为标准差分段法时，
         *              该参数不起作用；当分段模式为自定义距离时，该参数用于设置自定义距离。
         */
        this.rangeParameter = 0;

        /**
         * @member {ColorGradientType} [ThemeGridRange.prototype.colorGradientType=ColorGradientType.YELLOW_RED]
         * @description 渐变颜色枚举类。
         *
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        /**
         * @member {boolean} ThemeGridRange.prototype.reverseColor
         * @description 是否对栅格分段专题图中分段的颜色风格进行反序显示。
         */
        this.reverseColor = false;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGridRange";
    }

    /**
     * @function ThemeGridRange.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
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
        me.reverseColor = null;
        me.rangeMode = null;
        me.rangeParameter = null;
        me.colorGradientType = null;
    }

    /**
     * @function ThemeGridRange.fromObj
     * @description 从传入对象获取栅格分段专题图。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGridRange} ThemeGridRange 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGridRange();
        Util.copy(res, obj);
        var itemsR = obj.items;
        var len = itemsR ? itemsR.length : 0;
        res.items = [];
        for (var i = 0; i < len; i++) {
            res.items.push(ThemeGridRangeItem.fromObj(itemsR[i]));
        }
        return res;
    }

}


