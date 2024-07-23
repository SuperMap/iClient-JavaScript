/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import 'promise-polyfill/dist/polyfill';
import 'fetch-ie8';
import fetchJsonp from 'fetch-jsonp';
import { Util } from '../commontypes/Util';

let fetch = window.fetch;
export var setFetch = function (newFetch) {
    fetch = newFetch;
}
export var RequestJSONPPromise = {
  limitLength: 1500,
  queryKeys: [],
  queryValues: [],
  supermap_callbacks: {},
  addQueryStrings: function (values) {
      var me = this;
      for (var key in values) {
          me.queryKeys.push(key);
          if (typeof values[key] !== 'string') {
              values[key] = Util.toJSON(values[key]);
          }
          var tempValue = encodeURIComponent(values[key]);
          me.queryValues.push(tempValue);
      }
  },
  issue: function (config) {
      var me = this,
          uid = me.getUid(),
          url = config.url,
          splitQuestUrl = [];

      // me.addQueryStrings({
      //     callback: "RequestJSONPPromise.supermap_callbacks[" + uid + "]"
      // });
      var sectionURL = url,
          keysCount = 0; //此次sectionURL中有多少个key
      var length = me.queryKeys ? me.queryKeys.length : 0;
      for (var i = 0; i < length; i++) {
          if (sectionURL.length + me.queryKeys[i].length + 2 >= me.limitLength) {
              //+2 for ("&"or"?")and"="
              if (keysCount == 0) {
                  return false;
              }
              splitQuestUrl.push(sectionURL);
              sectionURL = url;
              keysCount = 0;
              i--;
          } else {
              if (sectionURL.length + me.queryKeys[i].length + 2 + me.queryValues[i].length > me.limitLength) {
                  var leftValue = me.queryValues[i];
                  while (leftValue.length > 0) {
                      var leftLength = me.limitLength - sectionURL.length - me.queryKeys[i].length - 2; //+2 for ("&"or"?")and"="
                      if (sectionURL.indexOf('?') > -1) {
                          sectionURL += '&';
                      } else {
                          sectionURL += '?';
                      }
                      var tempLeftValue = leftValue.substring(0, leftLength);
                      //避免 截断sectionURL时，将类似于%22这样的符号截成两半，从而导致服务端组装sectionURL时发生错误
                      if (tempLeftValue.substring(leftLength - 1, leftLength) === '%') {
                          leftLength -= 1;
                          tempLeftValue = leftValue.substring(0, leftLength);
                      } else if (tempLeftValue.substring(leftLength - 2, leftLength - 1) === '%') {
                          leftLength -= 2;
                          tempLeftValue = leftValue.substring(0, leftLength);
                      }

                      sectionURL += me.queryKeys[i] + '=' + tempLeftValue;
                      leftValue = leftValue.substring(leftLength);
                      if (tempLeftValue.length > 0) {
                          splitQuestUrl.push(sectionURL);
                          sectionURL = url;
                          keysCount = 0;
                      }
                  }
              } else {
                  keysCount++;
                  if (sectionURL.indexOf('?') > -1) {
                      sectionURL += '&';
                  } else {
                      sectionURL += '?';
                  }
                  sectionURL += me.queryKeys[i] + '=' + me.queryValues[i];
              }
          }
      }
      splitQuestUrl.push(sectionURL);
      return me.send(
          splitQuestUrl,
          'SuperMapJSONPCallbacks_' + uid,
          config && config.proxy
      );
  },

  getUid: function () {
      var uid = new Date().getTime(),
          random = Math.floor(Math.random() * 1e17);
      return uid * 1000 + random;
  },

  send: function (splitQuestUrl, callback, proxy) {
      var len = splitQuestUrl.length;
      if (len > 0) {
         return new Promise((resolve) => {
          var jsonpUserID = new Date().getTime();
          for (var i = 0; i < len; i++) {
              var url = splitQuestUrl[i];
              if (url.indexOf('?') > -1) {
                  url += '&';
              } else {
                  url += '?';
              }
              url += 'sectionCount=' + len;
              url += '&sectionIndex=' + i;
              url += '&jsonpUserID=' + jsonpUserID;
              if (proxy) {
                  url = decodeURIComponent(url);
                  url = proxy + encodeURIComponent(url);
              }
              fetchJsonp(url, {
                  jsonpCallbackFunction: callback,
                  timeout: 30000
              }).then((result) => {
                resolve(result.json());
              });
          }
         })
      }
  },

  GET: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings(config.params);
      return me.issue(config);
  },

  POST: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings({
          requestEntity: config.data
      });
      return me.issue(config);
  },

  PUT: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings({
          requestEntity: config.data
      });
      return me.issue(config);
  },
  DELETE: function (config) {
      var me = this;
      me.queryKeys.length = 0;
      me.queryValues.length = 0;
      me.addQueryStrings({
          requestEntity: config.data
      });
      return me.issue(config);
  }
};

var CORS;
var RequestTimeout;
/**
 * @function setCORS
 * @description 设置是否允许跨域请求，全局配置，优先级低于 service 下的 crossOring 参数。
 * @category BaseTypes Util
 * @param {boolean} cors - 是否允许跨域请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   {namespace}.setCORS(cors);
 *
 *   // 弃用的写法
 *   SuperMap.setCORS(cors);
 *
 * </script>
 *
 * // ES6 Import
 * import { setCORS } from '{npm}';
 *
 * setCORS(cors);
 * ```
 */
export var setCORS = function (cors) {
    CORS = cors;
}
/**
 * @function isCORS
 * @description 是是否允许跨域请求。
 * @category BaseTypes Util
 * @returns {boolean} 是否允许跨域请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.isCORS();
 *
 *   // 弃用的写法
 *   const result = SuperMap.isCORS();
 *
 * </script>
 *
 * // ES6 Import
 * import { isCORS } from '{npm}';
 *
 * const result = isCORS();
 * ```
 */
export var isCORS = function () {
    if (CORS != undefined) {
        return CORS;
    }
    return window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
}
/**
 * @function setRequestTimeout
 * @category BaseTypes Util
 * @description 设置请求超时时间。
 * @param {number} [timeout=45] - 请求超时时间，单位为秒。
 * @usage
 * ```
 * // 浏览器
  <script type="text/javascript" src="{cdn}"></script>
  <script>
    {namespace}.setRequestTimeout(timeout);

    // 弃用的写法
    SuperMap.setRequestTimeout(timeout);

  </script>

  // ES6 Import
  import { setRequestTimeout } from '{npm}';

  setRequestTimeout(timeout);
 * ```
 */
export var setRequestTimeout = function (timeout) {
    return RequestTimeout = timeout;
}
/**
 * @function getRequestTimeout
 * @category BaseTypes Util
 * @description 获取请求超时的时间。
 * @returns {number} 请求超时时间。
 * @usage
 * ```
 * // 浏览器
  <script type="text/javascript" src="{cdn}"></script>
  <script>
    {namespace}.getRequestTimeout();

    // 弃用的写法
    SuperMap.getRequestTimeout();

  </script>

  // ES6 Import
  import { getRequestTimeout } from '{npm}';

  getRequestTimeout();
 * ```
 */
export var getRequestTimeout = function () {
    return RequestTimeout || 45000;
}

/**
 * @name FetchRequest
 * @namespace
 * @category BaseTypes Util
 * @description 获取请求。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.FetchRequest.commit(method, url, params, options);
 *
 * </script>
 *
 * // ES6 Import
 * import { FetchRequest } from '{npm}';
 *
 * const result = FetchRequest.commit(method, url, params, options);
 *
 * ```
 */
export var FetchRequest = {
    /**
     * @function FetchRequest.commit
     * @description commit 请求。
     * @param {string} method - 请求方法。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options - 请求的配置属性。
     * @returns {Promise} Promise 对象。
     */
    commit: function (method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.post(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },
    /**
     * @function FetchRequest.supportDirectRequest
     * @description supportDirectRequest 请求。
     * @param {string} url - 请求地址。
     * @param {Object} options - 请求的配置属性。
     * @returns {boolean} 是否允许跨域请求。
     */
    supportDirectRequest: function (url, options) {
        if (Util.isInTheSameDomain(url)) {
            return true;
        }
        if (options.crossOrigin != undefined) {
            return options.crossOrigin;
        } else {
            return isCORS() || options.proxy;
        }
    },
    /**
     * @function FetchRequest.get
     * @description get 请求。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options - 请求的配置属性。
     * @returns {Promise} Promise 对象。
     */
    get: function (url, params, options) {
        options = options || {};
        var type = 'GET';
        url = Util.urlAppend(url, this._getParameterString(params || {}));
        url = this._processUrl(url, options);
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url,
                data: params
            };
            return RequestJSONPPromise.GET(config);
        }
        if (!this.urlIsLong(url)) {
            return this._fetch(url, params, options, type);
        } else {
            return this._postSimulatie(type, url.substring(0, url.indexOf('?')), params, options);
        }
    },
    /**
     * @function FetchRequest.delete
     * @description delete 请求。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options -请求的配置属性。
     * @returns {Promise} Promise 对象。
     */
    delete: function (url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = Util.urlAppend(url, this._getParameterString(params || {}));
        url = this._processUrl(url, options);
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url += "&_method=DELETE",
                data: params
            };
            return RequestJSONPPromise.DELETE(config);
        }
        if (this.urlIsLong(url)) {
            return this._postSimulatie(type, url.substring(0, url.indexOf('?')), params, options);
        }
        return this._fetch(url, params, options, type);
    },
    /**
     * @function FetchRequest.post
     * @description post 请求。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options - 请求的配置属性。
     * @returns {Promise} Promise 对象。
     */
    post: function (url, params, options) {
        options = options || {};
        url = this._processUrl(url, options);
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: Util.urlAppend(url, "_method=POST"),
                data: params
            };
            return RequestJSONPPromise.POST(config);
        }
        return this._fetch(url, params, options, 'POST');
    },
    /**
     * @function FetchRequest.put
     * @description put 请求。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options - 请求的配置属性。
     * @returns {Promise} Promise 对象。
     */
    put: function (url, params, options) {
        options = options || {};
        url = this._processUrl(url, options);
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url += "&_method=PUT",
                data: params
            };
            return RequestJSONPPromise.PUT(config);
        }
        return this._fetch(url, params, options, 'PUT');
    },
    /**
     * @function FetchRequest.urlIsLong
     * @description URL 的字节长度是否太长。
     * @param {string} url - 请求地址。
     * @returns {boolean} URL 的字节长度是否太长。
     */
    urlIsLong: function (url) {
        //当前url的字节长度。
        var totalLength = 0,
            charCode = null;
        for (var i = 0, len = url.length; i < len; i++) {
            //转化为Unicode编码
            charCode = url.charCodeAt(i);
            if (charCode < 0x007f) {
                totalLength++;
            } else if ((0x0080 <= charCode) && (charCode <= 0x07ff)) {
                totalLength += 2;
            } else if ((0x0800 <= charCode) && (charCode <= 0xffff)) {
                totalLength += 3;
            }
        }
        return totalLength < 2000 ? false : true;
    },
    _postSimulatie: function (type, url, params, options) {
        var separator = url.indexOf('?') > -1 ? '&' : '?';
        url += separator + '_method=' + type;
        if (typeof params !== 'string') {
            params = JSON.stringify(params);
        }
        return this.post(url, params, options);
    },

    _processUrl: function (url, options) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        if (url.indexOf('.json') === -1 && !options.withoutFormatSuffix) {
            if (url.indexOf('?') < 0) {
                url += '.json';
            } else {
                var urlArrays = url.split('?');
                if (urlArrays.length === 2) {
                    url = urlArrays[0] + '.json?' + urlArrays[1];
                }
            }
        }
        if (options && options.proxy) {
            if (typeof options.proxy === 'function') {
                url = options.proxy(url);
            } else {
                url = decodeURIComponent(url);
                url = options.proxy + encodeURIComponent(url);
            }
        }
        return url;
    },

    _fetch: function (url, params, options, type) {
        options = options || {};
        options.headers = options.headers || {};
        if (!options.headers['Content-Type'] && !FormData.prototype.isPrototypeOf(params)) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        if (options.timeout) {
            return this._timeout(
                options.timeout,
                fetch(url, {
                    method: type,
                    headers: options.headers,
                    body: type === 'PUT' || type === 'POST' ? params : undefined,
                    credentials: this._getWithCredentials(options),
                    mode: 'cors',
                    timeout: getRequestTimeout()
                }).then(function (response) {
                    return response;
                })
            );
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: this._getWithCredentials(options),
            mode: 'cors',
            timeout: getRequestTimeout()
        }).then(function (response) {
            return response;
        });
    },

    _getWithCredentials: function (options) {
        if (options.withCredentials === true) {
            return 'include';
        }
        if (options.withCredentials === false) {
            return 'omit';
        }
        return 'same-origin';
    },

    _fetchJsonp: function (url, options) {
        options = options || {};
        return fetchJsonp(url, {
            method: 'GET',
            timeout: options.timeout
        }).then(function (response) {
            return response;
        });
    },

    _timeout: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error('timeout'));
            }, seconds);
            promise.then(resolve, reject);
        });
    },

    _getParameterString: function (params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if (value != null && typeof value !== 'function') {
                var encodedValue;
                if (Array.isArray(value) || value.toString() === '[object Object]') {
                    encodedValue = encodeURIComponent(JSON.stringify(value));
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + '=' + encodedValue);
            }
        }
        return paramsArray.join('&');
    },

    _isMVTRequest: function (url) {
        return url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1;
    }
}
