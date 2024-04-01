/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import "../core/Base";
import mapboxgl from 'mapbox-gl';
import { Bounds } from "@supermap/iclient-common/commontypes/Bounds";
import { Point as GeometryPoint } from "@supermap/iclient-common/commontypes/geometry/Point";
import { Polygon } from "@supermap/iclient-common/commontypes/geometry/Polygon";
import { LinearRing } from "@supermap/iclient-common/commontypes/geometry/LinearRing";
import { GeoJSON as GeoJSONFormat } from "@supermap/iclient-common/format/GeoJSON";

const isArray = function (obj){
  return Object.prototype.toString.call(obj) == "[object Array]";
}
const isString = function (str) {
  return (typeof str === 'string') && str.constructor === String;
}
/**
 * @name Util
 * @namespace
 * @category BaseTypes Util
 * @description 工具类。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.toSuperMapGeometry(geoJSON);
 *
 * </script>
 * // ES6 Import
 * import { Util } from '{npm}';
 *
 * const result = Util.toSuperMapGeometry(geoJSON);
 * ```
 */

export const Util = {
    /**
     * @function Util.toSuperMapGeometry
     * @description 将 GeoJSON 对象转为 SuperMap 几何图形。
     * @param {GeoJSONObject} geoJSON - GeoJSON 对象。
     * @returns {Geometry}
     */
    toSuperMapGeometry(geoJSON) {
        if (geoJSON && geoJSON.type) {
            var format = new GeoJSONFormat();
            var result = format.read(geoJSON, "FeatureCollection");
            return result[0].geometry;
        }
    },

    toSuperMapBounds(bounds) {
        if (isArray(bounds)) {
            //左下右上
            return new Bounds(bounds[0], bounds[1], bounds[2], bounds[3]);
        }
        if (bounds instanceof mapboxgl.LngLatBounds) {
          return new Bounds(bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth());
        }
        if (bounds instanceof Bounds) {
          return bounds;
        }
        return bounds;
    },

    toSuperMapPoint(lnglat) {
        //客户端可传入 geojson 对象 或者 mapboxgl lnglat 点对象,或者是点数组
        if (isArray(lnglat)) {
            return new GeometryPoint(lnglat[0], lnglat[1]);
        } else if (lnglat.lng && lnglat.lat) {
            return new GeometryPoint(lnglat.lng, lnglat.lat);
        }
        return new GeometryPoint(lnglat.geometry.coordinates[0], lnglat.geometry.coordinates[1]);
    },
    /**
     * @function Util.toSuperMapPolygon
     * @description 将 Mapbox GL LngLatbounds 对象转为 SuperMap 几何图形。
     * @param {mapboxgl.LngLatBounds} lnglatBounds - Mapbox GL LngLatbounds对象。
     * @returns {GeometryPolygon}
     */
    toSuperMapPolygon(lnglatBounds) {
        const west = lnglatBounds.getWest();
        const east = lnglatBounds.getEast();
        const sourth = lnglatBounds.getSouth();
        const north = lnglatBounds.getNorth();
        return new Polygon([
            new LinearRing([
                new GeometryPoint(west, sourth),
                new GeometryPoint(east, sourth),
                new GeometryPoint(east, north),
                new GeometryPoint(west, north)
            ])
        ]);
    },
    /**
     * @function Util.isArray
     * @description 判断是否为数组格式。
     * @param {Object} obj - 待判断对象。
     * @returns {boolean} 是否是数组。
     */
    isArray,

    /**
     * @function Util.toGeoJSON
     * @description 将传入对象转为 GeoJSON 格式。
     * @param {Object} smObj - 待转对象。
     */
    toGeoJSON(smObj) {
        if (smObj) {
            var format = new GeoJSONFormat();
            return format.toGeoJSON(smObj);
        }
    },

    /**
     * @function Util.toProcessingParam
     * @description 将 Region 节点数组转为 Processing 服务需要的分析参数。
     * @param {Array} points - Region 各个节点数组。
     * @returns {Object} processing 服务裁剪、查询分析的分析参数。
     */
    toProcessingParam(points) {
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
    },

    /**
     * @function Util.extend
     * @description 对象拷贝赋值。
     * @param {Object} dest - 目标对象。
     * @param {Object} arguments - 待拷贝的对象。
     * @returns {Object} 赋值后的目标对象。
     */
    extend(dest) {
        for (var index = 0; index < Object.getOwnPropertyNames(arguments).length; index++) {
            var arg = Object.getOwnPropertyNames(arguments)[index];
            if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                continue;
            }
            var obj = arguments[arg];
            if (obj) {
                for (var j = 0; j < Object.getOwnPropertyNames(obj).length; j++) {
                    var key = Object.getOwnPropertyNames(obj)[j];
                    if (arg == "caller" || arg == "callee" || arg == "length" || arg == "arguments") {
                        continue;
                    }
                    dest[key] = obj[key];
                }
            }
        }
        return dest;
    },

    /**
     * 检测数据是否为number
     * @param value 值，未知数据类型
     * @returns {boolean}
     */
    isNumber(value) {
        if (value === "") {
            return false;
        }
        let mdata = Number(value);
        if (mdata === 0) {
            return true;
        }
        return !isNaN(mdata);
    },

    isString: isString,
    /**
     * 随机生成id
     * @param attr
     * @returns {string}
     */
    newGuid(attr) {
        let len = attr || 32;
        let guid = "";
        for (let i = 1; i < len; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
        }
        return guid;
    },
    /**
     * @description 十六进制转 RGBA 格式。
     * @param {Object} hex - 十六进制格式。
     * @param {number} opacity - 不透明度Alpha。
     * @returns {string} 生成的 RGBA 格式。
     */
    hexToRgba(hex, opacity) {
        var color = [],
            rgba = [];
        hex = hex.replace(/#/, "");
        if (hex.length == 3) {
            var tmp = [];
            for (let i = 0; i < 3; i++) {
                tmp.push(hex.charAt(i) + hex.charAt(i));
            }
            hex = tmp.join("");
        }
        for (let i = 0; i < 6; i += 2) {
            color[i] = "0x" + hex.substr(i, 2);
            rgba.push(parseInt(Number(color[i])));
        }
        rgba.push(opacity);
        return "rgba(" + rgba.join(",") + ")";
    },

    /**
     * @param {string} featureName 原始数据中的地名
     * @param {string} fieldName 待匹配的地名
     * @returns {boolean} 是否匹配
     */
    isMatchAdministrativeName(featureName, fieldName) {
      if (isString(fieldName)) {
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
