/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import '../core/Base';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
import { GetLayersInfoService } from '@supermap/iclient-common/iServer/GetLayersInfoService';
import { SetLayerInfoService } from '@supermap/iclient-common/iServer/SetLayerInfoService';
import { SetLayersInfoService } from '@supermap/iclient-common/iServer/SetLayersInfoService';
import { SetLayerStatusService } from '@supermap/iclient-common/iServer/SetLayerStatusService';
import { SetLayerStatusParameters } from '@supermap/iclient-common/iServer/SetLayerStatusParameters';
import { SetLayerInfoParameters } from '@supermap/iclient-common/iServer/SetLayerInfoParameters';
import { SetLayersInfoParameters } from '@supermap/iclient-common/iServer/SetLayersInfoParameters';


/**
 * @class LayerInfoService
 * @deprecatedclassinstance L.supermap.layerInfoService
 * @classdesc 图层信息类。
 * @category  iServer Map Layer
 * @extends {ServiceBase}
 * @example
 * new LayerInfoService(url).getLayersInfo(function(result){
 *   //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var LayerInfoService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function LayerInfoService.prototype.getLayersInfo
     * @description 获取图层信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getLayersInfo: function (callback) {
        var me = this;
        var getLayersInfoService = new GetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });
        getLayersInfoService.processAsync();
    },

    /**
     * @function LayerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改。
     * @param {SetLayerInfoParameters} params - 设置图层信息参数类。
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
            eventListeners: {
                processCompleted: callback,
                processFailed: callback
            }
        });

        setLayerInfoService.processAsync(layerInfoParams);
    },


    /**
     * @function  LayerInfoService.prototype.setLayersInfo
     * @description 设置图层信息。可以实现创建新的临时图层和修改现有的临时图层。
     * @param {SetLayersInfoParameters} params - 设置图层信息参数类。
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
     * @function LayerInfoService.prototype.setLayerStatus
     * @description 负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param {SetLayerStatusParameters} params - 子图层显示控制参数类。
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
