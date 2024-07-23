/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class ImageService
 * @deprecatedclass SuperMap.ImageService
 * @classdesc 影像服务类。可实现大规模影像或栅格数据的管理，提供方法：
 * 获取影像集合列表、获取影像集合中指定 ID 的影像、根据过滤条件查询匹配的影像数据。
 * @version 10.2.0
 * @category iServer Image
 * @param {string} url - 服务地址。例如: http://{ip}:{port}/iserver/{imageservice-imageserviceName}/restjsr/
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @usage
 */
export default class ImageService extends CommonServiceBase {
  constructor(url, options) {
    super(url, options);
    this.options = options || {};
    if (options) {
      Util.extend(this, options);
    }
    this.CLASS_NAME = 'SuperMap.ImageService';
  }

  /**
   * @function ImageService.prototype.destroy
   * @override
   */
  destroy() {
    super.destroy();
  }

  /**
   * @function ImageService.prototype.getCollections
   * @description 返回当前影像服务中的影像集合列表（Collections）。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getCollections(callback) {
    var me = this;
    var path = Util.convertPath('/collections');
    var url = Util.urlPathAppend(me.url, path);
    return this._processAsync({ url, mehtod: 'GET', callback });
  }

  /**
   * @function ImageService.prototype.getCollectionByID
   * @description ID 值等于`collectionId`参数值的影像集合（Collection）。ID 值用于在服务中唯一标识该影像集合。
   * @param {string} collectionId 影像集合（Collection）的 ID，在一个影像服务中唯一标识影像集合。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  getCollectionByID(collectionId, callback) {
    var pathParams = {
      collectionId: collectionId
    };
    var me = this;
    var path = Util.convertPath('/collections/{collectionId}', pathParams);
    var url = Util.urlPathAppend(me.url, path);
    return this._processAsync({ url, mehtod: 'GET', callback });
  }

  /**
   * @function ImageSearchService.prototype.search
   * @description 查询与过滤条件匹配的影像数据。
   * @param {ImageSearchParameter} [imageSearchParameter] 查询参数。
   * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
   * @returns {Promise} Promise 对象。
   */
  search(imageSearchParameter, callback) {
    var postBody = { ...(imageSearchParameter || {}) };
    var me = this;
    var path = Util.convertPath('/search');
    var url = Util.urlPathAppend(me.url, path);
    return this._processAsync({ url, method: 'POST', data: postBody, callback });
  }

  _processAsync({ url, method, callback, data }) {
    return this.request({
      method: method || 'GET',
      url,
      data,
      scope: this,
      success: callback,
      failure: callback
    });
  }
}
