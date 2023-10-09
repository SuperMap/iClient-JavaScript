/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import '../core/Base';
import { AddressMatchService as CommonMatchAddressService } from '@supermap/iclient-common/iServer/AddressMatchService';
import { Util as CommonUtil } from '@supermap/iclient-common/commontypes/Util';
/**
 * @class AddressMatchService
 * @deprecatedclassinstance L.supermap.addressMatchService
 * @constructs AddressMatchService
 * @classdesc 地址匹配服务类。此类提供了地址的正向匹配和反向匹配功能，正向匹配即通过地点名称关键词查找地址位置，反向匹配即根据位置坐标查询地点。
 * @category  iServer AddressMatch
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 *      new AddressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var AddressMatchService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        var me = this;
        this._addressMatchService = new CommonMatchAddressService(this.url, {
          proxy: me.options.proxy,
          withCredentials: me.options.withCredentials,
          crossOrigin: me.options.crossOrigin,
          headers: me.options.headers
      });
    },

    /**
     * @function AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    code: function (params, callback) {
      return this._addressMatchService.code(CommonUtil.urlPathAppend(this.url, 'geocoding'), params, callback);
    },

    /**
     * @function AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    decode: function (params, callback) {
      return this._addressMatchService.decode(CommonUtil.urlPathAppend(this.url, 'geodecoding'), params, callback);
    }

});

export var addressMatchService = function (url, options) {
    return new AddressMatchService(url, options);
};
