/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicCircle
 * @category Visualization Theme
 * @classdesc 圆形
 * @extends SuperMap.LevelRenderer.Shape
 * @example 
 *   var shape = new SuperMap.LevelRenderer.Shape.SmicCircle({
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
 * 
 *
 */
export class SmicCircle extends Shape {

    /**
     * @member {Object} SuperMap.LevelRenderer.Shape.SmicCircle.prototype.style
     * @description 绘制样式。
     *
     * @param {number} x - 圆心x坐标,必设参数
     * @param {number} y - 圆心y坐标，必设参数
     * @param {number} r - 半径，必设参数
     * @param {string} brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * @param {string} color - 填充颜色,默认值"#000000"
     * @param {string} strokeColor - 描边颜色,默认值为'#000000'
     * @param {string} lineCape — 线帽样式，可以是 butt, round, square，默认是butt
     * @param {number} lineWidth - 描边宽度、默认是1
     * @param {number} opacity - 绘制透明度、默认是1，不透明
     * @param {number} shadowBlur - 阴影模糊度，大于0有效，默认是0
     * @param {string} shadowColor - 阴影颜色，默认是'#000000'
     * @param {number} shadowOffsetX - 阴影横向偏移，默认是0
     * @param {number} shadowOffsetY - 阴影纵向偏移，默认是0
     * @param {string} text - 图形中的附加文本，默认是0
     * @param {string} textColor - 文本颜色，默认是'#000000'
     * @param {string} textFont - 附加文本样式，eg:'bold 18px verdana'
     * @param {string} textPosition - 附加文本位置, 可以是 inside, left, right, top, bottom
     * @param {string} textAlign - 默认根据textPosition自动设置，附加文本水平对齐。可以是start, end, left, right, center
     * @param {string} textBaseline 默认根据textPosition自动设置，附加文本垂直对齐。可以是top, bottom, middle, alphabetic, hanging, ideographic
     */
    //打开接口 style


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicCircle.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.LevelRenderer.Shape.SmicCircle.prototype.type
         * @description 图形类型。
         */
        this.type = 'smiccircle';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicCircle";
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicCircle.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicCircle.prototype.buildPath
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
     * @function SuperMap.LevelRenderer.Shape.SmicCircle.prototype.getRect
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