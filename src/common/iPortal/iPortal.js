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
 * @extends SuperMap.iPortalServiceBase
 * @param iportalUrl -{string} 地址
 *
 */
export default  class IPortal extends IPortalServiceBase {
    /*
     * @function SuperMap.iPortal.prototype.constructor
     * @param iportalUrl -{string} 地址
     */
    constructor(iportalUrl) {
        super(iportalUrl);
        this.iportalUrl = iportalUrl;
    }
    /**
     * @function SuperMap.iPortal.prototype.load
     * @description 页面加载
     */
    load() {
        return FetchRequest.get(this.iportalUrl + '/web');
    }

    /**
     * @function SuperMap.iPortal.prototype.queryServices
     * @param queryParams -{SuperMap.iPortalServicesQueryParam} 查询参数
     * @description 查询服务
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
     * @function SuperMap.iPortal.prototype.deleteServices
     * @param ids -{number} 服务的id
     * @description 删除服务
     */
    deleteServices(ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("DELETE", serviceUrl, {ids: ids});
    }

    /**
     * @function SuperMap.iPortal.prototype.queryMaps
     * @param queryParams -{SuperMap.iPortalMapsQueryParam} 查询参数
     * @description 获取地图信息
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

