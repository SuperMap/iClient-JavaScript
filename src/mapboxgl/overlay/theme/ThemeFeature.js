import mapboxgl from 'mapbox-gl';
import '../../core/Base';
import {GeometryPoint as Point, GeoText, GeometryVector as Vector} from '@supermap/iclient-common';
import {Util} from '../../core/Util';

/**
 * @class mapboxgl.supermap.ThemeFeature
 * @category  Visualization Theme
 * @classdesc 专题图要素类
 * @param geometry - {Object} 专题图要素几何对象，geojson格式。
 * @param attributes - {Object} 几何对象属性
 */
export class ThemeFeature {

    constructor(geometry, attributes) {
        this.geometry = geometry;
        this.attributes = attributes;
    }

    /**
     * @function mapboxgl.supermap.ThemeFeature.prototype.toFeature
     * @description 转为矢量要素
     */
    toFeature() {
        var geometry = Util.toSuperMapGeometry(this.geometry);
        var points = [];
        if (this.geometry instanceof mapboxgl.LngLat) {
            points = [this.geometry.lng, this.geometry.lat];
        } else if (this.geometry instanceof mapboxgl.Point) {
            points = [this.geometry.x, this.geometry.y];
        } else if (this.geometry.length === 3) {
            geometry = new GeoText(this.geometry[0], this.geometry[1], this.geometry[2]);
        }
        if (points.length > 1) {
            geometry = new Point(points[0], points[1]);
        }
        return new Vector(geometry, this.attributes);
    }
}

mapboxgl.supermap.ThemeFeature = ThemeFeature;