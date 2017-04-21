/**
 * Class:SuperMap.Security
 * Online SSO 安全管理类
 */
SuperMap.OnlineSecurity = SuperMap.Class({
    /**
     * @param url：online地址
     */
    initialize: function (url) {
        if (!url) {
            this.url = SuperMap.OnlineSecurity.ONLINE;
        }
    },

    login: function () {
        var loginUrl = SuperMap.OnlineSecurity.SSO + "/login?service=" + this.url;
        window.open(loginUrl, "login");
        return this;
    },

    register: function () {
        var registerUrl = SuperMap.OnlineSecurity.SSO + "/register?service=" + this.url;
        window.open(registerUrl, "register");
        return this;
    }
});
SuperMap.OnlineSecurity.SSO = "https://sso.supermap.com";
SuperMap.OnlineSecurity.ONLINE = "http://www.supermapol.com/shiro-cas";