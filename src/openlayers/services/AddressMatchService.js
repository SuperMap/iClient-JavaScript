import SuperMap from '../../common/SuperMap';
import ServiceBase  from './ServiceBase';
import ol from 'openlayers/dist/ol-debug';
import CommonAddressMatchService from '../../common/iServer/AddressMatchService';

/**
 * @class ol.supermap.AddressMatchService
 * @classdesc 地址匹配服务
 * @example
 *      new ol.supermap.AddressMatchService(url,options)
 *      .code(function(result){
 *          //doSomething
 *      })
 * @param url - {string} 与客户端交互的服务地址。
 * @param options -{Object} 交互时所需可选参数。
 * @extends ol.supermap.ServiceBase
 */
export default class AddressMatchService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.AddressMatchService.prototype.code
     * @description 获取正向地址匹配结果。
     * @param params - {Object} 正向匹配参数。
     * @param callback - {function} 请求结果的回调函数。
     */
    code(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
        });
        addressMatchService.code(me.url + '/geocoding', params);
        return me;
    }

    /**
     * @function ol.supermap.AddressMatchService.prototype.decode
     * @description 获取反向地址匹配结果。
     * @param params -{Object} 反向匹配参数。
     * @param callback -{function}请求结果的回调函数。
     */
    decode(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    };

}
ol.supermap.AddressMatchService = AddressMatchService;
