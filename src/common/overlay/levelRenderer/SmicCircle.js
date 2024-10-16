/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicCircle
 * @category Visualization Theme
 * @classdesc 圆形
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicCircle({
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
 * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 *
 */
export class SmicCircle extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicCircle.prototype.type
         * @description 图形类型。
         */
        this.type = 'smiccircle';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicCircle";
    }


    /**
     * @function LevelRenderer.Shape.SmicCircle.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicCircle.prototype.buildPath
     * @description 创建图形路径。
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

        ctx.moveTo(x + style.r, y);
        ctx.arc(x, y, style.r, 0, Math.PI * 2, true);

        return true;
    }


    /**
     * @function LevelRenderer.Shape.SmicCircle.prototype.getRect
     * @description 返回圆形包围盒矩形
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

        var x = style.x + __OP[0];   // 圆心x
        var y = style.y + __OP[1];   // 圆心y
        var r = style.r;             // 圆r

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round(x - r - lineWidth / 2),
            y: Math.round(y - r - lineWidth / 2),
            width: r * 2 + lineWidth,
            height: r * 2 + lineWidth
        };

        return style.__rect;
    }
}
