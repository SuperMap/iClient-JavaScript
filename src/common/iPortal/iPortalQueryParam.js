/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class IPortalQueryParam
 * @aliasclass iPortalQueryParam
 * @deprecatedclass SuperMap.iPortalQueryParam
 * @classdesc iPortal 资源查询参数。
 * @version 10.0.1
 * @category iPortal/Online Resources ResourcesQuery
 * @param {Object} params - 可选参数。
 * @param {ResourceType} [params.resourceType] - 资源类型
 * @param {number} [params.pageSize] - 分页中每页大小。
 * @param {number} [params.currentPage] - 分页页码。
 * @param {OrderBy} [params.orderBy] - 排序字段。
 * @param {OrderType} [params.orderType] - 根据升序还是降序过滤。
 * @param {SearchType} [params.searchType] - 根据查询的范围进行过滤。
 * @param {Array} [params.tags] - 标签。
 * @param {Array} [params.dirIds] - 目录 id
 * @param {Array} [params.resourceSubTypes] - 根据资源的子类型进行过滤。
 * @param {AggregationTypes} [params.aggregationTypes] - 聚合查询的类型。
 * @param {string} [params.text] - 	搜索的关键词。
 * @param {Array} [params.groupIds] - 	根据群组进行过滤。
 * @param {Array} [params.departmentIds] - 根据部门进行过滤。
 * @usage
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

