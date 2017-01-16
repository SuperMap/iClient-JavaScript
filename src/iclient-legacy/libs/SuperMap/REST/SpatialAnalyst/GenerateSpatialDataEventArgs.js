/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/GenerateSpatialDataResult.js
 */

/**
 * Class: SuperMap.REST.GenerateSpatialDataEventArgs
 * 动态分段分析事件数据类。
 * 该类中包含了动态分段分析的结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.GenerateSpatialDataEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /** 
     * APIProperty: result
     * {<SuperMap.REST.GenerateSpatialDataResult>} 获取服务端返回的动态分段分析结果。  
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.GenerateSpatialDataEventArgs
     * 动态分段分析事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.GenerateSpatialDataResult>} 服务端返回的动态分段分析结果数据。
     * originResult - {Object} 获取服务端返回的存储了动态分段分析结果数据的 JSON 对象。
     */
    initialize: function (result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。  
     */
    destroy: function () {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this,arguments);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.GenerateSpatialDataEventArgs"
});