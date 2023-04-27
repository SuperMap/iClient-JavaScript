/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import { Util } from '../commontypes/Util';
import { CommonServiceBase } from './CommonServiceBase';

/**
 * @class ImageService
 * @deprecatedclass SuperMap.ImageService
 * @classdesc 影像服务类。
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
     */
    getCollections() {
        var me = this;
        var path = Util.convertPath('/collections');
        var url = Util.urlPathAppend(me.url, path);
        this.request({
            method: 'GET',
            url,
            scope: this,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function ImageService.prototype.getCollectionByID
     * @description ID值等于`collectionId`参数值的影像集合（Collection）。ID值用于在服务中唯一标识该影像集合。
     * @param {string} collectionId 影像集合（Collection）的ID，在一个影像服务中唯一标识影像集合。
     */
    getCollectionByID(collectionId) {
        var pathParams = {
            collectionId: collectionId
        };
        var me = this;
        var path = Util.convertPath('/collections/{collectionId}', pathParams);
        var url = Util.urlPathAppend(me.url, path);
        this.request({
            method: 'GET',
            url,
            scope: this,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

    /**
     * @function ImageSearchService.prototype.search
     * @description 查询与过滤条件匹配的影像数据。
     * @param {ImageSearchParameter} [imageSearchParameter] 查询参数。
     */
    search(imageSearchParameter) {
        var postBody = { ...(imageSearchParameter || {}) };
        var me = this;
        var path = Util.convertPath('/search');
        var url = Util.urlPathAppend(me.url, path);
        this.request({
            method: 'POST',
            url,
            data: postBody,
            scope: this,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }
}

