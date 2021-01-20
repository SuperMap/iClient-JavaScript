/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';
import {LabelMixedTextStyle} from './LabelMixedTextStyle';

/**
 * @class SuperMap.ThemeLabelText
 * @category  iServer Map Theme
 * @classdesc 标签中文本风格类。
 *            通过该类可以设置标签中的文本字体大小和显示风格。
 * @param {Object} options - 参数。
 * @param {number} [options.maxTextHeight=0] - 标签中文本的最大高度。
 * @param {number} [options.maxTextWidth=0] - 标签中文本的最大宽度。
 * @param {number} [options.minTextHeight=0] - 标签中文本的最小高度。
 * @param {number} [options.minTextWidth=0] - 标签中文本的最小宽度。
 * @param {SuperMap.ServerTextStyle} [options.uniformStyle] - 统一文本风格。
 * @param {SuperMap.LabelMixedTextStyle} [options.uniformMixedStyle] - 标签专题图统一的文本复合风格。
 */
export class ThemeLabelText {

    constructor(options) {
        /**
         * @member {number} [SuperMap.ThemeLabelText.prototype.maxTextHeight=0]
         * @description 标签中文本的最大高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当放大后的文本高度超过最大高度之后就不再放大。高度单位为 0.1 毫米。
         */
        this.maxTextHeight = 0;

        /**
         * @member {number} [SuperMap.ThemeLabelText.prototype.maxTextWidth=0]
         * @description 标签中文本的最大宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当放大后的文本宽度超过最大高度之后就不再放大。宽度单位为 0.1 毫米。
         */
        this.maxTextWidth = 0;

        /**
         * @member {number} [SuperMap.ThemeLabelText.prototype.minTextHeight=0]
         * @description 标签中文本的最小高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当缩小后的文本高度小于最小高度之后就不再缩小。高度单位为 0.1 毫米。
         */
        this.minTextHeight = 0;

        /**
         * @member {number} [SuperMap.ThemeLabelText.prototype.minTextWidth=0]
         * @description 标签中文本的最小宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当缩小后的文本宽度小于最小宽度之后就不再缩小。宽度单位为 0.1 毫米。
         */
        this.minTextWidth = 0;

        /**
         * @member {SuperMap.ServerTextStyle} [SuperMap.ThemeLabelText.prototype.uniformStyle]
         * @description 统一文本风格。当标签专题图子项的个数大于等于1时，
         *              uniformStyle 不起作用，各标签的风格使用子项中设置的风格。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
         *              SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.uniformStyle = new ServerTextStyle();

        /**
         *@member {SuperMap.LabelMixedTextStyle} [SuperMap.ThemeLabelText.prototype.uniformMixedStyle]
         *@description  标签专题图统一的文本复合风格。通过该类可以使同一个标
         *              签中的文字使用多种风格显示。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
         *              SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.uniformMixedStyle =  null;

        if (options) {
            Util.extend(this, options);
        }
        this.CLASS_NAME = "SuperMap.ThemeLabelText";
    }

    /**
     * @function SuperMap.ThemeLabelText.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.maxTextHeight = null;
        me.maxTextWidth = null;
        me.minTextHeight = null;
        me.minTextWidth = null;
        if (me.uniformStyle) {
            me.uniformStyle.destroy();
            me.uniformStyle = null;
        }
        if (me.uniformMixedStyle) {
            me.uniformMixedStyle.destroy();
            me.uniformMixedStyle = null;
        }
    }

    /**
     * @function SuperMap.ThemeLabelText.fromObj
     * @description 从传入对象获取标签中文本风格类。
     * @param {Object} obj - 传入对象。
     * @returns {SuperMap.ThemeLabelText} ThemeLabelText 对象。
     */
    static fromObj(obj) {
        if (!obj) {
            return;
        }
        var res = new ThemeLabelText();
        Util.copy(res, obj);
        res.uniformStyle = ServerTextStyle.fromObj(obj.uniformStyle);
        res.uniformMixedStyle = LabelMixedTextStyle.fromObj(obj.uniformMixedStyle);
        return res;
    }
}

SuperMap.ThemeLabelText = ThemeLabelText;
