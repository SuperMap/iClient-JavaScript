import SuperMap from '../SuperMap';
import {DataFormat} from '../../common/REST';
import CommonServiceBase from '../../common/iServer/CommonServiceBase';
import CommonAddressMatchService from '../../common/iServer/AddressMatchService';

/**
 * @class SuperMap.REST.AddressMatchService
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @extends SuperMap.REST.CommonServiceBase
 * @param url - {String} 服务地址
 * @param options - {object} 地址匹配服务可选参数
 */
export class AddressMatchService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function SuperMap.REST.AddressMatchService.prototype.code
     * @description 编码
     * @param params - {String} 编码参数
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.AddressMatchService} 返回正向匹配地址
     */
    code(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
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
     * @function SuperMap.REST.AddressMatchService.prototype.decode
     * @description 解码
     * @param params - {String} 编码参数
     * @param callback - {function} 回调函数
     * @param resultFormat - {SuperMap.DataFormat} 返回的结果类型（默认为GeoJSON）。
     * @return {SuperMap.REST.AddressMatchService} 返回反向匹配地址
     */
    decode(params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new CommonAddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    }

    _processFormat(resultFormat) {
        return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
    }

    CLASS_NAME = "SuperMap.REST.AddressMatchService"
}

SuperMap.REST.AddressMatchService = AddressMatchService;