import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.imageStyle
 * @classdesc 自定义图形要素风格
 * @category Graphic
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param options - {Object} 图形要素风格参数。如：<br>
 *        img - {HTMLImageElement}  image对象<br>
 *        origin - {Array}  中心点<br>
 *        anchor - {Array}  偏移量<br>
 *        size - {Array}  图形大小，即高度和宽度[width,height]
 *
 */
export var ImageStyle = L.Class.extend({

    options: {
        img: "image",
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
     * @description 获取样式
     */
    getStyle: function () {
        return this.options;
    }

});

export var imageStyle = function (options) {
    return new ImageStyle(options);
};

L.supermap.imageStyle = imageStyle;