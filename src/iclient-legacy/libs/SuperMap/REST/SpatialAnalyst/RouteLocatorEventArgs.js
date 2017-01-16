/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteLocatorResult.js
 */

/**
 * Class: SuperMap.REST.RouteLocatorEventArgs
 * 路由对象定位空间对象的事件数据类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.RouteLocatorEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.RouteLocatorResult>} 服务端返回路由对象定
     *      位空间对象的结果资源，其中包含了资源的相关信息。
     */
    result:null,

    /**
     * Constructor: SuperMap.REST.RouteLocatorEventArgs
     * 路由对象定位空间对象的事件数据类构造函数。
     *
     * Parameters:
     * result - {<SuperMap.REST.RouteLocatorResult>} 路由定位点（线）的分析结果资源。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的结果数据。
     */
    initialize:function (result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy:function () {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this, arguments);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME:"SuperMap.REST.RouteLocatorEventArgs"
});