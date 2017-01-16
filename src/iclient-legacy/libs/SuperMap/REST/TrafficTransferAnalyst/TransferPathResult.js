/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferPathResult
 * 交通换乘结果类。
 */
SuperMap.REST.TransferPathResult = SuperMap.Class({
    /** 
     * APIProperty: transferGuide
     * {<SuperMap.REST.TransferGuide>} 交通换乘导引对象，记录了从换乘分析起始站点到终止站点的交通换乘导引方案，通过
     * 此对象可以获取交通换乘导引对象中子项的个数，根据序号获取交通换乘导引的子项对象，导引总距离以及总花费等。     
     */
    transferGuide: null,
    
    /**
     * Constructor: SuperMap.REST.TransferPathResult
     * 交通换乘结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferGuides - {Array(Integer)} 交通换乘导引对象，记录了从换乘分析起始站点到终止站点的交通换乘导引方案。 
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
    
    CLASS_NAME: "SuperMap.REST.TransferPathResult"
});

/**
 * Function: SuperMap.REST.TransferPathResult.fromJson
 * 将交通换乘线路查询的返回结果转化为 TransferPathResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新交通换乘线路查询的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferPathResult>} 转化后的 TransferPathResult 对象。
 */
SuperMap.REST.TransferPathResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var res = SuperMap.REST.TransferGuide.fromJson(jsonObject);
    return new SuperMap.REST.TransferPathResult({
        transferGuide: res
    });
};
