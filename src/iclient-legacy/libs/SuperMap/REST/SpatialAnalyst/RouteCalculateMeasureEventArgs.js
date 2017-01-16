/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteCalculateMeasureResult.js
 */

/**
 * Class: SuperMap.REST.RouteCalculateMeasureEventArgs
 * 基于路由对象计算指定点的M值的事件数据类。
 * 该类中包含了基于路由对象计算指定点的M值的结果数据。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.RouteCalculateMeasureEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.RouteCalculateMeasureResult>} 服务端返回的路由对象计
     *      算指定点M值的结果数据，其中包含了资源的相关信息。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.RouteCalculateMeasureEventArgs
     * 基于路由对象计算指定点的M值的事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.RouteCalculateMeasureResult>} 服务端返回的路
     *      由对象计算指定点M值的结果数据，其中包含了资源的相关信息。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的结果数据。
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

    CLASS_NAME: "SuperMap.REST.RouteCalculateMeasureEventArgs"
});