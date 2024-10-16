/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {IManagerServiceBase} from './iManagerServiceBase';
import {IManagerCreateNodeParam} from './iManagerCreateNodeParam';

/**
 * @class IManager
 * @aliasclass iManager
 * @deprecatedclass SuperMap.iManager
 * @classdesc iManager 服务类。
 * @category iManager
 * @modulecategory Services
 * @param {string} serviceUrl - iManager 首页地址。
 * @usage
 */
export class IManager extends IManagerServiceBase {

    constructor(iManagerUrl) {
        super(iManagerUrl);
    }

    /**
     * @function IManager.prototype.load
     * @description 获取所有服务接口，验证是否已登录授权。
     * @returns {Promise} Promise 对象。
     */
    load() {
        return this.request("GET", this.serviceUrl + '/web/api/service.json');
    }

    /**
     * @function IManager.prototype.createIServer
     * @param {IManagerCreateNodeParam} createParam - 创建参数。
     * @description 创建 iServer。
     * @returns {Promise} Promise 对象。
     */
    createIServer(createParam) {
        return this.request("POST", this.serviceUrl + '/cloud/web/nodes/server.json', new IManagerCreateNodeParam(createParam));
    }

    /**
     * @function IManager.prototype.createIPortal
     * @param {IManagerCreateNodeParam} createParam - 创建参数。
     * @description 创建 iPortal。
     * @returns {Promise} Promise 对象。
     */
    createIPortal(createParam) {
        return this.request("POST", this.serviceUrl + '/icloud/web/nodes/portal.json', new IManagerCreateNodeParam(createParam));
    }

    /**
     * @function IManager.prototype.iServerList
     * @description 获取所有创建的 iServer。
     * @returns {Promise} Promise 对象。
     */
    iServerList() {
        return this.request("GET", this.serviceUrl + '/cloud/web/nodes/server.json');
    }

    /**
     * @function IManager.prototype.iPortalList
     * @description 获取所有创建的 iPortal。
     * @returns {Promise} Promise 对象。
     */
    iPortalList() {
        return this.request("GET", this.serviceUrl + '/icloud/web/nodes/portal.json');
    }

    /**
     * @function IManager.prototype.startNodes
     * @param {Array.<string>} ids - 需要启动节点的 ID 数组。e.g:['1']。
     * @description 启动节点。
     * @returns {Promise} Promise 对象。
     */
    startNodes(ids) {
        return this.request("POST", this.serviceUrl + '/cloud/web/nodes/started.json', ids);
    }

    /**
     * @function IManager.prototype.stopNodes
     * @param {Array.<string>} ids - 需要停止节点的 ID 数组。e.g:['1']。
     * @description 停止节点。
     * @returns {Promise} Promise 对象。
     */
    stopNodes(ids) {
        return this.request("POST", this.serviceUrl + '/cloud/web/nodes/stopped.json', ids);
    }
}

