/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {
    CloverShape
} from './CloverShape'

/**
 * @class ol.style.HitCloverShape
 * @category  Visualization Graphic
 * @classdesc 三叶草要素高亮风格。
 * @extends {ol.style.CloverShape}
 * @param {Object} options - 三叶草形要素风格参数。
 * @param {number} options.sAngle - 扇叶起始角度。
 * @param {number} options.eAngle - 扇叶终止角度。
 * @param {number} [options.angle = 30] - 三叶草每个扇叶的圆心角，单位弧度。
 * @param {ol.style.Fill} [options.fill] - 填充样式。
 * @param {ol.style.Stroke} [options.stroke] - 边框样式。
 * @param {number} [options.strokeOpacity] - 透明度。
 * @param {number} [options.fillOpacity] - 填充透明度。
 * @param {number} [options.radius] - 半径。
 
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
        this._ctx.setTransform(1, 0, 0, 1, 0, 0);
        this._ctx.translate(0, 0);
        this._ctx.beginPath();

        this._drawSector(this._ctx, this.getAnchor()[0], this.getAnchor()[1], this.getRadius(), this.sAngle, this.eAngle);
        this._fillStroke();

        this._ctx.closePath();
    }
    /**
     * @function ol.style.HitCloverShape.prototype.getSAngle
     * @description 获取扇叶起始角度。
     */
    getSAngle() {
        return this.sAngle;
    }
    /**
     * @function ol.style.HitCloverShape.prototype.getEAngle
     * @description 获取扇叶终止角度。
     */
    getEAngle() {
        return this.eAngle;
    }
}

ol.style.HitCloverShape = HitCloverShape;