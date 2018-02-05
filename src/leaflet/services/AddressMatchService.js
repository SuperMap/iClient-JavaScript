import L from 'leaflet';
import {ServiceBase} from './ServiceBase';
import '../core/Base';
import {AddressMatchService as CommonMatchAddressService} from '@supermap/iclient-common';

/**
 * @class L.supermap.addressMatchService
 * @constructs L.supermap.addressMatchService
 * @classdesc 地址匹配服务
 * @category  iServer AddressMatch
 * @extends L.supermap.ServiceBase
 * @example
 *      L.supermap.addressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param url - {string} 地址匹配服务地址
 * @param options {Object} 地址匹配服务可选参数。如：data - {number}
 *
 */
export var AddressMatchService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.addressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param params - {Object} 正向匹配参数。
     * @param callback - {function} 请求结果的回调函数。
     */
    code: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(me.url, {
            proxy: me.options.proxy,
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
     * @param params -{Object} 反向匹配参数。
     * @param callback -{function} 请求结果的回调函数。
     */
    decode: function (params, callback) {
        var me = this;
        var addressMatchService = new CommonMatchAddressService(me.url, {
            proxy: me.options.proxy,
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