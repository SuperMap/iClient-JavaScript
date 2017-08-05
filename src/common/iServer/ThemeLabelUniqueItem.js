import SuperMap from '../SuperMap';
import ServerTextStyle from './ServerTextStyle';

/**
 * @class SuperMap.ThemeLabelUniqueItem
 * @description 单值标签专题图的子项。<br>
 *              标签专题图用专题值对点、线、面等对象做标注，值得注意的是，单值标签专题图允许用户通过 uniqueExpression <br>
 *              字段指定用于单值的字段，同一值的标签具有相同的显示风格，其中每一个值就是一个专题图子项，<br>
 *              每一个子项都具有其名称、风格、指定的单值、X方向偏移量和Y方向偏移量。
 * @param options - {Object} 可选参数。如：<br>
 *        caption - {String} 专题图子项的名称。<br>
 *        unique - {String} 单值专题图子项的值，可以为数字、字符串等。<br>
 *        offsetX - {Number} 标签在X方向偏移量。<br>
 *        offsetY - {Number} 标签在Y方向偏移量。<br>
 *        visible - {Boolean} 标签专题图子项是否可见。<br>
 *        style - {SuperMap.ServerTextStyle} 标签专题图子项文本的显示风格。
 */
export default  class ThemeLabelUniqueItem {

    /**
     * APIProperty: caption
     * SuperMap.ThemeLabelUniqueItem.prototype.caption -{String}
     * @description 标签专题子项的标题。
     */
    caption = null;

    /**
     * APIProperty: unique
     * SuperMap.ThemeLabelUniqueItem.prototype.unique -{String}
     * @description 单值专题图子项的值，可以为数字、字符串等。
     */
    unique = null;

    /**
     * APIProperty: offsetX
     * SuperMap.ThemeLabelUniqueItem.prototype.offsetX -{Number}
     * @description 标签在X方向偏移量。
     */
    offsetX = 0;

    /**
     * APIProperty: offsetY
     * SuperMap.ThemeLabelUniqueItem.prototype.offsetY -{Number}
     * @description 标签在Y方向偏移量。
     */
    offsetY = 0;

    /**
     * APIProperty: visible
     * SuperMap.ThemeLabelUniqueItem.prototype.visible -{Boolean}
     * @description 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。默认值为 true。
     */
    visible = true;

    /**
     * APIProperty: style
     * SuperMap.ThemeLabelUniqueItem.prototype.style -{SuperMap.ServerTextStyle}
     * @description 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：
     *              uniformMixedStyle（标签文本的复合风格），SuperMap.ThemeLabelUniqueItem.style（单值子项的文本风格），uniformStyle（统一文本风格）。
     */
    style = null;

    /*
     * Constructor: SuperMap.ThemeLabelUniqueItem
     * 单值标签专题图的子项类构造函数，用于创建 SuperMap.ThemeLabelUniqueItem 类的新实例。
     */
    constructor(options) {
        var me = this;
        me.style = new ServerTextStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }


    /**
     * APIMethod: destroy
     * @function destroy
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

    static fromObj(obj) {
        if (!obj) return;
        var t = new ThemeLabelUniqueItem();
        SuperMap.Util.copy(t, obj);
        return t;
    }

    CLASS_NAME = "SuperMap.ThemeLabelUniqueItem"
}

SuperMap.ThemeLabelUniqueItem = ThemeLabelUniqueItem;
