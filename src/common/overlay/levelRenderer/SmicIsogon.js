/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at/r* http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Shape} from './Shape';
import {SUtil} from './SUtil';

/**
 * @private
 * @class  SuperMap.LevelRenderer.Shape.SmicIsogon
 * @category Visualization Theme
 * @classdesc 正多边形。
 * @extends SuperMap.LevelRenderer.Shape
 */
export class SmicIsogon extends Shape {

    /**
     * @member {Object} SuperMap.LevelRenderer.Shape.SmicIsogon.prototype.style
     * @description 绘制样式。
     *
     * @param {number} x - 正 n 边形外接圆心 x 坐标，必设参数。
     * @param {number} y - 正 n 边形外接圆心 y 坐标，必设参数。
     * @param {number} r - 正n边形外接圆半径，必设参数。
     * @param {number} ｎ - 指明正几边形，必设参数（n>=3）。
     * @param {string} brushType - 画笔类型。可设值："fill", "stroke", "both"。默认值："fill"。
     * @param {string} color -  填充颜色。默认值："#000000'"。
     * @param {string} strokeColor - 描边颜色。默认值："#000000'"。
     * @param {string} lineCape - 线帽样式。可设值："butt", "round", "square"。默认值："butt"。
     * @param {number} lineWidth - 描边宽度。默认值：1。
     * @param {number} opacity - 绘制透明度。默认值：1。
     * @param {number} shadowBlur - 阴影模糊度，大于0有效。默认值：0。
     * @param {number} shadowColor - 阴影颜色。默认值："#000000'"。
     * @param {number} shadowOffsetX - 阴影横向偏移。默认值：0。
     * @param {number} shadowOffsetY - 阴影纵向偏移。默认值：0。
     * @param {string} text - 图形中的附加文本。默认值：""。
     * @param {string} textColor -文本颜色。默认值："#000000'"。
     * @param {string} textFont - 附加文本样式。示例:'bold 18px verdana'。
     * @param {string} textPosition - 附加文本位置。可设值："inside", "left", "right", top", "bottom", "end"。默认值："end"。
     * @param {string} textAlign - 附加文本水平对齐。可设值："start", "end", "left", "right", "center"。默认根据 textPosition 自动设置。
     * @param {string} textBaseline - 附加文本垂直对齐。可设值："top", "bottom", "middle", "alphabetic", "hanging", "ideographic"。默认根据 textPosition 自动设置。
     */
    //打开接口 style



    /**
     * @function SuperMap.LevelRenderer.Shape.SmicIsogon.constructor
     * @description 构造函数。
     *
     * @param {Array} options - shape 的配置（options）项，可以是 shape 的自有属性，也可以是自定义的属性。
     *
     */
    constructor(options) {
        super(options);
        /**
         * @member {string} SuperMap.LevelRenderer.Shape.SmicIsogon.prototype.type
         * @description 图形类型。
         */
        this.type = 'smicisogon';
        if (!this.refOriginalPosition || this.refOriginalPosition.length !== 2) {
            this.refOriginalPosition = [0, 0];
        }
        this.CLASS_NAME = "SuperMap.LevelRenderer.Shape.SmicIsogon";
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicIsogon.prototype.destroy
     * @description 销毁对象，释放资源。调用此函数后所有属性将被置为 null。
     */
    destroy() {
        this.type = null;
        super.destroy();
    }


    /**
     * @function SuperMap.LevelRenderer.Shape.SmicIsogon.prototype.buildPath
     * @description 创建n角星（n>=3）路径。
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

        var sin = SUtil.Util_math.sin;
        var cos = SUtil.Util_math.cos;
        var PI = Math.PI;

        var n = style.n;
        if (!n || n < 2) {
            return;
        }

        var x = style.x + __OP[0];
        var y = style.y + __OP[1];
        var r = style.r;

        var dStep = 2 * PI / n;
        var deg = -PI / 2;
        var xStart = x + r * cos(deg);
        var yStart = y + r * sin(deg);
        deg += dStep;

        // 记录边界点，用于判断insight
        var pointList = style.pointList = [];
        pointList.push([xStart, yStart]);
        for (let i = 0, end = n - 1; i < end; i++) {
            pointList.push([x + r * cos(deg), y + r * sin(deg)]);
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
     * @function SuperMap.LevelRenderer.Shape.SmicIsogon.prototype.getRect
     * @description 计算返回正多边形的包围盒矩形。
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