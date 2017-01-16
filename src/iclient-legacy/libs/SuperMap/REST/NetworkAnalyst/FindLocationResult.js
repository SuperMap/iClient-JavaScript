/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/DemandResult.js
 * @requires SuperMap/REST/NetworkAnalyst/SupplyResult.js
 */

/**
 * Class: SuperMap.REST.FindLocationResult
 * 选址分区分析服务结果数据类。
 * 类包含了选址分区得到的需求结果对象数组、资源供给中心数组等信息。
 */
SuperMap.REST.FindLocationResult = SuperMap.Class({
     
    /** 
     * APIProperty: demandResults
     * {Array(<SuperMap.REST.DemandResult>)} 需求结果对象数组。 
     */
    demandResults: null,
     
    /** 
     * APIProperty: supplyResults
     * {Array(<SuperMap.REST.SupplyResult>)} 资源供给结果对象数组。 
     */
    supplyResults: null,
    
    /**
     * Constructor: SuperMap.REST.FindLocationResult
     * 选址分区分析服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * demandResults - {Array(<SuperMap.REST.DemandResult>)} 需求结果对象数组。
     * supplyResults - {Array(<SuperMap.REST.SupplyResult>)} 资源供给结果对象数组。
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
        if (me.demandResults) {
            for (var i=0,len=me.demandResults.length; i<len; i++) {
                me.demandResults[i].destroy();
            }
            me.demandResults = null;
        }
        if (me.supplyResults) {
            for (var i=0,len=me.supplyResults.length; i<len; i++) {
                me.supplyResults[i].destroy();
            }
            me.supplyResults = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindLocationResult"
});

/**
 * Function: SuperMap.REST.FindLocationResult.fromJson
 * 将 JSON 对象转换为 FindLocationResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的服务区分析分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindLocationResult>} 转化后的 FindLocationResult 对象。
 */
SuperMap.REST.FindLocationResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindLocationResult();
    if (jsonObject.demandResults) {
        result.demandResults = [];
        for (var i=0,demandResults=jsonObject.demandResults,len=demandResults.length; i<len; i++) {
            result.demandResults[i] = SuperMap.REST.DemandResult.fromJson(demandResults[i]);
        }
    }
    if (jsonObject.supplyResults) {
        result.supplyResults = [];
        for (var i=0,supplyResults=jsonObject.supplyResults,len=supplyResults.length; i<len; i++) {
            result.supplyResults[i] = SuperMap.REST.SupplyResult.fromJson(supplyResults[i]);
        }
    }
    return result;
};