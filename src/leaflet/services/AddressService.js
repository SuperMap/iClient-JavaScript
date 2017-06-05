/**
 * Class:L.supermap.AddressService
 * 地址匹配服务
 * 用法：
 *      L.supermap.AddressService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 */
var L = require("leaflet");
var SuperMap = require('../../common/SuperMap');
var ServiceBase = require('./ServiceBase');
var CommonAddressService = require('../../common/iServer/AddressService');

var AddressService = ServiceBase.extend({

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * 获取正向地址匹配结果。
     * @param params 正向匹配参数。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    code: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressService = new CommonAddressService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressService.code(me.options.url + '/geocoding', params);
        return me;
    },

    /**
     * 获取反向地址匹配结果。
     * @param params 反向匹配参数。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    decode: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressService = new CommonAddressService(me.options.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressService.decode(me.options.url + '/geodecoding', params);
        return me;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }
});

L.supermap.AddressService = function (url, options) {
    return new AddressService(url, options);
};

module.exports = AddressService;
