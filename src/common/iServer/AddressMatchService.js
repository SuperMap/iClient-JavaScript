import {SuperMap} from '../SuperMap';
import {CommonServiceBase} from './CommonServiceBase';
import {FetchRequest} from '../util/FetchRequest';
import {GeoCodingParameter} from './GeoCodingParameter';
import {GeoDecodingParameter} from './GeoDecodingParameter';

/**
 * @class SuperMap.AddressMatchService
 * @category  iServer AddressMatch
 * @classdesc 地址匹配服务，包括正向匹配和反向匹配。
 * @param options - {Object} 参数。
 * @param url {string} 地址匹配服务地址。
 */
export class AddressMatchService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.AddressMatchService";
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.destroy
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.code
     * @param url {string} 正向地址匹配服务地址
     * @param params {SuperMap.GeoCodingParameter} 正向地址匹配服务参数
     */
    code(url, params) {
        if (!(params instanceof GeoCodingParameter)) {
            return;
        }
        this.processAsync(url, params);
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.decode
     * @param url {string} 反向地址匹配服务地址
     * @param params {SuperMap.GeoDecodingParameter} 反向地址匹配服务参数
     */
    decode(url, params) {
        if (!(params instanceof GeoDecodingParameter)) {
            return;
        }
        this.processAsync(url, params);
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.processAsync
     * @description 负责将客户端的动态分段服务参数传递到服务端。
     * @param url - {string} 服务地址
     * @param params - {Object} 参数
     */

    processAsync(url, params) {
        var me = this;
        FetchRequest.get(url, params,{proxy: me.proxy}).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result) {
                me.serviceProcessCompleted(result);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.eventListeners.processFailed({error: e});
        });
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
     * @param result - {Object} 服务器返回的结果对象。
     * @description 服务流程是否完成
     */
    serviceProcessCompleted(result) {
        super.serviceProcessCompleted(result);
    }

    /**
     * @function SuperMap.AddressMatchService.prototype.serviceProcessCompleted
     * @param result - {Object} 服务器返回的结果对象。
     * @description 服务流程是否失败
     */
    serviceProcessFailed(result) {
        super.serviceProcessFailed(result);
    }
}

SuperMap.AddressMatchService = AddressMatchService;