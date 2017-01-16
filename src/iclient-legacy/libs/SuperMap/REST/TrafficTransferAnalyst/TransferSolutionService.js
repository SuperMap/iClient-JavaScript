/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/TransferSolutionResult.js
 * @requires SuperMap/REST/TransferSolutionParameters.js
 * @requires SuperMap/REST/TransferSolutionEventArgs.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferSolutionService
 * 交通换乘方案查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.TransferSolutionEventArgs>}; 获取的结果数据包括 result 、originResult 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的结果数据，result 为服务端返回的结果数据，保存在 {<SuperMap.REST.TransferSolutionResult>} 对象中 。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.TransferSolutionService = SuperMap.Class(SuperMap.ServiceBase, {
    
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
     * {<SuperMap.Events>} 在 TransferSolutionService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     * 
     * 例如：
     *     (start code) 
     * var myService = new SuperMap.REST.TransferSolutionService(url); 
     * myService.events.on({
     *     "processCompleted": TrafficTransferCompleted, 
     *     "processFailed": TrafficTransferError
     *     }
     * );
     * function TrafficTransferCompleted(TransferSolutionEventArgs){//todo};
     * function TrafficTransferError(TransferSolutionEventArgs){//todo};
     * (end)     
     */   
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 TransferSolutionService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.TransferSolutionResult>} 服务端返回的结果数据。 
     */
    lastResult: null,
    
    /**
     * Constructor: SuperMap.REST.TransferSolutionService
     * 交通换乘方案查询服务类构造函数。     
     * 
     * 例如：
     * (start code)     
     * var myService = new SuperMap.REST.TransferSolutionService(url, {eventListeners: {
     *     "processCompleted": TrafficTransferCompleted, 
     *     "processFailed": TrafficTransferError
     *     }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 与客户端交互的交通换乘方案查询服务地址。
     * 例如:"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        options = options || {};
        SuperMap.Util.extend(this, options);
        var me = this;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if(me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
    },
    
    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。  
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments); 
        SuperMap.Util.reset(this);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.TransferSolutionParameters>} 交通换乘参数。
     */
    processAsync: function(params) {
        if(!params){
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters,
            end;
            
        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += me.isInTheSameDomain ? "solutions.json?" : "solutions.jsonp";
        
        jsonParameters = {
            points: SuperMap.Util.toJSON(params.points),
            walkingRatio: params['walkingRatio'],
            transferTactic: params['transferTactic'],
            solutionCount: params['solutionCount'],
            transferPreference: params["transferPreference"]
        };
        if(params.evadeLines) jsonParameters["evadeLines"] = SuperMap.Util.toJSON(params.evadeLines);
        if(params.evadeStops) jsonParameters["evadeStops"] = SuperMap.Util.toJSON(params.evadeStops);
        if(params.priorLines) jsonParameters["priorLines"] = SuperMap.Util.toJSON(params.priorLines);
        if(params.priorStops) jsonParameters["priorStops"] = SuperMap.Util.toJSON(params.priorStops);
        if(params.travelTime) jsonParameters["travelTime"] = params.travelTime;

        me.request({
            method: method,
            params: jsonParameters,
            scope: me,
            success: me.TransferSolutionComplted,
            failure: me.TransferSolutionFailed
        });
    },

    /**
     * Method: TransferSolutionComplted
     * 编辑完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    TransferSolutionComplted: function(result) {
        var me = this,
            qe = null,
            solutionResult = null;
        
        result = SuperMap.Util.transformResult(result);
        solutionResult= SuperMap.REST.TransferSolutionResult.fromJson(result);      
        me.lastResult = solutionResult;
        qe = new SuperMap.REST.TransferSolutionEventArgs(solutionResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: TransferSolutionFailed
     * 编辑失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    TransferSolutionFailed: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.TransferSolutionService"
});
