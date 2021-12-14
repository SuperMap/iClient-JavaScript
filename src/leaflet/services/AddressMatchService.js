/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
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
 * @classdesc 地址匹配服务。
 * @category  iServer AddressMatch
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
    },

    /**
     * @function AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} callback - 回调函数。
     */
    code: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(this.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.code(CommonUtil.urlPathAppend(me.url, 'geocoding'), params);
    },

    /**
     * @function AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} callback - 回调函数。
     */
    decode: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.decode(CommonUtil.urlPathAppend(me.url, 'geodecoding'), params);
    }

});

export var addressMatchService = function (url, options) {
    return new AddressMatchService(url, options);
};
