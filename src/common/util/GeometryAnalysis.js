import { geojson2UGGeometry, geojsonCoordsToPoint2Ds, ugGeometry2Geojson, getJSArrayFromUGDoubleArray, geojsonCoords2UGDoubleArray } from '../wasm/util';
import { Events } from '../commontypes/Events';

/**
 * @name GeometryAnalysis
 * @namespace
 * @category BaseTypes Util
 * @param {Object} [Module] - 几何分析模块。
 * @description 几何分析。
 */
export class GeometryAnalysis extends Events {
  constructor(Module) {
    super();
    if (Module) {
      window.Module = Module;
    }
    this.module = window.Module;
    this.addEventType('loaded');
    if (this.module.calledRun) {
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
   * @param {GeoJSONFeature} feature - geojson 要素。
   * @param {string} radius - 半径。
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
   * @returns {GeoJSONFeature} 结果要素。
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
   * @description 几何对象相等分析。
   * @param {GeoJSONFeature} feature - geojson 要素。
   * @param {GeoJSONFeature} compareFeature - geojson 对比要素。
   * @param {number} [tolerance=1e-6] - 容限。
   * @returns {boolean} 要素是否完全相等。
   */
  isIdentical(feature, compareFeature, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(feature);
    const ugFeature2 = geojson2UGGeometry(compareFeature);
    const result = this.module._UGCWasm_Geometrist_IsIdentical(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.hasTouch
     * @version 11.2.0
     * @description 几何对象边界是否接触分析。
     * @param {GeoJSONFeature} feature - geojson 要素。
     * @param {GeoJSONFeature} compareFeature - geojson 对比要素。
     * @param {number} [tolerance=1e-6] - 容限。
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
     * @param {GeoJSONFeature} feature - geojson 要素。
     * @param {number} [tolerance=1e-6] - 容限。
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
    * @param {string} x1 - 第一条线的起点X。
    * @param {string} y1 - 第一条线的起点Y。
    * @param {string} x2 - 第一条线的终点X。
    * @param {Object} y2 - 第一条线的终点Y。
    * @param {string} x3 - 第二条线的起点X。
    * @param {string} y3 - 第二条线的起点Y。
    * @param {string} x4 - 第二条线的终点X。
    * @param {Object} y4 - 第二条线的终点Y。
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
   * @param {string} x1 - 点坐标 X。
   * @param {string} y1 - 点坐标 Y。
   * @param {string} x2 - 第一条线的起点X。
   * @param {Object} y2 - 第一条线的起点Y。
   * @param {string} x3 - 第一条线的终点X。
   * @param {string} y3 - 第一条线的终点Y。
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
     * @param {string} x1 - 点坐标 X。
     * @param {string} y1 - 点坐标 Y。
     * @param {string} x2 - 第一条线的起点X。
     * @param {Object} y2 - 第一条线的起点Y。
     * @param {string} x3 - 第一条线的终点X。
     * @param {string} y3 - 第一条线的终点Y。
     * @param {boolean} extended - 是否将线段进行延长计算。
     * @returns {boolean} 点是否在已知线段上。
     */
  isPointOnLine(x1, y1, x2, y2, x3, y3, extended) {
    const result = this.module._UGCWasm_Geometrist_IsPointOnLine(x1, y1, x2, y2, x3, y3, extended);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isProjectOnLineSegment
     * @version 11.2.0
     * @description 判断点到线段的垂足是否在该线段上。
     * @param {number} px- 点 X 坐标。
     * @param {number} px - 点 Y 坐标。
     * @param {number} spx - 线起点 X 坐标。
     * @param {Object} spy - 线起点 Y 坐标。
     * @param {string} epx - 线终点 X 坐标。
     * @param {Object} epy - 线终点 Y 坐标。
     * @returns {boolean} 点到线段的垂足是否在该线段上。
     */
  isProjectOnLineSegment(px, py, spx, spy, epx, epy) {
    const result = this.module._UGCWasm_Geometrist_IsProjectOnLineSegment(px, py, spx, spy, epx, epy);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.distanceToLineSegment
     * @version 11.2.0
     * @description 计算点到线段的距离。
     * @param {number} px- 点 X 坐标。
     * @param {number} px - 点 Y 坐标。
     * @param {number} spx - 线起点 X 坐标。
     * @param {Object} spy - 线起点 Y 坐标。
     * @param {string} epx - 线终点 X 坐标。
     * @param {Object} epy - 线终点 Y 坐标。
     * @returns {number} 点到线段的距离。如果点到线段的垂足不在线段上，则返回点到线段较近的端点的距离。。
     */
  distanceToLineSegment(px, py, spx, spy, epx, epy) {
    return this.module._UGCWasm_Geometrist_DistanceToLineSegment(px, py, spx, spy, epx, epy);
  }
  /**
   * @function GeometryAnalysis.prototype.nearestPointToVertex
   * @version 11.2.0
   * @description 计算线到点的最近距离点。
   * @param {number} px - 点 X 坐标。
   * @param {number} py - 点 Y 坐标。
   * @param {string} lineFeature - geojson 线要素。
   * @returns {Array} 线到点最近点的坐标数组。
   */
  nearestPointToVertex(px, py, lineFeature) {
    let values = this.module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    const ugFeature = geojson2UGGeometry(lineFeature);
    this.module._UGCWasm_Geometrist_NearestPointToVertex(px, py, ugFeature, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return values;
  }
  /**
     * @function GeometryAnalysis.prototype.computeConcaveHullPoints
     * @version 11.2.0
     * @description 点数组凹闭包计算。
     * @param {Array} xArray - x 坐标数组。
     * @param {Array} yArray - y 坐标数组。
     * @param {string} angle - 	凹包内最小角度。
     * @returns {GeoJSONFeature} 结果要素。
     */
  computeConcaveHullPoints(xArray, yArray, angle) {
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
     * @param {string} x1 - 第一条线的起点X。
     * @param {string} y1 - 第一条线的起点Y。
     * @param {string} x2 - 第一条线的终点X。
     * @param {Object} y2 - 第一条线的终点Y。
     * @param {string} x3 - 第二条线的起点X。
     * @param {string} y3 - 第二条线的起点Y。
     * @param {string} x4 - 第二条线的终点X。
     * @param {Object} y4 - 第二条线的终点Y。
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
     * @param {string} feature - geojson 要素。
     * @param {string} url - 请求地址。
     * @param {string} params - 请求参数。
     * @param {Object} options - 请求的配置属性。
     * @returns {boolean} 要素是否与矩形相交。
     */
  isIntersectRegionWithRect(feature, left, top, right, bottom, tolerance = 1e-6) {
    const ugFeature = geojson2UGGeometry(feature);
    const result = this.module._UGCWasm_Geometrist_isIntersectRegionWithRect(ugFeature, left, top, right, bottom, tolerance);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isOnSameSide
     * @version 11.2.0
     * @description 判断两点是否在线的同一侧。
     * @param {number} px1- 点1 X 坐标。
     * @param {number} px2 - 点1 Y 坐标。
     * @param {number} px1- 点2 X 坐标。
     * @param {number} px2 - 点2 Y 坐标。 
     * @param {number} spx - 线起点 X 坐标。
     * @param {Object} spy - 线起点 Y 坐标。
     * @param {string} epx - 线终点 X 坐标。
     * @param {Object} epy - 线终点 Y 坐标。
     * @returns {boolean} 是否两点在线的同一侧。
     */
  isOnSameSide(px1, py1, px2, py2, spx, spy, epx, epy) {
    const result = this.module._UGCWasm_Geometrist_IsOnSameSide(px1, py1, px2, py2, spx, spy, epx, epy);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isRight
     * @version 11.2.0
     * @description 判断点是否在线的右侧。
     * @param {number} px- 点 X 坐标。
     * @param {number} px - 点 Y 坐标。
     * @param {number} spx - 线起点 X 坐标。
     * @param {Object} spy - 线起点 Y 坐标。
     * @param {string} epx - 线终点 X 坐标。
     * @param {Object} epy - 线终点 Y 坐标。
     * @returns {boolean} 点是否在线的右侧。
     */
  isRight(px, py, spx, spy, epx, epy) {
    const result = this.module._UGCWasm_Geometrist_IsRight(px, py, spx, spy, epx, epy);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.isLeft
     * @version 11.2.0
     * @description 判断点是否在线的左侧。
     * @param {number} px- 点 X 坐标。
     * @param {number} px - 点 Y 坐标。
     * @param {number} spx - 线起点 X 坐标。
     * @param {Object} spy - 线起点 Y 坐标。
     * @param {string} epx - 线终点 X 坐标。
     * @param {Object} epy - 线终点 Y 坐标。
     * @returns {boolean} 点是否在线的左侧。
     */
  isLeft(px, py, spx, spy, epx, epy) {
    const result = this.module._UGCWasm_Geometrist_IsLeft(px, py, spx, spy, epx, epy);
    return result === 1;
  }
  /**
     * @function GeometryAnalysis.prototype.computeGeodesicArea
     * @version 11.2.0
     * @description 计算经纬度面积。
     * @param {GeoJSONFeature} feature - geojson 面要素。
     * @returns {number} 经纬度面积。
     */
  computeGeodesicArea(feature) {
    const ugFeature = geojson2UGGeometry(feature);
    const prjCoordSys = this.module._UGCWasm_Geometry_NewUGPrjCoordSys(4326);
    return this.module._UGCWasm_Geometrist_ComputeGeodesicArea(ugFeature, prjCoordSys);
  }
  /**
   * @function GeometryAnalysis.prototype.smooth
   * @version 11.2.0
   * @description 线要素光滑分析。
   * @param {GeoJSONFeature} feature - geojson 要素。
   * @param {string} [smoothness=2] - 光滑系数。
   * @returns {GeoJSONFeature} 结果要素。
   */
  smooth(feature, smoothness = 2) {
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
   * @description 计算测地线长度。
   * @param {Array} xArray - x 坐标数组。
   * @param {Array} yArray - y 坐标数组。
   * @param {number} majorAxis - 测地线所在椭球体的长轴。
   * @param {number} flatten - 测地线所在椭球体的扁率。
   * @returns {number} 测地线的长度。
   */
  computeGeodesicDistance(xArray, yArray, majorAxis, flatten) {
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    return this.module._UGCWasm_Geometrist_ComputeGeodesicDistance(pXArray, pYArray, majorAxis, flatten);
  }
  /**
   * @function GeometryAnalysis.prototype.computeParallel
   * @version 11.2.0
   * @description 根据距离获取线要素的平行线。
   * @param {GeoJSONFeature} feature - geojson 要素。
   * @param {number} distance - 平行线距离。
   * @returns {GeoJSONFeature} 结果要素。
   */
  computeParallel(feature, distance) {
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
   * @returns {GeoJSONFeature} 结果要素。
   */
  computeConvexHullPoints(xArray, yArray) {
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
