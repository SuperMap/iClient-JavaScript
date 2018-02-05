import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerTextStyle} from './ServerTextStyle';
import {LabelMixedTextStyle} from './LabelMixedTextStyle';

/**
 * @class SuperMap.ThemeLabelText
 * @category  iServer Map Theme
 * @classdesc 标签中文本风格类。
 *              通过该类可以设置标签中的文本字体大小和显示风格。
 * @param options - {Object} 可选参数。如：<br>
 *        maxTextHeight - {number}标签中文本的最大高度。<br>
 *        maxTextWidth - {number}标签中文本的最大宽度。<br>
 *        minTextHeight - {number}标签中文本的最小高度。<br>
 *        minTextWidth - {number}标签中文本的最小宽度。<br>
 *        uniformStyle - {{@link SuperMap.ServerTextStyle}} 统一文本风格。<br>
 *        uniformMixedStyle - {{@link SuperMap.LabelMixedTextStyle}} 标签专题图统一的文本复合风格。
 */
export class ThemeLabelText {

    constructor(options) {
        /**
         * @member SuperMap.ThemeLabelText.prototype.maxTextHeight -{number}
         * @description 标签中文本的最大高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当放大后的文本高度超过最大高度之后就不再放大。高度单位为0.1毫米。高度单位为0.1毫米。默认为 0 毫米。
         */
        this.maxTextHeight = 0;

        /**
         * @member SuperMap.ThemeLabelText.prototype.maxTextWidth -{number}
         * @description 标签中文本的最大宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当放大后的文本宽度超过最大高度之后就不再放大。宽度单位为0.1毫米。默认为0毫米。
         */
        this.maxTextWidth = 0;

        /**
         * @member SuperMap.ThemeLabelText.prototype.minTextHeight -{number}
         * @description 标签中文本的最小高度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当缩小后的文本高度小于最小高度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。
         */
        this.minTextHeight = 0;

        /**
         * @member SuperMap.ThemeLabelText.prototype.minTextWidth -{number}
         * @description 标签中文本的最小宽度。当标签文本不固定大小时，即 SuperMap.ServerTextStyle.sizeFixed = false 有效，
         *              当缩小后的文本宽度小于最小宽度之后就不再缩小。宽度单位为0.1毫米。默认为0毫米。
         */
        this.minTextWidth = 0;

        /**
         * @member SuperMap.ThemeLabelText.prototype.uniformStyle -{SuperMap.ServerTextStyle}
         * @description 统一文本风格。当标签专题图子项的个数大于等于1时，
         *              uniformStyle 不起作用，各标签的风格使用子项中设置的风格。各种风格的优先级从高到低为：uniformMixedStyle（标签文本的复合风格），
         *              SuperMap.ThemeLabelItem.style（分段子项的文本风格），uniformStyle（统一文本风格）。
         */
        this.uniformStyle = new ServerTextStyle();

        /**
         *@member SuperMap.ThemeLabelText.prototype.uniformMixedStyle -{SuperMap.LabelMixedTextStyle}
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
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ThemeLabelText} ThemeLabelText对象
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
