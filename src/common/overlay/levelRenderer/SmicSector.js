/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicSector
 * @category Visualization Theme
 * @classdesc 扇形。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicSector({
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
 * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 *
 */
export class SmicSector extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicSector.protptype.type
         * @description 图形类型。
         */
        this.type = 'smicsector';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicSector";
    }

    /**
     * @function LevelRenderer.Shape.SmicSector.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * @function LevelRenderer.Shape.SmicSector.prototype.buildPath
     * @description 创建扇形路径。
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

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = style.startAngle;          // 起始角度[0,360)
        var endAngle = style.endAngle;              // 结束角度(0,360]
        var clockWise = style.clockWise || false;

        startAngle = SUtil.Util_math.degreeToRadian(startAngle);
        endAngle = SUtil.Util_math.degreeToRadian(endAngle);

        if (!clockWise) {
            // 扇形默认是逆时针方向，Y轴向上
            // 这个跟arc的标准不一样，为了兼容echarts
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        var unitX = SUtil.Util_math.cos(startAngle);
        var unitY = SUtil.Util_math.sin(startAngle);
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
            SUtil.Util_math.cos(endAngle) * r0 + x,
            SUtil.Util_math.sin(endAngle) * r0 + y
        );

        if (r0 !== 0) {
            ctx.arc(x, y, r0, endAngle, startAngle, clockWise);
        }

        ctx.closePath();

        return;
    }

    /**
     * @function LevelRenderer.Shape.SmicSector.prototype.getRect
     * @description 返回扇形包围盒矩形
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     *
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var min0 = SUtil.Util_vector.create();
        var min1 = SUtil.Util_vector.create();
        var max0 = SUtil.Util_vector.create();
        var max1 = SUtil.Util_vector.create();

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r0 = style.r0 || 0;     // 形内半径[0,r)
        var r = style.r;            // 扇形外半径(0,r]
        var startAngle = SUtil.Util_math.degreeToRadian(style.startAngle);
        var endAngle = SUtil.Util_math.degreeToRadian(style.endAngle);
        var clockWise = style.clockWise;

        if (!clockWise) {
            startAngle = -startAngle;
            endAngle = -endAngle;
        }

        if (r0 > 1) {
            SUtil.Util_computeBoundingBox.arc(
                x, y, r0, startAngle, endAngle, !clockWise, min0, max0
            );
        } else {
            min0[0] = max0[0] = x;
            min0[1] = max0[1] = y;
        }
        SUtil.Util_computeBoundingBox.arc(
            x, y, r, startAngle, endAngle, !clockWise, min1, max1
        );

        SUtil.Util_vector.min(min0, min0, min1);
        SUtil.Util_vector.max(max0, max0, max1);
        style.__rect = {
            x: min0[0],
            y: min0[1],
            width: max0[0] - min0[0],
            height: max0[1] - min0[1]
        };
        return style.__rect;
    }

}
