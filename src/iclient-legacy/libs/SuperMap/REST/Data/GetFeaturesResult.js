/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/Feature.js
 * @requires SuperMap/REST/ResourceInfo.js
 * @requires SuperMap/REST/ServerType/ServerFeature.js
 */

/**
 * Class: SuperMap.REST.GetFeaturesResult
 * 数据集查询结果类。
 * 数据集查询结果类中包含了查询结果的矢量要素集合(Array(<SuperMap.Feature.Vector>))
 * 或查询结果资源（ResourceInfo)的相关信息。
 */
SuperMap.REST.GetFeaturesResult = SuperMap.Class({
    
    /** 
     * APIProperty: featureCount
     * {Integer} 符合查询条件的记录的数量。 
     */
    featureCount: null,

    /** 
     * APIProperty: featureUriList
     * {Array} 查询结果要素作为资源在服务器上的地址列表。
     */    
    featureUriList: null,
    
    /** 
     * APIProperty: features
     * {Array(<SuperMap.Feature.Vector>)} 数据集查询结果的矢量要素集合。 
     */
    features: null,
    
    /** 
     * APIProperty: resourceInfo
     * {<SuperMap.REST.ResourceInfo>} 查询结果资源。 
     */
    resourceInfo: null,
    
    /**
     * Constructor: SuperMap.REST.GetFeaturesResult
     * 数据集查询结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * featureCount - {Integer} 符合查询条件的记录的总数。
     * featureUriList - {Array} 查询结果要素作为资源在服务器上的地址列表。 
     * features - {Array(<SuperMap.Feature.Vector>)} 查询结果的矢量要素集合。
     * resourceInfo - {<SuperMap.REST.ResourceInfo>} 查询结果资源。 
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
        me.featureCount = null;
        if (me.featureUriList) {
            me.featureUriList.length = 0;
            me.featureUriList = null;
        }
         if (me.features) {
            for (var i=0, len=me.features.length; i<len; i++) {
                me.features[i].destroy();
            }
            me.features = null;
        }
        if (me.resourceInfo) {
            me.resourceInfo.destroy();
            me.resourceInfo = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.GetFeaturesResult"
});

/**
 * Function: SuperMap.REST.GetFeaturesResult.fromJson
 * 将 JSON 对象表示的查询结果转化为 GetFeaturesResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果。 
 *
 * Returns:
 * {<SuperMap.REST.GetFeaturesResult>} 转化后的 GetFeaturesResult 对象。
 */
SuperMap.REST.GetFeaturesResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var features = null;
    if(jsonObject.features){
        features = [];
        for (var i=0,fe=jsonObject.features,len=fe.length; i<len; i++) {
            var feature = SuperMap.REST.ServerFeature.fromJson(fe[i]).toFeature();
            features.push(feature);
        } 
    }
    
    return new SuperMap.REST.GetFeaturesResult({
        featureCount: jsonObject.featureCount,
        featureUriList: jsonObject.featureUriList,
        features: features,
        resourceInfo: jsonObject.resourceInfo
    });
};