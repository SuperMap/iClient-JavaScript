/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import "./PromisePolyfill"
import 'fetch-ie8'
import fetchJsonp from 'fetch-jsonp';
import {
    SuperMap
} from '../SuperMap';
import {
    Util
} from '../commontypes/Util';

const fetch = window.fetch;
/**
 * @function SuperMap.setCORS
 * @description 设置是否允许跨域请求，全局配置，优先级低于 service 下的 crossOring 参数。
 * @param {boolean} cors - 是否允许跨域请求。
 */
export var setCORS = SuperMap.setCORS = function (cors) {
    SuperMap.CORS = cors;
}
/**
 * @function SuperMap.isCORS
 * @description 是是否允许跨域请求。
 * @returns {boolean} 是否允许跨域请求。
 */
export var isCORS = SuperMap.isCORS = function () {
    if (SuperMap.CORS != undefined) {
        return SuperMap.CORS;
    }
    return window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest();
}
/**
 * @function SuperMap.setRequestTimeout
 * @description 设置请求超时时间。
 * @param {number} [timeout=45] - 请求超时时间，单位秒。
 */
export var setRequestTimeout = SuperMap.setRequestTimeout = function (timeout) {
    return SuperMap.RequestTimeout = timeout;
}
/**
 * @function SuperMap.getRequestTimeout
 * @description 获取请求超时时间。
 * @returns {number} 请求超时时间。
 */
export var getRequestTimeout = SuperMap.getRequestTimeout = function () {
    return SuperMap.RequestTimeout || 45000;
}
export var FetchRequest = SuperMap.FetchRequest = {
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
    supportDirectRequest: function (url, options) {
        if(Util.isInTheSameDomain(url)){
          return true;
        }if(options.crossOrigin != undefined){
          return options.crossOrigin;
        }else{
          return isCORS() || options.proxy
        }
    },
    get: function (url, params, options) {
        options = options || {};
        var type = 'GET';
        url = this._processUrl(url, options);
        url = Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url,
                data: params
            };
            return SuperMap.Util.RequestJSONPPromise.GET(config);
        }
        if (!this.urlIsLong(url)) {
            return this._fetch(url, params, options, type);
        } else {
            return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
        }

    },

    delete: function (url, params, options) {
        options = options || {};
        var type = 'DELETE';
        url = this._processUrl(url, options);
        url = Util.urlAppend(url, this._getParameterString(params || {}));
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url += "&_method=DELETE",
                data: params
            };
            return SuperMap.Util.RequestJSONPPromise.DELETE(config);
        }
        if (this.urlIsLong(url)) {
            return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
        }
        return this._fetch(url, params, options, type);

    },
    post: function (url, params, options) {
        options = options || {};
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url += "&_method=POST",
                data: params
            };
            return SuperMap.Util.RequestJSONPPromise.POST(config);
        }
        return this._fetch(this._processUrl(url, options), params, options, 'POST');

    },

    put: function (url, params, options) {
        options = options || {};
        url = this._processUrl(url, options);
        if (!this.supportDirectRequest(url, options)) {
            url = url.replace('.json', '.jsonp');
            var config = {
                url: url += "&_method=PUT",
                data: params
            };
            return SuperMap.Util.RequestJSONPPromise.PUT(config);

        }
        return this._fetch(url, params, options, 'PUT');

    },
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
        return (totalLength < 2000) ? false : true;
    },
    _postSimulatie: function (type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
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
            if (url.indexOf("?") < 0) {
                url += '.json'
            } else {
                var urlArrays = url.split("?");
                if (urlArrays.length === 2) {
                    url = urlArrays[0] + ".json?" + urlArrays[1]
                }
            }
        }
        if (options && options.proxy) {
            if (typeof options.proxy === "function") {
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
        if (!options.headers['Content-Type']) {
            options.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
        }
        if (options.timeout) {
            return this._timeout(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors',
                timeout: getRequestTimeout()
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors',
            timeout: getRequestTimeout()
        }).then(function (response) {
            return response;
        });
    },

    _fetchJsonp: function (url, options) {
        options = options || {};
        return fetchJsonp(url, {
                method: 'GET',
                timeout: options.timeout
            })
            .then(function (response) {
                return response;
            });
    },

    _timeout: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, seconds)
            promise.then(resolve, reject)
        })
    },

    _getParameterString: function (params) {
        var paramsArray = [];
        for (var key in params) {
            var value = params[key];
            if ((value != null) && (typeof value !== 'function')) {
                var encodedValue;
                if (typeof value === 'object' && value.constructor === Array) {
                    var encodedItemArray = [];
                    var item;
                    for (var itemIndex = 0, len = value.length; itemIndex < len; itemIndex++) {
                        item = value[itemIndex];
                        encodedItemArray.push(encodeURIComponent(
                            (item === null || item === undefined) ? "" : item));
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                } else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    },

    _isMVTRequest: function (url) {
        return (url.indexOf('.mvt') > -1 || url.indexOf('.pbf') > -1);
    }
};
SuperMap.Util.RequestJSONPPromise = {
    limitLength: 1500,
    queryKeys: [],
    queryValues: [],
    supermap_callbacks: {},
    addQueryStrings: function (values) {
        var me = this;
        for (var key in values) {
            me.queryKeys.push(key);
            if (typeof values[key] !== "string") {
                values[key] = SuperMap.Util.toJSON(values[key]);
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
        var p = new Promise(function (resolve) {
            me.supermap_callbacks[uid] = function (response) {
                delete me.supermap_callbacks[uid];
                resolve(response);
            };
        });

        // me.addQueryStrings({
        //     callback: "SuperMap.Util.RequestJSONPPromise.supermap_callbacks[" + uid + "]"
        // });
        var sectionURL = url,
            keysCount = 0; //此次sectionURL中有多少个key
        var length = me.queryKeys ? me.queryKeys.length : 0;
        for (var i = 0; i < length; i++) {
            if (sectionURL.length + me.queryKeys[i].length + 2 >= me.limitLength) { //+2 for ("&"or"?")and"="
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
                        if (sectionURL.indexOf("?") > -1) {
                            sectionURL += "&";
                        } else {
                            sectionURL += "?";
                        }
                        var tempLeftValue = leftValue.substring(0, leftLength);
                        //避免 截断sectionURL时，将类似于%22这样的符号截成两半，从而导致服务端组装sectionURL时发生错误
                        if (tempLeftValue.substring(leftLength - 1, leftLength) === "%") {
                            leftLength -= 1;
                            tempLeftValue = leftValue.substring(0, leftLength);
                        } else if (tempLeftValue.substring(leftLength - 2, leftLength - 1) === "%") {
                            leftLength -= 2;
                            tempLeftValue = leftValue.substring(0, leftLength);
                        }

                        sectionURL += me.queryKeys[i] + "=" + tempLeftValue;
                        leftValue = leftValue.substring(leftLength);
                        if (tempLeftValue.length > 0) {
                            splitQuestUrl.push(sectionURL);
                            sectionURL = url;
                            keysCount = 0;
                        }
                    }
                } else {
                    keysCount++;
                    if (sectionURL.indexOf("?") > -1) {
                        sectionURL += "&";
                    } else {
                        sectionURL += "?";
                    }
                    sectionURL += me.queryKeys[i] + "=" + me.queryValues[i];
                }
            }
        }
        splitQuestUrl.push(sectionURL);
        me.send(splitQuestUrl, "SuperMap.Util.RequestJSONPPromise.supermap_callbacks[" + uid + "]", config && config.proxy);
        return p;
    },


    getUid: function () {
        var uid = new Date().getTime(),
            random = Math.floor(Math.random() * 1e17);
        return uid * 1000 + random;
    },

    send: function (splitQuestUrl, callback, proxy) {
        var len = splitQuestUrl.length;
        if (len > 0) {
            var jsonpUserID = new Date().getTime();
            for (var i = 0; i < len; i++) {
                var url = splitQuestUrl[i];
                if (url.indexOf("?") > -1) {
                    url += "&";
                } else {
                    url += "?";
                }
                url += "sectionCount=" + len;
                url += "&sectionIndex=" + i;
                url += "&jsonpUserID=" + jsonpUserID;
                if (proxy) {
                    url = decodeURIComponent(url);
                    url = proxy + encodeURIComponent(url);
                }
                fetchJsonp(url, {
                    jsonpCallbackFunction: callback,
                    timeout: 30000
                })
            }
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