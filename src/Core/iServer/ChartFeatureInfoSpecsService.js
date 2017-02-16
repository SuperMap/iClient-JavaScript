/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.ChartFeatureInfoSpecsService
 *      海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。
 *      用户可以通过两种方式获取查询结果：
 *      一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；
 *      另一种是使用 AsyncResponder 类实现异步处理。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');
SuperMap.REST.ChartFeatureInfoSpecsService = SuperMap.Class(SuperMap.ServiceBase, {

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
     * {<SuperMap.Events>} 在 ChartFeatureInfoSpecsService 类中处理所有事件的
     *      对象，支持两种事件 processCompleted、processFailed ，服务端图层信息
     *      设置成功并返回结果时触发 processCompleted 事件，服务端图层信息设置
     *      失败时触发 processFailed 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 ChartFeatureInfoSpecsService
     *      支持的两个事件processCompleted 、processFailed 进行监听，相当于调
     *      用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Constructor: SuperMap.REST.ChartFeatureInfoSpecsService
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
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
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
            success: me.getFeatureCompleted,
            failure: me.getFeatureFailed
        });
    },

    /**
     * Method: getFeatureCompleted
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getFeatureCompleted: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processCompleted", {result: result});
    },

    /**
     * Method: getFeatureFailed
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getFeatureFailed: function (result) {
        result = SuperMap.Util.transformResult(result);
        this.events.triggerEvent("processFailed", result);
    },

    CLASS_NAME: "SuperMap.REST.ChartFeatureInfoSpecsService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.ChartFeatureInfoSpecsService(url, options);
};
