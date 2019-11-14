/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalMapdashboardsQueryParam
 * @classdesc iPortal 大屏资源查询参数。
 * @category iPortal/Online
 * @param {Object} params - iPortal 大屏资源查询具体参数。
 *
 */
export class IPortalMapdashboardsQueryParam {


    constructor(params) {
        params = params || {};
        this.userNames = null;
        this.tags = null;
        this.orderBy = null;
        this.filterFields = null;
        this.currentUser = null;
        this.dirIds = null;
        this.returnSubDir = false;
        this.isNotInDir = false;
        this.groupIds = null;
        this.departmentIds = null;
        this.resourceIds = null;
        this.searchScope = null;
        this.permissionType = null;
        this.keywords = null;
        this.currentPage = null;
        this.pageSize = null;
        this.orderType = null;
        Util.extend(this, params);
    }

}

SuperMap.iPortalMapdashboardsQueryParam = IPortalMapdashboardsQueryParam;