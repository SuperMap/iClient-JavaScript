/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import { SecurityManager } from '../security/SecurityManager';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class OnlineServiceBase
 * @deprecatedclass SuperMap.OnlineServiceBase
 * @classdesc Online 服务基类（使用 key 作为权限限制的类需要实现此类）。
 * @category iPortal/Online Core
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class OnlineServiceBase {

    constructor(options) {
        options = options || {};
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.OnlineServiceBase";
    }

    /**
     * @function OnlineServiceBase.prototype.request
     * @description 请求 online 服务
     * @param {string} [method='GET'] - 请求方式, 'GET', 'PUT', 'POST', 'DELETE'。
     * @param {string} url - 服务地址。
     * @param {Object} param - URL 查询参数。
     * @param {Object} [requestOptions] - http 请求参数, 比如请求头，超时时间等。
     * @returns {Promise}  包含请求结果的 Promise 对象。
     */
    request(method, url, param, requestOptions = {}) {
        url = SecurityManager.appendCredential(url);
        requestOptions['crossOrigin'] = this.options.crossOrigin;
        requestOptions['headers'] = this.options.headers;
        return FetchRequest.commit(method, url, param, requestOptions).then(function(response) {
            return response.json();
        });
    }


}

