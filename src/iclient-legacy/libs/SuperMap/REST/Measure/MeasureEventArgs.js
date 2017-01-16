/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/MeasureResult.js
 */

/**
 * Class: SuperMap.REST.MeasureEventArgs
 * 量算服务事件数据类。
 * 该类包含了从服务端传回的量算结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.MeasureEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.REST.MeasureResult>} 服务端返回的量算结果数据，其中包含了距离量算或面积量算结果的相关信息。  
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.MeasureEventArgs
     * 量算服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.MeasureResult>} 服务端返回的量算结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的量算结果数据。 
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
    
    CLASS_NAME: "SuperMap.REST.MeasureEventArgs"
});