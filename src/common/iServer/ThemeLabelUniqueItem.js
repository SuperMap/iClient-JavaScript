/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class ThemeLabelUniqueItem
 * @deprecatedclass SuperMap.ThemeLabelUniqueItem
 * @category  iServer Map Theme
 * @classdesc 单值标签专题图的子项。
 * @description 标签专题图用专题值对点、线、面等对象做标注，值得注意的是，单值标签专题图允许用户通过 uniqueExpression
 *              字段指定用于单值的字段，同一值的标签具有相同的显示风格，其中每一个值就是一个专题图子项，
 *              每一个子项都具有其名称、风格、指定的单值、X 方向偏移量和 Y 方向偏移量。
 * @param {Object} options - 参数。
 * @param {string} options.unique - 子项的值，可以为数字、字符串等。
 * @param {string} [options.caption] - 子项的名称。
 * @param {number} [options.offsetX=0] - 标签在 X 方向偏移量。
 * @param {number} [options.offsetY=0] - 标签在 Y 方向偏移量。
 * @param {boolean} [options.visible=true] - 子项是否可见。
 * @param {ServerTextStyle} [options.style] - 子项文本的显示风格。
 * @usage
 */
export class ThemeLabelUniqueItem {

    constructor(options) {
        /**
         * @member {string} [ThemeLabelUniqueItem.prototype.caption]
         * @description 标签专题子项的标题。
         */
        this.caption = null;

        /**
         * @member {string} ThemeLabelUniqueItem.prototype.unique
         * @description 单值专题图子项的值，可以为数字、字符串等。
         */
        this.unique = null;

        /**
         * @member {number} [ThemeLabelUniqueItem.prototype.offsetX=0]
         * @description 标签在 X 方向偏移量。
         */
        this.offsetX = 0;

        /**
         * @member {number} [ThemeLabelUniqueItem.prototype.offsetY=0]
         * @description 标签在 Y 方向偏移量。
         */
        this.offsetY = 0;

        /**
         * @member {boolean} [ThemeLabelUniqueItem.prototype.visible=true]
         * @description 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。
         */
        this.visible = true;

        /**
         * @member {ServerTextStyle} ThemeLabelUniqueItem.prototype.style
         * @description 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：<br>
         *              uniformMixedStyle（标签文本的复合风格），ThemeLabelUniqueItem.style（单值子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.style = new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeLabelUniqueItem";
    }

    /**
     * @function ThemeLabelUniqueItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.unique = null;
        me.caption = null;
        me.offsetX = null;
        me.offsetY = null;
        if (me.style) {
            me.style.destroy();
            me.style = null;
        }
        me.visible = null;
    }

    /**
     * @function ThemeLabelUniqueItem.fromObj
     * @description 从传入对象获取单值标签专题图的子项类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeLabelUniqueItem} ThemeLabelUniqueItem 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var t = new ThemeLabelUniqueItem();
        Util.copy(t, obj);
        return t;
    }

}

