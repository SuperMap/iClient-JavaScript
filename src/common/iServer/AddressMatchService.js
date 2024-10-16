/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
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
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    code(url, params, callback) {
        if (!(params instanceof GeoCodingParameter)) {
            return;
        }
        return this.processAsync(url, params, callback);
    }

    /**
     * @function AddressMatchService.prototype.decode
     * @param {string} url - 反向地址匹配服务地址。
     * @param {GeoDecodingParameter} params - 反向地址匹配服务参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    decode(url, params, callback) {
        if (!(params instanceof GeoDecodingParameter)) {
            return;
        }
        return this.processAsync(url, params, callback);
    }

    /**
     * @function AddressMatchService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param {string} url - 服务地址。
     * @param {Object} params - 参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */

    processAsync(url, params, callback) {
      return this.request({
          method: 'GET',
          url,
          params,
          scope: this,
          success: callback,
          failure: callback
      });
    }
    /**
     * @function AddressMatchService.prototype.transformResult
     * @param {Object} result - 服务器返回的结果对象。
     * @param {Object} options - 请求参数。
     * @return {Object} 转换结果。
     * @description 状态完成时转换结果。
     */
    transformResult(result, options) {
        if (result.succeed) {
            delete result.succeed;
        }
        return { result, options };
    }
}

