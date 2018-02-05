import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {Theme} from './Theme';
import {ThemeGridRangeItem} from './ThemeGridRangeItem';
import {RangeMode, ColorGradientType} from '../REST';

/**
 * @class SuperMap.ThemeGridRange
 * @category  iServer Map Theme
 * @classdesc 栅格分段专题图。
 * @description 栅格分段专题图，是将所有单元格的值按照某种分段方式分成多个范围段，值在同一个范围段中的单元格使用相同的颜色进行显示。<br>
 *              栅格分段专题图一般用来反映连续分布现象的数量或程度特征。比如某年的全国降水量分布图，将各气象站点的观测值经过内插之后生成的栅格数据进行分段显示。<br>
 *              该类类似于分段专题图类，不同点在于分段专题图的操作对象是矢量数据，而栅格分段专题图的操作对象是栅格数据。<br>
 * @extends SuperMap.Theme
 * @param options - {Object} 参数。<br>
 *        items - {Array<{@link SuperMap.ThemeGridRangeItem}>} 栅格分段专题图子项数组。<br>
 *        reverseColor - {boolean} 是否对栅格分段专题图中分段的颜色风格进行反序显示。<br>
 *        rangeMode - {{@link SuperMap.RangeMode}} 分段专题图的分段模式。<br>
 *        rangeParameter - {number}分段参数。<br>
 *        colorGradientType - {{@link SuperMap.ColorGradientType}} 渐变颜色枚举类。
 */
export class ThemeGridRange extends Theme {

    constructor(options) {
        super("GRIDRANGE", options);
        /**
         * @member SuperMap.ThemeGridRange.prototype.items -{Array<SuperMap.ThemeGridRangeItem>}
         * @description 栅格分段专题图子项数组。<br>
         *              在栅格分段专题图中，将栅格值按照某种分段模式被分成多个范围段。<br>
         *              本类用来设置每个栅格范围段的分段起始值、终止值、名称和颜色等。每个分段所表示的范围为 [Start,End)。
         */
        this.items = null;

        /**
         * @member SuperMap.ThemeGridRange.prototype.rangeMode -{SuperMap.RangeMode}
         * @description 分段专题图的分段模式。<br>
         *              默认值为 SuperMap.RangeMode.EQUALINTERVAL（等距离分段）。<br>
         *              在栅格分段专题图中，作为专题变量的字段或表达式的值按照某种分段方式被分成多个范围段。<br>
         *              目前 SuperMap 提供的分段方式包括：等距离分段法、平方根分段法、标准差分段法、对数分段法、等计数分段法和自定义距离法，<br>
         *              显然这些分段方法根据一定的距离进行分段，因而范围分段专题图所基于的专题变量必须为数值型。
         */
        this.rangeMode = RangeMode.EQUALINTERVAL;

        /**
         * @member SuperMap.ThemeGridRange.prototype.rangeParameter -{number}
         * @description 分段参数。<br>
         *              当分段模式为等距离分段法，平方根分段，对数分段法，计数分段法其中一种模式时，该参数用于设置分段个数，必设；当分段模式为标准差分段法时，<br>
         *              该参数不起作用；当分段模式为自定义距离时，该参数用于设置自定义距离。默认值为 -1。
         */
        this.rangeParameter = 0;

        /**
         * @member SuperMap.ThemeGridRange.prototype.colorGradientType -{SuperMap.ColorGradientType}
         * @description 渐变颜色枚举类
         *
         */
        this.colorGradientType = ColorGradientType.YELLOW_RED;

        /**
         * @member SuperMap.ThemeGridRange.prototype.reverseColor -{boolean}
         * @description 是否对栅格分段专题图中分段的颜色风格进行反序显示。
         */
        this.reverseColor = false;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGridRange";
    }

    /**
     * @function SuperMap.ThemeGridRange.prototype.destroy
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
     * @function SuperMap.ThemeGridRange.fromObj
     * @description 从传入对象获取栅格分段专题图。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeGridRange} ThemeGridRange对象
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

SuperMap.ThemeGridRange = ThemeGridRange;

