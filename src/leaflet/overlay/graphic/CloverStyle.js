/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';

/**
 * @class CloverStyle
 * @deprecatedclassinstance L.supermap.cloverStyle
 * @classdesc 三叶草要素风格类。
 * @category Visualization Graphic
 * @modulecategory Overlay
 * @extends {L.Class}
 * @param {Object} options - 参数。
 * @param {number} [options.angle=60] - 三叶草每个扇叶的圆心角，单位弧度。
 * @param {number} [options.spaceAngle=0] - 扇叶间隔角度，通过计算获取。
 * @param {number} [options.count=3] - 扇叶数量。
 * @param {boolean} [options.stroke=true] - 是否描边。
 * @param {number} [options.strokeWidth=1] - 边框宽度。
 * @param {string} [options.color='#3388ff'] - 颜色。
 * @param {number} [options.weight=1] - 线宽。
 * @param {number} [options.opacity=1] - 透明度。
 * @param {string} [options.lineCap='round'] - 线帽形状。
 * @param {string} [options.lineJoin='round'] - 线条交汇边角形状。
 * @param {boolean} [options.fill=false] - 是否填充。
 * @param {string} [options.fillColor='#66ccff'] - 填充色。
 * @param {number} [options.fillOpacity=0.2] - 填充透明度。
 * @param {string} [options.fillRule='evenodd'] - 填充形状。
 * @param {number} [options.radius=10] - 半径。
 * @usage
 */
export var CloverStyle = L.Class.extend({

    options: {
        radius: 10,
        angele: 60,
        spaceAngle: 0,
        count: 3,
        fill: false,
        stroke: true,
        color: '#3388ff',
        weight: 1,
        lineCap: 'round',
        lineJoin: 'round',
        fillColor: '#66ccff',
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        opacity: 1,
        strokeWidth:1
    },


    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this._canvas = document.createElement('canvas');
        this._canvas.width = 2 * (this.options.radius + this.options.weight);
        this._canvas.height = 2 * (this.options.radius + this.options.weight);
        this._ctx = this._canvas.getContext('2d');


        var strokeWidth = this.options.strokeWidth === undefined ? 1 : this.options.strokeWidth;
        this.options.width = 2 * (this.options.radius + strokeWidth) + 1;
        this._initStyle();
    },

    /**
     * @function CloverStyle.prototype.getStyle
     * @description 获取画布。
     */
    getStyle: function () {
        return this._canvas;
    },

    /**
     * @function CloverStyle.prototype.drawSector
     * @description 绘制扇形。
     * @param  {CanvasRenderingContext2D} ctx - context 对象。
     * @param {number} x - 中心点 x。
     * @param {number} y - 中心点 y。
     * @param {number} r - 中心点 r。
     * @param {number} sAngle - 扇叶起始角度。
     * @param {number} eAngle - 扇叶终止角度。
     */
    drawSector: function (ctx, x, y, r, sAngle, eAngle) {
        //角度转换
        sAngle = sAngle / 180 * Math.PI;
        eAngle = eAngle / 180 * Math.PI;
        ctx.moveTo(x, y);
        ctx.lineTo(x + r * Math.cos(sAngle), y + r * Math.sin(sAngle));
        ctx.arc(x, y, r, sAngle, eAngle);
        ctx.lineTo(x, y);
    },

    _initStyle: function () {
        //起始角度
        var sAngle = 0;
        var options = this.options;
        var eAngle = options.angle;
        options.spaceAngle = 360 / options.count - options.angle;
        if (options.spaceAngle < 0) {
            return;
        }
        this._ctx.beginPath();
        this.anchor = [options.width / 2, options.width / 2];
        for (var i = 0; i < options.count; i++) {
            this.drawSector(this._ctx, this.anchor[0], this.anchor[1], options.radius, sAngle, eAngle);
            sAngle = eAngle + options.spaceAngle;
            eAngle = sAngle + options.angle;
        }
        this._fillStroke();
    },

    _fillStroke: function () {
        var options = this.options;
        if (options.fill) {
            this._ctx.globalAlpha = options.fillOpacity;
            this._ctx.fillStyle = options.fillColor || options.color;
            this._ctx.fill(options.fillRule || 'evenodd');
        }
        if (options.stroke && options.weight !== 0) {
            this._ctx.globalAlpha = options.opacity;
            this._ctx.lineWidth = options.weight;
            this._ctx.strokeStyle = options.color;
            this._ctx.lineCap = options.lineCap;
            this._ctx.lineJoin = options.lineJoin;
            this._ctx.stroke();
        }
    }
});

export var cloverStyle = function (options) {
    return new CloverStyle(options);
};
