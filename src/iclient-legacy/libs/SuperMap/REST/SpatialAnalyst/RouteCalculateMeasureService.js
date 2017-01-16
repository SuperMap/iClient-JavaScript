/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteCalculateMeasureResult.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteCalculateMeasureEventArgs.js
 * @requires SuperMap/REST/Service/ServiceFailedEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteCalculateMeasureParameters.js
 */

/**
 * Class: SuperMap.REST.RouteCalculateMeasureService
 * 该类负责将客户设置的计算指定点的M值参数传递给服务端，并接收服务端返回的
 *      指定点的M值。通过该类支持的事件的监听函数参数获取，参数类型为
 *      {<SuperMap.REST.RouteCalculateMeasureEventArgs>};获取的结果数据包
 *      括 originResult 、result 两种，其中，originResult 为服务端返回的用 JSON
 *      对象表示的结果数据，result 为服务端返回的路由对象计算指定点M值的结果
 *      数据，其中包含了资源的相关信息。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.RouteCalculateMeasureService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 此类支持的事件类型。
     * - *processCompleted*  计算指定点的M值请求成功触发该事件。
     * - *processFailed*   计算指定点的M值请求失败触发该事件。
     */
    EVENT_TYPES:["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>}  在 RouteCalculateMeasureService 类中处理所有事
     *      件的对象，支持 processCompleted 、processFailed 两种事件。
     *
     * 例如:
     * (start code)
     * var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(url);
     * routeCalculateMeasureService.events.on({
     *     "processCompleted": routeCalculateMeasureCompleted,
     *	   "processFailed": routeCalculateMeasureFailed
     *	   }
     * );
     * function routeCalculateMeasureCompleted(args){//todo};
     * function routeCalculateMeasureFailed(args){//todo};
     * (end)
     */
    events:null,

    /**
     * APIProperty: eventListeners
     * {Object}  监听器对象，在构造函数中设置此参数（可选），对
     *      RouteCalculateMeasureService 支持的两个事件 processCompleted 、
     *      processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners:null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.RouteCalculateMeasureResult>}  服务端返回的结果数据。
     */
    lastResult:null,

    /**
     * Constructor: SuperMap.REST.RouteCalculateMeasureService
     * 计算指定点的M值服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     * var parameters = new SuperMap.REST.RouteCalculateMeasureParameters({
     *     "sourceRoute":{
     *         "type":"LINEM",
     *        "parts":[4],
     *         "points":[
     *             {
     *                 "measure":0,
     *                 "y":-6674.466867067764,
     *                 "x":3817.3527876130133
     *             },
     *             {
     *                 "measure":199.57954019411724,
     *                 "y":-6670.830929417594,
     *                 "x":3617.806369901496
     *             },
     *             {
     *                 "measure":609.3656478634477,
     *                "y":-6877.837541432356,
     *                 "x":3264.1498746678444
     *             },
     *             {
     *                 "measure":936.0174126282958,
     *                 "y":-7038.687780615184,
     *                 "x":2979.846206068903
     *             }
     *         ]
     *     },
     *     "tolerance":1,
     *     "point":{
     *         "x":3330.7754269417,
     *         "y":-6838.8394457216
     *     },
     *     "isIgnoreGap":false
     * });
     *
     * var routeCalculateMeasureService = new SuperMap.REST.RouteCalculateMeasureService(spatialAnalystURL, {
     *     eventListeners:{
     *         processCompleted:calculateCompleted,
     *         processFailed:calculateFailded
     *     }
     * );
     * routeCalculateMeasureService.processAsync(parameters);
     *
     *  //执行
     * function calculateCompleted(){todo}
     * function calculateFailded(){todo}
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize:function (url, options) {
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
    destroy:function () {
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
     * 负责将客户端的基于路由对象计算指定点M值操作的参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.RouteCalculateMeasureParameters>}
     */
    processAsync:function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method:"POST",
            data:jsonParameters,
            scope:me,
            success:me.RouteCalculateMeasureComplete,
            failure:me.RouteCalculateMeasureError
        });
    },

    /**
     * Method: RouteCalculateMeasureComplete
     * 计算指定点的M值请求成功触发该事件。
     *
     * Parameters:
     * orgResult - {Object} 服务器返回的结果对象。
     */
    RouteCalculateMeasureComplete:function (result) {
        var me = this, qe, RouteCalculateMeasureResult;
        result = SuperMap.Util.transformResult(result);
        RouteCalculateMeasureResult = new SuperMap.REST.RouteCalculateMeasureResult.fromJson(result);
        me.lastResult = RouteCalculateMeasureResult;
        qe = new SuperMap.REST.RouteCalculateMeasureEventArgs(RouteCalculateMeasureResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: RouteCalculateMeasureError
     * 计算指定点的M值请求失败触发该事件。
     *
     * Parameters:
     * result -  {Object}
     */
    RouteCalculateMeasureError:function (result) {
        var me = this, error, serviceException, qe;
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
     * params - {<SuperMap.REST.RouteCalculateMeasureParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters:function (params) {
        var jsonParameters, jsonStr = "geometry/calculatemeasure", me = this, end;
        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";
        } else {
            me.url += (end === "/") ? jsonStr + ".jsonp" : "/" + jsonStr + ".jsonp";
        }

        me.url += "?returnContent=true";
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    },

    CLASS_NAME:"SuperMap.REST.RouteCalculateMeasureService"
});