/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.GeometrySurfaceAnalystParameters
 * 几何对象表面分析参数类。
 * 该类对几何对象表面分析所用到的参数进行设置。
 *
 * Inherits from:
 *  - <SuperMap.REST.SurfaceAnalystParameters> 
 */
SuperMap.REST.GeometrySurfaceAnalystParameters = SuperMap.Class(SuperMap.REST.SurfaceAnalystParameters, {

    /** 
     * APIProperty: points
     * {Array(<SuperMap.Geometry.Point>)} 获取或设置用于表面分析的坐标点数组。  
     */
    points: null,
    
    /** 
     * APIProperty: zValues
     * {Array(Number)} 获取或设置用于提取操作的值。提取等值线时，将使用该数组中的值，
     * 对几何对象中的坐标点数组进行插值分析，得到栅格数据集（中间结果），接着从栅格数据集提取等值线。
     */
    zValues: null,
    
    /**
     * Constructor: SuperMap.REST.GeometrySurfaceAnalystParameters
     * 几何对象表面分析参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * points - {Array(<SuperMap.Geometry.Point>)} 表面分析的坐标点数组。
     * zValues - {Array(Number)} 表面分析的坐标点的 Z 值数组。
     * resolution - {Number} 获取或设置指定中间结果（栅格数据集）的分辨率。
     * resultSetting - {<SuperMap.REST.DataReturnOption>} 结果返回设置类。
     * extractParameter - {<SuperMap.REST.SurfaceAnalystParametersSetting>} 获取或设置表面分析参数。
     * surfaceAnalystMethod - {<SuperMap.REST.SurfaceAnalystMethod>} 获取或设置表面分析的提取方法，提取等值线和提取等值面。
     */
    initialize: function(options) {
        SuperMap.REST.SurfaceAnalystParameters.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.REST.SurfaceAnalystParameters.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.points) {
            for (var i=0,points=me.points,len=points.length; i<len; i++) {
                points[i].destroy();
            }
            me.points = null;
        }
        me.zValues = null;        
    },
    
    CLASS_NAME: "SuperMap.REST.GeometrySurfaceAnalystParameters"
});