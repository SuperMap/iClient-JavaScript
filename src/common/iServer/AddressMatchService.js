var ServiceBase = require('./ServiceBase');
var SuperMap = require('../SuperMap');
var Request = require('../util/FetchRequest');
require('./GeoCodingParameter');
require('./GeoDecodingParameter');

/**
 * @class SuperMap.AddressMatchService
   @constructs SuperMap.AddressMatchService
 * @classdesc
 * 地址匹配服务，包括正向匹配和反向匹配。
 * @api

 */

SuperMap.AddressMatchService = SuperMap.Class(ServiceBase, {
    /**
     *
     * @method SuperMap.AddressMatchService.prototype.initialize
     * @param options - {Object} 参数。
     * @param url {string}
     */
    initialize: function (url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    destroy: function () {
        ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @function SuperMap.AddressMatchService.prototype.code
     * @param url {string} 正向地址匹配服务地址
     * @param params {object} 正向地址匹配服务参数
     */
    code: function (url, params) {
        this.processAsync(url, params);
    },

    /**
     * @method SuperMap.AddressMatchService.prototype.decode
     * @param url {string} 反向地址匹配服务地址
     * @param params {object} 反向地址匹配服务参数
     */
    decode: function (url, params) {
        this.processAsync(url, params);
    },

    processAsync: function (url, params) {
        var me = this;
        return Request.get(url, params).then(function (response) {
            return response.json();
        }).then(function (result) {
            if (result) {
                me.serviceProcessCompleted(result);
            } else {
                me.serviceProcessFailed(result);
            }
        }).catch(function (e) {
            me.eventListeners.processFailed({error: e});
        });
    },

    serviceProcessCompleted: function (result) {
        ServiceBase.prototype.serviceProcessCompleted.apply(this, arguments);
    },

    serviceProcessFailed: function (result) {
        ServiceBase.prototype.serviceProcessFailed.apply(this, arguments);
    },

    CLASS_NAME: "SuperMap.AddressMatchService"
});

module.exports = SuperMap.AddressMatchService;