/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {Util as CommonUtil} from '../../commontypes/Util';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicPolygon
 * @category Visualization Theme
 * @classdesc 多边形。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicPolygon({
 *         style: {
 *             // 100x100 的正方形
 *             pointList: [[0, 0], [100, 0], [100, 100], [0, 100]],
 *             color: 'blue'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 */
export class SmicPolygon extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicPolygon.prototype.type
         * @description 图形类型.
         */
        this.type = 'smicpolygon';

        /**
         * @member {Array} LevelRenderer.Shape.SmicPolygon.prototype._holePolygonPointList
         * @description 岛洞面多边形顶点数组（三维数组）
         *
         */
        this.holePolygonPointLists = null;

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicPolygon";
    }


    /**
     * @function LevelRenderer.Shape.SmicPolygon.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        this.holePolygonPointLists = null;
        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicPolygon.prototype.brush
     * @description 笔触。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {boolean} isHighlight - 是否使用高亮属性。
     *
     */
    brush(ctx, isHighlight) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

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
                || style.lineType == 'dashdot'
                || style.lineType == 'longdash'
                || style.lineType == 'longdashdot'
            ) {
                // 特殊处理，虚线围不成path，实线再build一次
                this.buildPath(ctx, {
                        lineType: 'solid',
                        lineWidth: style.lineWidth,
                        pointList: style.pointList
                    }
                );
            } else {
                this.buildPath(ctx, style);
                hasPath = true; // 这个path能用
            }
            ctx.closePath();
            this.setCtxGlobalAlpha(ctx, "fill", style);
            ctx.fill();
            this.setCtxGlobalAlpha(ctx, "reset", style);
        }

        if (style.lineWidth > 0 && (style.brushType == 'stroke' || style.brushType == 'both')) {
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
        var hpStyle = CommonUtil.cloneObject(style);

        if (hpStyle.pointList) {
            if (this.holePolygonPointLists && this.holePolygonPointLists.length > 0) {
                var holePLS = this.holePolygonPointLists;
                var holePLSen = holePLS.length;
                for (var i = 0; i < holePLSen; i++) {
                    var holePL = holePLS[i];
                    //岛洞面
                    hpStyle.pointList = holePL;

                    ctx.globalCompositeOperation = "destination-out";
                    // 先 fill 再stroke
                    hasPath = false;
                    if (hpStyle.brushType == 'fill' || hpStyle.brushType == 'both' || typeof hpStyle.brushType == 'undefined') {    // 默认为fill
                        ctx.beginPath();
                        if (hpStyle.lineType == 'dashed'
                            || hpStyle.lineType == 'dotted'
                            || hpStyle.lineType == 'dot'
                            || hpStyle.lineType == 'dash'
                            || hpStyle.lineType == 'dashdot'
                            || hpStyle.lineType == 'longdash'
                            || hpStyle.lineType == 'longdashdot'
                        ) {
                            // 特殊处理，虚线围不成path，实线再build一次
                            this.buildPath(ctx, {
                                    lineType: 'solid',
                                    lineWidth: hpStyle.lineWidth,
                                    pointList: hpStyle.pointList
                                }
                            );
                        } else {
                            this.buildPath(ctx, hpStyle);
                            hasPath = true; // 这个path能用
                        }
                        ctx.closePath();
                        this.setCtxGlobalAlpha(ctx, "fill", hpStyle);
                        ctx.fill();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    }

                    if (hpStyle.lineWidth > 0 && (hpStyle.brushType == 'stroke' || hpStyle.brushType == 'both')) {
                        if (!hasPath) {
                            ctx.beginPath();
                            this.buildPath(ctx, hpStyle);
                        }
                        //如果描边，先回复 globalCompositeOperation 默认值再描边。
                        ctx.globalCompositeOperation = "source-over";
                        this.setCtxGlobalAlpha(ctx, "stroke", hpStyle);
                        ctx.stroke();
                        this.setCtxGlobalAlpha(ctx, "reset", hpStyle);
                    } else {
                        ctx.globalCompositeOperation = "source-over";
                    }
                }
            }

        }
        ctx.restore();
        return;
    }


    /**
     * @function LevelRenderer.Shape.SmicPolygon.prototype.buildPath
     * @description 创建多边形路径。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - style。
     *
     */
    buildPath(ctx, style) {
        if (style.showShadow) {
            ctx.shadowBlur = style.shadowBlur;
            ctx.shadowColor = style.shadowColor;
            ctx.shadowOffsetX = style.shadowOffsetX;
            ctx.shadowOffsetY = style.shadowOffsetY;
        }
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        // 虽然能重用 brokenLine，但底层图形基于性能考虑，重复代码减少调用吧
        var pointList = style.pointList;

        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = SUtil.SUtil_smoothBezier(pointList, style.smooth, true, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            var len = pointList.length;
            for (var i = 0; i < len; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[(i + 1) % len][0] + __OP[0], pointList[(i + 1) % len][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth === 'spline') {
                pointList = SUtil.SUtil_smoothSpline(pointList, true, null, __OP);
            }

            if (!style.lineType || style.lineType == 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
                ctx.lineTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            } else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
            ) {
                // SMIC-方法修改 - start
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;

                //dashed
                if (style.lineType === 'dashed') {
                    pattern1 *= 5;
                    pattern2 *= 5;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //dotted
                if (style.lineType === 'dotted') {
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dot
                if (style.lineType === 'dot') {
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 = 1;
                        pattern2 += dashLength;
                    }
                }

                //dash
                if (style.lineType === 'dash') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }

                //longdash
                if (style.lineType === 'longdash') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                    }
                }


                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0],
                        pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
                SUtil.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0] + __OP[0],
                    pointList[pointList.length - 1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength,
                    [pattern1, pattern2]
                );
            } else if (style.lineType === 'dashdot'
                || style.lineType === 'longdashdot'
            ) {
                let dashLengthForStyle = style._dashLength || (style.lineWidth || 1) * (style.lineType == 'dashed' ? 5 : 1);
                style._dashLength = dashLengthForStyle;

                let dashLength = (style.lineWidth || 1);
                let pattern1 = dashLength;
                let pattern2 = dashLength;
                let pattern3 = dashLength;
                let pattern4 = dashLength;

                //dashdot
                if (style.lineType === 'dashdot') {
                    pattern1 *= 4;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }

                //longdashdot
                if (style.lineType === 'longdashdot') {
                    pattern1 *= 8;
                    pattern2 *= 4;
                    pattern4 *= 4;
                    if (style.lineCap && style.lineCap !== "butt") {
                        pattern1 -= dashLength;
                        pattern2 += dashLength;
                        pattern3 = 1;
                        pattern4 += dashLength;
                    }
                }


                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < pointList.length; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0],
                        pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0],
                        pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2, pattern3, pattern4]
                    );
                }
                SUtil.SUtil_dashedLineTo(
                    ctx,
                    pointList[pointList.length - 1][0] + __OP[0],
                    pointList[pointList.length - 1][1] + __OP[1],
                    pointList[0][0] + __OP[0],
                    pointList[0][1] + __OP[1],
                    dashLength,
                    [pattern1, pattern2, pattern3, pattern4]
                );
            }

        }
        return;
    }


    /**
     * @function LevelRenderer.Shape.SmicPolygon.prototype.getRect
     * @description 计算返回多边形包围盒矩阵。该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     *
     */
    getRect(style, refOriginalPosition) {
        var __OP;
        if (!refOriginalPosition) {
            if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
                this.refOriginalPosition = [0, 0];
            }
            __OP = this.refOriginalPosition;
        } else {
            __OP = refOriginalPosition;
        }

        if (style.__rect) {
            return style.__rect;
        }

        var minX = Number.MAX_VALUE;
        var maxX = Number.MIN_VALUE;
        var minY = Number.MAX_VALUE;
        var maxY = Number.MIN_VALUE;

        var pointList = style.pointList;
        for (var i = 0, l = pointList.length; i < l; i++) {
            if (pointList[i][0] + __OP[0] < minX) {
                minX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][0] + __OP[0] > maxX) {
                maxX = pointList[i][0] + __OP[0];
            }
            if (pointList[i][1] + __OP[1] < minY) {
                minY = pointList[i][1] + __OP[1];
            }
            if (pointList[i][1] + __OP[1] > maxY) {
                maxY = pointList[i][1] + __OP[1];
            }
        }

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }

        style.__rect = {
            x: Math.round(minX - lineWidth / 2),
            y: Math.round(minY - lineWidth / 2),
            width: maxX - minX + lineWidth,
            height: maxY - minY + lineWidth
        };
        return style.__rect;
    }

}
