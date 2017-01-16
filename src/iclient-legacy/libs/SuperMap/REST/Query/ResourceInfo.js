/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.ResourceInfo
 * 结果资源信息类。  
 */
SuperMap.REST.ResourceInfo = SuperMap.Class({
    
    /**
     * APIProperty: succeed
     * {Boolean} 资源是否成功。  
     */
    succeed: null,
    
    /**
     * APIProperty: newResourceLocation
     * {String} 资源的 URL。  
     */
    newResourceLocation: null,
    
    /**
     * APIProperty: id
     * {String} 资源的 ID 。
     */    
    id: null,

    /**
     * Constructor: SuperMap.REST.ResourceInfo
     * 结果资源信息类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * succeed - {Boolean} 资源是否成功。  
     * newResourceLocation - {String} 资源的 URL。  
     * id - {String} 资源的 ID 。
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
        me.succeed = null;
        me.newResourceLocation = null;
        me.id = null;
    },
    
    CLASS_NAME: "SuperMap.REST.ResourceInfo"
});
/**
 * Function: SuperMap.REST.ResourceInfo.fromJson
 * 将 JSON 对象表示的结果资源信息类转化为 ResourceInfo 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的结果资源信息类。
 *
 * Returns:
 * {<SuperMap.REST.ResourceInfo>} 转化后的 ResourceInfo 对象。
 */
SuperMap.REST.ResourceInfo.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.ResourceInfo({
        succeed: jsonObject.succeed,
        newResourceLocation: jsonObject.newResourceLocation,
        id: jsonObject.newResourceID    
    });
};