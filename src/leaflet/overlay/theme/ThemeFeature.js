import L from "leaflet";
import "../../core/Base";
import {LineString, Polygon, GeoText, GeometryPoint, GeometryVector as Vector} from '@supermap/iclient-common';

/**
 * @class L.supermap.themeFeature
 * @classdesc 客户端专题图要素类。
 *            支持的geometry参数类型为L.Point,L.LatLng,L.Polyline,L.Polygon
 * @category Visualization Theme
 * @extends L.Class{@linkdoc-leaflet/#class}
 * @param geometry - {L.Path|L.Point|L.LatLng} 要素图形
 * @param attributes - {Object} 要素属性
 */
export var ThemeFeature = L.Class.extend({

    initialize: function (geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    },

    /**
     * @function L.supermap.themeFeature.prototype.toFeature
     * @description 转为内部矢量要素
     * @return {SuperMap.Feature.Vector} 内部矢量要素
     */
    toFeature: function () {
        var geometry = this.geometry;
        var points = [];
        if (geometry instanceof L.Polygon) {
            points = this.reverseLatLngs(geometry.getLatLngs());
            geometry = new Polygon(points);
        } else if (geometry instanceof L.Polyline) {
            points = this.reverseLatLngs(geometry.getLatLngs());
            geometry = new LineString(points);
        } else if (geometry.length === 3) {
            geometry = new GeoText(geometry[1], geometry[0], geometry[2]);
        } else {
            if (geometry instanceof L.LatLng) {
                points = [geometry.lng, geometry.lat];
            } else if (geometry instanceof L.Point) {
                points = [geometry.x, geometry.y];
            } else if (geometry instanceof L.CircleMarker) {
                var latLng = geometry.getLatLng();
                points = [latLng.lng, latLng.lat];
            } else {
                points = geometry;
            }
            if (points.length === 2) {
                geometry = new GeometryPoint(points[0], points[1]);
            }

        }
        return new Vector(geometry, this.attributes);
    },

    /**
     * @function L.supermap.themeFeature.prototype.reverseLatLngs
     * @description 坐标反转
     * @param latlngs - {L.latlng} 坐标值
     */
    reverseLatLngs: function (latlngs) {
        if (!L.Util.isArray(latlngs)) {
            latlngs = [latlngs];
        }
        for (var i = 0; i < latlngs.length; i++) {
            latlngs[i] = [latlngs[i].lng, latlngs[i].lat];
        }
        return latlngs;
    }
});
export var themeFeature = function (geometry, attributes) {
    return new ThemeFeature(geometry, attributes);
};

L.supermap.themeFeature = themeFeature;