/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {IPortalServiceBase} from './iPortalServiceBase';
import {IPortalAddResourceParam} from './iPortalAddResourceParam';
import {IPortalRegisterServiceParam} from "./iPortalRegisterServiceParam";
/**
 * @class SuperMap.iPortalUser
 * @classdesc iPortal 门户中用户信息的封装类。用于管理用户资源，包括可删除，添加资源。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {string} iportalUrl - iportal根地址。
 * @extends {SuperMap.iPortalServiceBase}
 *
 */
export class IPortalUser extends IPortalServiceBase {
    constructor(iportalUrl) {
        super(iportalUrl);
        this.iportalUrl = iportalUrl;
    }

    /**
     * @function SuperMap.iPortalUser.prototype.deleteResources
     * @description 删除资源。
     * @param {Object} params - 删除资源所需的参数对象：{ids,resourceType}。
     * @returns {Promise} 返回包含删除操作状态的 Promise 对象。
     */
    deleteResources(params) {
        var resourceName = params.resourceType.replace("_","").toLowerCase();
        var deleteResourceUrl = this.iportalUrl+"/web/" + resourceName +"s.json?ids=" + encodeURI(JSON.stringify(params.ids));
        if( resourceName === 'data') {
            deleteResourceUrl = this.iportalUrl + "/web/mycontent/datas/delete.json";
            return this.request("POST", deleteResourceUrl, JSON.stringify(params.ids));
        }
        return this.request("DELETE", deleteResourceUrl);
    }

    /**
     * @function SuperMap.iPortalUser.prototype.addMap
     * @description 添加地图。
     * @version 10.0.1
     * @param {SuperMap.iPortalAddResourceParam} addMapParams - 添加地图的参数。
     * @returns {Promise} 返回包含添加地图结果的 Promise 对象。
     */
    addMap(addMapParams) {
        if (!(addMapParams instanceof IPortalAddResourceParam)) {
            this.getErrMsgPromise("addMapParams is not instanceof IPortalAddResourceParam !");
        }
        let cloneAddMapParams = {
            rootUrl: addMapParams.rootUrl,
            tags: addMapParams.tags,
            authorizeSetting: addMapParams.entities
        }
        let addMapUrl = this.iportalUrl + "/web/maps/batchaddmaps.json";
        return this.request("POST", addMapUrl, JSON.stringify(cloneAddMapParams)).then(function(result) {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.addScene
     * @description 添加场景。
     * @version 10.0.1
     * @param {SuperMap.iPortalAddResourceParam} addSceneParams - 添加场景的参数。
     * @returns {Promise} 返回包含添加场景结果的 Promise 对象。
     */
    addScene(addSceneParams) {
        if (!(addSceneParams instanceof IPortalAddResourceParam)) {
            this.getErrMsgPromise("addSceneParams is not instanceof IPortalAddResourceParam !");
        }
        let cloneAddSceneParams = {
            rootUrl: addSceneParams.rootUrl,
            tags: addSceneParams.tags,
            authorizeSetting: addSceneParams.entities
        }
        let addSceneUrl = this.iportalUrl + "/web/scenes/batchaddscenes.json";
        return this.request("POST", addSceneUrl, JSON.stringify(cloneAddSceneParams)).then(function(result) {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.registerService
     * @description 注册服务。
     * @version 10.0.1
     * @param {SuperMap.iPortalRegisterServiceParam} registerParams - 注册服务的参数。
     * @returns {Promise} 返回包含注册服务结果的 Promise 对象。
     */
    registerService(registerParams) {
        if(!(registerParams instanceof IPortalRegisterServiceParam)) {
            this.getErrMsgPromise("registerParams is not instanceof IPortalRegisterServiceParam !");
        }
        let cloneRegisterParams = {
            type: registerParams.type,
            tags: registerParams.tags,
            authorizeSetting: registerParams.entities,
            metadata: registerParams.metadata,
            addedMapNames: registerParams.addedMapNames,
            addedSceneNames: registerParams.addedSceneNames
        }
        let registerUrl = this.iportalUrl + "/web/services.json";
        return this.request("POST", registerUrl, JSON.stringify(cloneRegisterParams)).then(result => {
            return result;
        });
    }

    /**
     * @function SuperMap.iPortalUser.prototype.getErrMsgPromise
     * @description 获取包含错误信息的Promise对象。
     * @version 10.0.1
     * @param {String} errMsg - 传入的错误信息。
     * @returns {Promise} 返回包含错误信息的 Promise 对象。
     */
    getErrMsgPromise(errMsg) {
        return new Promise(resolve => {
            resolve(errMsg);
        })
    }
}

SuperMap.iPortalUser = IPortalUser;