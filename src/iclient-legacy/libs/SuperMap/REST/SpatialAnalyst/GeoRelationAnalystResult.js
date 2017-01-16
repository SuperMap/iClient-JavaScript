/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/GeoRelationResult.js
 * @requires SuperMap/REST/ServerFeature.js
 */

/**
 * Class: SuperMap.REST.GeoRelationAnalystResult
 * 空间关系分析结果类。
 * 记录空间关系分析服务返回的结果信息。
 */
 SuperMap.REST.GeoRelationAnalystResult = SuperMap.Class({
    /**
     * APIProperty: geoRelationResults
     * {Array<SuperMap.REST.GeoRelationResult>} 空间关系分析结果信息。
     */
    geoRelationResults: null,
    
    /**
     * Constructor: SuperMap.REST.GeoRelationAnalystResult 
     * 空间关系分析结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * geoRelationResults - {Array<SuperMap.REST.GeoRelationResult>} 服务端返回的由
     * GeoRelationResult 类型组成的数组形式的结果信息。
     */
    initialize: function(options){
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function(){
        var me = this, geoRelationResults = me.geoRelationResults;
        if(geoRelationResults){
            var len = geoRelationResults.length;
            for( var i = 0; i < len; i++){
                geoRelationResults[i].destroy();
            }
        }
        me.geoRelationResults = null;
    },
    
    CLASS_NAME: "SuperMap.REST.GeoRelationAnalystResult"
 });
 
 /**
 * Function: SuperMap.REST.GeoRelationAnalystResult.fromJson
 * 将 JSON 对象表示的空间关系分析结果转化为 GeoRelationAnalystResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的空间关系分析结果。 
 *
 * Returns:
 * {SuperMap.REST.GeoRelationAnalystResult} 转化后的 GeoRelationAnalystResult 对象。
 */
SuperMap.REST.GeoRelationAnalystResult.fromJson = function (jsonObject){
    if (jsonObject && jsonObject instanceof Array) {
        var geoRelationResult, geoRelationResults = [], len = jsonObject.length;
        for(var i = 0; i < len; i++){
            geoRelationResult = SuperMap.REST.GeoRelationResult.fromJson(jsonObject[i]);
            geoRelationResults.push(geoRelationResult);
        }
        return new SuperMap.REST.GeoRelationAnalystResult({"geoRelationResults": geoRelationResults});
    }
};