/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/MTSPPath.js
 */
    
/**
 * Class: SuperMap.REST.FindMTSPPathsResult
 * 多旅行商分析服务结果类 
 * 该类包含了多旅行商路径的弧段、结点信息，路由对象，行驶导引等。
 */
 
SuperMap.REST.FindMTSPPathsResult=SuperMap.Class({
    /** 
     * APIProperty: pathList
     * {Array(<SuperMap.REST.MTSPPath>)} 多旅行商分析路径结果对象数组。
     */
    pathList: null,
    
    /**
     * Constructor: SuperMap.REST.FindMTSPPathResult
     * 多旅行商分析服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * pathList - {Array(<SuperMap.REST.MTSPPath>)} 多旅行商分析路径结果对象数组。
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
            for (var i=0,pathList=me.pathList,len=pathList.length; i<len; i++) {
                pathList[i].destroy();
            }
            me.pathList = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindMTSPPathResult"

});

/**
 * Function: SuperMap.REST.FindMTSPPathResult.fromJson
 * 将 JSON 对象转换为 FindPathMTSPResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的多旅行商分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindMTSPPathsResult>} 转化后的 FindMTSPPathResult 对象。
 */
SuperMap.REST.FindMTSPPathsResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindMTSPPathsResult();
    if (jsonObject.pathList) {
        result.pathList = [];
        for (var i=0,pathList=jsonObject.pathList,len=jsonObject.pathList.length; i<len; i++) {
            result.pathList[i] = SuperMap.REST.MTSPPath.fromJson(pathList[i]);
        }
    }
    return result;
};
