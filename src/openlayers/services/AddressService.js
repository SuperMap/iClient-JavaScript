/**
 * Class:ol.supermap.AddressService
 * 地址匹配服务
 * 用法：
 *      new ol.supermap.AddressService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 */
var ol = require('openlayers');
var SuperMap = require('../../common/SuperMap');
var ServiceBase = require('./ServiceBase');
var AddressService = require('../../common/iServer/AddressService');

ol.supermap.AddressService = function (url, options) {
    ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.AddressService, ServiceBase);

/**
 * 获取正向地址匹配结果。
 * @param params 正向匹配参数。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.AddressService.prototype.code = function (params, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var addressService = new AddressService(me.options.url, {
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
};

/**
 * 获取反向地址匹配结果。
 * @param params 反向匹配参数。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.AddressService.prototype.decode = function (params, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var addressService = new AddressService(me.options.url, {
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
};

ol.supermap.AddressService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

module.exports = ol.supermap.AddressService;
