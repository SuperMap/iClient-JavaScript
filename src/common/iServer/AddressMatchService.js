/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { CommonServiceBase } from './CommonServiceBase';
import { GeoCodingParameter } from './GeoCodingParameter';
import { GeoDecodingParameter } from './GeoDecodingParameter';

/**
 * @class AddressMatchService
 * @deprecatedclass SuperMap.AddressMatchService
 * @category iServer AddressMatch
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @param {string} url - 服务地址。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class AddressMatchService extends CommonServiceBase {
    constructor(url, options) {
        super(url, options);
        this.options = options || {};
        this.CLASS_NAME = 'SuperMap.AddressMatchService';
    }

    /**
     * @function AddressMatchService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function AddressMatchService.prototype.code
     * @param {string} url - 正向地址匹配服务地址。
     * @param {GeoCodingParameter} params - 正向地址匹配服务参数。
     */
    code(url, params) {
        if (!(params instanceof GeoCodingParameter)) {
            return;
        }
        this.processAsync(url, params);
    }

    /**
     * @function AddressMatchService.prototype.decode
     * @param {string} url - 反向地址匹配服务地址。
     * @param {GeoDecodingParameter} params - 反向地址匹配服务参数。
     */
    decode(url, params) {
        if (!(params instanceof GeoDecodingParameter)) {
            return;
        }
        this.processAsync(url, params);
    }

    /**
     * @function AddressMatchService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param {string} url - 服务地址。
     * @param {Object} params - 参数。
     */

    processAsync(url, params) {
        this.request({
            method: 'GET',
            url,
            params,
            scope: this,
            success: this.serviceProcessCompleted,
            failure: this.serviceProcessFailed
        });
    }

    /**
     * @function AddressMatchService.prototype.serviceProcessCompleted
     * @param {Object} result - 服务器返回的结果对象。
     * @description 服务流程是否完成
     */
    serviceProcessCompleted(result) {
        if (result.succeed) {
            delete result.succeed;
        }
        super.serviceProcessCompleted(result);
    }

    /**
     * @function AddressMatchService.prototype.serviceProcessCompleted
     * @param {Object} result - 服务器返回的结果对象。
     * @description 服务流程是否失败
     */
    serviceProcessFailed(result) {
        super.serviceProcessFailed(result);
    }
}

