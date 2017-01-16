/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicStar
 * n 角星（n>3）。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicStar({
 *         style: {
 *             x: 200,
 *             y: 100,
 *             r: 150,
 *             n: 5,
 *             text: '五角星'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
SuperMap.LevelRenderer.Shape.SmicStar = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} n 角星外接圆心 x 坐标，必设参数。
     * y - {Number} n 角星外接圆心 y 坐标，必设参数。
     * r - {Number} n 角星外接圆半径，必设参数。
     * r0 - {Number} n 角星内部顶点（凹点）的外接圆半径。如果不指定此参数，则自动计算：取相隔外部顶点连线的交点作内部顶点。
     * n - {Number} 指明几角星，必设参数。
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
    type: 'smicstar',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicStar
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
     * 创建n  角星（n>3）路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath: function(ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var sin = SuperMap.LevelRenderer.Util_math.sin;
        var cos = SuperMap.LevelRenderer.Util_math.cos;
        var PI = Math.PI;

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;
        var r0 = style.r0;

        // 如果未指定内部顶点外接圆半径，则自动计算
        if (r0 == null) {
            r0 = n > 4
                // 相隔的外部顶点的连线的交点，
                // 被取为内部交点，以此计算r0
                ? r * cos(2 * PI / n) / cos(PI / n)
                // 二三四角星的特殊处理
                : r / 3;
        }

        var dStep = PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断inside
        var pointList = style.pointList = [];
        pointList.push([ xStart, yStart ]);
        for (var i = 0, end = n * 2 - 1, ri; i < end; i++) {
            ri = i % 2 === 0 ? r0 : r;
            pointList.push([ x + ri * cos(deg), y + ri * sin(deg) ]);
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
     * 返回 n 角星包围盒矩形。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect: function(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
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

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicStar"
});