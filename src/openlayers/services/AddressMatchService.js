import SuperMap from '../../common/SuperMap';
import ServiceBase  from './ServiceBase';
import CommonAddressMatchService from '../../common/iServer/AddressMatchService';
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
export default class AddressMatchService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @method ol.supermap.AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param params 正向匹配参数。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    code(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
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
    }

    /**
     * @method ol.supermap.AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param params 反向匹配参数。
     * @param callback 请求结果的回调函数。
     * @param resultFormat 返回的结果类型（默认为GeoJSON）。
     */
    decode(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
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

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    }

}
ol.supermap.AddressMatchService = AddressMatchService;
