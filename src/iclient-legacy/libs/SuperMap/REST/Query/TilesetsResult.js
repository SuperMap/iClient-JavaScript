/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.TilesetsResult
 * 切片列表信息查询服务结果类
 */
SuperMap.REST.TilesetsResult = SuperMap.Class({

    /**
     * APIProperty: metaData
     * {Object} 地图切片元数据信息
     */
    metaData: null,

    /**
     * APIProperty: name
     * {String} 切片集名称
     */
    name: null,

    /**
     * APIProperty: tileVersions
     * {Array(Object)} 切片版本集信息
     */
    tileVersions: null,

    /**
     * Constructor: SuperMap.REST.TilesetsResult
     * 切片列表信息查询服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
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
        me.metaData = null;
        me.name = null;
        me.tileVersions = null;
    },

    CLASS_NAME: "SuperMap.REST.TilesetsResult"
});

/**
 * Function: SuperMap.REST.TilesetsResult.fromJson
 * 将 JSON 对象转换为 TilesetsResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象
 *
 * Returns:
 * {<SuperMap.REST.TilesetsResult>} 转化后的 TilesetsResult 对象。
 */
SuperMap.REST.TilesetsResult.fromJson = function(jsonObject) {
    if (!jsonObject || !jsonObject[0]) {
        return;
    }
    jsonObject = jsonObject[0];
    var result = new SuperMap.REST.TilesetsResult();
    if (jsonObject.metaData) {
        result.metaData = jsonObject.metaData;
    }
    if (jsonObject.tileVersions) {
        result.tileVersions = [];
        for (var i=0,tileVersions=jsonObject.tileVersions,len=tileVersions.length; i<len; i++) {
            result.tileVersions[i] = tileVersions[i];
        }
    }
    if(jsonObject.name){
        result.name = jsonObject.name;
    }
    return result;
};