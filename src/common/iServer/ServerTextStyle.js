/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {TextAlignment} from '../REST';
import {ServerColor} from './ServerColor';

/**
 * @class ServerTextStyle
 * @deprecatedclass SuperMap.ServerTextStyle
 * @category  iServer Map Theme
 * @classdesc 服务端文本风格类。该类用于定义文本风格的相关属性。
 * @param {Object} options - 可选参数。
 * @param {TextAlignment} [options.align=TextAlignment.BASELINECENTER] - 文本的对齐方式。
 * @param {ServerColor} [options.backColor] - 文本的背景色。默认 backColor = new ServerColor(255, 255, 255)。
 * @param {ServerColor} [options.foreColor] - 文本的前景色。默认 foreColor = new ServerColor(0, 0, 0)。
 * @param {boolean} [options.backOpaque=false] - 文本背景是否不透明。
 * @param {boolean} [options.sizeFixed=true] - 文本大小是否固定。
 * @param {number} [options.fontHeight=6] - 文本字体的高度。
 * @param {number} [options.fontWidth=0] - 文本字体的宽度。
 * @param {number} [options.fontWeight=400] - 文本字体的磅数。
 * @param {string} [options.fontName='Times New Roman'] - 文本字体的名称。
 * @param {boolean} [options.bold=false] - 文本是否为粗体字。
 * @param {boolean} [options.italic=false] - 文本是否采用斜体。
 * @param {number} [options.italicAngle=0] - 字体倾斜角度。
 * @param {boolean} [options.shadow=false] - 文本是否有阴影。
 * @param {boolean} [options.strikeout=false] - 文本字体是否加删除线。
 * @param {boolean} [options.outline=false] - 是否以轮廓的方式来显示文本的背景。
 * @param {number} [options.opaqueRate=0] - 注记文字的不透明度。
 * @param {boolean} [options.underline=false] - 文本字体是否加下划线。
 * @param {number} [options.rotation=0.0] -  文本旋转的角度。
 * @usage
 */
export class ServerTextStyle {


    constructor(options) {
        /**
         * @member {TextAlignment} [ServerTextStyle.prototype.align= TextAlignment.BASELINECENTER]
         * @description 文本的对齐方式。
         */
        this.align = TextAlignment.BASELINECENTER;

        /**
         * @member {ServerColor} [ServerTextStyle.prototype.backColor=(255, 255, 255)]
         * @description 文本的背景色。
         */
        this.backColor = new ServerColor(255, 255, 255);

        /**
         * @member {ServerColor} [ServerTextStyle.prototype.foreColor=(0, 0, 0)]
         * @description 文本的前景色。
         */
        this.foreColor = new ServerColor(0, 0, 0);

        /**
         * @member {boolean} [ServerTextStyle.prototype.backOpaque=false]
         * @description 文本背景是否不透明。true 表示文本背景不透明。
         */
        this.backOpaque = false;

        /**
         * @member {boolean} [ServerTextStyle.prototype.sizeFixed=true]
         * @description 文本大小是否固定。设置为 true，表示图片为固定像素大小，具体大小请参考 fontHeight。当设为 false 时，图片会随着地图缩放而缩放。
         */
        this.sizeFixed = true;

        /**
         * @member {number} [ServerTextStyle.prototype.fontHeight=6]
         * @description 文本字体的高度，单位与 sizeFixed 有关，当 sizeFixed 为 False 时，即非固定文本大小时使用地图坐标单位，
         *              如地理坐标系下的地图中单位为度；当 sizeFixed 为 True 时，单位为毫米（mm）。
         */
        this.fontHeight = 6;

        /**
         * @member {number} [ServerTextStyle.prototype.fontWidth=0]
         * @description 文本字体的宽度。字体的宽度以英文字符为标准，由于一个中文字符相当于两个英文字符。
         */
        this.fontWidth = 0;

        /**
         * @member {number} [ServerTextStyle.prototype.fontWeight=400]
         * @description 文本字体的磅数。表示粗体的具体数值。取值范围为从0－900之间的整百数。
         */
        this.fontWeight = 400;

        /**
         * @member {string} [ServerTextStyle.prototype.fontName="Times New Roman"]
         * @description 文本字体的名称。
         */
        this.fontName = "Times New Roman";

        /**
         * @member {boolean} [ServerTextStyle.prototype.bold=false]
         * @description 文本是否为粗体字。true 表示为粗体。false 表示文本不是粗体字。
         */
        this.bold = false;

        /**
         * @member {boolean} [ServerTextStyle.prototype.italic=false]
         * @description 文本是否采用斜体。true 表示采用斜体。
         */
        this.italic = false;

        /**
         * @member {number} [ServerTextStyle.prototype.italicAngle=0]
         * @description 字体倾斜角度。正负度之间，以度为单位，精确到0.1度。当倾斜角度为0度，为系统默认的字体倾斜样式。
         *              正负度是指以纵轴为起始零度线，其纵轴左侧为正，右侧为负。允许的最大角度为60，最小-60。大于60按照60处理，小于-60按照-60处理。目前只对标签专题图有效。
         */
        this.italicAngle = 0;

        /**
         * @member {boolean} [ServerTextStyle.prototype.shadow=false]
         * @description 文本是否有阴影。true 表示给文本增加阴影。false 表示文本没有阴影。
         */
        this.shadow = false;

        /**
         * @member {boolean} [ServerTextStyle.prototype.strikeout=false]
         * @description 文本字体是否加删除线。true 表示加删除线。false 表示文本字体不加删除线。
         */
        this.strikeout = false;

        /**
         * @member {boolean} [ServerTextStyle.prototype.outline=false]
         * @description 是否以轮廓的方式来显示文本的背景。true 表示以轮廓的方式来显示文本的背景。false 表示不以轮廓的方式来显示文本的背景。
         */
        this.outline = false;

        /**
         * @member {number} [ServerTextStyle.prototype.opaqueRate=0]
         * @description 注记文字的不透明度。不透明度的范围为0-100。0表示透明。
         */
        this.opaqueRate = 0;

        /**
         * @member {boolean} [ServerTextStyle.prototype.underline=false]
         * @description 文本字体是否加下划线。true 表示加下划线。
         */
        this.underline = false;

        /**
         * @member {number} [ServerTextStyle.prototype.rotation=0.0]
         * @description 文本旋转的角度。逆时针方向为正方向，单位为度，精确到0.1度。
         */
        this.rotation = 0.0;

        if (options) {
            Util.extend(this, options);
        }

       this.CLASS_NAME = "SuperMap.ServerTextStyle";
    }


    /**
     * @function ServerTextStyle.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        me.align = null;
        if (me.backColor) {
            me.backColor.destroy();
            me.backColor = null;
        }
        if (me.foreColor) {
            me.foreColor.destroy();
            me.foreColor = null;
        }
        me.backOpaque = null;
        me.sizeFixed = null;
        me.fontHeight = null;
        me.fontWidth = null;
        me.fontWeight = null;
        me.fontName = null;
        me.bold = null;
        me.italic = null;
        me.italicAngle = null;
        me.shadow = null;
        me.strikeout = null;
        me.outline = null;
        me.opaqueRate = null;
        me.underline = null;
        me.rotation = null;
    }

    /**
     * @function ServerTextStyle.fromObj
     * @description 从传入对象获服务端文本风格类。
     * @param {Object} obj - 传入对象
     * @returns {ServerTextStyle} 返回服务端文本风格对象
     */
    static fromObj(obj) {
        var res = new ServerTextStyle(obj);
        Util.copy(res, obj);
        res.backColor = ServerColor.fromJson(obj.backColor);
        res.foreColor = ServerColor.fromJson(obj.foreColor);
        return res;
    }

}

