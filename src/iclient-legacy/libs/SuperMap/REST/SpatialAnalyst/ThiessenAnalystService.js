/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/REST/ServerGeometry.js
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 */

/**
 * Class: SuperMap.REST.ThiessenAnalystService
 * 泰森多边形分析服务类
 * 该类负责将客户设置的泰森多边形分析参数传递给服务端，并接收服务端返回的分析结果数据。
 * 泰森多边形分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.ThiessenAnalystEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的泰森多边形分析结果数据，result 为服务端返回的
 * 类型为 {<SuperMap.REST.ThiessenAnalystResult>} 的泰森多边形分析结果数据对象。
 * 泰森多边形分析的参数支持两种，当参数为 {<SuperMap.REST.DatasetThiessenAnalystParameters>} 类型
 * 时，执行数据集泰森多边形分析，
 * 当参数为 {<SuperMap.REST.GeometryThiessenAnalystParameters>} 类型时，执行几何对象泰森多边形分析。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.ThiessenAnalystService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回泰森多边形分析结果触发该事件。 
     * - *processFailed* 服务端返回泰森多边形分析结果失败触发该事件。       
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 ThiessenAnalystService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回泰森多边形分析结果时触发 processCompleted 事件，服务端返回泰森多边形分析结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)     
     * var myThiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(url);
     * myThiessenAnalystService.events.on({
     *     "processCompleted": bufferCompleted, 
     *     "processFailed": bufferFailed
     *     }
     * );
     * function bufferCompleted(ThiessenAnalystEventArgs){//todo};
     * function bufferFailed(ServiceFailedEventArgs){//todo};
     * (end)     
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 ThiessenAnalystService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /** 
     * Property: lastResult
     * {<SuperMap.REST.ThiessenAnalystResult>}   
     * 服务端返回的泰森多边形分析结果数据。
     */
    lastResult: null,

    /**
     * Property: mode
     * {<String>} 缓冲区分析类型
     */
    mode: null,

    /**
     * Constructor: SuperMap.REST.ThiessenAnalystService
     * 泰森多边形分析服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var myThiessenAnalystService = new SuperMap.REST.ThiessenAnalystService(url, {
     *     eventListeners: {
     *           "processCompleted": bufferCompleted, 
     *           "processFailed": bufferFailed
     *           }
     *    }); 
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
     * 释放资源,将引用资源的属性置空。  
     */
    destroy: function () {
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
        me.mode = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.DatasetThiessenAnalystParameters>}/
     * {<SuperMap.REST.GeometryThiessenAnalystParameters>} 
     */
    processAsync: function (parameter) {
        var parameterObject = new Object();
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof SuperMap.REST.DatasetThiessenAnalystParameters) {
            me.mode = "datasets";
            me.url += 'datasets/' + parameter.dataset + '/thiessenpolygon';
            SuperMap.REST.DatasetThiessenAnalystParameters.toObject(parameter, parameterObject);
        }
        else if (parameter instanceof SuperMap.REST.GeometryThiessenAnalystParameters) {
            me.mode = "geometry";
            me.url += 'geometry/thiessenpolygon';
            SuperMap.REST.GeometryThiessenAnalystParameters.toObject(parameter, parameterObject);
        }

        var jsonParameters = SuperMap.Util.toJSON(parameterObject);


        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.analyzeComplete,
            failure: me.analyzeError
        });
    },

    /**
     * Method: analyzeComplete
     * 泰森多边形分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的泰森多边形分析结果对象。
     */
    analyzeComplete: function (result) {
        result = SuperMap.Util.transformResult(result);
        var analyzeResult = SuperMap.REST.ThiessenAnalystResult.fromJson(result);
        this.lastResult = analyzeResult;

        var se = new SuperMap.REST.ThiessenAnalystEventArgs(analyzeResult, result);
        this.events.triggerEvent("processCompleted", se);
    },

    /**
     * Method: analyzeError
     * 泰森多边形分析失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    analyzeError: function (result) {
        var me = this,
            error = null,
            serviceException = null,
            se = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        se = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", se);
    },

    CLASS_NAME: "SuperMap.REST.ThiessenAnalystService"
});