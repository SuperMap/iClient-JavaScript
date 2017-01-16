/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/SurfaceAnalystResult.js
 */

/**
 * Class: SuperMap.REST.SurfaceAnalystEventArgs
 * 表面分析事件数据类。
 * 该类中包含了表面分析的结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.SurfaceAnalystEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /** 
     * APIProperty: result
     * {<SuperMap.REST.SurfaceAnalystResult>} 获取服务端返回的表面分析结果。  
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.SurfaceAnalystEventArgs
     * 表面分析事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.SurfaceAnalystResult>} 服务端返回的查询结果数据 。
     * originResult - {String} 获取服务端返回的存储了表面分析结果数据的 JSON 字符串。
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

    CLASS_NAME: "SuperMap.REST.SurfaceAnalystEventArgs"
});