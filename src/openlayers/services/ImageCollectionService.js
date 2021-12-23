/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import { ImageCollectionService as CommonMatchImageCollectionService } from '@supermap/iclient-common';

/**
 * @class ol.supermap.ImageCollectionService
 * @version 10.2.0
 * @constructs ol.supermap.ImageCollectionService
 * @classdesc 影像集合服务类
 * @category  iServer Image
 * @extends {ol.supermap.ServiceBase}
 * @example
 *      new ol.supermap.ImageCollectionService(url,options)
 *      .getLegend(queryParams,function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。例如: http://{ip}:{port}/iserver/{imageservice-imageserviceName}/restjsr/
 * @param {Object} options - 参数。
 * @param {string} options.collectionId 影像集合（Collection）的ID，在一个影像服务中唯一标识影像集合。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class ImageCollectionService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.ImageCollectionService.prototype.getLegend
     * @param {Object} queryParams query参数
     * @param {SuperMap.ImageRenderingRule} [queryParams.renderingRule] 指定影像显示的风格，包含拉伸显示方式、颜色表、波段组合以及应用栅格函数进行快速处理等。不指定时，使用发布服务时所配置的风格。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    getLegend(queryParams, callback) {
        var me = this;
        var ImageCollectionService = new CommonMatchImageCollectionService(this.url, {
            collectionId: me.options.collectionId,
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        ImageCollectionService.getLegend(queryParams);
    }

    /**
     * @function ol.supermap.ImageCollectionService.prototype.getStatistics
     * @description 返回当前影像集合的统计信息。包括文件数量，文件大小等信息。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    getStatistics(callback) {
        var me = this;
        var ImageCollectionService = new CommonMatchImageCollectionService(me.url, {
            collectionId: me.options.collectionId,
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        ImageCollectionService.getStatistics();
    }

    /**
     * @function ol.supermap.ImageCollectionService.prototype.getTileInfo
     * @description 返回影像集合所提供的服务瓦片的信息，包括：每层瓦片的分辨率，比例尺等信息，方便前端进行图层叠加。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    getTileInfo(callback) {
        var me = this;
        var ImageCollectionService = new CommonMatchImageCollectionService(me.url, {
            collectionId: me.options.collectionId,
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        ImageCollectionService.getTileInfo();
    }

    /**
     * @function ol.supermap.ImageCollectionService.prototype.deleteItemByID
     * @description 删除影像集合中的指定ID（`featureId`）的Item对象，即从影像集合中删除指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    deleteItemByID(featureId, callback) {
        var me = this;
        var ImageCollectionService = new CommonMatchImageCollectionService(this.url, {
            collectionId: me.options.collectionId,
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        ImageCollectionService.deleteItemByID(featureId);
    }

    /**
     * @function ol.supermap.ImageCollectionService.prototype.getItemByID
     * @description 返回影像集合中的指定ID（`featureId`）的Item对象，即返回影像集合中指定的影像。
     * @param {string} featureId Feature 的本地标识符。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    getItemByID(featureId, callback) {
        var me = this;
        var ImageCollectionService = new CommonMatchImageCollectionService(me.url, {
            collectionId: me.options.collectionId,
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        ImageCollectionService.getItemByID(featureId);
    }
}
