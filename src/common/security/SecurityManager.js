/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {FetchRequest} from '../util/FetchRequest';

/**
 * @name SecurityManager
 * @memberOf SuperMap
 * @namespace
 * @category Security
 * @description 安全管理中心，提供 iServer,iPortal,Online 统一权限认证管理。
 *  > 使用说明：
 *  > 创建任何一个服务之前调用 {@link SuperMap.SecurityManager.registerToken}或
 *  > {@link SuperMap.SecurityManager.registerKey}注册凭据。
 *  > 发送请求时根据 url 或者服务 id 获取相应的 key 或者 token 并自动添加到服务地址中。
 */
export class SecurityManager {

    /**
     * @description 从服务器获取一个token,在此之前要注册服务器信息。
     * @function SuperMap.SecurityManager.generateToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @param {SuperMap.TokenServiceParameter} tokenParam - token 申请参数。
     * @returns {Promise} 返回包含 token 信息的 Promise 对象。
     */

    static generateToken(url, tokenParam) {
        var serverInfo = this.servers[url];
        if (!serverInfo) {
            return;
        }
        return FetchRequest.post(serverInfo.tokenServiceUrl, JSON.stringify(tokenParam.toJSON())).then(function (response) {
            return response.text();
        });
    }

    /**
     * @description 注册安全服务器相关信息。
     * @function SuperMap.SecurityManager.registerServers
     * @param {SuperMap.ServerInfo} serverInfos - 服务器信息。
     */
    static registerServers(serverInfos) {
        this.servers = this.servers || {};
        if (!Util.isArray(serverInfos)) {
            serverInfos = [serverInfos];
        }
        for (var i = 0; i < serverInfos.length; i++) {
            var serverInfo = serverInfos[i];
            this.servers[serverInfo.server] = serverInfo;
        }
    }

    /**
     * @description 服务请求都会自动带上这个 token。
     * @function SuperMap.SecurityManager.registerToken
     * @param {string} url -服务器域名+端口：如http://localhost:8090。
     * @param {string} token - token
     */
    static registerToken(url, token) {
        this.tokens = this.tokens || {};
        if (!url || !token) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens[domain] = token;
    }

    /**
     * @description 注册 key,ids 为数组(存在一个 key 对应多个服务)。
     * @function SuperMap.SecurityManager.registerKey
     * @param {Array} ids - 可以是服务 id 数组或者 url 地址数组或者 webAPI 类型数组。
     * @param {string} key - key
     */
    static registerKey(ids, key) {
        this.keys = this.keys || {};
        if (!ids || ids.length < 1 || !key) {
            return;
        }

        ids = (Util.isArray(ids)) ? ids : [ids];
        for (var i = 0; i < ids.length; i++) {
            var id = this._getUrlRestString(ids[0]) || ids[0];
            this.keys[id] = key;
        }
    }

    /**
     * @description 获取服务器信息。
     * @function SuperMap.SecurityManager.getServerInfo
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {SuperMap.ServerInfo} 服务器信息。
     */
    static getServerInfo(url) {
        this.servers = this.servers || {};
        return this.servers[url];
    }

    /**
     * @description 根据 Url 获取token。
     * @function SuperMap.SecurityManager.getToken
     * @param {string} url - 服务器域名+端口，如：http://localhost:8092。
     * @returns {string} token
     */
    static getToken(url) {
        if (!url) {
            return;
        }
        this.tokens = this.tokens || {};
        var domain = this._getTokenStorageKey(url);
        return this.tokens[domain];
    }

    /**
     * @description 根据 Url 获取 key。
     * @function SuperMap.SecurityManager.getKey
     * @param {string} id - id
     * @returns {string} key
     */
    static getKey(id) {
        this.keys = this.keys || {};
        var key = this._getUrlRestString(id) || id;
        return this.keys[key];
    }

    /**
     * @description iServer 登录验证。
     * @function SuperMap.SecurityManager.loginiServer
     * @param {string} url - iServer 首页地址，如：http://localhost:8090/iserver。
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @param {boolean} [rememberme=false] - 是否记住。
     * @returns {Promise} 返回包含 iServer 登录请求结果的 Promise 对象。
     */
    static loginiServer(url, username, password, rememberme) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "services/security/login.json" : "/services/security/login.json";
        var loginInfo = {
            username: username && username.toString(),
            password: password && password.toString(),
            rememberme: rememberme
        };
        loginInfo = JSON.stringify(loginInfo);
        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        };
        return FetchRequest.post(url, loginInfo, requestOptions).then(function (response) {
            return response.json();
        });

    }

    /**
     * @description iServer登出。
     * @function SuperMap.SecurityManager.logoutiServer
     * @param {string} url - iServer 首页地址,如：http://localhost:8090/iserver。
     * @returns {Promise} 是否登出成功。
     */
    static logoutiServer(url) {
        var end = url.substr(url.length - 1, 1);
        url += end === "/" ? "services/security/logout" : "/services/security/logout";

        var requestOptions = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            },
            withoutFormatSuffix: true
        };
        return FetchRequest.get(url, "", requestOptions).then(function () {
            return true;
        }).catch(function () {
            return false;
        });

    }

    /**
     * @description Online 登录验证。
     * @function SuperMap.SecurityManager.loginOnline
     * @param {string} callbackLocation - 跳转位置。
     * @param {boolean} [newTab=true] - 是否新窗口打开。
     */
    static loginOnline(callbackLocation, newTab) {
        var loginUrl = SecurityManager.SSO + "/login?service=" + callbackLocation;
        this._open(loginUrl, newTab);
    }

    /**
     * @description iPortal登录验证。
     * @function SuperMap.SecurityManager.loginiPortal
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
     * @param {string} username - 用户名。
     * @param {string} password - 密码。
     * @returns {Promise} 返回包含 iPortal 登录请求结果的 Promise 对象。
     */
    static loginiPortal(url, username, password) {
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

    }

    /**
     * @description iPortal 登出。
     * @function SuperMap.SecurityManager.logoutiPortal
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
     * @returns {Promise} 如果登出成功，返回 true;否则返回 false。
     */
    static logoutiPortal(url) {
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

    }

    /**
     * @description iManager 登录验证。
     * @function SuperMap.SecurityManager.loginManager
     * @param {string} url - iManager 地址。地址参数为 iManager 首页地址，如： http://localhost:8390/imanager。
     * @param {Object} [loginInfoParams] - iManager 登录参数。
     * @param {string} loginInfoParams.userName - 用户名。
     * @param {string} loginInfoParams.password - 密码。
     * @param {Object} options
     * @param {boolean} [options.isNewTab=true] - 不同域时是否在新窗口打开登录页面。
     * @returns {Promise} 返回包含 iManager 登录请求结果的 Promise 对象。
     */
    static loginManager(url, loginInfoParams, options) {
        if (!Util.isInTheSameDomain(url)) {
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
    }

    /**
     * @description 清空全部验证信息。
     * @function SuperMap.SecurityManager.destroyAllCredentials
     */
    static destroyAllCredentials() {
        this.keys = null;
        this.tokens = null;
        this.servers = null;
    }

    /**
     * @description 清空令牌信息。
     * @function SuperMap.SecurityManager.destroyToken
     * @param {string} url - iportal 首页地址,如：http://localhost:8092/iportal.
     */
    static destroyToken(url) {
        if (!url) {
            return;
        }
        var domain = this._getTokenStorageKey(url);
        this.tokens = this.tokens || {};
        if (this.tokens[domain]) {
            delete this.tokens[domain];
        }
    }

    /**
     * @description 清空服务授权码。
     * @function SuperMap.SecurityManager.destroyKey
     * @param {string} url - iServer 首页地址,如：http://localhost:8090/iserver。
     */
    static destroyKey(url) {
        if (!url) {
            return;
        }
        this.keys = this.keys || {};
        var key = this._getUrlRestString(url) || url;
        if (this.keys[key]) {
            delete this.keys[key];
        }
    }

    static _open(url, newTab) {
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
    }

    static _getTokenStorageKey(url) {
        var patten = /(.*?):\/\/([^\/]+)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }

    static _getUrlRestString(url) {
        if (!url) {
            return url;
        }
        // var patten = /http:\/\/(.*\/rest)/i;
        var patten = /(http|https):\/\/(.*\/rest)/i;
        var result = url.match(patten);
        if (!result) {
            return url;
        }
        return result[0];
    }
}
SecurityManager.INNER_WINDOW_WIDTH = 600;
SecurityManager.INNER_WINDOW_HEIGHT = 600;
SecurityManager.SSO = "https://sso.supermap.com";
SecurityManager.ONLINE = "http://www.supermapol.com";
SuperMap.SecurityManager = SecurityManager;

