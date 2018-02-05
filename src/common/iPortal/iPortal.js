import {SuperMap} from '../SuperMap';
import {IPortalServicesQueryParam} from './iPortalServicesQueryParam';
import {IPortalMapsQueryParam} from './iPortalMapsQueryParam';
import {FetchRequest} from '../util/FetchRequest';
import {IPortalService} from './iPortalService';
import {IPortalMap} from './iPortalMap';
import {IPortalServiceBase} from './iPortalServiceBase';

/**
 * @class SuperMap.iPortal
 * @classdesc 对接SuperMap iPortal 基础服务
 * @category iPortal/Online
 * @extends SuperMap.iPortalServiceBase
 * @param iportalUrl -{string} 地址
 *
 */
export class IPortal extends IPortalServiceBase {

    constructor(iportalUrl) {
        super(iportalUrl);
        this.iportalUrl = iportalUrl;
    }

    /**
     * @function SuperMap.iPortal.prototype.load
     * @description 加载页面
     * @returns {Promise} 返回包含iportal web资源信息的Promise对象
     */
    load() {
        return FetchRequest.get(this.iportalUrl + '/web');
    }

    /**
     * @function SuperMap.iPortal.prototype.queryServices
     * @param queryParams -{SuperMap.iPortalServicesQueryParam} 查询参数
     * @description 查询服务
     * @returns {Promise} 返回包含所有服务的Promise对象
     */
    queryServices(queryParams) {
        if (!(queryParams instanceof IPortalServicesQueryParam)) {
            return null;
        }
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("GET", serviceUrl, queryParams).then(function (result) {
            var services = [];
            result.content.map(function (serviceJsonObj) {
                services.push(new IPortalService(serviceUrl, serviceJsonObj));
                return serviceJsonObj;
            });
            return services;
        });
    }

    /**
     * @function SuperMap.iPortal.prototype.deleteServices
     * @param ids -{Array} 服务的序号
     * @description 删除服务
     * @returns {Promise} 返回包含服务删除操作状态的Promise对象
     */
    deleteServices(ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("DELETE", serviceUrl, {ids: ids});
    }

    /**
     * @function SuperMap.iPortal.prototype.queryMaps
     * @param queryParams -{SuperMap.iPortalMapsQueryParam} 查询参数
     * @description 获取地图信息
     * @returns {Promise} 返回包含所有地图服务信息的Promise对象
     */
    queryMaps(queryParams) {
        if (!(queryParams instanceof IPortalMapsQueryParam)) {
            return null;
        }
        var mapsUrl = this.iportalUrl + "/web/maps";
        return this.request("GET", mapsUrl, queryParams).then(function (result) {
            var mapRetult = {};
            var maps = [];
            result.content.map(function (mapJsonObj) {
                maps.push(new IPortalMap(mapsUrl + "/" + mapJsonObj.id, mapJsonObj));
                return mapJsonObj;
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

