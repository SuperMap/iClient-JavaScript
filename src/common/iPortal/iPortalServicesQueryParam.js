/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalServicesQueryParam
 * @classdesc iPortal 服务查询参数。
 * @category iPortal/Online
 * @param {Object} params - 服务参数。
 *
 */
export class IPortalServicesQueryParam {


    constructor(params) {
        params = params || {};
        this.tags = [];
        this.userNames = '';
        this.types = [];
        this.checkStatus = '';
        this.offline = false;
        this.orderBy = '';
        this.orderType = '';
        this.keywords = [];
        this.currentPage = 0;
        this.pageSize = 0;
        this.isBatch = false;
        this.dirIds = [];
        this.isNotInDir = false;
        this.filterFields = [];
        this.authorizedOnly = false;
        Util.extend(this, params);
    }

}

SuperMap.iPortalServicesQueryParam = IPortalServicesQueryParam;

