/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Recordset.js
 * @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
 */

/**
 * Class: SuperMap.REST.DatasetOverlayAnalystResult 
 * 数据集叠加分析服务结果数据类
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult> 
 */
SuperMap.REST.DatasetOverlayAnalystResult  = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {

    /** 
     * APIProperty: recordset
     * {<SuperMap.REST.Recordset>} 数据集叠加分析的结果记录集。
     */
    recordset: null,

    /**
     * APIProperty: dataset
     * {String} 数据集叠加分析的结果数据集标识
     */
    dataset: null,

    /**
     * Constructor: SuperMap.REST.DatasetOverlayAnalystResult  
     * 数据集叠加分析服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * recordset - {<SuperMap.REST.Recordset>} 结果记录集。
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
        SuperMap.REST.SpatialAnalystResult.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.recordset) {
            me.recordset.destroy();
            me.recordset = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.DatasetOverlayAnalystResult "
});

/**
 * Function: SuperMap.REST.DatasetOverlayAnalystResult.fromJson
 * 将 JSON 对象表示的查询结果转化为数据集叠加分析结果对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的数据集叠加分析对象结果。 
 *
 * Returns:
 * {<SuperMap.REST.DatasetOverlayAnalystResult>} 转化后的 Recordset 对象。
 */
SuperMap.REST.DatasetOverlayAnalystResult.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.DatasetOverlayAnalystResult();

    if (jsonObject.succeed) {
        result.succeed = jsonObject.succeed;
    }

    for (var name in jsonObject) {
        if (name === "recordset") {
            result.recordset = SuperMap.REST.Recordset.fromJson(jsonObject.recordset);
        }
        else {
            result[name] = jsonObject[name];
        }
    }

    return result;
};