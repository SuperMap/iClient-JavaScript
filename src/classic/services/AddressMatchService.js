import SuperMap from '../SuperMap';
import CommonServiceBase from '../../common/iServer/CommonServiceBase';
import CommonAddressMatchService from '../../common/iServer/AddressMatchService';

/**
 * @class SuperMap.REST.AddressMatchService
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @extends SuperMap.REST.CommonServiceBase
 * @param url - {string} 服务地址
 * @param options - {Object} 地址匹配服务可选参数
 */
export class AddressMatchService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function SuperMap.REST.AddressMatchService.prototype.code
     * @description 正向匹配
     * @param params - {SuperMap.GeoCodingParameter} 正向匹配参数
     * @param callback - {function} 回调函数
     * @return {this}
     */
    code(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
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
     * @function SuperMap.REST.AddressMatchService.prototype.decode
     * @description 反向匹配
     * @param params - {SuperMap.GeoDeCodingParameter} 反向匹配参数
     * @param callback - {function} 回调函数
     * @return {this}
     */
    decode(params, callback) {
        var me = this;
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    }

    CLASS_NAME = "SuperMap.REST.AddressMatchService"
}

SuperMap.REST.AddressMatchService = AddressMatchService;