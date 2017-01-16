/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/GetFeatureFieldsResult.js
 */

/**
 * Class: SuperMap.REST.FieldStatisticEventArgs
 * 字段统计服务事件数据类。
 * 该类包含了从服务端传回的字段统计结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.FieldStatisticEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result 服务端返回的字段统计结果数据。
     * {<SuperMap.REST.GetFeatureFieldsResult>} 
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.FieldStatisticEventArgs
     * 字段统计服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.GetFeatureFieldsResult>} 服务端返回的字段统计结果数据。
     * originResult - {Object} JSON 对象格式的字段统计结果数据。
     */
    initialize: function(result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },
    
    CLASS_NAME: "SuperMap.REST.FieldStatisticEventArgs"
});