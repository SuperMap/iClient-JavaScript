/**
 * iPortal服务基类(有权限限制的类需要实现此类)
 */
var SuperMap = require('../SuperMap');
var Request = require('../util/FetchRequest');
var SecurityManager = require('../security/SecurityManager');

SuperMap.iPortalServiceBase = SuperMap.Class({

    initialize: function (url) {
        var me = this;
        me.serviceUrl = url;
        me.serverType = SuperMap.ServerType.ONLINE;
    },

    //子类统一通过该方法发送请求
    request: function (method, url, param, requestOptions) {
        url = this.createCredentialUrl(url);
        return Request.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    },

    //追加授权信息
    createCredentialUrl: function (url) {
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
    },


    getCredential: function () {
        var credential,
            value = SecurityManager.getToken(this.serviceUrl);
        credential = value ? new SuperMap.Credential(value, "token") : null;
        if (!credential) {
            value = this.getKey();
            credential = value ? new SuperMap.Credential(value, "key") : null;
        }
        return credential;
    },

    //其子类需要重写该方法，修改其中获取key的字段
    //存储key可能是服务id字段，可能是url
    getKey: function () {
        //return SecurityManager.getKey(this.id);
        //或
        //return SecurityManager.getKey(this.serviceUrl);
    },

    CLASS_NAME: "SuperMap.iPortalServiceBase"

});
module.exports = SuperMap.iPortalServiceBase;
