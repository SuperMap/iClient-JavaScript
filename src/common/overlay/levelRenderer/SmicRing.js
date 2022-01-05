/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicRing
 * @category Visualization Theme
 * @classdesc 圆环。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicRing({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r0: 30,
 *             r: 50
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 * @param {array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 */
export class SmicRing extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicRing.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicring';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicRing";

    }


    /**
     * @function LevelRenderer.Shape.SmicRing.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicRing.prototype.buildPath
     * @description 创建圆环路径。
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

        // 非零环绕填充优化
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, false);
        ctx.moveTo((style.x + __OP[0]) + style.r0, style.y + __OP[1]);
        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r0, 0, Math.PI * 2, true);
        return;
    }


    /**
     * @function LevelRenderer.Shape.SmicRing.prototype.getRect
     * @description 计算返回圆环包围盒矩阵
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (style.__rect) {
            return style.__rect;
        }

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.r - lineWidth / 2),
            y: Math.round((style.y + __OP[1]) - style.r - lineWidth / 2),
            width: style.r * 2 + lineWidth,
            height: style.r * 2 + lineWidth
        };

        return style.__rect;
    }

}
