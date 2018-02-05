import {SuperMap} from '../SuperMap';
import {FetchRequest} from "../util/FetchRequest";
import {Events} from '../commontypes/Events';
import {Credential} from '../commontypes/Credential';
import {SecurityManager} from '../security/SecurityManager';
import {Util} from '../commontypes/Util';
import {ServerType} from '../REST';
import {JSONFormat as JSON} from '../format/JSON';
import {FunctionExt} from '../commontypes/BaseTypes';

/**
 * @class SuperMap.CommonServiceBase
 * @category  iServer 
 * @classdesc 对接iServer各种服务的Service的基类。
 * @param url - {string} 服务地址。
 * @param options - {Object} 可选参数。如：<br>
 *        eventListeners - {Object} 事件监听器对象。有processCompleted属性可传入处理完成后的回调函数。processFailed属性传入处理失败后的回调函数。<br>
 *        proxy - {string} 服务代理地址<br>
 *        serverType - {SuperMap.ServerType} 服务器类型，iServer|iPortal|Online。<br>
 *        format -{SuperMap.DataFormat} 查询结果返回格式，目前支持iServerJSON 和GeoJSON两种格式。参数格式为"ISERVER","GEOJSON"。
 */
export class CommonServiceBase {

    constructor(url, options) {
        let me = this;

        this.EVENT_TYPES = ["processCompleted", "processFailed"];

        this.events = null;

        this.eventListeners = null;

        this.url = null;

        this.urls = null;

        this.proxy = null;

        this.serverType = null;

        this.index = null;

        this.length = null;

        this.options = null;

        this.totalTimes = null;

        this.POLLING_TIMES = 3;

        this._processSuccess = null;

        this._processFailed = null;

        this.isInTheSameDomain = null;

        if (Util.isArray(url)) {
            me.urls = url;
            me.length = url.length;
            me.totalTimes = me.length;
            if (me.length === 1) {
                me.url = url[0];
            } else {
                me.index = parseInt(Math.random() * me.length);
                me.url = url[me.index];
            }
        } else {
            me.totalTimes = 1;
            me.url = url;
        }

        if (Util.isArray(url) && !me.isServiceSupportPolling()) {
            me.url = url[0];
            me.totalTimes = 1;
        }

        me.serverType = me.serverType || ServerType.ISERVER;

        options = options || {};

        if (options) {
            Util.extend(this, options);
        }

        me.isInTheSameDomain = Util.isInTheSameDomain(me.url);

        me.events = new Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        this.CLASS_NAME = "SuperMap.CommonServiceBase";
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.destroy
     * @description 释放资源，将引用的资源属性置空。
     */
    destroy() {
        let me = this;
        if (Util.isArray(me.urls)) {
            me.urls = null;
            me.index = null;
            me.length = null;
            me.totalTimes = null;
        }
        me.url = null;
        me.options = null;
        me._processSuccess = null;
        me._processFailed = null;
        me.isInTheSameDomain = null;

        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
    }

    /**
     * @function  SuperMap.CommonServiceBase.prototype.request
     * @description: 该方法用于向服务发送请求。
     * @param options - {Object} 参数。
     *        method - {string} 请求方式，包括"GET"，"POST"，"PUT"，"DELETE"。<br>
     *        url - {string}  发送请求的地址。<br>
     *        params - {Object} 作为查询字符串添加到url中的一组键值对，此参数只适用于GET方式发送的请求。<br>
     *        data - {String } 发送到服务器的数据。<br>
     *        success - {function} 请求成功后的回调函数。<br>
     *        failure - {function} 请求失败后的回调函数。<br>
     *        scope - {Object} 如果回调函数是对象的一个公共方法，设定该对象的范围。<br>
     *        isInTheSameDomain - {boolean} 请求是否在当前域中。<br>
     */
    request(options) {
        let me = this;
        options.url = options.url || me.url;
        options.proxy = options.proxy || me.proxy;
        options.isInTheSameDomain = me.isInTheSameDomain;
        //为url添加安全认证信息片段
        let credential = this.getCredential(options.url);
        if (credential) {
            //当url中含有?，并且?在url末尾的时候直接添加token *网络分析等服务请求url会出现末尾是?的情况*
            //当url中含有?，并且?不在url末尾的时候添加&token
            //当url中不含有?，在url末尾添加?token
            let endStr = options.url.substring(options.url.length - 1, options.url.length);
            if (options.url.indexOf("?") > -1 && endStr === "?") {
                options.url += credential.getUrlParameters();
            } else if (options.url.indexOf("?") > -1 && endStr !== "?") {
                options.url += "&" + credential.getUrlParameters();
            } else {
                options.url += "?" + credential.getUrlParameters();
            }
        }

        me.calculatePollingTimes();
        me._processSuccess = options.success;
        me._processFailed = options.failure;
        options.scope = me;
        options.success = me.getUrlCompleted;
        options.failure = me.getUrlFailed;
        me.options = options;
        me._commit(me.options);
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.getCredential
     * @description  获取凭据信息
     * @param url - {string} 服务地址。
     * @return {SuperMap.Credential} 凭据信息对象。
     */
    getCredential(url) {
        let keyUrl = url, credential, value;
        switch (this.serverType) {
            case ServerType.IPORTAL:
                value = SecurityManager.getToken(keyUrl);
                credential = value ? new Credential(value, "token") : null;
                if (!credential) {
                    value = SecurityManager.getKey(keyUrl);
                    credential = value ? new Credential(value, "key") : null;
                }
                break;
            case ServerType.ONLINE:
                value = SecurityManager.getKey(keyUrl);
                credential = value ? new Credential(value, "key") : null;
                break;
            default:
                //iServer or others
                value = SecurityManager.getToken(keyUrl);
                credential = value ? new Credential(value, "token") : null;
                break;
        }
        return credential;
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.getUrlCompleted
     * @description 请求成功后执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    getUrlCompleted(result) {
        let me = this;
        me._processSuccess(result);
    }


    /**
     * @function SuperMap.CommonServiceBase.prototype.getUrlFailed
     * @description 请求失败后执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    getUrlFailed(result) {
        let me = this;
        if (me.totalTimes > 0) {
            me.totalTimes--;
            me.ajaxPolling();
        } else {
            me._processFailed(result);
        }
    }


    /**
     *
     * @function SuperMap.CommonServiceBase.prototype.ajaxPolling
     * @description 请求失败后，如果剩余请求失败次数不为0，重新获取url发送请求
     */
    ajaxPolling() {
        let me = this,
            url = me.options.url,
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
        me.index = parseInt(Math.random() * me.length);
        me.url = me.urls[me.index];
        url = url.replace(re, re.exec(me.url)[0]);
        me.options.url = url;
        me.options.isInTheSameDomain = Util.isInTheSameDomain(url);
        me._commit(me.options);
    }


    /**
     * @function SuperMap.CommonServiceBase.prototype.calculatePollingTimes
     * @description 计算剩余请求失败执行次数。
     */
    calculatePollingTimes() {
        let me = this;
        if (me.times) {
            if (me.totalTimes > me.POLLING_TIMES) {
                if (me.times > me.POLLING_TIMES) {
                    me.totalTimes = me.POLLING_TIMES;
                } else {
                    me.totalTimes = me.times;
                }
            } else {
                if (me.times < me.totalTimes) {
                    me.totalTimes = me.times;
                }
            }

        } else {
            if (me.totalTimes > me.POLLING_TIMES) {
                me.totalTimes = me.POLLING_TIMES;
            }
        }
        me.totalTimes--;
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.isServiceSupportPolling
     * @description 判断服务是否支持轮询。
     */
    isServiceSupportPolling() {
        let me = this;
        return !(
            me.CLASS_NAME === "SuperMap.REST.ThemeService" ||
            me.CLASS_NAME === "SuperMap.REST.EditFeaturesService"
        );
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessCompleted
     * @description 状态完成，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        result = Util.transformResult(result);
        this.events.triggerEvent("processCompleted", {result: result});
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param result - {Object} 服务器返回的结果对象。
     */
    serviceProcessFailed(result) {
        result = Util.transformResult(result);
        let error = result.error || result;
        this.events.triggerEvent("processFailed", {error: error});
    }

    _commit(options) {
        if (options.method === "POST" || options.method === "PUT") {
            if (options.params) {
                options.url = Util.urlAppend(options.url,
                    Util.getParameterString(options.params || {}));
            }
            options.params = options.data;
        }
        FetchRequest.commit(options.method, options.url, options.params, {
            headers: options.headers,
            withCredentials: options.withCredentials,
            timeout: options.async ? 0 : null,
            proxy: options.proxy
        }).then(function (response) {
            if (response.text) {
                return response.text();
            }
            return response.json();
        }).then(function (text) {
            var result = text;
            if (typeof text === "string") {
                result = new JSON().read(text);
            }
            if (!result || result.error || result.code >= 300 && result.code !== 304) {
                if (result && result.error) {
                    result = {error: result.error};
                } else {
                    result = {error: result};
                }
            }
            if (result.error) {
                var failure = (options.scope) ? FunctionExt.bind(options.failure, options.scope) : options.failure;
                failure(result);
            } else {
                result.succeed = result.succeed == undefined ? true : result.succeed;
                var success = (options.scope) ? FunctionExt.bind(options.success, options.scope) : options.success;
                success(result);
            }

        })
    }
}

SuperMap.CommonServiceBase = CommonServiceBase;
