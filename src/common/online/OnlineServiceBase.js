/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
// import {SecurityManager} from '../security/SecurityManager';
import {ServerType} from '../REST';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.OnlineServiceBase
 * @classdesc Online 服务基类（使用 key 作为权限限制的类需要实现此类）。
 * @category iPortal/Online
 * @param {Object} options - 服务参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class OnlineServiceBase {

    constructor(options) {
        options = options || {};
        Util.extend(this, options);
        this.serverType = ServerType.ONLINE;
        this.CLASS_NAME = "SuperMap.OnlineServiceBase";
    }

    /**
     * @function SuperMap.OnlineServiceBase.prototype.request
     * @description 请求 online 服务
     * @param {string} [method='GET'] - 请求方式, 'GET', 'PUT', 'POST', 'DELETE'。
     * @param {string} url - 服务地址。
     * @param {Object} param - URL 查询参数。
     * @param {Object} [requestOptions] - http 请求参数, 比如请求头，超时时间等。
     * @returns {Promise}  返回包含请求结果的 Promise 对象。
     */
    request(method, url, param, requestOptions = {}) {
        url = this.createCredentialUrl(url);
        requestOptions['crossOrigin'] = this.options.crossOrigin;
        requestOptions['headers'] = this.options.headers;
        return FetchRequest.commit(method, url, param, requestOptions).then(function(response) {
            return response.json();
        });
    }

    /**
     * @function SuperMap.OnlineServiceBase.prototype.createCredentialUrl
     * @description 追加授权信息。
     * @param {string} url - 对接的 online 服务地址。
     */
    createCredentialUrl(url) {
        var newUrl = url,
            key = this.getCredential();
        if (key) {
            var paramStr = "key=" + key;
            var endStr = newUrl.substring(newUrl.length - 1, newUrl.length);
            if (newUrl.indexOf("?") > -1 && endStr === "?") {
                newUrl += paramStr;
            } else if (newUrl.indexOf("?") > -1 && endStr !== "?") {
                newUrl += "&" + paramStr;
            } else {
                newUrl += "?" + paramStr;
            }
        }
        return newUrl;
    }

    //其子类需要重写该方法，修改其中获取key的字段
    //存储key可能是服务id字段，可能是url，或者是WebAPI类型
    getCredential() {
        //return SecurityManager.getKey(this.id);
        //或
        //return SecurityManager.getKey(this.serviceUrl);
    }

}

SuperMap.OnlineServiceBase = OnlineServiceBase;
