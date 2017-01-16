/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.POIInfosParameter
 * 兴趣点搜索服务参数类
 */
SuperMap.Cloud.POIInfosParameter = SuperMap.Class({

    /** 
     * APIProperty: keyWords
     * {String} 搜索查询关键字，必设。
     */
    keyWords: null,
    
    /** 
     * APIProperty: city
     * {String} 兴趣点搜索范围，默认北京市查找。可以通过指定"行者区划市名"，控制搜索范围。
     */
    city: 100000,
    
    /** 
     * APIProperty: pageSize
	 * {Number} 搜索服务返回的结果数，默认为10。
     */
    pageSize: 10,
    
    /** 
     * APIProperty: pageNum
	 * {Number} 搜索服务结果分页页码，默认1，表示返回第一页（即前10条)记录。
     */
    pageNum: 1,

    /**
     * APIProperty: to
     * {Number} 输出结果坐标类型，默认值：910111。支持的坐标类型编码参考 http://www.supermapol.com/developer/webapi.html?title=convert 。
     */
    to: 910111,
    
    /**
     * Constructor: SuperMap.Cloud.POIInfosParameter
     * 兴趣点搜索服务参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * keyWords - {String} 搜索查询关键字，必设。
     * city - {Number} 兴趣点搜索范围。
     * pageSize - {Number} 搜索服务返回的结果数。
     * pageNum - {Number} 搜索服务结果分页页码。
     */
    initialize: function(options) {
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() { 
        var me = this;
        me.keyWords = null;
        me.city = null;
        me.pageSize = null;
        me.pageNum = null;
        me.to = null;
    },
    
    CLASS_NAME: "SuperMap.Cloud.POIInfosParameter"
});

SuperMap.Cloud.POIInfosParameter.toJsonParameters = function(params) {
    var feature = {};
    if(params.city)feature.city = params.city;
    if(params.keyWords)feature.keyWords = params.keyWords;
    if(params.pageNum)feature.pageNum = params.pageNum;
    if(params.pageSize)feature.pageSize = params.pageSize;
    if(params.to)feature.to = params.to;
    return feature;
}