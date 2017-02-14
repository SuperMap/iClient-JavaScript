/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.iServer.GetLayersInfoService
 * 获取图层信息服务类。
 * 该类负责将从客户端指定的服务器上获取该服务器提供的图层信息。
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('../base');
SuperMap.iServer.GetLayersInfoService = SuperMap.Class(SuperMap.ServiceBase, {

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
     * {<SuperMap.Events>} 在 GetLayersInfoService 类中处理所有事件的对象，支持两种事件 processCompleted 、processFailed ，服务端成功返回查询结果时触发 processCompleted 事件，服务端返回查询结果失败时触发 processFailed 事件。
     */
    events: null,

    /**
     * APIProperty: eventListeners
     * {Object} 监听器对象，在构造函数中设置此参数（可选），对 GetLayersInfoService 支持的两个事件 processCompleted 、processFailed 进行监听，相当于调用 SuperMap.Events.on(eventListeners)。
     */
    eventListeners: null,

    /**
     * Property: lastResult
     * {<SuperMap.REST.TrafficTransferResult>} 服务端返回的结果数据。
     */
    lastResult: null,

    /**
     * Property: isTempLayers
     * {Boolean>} 当前url对应的图层是否是临时图层。
     */
    isTempLayers: false,

    /**
     * Constructor: SuperMap.iServer.GetLayersInfoService
     * 获取图层信息服务类构造函数。
     *
     * Parameters:
     * url - {String} 与客户端交互的地图服务地址。请求地图服务,URL 应为：
     * http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}；
     * 如 http://localhost:8090/iserver/services/map-world/rest/maps/World 。
     * 如果查询临时图层的信息，请指定完成的url，包含临时图层ID信息，如：
     * http://localhost:8090/iserver/services/map-world/rest/maps/World/tempLayersSet/resourceID
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     * isTempLayers - {Boolean} 当前url对应的图层是否是临时图层。
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
     *
     */
    processAsync: function() {
        var me = this,
            method = "GET",
            end = me.url.substr(me.url.length - 1, 1);
        if(!me.isTempLayers){
            me.url += (end === "/") ? '' : '/';
            me.url += me.isInTheSameDomain ? "layers.json?" : "layers.jsonp?";
        }else{
            me.url += me.isInTheSameDomain ? ".json?" : ".jsonp?";
        }
        me.request({
            method: method,
            params: null,
            scope: me,
            success: me.getLayerComplted,
            failure: me.getLayerFailed
        });
    },

    /**
     * Method: getLayerComplted
     * 编辑完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getLayerComplted: function(result) {
        var me = this, existRes, layerResult, layers, len = 0;
        result = SuperMap.Util.transformResult(result);
        layerResult = SuperMap.Util.JSONClone({},result);

        existRes = !!layerResult && layerResult.length > 0;
        layers = existRes ? layerResult[0].subLayers.layers : null;
        len = layers ? layers.length : 0;
        this.handleLayers(len, layers);

        me.lastResult = layerResult[0];
        var getLayerInfoEvg = new SuperMap.REST.GetLayersInfoEventArgs(layerResult[0], result);
        me.events.triggerEvent("processCompleted", getLayerInfoEvg);
    },

    /**
     * Method: handleLayers
     * 处理iserver 新增图层组数据 (subLayers.layers 中可能还会含有 subLayers.layers)
     *
     * Parameters:
     * len - {Number} subLayers.layers的长度
     * layers - {Array} subLayers.layers
     */
    handleLayers: function(len, layers){
        var me = this, tempLayer;
        if(len) {
            for(var i = 0; i< len; i++) {
                if(layers[i].subLayers && layers[i].subLayers.layers && layers[i].subLayers.layers.length>0){
                    this.handleLayers(layers[i].subLayers.layers.length, layers[i].subLayers.layers);
                }
                else{
                    var type = layers[i].ugcLayerType;
                    switch(type) {
                        case 'THEME':
                            tempLayer = new SuperMap.REST.ServerTheme();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'GRID':
                            tempLayer = new SuperMap.REST.Grid();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'IMAGE':
                            tempLayer = new SuperMap.REST.Image();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'VECTOR':
                            tempLayer = new SuperMap.REST.Vector();
                            tempLayer.fromJson(layers[i]);
                            layers[i] = tempLayer;
                            break;
                        case 'WFS':
                            //layers[i] = SuperMap.REST.WFS.fromobj(layers[i]);
                            break;
                        case 'WMS':
                            //layers[i] = SuperMap.REST.WMS.fromobj(layers[i]);
                            break;
                    }
                }

            }
        }
    },
    /**
     * Method: getLayerFailed
     * 编辑失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getLayerFailed: function(result) {
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

    CLASS_NAME: "SuperMap.iServer.GetLayersInfoService"
});

module.exports = function (url, options) {
    return new SuperMap.iServer.GetLayersInfoService(url, options);
};