import mapboxgl from 'mapbox-gl';
import '../core/Base';
import {Bounds, GeometryPoint, GeoJSON as GeoJSONFormat} from '@supermap/iclient-common';

/**
 * @class mapboxgl.supermap.Util
 * @classdesc 工具类
 */
export class Util {

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
            return new Bounds(
                bounds[0],
                bounds[1],
                bounds[2],
                bounds[3],
            );
        }
        return new Bounds(
            bounds.getWest(),
            bounds.getSouth(),
            bounds.getEast(),
            bounds.getNorth()
        );
    }

    static toSuperMapPoint(lnglat) {
        //客户端可传入 geojson 对象 或者 mapboxgl lnglat 点对象,或者是点数组
        if (this.isArray(lnglat)) {
            return new GeometryPoint(lnglat[0], lnglat[1]);
        } else if (lnglat.lng && lnglat.lat) {
            return new GeometryPoint(lnglat.lng, lnglat.lat);
        }
        return new GeometryPoint(lnglat.geometry.coordinates[0], lnglat.geometry.coordinates[1]);
    }

    /**
     * @function mapboxgl.supermap.Util.isArray
     * @description 判断是否为数组格式
     * @param obj - {Object} 待判断对象
     * @return {boolean} 是否是数组
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

    /**
     * @function mapboxgl.supermap.Util.toProcessingParam
     * @description 将Region节点数组转为Processing服务需要的分析参数
     * @param points - Region各个节点数组
     * @return processing服务裁剪、查询分析的分析参数
     */
    static toProcessingParam(points) {
        var geometryParam = {};
        if (points.length < 1) {
            geometryParam = "";
        } else {
            var results = [];
            for (var i = 0; i < points.length; i++) {
                var point = {};
                point.x = points[i][0];
                point.y = points[i][1];
                results.push(point);
            }
            geometryParam.type = "REGION";
            geometryParam.points = results;
        }
        return geometryParam;
    }

}

mapboxgl.supermap.Util = Util;