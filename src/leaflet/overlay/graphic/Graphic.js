import L from "leaflet";
import '../../core/Base';

/**
 * @class L.supermap.graphic
 * @classdesc 高效率点图层要素类。
 * @category Visualization Graphic
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param options -{object} 图形参数
 * @param options.latLng -{L.LatLng} 经纬度
 * @param options.style -{L.supermap.circleStyle|L.supermap.cloverStyle|L.supermap.imageStyle} 点样式
 * @param options.attributes -{Object}  要素属性
 */
export var Graphic = L.Class.extend({

    initialize: function (options) {
        options = options || {};

        var latLng = options.latLng || options._latLng;
        this._latLng = L.latLng(latLng.lat, latLng.lng);
        this._style = options.style || options._canvas;
        this._attributes = options.attributes;
    },

    /**
     * @function L.supermap.graphic.prototype.setLatLng
     * @description 设置经纬度
     * @param latLng -{L.LatLng} 经纬度参数
     */
    setLatLng: function (latLng) {
        this._latLng = latLng;
    },

    /**
     * @deprecated
     * @function L.supermap.graphic.prototype.setCanvas
     * @description 设置画布,已弃用该设置，请使用setStyle接口
     * @param canvas - {HTMLCanvasElement} 传入需要设置的画布
     */
    setCanvas: function (canvas) {
        this._style = canvas;
    },

    /**
     * @function L.supermap.graphic.prototype.setAttributes
     * @description 设置要素属性
     * @param attributes - {Object} 属性对象
     */
    setAttributes: function (attributes) {
        this._attributes = attributes;
    },


    /**
     * @function L.supermap.graphic.prototype.getLatLng
     * @description 获取经纬度
     * @return {L.LatLng} 经纬度
     */

    getLatLng: function () {
        return this._latLng;
    },

    /**
     * @deprecated
     * @function L.supermap.graphic.prototype.getCanvas
     * @description 获取画布，已弃用该设置，请使用getStyle接口
     * @return {HTMLCanvasElement} 画布
     */
    getCanvas: function () {
        return this._style;
    },

    /**
     * @function L.supermap.graphic.prototype.getAttributes
     * @description 获取要素属性
     * @return {Object} 要素属性
     */
    getAttributes: function () {
        return this._attributes;
    },

    /**
     * @function L.supermap.graphic.prototype.setStyle
     * @description 设置样式
     * @param style - {L.supermap.circleStyle|L.supermap.imageStyle|L.supermap.cloverStyle} 样式
     */
    setStyle: function (style) {
        this._style = style;
    },

    /**
     * @function L.supermap.graphic.prototype.getStyle
     * @description 获取样式
     * @return {L.supermap.circleStyle|L.supermap.imageStyle|L.supermap.cloverStyle} 样式
     */
    getStyle: function () {
        return this._style;
    }

});
export var graphic = function (options) {
    return new Graphic(options);
};

L.supermap.graphic = graphic;