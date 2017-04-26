/**
 * Class: SuperMap.REST.MapService
 * 地图信息服务类 。
 * 该类负责将从客户端指定的服务器上获取该服务器提供的地图信息
 * 结果保存在一个object对象中，对象包含一个属性result为iServer返回的json对象
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');

SuperMap.REST.MapService = SuperMap.Class(SuperMap.ServiceBase, {

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
                success: me.serviceProcessCompleted,
                failure: me.serviceProcessFailed
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
                me.serviceProcessCompleted(result);
            }, function (error) {
                me.serviceProcessFailed(error);
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
    serviceProcessCompleted: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if (!result.code || (result.code && ((result.code >= 200 && result.code < 300) || result.code == 0 || result.code === 304))) {
            me.events && me.events.triggerEvent("processCompleted", {result: result});
        }
        //在没有token是返回的是200，但是其实是没有权限，所以这里也应该是触发失败事件
        else {
            me.events.triggerEvent("processFailed", {error: result});
        }
    },

    CLASS_NAME: "SuperMap.REST.MapService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.MapService(url, options);
};
