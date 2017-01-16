/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerTextStyle.js
 * @requires SuperMap/REST/Theme/LabelMixedTextStyle.js
 */

/**
 * Class: SuperMap.REST.ThemeLabelText
 * 标签中文本风格类。
 * 通过该类可以设置标签中的文本字体大小和显示风格。
 */
SuperMap.REST.ThemeLabelText = SuperMap.Class({
    
    /** 
     * APIProperty: maxTextHeight
     * {Number} 标签中文本的最大高度。当标签文本不固定大小时，即 ServerTextStyle.sizeFixed = false 有效，
     * 当放大后的文本高度超过最大高度之后就不再放大。高度单位为0.1毫米。高度单位为0.1毫米。默认为 0 毫米。  
     */
    maxTextHeight: 0,
    
    /** 
     * APIProperty: maxTextWidth
     * {Number} 标签中文本的最大宽度。当标签文本不固定大小时，即 ServerTextStyle.sizeFixed = false 有效，
     * 当放大后的文本宽度超过最大高度之后就不再放大。宽度单位为0.1毫米。默认为0毫米。 
     */
    maxTextWidth: 0,
    
    /** 
     * APIProperty: minTextHeight
     * {Number} 标签中文本的最小高度。当标签文本不固定大小时，即 ServerTextStyle.sizeFixed = false 有效，
     * 当缩小后的文本高度小于最小高度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。  
     */
    minTextHeight: 0,
    
    /** 
     * APIProperty: minTextWidth
     * {Number} 标签中文本的最小宽度。当标签文本不固定大小时，即 ServerTextStyle.sizeFixed = false 有效，
     * 当缩小后的文本宽度小于最小宽度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。 
     */
    minTextWidth: 0,

    /** 
     * APIProperty: uniformStyle
     * {<SuperMap.REST.ServerTextStyle>} 统一文本风格。当标签专题图子项的个数大于等于1时，
     * uniformStyle 不起作用，各标签的风格使用子项中设置的风格。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
     * ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。  
     */
    uniformStyle: null,
    
    /** 
     * APIProperty: uniformMixedStyle
     * {<SuperMap.REST.LabelMixedTextStyle>} 标签专题图统一的文本复合风格。通过该类可以使同一个标
     * 签中的文字使用多种风格显示。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
     * ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。  
     */
     uniformMixedStyle: null,
    
    /**
     * Constructor: SuperMap.REST.ThemeLabelText 
     * 标签中文本风格类构造函数，用于创建 ThemeLabelText 类的新实例。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * maxTextHeight - {Number} 标签中文本的最大高度。
     * maxTextWidth - {Number} 标签中文本的最大宽度。
     * minTextHeight - {Number} 标签中文本的最小高度。
     * minTextWidth - {Number} 标签中文本的最小宽度。
     * uniformStyle - {<SuperMap.REST.ServerTextStyle>} 统一文本风格。
     * uniformMixedStyle - {<SuperMap.REST.LabelMixedTextStyle>} 标签专题图统一的文本复合风格。
     */
    initialize: function(options) {
        var me = this;
        me.uniformStyle = new SuperMap.REST.ServerTextStyle();
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
        me.maxTextHeight = null;
        me.maxTextWidth = null;
        me.minTextHeight = null;
        me.minTextWidth = null;
        if (me.uniformStyle) {
            me.uniformStyle.destroy();
            me.uniformStyle = null;
        }
        if (me.uniformMixedStyle) {
            me.uniformMixedStyle.destroy();
            me.uniformMixedStyle = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.ThemeLabelText"
});
SuperMap.REST.ThemeLabelText.fromObj = function(obj) {
    if(!obj) return;
    var res = new SuperMap.REST.ThemeLabelText();
    SuperMap.Util.copy(res, obj);
    res.uniformStyle = SuperMap.REST.ServerTextStyle.fromObj(obj.uniformStyle);
    res.uniformMixedStyle = SuperMap.REST.LabelMixedTextStyle.fromObj(obj.uniformMixedStyle);
    return res;
};
