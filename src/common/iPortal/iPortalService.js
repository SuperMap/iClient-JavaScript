/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {IPortalServiceBase} from './iPortalServiceBase';

/**
 * @class SuperMap.iPortalService
 * @classdesc iPortal 服务。
 * @category iPortal/Online
 * @extends {SuperMap.iPortalServiceBase}
 * @param {string} seviceUrl - 服务地址。
 * @param {Object} params - 服务请求参数。
 * @param {boolean} [params.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [params.crossOrigin] - 请求是否携带 cookie。 * 
 */
export class IPortalService extends IPortalServiceBase {



    constructor(serviceUrl, params) {
        super(serviceUrl, params);
        params = params || {};
        this.addedMapNames = null;
        this.addedSceneNames = null;
        this.authorizeSetting = [];
        this.checkStatus = "";
        this.createTime = 0;
        this.description = "";
        this.enable = true;
        this.id = 0;
        this.isBatch = false;
        this.isDataItemService = false;
        this.linkPage = null;
        this.mapInfos = [];
        this.metadata = null;
        this.nickname = "";
        this.offline = false;
        this.proxiedUrl = null;
        this.resTitle = "";
        this.scenes = [];
        this.serviceRootUrlId = null;
        this.tags = [];
        this.thumbnail = null;
        this.type = "";
        this.updateTime = 0;
        this.userName = "";
        this.verifyReason = null;
        this.version = null;
        this.visitCount = 0;
        Util.extend(this, params);
        this.serviceUrl = serviceUrl;
        if (this.id) {
            this.serviceUrl = serviceUrl + "/" + this.id;
        }
    }

    /**
     * @function SuperMap.iPortalService.prototype.load
     * @description 加载服务信息。
     * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值；如果失败，Promise 返回值包含错误信息。
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
     * @description 更新服务。
     * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
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

