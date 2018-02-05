import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import './JoinItem';
import './ThemeDotDensity';
import './ThemeGraduatedSymbol';
import './ThemeGraph';
import './ThemeLabel';
import './ThemeRange';
import './ThemeUnique';
import './ThemeGridRange';
import './ThemeGridUnique';
import './LabelImageCell';
import './LabelSymbolCell';
import './LabelThemeCell';

/**
 * @class SuperMap.ThemeParameters
 * @category  iServer Map Theme
 * @classdesc 专题图参数类。
 *               该类存储了制作专题所需的参数，包括数据源、数据集名称和专题图对象。
 * @param options - {Object} 可选参数。如：<br>
 *        datasetNames - {Array<string>} 要制作专题图的数据集数组，必设。<br>
 *        dataSourceNames - {Array<string>} 要制作专题图的数据集所在的数据源数组，必设。<br>
 *        joinItems - {Array<{@link SuperMap.JoinItem}>} 专题图外部表的连接信息 JoinItem 数组。<br>
 *        themes - {Array<{@link SuperMap.Theme}>} 专题图对象列表。<br>
 *        displayFilters -{Array<string>} 专题图属性过滤条件。<br>
 *        displayOrderBys -{Array<string>} 专题图对象生成符号叠加次序排序字段。<br>
 *        fieldValuesDisplayFilter -{Object} 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode。
 */
export class ThemeParameters {

    constructor(options) {
        /**
         * @member SuperMap.ThemeParameters.prototype.datasetNames -{Array<string>}
         * @description 要制作专题图的数据集数组，必设。
         */
        this.datasetNames = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.dataSourceNames -{Array<string>}
         * @description 要制作专题图的数据集所在的数据源数组，必设。
         */
        this.dataSourceNames = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.joinItems -{Array<SuperMap.JoinItem>}
         * @description 设置与外部表的连接信息 JoinItem 数组。
         *               使用此属性可以制作与外部表连接的专题图。
         */
        this.joinItems = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.themes -{Array<SuperMap.Theme>}
         * @description 专题图对象列表。
         *               该参数为实例化的各类专题图对象的集合。
         */
        this.themes = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.displayFilters -{Array<string>}
         * @description 专题图属性过滤条件。
         */
        this.displayFilters = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.displayOrderBys -{Array<string>}
         * @description 专题图对象生成符号叠加次序排序字段
         */
        this.displayOrderBys = null;

        /**
         * @member SuperMap.ThemeParameters.prototype.fieldValuesDisplayFilter -{Object}
         * @description 图层要素的显示和隐藏的过滤属性，其带有三个属性，分别是:values、fieldName、fieldValuesDisplayMode,他们的作用如下：<br>
         *  * values：{Array<number>} - 就是要过滤的值；<br>
         *  * fieldName：{string} - 要过滤的字段名称 只支持数字类型的字段；<br>
         *  * fieldValuesDisplayMode：{string} 目前有两个DISPLAY/DISABLE。当为DISPLAY时，表示只显示以上设置的相应属性值的要素，否则表示不显示以上设置的相应属性值的要素
         */
        this.fieldValuesDisplayFilter = null;

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeParameters";
    }


    /**
     * @function SuperMap.ThemeParameters.prototype.destroy
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

SuperMap.ThemeParameters = ThemeParameters;