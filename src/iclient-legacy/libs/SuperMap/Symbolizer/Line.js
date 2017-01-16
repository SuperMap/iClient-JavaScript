/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Symbolizer.js
 */

/**
 * Class: SuperMap.Symbolizer.Line
 * 渲染线要素的符号.
 */
SuperMap.Symbolizer.Line = SuperMap.Class(SuperMap.Symbolizer, {

    /**
     * APIProperty: strokeColor
     * {String} 线边框颜色值。是一个RGB十六进制值 (如："#ff0000" 代表红色)。 
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: strokeOpacity
     * {Number} 线边框透明度 (0-1)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: strokeWidth
     * {Number} 边框像素宽度。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: strokeLinecap
     * {String} 边框端点类型 ("butt", "round", or "square")。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * Property: strokeDashstyle
     * {String} 根据 SLD 指定的边框 dash 样式。注意SuperMap所支持的strokeDashstyle样式中
     *         ("dot", "dash", "dashdot", "longdash", "longdashdot", or "solid") 在SLD中无法使用, 但是大部分
     *          SLD 模式能在 SuperMap 中正确渲染。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * Constructor: SuperMap.Symbolizer.Line
     * 构造函数，创建一个用于线要素的渲染样式。
     *
     * Parameters:
     * config - {Object} 属性设置对象，其属性会被设置到当前Line样式对象上。样式的任何内部属性都可以通过构造函数来设置。
     *
     * Returns:
     * 新创建的线渲染样式。
     */
    initialize: function(config) {
        SuperMap.Symbolizer.prototype.initialize.apply(this, arguments);
    },
    
    CLASS_NAME: "SuperMap.Symbolizer.Line"
    
});

