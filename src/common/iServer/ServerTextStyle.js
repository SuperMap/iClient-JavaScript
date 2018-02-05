import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {TextAlignment} from '../REST';
import {ServerColor} from './ServerColor';

/**
 * @class SuperMap.ServerTextStyle
 * @category  iServer Map Theme
 * @classdesc 服务端文本风格类
 * @description 该类用于定义文本风格的相关属性。
 * @param options - {Object} 可选参数。如：<br>
 *        align - {{@link SuperMap.TextAlignment}} 文本的对齐方式。<br>
 *        backColor - {{@link SuperMap.ServerColor}} 文本的背景色。<br>
 *        foreColor - {{@link SuperMap.ServerColor}} 文本的前景色。<br>
 *        backOpaque - {boolean} 文本背景是否不透明。<br>
 *        sizeFixed - {boolean} 文本大小是否固定。<br>
 *        fontHeight - {number}文本字体的高度。<br>
 *        fontWidth - {number}文本字体的宽度。<br>
 *        fontWeight - {integer} 文本字体的磅数。<br>
 *        fontName - {string} 文本字体的名称。<br>
 *        bold - {boolean} 文本是否为粗体字。<br>
 *        italic - {boolean}文本是否采用斜体。<br>
 *        italicAngle - {number}字体倾斜角度。<br>
 *        shadow - {boolean} 文本是否有阴影。<br>
 *        strikeout - {boolean} 文本字体是否加删除线。<br>
 *        outline - {boolean} 是否以轮廓的方式来显示文本的背景。<br>
 *        opaqueRate - {number}注记文字的不透明度。<br>
 *        underline - {boolean} 文本字体是否加下划线。<br>
 *        rotation -  {number} 文本旋转的角度。
 */
export class ServerTextStyle {


    constructor(options) {
        /**
         * @member SuperMap.ServerTextStyle.prototype.align -{SuperMap.TextAlignment}
         * @description 文本的对齐方式。默认为 SuperMap.TextAlignment.BASELINECENTER（基准线居中对齐）。
         */
        this.align = TextAlignment.BASELINECENTER;

        /**
         * @member SuperMap.ServerTextStyle.prototype.backColor -{SuperMap.ServerColor}
         * @description 文本的背景色。默认为白色。
         */
        this.backColor = new ServerColor(255, 255, 255);

        /**
         * @member SuperMap.ServerTextStyle.prototype.foreColor -{SuperMap.ServerColor}
         * @description 文本的前景色。默认为黑色。
         */
        this.foreColor = new ServerColor(0, 0, 0);

        /**
         * @member SuperMap.ServerTextStyle.prototype.backOpaque -{boolean}
         * @description 文本背景是否不透明。true 表示文本背景不透明。
         */
        this.backOpaque = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.sizeFixed -{boolean}
         * @description 文本大小是否固定。默认为 true，表示图片为固定像素大小，具体大小请参考 fontHeight。当设为 false 时，图片会随着地图缩放而缩放。
         */
        this.sizeFixed = true;

        /**
         * @member SuperMap.ServerTextStyle.prototype.fontHeight -{number}
         * @description 文本字体的高度，默认为6，单位与 sizeFixed 有关，当 sizeFixed 为 False 时，即非固定文本大小时使用地图坐标单位，
         *              如地理坐标系下的地图中单位为度；当 sizeFixed 为 True 时，单位为毫米（mm）。
         */
        this.fontHeight = 6;

        /**
         * @member SuperMap.ServerTextStyle.prototype.fontWidth -{number}
         * @description 文本字体的宽度。字体的宽度以英文字符为标准，由于一个中文字符相当于两个英文字符，默认为0地图坐标单位。
         */
        this.fontWidth = 0;

        /**
         * @member SuperMap.ServerTextStyle.prototype.fontWeight -{integer}
         * @description 文本字体的磅数。表示粗体的具体数值。取值范围为从0－900之间的整百数，默认值为400。
         */
        this.fontWeight = 400;

        /**
         * @member SuperMap.ServerTextStyle.prototype.fontName -{string}
         * @description 文本字体的名称。默认值为 Times New Roman。
         */
        this.fontName = "Times New Roman";

        /**
         * @member SuperMap.ServerTextStyle.prototype.bold -{boolean}
         * @description 文本是否为粗体字。true 表示为粗体。默认值为 false，即文本不是粗体字。
         */
        this.bold = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.italic -{boolean}
         * @description 文本是否采用斜体。true 表示采用斜体。默认为 false。
         */
        this.italic = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.italicAngle -{number}
         * @description 字体倾斜角度。正负度之间，以度为单位，精确到0.1度，默认为0度。当倾斜角度为0度，为系统默认的字体倾斜样式。
         *              正负度是指以纵轴为起始零度线，其纵轴左侧为正，右侧为负。允许的最大角度为60，最小-60。大于60按照60处理，小于-60按照-60处理。目前只对标签专题图有效。
         */
        this.italicAngle = 0;

        /**
         * @member SuperMap.ServerTextStyle.prototype.shadow -{boolean}
         * @description 文本是否有阴影。true 表示给文本增加阴影。默认值为 false，即文本没有阴影。
         */
        this.shadow = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.strikeout -{boolean}
         * @description 文本字体是否加删除线。true 表示加删除线。默认值为 false，即文本字体不加删除线。
         */
        this.strikeout = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.outline -{boolean}
         * @description 是否以轮廓的方式来显示文本的背景。true 表示以轮廓的方式来显示文本的背景。默认值为 false，表示不以轮廓的方式来显示文本的背景。
         */
        this.outline = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.opaqueRate -{number}
         * @description 注记文字的不透明度。不透明度的范围为0-100。默认为0，表示透明。
         */
        this.opaqueRate = 0;

        /**
         * @member SuperMap.ServerTextStyle.prototype.underline -{boolean}
         * @description 文本字体是否加下划线。true 表示加下划线。默认为 false。
         */
        this.underline = false;

        /**
         * @member SuperMap.ServerTextStyle.prototype.rotation -{number}
         * @description 文本旋转的角度。逆时针方向为正方向，单位为度，精确到0.1度。默认值为0.0。
         */
        this.rotation = 0.0;

        if (options) {
            Util.extend(this, options);
        }

       this.CLASS_NAME = "SuperMap.ServerTextStyle";
    }


    /**
     * @function SuperMap.ServerTextStyle.prototype.destroy
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
     * @function SuperMap.ServerTextStyle.fromObj
     * @description 从传入对象获服务端文本风格类。
     * @param obj - {Object} 传入对象
     * @return {SuperMap.ServerTextStyle} 返回服务端文本风格对象
     */
    static fromObj(obj) {
        var res = new ServerTextStyle(obj);
        Util.copy(res, obj);
        res.backColor = ServerColor.fromJson(obj.backColor);
        res.foreColor = ServerColor.fromJson(obj.foreColor);
        return res;
    }

}

SuperMap.ServerTextStyle = ServerTextStyle;
