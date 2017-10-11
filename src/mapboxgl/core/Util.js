import mapboxgl from 'mapbox-gl';
import './Base';
import SuperMap from '../../common/SuperMap';
import GeoJSONFormat from '../../common/format/GeoJSON';

/**
 * @class mapboxgl.supermap.Util
 * @classdesc 工具类
 */
export default class Util {


    /**
     * @function mapboxgl.supermap.Util.toSuperMapGeometry
     * @description 将 geoJSON 对象转为SuperMap几何图形
     * @param geoJSON - {Object} geoJSON 对象
     */
    static toSuperMapGeometry(geoJSON) {
        if (geoJSON && geoJSON.type) {
            var format = new GeoJSONFormat();
            var result = format.read(geoJSON, "FeatureCollection");
            return result[0].geometry;
        }
    }

    static toSuperMapBounds(bounds) {
        if (this.isArray(bounds)) {
            //左下右上
            return new SuperMap.Bounds(
                bounds[0],
                bounds[1],
                bounds[2],
                bounds[3],
            );
        }
        return new SuperMap.Bounds(
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth()
        );
    }

    static toSuperMapPoint(lnglat) {
        //客户端可传入 geojson 对象 或者 mapboxgl lnglat 点对象,或者是点数组
        if (this.isArray(lnglat)) {
            return new SuperMap.Geometry.Point(lnglat[0], lnglat[1]);
        } else if (lnglat.lng && lnglat.lat) {
            return new SuperMap.Geometry.Point(lnglat.lng, lnglat.lat);
        }
        return new SuperMap.Geometry.Point(lnglat.geometry.coordinates[0], lnglat.geometry.coordinates[1]);
    }

    /**
     * @function mapboxgl.supermap.Util.isArray
     * @description 判断是否为数组格式
     * @param obj - {Object} 待判断对象
     * @return {boolean}
     */
    static isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]'
    }


    /**
     * @function mapboxgl.supermap.Util.toGeoJSON
     * @description 将传入对象转为 GeoJSON 格式
     * @param smObj - {Object} 待转参数
     */
    static toGeoJSON(smObj) {
        if (smObj) {
            var format = new GeoJSONFormat();
            return JSON.parse(format.write(smObj));
        }
    }


}

mapboxgl.supermap.Util = Util;