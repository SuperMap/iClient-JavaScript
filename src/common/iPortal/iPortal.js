import SuperMap from '../SuperMap';
import IPortalServicesQueryParam from './iPortalServicesQueryParam';
import IPortalMapsQueryParam from './iPortalMapsQueryParam';
import {FetchRequest} from '../util/FetchRequest';
import IPortalService from './iPortalService';
import IPortalMap from './iPortalMap';
import IPortalServiceBase from './iPortalServiceBase';

/**
 * @class SuperMap.iPortal
 * @classdesc iPortal
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export default  class IPortal extends IPortalServiceBase {
    /**
     * @method SuperMap.iPortal.initialize
     * @param iportalUrl
     */
    constructor(iportalUrl) {
        super(iportalUrl);
        this.iportalUrl = iportalUrl;
    }

    /**
     * @method SuperMap.iPortal.load
     * @param iportalUrl
     */
    load() {
        return FetchRequest.get(this.iportalUrl + '/web');
    }

    /**
     * @method SuperMap.iPortal.queryServices
     * @param queryParams
     */
    queryServices(queryParams) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("GET", serviceUrl, queryParams).then(function (result) {
            var services = [];
            result.content.map(function (serviceJsonObj) {
                services.push(new IPortalService(serviceUrl, serviceJsonObj));
            });
            return services;
        });
    }

    /**
     * @method SuperMap.iPortal.deleteServices
     * @param ids
     */
    deleteServices(ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("DELETE", serviceUrl, {ids: ids});
    }

    /**
     * @method SuperMap.iPortal.queryMaps
     * @param queryParams
     */
    queryMaps(queryParams) {
        var mapsUrl = this.iportalUrl + "/web/maps";
        return this.request("GET", mapsUrl, queryParams).then(function (result) {
            var mapRetult = {};
            var maps = [];
            result.content.map(function (mapJsonObj) {
                maps.push(new IPortalMap(mapsUrl + "/" + mapJsonObj.id, mapJsonObj));
            });
            mapRetult.content = maps;
            mapRetult.currentPage = result.currentPage;
            mapRetult.pageSize = result.pageSize;
            mapRetult.total = result.total;
            mapRetult.totalPage = result.totalPage;
            return mapRetult;
        });
    }
}

SuperMap.iPortal = IPortal;

