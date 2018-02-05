import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class SuperMap.ThemeLabelUniqueItem
 * @category  iServer Map Theme
 * @classdesc 单值标签专题图的子项
 * @description 标签专题图用专题值对点、线、面等对象做标注，值得注意的是，单值标签专题图允许用户通过 uniqueExpression <br>
 *              字段指定用于单值的字段，同一值的标签具有相同的显示风格，其中每一个值就是一个专题图子项，<br>
 *              每一个子项都具有其名称、风格、指定的单值、X方向偏移量和Y方向偏移量。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {string} 专题图子项的名称。<br>
 *        unique - {string} 单值专题图子项的值，可以为数字、字符串等。<br>
 *        offsetX - {number}标签在X方向偏移量。<br>
 *        offsetY - {number}标签在Y方向偏移量。<br>
 *        visible - {boolean} 标签专题图子项是否可见。<br>
 *        style - {{@link SuperMap.ServerTextStyle}} 标签专题图子项文本的显示风格。
 */
export class ThemeLabelUniqueItem {

    constructor(options) {
        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.caption -{string}
         * @description 标签专题子项的标题。
         */
        this.caption = null;

        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.unique -{string}
         * @description 单值专题图子项的值，可以为数字、字符串等。
         */
        this.unique = null;

        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.offsetX -{number}
         * @description 标签在X方向偏移量。
         */
        this.offsetX = 0;

        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.offsetY -{number}
         * @description 标签在Y方向偏移量。
         */
        this.offsetY = 0;

        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.visible -{boolean}
         * @description 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。默认值为 true。
         */
        this.visible = true;

        /**
         * @member SuperMap.ThemeLabelUniqueItem.prototype.style -{SuperMap.ServerTextStyle}
         * @description 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：
         *              uniformMixedStyle（标签文本的复合风格），SuperMap.ThemeLabelUniqueItem.style（单值子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.style = new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeLabelUniqueItem";
    }

    /**
     * @function SuperMap.ThemeLabelUniqueItem.prototype.destroy
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
     * @function SuperMap.ThemeLabelUniqueItem.fromObj
     * @description 从传入对象获取单值标签专题图的子项类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeLabelUniqueItem} ThemeLabelUniqueItem对象
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

SuperMap.ThemeLabelUniqueItem = ThemeLabelUniqueItem;
