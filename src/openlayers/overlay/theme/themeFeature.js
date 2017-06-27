/**
 *Class: ThemeFeature
 *客户端专题图要素类
 */
require('../../core/Base');
var SuperMap = require('../../../common/SuperMap');
var ol = require('openlayers/dist/ol-debug');

ol.supermap.ThemeFeature = function (geometry, attributes) {
    this.geometry = geometry;
    this.attributes = attributes;
};

ol.supermap.ThemeFeature.prototype.toFeature = function () {
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
};

module.exports = ol.supermap.ThemeFeature;