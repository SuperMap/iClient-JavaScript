import mapboxgl from 'mapbox-gl';
import './Base';
import SuperMap from '../../common/SuperMap';
import GeoJSONFormat from '../../common/format/GeoJSON';

/**
 * @class mapboxgl.supermap.Util
 * @classdesc 工具类
 */
export default class Util {

    constructor() {

    }

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

}

mapboxgl.supermap.Util = Util;