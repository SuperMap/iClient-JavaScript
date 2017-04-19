/**
 * Class:SuperMap.Security
 * Online SSO 安全管理类
 */
require('../base');
require('./../Request');
SuperMap.Security = SuperMap.Class({
    /**
     * @param url：online地址
     */
    initialize: function (url) {
        if (!url) {
            this.url = SuperMap.Security.ONLINE;
        }
    },

    login: function () {
        var loginUrl = SuperMap.Security.SSO + "/login?service=" + this.url;
        window.open(loginUrl, "login");
        return this;
    },

    register: function () {
        var registerUrl = SuperMap.Security.SSO + "/register?service=" + this.url;
        window.open(registerUrl, "register");
        return this;
    },
});
SuperMap.Security.SSO = "https://sso.supermap.com";
SuperMap.Security.ONLINE = "http://www.supermapol.com/shiro-cas";