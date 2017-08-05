import SuperMap from '../SuperMap';
import {ServerType} from '../REST';
import '../security/SecurityManager';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.iPortalServiceBase
 * @classdesc iPortal服务基类(有权限限制的类需要实现此类)
 */

export default  class IPortalServiceBase {
    /**
     * @method SuperMap.iPortalServiceBase.initialize
     *
     * @param url
     */
    constructor(url) {
        var me = this;
        me.serviceUrl = url;
        me.serverType = ServerType.iPortal;
    }

    /**
     * @method SuperMap.iPortalServiceBase.request
     * @description 子类统一通过该方法发送请求
     * @param url
     * @param method
     * @param param
     * @param requestOptions
     *
     */

    request(method, url, param, requestOptions) {
        url = this.createCredentialUrl(url);
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }


    /**
     * @method SuperMap.iPortalServiceBase.createCredentialUrl
     * @description 追加授权信息
     * @param url
     * @return {string}
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


    /**
     * @method  SuperMap.iPortalServiceBase.getCredential
     * @description 获取token
     * @return {string } 返回获取的token
     *
     */

    getCredential() {
        var credential,
            value = SuperMap.SecurityManager.getToken(this.serviceUrl);
        credential = value ? new SuperMap.Credential(value, "token") : null;
        if (!credential) {
            value = this.getKey();
            credential = value ? new SuperMap.Credential(value, "key") : null;
        }
        return credential;
    }


    /**
     * @method SuperMap.iPortalServiceBase.getKey
     * @description 其子类需要重写该方法，修改其中获取key的字段
     * 存储key可能是服务id字段，可能是url
     */
    getKey() {
        //return SuperMap.SecurityManager.getKey(this.id);
        //或
        //return SuperMap.SecurityManager.getKey(this.serviceUrl);
    }


    CLASS_NAME = "SuperMap.iPortalServiceBase"

}

SuperMap.iPortalServiceBase = IPortalServiceBase;
