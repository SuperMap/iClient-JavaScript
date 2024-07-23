/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicPoint
 * @category Visualization Theme
 * @classdesc 点。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicPoint({
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
 * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
 *
 */
export class SmicPoint extends Shape {
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicPoint.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicpoint';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicPoint";
    }


    /**
     * @function cdestroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function LevelRenderer.Shape.SmicPoint.prototype.buildPath
     * @description 创建点触。
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

        ctx.arc(style.x + __OP[0], style.y + __OP[1], style.r, 0, Math.PI * 2, true);
        return;
    }


    /**
     * @function LevelRenderer.Shape.SmicPoint.prototype.getRect
     * @description 计算返回点的包围盒矩形。该包围盒是直接从四个控制点计算，并非最小包围盒。
     *
     * @param {Object} style - style
     * @return {Object} 边框对象。包含属性：x，y，width，height。
     */
    getRect(style) {
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        var __OP = this.refOriginalPosition;

        if (style.__rect) {
            return style.__rect;
        }

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
