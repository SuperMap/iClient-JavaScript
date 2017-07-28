/**
 * @class ol.supermap.AddressService
 * @constructs ol.supermap.AddressService
 * @classdesc
 * 地址匹配服务
 * @example 用法：
 *      new ol.supermap.AddressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @api
 */
var ol = require('openlayers/dist/ol-debug');
var SuperMap = require('../../common/SuperMap');
var ServiceBase = require('./ServiceBase');
var AddressMatchService = require('../../common/iServer/AddressMatchService');

ol.supermap.AddressMatchService = function (url, options) {
    ServiceBase.call(this, url, options);
};
ol.inherits(ol.supermap.AddressMatchService, ServiceBase);

/**
 * @method ol.supermap.AddressMatchService.prototype.code
 * @description 获取正向地址匹配结果。
 * @param params 正向匹配参数。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.AddressMatchService.prototype.code = function (params, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var addressMatchService = new AddressMatchService(me.url, {
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
};

/**
 * @method ol.supermap.AddressMatchService.prototype.decode
 * @description 获取反向地址匹配结果。
 * @param params 反向匹配参数。
 * @param callback 请求结果的回调函数。
 * @param resultFormat 返回的结果类型（默认为GeoJSON）。
 */
ol.supermap.AddressMatchService.prototype.decode = function (params, callback, resultFormat) {
    var me = this,
        format = me._processFormat(resultFormat);
    var addressMatchService = new AddressMatchService(me.url, {
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
};

ol.supermap.AddressMatchService.prototype._processFormat = function (resultFormat) {
    return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
};

module.exports = ol.supermap.AddressMatchService;
