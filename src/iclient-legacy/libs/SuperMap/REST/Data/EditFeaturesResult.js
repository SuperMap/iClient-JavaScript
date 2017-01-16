/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.EditFeaturesResult
 * 数据集服务中添加、更新、删除结果类。
 */
SuperMap.REST.EditFeaturesResult = SuperMap.Class({
    /** 
     * APIProperty: IDs
     * {Array(Integer)} 要删除资源的 ID 数组。 
     */
    IDs: null,
    /** 
     * APIProperty: resourceInfo
     * {<SuperMap.REST.ResourceInfo>} 编辑资源后的返回结果。 
     */
    resourceInfo: null,
    
    /**
     * Constructor: SuperMap.REST.EditFeaturesResult
     * 数据集编辑结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * IDs - {Array(Integer)} 要删除资源的 ID 数组。  
     * resourceInfo - {<SuperMap.REST.ResourceInfo>} 编辑资源后的返回结果。 
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
        me.IDs = null;
        if (me.resourceInfo) {
            me.resourceInfo.destroy();
            me.resourceInfo = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.EditFeaturesResult"
});

/**
 * Function: SuperMap.REST.EditFeaturesResult.fromJson
 * 将要素集更新时表示的返回结果转化为 EditFeaturesResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} 新创建要素的返回结果。 
 *
 * Returns:
 * {<SuperMap.REST.EditFeaturesResult>} 转化后的 EditFeaturesResult 对象。
 */
SuperMap.REST.EditFeaturesResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    if(jsonObject instanceof Array) {
        return new SuperMap.REST.EditFeaturesResult({
            IDs: jsonObject
        });
    } else {
        return new SuperMap.REST.EditFeaturesResult({
            resourceInfo: SuperMap.REST.ResourceInfo.fromJson(jsonObject)
        });
    }
};