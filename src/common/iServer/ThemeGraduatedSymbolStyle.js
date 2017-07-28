/*
 * Class: SuperMap.ThemeGraduatedSymbolStyle
 * 等级符号专题图正负零值显示风格类。
 * 通过该类可以设置正值的显示风格，零值和或负值的显示风格以及是否显示零值和或负值对应的等级符号。
 */
var SuperMap = require('../SuperMap');
var ServerStyle = require('./ServerStyle');

/**
 * @class SuperMap.ThemeGraduatedSymbolStyle
 * @description 等级符号专题图正负零值显示风格类
 * @param options - {Object} 可选参数。如：<br>
 *        negativeDisplayed - {Boolean} 是否显示负值。默认为 false。<br>
 *        negativeStyle - {SuperMap.ServerStyle} 负值的等级符号风格。<br>
 *        positiveStyle - {SuperMap.ServerStyle}  正值的等级符号风格。<br>
 *        zeroDisplayed - {Boolean} 是否显示0值。默认为 false。<br>
 *        zeroStyle - {SuperMap.ServerStyle} 0值的等级符号风格。
 */
SuperMap.ThemeGraduatedSymbolStyle = SuperMap.Class({

    /**
     * APIProperty: negativeDisplayed
     * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.negativeDisplayed -{Boolean}
     * @description 是否显示负值。默认为 false。
     */
    negativeDisplayed: false,

    /**
     * APIProperty: negativeStyle
     * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.negativeStyle -{SuperMap.ServerStyle} 负值的等级符号风格。
     */
    negativeStyle: null,

    /**
     * APIProperty: positiveStyle
     * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.positiveStyle -{SuperMap.ServerStyle}
     * @description 正值的等级符号风格。
     */
    positiveStyle: null,

    /**
     * APIProperty: zeroDisplayed
     * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.zeroDisplayed -{Boolean}
     * @description 是否显示0值。默认为 false。
     */
    zeroDisplayed: false,

    /**
     * APIProperty: zeroStyle
     * @member SuperMap.ThemeGraduatedSymbolStyle.prototype.zeroStyle -{SuperMap.ServerStyle}
     * @description 0值的等级符号风格。
     */
    zeroStyle: null,

    /*
     * Constructor: SuperMap.ThemeGraduatedSymbolStyle
     * 等级符号专题图正负零值显示风格类构造函数，用于创建 SuperMap.ThemeGraduatedSymbolStyle 类的新实例。
     */
    initialize: function (options) {
        var me = this;
        me.negativeStyle = new ServerStyle();
        me.positiveStyle = new ServerStyle();
        me.zeroStyle = new ServerStyle();
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
        me.negativeDisplayed = null;
        me.negativeStyle = null;
        me.positiveStyle = null;
        me.zeroDisplayed = null;
        me.zeroStyle = null;
    },

    CLASS_NAME: "SuperMap.ThemeGraduatedSymbolStyle"
});
SuperMap.ThemeGraduatedSymbolStyle.fromObj = function (obj) {
    if (!obj) return;
    var res = new SuperMap.ThemeGraduatedSymbolStyle();
    SuperMap.Util.copy(res, obj);
    res.negativeStyle = SuperMap.ServerStyle.fromJson(obj.negativeStyle);
    res.positiveStyle = SuperMap.ServerStyle.fromJson(obj.positiveStyle);
    res.zeroStyle = SuperMap.ServerStyle.fromJson(obj.zeroStyle);
    return res;
};
module.exports = SuperMap.ThemeGraduatedSymbolStyle;

