/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/Data/QueryFieldsResult.js
 */

/**
 * Class: SuperMap.REST.GetFieldsService
 * 字段查询服务，支持查询指定数据集的中所有属性字段（field）的集合。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.GetFieldsService = SuperMap.Class(SuperMap.ServiceBase, {
    
    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *      
     * 此类支持的事件类型:
     * - *processCompleted* 服务端返回查询结果触发该事件。 
     * - *processFailed* 服务端返回查询结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GetFieldsService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     * 
     * 例如：
     *     (start code) 
     * var myService = new SuperMap.REST.GetFieldsService(url); 
     * myService.events.on({
     *     "processCompleted": getFieldsCompleted, 
     *       "processFailed": getFieldsError
     *       }
     * );
     * function getFieldsCompleted(GetFieldsEventArgs){//todo};
     * function getFieldsError(ServiceFailedEventArgs){//todo};
     * (end)     
     */   
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetFieldsService 支持的
     * 两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.GetFieldsResult>} 服务端返回的结果数据。 
     */
    lastResult: null,
    
    /**
     * APIProperty: datasource
     * {String} 要查询的数据集所在的数据源名称。
     */
    datasource: null,
    
    /**
     * APIProperty: dataset
     * {String} 要查询的数据集名称。
     */
    dataset: null,
    
    /**
     * Constructor: SuperMap.REST.GetFieldsService
     * 字段查询服务构造函数。     
     * 
     * 例如：
     * (start code)     
     * var myService = new SuperMap.REST.GetFieldsService(url, {eventListeners: {
     *     "processCompleted": getFieldsCompleted, 
     *     "processFailed": getFieldsError
     *     },
     *     datasource: "World",
     *     dataset: "Countries"
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/data-world/rest/data 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * datasource - {String} 
     * dataset - {String} 
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
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments); 
        var me = this;
        me.EVENT_TYPES = null;
        me.datasource = null;
        me.dataset = null;
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
     * 执行服务，查询指定数据集的字段信息。
     */
    processAsync: function() {
        var me = this, 
            end = me.url.substr(me.url.length - 1, 1),
            datasetURL = "datasources/" + me.datasource + "/datasets/" + me.dataset;
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? datasetURL + "/fields.json?": "/" + datasetURL + "/fields.json?";
        } else {
            me.url += (end == "/") ? datasetURL + "fields.jsonp?": "/" + datasetURL + "/fields.jsonp?";
        }
        
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.getFieldsComplted,
            failure: me.getFieldsFailed
        });
    },

    /**
     * Method: getFieldsComplted
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getFieldsComplted: function(result) {
        var me = this,
            qe = null,
            getFieldsResult = null;
        
        result = SuperMap.Util.transformResult(result);
        getFieldsResult = SuperMap.REST.GetFieldsResult.fromJson(result);
        
        me.lastResult = getFieldsResult;
        qe = new SuperMap.REST.GetFieldsEventArgs(getFieldsResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: getFieldsFailed
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getFieldsFailed: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.GetFieldsService"
});