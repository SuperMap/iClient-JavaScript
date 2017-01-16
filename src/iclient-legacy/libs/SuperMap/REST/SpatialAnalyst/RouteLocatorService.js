/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteLocatorResult.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteLocatorEventArgs.js
 * @requires SuperMap/REST/Service/ServiceFailedEventArgs.js
 * @requires SuperMap/REST/SpatialAnalyst/RouteLocatorParameters.js
 */

/**
 * Class: SuperMap.REST.RouteLocatorService
 * 路由对象定位空间对象的服务类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.RouteLocatorService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)} 此类支持的事件类型。
     * - *processCompleted*  路由对象定位空间对象请求成功触发该事件。
     * - *processFailed*   路由对象定位空间对象请求失败触发该事件。
     */
    EVENT_TYPES:["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>}  在 RouteLocatorService 类中处理所有事件的对象，
     *      支持 processCompleted 、processFailed 两种事件。
     *
     * 例如:
     * (start code)
     * var routeLocatorService = new SuperMap.REST.RouteLocatorService(url);
     * routeLocatorService.events.on({
     *     "processCompleted": routeLocatorCompleted,
     *	   "processFailed": routeLocatorFailed
     *	   }
     * );
     * function routeLocatorCompleted(args){//todo};
     * function routeLocatorFailed(args){//todo};
     * (end)
     */
    events:null,

    /**
     * APIProperty: eventListeners
     * {Object}  监听器对象，在构造函数中设置此参数（可选），对
     *      RouteLocatorService 支持的两个事件 processCompleted 、
     *      processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners:null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.RouteLocatorResult>}  服务端返回的结果数据。
     */
    lastResult:null,

    /**
     * Constructor: SuperMap.REST.RouteLocatorService
     * 路由对象定位空间对象的服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     * var routeLocatorParameters_point = new SuperMap.REST.RouteLocatorParameters({
     *   "sourceRoute":{
     *       "type":"LINEM",
     *       "parts":[4],
     *       "points":[
     *           {
     *               "measure":0,
     *               "y":-6674.466867067764,
     *               "x":3817.3527876130133
     *           },
     *           {
     *               "measure":199.57954019411724,
     *               "y":-6670.830929417594,
     *               "x":3617.806369901496
     *          },
     *           {
     *               "measure":609.3656478634477,
     *               "y":-6877.837541432356,
     *               "x":3264.1498746678444
     *           },
     *           {
     *               "measure":936.0174126282958,
     *               "y":-7038.687780615184,
     *               "x":2979.846206068903
     *           }
     *       ]
     *   },
     *   "type":"POINT",
     *   "measure":10,
     *   "offset":3,
     *   "isIgnoreGap":true
     * });
     * var routeLocatorService = new SuperMap.REST.RouteLocatorService(spatialAnalystURL, {
     *     eventListeners:{
     *         processCompleted:routeLocatorCompleted,
     *         processFailed:routeLocatorFailded
     *     }
     * );
     * routeLocatorService.processAsync(routeLocatorParameters_point);
     *
     *  //执行
     * function routeLocatorCompleted(){todo}
     * function routeLocatorFailded(){todo}
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     *
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
     * params - {<SuperMap.REST.RouteLocatorParameters>}
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
            success:me.RouteLocatorComplete,
            failure:me.RouteLocatorError
        });
    },

    /**
     * Method: RouteLocatorComplete
     * 路由对象定位空间对象请求成功触发该事件。
     *
     * Parameters:
     * orgResult - {Object} 服务器返回的结果对象。
     */
    RouteLocatorComplete:function (result) {
        var me = this, qe, RouteLocatorResult;
        result = SuperMap.Util.transformResult(result);
        RouteLocatorResult = new SuperMap.REST.RouteLocatorResult.fromJson(result);
        me.lastResult = RouteLocatorResult;
        qe = new SuperMap.REST.RouteLocatorEventArgs(RouteLocatorResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: RouteLocatorError
     * 路由对象定位空间对象请求失败触发该事件
     *
     * Parameters:
     * result -  {Object}
     */
    RouteLocatorError:function (result) {
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
     * params - {<SuperMap.REST.RouteLocatorParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters:function (params) {
        var jsonParameters, jsonStr = "geometry/routelocator", me = this, end;
        end = me.url.substr(me.url.length - 1, 1);

        if(params.dataset)
        {
            jsonStr = "datasets/"+ params.dataset + "/linearreferencing/routelocator";
            params.sourceRoute = null;
        }
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? jsonStr + ".json" : "/" + jsonStr + ".json";
        } else {
            me.url += (end === "/") ? jsonStr + ".jsonp" : "/" + jsonStr + ".jsonp";
        }

        me.url += "?returnContent=true";
        jsonParameters = SuperMap.Util.toJSON(params);
        return jsonParameters;
    },

    CLASS_NAME:"SuperMap.REST.RouteLocatorService"
});