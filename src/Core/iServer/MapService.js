/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.MapService
 * 地图信息服务类 。
 * 该类负责将从客户端指定的服务器上获取该服务器提供的地图信息
 * 结果保存在一个object对象中，对象包含一个属性result为iServer返回的json对象
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');

SuperMap.REST.MapService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型
     * - *processCompleted* 服务端返回地图信息成功触发该事件 。
     * - *processFailed* 服务端返回地图信息失败触发该事件 。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 MapService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回地图信息结果时触发 processCompleted 事件，服务端返回地图信息结果时触发 processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myMapService = new SuperMap.REST.MapService(url);
     * myMapService.events.on({
     *     "processCompleted": MapServiceCompleted,
     *     "processFailed": MapServiceFailed
     *       }
     * );
     * function MapServiceCompleted(object){//todo};
     * function MapServiceFailed(object){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 听器对象，在构造函数中设置此参数（可选），对 MapService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * APIProperty: projection
     * {<SuperMap.Projection>} or {<String>}
     * 根据投影参数获取地图状态信息。
     */
    projection: null,


    /**
     * Constructor: SuperMap.REST.MapService
     * 地图信息服务类构造函数 。
     *
     * 例如：
     * (start code)
     * var myMapService = new SuperMap.REST.MapService(url, {
     * eventListeners:{
     *     "processCompleted": MapServiceCompleted, 
     *       "processFailed": MapServiceFailed
     *       }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数 。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );

        me.eventListeners && me.events.on(me.eventListeners);
        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";

        if (me.projection) {
            if (typeof me.projection === "string") {
                me.projection = new SuperMap.Projection(me.projection);
            }

            var arr = me.projection.getCode().split(":");
            if (arr instanceof Array && arr.length === 2) {
                me.url += "?prjCoordSys={\"epsgCode\":" + arr[1] + "}";
            }
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.un(me.eventListeners);
            me.events.listeners = null;
            me.events.destroy();
            me.events = null;
            me.eventListeners = null;
        }
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的设置的参数传递到服务端，与服务端完成异步通讯。
     *
     */
    processAsync: function () {
        var me = this;
        if (typeof Windows === "undefined") {
            var option = {
                method: "GET",
                scope: me,
                success: me.getMapStatusCompleted,
                failure: me.getMapStatusError
            };
            me.request(option);
        } else {
            me.url = me.url.replace(/.jsonp/, ".json");
            var urlWithToken = me.url;
            if (SuperMap.Credential.CREDENTIAL) {
                urlWithToken += urlWithToken.indexOf("?") > -1 ? "&" : "?";
                urlWithToken += SuperMap.Credential.CREDENTIAL.getUrlParameters();
            }
            WinJS.xhr({
                url: urlWithToken,
                type: "GET"
            }).then(function (result) {
                me.getMapStatusCompleted(result);
            }, function (error) {
                me.getMapStatusError(error);
            });
        }
    },

    /**
     * Method: getMapStatusCompleted
     * 获取地图状态完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getMapStatusCompleted: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if (!result.code || (result.code && ((result.code >= 200 && result.code < 300) || result.code == 0 || result.code === 304))) {
            me.events && me.events.triggerEvent("processCompleted", {result: result});
        }
        //在没有tonken是返回的是200，但是其实是没有权限，所以这里也应该是触发失败事件
        else {
            me.events.triggerEvent("processFailed", result);
        }
    },

    /**
     * Method: getMapStatusError
     * 获取地图状态失败，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getMapStatusError: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processFailed", result);
    },

    CLASS_NAME: "SuperMap.REST.MapService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.MapService(url, options);
};
