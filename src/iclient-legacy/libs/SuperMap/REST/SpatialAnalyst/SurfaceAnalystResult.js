/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
* @requires SuperMap/Util.js
* @requires SuperMap/REST.js
* @requires SuperMap/REST/Recordset.js
* @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
*/

/**
* Class: SuperMap.REST.SurfaceAnalystResult
* 表面分析提取等值线、提取等值面分析服务结果数据类
* 该类中包含了表面分析提取等值线、提取等值面分析服务的结果记录集。 
* Inherits from:
*  - <SuperMap.REST.SpatialAnalystResult> 
*/
SuperMap.REST.SurfaceAnalystResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {

    /** 
     * Property: recordset
     * {<SuperMap.REST.Recordset>} 返回 SurfaceAnalystResult 类型的结果。
     */
    recordset: null,
    
    /**
     * APIProperty：dataset
     * {Sting} 数据集缓冲区分析的结果数据集标识
     */
    dataset: null,
     
    /**
     * Constructor: SuperMap.REST.SurfaceAnalystResult 
     * 表面分析结果构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * recordset - {<SuperMap.REST.Recordset>} 返回 SurfaceAnalystResult 类型的结果。
     * dataset - {Sting} 数据集缓冲区分析的结果数据集标识。
     * succeed - {Boolean} 是否成功返回结果。true 表示成功返回结果。
     */
    initialize: function (options) {
        SuperMap.REST.SpatialAnalystResult.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        var me = this;
        if (me.recordset) {
            me.recordset.destroy();
            me.recordset = null;
        }
        me.dataset = null;
    },

    CLASS_NAME: "SuperMap.REST.SurfaceAnalystResult"
});

/**
 * SuperMap.REST.SurfaceAnalystResult.fromJson
 * 将 JSON 对象表示的查询结果记录集转化为 Recordset 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果记录集。 
 *
 * Returns:
 * {SuperMap.REST.Recordset} 转化后的 Recordset 对象。
 */ 
SuperMap.REST.SurfaceAnalystResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.SurfaceAnalystResult();
    
    if (jsonObject.succeed) {
        result.succeed = jsonObject.succeed;
    }
    if (jsonObject.recordset) {
        result.recordset = SuperMap.REST.Recordset.fromJson(jsonObject.recordset);
    }
    if (jsonObject.dataset) {
        result.dataset = jsonObject.dataset;
    }
    
    return result;
};