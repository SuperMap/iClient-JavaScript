/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 */

/**
 * Class: SuperMap.REST.ChartFeatureInfoSpecsService
 *      海图物标信息服务类，通过该服务类可以查询到服务端支持的所有海图物标信息。
 *      用户可以通过两种方式获取查询结果：
 *      一种是通过监听 ChartFeatureInfoSpecsEvent.PROCESS_COMPLETE 事件；
 *      另一种是使用 AsyncResponder 类实现异步处理。
 *      其中 ChartFeatureInfoSpecsEvent 类既存有从服务端获取的原始结果，也包括经
 *      客户端处理后的最终结果 ChartFeatureInfoSpecsResult；使用 AsyncResponder
 *      类获取的结果为经客户端处理后的最终结果 ChartFeatureInfoSpecsResult。当用户只需要最终结果时，推荐使用 AsyncResponder 类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.ChartFeatureInfoSpecsService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES:["processCompleted", "processFailed"],

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
     *  Property: result
     *  {<SuperMap.REST.ChartFeatureInfoSpecsResult>} 获取服务端返回的结果信
     *       息——ChartFeatureInfoSpecsResult 对象。
     */
    result:null,

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
    initialize:function (url, options) {
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
    destroy:function () {
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
    processAsync:function () {
        var me = this, method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if (!me.isTempLayers) {
            me.url += (end === "/") ? '' : '/';
            me.url += me.isInTheSameDomain ? "chartFeatureInfoSpecs.json?" : "chartFeatureInfoSpecs.jsonp?";
        } else {
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        }
        me.request({
            method:method,
            params:null,
            scope:me,
            success:me.getFeatureComplted,
            failure:me.getFeatureFailed
        });
    },

    /**
     * Method: getFeatureComplted
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getFeatureComplted:function (result) {
        var me = this,
            qe = null,
            queryResult = null;
        result = SuperMap.Util.transformResult(result);
        if (me.returnContent) {
            queryResult = SuperMap.REST.QueryResult.fromJson(result);
        } else {
            queryResult = new SuperMap.REST.QueryResult();
            if (result.customResult) {
                queryResult.customResponse = new SuperMap.Bounds(result.customResult.left,result.customResult.bottom,result.customResult.right,result.customResult.top);
            }
            queryResult.resourceInfo = SuperMap.REST.ResourceInfo.fromJson(result);
        }
        me.lastResult = queryResult;
        qe = new SuperMap.REST.QueryEventArgs(queryResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: getFeatureFailed
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getFeatureFailed:function (result) {
        var me = this,
            error = null,
            serviceException = null,
            qe = null;
        result = SuperMap.Util.transformResult(result);
        error = result.error;
        if (!error) {
            return;
        }
        serviceException = SuperMap.ServiceException.fromJson(error);
        qe = new SuperMap.ServiceFailedEventArgs(serviceException, result);
        me.events.triggerEvent("processFailed", qe);
    },

    CLASS_NAME:"SuperMap.REST.ChartFeatureInfoSpecsService"
});
