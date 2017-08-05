import "../core/Base";
import L from "leaflet";
L.Projection = {};

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

export var NonEarthCRS = L.Class.extend({
    includes: L.CRS,

    initialize: function (options) {
        if (options.origin) {
            this.transformation =
                new L.Transformation(1, options.origin.x,
                    -1, options.origin.y);
        }
        this.projection = L.CRS.NonProjection(options.bounds);
        this.bounds = options.bounds;
        this.origin = options.origin;
        this.resolutions = options.resolutions;
    },

    scale: function (zoom) {
        if (!this.resolutions || this.resolutions.length === 0) {
            var width = Math.max(this.bounds.getSize().x, this.bounds.getSize().y);
            var defaultScale = 1 / (width / 256);
            return defaultScale * Math.pow(2, zoom);
        }
        return 1 / this.resolutions[zoom];
    },

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
L.CRS.NonProjection = nonProjection;

L.CRS.NonEarthCRS = nonEarthCRS;