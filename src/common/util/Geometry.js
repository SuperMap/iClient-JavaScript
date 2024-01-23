import Module from '../../../libs/UGCWasmAll';
import { geojson2UGGeometry, geojsonCoordsToPoint2Ds, ugGeometry2Geojson, getJSArrayFromUGDoubleArray, geojsonCoords2UGDoubleArray } from '../wasm/util';

export const GeometryUtil = {
  buffer(geojson, radius) {
    const ugcGeojson = geojson2UGGeometry(geojson);
    const buffer = Module._UGCWasm_Geometrist_Buffer(ugcGeojson, radius);
    const geometry = ugGeometry2Geojson(buffer);
    return {
      type: "Feature",
      geometry
    }
  },
  intersect(feature1, feature2, tolerance = 1e-6) {
    if (this.hasOverlap(feature1, feature2, tolerance)) {
      const ugFeature1 = geojson2UGGeometry(feature1);
      const ugFeature2 = geojson2UGGeometry(feature2);
      const pOverlapRegion = Module._UGCWasm_Geometrist_Intersect(ugFeature1, ugFeature2, tolerance);
      if (pOverlapRegion !== 0) {
        return {
          type: "Feature",
          geometry: ugGeometry2Geojson(pOverlapRegion)
        };
      }
    }
  },
  computeConvexHull(points, size) {
    const ugPoints = geojsonCoordsToPoint2Ds(points);
    var result = Module._UGCWasm_Geometrist_ComputeConvexHull(ugPoints, size);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    }
  },
  isIdentical(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_IsIdentical(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  union(geojson1, geojson2) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Union(ugFeature1, ugFeature2);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  union2(geojson1, geojson2, tolerance) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Union2(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  isDisjointed(geojson1, geojson2, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_IsDisjointed(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  hasIntersection(geojson1, geojson2, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_HasIntersection(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  hasAreaIntersection(geojson1, geojson2, tolerance) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_HasAreaIntersection(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  hasTouch(geojson1, geojson2, tolerance = 1e-6) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_HasTouch(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  hasCross(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_HasCross(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  isWithin(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_IsWithin(ugFeature1, ugFeature2, tolerance);
    return result === 1;
  },
  erase(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Erase(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  hasOverlap(feature1, feature2, tolerance) {
    const ugFeature1 = geojson2UGGeometry(feature1);
    const ugFeature2 = geojson2UGGeometry(feature2);
    return Module._UGCWasm_Geometrist_HasOverlap(ugFeature1, ugFeature2, tolerance);
  },
  update(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Update(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  identity(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Identity(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  xor(geojson1, geojson2, tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_XOR(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  clip(geojson1, geojson2,  tolerance = 1e-10) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Clip(ugFeature1, ugFeature2, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  resample(geojson, tolerance) {
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_Resample(ugFeature, tolerance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  distance(geojson1, geojson2) {
    const ugFeature1 = geojson2UGGeometry(geojson1);
    const ugFeature2 = geojson2UGGeometry(geojson2);
    const result = Module._UGCWasm_Geometrist_Distance(ugFeature1, ugFeature2);
    return result;
  },
  // 无效
  // closestPoint(geojson1, geojson2) {
  //   const ugFeature1 = geojson2UGGeometry(geojson1);
  //   const ugFeature2 = geojson2UGGeometry(geojson2);
  //   const result = Module._UGCWasm_Geometrist_ClosestPoint(ugFeature1, ugFeature2, 1e-10);
  //   return {
  //     type: "Feature",
  //     geometry: ugGeometry2Geojson(result)
  //   };
  // },
  isParallel(x1, y1, x2, y2, x3, y3, x4, y4) {
    const result = Module._UGCWasm_Geometrist_IsParallel(x1, y1, x2, y2, x3, y3, x4, y4);
    return result === 1;
  },
  isPerpendicular(x1, y1, x2, y2, x3, y3, x4, y4) {
    const result = Module._UGCWasm_Geometrist_IsPerpendicular(x1, y1, x2, y2, x3, y3, x4, y4);
    return result === 1;
  },
  computePerpendicularPosition(x1, y1, x2, y2, x3, y3) {
    let values = Module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    Module._UGCWasm_Geometrist_ComputePerpendicularPosition(x1, y1, x2, y2, x3, y3, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return values;
  },
  isPointOnLine(x1, y1, x2, y2, x3, y3, extended) {
    const result = Module._UGCWasm_Geometrist_IsPointOnLine(x1, y1, x2, y2, x3, y3, extended);
    return result === 1;
  },
  isProjectOnLineSegment(px, py, spx, spy, epx, epy) {
    const result = Module._UGCWasm_Geometrist_IsProjectOnLineSegment(px, py, spx, spy, epx, epy);
    return result === 1;
  },
  distanceToLineSegment(px, py, spx, spy, epx, epy) {
    return Module._UGCWasm_Geometrist_DistanceToLineSegment(px, py, spx, spy, epx, epy);
  },
  nearestPointToVertex(px, py, geojson) {
    let values = Module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_NearestPointToVertex(px, py, ugFeature, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return { find: result === 1, values };
  },
  computeConcaveHullPoints(xArray, yArray, angle) {
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    let pGeoRegionHull = Module._UGCWasm_Geometrist_ComputeConcaveHullPoints(pXArray, pYArray, xArray.length, angle);
    var polyJson = ugGeometry2Geojson(pGeoRegionHull);
    return {
      type: "Feature",
      geometry: polyJson
    };
  },
  isSegmentIntersect(x1, y1, x2, y2, x3, y3, x4, y4) {
    const result = Module._UGCWasm_Geometrist_IsSegmentIntersect(x1, y1, x2, y2, x3, y3, x4, y4);
    return result === 1;
  },
  isIntersectRegionWithRect(geojson, left, top, right, bottom) {
    const ugFeature = geojson2UGGeometry(geojson);
    return Module._UGCWasm_Geometrist_isIntersectRegionWithRect(ugFeature, left, top, right, bottom);
  },
  // linearFitting(xArray, yArray, degree) {
  //   let pXArray = geojsonCoords2UGDoubleArray(xArray);
  //   let pYArray = geojsonCoords2UGDoubleArray(yArray);
  //   let pGeoRegionHull = Module._UGCWasm_Geometrist_LinearFitting(pXArray, pYArray, xArray.length, degree);
  //   const features = [];
  //   var polyJson = ugGeometry2Geojson(pGeoRegionHull);
  //   const feature = {
  //     type: "Feature",
  //     geometry: polyJson
  //   }
  //   features.push(feature);
  //   return {
  //     "type": "FeatureCollection",
  //     "features": features
  //   }
  // },
  isOnSameSide(px1, py1, px2, py2, spx, spy, epx, epy) {
    const result = Module._UGCWasm_Geometrist_IsOnSameSide(px1, py1, px2, py2, spx, spy, epx, epy);
    return result === 1;
  },
  isRight(px, py, spx, spy, epx, epy) {
    const result = Module._UGCWasm_Geometrist_IsRight(px, py, spx, spy, epx, epy);
    return result === 1;
  },
  isLeft(px, py, spx, spy, epx, epy) {
    const result = Module._UGCWasm_Geometrist_IsLeft(px, py, spx, spy, epx, epy);
    return result === 1;
  },
  // computeGeodesicArea(geojson, epsgCode) {
  //   const ugFeature = geojson2UGGeometry(geojson);
  //   const prjCoordSys = Module._UGCWasm_Geometry_NewUGPrjCoordSys(epsgCode);
  //   return Module._UGCWasm_Geometrist_ComputeGeodesicArea(ugFeature, prjCoordSys);
  // },
  computeGeodesicArea(geojson, prjCoordSys) {
    const ugFeature = geojson2UGGeometry(geojson);
    return Module._UGCWasm_Geometrist_ComputeGeodesicArea(ugFeature, prjCoordSys);
  },
  hasHollow(geojson) {
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_HasHollow(ugFeature);
    return result === 1;
  },
  clipRect(geojson, left, top, right, bottom) {
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_ClipRect(ugFeature, left, top, right, bottom);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  smooth(geojson, smoothness = 2) {
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_Smooth(ugFeature, smoothness);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  computeGeodesicDistance(xArray, yArray, majorAxis, flatten) {
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    return Module._UGCWasm_Geometrist_ComputeGeodesicDistance(pXArray, pYArray, majorAxis, flatten);
  },
  computeParallel(geojson, distance) {
    const ugFeature = geojson2UGGeometry(geojson);
    const result = Module._UGCWasm_Geometrist_ComputeParallel(ugFeature, distance);
    return {
      type: "Feature",
      geometry: ugGeometry2Geojson(result)
    };
  },
  computeConvexHullPoints(xArray, yArray) {
    let pXArray = geojsonCoords2UGDoubleArray(xArray);
    let pYArray = geojsonCoords2UGDoubleArray(yArray);
    let pGeoRegionHull = Module._UGCWasm_Geometrist_ComputeConvexHullPoints(pXArray, pYArray, xArray.length);
    var polyJson = ugGeometry2Geojson(pGeoRegionHull);
    return {
      type: "Feature",
      geometry: polyJson
    };
  },
  intersectLine(x1, y1, x2, y2, x3, y3, x4, y4, extended) {
    let values = Module._UGCWasm_Helper_CreateDoubleArray(0, 2);
    const result = Module._UGCWasm_Geometrist_IntersectLine(x1, y1, x2, y2, x3, y3, x4, y4, extended, values);
    const coords = getJSArrayFromUGDoubleArray(values);
    values = coords;
    return { intersect: result === 1, values };
  }
}
