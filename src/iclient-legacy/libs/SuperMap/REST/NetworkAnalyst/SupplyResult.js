/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerFeature.js
 * @requires SuperMap/REST/NetworkAnalyst/SupplyCenterType.js
 */

/**
 * Class: SuperMap.REST.SupplyResult
 * 资源供给中心类。
 * 类提供了资源供给的结果，包括资源供给中心的类型、ID、最大阻值、资源量等。
 */
SuperMap.REST.SupplyResult = SuperMap.Class(SuperMap.REST.ServerFeature, {
     
    /** 
     * APIProperty: actualResourceValue
     * {Number} 资源供给中心实际提供的资源量。 
     */
    actualResourceValue: null,

     /** 
     * APIProperty: averageWeight
     * {Number} 从本资源供给中心到每个需求点的平均耗费（阻值）。 
     */
    averageWeight: null,

    /** 
     * APIProperty: demandCount
     * {Integer} 所服务的需求点（弧段）的数量。 
     */
    demandCount: null,

    /** 
     * APIProperty: maxWeight
     * {Number} 各个需求对象到资源供给中心的最大耗费（阻值）。
     * 如果需求对象（如弧段或结点）到此中心的花费大于此值，则在分析时该对象不被该资源供给中心考虑。
     */
    maxWeight: null,

    /** 
     * APIProperty: nodeID
     * {Integer} 资源供给中心点的结点 ID。
     */
    nodeID: null, 

    /** 
     * APIProperty: resourceValue
     * {Number} 资源供给中心的资源量。
     * 资源量是表示中心点能提供的最大服务量或商品数量。
     */
    resourceValue: null,

    /** 
     * APIProperty: totalWeights
     * {Number} 从本资源供给中心到所有需求点的总耗费（阻值）。 
     */
    totalWeights: null,
    
    /** 
     * APIProperty: type
     * {<SuperMap.REST.SupplyCenterType>} 资源供给中心点的类型常量。
     * 资源供给中心点的类型包括非中心，固定中心和可选中心。 
     */
    type: null,
    
    /**
     * Constructor: SuperMap.REST.SupplyResult
     * 资源供给中心类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * actualResourceValue - {Number} 资源供给中心实际提供的资源量。 
     * averageWeight - {Number} 从本资源供给中心到每个需求点的平均耗费（阻值）。 
     * demandCount - {Integer} 所服务的需求点（弧段）的数量。 
     * maxWeight - {Number} 各个需求对象到资源供给中心的最大耗费（阻值）。
     * nodeID - {Integer} 资源供给中心点的结点 ID。
     * resourceValue -  {Number} 资源供给中心的资源量。
     * totalWeights -  {Number} 从本资源供给中心到所有需求点的总耗费（阻值）。 
     * type -  {<SuperMap.REST.SupplyCenterType>} 资源供给中心点的类型常量。    
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
        SuperMap.REST.ServerFeature.prototype.destroy.call(this, arguments);
        me.actualResourceValue = null;
        me.averageWeight = null;
        me.demandCount = null;
        me.maxWeight = null;
        me.nodeID = null;
        me.resourceValue = null;
        me.totalWeights = null;
        me.type = null;
    },
    
    CLASS_NAME: "SuperMap.REST.SupplyResult"
});

/**
 * Function: SuperMap.REST.SupplyResult.fromJson
 * 将 JSON 对象转换为 SupplyResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的服务区对象。 
 *
 * Returns:
 * {<SuperMap.REST.SupplyResult>} 转化后的 SupplyResult 对象。
 */
SuperMap.REST.SupplyResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.SupplyResult({
        actualResourceValue: jsonObject.actualResourceValue,
        averageWeight: jsonObject.averageWeight,
        demandCount: jsonObject.demandCount,
        maxWeight: jsonObject.maxWeight,
        nodeID: jsonObject.nodeID,
        resourceValue: jsonObject.resourceValue,
        totalWeights: jsonObject.totalWeights,
        type: jsonObject.type
    });
    if(jsonObject.fieldNames) {
        result.fieldNames = [];
        for(var i=0,fieldNames=jsonObject.fieldNames,len=fieldNames.length; i<len; i++) {
            result.fieldNames.push(fieldNames[i]);
        }
    }
    if(jsonObject.fieldValues) {
        result.fieldValues = [];
        for(var i=0,fieldValues=jsonObject.fieldValues,len=fieldValues.length; i<len; i++) {
            result.fieldValues.push(fieldValues[i]);
        }
    }
    jsonObject.geometry ? (result.geometry = SuperMap.REST.ServerGeometry.fromJson(jsonObject.geometry).toGeometry()) : (result.geometry = null);
    return result;
};