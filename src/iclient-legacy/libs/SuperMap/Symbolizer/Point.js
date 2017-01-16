/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Symbolizer.js
 */

/**
 * Class: SuperMap.Symbolizer.Point
 * 点要素的渲染样式。
 */
SuperMap.Symbolizer.Point = SuperMap.Class(SuperMap.Symbolizer, {
    
    /**
     * APIProperty: strokeColor
     * {String} 线边框颜色。一个十六进制的RGB值(如："#ff0000")。
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
     * APIProperty: fillColor
     * {String} 十六进制RGB填充色 (如："#ff0000", 表示红色)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: fillOpacity
     * {Number} 填充透明度 (0-1)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * APIProperty: pointRadius
     * {Number} 像素点半径.
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * APIProperty: externalGraphic
     * {String} 用于渲染点的外部图形url。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicWidth
     * {Number} 指定外部图形的宽度。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicHeight
     * {Number} 指定外部图形的高度。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicOpacity
     * {Number} 外部图形的透明度 (0-1)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicXOffset
     * {Number} 外部图形相对于x坐标的像素偏移量。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicYOffset
     * {Number} 外部图形相对于y坐标的像素偏移量。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */

    /**
     * APIProperty: rotation
     * {Number} 基于中心点顺时针旋转图形 (或者是任何指定x坐标、y坐标的偏移量的中心点)。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * APIProperty: graphicName
     * {String} 渲染点时使用的风格名称。支持的值包含 "circle", "square", "star", "x", "cross", and "triangle"。
     * 
     * 此处没有默认设置。默认使用 SuperMap.Renderer.defaultRenderer。
     */
    
    /**
     * Constructor: SuperMap.Symbolizer.Point
     * 构造函数，创建一个用于点要素的渲染样式。
     *
     * Parameters:
     * config - {Object} 属性设置对象，其属性会被设置到当前Point样式对象上。样式的任何内部属性都可以通过构造函数来设置。
     *
     * Returns:
     * 新创建的点要素渲染样式。
     */
    initialize: function(config) {
        SuperMap.Symbolizer.prototype.initialize.apply(this, arguments);
    },
    
    CLASS_NAME: "SuperMap.Symbolizer.Point"
    
});

