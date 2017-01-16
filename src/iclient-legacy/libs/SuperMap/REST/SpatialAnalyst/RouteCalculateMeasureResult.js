/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/SpatialAnalyst/SpatialAnalystResult.js
 */

/**
 * Class: SuperMap.REST.RouteCalculateMeasureResult
 * 基于路由对象计算指定点的M值结果类。该类的实例保存返回的结果。
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystResult>
 */
SuperMap.REST.RouteCalculateMeasureResult = SuperMap.Class(SuperMap.REST.SpatialAnalystResult, {

    /**
     * APIProperty：succeed
     * {Double} 定位点的M值。
     */
    measure:null,

    /**
     * APIProperty：newResourceID
     * {String} 计算指定点的M值分析过程中产生的相关信息。
     */
    message:null,

    /**
     * APIProperty：postResultType
     * {Boolean} 创建分析结果是否成功；成功则返回 true，否则返回 false。
     */
    succeed:null,

    /**
     * Constructor: SuperMap.REST.RouteCalculateMeasureResult
     * 基于路由对象计算指定点的M值结果类构造函数。
     *
     * Parameters:
     * options - {Object} 此类及其父类的属性。
     *
     * Allowed options properties:
     * succeed - {Boolean} 创建分析结果是否成功。
     * measure - {String} 定位点的M值。
     * message - {String} 计算指定点的M值分析过程中产生的相关信息。
     */
    initialize:function (options) {
        SuperMap.REST.SpatialAnalystResult.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        var me = this;
        me.measure = null;
        me.message = null;
        me.succeed = null;
    },

    CLASS_NAME:"SuperMap.REST.RouteCalculateMeasureResult"
});


/**
 * SuperMap.REST.RouteCalculateMeasureResult.fromJson
 * 将 JSON 对象表示的查询结果记录集转化为 RouteCalculateMeasureResult 对象。
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的计算结果。
 *
 * Returns:
 * {<SuperMap.REST.RouteCalculateMeasureResult>} 转化后的 RouteCalculateMeasureResult 对象。
 */
SuperMap.REST.RouteCalculateMeasureResult.fromJson = function (jsonObject) {
    if (!jsonObject) {
        return;
    }
    var result = new SuperMap.REST.RouteCalculateMeasureResult();
    if (jsonObject.measure) {
        result.measure = jsonObject.measure;
    }
    if (jsonObject.message) {
        result.message = jsonObject.message;
    }
    result.succeed = jsonObject.succeed;
    return result;
};