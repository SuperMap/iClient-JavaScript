/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @enum ServiceStatus
 * @category BaseTypes Constant
 * @description 服务发布状态。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.ServiceStatus.DOES_NOT_INVOLVE;
 *
 * </script>
 * // ES6 Import
 * import { ServiceStatus } from '{npm}';
 *
 * const result = ServiceStatus.DOES_NOT_INVOLVE;
 * ```
 */
var ServiceStatus = {
    /** 不涉及，不可发布。 */
    DOES_NOT_INVOLVE: "DOES_NOT_INVOLVE",
    /** 发布失败。 */
    PUBLISH_FAILED: "PUBLISH_FAILED",
    /** 已发布。 */
    PUBLISHED: "PUBLISHED",
    /** 正在发布。 */
    PUBLISHING: "PUBLISHING",
    /** 未发布。 */
    UNPUBLISHED: "UNPUBLISHED",
    /** 取消服务失败。 */
    UNPUBLISHED_FAILED: "UNPUBLISHED_FAILED"
};


/**
 * @enum DataItemOrderBy
 * @category BaseTypes Constant
 * @description 数据排序字段。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.DataItemOrderBy.FILENAME;
 *
 * </script>
 * // ES6 Import
 * import { DataItemOrderBy } from '{npm}';
 * 
 * const result = DataItemOrderBy.FILENAME;
 * ```
 */
var DataItemOrderBy = {
    /** FILENAME */
    FILENAME: "FILENAME",
    /** ID */
    ID: "ID",
    /** LASTMODIFIEDTIME */
    LASTMODIFIEDTIME: "LASTMODIFIEDTIME",
    /** NICKNAME */
    NICKNAME: "NICKNAME",
    /** SERVICESTATUS */
    SERVICESTATUS: "SERVICESTATUS",
    /** SIZE */
    SIZE: "SIZE",
    /** STATUS */
    STATUS: "STATUS",
    /** TYPE */
    TYPE: "TYPE",
    /** UPDATETIME */
    UPDATETIME: "UPDATETIME",
    /** USERNAME */
    USERNAME: "USERNAME"
};

/**
 * @enum FilterField {number}
 * @category BaseTypes Constant
 * @description 关键字查询时的过滤字段。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.FilterField.LINKPAGE;
 *
 * </script>
 * // ES6 Import
 * import { FilterField } from '{npm}';
 *
 * const result = FilterField.LINKPAGE;
 * ```
 */
var FilterField = {
    /** LINKPAGE */
    LINKPAGE: "LINKPAGE",
    /** MAPTITLE */
    MAPTITLE: "MAPTITLE",
    /** NICKNAME */
    NICKNAME: "NICKNAME",
    /** RESTITLE */
    RESTITLE: "RESTITLE",
    /** USERNAME */
    USERNAME: "USERNAME"
};
export {
    ServiceStatus,
    DataItemOrderBy,
    FilterField
}
