/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: ThemeGraduatedSymbolStyle
 * 等级符号专题图正负零值显示风格类。
 * 通过该类可以设置正值的显示风格，零值和或负值的显示风格以及是否显示零值和或负值对应的等级符号。
 */
require('../base');
require('./ServerStyle');
ThemeGraduatedSymbolStyle = SuperMap.Class({
    
    /**
     * APIProperty: negativeDisplayed
     * {Boolean} 是否显示负值。默认为 false。
     */
    negativeDisplayed: false,
    
    /**
     * APIProperty: negativeStyle
     * {<ServerStyle>} 负值的等级符号风格。
     */
    negativeStyle: null,
    
    /**
     * APIProperty: positiveStyle
     * {<ServerStyle>}正值的等级符号风格。 
     */
    positiveStyle: null,
    
    /**
     * APIProperty: zeroDisplayed
     * {Boolean}  是否显示0值。默认为 false。 
     */
    zeroDisplayed: false, 
    
    /**
     * APIProperty: zeroStyle
     * {<ServerStyle>} 0值的等级符号风格。 
     */
    zeroStyle: null,
    
    /**
     * Constructor: ThemeGraduatedSymbolStyle
     * 等级符号专题图正负零值显示风格类构造函数，用于创建 ThemeGraduatedSymbolStyle 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * negativeDisplayed - {Boolean} 是否显示负值。默认为 false。
     * negativeStyle - {<ServerStyle>} 负值的等级符号风格。
     * positiveStyle - {<ServerStyle>}  正值的等级符号风格。
     * zeroDisplayed - {Boolean} 是否显示0值。默认为 false。 
     * zeroStyle - {<ServerStyle>} 0值的等级符号风格。  
     */
    initialize: function(options) {
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
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        var me = this;
        me.negativeDisplayed = null;
        me.negativeStyle = null;
        me.positiveStyle = null;
        me.zeroDisplayed = null;
        me.zeroStyle = null;
    },
    
    CLASS_NAME: "ThemeGraduatedSymbolStyle"
});
ThemeGraduatedSymbolStyle.fromObj = function(obj) {
    if(!obj) return;
    var res = new ThemeGraduatedSymbolStyle();
    SuperMap.Util.copy(res, obj);
    res.negativeStyle = ServerStyle.fromJson(obj.negativeStyle);
    res.positiveStyle = ServerStyle.fromJson(obj.positiveStyle);
    res.zeroStyle = ServerStyle.fromJson(obj.zeroStyle);
    return res;
};
module.exports = function (options) {
    return new ThemeGraduatedSymbolStyle(options);
};
