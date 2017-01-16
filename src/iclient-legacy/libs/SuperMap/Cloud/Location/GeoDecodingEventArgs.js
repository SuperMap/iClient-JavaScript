
SuperMap.Cloud.GeoDecodingEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    /**
     * APIProperty: result
     * {Array(<SuperMap.Cloud.GeocodingResult>)} 逆地理编码返回的结果。
     */
    result: null,

    /**
     * Constructor: SuperMap.Cloud.GeoDecodingEventArgs
     * 逆地理编码服务结果查询事件类构造函数。
     *
     * Parameters:
     * result - {<Object>} 逆地理编码查询返回的结果。
     * originResult - {Object} 从服务端获取的 Json 对象表示的逆地理编码查询结果。
     */
    initialize: function(result, originResult) {
        SuperMap.ServiceEventArgs.prototype.initialize.apply(this, [originResult]);
        var me = this;
        me.result = result;
    },

    destroy: function() {
        SuperMap.ServiceEventArgs.prototype.destroy.apply(this);
        var me = this;
        if (me.result) {
            me.result.destroy();
            me.result = null;
        }
    },

    CLASS_NAME: "SuperMap.Cloud.GeoDecodingEventArgs"
});