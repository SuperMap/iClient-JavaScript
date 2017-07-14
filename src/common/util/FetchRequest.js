require("whatwg-fetch");
var fetchJsonp = require('fetch-jsonp');
var SuperMap = require('../SuperMap');

SuperMap.Support = {
    cors: ((window.XMLHttpRequest && 'withCredentials' in new window.XMLHttpRequest()))
};

SuperMap.FetchRequest = {

    commit: function (method, url, params, options) {
        method = method ? method.toUpperCase() : method;
        switch (method) {
            case 'GET':
                return this.get(url, params, options);
            case 'POST':
                return this.POST(url, params, options);
            case 'PUT':
                return this.put(url, params, options);
            case 'DELETE':
                return this.delete(url, params, options);
            default:
                return this.get(url, params, options);
        }
    },

    get: function (url, params, options) {
        var type = 'GET';
        url = this._processUrl(url);
        url = SuperMap.Util.urlAppend(url, this._getParameterString(params || {}));
        if (url.length <= 2000) {
            if (SuperMap.Util.isInTheSameDomain(url) || (SuperMap.Support.cors && this._isMVTRequest(url))) {
                return this._fetch(url, params, options, type);
            }
            if (!SuperMap.Util.isInTheSameDomain(url)) {
                url = url.replace('.json', '.jsonp');
                return this._fetchJsonp(url, options);
            }
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    delete: function (url, params, options) {
        var type = 'DELETE';
        url = this._processUrl(url);
        url = SuperMap.Util.urlAppend(url, this._getParameterString(params || {}));
        if (url.length <= 2000 && SuperMap.Support.cors) {
            return this._fetch(url, params, options, type);
        }
        return this._postSimulatie(type, url.substring(0, url.indexOf('?') - 1), params, options);
    },

    post: function (url, params, options) {
        return this._fetch(this._processUrl(url), params, options, 'POST');
    },

    put: function (url, params, options) {
        return this._fetch(this._processUrl(url), params, options, 'PUT');
    },

    _postSimulatie: function (type, url, params, options) {
        var separator = url.indexOf("?") > -1 ? "&" : "?";
        url += separator + '_method= ' + type;
        return this.post(url, params, options);
    },

    _processUrl: function (url) {
        if (this._isMVTRequest(url)) {
            return url;
        }

        if (url.indexOf('.json') === -1) {
            if (url.indexOf("?") < 0) {
                url += '.json'
            } else {
                var urlArrays = url.split("?");
                if (urlArrays.length === 2) {
                    url = urlArrays[0] + ".json?" + urlArrays[1]
                }
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
                mode: 'cors'
            }).then(function (response) {
                return response;
            }));
        }
        return fetch(url, {
            method: type,
            body: type === 'PUT' || type === 'POST' ? params : undefined,
            headers: options.headers,
            credentials: options.withCredentials ? 'include' : 'omit',
            mode: 'cors'
        }).then(function (response) {
            return response;
        });
    },

    _fetchJsonp: function (url, options) {
        options = options || {};
        return fetchJsonp(url, {method: 'GET', timeout: options.timeout})
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
                            (item === null || item === undefined) ? "" : item)
                        );
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
module.exports = SuperMap.FetchRequest;