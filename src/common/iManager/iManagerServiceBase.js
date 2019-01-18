/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {SecurityManager} from '../security/SecurityManager';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.iManagerServiceBase
 * @classdesc iManager 服务基类（有权限限制的类需要实现此类）。
 * @category iManager
 * @param {string} url - iManager 首页地址，如：http://localhost:8390/imanager。
 */
export class IManagerServiceBase {

    constructor(url) {
        if (url) {
            var end = url.substr(url.length - 1, 1);
            this.serviceUrl = end === "/" ? url.substr(0, url.length - 2) : url;
        }
        this.CLASS_NAME = "SuperMap.iManagerServiceBase";
    }

    /**
     * @function SuperMap.iManagerServiceBase.prototype.request
     * @description 子类统一通过该方法发送请求。
     * @param {string} url - 请求 URL。
     * @param {string} [method='GET'] - 请求类型。
     * @param {Object} [requestOptions] - 请求选项。
     * @param {Object} param - 请求参数。
     * @description 发送请求。
     * @returns {Promise} Promise 对象。
     */
    request(method, url, param, requestOptions) {
        requestOptions = requestOptions || {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        };
        if (!requestOptions.hasOwnProperty("withCredentials")) {
            requestOptions['withCredentials'] = true;
        }
        var token = SecurityManager.imanagerToken;
        if (token) {
            if (!requestOptions.headers) {
                requestOptions.headers = [];
            }
            requestOptions.headers['X-Auth-Token'] = token;
        }
        if (param) {
            param = JSON.stringify(param);
        }
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }

}

SuperMap.iManagerServiceBase = IManagerServiceBase;
