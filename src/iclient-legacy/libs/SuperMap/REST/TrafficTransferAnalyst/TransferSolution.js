/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.TransferSolution
 * 交通换乘方案类。在一个换乘方案内的所有乘车路线中换乘次数是相同的。
 */
SuperMap.REST.TransferSolution = SuperMap.Class({
    /** 
     * APIProperty: transferCount
     * {Number} 换乘方案对应的换乘次数。
     */
    transferCount: null,

    /** 
     * APIProperty: linesItems
     * {Array(<SuperMap.REST.TransferLines>)} 换乘分段数组。
     */
    linesItems: null,
    
    /**
     * Constructor: SuperMap.REST.TransferSolution
     * 交通换乘方案类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferCount - {Number} 换乘方案对应的换乘次数。
     * linesItems - {Array(<SuperMap.REST.TransferLines>)} 换乘分段数组。
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
    
    CLASS_NAME: "SuperMap.REST.TransferSolution"
});

/**
 * Function: SuperMap.REST.TransferSolution.fromJson
 * 将换乘方案查询的返回结果转化为 TransferSolution 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新换乘方案查询的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferSolution>} 转化后的 TransferSolution 对象。
 */
SuperMap.REST.TransferSolution.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return ;
    }
    var transSolutions = jsonObject.linesItems,
        items = [],
        len = transSolutions ? transSolutions.length : 0,
        item;
    for(var i=0; i<len; i++) {
        item = SuperMap.REST.TransferLines.fromJson(transSolutions[i]);
        items.push(item);
    }
    
    return new SuperMap.REST.TransferSolution({
           transferCount: jsonObject['transferCount'],
           linesItems: items
    });
};
