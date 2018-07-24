import L from "leaflet";
import "../../core/Base";
import {
    GeoJSON,
    GeoText,
    GeometryPoint,
    GeometryVector as Vector
} from '@supermap/iclient-common';

/**
 * @class L.supermap.themeFeature
 * @classdesc 客户端专题图要素类。
 *            支持的 geometry 参数类型为 {@link L.Point},{@link L.LatLng},{@link L.Polyline},{@link L.Polygon}。
 * @category Visualization Theme
 * @extends {L.Class}
 * @param {(L.Path|L.Point|L.LatLng)} geometry - 要素图形。
 * @param {Object} attributes - 要素属性。
 */
export var ThemeFeature = L.Class.extend({

    initialize: function (geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    },

    /**
     * @function L.supermap.themeFeature.prototype.toFeature
     * @description 转为内部矢量要素。
     * @return {SuperMap.Feature.Vector} 内部矢量要素。
     */
    toFeature: function () {
        let geometry = this.geometry;
        const points = [];
        let geojsonObject
        if (geometry.toGeoJSON) {
            geojsonObject = geometry.toGeoJSON();
            geojsonObject.properties = this.attributes;
            return new GeoJSON().read(geojsonObject)[0];
        }
        if (geometry.length === 3) {
            geometry = new GeoText(geometry[1], geometry[0], geometry[2]);
        } else if (geometry.length === 2) {
            geometry = new GeometryPoint(points[0], points[1]);
        } else if (geometry instanceof L.LatLng) {
            geometry = new GeometryPoint(geometry.lng, geometry.lat);
        } else if (geometry instanceof L.Point) {
            geometry = new GeometryPoint(geometry.x, geometry.y);
        } else if (geometry instanceof L.CircleMarker) {
            var latLng = geometry.getLatLng();
            geometry = new GeometryPoint(latLng.lng, latLng.lat);
        }
        return new Vector(geometry, this.attributes);
    },

    /**
     * @function L.supermap.themeFeature.prototype.reverseLatLngs
     * @description 坐标反转。
     * @param {L.latlng} latlngs - 坐标值。
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