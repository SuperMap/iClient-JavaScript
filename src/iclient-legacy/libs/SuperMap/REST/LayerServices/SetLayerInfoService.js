/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/ServiceBase.js
 */

/**
 * Class: SuperMap.REST.SetLayerInfoService
 * 设置图层信息服务类。可以实现临时图层中子图层的修改
 * 该类负责将图层设置参数传递到服务端，并获取服务端返回的结果信息。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
SuperMap.REST.SetLayerInfoService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     *
     * 此类支持的事件类型:
     * - *processCompleted* 服务端返回图层信息设置成功的结果时触发该事件。
     * - *processFailed* 服务端返回图层信息设置结果失败时触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: events
     * {<SuperMap.Events>} 在 SetLayerInfoService 类中处理所有事件的对象，支持两种事件 processCompleted
     * 、processFailed ，服务端图层信息设置成功并返回结果时触发 processCompleted 事件，
     * 服务端图层信息设置失败时触发 processFailed 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 SetLayerInfoService 支持的两个事件
     * processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * 服务端返回的结果数据。
     */
    lastResult: null,

    /**
     * APIProperty: resourceID
     * {String} 图层资源ID，临时图层的资源ID标记。
     */
    resourceID: null,


    /**
     * Constructor: SuperMap.REST.SetLayerInfoService
     * 设置图层信息服务类构造函数。可以实现临时图层中子图层的修改。
     *
     * Parameters:
     * url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"；
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, [url]);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
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
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     * Parameters:
     * params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务 <SuperMap.REST.getLayerInfoService>.result.subLayers.layers[i]
     * 返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync: function(params) {
        var me = this;

        if(!params){
            return;
        }
        me.url += me.isInTheSameDomain ? ".json" : ".jsonp";
        var jsonParamsStr = SuperMap.Util.toJSON(params);
        me.request({
            method: "PUT",
            data: jsonParamsStr,
            scope: me,
            success: me.setLayerComplted,
            failure: me.setLayerFailed
        });
    },

    /**
     * Method: setLayerComplted
     * 设置完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象，记录设置操作是否成功。
     */
    setLayerComplted: function(result) {
        var me = this,
            setLayerResult;
        result = SuperMap.Util.transformResult(result);
        setLayerResult = SuperMap.REST.SetLayersInfoResult.fromJson(result);
        var succeed = setLayerResult.succeed;
        if(succeed){
            var setLayerInfoEvg = new SuperMap.REST.SetLayersInfoEventArgs(setLayerResult, result);
            me.lastResult = setLayerResult;
            me.events.triggerEvent("processCompleted", setLayerInfoEvg);
        }
    },

    /**
     * Method: setLayerFailed
     * 设置失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    setLayerFailed: function(result) {
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

    CLASS_NAME: "SuperMap.REST.SetLayerInfoService"
});
