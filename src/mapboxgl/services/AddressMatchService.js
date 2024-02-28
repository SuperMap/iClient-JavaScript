/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { AddressMatchService as AddressMatchServiceBase } from '@supermap/iclient-common/iServer/AddressMatchService';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';

/**
 * @class AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务类。此类提供了地址的正向匹配和反向匹配功能，正向匹配即通过地点名称关键词查找地址位置，反向匹配即根据位置坐标查询地点。
 * @modulecategory Services
 * @example
 * new AddressMatchService(url,options)
 * .code(function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {ServiceBase}
 * @usage
 */
export class AddressMatchService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this._addressMatchService = new AddressMatchServiceBase(url, options);
    }

    /**
     * @function AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    code(params, callback) {
      return this._addressMatchService.code(CommonUtil.urlPathAppend(this.url, 'geocoding'), params, callback);
    }

    /**
     * @function AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {GeoDecodingParameter} params -反向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    decode(params, callback) {
      return this._addressMatchService.decode(CommonUtil.urlPathAppend(this.url, 'geodecoding'), params, callback);
    }
}
