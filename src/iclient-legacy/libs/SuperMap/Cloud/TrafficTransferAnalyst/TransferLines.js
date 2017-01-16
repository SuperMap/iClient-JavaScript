/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.TransferLines
 * 公交换乘分段类，记录了本分段中可乘坐的路线信息。在同一分段中的起始站点坐标基本一致（相隔很近）
 */
SuperMap.Cloud.TransferLines = SuperMap.Class({
    /** 
     * APIProperty: lineItems
     * {Array(<SuperMap.Cloud.TransferLine>)} 本换乘分段内可乘车的路线集合。
     */
    lineItems: null,
    
    /**
     * Constructor: SuperMap.Cloud.TransferLines
     * 公交线路信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * lineItems - {Array(<SuperMap.Cloud.TransferLine>)} 本换乘分段内可乘车的路线集合。
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
    
    CLASS_NAME: "SuperMap.Cloud.TransferLines"
});

/**
 * Function: SuperMap.Cloud.TransferLines.fromJson
 * 将返回结果转化为 CloudTransferLines 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferLines>} 转化后的 CloudTransferLines 对象。
 */
SuperMap.Cloud.TransferLines.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return ;
    }
    var transLines = jsonObject.lineItems,
        items = [],
        len = transLines ? transLines.length : 0,
        item;
    for(var i=0; i<len; i++) {
        item = SuperMap.Cloud.TransferLine.fromJson(transLines[i]);
        items.push(item);        
    }
    return new SuperMap.Cloud.TransferLines({lineItems: items});
};
