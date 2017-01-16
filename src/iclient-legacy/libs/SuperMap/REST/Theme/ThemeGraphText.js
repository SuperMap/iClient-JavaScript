/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/ServerTextStyle.js
 */
 
/**
 * Class: SuperMap.REST.ThemeGraphText
 * 统计图文字标注风格类。
 * 通过该类可以设置统计图表中文字可见性以及标注风格。
 */
SuperMap.REST.ThemeGraphText = SuperMap.Class({
    
    /** 
     * APIProperty: graphTextDisplayed
     * {Boolean} 是否显示统计图上的文字标注。默认为 false，即不显示。
     */
    graphTextDisplayed: false,
    
    /** 
     * APIProperty: graphTextFormat
     * {<SuperMap.REST.ThemeGraphTextFormat>} 统计专题图文本显示格式。
     * 文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。默认为 SuperMap.REST.ThemeGraphTextFormat.CAPTION。
     */
    graphTextFormat: SuperMap.REST.ThemeGraphTextFormat.CAPTION,
    
    /** 
     * APIProperty: graphTextStyle
     * {<SuperMap.REST.ServerTextStyle>}统计图上的文字标注风格。
     */    
    graphTextStyle: null,
    /**
     * Constructor: SuperMap.REST.ThemeGraphText 
     * 统计图文字标注风格类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * graphTextDisplayed - {Boolean} 是否显示统计图上的文字标注。
     * graphTextFormat - {<SuperMap.REST.ThemeGraphTextFormat>} 统计专题图文本显示格式。
     * graphTextStyle - {<SuperMap.REST.ServerTextStyle>} 统计图上的文字标注风格。
     */
    initialize: function(options) {
        var me = this;
        me.graphTextStyle = new SuperMap.REST.ServerTextStyle();
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
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeGraphText"
});
SuperMap.REST.ThemeGraphText.fromObj = function(obj) {
    var res = new SuperMap.REST.ThemeGraphText();
    SuperMap.Util.copy(res, obj);
    res.graphTextStyle = SuperMap.REST.ServerTextStyle.fromObj(obj.graphTextStyle);
    return res;

}
