import SuperMap from '../SuperMap';
import ServerInfo from './ServerInfo';
import TokenServiceParameter from './TokenServiceParameter';
import KeyServiceParameter from './KeyServiceParameter';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @name SecurityManager
 * @memberOf SuperMap
 * @namespace
 * @description 安全管理中心，提供iServer,iPortal,Online统一权限认证管理
 *  > 使用说明：
 *  > 创建任何一个服务之前调用{@link SuperMap.SecurityManager.registerToken}或
 *  > {@link SuperMap.SecurityManager.registerKey}注册凭据。
 *  > 发送请求时根据url或者服务id获取相应的key或者token并自动添加到服务地址中
 */
SuperMap.SecurityManager = {

    INNER_WINDOW_WIDTH: 600,
    INNER_WINDOW_HEIGHT: 600,
    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     * @param tokenParam -{SuperMap.TokenServiceParameter} token申请参数
     * @return {Promise}
     */
    generateToken: function (url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return FetchRequest.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
            return response.text();
        });
    },

    /**
     * @description 注册安全服务器相关信息
     * @param serverInfos -{SuperMap.ServerInfo} 服务器信息
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
     * @description 服务请求都会自动带上这个token
     * @param url {string} -服务器域名+端口：如http://localhost:8090
     * @param token -{string} token
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
     * @description 注册key,ids为数组(存在一个key对应多个服务)
     * @param ids -{Array} 可以是服务id数组或者url地址数组或者webAPI类型数组
     * @param key -{string} key
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

    /**
     * @description 获取服务器信息
     * @param url {string}-服务器域名+端口，如：http://localhost:8092
     * @returns {SuperMap.ServerInfo} 服务器信息
     */
    getServerInfo: function (url) {
        this.servers = this.servers || {};
        return this.servers[url];
    },

    /**
     * @description 根据Url获取token
     * @param url -{string} 服务器域名+端口，如：http://localhost:8092
     * @returns {string} token
     */
    getToken: function (url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    },

    /**
     * @description 根据Url获取key
     * @param id -{string} id
     * @returns {string} key
     */
    getKey: function (id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    },

    /**
     * @description Online登录验证
     * @param callbackLocation -{string} 跳转位置
     * @param newTab -{boolean}是否新窗口打开
     */
    loginOnline: function (callbackLocation, newTab) {
        var loginUrl = SuperMap.SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    },

    /**
     * @description iPortal登录验证
     * @param url -{string} iportal首页地址
     * @param username -{string} 用户名
     * @param password -{string} 密码
     * @returns {Promise}
     */
    loginiPortal: function (url, username, password) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "web/login.json" : "/web/login.json";
        var loginInfo = {
            username: username && username.toString(),
            password: password && password.toString()
        };
        loginInfo = JSON.stringify(loginInfo);
        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withCredentials: true
        };
        return FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
            return response.json();
        });

    },

    /**
     * @description iPortal登录验证
     * @param url -{string} iportal首页地址
     * @returns {Promise}
     */
    logoutiPortal: function (url) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "services/security/logout" : "/services/security/logout";

        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withCredentials: true,
            withoutFormatSuffix: true
        };
        return FetchRequest.get(url, "", requestOptions).then(function () {
            return true;
        }).catch(function () {
            return false;
        });

    },

    /**
     * @description iManager登录验证
     * @param url -{string} iManager地址。<br>
     *                      地址参数为iManager首页地址，如： http://localhost:8390/imanager<br>
     * @param loginInfoParams -{Object} iManager 登录参数<br>
     *        userName -{string} 用户名<br>
     *        password-{string} 密码
     * @param options -{Object} <br>
     *        isNewTab -{boolean} 不同域时是否在新窗口打开登录页面
     * @return {Promise}
     */
    loginManager: function (url, loginInfoParams, options) {
        if (!SuperMap.Util.isInTheSameDomain(url)) {
            var isNewTab = options ? options.isNewTab : true;
            this._open(url, isNewTab);
            return;
        }
        var end = url.substr(url.length - 1, 1);
        var requestUrl = end === "/" ? url + "icloud/security/tokens.json" : url + "/icloud/security/tokens.json";
        var params = loginInfoParams || {};
        var loginInfo = {
            username: params.userName && params.userName.toString(),
            password: params.password && params.password.toString()
        };
        loginInfo = JSON.stringify(loginInfo);
        var requestOptions = {
            headers: {
                'Accept': '*/*',
                'Content-Type': 'application/json'
            }
        };
        var me = this;
        return FetchRequest.post(requestUrl, loginInfo, requestOptions).then(function (response) {
            response.text().then(function (result) {
                me.imanagerToken = result;
                return result;
            });
        });
    },

    /**
     * @description 清空全部验证信息
     */
    destroyAllCredentials: function () {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    },
    /**
     * @description 清空令牌信息
     */
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
    /**
     * @description 清空服务授权码
     */
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
        var patten = /(.*?):\/\/([^\/]+)/i;
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
