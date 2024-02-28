/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class ServerStyle
 * @deprecatedclass SuperMap.ServerStyle
 * @category  iServer Map Theme
 * @classdesc 服务端矢量要素风格类。该类用于定义点状符号、线状符号、填充符号的风格及其相关属性。
 * @param {Object} options - 参数。
 * @param {FillGradientMode} options.fillGradientMode - 渐变填充风格的渐变类型。
 * @param {ServerColor} [options.fillBackColor=[255,255,255]] - 填充背景颜色。
 * @param {boolean} [options.fillBackOpaque=false] - 背景是否不透明。
 * @param {ServerColor} [options.fillForeColor=[255,0,0]] - 填充颜色。
 * @param {number} [options.fillGradientAngle=0] - 渐变填充的旋转角度。
 * @param {number} [options.fillGradientOffsetRatioX=0] - 渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。
 * @param {number} [options.fillGradientOffsetRatioY=0] - 渐变填充中心点相对于填充区域范围中心点的垂直偏移百分比。
 * @param {number} [options.fillOpaqueRate=100] - 填充不透明度。
 * @param {number} [options.fillSymbolID=0] - 填充符号的编码。
 * @param {ServerColor} [options.lineColor] - 矢量要素的边线颜色。默认 lineColor = new ServerColor(0, 0, 0)。
 * @param {number} [options.lineSymbolID=0] - 线状符号的编码。
 * @param {number} [options.lineWidth=1] - 边线的宽度。
 * @param {number} [options.markerAngle=0] - 点状符号的旋转角度。
 * @param {number} [options.markerSize=1] - 点状符号的大小。
 * @param {number} [options.markerSymbolID=-1] - 点状符号的编码。
 * @usage
 */
export class ServerStyle {

    constructor(options) {
        /**
         * @member {ServerColor} ServerStyle.prototype.fillBackColor
         * @description 填充背景颜色。当填充模式为渐变填充时，该颜色为填充终止色。
         */
        this.fillBackColor = new ServerColor(255, 255, 255);

        /**
         * @member {boolean} [ServerStyle.prototype.fillBackOpaque=false]
         * @description 背景是否不透明。false 表示透明。
         */
        this.fillBackOpaque = false;

        /**
         * @member {ServerColor} ServerStyle.prototype.fillForeColor
         * @description 填充颜色。当填充模式为渐变填充时，该颜色为填充起始颜色。
         */
        this.fillForeColor = new ServerColor(255, 0, 0);

        /**
         * @member {FillGradientMode} ServerStyle.prototype.fillGradientMode
         * @description 渐变填充风格的渐变类型。
         */
        this.fillGradientMode = null;

        /**
         * @member {number} ServerStyle.prototype.fillGradientAngle -
         * @description 渐变填充的旋转角度。单位为度，精确到 0.1 度，逆时针方向为正方向。
         */
        this.fillGradientAngle = 0;

        /**
         * @member {number} ServerStyle.prototype.fillGradientOffsetRatioX
         * @description 渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。它们的关系如下：设填充区域范围中心点的坐标为（x0, y0），
         *              填充中心点的坐标为（x, y），填充区域范围的宽度为 a，水平偏移百分比为 dx，则 x=x0 + a*dx/100。
         */
        this.fillGradientOffsetRatioX = 0;

        /**
         * @member {number} ServerStyle.prototype.fillGradientOffsetRatioY
         * @description 渐变填充中心点相对于填充区域范围中心点的垂直偏移百分比。它们的关系如下：<br>
         *              设填充区域范围中心点的坐标为（x0, y0），填充中心点的坐标为（x, y），填充区域范围的高度为 b，垂直偏移百分比为 dy，则 y=y0 + b*dx/100。
         */
        this.fillGradientOffsetRatioY = 0;

        /**
         * @member {number} [ServerStyle.prototype.fillOpaqueRate=100]
         * @description 填充不透明度。合法值为 0 - 100 的数值。其中为 0 表示完全透明；
         *              100 表示完全不透明。赋值小于 0 时按照 0 处理，大于 100 时按照 100 处理。
         */
        this.fillOpaqueRate = 100;

        /**
         * @member {number} ServerStyle.prototype.fillSymbolID
         * @description 填充符号的编码。此编码用于唯一标识各普通填充风格的填充符号。
         *              关于填充符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.fillSymbolID = 0;

        /**
         * @member {ServerColor} ServerStyle.prototype.lineColor
         * @description 矢量要素的边线颜色。如果等级符号是点符号，点符号的颜色由 lineColor 控制。
         */
        this.lineColor = new ServerColor(0, 0, 0);

        /**
         * @member {number} [ServerStyle.prototype.lineSymbolID=0]
         * @description 线状符号的编码。此编码用于唯一标识各普通填充风格的填充符号。
         *              关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.lineSymbolID = 0;

        /**
         * @member {number} [ServerStyle.prototype.lineWidth=1.0]
         * @description 边线的宽度。单位为毫米，精度到 0.1。
         */
        this.lineWidth = 1;

        /**
         * @member {number} [ServerStyle.prototype.markerAngle=0]
         * @description 点状符号的旋转角度。以度为单位，精确到 0.1 度，逆时针方向为正方向。
         */
        this.markerAngle = 0;

        /**
         * @member {number} [ServerStyle.prototype.markerSize=1.0]
         * @description 点状符号的大小。单位为毫米，精度为 0.1。当该属性设置为0时，采用符号默认大小 1.0 显示。
         *              当该属性设置为非法值时，交由服务器默认处理。
         */
        this.markerSize = 1;

        /**
         * @member {number} [ServerStyle.prototype.markerSymbolID=-1]
         * @description 点状符号的编码。此编码用于唯一标识各点状符号。
         *              关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.markerSymbolID = -1;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ServerStyle";
    }

    /**
     * @function ServerStyle.prototype.destroy
     * @description 释放资源，将引用资源的属性置空。
     */
    destroy() {
        var me = this;
        if (me.fillBackColor) {
            me.fillBackColor.destroy();
            me.fillBackColor = null;
        }
        me.fillBackOpaque = null;

        if (me.fillForeColor) {
            me.fillForeColor.destroy();
            me.fillForeColor = null;
        }
        me.fillGradientMode = null;
        me.fillGradientAngle = null;
        me.fillGradientOffsetRatioX = null;
        me.fillGradientOffsetRatioY = null;
        me.fillOpaqueRate = null;
        me.fillSymbolID = null;
        if (me.lineColor) {
            me.lineColor.destroy();
            me.lineColor = null;
        }
        me.lineSymbolID = null;
        me.lineWidth = null;
        me.markerAngle = null;
        me.markerSize = null;
        me.markerSymbolID = null;
    }

    /**
     * @function ServerStyle.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @returns {Object} 对应的 JSON 格式对象.
     */
    toServerJSONObject() {
        var styleObj = {};
        styleObj = Util.copyAttributes(styleObj, this);
        //暂时先忽略serverColor往Json的转换
        return styleObj;
    }

    /**
     * @function ServerStyle.fromJson
     * @description 将JSON对象转换为 ServerStyle 对象。
     * @param {Object} jsonObject - 要转换的 JSON 对象。
     * @returns {ServerStyle} 转化后的 ServerStyle 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new ServerStyle({
            fillBackColor: ServerColor.fromJson(jsonObject.fillBackColor),
            fillBackOpaque: jsonObject.fillBackOpaque,
            fillForeColor: ServerColor.fromJson(jsonObject.fillForeColor),
            fillGradientMode: jsonObject.fillGradientMode,
            fillGradientAngle: jsonObject.fillGradientAngle,
            fillGradientOffsetRatioX: jsonObject.fillGradientOffsetRatioX,
            fillGradientOffsetRatioY: jsonObject.fillGradientOffsetRatioY,
            fillOpaqueRate: jsonObject.fillOpaqueRate,
            fillSymbolID: jsonObject.fillSymbolID,
            lineColor: ServerColor.fromJson(jsonObject.lineColor),
            lineSymbolID: jsonObject.lineSymbolID,
            lineWidth: jsonObject.lineWidth,
            markerAngle: jsonObject.markerAngle,
            markerSize: jsonObject.markerSize,
            markerSymbolID: jsonObject.markerSymbolID
        });
    }

}


