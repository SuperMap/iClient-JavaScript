/**
 * Class: SuperMap.REST.GetLibInfoEventArgs
 * 标绘服务中获取标号库信息事件类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.GetLibInfoEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.GetLibInfoResult>} 服务端返回的标号库信息结果数据。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.GetLibInfoEventArgs
     * 初始化 GetLibInfoEventArgs 类的新实例。
     *
     * Parameters:
     * result - {<SuperMap.REST.GetLibInfoResult>} 服务端返回的结果数据。
     * originResult - {Object} 服务端返回的用 JSON 对象表示的当前库下符号信息结果数据。
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

    CLASS_NAME: "SuperMap.REST.GetLibInfoEventArgs"
});