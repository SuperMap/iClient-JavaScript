/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Geometry.js
 * @requires SuperMap/REST/NetworkAnalyst/Route.js
 */

/**
 * Class: SuperMap.REST.ServiceArea
 * 服务区对象类。
 * 从该类中可以获取某个服务中心点服务的区域，以及构成这个区域的结点、弧段等信息。
 */
SuperMap.REST.ServiceArea = SuperMap.Class({
     
    /** 
     * APIProperty: edgeFeatures
     * {Array(SuperMap.Feature.Vector)} 分析结果的途经的弧段要素的集合。 
     */
    edgeFeatures: null,

     /** 
     * APIProperty: edgeIDs
     * {Array(Integer)} 分析结果的途经弧段 ID 的集合。 
     */
    edgeIDs: null,

    /** 
     * APIProperty: nodeFeatures
     * {Array(SuperMap.Feature.Vector)} 分析结果的途经的结点要素的集合。 
     * 数组中的各元素可能指向同一个Feature的实例，也可能为null。
     */
    nodeFeatures: null,

    /** 
     * APIProperty: nodeIDs
     * {Array(Integer)} 分析结果的途经结点 ID 的集合。 
     */
    nodeIDs: null,

    /** 
     * APIProperty: routes
     * {Array(<SuperMap.REST.Route>)} 分析结果对应的路由对象数组。 
     */
    routes: null,

    /** 
     * APIProperty: serviceRegion
     * {SuperMap.Geometry} 中心点的服务范围，面对象，Geometry 类型。
     */
    serviceRegion: null,

    /**
     * Constructor: SuperMap.REST.ServiceArea
     * 服务区对象类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * edgeFeatures - {Array(SuperMap.Feature.Vector)} 分析结果的途经的弧段要素的集合。
     * edgeIDs - {Array(Integer)} 分析结果的途经弧段 ID 的集合。
     * nodeFeatures - {Array(SuperMap.Feature.Vector)} 分析结果的途经的结点要素的集合。
     * nodeIDs - {Array(Integer)} 分析结果的途经结点 ID 的集合。
     * routes - {Array(<SuperMap.REST.Route>)}} 分析结果对应的路由对象数组。
     * serviceRegion -  {SuperMap.Geometry} 中心点的服务范围。
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
        if (me.routes) {
            for (var i=0,len=me.routes.length; i<len; i++) {
                me.routes[i].destroy();
            }
            me.routes = null;
        }
        me.serviceRegion && me.serviceRegion.destroy();
    },
    
    CLASS_NAME: "SuperMap.REST.ServiceArea"
});

/**
 * Function: SuperMap.REST.ServiceArea.fromJson
 * 将 JSON 对象转换为 ServiceArea 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的服务区对象。 
 *
 * Returns:
 * {<SuperMap.REST.ServiceArea>} 转化后的 ServiceArea 对象。
 */
SuperMap.REST.ServiceArea.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.ServiceArea({
        edgeIDs: jsonObject.edgeIDs,
        nodeIDs: jsonObject.nodeIDs
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
    if (jsonObject.routes) {
        result.routes = [];
        for (var i=0,routes=jsonObject.routes,len=routes.length; i<len; i++) {
            result.routes[i] = SuperMap.REST.Route.fromJson(routes[i]);
        }
    }
    jsonObject.serviceRegion && (result.serviceRegion = SuperMap.REST.ServerGeometry.fromJson(jsonObject.serviceRegion).toGeometry());
    return result;
};