/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from '../SuperMap';
import { FetchRequest } from '../util/FetchRequest';
import { Events } from '../commontypes/Events';
import { SecurityManager } from '../security/SecurityManager';
import { Util } from '../commontypes/Util';
import { JSONFormat } from '../format/JSON';
import { FunctionExt } from '../commontypes/BaseTypes';

/**
 * @class SuperMap.CommonServiceBase
 * @category  iServer
 * @classdesc 对接 iServer 各种服务的 Service 的基类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 事件监听器对象。有 processCompleted 属性可传入处理完成后的回调函数。processFailed 属性传入处理失败后的回调函数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class CommonServiceBase {
    constructor(url, options) {
        let me = this;

        this.EVENT_TYPES = ['processCompleted', 'processFailed'];

        this.events = null;

        this.eventListeners = null;

        this.url = null;

        this.urls = null;

        this.proxy = null;

        this.index = null;

        this.length = null;

        this.options = null;

        this.totalTimes = null;

        this.POLLING_TIMES = 3;

        this._processSuccess = null;

        this._processFailed = null;

        this.isInTheSameDomain = null;

        this.withCredentials = false;

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

        options = options || {};
        this.crossOrigin = options.crossOrigin;
        this.headers = options.headers;
        Util.extend(this, options);

        me.isInTheSameDomain = Util.isInTheSameDomain(me.url);

        me.events = new Events(me, null, me.EVENT_TYPES, true);
        if (me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }

        this.CLASS_NAME = 'SuperMap.CommonServiceBase';
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
     * @param {Object} options - 参数。
     * @param {string} [options.method='GET'] - 请求方式，包括 "GET"，"POST"，"PUT"，"DELETE"。
     * @param {string} [options.url] - 发送请求的地址。
     * @param {Object} [options.params] - 作为查询字符串添加到 URL 中的一组键值对，此参数只适用于 GET 方式发送的请求。
     * @param {string} [options.data] - 发送到服务器的数据。
     * @param {function} options.success - 请求成功后的回调函数。
     * @param {function} options.failure - 请求失败后的回调函数。
     * @param {Object} [options.scope] - 如果回调函数是对象的一个公共方法，设定该对象的范围。
     * @param {boolean} [options.isInTheSameDomain] - 请求是否在当前域中。
     * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
     * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
     * @param {Object} [options.headers] - 请求头。
     */
    request(options) {
        let me = this;
        options.url = options.url || me.url;
        options.proxy = options.proxy || me.proxy;
        options.withCredentials = options.withCredentials != undefined ? options.withCredentials : me.withCredentials;
        options.crossOrigin = options.crossOrigin != undefined ? options.crossOrigin : me.crossOrigin;
        options.headers = options.headers || me.headers;
        options.isInTheSameDomain = me.isInTheSameDomain;
        //为url添加安全认证信息片段
        options.url = SecurityManager.appendCredential(options.url);

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
     * @function SuperMap.CommonServiceBase.prototype.getUrlCompleted
     * @description 请求成功后执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    getUrlCompleted(result) {
        let me = this;
        me._processSuccess(result);
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.getUrlFailed
     * @description 请求失败后执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
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
     * @description 请求失败后，如果剩余请求失败次数不为 0，重新获取 URL 发送请求
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
            me.CLASS_NAME === 'SuperMap.REST.ThemeService' || me.CLASS_NAME === 'SuperMap.REST.EditFeaturesService'
        );
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessCompleted
     * @description 状态完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessCompleted(result) {
        result = Util.transformResult(result);
        this.events.triggerEvent('processCompleted', {
            result: result
        });
    }

    /**
     * @function SuperMap.CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     */
    serviceProcessFailed(result) {
        result = Util.transformResult(result);
        let error = result.error || result;
        this.events.triggerEvent('processFailed', {
            error: error
        });
    }

    _commit(options) {
        if (options.method === 'POST' || options.method === 'PUT') {
            if (options.params) {
                options.url = Util.urlAppend(options.url, Util.getParameterString(options.params || {}));
            }
            options.params = options.data;
        }
        FetchRequest.commit(options.method, options.url, options.params, {
            headers: options.headers,
            withCredentials: options.withCredentials,
            crossOrigin: options.crossOrigin,
            timeout: options.async ? 0 : null,
            proxy: options.proxy
        })
            .then(function (response) {
                if (response.text) {
                    return response.text();
                }
                if (response.json) {
                    return response.json();
                }
                return response;
            })
            .then(function (text) {
                let requestResult = text;
                if (typeof text === 'string') {
                    requestResult = new JSONFormat().read(text);
                }
                if (
                    !requestResult ||
                    requestResult.error ||
                    (requestResult.code >= 300 && requestResult.code !== 304)
                ) {
                    if (requestResult && requestResult.error) {
                        requestResult = {
                            error: requestResult.error
                        };
                    } else {
                        requestResult = {
                            error: requestResult
                        };
                    }
                }
                return requestResult;
            })
            .catch(function (e) {
                var failure = options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure;
                failure(e);
            })
            .then((requestResult) => {
                if (requestResult.error) {
                    var failure = options.scope ? FunctionExt.bind(options.failure, options.scope) : options.failure;
                    failure(requestResult);
                } else {
                    requestResult.succeed = requestResult.succeed == undefined ? true : requestResult.succeed;
                    var success = options.scope ? FunctionExt.bind(options.success, options.scope) : options.success;
                    success(requestResult);
                }
            });
    }
}

SuperMap.CommonServiceBase = CommonServiceBase;

/**
 * 服务器请求回调函数
 * @callback RequestCallback
 * @example
 * var requestCallback = function (serviceResult){
 *      console.log(serviceResult.result);
 * }
 * new QueryService(url).queryByBounds(param, requestCallback);
 * @param {Object} serviceResult
 * @param {Object} serviceResult.result 服务器返回结果。
 * @param {Object} serviceResult.object 发布应用程序事件的对象。
 * @param {Object} serviceResult.type 事件类型。
 * @param {Object} serviceResult.element 接受浏览器事件的 DOM 节点。
 */
