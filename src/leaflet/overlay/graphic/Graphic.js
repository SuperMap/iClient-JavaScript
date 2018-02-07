import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.graphic
 * @classdesc 图形类。
 * @category Visualization Graphic
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param options - {Object} 图形参数
 */
export var Graphic = L.Class.extend({

    initialize: function (options) {
        options = options || {};

        var latlng = options.latlng || options._latlng;
        this._latlng = L.latLng(latlng.lat, latlng.lng);
        this._style = options.style || options._canvas;
    },

    /**
     * @function L.supermap.graphic.prototype.setLatlng
     * @description 设置经纬度
     * @param latlng - {L.latlng} 经纬度参数
     */
    setLatlng: function (latlng) {
        this._latlng = latlng;
    },

    /**
     * @deprecated
     * @function L.supermap.graphic.prototype.setCanvas
     * @description 设置画布,已弃用该设置，请使用setStyle接口
     * @param canvas - {Object} 传入需要设置的画布
     */
    setCanvas: function (canvas) {
        this._style = canvas;
    },

    /**
     * @function L.supermap.graphic.prototype.getLatLng
     * @description 获取经纬度
     */
    getLatLng: function () {
        return this._latlng;
    },

    /**
     * @deprecated
     * @function L.supermap.graphic.prototype.getCanvas
     * @description 获取画布，已弃用该设置，请使用getStyle接口
     */
    getCanvas: function () {
        return this._style;
    },

    /**
     * @function L.supermap.graphic.prototype.setStyle
     * @description 设置样式
     * @param canvas - {HTMLCanvasElement} 传入需要设置的画布
     */
    setStyle: function (canvas) {
        this._style = canvas;
    },

    /**
     * @function L.supermap.graphic.prototype.getStyle
     * @description 获取样式
     */
    getStyle: function () {
        return this._style;
    }

});
export var graphic = function (options) {
    return new Graphic(options);
};

L.supermap.graphic = graphic;