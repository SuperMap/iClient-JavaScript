require('./iPortalServicesQueryParam');
var SuperMap = require('../SuperMap');
var Request = require('../util/Request');
var iPortalService = require('./iPortalService');
SuperMap.iPortal = SuperMap.Class(SuperMap.iPortalServiceBase, {

    initialize: function (iportalUrl, token) {
        this.iportalUrl = iportalUrl;
        this.token = token;
    },

    load: function () {
        var me = this;
        return SuperMap.Request.get(me.iportalUrl + '/web').then(function (result) {
            if (result) {
                SuperMap.Credential.CREDENTIAL = new SuperMap.Credential(me.token, 'token');
            }
        });
    },

    queryServices: function (queryParams) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("GET", serviceUrl, queryParams).then(function (result) {
            var services = [];
            result.content.map(function (serviceJsonObj) {
                services.push(new iPortalService(serviceUrl, serviceJsonObj));
            });
            return services;
        });
    },

    deleteServices: function (ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("DELETE", serviceUrl, {ids: ids});
    }

});

module.exports = SuperMap.iPortal;

