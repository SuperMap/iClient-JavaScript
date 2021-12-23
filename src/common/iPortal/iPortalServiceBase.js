/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { SecurityManager } from '../security/SecurityManager';
import { FetchRequest } from '../util/FetchRequest';

/**
 * @class SuperMap.iPortalServiceBase
 * @classdesc iPortal 服务基类（有权限限制的类需要实现此类）。
 * @category iPortal/Online
 * @param {string} url - iPortal 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class IPortalServiceBase {

    constructor(url, options) {
        options = options || {};
        this.serviceUrl = url;
        this.CLASS_NAME = "SuperMap.iPortalServiceBase";
        this.withCredentials = options.withCredentials || false;
        this.crossOrigin = options.crossOrigin
        this.headers = options.headers
    }

    /**
     * @function SuperMap.iPortalServiceBase.prototype.request
     * @description 子类统一通过该方法发送请求。
     * @param {string} [method='GET'] - 请求类型。
     * @param {string} url - 服务地址。
     * @param {Object} param - 请求参数。
     * @param {Object} [requestOptions] - fetch 请求配置项。
     * @returns {Promise} 返回包含请求结果的 Promise 对象。
     */

    request(method, url, param, requestOptions = {headers: this.headers, crossOrigin: this.crossOrigin, withCredentials: this.withCredentials }) {
        url = SecurityManager.appendCredential(url);
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }
 

}

SuperMap.iPortalServiceBase = IPortalServiceBase;
