import ol from 'openlayers';
import {
    CloverShape
} from './CloverShape'

/**
 * @class ol.style.HitCloverShape
 * @category  Visualization Graphic
 * @classdesc 三叶草要素高亮风格
 * @extends ol.style.Image{@linkdoc-openlayers/ol.style.Image}
 * @param options - {Object} 三叶草形要素风格参数。如：<br>
 *        angle - {number} 三叶草每个扇叶的圆心角,默认为30，单位弧度。<br>
 *        fill - [{ol.style.Fill}]{@linkdoc-openlayers/ol.style.Fill} 填充样式<br>
 *        stroke -[{ol.style.Stroke}] {@linkdoc-openlayers/ol.style.Stroke} 边框样式<br>
 *        strokeOpacity - {number}透明度<br>
 *        fillOpacity - {number}填充透明度<br>
 *        radius - {number} 半径<br>
 *        sAngle - {number} 扇叶起始角度
 *        eAngle - {number} 扇叶终止角度
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
     * @description 获取扇叶起始角度
     */
    getSAngle() {
        return this.sAngle;
    }
    /**
     * @function ol.style.HitCloverShape.prototype.getEAngle
     * @description 获取扇叶终止角度
     */
    getEAngle() {
        return this.eAngle;
    }
}

ol.style.HitCloverShape = HitCloverShape;