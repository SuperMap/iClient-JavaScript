/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.POIInfo
 * 兴趣点信息类。
 * 记录地理兴趣点的地址，名称，坐标等信息。
 */
SuperMap.Cloud.POIInfo = SuperMap.Class({
    
    /** 
     * APIProperty: address
     * {String} 兴趣点地址描述。
     */
    address: null,

    /** 
     * APIProperty: name
     * {String} 兴趣点名称信息。
     */    
    name: null,
    
    /** 
     * APIProperty: location
     * {<SuperMap.LonLat>} 兴趣点坐标信息。
     */
    location: null,
    
    /** 
     * APIProperty: score
     * {Number)} 当前兴趣点与查询keyWords匹配分值。分值越高，表明兴趣点越准确。
     */
    score: null,
    
    /** 
     * APIProperty: telephone
     * {String} 兴趣点的电话/联系方式信息。
     */
    telephone: null,
	
	/** 
     * APIProperty: uid
     * {String} 兴趣点标记ID。
     */
	uid: null,
    
    /**
     * Constructor: SuperMap.Cloud.POIInfo
     * 类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * address - {String} 兴趣点地址描述。
     * name - {String} 兴趣点名称信息。
     * location - {SuperMap.LonLat} 兴趣点坐标信息。
     * score - {Number} 当前兴趣点与查询keyWords匹配分值。
     * telephone - {String} 兴趣点的电话/联系方式信息。 
	 * uid - {String} 兴趣点标记ID。 
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
        me.address = null;
        me.name = null;
        me.location = null;
		me.score = null;
		me.telephone = null;
		me.uid = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.POIInfo"
})

/**
 * Function: SuperMap.Cloud.POIInfo.fromJson
 * 将 JSON 对象表示的兴趣点信息转化为 POIInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的兴趣点信息。 
 *
 * Returns:
 * {<SuperMap.Cloud.POIInfo>} 转化后的 POIInfo 对象。
 */
SuperMap.Cloud.POIInfo.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var location = null;
    if (jsonObject.location) {
       location = new SuperMap.LonLat(jsonObject.location.x, jsonObject.location.y);
    }
    return new SuperMap.Cloud.POIInfo({
        address: jsonObject.address,
        name: jsonObject.name,
        location: location,
        score: jsonObject.score,
        telephone: jsonObject.telephone,
		uid: jsonObject.uid
    });
};