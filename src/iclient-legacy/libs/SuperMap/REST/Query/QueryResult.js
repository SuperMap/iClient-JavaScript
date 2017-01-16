/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Recordset.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.QueryResult
 * 查询结果类。
 * 查询结果类中包含了查询结果记录集（Recordset）或查询结果资源（ResourceInfo)的相关信息。
 */
SuperMap.REST.QueryResult = SuperMap.Class({
    
    /** 
     * APIProperty: totalCount
     * {Integer} 符合查询条件的记录的总数。 
     */
    totalCount: null,

    /** 
     * APIProperty: currentCount
     * {Integer} 当次查询返回的记录数。 
     * 如果期望返回的记录条数小于满足查询条件的所有记录，
     * 即 ExpectCount <= TotalCount，则 CurrentCount 就等于 ExpectCount 的值；
     * 如果 ExpectCount > TotalCount，则 CurrentCount 就等于 TotalCount 的值。 
     */    
    currentCount: null,
    
    /** 
     * APIProperty: customResponse
     * {Object} 自定义操作处理的结果。 
     */
    customResponse: null,
    
    /** 
     * APIProperty: recordsets
     * {Array(<SuperMap.REST.Recordset>)} 查询结果记录集数组。
     * 将查询出来的地物按照图层进行划分，
     * 一个查询记录集存放一个图层的查询结果，即查询出的所有地物要素。 
     */
    recordsets: null,
    
    /** 
     * APIProperty: resourceInfo
     * {<SuperMap.REST.ResourceInfo>} 查询结果资源。 
     */
    resourceInfo: null,
    
    /**
     * Constructor: SuperMap.REST.QueryResult
     * 查询结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * totalCount - {Integer} 符合查询条件的记录的总数。
     * currentCount - {Integer} 当次查询返回的记录数。
     * customResponse - {String} 自定义操作处理的结果。
     * recordsets - {<SuperMap.REST.Recordset>} 结果记录集数组。
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
        me.totalCount = null;
        me.currentCount = null;
        me.customResponse = null;
        if (me.recordsets) {
            for (var i=0,recordsets=me.recordsets,len=recordsets.length; i<len; i++) {
                recordsets[i].destroy();
            }
            me.recordsets = null;
        }
        if (me.resourceInfo) {
            me.resourceInfo.destroy();
            me.resourceInfo = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.QueryResult"
})

/**
 * Function: SuperMap.REST.QueryResult.fromJson
 * 将 JSON 对象表示的查询结果转化为 QueryResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果。 
 *
 * Returns:
 * {<SuperMap.REST.QueryResult>} 转化后的 QueryResult 对象。
 */
SuperMap.REST.QueryResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var recordsets = null;
    if (jsonObject.recordsets) {
        recordsets = [];
        for( var i=0,re = jsonObject.recordsets,len=re.length; i<len; i++) {
            recordsets.push(SuperMap.REST.Recordset.fromJson(re[i]));
        }
    }
    return new SuperMap.REST.QueryResult({
        totalCount: jsonObject.totalCount,
        currentCount: jsonObject.currentCount,
        customResponse: jsonObject.customResponse,
        recordsets: recordsets,
        resourceInfo: jsonObject.resourceInfo
    });
};