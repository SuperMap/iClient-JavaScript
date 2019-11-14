/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import {SuperMap} from '../SuperMap';
 import {Util} from '../commontypes/Util';
 
 /**
  * @class SuperMap.iPortalInsightsQueryParam
  * @classdesc iPortal 地图资源查询参数。
  * @category iPortal/Online
  * @param {Object} params - iPortal 地图资源查询具体参数。
  *
  */
 export class IPortalInsightsQueryParam {
 
    constructor(params) {
        params = params || {};
        this.createEnd = null;
        this.createStart = null;
        this.filterFields = null;
        this.orderBy = null;
        this.tags = null;
        this.userNames = null;
        this.currentPage = null;
        this.keywords = null;
        this.pageSize = null;
        this.currentUser = null;
        this.departmentIds = null;
        this.dirIds = null;
        this.groupIds = null;
        this.isNotInDir = false;
        this.permissionType = null;
        this.resourceIds = null;
        this.returnSubDir = null;
        this.searchScope = null;
        Util.extend(this, params);
    }
 
 }
 
 SuperMap.iPortalInsightsQueryParam = IPortalInsightsQueryParam;
 
 