/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.Cloud.TransferWalkInfo
 *  公交站点信息类。该类用于描述公交站点的信息，包括所属的数据集、SmID、ID、名称以及别名。 
 */
SuperMap.Cloud.TransferWalkInfo = SuperMap.Class({

    /** 
     * APIProperty: distance
     * {Number} 步行距离。
     */
    distance: null,
    
    /** 
     * APIProperty: line
     * {<SuperMap.Geometry.LineString>} 步行线路。
     */
	 
    line: null,
	
    /**
     * Constructor: SuperMap.Cloud.TransferWalkInfo
     * 公交站点信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数
     *
     * Allowed options properties:
     * line - {<SuperMap.Geometry.LineString>} 步行线路。
     * distance - {String)} 步行距离
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
        if(me.line){
			me.line.destroy();
			me = null;
		}
        me.distance = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.TransferWalkInfo"
});

/**
 * Function: SuperMap.Cloud.TransferWalkInfo.fromJson
 * 将要素集更新时表示的返回结果转化为 CloudTransferWalkInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferWalkInfo>} 转化后的 CloudTransferWalkInfo 对象。
 */
SuperMap.Cloud.TransferWalkInfo.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.Cloud.TransferWalkInfo({
        distance: jsonObject['distance'],
		line: SuperMap.REST.ServerGeometry.fromJson(jsonObject['line']).toGeometry()
    });
};
