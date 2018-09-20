/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicEllipse
 * @category Visualization Theme
 * @classdesc 椭圆。
 * @extends SuperMap.LevelRenderer.Shape
 * @example  
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicEllipse({
 *       style: {
 *           x: 100,
 *           y: 100,
 *           a: 40,
 *           b: 20,
 *           brushType: 'both',
 *           color: 'blue',
 *           strokeColor: 'red',
 *           lineWidth: 3,
 *           text: 'SmicEllipse'
 *       }
 *   });
 *   levelRenderer.addShape(shape);
 * 
 *
 */
export class SmicEllipse extends Shape {

    /**
     * @member {Object} SuperMap.LevelRenderer.Shape.SmicEllipse.style
     * @description 绘制样式。
     *
     * @param {number} style.x - 圆心 x 坐标，必设参数。
     * @param {number} style.y - 圆心 y 坐标，必设参数。
     * @param {number} style.a - 横轴半径，必设参数。
     * @param {number} style.b - 纵轴半径，必设参数。
     * @param {string} style.brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * @param {string} style.color - 填充颜色。默认值："#000000'"。
     * @param {string} style.strokeColor - 描边颜色。默认值："#000000'"。
     * @param {string} style.lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * @param {number} style.lineWidth - 描边宽度。默认值：1。
     * @param {number} style.opacity - 绘制透明度。默认值：1。
     * @param {number} style.shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} style.shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} style.shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} style.shadowOffsetY - 阴影纵向偏移。默认值：0。
     * @param {string} style.text - 图形中的附加文本。默认值：""。
     * @param {string} style.textColor - 文本颜色。默认值："#000000'"。
     * @param {string} style.textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} style.textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} style.textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} style.textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style
    /**
     * @function SuperMap.LevelRenderer.Shape.SmicEllipse.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);

        /**
         * @member {string} SuperMap.LevelRenderer.Shape.SmicEllipse.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicellipse';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicEllipse";
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicEllipse.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicEllipse.prototype.buildPath
     * @description 构建椭圆的 Path。
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

        var k = 0.5522848;
        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var a = style.a;
        var b = style.b;
        var ox = a * k; // 水平控制点偏移量
        var oy = b * k; // 垂直控制点偏移量
        // 从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
        ctx.moveTo(x - a, y);
        ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
        ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
        ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
        ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
        ctx.closePath();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicEllipse.prototype.getRect
     * @description 计算返回椭圆包围盒矩形
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

        var lineWidth;
        if (style.brushType == 'stroke' || style.brushType == 'fill') {
            lineWidth = style.lineWidth || 1;
        } else {
            lineWidth = 0;
        }
        style.__rect = {
            x: Math.round((style.x + __OP[0]) - style.a - lineWidth / 2),
            y: Math.round((style.x + __OP[1]) - style.b - lineWidth / 2),
            width: style.a * 2 + lineWidth,
            height: style.b * 2 + lineWidth
        };

        return style.__rect;
    }

}