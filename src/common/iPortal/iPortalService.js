import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {IPortalServiceBase} from './iPortalServiceBase';

/**
 * @class SuperMap.iPortalService
 * @classdesc iPortal服务
 * @extends SuperMap.iPortalServiceBase
 * @param seviceUrl -{string} 服务地址
 * @param params -{Object} 服务请求参数
 *
 */
export class IPortalService extends IPortalServiceBase {

    addedMapNames = null;
    addedSceneNames = null;
    authorizeSetting = [];
    checkStatus = "";
    createTime = 0;
    description = "";
    enable = true;
    id = 0;
    isBatch = false;
    isDataItemService = false;
    linkPage = null;
    mapInfos = [];
    metadata = null;
    nickname = "";
    offline = false;
    proxiedUrl = null;
    resTitle = "";
    scenes = [];
    serviceRootUrlId = null;
    tags = [];
    thumbnail = null;
    type = "";
    updateTime = 0;
    userName = "";
    verifyReason = null;
    version = null;
    visitCount = 0;

    constructor(serviceUrl, params) {
        super(serviceUrl);
        params = params || {};
        Util.extend(this, params);
        this.serviceUrl = serviceUrl;
        if (this.id) {
            this.serviceUrl = serviceUrl + "/" + this.id;
        }
    }

    /**
     * @function SuperMap.iPortalService.prototype.load
     * @description 加载服务信息
     * @returns {Promise} 返回Promise对象。如果成功，Promise没有返回值；如果失败，Promise返回值包含错误信息
     */

    load() {
        var me = this;
        return me.request("GET", me.serviceUrl + ".json")
            .then(function (serviceInfo) {
                if (serviceInfo.error) {
                    return serviceInfo;
                }
                for (var key in serviceInfo) {
                    me[key] = serviceInfo[key];
                }
            });
    }

    /**
     * @function SuperMap.iPortalService.prototype.update
     * @description 更新服务
     * @returns {Promise} 返回包含更新操作状态的Promise对象
     */
    update() {
        var serviceUpdateParam = {
            authorizeSetting: this.authorizeSetting,
            metadata: this.metadata,
            tags: this.tags,
            thumbnail: this.thumbnail
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.serviceUrl, JSON.stringify(serviceUpdateParam), options);
    }

}

SuperMap.iPortalService = IPortalService;

