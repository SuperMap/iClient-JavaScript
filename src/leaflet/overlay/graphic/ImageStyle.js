/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.imageStyle
 * @classdesc 自定义图形要素风格。
 * @category Visualization Graphic
 * @extends {L.Class}
 * @param {Object} options - 图形要素风格参数。
 * @param {HTMLImageElement} options.img - image 对象。
 * @param {Array} [options.origin=[0.0]] - 中心点。
 * @param {Array} [options.anchor] - 偏移量。
 * @param {Array} [options.size] - 图形大小，即高度和宽度[width,height]。
 * @param {Array} [options.radius] - 半径。
 * @param {Array} [options.weight] - 宽度。
 */
export var ImageStyle = L.Class.extend({

    options: {
        img: null,
        origin: [0, 0],
        anchor: null,
        size: null
    },

    initialize: function (options) {
        options = options || {};
        L.Util.setOptions(this, options);
        this._canvas = document.createElement('canvas');
        this._canvas.width = 2 * (this.options.radius + this.options.weight);
        this._canvas.height = 2 * (this.options.radius + this.options.weight);
        this._ctx = this._canvas.getContext('2d');
    },

    /**
     * @function L.supermap.imageStyle.prototype.getStyle
     * @description 获取样式。
     */
    getStyle: function () {
        return this.options;
    }

});

export var imageStyle = function (options) {
    return new ImageStyle(options);
};

L.supermap.imageStyle = imageStyle;