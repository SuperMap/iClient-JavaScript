import {SuperMap} from '../SuperMap';
import {ServerType} from '../REST';
import {SecurityManager} from '../security/SecurityManager';
import {Credential} from '../commontypes/Credential';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.iPortalServiceBase
 * @classdesc iPortal服务基类(有权限限制的类需要实现此类)
 * @category iPortal/Online
 * @param url - {string} iPortal服务地址
 */
export class IPortalServiceBase {

    constructor(url) {
        this.serviceUrl = url;
        this.serverType = ServerType.iPortal;
        this.CLASS_NAME = "SuperMap.iPortalServiceBase";
    }

    /**
     * @function SuperMap.iPortalServiceBase.prototype.request
     * @description 子类统一通过该方法发送请求
     * @param method -{string} 请求类型
     * @param url -{string} 服务地址
     * @param param -{Object} 请求参数
     * @param requestOptions -{Object} fetch请求配置项
     * @returns {Promise} 返回包含请求结果的Promise对象
     */

    request(method, url, param, requestOptions) {
        url = this.createCredentialUrl(url);
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }


    /*
     * @function SuperMap.iPortalServiceBase.prototype.createCredentialUrl
     * @description 追加授权信息
     * @param url -{string} 创建证书url地址
     * @return {string} 携带token或key的新地址
     */

    createCredentialUrl(url) {
        var newUrl = url,
            credential = this.getCredential();

        if (credential) {
            var endStr = newUrl.substring(newUrl.length - 1, newUrl.length);

            if (newUrl.indexOf("?") > -1 && endStr === "?") {
                newUrl += credential.getUrlParameters();
            } else if (newUrl.indexOf("?") > -1 && endStr !== "?") {
                newUrl += "&" + credential.getUrlParameters();
            } else {
                newUrl += "?" + credential.getUrlParameters();
            }
        }
        return newUrl;
    }


    /*
     * @function SuperMap.iPortalServiceBase.prototype.getCredential
     * @description 获取token
     * @return {string } 返回获取的token
     *
     */

    getCredential() {
        var credential,
            value = SecurityManager.getToken(this.serviceUrl);
        credential = value ? new Credential(value, "token") : null;
        if (!credential) {
            value = this.getKey();
            credential = value ? new Credential(value, "key") : null;
        }
        return credential;
    }


    /**
     * @function SuperMap.iPortalServiceBase.prototype.getKey
     * @description 其子类需要重写该方法，修改其中获取key的字段，存储key可能是服务id字段，可能是url
     */
    getKey() {
        //return SuperMap.SecurityManager.getKey(this.id);
        //或
        //return SuperMap.SecurityManager.getKey(this.serviceUrl);
    }

}

SuperMap.iPortalServiceBase = IPortalServiceBase;
