/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { FetchRequest } from '../util/FetchRequest';
import { Events } from '../commontypes/Events';
import { SecurityManager } from '../security/SecurityManager';
import { Util } from '../commontypes/Util';
import { JSONFormat } from '../format/JSON';
import {DataFormat} from '../REST';

/**
 * @class CommonServiceBase
 * @deprecatedclass SuperMap.CommonServiceBase
 * @category  iServer Core
 * @classdesc 对接 iServer 各种服务的 Service 的基类。
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class CommonServiceBase {
    constructor(url, options) {
        let me = this;

        this.EVENT_TYPES = [];

        this.events = null;

        this.eventListeners = null;

        this.url = null;

        this.urls = null;

        this.proxy = null;

        this.index = null;

        this.length = null;

        this.totalTimes = null;

        this.POLLING_TIMES = 3;

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
     * @function CommonServiceBase.prototype.destroy
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
     * @function  CommonServiceBase.prototype.request
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
        let format = options.scope.format;
        // 兼容 callback 未传，dataFormat 传入的情况
        if (typeof options.success === 'string') {
          options.scope.format = options.success;
          format = options.success;
          options.success = null;
          options.failure = null;
        }
       
        if (format && !this.supportDataFormat(format)) {
          throw new Error(`${this.CLASS_NAME} is not surport ${format} format!`);
        }
       
        let me = this;
        options.url = options.url || me.url;
        if (this._returnContent(options) && !options.url.includes('returnContent=true')) {
          options.url = Util.urlAppend(options.url, 'returnContent=true');
        }
        options.proxy = options.proxy || me.proxy;
        options.withCredentials = options.withCredentials != undefined ? options.withCredentials : me.withCredentials;
        options.crossOrigin = options.crossOrigin != undefined ? options.crossOrigin : me.crossOrigin;
        options.headers = options.headers || me.headers;
        options.isInTheSameDomain = me.isInTheSameDomain;
        options.withoutFormatSuffix = options.scope.withoutFormatSuffix || false;
        //为url添加安全认证信息片段
        options.url = SecurityManager.appendCredential(options.url);

        me.calculatePollingTimes();
        options.scope = me;
        if (me.totalTimes > 0) {
          me.totalTimes--;
          return me.ajaxPolling(options);
        }
        return me._commit(options);
    }


    /**
     *
     * @function CommonServiceBase.prototype.ajaxPolling
     * @description 请求失败后，如果剩余请求失败次数不为 0，重新获取 URL 发送请求。
     * @param {Object} options - 请求参数对象。
     * @private
     */
    ajaxPolling(options) {
        let me = this,
            url = options.url,
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/;
        me.index = parseInt(Math.random() * me.length);
        me.url = me.urls[me.index];
        url = url.replace(re, re.exec(me.url)[0]);
        options.url = url;
        options.isInTheSameDomain = Util.isInTheSameDomain(url);
        return me._commit(options);
    }

    /**
     * @function CommonServiceBase.prototype.calculatePollingTimes
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
     * @function CommonServiceBase.prototype.isServiceSupportPolling
     * @description 判断服务是否支持轮询。
     */
    isServiceSupportPolling() {
        let me = this;
        return !(
            me.CLASS_NAME === 'SuperMap.REST.ThemeService' || me.CLASS_NAME === 'SuperMap.REST.EditFeaturesService'
        );
    }

    /**
     * @function CommonServiceBase.prototype.serviceProcessCompleted
     * @description 状态完成，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     * @private
     */
    serviceProcessCompleted(result, options) {
        result = Util.transformResult(result);
        return { result, options };
    }

    /**
     * @function CommonServiceBase.prototype.serviceProcessFailed
     * @description 状态失败，执行此方法。
     * @param {Object} result - 服务器返回的结果对象。
     * @private
     */
    serviceProcessFailed(result, options) {
        result = Util.transformResult(result);
        let error = result.error || result;
        return { error, options };
    }

    _returnContent(options) {
      if (options.scope.format === DataFormat.FGB) {
        return false;
      }
      if (options.scope.returnContent) {
        return true;
      }
      return false;
    }

    supportDataFormat(foramt) {
      return this.dataFormat().includes(foramt);
    }

    dataFormat() {
      return [DataFormat.GEOJSON, DataFormat.ISERVER];
    }

    _commit(options) {
        if (options.method === 'POST' || options.method === 'PUT' || options.method === 'PATCH') {
            if (options.params) {
                options.url = Util.urlAppend(options.url, Util.getParameterString(options.params || {}));
            }
            if (typeof options.data === 'object') {
                try {
                    options.params = Util.toJSON(options.data);
                } catch (e) {
                    console.log('不是json对象');
                }
            } else {
                options.params = options.data;
            }
        }
        return FetchRequest.commit(options.method, options.url, options.params, {
            headers: options.headers,
            withoutFormatSuffix: options.withoutFormatSuffix,
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
                if (requestResult && options.scope.format === DataFormat.FGB) {
                  requestResult.newResourceLocation = requestResult.newResourceLocation.replace('.json', '') + '.fgb';
                }
                return requestResult;
            })
            .catch(function (e) {
                return { error: e };
            })
            .then((requestResult) => {
                let response = {
                  object: this
                };
                if (requestResult.error) {
                    response = {...response, ...this.serviceProcessFailed(requestResult, options)};
                    response.type = 'processFailed';
                    options.failure && options.failure(response);
                } else {
                    requestResult.succeed = requestResult.succeed == undefined ? true : requestResult.succeed;
                    response = {...response, ...this.serviceProcessCompleted(requestResult, options)};
                    response.type = 'processCompleted';
                    options.success && options.success(response);
                }
                return response;
            });
    }
}


/**
 * 服务器请求回调函数。
 * @callback RequestCallback
 * @category BaseTypes Util
 * @example
 * var requestCallback = function (serviceResult){
 *      console.log(serviceResult.result);
 * }
 * new QueryService(url).queryByBounds(param, requestCallback);
 * @param {Object} serviceResult
 * @param {Object} serviceResult.result 服务器返回结果。
 * @param {Object} serviceResult.object 发布应用程序事件的对象。
 * @param {Object} serviceResult.type 事件类型。
 * @param {Object} serviceResult.options 请求参数。
 */
