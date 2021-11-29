/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';

/**
 * @class ThemeGraphSize
 * @deprecatedclass SuperMap.ThemeGraphSize
 * @category  iServer Map Theme
 * @classdesc 统计专题图符号尺寸类。
 * @param {Object} options - 参数。
 * @param {number} [options.maxGraphSize=0] - 统计图中显示的最大图表尺寸基准值。
 * @param {number} [options.minGraphSize=0] - 统计图中显示的最小图表尺寸基准值。
 * @usage
 */
export class ThemeGraphSize {

    constructor(options) {
        /**
         * @member {number} [ThemeGraphSize.prototype.maxGraphSize=0]
         * @description 获取或设置统计图中显示的最大图表尺寸基准值，单位为像素。
         */
        this.maxGraphSize = 0;

        /**
         * @member {number} [ThemeGraphSize.prototype.minGraphSize=0]
         * @description 获取或设置统计图中显示的最小图表尺寸基准值，单位为像素。
         */
        this.minGraphSize = 0;

        if (options) {
            Util.extend(this, options);
        }

       this.CLASS_NAME = "SuperMap.ThemeGraphSize";
    }

    /**
     * @function ThemeGraphSize.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.maxGraphSize = null;
        me.minGraphSize = null;
    }

    /**
     * @function ThemeGraphSize.fromObj
     * @description 从传入对象获统计专题图符号尺寸类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGraphSize}  ThemeGraphSize 对象。
     */
    static fromObj(obj) {
        var res = new ThemeGraphSize();
        Util.copy(res, obj);
        return res;
    }

}

