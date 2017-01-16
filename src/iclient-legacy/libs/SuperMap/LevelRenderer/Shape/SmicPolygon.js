/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.LevelRenderer.Shape.SmicPolygon
 * 多边形。
 *
 * Inherits from:
 *  - <SuperMap.LevelRenderer.Shape>
 *
 * (code)
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicPolygon({
 *         style: {
 *             // 100x100 的正方形
 *             pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
 *             color: 'blue'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * (end)
 */
SuperMap.LevelRenderer.Shape.SmicPolygon= SuperMap.Class(SuperMap.LevelRenderer.Shape, {

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
     * {String} 图形类型.
     */
    type: 'smicpolygon',

    /**
     * APIProperty: _holePolygonPointList
     * {Array} 岛洞面多边形顶点数组（三维数组）
     *
     */
    holePolygonPointLists: null,

    /**
     * Constructor: SuperMap.LevelRenderer.Shape.SmicPolygon
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
        this.holePolygonPointLists = null;

        SuperMap.LevelRenderer.Shape.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: brush
     * 笔触。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * isHighlight - {Boolean} 是否使用高亮属性。
     *
     */
    brush : function (ctx, isHighlight) {
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];

        var style = this.style;
        if (isHighlight) {
            // 根据style扩展默认高亮样式
            style = this.getHighlightStyle(
                style,
                this.highlightStyle || {}
            );
        }

        ctx.save();
        this.setContext(ctx, style);

        // 设置 transform
        this.setTransform(ctx);

        // 先 fill 再stroke
        var hasPath = false;
        if (style.brushType == 'fill' || style.brushType == 'both' || typeof style.brushType == 'undefined') {    // 默认为fill
            ctx.beginPath();
            if (style.lineType == 'dashed'
                || style.lineType == 'dotted'
                || style.lineType == 'dot'
                || style.lineType == 'dash'
                || style.lineType == 'dashot'
                || style.lineType == 'longdash'
                || style.lineType == 'longdashdot'
                ) {
                // 特殊处理，虚线围不成path，实线再build一次
                this.buildPath(ctx,  {
                        lineType: 'solid',
                        lineWidth: style.lineWidth,
                        pointList: style.pointList
                    }
                );
                hasPath = false; // 这个path不能用
            }
            else {
                this.buildPath(ctx, style);
                hasPath = true; // 这个path能用
            }
            ctx.closePath();
            this.setCtxGlobalAlpha(ctx, "fill", style);
            ctx.fill();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        if (style.lineWidth > 0 && (style.brushType == 'stroke' || style.brushType == 'both') ) {
            if (!hasPath) {
                ctx.beginPath();
                this.buildPath(ctx, style);
            }
            this.setCtxGlobalAlpha(ctx, "stroke", style);
            ctx.stroke();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        this.drawText(ctx, style, this.style);

        //岛洞
        var hpStyle = SuperMap.Util.cloneObject(style);

        if(hpStyle.pointList){
            if(this.holePolygonPointLists && this.holePolygonPointLists.length > 0){
                var holePLS = this.holePolygonPointLists;
                var holePLSen = holePLS.length;
                for(var i = 0; i < holePLSen; i++){
                    var holePL = holePLS[i];
                    //岛洞面
                    hpStyle.pointList = holePL;

                    ctx.globalCompositeOperation = "destination-out";
                    // 先 fill 再stroke
                    var hasPath = false;
                    if (hpStyle.brushType == 'fill' || hpStyle.brushType == 'both' || typeof hpStyle.brushType == 'undefined') {    // 默认为fill
                        ctx.beginPath();
                        if (hpStyle.lineType == 'dashed'
                            || hpStyle.lineType == 'dotted'
                            || hpStyle.lineType == 'dot'
                            || hpStyle.lineType == 'dash'
                            || hpStyle.lineType == 'dashot'
                            || hpStyle.lineType == 'longdash'
                            || hpStyle.lineType == 'longdashdot'
                            ) {
                            // 特殊处理，虚线围不成path，实线再build一次
                            this.buildPath(ctx,  {
                                    lineType: 'solid',
                                    lineWidth: hpStyle.lineWidth,
                                    pointList: hpStyle.pointList
                                }
                            );
                            hasPath = false; // 这个path不能用
                        }
                        else {
                            this.buildPath(ctx, hpStyle);
                            hasPath = true; // 这个path能用
                        }
                        ctx.closePath();
                        this.setCtxGlobalAlpha(ctx, "fill", hpStyle);
                        ctx.fill();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    }

                    if (hpStyle.lineWidth > 0 && (hpStyle.brushType == 'stroke' || hpStyle.brushType == 'both') ) {
                        if (!hasPath) {
                            ctx.beginPath();
                            this.buildPath(ctx, hpStyle);
                        }
                        //如果描边，先回复 globalCompositeOperation 默认值再描边。
                        ctx.globalCompositeOperation = "source-over";
                        this.setCtxGlobalAlpha(ctx, "stroke", hpStyle);
                        ctx.stroke();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    }
                    else{
                        ctx.globalCompositeOperation = "source-over";
                    }
                }
            }

        }
        hpStyle = null;

        ctx.restore();
        return;
    },

    /**
     * APIMethod: buildPath
     * 创建多边形路径。
     *
     * Parameters:
     * ctx - {CanvasRenderingContext2D} Context2D 上下文。
     * style - {Object} style。
     *
     */
    buildPath : function (ctx, style) {
	    if(style.showShadow){
            ctx.shadowBlur = style.shadowBlur;
            ctx.shadowColor = style.shadowColor;
            ctx.shadowOffsetX = style.shadowOffsetX;
            ctx.shadowOffsetY = style.shadowOffsetY;
        }
        if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
        var __OP = this.refOriginalPosition;

        // 虽然能重用 brokenLine，但底层图形基于性能考虑，重复代码减少调用吧
        var pointList = style.pointList;

        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = SuperMap.LevelRenderer.SUtil_smoothBezier(pointList, style.smooth, true, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            var len = pointList.length;
            for (var i = 0; i < len; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p =[ pointList[(i + 1) % len][0] + __OP[0], pointList[(i + 1) % len][1] + __OP[1] ];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        }
        else {
            if (style.smooth === 'spline') {
                pointList = SuperMap.LevelRenderer.SUtil_smoothSpline(pointList, true, null, __OP);
            }

            if (!style.lineType || style.lineType == 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0]  + __OP[0], pointList[0][1] + __OP[1]);
                for (var i = 1, l = pointList.length; i < l; i++) {
                    ctx.lineTo(pointList[i][0]  + __OP[0] , pointList[i][1]  + __OP[1]);
                }
                ctx.lineTo(pointList[0][0]  + __OP[0], pointList[0][1]  + __OP[1]);
            }
            // SMIC-方法修改 - start
            else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
                ) {
                var dashLengthForStyle = style._dashLength || (style.lineWidth || 1)*(style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

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


                ctx.moveTo(pointList[0][0]  + __OP[0], pointList[0][1]  + __OP[1]);
                for (var i = 1, l = pointList.length; i < l; i++) {
                    SuperMap.LevelRenderer.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0]  + __OP[0],
                        pointList[i - 1][1]  + __OP[1],
                        pointList[i][0]  + __OP[0],
                        pointList[i][1]  + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
                SuperMap.LevelRenderer.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0]  + __OP[0],
                    pointList[pointList.length - 1][1]  + __OP[1],
                    pointList[0][0]  + __OP[0],
                    pointList[0][1]  + __OP[1],
                    dashLength,
                    [pattern1, pattern2]
                );
            }
            else if (style.lineType === 'dashot'
                || style.lineType === 'longdashdot'
                ) {
                var dashLengthForStyle = style._dashLength || (style.lineWidth || 1)*(style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

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


                ctx.moveTo(pointList[0][0]  + __OP[0], pointList[0][1]  + __OP[1]);
                for (var i = 1, l = pointList.length; i < l; i++) {
                    SuperMap.LevelRenderer.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0]  + __OP[0],
                        pointList[i - 1][1]  + __OP[1],
                        pointList[i][0]  + __OP[0],
                        pointList[i][1]  + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
                SuperMap.LevelRenderer.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0]  + __OP[0],
                    pointList[pointList.length - 1][1]  + __OP[1],
                    pointList[0][0]  + __OP[0],
                    pointList[0][1]  + __OP[1],
                    dashLength,
                    [pattern1, pattern2, pattern3, pattern4]
                );
            }

        }
        return;
    },

    /**
     * APIMethod: getRect
     * 计算返回多边形包围盒矩阵。
     * 该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * Parameters:
     * style - {Object} style
     *
     * Returns:
     * {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect : function (style, refOriginalPosition) {
        var __OP;
        if(!refOriginalPosition) {
            if(!this.refOriginalPosition || this.refOriginalPosition.length !== 2) this.refOriginalPosition = [0, 0];
            __OP = this.refOriginalPosition;
        }
        else{
            __OP = refOriginalPosition;
        }

        if (style.__rect) {
            return style.__rect;
        }

        var minX =  Number.MAX_VALUE;
        var maxX =  Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        var pointList = style.pointList;
        for (var i = 0, l = pointList.length; i < l; i++) {
            if (pointList[i][0]  + __OP[0] < minX) {
                minX = pointList[i][0]  + __OP[0];
            }
            if (pointList[i][0]  + __OP[0] > maxX) {
                maxX = pointList[i][0]  + __OP[0];
            }
            if (pointList[i][1]  + __OP[1] < minY) {
                minY = pointList[i][1]  + __OP[1];
            }
            if (pointList[i][1]  + __OP[1] > maxY) {
                maxY = pointList[i][1]  + __OP[1];
            }
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        }
        else {
            lineWidth = 0;
        }

        style.__rect = {
            x : Math.round(minX - lineWidth / 2),
            y : Math.round(minY - lineWidth / 2),
            width : maxX - minX + lineWidth,
            height : maxY - minY + lineWidth
        };
        return style.__rect;
    },

    CLASS_NAME: "SuperMap.LevelRenderer.Shape.SmicPolygon"
});
