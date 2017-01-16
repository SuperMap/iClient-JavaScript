/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceEventArgs.js
 */

/**
 * Class: SuperMap.REST.GetLayersInfoEventArgs
 * 获取图层信息服务事件数据类。
 * 该类包含了获取图层信息服务请求返回的详细图层信息。
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.REST.GetLayersInfoEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /** 
     * APIProperty: result
     * {{Object}} 获取服务端详细图层信息。 
     */
    result: null,
    
    /**
     * Constructor: SuperMap.REST.GetLayersInfoEventArgs
     * 获取图层信息服务事件数据类构造函数。
     *
     * Parameters:
     * result - {Object}
     * originResult - {Object}
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
            SuperMap.Util.reset(me.result);
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.REST.GetLayersInfoEventArgs"
});