/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';

/**
 * @private
 * @class NonProjection
 * @classdesc 平面无投影对象。
 * @category BaseTypes Projection
 * @extends {L.Class}
 * @param {L.Bounds} bounds - 坐标范围
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
    return new NonProjection(bounds);
};

/**
 * @class NonEarthCRS
 * @aliasclass CRS.NonEarthCRS
 * @deprecatedclass L.CRS.NonEarthCRS
 * @deprecatedclassinstance L.supermap.CRS.nonEarthCRS
 * @classdesc 平面无投影坐标类。
 * @category BaseTypes Projection
 * @extends {L.Class}
 * @param {Object} options - 参数。
 * @param {Object} options.origin - 原点。
 * @param {L.Bounds} options.bounds - 范围。
 * @param {Array.<number>} [options.resolutions] - 分辨率。
 * @usage
 */
export var NonEarthCRS = L.Class.extend({
    /**
     * @member {Object} [NonEarthCRS.prototype.includes=L.CRS]
     * @description 坐标对象。
     */
    includes: L.CRS,

    initialize: function (options) {
        if (options.origin) {
            this.transformation = new L.Transformation(1, -options.origin.x, -1, options.origin.y);
        }
        this.projection = nonProjection(options.bounds);
        this.bounds = options.bounds;
        this.origin = options.origin;
        this.resolutions = options.resolutions;
    },

    /**
     * @function NonEarthCRS.prototype.scale
     * @description 通过缩放级别计算比例尺。
     * @param {number} zoom - 缩放级别。
     * @returns {number} 返回比例尺值。
     */
    scale: function (zoom) {
        let defaultScale;
        if (!this.resolutions || this.resolutions.length === 0) {
            const width = Math.max(this.bounds.getSize().x, this.bounds.getSize().y);
            defaultScale = 1.0 / (width / 256);
            return defaultScale * Math.pow(2, zoom);
        }
        if (this.resolutions[zoom]) {
            return 1.0 / this.resolutions[zoom];
        }
        return (1.0 / this.resolutions[0]) * Math.pow(2, zoom);
    },

    /**
     * @function NonEarthCRS.prototype.zoom
     * @description 通过比例尺计算范围。
     * @param {number} scale - 比例尺。
     * @returns {number} 返回空间范围值。
     */
    zoom: function (scale) {
        let defaultScale;
        if (!this.resolutions || this.resolutions.length === 0) {
            const width = Math.max(this.bounds.getSize().x, this.bounds.getSize().y);
            defaultScale = 1.0 / (width / 256);
            return Math.log(scale / defaultScale) / Math.LN2;
        }
        const index = this.resolutions.indexOf(1.0 / scale);
        if (index > -1) {
            return index;
        }
        return Math.log(scale / (1.0 / this.resolutions[0])) / Math.LN2;
    },
    /**
     * @function NonEarthCRS.prototype.distance
     * @description 通过两个坐标点计算之间的距离。
     * @param {L.LatLng} latlng1 - 坐标点1。
     * @param {L.LatLng} latlng2 - 坐标点2。
     * @returns {number} 返回距离长度。
     */
    distance: function (latlng1, latlng2) {
        var dx = latlng2.lng - latlng1.lng,
            dy = latlng2.lat - latlng1.lat;

        return Math.sqrt(dx * dx + dy * dy);
    },

    infinite: false
});
export var nonEarthCRS = function (options) {
    return new NonEarthCRS(options);
};
