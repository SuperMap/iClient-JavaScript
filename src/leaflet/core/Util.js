/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import L from 'leaflet';
 import { GeoJSON as GeoJSONFormat } from '@supermap/iclient-common/format/GeoJSON';
 import {
  getMeterPerMapUnit as MeterPerMapUnit,
  getZoomByResolution,
  scalesToResolutions,
  getDpi
} from '@supermap/iclient-common/util/MapCalculateUtil';

 /**
 * @function toGeoJSON
 * @category BaseTypes Util
 * @description 将 SuperMap iServer Feature JSON 对象或 Leaflet 对象转为 GeoJSON 格式。
 * @param {Object} feature - SuperMap iServer Feature JSON 对象或 Leaflet 对象。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.toGeoJSON(feature);
 *
 * </script>
 *
 * // ES6 Import
 * import { toGeoJSON } from '{npm}';
 *
 * const result = toGeoJSON(feature);
 * ```
 */
 export var toGeoJSON = function (feature) {
   if (!feature) {
     return feature;
   }
   if (['FeatureCollection', 'Feature', 'Geometry'].indexOf(feature.type) != -1 || feature.coordinates) {
     return feature;
   }
   if (feature.toGeoJSON) {
     return feature.toGeoJSON();
   }
   if (feature instanceof L.LatLngBounds) {
    return L.rectangle(feature).toGeoJSON();
   }
   if (feature instanceof L.Bounds) {
    return L.rectangle([
       [feature.getTopLeft().x, feature.getTopLeft().y],
       [feature.getBottomRight().x, feature.getBottomRight().y]
     ]).toGeoJSON();
   }
   return new GeoJSONFormat().toGeoJSON(feature);
 };

 /**
 * @function toSuperMapGeometry
 * @category BaseTypes Util
 * @description 将 GeoJSON 对象转为 SuperMap 几何图形。
 * @param {GeoJSONObject} geometry - GeoJSON 对象。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.toSuperMapGeometry(geometry);
 *
 * </script>
 *
 * // ES6 Import
 * import { toSuperMapGeometry } from '{npm}';
 *
 * const result = toSuperMapGeometry(geometry);
 * ```
 */
export var toSuperMapGeometry = function(geometry) {
    if (!geometry) {
        return geometry;
    }
    var result,
        format = new GeoJSONFormat();
    if (['FeatureCollection', 'Feature', 'Geometry'].indexOf(geometry.type) != -1) {
        result = format.read(geometry, geometry.type);
    } else if (typeof geometry.toGeoJSON === 'function') {
        var geojson = geometry.toGeoJSON();
        result = geojson ? format.read(geojson, geojson.type) : geometry;
    }

    var serverResult = result || geometry;
    if (L.Util.isArray(result)) {
        if (result.length === 1) {
            serverResult = result[0];
        } else if (result.length > 1) {
            serverResult = [];
            result.map(function(item) {
                serverResult.push(item.geometry);
                return item;
            });
        }
    }

    return serverResult && serverResult.geometry ? serverResult.geometry : serverResult;
};

export var getMeterPerMapUnit = MeterPerMapUnit;


 /**
 * @function resolutionToScale
 * @category BaseTypes Util
 * @description 通过分辨率计算比例尺。
 * @param {number} resolution - 分辨率。
 * @param {number} dpi - 屏幕分辨率。
 * @param {string} mapUnit - 地图单位。
 * @returns {number} 比例尺。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.resolutionToScale(resolution, dpi, mapUnit);
 *
 * </script>
 *
 * // ES6 Import
 * import { resolutionToScale } from '{npm}';
 *
 * const result = resolutionToScale(resolution, dpi, mapUnit);
 * ```
 */
export var resolutionToScale = function(resolution, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    // 地球半径。
    var meterPerMapUnit = getMeterPerMapUnit(mapUnit);
    var scale = resolution * dpi * inchPerMeter * meterPerMapUnit;
    scale = 1 / scale;
    return scale;
};

 /**
 * @function scaleToResolution
 * @category BaseTypes Util
 * @description 通过比例尺计算分辨率。
 * @param {number} scale - 比例尺。
 * @param {number} dpi - 屏幕分辨率。
 * @param {string} mapUnit - 地图单位。
 * @returns {number} 分辨率。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.scaleToResolution(scale, dpi, mapUnit);
 *
 * </script>
 *
 * // ES6 Import
 * import { scaleToResolution } from '{npm}';
 *
 * const result = scaleToResolution(scale, dpi, mapUnit);
 * ```
 */
export var scaleToResolution = function(scale, dpi, mapUnit) {
    var inchPerMeter = 1 / 0.0254;
    var meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
    var resolution = scale * dpi * inchPerMeter * meterPerMapUnitValue;
    resolution = 1 / resolution;
    return resolution;
};

 /**
 * @function normalizeScale
 * @category BaseTypes Util
 * @description 转换比例尺。
 * @param {number} scale - 比例尺。
 * @returns {number} 正常的 scale 值。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.normalizeScale(scale);
 *
 *  // 弃用的写法
 *   const result = L.supermap.Util.NormalizeScale(scale);
 *   const result = L.Util.NormalizeScale(scale);
 * </script>
 *
 * // ES6 Import
 * import { normalizeScale } from '{npm}';
 *
 * const result = normalizeScale(scale);
 * ```
 */
export var normalizeScale = function(scale) {
  return scale > 1.0 ? 1.0 / scale : scale;
};

 /**
 * @function getResolutionFromScaleDpi
 * @category BaseTypes Util
 * @description 根据比例尺和 DPI 计算屏幕分辨率。
 * @param {number} scale - 比例尺。
 * @param {number} dpi - 图像分辨率，表示每英寸内的像素个数。
 * @param {string} [coordUnit] - 投影坐标系统的地图单位。
 * @param {number} [datumAxis=6378137] - 地理坐标系统椭球体长半轴。用户自定义地图的 Options 时，若未指定该参数的值，则 DPI 默认按照 WGS84 参考系的椭球体长半轴 6378137 来计算。
 * @returns {number} 当前比例尺下的屏幕分辨率。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.Util.getResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis);
 * 
 *   // 弃用的写法
 *   const result = L.supermap.Util.GetResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis);
 *   const result = L.Util.GetResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis);
 * </script>
 *
 * // ES6 Import
 * import { getResolutionFromScaleDpi } from '{npm}';
 *
 * const result = getResolutionFromScaleDpi(scale, dpi, coordUnit, datumAxis);
 * ```
 */
export var getResolutionFromScaleDpi = function(scale, dpi, coordUnit, datumAxis) {
    var resolution = null,
        ratio = 10000;
    //用户自定义地图的Options时，若未指定该参数的值，则系统默认为6378137米，即WGS84参考系的椭球体长半轴。
    datumAxis = datumAxis || 6378137;
    coordUnit = coordUnit || '';
    if (scale > 0 && dpi > 0) {
        scale = normalizeScale(scale);
        if (
            coordUnit.toLowerCase() === 'degree' ||
            coordUnit.toLowerCase() === 'degrees' ||
            coordUnit.toLowerCase() === 'dd'
        ) {
            //scale = CommonUtil.normalizeScale(scale);
            resolution = (0.0254 * ratio) / dpi / scale / ((Math.PI * 2 * datumAxis) / 360) / ratio;
            return resolution;
        } else {
            resolution = (0.0254 * ratio) / dpi / scale / ratio;
            return resolution;
        }
    }
    return -1;
};
export {
  getZoomByResolution,
  scalesToResolutions,
  getDpi
}
