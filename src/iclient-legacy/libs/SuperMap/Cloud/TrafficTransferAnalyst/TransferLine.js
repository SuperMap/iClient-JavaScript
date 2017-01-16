/**
 * Class: SuperMap.Cloud.TransferLine
 * 换乘路线信息类。 
 */
SuperMap.Cloud.TransferLine = SuperMap.Class({

    /** 
     * APIProperty: lineName
     * {String} 乘车路线名称。
     */
    lineName: null,
	
	/** 
     * APIProperty: upPosition
     * {<SuperMap.LonLat>} 上车站点坐标。
     */
	upPosition: null,
	
    /** 
     * APIProperty: startStopIndex
     * {Number} 上车站点在本公交路线中的索引。 
     */
    startStopIndex: null,
    
    /** 
     * APIProperty: startStopName
     * {String} 上车站点名称。
     */
    startStopName: null,
	
	/** 
     * APIProperty: downPosition
     * {<SuperMap.LonLat>} 下车站点坐标。
     */
	downPosition: null,
	
    /** 
     * APIProperty: endStopIndex
     * {Number} 下车站点在本公交路线中的索引。 
     */
    endStopIndex: null,
    
    /** 
     * APIProperty: endStopName
     * {String} 下车站点名称。 
     */
    endStopName: null,
	
	/** 
     * APIProperty: direct
     * {String} 乘车方向。 
     */
	direct: null,
	
	/** 
     * APIProperty: passStopCount
     * {Integer} 乘车经过的站点数。 
     */
	passStopCount: null,
	
	/** 
     * APIProperty: distance
     * {Number} 乘车分段距离。 
     */
	distance: null,
	
	/** 
     * APIProperty: LineType
     * {<SuperMap.Cloud.TrafficTransferLineType>} 当前线路类型，BUS-公交/SUBWAY-地铁/WALK-步行。 
     */
	lineType:null,
	
	/** 
     * APIProperty: LineTime
     * {String} 当前公交（或地铁）的早晚运营时间。 
     */
	lineTime: null,
	
	/** 
     * APIProperty: route
     * {<SuperMap.Geometry.LineString>} 当前线路的几何对象。 
     */
	route: null,
	
	/** 
     * APIProperty: walkDistance
     * {Number} 从起始点到公交（地铁）起点的步行距离。 
     */
	walkDistance:null,
	
	/** 
     * APIProperty: time
     * {Number} 乘坐当前线路需要的时间。 
     */
	time: null,
	
	/** 
     * APIProperty: lineID
     * {Number} 当前线路ID。 
     */
	lineID: null,
	
    
    /**
     * Constructor: SuperMap.Cloud.TransferLine
     * 换乘路线信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * lineName - {String} 乘车路线名称。
     * startStopIndex - {Number} 上车站点在本公交路线中的索引。
     * startStopName - {String} 上车站点名称。
     * upPosition - {<SuperMap.LonLat>} 上车站点坐标。
     * endStopIndex - {Number} 下车站点在本公交路线中的索引。
     * endStopName - {String} 下车站点名称。
     * downPosition - {<SuperMap.LonLat>} 下车站点坐标。
	 * passStopCount - {<SuperMap.LonLat>} 乘车经过的站点数。。
     * distance - {Number} 乘车分段距离。
	 * lineType - {<SuperMap.Cloud.TrafficTransferLineType>} 下当前线路类型，BUS-公交/SUBWAY-地铁/WALK-步行。
     * lineTime - {String} 当前公交（或地铁）的早晚运营时间。
	 * route - {<SuperMap.Geometry.LineString>}  当前线路的几何对象。
	 * walkDistance - {Number} 从起始点到公交（地铁）起点的步行距离。 
	 * time - {Number} 乘坐当前线路需要的时间。  
	 * lineID - {Number} 当前线路ID。   
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
    
    CLASS_NAME: "SuperMap.Cloud.TransferLine"
});

/**
 * Function: SuperMap.Cloud.TransferLine.fromJson
 * 将返回结果转化为 CloudTransferLine 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新的返回结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.TransferLine>} 转化后的 CloudTransferLine 对象。
 */
SuperMap.Cloud.TransferLine.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return ;
    }
    return new SuperMap.Cloud.TransferLine({
           lineName: jsonObject['lineName'],
		   startStopIndex: jsonObject['startStopIndex'],
		   startStopName: jsonObject['startStopName'],
		   upPosition: new SuperMap.LonLat(jsonObject['upPosition'].x,jsonObject['upPosition'].y),
		   endStopIndex: jsonObject['endStopIndex'],
		   endStopName: jsonObject['endStopName'],
		   downPosition: new SuperMap.LonLat(jsonObject['downPosition'].x,jsonObject['downPosition'].y),
		   passStopCount: jsonObject['passStopCount'],
		   distance: jsonObject['distance'],
		   lineType: jsonObject['lineType'],
		   lineTime: jsonObject['lineTime'],
		   route: SuperMap.REST.ServerGeometry.fromJson(jsonObject['route']).toGeometry(),
		   walkDistance: jsonObject['walkDistance'],
		   time: jsonObject['time'],
		   lineID: jsonObject['lineID']
    });
};
