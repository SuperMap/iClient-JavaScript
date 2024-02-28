/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServerStyle} from './ServerStyle';
import {Util} from '../commontypes/Util';

/**
 * @class ThemeGraduatedSymbolStyle
 * @deprecatedclass SuperMap.ThemeGraduatedSymbolStyle
 * @category  iServer Map Theme
 * @classdesc 等级符号专题图正负零值显示风格类。该类用于设置等级符号专题图中正值、负值、零值的显示风格。
 * @param {Object} options - 参数。
 * @param {boolean} [options.negativeDisplayed=false] - 是否显示负值。
 * @param {ServerStyle} [options.negativeStyle] - 负值的等级符号风格。
 * @param {ServerStyle} [options.positiveStyle] - 正值的等级符号风格。
 * @param {boolean} [options.zeroDisplayed=false] - 是否显示 0 值。
 * @param {ServerStyle} [options.zeroStyle] - 0 值的等级符号风格。
 * @usage
 */
export class ThemeGraduatedSymbolStyle {

    constructor(options) {
        /**
         * @member {boolean} [ThemeGraduatedSymbolStyle.prototype.negativeDisplayed=false]
         * @description 是否显示负值。
         */
        this.negativeDisplayed = false;

        /**
         * @member {ServerStyle} [ThemeGraduatedSymbolStyle.prototype.negativeStyle]
         * @description 负值的等级符号风格。
         */
        this.negativeStyle = new ServerStyle();

        /**
         * @member {ServerStyle} [ThemeGraduatedSymbolStyle.prototype.positiveStyle]
         * @description 正值的等级符号风格。
         */
        this.positiveStyle = new ServerStyle();

        /**
         * @member {boolean} [ThemeGraduatedSymbolStyle.prototype.zeroDisplayed=false]
         * @description 是否显示 0 值。
         */
        this.zeroDisplayed = false;

        /**
         * @member {ServerStyle} ThemeGraduatedSymbolStyle.prototype.zeroStyle
         * @description 0 值的等级符号风格。
         */
        this.zeroStyle = new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraduatedSymbolStyle";
    }

    /**
     * @function ThemeGraduatedSymbolStyle.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.negativeDisplayed = null;
        me.negativeStyle = null;
        me.positiveStyle = null;
        me.zeroDisplayed = null;
        me.zeroStyle = null;
    }

    /**
     * @function ThemeGraduatedSymbolStyle.fromObj
     * @description 从传入对象获取等级符号专题图正负零值显示风格类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeGraduatedSymbolStyle} ThemeGraduatedSymbolStyle 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeGraduatedSymbolStyle();
        Util.copy(res, obj);
        res.negativeStyle = ServerStyle.fromJson(obj.negativeStyle);
        res.positiveStyle = ServerStyle.fromJson(obj.positiveStyle);
        res.zeroStyle = ServerStyle.fromJson(obj.zeroStyle);
        return res;
    }

}



