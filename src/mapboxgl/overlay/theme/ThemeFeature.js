import mapboxgl from 'mapbox-gl';
import SuperMap from '../../../common/SuperMap';
import Util from '../../core/Util';
/**
 * @class mapboxgl.supermap.ThemeFeature
 * @classdesc 专题图要素类
 * @private
 * @param geometry - {Object} 要量算的几何对象
 * @param attributes - {Object} 属性
 */
export default class ThemeFeature {

    constructor(geoJson, attributes) {
        this.geoJson = geoJson;
        this.attributes = attributes;
    }

    /**
     * @function mapboxgl.supermap.ThemeFeature.prototype.toFeature
     * @description 转为矢量要素
     */
    toFeature() {
        var geometry = Util.toSuperMapGeometry(this.geoJson);
        var points = [];
        if (this.geoJson instanceof mapboxgl.LngLat) {
            points = [this.geoJson.lng, this.geoJson.lat];
        } else if (this.geoJson instanceof mapboxgl.Point) {
            points = [this.geoJson.x, this.geoJson.y];
        }
        if (points.length > 1) {
            geometry = new SuperMap.Geometry.Point(points[0], points[1]);
        }
        return new SuperMap.Feature.Vector(geometry, this.attributes);
    }
}

mapboxgl.supermap.ThemeFeature = ThemeFeature;