/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Symbolizer.js
 */

/**
 * Class: SuperMap.Symbolizer.Raster
 * 栅格图像的渲染样式。
 */
SuperMap.Symbolizer.Raster = SuperMap.Class(SuperMap.Symbolizer, {
    
    /**
     * Constructor: SuperMap.Symbolizer.Raster
     * 构造函数，创建一个用于栅格图像的渲染样式。
     *
     * Parameters:
     * config - {Object} 属性设置对象，其属性会被设置到当前Raster样式对象上。样式的任何内部属性都可以通过构造函数来设置。
     *
     * Returns:
     * 新创建的栅格图像渲染样式。
     */
    initialize: function(config) {
        SuperMap.Symbolizer.prototype.initialize.apply(this, arguments);
    },
    
    CLASS_NAME: "SuperMap.Symbolizer.Raster"
    
});
