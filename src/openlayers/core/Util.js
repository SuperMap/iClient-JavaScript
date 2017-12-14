import ol from 'openlayers';
import {Unit, Bounds, GeoJSON as GeoJSONFormat} from '@supermap/iclient-common';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.Util
 * @classdesc 工具类
 */
export class Util {

    constructor() {

    }

    /**
     * @function ol.supermap.Util.toGeoJSON
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
     * @function ol.supermap.Util.toSuperMapGeometry
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

    /**
     * @function ol.supermap.Util.resolutionToScale
     * @description 通过分辨率计算比例尺
     * @param resolution - {number} 分辨率
     * @param dpi - {number} 屏幕分辨率
     * @param mapUnit - {string} 地图单位
     * @return {number} 比例尺
     */
    static resolutionToScale(resolution, dpi, mapUnit) {
        var inchPerMeter = 1 / 0.0254;
        // 地球半径。
        var meterPerMapUnit = this.getMeterPerMapUnit(mapUnit);
        var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
        scale = 1 / scale;
        return scale;
    }

    /**
     * @function ol.supermap.Util.toSuperMapBounds
     * @description 转为SuperMapBounds格式
     * @param bounds {Array<number>} bounds数组
     * @return {SuperMap.Bounds} 返回SuperMap的Bounds对象
     */
    static toSuperMapBounds(bounds) {
        return new Bounds(
            bounds[0],
            bounds[1],
            bounds[2],
            bounds[3]
        );
    }

    /**
     * @function ol.supermap.Util.toProcessingParam
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
            results.push(results[0]);
            geometryParam.type = "REGION";
            geometryParam.points = results;
        }
        return geometryParam;
    }

    /**
     * @function ol.supermap.Util.scaleToResolution
     * @description 通过比例尺计算分辨率
     * @param scale - {number} 比例尺
     * @param dpi - {number} 屏幕分辨率
     * @param mapUnit - {string} 地图单位
     * @return {number} 分辨率
     */
    static scaleToResolution(scale, dpi, mapUnit) {
        var inchPerMeter = 1 / 0.0254;
        var meterPerMapUnitValue = this.getMeterPerMapUnit(mapUnit);
        var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
        resolution = 1 / resolution;
        return resolution;
    }

    /**
     * @private
     * @function ol.supermap.Util.getMeterPerMapUnit
     * @description 获取每地图单位多少米
     * @param mapUnit mapUnit - {string} 地图单位
     * @return {number} 返回每地图单位多少米
     */
    static getMeterPerMapUnit(mapUnit) {
        var earchRadiusInMeters = 6378137;
        var meterPerMapUnit;
        if (mapUnit === Unit.METER) {
            meterPerMapUnit = 1;
        } else if (mapUnit === Unit.DEGREE) {
            // 每度表示多少米。
            meterPerMapUnit = Math.PI * 2 * earchRadiusInMeters / 360;
        } else if (mapUnit === Unit.KILOMETER) {
            meterPerMapUnit = 1.0E-3;
        } else if (mapUnit === Unit.INCH) {
            meterPerMapUnit = 1 / 2.5399999918E-2;
        } else if (mapUnit === Unit.FOOT) {
            meterPerMapUnit = 0.3048;
        } else {
            return meterPerMapUnit;
        }
        return meterPerMapUnit;
    }

    /**
     * @function ol.supermap.Util.isArray
     * @description 判断是否为数组格式
     * @param obj - {Object} 待判断对象
     * @return {boolean} 是否是数组
     */
    static isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]'
    }

    /**
     * @function ol.supermap.Util.Csv2GeoJSON
     * @description 将 csv 格式转为 GeoJSON
     * @param csv - {Object} csv 对象
     * @param options - {Object} 转换参数
     */
    static Csv2GeoJSON(csv, options) {
        var defaultOptions = {
            titles: ['lon', 'lat'],
            latitudeTitle: 'lat',
            longitudeTitle: 'lon',
            fieldSeparator: ',',
            lineSeparator: '\n',
            deleteDoubleQuotes: true,
            firstLineTitles: false
        };
        options = options || defaultOptions;
        var _propertiesNames = []
        if (typeof csv === 'string') {
            var titulos = options.titles;
            if (options.firstLineTitles) {
                csv = csv.split(options.lineSeparator);
                if (csv.length < 2) {
                    return;
                }
                titulos = csv[0];
                csv.splice(0, 1);
                csv = csv.join(options.lineSeparator);
                titulos = titulos.trim().split(options.fieldSeparator);
                for (let i = 0; i < titulos.length; i++) {
                    titulos[i] = _deleteDoubleQuotes(titulos[i]);
                }
                options.titles = titulos;
            }
            for (let i = 0; i < titulos.length; i++) {
                var prop = titulos[i].toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '_');
                if (prop == '' || prop == '_') {
                    prop = 'prop-' + i;
                }
                _propertiesNames[i] = prop;
            }
            csv = _csv2json(csv);
        }
        return csv;

        function _deleteDoubleQuotes(cadena) {
            if (options.deleteDoubleQuotes) {
                cadena = cadena.trim().replace(/^"/, "").replace(/"$/, "");
            }
            return cadena;
        }

        function _csv2json(csv) {
            var json = {};
            json["type"] = "FeatureCollection";
            json["features"] = [];
            var titulos = options.titles;
            csv = csv.split(options.lineSeparator);
            for (var num_linea = 0; num_linea < csv.length; num_linea++) {
                var campos = csv[num_linea].trim().split(options.fieldSeparator)
                    , lng = parseFloat(campos[titulos.indexOf(options.longitudeTitle)])
                    , lat = parseFloat(campos[titulos.indexOf(options.latitudeTitle)]);

                var isInRange = lng < 180 && lng > -180 && lat < 90 && lat > -90;
                if (!(campos.length == titulos.length && isInRange)) {
                    continue;
                }

                var feature = {};
                feature["type"] = "Feature";
                feature["geometry"] = {};
                feature["properties"] = {};
                feature["geometry"]["type"] = "Point";
                feature["geometry"]["coordinates"] = [lng, lat];
                for (var i = 0; i < titulos.length; i++) {
                    if (titulos[i] != options.latitudeTitle && titulos[i] != options.longitudeTitle) {
                        feature["properties"][_propertiesNames[i]] = _deleteDoubleQuotes(campos[i]);
                    }
                }
                json["features"].push(feature);
            }
            return json;
        }
    }

    /**
     * @function ol.supermap.Util.createCanvasContext2D
     * @description 创建2D画布
     * @param opt_width - {number} 画布宽度
     * @param opt_height - {number} 画布高度
     */
    static createCanvasContext2D(opt_width, opt_height) {
        var canvas = document.createElement('CANVAS');
        if (opt_width) {
            canvas.width = opt_width;
        }
        if (opt_height) {
            canvas.height = opt_height;
        }
        return canvas.getContext('2d');
    }
}

ol.supermap.Util = Util;