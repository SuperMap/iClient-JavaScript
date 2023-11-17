/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class IPortalShareParam
 * @aliasclass iPortalShareParam
 * @deprecatedclass SuperMap.iPortalShareParam
 * @classdesc SuperMap iPortal 资源共享参数。
 * @version 10.0.1
 * @category iPortal/Online Resources ResourcesShare
 * @param {Object} params - 可选参数。
 * @param {ResourceType} [params.resourceType] - 资源类型。
 * @param {Array} [params.ids] - 资源的 ID 数组。
 * @param {IPortalShareEntity} [params.entities] - 资源的实体共享参数。
 * @usage
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

