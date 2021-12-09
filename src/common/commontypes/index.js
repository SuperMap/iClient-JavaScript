/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
  Collection,
  GeometryCollection,
  Curve,
  GeometryCurve,
  GeoText,
  GeometryGeoText,
  LinearRing,
  GeometryLinearRing,
  LineString,
  GeometryLineString,
  MultiLineString,
  GeometryMultiLineString,
  MultiPoint,
  GeometryMultiPoint,
  MultiPolygon,
  GeometryMultiPolygon,
  GeometryPoint,
  Polygon,
  GeometryPolygon,
  Rectangle,
  GeometryRectangle
} from './geometry/index';
import { inheritExt, mixinExt, StringExt, NumberExt, FunctionExt, ArrayExt } from './BaseTypes';
import { Bounds } from './Bounds';
import { Credential } from './Credential';
import { DateExt } from './Date';
import { Event } from './Event';
import { Events } from './Events';
import { Feature } from './Feature';
import { Geometry } from './Geometry';
import { LonLat } from './LonLat';
import { Pixel } from './Pixel';
import { Size } from './Size';
import {
  Util as CommonUtil,
  Browser,
  INCHES_PER_UNIT,
  METERS_PER_INCH,
  DOTS_PER_INCH,
  IS_GECKO
} from './Util';
import { Vector as GeometryVector, Vector as FeatureVector } from './Vector';

export {
  Collection,
  GeometryCollection,
  Curve,
  GeometryCurve,
  GeoText,
  GeometryGeoText,
  LinearRing,
  GeometryLinearRing,
  LineString,
  GeometryLineString,
  MultiLineString,
  GeometryMultiLineString,
  MultiPoint,
  GeometryMultiPoint,
  MultiPolygon,
  GeometryMultiPolygon,
  GeometryPoint,
  Polygon,
  GeometryPolygon,
  Rectangle,
  GeometryRectangle
};
export { inheritExt, mixinExt, StringExt, NumberExt, FunctionExt, ArrayExt };
export { Bounds };
export { Credential };
export { DateExt };
export { Event };
export { Events };
export { Feature };
export { Geometry };
export { LonLat };
export { Pixel };
export { Size };
export { CommonUtil, Browser, INCHES_PER_UNIT, METERS_PER_INCH, DOTS_PER_INCH, IS_GECKO };
export { GeometryVector, FeatureVector };
