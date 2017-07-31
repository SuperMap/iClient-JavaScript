/*
 * Class: SuperMap.ThemeLabelBackground
 * 标签背景风格类。
 * 通过该类可以设置标签的背景形状和风格。
 */
require('../REST');
var SuperMap = require('../SuperMap');
var ServerStyle = require('./ServerStyle');

/**
 * @class SuperMap.ThemeLabelBackground
 * @description 标签背景风格类。通过该类可以设置标签的背景形状和风格。
 * @param options - {Object} 可选参数。如：<br>
 *        labelBackShape - {SuperMap.LabelBackShape} 标签专题图中标签背景风格。<br>
 *        backStyle - {SuperMap.ServerStyle} 标签专题图中标签背景的形状枚举类。
 */
SuperMap.ThemeLabelBackground = SuperMap.Class({

    /**
     * APIProperty: labelBackShape
     * @member SuperMap.ThemeLabelBackground.prototype.labelBackShape -{SuperMap.LabelBackShape}
     * @description 标签专题图中标签背景风格。当背景形状
     *              labelBackShape 属性设为 NONE（即无背景形状） 时，backStyle 属性无效。
     */
    labelBackShape: SuperMap.LabelBackShape.NONE,

    /**
     * APIProperty: backStyle
     * @member SuperMap.ThemeLabelBackground.prototype.backStyle -{SuperMap.ServerStyle}
     * @description 标签专题图中标签背景的形状枚举类。背景类型可
     *              以是矩形、圆角矩形、菱形、椭圆形、三角形和符号等，默认为 SuperMap.LabelBackShape.NONE，
     *              即不使用任何的形状作为标签的背景。
     */
    backStyle: null,

    /*
     * Constructor: SuperMap.ThemeLabelBackground
     * 标签背景风格类构造函数，用于创建 ThemeLabelBackGround 类的新实例。
     */
    initialize: function (options) {
        var me = this;
        me.backStyle = new ServerStyle();
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * @function destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.labelBackShape = null;
        if (me.backStyle) {
            me.backStyle.destroy();
            me.backStyle = null;
        }
    },

    CLASS_NAME: "SuperMap.ThemeLabelBackground"
});
SuperMap.ThemeLabelBackground.fromObj = function (obj) {
    if (!obj) return;
    var t = new SuperMap.ThemeLabelBackground();
    t.labelBackShape = obj.labelBackShape;
    t.backStyle = SuperMap.ServerStyle.fromJson(obj.backStyle);

    return t;
};
module.exports = SuperMap.ThemeLabelBackground;
