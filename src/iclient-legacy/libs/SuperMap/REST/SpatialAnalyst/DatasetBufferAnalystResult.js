/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
 */

/**
 * Class: SuperMap.REST.DatasetBufferAnalystResult
 * 数据集缓冲区分析服务结果数据类
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult> 
 */
SuperMap.REST.DatasetBufferAnalystResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {
    
    /** 
     * APIProperty: recordset
     * {<SuperMap.REST.Recordset>} 数据集缓冲区分析的结果记录集。
     */
    recordset: null,
    
    /**
     * APIProperty: dataset
     * {String} 数据集缓冲区分析的结果数据集标识
     */
    dataset: null,
     
    /**
     * Constructor: SuperMap.REST.DatasetBufferAnalystResult 
     * 数据集缓冲区分析服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * recordset - {<SuperMap.REST.Recordset>} 数据集缓冲区分析的结果记录集。
     * succeed - {Boolean} 是否成功返回结果。true 表示成功返回结果。
     */

    initialize: function (options) {
        SuperMap.REST.SpatialAnalystResult.prototype.initialize.apply(this, arguments);
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
        SuperMap.REST.SpatialAnalystResult.prototype.destroy.apply(this,arguments);
        var me = this;
        if (me.recordset) {
            me.recordset.destroy();
            me.recordset = null;
        }
        me.dataset = null;
    },

    CLASS_NAME: "SuperMap.REST.DatasetBufferAnalystResult"
});

/**
 * Function: SuperMap.REST.DatasetBufferAnalystResult.fromJson
 * 将 JSON 对象表示的查询结果转化为数据集缓冲区对象结果。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的数据集缓冲区对象结果。 
 *
 * Returns:
 * {<SuperMap.REST.DatasetBufferAnalystResult>} 转化后的数据集缓冲区分析结果对象。
 */
SuperMap.REST.DatasetBufferAnalystResult.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.DatasetBufferAnalystResult();
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