/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.TilesetsService
 * 切片列表信息查询服务类;即查询切片地图服务的切片列表，返回切片集名称、地图切片元数据信息、切片版本集信息
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.TilesetsService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回分析结果触发该事件。
     * - *processFailed* 服务端返回分析结果失败触发该事件。
     */
    EVENT_TYPES: [
        "processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 TilesetsService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回最近设施分析结果时触发 processCompleted  事件，服务端返回最近设施分析结果失败触发 processFailed 事件。
     *
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选）
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.TilesetsResult>} 服务端返回的结果数据。
     */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.TilesetsService
     * 切片列表信息查询服务类构造函数。
     *
     * Parameters:
     * url - {String} 地图服务地址。URL应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{服务名}/rest/maps/map；
     * 例如: "http://localhost:8090/iserver/services/test/rest/maps/tianlocal";
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
     * 释放资源，将引用的资源属性置空。
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
     */
    processAsync: function() {
        if (!this.url) {
            return;
        }
        var me = this, jsonObject;
        var end = me.url.substr(me.url.length - 1, 1);

        me.url = me.url + ((end === "/") ? "tilesets" : "/tilesets") + (this.isInTheSameDomain ? ".json?" : ".jsonp?");

        me.request({
            method: "GET",
            scope: me,
            success: me.findFacilityComplete,
            failure: me.findFacilityError
        });
    },

    /**
     * Method: findFacilityComplete
     * 切片列表信息查询成功，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    findFacilityComplete: function(result) {
        var me = this,
            TilesetsResult, fe;
        result = SuperMap.Util.transformResult(result);
        TilesetsResult = SuperMap.REST.TilesetsResult.fromJson(result);
        me.lastResult = TilesetsResult;
        fe = new SuperMap.REST.TilesetsEventArgs(TilesetsResult, result);
        me.events.triggerEvent("processCompleted", fe);
    },

    /**
     * Method: findFacilityError
     *  切片列表信息查询失败，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    findFacilityError: function(result) {
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

    CLASS_NAME: "SuperMap.REST.TilesetsService"
});