/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
    SetLayersInfoParameters,
    CommonUtil
} from '@supermap/iclient-common';

/**
 * @class L.supermap.layerInfoService
 * @classdesc 图层信息类。
 * @category  iServer Map Layer
 * @extends {L.supermap.ServiceBase}
 * @example
 * L.supermap.layerInfoService(url).getLayersInfo(function(result){
 *   //doSomething
 * })
 * @param {string} url - 与服务端交互的地图服务地址。请求地图服务 URL 应为：http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 ISERVER|IPORTAL|ONLINE。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export var LayerInfoService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.layerInfoService.prototype.getLayersInfo
     * @description 获取图层信息。
     * @param {RequestCallback} callback - 获取信息完成后的回调函数。
     */
    getLayersInfo: function (callback) {
        var me = this;
        var getLayersInfoService = new GetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改。
     * @param {SuperMap.SetLayerInfoParameters} params - 图层信息相关参数。
     * @param {RequestCallback} callback - 回调函数。
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
        var url = CommonUtil.urlPathAppend(me.url,`tempLayersSet/${resourceID}/${tempLayerName}`);

        var setLayerInfoService = new SetLayerInfoService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @description 设置图层信息。可以实现创建新的临时图层和对现有临时图层的修改。
     * @param {SuperMap.SetLayersInfoParameters} params - 图层信息设置参数，包括临时图层。
     * @param {RequestCallback} callback - 回调函数。
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
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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
     * @param {SuperMap.SetLayerStatusParameters} params - 图层信息显示控制参数。
     * @param {RequestCallback} callback - 回调函数。
     */
    setLayerStatus: function (params, callback) {
        if (!(params instanceof SetLayerStatusParameters)) {
            return;
        }
        var me = this;
        var setLayerStatusService = new SetLayerStatusService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
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