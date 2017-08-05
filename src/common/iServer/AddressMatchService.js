import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import {FetchRequest} from '../util/FetchRequest';
import GeoCodingParameter from './GeoCodingParameter';
import GeoDecodingParameter from './GeoDecodingParameter';

/**
 * @class SuperMap.AddressMatchService
 * @constructs SuperMap.AddressMatchService
 * @classdesc
 * 地址匹配服务，包括正向匹配和反向匹配。
 * @api

 */
export default class AddressMatchService extends CommonServiceBase {
    /**
     *
     * @method SuperMap.AddressMatchService.initialize
     * @param options - {Object} 参数。
     * @param url {string}
     */
    constructor(url, options) {
        super(url, options);
    }

    destroy() {
        super.destroy();
    }

    /**
     * @method SuperMap.AddressMatchService.code
     * @param url {string} 正向地址匹配服务地址
     * @param params {object} 正向地址匹配服务参数
     */
    code(url, params) {
        this.processAsync(url, params);
    }

    /**
     * @method SuperMap.AddressMatchService.decode
     * @param url {string} 反向地址匹配服务地址
     * @param params {object} 反向地址匹配服务参数
     */
    decode(url, params) {
        this.processAsync(url, params);
    }

    processAsync(url, params) {
        var me = this;
        return FetchRequest.get(url, params).then(function (response) {
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

    serviceProcessCompleted(result) {
        super.serviceProcessCompleted(result);
    }

    serviceProcessFailed(result) {
        super.serviceProcessFailed(result);
    }

    CLASS_NAME = "SuperMap.AddressMatchService";
}
SuperMap.AddressMatchService = AddressMatchService;