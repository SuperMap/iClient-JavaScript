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
    if (mapUnit === Unit.METER) {
        meterPerMapUnit = 1;
    } else if (mapUnit === Unit.DEGREE) {
        // 每度表示多少米。
        meterPerMapUnit = (Math.PI * 2 * earchRadiusInMeters) / 360;
    } else if (mapUnit === Unit.KILOMETER) {
        meterPerMapUnit = 1.0e-3;
    } else if (mapUnit === Unit.INCH) {
        meterPerMapUnit = 1 / 2.5399999918e-2;
    } else if (mapUnit === Unit.FOOT) {
        meterPerMapUnit = 0.3048;
    } else {
        return meterPerMapUnit;
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

export function scalesToResolutions(scales, bounds, dpi, unit, level = 22) {
  var resolutions = [];
  if (scales && scales.length > 0) {
    for (let i = 0; i < scales.length; i++) {
      resolutions.push(scaleToResolution(scales[i], dpi, unit));
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

export function scaleToResolution(scale, dpi, mapUnit) {
  const inchPerMeter = 1 / 0.0254;
  const meterPerMapUnitValue = getMeterPerMapUnit(mapUnit);
  const resolution = 1 / (scale * dpi * inchPerMeter * meterPerMapUnitValue);
  return resolution;
}