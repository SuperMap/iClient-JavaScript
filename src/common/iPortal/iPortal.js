/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { SuperMap } from "../SuperMap";
import { IPortalServicesQueryParam } from "./iPortalServicesQueryParam";
import { IPortalMapsQueryParam } from "./iPortalMapsQueryParam";
import { IPortalInsightsQueryParam } from "./iPortalInsightsQueryParam";
import { IPortalScenesQueryParam } from "./iPortalScenesQueryParam";
import { FetchRequest } from "../util/FetchRequest";
import { IPortalService } from "./iPortalService";
import { IPortalMap } from "./iPortalMap";
import { IPortalInsight } from "./iPortalInsight";
import { IPortalScene } from "./iPortalScene";
import { IPortalServiceBase } from "./iPortalServiceBase";

/**
 * @class SuperMap.iPortal
 * @classdesc 对接 SuperMap iPortal 基础服务。
 * @category iPortal/Online
 * @extends {SuperMap.iPortalServiceBase}
 * @param {string} iportalUrl - 地址。
 */
export class IPortal extends IPortalServiceBase {
    constructor(iportalUrl, options) {
        super(iportalUrl, options);
        this.iportalUrl = iportalUrl;
        options = options || {};
        this.withCredentials = options.withCredentials || false;
    }

    /**
     * @function SuperMap.iPortal.prototype.load
     * @description 加载页面。
     * @returns {Promise} 返回包含 iportal web 资源信息的 Promise 对象。
     */
    load() {
        return FetchRequest.get(this.iportalUrl + "/web");
    }

    /**
     * @function SuperMap.iPortal.prototype.queryServices
     * @description 查询服务。
     * @param {SuperMap.iPortalServicesQueryParam} queryParams - 查询参数。
     * @returns {Promise} 返回包含所有服务的 Promise 对象。
     */
    queryServices(queryParams) {
        if (!(queryParams instanceof IPortalServicesQueryParam)) {
            return null;
        }
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("GET", serviceUrl, queryParams).then(function(result) {
            var services = [];
            result.content.map(function(serviceJsonObj) {
                services.push(new IPortalService(serviceUrl, serviceJsonObj));
                return serviceJsonObj;
            });
            return services;
        });
    }

    /**
     * @function SuperMap.iPortal.prototype.deleteServices
     * @param {Array} ids - 服务的序号。
     * @description 删除服务。
     * @returns {Promise} 返回包含服务删除操作状态的 Promise 对象。
     */
    deleteServices(ids) {
        var serviceUrl = this.iportalUrl + "/web/services";
        return this.request("DELETE", serviceUrl, { ids: ids });
    }

    /**
     * @function SuperMap.iPortal.prototype.queryMaps
     * @param {SuperMap.iPortalMapsQueryParam} queryParams - 查询参数。
     * @description 获取地图信息。
     * @returns {Promise} 返回包含所有地图服务信息的 Promise 对象。
     */
    queryMaps(queryParams) {
        if (!(queryParams instanceof IPortalMapsQueryParam)) {
            return null;
        }
        let mapsUrl;
        if (this.withCredentials) {
            mapsUrl = this.iportalUrl + "/web/mycontent/maps";
        } else {
            mapsUrl = this.iportalUrl + "/web/maps";
        }
        return this.request("GET", mapsUrl, queryParams).then(function(result) {
            var mapRetult = {content:[]};
            var maps = [];
            if (result.content && result.content.length > 0) {
                result.content.map(function(mapJsonObj) {
                    maps.push(new IPortalMap(mapsUrl + "/" + mapJsonObj.id, mapJsonObj));
                    return mapJsonObj;
                });
                mapRetult.content = maps;
                mapRetult.currentPage = result.currentPage;
                mapRetult.pageSize = result.pageSize;
                mapRetult.total = result.total;
                mapRetult.totalPage = result.totalPage;
            }
            return mapRetult;
        });
    }

    /**
     * @function SuperMap.iPortal.prototype.queryInsights
     * @param {SuperMap.iPortalInsightsQueryParam} queryParams - 查询参数。
     * @description 获取洞察信息。
     * @returns {Promise} 返回包含所有洞察服务信息的 Promise 对象。
     */
    queryInsights(queryParams) {
        if (!(queryParams instanceof IPortalInsightsQueryParam)) {
            return null;
        }
        let insightsUrl;
        if (this.withCredentials) {
            insightsUrl = this.iportalUrl + "web/mycontent/insightsworkspaces";
        } else {
            insightsUrl = this.iportalUrl + "/web/insightsworkspaces";
        }
        return this.request("GET", insightsUrl, queryParams).then(function(result) {
            var insightRetult = {content:[]};
            var insights = [];
            if (result.content && result.content.length > 0) {
                result.content.map(function(insightJsonObj) {
                    insights.push(new IPortalInsight(insightsUrl + "/" + insightJsonObj.id, insightJsonObj));
                    return insightJsonObj;
                });
                insightRetult.content = insights;
                insightRetult.currentPage = result.currentPage;
                insightRetult.pageSize = result.pageSize;
                insightRetult.total = result.total;
                insightRetult.totalPage = result.totalPage;
            }
            return insightRetult; 
        });
    }

    /**
     * @function SuperMap.iPortal.prototype.deleteInsights
     * @param {Array} ids - 洞察的序号。
     * @description 删除洞察。
     * @returns {Promise} 返回包含洞察删除操作状态的 Promise 对象。
     */
    deleteInsights(ids) {
        var insightUrl = this.iportalUrl + "/web/insightsworkspaces.json";
        return this.request("DELETE", insightUrl, { ids: encodeURI(JSON.stringify(ids)) });
    }

    /**
     * @function SuperMap.iPortal.prototype.viewInsightDetail
     * @param {Array} ids - 洞察的序号。
     * @description 查看某个洞察资源的详情。
     * @returns {Promise} 返回包含某条洞察资源操作状态的 Promise 对象。
     */
    queryInsight(id){
        var insightUrl = this.iportalUrl + "/web/insightsworkspaces/"+id;
        var insight = new IPortalInsight(insightUrl);
        return insight.load().then(()=>{
            return insight
        })
    }

    /**
     * @function SuperMap.iPortal.prototype.updateInsight
     * @param {Array} ids - 洞察的序号。
     * @description 更新某个洞察信息。
     * @returns {Promise} 返回包含更新洞察属性操作状态的 Promise 对象。
     */
    updateInsightAttrs(id,updateParam){
        var insightAttributesUrl = this.iportalUrl + "/web/insightsworkspaces/"+id+"/attributes.json";
        return new IPortalInsight(insightAttributesUrl, updateParam).update();
    }

    /**
     * @function SuperMap.iPortal.prototype.deleteScenes
     * @param {Array} ids - 场景的序号。
     * @description 删除场景。
     * @returns {Promise} 返回包含场景删除操作状态的 Promise 对象。
     */
    deleteScenes(ids) {
        var sceneUrl = this.iportalUrl + "/web/scenes.json";
        return this.request("DELETE", sceneUrl, { ids: encodeURI(JSON.stringify(ids)) });
    }

    /**
     * @function SuperMap.iPortal.prototype.queryScenes
     * @param {SuperMap.iPortalScenesQueryParam} queryParams - 查询参数。
     * @description 获取场景信息。
     * @returns {Promise} 返回包含所有场景服务信息的 Promise 对象。
     */
    queryScenes(queryParams) {
        if (!(queryParams instanceof IPortalScenesQueryParam)) {
            return null;
        }
        let scenesUrl;
        if (this.withCredentials) {
            scenesUrl = this.iportalUrl + "/web/mycontent/scenes";
        } else {
            scenesUrl = this.iportalUrl + "/web/scenes";
        }
        return this.request("GET", scenesUrl, queryParams).then(function(result) {
            var sceneRetult = {content:[]};
            var scenes = [];
            if (result.content && result.content.length > 0) {
                result.content.map(function(sceneJsonObj) {
                    scenes.push(new IPortalScene(scenesUrl + "/" + sceneJsonObj.id, sceneJsonObj));
                    return sceneJsonObj;
                });
                sceneRetult.content = scenes;
                sceneRetult.currentPage = result.currentPage;
                sceneRetult.pageSize = result.pageSize;
                sceneRetult.total = result.total;
                sceneRetult.totalPage = result.totalPage;
            }
            return sceneRetult;
        });
    }
}

SuperMap.iPortal = IPortal;
