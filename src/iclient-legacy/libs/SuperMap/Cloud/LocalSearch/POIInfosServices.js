/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.Cloud.POIInfosService
 * 兴趣点搜索服务类
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.Cloud.POIInfosService = SuperMap.Class(SuperMap.ServiceBase, {
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 搜索服务查询成功时触发该事件。 
     * - *processFailed* 搜索服务查询失败触发该事件。       
     */
    EVENT_TYPES: [ 
        "processCompleted", "processFailed"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 POIInfosService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回结果时触发 processCompleted  事件，服务端返回失败时触发 processFailed 事件。
     * 	 
     */   
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 POIInfosService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.Cloud.POIInfosResult>} 服务端返回的兴趣点搜索结果数据。 
     */
    lastResult: null,
    
    /**
     * Constructor: SuperMap.Cloud.POIInfosService
     * 兴趣点搜索服务类构造函数。     
     * 
     * Parameters:
     * url - {String} 服务地址。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this,
            end;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === ".") ? "json?": ".json?";
        } else {
            me.url += (end === ".") ? "jsonp?": ".jsonp?";
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。  
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
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.Cloud.POIInfosParameter>} 查询参数。
     */
    processAsync: function(params) {
        if(!params){
            return;
        }
        var jsonParams = SuperMap.Cloud.POIInfosParameter.toJsonParameters(params);
        var me = this;
        me.request({
            method: "GET",
            params: jsonParams,
            scope: me,
            success: me.queryComplete,
            failure: me.queryError
        });
    },

    /**
     * Method: queryComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    queryComplete: function(result) {
        var me = this,
            qe = null,
            poiInfosResult = null;
        result = SuperMap.Util.transformResult(result);
        poiInfosResult = SuperMap.Cloud.POIInfosResult.fromJson(result);
		
        me.lastResult = poiInfosResult;
        qe = new SuperMap.Cloud.POIInfosEventArgs(poiInfosResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: queryError
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    queryError: function(result) {
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
    
    CLASS_NAME: "SuperMap.Cloud.POIInfosService"
});