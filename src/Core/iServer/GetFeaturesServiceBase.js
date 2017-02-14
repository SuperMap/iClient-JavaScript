/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.iServer.GetFeaturesServiceBase
 * 数据服务中数据集查询服务基类。
 * 查询结果通过该类支持的事件的监听函数参数获取，参数类型为 {<SuperMap.REST.GetFeaturesEventArgs>}; 获取的结果数据包括 result 、originResult 两种，
 * 其中，originResult 为服务端返回的用 JSON 对象表示的查询结果数据，result 为服务端返回的查询结果数据，保存在 {<SuperMap.REST.GetFeaturesResult>} 对象中。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');
SuperMap.iServer.GetFeaturesServiceBase = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回查询结果触发该事件。
     * - *processFailed* 服务端返回查询结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 GetFeaturesServiceBase 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted  事件，服务端返回查询结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.iServer.GetFeaturesServiceBase(url);
     * myService.events.on({
     *     "processCompleted": getFeatureCompleted, 
     *      "processFailed": getFeatureError
     * });
     * function getFeatureCompleted(GetFeaturesEventArgs){//todo};
     * function getFeatureError(GetFeaturesEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetFeaturesServiceBase 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.GetFeatureResult>} 服务端返回的查询结果数据。
     */
    lastResult: null,

    /**
     * Property: returnContent
     * {Boolean} 是否立即返回新创建资源的表述还是返回新资源的URI。
     *           如果为 true，则直接返回新创建资源，即查询结果的表述。
     *           如果为 false，则返回的是查询结果资源的 URI。默认为 false。
     */
    returnContent: true,

    /**
     * Property: fromIndex
     * {Integer} 查询结果的最小索引号。
     *         默认值是0，如果该值大于查询结果的最大索引号，则查询结果为空。
     */
    fromIndex: 0,

    /**
     * Property: toIndex
     * {Integer} 查询结果的最大索引号。
     *         如果该值大于查询结果的最大索引号，则以查询结果的最大索引号为终止索引号。
     */
    toIndex: 19,

    /**
     * APIProperty: maxFeatures
     * {Integer} 进行SQL查询时，用于设置服务端返回查询结果条目数量，默认为1000。
     */
    maxFeatures: null,

    /**
     * Constructor: SuperMap.iServer.GetFeaturesServiceBase
     * 数据集查询服务基类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.iServer.GetFeaturesServiceBase(url, {
     *     eventListeners: {
     *         "processCompleted": getFeatureCompleted, 
     *         "processFailed": getFeatureError
     *     }
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 数据查询结果资源地址。请求数据服务中数据集查询服务，
     * URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{数据服务名}/rest/data/；
     * 例如："http://localhost:8090/iserver/services/data-jingjin/rest/data/"
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
            me.url += (end == "/") ? "featureResults.json?" : "/featureResults.json?";
        } else {
            me.url += (end == "/") ? "featureResults.jsonp?" : "/featureResults.jsonp?";
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
        me.returnContent = null;
        me.fromIndex = null;
        me.toIndex = null;
        me.maxFeatures = null;
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
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.GetFeaturesParametersBase>} 查询参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            jsonParameters = null,
            firstPara = true;

        me.returnContent = params.returnContent;
        me.fromIndex = params.fromIndex;
        me.toIndex = params.toIndex;
        me.maxFeatures = params.maxFeatures;
        if (me.returnContent) {
            me.url += "returnContent=" + me.returnContent;
            firstPara = false;
        }
        if (me.fromIndex != null && me.toIndex != null && !isNaN(me.fromIndex) && !isNaN(me.toIndex) && me.fromIndex >= 0 && me.toIndex >= 0 && !firstPara) {
            me.url += "&fromIndex=" + me.fromIndex + "&toIndex=" + me.toIndex;
        }
        /* if(me.fromIndex != null && me.toIndex != null && !isNaN(me.fromIndex) && !isNaN(me.toIndex) && me.fromIndex >= 0 && me.toIndex >= 0 && firstPara) {
         me.url += "fromIndex=" + me.fromIndex + "&toIndex=" + me.toIndex;
         } */
        if (params.returnCountOnly) me.url += "&returnCountOnly=" + params.returnContent;
        jsonParameters = me.getJsonParameters(params);
        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.getFeatureComplete,
            failure: me.getFeatureError
        });
    },

    /**
     * Method: getFeatureComplete
     * 查询完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getFeatureComplete: function (result) {
        var me = this,
            qe = null,
            getFeatureResult = null;

        result = SuperMap.Util.transformResult(result);
        if (me.returnContent) {
            getFeatureResult = SuperMap.REST.GetFeaturesResult.fromJson(result);
        } else {
            getFeatureResult = new SuperMap.REST.GetFeaturesResult();
            getFeatureResult.resourceInfo = SuperMap.REST.ResourceInfo.fromJson(result);
        }
        me.lastResult = getFeatureResult;
        qe = new SuperMap.REST.GetFeaturesEventArgs(getFeatureResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: getFeatureError
     * 查询失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getFeatureError: function (result) {
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

    CLASS_NAME: "SuperMap.iServer.GetFeaturesServiceBase"
});

module.exports = function (url, options) {
    return new SuperMap.iServer.GetFeaturesServiceBase(url, options);
};