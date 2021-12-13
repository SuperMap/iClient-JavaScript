/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
/**
 * @class ThemeParameters
 * @deprecatedclass SuperMap.ThemeParameters
 * @category  iServer Map Theme
 * @classdesc 专题图参数类。
 *            该类存储了制作专题所需的参数，包括数据源、数据集名称和专题图对象。
 * @param {Object} options - 参数。
 * @param {Array.<string>} options.datasetNames - 数据集数组。
 * @param {Array.<string>} options.dataSourceNames - 数据源数组。
 * @param {Array.<JoinItem>} [options.joinItems] - 专题图外部表的连接信息 JoinItem 数组。
 * @param {Array.<CommonTheme>} options.themes - 专题图对象列表。
 * @param {Array.<string>} [options.displayFilters] - 专题图属性过滤条件。
 * @param {Array.<string>} [options.displayOrderBys] - 专题图对象生成符号叠加次序排序字段。
 * @param {Object} [options.fieldValuesDisplayFilter] - 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode。
 * @usage
 */
export class ThemeParameters {

    constructor(options) {
        /**
         * @member {Array.<string>} ThemeParameters.prototype.datasetNames
         * @description 要制作专题图的数据集数组。
         */
        this.datasetNames = null;

        /**
         * @member {Array.<string>} ThemeParameters.prototype.dataSourceNames
         * @description 要制作专题图的数据集所在的数据源数组。
         */
        this.dataSourceNames = null;

        /**
         * @member {Array.<JoinItem>} [ThemeParameters.prototype.joinItems]
         * @description 设置与外部表的连接信息 JoinItem 数组。
         *               使用此属性可以制作与外部表连接的专题图。
         */
        this.joinItems = null;

        /**
         * @member {Array.<CommonTheme>} ThemeParameters.prototype.themes
         * @description 专题图对象列表。
         *              该参数为实例化的各类专题图对象的集合。
         */
        this.themes = null;

        /**
         * @member {Array.<string>} [ThemeParameters.prototype.displayFilters]
         * @description 专题图属性过滤条件。
         */
        this.displayFilters = null;

        /**
         * @member {Array.<string>}  [ThemeParameters.prototype.displayOrderBys]
         * @description 专题图对象生成符号叠加次序排序字段。
         */
        this.displayOrderBys = null;

        /**
         * @member {Object} [ThemeParameters.prototype.fieldValuesDisplayFilter]
         * @property {Array.<number>} values - 待过滤的值。
         * @property {string} fieldName - 待过滤的字段名称只支持数字类型的字段。
         * @property {string} fieldValuesDisplayMode - 目前为 DISPLAY/DISABLE。当为 DISPLAY 时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素。
         */
        this.fieldValuesDisplayFilter = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeParameters";
    }


    /**
     * @function ThemeParameters.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.datasetNames = null;
        me.dataSourceNames = null;
        if (me.joinItems) {
            for (let i = 0, joinItems = me.joinItems, len = joinItems.length; i < len; i++) {
                joinItems[i].destroy();
            }
            me.joinItems = null;
        }
        if (me.themes) {
            for (let i = 0, themes = me.themes, len = themes.length; i < len; i++) {
                themes[i].destroy();
            }
            me.themes = null;
        }
    }

}
