/**
 * Class: SuperMap.REST.GetLibInfoService
 * 标绘服务中获取标号库信息的服务类
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.GetLibInfoService = SuperMap.Class(SuperMap.ServiceBase,{

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
     * {<SuperMap.Events>} 在 GetLibInfoService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     *
     * 例如：
     *     (start code)
     * var myService = new SuperMap.REST.GetLibInfoService(url);
     * myService.events.on({
     *     "processCompleted": getLibInfosComplted,
     *       "processFailed": getLibInfosFailed
     *       }
     * );
     * function getLibInfoComplted(getLibInfoCompltedEventArgs){//todo};
     * function getLibInfoFailed(getLibInfoFailedEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetLibInfoService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.GetLibInfoResult>} 服务端返回的结果数据。
     */
    lastResult: null,

    /**
     * Property: libID
     * {Array} 需要获取的标号库的ID
     */
    libID: null,

    /**
     * Constructor：SuperMap.REST.GetLibInfoService
     * 初始化 GetLibInfoService 类的实例
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.GetLibInfoService(url, {eventListeners: {
     *     "processCompleted": getLibInfoCompleted,
     *     "processFailed": getLibInfoError }，
     *     libID: 421
     * });
     * (end)
     *
     * Parameters:
     * url - {String} 标绘服务地址，只需将url设为: http://localhost:8090/iserver/services/plot-jingyong/rest 即可。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * libID - {Integer} 标号库ID。
     */
    initialize: function(url, options) {
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
        me.url += (end == "/") ? "symbolLibs/": "/symbolLibs/";
        me.url += this.libID;
        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        me.libID = null;
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
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.EditFeaturesParameters>} 编辑要素参数。
     */
    processAsync: function() {
        var parameters = null, me = this;

        me.request({
            method: "GET",
            data: parameters,
            scope: me,
            success: me.getLibInfoComplted,
            failure: me.getLibInfoFailed
        });
    },

    /**
     * Method: getLibInfoComplted
     * 编辑完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getLibInfoComplted: function(result) {
        var me = this,
            qe = null,
            getLibInfoResult = null;

        result = SuperMap.Util.transformResult(result);

        getLibInfoResult = SuperMap.REST.GetLibInfoResult.fromJson(result);

        me.lastResult = getLibInfoResult;
        qe = new SuperMap.REST.GetLibInfoEventArgs(getLibInfoResult, result);
        me.events.triggerEvent("processCompleted", qe);
    },

    /**
     * Method: getLibInfoFailed
     * 获取库信息失败
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getLibInfoFailed: function(result) {
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

    CLASS_NAME: "SuperMap.REST.GetLibInfoService"
});
