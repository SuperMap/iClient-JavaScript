/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/ServiceArea.js
 */

/**
 * Class: SuperMap.REST.FindServiceAreasResult
 * 服务区分析结果类。
 * 从该类中可以获取服务区服务范围，以及表示这些范围的图片。
 */
SuperMap.REST.FindServiceAreasResult = SuperMap.Class({
     
    /** 
     * APIProperty: serviceAreaList
     * {Array(<SuperMap.REST.ServiceArea>)} 服务区对象数组。 
     */
    serviceAreaList: null,
    
    /**
     * Constructor: SuperMap.REST.FindServiceAreasResult
     * 服务区分析结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * serviceAreaList - {Array(<SuperMap.REST.ServiceArea>)} 服务区对象数组。
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
        if (me.serviceAreaList) {
            for (var i=0,len=me.serviceAreaList.length; i<len; i++) {
                me.serviceAreaList[i].destroy();
            }
            me.serviceAreaList = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindServiceAreasResult"
});

/**
 * Function: SuperMap.REST.FindServiceAreasResult.fromJson
 * 将 JSON 对象转换为 FindServiceAreasResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的服务区分析分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindServiceAreasResult>} 转化后的 FindServiceAreasResult 对象。
 */
SuperMap.REST.FindServiceAreasResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindServiceAreasResult();
    if (jsonObject.serviceAreaList) {
        result.serviceAreaList = [];
        for (var i=0,serviceAreaList=jsonObject.serviceAreaList,len=serviceAreaList.length; i<len; i++) {
            result.serviceAreaList[i] = SuperMap.REST.ServiceArea.fromJson(serviceAreaList[i]);
        }
    }
    return result;
};