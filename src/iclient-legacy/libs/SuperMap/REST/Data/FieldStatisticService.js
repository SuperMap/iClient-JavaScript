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
 * Class: SuperMap.REST.FieldStatisticService
 * 字段查询统计服务类。用来完成对指定数据集指定字段的查询统计分析，即求平均值，最大值等。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.FieldStatisticService = SuperMap.Class(SuperMap.ServiceBase, {
    
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
     * {<SuperMap.Events>} 在 FieldStatisticService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     * 
     * 例如：
     *     (start code) 
     * var myService = new SuperMap.REST.FieldStatisticService(url); 
     * myService.events.on({
     *     "processCompleted": fieldStatisticCompleted, 
     *       "processFailed": fieldStatisticError
     *       }
     * );
     * function fieldStatisticCompleted(FieldStatisticEventArgs){//todo};
     * function fieldStatisticError(ServiceFailedEventArgs){//todo};
     * (end)     
     */   
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 FieldStatisticService 支持的
     * 两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.FieldStatisticResult>} 服务端返回的查询统计结果数据。 
     */
    lastResult: null,
    
    /**
     * APIProperty: datasource
     * {String} 数据集所在的数据源名称。
     */
    datasource: null,
    
    /**
     * APIProperty: dataset
     * {String} 数据集名称。
     */
    dataset: null,
    
    /**
     * APIProperty: field
     * {String} 查询统计的目标字段名称。
     */
    field: null,
    
    /**
     * APIProperty: statisticMode
     * {<SuperMap.REST.StatisticMode>} 字段查询统计的方法类型。
     */
    statisticMode: null,
    
    /**
     * Constructor: SuperMap.REST.FieldStatisticService
     * 字段查询统计服务类构造函数。     
     * 
     * 例如：
     * (start code)     
     * var myService = new SuperMap.REST.FieldStatisticService(url, {eventListeners: {
     *     "processCompleted": fieldStatisticCompleted, 
     *     "processFailed": fieldStatisticError
     *     }，
     *     datasource: "World",
     *     dataset: "Countries",
     *     field: "SmID",
     *     statisticMode: SuperMap.REST.StatisticMode.AVERAGE
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如访问World Map服务，只需将url设为: http://localhost:8090/iserver/services/data-world/rest/data 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * datasource - {String} 数据集所在的数据源名称。
     * dataset - {String} 数据集名称。
     * field - {String} 查询统计的目标字段名称。
     * statisticMode - {<SuperMap.REST.StatisticMode>} 字段查询统计的方法类型。
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
        me.field = null;
        me.statisticMode = null;
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
     * 执行服务，进行指定字段的查询统计。
     */
    processAsync: function() {
        var me = this, 
            end = me.url.substr(me.url.length - 1, 1),
            fieldStatisticURL = "datasources/" + me.datasource + "/datasets/" + me.dataset + "/fields/" + me.field + "/" + me.statisticMode;
        if (me.isInTheSameDomain) {
            me.url += (end == "/") ? fieldStatisticURL + ".json?": "/" + fieldStatisticURL + ".json?";
        } else {
            me.url += (end == "/") ? fieldStatisticURL + ".jsonp?": "/" + fieldStatisticURL + ".jsonp?";
        }
        
        me.request({
            method: "GET",
            data: null,
            scope: me,
            success: me.fieldStatisticCompleted,
            failure: me.fieldStatisticFailed
        });
    },

    /**
     * Method: fieldStatisticCompleted
     * 字段查询统计成功执行该函数。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    fieldStatisticCompleted: function(result) {
        var me = this,
            qe = null,
            fieldStaResult = null;
        
        result = SuperMap.Util.transformResult(result);
        fieldStaResult = SuperMap.REST.FieldStatisticResult.fromJson(result);
        
        me.lastResult = fieldStaResult;
        qe = new SuperMap.REST.FieldStatisticEventArgs(fieldStaResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: fieldStatisticFailed
     * 字段查询统计失败执行该函数。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    fieldStatisticFailed: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.FieldStatisticService"
});