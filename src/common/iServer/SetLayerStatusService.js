/*
 * Class: SuperMap.SetLayerStatusService
 * 子图层显示控制服务类。
 * 该类负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
 * 用户获取服务端返回的各子图层显示状态有两种方式：
 * 一种是通过监听 SetLayerEvent.PROCESS_COMPLETE 事件；
 * 一种是使用 AsyncResponder 类实现异步处理。
 */
require('./ServiceBase');
require('./SetLayerStatusParameters');
var SuperMap = require('../SuperMap');
/**
 * @class SuperMap.SetLayerStatusService
 * @description  子图层显示控制服务类。该类负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。<br>
 *                用户获取服务端返回的各子图层显示状态有两种方式：<br>
 *                一种是通过监听 SetLayerEvent.PROCESS_COMPLETE 事件；<br>
 *                一种是使用 AsyncResponder 类实现异步处理。
 * @augments SuperMap.ServiceBase
 * @param url - {String} 地图服务访问地址。请求地图服务,URL 应为：<br>
 *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *         eventListeners - {Object} 需要被注册的监听器对象。
 */
SuperMap.SetLayerStatusService = SuperMap.Class(SuperMap.ServiceBase, {

    lastparams: null,

    mapUrl: null,

    /**
     * @function  SuperMap.SetLayerStatusService.initialize
     * @description 子图层显示控制服务类构造函数。
     * @param url - {String} 地图服务访问地址。请求地图服务,URL 应为：<br>
     *               http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * @param options - {Object} 交互服务时所需可选参数。如：<br>
     *         eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        var me = this;
        SuperMap.ServiceBase.prototype.initialize.apply(me, arguments);
        if (options) {
            SuperMap.Util.extend(me, options);
        }
        me.mapUrl = url;
    },

    /**
     * @inheritDoc
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * @function SuperMap.SetLayerStatusService. processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务 <SuperMap.SetLayerStatusParameters>
     *         返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync: function (params) {
        var subLayers = [],
            me = this,
            method = "POST";
        if (!params) {
            return;
        }

        me.url = me.mapUrl;
        var end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';

        if (params.resourceID == null) {
            me.url += "tempLayersSet";
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";

            me.lastparams = params;

            me.request({
                method: method,
                scope: me,
                success: me.createTempLayerComplete,
                failure: me.serviceProcessFailed
            });
        } else {
            me.url += "tempLayersSet/" + params.resourceID;
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";

            me.url += "elementRemain=true&reference=" + params.resourceID + "&holdTime=" + params.holdTime.toString();

            var jsonParameters = '[{';

            jsonParameters += '"type":"UGC",';
            if (params.layerStatusList != null && params.layerStatusList.length > 0) {
                jsonParameters += '"subLayers":' + params.toJSON();
            }
            jsonParameters += ',"visible":' + true + ',';
            jsonParameters += '"name":"' + this.getMapName(this.mapUrl) + '"';

            jsonParameters += '}]';

            me.request({
                method: "PUT",
                data: jsonParameters,
                scope: me,
                success: me.serviceProcessCompleted,
                failure: me.serviceProcessFailed
            });
        }
    },

    /*
     * Method: createTempLayerComplete
     * 设置完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象，记录设置操作是否成功。
     */
    createTempLayerComplete: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if (result.succeed) {
            me.lastparams.resourceID = result.newResourceID;
        }

        me.processAsync(me.lastparams);
    },

    getMapName: function (url) {
        var mapUrl = url;
        if (mapUrl.charAt(mapUrl.length - 1) === "/") {
            mapUrl = mapUrl.substr(0, mapUrl.length - 1);
        }
        var index = mapUrl.lastIndexOf("/");
        var mapName = mapUrl.substring(index + 1, mapUrl.length);
        return mapName;
    },

    /*
     * Method: setLayerCompleted
     * 设置完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象，记录设置操作是否成功。
     */
    serviceProcessCompleted: function (result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if (result != null && me.lastparams != null) {
            result.newResourceID = me.lastparams.resourceID;
        }
        me.events.triggerEvent("processCompleted", {result: result});
    },

    CLASS_NAME: "SuperMap.SetLayerStatusService"
});

module.exports = SuperMap.SetLayerStatusService;
