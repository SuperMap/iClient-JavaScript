/**
 * @requires SuperMap/ServiceEventArgs.js
 */

/**
 * Class: SuperMap.Cloud.POIInfosEventArgs
 * 兴趣点搜索服务事件类。
 * 该类包含服务端返回的兴趣点搜索的结果信息。
 * Inherits from:
 *  - <SuperMap.ServiceEventArgs> 
 */
SuperMap.Cloud.POIInfosEventArgs = SuperMap.Class(SuperMap.ServiceEventArgs, {
    
    /** 
     * APIProperty: result
     * {<SuperMap.Cloud.POIInfosResult>} 兴趣点搜索结果信息。
     */
    result: null,
    
    /**
     * Constructor: SuperMap.Cloud.POIInfosEventArgs
     * 
     *
     * Parameters:
     * result - {<SuperMap.Cloud.POIInfosResult>} 
     * originResult - {Object} 服务端返回的用 JSON 对象表示的查询结果数据。
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
    
    CLASS_NAME: "SuperMap.Cloud.POIInfosEventArgs"
});