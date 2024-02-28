/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

import RegularShape from 'ol/style/RegularShape';
import FillStyle from 'ol/style/Fill';
import StrokeStyle from 'ol/style/Stroke';
/**
 * @class CloverShape
 * @browsernamespace ol.style
 * @category  Visualization Graphic
 * @classdesc 三叶草要素风格。除了基本的线颜色、线宽、填充色、填充透明度、填充形状等参数，还可以设置三叶草要素扇叶的圆心角、间隔角度、数量、半径等。
 * @modulecategory Overlay
 * @extends {ol.style.RegularShape}
 * @param {Object} options - 三叶草形要素风格参数。
 * @param {number} [options.angle=30] - 三叶草每个扇叶的圆心角，单位弧度。
 * @param {number} [options.count=3] - 扇叶数量。
 * @param {ol.style.Fill} [options.fill] - 填充样式。
 * @param {number} [options.strokeOpacity] - 边框不透明度。
 * @param {number} [options.fillOpacity] - 填充不透明度。
 * @param {number} [options.radius] - 扇叶的半径，单位为像素。
 * @param {ol.style.Stroke} [options.stroke] - 边框样式。
 * @param {string} [options.stroke.color='#3388ff'] - 十六进制边框颜色。
 * @param {number} [options.stroke.width=1] - 边框宽度。
 * @usage
 */
export class CloverShape extends RegularShape {

    constructor(options) {
        if (options.stroke) {
            options.stroke.color = options.stroke.getColor() || "#3388ff";
            options.stroke.width = options.stroke.getWidth() || 1;
        } else {
            options.stroke = new StrokeStyle({
                color: "#3388ff",
                width: 1
            })
        }
        if (options.fill) {
            options.fill.color = options.fill.getColor() || "#66ccff";
        } else {
            options.fill = new FillStyle({
                color: "#66ccff"
            })
        }
        super({
            angle: options.angle || 60,
            stroke: options.stroke,
            fill: options.fill,
            radius: options.radius || 10,
            rotation: options.rotation || 0
        });
        this.count_ = options.count || 3;
        this.strokeOpacity = options.strokeOpacity || 1;
        this.fillOpacity = options.fillOpacity || 1;

        this._pixelRatio = window ? window.devicePixelRatio : 1;
        this._canvas = this.getImage(this._pixelRatio);
        this._ctx = this._canvas.getContext('2d');
        this._render();
    }


    _render() {
        //起始角度
        var sAngle = 0;
        var eAngle = this.getAngle();
        this.spaceAngle = 360 / this.count_ - this.getAngle();
        if (this.spaceAngle < 0) {
            return;
        }
        this._ctx.setTransform(this._pixelRatio, 0, 0, this._pixelRatio, 0, 0);
        this._ctx.translate(0, 0);
        this._ctx.beginPath();
        for (var i = 0; i < this.count_; i++) {
            this._drawSector(this._ctx, this.getAnchor()[0], this.getAnchor()[1], this.getRadius(), sAngle, eAngle);
            sAngle = eAngle + this.spaceAngle;
            eAngle = sAngle + this.getAngle();
        }
        this._fillStroke();
        this._ctx.closePath();
    }

    /**
     * @function CloverShape.prototype.drawSector
     * @description 绘制扇形。
     * @param {CanvasRenderingContext2D} ctx - context 对象。
     * @param {number} x - 中心点 x 坐标。
     * @param {number} y - 中心点 y 坐标。
     * @param {number} r - 扇叶半径 r。
     * @param {number} sAngle - 扇叶起始角度。
     * @param {number} eAngle - 扇叶终止角度。
     */
    _drawSector(ctx, x, y, r, sAngle, eAngle) {
        //角度转换
        sAngle = sAngle / 180 * Math.PI;
        eAngle = eAngle / 180 * Math.PI;
        ctx.moveTo(x, y);
        ctx.lineTo(x + r * Math.cos(sAngle), y + r * Math.sin(sAngle));
        ctx.arc(x, y, r, sAngle, eAngle);
        ctx.lineTo(x, y);
    }

    _fillStroke() {
        if (this.getFill()) {
            this._ctx.globalAlpha = this.fillOpacity;
            this._ctx.fillStyle = this.getFill().color;
            this._ctx.fill();
        }
        if (this.getStroke() && this.weight !== 0) {
            this._ctx.globalAlpha = this.strokeOpacity;
            this._ctx.lineWidth = this.getStroke().width;
            this._ctx.strokeStyle = this.getStroke().color;
            this._ctx.lineCap = this.getStroke().lineCap;
            this._ctx.lineJoin = this.getStroke().lineJoin;
            this._ctx.stroke();
        }
    }
     /**
     * @function CloverShape.prototype.getCount
     * @description 获取扇叶数量。
     */
    getCount() {
        return this.count_;
    }
    /**
     * @function CloverShape.prototype.getSpaceAngle
     * @description 获取扇叶间隔角度。
     */
    getSpaceAngle() {
        return this.spaceAngle;
    }
}
