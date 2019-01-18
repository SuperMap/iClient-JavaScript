/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {AddressMatchService as CommonMatchAddressService} from '@supermap/iclient-common';

/**
 * @class L.supermap.addressMatchService
 * @constructs L.supermap.addressMatchService
 * @classdesc 地址匹配服务。
 * @category  iServer AddressMatch
 * @extends {L.supermap.ServiceBase}
 * @example
 *      L.supermap.addressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param {string} url - 地址匹配服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 */
export var AddressMatchService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.addressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {SuperMap.GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    code: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.code(me.url + '/geocoding', params);
    },

    /**
     * @function L.supermap.addressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {SuperMap.GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} callback - 请求结果的回调函数。
     */
    decode: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
    }

});

export var addressMatchService = function (url, options) {
    return new AddressMatchService(url, options);
};

L.supermap.addressMatchService = addressMatchService;