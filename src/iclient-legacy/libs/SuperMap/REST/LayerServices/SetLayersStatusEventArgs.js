/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 * @requires SuperMap/REST/LayerServices/SetLayerResult.js
 */

/**
 * Class: SuperMap.REST.SetLayersStatusEventArgs
 * 设置图层信息事件数据类。
 * 该类包含了设置如曾信息服务的结果状态信息。
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.SetLayersStatusEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.SetLayerResult>} 获取设置图层信息的返回结果。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.SetLayersInfoEventArgs
     * 设置图层信息服务事件数据类构造函数。
     *
     * Parameters:
     * result - {<Object>} 获取设置图层信息的返回结果。
     * originResult - {Object} 从服务端获取的 Json 对象表示的设置图层信息的返回结果。
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
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.SetLayersStatusEventArgs"
});