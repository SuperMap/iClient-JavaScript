/**
 * Class: SuperMap.Cloud.PathAnalystEventArgs
 * 路径导航分析事件数据类。
 * 该类包含了路径导航分析的结果状态信息。
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs>
 */
SuperMap.Cloud.PathAnalystEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    /**
     * APIProperty: result
     * {Array(<SuperMap.Cloud.PathAnalystResult>)} 路径导航分析返回的结果。
     */
    result: null,
    
	 /**
     * Constructor: SuperMap.Cloud.PathAnalystEventArgs
     * 路径导航分析事件数据类构造函数。
     *
     * Parameters:
     * result - {<Object>} 路径导航分析的返回结果。
     * originResult - {Object} 从服务端获取的 Json 对象表示的路径导航分析结果。
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
	
    CLASS_NAME: "SuperMap.Cloud.PathAnalystEventArgs"
});