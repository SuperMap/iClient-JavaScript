/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
  setCORS,
  isCORS,
  setRequestTimeout,
  getRequestTimeout,
  FetchRequest
} from './FetchRequest';

import { ColorsPickerUtil } from './ColorsPickerUtil';

import { ArrayStatistic } from './ArrayStatistic';
import { getMeterPerMapUnit, getWrapNum, conversionDegree } from './MapCalculateUtil';

import { Point as GeometryPoint } from "../commontypes/geometry/Point";
import { Polygon } from "../commontypes/geometry/Polygon";
import { LinearRing } from "../commontypes/geometry/LinearRing";
import { GeoJSON as GeoJSONFormat } from "../format/GeoJSON";

function toSuperMapGeometry(geoJSON) {
    if (geoJSON && geoJSON.type) {
        var format = new GeoJSONFormat();
        var result = format.read(geoJSON, "FeatureCollection");
        return result[0].geometry;
    }
}

function toSuperMapPolygon(lnglatBounds) {
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
}

 /**
* @function Util.extend
* @description 对象拷贝赋值。
* @param {Object} dest - 目标对象。
* @param {Object} arguments - 待拷贝的对象。
* @returns {Object} 赋值后的目标对象。
*/
function extend(dest) {
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
}

export {
  toSuperMapPolygon,
  toSuperMapGeometry,
  setCORS,
  isCORS,
  setRequestTimeout,
  getRequestTimeout,
  FetchRequest,
  ColorsPickerUtil,
  ArrayStatistic,
  getMeterPerMapUnit,
  getWrapNum,
  conversionDegree,
  extend
};
