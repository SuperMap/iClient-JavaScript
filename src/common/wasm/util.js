export function geojsonCoordsToPoint2Ds(coords) {
  if (!coords) {
    throw new Error('No GeoJSON coords provided');
  }

  if (!coords || coords.length === 0) {
    return null;
  }
  const length = coords.length;
  const dim = 2; // coords[0].length
  const coordArr = new Float64Array(coords.flat());
  const coordPtr = window.Module._malloc(length * dim * 8);
  window.Module.HEAPF64.set(coordArr, coordPtr / 8);
  const seqPtr = window.Module._UGCWasm_Geometry_CreatePoint2DsFromBuffer(coordPtr, length);
  window.Module._free(coordPtr);
  return seqPtr;
}

export function geojsonCoords2UGDoubleArray(coords) {
  if (!coords) {
    throw new Error('No GeoJSON coords provided')
  }

  if (!coords || coords.length === 0) {
    return null
  }
  const length = coords.length
  const coordArr = new Float64Array(coords)
  const coordPtr = window.Module._malloc(length * 8)
  window.Module.HEAPF64.set(coordArr, coordPtr / 8)
  const pDoubleArray = window.Module._UGCWasm_Helper_CreateDoubleArray(coordPtr, length)
  window.Module._free(coordPtr)

  return pDoubleArray
}

export function getJSArrayFromUGDoubleArray(pDoubleArray) {
  // get length of doublearray
  var length = window.Module._UGCWasm_Helper_GetDoubleArrayLength(pDoubleArray);

  // allocate memory 一个double是8个字节
  const pBuffer = window.Module._malloc(length * 8);

  // copy doublearray to buffer
  window.Module._UGCWasm_Helper_GetBufferFromDoubleArray(pDoubleArray, pBuffer);

  // get double in buffer to Float64Array
  const view = new Float64Array(window.Module.HEAPF64.buffer, pBuffer, length);
  const coords = [];
  for (let i = 0; i < length; i++) {
    coords.push(view[i]);
  }

  // free buffer memory
  window.Module._free(pBuffer);

  return coords;
}

/**
 * @private
 * @description Convert UGC geometry pointer to GeoJSON object.
 * @name ugGeometry2Geojson
 * @kind function
 * @param {number} pUGGeo - The UGC geometry pointer.
 * @returns {GeoJSON} A GeoJSON object.
 * @example
 * import ugGeometry2Geojson from 'UGGeometry2GeoJson.js'
 * const geos = await initGeosJs()
 * const reader = geos.GEOSWKTReader_create()
 * const wkt = 'POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))'
 * const geomPtr = geos.GEOSWKTReader_read(reader, wkt)
 * const json = geosGeomToGeojson(geomPtr, geos)
 * console.log(JSON.stringify(json))
 * // => {"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}
 */
export function ugGeometry2Geojson(pUGGeo) {
  //   if (!pUGGeo) {
  //     throw new Error("No UGC geometry pointer provided");
  //   }
  if (!pUGGeo) {
    return null;
  }
  const geomType = window.Module._UGCWasm_Geometry_GetType(pUGGeo);
  switch (geomType) {
    case 1: {
      // UGGeoPoint
      const point2d = [];
      var x = window.Module._UGCWasm_GeoPoint_GetX(pUGGeo);
      var y = window.Module._UGCWasm_GeoPoint_GetY(pUGGeo);
      point2d.push(x, y)

      // create geojson point
      const pointJson = {
        type: "Point",
        coordinates: point2d
      };

      return pointJson
    }
    case 3: {
      // UGGeoLine
      const outlines = [];
      // get part count
      const partCount = window.Module._UGCWasm_GeoLine_GetPartCount(pUGGeo);
      for (let j = 0; j < partCount; j++) {
        // get part j point count
        var count = window.Module._UGCWasm_GeoLine_GetPartPointCount(pUGGeo, j);
        // 一个double是8个字节，而一个point2D是两个double，所以需要申请 点个数 * 2 * 8
        const pBuffer = window.Module._malloc(count * 2 * 8);

        // get part j points
        window.Module._UGCWasm_GeoLine_GetPart2(pUGGeo, pBuffer, j);

        // Float64Array to line part coordinates
        const view = new Float64Array(window.Module.HEAPF64.buffer, pBuffer, count * 2);
        const coords = [];
        for (let i = 0; i < count * 2; i = i + 2) {
          coords.push([view[i], view[i + 1]]);
        }
        window.Module._free(pBuffer);

        outlines.push(coords);
      }

      // create geojson linestring
      const linestringJson = {
        type: "LineString",
        coordinates: outlines[0]
      };

      return linestringJson
    }
    case 5: {
      // UGGeoRegion
      const outlines = [];
      // get part count
      const partCount = window.Module._UGCWasm_GeoRegion_GetPartCount(pUGGeo);
      for (let j = 0; j < partCount; j++) {
        // get part j point count
        const count = window.Module._UGCWasm_GeoRegion_GetPartPointCount(pUGGeo, j);
        // 一个double是8个字节，而一个point2D是两个double，所以需要申请 点个数 * 2 * 8
        const pBuffer = window.Module._malloc(count * 2 * 8);

        // get part j points
        window.Module._UGCWasm_GeoRegion_GetPart2(pUGGeo, pBuffer, j);

        // Float64Array to line part coordinates
        const view = new Float64Array(window.Module.HEAPF64.buffer, pBuffer, count * 2);
        const coords = [];
        for (let i = 0; i < count * 2; i = i + 2) {
          coords.push([view[i], view[i + 1]]);
        }
        window.Module._free(pBuffer);

        outlines.push(coords);
      }

      // create geojson polygon
      const polyJson = {
        type: "Polygon",
        coordinates: outlines
      };

      return polyJson
    }
    default:
      return null;
  }
}

/**
 * @private
 * @description 转换 GeoJSON 对象到 GEOS geometry pointer。
 * @name geojsonToGeosGeom
 * @param {GeoJSON} geojson - The GeoJSON object.
 * @returns {number} A pointer to GEOS geometry
 */
export function geojson2UGGeometry(geojson) {
  if (!geojson) {
    throw new Error('No GeoJSON object provided')
  }

  // assume only 2d (x, y) geometries
  switch (geojson.type) {
    case 'Feature':
      return geojson2UGGeometry(geojson.geometry)
    case 'FeatureCollection':
      if (geojson.features.length === 0) {
        return null
      } else {
        return geojson2UGGeometry(geojson.features[0].geometry)
      }
    // case 'GeometryCollection':
    //   if (geojson.geometries.length === 0) {
    //     return geos.GEOSGeom_createEmptyCollection(7) // geos.GEOS_GEOMETRYCOLLECTION
    //   } else {
    //     const geoms = []
    //     // iterate over each feature
    //     geojson.geometries.forEach((feature) => {
    //       geoms.push(geojsonToGeosGeom(feature, geos))
    //     })
    //     const geomsPtr = geos.window.Module._malloc(geoms.length * 4)
    //     const geomsArr = new Uint32Array(geoms)
    //     geos.window.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
    //     const multiGeomsPtr = geos.GEOSGeom_createCollection(
    //       7, // geos.GEOS_GEOMETRYCOLLECTION
    //       geomsPtr,
    //       geoms.length
    //     )
    //     geos.window.Module._free(geomsPtr)
    //     return multiGeomsPtr
    //   }
    case 'Point':
      if (geojson.coordinates.length === 0) {
        return window.Module._UGCWasm_GeoPoint_New()
      } else {
        return window.Module._UGCWasm_GeoPoint_New2(
          geojson.coordinates[0],
          geojson.coordinates[1]
        )
      }
    case 'LineString':
      if (geojson.coordinates.length === 0) {
        return window.Module._UGCWasm_GeoLine_New()
      } else {
        const pGeoLine = window.Module._UGCWasm_GeoLine_New()
        const pPoint2Ds = geojsonCoordsToPoint2Ds(geojson.coordinates)
        window.Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Ds, geojson.coordinates.length)

        return pGeoLine
      }
    case 'Polygon':
      if (geojson.coordinates.length === 0) {
        return window.Module._UGCWasm_GeoRegion_New()
      } else {
        const pGeoRegion = window.Module._UGCWasm_GeoRegion_New()

        const pPoint2Ds0 = geojsonCoordsToPoint2Ds(geojson.coordinates[0])
        window.Module._UGCWasm_GeoRegion_AddPart2(pGeoRegion, pPoint2Ds0, geojson.coordinates[0].length)

        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const pPoint2Dsi = geojsonCoordsToPoint2Ds(geojson.coordinates[i])
            window.Module._UGCWasm_GeoRegion_AddPart2(pGeoRegion, pPoint2Dsi, geojson.coordinates[i].length)
          }
        }

        return pGeoRegion
      }
    // case 'MultiPoint':
    //   if (geojson.coordinates.length === 0) {
    //     return geos.GEOSGeom_createEmptyCollection(4) // geos.GEOS_MULTIPOINT
    //   } else {
    //     const points = []
    //     for (let i = 0; i < geojson.coordinates.length; i++) {
    //       points.push(
    //         geos.GEOSGeom_createPointFromXY(
    //           geojson.coordinates[i][0],
    //           geojson.coordinates[i][1]
    //         )
    //       )
    //     }
    //     const pointsPtr = geos.window.Module._malloc(points.length * 4)
    //     const pointsArr = new Uint32Array(points)
    //     geos.window.Module.HEAPU32.set(pointsArr, pointsPtr / 4)
    //     const multiPointPtr = geos.GEOSGeom_createCollection(
    //       4, // geos.GEOS_MULTIPOINT
    //       pointsPtr,
    //       points.length
    //     )
    //     geos.window.Module._free(pointsPtr)
    //     return multiPointPtr
    //   }
    case 'MultiLineString':
      if (geojson.coordinates.length === 0) {
        return window.Module._UGCWasm_GeoLine_New()
      } else {
        const pGeoLine = window.Module._UGCWasm_GeoLine_New()

        const pPoint2Ds0 = geojsonCoordsToPoint2Ds(geojson.coordinates[0])
        window.Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Ds0, geojson.coordinates[0].length)

        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const pPoint2Dsi = geojsonCoordsToPoint2Ds(geojson.coordinates[i])
            window.Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Dsi, geojson.coordinates[i].length)
          }
        }

        return pGeoLine
      }
    // case 'MultiPolygon':
    //   if (geojson.coordinates.length === 0) {
    //     return geos.GEOSGeom_createEmptyCollection(6) // geos.GEOS_MULTIPOLYGON
    //   } else {
    //     const polygons = []
    //     for (let i = 0; i < geojson.coordinates.length; i++) {
    //       const shellSeq = geojsonCoordsToGeosCoordSeq(
    //         geojson.coordinates[i][0]
    //       )
    //       const shell = geos.GEOSGeom_createLinearRing(shellSeq)
    //       const holes = []
    //       if (geojson.coordinates[i].length > 1) {
    //         for (let j = 1; j < geojson.coordinates[i].length; j++) {
    //           const holeSeq = geojsonCoordsToGeosCoordSeq(
    //             geojson.coordinates[i][j]
    //           )
    //           holes.push(geos.GEOSGeom_createLinearRing(holeSeq))
    //         }
    //       }
    //       let holesPtr = null
    //       if (holes.length > 0) {
    //         const holesArr = new Uint32Array(holes)
    //         holesPtr = geos.window.Module._malloc(holes.length * 4)
    //         geos.window.Module.HEAPU32.set(holesArr, holesPtr / 4)
    //       }
    //       const polyPtr = geos.GEOSGeom_createPolygon(
    //         shell,
    //         holesPtr,
    //         holes.length
    //       )
    //       if (holes.length > 0) {
    //         geos.window.Module._free(holesPtr)
    //       }
    //       polygons.push(polyPtr)
    //     }
    //     const polygonsPtr = geos.window.Module._malloc(polygons.length * 4)
    //     const polygonsArr = new Uint32Array(polygons)
    //     geos.window.Module.HEAPU32.set(polygonsArr, polygonsPtr / 4)
    //     const multiPolyPtr = geos.GEOSGeom_createCollection(
    //       6, // geos.GEOS_MULTIPOLYGON
    //       polygonsPtr,
    //       polygons.length
    //     )
    //     geos.window.Module._free(polygonsPtr)
    //     return multiPolyPtr
    //   }
    default:
      throw new Error('Unsupported GeoJSON type: ' + geojson.type + '. Are you sure this is valid GeoJSON?')
  }
}

export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]';
}

export function isValidLatlng(coord) {
  return Array.isArray(coord) && coord.length === 2 && coord[0] >= -180 && coord[0] <= 180 && coord[1] >= -90 && coord[1] <= 90;
}

export function featureCoordValid(feature) {
  if (feature && feature.geometry && feature.geometry.type) {
    const type = feature.geometry.type;
    if (type === 'Point') {
      return isValidLatlng(feature.geometry.coordinates);
    } else if (type === 'LineString') {
      return isValidLatlng(feature.geometry.coordinates[0]);
    } else if (type === 'Polygon' || type === 'MultiLineString') {
      return isValidLatlng(feature.geometry.coordinates[0][0]);
    }
  }
}

export function formatCoord(pointList) {
  let xList = [];
  let yList = [];
  if (isObject(pointList) && pointList.type === 'FeatureCollection') {
    pointList.features.forEach((feature) => {
      const coord = feature.geometry.coordinates;
      xList.push(coord[0]);
      yList.push(coord[1])
    });
  } else if (Array.isArray(pointList)) {
    pointList.forEach((item) => {
      if (item.type === 'Feature') {
        const coord = item.geometry.coordinates;
        xList.push(coord[0]);
        yList.push(coord[1])
      } else if (Array.isArray(item)) {
        xList.push(item[0]);
        yList.push(item[1])
      } else if (isObject(item)) {
        xList.push(item.x);
        yList.push(item.y)
      }
    });
  }
  return {
    xList,
    yList
  }
}