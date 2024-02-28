/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class JoinItem
 * @deprecatedclass SuperMap.JoinItem
 * @category iServer Data FeatureResults
 * @classdesc 连接信息类。
 * 该类用于矢量数据集与外部表的连接。外部表可以为另一个矢量数据集（其中纯属性数据集中没有空间几何信息）所对应的 DBMS 表，也可以是用户自建的业务表。
 * 需要注意的是，矢量数据集与外部表必须属于同一数据源。<br>
 * 表之间的联系的建立有两种方式，一种是连接（join），一种是关联（link）。
 * 连接，实际上是依据相同的字段将一个外部表追加到指定的表；而关联是基于一个相同的字段定义了两个表格之间的联系，但不是实际的追加。
 * 用于连接两个表的字段的名称不一定相同，但类型必须一致。当两个表格之间建立了连接，通过对主表进行操作，可以对外部表进行查询，制作专题图以及分析等。
 * 当两个表格之间是一对一或多对一的关系时，可以使用 join 连接。当为多对一的关系时，允许指定多个字段之间的关联。<br>
 * 注意：JoinItem 目前支持左连接和内连接，不支持全连接和右连接，UDB 引擎不支持内连接。并且用于建立连接的两个表必须在同一个数据源下。
 * @param {Object} options - 参数。
 * @param {string} options.foreignTableName - 外部表的名称。
 * @param {string} options.joinFilter - 矢量数据集与外部表之间的连接表达式，即设定两个表之间关联的字段。
 * @param {JoinType} options.joinType - 两个表之间连接类型。
 * @example 下面以 SQL 查询说明 joinItem 的使用方法：
 *(start code)
 *   function queryBySQL() {
     *       // 设置与外部表的连接信息
     *       var joinItem = new JoinItem({
     *           foreignTableName: "foreignTable",
     *           joinFilter: "foreignTable.CONTINENT = Countries.CONTINENT",
     *           joinType: "LEFTJOIN"
     *       })
     *       var queryParam, queryBySQLParams, queryBySQLService;
     *       // 设置查询参数，在查询参数中添加joinItem关联条件信息
     *       queryParam = new FilterParameter({
     *            name: "Countries@World",
     *            joinItems: [joinItem]
     *         }),
     *       queryBySQLParams = new QueryBySQLParameters({
     *             queryParams: [queryParam]
     *         }),
     *       queryBySQLService = new QueryBySQLService(url);
     *       queryBySQLService.processAsync(queryBySQLParams, processCompleted);
     *  }
 *  function processCompleted(queryEventArgs) {//todo}
 *  function processFailed(e) {//todo}
 * (end)
 * @usage
 */
export class JoinItem {

    constructor(options) {
        /**
         * @member {string} JoinItem.prototype.foreignTableName
         * @description 外部表的名称。
         * 如果外部表的名称是以 “表名@数据源名” 命名方式，则该属性只需赋值表名。
         * 例如：外部表 Name@changchun，Name 为表名，changchun 为数据源名称，则该属性的赋值应为：Name。
         */
        this.foreignTableName = null;

        /**
         * @member {string} JoinItem.prototype.joinFilter
         * @description 矢量数据集与外部表之间的连接表达式，即设定两个表之间关联的字段。
         * 例如，将房屋面数据集（Building）的 district 字段与房屋拥有者的纯属性数据集（Owner）的 region 字段相连接，
         * 两个数据集对应的表名称分别为 Table_Building 和 Table_Owner，
         * 则连接表达式为 Table_Building.district = Table_Owner.region。
         * 当有多个字段相连接时，用 AND 将多个表达式相连。
         */
        this.joinFilter = null;

        /**
         * @member {JoinType} JoinItem.prototype.joinType
         * @description 两个表之间连接类型。
         * 连接类型决定了对两个表进行连接查询后返回的记录的情况。支持左连接 LEFTJOIN 和内连接 INNERJOIN。
         */
        this.joinType = null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.JoinItem";
    }


    /**
     * @function JoinItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.foreignTableName = null;
        me.joinFilter = null;
        me.joinType = null;
    }

    /**
     * @function JoinItem.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var dataObj = {};
        dataObj = Util.copyAttributes(dataObj, this);
        //joinFilter基本是个纯属性对象，这里不再做转换
        return dataObj;
    }
}
