/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferGuideItem
 * 交通换乘导引子项类。交通换乘导引记录了从换乘分析起始站点到终止站点需要换乘或者步行的线路，
 * 其中每一换乘或步行线路就是一个交通换乘导引子项。利用该类可以返回交通换乘导引对象的子项信息，
 * 诸如交通换乘导引子项的起始站点信息、终止站点信息、公交线路信息等。 
 */
SuperMap.REST.TransferGuideItem = SuperMap.Class({
    /** 
     * APIProperty: lineType
     * {Number} 线路类型，-1代表步行，0代表公交车，1代表地铁，2代表轻轨。
     */
    lineType: null,
    /** 
     * APIProperty: distance
     * {Number} 返回该 TransferGuideItem 对象所表示的一段换乘或者步行线路的距离。
     */
    distance: null,

    /** 
     * APIProperty: endIndex
     * {Integer} 返回该 TransferGuideItem 对象所表示的一段换乘线路的终止站点在其完整的公交线路中处在第几个站点位置。
     */
    endIndex: null,
    
    /** 
     * APIProperty: startIndex
     * {Integer} 返回该 TransferGuideItem 对象所表示的一段换乘线路的起始站点在其完整的公交线路中处在第几个站点位置。
     */
    startIndex: null,
    
    /** 
     * APIProperty: isWalking
     * {Boolean} 返回该 TransferGuideItem 对象所表示是步行线路还是乘车线路。
     */
    isWalking: null,
    
    /** 
     * APIProperty: route
     * {<SuperMap.Geometry>} 返回该 TransferGuideItem 对象所表示的一段换乘线路信息。
     */
    route: null,
    
    /** 
     * APIProperty: passStopCount
     * {Integer} 返回该 TransferGuideItem 对象所表示的一段换乘线路所经过的站点个数。
     */
    passStopCount: null,
    
    /** 
     * APIProperty: lineName
     * {String} 该 TransferGuideItem 对象所表示的一段换乘线路名称。
     */
    lineName: null,
    
    /** 
     * APIProperty: startPosition
     * {Object} 返回该 TransferGuideItem 对象所表示的一段换乘或者步行线路的起始站点的位置坐标。
     */
    startPosition: null,
    
    /** 
     * APIProperty: endPosition
     * {Object} 该 TransferGuideItem 对象所表示的一段换乘或者步行线路的终止站点位置坐标。
     */
    endPosition: null,
    
    /** 
     * APIProperty: startStopName
     * {String} 返回该 TransferGuideItem 对象所表示的一段换乘线路的起始站点的名称。
     */
    startStopName: null,
    
    /** 
     * APIProperty: endStopName
     * {String} 返回该 TransferGuideItem 对象所表示的一段换乘线路的终点站点的名称。
     */
    endStopName: null,
    
    /**
     * Constructor: SuperMap.REST.TransferGuideItem
     * 交通换乘导引子项类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * lineType - {Number} 线路类型,0代表公交车，1代表地铁，2代表轻轨。
     * distance - {Number} 返回该 TransferGuideItem 对象所表示的一段换乘或者步行线路的距离。 
     * endIndex - {Integer} 返回该 TransferGuideItem 对象所表示的一段换乘线路的终止站点
     * 在其完整的公交线路中处在第几个站点位置。
     * isWalking - {Boolean} 返回该 TransferGuideItem 对象所表示是步行线路还是乘车线路。 
     * route - {<SuperMap.Geometry>} 返回该 TransferGuideItem 对象所表示的一段换乘线路信息。
     * passStopCount - {Integer} 返回该 TransferGuideItem 对象所表示的一段换乘线路所经过的站点个数。
     * startIndex - {Integer} 返回该 TransferGuideItem  
     * 对象所表示的一段换乘线路的起始站点在其完整的公交线路中处在第几个站点位置。  
     * lineName - {String} 该 TransferGuideItem 对象所表示的一段换乘线路名称。  
     * startPosition - {Object} 该 TransferGuideItem 对象所表示的一段换乘或者步行线路的起始站点位置坐标。  
     * endPosition - {Object} 该 TransferGuideItem 对象所表示的一段换乘或者步行线路的终止站点位置坐标。  
     * startStopName - {String} 返回该 TransferGuideItem 对象所表示的一段换乘线路的起始站点的名称。 
     * endStopName - {String} 返回该 TransferGuideItem 对象所表示的一段换乘线路的终点站点的名称。 
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
    
    CLASS_NAME: "SuperMap.REST.TransferGuideItem"
});

/**
 * Function: SuperMap.REST.TransferGuideItem.fromJson
 * 将返回结果转化为 TransferGuideItem 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.TransferGuideItem>} 转化后的 TransferGuideItem 对象。
 */
SuperMap.REST.TransferGuideItem.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    
    var route = jsonObject.route,
        points = [], p;
    if(route && route.points && route.points.length) {
        for(var i in route.points) {
            p = route.points[i];
            points.push(new SuperMap.Geometry.Point(p.x,p.y));
        }
    }
    return new SuperMap.REST.TransferGuideItem({
        lineType: jsonObject["lineType"],
        distance: jsonObject['distance'],
        endStopName: jsonObject['endStopName'],
        startStopName: jsonObject['startStopName'],
        isWalking: jsonObject['isWalking'],
        lineName: jsonObject['lineName'],
        passStopCount: jsonObject['passStopCount'],
        startIndex: jsonObject['startIndex'],
        endIndex:jsonObject['endIndex'],
        startPosition: jsonObject['startPosition'],
        endPosition: jsonObject["endPosition"],
        route: new SuperMap.Geometry.LineString(points)
    });
};
