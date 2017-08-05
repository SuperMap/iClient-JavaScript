import SuperMap from '../SuperMap';
import ServerColor from './ServerColor';

/**
 * Class: SuperMap.ServerStyle
 * 服务端矢量要素风格类
 * 该类用于定义点状符号、线状符号、填充符号风格及其相关属性。
 */
export default  class ServerStyle {

    /**
     * APIProperty: fillBackColor
     * {SuperMap.ServerColor} 填充背景颜色。
     * 当填充模式为渐变填充时，该颜色为填充终止色。默认为白色。
     */
    fillBackColor = null;

    /**
     * APIProperty: fillBackOpaque
     * {Boolean} 背景是否不透明。
     * false 表示透明。默认值为 false。
     */
    fillBackOpaque = false;

    /**
     * APIProperty: fillForeColor
     * {SuperMap.ServerColor} 填充颜色。
     * 当填充模式为渐变填充时，该颜色为填充起始颜色。默认为红色。
     */
    fillForeColor = null;

    /**
     * APIProperty: fillGradientMode
     * {FillGradientMode} 渐变填充风格的渐变类型。
     */
    fillGradientMode = null;

    /**
     * APIProperty: fillGradientAngle
     * {Number} 渐变填充的旋转角度。
     * 单位为度，精确到0.1度，逆时针方向为正方向。
     */
    fillGradientAngle = 0;

    /**
     * APIProperty: fillGradientOffsetRatioX
     * {Number} 渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。
     * 它们的关系如下：设填充区域范围中心点的坐标为（x0, y0），填充中心点的坐标为（x, y），填充区域范围的宽度为 a，水平偏移百分比为 dx，则 x=x0 + a*dx/100。
     */
    fillGradientOffsetRatioX = 0;

    /**
     * APIProperty: fillGradientOffsetRatioY
     * {Number} 填充中心点相对于填充区域范围中心点的垂直偏移百分比。
     * 它们的关系如下：设填充区域范围中心点的坐标为（x0, y0），填充中心点的坐标为（x, y），填充区域范围的高度为 b，垂直偏移百分比为 dy，则 y=y0 + b*dx/100。
     */
    fillGradientOffsetRatioY = 0;

    /**
     * APIProperty: fillOpaqueRate
     * {Number} 填充不透明度。
     * 合法值为0--100的数值。其中为0表示完全透明；100表示完全不透明。赋值小于0时按照0处理，大于100时按照100处理。默认值为 100。
     */
    fillOpaqueRate = 100;

    /**
     * APIProperty: fillSymbolID
     * {Integer} 填充符号的编码。
     * 此编码用于唯一标识各普通填充风格的填充符号。关于填充符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
     */
    fillSymbolID = 0;

    /**
     * APIProperty: lineColor
     * {SuperMap.ServerColor} 矢量要素的边线颜色。
     * 默认为黑色。
     */
    lineColor = null;

    /**
     * APIProperty: lineSymbolID
     * {Integer} 线状符号的编码。
     * 此编码用于唯一标识各普通填充风格的填充符号，默认值为0。关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
     */
    lineSymbolID = 0;

    /**
     * APIProperty: lineWidth
     * {Number} 边线的宽度。
     * 单位为毫米，精度到0.1，默认值为1.0。
     */
    lineWidth = 1;

    /**
     * APIProperty: markerAngle
     * {Number} 点状符号的旋转角度。
     * 以度为单位，精确到0.1度，逆时针方向为正方向，默认值为0。
     */
    markerAngle = 0;

    /**
     * APIProperty: markerSize
     * {Number} 点状符号的大小。
     * 单位为毫米，精度为0.1，默认值为1.0。当该属性设置为0时，采用符号默认大小1.0显示。当该属性设置为非法值时，交由服务器默认处理。
     */
    markerSize = 1;

    /**
     * APIProperty: markerSymbolID
     * {Integer} 点状符号的编码。
     * 此编码用于唯一标识各点状符号。默认为 -1。关于线状符号的样式与对应的 ID 号请在 SuperMap 桌面软件中查找。
     */
    markerSymbolID = -1;

    /**
     * Constructor: SuperMap.ServerStyle
     * 服务端矢量要素风格类构造函数。
     *
     * Parameters:
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * fillBackColor - {SuperMap.ServerColor} 填充背景颜色。
     * fillBackOpaque - {Boolean} 背景是否不透明。
     * fillForeColor - {SuperMap.ServerColor} 填充颜色。
     * fillGradientMode - {FillGradientMode} 渐变填充风格的渐变类型。
     * fillGradientAngle - {Number} 渐变填充的旋转角度。
     * fillGradientOffsetRatioX - {Number} 渐变填充中心点相对于填充区域范围中心点的水平偏移百分比。
     * fillGradientOffsetRatioY - {Number} 填充中心点相对于填充区域范围中心点的垂直偏移百分比。
     * fillOpaqueRate - {Number} 填充不透明度。
     * fillSymbolID - {Integer} 填充符号的编码。
     * lineColor - {SuperMap.ServerColor} 矢量要素的边线颜色。
     * lineSymbolID - {Integer} 线状符号的编码。
     * lineWidth - {Number} 边线的宽度。
     * markerAngle - {Number} 点状符号的旋转角度。
     * markerSize - {Number} 点状符号的大小。
     * markerSymbolID - {Integer} 点状符号的编码。
     */
    constructor(options) {
        var me = this;
        me.fillBackColor = new ServerColor(255, 255, 255);
        me.fillForeColor = new ServerColor(255, 0, 0);
        me.lineColor = new ServerColor(0, 0, 0);
        if (options) {
            SuperMap.Util.extend(this, options);
        }
    }

    /**
     * APIMethod: destroy
     * 释放资源，将引用资源的属性置空。
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
     * Method: toServerJSONObject
     * 转换成对应的 JSON 格式对象。
     */
    toServerJSONObject() {
        var styleObj = {};
        styleObj = SuperMap.Util.copyAttributes(styleObj, this);
        //暂时先忽略serverColor往Json的转换
        return styleObj;
    }

    /**
     * Function: SuperMap.ServerStyle.fromJson
     * 将JSON对象转换为 SuperMap.ServerStyle 对象。
     *
     * Parameters:
     * jsonObject - {Object} 要转换的 JSON 对象。
     *
     * Returns:
     * {SuperMap.ServerStyle} 转化后的 SuperMap.ServerStyle 对象。
     */
    static fromJson(jsonObject) {
        if (!jsonObject) {
            return;
        }
        return new SuperMap.ServerStyle({
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

    CLASS_NAME = "SuperMap.ServerStyle"
}


SuperMap.ServerStyle = ServerStyle;
