/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';

/**
 * @class CircleStyle
 * @deprecatedclassinstance L.supermap.circleStyle
 * @classdesc 圆形要素风格类。支持设置圆形要素的半径、线颜色、线宽、线帽形状、线条交汇边角形状、填充色、填充透明度、填充形状等参数。
 * @category Visualization Graphic
 * @modulecategory Overlay
 * @extends {L.Class}
 * @param {Object} options - 参数。
 * @param {boolean} [options.stroke=true] - 是否描边。
 * @param {string} [options.color='#3388ff'] - 十六进制描边颜色。
 * @param {number} [options.weight=1] - 线宽。
 * @param {number} [options.opacity=1] - 透明度。
 * @param {string} [options.lineCap='round'] - 线帽形状。
 * @param {string} [options.lineJoin='round'] - 线条交汇边角形状。
 * @param {boolean} [options.fill=false] - 是否填充。
 * @param {string} [options.fillColor] - 填充色。
 * @param {number} [options.fillOpacity=0.2] - 填充透明度。
 * @param {string} [options.fillRule='evenodd'] - 填充形状。
 * @param {number} [options.radius=3] - 半径。
 * @usage
 */
export var CircleStyle = L.Class.extend({

    options: {
        stroke: true,
        color: '#3388ff',
        weight: 1,
        opacity: 1,
        lineCap: 'round',
        lineJoin: 'round',
        fill: false,
        fillColor: null,
        fillOpacity: 0.2,
        fillRule: 'evenodd',
        radius: 3
    },

    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this._canvas = document.createElement('canvas');
        this._canvas.width = 2 * (this.options.radius + this.options.weight);
        this._canvas.height = 2 * (this.options.radius + this.options.weight);
        this._ctx = this._canvas.getContext('2d');
        this._initStyle();
    },

    /**
     * @deprecated
     * @function CircleStyle.prototype.getCanvas
     * @description 获取画布，已弃用该设置，请使用 getStyle 接口。
     */
    getCanvas: function () {
        return this._canvas;
    },

    /**
     * @function CircleStyle.prototype.getStyle
     * @description 获取画布。
     */
    getStyle: function () {
        return this._canvas;
    },

    _initStyle: function () {
        this._ctx.beginPath();
        this._ctx.arc(this._canvas.width / 2, this._canvas.height / 2, this.options.radius, 0, Math.PI * 2);
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

export var circleStyle = function (options) {
    return new CircleStyle(options);
};
