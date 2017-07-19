/**
 * Class: SuperMap.ChartFeatureInfoSpecsService
 *      海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。
 *      用户可以通过两种方式获取查询结果：
 *      一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；
 *      另一种是使用 AsyncResponder 类实现异步处理。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
var SuperMap = require('../SuperMap');
SuperMap.ChartFeatureInfoSpecsService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constructor: SuperMap.ChartFeatureInfoSpecsService
     *     使用地图（特指海图）服务地址 URL 初始化 ChartFeatureInfoSpecsService
     *     类的新实例。
     *
     * Parameters:
     * url - {String} 地图（特指海图）服务地址。
     *     如："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图"。
     *     发送请求格式类似于："http://localhost:8090/iserver/services/map-ChartW/rest/maps/海图/chartFeatureInfoSpecs.json"
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * APIMethod: processAsync
     *     根据地图（特指海图）服务地址与服务端完成异步通讯，获取物标信息。
     *
     * Note: 当查询物标信息成功时，将触发 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE
     *     事件。用可以通过户两种方式获取图层信息:
     *     1. 通过 AsyncResponder 类获取（推荐使用）；
     *     2. 通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件获取。
     */
    processAsync: function () {
        var me = this, method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += me.isInTheSameDomain ? "chartFeatureInfoSpecs.json?" : "chartFeatureInfoSpecs.jsonp?";
        } else {
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        }
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.ChartFeatureInfoSpecsService"
});

module.exports = SuperMap.ChartFeatureInfoSpecsService;
