import ol from 'openlayers/dist/ol-debug';
import SuperMap from '../../../common/SuperMap';
ol.supermap = ol.supermap || {};
/**
 * @class ol.supermap.ThemeFeature
 * @classdesc 专题图要素类
 * @private
 * @param geometry - {Object} 要量算的几何对象
 * @param attributes - {Object} 属性
 */
export default class ThemeFeature {

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
            geometry = new SuperMap.Geometry.Point(geometry.getCoordinates()[0], geometry.getCoordinates()[1]);
        }
        if (geometry instanceof ol.geom.LineString) {
            var coords = geometry.getCoordinates();
            var points = [];
            for (var i = 0; i < coords.length; i++) {
                points.push(new SuperMap.Geometry.Point(coords[i][0], coords[i][1]));
            }
            geometry = new SuperMap.Geometry.LineString(points);
        }
        if (geometry instanceof ol.geom.Polygon) {
            var coords = geometry.getCoordinates();
            var points = [];
            for (var i = 0; i < coords.length; i++) {
                points.push(new SuperMap.Geometry.Point(coords[i][0], coords[i][1]));
            }
            var linearRings = new SuperMap.Geometry.LinearRing(points);
            geometry = new SuperMap.Geometry.Polygon([linearRings]);
        }
        return new SuperMap.Feature.Vector(geometry, this.attributes);
    }
}

ol.supermap.ThemeFeature = ThemeFeature;