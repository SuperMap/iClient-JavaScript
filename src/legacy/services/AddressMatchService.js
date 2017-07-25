var SuperMap = require('../SuperMap');
var ServiceBase = require('../../common/iServer/ServiceBase');
var AddressMatchService = require('../../common/iServer/AddressMatchService');

/**
 * 地址匹配服务，包括正向匹配和反向匹配。
 */
SuperMap.REST.AddressMatchService = SuperMap.Class(ServiceBase, {

    initialize: function (url, options) {
        ServiceBase.prototype.initialize.apply(this, arguments);
    },

    code: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new AddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.code(me.url + '/geocoding', params);
        return me;
    },

    decode: function (params, callback, resultFormat) {
        var me = this,
            format = me._processFormat(resultFormat);
        var addressMatchService = new AddressMatchService(me.url, {
            serverType: me.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            format: format
        });
        addressMatchService.decode(me.url + '/geodecoding', params);
        return me;
    },

    _processFormat: function (resultFormat) {
        return (resultFormat) ? resultFormat : SuperMap.DataFormat.GEOJSON;
    },

    CLASS_NAME: "SuperMap.REST.AddressMatchService"
});

module.exports = SuperMap.REST.AddressMatchService;