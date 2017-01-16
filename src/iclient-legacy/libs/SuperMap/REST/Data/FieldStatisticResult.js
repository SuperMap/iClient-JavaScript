/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.FieldStatisticResult
 * 字段查询统计服务结果类。存储字段查询统计的结果信息。
 */
SuperMap.REST.FieldStatisticResult = SuperMap.Class({
    
    /**
     * APIProperty: mode
     * {String} 字段查询统计的方法，参考 <SuperMap.REST.StatisticMode>。
     */
    mode: null,
    
    /**
     * APIProperty: result
     * {Number} 字段统计的结果值。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.FieldStatisticResult
     * 字段查询统计服务结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * mode - {String} 字段查询统计的方法，参考 <SuperMap.REST.StatisticMode>。
     * result - {Number} 字段统计的结果值。
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
        me.mode = null;
        me.result = null;
    },
    
    CLASS_NAME: "SuperMap.REST.FieldStatisticResult"
});
/**
 * Function: SuperMap.REST.FieldStatisticResult.fromJson
 * 将 JSON 对象表示的结果资源信息类转化为 FieldStatisticResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的结果资源信息类。
 *
 * Returns:
 * {<SuperMap.REST.FieldStatisticResult>} 转化后的 FieldStatisticResult 对象。
 */
SuperMap.REST.FieldStatisticResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.FieldStatisticResult({
        mode: jsonObject.mode,
        result: Number(jsonObject.result)
    });
};