import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {
    GetLayersInfoService,
    SetLayerInfoService,
    SetLayersInfoService,
    SetLayerStatusService,
    SetLayerStatusParameters,
    SetLayerInfoParameters,
    SetLayersInfoParameters
} from '@supermap/iclient-common';

/**
 * @class L.supermap.layerInfoService
 * @classdesc 图层信息类
 * @category  iServer Map Layer
 * @extends L.supermap.ServiceBase
 * @example
 * L.supermap.layerInfoService(url).getLayersInfo(function(result){
 *   //doSomething
 * })
 * @param url - {string} 与服务端交互的地图服务地址。请求地图服务URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}"；
 * @param options - {Object} 交互服务时所需可选参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online。<br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
 */
export var LayerInfoService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.layerInfoService.prototype.getLayerInfo
     * @description 获取图层信息
     * @param callback - {function} 获取信息完成后的回调函数
     */
    getLayersInfo: function (callback) {
        var me = this;
        var getLayersInfoService = new GetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        getLayersInfoService.processAsync();
    },

    /**
     * @function L.supermap.layerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改
     * @param params - {SuperMap.SetLayerInfoParameters} 图层信息相关参数
     * @param callback - {function} 回调函数
     */
    setLayerInfo: function (params, callback) {
        if (!(params instanceof SetLayerInfoParameters)) {
            return;
        }
        var me = this,
            resourceID = params.resourceID,
            tempLayerName = params.tempLayerName,
            layerInfoParams = params.layerInfo;
        if (!resourceID || !tempLayerName) {
            return;
        }
        var url = me.url.concat();
        url += "/tempLayersSet/" + resourceID + "/" + tempLayerName;

        var setLayerInfoService = new SetLayerInfoService(url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });

        setLayerInfoService.processAsync(layerInfoParams);
    },


    /**
     * @function  L.supermap.layerInfoService.prototype.setLayersInfo
     * @description 设置图层信息。可以实现创建新的临时图层和对现有临时图层的修改
     * @param params -{SuperMap.SetLayersInfoParameters} 图层信息设置参数,包括临时图层。
     * @param callback -{function} 回调函数
     */
    setLayersInfo: function (params, callback) {
        if (!(params instanceof SetLayersInfoParameters)) {
            return;
        }
        var me = this,
            resourceID = params.resourceID,
            isTempLayers = params.isTempLayers ? params.isTempLayers : false,
            layersInfo = params.layersInfo;
        if ((isTempLayers && !resourceID) || !layersInfo) {
            return;
        }
        var setLayersInfoService = new SetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            },
            resourceID: resourceID,
            isTempLayers: isTempLayers
        });

        setLayersInfoService.processAsync(layersInfo);
    },


    /**
     * @function L.supermap.layerInfoService.prototype.setLayerStatus
     * @description 负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param params -{SuperMap.SetLayerStatusParameters} 图层信息显示控制参数
     * @param callback -{function} 回调函数
     */
    setLayerStatus: function (params, callback) {
        if (!(params instanceof SetLayerStatusParameters)) {
            return;
        }
        var me = this;
        var setLayerStatusService = new SetLayerStatusService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        setLayerStatusService.processAsync(params);
    }

});

export var layerInfoService = function (url, options) {
    return new LayerInfoService(url, options);
};

L.supermap.layerInfoService = layerInfoService;