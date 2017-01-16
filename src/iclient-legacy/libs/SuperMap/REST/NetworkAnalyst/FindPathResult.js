/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/Path.js
 */

/**
 * Class: SuperMap.REST.FindPathResult
 * 最佳路径分析结果类。
 * 从该类中可以获取一条或多条结果路径，以及表示这些路径的图片。
 */
SuperMap.REST.FindPathResult = SuperMap.Class({
     
    /** 
     * APIProperty: pathList
     * {Array(<SuperMap.REST.Path>)} 交通网络分析结果路径数组。 
     */
    pathList: null,
    
    /**
     * Constructor: SuperMap.REST.FindPathResult
     * 最佳路径分析结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * pathList - {Array(<SuperMap.REST.Path>)} 交通网络分析结果路径数组。
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
        if (me.pathList) {
            for (var i=0,len=me.pathList.length; i<len; i++) {
                me.pathList[i].destroy();
            }
            me.pathList = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindPathResult"
});

/**
 * Function: SuperMap.REST.FindPathResult.fromJson
 * 将 JSON 对象转换为 FindPathResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的最佳路径分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindPathResult>} 转化后的 FindPathResult 对象。
 */
SuperMap.REST.FindPathResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindPathResult();
    if (jsonObject.pathList) {
        result.pathList = [];
        for (var i=0,pathList=jsonObject.pathList,len=pathList.length; i<len; i++) {
            result.pathList[i] = SuperMap.REST.Path.fromJson(pathList[i]);
        }
    }
    return result;
};