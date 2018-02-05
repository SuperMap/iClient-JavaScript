import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {ServerColor} from './ServerColor';

/**
 * @class SuperMap.ServerStyle
 * @category  iServer Map Theme
 * @classdesc 服务端矢量要素风格类。
 * @description 该类用于定义点状符号、线状符号、填充符号风格及其相关属性。
 * @param options - {Object} 可选参数。如：<br>
 *        fillBackColor - {{@link SuperMap.ServerColor}} 填充背景颜色。<br>
 *        fillBackOpaque - {boolean} 背景是否不透明。<br>
 *        fillForeColor - {{@link SuperMap.ServerColor}} 填充颜色。<br>
 *        fillGradientMode - {{@link SuperMap.FillGradientMode}} 渐变填充风格的渐变类型。<br>
 *        fillGradientAngle - {number}渐变填充的旋转角度。<br>
 *        fillGradientOffsetRatioX - {number}渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。<br>
 *        fillGradientOffsetRatioY - {number}填充中心点相对于填充区域范围中心点的垂直偏移百分比。<br>
 *        fillOpaqueRate - {number}填充不透明度。<br>
 *        fillSymbolID - {integer} 填充符号的编码。<br>
 *        lineColor - {{@link SuperMap.ServerColor}} 矢量要素的边线颜色。<br>
 *        lineSymbolID - {integer} 线状符号的编码。<br>
 *        lineWidth - {number}边线的宽度。<br>
 *        markerAngle - {number}点状符号的旋转角度。<br>
 *        markerSize - {number}点状符号的大小。<br>
 *        markerSymbolID - {integer} 点状符号的编码。
 */
export class ServerStyle {

    constructor(options) {
        /**
         * @member SuperMap.ServerStyle.prototype.fillBackColor -{SuperMap.ServerColor}
         * @description 填充背景颜色。当填充模式为渐变填充时，该颜色为填充终止色。默认为白色。
         */
        this.fillBackColor = new ServerColor(255, 255, 255);

        /**
         * @member SuperMap.ServerStyle.prototype.fillBackOpaque -{boolean}
         * @description 背景是否不透明。false 表示透明。默认值为 false。
         */
        this.fillBackOpaque = false;

        /**
         * @member SuperMap.ServerStyle.prototype.fillForeColor -{SuperMap.ServerColor}
         * @description 填充颜色。当填充模式为渐变填充时，该颜色为填充起始颜色。默认为红色。
         */
        this.fillForeColor = new ServerColor(255, 0, 0);

        /**
         * @member SuperMap.ServerStyle.prototype.fillGradientMode -{SuperMap.FillGradientMode}
         * @description 渐变填充风格的渐变类型。
         */
        this.fillGradientMode = null;

        /**
         * @member SuperMap.ServerStyle.prototype.fillGradientAngle -{number}
         * @description 渐变填充的旋转角度。单位为度，精确到0.1度，逆时针方向为正方向。
         */
        this.fillGradientAngle = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.fillGradientOffsetRatioX -{number}
         * @description 渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。它们的关系如下：设填充区域范围中心点的坐标为（x0, y0），
         *              填充中心点的坐标为（x, y），填充区域范围的宽度为 a，水平偏移百分比为 dx，则 x=x0 + a*dx/100。
         */
        this.fillGradientOffsetRatioX = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.fillGradientOffsetRatioY -{number}
         * @description 填充中心点相对于填充区域范围中心点的垂直偏移百分比。它们的关系如下：<br>
         *           设填充区域范围中心点的坐标为（x0, y0），填充中心点的坐标为（x, y），填充区域范围的高度为 b，垂直偏移百分比为 dy，则 y=y0 + b*dx/100。
         */
        this.fillGradientOffsetRatioY = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.fillOpaqueRate -{number}
         * @description 填充不透明度。合法值为0--100的数值。其中为0表示完全透明；
         *              100表示完全不透明。赋值小于0时按照0处理，大于100时按照100处理。默认值为 100。
         */
        this.fillOpaqueRate = 100;

        /**
         * @member SuperMap.ServerStyle.prototype.fillSymbolID -{integer}
         * @description 填充符号的编码。此编码用于唯一标识各普通填充风格的填充符号。
         *              关于填充符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.fillSymbolID = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.lineColor -{SuperMap.ServerColor}
         * @description 矢量要素的边线颜色。默认为黑色。如果等级符号是点符号，点符号的颜色由lineColor控制
         */
        this.lineColor = new ServerColor(0, 0, 0);

        /**
         * @member SuperMap.ServerStyle.prototype.lineSymbolID -{integer}
         * @description 线状符号的编码。此编码用于唯一标识各普通填充风格的填充符号，默认值为0。
         *              关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.lineSymbolID = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.lineWidth -{number}
         * @description 边线的宽度。单位为毫米，精度到0.1，默认值为1.0。
         */
        this.lineWidth = 1;

        /**
         * @member SuperMap.ServerStyle.prototype.markerAngle -{number}
         * @description 点状符号的旋转角度。以度为单位，精确到0.1度，逆时针方向为正方向，默认值为0。
         */
        this.markerAngle = 0;

        /**
         * @member SuperMap.ServerStyle.prototype.markerSize -{number}
         * @description 点状符号的大小。单位为毫米，精度为0.1，默认值为1.0。当该属性设置为0时，采用符号默认大小1.0显示。
         *              当该属性设置为非法值时，交由服务器默认处理。
         */
        this.markerSize = 1;

        /**
         * @member SuperMap.ServerStyle.prototype.markerSymbolID -{integer}
         * @description 点状符号的编码。此编码用于唯一标识各点状符号。默认为 -1。
         *              关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
         */
        this.markerSymbolID = -1;
        if (options) {
            Util.extend(this, options);
        }

        this.CLASS_NAME = "SuperMap.ServerStyle";
    }

    /**
     * @function SuperMap.ServerStyle.prototype.destroy
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
     * @function SuperMap.ServerStyle.prototype.toServerJSONObject
     * @description 转换成对应的 JSON 格式对象。
     * @return{Object } 对应的 JSON 格式对象
     */
    toServerJSONObject() {
        var styleObj = {};
        styleObj = Util.copyAttributes(styleObj, this);
        //暂时先忽略serverColor往Json的转换
        return styleObj;
    }

    /**
     * @function SuperMap.ServerStyle.fromJson
     * @description 将JSON对象转换为 SuperMap.ServerStyle 对象。
     * @param jsonObject - {Object} 要转换的 JSON 对象。
     * @return{SuperMap.ServerStyle} 转化后的 SuperMap.ServerStyle 对象。
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


SuperMap.ServerStyle = ServerStyle;
