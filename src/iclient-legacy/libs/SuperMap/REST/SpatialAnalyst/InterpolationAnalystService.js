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
 * Class: SuperMap.REST.InterpolationAnalystService
 * 插值分析服务类
 * 插值分析可以将有限的采样点数据， 通过插值算法对采样点周围的数值情况进行预测，
 * 可以掌握研究区域内数据的总体分布状况，从而使采样的离散点不仅仅反映其所在位置的数值情况，
 * 还可以反映区域的数值分布。目前SuperMap iServer的插值功能提供从点数据集插值得到栅格数据集的功能，
 * 支持以下常用的内插方法，
 * 包括：反距离加权插值、克吕金（Kriging）插值法、样条（径向基函数，Radial Basis Function）插值、点密度插值。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.InterpolationAnalystService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回插值分析结果触发该事件。
     * - *processFailed* 服务端返回插值分析结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 InterpolationAnalystService 类中处理所有事件的对象，支持 processCompleted 、processFailed 两种事件，服务端成功返回插值分析结果时触发 processCompleted 事件，服务端返回插值分析结果失败时触发 processFailed 事件。
     *
     * 例如：
     * (start code)
     * var myTInterpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(url);
     * myTInterpolationAnalystService.events.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
     * );
     * function bufferCompleted(InterpolationAnalystEventArgs){//todo};
     * function bufferFailed(ServiceFailedEventArgs){//todo};
     * (end)
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 InterpolationAnalystService 支持的两个事件 processCompleted 、processFailed 进行监听，
     * 相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: mode
     * {String} 插值分析类型。
     */
    mode: null,

    /**
     * Constructor: SuperMap.REST.InterpolationAnalystService
     * 插值分析服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myTInterpolationAnalystService = new SuperMap.REST.InterpolationAnalystService(url);
     * myTInterpolationAnalystService.events.on({
     *     "processCompleted": processCompleted,
     *     "processFailed": processFailed
     *     }
     * );
     * (end)
     *
     * Parameters:
     * url - {String} 服务的访问地址。如 http://localhost:8090/iserver/services/spatialanalyst-changchun/restjsr/spatialanalyst 。
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

        me.mode = null;
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的查询参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.InterpolationAnalystParameters>}/
     * {<SuperMap.REST.InterpolationAnalystParameters>}
     */
    processAsync: function (parameter) {
        var parameterObject = new Object();
        var me = this;

        var end = me.url.substr(me.url.length - 1, 1);
        if (end === '/') {

        } else {
            me.url += "/";
        }

        if (parameter instanceof SuperMap.REST.InterpolationDensityAnalystParameters) {
            me.mode = "Density";
            if(parameter.InterpolationAnalystType === "geometry"){
                me.url += 'geometry/interpolation/density';
            }else{
                me.url += 'datasets/' + parameter.dataset + '/interpolation/density';
            }
        }
        else if(parameter instanceof SuperMap.REST.InterpolationIDWAnalystParameters){
            me.mode = "IDW";
            if(parameter.InterpolationAnalystType === "geometry"){
                me.url += 'geometry/interpolation/idw';
            }else{
                me.url += 'datasets/' + parameter.dataset + '/interpolation/idw';
            }
        }
        else if(parameter instanceof SuperMap.REST.InterpolationRBFAnalystParameters){
            me.mode = "RBF";
            if(parameter.InterpolationAnalystType === "geometry"){
                me.url += 'geometry/interpolation/rbf';
            }else{
                me.url += 'datasets/' + parameter.dataset + '/interpolation/rbf';
            }
        }
        else if(parameter instanceof SuperMap.REST.InterpolationKrigingAnalystParameters){
            me.mode = "Kriging";
            if(parameter.InterpolationAnalystType === "geometry"){
                me.url += 'geometry/interpolation/kriging';
            }else{
                me.url += 'datasets/' + parameter.dataset + '/interpolation/kriging';
            }
        }
        SuperMap.REST.InterpolationAnalystParameters.toObject(parameter, parameterObject);
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
     * 插值分析完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的插值分析结果对象。
     */
    analyzeComplete: function (result) {
        result = SuperMap.Util.transformResult(result);
        var analyzeResult = SuperMap.REST.InterpolationAnalystResult.fromJson(result);
        this.lastResult = analyzeResult;

        var se = new SuperMap.REST.InterpolationAnalystEventArgs(analyzeResult, result);
        this.events.triggerEvent("processCompleted", se);
    },

    /**
     * Method: analyzeError
     * 插值分析失败，执行此方法。
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

    CLASS_NAME: "SuperMap.REST.InterpolationAnalystService"

});