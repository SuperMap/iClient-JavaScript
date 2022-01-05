/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {SmicPolygon} from './SmicPolygon';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicBrokenLine
 * @category Visualization Theme
 * @classdesc 折线(ic)。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicBrokenLine({
 *         style: {
 *             pointList: [[0, 0], [100, 100], [100, 0]],
 *             smooth: 'bezier',
 *             strokeColor: 'purple'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 * @param {array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 *
 */
export class SmicBrokenLine extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string}  LevelRenderer.Shape.SmicBrokenLine.prototype.brushTypeOnly
         * @description 线条只能描边。
         */
        this.brushTypeOnly = 'stroke';

        /**
         * @member {string} LevelRenderer.Shape.SmicBrokenLine.prototype.textPosition
         * @description 文本位置。
         */
        this.textPosition = 'end';

        /**
         * @member {string} LevelRenderer.Shape.SmicBrokenLine.prototype.type
         * @description 图形类型.
         */
        this.type = 'smicbroken-line';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicBrokenLine";
    }


    /**
     * @function LevelRenderer.Shape.SmicBrokenLine.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.brushTypeOnly = null;
        this.textPosition = null;
        this.type = null;

        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicBrokenLine.prototype.buildPath
     * @description 创建折线路径。
     *
     * @param {CanvasRenderingContext2D} ctx - Context2D 上下文。
     * @param {Object} style - style。
     *
     */
    buildPath(ctx, style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        var __OP = this.refOriginalPosition;

        var pointList = style.pointList;
        if (pointList.length < 2) {
            // 少于2个点就不画了~
            return;
        }

        var len = Math.min(style.pointList.length, Math.round(style.pointListLength || style.pointList.length));

        if (style.smooth && style.smooth !== 'spline') {
            var controlPoints = SUtil.SUtil_smoothBezier(pointList, style.smooth, false, style.smoothConstraint, __OP);

            ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
            var cp1;
            var cp2;
            var p;
            for (let i = 0; i < len - 1; i++) {
                cp1 = controlPoints[i * 2];
                cp2 = controlPoints[i * 2 + 1];
                p = [pointList[i + 1][0] + __OP[0], pointList[i + 1][1] + __OP[1]];
                ctx.bezierCurveTo(
                    cp1[0], cp1[1], cp2[0], cp2[1], p[0], p[1]
                );
            }
        } else {
            if (style.smooth === 'spline') {
                pointList = SUtil.SUtil_smoothSpline(pointList, null, null, __OP);
                len = pointList.length;
            }
            if (!style.lineType || style.lineType === 'solid') {
                // 默认为实线
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    ctx.lineTo(pointList[i][0] + __OP[0], pointList[i][1] + __OP[1]);
                }
            } else if (style.lineType === 'dashed'
                || style.lineType === 'dotted'
                || style.lineType === 'dot'
                || style.lineType === 'dash'
                || style.lineType === 'longdash'
            ) {
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
                for (var i = 1; i < len; i++) {
                    SUtil.SUtil_dashedLineTo(
                        ctx,
                        pointList[i - 1][0] + __OP[0], pointList[i - 1][1] + __OP[1],
                        pointList[i][0] + __OP[0], pointList[i][1] + __OP[1],
                        dashLength,
                        [pattern1, pattern2]
                    );
                }
            } else if (style.lineType === 'dashdot'
                || style.lineType === 'longdashdot'
            ) {
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

                dashLength = (style.lineWidth || 1)
                    * (style.lineType === 'dashed' ? 5 : 1);
                ctx.moveTo(pointList[0][0] + __OP[0], pointList[0][1] + __OP[1]);
                for (let i = 1; i < len; i++) {
                    SUtil.SUtil_dashedLineTo(
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
    }


    /**
     * @function LevelRenderer.Shape.SmicBrokenLine.prototype.getRect
     * @description 计算返回折线包围盒矩形。该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;
        return SmicPolygon.prototype.getRect.apply(this, [style, __OP]);
    }

}
