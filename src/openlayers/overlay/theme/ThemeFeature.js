import ol from 'openlayers';
import {
    GeometryVector,
    GeometryPoint,
    LineString,
    LinearRing,
    Polygon,
    GeoText
} from '@supermap/iclient-common';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.ThemeFeature
 * @classdesc 专题图要素类
 * @private
 * @param geometry - {Object} 要量算的几何对象
 * @param attributes - {Object} 属性
 */
export class ThemeFeature {

    constructor(geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    }

    /**
     * @function ol.supermap.ThemeFeature.prototype.toFeature
     * @description 转为矢量要素
     */
    toFeature() {
        var geometry = this.geometry;
        if (geometry instanceof ol.geom.Point) {
            geometry = new GeometryPoint(geometry.getCoordinates()[0], geometry.getCoordinates()[1]);
        }
        if (geometry instanceof ol.geom.LineString) {
            let coords = geometry.getCoordinates();
            let points = [];
            for (let i = 0; i < coords.length; i++) {
                points.push(new GeometryPoint(coords[i][0], coords[i][1]));
            }
            geometry = new LineString(points);
        }
        if (geometry instanceof ol.geom.Polygon) {
            let coords = geometry.getCoordinates();
            let points = [];
            for (let i = 0; i < coords.length; i++) {
                points.push(new GeometryPoint(coords[i][0], coords[i][1]));
            }
            var linearRings = new LinearRing(points);
            geometry = new Polygon([linearRings]);
        }
        if (geometry.length === 3) {
            geometry = new GeoText(geometry[0], geometry[1], geometry[2]);
        }
        return new GeometryVector(geometry, this.attributes);
    }
}

ol.supermap.ThemeFeature = ThemeFeature;