/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 */

/**
 * Class: SuperMap.REST.GeoRelationAnalystParameters
 * 空间关系分析服务参数类。
 * 使用该类可以为空间关系分析服务提供所需的参数信息。
 */
SuperMap.REST.GeoRelationAnalystParameters = SuperMap.Class({

    /** 
     * APIProperty: dataset
     * {<String>} 源数据集名称。
     */
    dataset: null,
    
    /** 
     * APIProperty: sourceFilter 
     * {<SuperMap.REST.FilterParameter>} 空间关系分析中的源数据集查询参数。仅 ids、attributeFilter 和 fields 字段有效。
     */
    sourceFilter: null,
    
    /** 
     * APIProperty: referenceFilter
     * {<SuperMap.REST.FilterParameter>} 空间关系分析中的参考数据集查询参数。仅 name, ids, attributeFilter
     * 和 fields 字段有效。
     */
    referenceFilter: null,
    
    /** 
     * APIProperty: spatialRelationType
     * {<SuperMap.REST.SpatialRelationType>} 指定的空间关系类型。
     */
    spatialRelationType: null, 
    
    /** 
     * APIProperty: isBorderInside
     * {Boolean} 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
     */
    isBorderInside: null,
    
    /** 
     * APIProperty: returnFeature
     * {Boolean} 是否返回Feature信息。
     */
    returnFeature: null,
    
    /** 
     * APIProperty: returnGeoRelatedOnly
     * {Boolean} 是否仅返回满足指定空间关系的空间对象，默认为 True。
     */
    returnGeoRelatedOnly: null,
    
    /** 
     * APIProperty: startRecord
     * {Integer} 分析结果起始记录位置，默认为0。
     */
    startRecord: 0,
    
    /** 
     * Property: expectCount
     * {Integer} 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。
     */
    expectCount: 500,
    
    /**
     * Constructor: SuperMap.REST.GeoRelationAnalystParameters 
     * 叠加分析参数基类构造函数构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * sourceFilter - {<SuperMap.REST.FilterParameter>} 空间关系分析中的参考数据集查询参数。仅 name, ids, 
     *      attributeFilter 和 fields 字段有效。
     * referenceFilter - {<SuperMap.REST.FilterParameter>} 空间关系分析中的参考数据集查询参数。仅 name, ids, 
     *      attributeFilter 和 fields 字段有效。
     * isBorderInside - {Boolean} 边界处理方式，即位于面边线上的点是否被面包含。此参数仅用于空间关系为包含或被包含的情况。
     * returnFeature - {Boolean} 是否返回Feature信息。
     * returnGeoRelatedOnly - {Boolean} 仅返回满足指定空间关系的空间对象，默认为 True。
     * startRecord - {Integer} 分析结果起始记录位置，默认为0。
     * expectCount - {Integer} 空间关系分析期望返回结果记录数，默认为500条，如果实际不足500条结果则返回所有分析结果。
     */
    initialize: function (options) {
        var me = this;
        if (options) {
            SuperMap.Util.extend(me, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        var me = this;
        if(me.sourceFilter){
            me.sourceFilter.destroy();
        }
        me.sourceFilter = null;
        
        if(me.referenceFilter){
            me.referenceFilter.destroy();
        }
        me.referenceFilter = null;
        
        me.dataset = null;
        me.spatialRelationType = null;
        me.isBorderInside = null;
        me.returnFeature = null;
        me.returnGeoRelatedOnly = null;
        me.startRecord = null;
        me.expectCount = null;
    },

    CLASS_NAME: "SuperMap.REST.GeoRelationAnalystParameters"
}); 