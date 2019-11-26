/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {IPortalServiceBase} from './iPortalServiceBase';

/**
 * @class SuperMap.IPortalResource
 * @classdesc iPortal 资源详情类。
 * @category iPortal/Online
 * @param {string} resourceUrl - 资源地址。
 * @param {Object} [resourceInfo] - 资源详情参数。
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export class IPortalResource extends IPortalServiceBase {
    constructor(mapUrl, resourceInfo) {
        super(mapUrl);
        resourceInfo = resourceInfo || {};
        this.authorizeSetting = [];
        this.center = "";
        this.controls = null;
        this.checkStatus = "";
        this.createTime = 0;
        this.description = "";
        this.epsgCode = 0;
        this.extent = "";
        this.id = 0;
        this.isDefaultBottomMap = false;
        this.layers = [];
        this.level = null;
        this.nickname = "";
        this.sourceType = "";
        this.status = null;
        this.tags = [];
        this.thumbnail = "";
        this.title = "";
        this.units = null;
        this.updateTime = 0;
        this.userName = "";
        this.visitCount = 0;
        Util.extend(this, resourceInfo);
        this.mapUrl = mapUrl;
        // if (this.id) {
        //     this.mapUrl = mapUrl + "/" + this.id;
        // }
    }

    /**
     * @function SuperMap.iPortalMap.prototype.load
     * @description 加载地图信息。
     * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值，请求返回结果自动填充到该类的属性中；如果失败，Promise 返回值包含错误信息。
     */
    load() {
        var me = this;
        return me.request("GET", me.mapUrl + ".json")
            .then(function (mapInfo) {
                if (mapInfo.error) {
                    return mapInfo;
                }
                for (var key in mapInfo) {
                    me[key] = mapInfo[key];
                }
            });
    }

    /**
     * @function SuperMap.iPortalMap.prototype.update
     * @description 更新地图参数。
     * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
     */
    update() {
        var mapUpdateParam = {
            units: this.units,
            level: this.level,
            center: this.center,
            controls: this.controls,
            description: this.description,
            epsgCode: this.epsgCode,
            extent: this.extent,
            status: this.status,
            tags: this.tags,
            layers: this.layers,
            title: this.title,
            thumbnail: this.thumbnail,
            sourceType: this.sourceType,
            authorizeSetting: this.authorizeSetting
        };
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        return this.request("PUT", this.mapUrl, JSON.stringify(mapUpdateParam), options);
    }

}

SuperMap.iPortalMap = IPortalResource;

