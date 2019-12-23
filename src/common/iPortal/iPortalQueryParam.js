/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
 
/**
 * @class SuperMap.iPortalQueryParam
 * @classdesc iPortal 资源查询参数。
 * @category iPortal/Online
 * @param {Object} params - iPortal 资源查询具体参数。
 *
 */
export class IPortalQueryParam {

    constructor(params) {
        params = params || {};
        this.resourceType = ""; // 空为全部 MAP SERVICE SCENE DATA INSIGHTS_WORKSPACE MAP_DASHBOARD
        this.pageSize = 12; // 每页多少条
        this.currentPage = 1; // 第几页
        this.orderBy = "UPDATETIME"; // UPDATETIME HEATLEVEL
        this.orderType = "DESC"; // DESC ASC
        this.searchType = "PUBLIC"; // PUBLIC SHARETOME_RES MYDEPARTMENT_RES MYGROUP_RES MY_RES
        this.tags = [];  // 标签
        this.dirIds = []; // 类别
        this.resourceSubTypes = []; // 类型
        this.aggregationTypes = []; // TAG TYPE SUBTYPE
        this.text = ""; // 搜索字段
        this.groupIds = []; // 群组Id过滤
        this.departmentIds = []; // 部门Id过滤
        Util.extend(this, params);
    }
}
SuperMap.iPortalQueryParam = IPortalQueryParam;
 
 