/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
 
/**
 * @class SuperMap.iPortalShareParam
 * @classdesc iPortal 资源查询参数。
 * @category iPortal/Online
 * @param {Object} params - iPortal 资源查询具体参数。
 *
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
 
 