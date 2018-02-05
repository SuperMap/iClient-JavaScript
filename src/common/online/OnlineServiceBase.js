import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
// import {SecurityManager} from '../security/SecurityManager';
import {ServerType} from '../REST';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @class SuperMap.OnlineServiceBase
 * @classdesc Online服务基类(使用key作为权限限制的类需要实现此类)
 * @category iPortal/Online
 * @param options -{Object} 服务参数
 */
export class OnlineServiceBase {

    constructor(options) {
        options = options || {};
        Util.extend(this, options);
        this.serverType = ServerType.ONLINE;
        this.CLASS_NAME = "SuperMap.OnlineServiceBase";
    }

    /**
     * @function SuperMap.OnlineServiceBase.prototype.request
     * @description 请求online服务
     * @param method - {string} 请求方式, 'get','put','post','delete'
     * @param url - {string} 服务地址
     * @param param -{Object} Url查询参数
     * @param requestOptions -{Object} http请求参数, 比如请求头，超时时间等
     * @return {Promise}  返回包含请求结果的Promise对象
     */
    request(method, url, param, requestOptions) {
        url = this.createCredentialUrl(url);
        return FetchRequest.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    }

    /**
     * @function SuperMap.OnlineServiceBase.prototype.createCredentialUrl
     * @description 追加授权信息
     * @param url - {string} 对接的online服务地址
     */
    createCredentialUrl(url) {
        var newUrl = url,
            key = this.getCredential();
        if (key) {
            var paramStr = "key=" + key;
            var endStr = newUrl.substring(newUrl.length - 1, newUrl.length);
            if (newUrl.indexOf("?") > -1 && endStr === "?") {
                newUrl += paramStr;
            } else if (newUrl.indexOf("?") > -1 && endStr !== "?") {
                newUrl += "&" + paramStr;
            } else {
                newUrl += "?" + paramStr;
            }
        }
        return newUrl;
    }

    //其子类需要重写该方法，修改其中获取key的字段
    //存储key可能是服务id字段，可能是url，或者是WebAPI类型
    getCredential() {
        //return SecurityManager.getKey(this.id);
        //或
        //return SecurityManager.getKey(this.serviceUrl);
    }

}

SuperMap.OnlineServiceBase = OnlineServiceBase;
