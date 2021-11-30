/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  LevelRenderer.Shape.SmicStar
 * @category Visualization Theme
 * @classdesc n 角星（n>3）。
 * @extends LevelRenderer.Shape
 * @example
 *   var shape = new LevelRenderer.Shape.SmicStar({
 *         style: {
 *             x: 200,
 *             y: 100,
 *             r: 150,
 *             n: 5,
 *             text: '五角星'
 *         }
 *   });
 *   levelRenderer.addShape(shape);
 *
 *
 */
export class SmicStar extends Shape {

    /**
     * @member {Object} LevelRenderer.Shape.SmicStar.prototype.style
     * @description 绘制样式。
     *
     * @param {number} style.x - n 角星外接圆心 x 坐标，必设参数。
     * @param {number} style.y - n 角星外接圆心 y 坐标，必设参数。
     * @param {number} style.r - n 角星外接圆半径，必设参数。
     * @param {number} style.r0 - n 角星内部顶点（凹点）的外接圆半径。如果不指定此参数，则自动计算：取相隔外部顶点连线的交点作内部顶点。
     * @param {number} style.n -指明几角星，必设参数。
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
     * @function LevelRenderer.Shape.SmicStar.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} LevelRenderer.Shape.SmicStar.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicstar';

        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }

        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicStar";
    }

    /**
     * @function LevelRenderer.Shape.SmicStar.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }

    /**
     * @function LevelRenderer.Shape.SmicStar.prototype.buildPath
     * @description 创建n  角星（n>3）路径。
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

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var sin = SUtil.Util_math.sin;
        var cos = SUtil.Util_math.cos;
        var PI = Math.PI;

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;
        var r0 = style.r0;

        // 如果未指定内部顶点外接圆半径，则自动计算
        if (r0 == null) {
            r0 = n > 4
                // 相隔的外部顶点的连线的交点，
                // 被取为内部交点，以此计算r0
                ? r * cos(2 * PI / n) / cos(PI / n)
                // 二三四角星的特殊处理
                : r / 3;
        }

        var dStep = PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断inside
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (var i = 0, end = n * 2 - 1, ri; i < end; i++) {
            ri = i % 2 === 0 ? r0 : r;
            pointList.push([x + ri * cos(deg), y + ri * sin(deg)]);
            deg += dStep;
        }
        pointList.push([xStart, yStart]);

        // 绘制
        ctx.moveTo(pointList[0][0], pointList[0][1]);
        for (let i = 0; i < pointList.length; i++) {
            ctx.lineTo(pointList[i][0], pointList[i][1]);
        }

        ctx.closePath();

        return;
    }

    /**
     * @function LevelRenderer.Shape.SmicStar.prototype.getRect
     * @description 返回 n 角星包围盒矩形。
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
