/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST.js
 * @requires SuperMap/REST/FilterParameter.js
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/ServiceFailedEventArgs.js
 * @requires SuperMap/ServiceException.js
 */

/**
 * Class: SuperMap.REST.AreaSolarRadiationService
 *  地区太阳辐射服务类。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.AreaSolarRadiationService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回地区太阳辐射结果触发该事件。
     * - *processFailed* 服务端返回地区太阳辐射结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 AreaSolarRadiationService 类中处理所有事件的对象，
     * 支持 processCompleted 、processFailed 两种事件，
     * 服务端成功返回地区太阳辐射结果时触发 processCompleted 事件，
     * 服务端返回地区太阳辐射结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myAreaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(url);
     * myAreaSolarRadiationService.events.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
     * );
     * function processCompleted(AreaSolarRadiationEventArgs){//todo};
     * function processFailed(ServiceFailedEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），
     * 对 AreaSolarRadiationService 支持的两个事件 processCompleted 、
     * processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.AreaSolarRadiationResult>} 服务端返回的结果数据。
     */
    lastResult: null,

    /**
     * Constructor: SuperMap.REST.AreaSolarRadiationService
     * 地区太阳辐射服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myAreaSolarRadiationService = new SuperMap.REST.AreaSolarRadiationService(url);
     * myAreaSolarRadiationService.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
     * );
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-sample/restjsr/spatialanalyst 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
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
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.AreaSolarRadiationParameters>}
     */
    processAsync: function (parameter) {
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        var parameterObject = new Object();

        if (parameter instanceof SuperMap.REST.AreaSolarRadiationParameters) {
            me.url += 'datasets/' + parameter.dataset +'/solarradiation';
        }

        SuperMap.REST.AreaSolarRadiationParameters.toObject(parameter, parameterObject);
        var jsonParameters = SuperMap.Util.toJSON(parameterObject);

        if (me.isInTheSameDomain) {
            me.url += '.json?returnContent=true';
        } else {
            me.url += '.jsonp?returnContent=true';
        }

        me.request({
            method: "POST",
            data: jsonParameters,
            scope: me,
            success: me.analyzeComplete,
            failure: me.analyzeError
        });
    },

    /**
     * Method: analyzeComplete
     * 地区太阳辐射完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的地区太阳辐射结果对象。
     */
    analyzeComplete: function (result) {
        result = SuperMap.Util.transformResult(result);
        var analyzeResult = SuperMap.REST.AreaSolarRadiationResult.fromJson(result);
        this.lastResult = analyzeResult;

        var se = new SuperMap.REST.AreaSolarRadiationEventArgs(analyzeResult, result);
        this.events.triggerEvent("processCompleted", se);
    },

    /**
     * Method: analyzeError
     * 地区太阳辐射失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    analyzeError: function (result) {
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

    CLASS_NAME: "SuperMap.REST.AreaSolarRadiationService"
});