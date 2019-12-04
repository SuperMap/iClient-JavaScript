/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
 
/**
 * @class SuperMap.iPortalShareEntity
 * @classdesc iPortal 资源查询参数。
 * @category iPortal/Online
 * @param {Object} params - iPortal 资源查询具体参数。
 *
 */
export class IPortalShareEntity {

    constructor(params) {
        params = params || {};
        this.permissionType = ""; // SEARCH READ READWRITE DOWNLOAD
        this.entityType = ""; // USER DEPARTMENT IPORTALGROUP
        this.entityName = "GUEST"; // GUEST or 具体用户 name
        this.entityId = null;
        Util.extend(this, params);
    }
}
SuperMap.iPortalShareEntity = IPortalShareEntity;
 
 