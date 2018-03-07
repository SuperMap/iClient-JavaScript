import ol from 'openlayers';

/**
 * @class ol.style.CloverShape
 * @category  Visualization Graphic
 * @classdesc 三叶草要素风格
 * @extends ol.style.Image{@linkdoc-openlayers/ol.style.Image}
 * @param options - {Object} 三叶草形要素风格参数。如：<br>
 *        angle - {number} 三叶草每个扇叶的圆心角,默认为30，单位弧度。<br>
 *        count - {number} 扇叶数量， 默认是三个<br>
 *        fill - [{ol.style.Fill}]{@linkdoc-openlayers/ol.style.Fill} 填充样式<br>
 *        stroke - [{ol.style.Stroke}]{@linkdoc-openlayers/ol.style.Stroke} 边框样式<br>
 *        strokeOpacity - {number}透明度<br>
 *        fillOpacity - {number}填充透明度<br>
 *        radius - {number} 半径<br>
 */
export class CloverShape extends ol.style.RegularShape {

    constructor(options) {
        if (options.stroke) {
            options.stroke.color = options.stroke.getColor() || "#3388ff";
            options.stroke.width = options.stroke.getWidth() || 1;
        } else {
            options.stroke = new ol.style.Stroke({
                color: "#3388ff",
                width: 1
            })
        }
        if (options.fill) {
            options.fill.color = options.fill.getColor() || "#66ccff";
        } else {
            options.fill = new ol.style.Fill({
                color: "#66ccff"
            })
        }
        super({
            angle: options.angle || 60,
            stroke: options.stroke,
            fill: options.fill,
            radius: options.radius || 10
        });
        this.count_ = options.count || 3;
        this.strokeOpacity = options.strokeOpacity || 1;
        this.fillOpacity = options.fillOpacity || 1;

        this._canvas = this.getImage();
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
     * @function  ol.style.CloverShape.prototype.drawSector
     * @description 绘制扇形
     * @param ctx - {CanvasRenderingContext2D} context对象
     * @param x - {number} 中心点 x
     * @param y - {number} 中心点 y
     * @param r - {number} 中心点 r
     * @param sAngle - {number} 扇叶起始角度
     * @param eAngle - {number} 扇叶终止角度
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
     * @function  ol.style.CloverShape.prototype.getCount
     * @description 获取扇叶数量
     */
    getCount() {
        return this.count_;
    }
    /**
     * @function  ol.style.CloverShape.prototype.getSpaceAngle
     * @description 获取扇叶间隔角度
     */
    getSpaceAngle() {
        return this.spaceAngle;
    }
}

ol.style.CloverShape = CloverShape;