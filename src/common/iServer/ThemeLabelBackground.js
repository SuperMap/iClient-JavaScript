/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerStyle} from './ServerStyle';
import {LabelBackShape} from '../REST';

/**
 * @class ThemeLabelBackground
 * @deprecatedclass SuperMap.ThemeLabelBackground
 * @category  iServer Map Theme
 * @classdesc 标签背景风格类。通过该类可以设置标签的背景形状和风格等属性。
 * @param {Object} options - 可选参数。
 * @param {LabelBackShape} [options.labelBackShape=LabelBackShape.NONE] - 标签专题图中标签背景的形状枚举类。
 * @param {ServerStyle} [options.backStyle] - 标签专题图中标签背景风格。
 * @usage
 */
export class ThemeLabelBackground {

    constructor(options) {
        /**
         * @member {LabelBackShape} [ThemeLabelBackground.prototype.labelBackShape=LabelBackShape.NONE]
         * @description 标签专题图中标签背景的形状枚举类。背景类型可以是矩形、圆角矩形、菱形、椭圆形、三角形和符号等，即不使用任何的形状作为标签的背景。
         */
        this.labelBackShape = LabelBackShape.NONE;

        /**
         * @member {ServerStyle} [ThemeLabelBackground.prototype.backStyle]
         * @description 标签专题图中标签背景风格。当背景形状
         *              labelBackShape 属性设为 NONE（即无背景形状）时，backStyle 属性无效。
         */
        this.backStyle = new ServerStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeLabelBackground";
    }

    /**
     * @function ThemeLabelBackground.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.labelBackShape = null;
        if (me.backStyle) {
            me.backStyle.destroy();
            me.backStyle = null;
        }
    }

    /**
     * @function ThemeLabelBackground.fromObj
     * @description 从传入对象获取标签背景风格类。
     * @param {Object} obj - 传入对象。
     * @returns {ThemeLabelBackground} ThemeLabelBackground 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var t = new ThemeLabelBackground();
        t.labelBackShape = obj.labelBackShape;
        t.backStyle = ServerStyle.fromJson(obj.backStyle);

        return t;
    }

}

