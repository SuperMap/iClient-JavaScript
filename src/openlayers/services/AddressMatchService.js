import {ServiceBase} from './ServiceBase';
import ol from 'openlayers';
import {AddressMatchService as CommonAddressMatchService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务
 * @example
 *      new ol.supermap.AddressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param {string} url - 与客户端交互的服务地址。
 * @param {Object} options - 参数。
 * @param {string} options.proxy - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带cookie。
 * @extends {ol.supermap.ServiceBase}
 */
export class AddressMatchService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param {SuperMap.GeoCodingParameter} params - 正向匹配参数。
     * @param {RequestCallback} callback 请求结果的回调函数。
     */
    code(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
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
    }

    /**
     * @function ol.supermap.AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param {SuperMap.GeoDecodingParameter} params - 反向匹配参数。
     * @param {RequestCallback} callback 请求结果的回调函数。
     */
    decode(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
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

}
ol.supermap.AddressMatchService = AddressMatchService;
