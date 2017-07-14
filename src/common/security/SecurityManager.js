/**
 * Class:SuperMap.SecurityManager
 * 安全管理中心
 * 提供iServer,iPortal,Online统一权限认证管理
 *  使用说明：
 *  创建任何一个服务之前调用SuperMap.SecurityManager.registerToken或
 *  SuperMap.SecurityManager.registerKey注册凭据。
 *  发送请求时根据url或者服务id获取相应的key或者token并自动添加到服务地址中
 */
require('./ServerInfo');
require('./TokenServiceParameter');
require('./KeyServiceParameter');
var Request = require('../util/FetchRequest');
var SuperMap = require('../SuperMap');
SuperMap.SecurityManager = {

    INNER_WINDOW_WIDTH: 600,
    INNER_WINDOW_HEIGHT: 600,

    /**
     * 从服务器获取一个token,在此之前要注册服务器信息
     * @param url 服务器域名+端口，如：http://localhost:8092
     * @param tokenParam<SuperMap.TokenServiceParameter>
     */
    generateToken: function (url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return Request.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
            return response.text();
        });
    },


    /**
     * 注册安全服务器相关信息
     * @param serverInfos<SuperMap.ServerInfo>
     */
    registerServers: function (serverInfos) {
        this.servers = this.servers || {};
        if (!SuperMap.Util.isArray(serverInfos)) {
            serverInfos = [serverInfos];
        }
        for (var i = 0; i < serverInfos.length; i++) {
            var serverInfo = serverInfos[i];
            this.servers[serverInfo.server] = serverInfo;
        }
    },

    /**
     * 服务请求都会自动带上这个token
     * @param url 服务器域名+端口：如http://localhost:8090
     * @param token
     */
    registerToken: function (url, token) {
        this.tokens = this.tokens || {};
        if (!url || !token) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens[domain] = token;
    },

    /**
     * 注册key,ids为数组(存在一个key对应多个服务)
     * @param ids   <Array> 可以是服务id数组或者url地址数组或者webAPI类型数组
     * @param key   <String>
     */
    registerKey: function (ids, key) {
        this.keys = this.keys || {};
        if (!ids || ids.length < 1 || !key) {
            return;
        }

        ids = (SuperMap.Util.isArray(ids)) ? ids : [ids];
        for (var i = 0; i < ids.length; i++) {
            var id = this._getUrlRestString(ids[0]) || ids[0];
            this.keys[id] = key;
        }
    },

    getServerInfo: function (url) {
        this.servers = this.servers || {};
        return this.servers[url];
    },

    //token按照域名存储
    getToken: function (url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    },

    getKey: function (id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    },

    //Online登录验证
    loginOnline: function (callbackLocation, newTab) {
        var loginUrl = SuperMap.SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    },

    //iPortal登录验证
    loginPortal: function (url, newTab) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "web/login" : "/web/login";
        this._open(url, newTab);
    },

    destroyAllCredentials: function () {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    },

    destroyToken: function (url) {
        if (!url) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens = this.tokens || {};
        if (this.tokens[domain]) {
            delete this.tokens[domain];
        }
    },

    destroyKey: function (id) {
        if (!id) {
            return;
        }
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        if (this.keys[key]) {
            delete this.keys[key];
        }
    },

    _open: function (url, newTab) {
        newTab = (newTab != null) ? newTab : true;
        var offsetX = window.screen.availWidth / 2 - this.INNER_WINDOW_WIDTH / 2;
        var offsetY = window.screen.availHeight / 2 - this.INNER_WINDOW_HEIGHT / 2;
        var options =
            "height=" + this.INNER_WINDOW_HEIGHT + ", width=" + this.INNER_WINDOW_WIDTH +
            ",top=" + offsetY + ", left=" + offsetX +
            ",toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, status=no";
        if (newTab) {
            window.open(url, 'login');
        } else {
            window.open(url, 'login', options);
        }
    },

    _getTokenStorageKey: function (url) {
        var patten = /http:\/\/([^\/]+)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    },

    _getUrlRestString: function (url) {
        if (!url) {
            return url;
        }
        var patten = /http:\/\/(.*\/rest)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }

};
SuperMap.SecurityManager.SSO = "https://sso.supermap.com";
SuperMap.SecurityManager.ONLINE = "http://www.supermapol.com";
module.exports = SuperMap.SecurityManager;