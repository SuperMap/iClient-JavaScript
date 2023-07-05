/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class ImageCollectionService
 * @deprecatedclass SuperMap.ImageCollectionService
 * @classdesc 影像集合服务类。
 * @version 10.2.0
 * @category iServer Image
 * @param {string} url - 服务地址。例如: http://{ip}:{port}/iserver/{imageservice-imageserviceName}/restjsr/
 * @param {Object} options - 参数。
 * @param {string} options.collectionId 影像集合（Collection）的ID，在一个影像服务中唯一标识影像集合。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {CommonServiceBase}
 * @usage
 */
export default class ImageCollectionService extends CommonServiceBase {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        if (options) {
            Util.extend(this, options);
        }
        this.eventCount = 0;
        this.CLASS_NAME = 'SuperMap.ImageCollectionService';
    }

    /**
     * @function ImageCollectionService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function ImageCollectionService.prototype.getLegend
     * @description 返回当前影像集合的图例信息。默认为服务发布所配置的风格，支持根据风格参数生成新的图例。
     * @param {Object} queryParams query参数。
     * @param {ImageRenderingRule} [queryParams.renderingRule] renderingRule 对象，用来指定影像的渲染风格，从而确定图例内容。影像的渲染风格包含拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。该参数未设置时，将使用发布服务时所配置的风格。
     */
    getLegend(queryParams, callback) {
        var me = this;
        var pathParams = {
            collectionId: me.options.collectionId
        };
        var path = Util.convertPath('/collections/{collectionId}/legend', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this._processAsync({ url, method: 'GET', params: queryParams, callback });
    }

    /**
     * @function ImageCollectionService.prototype.getStatistics
     * @description 返回当前影像集合的统计信息。包括文件数量，文件大小等信息。
     */
    getStatistics(callback) {
        var me = this;
        var pathParams = {
            collectionId: me.options.collectionId
        };
        var path = Util.convertPath('/collections/{collectionId}/statistics', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this._processAsync({ url, method: 'GET', callback });
    }

    /**
     * @function ImageCollectionService.prototype.getTileInfo
     * @description 返回影像集合所提供的服务瓦片的信息，包括：每层瓦片的分辨率，比例尺等信息，方便前端进行图层叠加。

     */
    getTileInfo(callback) {
        var me = this;
        var pathParams = {
            collectionId: me.options.collectionId
        };
        var path = Util.convertPath('/collections/{collectionId}/tileInfo', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this._processAsync({ url, method: 'GET', callback });
    }

    /**
     * @function ImageCollectionService.prototype.deleteItemByID
     * @description 删除影像集合中指定 ID 的 Item，即从影像集合中删除指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     */
    deleteItemByID(featureId, callback) {
        var me = this;
        var pathParams = {
            collectionId: me.options.collectionId,
            featureId: featureId
        };
        var path = Util.convertPath('/collections/{collectionId}/items/{featureId}', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this._processAsync({ url, method: 'DELETE', callback });
    }

    /**
     * @function ImageCollectionService.prototype.getItemByID
     * @description 返回指定ID（`collectionId`）的影像集合中的指定ID（`featureId`）的Item对象，即返回影像集合中指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     */
    getItemByID(featureId, callback) {
        var me = this;
        var pathParams = {
            collectionId: me.options.collectionId,
            featureId: featureId
        };
        var path = Util.convertPath('/collections/{collectionId}/items/{featureId}', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this._processAsync({ url, method: 'GET', callback });
    }

    _processAsync({ url, method, callback, params}) {
        let eventId = ++this.eventCount;
        let eventListeners = {
          scope: this,
          processCompleted: function(result) {
            if (eventId === result.result.eventId && callback) {
              delete result.result.eventId;
              callback(result);
              this.events.un(eventListeners);
              return false;
            }
          },
          processFailed: function(result) {
            if ((eventId === result.error.eventId || eventId === result.eventId) && callback) {
              callback(result);
              this.events.un(eventListeners);
              return false;
            }
          }
        }
        this.events.on(eventListeners);
        this.request({
          method: method || 'GET',
          url,
          params,
          scope: this,
          success(result, options) {
            result.eventId = eventId;
            this.serviceProcessCompleted(result, options);
          },
          failure(result, options) {
            if (result.error) {
              result.error.eventId = eventId;
            }
            result.eventId = eventId;
            this.serviceProcessFailed(result, options);
          }
        });
    }
}

