/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.TransferSolution
 * 公交换乘方案类。在一个换乘方案内的所有乘车路线中换乘次数是相同的。
 */
SuperMap.Cloud.TransferSolution = SuperMap.Class({
    /** 
     * APIProperty: transferCount
     * {<SuperMap.Cloud.TransferStopInfo>} 换乘方案对应的换乘次数。
     */
    transferCount: null,
	
	/** 
     * APIProperty: start
     * {<SuperMap.Cloud.TransferStopInfo>} 换乘方案对应的换乘次数。
     */
    start: null,
	
	/** 
     * APIProperty: end
     * {<SuperMap.Cloud.TransferStopInfo>} 换乘方案对应的换乘次数。
     */
    end: null,

    /** 
     * APIProperty: linesItems
     * {Array(<SuperMap.Cloud.TransferLines>)} 换乘分段数组。
     */
    linesItems: null,
	
	 /** 
     * APIProperty: walkInfos
     * {Array(<SuperMap.Cloud.TransferLines>)} 换乘分段数组。
     */
    walkInfos: null,
    
    /**
     * Constructor: SuperMap.Cloud.TransferSolution
     * 公交换乘方案类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * transferCount - {Number} 换乘方案对应的换乘次数。
     * linesItems - {Array(<SuperMap.Cloud.TransferLines>)} 换乘分段数组。
	 * start - {<SuperMap.Cloud.TransferStopInfo>} 换乘方案对应的换乘次数。
	 * end - {<SuperMap.Cloud.TransferStopInfo>} 换乘方案对应的换乘次数。
     * walkInfos - {Array(<SuperMap.Cloud.TransferLines>)} 
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
    
    CLASS_NAME: "SuperMap.Cloud.TransferSolution"
});

/**
 * Function: SuperMap.Cloud.TransferSolution.fromJson
 * 将换乘方案查询的返回结果转化为 CloudTransferSolution 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新换乘方案查询的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferSolution>} 转化后的 CloudTransferSolution 对象。
 */
SuperMap.Cloud.TransferSolution.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return ;
    }
    var srcLinesItems = jsonObject.linesItems,
		srcWalkInfos = jsonObject.walkInfos,
        tarLinesItems = [],
		tarWalkInfos = [],
        len = srcLinesItems ? srcLinesItems.length : 0,
		len2 = srcLinesItems ? srcLinesItems.length : 0,
        lItem,
		wItem;
		
    for(var i=0; i<len; i++) {
        lItem = SuperMap.Cloud.TransferLines.fromJson(srcLinesItems[i]);
        tarLinesItems.push(lItem);
    }
	
	for(var i=0; i<len2; i++) {
		wItem = SuperMap.Cloud.TransferWalkInfo.fromJson(srcWalkInfos[i]);
        tarWalkInfos.push(wItem);
    }
    
    return new SuperMap.Cloud.TransferSolution({
           transferCount: jsonObject['transferCount'],
           linesItems: tarLinesItems,
		   walkInfos: tarWalkInfos,
		   start: SuperMap.Cloud.TransferStopInfo.fromJson(jsonObject['start']),
		   end: SuperMap.Cloud.TransferStopInfo.fromJson(jsonObject['end'])
    });
};
