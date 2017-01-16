/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/REST/GetFeaturesParametersBase.js
 */

/**
 * Class: SuperMap.REST.GetFeaturesBySQLParameters
 * 数据服务中数据集SQL查询参数类。 
 * 
 * Inherits from:
 *  - <SuperMap.REST.GetFeaturesParametersBase> 
 */
SuperMap.REST.GetFeaturesBySQLParameters = SuperMap.Class(SuperMap.REST.GetFeaturesParametersBase, {
    /** 
     * Property: getFeatureMode
     * {String} 数据集查询模式。
     */
    getFeatureMode: "SQL",
    /** 
     * APIProperty: queryParameter
     * {<SuperMap.REST.FilterParameter>} 查询过滤条件参数类。
     */
    queryParameter: null,
        
    /**
     * Constructor: SuperMap.REST.GetFeaturesBySQLParameters
     * SQL 查询参数类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * queryParameter - {<SuperMap.REST.FilterParameter>} 查询过滤条件参数。
     * datasetNames - {Array(String)} 数据集集合中的数据集名称列表。  
     * returnContent - {Boolean} 是否直接返回查询结果。
     * fromIndex - {Integer} 查询结果的最小索引号。
     * toIndex - {Integer} 查询结果的最大索引号。
     */
    initialize: function(options) {
        SuperMap.REST.GetFeaturesParametersBase.prototype.initialize.apply(this,arguments);
        if (!options) {
            return;
        }
        SuperMap.Util.extend(this, options);
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.REST.GetFeaturesParametersBase.prototype.destroy.apply(this,arguments);
        var me = this;
        me.getFeatureMode = null;
        if(me.queryParameter) {
            me.queryParameter.destroy();
            me.queryParameter = null;
        }
    },
    
    CLASS_NAME:"SuperMap.REST.GetFeaturesBySQLParameters"
 });
 /**
 * Function: SuperMap.REST.GetFeaturesBySQLParameters.toJsonParameters
 * 将<SuperMap.REST.GetFeaturesBySQLParameters>对象参数转换为json字符串。 
 *
 * Parameters:
 * params - {<SuperMap.REST.GetFeaturesBySQLParameters>} SQL查询参数。 
 *
 * Returns:
 * {String} 转化后的 json字符串。
 */
 SuperMap.REST.GetFeaturesBySQLParameters.toJsonParameters = function(params) {
    var paramsBySql = {
        datasetNames: params.datasetNames,
        getFeatureMode:"SQL",
        queryParameter:params.queryParameter
    };
    return SuperMap.Util.toJSON(paramsBySql);
};