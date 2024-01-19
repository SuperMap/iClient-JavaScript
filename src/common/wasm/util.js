import Module from '../../../libs/UGCWasmAll';

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
  const coordPtr = Module._malloc(length * dim * 8);
  Module.HEAPF64.set(coordArr, coordPtr / 8);
  const seqPtr = Module._UGCWasm_Geometry_CreatePoint2DsFromBuffer(coordPtr, length);
  Module._free(coordPtr);
  return seqPtr;
}

export function geojsonCoords2UGDoubleArray (coords) {
  if (!coords) {
    throw new Error('No GeoJSON coords provided')
  }

  if (!coords || coords.length === 0) {
    return null
  }
  const length = coords.length
  const coordArr = new Float64Array(coords)
  const coordPtr = Module._malloc(length * 8)
  Module.HEAPF64.set(coordArr, coordPtr / 8)
  const pDoubleArray = Module._UGCWasm_Helper_CreateDoubleArray(coordPtr, length)
  Module._free(coordPtr)

  return pDoubleArray
}

/**
 * 
 * @param {*} pDoubleArray 
 * @returns 
 */
export function getJSArrayFromUGDoubleArray(pDoubleArray){
  // get length of doublearray
  var length = Module._UGCWasm_Helper_GetDoubleArrayLength(pDoubleArray);
        
  // allocate memory 一个double是8个字节
  const pBuffer = Module._malloc(length * 8);

  // copy doublearray to buffer
  Module._UGCWasm_Helper_GetBufferFromDoubleArray(pDoubleArray, pBuffer);

  // get double in buffer to Float64Array
  const view = new Float64Array(Module.HEAPF64.buffer, pBuffer, length);
  const coords = [];
  for (let i = 0; i < length ; i++) {
    coords.push(view[i]);
  }

  // free buffer memory
  Module._free(pBuffer);

  return coords;
}

/**
 * Convert UGC geometry pointer to GeoJSON object.
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
  const geomType = Module._UGCWasm_Geometry_GetType(pUGGeo);
  switch (geomType) {
    case 1: {
      // UGGeoPoint
      const point2d = [];
      var x = Module._UGCWasm_GeoPoint_GetX(pUGGeo);
      var y = Module._UGCWasm_GeoPoint_GetY(pUGGeo);
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
      var partCount = Module._UGCWasm_GeoLine_GetPartCount(pUGGeo);
      for (let j = 0; j < partCount; j++) {
        // get part j point count
        var count = Module._UGCWasm_GeoLine_GetPartPointCount(pUGGeo, j);
        // 一个double是8个字节，而一个point2D是两个double，所以需要申请 点个数 * 2 * 8
        const pBuffer = Module._malloc(count * 2 * 8);

        // get part j points
        Module._UGCWasm_GeoLine_GetPart2(pUGGeo, pBuffer, j);

        // Float64Array to line part coordinates
        const view = new Float64Array(Module.HEAPF64.buffer, pBuffer, count * 2);
        const coords = [];
        for (let i = 0; i < count * 2; i = i + 2) {
          coords.push([view[i], view[i + 1]]);
        }
        Module._free(pBuffer);

        outlines.push(coords);
      }
      
      // create geojson linestring
      const linestringJson = {
        type: "LineString",
        coordinates: outlines
      };

      return linestringJson
    }
    case 5: {
      // UGGeoRegion
      const outlines = [];
      // get part count
      var partCount = Module._UGCWasm_GeoRegion_GetPartCount(pUGGeo);
      for (let j = 0; j < partCount; j++) {
        // get part j point count
        var count = Module._UGCWasm_GeoRegion_GetPartPointCount(pUGGeo, j);
        // 一个double是8个字节，而一个point2D是两个double，所以需要申请 点个数 * 2 * 8
        const pBuffer = Module._malloc(count * 2 * 8);

        // get part j points
        Module._UGCWasm_GeoRegion_GetPart2(pUGGeo, pBuffer, j);

        // Float64Array to line part coordinates
        const view = new Float64Array(Module.HEAPF64.buffer, pBuffer, count * 2);
        const coords = [];
        for (let i = 0; i < count * 2; i = i + 2) {
          coords.push([view[i], view[i + 1]]);
        }
        Module._free(pBuffer);

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
 * Convert GeoJSON object to GEOS geometry pointer.
 * @name geojsonToGeosGeom
 * @kind function
 * @param {GeoJSON} geojson - The GeoJSON object.
 * @param {geos} geos - The GEOS module object.
 * @returns {number} A pointer to GEOS geometry.
 * @example
 * import initGeosJs from 'geos-wasm'
 * import { geojsonToGeosGeom } from 'geos-wasm/helpers'
 * const geos = await initGeosJs()
 * const json = JSON.parse('{"type":"Polygon","coordinates":[[[0,0],[1,0],[1,1],[0,1],[0,0]]]}')
 * const geomPtr = geojsonToGeosGeom(json, geos)
 * const writer = geos.GEOSWKTWriter_create()
 * const wkt = geos.GEOSWKTWriter_write(writer, geomPtr)
 * console.log(wkt)
 * // => POLYGON ((0 0, 1 0, 1 1, 0 1, 0 0))
 * @alias module:geos-helpers
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
    //     const geomsPtr = geos.Module._malloc(geoms.length * 4)
    //     const geomsArr = new Uint32Array(geoms)
    //     geos.Module.HEAPU32.set(geomsArr, geomsPtr / 4)
    //     const multiGeomsPtr = geos.GEOSGeom_createCollection(
    //       7, // geos.GEOS_GEOMETRYCOLLECTION
    //       geomsPtr,
    //       geoms.length
    //     )
    //     geos.Module._free(geomsPtr)
    //     return multiGeomsPtr
    //   }
    case 'Point':
      if (geojson.coordinates.length === 0) {
        return Module._UGCWasm_GeoPoint_New()
      } else {
        return Module._UGCWasm_GeoPoint_New2(
          geojson.coordinates[0],
          geojson.coordinates[1]
        )
      }
    case 'LineString':
      if (geojson.coordinates.length === 0) {
        return Module._UGCWasm_GeoLine_New()
      } else {
        const pGeoLine = Module._UGCWasm_GeoLine_New()
        const pPoint2Ds = geojsonCoordsToPoint2Ds(geojson.coordinates)
        Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Ds, geojson.coordinates.length)

        return pGeoLine
      }
    case 'Polygon':
      if (geojson.coordinates.length === 0) {
        return Module._UGCWasm_GeoRegion_New()
      } else {
        const pGeoRegion = Module._UGCWasm_GeoRegion_New()

        const pPoint2Ds0 = geojsonCoordsToPoint2Ds(geojson.coordinates[0])
        let subCount = Module._UGCWasm_GeoRegion_AddPart2(pGeoRegion, pPoint2Ds0, geojson.coordinates[0].length)
       
        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const pPoint2Dsi = geojsonCoordsToPoint2Ds(geojson.coordinates[i])
            subCount = Module._UGCWasm_GeoRegion_AddPart2(pGeoRegion, pPoint2Dsi, geojson.coordinates[i].length)
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
    //     const pointsPtr = geos.Module._malloc(points.length * 4)
    //     const pointsArr = new Uint32Array(points)
    //     geos.Module.HEAPU32.set(pointsArr, pointsPtr / 4)
    //     const multiPointPtr = geos.GEOSGeom_createCollection(
    //       4, // geos.GEOS_MULTIPOINT
    //       pointsPtr,
    //       points.length
    //     )
    //     geos.Module._free(pointsPtr)
    //     return multiPointPtr
    //   }
    case 'MultiLineString':
      if (geojson.coordinates.length === 0) {
        return Module._UGCWasm_GeoLine_New()
      } else {
        const pGeoLine = Module._UGCWasm_GeoLine_New()

        const pPoint2Ds0 = geojsonCoordsToPoint2Ds(geojson.coordinates[0])
        let subCount = Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Ds0, geojson.coordinates[0].length)
       
        if (geojson.coordinates.length > 1) {
          for (let i = 1; i < geojson.coordinates.length; i++) {
            const pPoint2Dsi = geojsonCoordsToPoint2Ds(geojson.coordinates[i])
            subCount = Module._UGCWasm_GeoLine_AddPart2(pGeoLine, pPoint2Dsi, geojson.coordinates[i].length)
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
    //         holesPtr = geos.Module._malloc(holes.length * 4)
    //         geos.Module.HEAPU32.set(holesArr, holesPtr / 4)
    //       }
    //       const polyPtr = geos.GEOSGeom_createPolygon(
    //         shell,
    //         holesPtr,
    //         holes.length
    //       )
    //       if (holes.length > 0) {
    //         geos.Module._free(holesPtr)
    //       }
    //       polygons.push(polyPtr)
    //     }
    //     const polygonsPtr = geos.Module._malloc(polygons.length * 4)
    //     const polygonsArr = new Uint32Array(polygons)
    //     geos.Module.HEAPU32.set(polygonsArr, polygonsPtr / 4)
    //     const multiPolyPtr = geos.GEOSGeom_createCollection(
    //       6, // geos.GEOS_MULTIPOLYGON
    //       polygonsPtr,
    //       polygons.length
    //     )
    //     geos.Module._free(polygonsPtr)
    //     return multiPolyPtr
    //   }
    default:
      throw new Error('Unsupported GeoJSON type: ' + geojson.type + '. Are you sure this is valid GeoJSON?')
  }
}