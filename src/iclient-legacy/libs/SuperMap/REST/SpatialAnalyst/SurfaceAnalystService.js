/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/SurfaceAnalystResult.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/SurfaceAnalystParameters.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/SurfaceAnalystEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/ServiceFailedEventArgs.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/DatasetSurfaceAnalystParameters.js
 * @requires SuperMap/iServerJava6R/SpatialAnalyst/GeometrySurfaceAnalystParameters.js
 */

/**
 * Class: SuperMap.REST.SurfaceAnalystService
 * 表面分析服务类。
 * 该类负责将客户设置的表面分析服务参数传递给服务端，并接收服务端返回的表面分析服务分析结果数据。
 * 表面分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.SurfaceAnalystEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的表面分析结果数据，result 为服务端返回的表面分析结果数据，保存在 {<SuperMap.REST.SurfaceAnalystResult>} 对象中。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.SurfaceAnalystService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回专题图结果触发该事件。 
     * - *processFailed* 服务端返回专题图结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 SurfaceAnalystService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回表面分析结果时触发 processCompleted 事件，服务端返回表面分析结果失败时触发 processFailed 事件。 
     * 
     * 例如：
     * (start code)     
     * var mySurfaceAnalystService = new SuperMap.REST.SurfaceAnalystService(url);
     * mySurfaceAnalystService.events.on({
     *     "processCompleted": surfaceAnalysCompleted, 
     *	   "processFailed": surfaceAnalysError
     *	   }
     * );
     * function surfaceAnalysCompleted(surfaceAnalysEventArgs){//todo};
     * function surfaceAnalysError(surfaceAnalysEventArgs){//todo};
     * (end)     
     */     
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 SurfaceAnalystService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /** 
     * Property: lastResult
     * {<SuperMap.REST.SurfaceAnalystResult>} 服务端返回的专题图结果数据。 
     */
    lastResult: null,

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
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        var me = this;

        if (options) {
            SuperMap.Util.extend(me, options);
        }
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。  
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
        if (me.lastResult) {
            me.lastResult.destroy();
            me.lastResult = null;
        }
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
        var me = this,
            jsonParameters;
        
        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.surfaceAnalystComplete,
            failure: me.surfaceAnalystError
        });
    },

    /**
     * Method: surfaceAnalystComplete
     * 表面分析完成，执行此方法。
     *
     * Parameters:
     * orgResult - {Object} 服务器返回的结果对象。
     */
    surfaceAnalystComplete: function(result) {
        var me = this,
            qe = null,
            surfaceAnalystResult = null;
        result = SuperMap.Util.transformResult(result);
        surfaceAnalystResult = new SuperMap.REST.SurfaceAnalystResult.fromJson(result);
        me.lastResult = surfaceAnalystResult;
        qe = new SuperMap.REST.SurfaceAnalystEventArgs(surfaceAnalystResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: surfaceAnalystError
     * 表面分析失败，执行此方法。
     *
     * Parameters:
     * orgResult -  {Object} 服务器返回的结果对象。
     */
    surfaceAnalystError: function(result) {
        var me = this,
            error = null,
            serviceException = null,
            qe = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        qe = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", qe);
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