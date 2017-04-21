/**
 * Class: SuperMap.ThemeLabelUniqueItem
 * 单值标签专题图的子项。
 * 标签专题图用专题值对点、线、面等对象做标注，值得注意的是，单值标签专题图允许用户通过 uniqueExpression
 * 字段指定用于单值的字段，同一值的标签具有相同的显示风格，其中每一个值就是一个专题图子项，
 * 每一个子项都具有其名称、风格、指定的单值、X方向偏移量和Y方向偏移量。
 */

require('./ServerTextStyle');
SuperMap.ThemeLabelUniqueItem = SuperMap.Class({

    /**
     * APIProperty: caption
     * {String} 标签专题子项的标题。
     */
    caption: null,
    /**
     * APIProperty: unique
     * {String} 单值专题图子项的值，可以为数字、字符串等。
     */
    unique: null,
    /**
     * APIProperty: offsetX
     * {Number} 标签在X方向偏移量。
     */
    offsetX: 0,

    /**
     * APIProperty: offsetY
     * {Number} 标签在Y方向偏移量。
     */
    offsetY: 0,

    /**
     * APIProperty: visible
     * {Boolean} 标签专题图子项是否可见。如果标签专题图子项可见，则为 true，否则为 false。默认值为 true。
     */
    visible: true,

    /**
     * APIProperty: style
     * {<SuperMap.ServerTextStyle>} 标签专题图子项文本的显示风格。各种风格的优先级从高到低为：
     * uniformMixedStyle（标签文本的复合风格），SuperMap.ThemeLabelUniqueItem.style（单值子项的文本风格），uniformStyle（统一文本风格）。
     */
    style: null,

    /**
     * Constructor: SuperMap.ThemeLabelUniqueItem
     * 单值标签专题图的子项类构造函数，用于创建 SuperMap.ThemeLabelUniqueItem 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * caption - {String} 专题图子项的名称。
     * unique - {String} 单值专题图子项的值，可以为数字、字符串等。
     * offsetX - {Number} 标签在X方向偏移量。
     * offsetY - {Number} 标签在Y方向偏移量。
     * visible - {Boolean} 标签专题图子项是否可见。
     * style - {<SuperMap.ServerTextStyle>} 标签专题图子项文本的显示风格。
     */
    initialize: function (options) {
        var me = this;
        me.style = new SuperMap.ServerTextStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
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
    },

    CLASS_NAME: "SuperMap.ThemeLabelUniqueItem"
});
SuperMap.ThemeLabelUniqueItem.fromObj = function (obj) {
    if (!obj) return;
    var t = new SuperMap.ThemeLabelUniqueItem();
    SuperMap.Util.copy(t, obj);
    return t;
};
module.exports = function (options) {
    return new SuperMap.ThemeLabelUniqueItem(options);
};
