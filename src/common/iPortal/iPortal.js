require('./iPortalService');
require('./iPortalServicesQueryParam');
require('../util/Request');

SuperMap.iPortal = SuperMap.Class({

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
        return SuperMap.Request.get(serviceUrl, queryParams).then(function (result) {
            var services = [];
            result.content.map(function (serviceJsonObj) {
                services.push(new SuperMap.iPortalService(serviceUrl, serviceJsonObj));
            });
            return services;
        });
    },

    deleteServices: function (ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return SuperMap.Request.delete(serviceUrl, {ids: ids});
    }

})

module.exports = function (url) {
    return new SuperMap.iPortal(url);
};

