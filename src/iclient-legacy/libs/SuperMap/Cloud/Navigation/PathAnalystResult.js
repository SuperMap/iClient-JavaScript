/**
 * Class: SuperMap.Cloud.PathAnalystResult
 * 路径导航分析结果类。包含了路径长度，途径点，导引信息等。
 * 
 */
SuperMap.Cloud.PathAnalystResult = SuperMap.Class({
	/** 
     * APIProperty: pathLength
     * {Number} 路径导航分析结果总长度。
     */
	 
	pathLength:0,
	
	/** 
     * APIProperty: pathPoints
     * {Array(<SuperMap.REST.Geometry.Point>)} 路径导航分析结果中的路线途径点集合。
     */
	pathPoints:null,
	
	/** 
     * APIProperty: pathInfos
     * {Array(<SuperMap.Cloud.PathInfo>)} 路径导航分析结果中的导航引导信息集合。
     */
	pathInfos:null,

    /**
     * APIProperty: pathTime
     * {Number} 导航花费时间。单位：秒。
     */
    pathTime: null,
	
	/**
     * Constructor: SuperMap.Cloud.PathAnalystResult
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * pathLength - {Number} 路径导航分析结果总长度。
     * pathPoints - {Array(<SuperMap.REST.Geometry.Point>)} 路径导航分析结果中的路线途径点集合。
     * pathInfos - {Array(<SuperMap.Cloud.PathInfo>)} 路径导航分析结果中的导航引导信息集合。
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
        me.pathLength = null;
        me.pathPoints = null;
        me.pathInfos = null;
        me.pathTime = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.PathAnalystResult"
	
});

/**
 * Function: SuperMap.Cloud.PathAnalystResult.fromJson
 * 将 JSON 对象表示的路径导航分析结果转化为 PathAnalystResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的路径导航分析结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.PathAnalystResult>} 转化后的 PathAnalystResult 对象。
 */
SuperMap.Cloud.PathAnalystResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return null;
    }
	var path, 
		pathPoints = [],
		pathInfos = [];
	
	for (var i = 0; i < jsonObject.pathPoints.length; i++) {
		pathPoints.push(new SuperMap.Geometry.Point(jsonObject.pathPoints[i].x, jsonObject.pathPoints[i].y));
	}
	
	for (var j = 0; j < jsonObject.pathInfos.length; j++) {
		pathInfos.push(SuperMap.Cloud.PathInfo.fromJson(jsonObject.pathInfos[i]));
	}
	//内部不封装成geometry对象
	//path = new SuperMap.Geometry.LineString(pointList);		
    return new SuperMap.Cloud.PathAnalystResult({
        pathPoints: pathPoints,
        pathInfos: pathInfos,
        pathLength: jsonObject.pathLength,
        pathTime: jsonObject.pathTime
    });
};