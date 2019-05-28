/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import ol from 'openlayers';
import {Unit, Bounds, GeoJSON as GeoJSONFormat, FilterParameter,
    GetFeaturesBySQLParameters,
    GetFeaturesBySQLService,
    QueryBySQLParameters,
    QueryOption
} from '@supermap/iclient-common';

ol.supermap = ol.supermap || {};

/**
 * @class ol.supermap.Util
 * @category BaseTypes Util
 * @classdesc 工具类。
 */
export class Util {

    constructor() {

    }

    /**
     * @function ol.supermap.Util.toGeoJSON
     * @description 将传入对象转为 GeoJSON 格式。
     * @param {Object} smObj - 待转参数。
     */
    static toGeoJSON(smObj) {
        if (smObj) {
            var format = new GeoJSONFormat();
            return format.toGeoJSON(smObj);
        }
    }

    /**
     * @function ol.supermap.Util.toSuperMapGeometry
     * @description 将 GeoJSON 对象转为 SuperMap 几何图形。
     * @param {GeoJSONObject} geoJSON - GeoJSON 对象。
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
     * @description 通过分辨率计算比例尺。
     * @param {number} resolution - 分辨率。
     * @param {number} dpi - 屏幕分辨率。
     * @param {string} mapUnit - 地图单位。
     * @returns {number} 比例尺。
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
     * @description 转为 SuperMapBounds 格式。
     * @param {Array.<number>} bounds - bounds 数组。
     * @returns {SuperMap.Bounds} 返回 SuperMap 的 Bounds 对象。
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
     * @description 将 Region 节点数组转为 Processing 服务需要的分析参数。
     * @param {Array} points - Region 各个节点数组。
     * @returns processing 服务裁剪、查询分析的分析参数。
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
     * @description 通过比例尺计算分辨率。
     * @param {number} scale - 比例尺。
     * @param {number} dpi - 屏幕分辨率。
     * @param {string} mapUnit - 地图单位。
     * @returns {number} 分辨率。
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
     * @description 获取每地图单位多少米。
     * @param {string} mapUnit - 地图单位。
     * @returns {number} 返回每地图单位多少米。
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
     * @description 判断是否为数组格式。
     * @param {Object} obj - 待判断对象。
     * @returns {boolean} 是否是数组。
     */
    static isArray(obj) {
        return Object.prototype.toString.call(obj) == '[object Array]'
    }

    /**
     * @function ol.supermap.Util.Csv2GeoJSON
     * @description 将 csv 格式转为 GeoJSON。
     * @param {Object} csv - csv 对象。
     * @param {Object} options - 转换参数。
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
     * @description 创建 2D 画布。
     * @param {number} opt_width - 画布宽度。
     * @param {number} opt_height - 画布高度。
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
    /**
     * @function ol.supermap.Util.supportWebGL2
     * @description 是否支持 webgl2。
     */
    static supportWebGL2() {
        var canvas = document.createElement('canvas');
        return Boolean(canvas && canvas.getContext("webgl2"));
    }

    /**
     * @function ol.supermap.Util.isString
     * @description 是否为字符串
     * @param {string} str - 需要判断的内容
     * @returns {boolean}
     */
    static isString(str) {
        return (typeof str === 'string') && str.constructor === String;
    }
    
    /**
     * @function ol.supermap.Util.trim
     * @description 字符串裁剪两边的空格
     * @param {string} str - 需要裁剪的字符串
     * @returns {boolean}
     */
    static trim(str) {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    }
    /**
     * @function ol.supermap.Util.newGuid
     * @description 随机生成id
     * @param {string} attr - 几位数字的id
     * @returns {string}
     */
    static newGuid(attr) {
        let len = attr || 32;
        let guid = "";
        for (let i = 1; i < len; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    }
    /**
     * @function ol.supermap.Util.isNumber
     * @description 检测数据是否为number
     * @param {string} value - 值，未知数据类型
     * @returns {boolean}
     */
    static isNumber(value) {
        if (value === '') {
            return false;
        }
        let mdata = Number(value);
        if (mdata === 0) {
            return true;
        }
        return !isNaN(mdata);
    }
    /**
     * @function ol.supermap.Util.getFeatureBySQL
     * @description 获取feature
     * @param {string} url - 获取feature的请求地址
     * @param {string} datasetNames - 数据集名称
     * @param {function} processCompleted - 成功请求的回调函数
     * @param {function} processFaild - 失败请求的回调函数
     */
    static getFeatureBySQL(url, datasetNames, processCompleted, processFaild) {
        let getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
        getFeatureParam = new FilterParameter({
            name: datasetNames.join().replace(":", "@"),
            attributeFilter: 'SMID > 0'
        });
        getFeatureBySQLParams = new GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            datasetNames: datasetNames,
            fromIndex: 0,
            toIndex: 100000,
            maxFeatures: 100000,
            returnContent: true
        });
        let options = {
            eventListeners: {
                processCompleted: function (getFeaturesEventArgs) {
                    processCompleted && processCompleted(getFeaturesEventArgs);
                },
                processFailed: function (e) {
                    processFaild && processFaild(e);
                }
            }
        };
        getFeatureBySQLService = new GetFeaturesBySQLService(url, options);
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }

    static queryFeatureBySQL(url, layerName, attributeFilter, fields, epsgCode, processCompleted, processFaild, startRecord, recordLength, onlyAttribute) {
        var queryParam, queryBySQLParams, queryBySQLService;
        queryParam = new FilterParameter({
            name: layerName,
            attributeFilter: attributeFilter
        });
        if (fields) {
            queryParam.fields = fields;
        }
        var params = {
            queryParams: [queryParam]
        };
        if (onlyAttribute) {
            params.queryOption = QueryOption.ATTRIBUTE;
        }
        startRecord && (params.startRecord = startRecord);
        recordLength && (params.expectCount = recordLength);
        if (epsgCode) {
            params.prjCoordSys = {
                epsgCode: epsgCode
            }
        }
        queryBySQLParams = new QueryBySQLParameters(params);
        queryBySQLService = new ol.supermap.QueryService(url);
        queryBySQLService.queryBySQL(queryBySQLParams, function (data) {
            data.type === 'processCompleted' ? processCompleted(data) : processFaild(data)
        });
    }

    /**
     * @function ol.supermap.Util.getFeatureProperties
     * @description 从feature中获取properties
     * @param {array} features 要素数组
     * @returns {array} 属性
     */
    static getFeatureProperties(features) {
        let properties = [];
        if (Util.isArray(features) && features.length) {
            features.forEach(feature => {
                let property = feature.attributes || feature.get('Properties');
                property && properties.push(property);
            });
        }
        return properties;
    }

    /**
     * @function ol.supermap.Util.isMatchAdministrativeName
     * @param {string} featureName 原始数据中的地名
     * @param {string} fieldName 需要匹配的地名
     * @returns {boolean} 是否匹配
     */
    static isMatchAdministrativeName(featureName, fieldName) {
        if (Util.isString(fieldName)) {
            let shortName = featureName.substr(0, 2);
            // 张家口市和张家界市 特殊处理
            if (shortName === '张家') {
                shortName = featureName.substr(0, 3);
            }
            return !!fieldName.match(new RegExp(shortName));
        }
        return false;
    }
}

ol.supermap.Util = Util;