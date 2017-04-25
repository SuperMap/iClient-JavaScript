require("whatwg-fetch");
var fetchJsonp = require('fetch-jsonp');

SuperMap.Support = {
    cors: ((window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()))
};

SuperMap.Request = SuperMap.Class({

    initialize: function () {
    },

    get: function (url, params, options) {
        options = options || {};
        var type = 'GET';
        url = url.endWith('.json') ? url : url + '.json';
        url = params ? SuperMap.Util.urlAppend(url, this.getParameterString(params || {})) : url;
        var tokenParam = '';
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        if (SuperMap.Credential.CREDENTIAL && SuperMap.Credential.CREDENTIAL.getUrlParameters()) {
            tokenParam = SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        var requestLength = url.length;
        if (requestLength <= 2000) {
            url = tokenParam !== '' ? url + separator + tokenParam : url;
            if (SuperMap.Support.cors) {
                return this._fetch(url, params, options, type);
            }
            if (!SuperMap.Util.isInTheSameDomain(url)) {
                url = url.replace('.json', '.jsonp');
                return this._fetchJsonp(url, options);
            }
        }
        url = url.substring(0, url.indexOf('?')) + '_method= GET';
        url = tokenParam !== '' ? url + '&' + tokenParam : url;
        return this.post(url, params, options);
    },

    delete: function (url, params, options) {
        options = options || {};
        url = url.endWith('.json') ? url : url + '.json';
        var type = 'DELETE';
        var requestLength = url.length;
        url = params ? SuperMap.Util.urlAppend(url, this.getParameterString(params || {})) : url;
        var tokenParam = '';
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        if (SuperMap.Credential.CREDENTIAL && SuperMap.Credential.CREDENTIAL.getUrlParameters()) {
            tokenParam = SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        if (requestLength <= 2000) {
            if (SuperMap.Support.cors) {
                url = tokenParam !== '' ? url + separator + tokenParam : url;
                return this._fetch(url, params, options, type);
            }
        }
        url = url.substring(0, url.indexOf('?')) + '_method= DELETE';
        url = tokenParam !== '' ? url + '&' + tokenParam : url;
        return this.post(url, params, options);
    },

    post: function (url, params, options) {
        options = options || {};
        var type = 'POST';
        url = url.endWith('.json') ? url : url + '.json';
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        if (SuperMap.Credential.CREDENTIAL && SuperMap.Credential.CREDENTIAL.getUrlParameters()) {
            url += separator + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        return this._fetch(url, params, options, type);
    },

    put: function (url, params, options) {
        options = options || {};
        var type = 'PUT';
        url = url.endWith('.json') ? url : url + '.json';
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        if (SuperMap.Credential.CREDENTIAL && SuperMap.Credential.CREDENTIAL.getUrlParameters()) {
            url += separator + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        return this._fetch(url, params, options, type);
    },

    _fetch: function (url, params, options, type) {
        if (options.timeout) {
            return this.timeout(options.timeout, fetch(url, {
                method: type,
                headers: options.headers,
                body: type === 'PUT' || type === 'POST' ? params : undefined,
                credentials: options.withCredentials ? 'include' : 'omit',
                mode: 'cors'
            }).then(function (response) {
                return response.json();
            }).then(function (json) {
                return json;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers
        }).then(function (response) {
            return response.json();
        }).then(function (json) {
            return json;
        })
    },

    _fetchJsonp: function (url, options) {
        return fetchJsonp(url, {method: 'GET', timeout: options.timeout})
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                return json;
            });
    },

    timeout: function (seconds, promise) {
        return new Promise(function (resolve, reject) {
            setTimeout(function () {
                reject(new Error("timeout"))
            }, seconds)
            promise.then(resolve, reject)
        })
    },

    getParameterString: function (params) {
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
                            (item === null || item === undefined) ? "" : item)
                        );
                    }
                    encodedValue = '[' + encodedItemArray.join(",") + ']';
                }
                else {
                    encodedValue = encodeURIComponent(value);
                }
                paramsArray.push(encodeURIComponent(key) + "=" + encodedValue);
            }
        }
        return paramsArray.join("&");
    }

});

String.prototype.endWith = function (s) {
    if (s === null || s === "" || this.length === 0 || s.length > this.length)
        return false;
    if (this.substring(this.length - s.length) == s)
        return true;
    else
        return false;
    return true;
}

module.exports = function () {
    return new SuperMap.Request();
};