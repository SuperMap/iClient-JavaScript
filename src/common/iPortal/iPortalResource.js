/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {IPortalServiceBase} from './iPortalServiceBase';
/**
 * @class SuperMap.iPortalResource
 * @classdesc iPortal 资源详情类。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {string} portalUrl - 资源地址。
 * @param {Object} resourceInfo - 资源详情参数。
 * @param {Array} [resourceInfo.authorizeSetting] - 资源的授权信息
 * @param {string} [resourceInfo.bounds] - 资源的坐标范围
 * @param {string} [resourceInfo.bounds4326] - 资源的坐标范围，转换为EPSG 4326坐标系统后的地理范围。
 * @param {string} [resourceInfo.checkStatus] - 资源的审核状态，可以是：空,SUCCESSFUL,UNCHECKED,FAILED
 * @param {Date} [resourceInfo.createTime] - 资源的创建时间
 * @param {string} [resourceInfo.description] - 资源描述
 * @param {number} [resourceInfo.dirId] - 资源所在的门户目录的id
 * @param {number} [resourceInfo.epsgCode] - 门户资源基于的坐标系的EPSG值。
 * @param {number} [resourceInfo.heatLevel] - 记录资源的访问量或下载量。
 * @param {string} [resourceInfo.id] - 资源存储到ElasticSearch中的文档id
 * @param {string} [resourceInfo.name] - 资源名称
 * @param {number} [resourceInfo.personalDirId] - 资源所在的个人目录的id
 * @param {number} [resourceInfo.resourceId] - 资源表(maps,services等)里的id
 * @param {string} [resourceInfo.resourceSubType] - 某类资源的具体子类型。
 * @param {SuperMap.ResourceType} [resourceInfo.resourceType] - 资源类型
 * @param {number} [resourceInfo.serviceRootUrlId] - 批量注册服务时，服务根地址的ID
 * @param {Array} [resourceInfo.tags] - 资源的标签
 * @param {string} [resourceInfo.thumbnail] - 资源的缩略图
 * @param {Date} [resourceInfo.updateTime] - 资源的更新时间
 * @param {string} [resourceInfo.userName] - 搜索的关键词
 * @param {Object} [resourceInfo.sourceJSON] - 提供了门户项目返回的所有信息。
 * @extends {SuperMap.iPortalServiceBase}
 */
export class IPortalResource extends IPortalServiceBase {
    constructor(portalUrl, resourceInfo) {
        super(portalUrl);
        resourceInfo = resourceInfo || {};
        this.authorizeSetting = [];
        this.bounds = "";
        this.bounds4326 = "";
        this.checkStatus = "";
        this.createTime = 0;
        this.description = null;
        this.dirId = null;
        this.epsgCode = 0;
        this.heatLevel = 0;
        this.id = 0;
        this.name = "";
        this.personalDirId = null;
        this.resourceId = 0;
        this.resourceSubType = null;
        this.resourceType = null;
        this.serviceRootUrlId = null;
        this.tags = null;
        this.thumbnail = null;
        this.updateTime = 0;
        this.userName = "";
        this.sourceJSON = {};//返回门户资源详细信息
        Util.extend(this, resourceInfo); // INSIGHTS_WORKSPACE MAP_DASHBOARD
        this.resourceUrl = portalUrl + "/web/"+this.resourceType.replace("_","").toLowerCase()+"s/" + this.resourceId;
        if (this.withCredentials) {
            this.resourceUrl = portalUrl + "/web/mycontent/"+this.resourceType.replace("_","").toLowerCase()+"s/" + this.resourceId;
        }
        // if (this.id) {
        //     this.mapUrl = mapUrl + "/" + this.id;
        // }
    }

    /**
     * @function SuperMap.iPortalResource.prototype.load
     * @description 加载资源信息。
     * @returns {Promise} 返回 Promise 对象。如果成功，Promise 没有返回值，请求返回结果自动填充到该类的属性中；如果失败，Promise 返回值包含错误信息。
     */
    load() {
        var me = this;
        return me.request("GET", me.resourceUrl + ".json")
            .then(function (resourceInfo) {
                if (resourceInfo.error) {
                    return resourceInfo;
                }
                me.sourceJSON = resourceInfo;
            });
    }

    /**
     * @function SuperMap.iPortalResource.prototype.update
     * @description 更新资源属性信息。
     * @returns {Promise} 返回包含更新操作状态的 Promise 对象。
     */
    update() {
        var resourceName = this.resourceType.replace("_","").toLowerCase();
        var options = {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        };
        if( resourceName === 'data') {
            this.resourceUrl = this.resourceUrl + "/attributes.json";
        }
        var entity = JSON.stringify(this.sourceJSON);
        //对服务资源进行编辑时，请求体内容只留关键字字段（目前如果是全部字段 更新返回成功 但其实没有真正的更新）
        if( resourceName === 'service') {
            var serviceInfo = {
                authorizeSetting:this.sourceJSON.authorizeSetting,
                metadata:this.sourceJSON.metadata,
                tags:this.sourceJSON.tags,
                thumbnail:this.sourceJSON.thumbnail,
                tokenRefreshUrl:this.sourceJSON.tokenRefreshUrl
            };
            entity = JSON.stringify(serviceInfo);
        }
        return this.request("PUT", this.resourceUrl, entity, options);
    }

}

SuperMap.iPortalResource = IPortalResource;

