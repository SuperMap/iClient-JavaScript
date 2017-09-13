import SuperMap from '../SuperMap';
import '../security/SecurityManager';
import {FetchRequest} from '../util/FetchRequest';
/**
 * @class SuperMap.iManagerServiceBase
 * @classdesc iManager服务基类(有权限限制的类需要实现此类)。
 * @param url - {string} iManager首页地址，如：http://localhost:8390/imanager。
 */
export default class IManagerServiceBase {

    constructor(url) {
        if (url) {
            var end = url.substr(url.length - 1, 1);
            this.serviceUrl = end === "/" ? url.substr(0, url.length - 2) : url;
        }
    }

    /**
     * @function SuperMap.iManagerServiceBase.prototype.request
     * @description 子类统一通过该方法发送请求。
     * @param url - {string} 请求url。
     * @param method - {string} 请求类型。
     * @param requestOptions - {Object} 请求选项。
     * @param param - {Object} 请求参数。
     * @description 发送请求。
     * @returns {Promise} Promise对象。
     */
    request(method, url, param, requestOptions) {
        requestOptions = requestOptions || {
                headers: {
                    'Accept': '*/*',
                    'Content-Type': 'application/json'
                }
            };
        if (!requestOptions.hasOwnProperty("withCredentials")) {
            requestOptions['withCredentials'] = true;
        }
        var token = SuperMap.SecurityManager.imanagerToken;
        if (token) {
            if (!requestOptions.headers) {
                requestOptions.headers = [];
            }
            requestOptions.headers['X-Auth-Token'] = token;
        }
        if (param) {
            param = JSON.stringify(param);
        }
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }

    CLASS_NAME = "SuperMap.iManagerServiceBase"

}

SuperMap.iManagerServiceBase = IManagerServiceBase;
