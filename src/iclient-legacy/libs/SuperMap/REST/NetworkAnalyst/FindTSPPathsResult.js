/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/NetworkAnalyst/TSPPath.js
 */
    
/**
 * Class: SuperMap.REST.FindTSPPathsResult
 * 旅行商分析服务结果类
 * 该类包含了旅行商路径的弧段、结点信息，路由对象，行驶导引等。
 */
 
SuperMap.REST.FindTSPPathsResult=SuperMap.Class({
    /** 
     * APIProperty: tspPathList
     * {Array(<SuperMap.REST.TSPPath>)} 旅行商分析路径结果对象数组。 
     */
    tspPathList: null,
    
    /**
     * Constructor: SuperMap.REST.FindTSPPathResult
     * 旅行商分析服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * tspPathList - {Array(<SuperMap.REST.TSPPath>)} 旅行商分析路径结果对象数组。
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
        if (me.tspPathList) {
            for (var i=0,tspPathList=me.tspPathList,len=tspPathList.length; i<len; i++) {
                tspPathList[i].destroy();
            }
            me.tspPathList = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FindTSPPathResult"
});

/**
 * Function: SuperMap.REST.FindTSPPathResult.fromJson
 * 将 JSON 对象转换为 FindPathTSPResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的旅行商分析结果。 
 *
 * Returns:
 * {<SuperMap.REST.FindTSPPathResult>} 转化后的 FindTSPPathResult 对象。
 */
SuperMap.REST.FindTSPPathsResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.FindTSPPathsResult();
    if (jsonObject.tspPathList) {
        result.tspPathList = [];
        for (var i=0,tspPathList=jsonObject.tspPathList,len=jsonObject.tspPathList.length; i<len; i++) {
            result.tspPathList[i] = SuperMap.REST.TSPPath.fromJson(tspPathList[i]);
        }
    }
    return result;
};
