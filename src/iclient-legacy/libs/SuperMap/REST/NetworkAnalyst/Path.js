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
 * Class: SuperMap.REST.Path
 * 交通网络分析结果路径类。
 * 从该类中可以获取对交通网络分析结果路径的信息，包括当前路径经过的结点、弧段、该路径的路由、行驶引导、耗费等信息。
 */
SuperMap.REST.Path = SuperMap.Class({
     
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
     * APIProperty: weight
     * {Number} 路径的花费。 
     */
    weight: null,
    
    /**
     * Constructor: SuperMap.REST.Path
     * 交通网络分析结果路径类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
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
            for (var i=0,len=me.edgeFeatures.length; i<len; i++) {
                me.edgeFeatures[i].destroy();
            }
            me.edgeFeatures = null;
        }
        if (me.edgeIDs) {
            me.edgeIDs.length = 0;
            me.edgeIDs = null;
        }
        if (me.nodeFeatures) {
            for (var i=0,len=me.nodeFeatures.length; i<len; i++) {
                me.nodeFeatures[i].destroy();
            }
            me.nodeFeatures = null;
        }
        if (me.nodeIDs) {
            me.nodeIDs.length = 0;
            me.nodeIDs = null;
        }
        if (me.pathGuideItems) {
            for (var i=0,len=me.pathGuideItems.length; i<len; i++) {
                me.pathGuideItems[i].destroy();
            }
            me.pathGuideItems = null;
        }
        me.route = null;
        if (me.stopWeights) {
            me.stopWeights.length = 0;
            me.stopWeights = null;
        }
        me.weight = null;
    },
    
    CLASS_NAME: "SuperMap.REST.Path"
});

/**
 * Function: SuperMap.REST.Path.fromJson
 * 将 JSON 对象转换为 Path 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的交通网络分析结果路径。 
 *
 * Returns:
 * {<SuperMap.REST.Path>} 转化后的 Path 对象。
 */
SuperMap.REST.Path.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.Path({
        edgeIDs: jsonObject.edgeIDs,
        nodeIDs: jsonObject.nodeIDs,
        stopWeights: jsonObject.stopWeights,
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