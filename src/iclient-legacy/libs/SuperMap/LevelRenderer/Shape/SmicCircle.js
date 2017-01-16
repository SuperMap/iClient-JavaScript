/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicCircle
 * 圆形
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicCircle({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r: 60,
 *             brushType: "both",
 *             color: "blue",
 *             strokeColor: "red",
 *             lineWidth: 3,
 *             text: "Circle"
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
SuperMap.LevelRenderer.Shape.SmicCircle = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {number} 圆心x坐标,必设参数
     * y - {number} 圆心y坐标，必设参数
     * r - {number} 半径，必设参数
     * brushType - {string} 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * color - {string} 填充颜色,默认值"#000000"
     * strokeColor - {string} 描边颜色,默认值为'#000000'
     * lineCape — {string} 线帽样式，可以是 butt, round, square，默认是butt
     * lineWidth - {number} 描边宽度、默认是1
     * opacity - {number} 绘制透明度、默认是1，不透明
     * shadowBlur - {number} 阴影模糊度，大于0有效，默认是0
     * shadowColor - {string} 阴影颜色，默认是'#000000'
     * shadowOffsetX - {number} 阴影横向偏移，默认是0
     * shadowOffsetY - {number} 阴影纵向偏移，默认是0
     * text - {string} 图形中的附加文本，默认是0
     * textColor - {string} 文本颜色，默认是'#000000'
     * textFont - {string} 附加文本样式，eg:'bold 18px verdana'
     * textPosition - {string} 附加文本位置, 可以是 inside, left, right, top, bottom
     * textAlign - {string} 默认根据textPosition自动设置，附加文本水平对齐。可以是start, end, left, right, center
     * textBaseline {string} 默认根据textPosition自动设置，附加文本垂直对齐。可以是top, bottom, middle, alphabetic, hanging, ideographic
     */
    //打开接口 style

    /**
     * Property: type
     * {String} 图形类型。
     */
    type: 'smiccircle',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicCircle
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
     * 创建图形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function (ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y

        ctx.moveTo(x + style.r, y);
        ctx.arc(x, y, style.r, 0, Math.PI*2,true);

        return true;
    },

    /**
     * APIMethod: getRect
     * 返回圆形包围盒矩形
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

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r = style.r;             // 圆r

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }
        style.__rect = {
            x : Math.round(x - style.r - lineWidth / 2),
            y : Math.round(y - style.r - lineWidth / 2),
            width : style.r * 2 + lineWidth,
            height : style.r * 2 + lineWidth
        };

        return style.__rect;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicCircle"
});
