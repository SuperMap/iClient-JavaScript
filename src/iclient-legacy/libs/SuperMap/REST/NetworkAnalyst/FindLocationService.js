/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/REST/NetworkAnalyst/FindLocationEventArgs.js
 * @requires SuperMap/REST/NetworkAnalyst/FindLocationResult.js
 * @requires SuperMap/REST/NetworkAnalyst/FindLocationParameters.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 */

/**
 * Class: SuperMap.REST.FindLocationService
 * 选址分区分析服务类。
 * 选址分区分析是为了确定一个或多个待建设施的最佳或最优位置，使得设施可以用一种最经济有效的方式为需求方提供服务或者商品。
 * 选址分区不仅仅是一个选址过程，还要将需求点的需求分配到相应的新建设施的服务区中，因此称之为选址与分区。
 * 选址分区分析结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.FindLocationEventArgs>}; 获取的结果数据包括 originResult 、result 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的选址分区分析结果数据，result 为服务端返回的选址分区分析结果数据，保存在 {<SuperMap.REST.FindLocationResult>} 对象中。
 * 
 * Inherits from:
 *  - <SuperMap.ServiceBase> 
 */
SuperMap.REST.FindLocationService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回选址分区分析结果触发该事件。 
     * - *processFailed* 服务端返回选址分区分析结果失败触发该事件。       
     */
    EVENT_TYPES: [ 
        "processCompleted", "processFailed"],
    
    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 FindLocationService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回选址分区分析结果时触发 processCompleted 事件，服务端返回选址分区分析结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)     
     * var myFindLocationService = new SuperMap.REST.FindLocationService(url);
     * myFindLocationService.events.on({
     *     "processCompleted": findLocationCompleted, 
     *	   "processFailed": findLocationError
     *	   }
     * );
     * function findLocationCompleted(findLocationEventArgs){//todo};
     * function findLocationError(findLocationEventArgs){//todo};
     * (end)     
     */ 
    events: null,
    
    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 FindLocationService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /** 
     * Property: lastResult
     * {<SuperMap.REST.FindLocationResult>} 服务端返回的选址分区分析结果数据。  
     */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.FindLocationService
     * 选址分区分析服务类构造函数。
     *
     * 例如：
     * (start code)     
     * var findLocationService = new SuperMap.REST.FindLocationService(url, {
     *     eventListeners: {
     *         "processCompleted": findLocationCompleted, 
     *		   "processFailed": findLocationError
     *		   }
     * });
     * (end)     
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/transportationanalyst-sample/rest/networkanalyst/RoadNet@Changchun 。
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
     * 释放资源，将引用资源的属性置空。  
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
     * params - {<SuperMap.REST.FindLocationParameters>} 
     */
    processAsync: function(params) {
        if (!params) {
            return;
        }
        var me = this, jsonObject,
            end = me.url.substr(me.url.length - 1, 1);
        me.url = me.url + ((end === "/") ? "location" : "/location") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");
        jsonObject = {
            isFromCenter: params.isFromCenter,
            expectedSupplyCenterCount: params.expectedSupplyCenterCount,
//            nodeDemandField: params.nodeDemandField,
            weightName: params.weightName,
            turnWeightField: params.turnWeightField,
            returnEdgeFeature: true,
            returnEdgeGeometry: true,
            returnNodeFeature: true,
            mapParameter: SuperMap.Util.toJSON(params.mapParameter),
            supplyCenters: me.getCentersJson(params.supplyCenters)
        };
        me.request({
            method: "GET",
            params: jsonObject,
            scope: me,
            success: me.findLocationComplete,
            failure: me.findLocationError
        });
    },
    
    /**
     * Method: getCentersJson
     * 将数组对象转化为JSON字符串。
     *
     * Parameters:
     * params - {Array} 
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getCentersJson: function(params) {
        var json = "[",
            len = params ? params.length : 0;
        for (var i=0; i<len; i++) {
            if(i >0) json += ",";
            json += SuperMap.Util.toJSON(params[i]);
        }
        json += "]";
        return json;
    },
    
    /**
     * Method: findLocationComplete
     * 选址分区分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    findLocationComplete: function(result) {
        var me = this,
            findLocationResult, fe;
        result = SuperMap.Util.transformResult(result);
        findLocationResult = SuperMap.REST.FindLocationResult.fromJson(result);
        me.lastResult = findLocationResult;
        fe = new SuperMap.REST.FindLocationEventArgs(findLocationResult, result);
        me.events.triggerEvent("processCompleted", fe);
    },
    
    /**
     * Method: findLocationError
     * 选址分区分析失败，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    findLocationError: function(result) {
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
    
    CLASS_NAME: "SuperMap.REST.FindLocationService"
});