/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferSolutionResult
 * 交通换乘方案查询结果类。
 */
SuperMap.REST.TransferSolutionResult = SuperMap.Class({
    /** 
     * APIProperty: transferGuide
     * {<SuperMap.REST.TransferGuide>} 默认的乘车方案及相关信息。     
     */
    transferGuide: null,
    
    /** 
     * APIProperty: solutionItems
     * {Array(<SuperMap.REST.TransferSolution>)} 返回的乘车方案集合。     
     */
    solutionItems: null,
    
    /**
     * Constructor: SuperMap.REST.TransferSolutionResult
     * 交通换乘结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferGuide -  {<SuperMap.REST.TransferGuide>} 默认的乘车方案及相关信息。 
     * solutionItems - {Array(<SuperMap.REST.TransferSolution>)} 返回的乘车方案集合。 
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
    
    CLASS_NAME: "SuperMap.REST.TransferSolutionResult"
});

/**
 * Function: SuperMap.REST.TransferSolutionResult.fromJson
 * 将交通换乘方案查询的返回结果转化为 TransferSolutionResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新交通换乘方案查询的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferSolutionResult>} 转化后的 TransferSolutionResult 对象。
 */
SuperMap.REST.TransferSolutionResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var transferGuide = jsonObject.defaultGuide,
        solutions = jsonObject.solutionItems,
        len = solutions ? solutions.length : 0,
        items = [];

    for(var i=0; i<len; i++) {
        items.push(SuperMap.REST.TransferSolution.fromJson(solutions[i]));
    }
    return new SuperMap.REST.TransferSolutionResult({
        transferGuide: SuperMap.REST.TransferGuide.fromJson(transferGuide),
        solutionItems: items
    });
};
