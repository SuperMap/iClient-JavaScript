/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: ThemeLabelBackground
 * 标签背景风格类。
 * 通过该类可以设置标签的背景形状和风格。
 */
require('../base');
require('./ServerStyle');
ThemeLabelBackground = SuperMap.Class({

    /**
     * APIProperty: labelBackShape
     * {<LabelBackShape>} 标签专题图中标签背景风格。当背景形状
     * labelBackShape 属性设为 NONE（即无背景形状） 时，backStyle 属性无效。
     */
    labelBackShape: LabelBackShape.NONE,

    /**
     * APIProperty: backStyle
     * {<ServerStyle>} 标签专题图中标签背景的形状枚举类。背景类型可
     * 以是矩形、圆角矩形、菱形、椭圆形、三角形和符号等，默认为 LabelBackShape.NONE，
     * 即不使用任何的形状作为标签的背景。
     */
    backStyle: null,

    /**
     * Constructor: ThemeLabelBackground
     * 标签背景风格类构造函数，用于创建 ThemeLabelBackGround 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * labelBackShape - {<LabelBackShape>} 标签专题图中标签背景风格。
     * backStyle - {<ServerStyle>} 标签专题图中标签背景的形状枚举类。
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
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        var me = this;
        me.labelBackShape = null;
        if (me.backStyle) {
            me.backStyle.destroy();
            me.backStyle = null;
        }
    },

    CLASS_NAME: "ThemeLabelBackground"
});
ThemeLabelBackground.fromObj = function (obj) {
    if (!obj) return;
    var t = new ThemeLabelBackground();
    t.labelBackShape = obj.labelBackShape;
    t.backStyle = ServerStyle.fromJson(obj.backStyle);

    return t;
};
module.exports = function (options) {
    return new ThemeLabelBackground(options);
};
