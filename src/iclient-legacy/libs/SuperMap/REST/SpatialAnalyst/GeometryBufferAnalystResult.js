/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/ServerGeometry.js
 * @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
 */

/**
 * Class: SuperMap.REST.GeometryBufferAnalystResult
 * 几何对象缓冲区分析服务结果数据类
 * 该类中包含了缓冲区分析的结果几何对象。 
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult> 
 */
SuperMap.REST.GeometryBufferAnalystResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {

    /** 
     * Property: resultGeometry
     * {<SuperMap.Geometry>} 缓冲区分析的结果几何对象。
     */
    resultGeometry: null,

    /**
     * Constructor: SuperMap.REST.GeometryBufferAnalystResult 
     * 几何对象缓冲区分析服务结果数据类构造函数。
     *
     * Parameters:
     * options - {Object} 可选参数。
     *
     * Allowed options properties:
     * resultGeometry - {<SuperMap.Geometry>} 缓冲区分析的结果几何对象。
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
        SuperMap.REST.SpatialAnalystResult.prototype.destroy.apply(this,arguments);
        var me = this;
        if (me.resultGeometry) {
            me.resultGeometry.destroy();
            me.resultGeometry = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.GeometryBufferAnalystResult"
});

/**
 * Function: SuperMap.REST.GeometryBufferAnalystResult.fromJson
 * 将 JSON 对象表示的查询结果转化为几何对象缓冲区分析结果对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的查询结果记录集。 
 *
 * Returns:
 * {<SuperMap.REST.GeometryBufferAnalystResult>} 几何对象缓冲区分析结果。
 */
 SuperMap.REST.GeometryBufferAnalystResult.fromJson  = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.GeometryBufferAnalystResult();
    if (jsonObject.succeed) {
        result.succeed = jsonObject.succeed;
    }
    if (jsonObject.resultGeometry) {
        result.resultGeometry = SuperMap.REST.ServerGeometry.fromJson(jsonObject.resultGeometry).toGeometry();
    }
    
    return result;
};