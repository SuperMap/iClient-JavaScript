/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceException.js
 */

/**
 * Class: SuperMap.ServiceFailedEventArgs
 * 服务失败事件数据类。
 * 该类包含了从服务端传回的异常信息。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.ServiceFailedEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    

    /** 
     * APIProperty: error
     * {<SuperMap.ServiceException>} 服务器返回的失败异常信息。    
     */
    error: null,

    /**
     * Constructor: SuperMap.ServiceFailedEventArgs
     * 服务失败事件数据类构造函数。
     *
     * Parameters:
     * error - {<SuperMap.ServiceException>} 服务器返回的失败异常信息。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的结果数据。 
     */
    initialize: function(error, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.error = error;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.error) {
            me.error.destroy();
            me.error = null;
        }
    },
    
    CLASS_NAME: "SuperMap.ServiceFailedEventArgs"
});
