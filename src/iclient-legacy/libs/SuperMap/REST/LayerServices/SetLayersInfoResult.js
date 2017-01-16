/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.SetLayersInfoResult
 * 设置图层信息服务结果类。存储图层设置服务返回的结果信息，创建临时图层和编辑临时图层的结果都由
 * 此类封装。编辑临时图层返回的结果中只有 succeed 属性有效。
 * 
 */
SuperMap.REST.SetLayersInfoResult = SuperMap.Class({
    
    /** 
     * APIProperty: succeed
     * {Boolean} 图层信息服务结果成功标记。
     */
    succeed: null,

    /** 
     * APIProperty: newResourceID
     * {String} 创建的新临时图层结果资源的 ID ，只在创建临时图层的时候有效。
     */    
    newResourceID: null,
    
    /** 
     * APIProperty: customResponse
     * {String} 创建的临时图层集的 URI，标识一个 tempLayers 资源，在创建临时图层的时候有效。
     */
    newResourceLocation: null,
    
    /**
     * Constructor: SuperMap.REST.SetLayersInfoResult
     * 
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * succeed - {Boolean} 图层信息服务结果成功标记。
     * newResourceID - {String} 创建的新临时图层结果资源的 ID ，只在创建临时图层的时候有效。
     * newResourceLocation - {String} 创建的临时图层集的 URI，标识一个 tempLayers 资源，在创建临时图层的时候有效。
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
        me.newResourceID = null;
        me.newResourceLocation = null;
    },
    
    CLASS_NAME: "SuperMap.REST.SetLayersInfoResult"
})

/**
 * Function: SuperMap.REST.SetLayersInfoResult.fromJson
 * 将 JSON 对象表示的查询结果转化为 SetLayersInfoResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的设置图层信息服务结果。 
 *
 * Returns:
 * {<SuperMap.REST.SetLayersInfoResult>} 转化后的 SetLayersInfoResult 对象。
 */
SuperMap.REST.SetLayersInfoResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.SetLayersInfoResult({
        succeed: jsonObject.succeed,
        newResourceID: jsonObject.newResourceID,
        newResourceLocation: jsonObject.newResourceLocation
    });
};