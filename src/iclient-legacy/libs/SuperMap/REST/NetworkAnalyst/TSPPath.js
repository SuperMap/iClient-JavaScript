/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/REST/NetworkAnalyst/PathGuideItem.js
 * @requires SuperMap/REST/NetworkAnalyst/Route.js
 */

/**
 * Class: SuperMap.REST.TSPPath
 * 旅行商分析结果路径对象。
 * 该类包含了当前旅行方案的途径结点的顺序、弧段、该路径的路由、行驶引导、耗费等信息。
 */
 
SuperMap.REST.TSPPath = SuperMap.Class({
    /** 
     * APIProperty: edgeFeatures
     * {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的弧段要素的集合。 
     */
    edgeFeatures: null,

     /** 
     * APIProperty: edgeIDs
     * {Array(Integer)} 分析结果的途经弧段 ID 的集合。 
     */
    edgeIDs: null,

    /** 
     * APIProperty: nodeFeatures
     * {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的结点要素的集合。 
     * 数组中的各元素可能指向同一个Feature的实例，也可能为null。
     */
    nodeFeatures: null,

    /** 
     * APIProperty: nodeIDs
     * {Array(Integer)} 分析结果的途经结点 ID 的集合。 
     */
    nodeIDs: null,

    /** 
     * APIProperty: pathGuideItems
     * {Array(<SuperMap.REST.PathGuideItem>)} 分析结果对应的行驶导引子项集合。 
     */
    pathGuideItems: null,

    /** 
     * APIProperty: route
     * {<SuperMap.REST.Route>} 分析结果对应的路由对象。 
     */
    route: null,

    /** 
     * APIProperty: stopWeights
     * {Array(Number)} 分析结果经过站点的权值。 
     */
    stopWeights: null,
   
    /** 
     * APIProperty: stopIndexs
     * {Array(Number)} 以索引表示的旅行商路径途径结点的顺序。
     * 比如，在某次旅行商分析中，目标结点为 nodes = {1, 3, 5, 7}，分析得出的旅行商路径途径结点的顺序为 5, 3, 7,
     * 1，则 stopIndexes = {2, 1, 3, 0}。
     * 因为其经过的第一个节点为5，在 nodes 数组中的索引为 2，第二个途经点为3，在 nodes 数组中的索引为 1，
     * 以此类推得到 stopIndexes = {2, 1, 3, 0}。 
     */
    stopIndexes:null,
    
    /** 
     * APIProperty: weight
     * {Number} 路径的花费。 
     */
    weight: null,
    
    /**
     * Constructor: SuperMap.REST.Path
     * 旅行商分析结果路径对象构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * edgeFeatures - {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的弧段要素的集合。
     * edgeIDs - {Array(Integer)} 分析结果的途经弧段 ID 的集合。
     * nodeFeatures - {Array(<SuperMap.Feature.Vector>)} 分析结果的途经的结点要素的集合。
     * nodeIDs - {Array(Integer)} 分析结果的途经结点 ID 的集合。
     * pathGuideItems - {Array(<SuperMap.REST.PathGuideItem>)} 分析结果对应的行驶导引子项集合。
     * route - {<SuperMap.REST.Route>} 分析结果对应的路由对象。
     * stopWeights -  {Array(Number)} 分析结果经过站点的权值。
     * weight - {Number} 路径的花费。
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
        if (me.edgeFeatures) {
            for (var i=0,edgeFeatures=me.edgeFeatures,len=edgeFeatures.length; i<len; i++) {
                edgeFeatures[i].destroy();
            }
            me.edgeFeatures = null;
        }
        if (me.edgeIDs) {
            me.edgeIDs.length = 0;
            me.edgeIDs = null;
        }
        if (me.nodeFeatures) {
            for (var i=0,nodeFeatures=me.nodeFeatures,len=nodeFeatures.length; i<len; i++) {
                nodeFeatures[i].destroy();
            }
            me.nodeFeatures = null;
        }
        if (me.nodeIDs) {
            me.nodeIDs.length = 0;
            me.nodeIDs = null;
        }
        if (me.pathGuideItems) {
            for (var i=0,pathGuideItems=me.pathGuideItems,len=pathGuideItems.length; i<len; i++)
            {
                pathGuideItems[i].destroy();
            }
            me.pathGuideItems = null;
        }
        me.route = null;
        if (me.stopWeights) {
            me.stopWeights.length = 0;
            me.stopWeights = null;
        }
        
        if (me.stopIndexes) {
            me.stopIndexes.length = 0;
            me.stopIndexes = null;
        }
        me.weight = null;
    },
    
    CLASS_NAME: "SuperMap.REST.TSPPath"
                                                                            
});

/**
 * Function: SuperMap.REST.TSPPath.fromJson
 * 将 JSON 对象转换为 TSPPath 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的旅行商分析结果路径对象。 
 *
 * Returns:
 * {<SuperMap.REST.TSPPath>} 转化后的 TSPPath 对象。
 */
SuperMap.REST.TSPPath.fromJson = function(jsonObject){
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.TSPPath({
        edgeIDs: jsonObject.edgeIDs,
        nodeIDs: jsonObject.nodeIDs,
        stopWeights: jsonObject.stopWeights,
        stopIndexes: jsonObject.stopIndexes,
        weight: jsonObject.weight
    });
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

