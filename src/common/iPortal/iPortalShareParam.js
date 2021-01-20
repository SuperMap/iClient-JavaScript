/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
 
/**
 * @class SuperMap.iPortalShareParam
 * @classdesc iPortal 资源共享参数。
 * @version 10.0.1
 * @category iPortal/Online
 * @param {Object} params - iPortal 资源共享具体参数。
 * @param {SuperMap.ResourceType} [params.resourceType] - 资源类型。
 * @param {Array} [params.ids] - 资源的id数组。
 * @param {SuperMap.iPortalShareEntity} [params.entities] - 资源的实体共享参数
 */
export class IPortalShareParam {

    constructor(params) {
        params = params || {};
        this.ids = [];
        this.entities = [];
        this.resourceType = ""; // MAP SERVICE SCENE DATA INSIGHTS_WORKSPACE MAP_DASHBOARD
        Util.extend(this, params);
    }
}
SuperMap.iPortalShareParam = IPortalShareParam;
 
 