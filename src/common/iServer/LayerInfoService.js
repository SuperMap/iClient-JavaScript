/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { Util as CommonUtil} from '../commontypes/Util';
import { GetLayersInfoService } from './GetLayersInfoService';
import { GetLayersLegendInfoService } from './GetLayersLegendInfoService';
import { SetLayerInfoService } from './SetLayerInfoService';
import { SetLayersInfoService } from './SetLayersInfoService';
import { SetLayerStatusService } from './SetLayerStatusService';

/**
 * @class LayerInfoService
 * @category  iServer Map Layer
 * @classdesc 图层信息服务类。
 * @extends {ServiceBase}
 * @example
 *      new LayerInfoService(url).getLayersInfo(function(result){
 *           //doSomething
 *      })
 * @param {string} url - 服务地址。请求地图服务，URL 应为：
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class LayerInfoService {

    constructor(url, options) {
      this.url = url;
      this.options = options || {};
    }

    /**
     * @function LayerInfoService.prototype.getLayersInfo
     * @description 获取图层信息服务。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getLayersInfo(callback) {
        var me = this;
        var getLayersInfoService = new GetLayersInfoService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return getLayersInfoService.processAsync(callback);
    }

    /**
     * @function LayerInfoService.prototype.getLayersLegendInfo
     * @version 11.1.1
     * @description 获取地图的图例信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getLayersLegendInfo(params, callback) {
      var me = this;
      var getLayersLegendInfoService = new GetLayersLegendInfoService(me.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
      });
      return getLayersLegendInfoService.processAsync(params, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改。
     * @param {SetLayerInfoParameters} params - 设置图层信息参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayerInfo(params, callback) {
        if (!params) {
            return;
        }
        var me = this,
            resourceID = params.resourceID,
            tempLayerName = params.tempLayerName,
            layerInfoParams = params.layerInfo;
        if (!resourceID || !tempLayerName) {
            return;
        }
        var url = CommonUtil.urlPathAppend(me.url, "tempLayersSet/" + resourceID + "/" + tempLayerName);
        var setLayerInfoService = new SetLayerInfoService(url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return setLayerInfoService.processAsync(layerInfoParams, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayersInfo
     * @description 设置图层信息服务。可以创建新的临时图层和修改现有的临时图层。
     * @param {SetLayersInfoParameters} params - 设置图层信息参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayersInfo(params, callback) {
        if (!params) {
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
            resourceID: resourceID,
            isTempLayers: isTempLayers
        });
        return setLayersInfoService.processAsync(layersInfo, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayerStatus
     * @description 子图层显示控制服务。负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param {SetLayerStatusParameters} params - 子图层显示控制参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayerStatus(params, callback) {
        if (!params) {
            return;
        }
        var me = this;
        var setLayerStatusService = new SetLayerStatusService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return setLayerStatusService.processAsync(params, callback);
    }
}
