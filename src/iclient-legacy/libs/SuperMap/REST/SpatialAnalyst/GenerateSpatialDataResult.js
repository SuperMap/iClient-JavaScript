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
 * Class: SuperMap.REST.GenerateSpatialDataResult
 * 动态分段操作结果数据类。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult>
 */
SuperMap.REST.GenerateSpatialDataResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {
    
    /**
     * APIProperty：dataset
     * {Sting} 数据集标识。
     */
    dataset: null,
    
    /** 
     * Property: recordset
     * {<SuperMap.REST.Recordset>} 查询结果记录集，返回 GenerateSpatialDataResult 类型的结果。
     */
    recordset: null,
    
    /** 
     * Property: succeed
     * {Boolean} 是否成功返回结果。true 表示成功返回结果。
     */
    succeed: null,
    
    /** 
     * Property: message
     * {String} 
     */
    message: null,
     
    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataResult 
     * 动态分段结果类构造函数。
     *
     * Parameters:
     * options - {Object} 此类及其父类的属性。
     *
     * Allowed options properties:
     * recordset - {<SuperMap.REST.Recordset>} 返回 GenerateSpatialDataResult 类型的结果。
     * dataset - {Sting} 数据集标识。
     * succeed - {Boolean} 是否成功返回结果。true 表示成功返回结果。
     * message - {String} 
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
        me.succeed = null;
        me.message = null;
    },

    CLASS_NAME: "SuperMap.REST.GenerateSpatialDataResult"
});

/**
 * SuperMap.REST.GenerateSpatialDataResult.fromJson
 * 将 JSON 对象表示的查询结果记录集转化为 GenerateSpatialDataResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果记录集。 
 *
 * Returns:
 * {<SuperMap.REST.GenerateSpatialDataResult>} 转化后的 GenerateSpatialDataResult 对象。
 */ 
SuperMap.REST.GenerateSpatialDataResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.GenerateSpatialDataResult();

    if (jsonObject.recordset) {
        result.recordset = SuperMap.REST.Recordset.fromJson(jsonObject.recordset);
    }
    if (jsonObject.dataset) {
        result.dataset = jsonObject.dataset;
    }
    result.succeed = jsonObject.succeed;
    result.message = jsonObject.message;
    
    return result;
};