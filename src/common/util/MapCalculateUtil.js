import { Unit } from '../REST';

/**
 * @function getMeterPerMapUnit
 * @description 单位换算，把米|度|千米|英寸|英尺换成米。
 * @category BaseTypes Util
 * @param {string} mapUnit 地图单位。
 * @returns {number} 返回地图的距离单位。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.getMeterPerMapUnit(mapUnit);
 *
 * </script>
 *
 * // ES6 Import
 * import { getMeterPerMapUnit } from '{npm}';
 *
 * const result = getMeterPerMapUnit(mapUnit);
 * ```
 */
export var getMeterPerMapUnit = function(mapUnit) {
  var earchRadiusInMeters = 6378137;
  var meterPerMapUnit;
  if (['m','meter','meters'].indexOf(mapUnit.toLocaleLowerCase())>-1) {
      meterPerMapUnit = 1;
  } else if (['degrees','deg','degree','dd'].indexOf(mapUnit.toLocaleLowerCase())>-1) {
      // 每度表示多少米。
      meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
  } else if (mapUnit === Unit.KILOMETER) {
      meterPerMapUnit = 1.0e-3;
  } else if (mapUnit === Unit.INCH) {
      meterPerMapUnit = 1 / 2.5399999918e-2;
  } else if (mapUnit === Unit.FOOT) {
      meterPerMapUnit = 0.3048;
  }
  return meterPerMapUnit;
};

/**
 * @function getWrapNum
 * @description 获取该坐标系的经纬度范围的经度或纬度。
 * @category BaseTypes Util
 * @param {number} x 经度或纬度。
 * @param {boolean} includeMax 是否获取经度或纬度的最大值。
 * @param {boolean} includeMin 是否获取经度或纬度的最小值。
 * @param {number} range 坐标系的经纬度范围。
 * @returns {number} 返回经度或纬度的值。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.getWrapNum(x, includeMax, includeMin, range);
 *
 * </script>
 *
 * // ES6 Import
 * import { getWrapNum } from '{npm}';
 *
 * const result = getWrapNum(x, includeMax, includeMin, range);
 * ```
 */
export function getWrapNum(x, includeMax = true, includeMin = true, range = [-180, 180]) {
    var max = range[1],
        min = range[0],
        d = max - min;
    if (x === max && includeMax) {
        return x;
    }
    if (x === min && includeMin) {
        return x;
    }
    var tmp = (((x - min) % d) + d) % d;
    if (tmp === 0 && includeMax) {
        return max;
    }
    return ((((x - min) % d) + d) % d) + min;
}

/**
 * @function conversionDegree
 * @description 转换经纬度。
 * @category BaseTypes Util
 * @param {number} degrees 经度或纬度。
 * @returns {string} 返回度分秒。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script>
 *   const result = {namespace}.conversionDegree(degrees);
 *
 * </script>
 *
 * // ES6 Import
 * import { conversionDegree } from '{npm}';
 *
 * const result = conversionDegree(degrees);
 * ```
 */
export function conversionDegree(degrees) {
    const degree = parseInt(degrees);
    let fraction = parseInt((degrees - degree) * 60);
    let second = parseInt(((degrees - degree) * 60 - fraction) * 60);
    fraction = parseInt(fraction / 10) === 0 ? `0${fraction}` : fraction;
    second = parseInt(second / 10) === 0 ? `0${second}` : second;
    return `${degree}°${fraction}'${second}`;
}

/**
  * @function scalesToResolutions
  * @description 通过比例尺数组计算分辨率数组，没有传入比例尺数组时通过地图范围与地图最大级别进行计算。
  * @version 11.0.1
  * @param {Array} scales - 比例尺数组。
  * @param {Object} bounds - 地图范围。
  * @param {number} dpi - 屏幕分辨率。
  * @param {string} mapUnit - 地图单位。
  * @param {number} [level=22] - 地图最大级别。
  * @returns {number} 分辨率。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.scalesToResolutions(scales, bounds, dpi, mapUnit);
  *
  * </script>
  *
  * // ES6 Import
  * import { scalesToResolutions } from '{npm}';
  *
  * const result = scalesToResolutions(scales, bounds, dpi, mapUnit);
  * ```
 */
 export function scalesToResolutions(scales, bounds, dpi, mapUnit, level = 22) {
  var resolutions = [];
  if (scales && scales.length > 0) {
    for (let i = 0; i < scales.length; i++) {
      resolutions.push(scaleToResolution(scales[i], dpi, mapUnit));
    }
  } else {
    const maxReolution = Math.abs(bounds.left - bounds.right) / 256;
    for (let i = 0; i < level; i++) {
      resolutions.push(maxReolution / Math.pow(2, i));
    }
  }
  return resolutions.sort(function (a, b) {
    return b - a;
  });
}
/**
  * @function getZoomByResolution
  * @description 通过分辨率获取地图级别。
  * @version 11.0.1
  * @param {number} resolution - 分辨率。
  * @param {Array} resolutions - 分辨率数组。
  * @returns {number} 地图级别。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.getZoomByResolution(resolution, resolutions);
  *
  * </script>
  *
  * // ES6 Import
  * import { getZoomByResolution } from '{npm}';
  *
  * const result = getZoomByResolution(resolution, resolutions);
  * ```
 */
export function getZoomByResolution(resolution, resolutions) {
  let zoom = 0;
  let minDistance;
  for (let i = 0; i < resolutions.length; i++) {
    if (i === 0) {
      minDistance = Math.abs(resolution - resolutions[i]);
    }
    if (minDistance > Math.abs(resolution - resolutions[i])) {
      minDistance = Math.abs(resolution - resolutions[i]);
      zoom = i;
    }
  }
  return zoom;
}

/**
  * @function scaleToResolution
  * @description 通过比例尺计算分辨率。
  * @version 11.0.1
  * @param {number} scale - 比例尺。
  * @param {number} dpi - 屏幕分辨率。
  * @param {string} mapUnit - 地图单位。
  * @returns {number} 分辨率。
  * @usage
  * ```
  * // 浏览器
  * <script type="text/javascript" src="{cdn}"></script>
  * <script>
  *   const result = {namespace}.scaleToResolution(scale, dpi, mapUnit);
  *
  * </script>
  *
  * // ES6 Import
  * import { scaleToResolution } from '{npm}';
  *
  * const result = scaleToResolution(scale, dpi, mapUnit);
  * ```
 */
export function scaleToResolution(scale, dpi, mapUnit) {
  const inchPerMeter = 1 / 0.0254;
  const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  const resolution = 1 / (scale * dpi * inchPerMeter * meterPerMapUnitValue);
  return resolution;
}

/**
 * 范围是否相交
 * @param {Array} extent1 范围1
 * @param {Array} extent2 范围2
 * @return {boolean} 范围是否相交。
 */
 export function intersects(extent1, extent2) {
  return (
    extent1[0] <= extent2[2] &&
    extent1[2] >= extent2[0] &&
    extent1[1] <= extent2[3] &&
    extent1[3] >= extent2[1]
  );
}

/**
 * 获取两个范围的交集
 * @param {Array} extent1 Extent 1
 * @param {Array} extent2 Extent 2
 * @return {Array} 相交范围数组.
 * @api
 */
 export function getIntersection(extent1, extent2) {
  const intersection = [];
  if (intersects(extent1, extent2)) {
    if (extent1[0] > extent2[0]) {
      intersection[0] = extent1[0];
    } else {
      intersection[0] = extent2[0];
    }
    if (extent1[1] > extent2[1]) {
      intersection[1] = extent1[1];
    } else {
      intersection[1] = extent2[1];
    }
    if (extent1[2] < extent2[2]) {
      intersection[2] = extent1[2];
    } else {
      intersection[2] = extent2[2];
    }
    if (extent1[3] < extent2[3]) {
      intersection[3] = extent1[3];
    } else {
      intersection[3] = extent2[3];
    }
  }
  return intersection;
}