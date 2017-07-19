/**
 * Class: SuperMap.RouteLocatorService
 * 路由对象定位空间对象的服务类。
 *
 * Inherits from:
 *  - <SuperMap.SpatialAnalystBase>
 */
require('./SpatialAnalystBase');
require('./RouteLocatorParameters');
var SuperMap = require('../SuperMap');
SuperMap.RouteLocatorService = SuperMap.Class(SuperMap.SpatialAnalystBase, {

    /**
     * Constructor: SuperMap.RouteLocatorService
     * 路由对象定位空间对象的服务类构造函数。
     *
     * 实例化该类如下例所示：
     * (start code)
     * var routeLocatorParameters_point = new SuperMap.RouteLocatorParameters({
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
     * var routeLocatorService = new SuperMap.RouteLocatorService(spatialAnalystURL, {
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
    initialize: function (url, options) {
        SuperMap.SpatialAnalystBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.SpatialAnalystBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的基于路由对象计算指定点M值操作的参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.RouteLocatorParameters>}
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, jsonParameters;

        jsonParameters = me.getJsonParameters(params);

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    /**
     * Method: getJsonParameters
     * 将参数转化为 JSON 字符串。
     *
     * Parameters:
     * params - {<SuperMap.RouteLocatorParameters>}
     *
     * Returns:
     * {Object} 转化后的JSON字符串。
     */
    getJsonParameters: function (params) {
        var jsonParameters, jsonStr = "geometry/routelocator", me = this, end;
        end = me.url.substr(me.url.length - 1, 1);

        if (params.dataset) {
            jsonStr = "datasets/" + params.dataset + "/linearreferencing/routelocator";
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

    CLASS_NAME: "SuperMap.RouteLocatorService"
});

module.exports = SuperMap.RouteLocatorService;
