/**
 * Class: SuperMap.REST.GetSMLInfosEventArgs
 * 获取服务器态势图信息列表的事件类
 *
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.REST.GetSMLInfosEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {

    /**
     * APIProperty: result
     * {<SuperMap.REST.GetSMLInfosResult>} 服务端返回的结果数据。
     */
    result: null,

    /**
     * Constructor: SuperMap.REST.GetSMLInfosEventArgs
     * 初始化 GetSMLInfosEventArgs 类的新实例。
     *
     * Parameters:
     * result - {<SuperMap.REST.GetSMLInfosResult>} 服务端返回的结果数据。
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

    CLASS_NAME: "SuperMap.REST.GetSMLInfosEventArgs"
});