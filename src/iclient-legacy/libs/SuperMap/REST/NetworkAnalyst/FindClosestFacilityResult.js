/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/ClosestFacilityPath.js
 */

/**
 * Class: SuperMap.REST.FindClosestFacilityResult
 * 最近设施分析服务结果类。
 * 该类包含了分析得到的最近设施点、设施点与事件点间的弧段、结点等信息。
 */
SuperMap.REST.FindClosestFacilityResult = SuperMap.Class({
     
    /** 
     * APIProperty: facilityPathList
     * {Array(<SuperMap.REST.ClosestFacilityPath>)} 最近设施结果对象数组。 
     * 该数组中记录了每个设施点的信息以及该设施点与事件点间的通达路径信息等。期望返回几个最近设施点就有几个最近设施结果对象 ClosestFacilityPath。
     * 数组中的第 i 个元素对应第 i 个设施点的相关信息。
     */
    facilityPathList: null,
    
    /**
     * Constructor: SuperMap.REST.FindClosestFacilityResult
     * 最近设施分析服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * pathList - {Array(<SuperMap.REST.ClosestFacilityPath>)} 最近设施结果对象数组。
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
        if (me.facilityPathList) {
            for (var i=0,facilityPathList=me.facilityPathList,len=facilityPathList.length; i<len; i++) {
                facilityPathList[i].destroy();
            }
            me.facilityPathList = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindClosestFacilityResult"
});

/**
 * Function: SuperMap.REST.FindClosestFacilityResult.fromJson
 * 将 JSON 对象转换为 FindClosestFacilityResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的最近设施分析服务结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindClosestFacilityResult>} 转化后的 FindClosestFacilityResult 对象。
 */
SuperMap.REST.FindClosestFacilityResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindClosestFacilityResult();
    if (jsonObject.facilityPathList) {
        result.facilityPathList = [];
        for (var i=0,facilityPathList=jsonObject.facilityPathList,len=facilityPathList.length; i<len; i++) {
            result.facilityPathList[i] = SuperMap.REST.ClosestFacilityPath.fromJson(facilityPathList[i]);
        }
    }
    return result;
};