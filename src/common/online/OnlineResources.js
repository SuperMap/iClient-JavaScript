/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
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
    /** 文件名。 */
    FILENAME: "FILENAME",
    /** ID。 */
    ID: "ID",
    /** 最后修改时间。 */
    LASTMODIFIEDTIME: "LASTMODIFIEDTIME",
    /** 作者昵称。 */
    NICKNAME: "NICKNAME",
    /** SERVICESTATUS。 */
    SERVICESTATUS: "SERVICESTATUS",
    /** 大小。 */
    SIZE: "SIZE",
    /** 状态。 */
    STATUS: "STATUS",
    /** 类型。 */
    TYPE: "TYPE",
    /** 更新时间。 */
    UPDATETIME: "UPDATETIME",
    /** 作者名。 */
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
    /** 服务地址。 */
    LINKPAGE: "LINKPAGE",
    /** 服务中包含的地图的名称。 */
    MAPTITLE: "MAPTITLE",
    /** 服务创建者昵称。 */
    NICKNAME: "NICKNAME",
    /** 服务名称。 */
    RESTITLE: "RESTITLE",
    /** 服务创建者用户名。 */
    USERNAME: "USERNAME"
};
export {
    ServiceStatus,
    DataItemOrderBy,
    FilterField
}
