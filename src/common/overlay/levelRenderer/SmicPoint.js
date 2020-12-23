/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicPoint
 * @category Visualization Theme
 * @classdesc 点。
 * @extends SuperMap.LevelRenderer.Shape
 * @example
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
 *
 *
 */
export class SmicPoint extends Shape {

    /**
     * @member {Object} SuperMap.LevelRenderer.Shape.SmicPoint.prototype.style
     * @description 绘制样式。
     *
     * @param {number} style.x - 圆心x坐标，必设参数。
     * @param {number} style.y - 圆心y坐标，必设参数。
     * @param {number} style.r - 半径，必设参数。
     * @param {string} style.brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * @param {string} style.color - 填充颜色。默认值："#000000'"。
     * @param {string} style.strokeColor - 描边颜色。默认值："#000000'"。
     * @param {string} style.lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * @param {number} style.lineWidth - 描边宽度。默认值：1。
     * @param {number} style.opacity - 绘制透明度。默认值：1。
     * @param {number} style.shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} style.shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} style.shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} style.shadowOffsetY -  阴影纵向偏移。默认值：0。
     * @param {string} style.text -  图形中的附加文本。默认值：""。
     * @param {string} style.textColor - 文本颜色。默认值："#000000'"。
     * @param {string} style.textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} style.textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} style.textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} style.textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicPoint.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.LevelRenderer.Shape.SmicPoint.prototype.type
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
     * @function SuperMap.LevelRenderer.Shape.SmicPoint.prototype.buildPath
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
     * @function SuperMap.LevelRenderer.Shape.SmicPoint.prototype.getRect
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