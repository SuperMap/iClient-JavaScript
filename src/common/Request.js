require('./Base');
require("whatwg-fetch");
var fetchJsonp = require('fetch-jsonp');

SuperMap.Request = SuperMap.Class({

    initialize: function () {
    },

    get: function (url, params) {
        var type = 'GET';
        return this._processAsyn(this.parseUrl(url, params, type), type);
    },

    delete: function (url, params) {
        var type = 'DELETE';
        return this._processAsyn(this.parseUrl(url, params, type), type);
    },

    post: function (url, params) {
        var type = 'POST';
        return this._processAsyn(this.parseUrl(url, params, type), type, params);
    },

    put: function (url, params) {
        var type = 'PUT';
        return this._processAsyn(this.parseUrl(url, params, type), type, params);
    },

    parseUrl: function (url, params, type) {
        url = url + '.json';
        if (SuperMap.Credential.CREDENTIAL) {
            url += '?' + SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        if (type !== 'POST' && type !== 'PUT' && params && this._parseParamsToString(params) !== '') {
            params = this.toJSON(params);
            url += '&' + this._parseParamsToString(params);
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