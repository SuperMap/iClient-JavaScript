/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {IPortalServiceBase} from './iPortalServiceBase';
/**
 * @class SuperMap.IPortalUser
 * @classdesc iPortal 门户中用户信息的封装类。用于管理用户资源，包括可删除，添加资源。
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
     * @function SuperMap.prototype.deleteResources
     * @description 删除资源。
     * @param {Object} deleteParams - 删除资源所需的参数对象：{ids,resourceType}。
     * @returns {Promise} 返回包含删除操作状态的 Promise 对象。
     */
    deleteResources(deleteParams) {
        var resourceName = deleteParams.resourceType.replace("_","").toLowerCase();
        var deleteResourceUrl = this.iportalUrl+"/web/" + resourceName +"s.json?ids=" + encodeURI(JSON.stringify(deleteParams.ids));
        if( resourceName === 'data') {
            deleteResourceUrl = this.iportalUrl + "/web/mycontent/datas/delete.json";
            return this.request("POST", deleteResourceUrl, JSON.stringify(deleteParams.ids));
        }
        return this.request("DELETE", deleteResourceUrl);
    }
}

SuperMap.iPortalUser = IPortalUser;