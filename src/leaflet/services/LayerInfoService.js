/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import '../core/Base';
import { LayerInfoService as CommonLayerInfoService } from '@supermapgis/iclient-common/iServer/LayerInfoService';

/**
 * @class LayerInfoService
 * @deprecatedclassinstance L.supermap.layerInfoService
 * @classdesc 图层信息类。支持获取图层信息、创建新的临时图层、修改现有的临时图层、传递子图层显示控制参数等。
 * @category  iServer Map Layer
 * @modulecategory Services
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
        this._layerInfoService = new CommonLayerInfoService(url, options);
    },

    /**
     * @function LayerInfoService.prototype.getLayersInfo
     * @description 获取图层信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getLayersInfo: function (callback) {
      return this._layerInfoService.getLayersInfo(callback);
    },

    /**
     * @function LayerInfoService.prototype.getLayersLegendInfo
     * @description 获取地图的图例信息。
     * @version 11.1.1
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getLayersLegendInfo(params, callback) {
      return this._layerInfoService.getLayersLegendInfo(params, callback);
    },

    /**
     * @function LayerInfoService.prototype.setLayerInfo
     * @description 设置图层信息服务。可以实现临时图层中子图层的修改。
     * @param {SetLayerInfoParameters} params - 设置图层信息参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setLayerInfo: function (params, callback) {
      return this._layerInfoService.setLayerInfo(params, callback);
    },


    /**
     * @function LayerInfoService.prototype.setLayersInfo
     * @description 设置图层信息。可以实现创建新的临时图层和修改现有的临时图层。
     * @param {SetLayersInfoParameters} params - 设置图层信息参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setLayersInfo: function (params, callback) {
      return this._layerInfoService.setLayersInfo(params, callback);
    },


    /**
     * @function LayerInfoService.prototype.setLayerStatus
     * @description 负责将子图层显示控制参数传递到服务端，并获取服务端返回的图层显示状态。
     * @param {SetLayerStatusParameters} params - 子图层显示控制参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    setLayerStatus: function (params, callback) {
      return this._layerInfoService.setLayerStatus(params, callback);
    }

});

export var layerInfoService = function (url, options) {
    return new LayerInfoService(url, options);
};
