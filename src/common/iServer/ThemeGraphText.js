/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';
import {ThemeGraphTextFormat} from '../REST';

/**
 * @class SuperMap.ThemeGraphText
 * @category  iServer Map Theme
 * @classdesc 统计图文字标注风格类。
 * @param {Object} options - 可选参数。
 * @param {boolean} [options.graphTextDisplayed=false] - 是否显示统计图上的文字标注。
 * @param {SuperMap.ThemeGraphTextFormat} [options.graphTextFormat=SuperMap.ThemeGraphTextFormat.CAPTION] - 统计专题图文本显示格式。
 * @param {SuperMap.ServerTextStyle} [options.graphTextStyle] - 统计图上的文字标注风格。
 */
export class ThemeGraphText {

    constructor(options) {

        /**
         * @member {boolean} [SuperMap.ThemeGraphText.prototype.graphTextDisplayed=false]
         * @description 是否显示统计图上的文字标注。
         */
        this.graphTextDisplayed = false;

        /**
         * @member {SuperMap.ThemeGraphTextFormat} [SuperMap.ThemeGraphText.prototype.graphTextFormat=SuperMap.ThemeGraphTextFormat.CAPTION]
         * @description 统计专题图文本显示格式。
         *              文本显示格式包括百分数、真实数值、标题、标题+百分数、标题+真实数值。
         */
        this.graphTextFormat = ThemeGraphTextFormat.CAPTION;

        /**
         * @member {SuperMap.ServerTextStyle} SuperMap.ThemeGraphText.prototype.graphTextStyle
         * @description 统计图上的文字标注风格。
         */
        this.graphTextStyle =  new ServerTextStyle();

        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ThemeGraphText";
    }

    /**
     * @function SuperMap.ThemeGraphText.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.graphTextDisplayed = null;
        me.graphTextFormat = null;
        if (me.graphTextStyle) {
            me.graphTextStyle.destroy();
            me.graphTextStyle = null;
        }
    }

    /**
     * @function SuperMap.ThemeGraphText.fromObj
     * @description 从传入对象获取统计图文字标注风格类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeGraphText} ThemeGraphText 对象。
     */
    static fromObj(obj) {
        var res = new ThemeGraphText();
        Util.copy(res, obj);
        res.graphTextStyle = ServerTextStyle.fromObj(obj.graphTextStyle);
        return res;

    }

}

SuperMap.ThemeGraphText = ThemeGraphText;
