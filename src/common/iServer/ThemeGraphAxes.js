/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';
import {ServerTextStyle} from './ServerTextStyle';

/**
 * @class ThemeGraphAxes
 * @deprecatedclass SuperMap.ThemeGraphAxes
 * @category  iServer Map Theme
 * @classdesc 统计专题图坐标轴样式类。该类用于设置统计专题图坐标轴的颜色、网格、文本标注风格等样式。
 * @param {Object} options - 参数。
 * @param {ServerColor} [options.axesColor=(0, 0, 0)] - 坐标轴颜色。
 * @param {boolean} [options.axesDisplayed=false] - 是否显示坐标轴。
 * @param {boolean} [options.axesGridDisplayed=false] - 是否在统计图坐标轴上显示网格。
 * @param {boolean} [options.axesTextDisplayed=false] - 是否显示坐标轴的文本标注。
 * @param {ServerTextStyle} [options.axesTextStyle] - 坐标轴文本标注的风格。当 axesTextDisplayed = true 时有效。
 * @usage
 */
export class ThemeGraphAxes {

    constructor(options) {

        /**
         * @member {ServerColor} [ThemeGraphAxes.prototype.axesColor=(0, 0, 0)]
         * @description 坐标轴颜色。当 axesDisplayed = true 时有效。
         */
        this.axesColor =  new ServerColor(0, 0, 0);

        /**
         * @member {boolean} [ThemeGraphAxes.prototype.axesDisplayed=false]
         * @description 是否显示坐标轴。<br>
         *              由于饼状图和环状图无坐标轴，故该属性以及所有与坐标轴设置相关的属性都不适用于它们。并且只有当该值为 true 时，其它设置坐标轴的属性才起作用。
         */
        this.axesDisplayed = false;

        /**
         * @member {boolean} [ThemeGraphAxes.prototype.axesGridDisplayed=false]
         * @description 是否在统计图坐标轴上显示网格。
         */
        this.axesGridDisplayed = false;

        /**
         * @member {boolean} [ThemeGraphAxes.prototype.axesTextDisplayed=false]
         * @description 是否显示坐标轴的文本标注。
         */
        this.axesTextDisplayed = false;

        /**
         * @member {ServerTextStyle} ThemeGraphAxes.prototype.axesTextStyle
         * @description 坐标轴文本标注风格。当 axesTextDisplayed = true 时有效。
         */
        this.axesTextStyle =  new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphAxes";
    }

    /**
     * @function ThemeGraphAxes.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.axesColor) {
            me.axesColor.destroy();
            me.axesColor = null;
        }
        me.axesDisplayed = null;
        me.axesGridDisplayed = null;
        me.axesTextDisplayed = null;
        if (me.axesTextStyle) {
            me.axesTextStyle.destroy();
            me.axesTextStyle = null;
        }
    }

    /**
     * @function ThemeGraphAxes.fromObj
     * @description 从传入对象获取统计专题图坐标轴样式类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGraphAxes} ThemeGraphAxes 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraphAxes();
        Util.copy(res, obj);
        res.axesColor = ServerColor.fromJson(obj.axesColor);
        res.axesTextStyle = ServerTextStyle.fromObj(obj.axesTextStyle);
        return res;
    }

}

