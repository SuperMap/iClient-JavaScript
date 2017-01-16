/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/DatasetOverlayAnalystResult.js
 * @requires SuperMap/REST/SpatialAnalyst/GeometryOverlayAnalystResult.js
 */

/**
 * Class: SuperMap.REST.OverlayAnalystEventArgs
 * 空间分析服务事件数据类。
 * 该类包含了从服务端传回的空间分析结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.OverlayAnalystEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /** 
     * APIProperty: result
     * {<SuperMap.REST.DatasetOverlayAnalystResult>}/{<SuperMap.REST.GeometryOverlayAnalystResult>} 
     * 服务端返回的空间分析结果数据，其中包含了资源的相关信息。该属性的类型与传入的参数类型相关，当缓冲区分析服务的参数为 
     * {<SuperMap.REST.DatasetOverlayAnalystParameters>} 时，
     * 返回的结果类型为 {<SuperMap.REST.DatasetOverlayAnalystResult>},
     * 当参数为 {<SuperMap.REST.GeometryOverlayAnalystParameters>} 类型时，
     * 返回的结果类型为 {<SuperMap.REST.GeometryOverlayAnalystResult>} 。  
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.OverlayAnalystEventArgs
     * 空间分析服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.DatasetOverlayAnalystResult>}/{<SuperMap.REST.GeometryOverlayAnalystResult>}  服务端返回的查询空间分析结果数据 。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的空间分析结果数据 。 
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
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.OverlayAnalystEventArgs"
});