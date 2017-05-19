/**
 * Online服务基类(使用key作为权限限制的类需要实现此类)
 */
var SuperMap = require('../SuperMap');
var SecurityManager = require('../security/SecurityManager');
var Request = require('../util/Request');
SuperMap.OnlineServiceBase = SuperMap.Class({

    initialize: function (options) {
        var me = this;
        options = options || {};
        SuperMap.Util.extend(me, options);
        me.serverType = SuperMap.ServerType.ONLINE;
    },

    request: function (method, url, param, requestOptions) {
        url = this.createCredentialUrl(url);
        return Request.commit(method, url, param, requestOptions).then(function (response) {
            return response.json();
        });
    },

 	//追加授权信息
    createCredentialUrl: function (url) {
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
    },

    //其子类需要重写该方法，修改其中获取key的字段
    //存储key可能是服务id字段，可能是url，或者是WebAPI类型
    getCredential: function () {
        //return SecurityManager.getKey(this.id);
        //或
        //return SecurityManager.getKey(this.serviceUrl);
    },

    CLASS_NAME: "SuperMap.OnlineServiceBase"

});
module.exports = SuperMap.OnlineServiceBase;
