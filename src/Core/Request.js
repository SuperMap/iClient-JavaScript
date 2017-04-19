/**
 * Class:SuperMap.Request
 * 通用请求类
 */
require('./base');
require("whatwg-fetch");
var fetchJsonp = require('fetch-jsonp');

SuperMap.Request = SuperMap.Class({

    initialize: function () {
    },

    get: function (url, params) {
        return this._processAsyn(this.parseUrl(url, params), 'GET');
    },

    delete: function (url, params) {
        return this._processAsyn(this.parseUrl(url, params), 'DELETE');
    },

    post: function (url, params) {
        return this._processAsyn(this.parseUrl(url), 'POST', params);
    },

    put: function (url, params) {
        return this._processAsyn(this.parseUrl(url), 'PUT', params);
    },

    parseUrl: function (url, param) {
        url = url + '.json';
        var separator = "";
        if (SuperMap.Credential.CREDENTIAL) {
            separator = "?";
            url += separator + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        if (param) {
            separator = (separator === "") ? "?" : "&";
            url += separator + this._parseParamsToString(param);
        }
        return url;
    },

    _processAsyn: function (url, type, params) {
        if (!SuperMap.Util.isInTheSameDomain(url) && type === 'GET') {
            url = url.replace('.json', '.jsonp');
            return fetchJsonp(url, {method: type})
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    return json;
                });
        }
        if (type === 'GET' || type === 'DELETE') {
            return fetch(url, {method: type})
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    return json;
                });
        }
        return fetch(url, {
            method: type,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: JSON.stringify(params)
        })
            .then(function (response) {
                return response.json();
            }).then(function (json) {
                return json;
            });
    },

    _parseParamsToString: function (queryParams) {
        var params = '';
        if (!queryParams) {
            return params;
        }
        var queryMap = {};
        for (key in queryParams) {
            if (queryParams[key] instanceof Array) {
                queryMap[key] = this._ArrayToString(queryParams[key]);
                continue;
            }
            queryMap[key] = queryParams[key];
        }
        for (var i in queryMap) {
            params += i + '=' + queryMap[i] + '&';
        }
        return params.substring(0, params.length - 1);
    },

    _ArrayToString: function (array) {
        if (!(array instanceof Array)) {
            return array;
        }
        var arrayStr = '[';
        for (var i = 0; i < array.length; i++) {
            if (typeof array[i] !== 'string') {
                return "[" + array.toString() + "]";
            }
            arrayStr += "\"" + array[i] + "\"";
            if (i !== array.length - 1) {
                arrayStr += ',';
                continue;
            }
            arrayStr += ']';
        }
        return arrayStr;
    },

    toJSON: function (object) {
        var json = {};
        for (var key in object) {
            if (typeof object[key] === 'function') {
                continue;
            }
            json[key] = object[key];
        }
        return json;
    }

});

module.exports = function () {
    return new SuperMap.Request();
};