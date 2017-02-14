/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。
 */

/**
 * Class: SuperMap.REST.QueryService
 * 查询服务基类。
 * 查询结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.QueryEventArgs>}; 获取的结果数据包括 result 、originResult 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的查询结果数据，result 为服务端返回的查询结果数据，保存在 {<SuperMap.REST.QueryResult>} 对象中 。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');
SuperMap.iServer.QueryService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES: [
        "processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 QueryService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted  事件，服务端返回查询结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.iServer.QueryService(url);
     * myService.events.on({
     *     "processCompleted": queryCompleted, 
     *	   "processFailed": queryError
     *	   }
     * );
     * function queryCompleted(QueryEventArgs){//todo};
     * function queryError(QueryEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 QueryService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.iServer.QueryResult>} 服务端返回的查询结果数据。
     */
    lastResult: null,

    /**
     * Property: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     */
    returnContent: false,

    /**
     * Constructor: SuperMap.iServer.QueryService
     * 查询服务基类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.QueryService(url, {
     *     eventListeners: {
     *	       "processCompleted": queryCompleted, 
     *		   "processFailed": queryError
     *		   }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 服务地址。请求地图查询服务的 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this,
            end;
        me.events = new SuperMap.Events(
            me, null, me.EVENT_TYPES, true
        );
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        end = me.url.substr(me.url.length - 1, 1);
        if (me.isInTheSameDomain) {
            me.url += (end === "/") ? "queryResults.json?" : "/queryResults.json?";
        } else {
            me.url += (end === "/") ? "queryResults.jsonp?" : "/queryResults.jsonp?";
        }
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
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
        me.returnContent = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.iServer.QueryParameters>} 查询参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            returnCustomResult = null,
            jsonParameters = null;
        me.returnContent = params.returnContent;
        jsonParameters = me.getJsonParameters(params);
        if (me.returnContent) {
            me.url += "returnContent=" + me.returnContent;
        } else {
            //仅供三维使用 获取高亮图片的bounds
            returnCustomResult = params.returnCustomResult;
            if (returnCustomResult) {
                me.url += "returnCustomResult=" + returnCustomResult;
            }
        }
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.queryComplete,
            failure: me.queryError
        });
    },

    /**
     * Method: queryComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    queryComplete: function (result) {
        var me = this,
            qe = null,
            queryResult = null;
        result = SuperMap.Util.transformResult(result);
        if (me.returnContent) {
            queryResult = SuperMap.REST.QueryResult.fromJson(result);
        } else {
            queryResult = new SuperMap.REST.QueryResult();
            if (result.customResult) {
                queryResult.customResponse = new SuperMap.Bounds(result.customResult.left, result.customResult.bottom, result.customResult.right, result.customResult.top);
            }
            queryResult.resourceInfo = SuperMap.REST.ResourceInfo.fromJson(result);
        }
        me.lastResult = queryResult;
        qe = new SuperMap.REST.QueryEventArgs(queryResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: queryError
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    queryError: function (result) {
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

    /**
     * Method: getQueryParameters
     * 将 JSON 对象表示的查询参数转化为 QueryParameters 对象。
     *
     * Parameters:
     * params - {Object} JSON 字符串表示的查询参数。
     *
     * Returns:
     * {<SuperMap.REST.QueryParameters>} 返回转化后的 QueryParameters 对象。
     */
    getQueryParameters: function (params) {
        return new SuperMap.REST.QueryParameters({
            customParams: params.customParams,
            expectCount: params.expectCount,
            networkType: params.networkType,
            queryOption: params.queryOption,
            queryParams: params.queryParams,
            startRecord: params.startRecord,
            prjCoordSys: params.prjCoordSys,
            holdTime: params.holdTime
        });
    },

    CLASS_NAME: "SuperMap.iServer.QueryService"
});

module.exports = function (url, options) {
    return new SuperMap.iServer.QueryService(url, options);
};