/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicIsogon
 * 正多边形。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 */
SuperMap.LevelRenderer.Shape.SmicIsogon = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 正 n 边形外接圆心 x 坐标，必设参数。
     * y - {Number} 正 n 边形外接圆心 y 坐标，必设参数。
     * r - {Number} 正n边形外接圆半径，必设参数。
     *ｎ - {Number} 指明正几边形，必设参数（n>=3）。
     * brushType - {String} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {String} 填充颜色。默认值："#000000'"。
     * strokeColor - {String} 描边颜色。默认值："#000000'"。
     * lineCape - {String} 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * lineWidth - {Number} 描边宽度。默认值：1。
     * opacity - {Number} 绘制透明度。默认值：1。
     * shadowBlur - {Number} 阴影模糊度，大于0有效。默认值：0。
     * shadowColor - {Number} 阴影颜色。默认值："#000000'"。
     * shadowOffsetX - {Number} 阴影横向偏移。默认值：0。
     * shadowOffsetY - {Number} 阴影纵向偏移。默认值：0。
     * text - {String} 图形中的附加文本。默认值：""。
     * textColor - {String} 文本颜色。默认值："#000000'"。
     * textFont - {String} 附加文本样式。示例:'bold 18px verdana'。
     * textPosition - {String} 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * textAlign - {String} 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * textBaseline - {String} 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * Property: type
     * {String} 图形类型。
     */
    type: 'smicisogon',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicIsogon
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    initialize: function(options) {
        SuperMap.LevelRenderer.Shape.prototype.initialize.apply(this, arguments);
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
    },

    /**
     * APIMethod: destroy
     * 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy: function() {
        this.type = null;
        SuperMap.LevelRenderer.Shape.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: buildPath
     * 创建n角星（n>=3）路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function (ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];;
        var __OP = this.refOriginalPosition;

        var sin = SuperMap.LevelRenderer.Util_math.sin;
        var cos = SuperMap.LevelRenderer.Util_math.cos;
        var PI = Math.PI;

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;

        var dStep = 2 * PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断insight
        var pointList = style.pointList = [];
        pointList.push([ xStart, yStart ]);
        for (var i = 0, end = n - 1; i < end; i++) {
            pointList.push([ x + r * cos(deg), y + r * sin(deg) ]);
            deg += dStep;
        }
        pointList.push([ xStart, yStart ]);

        // 绘制
        ctx.moveTo(pointList[0][0], pointList[0][1]);
        for (var i = 0; i < pointList.length; i++) {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
        }
        ctx.closePath();

        return;
    },

    /**
     * APIMethod: getRect
     * 计算返回正多边形的包围盒矩形。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect : function (style) {
        if (style.__rect) {
            return style.__rect;
        }

        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];;
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }
        style.__rect = {
            x : Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y : Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width : style.r * 2 + lineWidth,
            height : style.r * 2 + lineWidth
        };

        return style.__rect;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicIsogon"
});