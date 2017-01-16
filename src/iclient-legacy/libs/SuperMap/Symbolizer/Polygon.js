/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Symbolizer.js
 */

/**
 * Class: SuperMap.Symbolizer.Polygon
 * 面要素的渲染样式。
 */
SuperMap.Symbolizer.Polygon = SuperMap.Class(SuperMap.Symbolizer, {

    /**
     * APIProperty: strokeColor
     * {String} 线边框颜色值。是一个RGB十六进制值 (如："#ff0000" 代表红色)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: strokeOpacity
     * {Number} 边框透明度 (0-1)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: strokeWidth
     * {Number} 边框像素宽。
     * 
     * 此处没有默认设置。 默认使用 SuperMap.Renderer.defaultRenderer。
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
     * 此处没有默认设置。 默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * APIProperty: fillColor
     * {String} RGB 十六进制填充色 (如： "#ff0000" 代表红色)。
     * 
     * 此处没有默认设置。  默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: fillOpacity
     * {Number} 填充透明度 (0-1)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * Constructor: SuperMap.Symbolizer.Polygon
     * 构造函数，创建一个用于面要素的渲染样式。
     *
     * Parameters:
     * config - {Object} 属性设置对象，其属性会被设置到当前Polygon样式对象上。样式的任何内部属性都可以通过构造函数来设置。
     *
     * Returns:
     * 新创建的面要素渲染样式。
     */
    initialize: function(config) {
        SuperMap.Symbolizer.prototype.initialize.apply(this, arguments);
    },
    
    CLASS_NAME: "SuperMap.Symbolizer.Polygon"
    
});

