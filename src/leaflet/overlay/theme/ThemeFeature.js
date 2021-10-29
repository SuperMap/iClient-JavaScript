/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import '../../core/Base';
 import { GeoJSON } from '@supermap/iclient-common/format/GeoJSON';
 import { GeoText } from '@supermap/iclient-common/commontypes/geometry/GeoText';
 import { Point as GeometryPoint } from '@supermap/iclient-common/commontypes/geometry/Point';
 import { Vector } from '@supermap/iclient-common/commontypes/Vector';
/**
 * @class ThemeFeature
 * @deprecatedclassinstance L.supermap.themeFeature
 * @classdesc 客户端专题图要素类。
 *            支持的 geometry 参数类型为 {@link L.Point},{@link L.LatLng},{@link L.Polyline},{@link L.Polygon}。
 * @category Visualization Theme
 * @extends {L.Class}
 * @param {(L.Path|L.Point|L.LatLng)} geometry - 要素图形。
 * @param {Object} attributes - 要素属性。
 * @usage
 */
export var ThemeFeature = L.Class.extend({

    initialize: function (geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    },

    /**
     * @function ThemeFeature.prototype.toFeature
     * @description 转为内部矢量要素。
     * @returns {FeatureVector} 内部矢量要素。
     */
    toFeature: function () {
        let geometry = this.geometry;
        if (geometry.toGeoJSON) {
            const geojsonObject = geometry.toGeoJSON();
            geojsonObject.properties = this.attributes;
            return new GeoJSON().read(geojsonObject)[0];
        }
        if (geometry.length === 3) {
            geometry = new GeoText(geometry[1], geometry[0], geometry[2]);
        } else if (geometry.length === 2) {
            geometry = new GeometryPoint(geometry[0], geometry[1]);
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
     * @function ThemeFeature.prototype.reverseLatLngs
     * @description 坐标反转。
     * @param {L.LatLng} latlngs - 坐标值。
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
