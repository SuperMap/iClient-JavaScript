/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Util.js
 * @requires SuperMap/REST/LayerServices/SetLayerStatusParameters.js
 * @requires SuperMap/REST/LayerServices/SetLayerResult.js
 * @requires SuperMap.REST.SetLayersStatusEventArgs.js
 */

/**
 * Class: SuperMap.REST.SetLayerStatusService
 * 子图层显示控制服务类。
 * 该类负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
 * 用户获取服务端返回的各子图层显示状态有两种方式：一种是通过监听 SetLayerEvent.PROCESS_COMPLETE 事件；一种是始用 AsyncResponder 类实现异步处理。其中 SetLayerEvent 类既存有从服务端获取的原始结果，也包括经客户端处理后的最终结果 SetLayerResult；始用 AsyncResponder 类获取的结果为经客户端处理后的最终结果 SetLayerResult。当用户只需要最终结果时，推荐使用 AsyncResponder 类。
 */
SuperMap.REST.SetLayerStatusService = SuperMap.Class(SuperMap.ServiceBase,{
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
     * {<SuperMap.Events>} 在 SetLayerStatusService 类中处理所有事件的对象，支持两种事件 processCompleted
     * 、processFailed ，服务端图层信息设置成功并返回结果时触发 processCompleted 事件，
     * 服务端图层信息设置失败时触发 processFailed 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 SetLayerStatusService 支持的两个事件 
     * processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,
    
    /**
     * Property: lastResult
     * {<SuperMap.REST.SetLayerResult>} 子图层控制结果类。
     */
    lastResult:null,

    lastparams:null,

    mapUrl:null,

    /**
     * Constructor: SuperMap.REST.SetLayerStatusService
     * 子图层显示控制服务类构造函数。
     *
     * Parameters:
     * url - {String} 地图服务访问地址。请求地图服务,URL 应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options){
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
        me.mapUrl = url;
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
     * params - {Object} 修改后的图层资源信息。该参数可以使用获取图层信息服务 <SuperMap.REST.SetLayerStatusParameters>
     * 返回图层信息，然后对其属性进行修改来获取。
     */
    processAsync: function(params){
        var subLayers = [],
            me = this,
            method = "POST";
        if(!params){
            return;
        }

        me.url = me.mapUrl;
        var end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';

        if(params.resourceID == null)
        {
            me.url += "tempLayersSet";
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";

            me.lastparams = params;

            me.request({
                method: method,
                scope: me,
                success: me.createTempLayerComplete,
                failure: me.setLayerFailed
            });
        }
        else
        {
            me.url += "tempLayersSet/" + params.resourceID;
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";

            me.url += "elementRemain=true&reference=" + params.resourceID + "&holdTime=" + params.holdTime.toString();

            var jsonParameters = '[{';

            jsonParameters += '"type":"UGC",';
            if (params.layerStatusList != null && params.layerStatusList.length > 0) {
                jsonParameters += '"subLayers":' + params.toJSON();
            }
            jsonParameters += ',"visible":' + true + ',';
            jsonParameters += '"name":"' + this.getMapName(this.mapUrl) + '"';

            jsonParameters += '}]';

            me.request({
                method: "PUT",
                data: jsonParameters,
                scope: me,
                success: me.setLayerComplted ,
                failure: me.setLayerFailed
            });
        }
    },

    /**
     * Method: createTempLayerComplete
     * 设置完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象，记录设置操作是否成功。
     */
    createTempLayerComplete: function(result) {
        var me = this;
        result = SuperMap.Util.transformResult(result);
        if(result.succeed)
        {
            me.lastparams.resourceID = result.newResourceID;
        }

        me.processAsync(me.lastparams);
    },

    getMapName:function(url){
        var mapUrl = url;
        if(mapUrl.charAt(mapUrl.length - 1) === "/")
        {
            mapUrl = mapUrl.substr(0, mapUrl.length - 1);
        }
        var index = mapUrl.lastIndexOf("/");
        var mapName = mapUrl.substring(index + 1, mapUrl.length);
        return mapName;
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
        setLayerResult = SuperMap.REST.SetLayerResult.fromJson(result);
        var succeed = setLayerResult.succeed;
        if(succeed){
            var setLayerStatusEvg = new SuperMap.REST.SetLayersStatusEventArgs(setLayerResult, result);
            me.lastResult = setLayerResult;
            if(setLayerStatusEvg.result != null && me.lastparams != null)
            {
                setLayerStatusEvg.result.newResourceID = me.lastparams.resourceID;
                me.lastResult.newResourceID = me.lastparams.resourceID;
            }
            me.events.triggerEvent("processCompleted", setLayerStatusEvg);
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


    CLASS_NAME: "SuperMap.REST.SetLayerStatusService"
})

