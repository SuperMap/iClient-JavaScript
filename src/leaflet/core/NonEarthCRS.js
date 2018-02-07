import L from "leaflet";

L.Projection = {};

/**
 * @private
 * @class L.Projection.NonProjection
 * @classdesc 平面无投影对象
 * @category BaseTypes Projection
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param bounds - {L.bounds} 坐标范围
 */
export var NonProjection = L.Class.extend({

    initialize: function (bounds) {
        this.bounds = bounds;
    },

    project: function (latlng) {
        return new L.Point(latlng.lng, latlng.lat);
    },

    unproject: function (point) {
        return new L.LatLng(point.y, point.x);
    }
});

export var nonProjection = function (bounds) {
    return new NonProjection(bounds)
};

/**
 * @class L.CRS.NonEarthCRS
 * @classdesc 平面无投影坐标类
 * @category BaseTypes Projection
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param options - {Object} 构建平面无投影坐标对象参数<br>
 *        origin - {Object} 原点<br>
 *        bounds - {[L.bounds]{@linkdoc-leaflet/#bounds}|Array<number>} 范围<br>
 *        resolutions - {Array<number>} 分辨率
 */
export var NonEarthCRS = L.Class.extend({

    /*
     * @member L.CRS.NonEarthCRS.prototype.includes -{Object}
     * @description 包含的坐标对象，默认为：L.CRS。
     */
    includes: L.CRS,

    initialize: function (options) {
        if (options.origin) {
            this.transformation =
                new L.Transformation(1, -options.origin.x,
                    -1, options.origin.y);
        }
        this.projection = L.Projection.NonProjection(options.bounds);
        this.bounds = options.bounds;
        this.origin = options.origin;
        this.resolutions = options.resolutions;
    },

    /**
     * @function L.CRS.NonEarthCRS.prototype.scale
     * @description 通过缩放级别计算比例尺
     * @param zoom - {number}缩放级别
     * @return {number} 得到的比例尺
     */
    scale: function (zoom) {
        if (!this.resolutions || this.resolutions.length === 0) {
            var width = Math.max(this.bounds.getSize().x, this.bounds.getSize().y);
            var defaultScale = 1 / (width / 256);
            return defaultScale * Math.pow(2, zoom);
        }
        return 1 / this.resolutions[zoom];
    },

    /**
     * @function L.CRS.NonEarthCRS.prototype.zoom
     * @description 通过比例尺计算范围
     * @param scale - {number}比例尺
     * @return {number} 返回空间范围值
     */
    zoom: function (scale) {
        if (!this.resolutions || this.resolutions.length === 0) {
            var width = Math.max(this.bounds.getSize().x, this.bounds.getSize().y);
            var defaultScale = 1 / (width / 256);
            return scale / defaultScale;
        }
        for (var i = 0; i < this.resolutions.length; i++) {
            if (1 / this.resolutions == scale) {
                return i
            }
        }
        return -1;
    },

    /**
     * @function L.CRS.NonEarthCRS.prototype.distance
     * @description 通过两个坐标点计算之间的距离
     * @param latlng1 - {L.latLng} 坐标点1
     * @param latlng2 - {L.latLng} 坐标点2
     * @return {number} 返回距离长度
     */
    distance: function (latlng1, latlng2) {
        var dx = latlng2.lng - latlng1.lng,
            dy = latlng2.lat - latlng1.lat;

        return Math.sqrt(dx * dx + dy * dy);
    },

    infinite: true
});
export var nonEarthCRS = function (options) {
    return new NonEarthCRS(options)
};
L.Projection.NonProjection = nonProjection;

L.CRS.NonEarthCRS = nonEarthCRS;