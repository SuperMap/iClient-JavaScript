/**
 * Class: SuperMap.REST.GetSymbolInfoEventArgs
 * 标绘服务中获取标号信息事件类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.GetSymbolInfoEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.GetSymbolInfoResult>} 服务端返回的结果数据。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.GetSymbolInfoEventArgs
     * 初始化 GetSymbolInfoEventArgs 类的新实例。
     *
     * Parameters:
     * result - {<SuperMap.REST.GetSymbolInfoResult>} 服务端返回的结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的结果数据。
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

    CLASS_NAME: "SuperMap.REST.GetSymbolInfoEventArgs"
});