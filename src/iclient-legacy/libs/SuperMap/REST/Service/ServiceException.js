/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.ServiceException
 * 服务异常类 。
 */
SuperMap.ServiceException = SuperMap.Class({
    
    /** 
     * APIProperty: code
     * {Number} 服务端返回的状态码。     
     */
    code: null,
    
    /** 
     * APIProperty: errorMsg 
     * {String} 服务端返回的异常信息。      
     */
    errorMsg: null,

    /**
     * Constructor: SuperMap.ServiceException
     * 服务失败事件数据类构造函数。
     *
     * Parameters:
     * code - {Number} 服务端返回的状态码。
     * errorMsg - {String} 服务端返回的异常信息。
     */
    initialize: function(code, errorMsg) {
        var me = this;
        me.code = code;
        me.errorMsg = errorMsg;
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。 
     */
    destroy: function() {
        var me = this;
        me.code = null;
        me.errorMsg = null;
    },
    
    CLASS_NAME: "SuperMap.ServiceException"
});

/**
 * Function: SuperMap.ServiceException.fromJson
 * 将 JSON 对象表示的服务异常类转化为 ServiceException 对象。 
 *
 * Parameters:
 * jsonObject - {Object} JSON 对象表示的服务异常类。
 *
 * Returns:
 * {<SuperMap.ServiceException>} 转化后的 ServiceException 对象。
 */
SuperMap.ServiceException.fromJson = function(jsonObject) {
    if (!jsonObject) {
        return;
    }
    return new SuperMap.ServiceException(jsonObject.code, jsonObject.errorMsg);
};