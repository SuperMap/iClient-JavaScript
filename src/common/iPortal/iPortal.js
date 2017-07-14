require('./iPortalServicesQueryParam');
require('./iPortalMapsQueryParam');
var SuperMap = require('../SuperMap');
var Request = require('../util/FetchRequest');
var iPortalService = require('./iPortalService');
var iPortalMap = require('./iPortalMap');
SuperMap.iPortal = SuperMap.Class(SuperMap.iPortalServiceBase, {

    initialize: function (iportalUrl) {
        this.iportalUrl = iportalUrl;
    },

    load: function () {
        return SuperMap.FetchRequest.get(this.iportalUrl + '/web');
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
    },

    queryMaps: function (queryParams) {
        var mapsUrl = this.iportalUrl + "/web/maps";
        return this.request("GET", mapsUrl, queryParams).then(function (result) {
            var mapRetult = {};
            var maps = [];
            result.content.map(function (mapJsonObj) {
                maps.push(new iPortalMap(mapsUrl + "/" + mapJsonObj.id, mapJsonObj));
            });
            mapRetult.content = maps;
            mapRetult.currentPage = result.currentPage;
            mapRetult.pageSize = result.pageSize;
            mapRetult.total = result.total;
            mapRetult.totalPage = result.totalPage;
            return mapRetult;
        });
    }
});

module.exports = SuperMap.iPortal;

