/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerStyle.js
 */

/**
 * Class: SuperMap.REST.ThemeGraduatedSymbolStyle
 * 等级符号专题图正负零值显示风格类。
 * 通过该类可以设置正值的显示风格，零值和或负值的显示风格以及是否显示零值和或负值对应的等级符号。
 */
 
SuperMap.REST.ThemeGraduatedSymbolStyle = SuperMap.Class({
    
    /**
     * APIProperty: negativeDisplayed
     * {Boolean} 是否显示负值。默认为 false。
     */
    negativeDisplayed: false,
    
    /**
     * APIProperty: negativeStyle
     * {<SuperMap.REST.ServerStyle>} 负值的等级符号风格。
     */
    negativeStyle: null,
    
    /**
     * APIProperty: positiveStyle
     * {<SuperMap.REST.ServerStyle>}正值的等级符号风格。 
     */
    positiveStyle: null,
    
    /**
     * APIProperty: zeroDisplayed
     * {Boolean}  是否显示0值。默认为 false。 
     */
    zeroDisplayed: false, 
    
    /**
     * APIProperty: zeroStyle
     * {<SuperMap.REST.ServerStyle>} 0值的等级符号风格。 
     */
    zeroStyle: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeGraduatedSymbolStyle
     * 等级符号专题图正负零值显示风格类构造函数，用于创建 ThemeGraduatedSymbolStyle 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * negativeDisplayed - {Boolean} 是否显示负值。默认为 false。
     * negativeStyle - {<SuperMap.REST.ServerStyle>} 负值的等级符号风格。
     * positiveStyle - {<SuperMap.REST.ServerStyle>}  正值的等级符号风格。
     * zeroDisplayed - {Boolean} 是否显示0值。默认为 false。 
     * zeroStyle - {<SuperMap.REST.ServerStyle>} 0值的等级符号风格。  
     */
    initialize: function(options) {
        var me = this;
        me.negativeStyle = new SuperMap.REST.ServerStyle();
        me.positiveStyle = new SuperMap.REST.ServerStyle();
        me.zeroStyle = new SuperMap.REST.ServerStyle();
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
    
    CLASS_NAME: "SuperMap.REST.ThemeGraduatedSymbolStyle"
});
SuperMap.REST.ThemeGraduatedSymbolStyle.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeGraduatedSymbolStyle();
    SuperMap.Util.copy(res, obj);
    res.negativeStyle = SuperMap.REST.ServerStyle.fromJson(obj.negativeStyle);
    res.positiveStyle = SuperMap.REST.ServerStyle.fromJson(obj.positiveStyle);
    res.zeroStyle = SuperMap.REST.ServerStyle.fromJson(obj.zeroStyle);
    return res;
}
