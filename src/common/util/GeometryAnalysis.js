import { geojson2UGGeometry, geojsonCoordsToPoint2Ds, ugGeometry2Geojson, getJSArrayFromUGDoubleArray, geojsonCoords2UGDoubleArray, formatCoord } from '../wasm/util';
import { Events } from '../commontypes/Events';
import * as defaultModule from './UGCWasmAll';
import { featureCoordValid, isValidLatlng } from './BaseUtil';
import { getMeterPerMapUnit, getSquareMeterPerMapUnit } from './MapCalculateUtil';
import { Unit, AnalystAreaUnit } from '../REST';

/**
 * @class GeometryAnalysis
 * @category BaseTypes Util
 * @classdesc 要素级几何分析类，提供缓冲区分析、凹凸面计算等常见的空间分析接口。
 * @param {Object} [Module] - 几何分析模块。
 * @usage
 * ```
 * // 浏览器
 * <script type="text/javascript" src="{cdn}"></script>
 * <script type="text/javascript" src="https://iclient.supermap.io/web/libs/ugcwasm/1.0.0/UGCWasmAll.js"></script>
 * <script>
 *   new {namespace}.GeometryAnalysis();
 *   
 * </script>
 *
 * // ES6 Import
 * import { GeometryAnalysis } from "{npm}";
 *
 * new GeometryAnalysis();
 * ```
 */
export class GeometryAnalysis extends Events {
  constructor(Module) {
    super();
    if (Module) {
      window.Module = Module;
    }
    if (!window.Module) {
      window.Module = defaultModule;
    }
    this.module = window.Module;
    this.addEventType('loaded');
    if (this.module.calledRun) {
      /**
       * @event GeometryAnalysis#loaded
       * @description 监听到几何分析模块加载完成事件后触发。
       */
      this.triggerEvent('loaded', {});
    } else {
      this.module.onRuntimeInitialized = () => {
        this.triggerEvent('loaded', {});
      }
    }
  }
  /**
   * @function GeometryAnalysis.prototype.buffer
   * @version 11.2.0
   * @description 缓冲区分析。
   * @param {GeoJSONFeature} feature - 要素。
   * @param {number} radius - 缓冲区距离，单位与数据单位一致。
   * @returns {GeoJSONFeature} 结果要素。
   */
  buffer(feature, radius) {
    const ugcGeojson = geojson2UGGeometry(feature);
    const buffer = this.module._UGCWasm_Geometrist_Buffer(ugcGeojson, radius);
    const geometry = ugGeometry2Geojson(buffer);
    return {
      type: "Feature",
      geometry
    }
  }
  /**
   * @function GeometryAnalysis.prototype.computeConvexHull
   * @version 11.2.0
   * @description 凸多边形计算。
   * @param {Array} points - 点坐标数组。
   * @returns {GeoJSONFeature} 最小外接多边形要素。
   */
  computeConvexHull(points) {
    const size = points.length;
    const ugPoints = geojsonCoordsToPoint2Ds(points);
    var result = this.module._UGCWasm_Geometrist_ComputeConvexHull(ugPoints, size);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    }
  }
  /**
   * @function GeometryAnalysis.prototype.isIdentical
   * @version 11.2.0
   * @description 几何对象相等分析, 传入要素坐标系需一致。
   * @param {GeoJSONFeature} feature - 要素。
   * @param {GeoJSONFeature} compareFeature - 对比要素。
   * @param {number} [tolerance=1e-6] - 节点容限值。
   * @returns {boolean} 要素是否完全相等。
   */
  isIdentical(feature, compareFeature, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(feature);
    const ugFeature2 = geojson2UGGeometry(compareFeature);
    const result = this.module._UGCWasm_Geometrist_IsIdentical(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  }
  /**
  * @function GeometryAnalysis.prototype.hasIntersection
  * @version 11.2.0
  * @description 几何对象是否相交分析，传入要素坐标系需一致。
  * @param {GeoJSONFeature} feature - 要素。
  * @param {GeoJSONFeature} compareFeature - 对比要素。
  * @param {number} [tolerance=1e-6] - 节点容限值。
  * @returns {boolean} 要素是否相交。
  */
  hasIntersection(feature, compareFeature, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(feature);
    const ugFeature2 = geojson2UGGeometry(compareFeature);
    const result = this.module._UGCWasm_Geometrist_HasIntersection(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.hasTouch
     * @version 11.2.0
     * @description 几何对象边界是否接触分析，传入要素坐标系需一致。
     * @param {GeoJSONFeature} feature - 要素。
     * @param {GeoJSONFeature} compareFeature - 对比要素。
     * @param {number} [tolerance=1e-6] - 节点容限值。
     * @returns {boolean} 几何对象边界是否接触。
     */
  hasTouch(feature, compareFeature, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(feature);
    const ugFeature2 = geojson2UGGeometry(compareFeature);
    const result = this.module._UGCWasm_Geometrist_HasTouch(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.resample
     * @version 11.2.0
     * @description 重采样分析。
     * @param {GeoJSONFeature} feature - 要素。
     * @param {number} [tolerance=1e-6] - 指定的重采样容限。
     * @returns {GeoJSONFeature} 结果要素。
     */
  resample(feature, tolerance = 1e-6) {
    const ugFeature = geojson2UGGeometry(feature);
    const result = this.module._UGCWasm_Geometrist_Resample(ugFeature, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  }
  /**
    * @function GeometryAnalysis.prototype.isParallel
    * @version 11.2.0
    * @description 线平行分析。
    * @param {number} x1 - 第一条线的起点X。
    * @param {number} y1 - 第一条线的起点Y。
    * @param {number} x2 - 第一条线的终点X。
    * @param {number} y2 - 第一条线的终点Y。
    * @param {number} x3 - 第二条线的起点X。
    * @param {number} y3 - 第二条线的起点Y。
    * @param {number} x4 - 第二条线的终点X。
    * @param {number} y4 - 第二条线的终点Y。
    * @returns {boolean} 两条线是否平行。
    */
  isParallel(x1, y1, x2, y2, x3, y3, x4, y4) {
    const result = this.module._UGCWasm_Geometrist_IsParallel(x1, y1, x2, y2, x3, y3, x4, y4);
    return result === 1;
  }
  /**
   * @function GeometryAnalysis.prototype.computePerpendicularPosition
   * @version 11.2.0
   * @description 点到线的垂线分析。
   * @param {number} x1 - 点坐标 X。
   * @param {number} y1 - 点坐标 Y。
   * @param {number} x2 - 第一条线的起点X。
   * @param {number} y2 - 第一条线的起点Y。
   * @param {number} x3 - 第一条线的终点X。
   * @param {number} y3 - 第一条线的终点Y。
   * @returns {Array} 垂线点坐标。
   */
  computePerpendicularPosition(x1, y1, x2, y2, x3, y3) {
    let values = this.module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    this.module._UGCWasm_Geometrist_ComputePerpendicularPosition(x1, y1, x2, y2, x3, y3, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return values;
  }
  /**
     * @function GeometryAnalysis.prototype.isPointOnLine
     * @version 11.2.0
     * @description 点是否在已知线段上。
     * @param {number} x1 - 点坐标 X。
     * @param {number} y1 - 点坐标 Y。
     * @param {number} x2 - 第一条线的起点X。
     * @param {number} y2 - 第一条线的起点Y。
     * @param {number} x3 - 第一条线的终点X。
     * @param {number} y3 - 第一条线的终点Y。
     * @param {boolean} [extended=false] - 是否将线段进行延长计算，默认不延长。
     * @returns {boolean} 点是否在已知线段上。
     */
  isPointOnLine(x1, y1, x2, y2, x3, y3, extended = false) {
    const result = this.module._UGCWasm_Geometrist_IsPointOnLine(x1, y1, x2, y2, x3, y3, extended);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isProjectOnLineSegment
     * @version 11.2.0
     * @description 判断点到线段的垂足是否在该线段上。
     * @param {number} x - 点 X 坐标。
     * @param {number} y - 点 Y 坐标。
     * @param {number} startX - 线起点 X 坐标。
     * @param {number} startY - 线起点 Y 坐标。
     * @param {number} endX - 线终点 X 坐标。
     * @param {number} endY - 线终点 Y 坐标。
     * @returns {boolean} 点到线段的垂足是否在该线段上。
     */
  isProjectOnLineSegment(x, y, startX, startY, endX, endY) {
    const result = this.module._UGCWasm_Geometrist_IsProjectOnLineSegment(x, y, startX, startY, endX, endY);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.distanceToLineSegment
     * @version 11.2.0
     * @description 计算点到线段的距离。
     * @param {number} x - 点 X 坐标。
     * @param {number} y - 点 Y 坐标。
     * @param {number} startX - 线起点 X 坐标。
     * @param {number} startY - 线起点 Y 坐标。
     * @param {number} endX - 线终点 X 坐标。
     * @param {number} endY - 线终点 Y 坐标。
     * @param {string} [featureUnit='DEGREE'] - 线坐标的单位，默认值为 DEGREE, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT", "DEGREE"。
     * @param {string} [unit='DEGREE'] - 结果距离单位，默认值为 DEGREE, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT", "DEGREE"。
     * @returns {number} 点到线段的距离。如果点到线段的垂足不在线段上，则返回点到线段较近的端点的距离。
     */
  distanceToLineSegment(x, y, startX, startY, endX, endY, featureUnit = Unit.DEGREE, unit = Unit.DEGREE) {
    let result = this.module._UGCWasm_Geometrist_DistanceToLineSegment(x, y, startX, startY, endX, endY);
    if (unit !== Unit.DEGREE) {
      return result * getMeterPerMapUnit(featureUnit) / getMeterPerMapUnit(unit);
    }
    return result;
  }
  /**
   * @function GeometryAnalysis.prototype.nearestPointToVertex
   * @version 11.2.0
   * @description 计算线到点的最近距离点，传入要素坐标系需一致。
   * @param {number} x - 点 X 坐标。
   * @param {number} y - 点 Y 坐标。
   * @param {GeoJSONFeature} feature - 线要素。
   * @returns {Array} 线到点最近点的坐标数组。
   */
  nearestPointToVertex(x, y, feature) {
    if (getType(feature) !== 'LineString') {
      throw new Error("only feature type is LineString supported");
    }
   
    let values = this.module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    const ugFeature = geojson2UGGeometry(feature);
    this.module._UGCWasm_Geometrist_NearestPointToVertex(x, y, ugFeature, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return values;
  }
  /**
     * @function GeometryAnalysis.prototype.computeConcaveHullPoints
     * @version 11.2.0
     * @description 点数组凹闭包计算。
     * @param {Array} xArray - x 坐标数组, 
     * @param {Array} yArray - y 坐标数组。
     * @param {number} angle - 	凹包内最小角度。
     * @returns {GeoJSONFeature} 结果要素。
     */
  /**
     * @function GeometryAnalysis.prototype.computeConcaveHullPoints
     * @version 11.2.0
     * @description 点数组凹闭包计算。
     * @param {Array|FeatureCollection} points - 点坐标数组，支持的形式为 [[x, y]], [{x, y}], 点要素数组, 也支持 FeatureCollection。
     * @param {number} angle - 凹包内最小角度。
     * @returns {GeoJSONFeature} 结果要素。
     */
  computeConcaveHullPoints(xArray, yArray, angle) {
    if (!Array.isArray(yArray)) {
      const { xList, yList } = formatCoord(xArray);
      angle = yArray;
      xArray = xList;
      yArray = yList;
    }
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    let pGeoRegionHull = this.module._UGCWasm_Geometrist_ComputeConcaveHullPoints(pXArray, pYArray, xArray.length, angle);
    var polyJson = ugGeometry2Geojson(pGeoRegionHull);
    return {
      type: "Feature",
      geometry: polyJson
    };
  }
  /**
     * @function GeometryAnalysis.prototype.isSegmentIntersect
     * @version 11.2.0
     * @description 计算线段是否相交。
     * @param {number} x1 - 第一条线的起点X。
     * @param {number} y1 - 第一条线的起点Y。
     * @param {number} x2 - 第一条线的终点X。
     * @param {number} y2 - 第一条线的终点Y。
     * @param {number} x3 - 第二条线的起点X。
     * @param {number} y3 - 第二条线的起点Y。
     * @param {number} x4 - 第二条线的终点X。
     * @param {number} y4 - 第二条线的终点Y。
     * @returns {boolean} 线是否相交。
     */
  isSegmentIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const result = this.module._UGCWasm_Geometrist_IsSegmentIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isIntersectRegionWithRect
     * @version 11.2.0
     * @description 几何对象与矩形是否相交分析。
     * @param {GeoJSONFeature} feature - 要素。
     * @param {number} left - 矩形左坐标。
     * @param {number} top - 矩形上坐标。
     * @param {number} right - 矩形右坐标。
     * @param {number} bottom - 矩形下坐标。
     * @param {number} [tolerance=1e-6] - 节点容限值。
     * @returns {boolean} 要素是否与矩形相交。
     */
  isIntersectRegionWithRect(feature, left, top, right, bottom, tolerance = 1e-6) {
    const ugFeature = geojson2UGGeometry(feature);
    const result = this.module._UGCWasm_Geometrist_isIntersectRegionWithRect(ugFeature, left, top, right, bottom, tolerance);
    return result !== 0;
  }
  /**
     * @function GeometryAnalysis.prototype.isOnSameSide
     * @version 11.2.0
     * @description 判断两点是否在线的同一侧。
     * @param {number} x1 - 点1 X 坐标。
     * @param {number} y1 - 点1 Y 坐标。
     * @param {number} x2 - 点2 X 坐标。
     * @param {number} y2 - 点2 Y 坐标。 
     * @param {number} startX - 线起点 X 坐标。
     * @param {number} startY - 线起点 Y 坐标。
     * @param {number} endX - 线终点 X 坐标。
     * @param {number} endY - 线终点 Y 坐标。
     * @returns {boolean} 是否两点在线的同一侧。
     */
  isOnSameSide(x1, y1, x2, y2, startX, startY, endX, endY) {
    const result = this.module._UGCWasm_Geometrist_IsOnSameSide(x1, y1, x2, y2, startX, startY, endX, endY);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isRight
     * @version 11.2.0
     * @description 判断点是否在线的右侧。
     * @param {number} x - 点 X 坐标。
     * @param {number} y - 点 Y 坐标。
     * @param {number} startX - 线起点 X 坐标。
     * @param {number} startY - 线起点 Y 坐标。
     * @param {number} endX - 线终点 X 坐标。
     * @param {number} endY - 线终点 Y 坐标。
     * @returns {boolean} 点是否在线的右侧。
     */
  isRight(x, y, startX, startY, endX, endY) {
    const result = this.module._UGCWasm_Geometrist_IsRight(x, y, startX, startY, endX, endY);
    return result === 1;
  }

  /**
     * @function GeometryAnalysis.prototype.isLeft
     * @version 11.2.0
     * @description 判断点是否在线的左侧。
     * @param {number} x - 点 X 坐标。
     * @param {number} y - 点 Y 坐标。
     * @param {number} startX - 线起点 X 坐标。
     * @param {number} startY - 线起点 Y 坐标。
     * @param {number} endX - 线终点 X 坐标。
     * @param {number} endY - 线终点 Y 坐标。
     * @returns {boolean} 点是否在线的左侧。
     */
  isLeft(x, y, startX, startY, endX, endY) {
    const result = this.module._UGCWasm_Geometrist_IsLeft(x, y, startX, startY, endX, endY);
    return result === 1;
  }
  /**
   * @function GeometryAnalysis.prototype.computeGeodesicArea
   * @version 11.2.0
   * @description 计算坐标为经纬度的面要素面积。
   * @param {GeoJSONFeature} feature - 面要素, 坐标参考系统为 WGS84 (http://www.opengis.net/def/crs/OGC/1.3/CRS84)。
   * @param {string} [unit='SquareMeter'] - 结果面积单位, 默认值为 SquareMeter，支持的值有:"SquareKiloMeter","SquareFoot","SquareYard","SquareMile","SquareMeter"。
   * @returns {number} 面积大小，单位与设置单位一致。
   */

  computeGeodesicArea(feature, unit = AnalystAreaUnit.SQUAREMETER) {
    if (!featureCoordValid(feature)) {
      throw new Error('coordinates is invalid latlng');
    }
    if (getType(feature) !== 'Polygon') {
      throw new Error("only feature type is Polygon supported");
    }
    const ugFeature = geojson2UGGeometry(feature);
    const prjCoordSys = this.module._UGCWasm_Geometry_NewUGPrjCoordSys(4326);
    let result = this.module._UGCWasm_Geometrist_ComputeGeodesicArea(ugFeature, prjCoordSys);
    if (unit !== AnalystAreaUnit.SQUAREMETER) {
      return result * getSquareMeterPerMapUnit(unit);
    }
    return result;
  }
  /**
   * @function GeometryAnalysis.prototype.smooth
   * @version 11.2.0
   * @description 线要素光滑分析。
   * @param {GeoJSONFeature} feature - 线要素。
   * @param {number} [smoothness=2] - 有效范围为大于等于2，设置为小于2的值会抛出异常。光滑系数越大，线对象节点数越多，也就越光滑。 建议取值范围为[2,10]。
   * @returns {GeoJSONFeature} 光滑处理后的线要素。
   */
  smooth(feature, smoothness = 2) {
    if (getType(feature) !== 'LineString') {
      throw new Error("only feature type is LineString supported");
    }

    const ugFeature = geojson2UGGeometry(feature);
    const result = this.module._UGCWasm_Geometrist_Smooth(ugFeature, smoothness);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  }

  /**
   * @function GeometryAnalysis.prototype.computeGeodesicDistance
   * @version 11.2.0
   * @description 计算测地线长度, 坐标参考系统为 WGS84 (http://www.opengis.net/def/crs/OGC/1.3/CRS84)。
   * @param {Array} xArray - x 坐标数组。
   * @param {Array} yArray - y 坐标数组。
   * @param {number} majorAxis - 测地线所在椭球体的长轴，单位为米。
   * @param {number} flatten - 测地线所在椭球体的扁率。
   * @param {string} [unit='METER'] - 结果长度单位, 默认值为 METER, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT"。
   * @returns {number} 测地线的长度。
   */
  /**
   * @function GeometryAnalysis.prototype.computeGeodesicDistance
   * @version 11.2.0
   * @description 计算测地线长度, 坐标参考系统为 WGS84 (http://www.opengis.net/def/crs/OGC/1.3/CRS84)。
   * @param {Array|FeatureCollection} points - 点坐标数组, 支持的形式为 [[x, y]], [{x, y}], 点要素数组, 也支持 FeatureCollection。
   * @param {number} majorAxis - 测地线所在椭球体的长轴，单位为米。
   * @param {number} flatten - 测地线所在椭球体的扁率。
   * @param {string} [unit='METER'] - 结果长度单位, 默认值为 METER, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT"。
   * @returns {number} 测地线的长度。
   */
  computeGeodesicDistance(xArray, yArray, majorAxis, flatten, unit = Unit.METER) {
    if (!Array.isArray(yArray)) {
      const { xList, yList } = formatCoord(xArray);
      unit = flatten || Unit.METER;
      flatten = majorAxis;
      majorAxis = yArray;
      xArray = xList;
      yArray = yList;
    }
    if (!isValidLatlng([xArray[0], yArray[0]])) {
      throw new Error('coordinates is invalid latlng');
    }
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    const result = this.module._UGCWasm_Geometrist_ComputeGeodesicDistance(pXArray, pYArray, majorAxis, flatten);
    if (unit !== Unit.METER) {
      return result / getMeterPerMapUnit(unit);
    }
    return result;
  }
  /**
   * @function GeometryAnalysis.prototype.computeParallel
   * @version 11.2.0
   * @description 根据距离获取线要素的平行线，线可为折线。
   * @param {GeoJSONFeature} feature - 线要素。
   * @param {number} distance - 平行线距离。
   * @param {string} [featureUnit='DEGREE'] - 线要素距离单位, 默认值为 DEGREE, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT", "DEGREE"。
   * @param {string} [unit='DEGREE'] - 平行线距离单位, 默认值为 DEGREE, 支持的值有: "METER", "KILOMETER", "INCH", "FOOT", "DEGREE"。
   * @returns {GeoJSONFeature} 结果为与线要素相隔传入距离长度的平行线要素。
   */
  computeParallel(feature, distance, featureUnit = Unit.DEGREE, unit = Unit.DEGREE) {
    if (getType(feature) !== 'LineString') {
      throw new Error("only feature type is LineString supported");
    }
    if (unit !== Unit.DEGREE) {
      distance = distance * getMeterPerMapUnit(unit) / getMeterPerMapUnit(featureUnit);
    }
    const ugFeature = geojson2UGGeometry(feature);
    const result = this.module._UGCWasm_Geometrist_ComputeParallel(ugFeature, distance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  }
  /**
   * @function GeometryAnalysis.prototype.computeConvexHullPoints
   * @version 11.2.0
   * @description 点数组的凸闭包计算，即最小外接多边形。
   * @param {Array} xArray - x 坐标数组。
   * @param {Array} yArray - y 坐标数组。
   * @returns {GeoJSONFeature} 最小外接多边形要素。
   */
  /**
   * @function GeometryAnalysis.prototype.computeConvexHullPoints
   * @version 11.2.0
   * @description 点数组的凸闭包计算，即最小外接多边形。
   * @param {Array|FeatureCollection} points - 点坐标数组, 支持的形式为 [[x, y]], [{x, y}], 点要素数组, 也支持 FeatureCollection。
   * @returns {GeoJSONFeature} 最小外接多边形要素。
   */
  computeConvexHullPoints(xArray, yArray) {
    if (!Array.isArray(yArray)) {
      const { xList, yList } = formatCoord(xArray);
      xArray = xList;
      yArray = yList;
    }
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    let pGeoRegionHull = this.module._UGCWasm_Geometrist_ComputeConvexHullPoints(pXArray, pYArray, xArray.length);
    var polyJson = ugGeometry2Geojson(pGeoRegionHull);
    return {
      type: "Feature",
      geometry: polyJson
    };
  }
}

function getType(geojson) {
  if (geojson.type === "Feature" && geojson.geometry !== null) {
    return geojson.geometry.type;
  }
  return geojson.type;
}