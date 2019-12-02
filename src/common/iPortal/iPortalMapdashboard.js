/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
 import {IPortalServiceBase} from './iPortalServiceBase';
 
/**
 * @class SuperMap.iPortalMapdashboard
 * @classdesc iPortal 大屏服务类。
 * @category iPortal/Online
 * @param {string} mapdashboardUrl - 大屏地址。
 * @param {Object} [params] - 服务参数。
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export class IPortalMapdashboard extends IPortalServiceBase {


    constructor(mapdashboardUrl, params) {
        super(mapdashboardUrl);
        params = params || {};
        this.authorizeSetting = [];
        this.content = "";
        this.createTime = 0;
        this.description = "";
        this.id = 0;
        this.name = "";
        this.nickname = "";
        this.tags = [];
        this.thumbnail = "";
        this.updateTime = 0;
        this.userName = "";
        this.visitCount = 0;
        Util.extend(this, params);
        this.mapdashboardUrl = mapdashboardUrl;
    }

    /**
     * @function SuperMap.iPortalMapdashboard.prototype.load
     * @description 加载大屏信息。
     * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值，请求返回结果自动填充到该类的属性中；如果失败，Promise 返回值包含错误信息。
     */
    load() {
        var me = this;
        return me.request("GET", me.mapdashboardUrl + ".json")
            .then(function (mapdashboardInfo) {
                if (mapdashboardInfo.error) {
                    return mapdashboardInfo;
                }
                for (var key in mapdashboardInfo) {
                    me[key] = mapdashboardInfo[key];
                }
            });
    }

    /**
     * @function SuperMap.iPortalMapdashboard.prototype.update
     * @description 更新大屏参数。
     * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
     */
    update() {
        var mapdashboardUpdateParam = {
            authorizeSetting: this.authorizeSetting,
            description: this.description,
            name: this.name,
            tags: this.tags,
            thumbnail: this.thumbnail
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.mapdashboardUrl, JSON.stringify(mapdashboardUpdateParam), options);
    }

}

SuperMap.iPortalMapdashboard = IPortalMapdashboard;