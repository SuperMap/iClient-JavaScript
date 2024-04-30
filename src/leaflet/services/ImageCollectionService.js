/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import '../core/Base';
import CommonMatchImageCollectionService from '@supermap/iclient-common/iServer/ImageCollectionService';

/**
 * @class ImageCollectionService
 * @deprecatedclassinstance L.supermap.imageCollectionService
 * @version 10.2.0
 * @constructs ImageCollectionService
 * @classdesc 影像集合服务类。提供方法：获取影像集合的统计信息、图例信息、服务瓦片信息，获取、删除影像集合中的指定影像等。
 * @category  iServer Image
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new ImageCollectionService(url,options)
 *      .getLegend(queryParams, function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} options.collectionId 影像集合（Collection）的 ID，在一个影像服务中唯一标识影像集合。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var ImageCollectionService = ServiceBase.extend({
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._imageCollectionService = new CommonMatchImageCollectionService(this.url, {
          collectionId: this.options.collectionId,
          proxy: this.options.proxy,
          withCredentials: this.options.withCredentials,
          crossOrigin: this.options.crossOrigin,
          headers: this.options.headers
        });
    },

    /**
     * @function ImageCollectionService.prototype.getLegend
     * @description 返回当前影像集合的图例信息。
     * @param {Object} queryParams query 参数。
     * @param {ImageRenderingRule} [queryParams.renderingRule] 指定影像显示的风格，包含拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。默认使用发布服务时所配置的风格。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getLegend: function (queryParams, callback) {
      return this._imageCollectionService.getLegend(queryParams, callback);
    },

    /**
     * @function ImageCollectionService.prototype.getStatistics
     * @description 返回当前影像集合的统计信息。包括文件数量，文件大小等信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getStatistics: function (callback) {
      return this._imageCollectionService.getStatistics(callback);
    },

    /**
     * @function ImageCollectionService.prototype.getTileInfo
     * @description 返回影像集合所提供的服务瓦片的信息，包括：每层瓦片的分辨率，比例尺等信息，方便前端进行图层叠加。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTileInfo: function (callback) {
      return this._imageCollectionService.getTileInfo(callback);
    },

    /**
     * @function ImageCollectionService.prototype.deleteItemByID
     * @description 删除影像集合中指定 ID（`featureId`）的 Item 对象，即从影像集合中删除指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    deleteItemByID(featureId, callback) {
      return this._imageCollectionService.deleteItemByID(featureId, callback);
    },

    /**
     * @function ImageCollectionService.prototype.getItemByID
     * @description 返回影像集合中指定 ID（`featureId`）的 Item 对象，即返回影像集合中指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getItemByID(featureId, callback) {
      return this._imageCollectionService.getItemByID(featureId, callback);
    }
});

export var imageCollectionService = function (url, options) {
    return new ImageCollectionService(url, options);
};

