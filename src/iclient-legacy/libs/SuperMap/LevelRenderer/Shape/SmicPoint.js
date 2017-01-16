/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicPoint
 * 点。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicPoint({
 *       style: {
 *           x: 100,
 *           y: 100,
 *           r: 40,
 *           brushType: 'both',
 *           color: 'blue',
 *           strokeColor: 'red',
 *           lineWidth: 3,
 *           text: 'point'
 *       }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
SuperMap.LevelRenderer.Shape.SmicPoint = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * x - {Number} 圆心x坐标，必设参数。
     * y - {Number} 圆心y坐标，必设参数。
     * r - {Number} 半径，必设参数。
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
    type: 'smicpoint',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicPoint
     * 构造函数。
     *
     * Parameters:
     * options - {Array} shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    initialize: function() {
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
     * 创建点触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function (ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        ctx.arc(style.x + __OP[0], style.y  + __OP[1], style.r, 0, Math.PI * 2, true);
        return;
    },

    /**
     * APIMethod: getRect
     * 计算返回点的包围盒矩形。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect : function (style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        if (style.__rect) {
            return style.__rect;
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }
        style.__rect = {
            x : Math.round( (style.x + __OP[0]) - style.r - lineWidth / 2),
            y : Math.round( (style.y + __OP[1]) - style.r - lineWidth / 2),
            width : style.r * 2 + lineWidth,
            height : style.r * 2 + lineWidth
        };

        return style.__rect;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicPoint"
});