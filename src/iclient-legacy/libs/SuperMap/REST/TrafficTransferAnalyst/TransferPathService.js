/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/TransferPathResult.js
 * @requires SuperMap/REST/TransferPathParameters.js
 * @requires SuperMap/REST/TransferPathEventArgs.js
 * @requires SuperMap/REST/ResourceInfo.js
 */

/**
 * Class: SuperMap.REST.TransferPathService
 * 交通换乘线路查询服务类，根据交通换乘分析结果(TransferSolutionResult)，获取某一条乘车路线的详细信息。
 * 返回结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.TransferPathEventArgs>}; 获取的结果数据包括 result 、originResult 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的结果数据，result 为服务端返回的结果数据，保存在 {<SuperMap.REST.TransferPathResult>} 对象中 。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.TransferPathService = SuperMap.Class(SuperMap.ServiceBase, {
    
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
     * {<SuperMap.Events>} 在 TransferPathService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     * 
     * 例如：
     *     (start code) 
     * var myService = new SuperMap.REST.TransferPathService(url); 
     * myService.events.on({
     *     "processCompleted": TrafficTransferCompleted, 
     *       "processFailed": TrafficTransferError
     *       }
     * );
     * function TrafficTransferCompleted(TransferPathEventArgs){//todo};
     * function TrafficTransferError(TransferPathEventArgs){//todo};
     * (end)     
     */   
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 TransferPathService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /** 
     * Property: lastResult
     * {<SuperMap.REST.TransferPathResult>} 服务端返回的结果数据。 
     */
    lastResult: null,
    
    /**
     * Constructor: SuperMap.REST.TransferPathService
     * 交通换乘线路服务类构造函数。     
     * 
     * 例如：
     * (start code)     
     * var myService = new SuperMap.REST.TransferPathService(url, {eventListeners: {
     *     "processCompleted": TrafficTransferCompleted, 
     *     "processFailed": TrafficTransferError
     *     }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 与客户端交互的交通换乘线路查询服务地址。
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
     * params - {<SuperMap.REST.TransferPathParameters>} 交通换乘参数。
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
        me.url += me.isInTheSameDomain ? "path.json?" : "path.jsonp";
        
        jsonParameters = {
            points: SuperMap.Util.toJSON(params.points),
            transferLines: params['transferLines']
        }
        
        me.request({
            method: method,
            params: jsonParameters,
            scope: me,
            success: me.TransferPathCompleted,
            failure: me.TransferPathFailed
        });
    },

    /**
     * Method: TransferPathCompleted
     * 编辑完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    TransferPathCompleted: function(result) {
        var me = this,
            qe = null,
            pathResult = null;
        
        result = SuperMap.Util.transformResult(result);
        pathResult= SuperMap.REST.TransferPathResult.fromJson(result);      
        me.lastResult = pathResult;
        qe = new SuperMap.REST.TransferPathEventArgs(pathResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },
    
    /**
     * Method: TransferPathFailed
     * 编辑失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    TransferPathFailed: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.TransferPathService"
});
