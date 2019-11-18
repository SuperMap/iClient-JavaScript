/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { ServerType } from '../REST';
import { SecurityManager } from '../security/SecurityManager';
import { Credential } from '../commontypes/Credential';
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
        this.serverType = ServerType.iPortal;
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
        url = this.createCredentialUrl(url);
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }


    /**
     * @function SuperMap.iPortalServiceBase.prototype.createCredentialUrl
     * @description 追加授权信息。
     * @param {string} url - 创建证书 URL 地址。
     * @returns {string} 携带 token 或 key 的新地址。
     */

    createCredentialUrl(url) {
        var newUrl = url,
            credential = this.getCredential();

        if (credential) {
            var endStr = newUrl.substring(newUrl.length - 1, newUrl.length);

            if (newUrl.indexOf("?") > -1 && endStr === "?") {
                newUrl += credential.getUrlParameters();
            } else if (newUrl.indexOf("?") > -1 && endStr !== "?") {
                newUrl += "&" + credential.getUrlParameters();
            } else {
                newUrl += "?" + credential.getUrlParameters();
            }
        }
        return newUrl;
    }


    /**
     * @function SuperMap.iPortalServiceBase.prototype.getCredential
     * @description 获取 token。
     * @returns {string} 返回获取的 token。
     *
     */

    getCredential() {
        var credential,
            value = SecurityManager.getToken(this.serviceUrl);
        credential = value ? new Credential(value, "token") : null;
        if (!credential) {
            value = this.getKey();
            credential = value ? new Credential(value, "key") : null;
        }
        return credential;
    }


    /**
     * @function SuperMap.iPortalServiceBase.prototype.getKey
     * @description 其子类需要重写该方法，修改其中获取 key 的字段，存储 key 可能是服务 ID 字段，可能是 URL。
     */
    getKey() {
        //return SuperMap.SecurityManager.getKey(this.id);
        //或
        //return SuperMap.SecurityManager.getKey(this.serviceUrl);
    }

}

SuperMap.iPortalServiceBase = IPortalServiceBase;
