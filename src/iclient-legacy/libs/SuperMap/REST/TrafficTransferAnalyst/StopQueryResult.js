/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.StopQueryResult
 * 站点查询结果类。
 */
SuperMap.REST.StopQueryResult = SuperMap.Class({
    /** 
     * APIProperty: transferStopInfos
     * {Array(<SuperMap.REST.TransferStopInfo>)}  公交站点信息，包括所属的数据集、SmID、ID、名称以及别名。    
     */
    transferStopInfos: null,
    
    /**
     * Constructor: SuperMap.REST.StopQueryResult
     * 站点查询结果类。构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferStopInfos - {Array(<SuperMap.REST.TransferStopInfo>)} 公交站点信息，
     *包括所属的数据集、SmID、ID、名称以及别名。 
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.Util.reset(this);
    },
    
    CLASS_NAME: "SuperMap.REST.StopQueryResult"
});

/**
 * Function: SuperMap.REST.StopQueryResult.fromJson
 * 将要素集更新时表示的返回结果转化为 StopQueryResult 对象。 
 *
 * Parameters:
 * jsonArray - {Array} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.StopQueryResult>} 转化后的 StopQueryResult 对象。
 */
SuperMap.REST.StopQueryResult.fromJson = function(jsonArray) {
    if (!jsonArray) {
        return;
    }
    
    var stopInfos = [];
    for(var i=0,len=jsonArray.length; i<len; i++) {
        var stopInfo = jsonArray[i];
        stopInfos.push(SuperMap.REST.TransferStopInfo.fromJson(jsonArray[i]));
    }
    return new SuperMap.REST.StopQueryResult({
        transferStopInfos: stopInfos
    });
};
