/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.Cloud.TransferStopInfo
 *  公交站点信息类。该类用于描述公交站点的信息，包括所属的数据集、SmID、ID、名称以及别名。 
 */
SuperMap.Cloud.TransferStopInfo = SuperMap.Class({

    /** 
     * APIProperty: name
     * {String} 站点名称。
     */
    name: null,
    
    /** 
     * APIProperty: position
     * {<SuperMap.LonLat>} 站点坐标。
     */
	 
    position: null,
	
    /** 
     * APIProperty: walkDistance
     * {String} 到站点的步行距离。
     */
    walkDistance: null,
	
	
    /**
     * Constructor: SuperMap.Cloud.TransferStopInfo
     * 公交站点信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数
     *
     * Allowed options properties:
     * name - {String)} 站点名称
     * position - {<SuperMap.LonLat>} 站点坐标
     * walkDistance - {String)} 到站点的步行距离。。
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
        me.name = null;
        me.position = null;
        me.walkDistance = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.TransferStopInfo"
});

/**
 * Function: SuperMap.Cloud.TransferStopInfo.fromJson
 * 将要素集更新时表示的返回结果转化为 CloudTransferStopInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferStopInfo>} 转化后的 CloudTransferStopInfo 对象。
 */
SuperMap.Cloud.TransferStopInfo.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.Cloud.TransferStopInfo({
        name: jsonObject['name'],
		//positioin: new SuperMap.LonLat(jsonObject['x'],jsonObject['y']),
		positioin: new SuperMap.LonLat(jsonObject['position'].x, jsonObject['position'].y),
        walkDistance: jsonObject['walkDistance']
    });
};
