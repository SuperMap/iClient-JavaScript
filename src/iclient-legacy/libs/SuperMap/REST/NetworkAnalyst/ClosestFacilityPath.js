/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.ClosestFacilityPath
 * 最近设施对象类。
 * 该类包含了分析得到的最近设施点、设施点与事件点间的弧段、结点等信息。
 *
 * Inherits from:
 *  - <SuperMap.REST.Path> 
 */
SuperMap.REST.ClosestFacilityPath = SuperMap.Class(SuperMap.REST.Path, {    
    /** 
     * APIProperty: facility
     * {<SuperMap.Geometry.Point>/Integer} 最近设施点。
     * 当设置最近设施分析参数时，如果指定设施点时使用的是 ID 号，则返回结果也为 ID 号；如果使用的是坐标值，则返回结果也为坐标值。 
     */
    facility: null,

     /** 
     * APIProperty: facilityIndex
     * {Integer} 该路径所到达的最近设施点在候选设施点序列中的索引。 
     */
    facilityIndex: null,

    /**
     * Constructor: SuperMap.REST.ClosestFacilityPath
     * 最近设施对象类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * edgeFeatures - {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的弧段要素的集合。
     * edgeIDs - {Array(Integer)} 分析结果的途经弧段 ID 的集合。
     * facility - {<SuperMap.Geometry.Point>/Integer} 最近设施点。
     * facilityIndex - {Integer} 该路径所到达的最近设施点在候选设施点序列中的索引。
     * nodeFeatures - {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的结点要素的集合。
     * nodeIDs - {Array(Integer)} 分析结果的途经结点 ID 的集合。
     * pathGuideItems - {Array(<SuperMap.REST.PathGuideItem>)} 分析结果对应的行驶导引子项集合。
     * route - {<SuperMap.REST.Route>} 分析结果对应的路由对象。
     * stopWeights -  {Array(Number)} 分析结果经过站点的权值。
     * weight - {Number} 路径的花费。
     */
    initialize: function(options) {
        SuperMap.REST.Path.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        SuperMap.REST.Path.prototype.destroy.apply(this, arguments);
        var me = this;    
        me.facility = null;
        me.facilityIndex = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ClosestFacilityPath"
});

/**
 * Function: SuperMap.REST.ClosestFacilityPath.fromJson
 * 将 JSON 对象转换为 ClosestFacilityPath 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的最近设施对象。 
 *
 * Returns:
 * {<SuperMap.REST.ClosestFacilityPath>} 转化后的 ClosestFacilityPath 对象。
 */
SuperMap.REST.ClosestFacilityPath.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.ClosestFacilityPath({
        edgeIDs: jsonObject.edgeIDs,
        nodeIDs: jsonObject.nodeIDs,
        stopWeights: jsonObject.stopWeights,
        weight: jsonObject.weight,
        facilityIndex: jsonObject.facilityIndex
    });
    if (jsonObject.facility && jsonObject.facility.x) {
		result.facility = SuperMap.Geometry.Point(jsonObject.facility.x, jsonObject.facility.y);
    } else {
        result.facility = jsonObject.facility;
    }
    if (jsonObject.edgeFeatures) {
        result.edgeFeatures = [];
        for (var i=0,edgeFeatures=jsonObject.edgeFeatures,len=edgeFeatures.length; i<len; i++) {
            result.edgeFeatures[i] = SuperMap.REST.ServerFeature.fromJson(edgeFeatures[i]).toFeature();
        }    
    }
    if (jsonObject.nodeFeatures) {
        result.nodeFeatures = [];
        for (var i=0,nodeFeatures=jsonObject.nodeFeatures,len=nodeFeatures.length; i<len; i++) {
            result.nodeFeatures[i] = SuperMap.REST.ServerFeature.fromJson(nodeFeatures[i]).toFeature();
        }
    }
    if (jsonObject.pathGuideItems) {
        result.pathGuideItems = [];
        for (var i=0,pathGuideItems=jsonObject.pathGuideItems,len=pathGuideItems.length; i<len; i++) {
            result.pathGuideItems[i] = SuperMap.REST.PathGuideItem.fromJson(pathGuideItems[i]);
        }
    }
    result.route = SuperMap.REST.Route.fromJson(jsonObject.route);
    
    return result;
};