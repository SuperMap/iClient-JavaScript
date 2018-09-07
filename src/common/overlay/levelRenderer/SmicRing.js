/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.* This program are made available under the terms of the Apache License, Version 2.0* which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicRing
 * @category Visualization Theme
 * @classdesc 圆环。
 * @extends SuperMap.LevelRenderer.Shape
 * @example
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicRing({
 *         style: {
 *             x: 100,
 *             y: 100,
 *             r0: 30,
 *             r: 50
 *         }
 *     });
 *   levelRenderer.addShape(shape);
 *
 */
export class SmicRing extends Shape {

    /**
     * @member {Object} SuperMap.LevelRenderer.Shape.SmicRing.prototype.style
     * @description 绘制样式。
     *
     * @param {number} x - 圆心 x 坐标，必设参数。
     * @param {number} y - 圆心 y 坐标，必设参数。
     * @param {number} r - 外圆半径，必设参数。
     * @param {number} r0 - 内圆半径，必设参数。
     * @param {string} brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * @param {string} color - 填充颜色。默认值："#000000'"。
     * @param {string} strokeColor - 描边颜色。默认值："#000000'"。
     * @param {string} lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * @param {number} lineWidth -描边宽度。默认值：1。
     * @param {number} opacity - 绘制透明度。默认值：1。
     * @param {number} shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} shadowOffsetY - 阴影纵向偏移。默认值：0。
     * @param {string} text -图形中的附加文本。默认值：""。
     * @param {string} textColor - 文本颜色。默认值："#000000'"。
     * @param {string} textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style

    /**
     * @function SuperMap.LevelRenderer.Shape.SmicRing.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.LevelRenderer.Shape.SmicRing.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicring';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicRing";

    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicRing.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicRing.prototype.buildPath
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
     * @function SuperMap.LevelRenderer.Shape.SmicRing.prototype.getRect
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