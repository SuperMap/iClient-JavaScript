/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import { LayerInfoService as CommonLayerInfoService } from '@supermap/iclient-common/iServer/LayerInfoService';
/**
 * @class LayerInfoService
 * @category  iServer Map Layer
 * @classdesc 图层信息服务类。
 * @version 11.1.0
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 * new LayerInfoService(url).getLayersInfo(function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。请求地图服务,URL 应为：</br>
 *                       http://{服务器地址}:{服务端口号}/iserver/services/{地图服务名}/rest/maps/{地图名}/tempLayersSet/{tempLayerID}/Rivers@World@@World"。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class LayerInfoService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._layerInfoService = new CommonLayerInfoService(url, options);
    }

    /**
     * @function LayerInfoService.prototype.getLayersInfo
     * @description 获取图层信息服务。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getLayersInfo(callback) {
      return this._layerInfoService.getLayersInfo(callback);
    }

    /**
     * @function LayerInfoService.prototype.getLayersLegendInfo
     * @description 获取地图的图例信息。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    getLayersLegendInfo(params, callback) {
      return this._layerInfoService.getLayersLegendInfo(params, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改。
     * @param {SetLayerInfoParameters} params - 设置图层信息参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayerInfo(params, callback) {
      return this._layerInfoService.setLayerInfo(params, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayersInfo
     * @description 设置图层信息服务。可以实现创建新的临时图层和对现有临时图层的修改。
     * @param {SetLayersInfoParameters} params - 设置图层信息参数类,包括临时图层。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayersInfo(params, callback) {
      return this._layerInfoService.setLayersInfo(params, callback);
    }

    /**
     * @function LayerInfoService.prototype.setLayerStatus
     * @description 子图层显示控制服务。负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param {SetLayerStatusParameters} params - 子图层显示控制参数类。
     * @param {RequestCallback} callback 回调函数。
     * @returns {Promise} Promise 对象。
     */
    setLayerStatus(params, callback) {
      return this._layerInfoService.setLayerStatus(params, callback);
    }
}
