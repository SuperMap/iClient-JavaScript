/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.REST.MeasureResult
 * 量算结果类。
 */
SuperMap.REST.MeasureResult = SuperMap.Class({
    
    /** 
     * APIProperty: area
     * {Double} 面积量算结果。当前量算为距离量算时，返回-1。 
     */
    area: null,

    /** 
     * APIProperty: distance
     * {Double} 距离量算结果。当前量算为面积量算时，返回-1。
     */    
    distance: null,
    
    /** 
     * APIProperty: unit
     * {Object} 量算结果单位。 
     */
    unit: null,
    
    /**
     * Constructor: SuperMap.REST.MeasureResult
     * 量算结果类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * area - {Double} 面积量算结果。
     * distance - {Double} 距离量算结果。
     * unit - {Object} 量算结果单位。
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
        me.area = null;
        me.distance = null;
        me.unit = null;
    },
    
    CLASS_NAME: "SuperMap.REST.MeasureResult"
});

/**
 * Function: SuperMap.REST.MeasureResult.fromJson
 * 将 JSON 对象表示的量算结果转化为 MeasureResult 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的量算结果。
 *
 * Returns:
 * {<SuperMap.REST.MeasureResult>} 转化后的 MeasureResult 对象。
 */
SuperMap.REST.MeasureResult.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.REST.MeasureResult({
        area: jsonObject.area,
        distance: jsonObject.distance,
        unit: jsonObject.unit
    });
};