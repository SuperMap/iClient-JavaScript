/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.TransferSolutionResult
 * 公交换乘方案查询结果类。
 */
SuperMap.Cloud.TransferSolutionResult = SuperMap.Class({
    
    /** 
     * APIProperty: solutionItems
     * {Array(<SuperMap.Cloud.TransferSolution>)} 返回的乘车方案集合。     
     */
    solutionItems: null,
    
    /**
     * Constructor: SuperMap.Cloud.TransferSolutionResult
     * 公交换乘结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * solutionItems - {Array(<SuperMap.Cloud.TransferSolution>)} 返回的乘车方案集合。 
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
    
    CLASS_NAME: "SuperMap.Cloud.TransferSolutionResult"
});

/**
 * Function: SuperMap.Cloud.TransferSolutionResult.fromJson
 * 将公交换乘方案查询的返回结果转化为 CloudTransferSolutionResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新公交换乘方案查询的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferSolutionResult>} 转化后的 CloudTransferSolutionResult 对象。
 */
SuperMap.Cloud.TransferSolutionResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var solutions = jsonObject.solutionItems,
        len = solutions ? solutions.length : 0,
        items = [];

    for(var i=0; i<len; i++) {
        items.push(SuperMap.Cloud.TransferSolution.fromJson(solutions[i]));
    }
    return new SuperMap.Cloud.TransferSolutionResult({
        solutionItems: items
    });
};
