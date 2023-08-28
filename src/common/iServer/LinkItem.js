/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {DatasourceConnectionInfo} from './DatasourceConnectionInfo';

/**
 * @class LinkItem
 * @deprecatedclass SuperMap.LinkItem
 * @constructs LinkItem
 * @category iServer Data FeatureResults
 * @classdesc 关联信息类。该类用于矢量数据集与外部表的关联。外部表是另一个数据集（其中纯属性数据集中没有空间几何信息）中的 DBMS 表,
 * 矢量数据集与外部表可以属于不同的数据源，但数据源类型目前只支持 SQL Server 和 Oracle 类型。使用 LinkItem 时，
 * 空间数据和属性数据必须满足关联条件，即主空间数据集与外部属性表之间存在关联字段。{@link LinkItem}
 * 只支持左连接，UDB、PostgreSQL 和 DB2 数据源不支持 {@link LinkItem}；另外，用于建立关联关系的两个表可以不在同一个数据源下。注意：<br>
 * 1.使用 {@link LinkItem} 的约束条件为：空间数据和属性数据必须有关联条件，即主空间数据集与外部属性表之间存在关联字段；<br>
 * 2.使用外关联表制作专题图时，所关联的字段必须设置表名，例如，如果所关联的字段为 BaseMap_R 数据集的 SmID，就要写成 BaseMap_R.SMID。
 * @param {Object} options - 参数。
 * @param {DatasourceConnectionInfo} options.datasourceConnectionInfo - 关联的外部数据源信息。
 * @param {Array.<string>} options.foreignKeys - 主空间数据集的外键。
 * @param {string} options.foreignTable - 关联的外部属性表的名称。
 * @param {Array.<string>} options.linkFields - 欲保留的外部属性表的字段。
 * @param {string} options.linkFilter - 与外部属性表的连接条件。
 * @param {string} options.name - 此关联信息对象的名称。
 * @param {Array.<string>} options.primaryKeys - 关联的外部属性表的主键。
 * @example 下面以 SQL 查询说明 linkitem 的使用方法：
 *  function queryBySQL() {
 *      // 设置关联的外部数据库信息,alias表示数据库别名
 *      var dc = new DatasourceConnectionInfo({
 *          dataBase: "RelQuery",
 *          server: "{ip}:{port}",
 *          user: "sa",
 *          password: "map",
 *          driver: "SQL Server",
 *          connect: true,
 *          OpenLinkTable: false,
 *          alias: "RelQuery",
 *          engineType: EngineType.SQLPLUS,
 *          readOnly: false,
 *          exclusive: false
 *      });
 *     // 设置关联信息
 *      var linkItem = new LinkItem({
 *          datasourceConnectionInfo: dc,
 *          foreignKeys: ["name"],
 *          foreignTable: "Pop_2011",
 *          linkFields: ["SmID as Pid","pop"],
 *          name: "link",
 *          primatryKeys: ["name"],
 *      });
 *      // 设置查询参数，在查询参数中添加linkItem关联条件信息
 *      var queryParam, queryBySQLParams, queryBySQLService;
 *      queryParam = new FilterParameter({
 *          name: "Province@RelQuery",
 *          fields: ["SmID","name"],
 *          attributeFilter: "SmID<7",
 *          linkItems: [linkItem]
 *       }),
 *      queryBySQLParams = new QueryBySQLParameters({
 *           queryParams: [queryParam]
 *              }),
 *      queryBySQLService = new QueryBySQLService(url);
     *      queryBySQLService.processAsync(queryBySQLParams);
     *  }
 *  function processCompleted(queryEventArgs) {//todo}
 *  function processFailed(e) {//todo}
 * @usage
 */
export class LinkItem {


    constructor(options) {

        /**
         * @member {DatasourceConnectionInfo} LinkItem.prototype.datasourceConnectionInfo
         * @description 关联的外部数据源信息。
         */
        this.datasourceConnectionInfo = null;

        /**
         * @member {Array.<string>} LinkItem.prototype.foreignKeys
         * @description 主空间数据集的外键。
         */
        this.foreignKeys = null;

        /**
         * @member {string} LinkItem.prototype.foreignTable
         * @description 关联的外部属性表的名称，目前仅支持 Supermap 管理的表，即另一个矢量数据集所对应的 DBMS 表。
         */
        this.foreignTable = null;

        /**
         * @member {Array.<string>} LinkItem.prototype.linkFields
         * @description 欲保留的外部属性表的字段。如果不设置字段或者设置的字段在外部属性表中不存在的话则不返回任何外部属性表的属性信息。如果欲保留的外部表字段与主表字段存在同名，则还需要指定一个不存在字段名作为外部表的字段别名。
         */
        this.linkFields = null;

        /**
         * @member {string} LinkItem.prototype.linkFilter
         * @description 与外部属性表的连接条件。
         */
        this.linkFilter = null;

        /**
         * @member {string} LinkItem.prototype.name
         * @description 此关联信息对象的名称。
         */
        this.name = null;

        /**
         * @member {Array.<string>} LinkItem.prototype.primaryKeys
         * @description 需要关联的外部属性表的主键。
         */
        this.primaryKeys = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.LinkItem";
    }

    /**
     * @function LinkItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.datasourceConnectionInfo instanceof DatasourceConnectionInfo) {
            me.datasourceConnectionInfo.destroy();
            me.datasourceConnectionInfo = null;
        }
        me.foreignKeys = null;
        me.foreignTable = null;
        me.linkFields = null;
        me.linkFilter = null;
        me.name = null;
        me.primaryKeys = null;
    }

}
