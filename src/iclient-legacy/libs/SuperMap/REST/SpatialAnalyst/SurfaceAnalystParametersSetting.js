/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Geometry.js
 * @requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.REST.SurfaceAnalystParametersSetting
 * 表面分析参数设置类。
 * 通过该类可以设置表面分析提取等值线、提取等值面的一些参数，包括基准值、等值距、光滑度、光滑方法等。 
 */
SuperMap.REST.SurfaceAnalystParametersSetting = SuperMap.Class({

    /** 
     * APIProperty: clipRegion
     * {<SuperMap.Geometry>} 获取或设置裁剪面对象，如果不需要对操作结果进行裁剪，可以使用null值取代该参数。
     */
    clipRegion: null,
    
    /** 
     * APIProperty: datumValue
     * {Number} 获取或设置表面分析中提取等值线、提取等值面的基准值。
     * 基准值是作为一个生成等值线的初始起算值，并不一定是最小等值线的值。 例如，高程范围为 220 -1550 的 DEM 栅格数据，
     * 如果设基准值为0， 等值距为50，则提取等值线时，以基准值0为起点，等值距50为间隔提取等值线，
     * 因为给定高程的最小值是220，所以，在给定范围内提取等值线的最小高程是250。
     * 提取等值线的结果是：最小等值线值为250，最大等值线值为1550。
     */
    datumValue: 0,
    
    /** 
     * APIProperty: expectedZValues
     * {Array(Number)} 获取或设置期望分析结果的 Z 值集合。
     * Z 值集合存储一系列数值，该数值为待提取等值线的值。即仅高程值在Z值集合中的等值线会被提取。
     */
    expectedZValues: null,
    
    /** 
     * APIProperty: interval
     * {Number} 获取或设置等值距。等值距是两条等值线之间的间隔值。
     */
    interval: 0,
    
    /** 
     * APIProperty: resampleTolerance
     * {Number} 获取或设置重采样容限。
     * 容限值越大，采样结果数据越简化。当分析结果出现交叉时，可通过调整重采样容限为较小的值来处理。
     */
    resampleTolerance: 0,
    
    /** 
     * APIProperty: smoothMethod
     * {<SuperMap.REST.SmoothMethod>} 获取或设置光滑处理所使用的方法。
     */
    smoothMethod: SuperMap.REST.SmoothMethod.BSPLINE,
    
    /** 
     * APIProperty: smoothness
     * {Number} 获取或设置表面分析中等值线或等值面的边界线的光滑度。
     * 以为0-5为例，光滑度为0表示不进行光滑操作，值越大表示光滑度越高。
     * 随着光滑度的增加，提取的等值线越光滑.当然光滑度越大，
     * 计算所需的时间和占用的内存也就越大。而且，当等值距较小时，
     * 光滑度太高会出现等值线相交的问题。
     */
    smoothness: 0,
    
    /**
     * Constructor: SuperMap.REST.SurfaceAnalystParametersSetting
     * 表面分析参数设置类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * clipRegion - {<SuperMap.Geometry>} 获取或设置裁剪面对象，如果不需要对操作结果进行裁剪，可以使用null值取代该参数。
     * datumValue - {Number} 获取或设置表面分析中提取等值线、提取等值面的基准值。
     * expectedZValues - {Array(Number)} 获取或设置期望分析结果的 Z 值集合。
     * interval - {Number} 获取或设置等值距。等值距是两条等值线之间的间隔值。
     * resampleTolerance - {Number} 获取或设置重采样容限。
     * smoothMethod - {<SuperMap.REST.SmoothMethod>} 获取或设置光滑处理所使用的方法。
     * smoothness - {Number} 获取或设置表面分析中等值线或等值面的边界线的光滑度。
     */
    initialize: function(options) {        
        if (options) {
            var clipRg = options.clipRegion;
            if (clipRg) {
                if (clipRg instanceof SuperMap.Geometry && clipRg.components) {
                    options.clipRegion = SuperMap.REST.ServerGeometry.fromGeometry(clipRg);
                } else {
                    delete options.clipRegion;
                }
            }
            SuperMap.Util.extend(this, options);
        }        
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() { 
        var me = this;
        if (me.clipRegion) {
            me.clipRegion.destroy();
            me.clipRegion = null;
        }
        
        me.datumValue = null;
        me.expectedZValues = null;
        me.interval = null;
        me.resampleTolerance = null;
        me.smoothMethod = null;
        me.smoothness = null;
    },
    
    CLASS_NAME: "SuperMap.REST.SurfaceAnalystParametersSetting"
});