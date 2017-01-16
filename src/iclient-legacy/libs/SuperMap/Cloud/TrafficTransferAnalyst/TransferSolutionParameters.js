/**
 *@requires SuperMap/REST.js
 */

/**
 * Class: SuperMap.Cloud.TransferSolutionParameters
 * 公交换乘方案查询参数类。 
 */
SuperMap.Cloud.TransferSolutionParameters = SuperMap.Class({
    /** 
     * APIProperty: startPosition
     * {<SuperMap.LonLat>}  公交换乘起点坐标。
     */
	startPosition:null,
	
	 /** 
     * APIProperty: endPosition
     * {<SuperMap.LonLat>}  公交换乘终点坐标。
     */
	endPosition:null,
	
	/** 
     * APIProperty: startName
     * {String} 公交换乘起点名称。
     */
	startName:null,
	
	/** 
     * APIProperty: endName
     * {Integer} 公交换乘终点名称。
     */
	endName:null,
	
	/** 
     * APIProperty: city
     * {String} 公交换乘服务查询范围，默认为null，可以设置为如"北京市"。
     */
	city:null,
	
	/** 
     * APIProperty: trafficType
     * {Integer} 公交换乘策略。0表示正常模式，1表示不走地铁。
     */
	trafficType: 0,
	
	/** 
     * APIProperty: resultCount
     * {Integer} 返回结果最大个数，默认 5。
     */
	resultCount: 5,

	/**
	 * APIProperty: to
	 * {Number} 输出结果坐标类型，默认值：910101。支持的坐标类型编码参考 http://www.supermapol.com/developer/webapi.html?title=convert 。
	 */
	to: 910101,
	
    
    /**
     * Constructor: SuperMap.Cloud.TransferSolutionParameters
     * 公交换乘方案查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * startPosition - {<SuperMap.LonLat>} 公交换乘起点坐标。
     * endPosition - {<SuperMap.LonLat>} 公交换乘终点坐标。
     * startName - {String} 公交换乘起点名称。
     * endName - {String} 公交换乘终点名称。
     * city - {String} 公交换乘服务查询范围，默认"北京市"。     
	 * trafficType - {Integer} 公交换乘策略。0表示正常模式，1表示不走地铁。     
	 * resultCount - {Integer} 返回结果最大个数，默认 5。     
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        SuperMap.Util.reset(this);
    },
	
	/**
     * Method: 转换成共请求使用的字符串
     * 释放资源，将引用资源的属性置空。
     */
    toQueryObject:function () {
		var params = {},
			me = this;
		SuperMap.Util.copyAttributes(params, me);
		params.startPosition = new SuperMap.Pixel(me.startPosition.lon, me.startPosition.lat);
		params.endPosition = new SuperMap.Pixel(me.endPosition.lon, me.endPosition.lat);
		return params;
    },
    
    CLASS_NAME:"SuperMap.Cloud.TransferSolutionParameters"
});
