/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferLines
 * 交通换乘分段类，记录了本分段中可乘坐的路线信息。
 */
SuperMap.REST.TransferLines = SuperMap.Class({
    /** 
     * APIProperty: lineItems
     * {Array(<SuperMap.REST.TransferLine>)} 本换乘分段内可乘车的路线集合。
     */
    lineItems: null,
    
    /**
     * Constructor: SuperMap.REST.TransferLines
     * 公交线路信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * lineItems - {Array(<SuperMap.REST.TransferLine>)} 本换乘分段内可乘车的路线集合。
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
    
    CLASS_NAME: "SuperMap.REST.TransferLines"
});

/**
 * Function: SuperMap.REST.TransferLines.fromJson
 * 将返回结果转化为 TransferLines 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferLines>} 转化后的 TransferLines 对象。
 */
SuperMap.REST.TransferLines.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return ;
    }
    var transLines = jsonObject.lineItems,
        items = [],
        len = transLines ? transLines.length : 0,
        item;
    for(var i=0; i<len; i++) {
        item = SuperMap.REST.TransferLine.fromJson(transLines[i]);
        items.push(item);        
    }
    return new SuperMap.REST.TransferLines({lineItems: items});
};
