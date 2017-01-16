/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/REST/NetworkAnalyst/ComputeWeightMatrixEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/ComputeWeightMatrixResult.js
 * @requires SuperMap/REST/NetworkAnalyst/ComputeWeightMatrixParameters.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 */

/**
 * Class: SuperMap.REST.ComputeWeightMatrixService
 * 耗费矩阵分析服务类。
 * 耗费矩阵是根据交通网络分析参数中的耗费字段来计算一个二维数组，
 * 用来存储指定的任意两点间的资源消耗。
 * 耗费矩阵分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.ComputeWeightMatrixEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的耗费矩阵分析结果数据，result 为服务端返回的耗费矩阵分析结果数据，保存在 {<SuperMap.REST.SurfaceAnalystResult>} 对象中。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.ComputeWeightMatrixService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回耗费矩阵分析结果触发该事件。 
     * - *processFailed* 服务端返回耗费矩阵分析结果失败触发该事件。       
     */
    EVENT_TYPES: [ 
        "processCompleted", "processFailed"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 ComputeWeightMatrixService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回耗费矩阵分析结果时触发 processCompleted 事件，服务端返回耗费矩阵分析结果失败时触发 processFailed 事件。 
     *
     * 例如：
     * (start code)
     * var myComputeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url)
     * myComputeWeightMatrixService.events.on({
     *     "processCompleted": computeWeightMatrixCompleted, 
     *	   "processFailed": computeWeightMatrixError
     *	   }
     * );
     * function computeWeightMatrixCompleted(computeWeightMatrixEventArgs){//todo};
     * function computeWeightMatrixnError(computeWeightMatrixEventArgs){//todo};
     * (end)
     */ 
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 ComputeWeightMatrixService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /** 
     * Property: lastResult
     * {<SuperMap.REST.ComputeWeightMatrixResult>} 服务端返回的耗费矩阵分析结果数据。  
     */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.ComputeWeightMatrixService
     * 耗费矩阵分析服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var mycomputeWeightMatrixService = new SuperMap.REST.ComputeWeightMatrixService(url,{
     *     eventListeners: {
     *	       "processCompleted": computeWeightMatrixCompleted, 
     *		   "processFailed": computeWeightMatrixnError
     *		   }
     * });
     * (end)     
     *
     * Parameters:
     * url - {String} 耗费矩阵分析服务地址。请求服务的URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{网络分析服务名}/rest/networkanalyst/{网络数据集@数据源}；
     * 例如:"http://localhost:8090/iserver/services/components-rest/rest/networkanalyst/RoadNet@Changchun"。
     * options - {Object} 参数。     
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
  
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
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
        me.events = null;
        me.eventListeners = null;
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
     * params - {<SuperMap.REST.ComputeWeightMatrixParameters>} 
     */
    processAsync: function(params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "weightmatrix" : "/weightmatrix") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            parameter: SuperMap.Util.toJSON(params.parameter),
            nodes: me.getJson(params.isAnalyzeById, params.nodes)
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.computeWeightMatrixComplete,
            failure: me.computeWeightMatrixError
        });
    },
    
    /**
     * Method: getJson
     * 将对象转化为JSON字符串。
     *
     * Parameters:
     * isAnalyzeById - {Boolean}
     * params - {Array} 
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJson: function (isAnalyzeById, params) {
        var jsonString = "[",
            len = params ? params.length : 0;
        
        if (isAnalyzeById === false) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += '{"x":' + params[i].x + ',"y":' + params[i].y + '}';
            }            
        } else if (isAnalyzeById == true) {
            for (var i = 0; i < len; i++) {
                if (i > 0) jsonString += ",";
                jsonString += params[i];
            }
        }        
        jsonString += ']';
        return jsonString;
    },
    
    /**
     * Method: computeWeightMatrixComplete
     * 耗费矩阵分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    computeWeightMatrixComplete: function(result) {
        var me = this,
            computeWeightMatrix, fe;
        result = SuperMap.Util.transformResult(result);
        computeWeightMatrix = SuperMap.REST.ComputeWeightMatrixResult.fromJson(result);
        me.lastResult = computeWeightMatrix;
        fe = new SuperMap.REST.ComputeWeightMatrixEventArgs(computeWeightMatrix, result);
        me.events.triggerEvent("processCompleted", fe);
    },
    
    /**
     * Method: computeWeightMatrixError
     * 耗费矩阵分析失败，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    computeWeightMatrixError: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.ComputeWeightMatrixService"
});