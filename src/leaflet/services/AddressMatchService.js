import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import CommonMatchAddressService from'../../common/iServer/AddressMatchService';
/**
 * @class L.supermap.addressMatchService
 * @constructs L.supermap.addressMatchService
 * @classdesc 地址匹配服务
 * @extends L.supermap.ServiceBase
 * @example 用法：
 *      L.supermap.addressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param url - {String} 地址匹配服务地址
 * @param options {object} 地址匹配服务可选参数。如：<br>
 *        data - {number}
 *
 */
export var  AddressMatchService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function L.supermap.addressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param params - {object} 正向匹配参数。
     * @param callback - {function} 请求结果的回调函数。
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    code: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonMatchAddressService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.code(me.url + '/geocoding', params);
        return me;
    },

    /**
     * @function L.supermap.addressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param params -{object} 反向匹配参数。
     * @param callback -{function} 请求结果的回调函数。
     * @param resultFormat -{SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     */
    decode: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonMatchAddressService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

export var addressMatchService = function (url, options) {
    return new AddressMatchService(url, options);
};

L.supermap.addressMatchService = addressMatchService;
