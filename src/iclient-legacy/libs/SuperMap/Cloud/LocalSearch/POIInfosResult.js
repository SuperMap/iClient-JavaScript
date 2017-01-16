/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.POIInfosResult
 * 兴趣点搜索服务结果类。
 */
SuperMap.Cloud.POIInfosResult = SuperMap.Class({
    
    /** 
     * APIProperty: totalHits
     * {Integer} 兴趣点搜索服务查询到的记录总数。 
     */
    totalHits: null,

    /** 
     * APIProperty: poiInfos
     * {Array(<SuperMap.Cloud.POIInfo>)} 服务返回的具体兴趣点信息集合。
     */    
    poiInfos: null,
    
    /**
     * Constructor: SuperMap.Cloud.POIInfosResult
     * 兴趣点搜索服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * totalHits - {Integer} 趣点搜索服务查询到的记录总数。 
     * poiInfos - {Array(<SuperMap.Cloud.POIInfo>)} 服务返回的具体兴趣点信息集合。
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
        me.totalHits = null;
        if (me.poiInfos) {
            for (var i=0,poiInfos=me.poiInfos,len=poiInfos.length; i<len; i++) {
                poiInfos[i].destroy();
            }
            me.poiInfos = null;
        }
    },
    
    CLASS_NAME: "SuperMap.Cloud.POIInfosResult"
})

/**
 * Function: SuperMap.Cloud.POIInfosResult.fromJson
 * 将 JSON 对象表示的兴趣点搜索服务结果转化为 POIInfosResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的兴趣点搜索服务结果。 
 *
 * Returns:
 * {<SuperMap.Cloud.POIInfosResult>} 转化后的 POIInfosResult 对象。
 */
SuperMap.Cloud.POIInfosResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var poiInfos = null;
    if (jsonObject.poiInfos) {
        poiInfos = [];
        for( var i=0,pois = jsonObject.poiInfos,len=pois.length; i<len; i++) {
            poiInfos.push(SuperMap.Cloud.POIInfo.fromJson(pois[i]));
        }
    }
    return new SuperMap.Cloud.POIInfosResult({
        totalHits: jsonObject.totalHits,
        poiInfos: poiInfos
    });
};