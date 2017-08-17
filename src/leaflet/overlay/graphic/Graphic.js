import '../../core/Base';
import L from "leaflet";

/**
 * @class L.supermap.graphic
 * @classdesc 图形类。
 * @private
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param options - {Object} 图形参数
 */
export var Graphic = L.Class.extend({

    initialize: function (options) {
        options = options || {};
        this._latlng = L.latLng(options._latlng.lat, options._latlng.lng);
        this._canvas = options._canvas;
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
     * @function L.supermap.graphic.prototype.setCanvas
     * @description 设置画布
     * @param canvas - {Object} 传入需要设置的画布
     */
    setCanvas: function (canvas) {
        this._canvas = canvas;
    },

    /**
     * @function L.supermap.graphic.prototype.getLatLng
     * @description 获取经纬度
     */
    getLatLng: function () {
        return this._latlng;
    },

    /**
     * @function L.supermap.graphic.prototype.getCanvas
     * @description 获取画布
     */
    getCanvas: function () {
        return this._canvas;
    }

});
export var graphic = function (options) {
    return new Graphic(options);
};
L.supermap.graphic = graphic;