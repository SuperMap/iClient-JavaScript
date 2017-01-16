/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicBrokenLine
 * 折线(ic)。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicBrokenLine({
 *         style: {
 *             pointList: [[0, 0], [100, 100], [100, 0]],
 *             smooth: 'bezier',
 *             strokeColor: 'purple'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 *
 */
SuperMap.LevelRenderer.Shape.SmicBrokenLine = SuperMap.Class(SuperMap.LevelRenderer.Shape, {

    /**
     * Property: style
     * {Object} 绘制样式。
     *
     * Symbolizer properties:
     * pointList - {Array} 节点数组，二维数组。默认值：null，必设参数。其形式如下：
     * (code)
     * (start code)
     *  [
     *  [10, 20],         //单个节点
     *  [30, 40],
     *  [25, 30]
     *   ]
     * (end)
     * smooth - {string} 是否做平滑插值, 平滑算法可以选择 "bezier", "spline"。默认值："";
     * smoothConstraint - {Number} 平滑约束。
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
     * Property: brushTypeOnly
     * {String}  线条只能描边。
     */
    brushTypeOnly: 'stroke',

    /**
     * Property: textPosition
     * {String} 文本位置。
     */
    textPosition: 'end',

    /**
     * Property: type
     * {String} 图形类型.
     */
    type: 'smicbroken-line',

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicBrokenLine
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
        this.brushTypeOnly = null;
        this.textPosition = null;
        this.type = null;

        SuperMap.LevelRenderer.Shape.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: buildPath
     * 创建折线路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function(ctx, style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];;
        var __OP = this.refOriginalPosition;

        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var len = Math.min(style.pointList.length, Math.round(style.pointListLength || style.pointList.length) );

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = SuperMap.LevelRenderer.SUtil_smoothBezier(pointList, style.smooth, false, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            for (var i = 0; i < len - 1; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p =[ pointList[i + 1][0] + __OP[0], pointList[i + 1][1] + __OP[1] ];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        }
        else {
            if (style.smooth === 'spline') {
                pointList = SuperMap.LevelRenderer.SUtil_smoothSpline(pointList, null, null, __OP);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType === 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i < len; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
            }
            else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
                ) {
                var dashLength = (style.lineWidth || 1);
                var pattern1 = dashLength;
                var pattern2 = dashLength;

                //dashed
                if(style.lineType === 'dashed'){
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 -= dashLength;
                        pattern2 +=  dashLength;
                    }
                }

                //dotted
                if(style.lineType === 'dotted'){
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 = 1;
                        pattern2 +=  dashLength;
                    }
                }

                //dot
                if(style.lineType === 'dot'){
                    pattern2 *= 4;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 = 1;
                        pattern2 +=  dashLength;
                    }
                }

                //dash
                if(style.lineType === 'dash'){
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 -= dashLength;
                        pattern2 +=  dashLength;
                    }
                }

                //longdash
                if(style.lineType === 'longdash'){
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 -= dashLength;
                        pattern2 +=  dashLength;
                    }
                }

                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i < len; i++) {
                    SuperMap.LevelRenderer.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
            }
            else if (style.lineType === 'dashot'
                || style.lineType === 'longdashdot'
                ) {
                var dashLength = (style.lineWidth || 1);
                var pattern1 = dashLength;
                var pattern2 = dashLength;
                var pattern3 = dashLength;
                var pattern4 = dashLength;

                //dashot
                if(style.lineType === 'dashot'){
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 -= dashLength;
                        pattern2 +=  dashLength;
                        pattern3 = 1;
                        pattern4 +=  dashLength;
                    }
                }

                //longdashdot
                if(style.lineType === 'longdashdot'){
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if(style.lineCap && style.lineCap !== "butt"){
                        pattern1 -= dashLength;
                        pattern2 +=  dashLength;
                        pattern3 = 1;
                        pattern4 +=  dashLength;
                    }
                }

                var dashLength = (style.lineWidth || 1)
                    * (style.lineType === 'dashed' ? 5 : 1);
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1; i < len; i++) {
                    SuperMap.LevelRenderer.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
            }

        }
        return;
    },

    /**
     * APIMethod: getRect
     * 计算返回折线包围盒矩形。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect : function(style) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;
        return SuperMap.LevelRenderer.Shape.SmicPolygon.prototype.getRect.apply(this, [style, __OP]);
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicBrokenLine"
});
