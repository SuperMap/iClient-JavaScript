/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.GetFieldsResult
 * 数据集字段查询结果。  
 */
SuperMap.REST.GetFieldsResult = SuperMap.Class({
    
    /**
     * APIProperty: fieldNames
     * {Array(String)} 字段名称数组，记录了数据集中所有字段的名称信息。
     */
    fieldNames: null,
    
    /**
     * APIProperty: childUriList
     * {Array(String)} 字段信息（field 资源）访问路径列表。由字段资源的 url 组成的数组，
     * 通过单个字段资源可以获取字段的名称，类型，别名等字段详细信息。
     */
    childUriList: null,

    /**
     * Constructor: SuperMap.REST.GetFieldsResult
     * 
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * fieldNames - {Array(String)} 字段名称数组。  
     * childUriList - {Array(String)} 字段信息（field 资源）访问路径列表。
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
        me.fieldNames = null;
        me.childUriList = null;
    },
    
    CLASS_NAME: "SuperMap.REST.GetFieldsResult"
});
/**
 * Function: SuperMap.REST.GetFieldsResult.fromJson
 * 将 JSON 对象表示的结果资源信息类转化为 GetFieldsResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的结果资源信息类。
 *
 * Returns:
 * {<SuperMap.REST.GetFieldsResult>} 转化后的 GetFieldsResult 对象。
 */
SuperMap.REST.GetFieldsResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.GetFieldsResult({
        fieldNames: jsonObject.fieldNames,
        childUriList: jsonObject.childUriList    
    });
};