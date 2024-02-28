/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class IPortalShareEntity
 * @aliasclass iPortalShareEntity
 * @deprecatedclass SuperMap.iPortalShareEntity
 * @classdesc SuperMap iPortal 资源共享实体参数。
 * @version 10.0.1
 * @category iPortal/Online Resources ResourcesShare
 * @param {Object} shareEntity - 可选参数。
 * @param {PermissionType} [shareEntity.permissionType] - 权限类型。
 * @param {EntityType} [shareEntity.entityType] - 实体类型。
 * @param {string} [shareEntity.entityName] - 实体 Name。对应的 USER（用户）、ROLE（角色）、GROUP（用户组）、IPORTALGROUP（群组）的名称。
 * @param {number} [shareEntity.entityId] - 实体的 ID。用于群组的授权。
 * @usage
 */
export class IPortalShareEntity {

    constructor(shareEntity) {
        shareEntity = shareEntity || {};
        this.permissionType = ""; // SEARCH READ READWRITE DOWNLOAD
        this.entityType = ""; // USER DEPARTMENT IPORTALGROUP
        this.entityName = "GUEST"; // GUEST or 具体用户 name
        this.entityId = null;
        Util.extend(this, shareEntity);
    }
}

