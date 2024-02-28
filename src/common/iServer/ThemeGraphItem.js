/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';

/**
 * @class ThemeGraphItem
 * @deprecatedclass SuperMap.ThemeGraphItem
 * @category  iServer Map Theme
 * @classdesc 统计专题图子项类。该类用于设置统计专题图子项的名称、专题变量、显示风格等属性。每一个统计专题图子项都对应一种显示风格。
 * @param {Object} options - 参数。
 * @param {string} [options.caption] - 统计专题图子项的名称。
 * @param {string} options.graphExpression - 统计专题图的专题变量。
 * @param {Array.<number>} [options.memoryDoubleValues] - 以内存数组方式制作专题图时的值数组。
 * @param {ServerStyle} [options.uniformStyle] - 统计专题图子项的显示风格。
 * @usage
 */
export class ThemeGraphItem {

    constructor(options) {

        /**
         * @member {string} [ThemeGraphItem.prototype.caption]
         * @description 统计专题图子项的名称。
         */
        this.caption = null;

        /**
         * @member {string} ThemeGraphItem.prototype.graphExpression
         * @description 统计专题图的专题变量。专题变量可以是一个字段或字段表达式。字段必须为数值型；表达式只能为数值型的字段间的运算。
         */
        this.graphExpression = null;

        /**
         * @member {Array.<number>} [ThemeGraphItem.prototype.memoryDoubleValues]
         * @description 内存数组方式制作专题图时的值数组。<br>
         *              内存数组方式制作专题图时，只对 SmID 值在键数组（{@link ThemeGraph#memoryKeys}）中的记录制作专题图。
         *              值数组的数值个数必须与键数组中数值的个数一致。值数组中的值将代替原来的专题值来制作统计专题图。
         *              比如：利用面积字段和周长字段（即有两个统计专题图子项 ）作为专题变量制作统计专题图。
         */
        this.memoryDoubleValues = null;

        /**
         * @member {ServerStyle} [ThemeGraphItem.prototype.uniformStyle]
         * @description 统计专题图子项的显示风格。
         *              每一个统计专题图子项都对应一种显示风格。
         */
        this.uniformStyle = new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphItem";
    }

    /**
     * @function ThemeGraphItem.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.caption = null;
        me.graphExpression = null;
        me.memoryDoubleValues = null;
        me.uniformStyle = null;
    }

    /**
     * @function ThemeGraphItem.fromObj
     * @description 从传入对象获取统计专题图子项类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGraphItem} ThemeGraphItem 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraphItem();
        Util.copy(res, obj);
        res.uniformStyle = ServerStyle.fromJson(obj.uniformStyle);
        return res;
    }

}

