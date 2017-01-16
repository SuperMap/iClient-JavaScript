/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/DataReturnOption.js
 */

/**
 * Class: SuperMap.REST.GenerateSpatialDataParameters
 * 动态分段操作参数类。 
 * 通过该类可以为动态分段提供参数信息。  
 */
SuperMap.REST.GenerateSpatialDataParameters = SuperMap.Class({

    /** 
     * APIProperty: routeTable
     * {Sting} 路由数据集。 
     */
    routeTable: null,

    /** 
     * APIProperty: routeIDField
     * {Sting} 路由数据集的标识字段。 
     */ 
    routeIDField: null,

    /** 
     * APIProperty: eventTable
     * {Sting} 用于生成空间数据的事件表名。 
     */
    eventTable: null,

    /** 
     * APIProperty: eventRouteIDField
     * {Sting} 用于生成空间数据的事件表的路由标识字段。 
     */   
    eventRouteIDField: null,

    /** 
     * APIProperty: measureField
     * {Sting} 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义 
     */   
    measureField: null,

    /** 
     * APIProperty: measureStartField
     * {Sting} 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。 
     */    
    measureStartField: null,
 
    /** 
     * APIProperty: measureEndField
     * {Sting} 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。 
     */    
    measureEndField: null,

    /** 
     * APIProperty: measureOffsetField
     * {Sting} 刻度偏移量字段。 
     */    
    measureOffsetField: null,

    /** 
     * APIProperty: errorInfoField
     * {Sting} 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。 
     */    
    errorInfoField: null,

    /**
     * APIProperty: retainedFields
     * {Array(String)} 欲保留到结果空间数据中的字段集合（系统字段除外）。
     *  生成空间数据时，无论是否指定保留字段，路由 ID 字段、刻度偏移量字段、刻度值字段（点事件为刻度字段，线事件是起始和终止刻度字段）都会保留到结果空间数据中；
     *  如果没有指定 retainedFields 参数或者retainedFields 参数数组长度为0，则返回所有用户字段。
     */
    retainedFields: null,

    /**
     * APIProperty: dataReturnOption
     * {<SuperMap.REST.DataReturnOption>} 设置数据返回的选项。
     */    
    dataReturnOption: null,
    
    /**
     * Constructor: SuperMap.REST.SurfaceAnalystParameters
     * 表面分析提取操作参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * routeTable - {Sting} 路由数据集。
     * routeIDField - {Sting} 路由数据集的标识字段。
     * eventTable - {Sting} 用于生成空间数据的事件表名。
     * eventRouteIDField - {Sting} 用于生成空间数据的事件表的路由标识字段。
     * measureField - {Sting} 用于生成空间数据的事件表的刻度字段，只有当事件为点事件的时候该属性才有意义
     * measureStartField - {Sting} 用于生成空间数据的事件表的起始刻度字段，只有当事件为线事件的时候该属性才有意义。
     * measureEndField - {Sting} 用于生成空间数据的事件表的终止刻度字段，只有当事件为线事件的时候该属性才有意义。
     * measureOffsetField - {Sting} 刻度偏移量字段。
     * errorInfoField - {Sting} 错误信息字段，直接写入原事件表，用于描述事件未能生成对应的点或线时的错误信息。
     * retainedFields - {Array(String)} 欲保留到结果空间数据中的字段集合（系统字段除外）。
     * dataReturnOption - {<SuperMap.REST.DataReturnOption>} 设置数据返回的最大记录。
     */
    initialize: function(options) {
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
        if(me.routeTable) {
            me.routeTable = null;
        }
        me.routeIDField = null;
        me.eventTable = null;
        me.eventRouteIDField = null;
        me.measureField = null;
        me.measureStartField = null;
        me.measureEndField = null;
        me.measureOffsetField = null;
        me.errorInfoField = null;
        if(me.dataReturnOption) {
            me.dataReturnOption.destroy();
            me.dataReturnOption = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.GenerateSpatialDataParameters"
});
