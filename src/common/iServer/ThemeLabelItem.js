/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class ThemeLabelItem
 * @deprecatedclass SuperMap.ThemeLabelItem
 * @category  iServer Map Theme
 * @classdesc 分段标签专题图的子项。标签专题图用专题值对点、线、面等对象做标注。
 * 值得注意的是，分段标签专题图允许用户通过 rangeExpression 字段指定用于分段的数值型字段，
 * 同一范围段内的标签具有相同的显示风格，其中每一个范围段就是一个专题图子项，
 * 每一个子项都具有其名称、风格、起始值和终止值。注意：每个分段所表示的范围为 [Start, End)。例如：标签专题图的分段点有两个子项，
 * 他们所代表的分段区间分别为[0,5)，[5,10)。那么需要分别设置 ThemeLabelItem[0].start=0，
 *  ThemeLabelItem[0].end=5，SuperMap.ThemeLabelItem[1].start=5，SuperMap.ThemeLabelItem[1].end=10。
 * @param {Object} options - 可选参数。
 * @param {string} [options.caption] - 子项的名称。
 * @param {number} [options.end=0] - 子项的终止值。
 * @param {number} [options.start=0] - 子项的分段起始值。
 * @param {boolean} [options.visible=true] - 子项是否可见。
 * @param {ServerTextStyle} [options.style] - 子项文本的显示风格。
 * @usage
 */
export class ThemeLabelItem {

    constructor(options) {
        /**
         * @member {string} [ThemeLabelItem.prototype.caption]
         * @description 标签专题子项的标题。
         */
        this.caption = null;

        /**
         * @member {number} [ThemeLabelItem.prototype.end=0]
         * @description 标签专题图子项的终止值。如果该子项是分段中最后一个子项，那么该终止值就是分段的最大值；
         *              如果不是最后一项，该终止值必须与其下一子项的起始值相同，否则系统抛出异常。
         */
        this.end = 0;

        /**
         * @member {number} [ThemeLabelItem.prototype.start=0]
         * @description 标签专题图子项的分段起始值。如果该子项是分段中第一项，那么该起始值就是分段的最小值；
         *              如果该子项的序号大于等于 1 的时候，该起始值必须与前一子项的终止值相同，否则系统会抛出异常。
         */
        this.start = 0;

        /**
         * @member {boolean} [ThemeLabelItem.prototype.visible=true]
         * @description 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。
         */
        this.visible = true;

        /**
         * @member {ServerTextStyle} ThemeLabelItem.prototype.style
         * @description 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：<br>
         *              uniformMixedStyle（标签文本的复合风格），ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.style = new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeLabelItem";

    }


    /**
     * @function ThemeLabelItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.end = null;
        me.start = null;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    }

    /**
     * @function ThemeLabelItem.fromObj
     * @description 从传入对象获取分段标签专题图的子项类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeLabelItem} ThemeLabelItem 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var t = new ThemeLabelItem();
        Util.copy(t, obj);
        return t;
    }

}

