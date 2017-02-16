/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.SurfaceAnalystService
 * 表面分析服务类。
 * 该类负责将客户设置的表面分析服务参数传递给服务端，并接收服务端返回的表面分析服务分析结果数据。
 * 表面分析结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.REST.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
SuperMap.REST.SurfaceAnalystService = SuperMap.Class(SuperMap.REST.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.REST.SurfaceAnalystService
     * 表面分析服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var mySurfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(url, {
     *      eventListeners: {
     *	       "processCompleted": surfaceAnalysCompleted, 
     *		   "processFailed": surfaceAnalysFailed
     *		   }
     * });  
     * (end)     
     *          
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.REST.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。  
     */
    destroy: function() {
        SuperMap.REST.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的表面分析服务参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.SurfaceAnalystParameters>} 
     */
    processAsync: function(params) {
        if (!params) {
            return;
        }
        var me = this, jsonParameters;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJsonParameters
     * 将参数转化为 JSON 字符串。 
     *
     * Parameters:
     * params - {<SuperMap.REST.SurfaceAnalystParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function(params) {
        var jsonParameters = "";
        var me = this, end;
        if (params instanceof SuperMap.REST.DatasetSurfaceAnalystParameters) {
            var end = me.url.substr(me.url.length - 1, 1);
            
            if (me.isInTheSameDomain) {
                me.url += (end === "/") ? "datasets/" + params.dataset + "/" + params.surfaceAnalystMethod.toLowerCase() +
                ".json?returnContent=true" : "/datasets/" + params.dataset + "/" + 
                params.surfaceAnalystMethod.toLowerCase() + ".json?returnContent=true";
            } else {
                me.url += (end === "/") ? "datasets/" + params.dataset + "/" + params.surfaceAnalystMethod.toLowerCase() +
                ".jsonp?returnContent=true" : "/datasets/" + params.dataset + "/" + 
                params.surfaceAnalystMethod.toLowerCase() + ".jsonp?returnContent=true";
            }
        } else if (params instanceof SuperMap.REST.GeometrySurfaceAnalystParameters) {
            end = me.url.substr(me.url.length - 1, 1);
            if (me.isInTheSameDomain) {
                me.url += (end === "/") ? "geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                ".json?returnContent=true": "/geometry/" + params.surfaceAnalystMethod.toLowerCase() + 
                ".json?returnContent=true";
            } else {
                me.url += (end === "/") ? "geometry/" + params.surfaceAnalystMethod.toLowerCase() +
                ".jsonp?returnContent=true": "/geometry/" + params.surfaceAnalystMethod.toLowerCase() + 
                ".jsonp?returnContent=true";
            }
        } else {
            return;
        }
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    },

    CLASS_NAME: "SuperMap.REST.SurfaceAnalystService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.SurfaceAnalystService(url, options);
};