/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';

/**
 * @class SuperMap.iPortalQueryResult
 * @classdesc iPortal 资源结果集封装类。
 * @category iPortal/Online
 * @param {string} resourceUrl - 资源地址。
 * @param {Object} [params] - 资源参数。
 *
 */
export class IPortalQueryResult {
    constructor(params) {
        params = params || {};
        this.content = [];
        this.total = 0;
        this.currentPage = 1;
        this.pageSize = 12;
        this.aggregations = null;
        Util.extend(this, params);
    }

}

SuperMap.iPortalQueryResult = IPortalQueryResult;

