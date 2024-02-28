/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class FilterParameter
 * @deprecatedclass SuperMap.FilterParameter
 * @category iServer Data FeatureResults
 * @classdesc 查询过滤条件参数类。该类用于设置查询数据集的查询过滤参数。
 * @param {Object} options - 参数。
 * @param {string} options.attributeFilter - 属性过滤条件。
 * @param {string} options.name - 查询数据集名称或者图层名称。
 * @param {Array.<JoinItem>} [options.joinItems] - 与外部表的连接信息 JoinItem 数组。
 * @param {Array.<LinkItem>} [options.linkItems] - 与外部表的关联信息 LinkItem 数组。
 * @param {Array.<string>} [options.ids] - 查询 id 数组，即属性表中的 SmID 值。
 * @param {string} [options.orderBy] - 查询排序的字段，orderBy 的字段须为数值型的。
 * @param {string} [options.groupBy] - 查询分组条件的字段。
 * @param {Array.<string>} [options.fields] - 查询字段数组。
 * @usage
 */
export class FilterParameter {


    constructor(options) {
        /**
         * @member {string} FilterParameter.prototype.attributeFilter
         * @description 属性过滤条件。
         * 相当于 SQL 语句中的 WHERE 子句，其格式为：WHERE <条件表达式>，
         * attributeFilter 就是其中的“条件表达式”。
         * 该字段的用法为 attributeFilter = "过滤条件"。
         * 例如，要查询字段 fieldValue 小于 100 的记录，设置 attributeFilter = "fieldValue < 100"；
         * 要查询字段 name 的值为“酒店”的记录，设置 attributeFilter = "name like '%酒店%'"，等等。
         */
        this.attributeFilter = null;

        /**
         * @member {string} FilterParameter.prototype.name
         * @description 查询数据集名称或者图层名称，根据实际的查询对象而定。
         * 一般情况下该字段为数据集名称，但在进行与地图相关功能的操作时，
         * 需要设置为图层名称（图层名称格式：数据集名称@数据源别名）。
         * 因为一个地图的图层可能是来自于不同数据源的数据集，
         * 而不同的数据源中可能存在同名的数据集，
         * 使用数据集名称不能唯一的确定数据集，
         * 所以在进行与地图相关功能的操作时，该值需要设置为图层名称。
         */
        this.name = null;

        /**
         * @member {Array.<JoinItem>} [FilterParameter.prototype.joinItems]
         * @description 与外部表的连接信息 JoinItem 数组。
         */
        this.joinItems = null;

        /**
         * @member {Array.<LinkItem>} [FilterParameter.prototype.linkItems]
         * @description 与外部表的关联信息 LinkItem 数组。
         */
        this.linkItems = null;

        /**
         * @member {Array.<string>} [FilterParameter.prototype.ids]
         * @description 查询 id 数组，即属性表中的 SmID 值。
         */
        this.ids = null;

        /**
         * @member {string} [FilterParameter.prototype.orderBy]
         * @description 查询排序的字段，orderBy 的字段须为数值型的。
         * 相当于 SQL 语句中的 ORDER BY 子句，其格式为：ORDER BY <列名>，
         * 列名即属性表中每一列的名称，列又可称为属性，在 SuperMap 中又称为字段。
         * 对单个字段排序时，该字段的用法为 orderBy = "字段名"；
         * 对多个字段排序时，字段之间以英文逗号进行分割，用法为 orderBy = "字段名1, 字段名2"。
         * 例如，现有一个国家数据集，它有两个字段分别为“SmArea”和“pop_1994”，
         * 分别表示国家的面积和 1994 年的各国人口数量。
         * 如果要按照各国人口数量对记录进行排序，则 orderBy = "pop_1994"；
         * 如果要以面积和人口进行排序，则 orderBy = "SmArea, pop_1994"。
         */
        this.orderBy = null;


        /**
         * @member {string} [FilterParameter.prototype.groupBy]
         * @description 查询分组条件的字段。
         * 相当于 SQL 语句中的 GROUP BY 子句，其格式为：GROUP BY <列名>，
         * 列名即属性表中每一列的名称，列又可称为属性，在 SuperMap 中又称为字段。
         * 对单个字段分组时，该字段的用法为 groupBy = "字段名"；
         * 对多个字段分组时，字段之间以英文逗号进行分割，用法为 groupBy = "字段名1, 字段名2"。
         * 例如，现有一个全球城市数据集，该数据集有两个字段分别为“Continent”和“Country”，
         * 分别表示某个城市所属的洲和国家。
         * 如果要按照国家对全球的城市进行分组，可以设置 groupBy = "Country"；
         * 如果以洲和国家对城市进行分组，设置 groupBy = "Continent, Country"。
         */
        this.groupBy = null;

        /**
         * @member {Array.<string>} [FilterParameter.prototype.fields]
         * @description 查询字段数组，如果不设置则使用系统返回的所有字段。
         */
        this.fields = null;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.FilterParameter";
    }


    /**
     * @function FilterParameter.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.attributeFilter = null;
        me.name = null;
        if (me.joinItems) {
            for (let i = 0, joinItems = me.joinItems, len = joinItems.length; i < len; i++) {
                joinItems[i].destroy();
            }
            me.joinItems = null;
        }
        if (me.linkItems) {
            for (let i = 0, linkItems = me.linkItems, len = linkItems.length; i < len; i++) {
                linkItems[i].destroy();
            }
            me.linkItems = null;
        }
        me.ids = null;
        me.orderBy = null;
        me.groupBy = null;
        me.fields = null;
    }


}
