/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicSector
 * 扇形。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicSector({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 60,
 *             r0: 30,
 *             startAngle: 0,
 *             endEngle: 180
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
SuperMap.LevelRenderer.Shape.SmicSector = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心 x 坐标，必设参数。
     * y - {Number} 圆心 y 坐标，必设参数。
     * r - {Number} 外圆半径，必设参数。
     * r0 - {Number} 内圆半径，指定后将出现内弧，同时扇边长度为`r - r0`。取值范围[0, r)，默认值：0。
     * startAngle - {Number} 起始角度，必设参数。取值范围[0, 360)。
     * endAngle - {Number} 结束角度，必设参数。取值范围(0, 360。
     * clockWise - {Boolean} 是否是顺时针。默认值：false。
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
    type: 'smicsector',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicSector
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
     * 创建扇形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function (ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];;
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = style.startAngle;          // 起始角度[0,360)
        var endAngle = style.endAngle;              // 结束角度(0,360]
        var clockWise = style.clockWise || false;

        startAngle = SuperMap.LevelRenderer.Util_math.degreeToRadian(startAngle);
        endAngle = SuperMap.LevelRenderer.Util_math.degreeToRadian(endAngle);

        if (!clockWise) {
            // 扇形默认是逆时针方向，Y轴向上
            // 这个跟arc的标准不一样，为了兼容echarts
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        var unitX = SuperMap.LevelRenderer.Util_math.cos(startAngle);
        var unitY = SuperMap.LevelRenderer.Util_math.sin(startAngle);
        ctx.moveTo(
            unitX * r0 + x,
            unitY * r0 + y
        );

        ctx.lineTo(
            unitX * r + x,
            unitY * r + y
        );

        ctx.arc(x, y, r, startAngle, endAngle, !clockWise);

        ctx.lineTo(
            SuperMap.LevelRenderer.Util_math.cos(endAngle) * r0 + x,
            SuperMap.LevelRenderer.Util_math.sin(endAngle) * r0 + y
        );

        if (r0 !== 0) {
            ctx.arc(x, y, r0, endAngle, startAngle, clockWise);
        }

        ctx.closePath();

        return;
    },

    /**
     * APIMethod: getRect
     * 返回扇形包围盒矩形
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

        var min0 = SuperMap.LevelRenderer.Util_vector.create();
        var min1 = SuperMap.LevelRenderer.Util_vector.create();
        var max0 = SuperMap.LevelRenderer.Util_vector.create();
        var max1 = SuperMap.LevelRenderer.Util_vector.create();

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = SuperMap.LevelRenderer.Util_math.degreeToRadian(style.startAngle);
        var endAngle = SuperMap.LevelRenderer.Util_math.degreeToRadian(style.endAngle);
        var clockWise = style.clockWise;

        if (!clockWise) {
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        if (r0 > 1) {
            SuperMap.LevelRenderer.Util_computeBoundingBox.arc(
                x, y, r0, startAngle, endAngle, !clockWise, min0, max0
            );
        } else {
            min0[0] = max0[0] = x;
            min0[1] = max0[1] = y;
        }
        SuperMap.LevelRenderer.Util_computeBoundingBox.arc(
            x, y, r, startAngle, endAngle, !clockWise, min1, max1
        );

        SuperMap.LevelRenderer.Util_vector.min(min0, min0, min1);
        SuperMap.LevelRenderer.Util_vector.max(max0, max0, max1);
        style.__rect = {
            x: min0[0],
            y: min0[1],
            width: max0[0] - min0[0],
            height: max0[1] - min0[1]
        };
        return style.__rect;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicSector"
});
