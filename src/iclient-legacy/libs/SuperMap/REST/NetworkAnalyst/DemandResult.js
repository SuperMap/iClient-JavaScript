/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ServerFeature.js
 * @requires SuperMap/REST/NetworkAnalyst/SupplyCenter.js
 */

/**
 * Class: SuperMap.REST.DemandResult
 * 选址分区的需求结果类。
 * 该类用于返回需求结果的相关信息，包括需求结点或弧段的 ID、资源供给中心 ID、实际被分配的资源量以及需求结果是弧段还是结点。
 */
 
SuperMap.REST.DemandResult = SuperMap.Class(SuperMap.REST.ServerFeature, {
    /** 
     * APIProperty: actualResourceValue
     * {Number} 该需求点实际被分配的资源量。 
     */    
    actualResourceValue: null,
    
    /** 
     * APIProperty: demandID
     * {Integer} 需求结果对应的结点或弧段的 ID。当该类中 isEdge 字段为 true 时，该需求对象为弧段的 ID，
     * 当 isEdge 为 false 时，为需求结点的 ID。 
     */
    demandID: null,

     /** 
     * APIProperty: isEdge 
     * {Boolean} 判断需求结果对应的要素是弧段还是结点。
     * true 表明需求结果对应的要素是弧段，false 表明需求结果对应的要素是结点。 
     * 该学校能够接纳多少学生。
     */
    isEdge  : null,

    /** 
     * APIProperty: supplyCenter 
     * {<SuperMap.REST.SupplyCenter>} 资源供给中心类。 
     * 资源供给中心类，在资源分配和选址分区分析两个功能中使用。
     */
    supplyCenter  : null,

    /**
     * Constructor: SuperMap.REST.DemandResult
     * 资源供给中心类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * actualResourceValue - {Number} 该需求点实际被分配的资源量。
     * demandID - {Integer} 需求结果对应的结点或弧段的 ID。
     * isEdge - {Boolean} 判断需求结果对应的要素是弧段还是结点。
     * supplyCenter - {<SuperMap.REST.SupplyCenter>} 资源供给中心类。 
     */
    initialize: function(options) {
        SuperMap.REST.ServerFeature.prototype.initialize.apply(this, arguments);
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
        SuperMap.REST.ServerFeature.prototype.destroy.apply(me, arguments);
        me.actualResourceValue = null;
        me.demandID = null;
        me.isEdge = null;
        me.nodeID = null;
        me.SupplyCenter && me.SupplyCenter.destory();
    },
    
    CLASS_NAME: "SuperMap.REST.DemandResult"                                                                    
});

SuperMap.REST.DemandResult.fromJson = function(jsonObject){
    if(!jsonObject){return;}
    var result = new SuperMap.REST.DemandResult();
    result.actualResourceValue = jsonObject.actualResourceValue;
    result.demandID = jsonObject.demandID;
    result.isEdge = jsonObject.isEdge;    
    if(jsonObject.supplyCenter){
        result.supplyCenter = SuperMap.REST.SupplyCenter.fromJson(jsonObject.supplyCenter);
    }
    
    var fieldNames;
    if(jsonObject.fieldNames) {
        fieldNames = [];
        for(var i = 0; i < jsonObject.fieldNames.length; i++) {
            fieldNames.push(jsonObject.fieldNames[i]);
        }
    }
    result.fieldNames = fieldNames;
    var fieldValues;
    if(jsonObject.fieldValues) {
        fieldValues = [];
        for(var i = 0; i < jsonObject.fieldValues.length; i++) {
            fieldValues.push(jsonObject.fieldValues[i]);
        }
    }
    result.fieldValues = fieldValues;
    if(jsonObject.geometry) {
        result.geometry = SuperMap.REST.ServerGeometry.fromJson(jsonObject.geometry).toGeometry();
    }
    else {
        result.geometry = null;
    }    
    
    return result;
};

