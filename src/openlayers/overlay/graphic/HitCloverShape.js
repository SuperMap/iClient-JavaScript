/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    CloverShape
} from './CloverShape'

/**
 * @class HitCloverShape
 * @browsernamespace ol.style
 * @category  Visualization Graphic
 * @classdesc 三叶草要素高亮风格。除了基本的线颜色、线宽、填充色、填充透明度、填充形状等参数，
 * 还可以设置三叶草要素扇叶的圆心角、间隔角度、数量、半径等。
 * @modulecategory Overlay
 * @extends {CloverShape}
 * @param {Object} options - 三叶草形要素风格参数。
 * @param {number} options.sAngle - 扇叶起始角度。
 * @param {number} options.eAngle - 扇叶终止角度。
 * @param {number} [options.angle = 30] - 三叶草每个扇叶的圆心角，单位弧度。
 * @param {ol.style.Fill} [options.fill] - 填充样式。
 * @param {ol.style.Stroke} [options.stroke] - 边框样式。
 * @param {number} [options.strokeOpacity] - 边框透明度。
 * @param {number} [options.fillOpacity] - 填充透明度。
 * @param {number} [options.radius] -扇叶半径。
 * @usage
 */
export class HitCloverShape extends CloverShape {

    constructor(options) {
        super(options);
        this.sAngle = options.sAngle;
        this.eAngle = options.eAngle;
        this._render();
    }


    _render() {
        // draw the circle on the canvas
        this._ctx.clearRect(0, 0, this.getImage().width, this.getImage().height);
        // reset transform
        this._ctx.setTransform(this._pixelRatio, 0, 0, this._pixelRatio, 0, 0);
        this._ctx.translate(0, 0);
        this._ctx.beginPath();

        this._drawSector(this._ctx, this.getAnchor()[0], this.getAnchor()[1], this.getRadius(), this.sAngle, this.eAngle);
        this._fillStroke();

        this._ctx.closePath();
    }
    /**
     * @function HitCloverShape.prototype.getSAngle
     * @description 获取扇叶起始角度。
     */
    getSAngle() {
        return this.sAngle;
    }
    /**
     * @function HitCloverShape.prototype.getEAngle
     * @description 获取扇叶终止角度。
     */
    getEAngle() {
        return this.eAngle;
    }
}
