/*!
 * 
 *     @supermap/vue-iclient.(http://iclient.supermap.io)
 *     Copyright© 2000 - 2019 SuperMap Software Co.Ltd
 *     license: Apache-2.0
 *     version: v10.0.0
 *    
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("../../static/libs/iclient-leaflet/iclient-leaflet.min.js"), require("video.js"), require("echarts"), require("ant-design-vue"), require("echarts-liquidfill"), require("L"), require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["../../static/libs/iclient-leaflet/iclient-leaflet.min.js", "video.js", "echarts", "ant-design-vue", "echarts-liquidfill", "L", "vue"], factory);
	else if(typeof exports === 'object')
		exports["Components"] = factory(require("../../static/libs/iclient-leaflet/iclient-leaflet.min.js"), require("video.js"), require("echarts"), require("ant-design-vue"), require("echarts-liquidfill"), require("L"), require("vue"));
	else
		root["SuperMap"] = root["SuperMap"] || {}, root["SuperMap"]["Components"] = factory(root["SuperMap"], root["_videojs"], root["echarts"], root["antd"], root["echarts-liquidfill"], root["L"], root["Vue"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE__17FK__, __WEBPACK_EXTERNAL_MODULE_AzSJ__, __WEBPACK_EXTERNAL_MODULE_Fk5u__, __WEBPACK_EXTERNAL_MODULE_TnLG__, __WEBPACK_EXTERNAL_MODULE_hQXD__, __WEBPACK_EXTERNAL_MODULE_hgx0__, __WEBPACK_EXTERNAL_MODULE_i7_w__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "/9aa":
/***/ (function(module, exports, __webpack_require__) {

var baseGetTag = __webpack_require__("NykK"),
    isObjectLike = __webpack_require__("ExA7");

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && baseGetTag(value) == symbolTag);
}

module.exports = isSymbol;


/***/ }),

/***/ "/aIJ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "/rf6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @module helpers
 */
/**
 * Earth Radius used with the Harvesine formula and approximates using a spherical (non-ellipsoid) Earth.
 *
 * @memberof helpers
 * @type {number}
 */
exports.earthRadius = 6371008.8;
/**
 * Unit of measurement factors using a spherical (non-ellipsoid) earth radius.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.factors = {
    centimeters: exports.earthRadius * 100,
    centimetres: exports.earthRadius * 100,
    degrees: exports.earthRadius / 111325,
    feet: exports.earthRadius * 3.28084,
    inches: exports.earthRadius * 39.370,
    kilometers: exports.earthRadius / 1000,
    kilometres: exports.earthRadius / 1000,
    meters: exports.earthRadius,
    metres: exports.earthRadius,
    miles: exports.earthRadius / 1609.344,
    millimeters: exports.earthRadius * 1000,
    millimetres: exports.earthRadius * 1000,
    nauticalmiles: exports.earthRadius / 1852,
    radians: 1,
    yards: exports.earthRadius / 1.0936,
};
/**
 * Units of measurement factors based on 1 meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.unitsFactors = {
    centimeters: 100,
    centimetres: 100,
    degrees: 1 / 111325,
    feet: 3.28084,
    inches: 39.370,
    kilometers: 1 / 1000,
    kilometres: 1 / 1000,
    meters: 1,
    metres: 1,
    miles: 1 / 1609.344,
    millimeters: 1000,
    millimetres: 1000,
    nauticalmiles: 1 / 1852,
    radians: 1 / exports.earthRadius,
    yards: 1 / 1.0936,
};
/**
 * Area of measurement factors based on 1 square meter.
 *
 * @memberof helpers
 * @type {Object}
 */
exports.areaFactors = {
    acres: 0.000247105,
    centimeters: 10000,
    centimetres: 10000,
    feet: 10.763910417,
    inches: 1550.003100006,
    kilometers: 0.000001,
    kilometres: 0.000001,
    meters: 1,
    metres: 1,
    miles: 3.86e-7,
    millimeters: 1000000,
    millimetres: 1000000,
    yards: 1.195990046,
};
/**
 * Wraps a GeoJSON {@link Geometry} in a GeoJSON {@link Feature}.
 *
 * @name feature
 * @param {Geometry} geometry input geometry
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature} a GeoJSON Feature
 * @example
 * var geometry = {
 *   "type": "Point",
 *   "coordinates": [110, 50]
 * };
 *
 * var feature = turf.feature(geometry);
 *
 * //=feature
 */
function feature(geom, properties, options) {
    if (options === void 0) { options = {}; }
    var feat = { type: "Feature" };
    if (options.id === 0 || options.id) {
        feat.id = options.id;
    }
    if (options.bbox) {
        feat.bbox = options.bbox;
    }
    feat.properties = properties || {};
    feat.geometry = geom;
    return feat;
}
exports.feature = feature;
/**
 * Creates a GeoJSON {@link Geometry} from a Geometry string type & coordinates.
 * For GeometryCollection type use `helpers.geometryCollection`
 *
 * @name geometry
 * @param {string} type Geometry Type
 * @param {Array<any>} coordinates Coordinates
 * @param {Object} [options={}] Optional Parameters
 * @returns {Geometry} a GeoJSON Geometry
 * @example
 * var type = "Point";
 * var coordinates = [110, 50];
 * var geometry = turf.geometry(type, coordinates);
 * // => geometry
 */
function geometry(type, coordinates, options) {
    if (options === void 0) { options = {}; }
    switch (type) {
        case "Point": return point(coordinates).geometry;
        case "LineString": return lineString(coordinates).geometry;
        case "Polygon": return polygon(coordinates).geometry;
        case "MultiPoint": return multiPoint(coordinates).geometry;
        case "MultiLineString": return multiLineString(coordinates).geometry;
        case "MultiPolygon": return multiPolygon(coordinates).geometry;
        default: throw new Error(type + " is invalid");
    }
}
exports.geometry = geometry;
/**
 * Creates a {@link Point} {@link Feature} from a Position.
 *
 * @name point
 * @param {Array<number>} coordinates longitude, latitude position (each in decimal degrees)
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Point>} a Point feature
 * @example
 * var point = turf.point([-75.343, 39.984]);
 *
 * //=point
 */
function point(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "Point",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.point = point;
/**
 * Creates a {@link Point} {@link FeatureCollection} from an Array of Point coordinates.
 *
 * @name points
 * @param {Array<Array<number>>} coordinates an array of Points
 * @param {Object} [properties={}] Translate these properties to each Feature
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Point>} Point Feature
 * @example
 * var points = turf.points([
 *   [-75, 39],
 *   [-80, 45],
 *   [-78, 50]
 * ]);
 *
 * //=points
 */
function points(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return point(coords, properties);
    }), options);
}
exports.points = points;
/**
 * Creates a {@link Polygon} {@link Feature} from an Array of LinearRings.
 *
 * @name polygon
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<Polygon>} Polygon Feature
 * @example
 * var polygon = turf.polygon([[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]], { name: 'poly1' });
 *
 * //=polygon
 */
function polygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    for (var _i = 0, coordinates_1 = coordinates; _i < coordinates_1.length; _i++) {
        var ring = coordinates_1[_i];
        if (ring.length < 4) {
            throw new Error("Each LinearRing of a Polygon must have 4 or more Positions.");
        }
        for (var j = 0; j < ring[ring.length - 1].length; j++) {
            // Check if first point of Polygon contains two numbers
            if (ring[ring.length - 1][j] !== ring[0][j]) {
                throw new Error("First and last Position are not equivalent.");
            }
        }
    }
    var geom = {
        type: "Polygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.polygon = polygon;
/**
 * Creates a {@link Polygon} {@link FeatureCollection} from an Array of Polygon coordinates.
 *
 * @name polygons
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygon coordinates
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<Polygon>} Polygon FeatureCollection
 * @example
 * var polygons = turf.polygons([
 *   [[[-5, 52], [-4, 56], [-2, 51], [-7, 54], [-5, 52]]],
 *   [[[-15, 42], [-14, 46], [-12, 41], [-17, 44], [-15, 42]]],
 * ]);
 *
 * //=polygons
 */
function polygons(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return polygon(coords, properties);
    }), options);
}
exports.polygons = polygons;
/**
 * Creates a {@link LineString} {@link Feature} from an Array of Positions.
 *
 * @name lineString
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<LineString>} LineString Feature
 * @example
 * var linestring1 = turf.lineString([[-24, 63], [-23, 60], [-25, 65], [-20, 69]], {name: 'line 1'});
 * var linestring2 = turf.lineString([[-14, 43], [-13, 40], [-15, 45], [-10, 49]], {name: 'line 2'});
 *
 * //=linestring1
 * //=linestring2
 */
function lineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    if (coordinates.length < 2) {
        throw new Error("coordinates must be an array of two or more positions");
    }
    var geom = {
        type: "LineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.lineString = lineString;
/**
 * Creates a {@link LineString} {@link FeatureCollection} from an Array of LineString coordinates.
 *
 * @name lineStrings
 * @param {Array<Array<Array<number>>>} coordinates an array of LinearRings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north]
 * associated with the FeatureCollection
 * @param {string|number} [options.id] Identifier associated with the FeatureCollection
 * @returns {FeatureCollection<LineString>} LineString FeatureCollection
 * @example
 * var linestrings = turf.lineStrings([
 *   [[-24, 63], [-23, 60], [-25, 65], [-20, 69]],
 *   [[-14, 43], [-13, 40], [-15, 45], [-10, 49]]
 * ]);
 *
 * //=linestrings
 */
function lineStrings(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    return featureCollection(coordinates.map(function (coords) {
        return lineString(coords, properties);
    }), options);
}
exports.lineStrings = lineStrings;
/**
 * Takes one or more {@link Feature|Features} and creates a {@link FeatureCollection}.
 *
 * @name featureCollection
 * @param {Feature[]} features input features
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {FeatureCollection} FeatureCollection of Features
 * @example
 * var locationA = turf.point([-75.343, 39.984], {name: 'Location A'});
 * var locationB = turf.point([-75.833, 39.284], {name: 'Location B'});
 * var locationC = turf.point([-75.534, 39.123], {name: 'Location C'});
 *
 * var collection = turf.featureCollection([
 *   locationA,
 *   locationB,
 *   locationC
 * ]);
 *
 * //=collection
 */
function featureCollection(features, options) {
    if (options === void 0) { options = {}; }
    var fc = { type: "FeatureCollection" };
    if (options.id) {
        fc.id = options.id;
    }
    if (options.bbox) {
        fc.bbox = options.bbox;
    }
    fc.features = features;
    return fc;
}
exports.featureCollection = featureCollection;
/**
 * Creates a {@link Feature<MultiLineString>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiLineString
 * @param {Array<Array<Array<number>>>} coordinates an array of LineStrings
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiLineString>} a MultiLineString feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiLine = turf.multiLineString([[[0,0],[10,10]]]);
 *
 * //=multiLine
 */
function multiLineString(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiLineString",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiLineString = multiLineString;
/**
 * Creates a {@link Feature<MultiPoint>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPoint
 * @param {Array<Array<number>>} coordinates an array of Positions
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPoint>} a MultiPoint feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPt = turf.multiPoint([[0,0],[10,10]]);
 *
 * //=multiPt
 */
function multiPoint(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPoint",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPoint = multiPoint;
/**
 * Creates a {@link Feature<MultiPolygon>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name multiPolygon
 * @param {Array<Array<Array<Array<number>>>>} coordinates an array of Polygons
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<MultiPolygon>} a multipolygon feature
 * @throws {Error} if no coordinates are passed
 * @example
 * var multiPoly = turf.multiPolygon([[[[0,0],[0,10],[10,10],[10,0],[0,0]]]]);
 *
 * //=multiPoly
 *
 */
function multiPolygon(coordinates, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "MultiPolygon",
        coordinates: coordinates,
    };
    return feature(geom, properties, options);
}
exports.multiPolygon = multiPolygon;
/**
 * Creates a {@link Feature<GeometryCollection>} based on a
 * coordinate array. Properties can be added optionally.
 *
 * @name geometryCollection
 * @param {Array<Geometry>} geometries an array of GeoJSON Geometries
 * @param {Object} [properties={}] an Object of key-value pairs to add as properties
 * @param {Object} [options={}] Optional Parameters
 * @param {Array<number>} [options.bbox] Bounding Box Array [west, south, east, north] associated with the Feature
 * @param {string|number} [options.id] Identifier associated with the Feature
 * @returns {Feature<GeometryCollection>} a GeoJSON GeometryCollection Feature
 * @example
 * var pt = turf.geometry("Point", [100, 0]);
 * var line = turf.geometry("LineString", [[101, 0], [102, 1]]);
 * var collection = turf.geometryCollection([pt, line]);
 *
 * // => collection
 */
function geometryCollection(geometries, properties, options) {
    if (options === void 0) { options = {}; }
    var geom = {
        type: "GeometryCollection",
        geometries: geometries,
    };
    return feature(geom, properties, options);
}
exports.geometryCollection = geometryCollection;
/**
 * Round number to precision
 *
 * @param {number} num Number
 * @param {number} [precision=0] Precision
 * @returns {number} rounded number
 * @example
 * turf.round(120.4321)
 * //=120
 *
 * turf.round(120.4321, 2)
 * //=120.43
 */
function round(num, precision) {
    if (precision === void 0) { precision = 0; }
    if (precision && !(precision >= 0)) {
        throw new Error("precision must be a positive number");
    }
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(num * multiplier) / multiplier;
}
exports.round = round;
/**
 * Convert a distance measurement (assuming a spherical Earth) from radians to a more friendly unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name radiansToLength
 * @param {number} radians in radians across the sphere
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} distance
 */
function radiansToLength(radians, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return radians * factor;
}
exports.radiansToLength = radiansToLength;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into radians
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @name lengthToRadians
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} radians
 */
function lengthToRadians(distance, units) {
    if (units === void 0) { units = "kilometers"; }
    var factor = exports.factors[units];
    if (!factor) {
        throw new Error(units + " units is invalid");
    }
    return distance / factor;
}
exports.lengthToRadians = lengthToRadians;
/**
 * Convert a distance measurement (assuming a spherical Earth) from a real-world unit into degrees
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, centimeters, kilometres, feet
 *
 * @name lengthToDegrees
 * @param {number} distance in real units
 * @param {string} [units="kilometers"] can be degrees, radians, miles, or kilometers inches, yards, metres,
 * meters, kilometres, kilometers.
 * @returns {number} degrees
 */
function lengthToDegrees(distance, units) {
    return radiansToDegrees(lengthToRadians(distance, units));
}
exports.lengthToDegrees = lengthToDegrees;
/**
 * Converts any bearing angle from the north line direction (positive clockwise)
 * and returns an angle between 0-360 degrees (positive clockwise), 0 being the north line
 *
 * @name bearingToAzimuth
 * @param {number} bearing angle, between -180 and +180 degrees
 * @returns {number} angle between 0 and 360 degrees
 */
function bearingToAzimuth(bearing) {
    var angle = bearing % 360;
    if (angle < 0) {
        angle += 360;
    }
    return angle;
}
exports.bearingToAzimuth = bearingToAzimuth;
/**
 * Converts an angle in radians to degrees
 *
 * @name radiansToDegrees
 * @param {number} radians angle in radians
 * @returns {number} degrees between 0 and 360 degrees
 */
function radiansToDegrees(radians) {
    var degrees = radians % (2 * Math.PI);
    return degrees * 180 / Math.PI;
}
exports.radiansToDegrees = radiansToDegrees;
/**
 * Converts an angle in degrees to radians
 *
 * @name degreesToRadians
 * @param {number} degrees angle between 0 and 360 degrees
 * @returns {number} angle in radians
 */
function degreesToRadians(degrees) {
    var radians = degrees % 360;
    return radians * Math.PI / 180;
}
exports.degreesToRadians = degreesToRadians;
/**
 * Converts a length to the requested unit.
 * Valid units: miles, nauticalmiles, inches, yards, meters, metres, kilometers, centimeters, feet
 *
 * @param {number} length to be converted
 * @param {Units} [originalUnit="kilometers"] of the length
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted length
 */
function convertLength(length, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "kilometers"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(length >= 0)) {
        throw new Error("length must be a positive number");
    }
    return radiansToLength(lengthToRadians(length, originalUnit), finalUnit);
}
exports.convertLength = convertLength;
/**
 * Converts a area to the requested unit.
 * Valid units: kilometers, kilometres, meters, metres, centimetres, millimeters, acres, miles, yards, feet, inches
 * @param {number} area to be converted
 * @param {Units} [originalUnit="meters"] of the distance
 * @param {Units} [finalUnit="kilometers"] returned unit
 * @returns {number} the converted distance
 */
function convertArea(area, originalUnit, finalUnit) {
    if (originalUnit === void 0) { originalUnit = "meters"; }
    if (finalUnit === void 0) { finalUnit = "kilometers"; }
    if (!(area >= 0)) {
        throw new Error("area must be a positive number");
    }
    var startFactor = exports.areaFactors[originalUnit];
    if (!startFactor) {
        throw new Error("invalid original units");
    }
    var finalFactor = exports.areaFactors[finalUnit];
    if (!finalFactor) {
        throw new Error("invalid final units");
    }
    return (area / startFactor) * finalFactor;
}
exports.convertArea = convertArea;
/**
 * isNumber
 *
 * @param {*} num Number to validate
 * @returns {boolean} true/false
 * @example
 * turf.isNumber(123)
 * //=true
 * turf.isNumber('foo')
 * //=false
 */
function isNumber(num) {
    return !isNaN(num) && num !== null && !Array.isArray(num) && !/^\s*$/.test(num);
}
exports.isNumber = isNumber;
/**
 * isObject
 *
 * @param {*} input variable to validate
 * @returns {boolean} true/false
 * @example
 * turf.isObject({elevation: 10})
 * //=true
 * turf.isObject('foo')
 * //=false
 */
function isObject(input) {
    return (!!input) && (input.constructor === Object);
}
exports.isObject = isObject;
/**
 * Validate BBox
 *
 * @private
 * @param {Array<number>} bbox BBox to validate
 * @returns {void}
 * @throws Error if BBox is not valid
 * @example
 * validateBBox([-180, -40, 110, 50])
 * //=OK
 * validateBBox([-180, -40])
 * //=Error
 * validateBBox('Foo')
 * //=Error
 * validateBBox(5)
 * //=Error
 * validateBBox(null)
 * //=Error
 * validateBBox(undefined)
 * //=Error
 */
function validateBBox(bbox) {
    if (!bbox) {
        throw new Error("bbox is required");
    }
    if (!Array.isArray(bbox)) {
        throw new Error("bbox must be an Array");
    }
    if (bbox.length !== 4 && bbox.length !== 6) {
        throw new Error("bbox must be an Array of 4 or 6 numbers");
    }
    bbox.forEach(function (num) {
        if (!isNumber(num)) {
            throw new Error("bbox must only contain numbers");
        }
    });
}
exports.validateBBox = validateBBox;
/**
 * Validate Id
 *
 * @private
 * @param {string|number} id Id to validate
 * @returns {void}
 * @throws Error if Id is not valid
 * @example
 * validateId([-180, -40, 110, 50])
 * //=Error
 * validateId([-180, -40])
 * //=Error
 * validateId('Foo')
 * //=OK
 * validateId(5)
 * //=OK
 * validateId(null)
 * //=Error
 * validateId(undefined)
 * //=Error
 */
function validateId(id) {
    if (!id) {
        throw new Error("id is required");
    }
    if (["string", "number"].indexOf(typeof id) === -1) {
        throw new Error("id must be a number or a string");
    }
}
exports.validateId = validateId;
// Deprecated methods
function radians2degrees() {
    throw new Error("method has been renamed to `radiansToDegrees`");
}
exports.radians2degrees = radians2degrees;
function degrees2radians() {
    throw new Error("method has been renamed to `degreesToRadians`");
}
exports.degrees2radians = degrees2radians;
function distanceToDegrees() {
    throw new Error("method has been renamed to `lengthToDegrees`");
}
exports.distanceToDegrees = distanceToDegrees;
function distanceToRadians() {
    throw new Error("method has been renamed to `lengthToRadians`");
}
exports.distanceToRadians = distanceToRadians;
function radiansToDistance() {
    throw new Error("method has been renamed to `radiansToLength`");
}
exports.radiansToDistance = radiansToDistance;
function bearingToAngle() {
    throw new Error("method has been renamed to `bearingToAzimuth`");
}
exports.bearingToAngle = bearingToAngle;
function convertDistance() {
    throw new Error("method has been renamed to `convertLength`");
}
exports.convertDistance = convertDistance;


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("bD5U");


/***/ }),

/***/ "07ub":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8Q8H");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0F1z":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _regenerator = _interopRequireDefault(__webpack_require__("o0o1"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _leaflet = _interopRequireDefault(__webpack_require__("hgx0"));

__webpack_require__("17FK");

__webpack_require__("e/Qi");

__webpack_require__("s544");

var _util = __webpack_require__("e7LN");

var _center = _interopRequireDefault(__webpack_require__("SPBs"));

var _canvg = _interopRequireDefault(__webpack_require__("ATId"));

var _lodash = _interopRequireDefault(__webpack_require__("Z94/"));

var _ProvinceCenter = _interopRequireDefault(__webpack_require__("9EWs"));

var _MunicipalCenter = _interopRequireDefault(__webpack_require__("84wO"));

var __awaiter = void 0 && (void 0).__awaiter || function (thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }

    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }

    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }

    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};

var MAX_MIGRATION_ANIMATION_COUNT = 1000;

var WebMapViewModel =
/*#__PURE__*/
function (_L$Evented) {
  (0, _inherits2.default)(WebMapViewModel, _L$Evented);

  function WebMapViewModel(id) {
    var _this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var mapOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    (0, _classCallCheck2.default)(this, WebMapViewModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(WebMapViewModel).call(this));
    _this.echartslayer = [];
    _this.layers = {};
    _this._layers = [];
    _this.mapId = id;
    _this.serverUrl = options.serverUrl || 'http://www.supermapol.com';
    _this.accessToken = options.accessToken;
    _this.accessKey = options.accessKey;
    _this.tiandituKey = options.tiandituKey || '';
    _this.withCredentials = options.withCredentials || false;
    _this.target = options.target || 'map';
    _this.excludePortalProxyUrl = options.excludePortalProxyUrl;
    _this.isSuperMapOnline = options.isSuperMapOnline;
    _this.echartslayer = [];
    _this.center = mapOptions.center || [];
    _this.zoom = mapOptions.zoom;
    _this.mapOptions = mapOptions;

    _this._createWebMap();

    return _this;
  }

  (0, _createClass2.default)(WebMapViewModel, [{
    key: "setZoom",
    value: function setZoom(zoom) {
      if (this.map) {
        this.mapOptions.zoom = zoom;
        (zoom || zoom === 0) && this.map.setZoom(zoom);
      }
    }
  }, {
    key: "setMinZoom",
    value: function setMinZoom(minZoom) {
      if (this.map) {
        this.mapOptions.minZoom = minZoom;
        (minZoom || minZoom === 0) && this.map.setMinZoom(minZoom);
      }
    }
  }, {
    key: "setMaxZoom",
    value: function setMaxZoom(maxZoom) {
      if (this.map) {
        this.mapOptions.maxZoom = maxZoom;
        (maxZoom || maxZoom === 0) && this.map.setMinZoom(maxZoom);
      }
    }
  }, {
    key: "setCenter",
    value: function setCenter(center) {
      if (this.map) {
        this.mapOptions.center = center;
        center && center.length > 0 && this.map.setView(center, this.zoom);
      }
    }
  }, {
    key: "setMaxBounds",
    value: function setMaxBounds(maxBounds) {
      if (this.map) {
        this.mapOptions.maxBounds = maxBounds;
        maxBounds && maxBounds.length > 0 && this.map.setMaxBounds(maxBounds);
      }
    }
  }, {
    key: "echartsLayerResize",
    value: function echartsLayerResize() {
      this.echartslayer.forEach(function (echartslayer) {
        echartslayer.chart.resize();
      });
    }
  }, {
    key: "setMapId",
    value: function setMapId(mapId) {
      var _this2 = this;

      this.mapId = mapId;
      setTimeout(function () {
        _this2._createWebMap();
      }, 0);
    }
  }, {
    key: "setServerUrl",
    value: function setServerUrl(serverUrl) {
      this.serverUrl = serverUrl;
    }
  }, {
    key: "setWithCredentials",
    value: function setWithCredentials(withCredentials) {
      this.withCredentials = withCredentials;
    }
  }, {
    key: "_createWebMap",
    value: function _createWebMap() {
      var _this3 = this;

      if (this.map) {
        this.map.remove();
        this.center = [];
        this.zoom = null;
      }

      if (!this.mapId || !this.serverUrl) {
        this.map = _leaflet.default.map(this.target, {
          center: this.center.length ? _leaflet.default.latLng(this.center[0], this.center[1]) : [0, 0],
          zoom: this.zoom || 0,
          crs: this.mapOptions.crs || _leaflet.default.CRS.EPSG3857,
          maxZoom: this.mapOptions.maxZoom || 30,
          minZoom: this.mapOptions.minZoom || 0,
          preferCanvas: this.mapOptions.preferCanvas || true
        });
        setTimeout(function () {
          _this3.fire('addlayerssucceeded', {
            map: _this3.map,
            mapparams: {},
            layers: []
          });
        }, 0);
        return;
      }

      this._taskID = new Date();

      var mapUrl = this._getMapUrl();

      this._getMapInfo(mapUrl, this._taskID);
    }
  }, {
    key: "_getMapUrl",
    value: function _getMapUrl() {
      var urlArr = this.serverUrl.split('');

      if (urlArr[urlArr.length - 1] !== '/') {
        this.serverUrl += '/';
      }

      var mapUrl = this.serverUrl + 'web/maps/' + this.mapId + '/map';

      if (this.accessToken || this.accessKey) {
        mapUrl +=  true ? 'token=' + this.accessToken : undefined;
      }

      var filter = 'getUrlResource.json?url=';

      if (this.excludePortalProxyUrl && this.serverUrl.indexOf(filter) > -1) {
        var urlArray = this.serverUrl.split(filter);

        if (urlArray.length > 1) {
          mapUrl = urlArray[0] + filter + this.serverUrl + 'web/maps/' + this.mapId + '/map.json';
        }
      }

      return mapUrl;
    }
  }, {
    key: "_getMapInfo",
    value: function _getMapInfo(url, _taskID) {
      var _this4 = this;

      var mapUrl = url.indexOf('.json') === -1 ? "".concat(url, ".json") : url;
      SuperMap.FetchRequest.get(mapUrl, null, {
        withCredentials: this.withCredentials
      }).then(function (response) {
        return response.json();
      }).then(function (mapInfo) {
        if (mapInfo && mapInfo.succeed === false) {
          var error = {
            message: mapInfo && mapInfo.error && mapInfo.error.errorMsg
          };

          _this4.fire('getmapinfofailed', {
            error: error
          });

          console.log(error);
          return;
        }

        var title = mapInfo.title,
            description = mapInfo.description,
            layers = mapInfo.layers,
            baseLayer = mapInfo.baseLayer;
        _this4.mapParams = {
          title: title,
          description: description
        };

        _this4._createMap(mapInfo);

        if (baseLayer && baseLayer.layerType === 'MAPBOXSTYLE') {} else {
          _this4._createBaseLayer(mapInfo, false);
        }

        if (!layers || layers.length === 0) {
          _this4._sendMapToUser(0, 0);
        } else {
          _this4._addLayers(layers, _taskID);
        }
      }).catch(function (error) {
        _this4._addLayerSucceeded();

        _this4.fire('getmapinfofailed', {
          error: error
        });
      });
    }
  }, {
    key: "_createMap",
    value: function _createMap(mapInfo) {
      var level = mapInfo.level,
          maxZoom = mapInfo.maxZoom,
          minZoom = mapInfo.minZoom;
      var center;
      center = mapInfo.center && [mapInfo.center.x, mapInfo.center.y];
      var zoom = level || 0;
      zoom = zoom === 0 ? 0 : zoom;

      if (!center) {
        center = [0, 0];
      }

      var crs = this._handleMapCrs(mapInfo);

      center = this.baseProjection === 'EPSG:3857' ? crs.unproject(_leaflet.default.point(center[0], center[1])) : _leaflet.default.latLng(center[1], center[0]);
      this.map = _leaflet.default.map(this.target, {
        center: this.center.length ? _leaflet.default.latLng(this.center[0], this.center[1]) : center,
        zoom: this.zoom || zoom,
        crs: crs,
        maxZoom: maxZoom || 30,
        minZoom: minZoom || 0,
        preferCanvas: true
      });
      this.fire('mapinitialized', {
        map: this.map
      });
    }
  }, {
    key: "_createBaseLayer",
    value: function _createBaseLayer(mapInfo) {
      var sendToMap = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var layerInfo = mapInfo.baseLayer || mapInfo;
      var layerType = layerInfo.layerType;

      if (layerType.indexOf('TIANDITU_VEC') > -1 || layerType.indexOf('TIANDITU_IMG') > -1 || layerType.indexOf('TIANDITU_TER') > -1) {
        layerType = layerType.substr(0, 12);
      }

      var mapUrls = {
        CLOUD: 'http://t2.supermapcloud.com/FileService/image',
        CLOUD_BLACK: 'http://t3.supermapcloud.com/MapService/getGdp',
        OSM: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        GOOGLE: 'http://www.google.cn/maps/vt/pb=!1m4!1m3!1i{z}!2i{x}!3i{y}!2m3!1e0!2sm!3i380072576!3m8!2szh-CN!3scn!5e1105!12m4!1e68!2m2!1sset!2sRoadmap!4e0!5m1!1e0',
        GOOGLE_CN: 'https://mt{0-3}.google.cn/vt/lyrs=m&hl=zh-CN&gl=cn&x={x}&y={y}&z={z}',
        JAPAN_STD: 'http://cyberjapandata.gsi.go.jp/xyz/std/{z}/{x}/{y}.png',
        JAPAN_PALE: 'http://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png',
        JAPAN_RELIEF: 'http://cyberjapandata.gsi.go.jp/xyz/relief/{z}/{x}/{y}.png',
        JAPAN_ORT: 'http://cyberjapandata.gsi.go.jp/xyz/ort/{z}/{x}/{y}.jpg'
      };
      var url;
      var layer;

      switch (layerType) {
        case 'TIANDITU_VEC':
        case 'TIANDITU_IMG':
        case 'TIANDITU_TER':
          layer = this._createTiandituLayer(layerInfo);
          break;

        case 'BING':
          layer = this._createBingLayer(layerInfo.name);
          break;

        case 'WMS':
          layer = this._createWMSLayer(layerInfo);
          break;

        case 'WMTS':
          layer = this._createWMTSLayer(layerInfo);
          break;

        case 'TILE':
        case 'SUPERMAP_REST':
          layer = this._createDynamicTiledLayer(layerInfo);
          break;

        case 'CLOUD':
        case 'CLOUD_BLACK':
          url = mapUrls[layerType];
          layer = this._createCLOUDLayer(layerType, url);
          break;

        case 'OSM':
        case 'JAPAN_ORT':
        case 'JAPAN_RELIEF':
        case 'JAPAN_PALE':
        case 'JAPAN_STD':
        case 'GOOGLE_CN':
        case 'GOOGLE':
          url = mapUrls[layerType];
          layer = this._createXYZLayer(layerInfo, url);
          break;

        case 'BAIDU':
          layer = this._createBaiduTileLayer();
          break;

        default:
          break;
      }

      layer && this._addLayerToMap({
        layer: layer,
        type: 'baseLayers',
        layerInfo: layerInfo,
        sendToMap: sendToMap
      });
    }
  }, {
    key: "_addLayers",
    value: function _addLayers(layers, _taskID) {
      var _this5 = this;

      this._layers = layers;
      var len = layers.length;
      this.layerAdded = 0;
      this.expectLayerLen = len;

      if (len > 0) {
        layers.forEach(function (layer, index) {
          var type = _this5._getType(layer);

          layer.layerID = layer.name + '-' + index;
          layer.index = index;

          switch (type) {
            case 'hosted':
              _this5._getFeaturesFromHosted({
                layer: layer,
                index: index,
                len: len,
                _taskID: _taskID
              });

              break;

            case 'tile':
              _this5._createBaseLayer(layer);

              break;

            case 'rest_data':
              _this5._getFeaturesFromRestData({
                layer: layer,
                index: index,
                len: len
              });

              break;

            case 'rest_map':
              _this5._getFeaturesFromRestMap({
                layer: layer,
                index: index,
                len: len
              });

              break;

            case 'dataflow':
              _this5._getFeaturesFromDataflow({
                layer: layer,
                index: index,
                len: len
              });

              break;
          }
        }, this);
      }
    }
  }, {
    key: "_addLayer",
    value: function _addLayer(layerInfo, features, index) {
      return __awaiter(this, void 0, void 0,
      /*#__PURE__*/
      _regenerator.default.mark(function _callee() {
        var layerType, style, themeSetting, filterCondition, projection, featureType, labelStyle, layer, labelLayerInfo, labelLayer;
        return _regenerator.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                layerType = layerInfo.layerType, style = layerInfo.style, themeSetting = layerInfo.themeSetting, filterCondition = layerInfo.filterCondition, projection = layerInfo.projection, featureType = layerInfo.featureType, labelStyle = layerInfo.labelStyle;

                if ((style || themeSetting) && filterCondition) {
                  if (layerType !== 'RANGE' && layerType !== 'UNIQUE' && layerType !== 'RANK_SYMBOL') {
                    features = this._getFiterFeatures(filterCondition, features);
                  }
                }

                if (features && projection && projection !== 'EPSG:4326') {
                  this._transformFeatures(features);
                }

                _context.t0 = layerType;
                _context.next = _context.t0 === 'VECTOR' ? 7 : _context.t0 === 'UNIQUE' ? 23 : _context.t0 === 'RANGE' ? 27 : _context.t0 === 'HEAT' ? 31 : _context.t0 === 'MARKER' ? 35 : _context.t0 === 'RANK_SYMBOL' ? 39 : _context.t0 === 'MIGRATION' ? 43 : _context.t0 === 'DATAFLOW_POINT_TRACK' ? 47 : _context.t0 === 'DATAFLOW_HEAT' ? 47 : 48;
                break;

              case 7:
                if (!(featureType === 'POINT')) {
                  _context.next = 19;
                  break;
                }

                if (!(style.type === 'SYMBOL_POINT')) {
                  _context.next = 14;
                  break;
                }

                _context.next = 11;
                return this._createSymbolLayer(layerInfo, features);

              case 11:
                layer = _context.sent;
                _context.next = 17;
                break;

              case 14:
                _context.next = 16;
                return this._createGraphicLayer(layerInfo, features);

              case 16:
                layer = _context.sent;

              case 17:
                _context.next = 22;
                break;

              case 19:
                _context.next = 21;
                return this._createVectorLayer(layerInfo, features);

              case 21:
                layer = _context.sent;

              case 22:
                return _context.abrupt("break", 48);

              case 23:
                _context.next = 25;
                return this._createUniqueLayer(layerInfo, features);

              case 25:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 27:
                _context.next = 29;
                return this._createRangeLayer(layerInfo, features);

              case 29:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 31:
                _context.next = 33;
                return this._createHeatLayer(layerInfo, features);

              case 33:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 35:
                _context.next = 37;
                return this._createMarkerLayer(layerInfo, features);

              case 37:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 39:
                _context.next = 41;
                return this._createRankSymbolLayer(layerInfo, features);

              case 41:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 43:
                _context.next = 45;
                return this._createMigrationLayer(layerInfo, features);

              case 45:
                layer = _context.sent;
                return _context.abrupt("break", 48);

              case 47:
                return _context.abrupt("break", 48);

              case 48:
                if (labelStyle && labelStyle.labelField && layerType !== 'DATAFLOW_POINT_TRACK') {
                  features = this._getFiterFeatures(filterCondition, features);
                  labelLayerInfo = JSON.parse(JSON.stringify(layerInfo));
                  labelLayer = this._addLabelLayer(labelLayerInfo, features);

                  this._addLayerToMap({
                    layer: _leaflet.default.layerGroup([layer, labelLayer]),
                    layerInfo: layerInfo
                  });
                } else {
                  layer && this._addLayerToMap({
                    layer: layer,
                    layerInfo: layerInfo
                  });
                }

                _context.next = 56;
                break;

              case 51:
                _context.prev = 51;
                _context.t1 = _context["catch"](0);
                console.error(_context.t1);

                this._addLayerSucceeded();

                this.fire('getlayerdatasourcefailed', {
                  error: _context.t1,
                  layer: null,
                  map: this.map
                });

              case 56:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 51]]);
      }));
    }
  }, {
    key: "_createBingLayer",
    value: function _createBingLayer(layerInfo) {
      var url = 'http://dynamic.t0.tiles.ditu.live.com/comp/ch/{quadKey}?it=G,TW,L,LA&mkt=zh-cn&og=109&cstl=w4c&ur=CN&n=z';
      _leaflet.default.TileLayer.BingLayer = _leaflet.default.TileLayer.extend({
        getTileUrl: function getTileUrl(coordinates) {
          var z = coordinates.z,
              x = coordinates.x,
              y = coordinates.y;
          var index = '';

          for (var i = z; i > 0; i--) {
            var b = 0;
            var mask = 1 << i - 1;

            if ((x & mask) !== 0) {
              b++;
            }

            if ((y & mask) !== 0) {
              b += 2;
            }

            index += b.toString();
          }

          return url.replace('{quadKey}', index);
        }
      });

      _leaflet.default.tileLayer.bingLayer = function (url, options) {
        return new _leaflet.default.TileLayer.BingLayer(url, options);
      };

      return _leaflet.default.tileLayer.bingLayer(url, {
        noWrap: true
      });
    }
  }, {
    key: "_createDynamicTiledLayer",
    value: function _createDynamicTiledLayer(layerInfo) {
      var url = layerInfo.url;

      var layer = _leaflet.default.supermap.tiledMapLayer(url, {
        noWrap: true
      });

      return layer;
    }
  }, {
    key: "_createWMSLayer",
    value: function _createWMSLayer(layerInfo) {
      var url = layerInfo.url,
          layers = layerInfo.layers;

      if (!layers || layers === 'undefined' || layers === 'null') {
        layers = '0';
      } else if (layers.length > 0) {
        layers = layers[0];
      }

      return _leaflet.default.tileLayer.wms(url, {
        layers: layers,
        format: 'image/png',
        transparent: true,
        noWrap: true
      });
    }
  }, {
    key: "_createWMTSLayer",
    value: function _createWMTSLayer(layerInfo) {
      var url = layerInfo.url,
          tileMatrixSet = layerInfo.tileMatrixSet,
          name = layerInfo.name;
      return _leaflet.default.supermap.wmtsLayer(url, {
        layer: name,
        style: 'default',
        tilematrixSet: tileMatrixSet,
        format: 'image/png',
        noWrap: true
      });
    }
  }, {
    key: "_createTiandituLayer",
    value: function _createTiandituLayer(layerInfo) {
      this.map.getZoom() < 1 && this.map.setZoom(1);
      this.map.setMinZoom(1);
      var layerType = layerInfo.layerType.split('_')[1].toLowerCase();
      var isLabel = Boolean(layerInfo.labelLayerVisible);

      var tiandituLayer = _leaflet.default.supermap.tiandituTileLayer({
        layerType: layerType,
        key: this.tiandituKey
      });

      var tiandituLabelLayer = _leaflet.default.supermap.tiandituTileLayer({
        layerType: layerType,
        isLabel: true,
        key: this.tiandituKey
      });

      var layers = [tiandituLayer];
      isLabel && layers.push(tiandituLabelLayer);
      return _leaflet.default.layerGroup(layers);
    }
  }, {
    key: "_createCLOUDLayer",
    value: function _createCLOUDLayer(layerType, url) {
      if (layerType === 'CLOUD') {
        this.map.getZoom() < 3 && this.map.setZoom(3);
        this.map.setMinZoom(3);
      }

      return _leaflet.default.supermap.cloudTileLayer(url, {
        noWrap: true
      });
    }
  }, {
    key: "_createXYZLayer",
    value: function _createXYZLayer(layerInfo, url) {
      return _leaflet.default.tileLayer(url, {
        noWrap: true
      });
    }
  }, {
    key: "_createBaiduTileLayer",
    value: function _createBaiduTileLayer() {
      this.map.getZoom() < 3 && this.map.setZoom(3);
      this.map.setMinZoom(3);
      return _leaflet.default.supermap.baiduTileLayer('', {
        noWrap: true
      });
    }
  }, {
    key: "_createUniqueLayer",
    value: function _createUniqueLayer(layerInfo, features) {
      return this._createThemeLayer('unique', layerInfo, features);
    }
  }, {
    key: "_createRangeLayer",
    value: function _createRangeLayer(layerInfo, features) {
      return this._createThemeLayer('range', layerInfo, features);
    }
  }, {
    key: "_createMarkerLayer",
    value: function _createMarkerLayer(layerInfo, features) {
      var _this6 = this;

      return new Promise(function (resolve, reject) {
        var layerGroupPromises = features && features.map(function (feature) {
          return new Promise(function (resolve, reject) {
            var geomType = feature.geometry.type.toUpperCase();
            var defaultStyle = feature.dv_v5_markerStyle;

            if (geomType === 'POINT' && defaultStyle.text) {
              geomType = 'TEXT';
            }

            var featureInfo = _this6._setFeatureInfo(feature);

            feature.properties['useStyle'] = defaultStyle;
            feature.properties['featureInfo'] = featureInfo;

            if (geomType === 'POINT' && defaultStyle.src && defaultStyle.src.indexOf('http://') === -1 && defaultStyle.src.indexOf('https://') === -1) {
              defaultStyle.src = _this6.serverUrl + defaultStyle.src;
            }

            if (geomType === 'POINT' && defaultStyle.src && defaultStyle.src.indexOf('svg') <= -1) {
              resolve(_leaflet.default.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
                icon: _leaflet.default.icon({
                  iconUrl: defaultStyle.src,
                  iconSize: [defaultStyle.imgWidth * defaultStyle.scale, defaultStyle.imgHeight * defaultStyle.scale],
                  iconAnchor: defaultStyle.anchor
                })
              }));
            }

            if (geomType === 'POINT' && defaultStyle.src && defaultStyle.src.indexOf('svg') > -1) {
              if (!_this6._svgDiv) {
                _this6._svgDiv = document.createElement('div');
                document.body.appendChild(_this6._svgDiv);
              }

              _this6._getCanvasFromSVG(defaultStyle.src, _this6._svgDiv, function (canvas) {
                resolve(_this6._getSvgLayer(canvas, defaultStyle, [feature]));
              });
            }

            if (!defaultStyle.src) {
              if (geomType === 'LINESTRING' && defaultStyle.lineCap || geomType === 'POLYGON') {
                resolve(_this6._createGeojsonLayer([feature], _this6._getVectorLayerStyle(defaultStyle)));
              } else if (geomType === 'TEXT') {
                var text = new _leaflet.default.supermap.labelThemeLayer(defaultStyle.text + '-text');
                text.style = {
                  fontSize: defaultStyle.font.split(' ')[0],
                  labelRect: true,
                  fontColor: defaultStyle.fillColor,
                  fill: true,
                  fillColor: defaultStyle.backgroundFill,
                  stroke: false
                };
                text.themeField = 'text';
                feature.properties.text = defaultStyle.text;
                var geoTextFeature = new _leaflet.default.supermap.themeFeature([feature.geometry.coordinates[1], feature.geometry.coordinates[0], defaultStyle.text], feature.properties);
                text.addFeatures([geoTextFeature]);
                resolve(text);
              } else {
                resolve(_leaflet.default.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], Object.assign({}, _this6._getVectorLayerStyle(defaultStyle))));
              }
            }
          });
        });
        layerGroupPromises && Promise.all(layerGroupPromises).then(function (layerGroup) {
          layerGroup && resolve(_leaflet.default.layerGroup(layerGroup));
        }).catch(function (error) {
          console.error(error);
        });
      });
    }
  }, {
    key: "_createRankSymbolLayer",
    value: function _createRankSymbolLayer(layerInfo, features) {
      var _this7 = this;

      var fieldName = layerInfo.themeSetting.themeField;
      var style = layerInfo.style;

      var styleSource = this._createRankStyleSource(layerInfo, features, layerInfo.featureType);

      var styleGroups = styleSource.styleGroups;
      features = this._getFiterFeatures(layerInfo.filterCondition, features);
      var radiusList = [];
      features.forEach(function (row) {
        var target = parseFloat(row.properties[fieldName]);

        if (styleGroups) {
          for (var i = 0; i < styleGroups.length; i++) {
            if (styleGroups[i].start <= target && target < styleGroups[i].end) {
              var radius = style.type === 'SYMBOL_POINT' || style.type === 'IMAGE_POINT' ? style.type === 'SYMBOL_POINT' ? styleGroups[i].radius * 2 : styleGroups[i].radius : styleGroups[i].radius;
              radiusList.push(radius);
            }
          }
        }
      }, this);

      if (style.type === 'SYMBOL_POINT') {
        return this._createSymbolLayer(layerInfo, features, radiusList);
      } else if (style.type === 'IMAGE_POINT' || style.type === 'SVG_POINT') {
        return this._createGraphicLayer(layerInfo, features, radiusList);
      } else {
        var layerGroup = [];
        features.forEach(function (feature, index) {
          var newStyle = Object.assign({}, style, {
            radius: radiusList[index]
          });
          layerGroup.push(_leaflet.default.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], _this7._getVectorLayerStyle(newStyle)));
        });
        return _leaflet.default.layerGroup(layerGroup);
      }
    }
  }, {
    key: "_createRankStyleSource",
    value: function _createRankStyleSource(parameters, features, featureType) {
      var themeSetting = parameters.themeSetting,
          themeField = themeSetting.themeField;

      var styleGroups = this._getRankStyleGroup(themeField, features, parameters, featureType);

      return styleGroups ? {
        parameters: parameters,
        styleGroups: styleGroups
      } : false;
    }
  }, {
    key: "_getRankStyleGroup",
    value: function _getRankStyleGroup(themeField, features, parameters, featureType) {
      var values = [],
          segements = [],
          style = parameters.style,
          themeSetting = parameters.themeSetting,
          segmentMethod = themeSetting.segmentMethod,
          segmentCount = themeSetting.segmentCount,
          customSettings = themeSetting.customSettings,
          minR = parameters.themeSetting.minRadius,
          maxR = parameters.themeSetting.maxRadius;
      features.forEach(function (feature) {
        var properties = feature.properties,
            value = properties[themeField];

        if (value == null || !(0, _lodash.default)(+value)) {
          return;
        }

        values.push(Number(value));
      });

      try {
        segements = SuperMap.ArrayStatistic.getArraySegments(values, segmentMethod, segmentCount);
      } catch (error) {
        console.error(error);
      }

      for (var i = 0; i < segmentCount; i++) {
        if (i in customSettings) {
          var startValue = customSettings[i]['segment']['start'],
              endValue = customSettings[i]['segment']['end'];
          startValue != null && (segements[i] = startValue);
          endValue != null && (segements[i + 1] = endValue);
        }
      }

      var styleGroup = [];

      if (segements && segements.length) {
        var len = segements.length,
            incrementR = (maxR - minR) / (len - 1),
            start,
            end,
            radius = Number(((maxR + minR) / 2).toFixed(2));

        for (var _i = 0; _i < len - 1; _i++) {
          start = Number(segements[_i].toFixed(2));
          end = Number(segements[_i + 1].toFixed(2));
          radius = start === end ? radius : minR + Math.round(incrementR * _i);
          end = _i === len - 2 ? end + 0.01 : end;
          radius = customSettings[_i] && customSettings[_i].radius ? customSettings[_i].radius : radius;
          style.radius = radius;
          styleGroup.push({
            radius: radius,
            start: start,
            end: end,
            style: style
          });
        }

        return styleGroup;
      } else {
        return false;
      }
    }
  }, {
    key: "_setFeatureInfo",
    value: function _setFeatureInfo(feature) {
      var featureInfo;
      var info = feature.dv_v5_markerInfo;

      if (info && info.dataViz_title) {
        featureInfo = info;
      } else {
        return info;
      }

      var properties = feature.properties;

      for (var key in featureInfo) {
        if (properties[key]) {
          featureInfo[key] = properties[key];
          delete properties[key];
        }
      }

      return featureInfo;
    }
  }, {
    key: "_addLabelLayer",
    value: function _addLabelLayer(layerInfo, features) {
      var labelStyle = layerInfo.labelStyle,
          layerID = layerInfo.layerID,
          featureType = layerInfo.featureType;
      var label = new _leaflet.default.supermap.labelThemeLayer(layerID + '-label');
      labelStyle.fontSize = 14;
      labelStyle.labelRect = true;
      labelStyle.fontColor = labelStyle.fill;
      labelStyle.fill = true;
      labelStyle.fillColor = '#FFFFFF';
      labelStyle.stroke = false;
      labelStyle.strokeColor = '#8B7B8B';
      label.style = labelStyle;
      label.themeField = labelStyle.labelField;

      var labelFeatures = this._convertLabelFeatures(label, features, layerInfo, featureType);

      label.addFeatures(labelFeatures);
      return label;
    }
  }, {
    key: "_createHeatLayer",
    value: function _createHeatLayer(layerInfo, features) {
      var themeSetting = layerInfo.themeSetting,
          layerID = layerInfo.layerID;
      var colors = themeSetting.colors,
          radius = themeSetting.radius,
          customSettings = themeSetting.customSettings,
          weight = themeSetting.weight;
      var heatColors = colors.slice();

      for (var i in customSettings) {
        heatColors[i] = customSettings[i];
      }

      var heatMapLayer = _leaflet.default.supermap.heatMapLayer(layerID, {
        colors: heatColors,
        map: this.map,
        radius: radius * 2,
        featureWeight: weight,
        blur: radius * 1.5
      });

      heatMapLayer.addFeatures({
        type: 'FeatureCollection',
        features: features
      });
      return heatMapLayer;
    }
  }, {
    key: "_createSymbolLayer",
    value: function _createSymbolLayer(layerInfo, features, textSize) {
      var style = layerInfo.style;
      var fillColor = style.fillColor,
          unicode = style.unicode;
      var pointToLayer;

      if (unicode) {
        var symbolStyle = JSON.parse(JSON.stringify(style));
        symbolStyle.fontColor = fillColor;
        symbolStyle.label = unicode;
        symbolStyle.fontFamily = 'supermapol-icons';

        pointToLayer = function pointToLayer(geojson, latlng) {
          textSize && (symbolStyle.fontSize = textSize[geojson.id - 1 || geojson.properties.index] + '');
          return new _leaflet.default.supermap.unicodeMarker(latlng, symbolStyle);
        };
      }

      return pointToLayer && this._createGeojsonLayer(features, null, pointToLayer);
    }
  }, {
    key: "_createGraphicLayer",
    value: function _createGraphicLayer(layerInfo, features, textSize) {
      var _this8 = this;

      return new Promise(function (resolve, reject) {
        var style = layerInfo.style;
        var type = style.type,
            imageInfo = style.imageInfo,
            radius = style.radius,
            url = style.url;
        var pointToLayer;

        if (type === 'IMAGE_POINT' && imageInfo.url) {
          var resolution = imageInfo.size.w / imageInfo.size.h;

          pointToLayer = function pointToLayer(geojson, latlng) {
            var iconSize = textSize && textSize[geojson.id - 1 || geojson.properties.index] * 2;
            return _leaflet.default.marker(latlng, {
              icon: _leaflet.default.icon({
                iconUrl: imageInfo.url,
                iconSize: textSize ? [iconSize, iconSize / resolution] : [radius * 2, radius * 2 / resolution]
              })
            });
          };
        } else if (type === 'SVG_POINT') {
          if (!_this8._svgDiv) {
            _this8._svgDiv = document.createElement('div');
            document.body.appendChild(_this8._svgDiv);
          }

          _this8._getCanvasFromSVG(url, _this8._svgDiv, function (canvas) {
            resolve(_this8._getSvgLayer(canvas, style, features, textSize));
          });
        } else {
          pointToLayer = function pointToLayer(geojson, latlng) {
            return _leaflet.default.circleMarker(latlng, _this8._getVectorLayerStyle(style));
          };
        }

        pointToLayer && resolve(_this8._createGeojsonLayer(features, null, pointToLayer));
      });
    }
  }, {
    key: "_createVectorLayer",
    value: function _createVectorLayer(layerInfo, features) {
      var style = layerInfo.style;
      return this._createGeojsonLayer(features, this._getVectorLayerStyle(style));
    }
  }, {
    key: "_createMigrationLayer",
    value: function _createMigrationLayer(layerInfo, features) {
      var properties = this._getFeatureProperties(features);

      var lineData = this._createLinesData(layerInfo, properties);

      var pointData = this._createPointsData(lineData, layerInfo, properties);

      var options = this._createOptions(layerInfo, lineData, pointData);

      var layer = _leaflet.default.supermap.echartsLayer(options);

      this.echartslayer.push(layer);
      return layer;
    }
  }, {
    key: "_createGeojsonLayer",
    value: function _createGeojsonLayer(features, style, pointToLayer) {
      return _leaflet.default.geoJSON({
        type: 'FeatureCollection',
        features: features
      }, {
        pointToLayer: pointToLayer,
        style: style
      });
    }
  }, {
    key: "_getVectorLayerStyle",
    value: function _getVectorLayerStyle(style) {
      var fillColor = style.fillColor,
          fillOpacity = style.fillOpacity,
          strokeColor = style.strokeColor,
          strokeOpacity = style.strokeOpacity,
          strokeWidth = style.strokeWidth,
          radius = style.radius,
          lineDash = style.lineDash;
      var commonStyle = {
        color: strokeColor,
        weight: strokeWidth,
        opacity: strokeOpacity,
        fillColor: fillColor,
        fillOpacity: fillOpacity
      };
      var dashArray;

      if (lineDash) {
        dashArray = this._dashStyle(lineDash, strokeWidth);
      }

      radius && (commonStyle['radius'] = radius);
      lineDash && (commonStyle['dashArray'] = dashArray);
      return commonStyle;
    }
  }, {
    key: "_addLayerSucceeded",
    value: function _addLayerSucceeded() {
      var sendMap = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

      if (sendMap) {
        this.layerAdded++;

        this._sendMapToUser(this.layerAdded, this.expectLayerLen);
      }
    }
  }, {
    key: "_addLayerToMap",
    value: function _addLayerToMap(_ref) {
      var layer = _ref.layer,
          _ref$type = _ref.type,
          type = _ref$type === void 0 ? 'overlays' : _ref$type,
          layerInfo = _ref.layerInfo,
          _ref$sendToMap = _ref.sendToMap,
          sendToMap = _ref$sendToMap === void 0 ? true : _ref$sendToMap;
      var visible = layerInfo.visible,
          layerID = layerInfo.layerID,
          name = layerInfo.name,
          index = layerInfo.index;
      sendToMap && (type = 'overlays');
      type === 'overlays' && layer.setZIndex && layer.setZIndex(index);

      if (visible === undefined || visible) {
        this.map.addLayer(layer);
      }

      !this.layers[type] && (this.layers[type] = {});
      this.layers[type][layerID || name] = layer;

      this._addLayerSucceeded(sendToMap);
    }
  }, {
    key: "_convertLabelFeatures",
    value: function _convertLabelFeatures(layer, features, layerInfo, featureType) {
      var _this9 = this;

      if (!features) {
        return [];
      }

      var themeField = layer.themeField,
          style = layer.style;
      var labelFeatures = [];
      var layerStyle = layerInfo.style;
      features.forEach(function (feature) {
        var coordinate = _this9._getLabelLngLat(featureType, feature);

        _this9._setLabelOffset(featureType, layerStyle, style);

        var properties = feature.properties;
        var geoTextFeature = new _leaflet.default.supermap.themeFeature([coordinate[1], coordinate[0], properties[themeField]], properties);
        labelFeatures.push(geoTextFeature);
      });
      return labelFeatures;
    }
  }, {
    key: "_getLabelLngLat",
    value: function _getLabelLngLat(featureType, feature) {
      var coordinate;
      var coordinates = feature.geometry.coordinates;

      if (featureType === 'POINT') {
        coordinate = coordinates;
      } else if (featureType === 'LINE') {
        var length = coordinates.length;
        coordinate = coordinates[Math.round(length / 2)];
      } else {
        coordinate = (0, _center.default)(feature).geometry.coordinates;
      }

      return coordinate;
    }
  }, {
    key: "_setLabelOffset",
    value: function _setLabelOffset(featureType, layerStyle, style) {
      if (featureType === 'POINT') {
        var pointRadius = layerStyle.pointRadius || 0;
        var strokeWidth = layerStyle.strokeWidth || 0;
        var fontSize = parseInt(layerStyle.fontSize) || 0;
        style.labelXOffset = 0;
        style.labelYOffset = layerStyle.unicode ? 20 + fontSize : 25 + (pointRadius + strokeWidth);
      } else {
        return;
      }
    }
  }, {
    key: "_getType",
    value: function _getType(layer) {
      var type;
      var isHosted = layer.dataSource && layer.dataSource.serverId || layer.layerType === 'MARKER' || layer.layerType === 'HOSTED_TILE';
      var isTile = layer.layerType === 'SUPERMAP_REST' || layer.layerType === 'TILE' || layer.layerType === 'WMS' || layer.layerType === 'WMTS';

      if (isHosted) {
        type = 'hosted';
      } else if (isTile) {
        type = 'tile';
      } else if (layer.dataSource && layer.dataSource.type === 'REST_DATA') {
        type = 'rest_data';
      } else if (layer.dataSource && layer.dataSource.type === 'REST_MAP' && layer.dataSource.url) {
        type = 'rest_map';
      } else if (layer.layerType === 'DATAFLOW_POINT_TRACK' || layer.layerType === 'DATAFLOW_HEAT') {
        type = 'dataflow';
      }

      return type;
    }
  }, {
    key: "_getUniqueStyleGroup",
    value: function _getUniqueStyleGroup(parameters, features) {
      var featureType = parameters.featureType;
      var style = parameters.style;
      var themeSetting = parameters.themeSetting;
      var fieldName = themeSetting.themeField;
      var colors = themeSetting.colors;
      Object.keys(features[0].properties).forEach(function (key) {
        key.toLocaleUpperCase() === fieldName.toLocaleUpperCase() && (fieldName = key);
      });
      var names = [];
      var customSettings = themeSetting.customSettings;

      for (var i in features) {
        var properties = features[i].properties;
        var name = properties[fieldName];
        var isSaved = false;

        for (var j in names) {
          if (names[j] === name) {
            isSaved = true;
            break;
          }
        }

        if (!isSaved) {
          names.push(name || '0');
        }
      }

      var curentColors = colors;
      curentColors = SuperMap.ColorsPickerUtil.getGradientColors(curentColors, names.length);
      var styleGroup = [];
      names.forEach(function (name, index) {
        var color = curentColors[index];

        if (name in customSettings) {
          color = customSettings[name];
        }

        if (featureType === 'LINE') {
          style.strokeColor = color;
        } else {
          style.fillColor = color;
        }

        styleGroup.push({
          style: Object.assign({}, style),
          value: name
        });
      }, this);
      return styleGroup;
    }
  }, {
    key: "_getRangeStyleGroup",
    value: function _getRangeStyleGroup(layerInfo, features) {
      var featureType = layerInfo.featureType;
      var style = layerInfo.style;
      var values = [];
      var attributes;
      var themeSetting = layerInfo.themeSetting;
      var customSettings = themeSetting.customSettings;
      var fieldName = themeSetting.themeField;
      var segmentCount = themeSetting.segmentCount;
      features.forEach(function (feature) {
        attributes = feature.properties || feature.get('Properties');

        if (attributes) {
          attributes[fieldName] && (0, _lodash.default)(+attributes[fieldName]) && values.push(parseFloat(attributes[fieldName]));
        } else if (feature.get(fieldName) && (0, _lodash.default)(+feature.get(fieldName))) {
          feature.get(fieldName) && values.push(parseFloat(feature.get(fieldName)));
        }
      }, this);
      var segements = SuperMap.ArrayStatistic.getArraySegments(values, themeSetting.segmentMethod, segmentCount);

      if (segements) {
        var itemNum = segmentCount;

        if (attributes && segements[0] === segements[attributes.length - 1]) {
          itemNum = 1;
          segements.length = 2;
        }

        for (var i = 0; i < segements.length; i++) {
          var value = segements[i];
          value = i === 0 ? Math.floor(value * 100) / 100 : Math.ceil(value * 100) / 100 + 0.1;
          segements[i] = Number(value.toFixed(2));
        }

        var curentColors = themeSetting.colors;

        for (var index = 0; index < itemNum; index++) {
          if (index in customSettings) {
            if (customSettings[index]['segment']['start']) {
              segements[index] = customSettings[index]['segment']['start'];
            }

            if (customSettings[index]['segment']['end']) {
              segements[index + 1] = customSettings[index]['segment']['end'];
            }
          }
        }

        var styleGroups = [];

        for (var _i2 = 0; _i2 < itemNum; _i2++) {
          var color = curentColors[_i2];

          if (_i2 in customSettings) {
            if (customSettings[_i2].color) {
              color = customSettings[_i2].color;
            }
          }

          if (featureType === 'LINE') {
            style.strokeColor = color;
          } else {
            style.fillColor = color;
          }

          var start = segements[_i2];
          var end = segements[_i2 + 1];
          var styleObj = JSON.parse(JSON.stringify(style));
          styleGroups.push({
            style: styleObj,
            color: color,
            start: start,
            end: end
          });
        }

        return styleGroups;
      }
    }
  }, {
    key: "_getFeaturesFromHosted",
    value: function _getFeaturesFromHosted(_ref2) {
      var layer = _ref2.layer,
          index = _ref2.index,
          len = _ref2.len,
          _taskID = _ref2._taskID;
      var dataSource = layer.dataSource,
          layerType = layer.layerType;
      var serverId = dataSource ? dataSource.serverId : layer.serverId;

      if (!serverId) {
        this._addLayer(layer, null, index);

        return;
      }

      var getDataFromIportal = layerType === 'MARKER' || dataSource && (!dataSource.accessType || dataSource.accessType === 'DIRECT');

      if (getDataFromIportal) {
        this._getDataFromIportal({
          layer: layer,
          serverId: serverId,
          _taskID: _taskID,
          len: len,
          index: index
        });
      } else {
        this._getDataFromHosted({
          layer: layer,
          serverId: serverId,
          len: len,
          index: index
        });
      }
    }
  }, {
    key: "_getDataFromHosted",
    value: function _getDataFromHosted(_ref3) {
      var _this10 = this;

      var layer = _ref3.layer,
          serverId = _ref3.serverId,
          len = _ref3.len,
          index = _ref3.index;
      var isMapService = layer.layerType === 'HOSTED_TILE';

      this._checkUploadToRelationship(serverId).then(function (result) {
        if (result && result.length > 0) {
          var datasetName = result[0].name,
              featureType = result[0].type.toUpperCase();

          _this10._getDataService(serverId, datasetName).then(function (data) {
            var dataItemServices = data.dataItemServices;

            if (dataItemServices.length === 0) {
              throw new Error();
            }

            if (isMapService) {
              var dataService = dataItemServices.filter(function (info) {
                return info && info.serviceType === 'RESTDATA';
              })[0];

              _this10._isMvt(dataService.address, datasetName).then(function (info) {
                _this10._getServiceInfoFromLayer(index, len, layer, dataItemServices, datasetName, featureType, info);
              }).catch(function () {
                _this10._getServiceInfoFromLayer(index, len, layer, dataItemServices, datasetName, featureType);
              });
            } else {
              _this10._getServiceInfoFromLayer(index, len, layer, dataItemServices, datasetName, featureType);
            }
          });
        } else {
          throw new Error();
        }
      }).catch(function (error) {
        _this10._addLayerSucceeded();

        _this10.fire('getlayerdatasourcefailed', {
          error: error,
          layer: layer,
          map: _this10.map
        });
      });
    }
  }, {
    key: "_getFeaturesFromRestData",
    value: function _getFeaturesFromRestData(_ref4) {
      var _this11 = this;

      var layer = _ref4.layer,
          index = _ref4.index,
          len = _ref4.len;
      var features;
      var dataSource = layer.dataSource;

      this._getFeatureBySQL(dataSource.url, [dataSource.dataSourseName || layer.name], function (result) {
        features = _this11._parseGeoJsonData2Feature({
          allDatas: {
            features: result.result.features.features
          },
          fileCode: layer.projection,
          featureProjection: _this11.baseProjection
        });

        _this11._addLayer(layer, features, index);
      }, function (err) {
        _this11._addLayerSucceeded();

        _this11.fire('getlayerdatasourcefailed', {
          error: err,
          layer: layer,
          map: _this11.map
        });
      });
    }
  }, {
    key: "_getFeaturesFromRestMap",
    value: function _getFeaturesFromRestMap(_ref5) {
      var _this12 = this;

      var layer = _ref5.layer,
          index = _ref5.index,
          len = _ref5.len;

      this._queryFeatureBySQL(layer.dataSource.url, layer.dataSource.layerName, function (result) {
        var recordsets = result && result.result.recordsets;
        var recordset = recordsets && recordsets[0];
        var attributes = recordset.fields;

        if (recordset && attributes) {
          var fileterAttrs = [];

          for (var i in attributes) {
            var value = attributes[i];

            if (value.indexOf('Sm') !== 0 || value === 'SmID') {
              fileterAttrs.push(value);
            }
          }

          _this12._getFeatures(fileterAttrs, layer, function (features) {
            _this12._addLayer(layer, features, index);
          }, function (err) {
            _this12._addLayerSucceeded();

            _this12.fire('getlayerdatasourcefailed', {
              error: err,
              layer: layer,
              map: _this12.map
            });
          });
        }
      }, function (err) {
        _this12._addLayerSucceeded();

        _this12.fire('getlayerdatasourcefailed', {
          error: err,
          layer: layer,
          map: _this12.map
        });
      }, 'smid=1');
    }
  }, {
    key: "_getFeaturesFromDataflow",
    value: function _getFeaturesFromDataflow(_ref6) {
      var _this13 = this;

      var layer = _ref6.layer,
          index = _ref6.index,
          len = _ref6.len;

      this._getDataflowInfo(layer, function () {
        _this13._addLayer(layer, null, index);
      }, function (e) {
        _this13._addLayerSucceeded();
      });
    }
  }, {
    key: "_getDataFromIportal",
    value: function _getDataFromIportal(_ref7) {
      var _this14 = this;

      var layer = _ref7.layer,
          serverId = _ref7.serverId,
          _taskID = _ref7._taskID,
          len = _ref7.len,
          index = _ref7.index;
      var features;
      var url = "".concat(this.serverUrl, "web/datas/").concat(serverId, "/content.json?pageSize=9999999&currentPage=1");

      if (this.accessToken) {
        url = "".concat(url, "&").concat(this.accessKey, "=").concat(this.accessToken);
      }

      SuperMap.FetchRequest.get(url, null, {
        withCredentials: this.withCredentials
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (_taskID !== _this14._taskID) {
          return;
        }

        if (data.succeed === false) {
          throw new Error(data.error);
        }

        if (data && data.type) {
          if (data.type === 'JSON' || data.type === 'GEOJSON') {
            data.content = JSON.parse(data.content.trim());
            features = _this14._formatGeoJSON(data.content);
          } else if (data.type === 'EXCEL' || data.type === 'CSV') {
            features = _this14._excelData2Feature(data.content);
          }

          _this14._addLayer(layer, features, index);
        }
      }).catch(function (error) {
        _this14._addLayerSucceeded();

        _this14.fire('getlayerdatasourcefailed', {
          error: error,
          layer: layer,
          map: _this14.map
        });
      });
    }
  }, {
    key: "_sendMapToUser",
    value: function _sendMapToUser(count, layersLen) {
      if (count === layersLen) {
        this.fire('addlayerssucceeded', {
          map: this.map,
          mapparams: this.mapParams,
          layers: this._layers
        });
      }
    }
  }, {
    key: "_getFiterFeatures",
    value: function _getFiterFeatures(filterCondition, allFeatures) {
      if (!filterCondition) {
        return allFeatures;
      }

      var condition = this._replaceFilterCharacter(filterCondition);

      var sql = 'select * from json where (' + condition + ')';
      var filterFeatures = [];

      for (var i = 0; i < allFeatures.length; i++) {
        var feature = allFeatures[i];
        var filterResult = void 0;

        try {
          filterResult = window['jsonsql'].query(sql, {
            properties: feature.properties
          });
        } catch (err) {
          continue;
        }

        if (filterResult && filterResult.length > 0) {
          filterFeatures.push(feature);
        }
      }

      return filterFeatures;
    }
  }, {
    key: "_checkUploadToRelationship",
    value: function _checkUploadToRelationship(fileId) {
      return SuperMap.FetchRequest.get("".concat(this.serverUrl, "web/datas/").concat(fileId, "/datasets.json"), null, {
        withCredentials: this.withCredentials
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        return result;
      });
    }
  }, {
    key: "_getDataService",
    value: function _getDataService(fileId, datasetName) {
      return SuperMap.FetchRequest.get("".concat(this.serverUrl, "web/datas/").concat(fileId, ".json"), null, {
        withCredentials: this.withCredentials
      }).then(function (response) {
        return response.json();
      }).then(function (result) {
        result.fileId = fileId;
        result.datasetName = datasetName;
        return result;
      });
    }
  }, {
    key: "_isMvt",
    value: function _isMvt(serviceUrl, datasetName) {
      var _this15 = this;

      return this._getDatasetsInfo(serviceUrl, datasetName).then(function (info) {
        if (info.epsgCode == _this15.baseProjection.split('EPSG:')[1]) {
          return SuperMap.FetchRequest.get("".concat(info.url, "/tilefeature.mvt")).then(function (response) {
            return response.json();
          }).then(function (result) {
            info.isMvt = result.error && result.error.code === 400;
            return info;
          }).catch(function () {
            return info;
          });
        }

        return info;
      });
    }
  }, {
    key: "_getServiceInfoFromLayer",
    value: function _getServiceInfoFromLayer(layerIndex, len, layer, dataItemServices, datasetName, featureType, info) {
      var _this16 = this;

      var isMapService = info ? !info.isMvt : layer.layerType === 'HOSTED_TILE',
          isAdded = false;
      dataItemServices.forEach(function (service, index) {
        if (isAdded) {
          return;
        }

        if (service && isMapService && service.serviceType === 'RESTMAP') {
          isAdded = true;

          _this16._getTileLayerInfo(service.address).then(function (restMaps) {
            restMaps.forEach(function (restMapInfo) {
              var bounds = restMapInfo.bounds;
              layer.layerType = 'TILE';
              layer.orginEpsgCode = _this16.baseProjection;
              layer.units = restMapInfo.coordUnit && restMapInfo.coordUnit.toLowerCase();
              layer.extent = [bounds.left, bounds.bottom, bounds.right, bounds.top];
              layer.visibleScales = restMapInfo.visibleScales;
              layer.url = restMapInfo.url;
              layer.sourceType = 'TILE';

              _this16._createBaseLayer(layer);
            });
          });
        } else if (service && !isMapService && service.serviceType === 'RESTDATA') {
          if (info && info.isMvt) {
            _this16._addLayerSucceeded();
          } else {
            isAdded = true;

            _this16._getDatasources(service.address).then(function (datasourceName) {
              layer.dataSource.dataSourceName = datasourceName + ':' + datasetName;
              layer.dataSource.url = "".concat(service.address, "/data");

              _this16._getFeatureBySQL(layer.dataSource.url, [layer.dataSource.dataSourceName || layer.name], function (result) {
                var features = _this16._parseGeoJsonData2Feature({
                  allDatas: {
                    features: result.result.features.features
                  },
                  fileCode: layer.projection,
                  featureProjection: _this16.baseProjection
                });

                _this16._addLayer(layer, features, layerIndex);
              }, function (err) {
                _this16._addLayerSucceeded();

                _this16.fire('getlayerdatasourcefailed', {
                  error: err,
                  layer: layer,
                  map: _this16.map
                });
              });
            });
          }
        }
      }, this);

      if (!isAdded) {
        this._addLayerSucceeded();

        this.fire('getlayerdatasourcefailed', {
          error: null,
          layer: layer,
          map: this.map
        });
      }
    }
  }, {
    key: "_getFeatureBySQL",
    value: function _getFeatureBySQL(url, datasetNames, _processCompleted, processFaild) {
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.FilterParameter({
        name: datasetNames.join().replace(':', '@'),
        attributeFilter: 'SMID > 0'
      });
      getFeatureBySQLParams = new SuperMap.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        datasetNames: datasetNames,
        fromIndex: 0,
        toIndex: -1,
        maxFeatures: -1,
        returnContent: true
      });
      var options = {
        eventListeners: {
          processCompleted: function processCompleted(getFeaturesEventArgs) {
            _processCompleted && _processCompleted(getFeaturesEventArgs);
          },
          processFailed: function processFailed(e) {
            processFaild && processFaild(e);
          }
        }
      };
      getFeatureBySQLService = new SuperMap.GetFeaturesBySQLService(url, options);
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    }
  }, {
    key: "_parseGeoJsonData2Feature",
    value: function _parseGeoJsonData2Feature(metaData) {
      var allFeatures = metaData.allDatas.features;
      var features = [];

      for (var i = 0, len = allFeatures.length; i < len; i++) {
        var feature = allFeatures[i];
        var coordinate = feature.geometry.coordinates;

        if (allFeatures[i].geometry.type === 'Point') {
          if (allFeatures[i].properties) {
            allFeatures[i].properties.lon = coordinate[0];
            allFeatures[i].properties.lat = coordinate[1];
          }
        }

        feature.properties['index'] = i + '';
        features.push(feature);
      }

      return features;
    }
  }, {
    key: "_queryFeatureBySQL",
    value: function _queryFeatureBySQL(url, layerName, processCompleted, processFaild, attributeFilter, fields, epsgCode, startRecord, recordLength, onlyAttribute) {
      var queryParam = new SuperMap.FilterParameter({
        name: layerName,
        attributeFilter: attributeFilter
      });

      if (fields) {
        queryParam.fields = fields;
      }

      var params = {
        queryParams: [queryParam]
      };

      if (onlyAttribute) {
        params.queryOption = SuperMap.QueryOption.ATTRIBUTE;
      }

      startRecord && (params.startRecord = startRecord);
      recordLength && (params.expectCount = recordLength);

      if (epsgCode) {
        params.prjCoordSys = {
          epsgCode: epsgCode
        };
      }

      var queryBySQLParams = new SuperMap.QueryBySQLParameters(params);

      var queryBySQLService = _leaflet.default.supermap.queryService(url);

      queryBySQLService.queryBySQL(queryBySQLParams, function (data) {
        data.type === 'processCompleted' ? processCompleted(data) : processFaild(data);
      });
    }
  }, {
    key: "_getFeatures",
    value: function _getFeatures(fields, layerInfo, resolve, reject) {
      var _this17 = this;

      var source = layerInfo.dataSource;
      var fileCode = layerInfo.projection;

      this._queryFeatureBySQL(source.url, source.layerName, function (result) {
        var recordsets = result.result.recordsets[0];
        var features = recordsets.features.features;

        var featuresObj = _this17._parseGeoJsonData2Feature({
          allDatas: {
            features: features
          },
          fileCode: fileCode,
          featureProjection: _this17.baseProjection
        });

        resolve(featuresObj);
      }, function (err) {
        reject(err);
      }, null, fields);
    }
  }, {
    key: "_getDataflowInfo",
    value: function _getDataflowInfo(layerInfo, success, faild) {
      var url = layerInfo.url,
          token;
      var requestUrl = "".concat(url, ".json");

      if (layerInfo.credential && layerInfo.credential.token) {
        token = layerInfo.credential.token;
        requestUrl += "?token=".concat(token);
      }

      SuperMap.FetchRequest.get(requestUrl).then(function (response) {
        return response.json();
      }).then(function (result) {
        if (result && result.featureMetaData) {
          layerInfo.featureType = result.featureMetaData.featureType.toUpperCase();
          layerInfo.dataSource = {
            dataTypes: {}
          };

          if (result.featureMetaData.fieldInfos && result.featureMetaData.fieldInfos.length > 0) {
            result.featureMetaData.fieldInfos.forEach(function (data) {
              var name = data.name.trim();

              if (data.type === 'TEXT') {
                layerInfo.dataSource.dataTypes[name] = 'STRING';
              } else if (['DOUBLE', 'INT', 'FLOAT', 'LONG', 'SHORT'].includes(data.type)) {
                layerInfo.dataSource.dataTypes[name] = 'NUMBER';
              } else {
                layerInfo.dataSource.dataTypes[name] = 'UNKNOWN';
              }
            });
          }

          layerInfo.wsUrl = result.urls[0].url;
          layerInfo.name = result.urls[0].url.split('iserver/services/')[1].split('/dataflow')[0];
          success();
        } else {
          faild();
        }
      }).catch(function () {
        faild();
      });
    }
  }, {
    key: "_formatGeoJSON",
    value: function _formatGeoJSON(data) {
      var features = data.features;
      features.forEach(function (row, index) {
        row.properties['index'] = index;
      });
      return features;
    }
  }, {
    key: "_excelData2Feature",
    value: function _excelData2Feature(dataContent) {
      var fieldCaptions = dataContent.colTitles;
      var xfieldIndex = -1;
      var yfieldIndex = -1;

      for (var i = 0, len = fieldCaptions.length; i < len; i++) {
        if ((0, _util.isXField)(fieldCaptions[i])) {
          xfieldIndex = i;
        }

        if ((0, _util.isYField)(fieldCaptions[i])) {
          yfieldIndex = i;
        }
      }

      var features = [];

      for (var _i3 = 0, _len = dataContent.rows.length; _i3 < _len; _i3++) {
        var row = dataContent.rows[_i3];
        var x = Number(row[xfieldIndex]);
        var y = Number(row[yfieldIndex]);
        var attributes = {};

        for (var index in dataContent.colTitles) {
          var key = dataContent.colTitles[index];
          attributes[key] = dataContent.rows[_i3][index];
        }

        attributes['index'] = _i3 + '';
        var feature = {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [x, y]
          },
          properties: attributes
        };
        features.push(feature);
      }

      return features;
    }
  }, {
    key: "_replaceFilterCharacter",
    value: function _replaceFilterCharacter(filterString) {
      filterString = filterString.replace(/=/g, '==').replace(/AND|and/g, '&&').replace(/or|OR/g, '||').replace(/<==/g, '<=').replace(/>==/g, '>=');
      return filterString;
    }
  }, {
    key: "_getDatasetsInfo",
    value: function _getDatasetsInfo(serviceUrl, datasetName) {
      return this._getDatasources(serviceUrl).then(function (datasourceName) {
        var url = "".concat(serviceUrl, "/data/datasources/").concat(datasourceName, "/datasets/").concat(datasetName);
        return SuperMap.FetchRequest.get(url).then(function (response) {
          return response.json();
        }).then(function (datasetsInfo) {
          return {
            epsgCode: datasetsInfo.datasetInfo.prjCoordSys.epsgCode,
            bounds: datasetsInfo.datasetInfo.bounds,
            datasourceName: datasourceName,
            datasetName: datasetName,
            url: url
          };
        });
      });
    }
  }, {
    key: "_getDatasources",
    value: function _getDatasources(url) {
      return SuperMap.FetchRequest.get("".concat(url, "/data/datasources.json")).then(function (response) {
        return response.json();
      }).then(function (datasource) {
        var datasourceNames = datasource.datasourceNames;
        return datasourceNames[0];
      });
    }
  }, {
    key: "_getTileLayerInfo",
    value: function _getTileLayerInfo(url) {
      var _this18 = this;

      var proxyUrl = this.serverUrl + 'apps/viewer/getUrlResource.json?url=';
      var requestUrl = proxyUrl + encodeURIComponent(url);
      var epsgCode = this.baseProjection.split('EPSG:')[1];
      return SuperMap.FetchRequest.get("".concat(requestUrl, "/maps.json"), null, {
        withCredentials: this.withCredentials
      }).then(function (response) {
        return response.json();
      }).then(function (mapInfo) {
        var promises = [];

        if (mapInfo) {
          mapInfo.forEach(function (info) {
            var promise = SuperMap.FetchRequest.get("".concat(proxyUrl).concat(info.path, ".json?prjCoordSys=").concat(JSON.stringify({
              epsgCode: epsgCode
            })), null, {
              withCredentials: _this18.withCredentials
            }).then(function (response) {
              return response.json();
            }).then(function (restMapInfo) {
              restMapInfo.url = info.path;
              return restMapInfo;
            });
            promises.push(promise);
          });
        }

        return Promise.all(promises).then(function (allRestMaps) {
          return allRestMaps;
        });
      });
    }
  }, {
    key: "_getCanvasFromSVG",
    value: function _getCanvasFromSVG(svgUrl, divDom, callBack) {
      var canvas = document.createElement('canvas');
      canvas.id = "dataviz-canvas-".concat(new Date());
      canvas.style.display = 'none';
      canvas.getContext('2d').fillStyle = 'red';
      divDom.appendChild(canvas);
      var canvgs = window.canvg ? window.canvg : _canvg.default;
      canvgs(canvas.id, svgUrl, {
        ignoreMouse: true,
        ignoreAnimation: true,
        renderCallback: function renderCallback() {
          if (canvas.width > 300 || canvas.height > 300) {
            return;
          }

          callBack(canvas);
        },
        forceRedraw: function forceRedraw() {
          return false;
        }
      });
    }
  }, {
    key: "_dashStyle",
    value: function _dashStyle(str, strokeWidth) {
      if (!str) {
        return [];
      }

      var w = strokeWidth;

      switch (str) {
        case 'solid':
          return [];

        case 'dot':
          return "1,".concat(4 * w);

        case 'dash':
          return "".concat(4 * w, ",").concat(4 * w);

        case 'dashdot':
          return "".concat(4 * w, ",").concat(4 * w, ",").concat(1 * w, ",").concat(4 * w);

        case 'longdash':
          return "".concat(8 * w, ",").concat(4 * w);

        case 'longdashdot':
          return "".concat(8 * w, ",").concat(4 * w, ",1,").concat(4 * w);

        default:
          if (!str) {
            return [];
          }

          if (SuperMap.Util.isArray(str)) {
            return str;
          }

          str = SuperMap.String.trim(str).replace(/\s+/g, ',');
          return str;
      }
    }
  }, {
    key: "_getFeatureProperties",
    value: function _getFeatureProperties(features) {
      var properties = [];

      if (features && features.length) {
        features.forEach(function (feature) {
          var property = feature.properties;
          property && properties.push(property);
        });
      }

      return properties;
    }
  }, {
    key: "_createLinesData",
    value: function _createLinesData(layerInfo, properties) {
      var _this19 = this;

      var data = [];

      if (properties && properties.length) {
        var from = layerInfo.from,
            to = layerInfo.to,
            fromCoord,
            toCoord;

        if (from.type === 'XY_FIELD' && from['xField'] && from['yField'] && to['xField'] && to['yField']) {
          properties.forEach(function (property) {
            var fromX = property[from['xField']],
                fromY = property[from['yField']],
                toX = property[to['xField']],
                toY = property[to['yField']];

            if (!fromX || !fromY || !toX || !toY) {
              return;
            }

            fromCoord = [property[from['xField']], property[from['yField']]];
            toCoord = [property[to['xField']], property[to['yField']]];
            data.push({
              coords: [fromCoord, toCoord]
            });
          });
        } else if (from.type === 'PLACE_FIELD' && from['field'] && to['field']) {
          var centerDatas = _ProvinceCenter.default.concat(_MunicipalCenter.default);

          properties.forEach(function (property) {
            var fromField = property[from['field']],
                toField = property[to['field']];
            fromCoord = centerDatas.find(function (item) {
              return _this19.isMatchAdministrativeName(item.name, fromField);
            });
            toCoord = centerDatas.find(function (item) {
              return _this19.isMatchAdministrativeName(item.name, toField);
            });

            if (!fromCoord || !toCoord) {
              return;
            }

            data.push({
              coords: [fromCoord.coord, toCoord.coord]
            });
          });
        }
      }

      return data;
    }
  }, {
    key: "_createPointsData",
    value: function _createPointsData(lineData, layerInfo, properties) {
      var data = [],
          labelSetting = layerInfo.labelSetting;

      if (!labelSetting.show || !lineData.length) {
        return data;
      }

      var fromData = [],
          toData = [];
      lineData.forEach(function (item, idx) {
        var coords = item.coords,
            fromCoord = coords[0],
            toCoord = coords[1],
            fromProperty = properties[idx][labelSetting.from],
            toProperty = properties[idx][labelSetting.to];
        var f = fromData.find(function (d) {
          return d.value[0] === fromCoord[0] && d.value[1] === fromCoord[1];
        });
        !f && fromData.push({
          name: fromProperty,
          value: fromCoord
        });
        var t = toData.find(function (d) {
          return d.value[0] === toCoord[0] && d.value[1] === toCoord[1];
        });
        !t && toData.push({
          name: toProperty,
          value: toCoord
        });
      });
      data = fromData.concat(toData);
      return data;
    }
  }, {
    key: "_createOptions",
    value: function _createOptions(layerInfo, lineData, pointData) {
      var series;

      var lineSeries = this._createLineSeries(layerInfo, lineData);

      if (pointData && pointData.length) {
        var pointSeries = this._createPointSeries(layerInfo, pointData);

        series = lineSeries.concat(pointSeries);
      } else {
        series = lineSeries.slice();
      }

      return {
        series: series
      };
    }
  }, {
    key: "_createLineSeries",
    value: function _createLineSeries(layerInfo, lineData) {
      var lineSetting = layerInfo.lineSetting;
      var animationSetting = layerInfo.animationSetting;
      var linesSeries = [{
        name: 'line-series',
        coordinateSystem: 'leaflet',
        type: 'lines',
        zlevel: 1,
        effect: {
          show: animationSetting.show,
          constantSpeed: animationSetting.constantSpeed,
          trailLength: 0,
          symbol: animationSetting.symbol,
          symbolSize: animationSetting.symbolSize
        },
        lineStyle: {
          normal: {
            color: lineSetting.color,
            type: lineSetting.type,
            width: lineSetting.width,
            opacity: lineSetting.opacity,
            curveness: lineSetting.curveness
          }
        },
        data: lineData
      }];

      if (lineData.length >= MAX_MIGRATION_ANIMATION_COUNT) {
        linesSeries[0].large = true;
        linesSeries[0].largeThreshold = 100;
        linesSeries[0].blendMode = 'lighter';
      }

      return linesSeries;
    }
  }, {
    key: "_createPointSeries",
    value: function _createPointSeries(layerInfo, pointData) {
      var lineSetting = layerInfo.lineSetting;
      var animationSetting = layerInfo.animationSetting;
      var labelSetting = layerInfo.labelSetting;
      var pointSeries = [{
        name: 'point-series',
        coordinateSystem: 'leaflet',
        zlevel: 2,
        label: {
          normal: {
            show: labelSetting.show,
            position: 'right',
            formatter: '{b}',
            color: labelSetting.color,
            fontFamily: labelSetting.fontFamily
          }
        },
        itemStyle: {
          normal: {
            color: lineSetting.color || labelSetting.color
          }
        },
        data: pointData
      }];

      if (animationSetting.show) {
        pointSeries[0].type = 'effectScatter';
        pointSeries[0].rippleEffect = {
          brushType: 'stroke'
        };
      } else {
        pointSeries[0].type = 'scatter';
      }

      return pointSeries;
    }
  }, {
    key: "isMatchAdministrativeName",
    value: function isMatchAdministrativeName(featureName, fieldName) {
      var isString = typeof fieldName === 'string' && fieldName.constructor === String;

      if (isString) {
        var shortName = featureName.substr(0, 2);

        if (shortName === '张家') {
          shortName = featureName.substr(0, 3);
        }

        return !!fieldName.match(new RegExp(shortName));
      }

      return false;
    }
  }, {
    key: "_transformFeatures",
    value: function _transformFeatures(features) {
      var _this20 = this;

      var crs = this.crs || _leaflet.default.CRS.EPSG3857;
      features && features.forEach(function (feature, index) {
        var geometryType = feature.geometry.type;
        var coordinates = feature.geometry.coordinates;

        if (geometryType === 'LineString') {
          coordinates.forEach(function (coordinate, index) {
            coordinate = _this20._latlngToCoordinate(crs.unproject(_leaflet.default.point(coordinate[0], coordinate[1])));
            coordinates[index] = coordinate;
          }, _this20);
        } else if (geometryType === 'Point') {
          coordinates = _this20._latlngToCoordinate(crs.unproject(_leaflet.default.point(coordinates[0], coordinates[1])));
          feature.geometry.coordinates = coordinates;
        } else if (geometryType === 'MultiPolygon' || geometryType === 'Polygon') {
          coordinates.forEach(function (coordinate, index) {
            var coords = geometryType === 'MultiPolygon' ? coordinate[0] : coordinate;
            coords.forEach(function (latlng, i) {
              latlng = _this20._latlngToCoordinate(crs.unproject(_leaflet.default.point(latlng[0], latlng[1])));
              coords[i] = latlng;
            });
            coordinates[index] = coordinate;
          });
        }

        features[index] = feature;
      }, this);
    }
  }, {
    key: "_latlngToCoordinate",
    value: function _latlngToCoordinate(latlng) {
      if (!latlng) {
        return null;
      }

      return [latlng.lng, latlng.lat];
    }
  }, {
    key: "_getSvgLayer",
    value: function _getSvgLayer(canvas, style, features, textSize) {
      var radius = style.radius,
          fillColor = style.fillColor,
          fillOpacity = style.fillOpacity,
          strokeColor = style.strokeColor,
          strokeOpacity = style.strokeOpacity,
          strokeWidth = style.strokeWidth;
      var context = canvas.getContext('2d');

      if (fillColor) {
        context.fillStyle = (0, _util.getColorWithOpacity)(fillColor, fillOpacity);
        context.fill();
      }

      if (strokeColor || strokeWidth) {
        context.strokeStyle = (0, _util.getColorWithOpacity)(strokeColor, strokeOpacity);
        context.lineWidth = strokeWidth;
        context.stroke();
      }

      var imgUrl = canvas.toDataURL('img/png');
      var resolution = canvas.width / canvas.height;

      var svgPointToLayer = function svgPointToLayer(geojson, latlng) {
        var iconSize = textSize && textSize[geojson.id - 1 || geojson.properties.index];
        return _leaflet.default.marker(latlng, {
          icon: _leaflet.default.icon({
            iconUrl: imgUrl,
            iconSize: textSize ? [iconSize, iconSize / resolution] : [radius, radius / resolution]
          })
        });
      };

      var svgPointLayer = this._createGeojsonLayer(features, null, svgPointToLayer);

      return svgPointLayer;
    }
  }, {
    key: "_createThemeLayer",
    value: function _createThemeLayer(type, layerInfo, features) {
      var filterCondition = layerInfo.filterCondition,
          style = layerInfo.style,
          themeSetting = layerInfo.themeSetting,
          featureType = layerInfo.featureType,
          layerID = layerInfo.layerID;
      var layerStyle = JSON.parse(JSON.stringify(style));
      featureType === 'POINT' && (layerStyle.pointRadius = style.radius);
      delete layerStyle.radius;

      if (featureType === 'LINE') {
        layerStyle.fill = false;
        layerStyle.strokeDashstyle = style.lineDash;
        delete layerStyle.lineDash;
      }

      var styleGroup;

      if (type === 'unique') {
        styleGroup = this._getUniqueStyleGroup(layerInfo, features);
      } else if (type === 'range') {
        styleGroup = this._getRangeStyleGroup(layerInfo, features);
      }

      filterCondition && (features = this._getFiterFeatures(filterCondition, features));
      var themeField = themeSetting.themeField;
      Object.keys(features[0].properties).forEach(function (key) {
        key.toLocaleUpperCase() === themeField.toLocaleUpperCase() && (themeField = key);
      });

      var layer = _leaflet.default.supermap["".concat(type, "ThemeLayer")](layerID);

      layerStyle.stroke = true;
      layer.style = layerStyle;
      layer.themeField = themeField;
      layer.styleGroups = styleGroup;
      layer.addFeatures({
        type: 'FeatureCollection',
        features: features
      });
      return layer;
    }
  }, {
    key: "_handleMapCrs",
    value: function _handleMapCrs(mapInfo) {
      var projection = mapInfo.projection,
          baseLayer = mapInfo.baseLayer,
          extent = mapInfo.extent;
      this.baseProjection = projection;

      if (projection === 'EPSG:910111' || projection === 'EPSG:910112') {
        this.baseProjection = 'EPSG:3857';
      } else if (projection === 'EPSG:910101' || projection === 'EPSG:910102') {
        this.baseProjection = 'EPSG:4326';
      }

      if (baseLayer.layerType === 'BAIDU') {
        this.crs = _leaflet.default.CRS.Baidu;
        return this.crs;
      }

      if (baseLayer.layerType.indexOf('TIANDITU') > -1) {
        this.crs = this.baseProjection === 'EPSG:3857' ? _leaflet.default.CRS.TianDiTu_Mercator : _leaflet.default.CRS.TianDiTu_WGS84;
        return this.crs;
      }

      var epsgCode = this.baseProjection.split(':')[1];

      if (parseFloat(epsgCode) <= 0 || !['4326', '3857', '3395'].includes(epsgCode)) {
        this.fire('crsnotsupport');
        throw Error('Unsupported coordinate system!');
      }

      var bounds = _leaflet.default.bounds([extent.leftBottom.x, extent.leftBottom.y], [extent.rightTop.x, extent.rightTop.y]);

      var origin = _leaflet.default.point(bounds.min.x, bounds.max.y);

      var maxResolution,
          resolutions = [];
      var resolutionExtent = [extent.leftBottom.x, extent.leftBottom.y, extent.rightTop.x, extent.rightTop.y];

      if (resolutionExtent && resolutionExtent.length === 4) {
        var width = resolutionExtent[2] - resolutionExtent[0];
        var height = resolutionExtent[3] - resolutionExtent[1];
        var maxResolution1 = width / 256;
        var maxResolution2 = height / 256;
        maxResolution = Math.max(maxResolution1, maxResolution2);

        for (var i = 0; i < 30; i++) {
          resolutions.push(maxResolution / Math.pow(2, i));
        }
      }

      this.crs = _leaflet.default.Proj.CRS("EPSG:".concat(epsgCode), {
        origin: origin,
        resolutions: resolutions,
        bounds: bounds
      });
      ;
      return this.crs;
    }
  }]);
  return WebMapViewModel;
}(_leaflet.default.Evented);

exports.default = WebMapViewModel;

/***/ }),

/***/ "0Tzf":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("5L7t");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "0Z9T":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/image/Image.vue?vue&type=template&id=452a2bc2&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-image",style:([_vm.getBackgroundStyle, _vm.getTextColorStyle])},[_c('a',{class:['sm-component-image__link', _vm.realHref ? '': 'sm-component-image__noLink'],attrs:{"href":_vm.realHref,"target":_vm.target}},[(_vm.src)?_c('div',{staticClass:"sm-component-image__content",style:([_vm.repeatStyle,_vm.imgUrl])}):_c('i',{staticClass:"sm-components-icons-x-bmp sm-component-image__defaultImg"})])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/image/Image.vue?vue&type=template&id=452a2bc2&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "17FK":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__17FK__;

/***/ }),

/***/ "1Mc+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("QmiY");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1P0Z":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "1tPa":
/***/ (function(module, exports, __webpack_require__) {

!function(e,t){ true?module.exports=t(__webpack_require__("AzSJ")):undefined}(this,function(e){return function(e){function t(i){if(n[i])return n[i].exports;var r=n[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,t),r.l=!0,r.exports}var n={};return t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,i){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:i})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="/",t(t.s=3)}([function(t,n){t.exports=e},function(e,t,n){"use strict";function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}Object.defineProperty(t,"__esModule",{value:!0});var r=n(0),o=function(e){return e&&e.__esModule?e:{default:e}}(r),s=window.videojs||o.default;"function"!=typeof Object.assign&&Object.defineProperty(Object,"assign",{value:function(e,t){if(null==e)throw new TypeError("Cannot convert undefined or null to object");for(var n=Object(e),i=1;i<arguments.length;i++){var r=arguments[i];if(null!=r)for(var o in r)Object.prototype.hasOwnProperty.call(r,o)&&(n[o]=r[o])}return n},writable:!0,configurable:!0});var a=["loadeddata","canplay","canplaythrough","play","pause","waiting","playing","ended","error"];t.default={name:"video-player",props:{start:{type:Number,default:0},crossOrigin:{type:String,default:""},playsinline:{type:Boolean,default:!1},customEventName:{type:String,default:"statechanged"},options:{type:Object,required:!0},events:{type:Array,default:function(){return[]}},globalOptions:{type:Object,default:function(){return{controls:!0,controlBar:{remainingTimeDisplay:!1,playToggle:{},progressControl:{},fullscreenToggle:{},volumeMenuButton:{inline:!1,vertical:!0}},techOrder:["html5"],plugins:{}}}},globalEvents:{type:Array,default:function(){return[]}}},data:function(){return{player:null,reseted:!0}},mounted:function(){this.player||this.initialize()},beforeDestroy:function(){this.player&&this.dispose()},methods:{initialize:function(){var e=this,t=Object.assign({},this.globalOptions,this.options);this.playsinline&&(this.$refs.video.setAttribute("playsinline",this.playsinline),this.$refs.video.setAttribute("webkit-playsinline",this.playsinline),this.$refs.video.setAttribute("x5-playsinline",this.playsinline),this.$refs.video.setAttribute("x5-video-player-type","h5"),this.$refs.video.setAttribute("x5-video-player-fullscreen",!1)),""!==this.crossOrigin&&(this.$refs.video.crossOrigin=this.crossOrigin,this.$refs.video.setAttribute("crossOrigin",this.crossOrigin));var n=function(t,n){t&&e.$emit(t,e.player),n&&e.$emit(e.customEventName,i({},t,n))};t.plugins&&delete t.plugins.__ob__;var r=this;this.player=s(this.$refs.video,t,function(){for(var e=this,t=a.concat(r.events).concat(r.globalEvents),i={},o=0;o<t.length;o++)"string"==typeof t[o]&&void 0===i[t[o]]&&function(t){i[t]=null,e.on(t,function(){n(t,!0)})}(t[o]);this.on("timeupdate",function(){n("timeupdate",this.currentTime())}),r.$emit("ready",this)})},dispose:function(e){var t=this;this.player&&this.player.dispose&&("Flash"!==this.player.techName_&&this.player.pause&&this.player.pause(),this.player.dispose(),this.player=null,this.$nextTick(function(){t.reseted=!1,t.$nextTick(function(){t.reseted=!0,t.$nextTick(function(){e&&e()})})}))}},watch:{options:{deep:!0,handler:function(e,t){var n=this;this.dispose(function(){e&&e.sources&&e.sources.length&&n.initialize()})}}}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(1),r=n.n(i);for(var o in i)["default","default"].indexOf(o)<0&&function(e){n.d(t,e,function(){return i[e]})}(o);var s=n(5),a=n(4),l=a(r.a,s.a,!1,null,null,null);t.default=l.exports},function(e,t,n){"use strict";function i(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0}),t.install=t.videoPlayer=t.videojs=void 0;var r=n(0),o=i(r),s=n(2),a=i(s),l=window.videojs||o.default,u=function(e,t){t&&(t.options&&(a.default.props.globalOptions.default=function(){return t.options}),t.events&&(a.default.props.globalEvents.default=function(){return t.events})),e.component(a.default.name,a.default)},d={videojs:l,videoPlayer:a.default,install:u};t.default=d,t.videojs=l,t.videoPlayer=a.default,t.install=u},function(e,t){e.exports=function(e,t,n,i,r,o){var s,a=e=e||{},l=typeof e.default;"object"!==l&&"function"!==l||(s=e,a=e.default);var u="function"==typeof a?a.options:a;t&&(u.render=t.render,u.staticRenderFns=t.staticRenderFns,u._compiled=!0),n&&(u.functional=!0),r&&(u._scopeId=r);var d;if(o?(d=function(e){e=e||this.$vnode&&this.$vnode.ssrContext||this.parent&&this.parent.$vnode&&this.parent.$vnode.ssrContext,e||"undefined"==typeof __VUE_SSR_CONTEXT__||(e=__VUE_SSR_CONTEXT__),i&&i.call(this,e),e&&e._registeredComponents&&e._registeredComponents.add(o)},u._ssrRegister=d):i&&(d=i),d){var c=u.functional,f=c?u.render:u.beforeCreate;c?(u._injectStyles=d,u.render=function(e,t){return d.call(t),f(e,t)}):u.beforeCreate=f?[].concat(f,d):[d]}return{esModule:s,exports:a,options:u}}},function(e,t,n){"use strict";var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return e.reseted?n("div",{staticClass:"video-player"},[n("video",{ref:"video",staticClass:"video-js"})]):e._e()},r=[],o={render:i,staticRenderFns:r};t.a=o}])});

/***/ }),

/***/ "284h":
/***/ (function(module, exports) {

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj["default"] = obj;
    return newObj;
  }
}

module.exports = _interopRequireWildcard;

/***/ }),

/***/ "2EDF":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("kokw");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2Zn6":
/***/ (function(module) {

module.exports = JSON.parse("[{\"title\":\"经典深色\",\"label\":\"dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#dd6b66\",\"#759aa0\",\"#e69d87\",\"#8dc1a9\",\"#ea7e53\"]},{\"title\":\"经典浅色\",\"label\":\"light\",\"textColor\":\"#333\",\"background\":\"rgba(255, 255, 255,0.6)\",\"colorGroup\":[\"#3fb1e3\",\"#6be6c1\",\"#626c91\",\"#a0a7e6\",\"#c4ebad\"]},{\"title\":\"绿色渐变\",\"label\":\"green-g\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#064049\",\"#165A65\",\"#1F717F\",\"#3097AB\",\"#9AEAF4\"]},{\"title\":\"蓝色渐变\",\"label\":\"blue-g\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#243BCC\",\"#1C55FF\",\"#0C75FF\",\"#338FFF\",\"#00CDF1\"]},{\"title\":\"橙红渐变\",\"label\":\"red-g\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#770000\",\"#882241\",\"#BE3144\",\"#F05940\",\"#FF8417\"]},{\"title\":\"紫色渐变\",\"label\":\"purple-g\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#2F2AA4\",\"#5432D3\",\"#8B3B86\",\"#9740B1\",\"#7B6CF5\"]},{\"title\":\"深蓝黑色\",\"label\":\"bluedark-dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#15D1F2\",\"#499BFF\",\"#2C61FF\",\"#243BCC\",\"#67A9FF\"]},{\"title\":\"墨绿黑色\",\"label\":\"green-dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#2D808D\",\"#53A8B6\",\"#7AC2D0\",\"#BCE4E9\",\"#F1FDFF\"]},{\"title\":\"浅蓝黑色\",\"label\":\"blue-dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#00E9FF\",\"#BBE7FF\",\"#6AE5C1\",\"#46ABFF\",\"#363EFF\"]},{\"title\":\"浅灰黑色\",\"label\":\"grey-dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#52606D\",\"#8894A0\",\"#BACBDB\",\"#D3DDE8\",\"#F2F5F8\"]},{\"title\":\"深紫黑色\",\"label\":\"purple-dark\",\"textColor\":\"#fff\",\"background\":\"rgba(0,0,0,0.6)\",\"colorGroup\":[\"#7B6CF6\",\"#5432D3\",\"#241F92\",\"#8B3B86\",\"#E6A5FF\"]},{\"title\":\"深蓝白色\",\"label\":\"blue-light\",\"textColor\":\"#000\",\"background\":\"rgba(255,255,255,0.6)\",\"colorGroup\":[\"#243BCC\",\"#2C61FF\",\"#499BFF\",\"#15D1F2\",\"#67A9FF\"]},{\"title\":\"深红白色\",\"label\":\"red-light\",\"textColor\":\"#000\",\"background\":\"rgba(255,255,255,0.6)\",\"colorGroup\":[\"#F05940\",\"#BE3144\",\"#882241\",\"#770000\",\"#FF8418\"]}]");

/***/ }),

/***/ "2a28":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Text_vue_vue_type_template_id_3be1953c___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("lsho");
/* harmony import */ var _Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("ekee");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Text_vue_vue_type_template_id_3be1953c___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Text_vue_vue_type_template_id_3be1953c___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "2uka":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/iframe/Iframe.vue?vue&type=template&id=37ec6382&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('iframe',{staticClass:"sm-component-iframe",attrs:{"src":_vm.src,"scrolling":"auto"}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/iframe/Iframe.vue?vue&type=template&id=37ec6382&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "3DSN":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/indicator/CountTo.vue?vue&type=template&id=53dff5c7&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',_vm._l((_vm.numDataList),function(numVale,index){return _c('div',{key:index,staticClass:"sm-component-count-to__numItem",style:([_vm.calNumBackground(numVale),_vm.numInterval,_vm.numStyle])},[_c('span',[_vm._v(_vm._s(numVale))])])}))}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/indicator/CountTo.vue?vue&type=template&id=53dff5c7&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "3N2c":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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RkDnBAgQIECAQALCIguLAAECBAgQGAWExQjonAABAgQIEEhAWGRhESBAgAABAqOAsBgBnRMgQIAAAQIJCIssLAIECBAgQGAUEBYjoHMCBAgQIEAgAWGRhUWAAAECBAiMAsJiBHROgAABAgQIJCAssrAIECBAgACBUUBYjIDOCRAgQIAAgQSERRYWAQIECBAgMAoIixHQOQECBAgQIJCAsMjCIkCAAAECBEYBYTECOidAgAABAgQSEBZZWAQIECBAgMAoICxGQOcECBAgQIBAAsIiC4sAAQIECBAYBYTFCOicAAECBAgQSEBYZGERIECAAAECo4CwGAGdEyBAgAABAgkIiywsAgQIECBAYBQQFiOgcwIECBAgQCABYZGFRYAAAQIECIwCwmIEdE6AAAECBAgkICyysAgQIECAAIFRQFiMgM4JECBAgACBBIRFFhYBAgQIECAwCgiLEdA5AQIECBAgkICwyMIiQIAAAQIERgFhMQI6J0CAAAECBBIQFllYBAgQIECAwCggLEZA5wQIECBAgEACwiILiwABAgQIEBgFhMUI6JwAAQIECBBIQFhkYREgQIAAAQKjgLAYAZ0TIECAAAECCQiLLCwCBAgQIEBgFBAWI6BzAgQIECBAIAFhkYVFgAABAgQIjALCYgR0ToAAAQIECCQgLLKwCBAgQIAAgVFAWIyAzgkQIECAAIEEhEUWFgECBAgQIDAKCIsR0DkBAgQIECCQgLDIwiJAgAABAgRGAWExAjonQIAAAQIEEhAWWVgECBAgQIDAKCAsRkDnBAgQIECAQALCIguLAAECBAgQGAWExQjonAABAgQIEEhAWGRhESBAgAABAqOAsBgBnRMgQIAAAQIJCIssLAIECBAgQGAUEBYjoHMCBAgQIEAgAWGRhUWAAAECBAiMAsJiBHROgAABAgQIJCAssrAIECBAgACBUUBYjIDOCRAgQIAAgQSERRYWAQIECBAgMAoIixHQOQECBAgQIJCAsMjCIkCAAAECBEYBYTECOidAgAABAgQSEBZZWAQIECBAgMAoICxGQOcECBAgQIBAAsIiC4sAAQIECBAYBYTFCOicAAECBAgQSEBYZGERIECAAAECo4CwGAGdEyBAgAABAgkIiywsAgQIECBAYBQQFiOgcwIECBAgQCABYZGFRYAAAQIECIwCwmIEdE6AAAECBAgkICyysAgQIECAAIFRQFiMgM4JECBAgACBBIRFFhYBAgQIECAwCgiLEdA5AQIECBAgkICwyMIiQIAAAQIERgFhMQI6J0CAAAECBBIQFllYBAgQIECAwCggLEZA5wQIECBAgEACwiILiwABAgQIEBgFhMUI6JwAAQIECBBIQFhkYREgQIAAAQKjgLAYAZ0TIECAAAECCQiLLCwCBAgQIEBgFBAWI6BzAgQIECBAIAFhkYVFgAABAgQIjALCYgR0ToAAAQIECCQgLLKwCBAgQIAAgVFAWIyAzgkQIECAAIEEhEUWFgECBAgQIDAKCIsR0DkBAgQIECCQgLDIwiJAgAABAgRGAWExAjonQIAAAQIEEhAWWVgECBAgQIDAKCAsRkDnBAgQIECAQALCIguLAAECBAgQGAWExQjonAABAgQIEEhAWGRhESBAgAABAqOAsBgBnRMgQIAAAQIJCIssLAIECBAgQGAUEBYjoHMCBAgQIEAgAWGRhUWAAAECBAiMAsJiBHROgAABAgQIJCAssrAIECBAgACBUUBYjIDOCRAgQIAAgQSERRYWAQIECBAgMAoIixHQOQECBAgQIJCAsMjCIkCAAAECBEYBYTECOidAgAABAgQSEBZZWAQIECBAgMAoICxGQOcECBAgQIBAAsIiC4sAAQIECBAYBYTFCOicAAECBAgQSEBYZGERIECAAAECo4CwGAGdEyBAgAABAgkIiywsAgQIECBAYBQQFiOgcwIECBAgQCABYZGFRYAAAQIECIwCwmIEdE6AAAECBAgkICyysAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAEC91DgeA/fs7dMgAABAv8HgYdPnv3o4uLil9c/6uzs7MfP33n0qxc/9ra/9pUPPvjcX//2r/cvD4fzw+H4z7PDW99+fv71v7z4eW89/uN7l4fLn774d/+8WeB4OP7sw/NvvHfzd7z8K8Li5T6+SoAAAQKvIXDb4XD9CDe9pqh4jQ/oE06WuBAWn4DrywQIECDwagI3BcD1q9z210TFq302r/LdrxsXwuJVlH0vAQIECLxU4LbD4fqH3fSaouKlH8WtfPF14uL44PHTq9+S8osAAQIECBAgsAv8D3+y/1UxtS72AAAAAElFTkSuQmCC"

/***/ }),

/***/ "4EGE":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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QLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX0Cw6NvpJECAAAECBIqAYFFAlAQIECBAgEBfQLDo2+kkQIAAAQIEioBgUUCUBAgQIECAQF9AsOjb6SRAgAABAgSKgGBRQJQECBAgQIBAX2Azt65Wy2X+ZL1er6b9fG273Sx3u+3y6Wm7fH4+jq8+eVq+/3AY8/qnn+6Xi2+fp+P58fYECBAgQIDA4wlMn+m3l52f9XmYn/2ZATIL3L+jOSvc54e8vvnm7dufbzebvz+dztPj1/GI6UKEi81m/b0neYon3u933zv3/sPzeP9CpifxFwECBAgQIPCQAq8+2S8zVOTnff7kZ//9G8lssLkNQMyZIa9HllhkpngZsciTq1uoyBQy/WTzJkYrtuvFKZ74eDyN86hFDRjZbyNAgAABAgQeW2AOFfku8jM/9zliEVlgygTryAZzTshrc3bI49ymNRbLu2mQ1fo6HZIXN+v1chtPsN/vFy/TIXejFhku5qGSfLyNAAECBAgQeFyB+1Axj1bM0yBTFphGK76bzZgzQ06HZJbId/4yYhGnpjUWmTyiOUYnzjHUMUzTIfejFtn04x+9WkWKGQ+H07S2wuhFqtgIECBAgMDjC0yBIkYqcgpkGqm4G62Yp0HWMfCQWSEzwxQqIkPM73wKFhk08kRcflnAudttVpfLJaY+dqvz+TLGE2SIyBGOIR+bW/7S+4BxPetvAgQIECBA4BEFcupjXlMxh4pPXz2t5tGKzAQ5DZIZId9fhorMDtPxLUtMwSKO44l2y8vleUof2+16dTyuhkwkOWrxtN/Nt6VmqFjFtMgYv3DMNRf5i59215GLfGIbAQIECBAg8JgC+Zmerzz30xKIWFeRoeKT/dMqs0Au2sxskCMVmRXmEYvMELllb9w2+uHtcrH+t3/8p3/+m+fnw3A4ns4xDXKJaY7L8/NzhIfzEAFieI6fw/NxOMXoxfl8HuPa4ni6TFMhcUeJ201T00aAAAECBB5YYL6lNBdqZqDIpRC51jJDxX63XUXgiJ9NjmDkjMU6jtcxwrHZR/D4q7/8i78dF5c/ua6xiIwxrbuIBBILNlfDZhyHYYiwsI8Riud5tGJazHk4HIfzeT3GL8uAMfNNKWUu7AkQIECAAIHHFZgDRa6pyOmPHKm4DxU5WhHX4vxt1CJHKzIJRHK4BotxWK7iWjRloFhthvU4bDJY5PZduFjHmot88vNlGM9xfInRi3xErsHIvY0AAQIECBB4XIEMEvnq85bSvDP0OvVxnf6YRyruQ0Xmipw2yQyxiCyRvbcRi9U0YpG5I+ZJxnE8xCjFNq/ftv2wWh3XOYqRUyMZMJ6i9TIFjCEWeM6PsydAgAABAgQeWWAOE/kecj1FBopcS7Hb7eKrJ64jFbs42MTpXFuR2WG6CWQZ0WG83I1YrIbVMC7HTB/xRDeT7fTFF9kSzzGeTpchplzWufYiH5DB4n5/a7IjQIAAAQIEHlAgMsB1xOK2z7UU+TYyUGQWmKc/MlREVsg7RPKmkFjMOXx/xCJO5S0jq01MjpzjjtL90y5Dw+KwPE63n8a1ZQxWxLqKWH8R+wwZw2UcL9M6jAeU85IJECBAgACB3ysw5YX4wswME5kB5n2uqcgwMY1UZNaIn816nB6eWSKSwXXEIoYdsinGMIY4cQ0X+dtilWfeUppf3RnfaRETIREqhvwT+7yeJ677a53HNgIECBAgQOAxBTJE5CvPIHHdR1zIP3E+s0Cen9ZUxGLN+1CRFzJLZM/L4s3tdrs8nU4v4WJYrpeRH8bbYEUmiuXheIy+dSSSvGvkuzBxf5xPaiNAgAABAgQeT2AOFvnK8zi3PJ6+pyLqPJWBYtrH9EccZKaI77eK77+4Ld6cvsci1nt+HVEhxy3GeIaMDdNxPOi2Xyx+/Zvf/XIKFPFX/pIIGtP+9N0tp3naRoAAAQIECDywQP4rpbllish9hojcfvbTn/zqektp3P0xLdQc4mxMf8RDM1Tk8TBePp+CRTb+X9u7d++++thjPnvz5suPnXeOAAECBAgQeDyB/KfPP/aqX79+/cXHztdz/wOOaWdXmTJgygAAAABJRU5ErkJggg=="

/***/ }),

/***/ "50+k":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _LiquidFill_vue_vue_type_template_id_27347d93___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("UYA6");
/* harmony import */ var _LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("O2Ir");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _LiquidFill_vue_vue_type_template_id_27347d93___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _LiquidFill_vue_vue_type_template_id_27347d93___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "5L7t":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

var _cssElementQueries = __webpack_require__("h9Sk");

var _timer = _interopRequireDefault(__webpack_require__("HatH"));

var _RestService = _interopRequireDefault(__webpack_require__("w4Wy"));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'SmProgress',
  mixins: [_theme.default, _timer.default],
  props: {
    percent: {
      type: [Number, String],
      required: true
    },
    type: {
      type: String,
      default: 'line'
    },
    strokeWidth: {
      type: [Number, String],
      default: 6
    },
    status: {
      type: String
    },
    strokeColor: {
      type: String
    },
    size: {
      type: [Number] // fix 其父元素宽高都很大的时候，需要传一个合适的size, 这时候不会自适应, 如需自适应则不传size

    },
    showInfo: {
      type: Boolean,
      default: true
    },
    gapDegree: {
      type: Number,
      default: 0
    },
    gapPosition: {
      type: String,
      default: 'top',
      validator: function validator(gapPosition) {
        var positionList = ['top', 'bottom', 'left', 'right'];
        return positionList.includes(gapPosition);
      }
    },
    strokeLinecap: {
      type: String,
      default: 'round',
      validator: function validator(strokeLinecap) {
        var strokeLinecapList = ['round', 'square'];
        return strokeLinecapList.includes(strokeLinecap);
      }
    },
    url: {
      type: String
    }
  },
  data: function data() {
    return {
      colorData: '',
      circleWidth: 0,
      finalPercent: this.percent
    };
  },
  computed: {
    calWidth: function calWidth() {
      if (this.size) {
        return this.size;
      }

      return this.circleWidth;
    }
  },
  watch: {
    strokeColor: function strokeColor(val) {
      this.colorData = val;
    },
    textColorsData: {
      handler: function handler() {
        if (this.progressTextNode) {
          this.progressTextNode.style.color = this.getTextColor;
        }
      }
    },
    percent: function percent(val) {
      this.finalPercent = val;
    },
    url: {
      handler: function handler(val) {
        if (val) {
          this.getData();
        } else {
          this.finalPercent = this.percent;
        }
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.colorData = this.strokeColor || this.getColor(0);
    this.$on('theme-style-changed', function () {
      _this.colorData = _this.getColor(0);
    });
    this.progressTextNode = this.$el.querySelector('.ant-progress-text');
    this.progressTextNode.style.color = this.getTextColor;
    this.resizeObsever = new _cssElementQueries.ResizeSensor(this.$el, function () {
      _this.resize();
    });
    this.restService = new _RestService.default();
    this.restService.on({
      'getdatasucceeded': this.fetchData
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.restService.remove('getdatasucceeded');
  },
  methods: {
    resize: function resize() {
      this.circleWidth = Math.min(this.$el.offsetWidth, this.$el.offsetHeight);
    },
    timing: function timing() {
      this.getData();
    },
    fetchData: function fetchData(data) {
      this.finalPercent = data.data;
    },
    getData: function getData() {
      this.restService && this.restService.getData(this.url);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "7BsA":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():undefined}(this,function(){return function(t){function e(n){if(i[n])return i[n].exports;var a=i[n]={i:n,l:!1,exports:{}};return t[n].call(a.exports,a,a.exports,e),a.l=!0,a.exports}var i={};return e.m=t,e.c=i,e.i=function(t){return t},e.d=function(t,i,n){e.o(t,i)||Object.defineProperty(t,i,{configurable:!1,enumerable:!0,get:n})},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/dist/",e(e.s=2)}([function(t,e,i){var n=i(4)(i(1),i(5),null,null);t.exports=n.exports},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(3);e.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,e,i,n){return i*(1-Math.pow(2,-10*t/n))*1024/1023+e}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,n.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,n.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,n.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,n.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var e=t-this.startTime;this.remaining=this.localDuration-e,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(e,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(e,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(e/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(e/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),e<this.localDuration?this.rAF=(0,n.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals),t+="";var e=t.split("."),i=e[0],n=e.length>1?this.decimal+e[1]:"",a=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;a.test(i);)i=i.replace(a,"$1"+this.separator+"$2");return this.prefix+i+n+this.suffix}},destroyed:function(){(0,n.cancelAnimationFrame)(this.rAF)}}},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=i(0),a=function(t){return t&&t.__esModule?t:{default:t}}(n);e.default=a.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",a.default)},function(t,e,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=0,a="webkit moz ms o".split(" "),r=void 0,o=void 0;if("undefined"==typeof window)e.requestAnimationFrame=r=function(){},e.cancelAnimationFrame=o=function(){};else{e.requestAnimationFrame=r=window.requestAnimationFrame,e.cancelAnimationFrame=o=window.cancelAnimationFrame;for(var s=void 0,u=0;u<a.length&&(!r||!o);u++)s=a[u],e.requestAnimationFrame=r=r||window[s+"RequestAnimationFrame"],e.cancelAnimationFrame=o=o||window[s+"CancelAnimationFrame"]||window[s+"CancelRequestAnimationFrame"];r&&o||(e.requestAnimationFrame=r=function(t){var e=(new Date).getTime(),i=Math.max(0,16-(e-n)),a=window.setTimeout(function(){t(e+i)},i);return n=e+i,a},e.cancelAnimationFrame=o=function(t){window.clearTimeout(t)})}e.requestAnimationFrame=r,e.cancelAnimationFrame=o},function(t,e){t.exports=function(t,e,i,n){var a,r=t=t||{},o=typeof t.default;"object"!==o&&"function"!==o||(a=t,r=t.default);var s="function"==typeof r?r.options:r;if(e&&(s.render=e.render,s.staticRenderFns=e.staticRenderFns),i&&(s._scopeId=i),n){var u=Object.create(s.computed||null);Object.keys(n).forEach(function(t){var e=n[t];u[t]=function(){return e}}),s.computed=u}return{esModule:a,exports:r,options:s}}},function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return(t._self._c||e)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])});
//# sourceMappingURL=vue-count-to.min.js.map

/***/ }),

/***/ "7W2i":
/***/ (function(module, exports, __webpack_require__) {

var setPrototypeOf = __webpack_require__("SksO");

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) setPrototypeOf(subClass, superClass);
}

module.exports = _inherits;

/***/ }),

/***/ "81VL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Iframe_vue_vue_type_template_id_37ec6382___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2uka");
/* harmony import */ var _Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("2EDF");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Iframe_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Iframe_vue_vue_type_template_id_37ec6382___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Iframe_vue_vue_type_template_id_37ec6382___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "84wO":
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"克拉玛依市\",\"coord\":[85.01486759299489,45.406422237230046]},{\"name\":\"昌吉回族自治州\",\"coord\":[88.7154624754753,44.26991024636568]},{\"name\":\"石河子市\",\"coord\":[86.0208600035924,44.239045558096805]},{\"name\":\"霍林郭勒市\",\"coord\":[114.73479243733115,44.16058374713977]},{\"name\":\"本溪市\",\"coord\":[124.64357865201586,41.177197783134275]},{\"name\":\"嘉峪关市\",\"coord\":[98.16891560537093,39.76279786284264]},{\"name\":\"莱芜市\",\"coord\":[117.65723565456207,36.27916499211527]},{\"name\":\"神农架林区\",\"coord\":[110.48296222218153,31.581260143666697]},{\"name\":\"天门市\",\"coord\":[113.00615321481195,30.64105781887143]},{\"name\":\"鄂州市\",\"coord\":[114.94764081970385,30.325634953844585]},{\"name\":\"潜江市\",\"coord\":[112.70703817700621,30.349210666019893]},{\"name\":\"仙桃市\",\"coord\":[113.34688900729822,30.315951161935402]},{\"name\":\"萍乡市\",\"coord\":[113.88072263074415,27.47193090553213]},{\"name\":\"台湾省\",\"coord\":[120.14338943402045,23.596002465926095]},{\"name\":\"东莞市\",\"coord\":[113.89443658529342,22.897826158636448]},{\"name\":\"中山市\",\"coord\":[113.37118387764659,22.501478858616522]},{\"name\":\"珠海市\",\"coord\":[113.21799258934986,22.23782602992192]},{\"name\":\"北海市\",\"coord\":[109.18248083043899,21.695773689750148]},{\"name\":\"香港\",\"coord\":[114.20689279508653,22.36016760139811]},{\"name\":\"舟山市\",\"coord\":[122.22514712841459,30.338633120695956]},{\"name\":\"克孜勒苏柯尔克孜\",\"coord\":[74.62910472637343,39.59886016069875]},{\"name\":\"喀什地区\",\"coord\":[77.19899922143753,37.85462871211595]},{\"name\":\"阿克苏地区\",\"coord\":[81.43930290016381,41.067304799230456]},{\"name\":\"和田地区\",\"coord\":[80.69780509160952,36.95287032287055]},{\"name\":\"阿里地区\",\"coord\":[82.536487505389,32.69566569631762]},{\"name\":\"日喀则地区\",\"coord\":[86.5996831353606,29.54861754814263]},{\"name\":\"那曲地区\",\"coord\":[88.32523292667608,33.20600450932715]},{\"name\":\"玉树藏族自治州\",\"coord\":[95.2107128446203,33.90320387919257]},{\"name\":\"迪庆藏族自治州\",\"coord\":[99.42465312188943,28.052797714348895]},{\"name\":\"怒江傈傈族自治州\",\"coord\":[98.85737910439825,26.98345757528851]},{\"name\":\"大理白族自治州\",\"coord\":[99.93934374816013,25.684737357453045]},{\"name\":\"德宏傣族景颇族自\",\"coord\":[98.13830877778075,24.593421919561205]},{\"name\":\"保山市\",\"coord\":[99.19031013453166,24.979380341662]},{\"name\":\"临沧市\",\"coord\":[99.62483778975081,24.058807858948214]},{\"name\":\"普洱市\",\"coord\":[100.94440267992684,23.44121660743221]},{\"name\":\"西双版纳傣族自治\",\"coord\":[100.86105801845994,21.882475641324206]},{\"name\":\"拉萨市\",\"coord\":[91.3684790613129,30.14176592960237]},{\"name\":\"山南地区\",\"coord\":[92.11665242621062,28.33000201578789]},{\"name\":\"林芝地区\",\"coord\":[94.9307847458166,29.125110156601963]},{\"name\":\"昌都地区\",\"coord\":[97.33912235873476,30.48520825551814]},{\"name\":\"丽江市\",\"coord\":[100.65713436205135,26.96190318191959]},{\"name\":\"攀枝花市\",\"coord\":[101.73355913301131,26.714486678752795]},{\"name\":\"凉山彝族自治州\",\"coord\":[102.08678551422615,27.683020519860396]},{\"name\":\"楚雄彝族自治州\",\"coord\":[101.68264761198458,25.369603845264024]},{\"name\":\"红河哈尼族彝族自\",\"coord\":[102.95101719613119,23.624860095239875]},{\"name\":\"文山壮族苗族自治\",\"coord\":[104.8708359910614,23.579587266862504]},{\"name\":\"百色市\",\"coord\":[106.69546907589859,23.98220841166522]},{\"name\":\"崇左市\",\"coord\":[107.3277087317123,22.49769755349952]},{\"name\":\"防城港市\",\"coord\":[107.88939931155171,21.94550204069006]},{\"name\":\"南宁市\",\"coord\":[108.67078983716917,23.12207641861882]},{\"name\":\"钦州市\",\"coord\":[108.8532307305186,22.157690108421384]},{\"name\":\"玉林市\",\"coord\":[110.26918466489103,22.391823643610415]},{\"name\":\"湛江市\",\"coord\":[109.93033457863683,21.086751055633457]},{\"name\":\"茂名市\",\"coord\":[110.80336192333934,22.069184739040775]},{\"name\":\"阳江市\",\"coord\":[111.70471342186183,22.108751366417575]},{\"name\":\"江门市\",\"coord\":[112.53715618649149,22.297368082806777]},{\"name\":\"广州市\",\"coord\":[113.4949302208309,23.28359314707863]},{\"name\":\"清远市\",\"coord\":[113.10957368131268,24.334444053233856]},{\"name\":\"肇庆市\",\"coord\":[112.11117530204233,23.60241158796112]},{\"name\":\"梧州市\",\"coord\":[111.01709510772797,23.518132876753846]},{\"name\":\"贺州市\",\"coord\":[111.50423061842756,24.4095096817199]},{\"name\":\"桂林市\",\"coord\":[110.44046163393094,25.353966673735407]},{\"name\":\"柳州市\",\"coord\":[109.34854449214147,24.972408051485047]},{\"name\":\"河池市\",\"coord\":[107.81191841865586,24.649291651298164]},{\"name\":\"黔东南苗族侗族自\",\"coord\":[108.39952601614591,26.429286420465576]},{\"name\":\"贵阳市\",\"coord\":[106.59784062851153,26.797907456479816]},{\"name\":\"安顺市\",\"coord\":[105.76161265300635,25.988644902171018]},{\"name\":\"黔西南布依族苗族\",\"coord\":[105.5954078788574,25.404850939549405]},{\"name\":\"曲靖市\",\"coord\":[103.9164335632742,25.697243690315265]},{\"name\":\"六盘水市\",\"coord\":[104.77723228072432,26.15402255629164]},{\"name\":\"毕节地区\",\"coord\":[105.03867422931839,27.077913968069666]},{\"name\":\"昭通市\",\"coord\":[104.29730513046874,27.62418247971078]},{\"name\":\"宜宾市\",\"coord\":[104.76748901448207,28.553501804266475]},{\"name\":\"乐山市\",\"coord\":[103.56027669102787,29.160754519210577]},{\"name\":\"自贡市\",\"coord\":[104.63272827056402,29.273152614922402]},{\"name\":\"内江市\",\"coord\":[104.82644562304716,29.61272653799929]},{\"name\":\"遵义市\",\"coord\":[106.82413636302059,28.191847588570702]},{\"name\":\"达州市\",\"coord\":[107.59704170009518,31.32138258839703]},{\"name\":\"遂宁市\",\"coord\":[105.48979445433736,30.677687821242678]},{\"name\":\"广安市\",\"coord\":[106.56708164098042,30.43500706741521]},{\"name\":\"泸州市\",\"coord\":[105.42591761727707,28.50277238478137]},{\"name\":\"资阳市\",\"coord\":[104.97995126874034,30.154251886139654]},{\"name\":\"雅安市\",\"coord\":[102.69931299964517,29.892630706195035]},{\"name\":\"眉山市\",\"coord\":[104.07052881858888,29.894202166560405]},{\"name\":\"甘孜藏族自治州\",\"coord\":[100.50721042614238,30.975216556269658]},{\"name\":\"果洛藏族自治州\",\"coord\":[99.30775565051923,34.03539865224808]},{\"name\":\"海南藏族自治州\",\"coord\":[100.39969108016373,35.90048272566899]},{\"name\":\"黄南藏族自治州\",\"coord\":[101.5360706381689,35.10286360841902]},{\"name\":\"赣南藏族自治州\",\"coord\":[102.97083885806067,34.326752803339026]},{\"name\":\"陇南市\",\"coord\":[105.24780098912132,33.57031117443431]},{\"name\":\"天水市\",\"coord\":[105.53503634660417,34.62320421368087]},{\"name\":\"定西市\",\"coord\":[104.58787768541339,35.08900966621695]},{\"name\":\"临夏回族自治州\",\"coord\":[103.2612870434902,35.591577124455235]},{\"name\":\"西宁市\",\"coord\":[101.57680657999033,36.84800271717157]},{\"name\":\"海东地区\",\"coord\":[102.30909850729282,36.287400615025646]},{\"name\":\"海北藏族自治州\",\"coord\":[100.27122484450717,37.892557516083826]},{\"name\":\"金昌市\",\"coord\":[102.02244049169511,38.497330414886164]},{\"name\":\"酒泉市\",\"coord\":[95.94486678270127,40.56891536586272]},{\"name\":\"海西蒙古族藏族自\",\"coord\":[94.67143298050689,36.022725148503724]},{\"name\":\"巴音郭楞蒙古自治\",\"coord\":[88.18116214759745,39.556478810319916]},{\"name\":\"哈密地区\",\"coord\":[93.84302392518026,42.95015211178875]},{\"name\":\"叶鲁番地区\",\"coord\":[89.82035217277885,42.399368632283505]},{\"name\":\"乌鲁木齐市\",\"coord\":[88.00048109561487,43.549986370786]},{\"name\":\"阿勒泰地区\",\"coord\":[88.11213933257655,47.05593413019629]},{\"name\":\"博尔塔拉蒙古自治\",\"coord\":[82.26402238163408,44.671135542630864]},{\"name\":\"伊犁哈萨克自治州\",\"coord\":[82.80778717477179,43.53783381365267]},{\"name\":\"阿拉善盟\",\"coord\":[103.29923966842289,40.10955801781495]},{\"name\":\"武威市\",\"coord\":[102.73362058791429,37.94211141321436]},{\"name\":\"兰州市\",\"coord\":[103.73793563506032,36.27379827886003]},{\"name\":\"中卫市\",\"coord\":[105.6943786030716,37.20654236148948]},{\"name\":\"银川市\",\"coord\":[106.20022174140034,38.52103167597483]},{\"name\":\"石嘴山市\",\"coord\":[106.41544011793628,38.84054137571417]},{\"name\":\"乌海市\",\"coord\":[106.8984175998405,39.54616572239788]},{\"name\":\"鄂尔多斯市\",\"coord\":[108.43285571424619,39.24036799350715]},{\"name\":\"巴彦淖尔市\",\"coord\":[107.45840392808307,41.30159860424196]},{\"name\":\"包头市\",\"coord\":[110.46472193224272,41.48017783644221]},{\"name\":\"呼和浩特市\",\"coord\":[111.48365173603975,40.498363056149884]},{\"name\":\"乌兰察布市\",\"coord\":[112.61568977597707,41.75789561273154]},{\"name\":\"大同市\",\"coord\":[113.7107192749083,39.898956799744184]},{\"name\":\"朔州市\",\"coord\":[112.65428748167508,39.681772914701924]},{\"name\":\"忻州市\",\"coord\":[112.36127575589583,38.88990233614568]},{\"name\":\"榆林市\",\"coord\":[109.68473112169593,38.19921027134876]},{\"name\":\"延安市\",\"coord\":[109.52425222161318,36.406522726136814]},{\"name\":\"庆阳市\",\"coord\":[107.73052193155061,36.183821532624464]},{\"name\":\"固原市\",\"coord\":[106.20191575442442,36.11634909496382]},{\"name\":\"白银市\",\"coord\":[104.68634478137065,36.51582865625868]},{\"name\":\"宝鸡市\",\"coord\":[107.33534779230747,34.3387216485855]},{\"name\":\"汉中市\",\"coord\":[107.03534754266246,33.00142998064871]},{\"name\":\"广元市\",\"coord\":[105.92928137563939,32.21872447205537]},{\"name\":\"巴中市\",\"coord\":[107.03422410306194,31.99874720836291]},{\"name\":\"南充市\",\"coord\":[106.32964805032347,31.156657700184095]},{\"name\":\"绵阳市\",\"coord\":[104.58949560201106,31.88628780630976]},{\"name\":\"德阳市\",\"coord\":[104.41542984932845,31.110558133718676]},{\"name\":\"成都市\",\"coord\":[103.8852290010473,30.777258040348634]},{\"name\":\"阿坝藏族羌族自治\",\"coord\":[102.26209319552814,32.45725845387284]},{\"name\":\"安康市\",\"coord\":[109.14236501848015,32.77467694678074]},{\"name\":\"十堰市\",\"coord\":[110.39934083416314,32.376209039347906]},{\"name\":\"襄阳市\",\"coord\":[111.97539147094662,31.93399822417465]},{\"name\":\"宜昌市\",\"coord\":[111.22204852395754,30.772457669035354]},{\"name\":\"恩施市\",\"coord\":[109.42158366502872,30.260366574390105]},{\"name\":\"张家界市\",\"coord\":[110.59760006538717,29.330107409240718]},{\"name\":\"吉首市\",\"coord\":[109.72176899848378,28.681903937242495]},{\"name\":\"铜仁地区\",\"coord\":[108.54247523485463,28.11736237519646]},{\"name\":\"重庆市\",\"coord\":[107.86007108564992,30.186253395053196]},{\"name\":\"怀化市\",\"coord\":[109.94325166787243,27.43919084801186]},{\"name\":\"益阳市\",\"coord\":[112.43060358108062,28.75127294553697]},{\"name\":\"娄底市\",\"coord\":[111.41891416951897,27.696312460064604]},{\"name\":\"常德市\",\"coord\":[111.72571610131646,29.27189463838195]},{\"name\":\"荆州市\",\"coord\":[112.65896596965268,30.05161542755362]},{\"name\":\"荆门市\",\"coord\":[112.6586855902184,31.01267124474617]},{\"name\":\"岳阳市\",\"coord\":[113.2595036144316,29.106247116930163]},{\"name\":\"长沙市\",\"coord\":[113.15415586456598,28.222934680488425]},{\"name\":\"湘潭市\",\"coord\":[112.51092596317824,27.69881544105668]},{\"name\":\"株州市\",\"coord\":[113.49665538546823,27.03993794610501]},{\"name\":\"衡阳市\",\"coord\":[112.48849636578527,26.783613569970782]},{\"name\":\"邵阳市\",\"coord\":[110.6723832117475,26.81652287086792]},{\"name\":\"永州市\",\"coord\":[111.8565364154186,25.768488267811968]},{\"name\":\"韶关市\",\"coord\":[113.53420325850979,24.69848878771937]},{\"name\":\"惠州市\",\"coord\":[114.32029589634925,23.25504544231892]},{\"name\":\"佛山市\",\"coord\":[112.95925897403649,23.10116677189257]},{\"name\":\"云浮市\",\"coord\":[111.78042514904234,22.840400494105687]},{\"name\":\"深圳市\",\"coord\":[114.13138648919008,22.649563063468342]},{\"name\":\"汕尾市\",\"coord\":[115.57412892884373,23.06989642104901]},{\"name\":\"河源市\",\"coord\":[114.89746229844398,23.97971937124767]},{\"name\":\"揭阳市\",\"coord\":[116.04290004239446,23.304802704715357]},{\"name\":\"汕头市\",\"coord\":[116.7008461897183,23.35898625947344]},{\"name\":\"潮州市\",\"coord\":[116.75405548481658,23.854381508863064]},{\"name\":\"梅州市\",\"coord\":[116.13719397345734,24.15633544812716]},{\"name\":\"漳州市\",\"coord\":[117.38279760543345,24.41111215459575]},{\"name\":\"厦门市\",\"coord\":[118.04275971554665,24.675908246507944]},{\"name\":\"龙岩市\",\"coord\":[116.69341144552507,25.20284542644492]},{\"name\":\"泉州市\",\"coord\":[118.12035864630246,25.22984144365049]},{\"name\":\"莆田市\",\"coord\":[118.82439690138142,25.439653480972687]},{\"name\":\"福州市\",\"coord\":[119.1608285845262,25.99117532466728]},{\"name\":\"三明市\",\"coord\":[117.51188176216434,26.318292906961602]},{\"name\":\"南平市\",\"coord\":[118.16153136678187,27.306303151805437]},{\"name\":\"抚州市\",\"coord\":[116.3455359885574,27.487043655935366]},{\"name\":\"鹰潭市\",\"coord\":[117.01082360702333,28.241253742969946]},{\"name\":\"吉安市\",\"coord\":[114.91377151807418,26.957486660664525]},{\"name\":\"赣州市\",\"coord\":[115.046455717572,25.81565075681663]},{\"name\":\"郴州市\",\"coord\":[113.1544526703492,25.871927095452524]},{\"name\":\"新余市\",\"coord\":[114.94161795877827,27.79044654578371]},{\"name\":\"宜春市\",\"coord\":[115.04574494880995,28.306428044943356]},{\"name\":\"南昌市\",\"coord\":[115.9963824234495,28.664803351584705]},{\"name\":\"九江市\",\"coord\":[115.53225905704193,29.362905920276297]},{\"name\":\"上饶市\",\"coord\":[117.8595355766598,28.765755150094634]},{\"name\":\"景德镇市\",\"coord\":[117.25387030721845,29.33426823662448]},{\"name\":\"黄山市\",\"coord\":[117.85476357809696,29.969632034273722]},{\"name\":\"池州市\",\"coord\":[117.34517113140791,30.208089337922335]},{\"name\":\"铜陵市\",\"coord\":[117.93160431300694,30.926442655001676]},{\"name\":\"安庆市\",\"coord\":[116.54307680610799,30.524265461641296]},{\"name\":\"黄石市\",\"coord\":[115.02354597728443,29.924060229331015]},{\"name\":\"咸宁市\",\"coord\":[114.26967602231792,29.652174021136048]},{\"name\":\"黄冈市\",\"coord\":[115.2859016705373,30.65856897065683]},{\"name\":\"武汉市\",\"coord\":[114.34552076948799,30.68836237966767]},{\"name\":\"随州市\",\"coord\":[113.3850627838818,31.87891659924412]},{\"name\":\"信阳市\",\"coord\":[114.81374730587638,32.0309685135914]},{\"name\":\"驻马店市\",\"coord\":[114.07756451509235,32.896720987266114]},{\"name\":\"商洛市\",\"coord\":[109.82044421310393,33.77403373563189]},{\"name\":\"西安市\",\"coord\":[109.11839808451401,34.225257215515896]},{\"name\":\"渭南市\",\"coord\":[109.75732444226935,35.025913644359306]},{\"name\":\"铜川市\",\"coord\":[108.98695328111377,35.19235092947735]},{\"name\":\"咸阳市\",\"coord\":[108.36398776446165,34.84311348287181]},{\"name\":\"三门峡市\",\"coord\":[110.80049688104964,34.31818709571671]},{\"name\":\"运城市\",\"coord\":[111.1736679525165,35.19010372283576]},{\"name\":\"洛阳市\",\"coord\":[111.87577573098216,34.33379926109848]},{\"name\":\"平顶山市\",\"coord\":[112.80931281928427,33.759895800153096]},{\"name\":\"漯河市\",\"coord\":[113.83505724178012,33.70034266174508]},{\"name\":\"许昌市\",\"coord\":[113.78762484088509,34.051835688452435]},{\"name\":\"郑州市\",\"coord\":[113.49619951867594,34.61181797865449]},{\"name\":\"焦作市\",\"coord\":[113.13404280173008,35.134167097471625]},{\"name\":\"晋城市\",\"coord\":[112.7495732073233,35.63186423091449]},{\"name\":\"长治市\",\"coord\":[112.85900842873183,36.45872910742828]},{\"name\":\"临汾市\",\"coord\":[111.49379787924448,36.22810800777857]},{\"name\":\"太原市\",\"coord\":[112.15628804033796,37.91704444063036]},{\"name\":\"吕梁市\",\"coord\":[111.31901105774872,37.712740463356496]},{\"name\":\"晋中市\",\"coord\":[113.08199599739676,37.36532613794343]},{\"name\":\"邯郸市\",\"coord\":[114.41824047234618,36.530119932543315]},{\"name\":\"安阳市\",\"coord\":[113.88883283163116,35.7797611183252]},{\"name\":\"鹤壁市\",\"coord\":[114.3654094911545,35.75770487428472]},{\"name\":\"新乡市\",\"coord\":[113.9184107718167,35.348471214026716]},{\"name\":\"开封市\",\"coord\":[114.52801677500626,34.61371216679872]},{\"name\":\"周口市\",\"coord\":[114.88509782391864,33.69999759722657]},{\"name\":\"阜阳市\",\"coord\":[115.44595951398213,32.98060371610532]},{\"name\":\"淮南市\",\"coord\":[116.68941991880993,32.79972275772595]},{\"name\":\"蚌埠市\",\"coord\":[117.38594715783302,33.106729536033896]},{\"name\":\"淮北市\",\"coord\":[116.69651711889378,33.69527529383458]},{\"name\":\"宿州市\",\"coord\":[117.30175405886838,33.943330421260015]},{\"name\":\"亳州市\",\"coord\":[116.12410804185097,33.46769392946132]},{\"name\":\"商丘市\",\"coord\":[115.59575176872548,34.28339840831147]},{\"name\":\"菏泽市\",\"coord\":[115.53631974831816,35.197319393220624]},{\"name\":\"濮阳市\",\"coord\":[115.3070485514902,35.775883510964334]},{\"name\":\"聊城市\",\"coord\":[115.8870069012884,36.40529594548765]},{\"name\":\"邢台市\",\"coord\":[114.74259008644859,37.251396750084155]},{\"name\":\"石家庄市\",\"coord\":[114.56923838363613,38.13141710980106]},{\"name\":\"阳泉市\",\"coord\":[113.39216149668508,38.09075470547468]},{\"name\":\"保定市\",\"coord\":[115.261524468934,39.09118520781398]},{\"name\":\"衡水市\",\"coord\":[115.8182936677897,37.715661598187154]},{\"name\":\"德州市\",\"coord\":[116.4582273790399,37.19372347888644]},{\"name\":\"沧州市\",\"coord\":[116.76192710911863,38.20240042039232]},{\"name\":\"廊坊市\",\"coord\":[116.50410772133856,39.27896741763884]},{\"name\":\"天津市\",\"coord\":[117.31988934444873,39.37154482470619]},{\"name\":\"北京市\",\"coord\":[116.59734730757869,40.237112944270976]},{\"name\":\"张家口市\",\"coord\":[115.1823606483226,40.83732566607167]},{\"name\":\"唐山市\",\"coord\":[117.8693184261954,39.71862889477249]},{\"name\":\"秦皇岛市\",\"coord\":[119.30467355367742,39.990574652162564]},{\"name\":\"承德市\",\"coord\":[117.16275671911026,41.36623845548547]},{\"name\":\"葫芦岛市\",\"coord\":[119.9342336210531,40.5628822626519]},{\"name\":\"朝阳市\",\"coord\":[120.11853493535794,41.471852354885755]},{\"name\":\"赤峰市\",\"coord\":[118.50943546234379,43.25452976059767]},{\"name\":\"锦州市\",\"coord\":[121.5167549323861,41.45933087433065]},{\"name\":\"营口市\",\"coord\":[122.58571915054674,40.42093503997384]},{\"name\":\"丹东市\",\"coord\":[124.33549382902183,40.46369290272115]},{\"name\":\"辽阳市\",\"coord\":[123.34064798039414,41.152331397771356]},{\"name\":\"盘锦市\",\"coord\":[122.06718005354679,41.05573599862555]},{\"name\":\"阜新市\",\"coord\":[121.93889757908204,42.27641773244204]},{\"name\":\"鞍山市\",\"coord\":[122.78904432242356,40.77781183142038]},{\"name\":\"沈阳市\",\"coord\":[122.99508899709724,42.1162195010079]},{\"name\":\"铁岭市\",\"coord\":[124.23100515588399,42.72666083611828]},{\"name\":\"扶顺市\",\"coord\":[124.46027188217573,41.82955407638859]},{\"name\":\"通辽市\",\"coord\":[122.0729370657937,43.90889130864869]},{\"name\":\"兴安盟\",\"coord\":[120.79456431092532,45.92003249442161]},{\"name\":\"白城市\",\"coord\":[123.10619907715235,45.25475749267784]},{\"name\":\"齐齐哈尔市\",\"coord\":[124.5462214659102,47.55395009317394]},{\"name\":\"大兴安岭地区\",\"coord\":[124.50992855161529,52.18438447846694]},{\"name\":\"黑河市\",\"coord\":[127.14721400335922,49.25080134026901]},{\"name\":\"大庆市\",\"coord\":[124.40329830095243,46.401048760966745]},{\"name\":\"绥化市\",\"coord\":[126.5214484055605,46.76992452194825]},{\"name\":\"松原市\",\"coord\":[124.21244334807682,44.75779381338502]},{\"name\":\"四平市\",\"coord\":[124.27839350328821,43.52139065090318]},{\"name\":\"通化市\",\"coord\":[125.67392830706305,41.91771808663852]},{\"name\":\"辽源市\",\"coord\":[125.33529527643432,42.758340204944986]},{\"name\":\"吉林市\",\"coord\":[126.83350281902375,43.60730120049175]},{\"name\":\"长春市\",\"coord\":[125.53597875970374,44.24624314701737]},{\"name\":\"白山市\",\"coord\":[127.16780160322108,42.093893880305075]},{\"name\":\"哈尔滨市\",\"coord\":[127.39125008786029,45.36200668820575]},{\"name\":\"鹤岗市\",\"coord\":[130.4703811258197,47.66520688940109]},{\"name\":\"伊春市\",\"coord\":[128.91240831703635,47.93833794565277]},{\"name\":\"七台河市\",\"coord\":[131.2677920224311,45.945099776108584]},{\"name\":\"鸡西市\",\"coord\":[132.38059153660274,45.722934218318535]},{\"name\":\"双鸭山市\",\"coord\":[132.3184817002743,46.65813679030265]},{\"name\":\"佳木斯市\",\"coord\":[132.26174446608726,47.17569713691394]},{\"name\":\"呼伦贝尔市\",\"coord\":[122.3210739998419,50.18176996070858]},{\"name\":\"孝感市\",\"coord\":[113.83749892135485,31.11757234692128]},{\"name\":\"贵港市\",\"coord\":[110.07354588052804,23.380735604767374]},{\"name\":\"黔南布依族苗族自\",\"coord\":[107.30931767543106,26.2976919432269]},{\"name\":\"宁德市\",\"coord\":[119.52482556634342,27.013151692716413]},{\"name\":\"温州市\",\"coord\":[120.30037042732202,27.8699145504001]},{\"name\":\"台州市\",\"coord\":[120.88886782713843,28.670799172772313]},{\"name\":\"丽水市\",\"coord\":[119.56796851966463,28.170268394477755]},{\"name\":\"衢州市\",\"coord\":[118.79479802644406,28.865874397158763]},{\"name\":\"金华市\",\"coord\":[119.99381920686633,29.093455548185744]},{\"name\":\"绍兴市\",\"coord\":[120.46546691682343,29.69382513836818]},{\"name\":\"宁波市\",\"coord\":[121.42142987830871,29.70001162878972]},{\"name\":\"杭州市\",\"coord\":[119.4405685790891,29.87218307296989]},{\"name\":\"宣城市\",\"coord\":[118.68748382914703,30.628143499626418]},{\"name\":\"湖州市\",\"coord\":[119.98261306633574,30.7945175862809]},{\"name\":\"嘉兴市\",\"coord\":[120.83889215988998,30.67538495499343]},{\"name\":\"上海市\",\"coord\":[121.37534147322967,31.25628247908459]},{\"name\":\"苏州市\",\"coord\":[120.6906182622391,31.381280695137775]},{\"name\":\"无锡市\",\"coord\":[120.32182300914366,31.54113306724517]},{\"name\":\"常州市\",\"coord\":[119.61953292830165,31.611878565375576]},{\"name\":\"南京市\",\"coord\":[118.71890548838064,31.910863187910323]},{\"name\":\"镇江市\",\"coord\":[119.42349332902813,31.97942313430778]},{\"name\":\"合肥市\",\"coord\":[117.30651975617157,31.79407863049138]},{\"name\":\"六安市\",\"coord\":[116.24668220575353,31.820846193819513]},{\"name\":\"滁州市\",\"coord\":[117.88422385307969,32.51792621904418]},{\"name\":\"泰州市\",\"coord\":[120.03124303305091,32.56503102346783]},{\"name\":\"南通市\",\"coord\":[120.85599446760912,32.18496706099728]},{\"name\":\"盐城市\",\"coord\":[120.01812490612667,33.54219948734023]},{\"name\":\"淮安市\",\"coord\":[119.0749424205415,33.39203631772854]},{\"name\":\"宿迁市\",\"coord\":[118.45404943216346,33.666258719120265]},{\"name\":\"徐州市\",\"coord\":[117.77482249295966,34.30847766157078]},{\"name\":\"济宁市\",\"coord\":[116.74147276546373,35.27488504351119]},{\"name\":\"枣庄市\",\"coord\":[117.43359942491492,34.884162021736]},{\"name\":\"连云港市\",\"coord\":[119.01553213785074,34.54316517587849]},{\"name\":\"临沂市\",\"coord\":[118.31478835349617,35.28173079028279]},{\"name\":\"日照市\",\"coord\":[119.14265350444272,35.54479073199592]},{\"name\":\"青岛市\",\"coord\":[120.27779044405756,36.3464117375903]},{\"name\":\"威海市\",\"coord\":[122.12963327195605,37.13879077904251]},{\"name\":\"烟台市\",\"coord\":[120.7689567423966,37.19772002195597]},{\"name\":\"潍坊市\",\"coord\":[119.02178548592039,36.49292234053931]},{\"name\":\"淄博市\",\"coord\":[117.92936024367185,36.60871347163638]},{\"name\":\"泰安市\",\"coord\":[116.93810893944303,36.0423330118612]},{\"name\":\"济南市\",\"coord\":[117.34560282551296,36.769574973846304]},{\"name\":\"东营市\",\"coord\":[118.4915054457184,37.52194690335787]},{\"name\":\"滨州市\",\"coord\":[117.67610299757533,37.4439597758601]},{\"name\":\"昆明市\",\"coord\":[102.93100245594789,25.481300763922075]},{\"name\":\"玉溪市\",\"coord\":[102.23080854291823,24.156168324611663]},{\"name\":\"塔城地区\",\"coord\":[83.60908162840168,45.3721852373893]},{\"name\":\"张掖市\",\"coord\":[100.47710030600572,38.704239320458385]},{\"name\":\"南阳市\",\"coord\":[112.1400670951149,33.03033276715801]},{\"name\":\"扬州市\",\"coord\":[119.48949608990988,32.80956776339646]},{\"name\":\"延边朝鲜族自治州\",\"coord\":[129.3577692895626,43.24968794080283]},{\"name\":\"牡丹江市\",\"coord\":[129.87240796405672,44.7073040108322]},{\"name\":\"澳门\",\"coord\":[113.56289691515346,22.14602596262204]},{\"name\":\"吴忠市\",\"coord\":[106.76894508116403,37.72566765880316]},{\"name\":\"来宾市\",\"coord\":[109.25592217010114,23.86346274681084]},{\"name\":\"平凉市\",\"coord\":[107.0708132782897,35.30329631658711]},{\"name\":\"马鞍山市\",\"coord\":[118.27245878467022,31.657727937739004]},{\"name\":\"芜湖市\",\"coord\":[118.32992684415504,31.081688223101658]},{\"name\":\"澄迈县\",\"coord\":[110.04198076060266,19.694955078668105]},{\"name\":\"保亭黎族苗族自治\",\"coord\":[109.6055304964257,18.6101488675304]},{\"name\":\"乐东黎族自治县\",\"coord\":[109.04051999525574,18.643137437909203]},{\"name\":\"儋州市\",\"coord\":[109.3431358337404,19.550974957403195]},{\"name\":\"定安县\",\"coord\":[110.38744429685676,19.47557074114284]},{\"name\":\"屯昌县\",\"coord\":[110.00574767630334,19.367175093044388]},{\"name\":\"白沙黎族自治县\",\"coord\":[109.36860737761768,19.214416393082217]},{\"name\":\"琼中黎族苗族自治\",\"coord\":[109.86691465937548,19.073671135862682]},{\"name\":\"东方市\",\"coord\":[108.86903802405428,19.017352815445214]},{\"name\":\"昌江黎族自治县\",\"coord\":[108.9686431884767,19.182594167127824]},{\"name\":\"海口市\",\"coord\":[110.420654296875,19.806565564640795]},{\"name\":\"济源市\",\"coord\":[112.38051465474433,35.07958362422394]},{\"name\":\"五指山市\",\"coord\":[109.53595187364496,18.832908264613966]},{\"name\":\"大连市\",\"coord\":[121.96662235866603,39.444150542439914]},{\"name\":\"文昌市三沙市\",\"coord\":[110.81828537536748,19.756501444162936]},{\"name\":\"三亚市\",\"coord\":[109.38424600793707,18.39186315877128]},{\"name\":\"万宁市\",\"coord\":[110.28485046979574,18.860240588635115]},{\"name\":\"陵水黎族自治县\",\"coord\":[109.95577603229562,18.594712684620465]},{\"name\":\"临高县\",\"coord\":[109.71915395436967,19.79420403032508]},{\"name\":\"琼海市\",\"coord\":[110.41650700703043,19.22315873149372]}]");

/***/ }),

/***/ "8HGC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Icon_vue_vue_type_template_id_3522372a___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("m5z/");
/* harmony import */ var _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("i7K5");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Icon_vue_vue_type_template_id_3522372a___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Icon_vue_vue_type_template_id_3522372a___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8Q8H":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

var _timer = _interopRequireDefault(__webpack_require__("HatH"));

var _RestService = _interopRequireDefault(__webpack_require__("w4Wy"));

var _CountTo = _interopRequireDefault(__webpack_require__("C07L"));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = {
  name: 'SmIndicator',
  components: {
    countTo: _CountTo.default
  },
  mixins: [_theme.default, _timer.default],
  props: {
    title: {
      type: String,
      default: function _default() {
        return this.$t('indicator.title');
      }
    },
    unit: {
      type: String,
      default: function _default() {
        return this.$t('indicator.unit');
      }
    },
    indicatorColor: {
      type: String
    },
    fontSize: {
      type: [String, Number]
    },
    fontWeight: {
      type: [String, Number],
      default: 'border'
    },
    num: {
      type: [Number, String],
      default: 0
    },
    url: {
      type: String
    },
    animated: {
      type: Boolean,
      default: false
    },
    duration: {
      type: [Number, String],
      default: 1000
    },
    decimals: {
      type: Number,
      default: -1
    },
    mode: {
      type: String,
      default: 'vertical',
      validator: function validator(val) {
        return ['vertical', 'horizontal'];
      }
    },
    separator: {
      type: String,
      default: ','
    },
    numSpacing: {
      type: Number,
      default: 0
    },
    numBackground: {
      type: Object,
      default: function _default() {
        return {
          color: 'rgba(0, 0, 0, 0)',
          image: ''
        };
      }
    },
    separatorBackground: {
      type: Boolean,
      default: false
    },
    showTitleUnit: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      indicatorColorData: '',
      titleData: this.title,
      unitData: this.unit,
      numData: 0,
      startData: 0
    };
  },
  computed: {
    unit_titleStyle: function unit_titleStyle() {
      return {
        fontSize: parseFloat(this.fontSize) * 0.66 + this.fontUnit,
        fontWeight: this.fontWeight
      };
    },
    fontUnit: function fontUnit() {
      var reg = /\d+(\.\d+)?([a-z]+)/gi;
      var fontUnit = this.fontSize ? this.fontSize.replace(reg, '$2') : '';
      return fontUnit;
    },
    indicatorStyle: function indicatorStyle() {
      var style = {
        color: this.indicatorColorData
      };
      typeof this.num === 'string' && (style.fontSize = parseFloat(this.fontSize) + this.fontUnit);
      return style;
    },
    direction: function direction() {
      return {
        vertical: 'column',
        horizontal: 'row'
      }[this.mode];
    },
    calDecimals: function calDecimals() {
      if (this.decimals > 0) {
        return this.decimals;
      }

      if (this.numData.toString().split('.')[1]) {
        return this.numData.toString().split('.')[1].length;
      }

      return 0;
    }
  },
  watch: {
    url: {
      handler: function handler(val) {
        if (val) {
          this.getData();
        } else {
          this.unitData = this.unit;
          this.changeNumData(this.num);
          this.titleData = this.title;
        }
      },
      immediate: true
    },
    indicatorColor: function indicatorColor(val) {
      this.indicatorColorData = val;
    },
    title: function title(val) {
      this.titleData = val;
    },
    unit: function unit(val) {
      this.unitData = val;
    },
    num: {
      handler: function handler(val) {
        this.changeNumData(val);
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$on('theme-style-changed', function () {
      _this.indicatorColorData = _this.getColor(0);
    });
    this.indicatorColorData = this.indicatorColor || this.getColor(0);
  },
  beforeDestroy: function beforeDestroy() {
    this.restService && this.restService.remove('getdatasucceeded');
  },
  methods: {
    isNumber: function isNumber(str) {
      return /^\d+$/.test(str);
    },
    timing: function timing() {
      this.getData();
    },
    fetchData: function fetchData(data) {
      this.unitData = data.data.unit;
      this.changeNumData(data.data.num);
      this.titleData = data.data.title;
    },
    getData: function getData() {
      this.getRestService().getData(this.url);
    },
    changeNumData: function changeNumData(newData) {
      this.startData = this.animated ? +this.numData : +newData;
      this.numData = +newData;
    },
    getRestService: function getRestService() {
      if (!this.restService) {
        this.restService = new _RestService.default();
        this.restService.on({
          'getdatasucceeded': this.fetchData
        });
      }

      return this.restService;
    }
  }
};
exports.default = _default2;

/***/ }),

/***/ "8Wwx":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _WebMap_vue_vue_type_template_id_0d7d2bd8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("w5PQ");
/* harmony import */ var _WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("dZA3");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _WebMap_vue_vue_type_template_id_0d7d2bd8___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _WebMap_vue_vue_type_template_id_0d7d2bd8___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "8XH1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _lang = __webpack_require__("DSM6");

var AddressMatchParameter = function AddressMatchParameter(options) {
  (0, _classCallCheck2.default)(this, AddressMatchParameter);
  this.url = options.url;
  this.name = options.name || (0, _lang.geti18n)().t('commontypes.addressMatch');
};

exports.default = AddressMatchParameter;

/***/ }),

/***/ "9EWs":
/***/ (function(module) {

module.exports = JSON.parse("[{\"name\":\"黑龙江省\",\"coord\":[127.64559817675396,48.48668098449708]},{\"name\":\"内蒙古自治区\",\"coord\":[118.34519572208615,45.370218276977525]},{\"name\":\"新疆维吾尔自治区\",\"coord\":[87.13479065593184,41.75497055053711]},{\"name\":\"吉林省\",\"coord\":[126.12985278813787,43.57983207702637]},{\"name\":\"辽宁省\",\"coord\":[124.02494773936439,41.105743408203125]},{\"name\":\"甘肃省\",\"coord\":[102.87785725633012,37.69582366943361]},{\"name\":\"河北省\",\"coord\":[115.66327227481898,39.33383178710938]},{\"name\":\"北京市\",\"coord\":[116.62199343603638,40.25053787231445]},{\"name\":\"山西省\",\"coord\":[112.45180235808988,37.666561126708984]},{\"name\":\"天津市\",\"coord\":[117.35711842642581,39.406789779663086]},{\"name\":\"陕西省\",\"coord\":[109.56294003056632,35.64754199981689]},{\"name\":\"宁夏回族自治区\",\"coord\":[105.96110877640074,37.3081169128418]},{\"name\":\"青海省\",\"coord\":[96.07301048277901,35.44417190551758]},{\"name\":\"山东省\",\"coord\":[118.03833752951093,36.29800605773925]},{\"name\":\"西藏自治区\",\"coord\":[87.47361520439412,31.6703872680664]},{\"name\":\"河南省\",\"coord\":[113.07832397097275,33.87751102447509]},{\"name\":\"江苏省\",\"coord\":[119.93926538201052,32.945452690124505]},{\"name\":\"安徽省\",\"coord\":[117.15146765881019,32.024482727050774]},{\"name\":\"四川省\",\"coord\":[102.28998890142759,30.182161331176758]},{\"name\":\"湖北省\",\"coord\":[112.87798261431585,31.157071113586426]},{\"name\":\"重庆市\",\"coord\":[107.870126637831,30.188085556030266]},{\"name\":\"上海市\",\"coord\":[121.42561166015514,31.276043891906745]},{\"name\":\"浙江省\",\"coord\":[119.75337092707514,29.175934791564945]},{\"name\":\"湖南省\",\"coord\":[111.52770282777405,27.38110256195069]},{\"name\":\"江西省\",\"coord\":[115.51091280655628,27.283511161804206]},{\"name\":\"云南省\",\"coord\":[101.27053825991308,25.19783210754396]},{\"name\":\"贵州省\",\"coord\":[106.49672346773299,26.92267990112305]},{\"name\":\"福建省\",\"coord\":[117.9976766946587,25.939599990844727]},{\"name\":\"广西壮族自治区\",\"coord\":[108.98706831086302,23.891559600830078]},{\"name\":\"台湾省\",\"coord\":[120.82468432537434,23.602651596069336]},{\"name\":\"香港特别行政区\",\"coord\":[114.21036850371561,22.374858856201172]},{\"name\":\"海南省\",\"coord\":[109.62792940960824,19.163116455078125]},{\"name\":\"广东省\",\"coord\":[113.32127888266032,22.873867034912106]},{\"name\":\"澳门特别行政区\",\"coord\":[113.56819996291901,22.160347992976]}]");

/***/ }),

/***/ "9csQ":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to generate unique IDs. */
var idCounter = 0;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Generates a unique ID. If `prefix` is given, the ID is appended to it.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {string} [prefix=''] The value to prefix the ID with.
 * @returns {string} Returns the unique ID.
 * @example
 *
 * _.uniqueId('contact_');
 * // => 'contact_104'
 *
 * _.uniqueId();
 * // => '105'
 */
function uniqueId(prefix) {
  var id = ++idCounter;
  return toString(prefix) + id;
}

module.exports = uniqueId;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "9pJD":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAACzdJREFUeAHt3VFu2jAcwGEHcZTugRtUPdZ6jl2r6g3yQO+S5Q9TMRSLJpbWOPnyFIjdOl+Y+ht0WZeO/e/U0tal9/R0eGtpydZKgAABAgRmCXz0L2lIz7Pm/tCk3Q993/nfNoAD2kaAAAECBNYs0GBUxOVoLyxi1eIiFGwECBAgsFaBRqMiLkebYRErFxehYCNAgACBtQk0HBVxKdoNi1i9uAgFGwECBAisRaDxqIjL0HZYxBmIi1CwESBAgEDrAiuIirgE+9vr0KX05/a5xT8exhUe+8Uv0wIJECBAgEBRIH6WNbiNy37Nl/0lLOLg8Osw9oWNAAECBAgQIFAW6I79dQ6Nt4Ro/6OQ8vk6QoAAAQIECPwvgX/3mdql2LERIECAAAECBOYKZDev3J3uYiku5lKaR4AAAQIEti2QRUVAnD8KiVtki4ttvzCcPQECBAgQmCNw899sXH7HQlzM4TSHAAECBAgQyAQuYRFP3lRHNs4uAQIECBAgQOChwHVYPBxuAAECBAgQIECgLCAsyjaOECBAgAABAhMFhMVEMMMJECBAgACBsoCwKNs4QoAAAQIECEwUEBYTwQwnQIAAAQIEygLComzjCAECBAgQIDBRQFhMBDOcAAECBAgQKAsIi7KNIwQIECBAgMBEAWExEcxwAgQIECBAoCwgLMo2jhAgQIAAAQITBYTFRDDDCRAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKbEOiO/bCJE3WSBAgQIECAQJXAvWbYVX1FkwkQIECAAAECmYCwyDDsEiBAgAABAnUCwqLOz2wCBAgQIEAgExAWGYZdAgQIECBAoE5AWNT5mU2AAAECBAhkAsIiw7BLgAABAgQI1AkIizo/swkQIECAAIFMQFhkGHYJECBAgACBOgFhUednNgECBAgQIJAJCIsMwy4BAgQIECBQJyAs6vzMJkCAAAECBDIBYZFh2CVAgAABAgTqBK7D4qN/qftyZhMgQIAAAQJbFriERUTFkJ63jOHcCRAgQIAAgYkCN29KnMNCVExUNJwAAQIECBA4CcSbEllc7E4PvFPh1UGAAAECBAjMFcjiYu/jj7mK5hEgQIAAAQKfAue4SPvPJ7Kd7tgP2UO7BAgQIECAAIHHAmNcfAmLsSheH89c2Iguvaenw9vCVmU5BAgQIEDg+wIr+X3Hy78K+f6pL2ukqFjW9bAaAgQIEJgnEH9Bjp9pjW9th4WoaPzlZ/kECBAgcCWwgrhoNyxExdVr0QMCBAgQWIlA43HRZliIipX86XEaBAgQIHBXoOG4aC8sRMXd16AnCRAgQGBlAo3GxV/c4HmOBfV/nAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "9rNx":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAADXRJREFUeAHt3DFulAcYRVEcsRiW4X2wAAqUiobCVHFBQ4UosgD24WWwGyIKSxTDs681lsb5T5pE8z5PPMdIXM0Irj5/v/v56sL/+fj2+urCv0XfHgECBAgQeHaBl/B79l/PruB/QIAAAQIECBxG4Oq+frwrcJifuRdKgAABAgTOLnDfE96xODutJyRAgAABAscVEBbH/dl75QQIECBA4OwCwuLspJ6QAAECBAgcV0BYHPdn75UTIECAAIGzCwiLs5N6QgIECBAgcFyB1w+99C9v3l/833Px0GuwEyBAgAABAucR+PDj2/y7pR4Mi1/fxkNPcp5v1bMQIECAAAEClyzwmDcbfBRyyT9B3xsBAgQIEHhhAo96x+L+Nf19+6+PRe4x/JsAAQIECBxE4OvNu/nxx+8MKSx+feHdzT/Xvz+B/yZAgAABAgT+vwLXt5/uyqvzUUjRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBQQFpPHSIAAAQIECBQBYVG03BIgQIAAAQJTQFhMHiMBAgQIECBQBIRF0XJLgAABAgQITAFhMXmMBAgQIECAQBEQFkXLLQECBAgQIDAFhMXkMRIgQIAAAQJFQFgULbcECBAgQIDAFBAWk8dIgAABAgQIFAFhUbTcEiBAgAABAlNAWEweIwECBAgQIFAEhEXRckuAAAECBAhMAWExeYwECBAgQIBAERAWRcstAQIECBAgMAWExeQxEiBAgAABAkVAWBQttwQIECBAgMAUEBaTx0iAAAECBAgUAWFRtNwSIECAAAECU0BYTB4jAQIECBAgUASERdFyS4AAAQIECEwBYTF5jAQIECBAgEAREBZFyy0BAgQIECAwBYTF5DESIECAAAECRUBYFC23BAgQIECAwBR4PdcT4/Xtp7sTD3uIAAECBAgQIPAqhcXXm3dXzAgQIECAAAECfxLwUcifZDxOgAABAgQIZIFHvWPx5c37n/mZfQEBAgQIECBwOIEHw+LDj28+/jjcLwsvmAABAgQIPE3ARyFPc/NVBAgQIECAwAkBYXECxUMECBAgQIDA0wSExdPcfBUBAgQIECBwQkBYnEDxEAECBAgQIPA0AWHxNDdfRYAAAQIECJwQuPr8/e7i/yjpx7fX/mTKiR+ehwgQIEDgWAIv4fds71gc69ekV0uAAAECBJ5V4D9D2y5GdTuSHwAAAABJRU5ErkJggg=="

/***/ }),

/***/ "AP2z":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("nmnc");

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

module.exports = getRawTag;


/***/ }),

/***/ "ATId":
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e(__webpack_require__("WOGj"),__webpack_require__("Qu5F")):undefined}(this,function(m,d){"use strict";var t;return m=m&&m.hasOwnProperty("default")?m.default:m,d=d&&d.hasOwnProperty("default")?d.default:d,function(t){var u;t.exports;(u=window).DOMParser=window.DOMParser;function p(){return document.createElement("canvas")}var f,c=function(t,e,i){if(null!=t||null!=e||null!=i){var n=function(s){var A={opts:s,FRAMERATE:30,MAX_VIRTUAL_PIXELS:3e4,rootEmSize:12,emSize:12,log:function(t){}};1==A.opts.log&&"undefined"!=typeof console&&(A.log=function(t){console.log(t)});A.init=function(t){var e=0;A.UniqueId=function(){return"canvg"+ ++e},A.Definitions={},A.Styles={},A.StylesSpecificity={},A.Animations=[],A.Images=[],A.ctx=t,A.ViewPort=new function(){this.viewPorts=[],this.Clear=function(){this.viewPorts=[]},this.SetCurrent=function(t,e){this.viewPorts.push({width:t,height:e})},this.RemoveCurrent=function(){this.viewPorts.pop()},this.Current=function(){return this.viewPorts[this.viewPorts.length-1]},this.width=function(){return this.Current().width},this.height=function(){return this.Current().height},this.ComputeSize=function(t){return null!=t&&"number"==typeof t?t:"x"==t?this.width():"y"==t?this.height():Math.sqrt(Math.pow(this.width(),2)+Math.pow(this.height(),2))/Math.sqrt(2)}}},A.init(),A.ImagesLoaded=function(){for(var t=0;t<A.Images.length;t++)if(!A.Images[t].loaded)return!1;return!0},A.trim=function(t){return t.replace(/^\s+|\s+$/g,"")},A.compressSpaces=function(t){return t.replace(/(?!\u3000)\s+/gm," ")},A.ajax=function(t){var e;return(e=u.XMLHttpRequest?new u.XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"))?(e.open("GET",t,!1),e.send(null),e.responseText):null},A.parseXml=function(e){if("undefined"!=typeof Windows&&void 0!==Windows.Data&&void 0!==Windows.Data.Xml){var t=new Windows.Data.Xml.Dom.XmlDocument,i=new Windows.Data.Xml.Dom.XmlLoadSettings;return i.prohibitDtd=!1,t.loadXml(e,i),t}if(!u.DOMParser){e=e.replace(/<!DOCTYPE svg[^>]*>/,"");var t=new ActiveXObject("Microsoft.XMLDOM");return t.async="false",t.loadXML(e),t}try{var n=s.xmldom?new u.DOMParser(s.xmldom):new u.DOMParser;return n.parseFromString(e,"image/svg+xml")}catch(t){return(n=s.xmldom?new u.DOMParser(s.xmldom):new u.DOMParser).parseFromString(e,"text/xml")}},A.Property=function(t,e){this.name=t,this.value=e},A.Property.prototype.getValue=function(){return this.value},A.Property.prototype.hasValue=function(){return null!=this.value&&""!==this.value},A.Property.prototype.numValue=function(){if(!this.hasValue())return 0;var t=parseFloat(this.value);return(this.value+"").match(/%$/)&&(t/=100),t},A.Property.prototype.valueOrDefault=function(t){return this.hasValue()?this.value:t},A.Property.prototype.numValueOrDefault=function(t){return this.hasValue()?this.numValue():t},A.Property.prototype.addOpacity=function(t){var e=this.value;if(null!=t.value&&""!=t.value&&"string"==typeof this.value){var i=new m(this.value);i.ok&&(e="rgba("+i.r+", "+i.g+", "+i.b+", "+t.numValue()+")")}return new A.Property(this.name,e)},A.Property.prototype.getDefinition=function(){var t=this.value.match(/#([^\)'"]+)/);return t&&(t=t[1]),t||(t=this.value),A.Definitions[t]},A.Property.prototype.isUrlDefinition=function(){return 0==this.value.indexOf("url(")},A.Property.prototype.getFillStyleDefinition=function(t,e){var i=this.getDefinition();if(null!=i&&i.createGradient)return i.createGradient(A.ctx,t,e);if(null!=i&&i.createPattern){if(i.getHrefAttribute().hasValue()){var n=i.attribute("patternTransform");i=i.getHrefAttribute().getDefinition(),n.hasValue()&&(i.attribute("patternTransform",!0).value=n.value)}return i.createPattern(A.ctx,t)}return null},A.Property.prototype.getDPI=function(t){return 96},A.Property.prototype.getREM=function(t){return A.rootEmSize},A.Property.prototype.getEM=function(t){return A.emSize},A.Property.prototype.getUnits=function(){var t=this.value+"";return t.replace(/[0-9\.\-]/g,"")},A.Property.prototype.isPixels=function(){if(!this.hasValue())return!1;var t=this.value+"";return!!t.match(/px$/)||!!t.match(/^[0-9]+$/)},A.Property.prototype.toPixels=function(t,e){if(!this.hasValue())return 0;var i=this.value+"";if(i.match(/rem$/))return this.numValue()*this.getREM(t);if(i.match(/em$/))return this.numValue()*this.getEM(t);if(i.match(/ex$/))return this.numValue()*this.getEM(t)/2;if(i.match(/px$/))return this.numValue();if(i.match(/pt$/))return this.numValue()*this.getDPI(t)*(1/72);if(i.match(/pc$/))return 15*this.numValue();if(i.match(/cm$/))return this.numValue()*this.getDPI(t)/2.54;if(i.match(/mm$/))return this.numValue()*this.getDPI(t)/25.4;if(i.match(/in$/))return this.numValue()*this.getDPI(t);if(i.match(/%$/))return this.numValue()*A.ViewPort.ComputeSize(t);var n=this.numValue();return e&&n<1?n*A.ViewPort.ComputeSize(t):n},A.Property.prototype.toMilliseconds=function(){if(!this.hasValue())return 0;var t=this.value+"";return t.match(/s$/)?1e3*this.numValue():(t.match(/ms$/),this.numValue())},A.Property.prototype.toRadians=function(){if(!this.hasValue())return 0;var t=this.value+"";return t.match(/deg$/)?this.numValue()*(Math.PI/180):t.match(/grad$/)?this.numValue()*(Math.PI/200):t.match(/rad$/)?this.numValue():this.numValue()*(Math.PI/180)};var t={baseline:"alphabetic","before-edge":"top","text-before-edge":"top",middle:"middle",central:"middle","after-edge":"bottom","text-after-edge":"bottom",ideographic:"ideographic",alphabetic:"alphabetic",hanging:"hanging",mathematical:"alphabetic"};return A.Property.prototype.toTextBaseline=function(){return this.hasValue()?t[this.value]:null},A.Font=new function(){this.Styles="normal|italic|oblique|inherit",this.Variants="normal|small-caps|inherit",this.Weights="normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|inherit",this.CreateFont=function(t,e,i,n,s,a){var r=null!=a?this.Parse(a):this.CreateFont("","","","","",A.ctx.font);return{fontFamily:s=s||r.fontFamily,fontSize:n||r.fontSize,fontStyle:t||r.fontStyle,fontWeight:i||r.fontWeight,fontVariant:e||r.fontVariant,toString:function(){return[this.fontStyle,this.fontVariant,this.fontWeight,this.fontSize,this.fontFamily].join(" ")}}};var r=this;this.Parse=function(t){for(var e={},i=A.trim(A.compressSpaces(t||"")).split(" "),n={fontSize:!1,fontStyle:!1,fontWeight:!1,fontVariant:!1},s="",a=0;a<i.length;a++)n.fontStyle||-1==r.Styles.indexOf(i[a])?n.fontVariant||-1==r.Variants.indexOf(i[a])?n.fontWeight||-1==r.Weights.indexOf(i[a])?n.fontSize?"inherit"!=i[a]&&(s+=i[a]):("inherit"!=i[a]&&(e.fontSize=i[a].split("/")[0]),n.fontStyle=n.fontVariant=n.fontWeight=n.fontSize=!0):("inherit"!=i[a]&&(e.fontWeight=i[a]),n.fontStyle=n.fontVariant=n.fontWeight=!0):("inherit"!=i[a]&&(e.fontVariant=i[a]),n.fontStyle=n.fontVariant=!0):("inherit"!=i[a]&&(e.fontStyle=i[a]),n.fontStyle=!0);return""!=s&&(e.fontFamily=s),e}},A.ToNumberArray=function(t){for(var e=A.trim(A.compressSpaces((t||"").replace(/,/g," "))).split(" "),i=0;i<e.length;i++)e[i]=parseFloat(e[i]);return e},A.Point=function(t,e){this.x=t,this.y=e},A.Point.prototype.angleTo=function(t){return Math.atan2(t.y-this.y,t.x-this.x)},A.Point.prototype.applyTransform=function(t){var e=this.x*t[0]+this.y*t[2]+t[4],i=this.x*t[1]+this.y*t[3]+t[5];this.x=e,this.y=i},A.CreatePoint=function(t){var e=A.ToNumberArray(t);return new A.Point(e[0],e[1])},A.CreatePath=function(t){for(var e=A.ToNumberArray(t),i=[],n=0;n<e.length;n+=2)i.push(new A.Point(e[n],e[n+1]));return i},A.BoundingBox=function(t,e,i,n){this.x1=Number.NaN,this.y1=Number.NaN,this.x2=Number.NaN,this.y2=Number.NaN,this.x=function(){return this.x1},this.y=function(){return this.y1},this.width=function(){return this.x2-this.x1},this.height=function(){return this.y2-this.y1},this.addPoint=function(t,e){null!=t&&((isNaN(this.x1)||isNaN(this.x2))&&(this.x1=t,this.x2=t),t<this.x1&&(this.x1=t),t>this.x2&&(this.x2=t)),null!=e&&((isNaN(this.y1)||isNaN(this.y2))&&(this.y1=e,this.y2=e),e<this.y1&&(this.y1=e),e>this.y2&&(this.y2=e))},this.addX=function(t){this.addPoint(t,null)},this.addY=function(t){this.addPoint(null,t)},this.addBoundingBox=function(t){this.addPoint(t.x1,t.y1),this.addPoint(t.x2,t.y2)},this.addQuadraticCurve=function(t,e,i,n,s,a){var r=t+2/3*(i-t),o=e+2/3*(n-e),l=r+1/3*(s-t),h=o+1/3*(a-e);this.addBezierCurve(t,e,r,l,o,h,s,a)},this.addBezierCurve=function(t,e,i,n,s,a,r,o){var l=[t,e],h=[i,n],u=[s,a],c=[r,o];this.addPoint(l[0],l[1]),this.addPoint(c[0],c[1]);for(var f=0;f<=1;f++){var m=function(t){return Math.pow(1-t,3)*l[f]+3*Math.pow(1-t,2)*t*h[f]+3*(1-t)*Math.pow(t,2)*u[f]+Math.pow(t,3)*c[f]},p=6*l[f]-12*h[f]+6*u[f],d=-3*l[f]+9*h[f]-9*u[f]+3*c[f],y=3*h[f]-3*l[f];if(0!=d){var v=Math.pow(p,2)-4*y*d;if(!(v<0)){var g=(-p+Math.sqrt(v))/(2*d);0<g&&g<1&&(0==f&&this.addX(m(g)),1==f&&this.addY(m(g)));var x=(-p-Math.sqrt(v))/(2*d);0<x&&x<1&&(0==f&&this.addX(m(x)),1==f&&this.addY(m(x)))}}else{if(0==p)continue;var b=-y/p;0<b&&b<1&&(0==f&&this.addX(m(b)),1==f&&this.addY(m(b)))}}},this.isPointInBox=function(t,e){return this.x1<=t&&t<=this.x2&&this.y1<=e&&e<=this.y2},this.addPoint(t,e),this.addPoint(i,n)},A.Transform=function(t){var e=this;this.Type={},this.Type.translate=function(t){this.p=A.CreatePoint(t),this.apply=function(t){t.translate(this.p.x||0,this.p.y||0)},this.unapply=function(t){t.translate(-1*this.p.x||0,-1*this.p.y||0)},this.applyToPoint=function(t){t.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0])}},this.Type.rotate=function(t){var e=A.ToNumberArray(t);this.angle=new A.Property("angle",e[0]),this.cx=e[1]||0,this.cy=e[2]||0,this.apply=function(t){t.translate(this.cx,this.cy),t.rotate(this.angle.toRadians()),t.translate(-this.cx,-this.cy)},this.unapply=function(t){t.translate(this.cx,this.cy),t.rotate(-1*this.angle.toRadians()),t.translate(-this.cx,-this.cy)},this.applyToPoint=function(t){var e=this.angle.toRadians();t.applyTransform([1,0,0,1,this.p.x||0,this.p.y||0]),t.applyTransform([Math.cos(e),Math.sin(e),-Math.sin(e),Math.cos(e),0,0]),t.applyTransform([1,0,0,1,-this.p.x||0,-this.p.y||0])}},this.Type.scale=function(t){this.p=A.CreatePoint(t),this.apply=function(t){t.scale(this.p.x||1,this.p.y||this.p.x||1)},this.unapply=function(t){t.scale(1/this.p.x||1,1/this.p.y||this.p.x||1)},this.applyToPoint=function(t){t.applyTransform([this.p.x||0,0,0,this.p.y||0,0,0])}},this.Type.matrix=function(t){this.m=A.ToNumberArray(t),this.apply=function(t){t.transform(this.m[0],this.m[1],this.m[2],this.m[3],this.m[4],this.m[5])},this.unapply=function(t){var e=this.m[0],i=this.m[2],n=this.m[4],s=this.m[1],a=this.m[3],r=this.m[5],o=1/(e*(1*a-0*r)-i*(1*s-0*r)+n*(0*s-0*a));t.transform(o*(1*a-0*r),o*(0*r-1*s),o*(0*n-1*i),o*(1*e-0*n),o*(i*r-n*a),o*(n*s-e*r))},this.applyToPoint=function(t){t.applyTransform(this.m)}},this.Type.SkewBase=function(t){this.base=e.Type.matrix,this.base(t),this.angle=new A.Property("angle",t)},this.Type.SkewBase.prototype=new this.Type.matrix,this.Type.skewX=function(t){this.base=e.Type.SkewBase,this.base(t),this.m=[1,0,Math.tan(this.angle.toRadians()),1,0,0]},this.Type.skewX.prototype=new this.Type.SkewBase,this.Type.skewY=function(t){this.base=e.Type.SkewBase,this.base(t),this.m=[1,Math.tan(this.angle.toRadians()),0,1,0,0]},this.Type.skewY.prototype=new this.Type.SkewBase,this.transforms=[],this.apply=function(t){for(var e=0;e<this.transforms.length;e++)this.transforms[e].apply(t)},this.unapply=function(t){for(var e=this.transforms.length-1;0<=e;e--)this.transforms[e].unapply(t)},this.applyToPoint=function(t){for(var e=0;e<this.transforms.length;e++)this.transforms[e].applyToPoint(t)};for(var i=A.trim(A.compressSpaces(t)).replace(/\)([a-zA-Z])/g,") $1").replace(/\)(\s?,\s?)/g,") ").split(/\s(?=[a-z])/),n=0;n<i.length;n++)if("none"!==i[n]){var s=A.trim(i[n].split("(")[0]),a=i[n].split("(")[1].replace(")",""),r=this.Type[s];if(void 0!==r){var o=new r(a);o.type=s,this.transforms.push(o)}}},A.AspectRatio=function(t,e,i,n,s,a,r,o,l,h){var u=(e=(e=A.compressSpaces(e)).replace(/^defer\s/,"")).split(" ")[0]||"xMidYMid",c=e.split(" ")[1]||"meet",f=i/n,m=s/a,p=Math.min(f,m),d=Math.max(f,m);"meet"==c&&(n*=p,a*=p),"slice"==c&&(n*=d,a*=d),l=new A.Property("refX",l),h=new A.Property("refY",h),l.hasValue()&&h.hasValue()?t.translate(-p*l.toPixels("x"),-p*h.toPixels("y")):(u.match(/^xMid/)&&("meet"==c&&p==m||"slice"==c&&d==m)&&t.translate(i/2-n/2,0),u.match(/YMid$/)&&("meet"==c&&p==f||"slice"==c&&d==f)&&t.translate(0,s/2-a/2),u.match(/^xMax/)&&("meet"==c&&p==m||"slice"==c&&d==m)&&t.translate(i-n,0),u.match(/YMax$/)&&("meet"==c&&p==f||"slice"==c&&d==f)&&t.translate(0,s-a)),"none"==u?t.scale(f,m):"meet"==c?t.scale(p,p):"slice"==c&&t.scale(d,d),t.translate(null==r?0:-r,null==o?0:-o)},A.Element={},A.EmptyProperty=new A.Property("EMPTY",""),A.Element.ElementBase=function(a){this.attributes={},this.styles={},this.stylesSpecificity={},this.children=[],this.attribute=function(t,e){var i=this.attributes[t];return null!=i?i:(1==e&&(i=new A.Property(t,""),this.attributes[t]=i),i||A.EmptyProperty)},this.getHrefAttribute=function(){for(var t in this.attributes)if("href"==t||t.match(/:href$/))return this.attributes[t];return A.EmptyProperty},this.style=function(t,e,i){var n=this.styles[t];if(null!=n)return n;var s=this.attribute(t);if(null!=s&&s.hasValue())return this.styles[t]=s;if(1!=i){var a=this.parent;if(null!=a){var r=a.style(t);if(null!=r&&r.hasValue())return r}}return 1==e&&(n=new A.Property(t,""),this.styles[t]=n),n||A.EmptyProperty},this.render=function(t){if("none"!=this.style("display").value&&"hidden"!=this.style("visibility").value){if(t.save(),this.style("mask").hasValue()){var e=this.style("mask").getDefinition();null!=e&&e.apply(t,this)}else if(this.style("filter").hasValue()){var i=this.style("filter").getDefinition();null!=i&&i.apply(t,this)}else this.setContext(t),this.renderChildren(t),this.clearContext(t);t.restore()}},this.setContext=function(t){},this.clearContext=function(t){},this.renderChildren=function(t){for(var e=0;e<this.children.length;e++)this.children[e].render(t)},this.addChild=function(t,e){var i=t;e&&(i=A.CreateElement(t)),i.parent=this,"title"!=i.type&&this.children.push(i)},this.addStylesFromStyleDefinition=function(){for(var t in A.Styles)if("@"!=t[0]&&f(a,t)){var e=A.Styles[t],i=A.StylesSpecificity[t];if(null!=e)for(var n in e){var s=this.stylesSpecificity[n];void 0===s&&(s="000"),s<i&&(this.styles[n]=e[n],this.stylesSpecificity[n]=i)}}};var t,e=new RegExp("^[A-Z-]+$");if(null!=a&&1==a.nodeType){for(var i=0;i<a.attributes.length;i++){var n=a.attributes[i],s=(t=n.nodeName,e.test(t)?t.toLowerCase():t);this.attributes[s]=new A.Property(s,n.value)}if(this.addStylesFromStyleDefinition(),this.attribute("style").hasValue()){var r=this.attribute("style").value.split(";");for(i=0;i<r.length;i++)if(""!=A.trim(r[i])){var o=r[i].split(":"),l=A.trim(o[0]),h=A.trim(o[1]);this.styles[l]=new A.Property(l,h)}}for(this.attribute("id").hasValue()&&null==A.Definitions[this.attribute("id").value]&&(A.Definitions[this.attribute("id").value]=this),i=0;i<a.childNodes.length;i++){var u=a.childNodes[i];if(1==u.nodeType&&this.addChild(u,!0),this.captureTextNodes&&(3==u.nodeType||4==u.nodeType)){var c=u.value||u.text||u.textContent||"";""!=A.compressSpaces(c)&&this.addChild(new A.Element.tspan(u),!1)}}}},A.Element.RenderedElementBase=function(t){this.base=A.Element.ElementBase,this.base(t),this.calculateOpacity=function(){for(var t=1,e=this;null!=e;){var i=e.style("opacity",!1,!0);i.hasValue()&&(t*=i.numValue()),e=e.parent}return t},this.setContext=function(t,e){if(!e){var i;if(this.style("fill").isUrlDefinition())null!=(i=this.style("fill").getFillStyleDefinition(this,this.style("fill-opacity")))&&(t.fillStyle=i);else if(this.style("fill").hasValue()){var n;"currentColor"==(n=this.style("fill")).value&&(n.value=this.style("color").value),"inherit"!=n.value&&(t.fillStyle="none"==n.value?"rgba(0,0,0,0)":n.value)}if(this.style("fill-opacity").hasValue()&&(n=(n=new A.Property("fill",t.fillStyle)).addOpacity(this.style("fill-opacity")),t.fillStyle=n.value),this.style("stroke").isUrlDefinition())null!=(i=this.style("stroke").getFillStyleDefinition(this,this.style("stroke-opacity")))&&(t.strokeStyle=i);else if(this.style("stroke").hasValue()){var s;"currentColor"==(s=this.style("stroke")).value&&(s.value=this.style("color").value),"inherit"!=s.value&&(t.strokeStyle="none"==s.value?"rgba(0,0,0,0)":s.value)}if(this.style("stroke-opacity").hasValue()&&(s=(s=new A.Property("stroke",t.strokeStyle)).addOpacity(this.style("stroke-opacity")),t.strokeStyle=s.value),this.style("stroke-width").hasValue()){var a=this.style("stroke-width").toPixels();t.lineWidth=0==a?.001:a}if(this.style("stroke-linecap").hasValue()&&(t.lineCap=this.style("stroke-linecap").value),this.style("stroke-linejoin").hasValue()&&(t.lineJoin=this.style("stroke-linejoin").value),this.style("stroke-miterlimit").hasValue()&&(t.miterLimit=this.style("stroke-miterlimit").value),this.style("paint-order").hasValue()&&(t.paintOrder=this.style("paint-order").value),this.style("stroke-dasharray").hasValue()&&"none"!=this.style("stroke-dasharray").value){var r=A.ToNumberArray(this.style("stroke-dasharray").value);void 0!==t.setLineDash?t.setLineDash(r):void 0!==t.webkitLineDash?t.webkitLineDash=r:void 0===t.mozDash||1==r.length&&0==r[0]||(t.mozDash=r);var o=this.style("stroke-dashoffset").toPixels();void 0!==t.lineDashOffset?t.lineDashOffset=o:void 0!==t.webkitLineDashOffset?t.webkitLineDashOffset=o:void 0!==t.mozDashOffset&&(t.mozDashOffset=o)}}if(void 0!==t.font){t.font=A.Font.CreateFont(this.style("font-style").value,this.style("font-variant").value,this.style("font-weight").value,this.style("font-size").hasValue()?this.style("font-size").toPixels()+"px":"",this.style("font-family").value).toString();var l=this.style("font-size",!1,!1);l.isPixels()&&(A.emSize=l.toPixels())}if(this.style("transform",!1,!0).hasValue()&&new A.Transform(this.style("transform",!1,!0).value).apply(t),this.style("clip-path",!1,!0).hasValue()){var h=this.style("clip-path",!1,!0).getDefinition();null!=h&&h.apply(t)}t.globalAlpha=this.calculateOpacity()}},A.Element.RenderedElementBase.prototype=new A.Element.ElementBase,A.Element.PathElementBase=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.path=function(t){return null!=t&&t.beginPath(),new A.BoundingBox},this.renderChildren=function(t){this.path(t),A.Mouse.checkPath(this,t),""!=t.fillStyle&&("inherit"!=this.style("fill-rule").valueOrDefault("inherit")?t.fill(this.style("fill-rule").value):t.fill()),""!=t.strokeStyle&&t.stroke();var e=this.getMarkers();if(null!=e){if(this.style("marker-start").isUrlDefinition()&&(i=this.style("marker-start").getDefinition()).render(t,e[0][0],e[0][1]),this.style("marker-mid").isUrlDefinition())for(var i=this.style("marker-mid").getDefinition(),n=1;n<e.length-1;n++)i.render(t,e[n][0],e[n][1]);this.style("marker-end").isUrlDefinition()&&(i=this.style("marker-end").getDefinition()).render(t,e[e.length-1][0],e[e.length-1][1])}},this.getBoundingBox=function(){return this.path()},this.getMarkers=function(){return null}},A.Element.PathElementBase.prototype=new A.Element.RenderedElementBase,A.Element.svg=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.baseClearContext=this.clearContext,this.clearContext=function(t){this.baseClearContext(t),A.ViewPort.RemoveCurrent()},this.baseSetContext=this.setContext,this.setContext=function(t){if(t.strokeStyle="rgba(0,0,0,0)",t.lineCap="butt",t.lineJoin="miter",t.miterLimit=4,t.canvas.style&&void 0!==t.font&&void 0!==u.getComputedStyle){t.font=u.getComputedStyle(t.canvas).getPropertyValue("font");var e=new A.Property("fontSize",A.Font.Parse(t.font).fontSize);e.hasValue()&&(A.rootEmSize=A.emSize=e.toPixels("y"))}this.baseSetContext(t),this.attribute("x").hasValue()||(this.attribute("x",!0).value=0),this.attribute("y").hasValue()||(this.attribute("y",!0).value=0),t.translate(this.attribute("x").toPixels("x"),this.attribute("y").toPixels("y"));var i=A.ViewPort.width(),n=A.ViewPort.height();if(this.attribute("width").hasValue()||(this.attribute("width",!0).value="100%"),this.attribute("height").hasValue()||(this.attribute("height",!0).value="100%"),void 0===this.root){i=this.attribute("width").toPixels("x"),n=this.attribute("height").toPixels("y");var s=0,a=0;this.attribute("refX").hasValue()&&this.attribute("refY").hasValue()&&(s=-this.attribute("refX").toPixels("x"),a=-this.attribute("refY").toPixels("y")),"visible"!=this.attribute("overflow").valueOrDefault("hidden")&&(t.beginPath(),t.moveTo(s,a),t.lineTo(i,a),t.lineTo(i,n),t.lineTo(s,n),t.closePath(),t.clip())}if(A.ViewPort.SetCurrent(i,n),this.attribute("viewBox").hasValue()){var r=A.ToNumberArray(this.attribute("viewBox").value),o=r[0],l=r[1];i=r[2],n=r[3],A.AspectRatio(t,this.attribute("preserveAspectRatio").value,A.ViewPort.width(),i,A.ViewPort.height(),n,o,l,this.attribute("refX").value,this.attribute("refY").value),A.ViewPort.RemoveCurrent(),A.ViewPort.SetCurrent(r[2],r[3])}}},A.Element.svg.prototype=new A.Element.RenderedElementBase,A.Element.rect=function(t){this.base=A.Element.PathElementBase,this.base(t),this.path=function(t){var e=this.attribute("x").toPixels("x"),i=this.attribute("y").toPixels("y"),n=this.attribute("width").toPixels("x"),s=this.attribute("height").toPixels("y"),a=this.attribute("rx").toPixels("x"),r=this.attribute("ry").toPixels("y");if(this.attribute("rx").hasValue()&&!this.attribute("ry").hasValue()&&(r=a),this.attribute("ry").hasValue()&&!this.attribute("rx").hasValue()&&(a=r),a=Math.min(a,n/2),r=Math.min(r,s/2),null!=t){var o=(Math.sqrt(2)-1)/3*4;t.beginPath(),t.moveTo(e+a,i),t.lineTo(e+n-a,i),t.bezierCurveTo(e+n-a+o*a,i,e+n,i+r-o*r,e+n,i+r),t.lineTo(e+n,i+s-r),t.bezierCurveTo(e+n,i+s-r+o*r,e+n-a+o*a,i+s,e+n-a,i+s),t.lineTo(e+a,i+s),t.bezierCurveTo(e+a-o*a,i+s,e,i+s-r+o*r,e,i+s-r),t.lineTo(e,i+r),t.bezierCurveTo(e,i+r-o*r,e+a-o*a,i,e+a,i),t.closePath()}return new A.BoundingBox(e,i,e+n,i+s)}},A.Element.rect.prototype=new A.Element.PathElementBase,A.Element.circle=function(t){this.base=A.Element.PathElementBase,this.base(t),this.path=function(t){var e=this.attribute("cx").toPixels("x"),i=this.attribute("cy").toPixels("y"),n=this.attribute("r").toPixels();return null!=t&&(t.beginPath(),t.arc(e,i,n,0,2*Math.PI,!1),t.closePath()),new A.BoundingBox(e-n,i-n,e+n,i+n)}},A.Element.circle.prototype=new A.Element.PathElementBase,A.Element.ellipse=function(t){this.base=A.Element.PathElementBase,this.base(t),this.path=function(t){var e=(Math.sqrt(2)-1)/3*4,i=this.attribute("rx").toPixels("x"),n=this.attribute("ry").toPixels("y"),s=this.attribute("cx").toPixels("x"),a=this.attribute("cy").toPixels("y");return null!=t&&(t.beginPath(),t.moveTo(s+i,a),t.bezierCurveTo(s+i,a+e*n,s+e*i,a+n,s,a+n),t.bezierCurveTo(s-e*i,a+n,s-i,a+e*n,s-i,a),t.bezierCurveTo(s-i,a-e*n,s-e*i,a-n,s,a-n),t.bezierCurveTo(s+e*i,a-n,s+i,a-e*n,s+i,a),t.closePath()),new A.BoundingBox(s-i,a-n,s+i,a+n)}},A.Element.ellipse.prototype=new A.Element.PathElementBase,A.Element.line=function(t){this.base=A.Element.PathElementBase,this.base(t),this.getPoints=function(){return[new A.Point(this.attribute("x1").toPixels("x"),this.attribute("y1").toPixels("y")),new A.Point(this.attribute("x2").toPixels("x"),this.attribute("y2").toPixels("y"))]},this.path=function(t){var e=this.getPoints();return null!=t&&(t.beginPath(),t.moveTo(e[0].x,e[0].y),t.lineTo(e[1].x,e[1].y)),new A.BoundingBox(e[0].x,e[0].y,e[1].x,e[1].y)},this.getMarkers=function(){var t=this.getPoints(),e=t[0].angleTo(t[1]);return[[t[0],e],[t[1],e]]}},A.Element.line.prototype=new A.Element.PathElementBase,A.Element.polyline=function(t){this.base=A.Element.PathElementBase,this.base(t),this.points=A.CreatePath(this.attribute("points").value),this.path=function(t){var e=new A.BoundingBox(this.points[0].x,this.points[0].y);null!=t&&(t.beginPath(),t.moveTo(this.points[0].x,this.points[0].y));for(var i=1;i<this.points.length;i++)e.addPoint(this.points[i].x,this.points[i].y),null!=t&&t.lineTo(this.points[i].x,this.points[i].y);return e},this.getMarkers=function(){for(var t=[],e=0;e<this.points.length-1;e++)t.push([this.points[e],this.points[e].angleTo(this.points[e+1])]);return 0<t.length&&t.push([this.points[this.points.length-1],t[t.length-1][1]]),t}},A.Element.polyline.prototype=new A.Element.PathElementBase,A.Element.polygon=function(t){this.base=A.Element.polyline,this.base(t),this.basePath=this.path,this.path=function(t){var e=this.basePath(t);return null!=t&&(t.lineTo(this.points[0].x,this.points[0].y),t.closePath()),e}},A.Element.polygon.prototype=new A.Element.polyline,A.Element.path=function(t){this.base=A.Element.PathElementBase,this.base(t);var e=this.attribute("d").value;e=e.replace(/,/gm," ");for(var i=0;i<2;i++)e=e.replace(/([MmZzLlHhVvCcSsQqTtAa])([^\s])/gm,"$1 $2");for(e=(e=e.replace(/([^\s])([MmZzLlHhVvCcSsQqTtAa])/gm,"$1 $2")).replace(/([0-9])([+\-])/gm,"$1 $2"),i=0;i<2;i++)e=e.replace(/(\.[0-9]*)(\.)/gm,"$1 $2");e=e.replace(/([Aa](\s+[0-9]+){3})\s+([01])\s*([01])/gm,"$1 $3 $4 "),e=A.compressSpaces(e),e=A.trim(e),this.PathParser=new function(t){this.tokens=t.split(" "),this.reset=function(){this.i=-1,this.command="",this.previousCommand="",this.start=new A.Point(0,0),this.control=new A.Point(0,0),this.current=new A.Point(0,0),this.points=[],this.angles=[]},this.isEnd=function(){return this.i>=this.tokens.length-1},this.isCommandOrEnd=function(){return!!this.isEnd()||null!=this.tokens[this.i+1].match(/^[A-Za-z]$/)},this.isRelativeCommand=function(){switch(this.command){case"m":case"l":case"h":case"v":case"c":case"s":case"q":case"t":case"a":case"z":return!0}return!1},this.getToken=function(){return this.i++,this.tokens[this.i]},this.getScalar=function(){return parseFloat(this.getToken())},this.nextCommand=function(){this.previousCommand=this.command,this.command=this.getToken()},this.getPoint=function(){var t=new A.Point(this.getScalar(),this.getScalar());return this.makeAbsolute(t)},this.getAsControlPoint=function(){var t=this.getPoint();return this.control=t},this.getAsCurrentPoint=function(){var t=this.getPoint();return this.current=t},this.getReflectedControlPoint=function(){return"c"!=this.previousCommand.toLowerCase()&&"s"!=this.previousCommand.toLowerCase()&&"q"!=this.previousCommand.toLowerCase()&&"t"!=this.previousCommand.toLowerCase()?this.current:new A.Point(2*this.current.x-this.control.x,2*this.current.y-this.control.y)},this.makeAbsolute=function(t){return this.isRelativeCommand()&&(t.x+=this.current.x,t.y+=this.current.y),t},this.addMarker=function(t,e,i){null!=i&&0<this.angles.length&&null==this.angles[this.angles.length-1]&&(this.angles[this.angles.length-1]=this.points[this.points.length-1].angleTo(i)),this.addMarkerAngle(t,null==e?null:e.angleTo(t))},this.addMarkerAngle=function(t,e){this.points.push(t),this.angles.push(e)},this.getMarkerPoints=function(){return this.points},this.getMarkerAngles=function(){for(var t=0;t<this.angles.length;t++)if(null==this.angles[t])for(var e=t+1;e<this.angles.length;e++)if(null!=this.angles[e]){this.angles[t]=this.angles[e];break}return this.angles}}(e),this.path=function(t){var e=this.PathParser;e.reset();var i=new A.BoundingBox;for(null!=t&&t.beginPath();!e.isEnd();)switch(e.nextCommand(),e.command){case"M":case"m":var n=e.getAsCurrentPoint();for(e.addMarker(n),i.addPoint(n.x,n.y),null!=t&&t.moveTo(n.x,n.y),e.start=e.current;!e.isCommandOrEnd();)n=e.getAsCurrentPoint(),e.addMarker(n,e.start),i.addPoint(n.x,n.y),null!=t&&t.lineTo(n.x,n.y);break;case"L":case"l":for(;!e.isCommandOrEnd();){var s=e.current;n=e.getAsCurrentPoint(),e.addMarker(n,s),i.addPoint(n.x,n.y),null!=t&&t.lineTo(n.x,n.y)}break;case"H":case"h":for(;!e.isCommandOrEnd();){var a=new A.Point((e.isRelativeCommand()?e.current.x:0)+e.getScalar(),e.current.y);e.addMarker(a,e.current),e.current=a,i.addPoint(e.current.x,e.current.y),null!=t&&t.lineTo(e.current.x,e.current.y)}break;case"V":case"v":for(;!e.isCommandOrEnd();)a=new A.Point(e.current.x,(e.isRelativeCommand()?e.current.y:0)+e.getScalar()),e.addMarker(a,e.current),e.current=a,i.addPoint(e.current.x,e.current.y),null!=t&&t.lineTo(e.current.x,e.current.y);break;case"C":case"c":for(;!e.isCommandOrEnd();){var r=e.current,o=e.getPoint(),l=e.getAsControlPoint(),h=e.getAsCurrentPoint();e.addMarker(h,l,o),i.addBezierCurve(r.x,r.y,o.x,o.y,l.x,l.y,h.x,h.y),null!=t&&t.bezierCurveTo(o.x,o.y,l.x,l.y,h.x,h.y)}break;case"S":case"s":for(;!e.isCommandOrEnd();)r=e.current,o=e.getReflectedControlPoint(),l=e.getAsControlPoint(),h=e.getAsCurrentPoint(),e.addMarker(h,l,o),i.addBezierCurve(r.x,r.y,o.x,o.y,l.x,l.y,h.x,h.y),null!=t&&t.bezierCurveTo(o.x,o.y,l.x,l.y,h.x,h.y);break;case"Q":case"q":for(;!e.isCommandOrEnd();)r=e.current,l=e.getAsControlPoint(),h=e.getAsCurrentPoint(),e.addMarker(h,l,l),i.addQuadraticCurve(r.x,r.y,l.x,l.y,h.x,h.y),null!=t&&t.quadraticCurveTo(l.x,l.y,h.x,h.y);break;case"T":case"t":for(;!e.isCommandOrEnd();)r=e.current,l=e.getReflectedControlPoint(),e.control=l,h=e.getAsCurrentPoint(),e.addMarker(h,l,l),i.addQuadraticCurve(r.x,r.y,l.x,l.y,h.x,h.y),null!=t&&t.quadraticCurveTo(l.x,l.y,h.x,h.y);break;case"A":case"a":for(;!e.isCommandOrEnd();){r=e.current;var u=e.getScalar(),c=e.getScalar(),f=e.getScalar()*(Math.PI/180),m=e.getScalar(),p=e.getScalar(),d=(h=e.getAsCurrentPoint(),new A.Point(Math.cos(f)*(r.x-h.x)/2+Math.sin(f)*(r.y-h.y)/2,-Math.sin(f)*(r.x-h.x)/2+Math.cos(f)*(r.y-h.y)/2)),y=Math.pow(d.x,2)/Math.pow(u,2)+Math.pow(d.y,2)/Math.pow(c,2);1<y&&(u*=Math.sqrt(y),c*=Math.sqrt(y));var v=(m==p?-1:1)*Math.sqrt((Math.pow(u,2)*Math.pow(c,2)-Math.pow(u,2)*Math.pow(d.y,2)-Math.pow(c,2)*Math.pow(d.x,2))/(Math.pow(u,2)*Math.pow(d.y,2)+Math.pow(c,2)*Math.pow(d.x,2)));isNaN(v)&&(v=0);var g=new A.Point(v*u*d.y/c,v*-c*d.x/u),x=new A.Point((r.x+h.x)/2+Math.cos(f)*g.x-Math.sin(f)*g.y,(r.y+h.y)/2+Math.sin(f)*g.x+Math.cos(f)*g.y),b=function(t){return Math.sqrt(Math.pow(t[0],2)+Math.pow(t[1],2))},P=function(t,e){return(t[0]*e[0]+t[1]*e[1])/(b(t)*b(e))},E=function(t,e){return(t[0]*e[1]<t[1]*e[0]?-1:1)*Math.acos(P(t,e))},w=E([1,0],[(d.x-g.x)/u,(d.y-g.y)/c]),B=[(d.x-g.x)/u,(d.y-g.y)/c],C=[(-d.x-g.x)/u,(-d.y-g.y)/c],T=E(B,C);P(B,C)<=-1&&(T=Math.PI),1<=P(B,C)&&(T=0);var V=1-p?1:-1,M=w+V*(T/2),S=new A.Point(x.x+u*Math.cos(M),x.y+c*Math.sin(M));if(e.addMarkerAngle(S,M-V*Math.PI/2),e.addMarkerAngle(h,M-V*Math.PI),i.addPoint(h.x,h.y),null!=t){P=c<u?u:c;var k=c<u?1:u/c,D=c<u?c/u:1;t.translate(x.x,x.y),t.rotate(f),t.scale(k,D),t.arc(0,0,P,w,w+T,1-p),t.scale(1/k,1/D),t.rotate(-f),t.translate(-x.x,-x.y)}}break;case"Z":case"z":null!=t&&i.x1!==i.x2&&i.y1!==i.y2&&t.closePath(),e.current=e.start}return i},this.getMarkers=function(){for(var t=this.PathParser.getMarkerPoints(),e=this.PathParser.getMarkerAngles(),i=[],n=0;n<t.length;n++)i.push([t[n],e[n]]);return i}},A.Element.path.prototype=new A.Element.PathElementBase,A.Element.pattern=function(t){this.base=A.Element.ElementBase,this.base(t),this.createPattern=function(t,e){var i=this.attribute("width").toPixels("x",!0),n=this.attribute("height").toPixels("y",!0),s=new A.Element.svg;s.attributes.viewBox=new A.Property("viewBox",this.attribute("viewBox").value),s.attributes.width=new A.Property("width",i+"px"),s.attributes.height=new A.Property("height",n+"px"),s.attributes.transform=new A.Property("transform",this.attribute("patternTransform").value),s.children=this.children;var a=p();a.width=i,a.height=n;var r=a.getContext("2d");this.attribute("x").hasValue()&&this.attribute("y").hasValue()&&r.translate(this.attribute("x").toPixels("x",!0),this.attribute("y").toPixels("y",!0));for(var o=-1;o<=1;o++)for(var l=-1;l<=1;l++)r.save(),s.attributes.x=new A.Property("x",o*a.width),s.attributes.y=new A.Property("y",l*a.height),s.render(r),r.restore();return t.createPattern(a,"repeat")}},A.Element.pattern.prototype=new A.Element.ElementBase,A.Element.marker=function(t){this.base=A.Element.ElementBase,this.base(t),this.baseRender=this.render,this.render=function(t,e,i){if(e){t.translate(e.x,e.y),"auto"==this.attribute("orient").valueOrDefault("auto")&&t.rotate(i),"strokeWidth"==this.attribute("markerUnits").valueOrDefault("strokeWidth")&&t.scale(t.lineWidth,t.lineWidth),t.save();var n=new A.Element.svg;n.attributes.viewBox=new A.Property("viewBox",this.attribute("viewBox").value),n.attributes.refX=new A.Property("refX",this.attribute("refX").value),n.attributes.refY=new A.Property("refY",this.attribute("refY").value),n.attributes.width=new A.Property("width",this.attribute("markerWidth").value),n.attributes.height=new A.Property("height",this.attribute("markerHeight").value),n.attributes.fill=new A.Property("fill",this.attribute("fill").valueOrDefault("black")),n.attributes.stroke=new A.Property("stroke",this.attribute("stroke").valueOrDefault("none")),n.children=this.children,n.render(t),t.restore(),"strokeWidth"==this.attribute("markerUnits").valueOrDefault("strokeWidth")&&t.scale(1/t.lineWidth,1/t.lineWidth),"auto"==this.attribute("orient").valueOrDefault("auto")&&t.rotate(-i),t.translate(-e.x,-e.y)}}},A.Element.marker.prototype=new A.Element.ElementBase,A.Element.defs=function(t){this.base=A.Element.ElementBase,this.base(t),this.render=function(t){}},A.Element.defs.prototype=new A.Element.ElementBase,A.Element.GradientBase=function(t){this.base=A.Element.ElementBase,this.base(t),this.stops=[];for(var e=0;e<this.children.length;e++){var i=this.children[e];"stop"==i.type&&this.stops.push(i)}this.getGradient=function(){},this.gradientUnits=function(){return this.attribute("gradientUnits").valueOrDefault("objectBoundingBox")},this.attributesToInherit=["gradientUnits"],this.inheritStopContainer=function(t){for(var e=0;e<this.attributesToInherit.length;e++){var i=this.attributesToInherit[e];!this.attribute(i).hasValue()&&t.attribute(i).hasValue()&&(this.attribute(i,!0).value=t.attribute(i).value)}},this.createGradient=function(t,e,i){var n=this;this.getHrefAttribute().hasValue()&&(n=this.getHrefAttribute().getDefinition(),this.inheritStopContainer(n));var s=function(t){return i.hasValue()?new A.Property("color",t).addOpacity(i).value:t},a=this.getGradient(t,e);if(null==a)return s(n.stops[n.stops.length-1].color);for(var r=0;r<n.stops.length;r++)a.addColorStop(n.stops[r].offset,s(n.stops[r].color));if(this.attribute("gradientTransform").hasValue()){var o=A.ViewPort.viewPorts[0],l=new A.Element.rect;l.attributes.x=new A.Property("x",-A.MAX_VIRTUAL_PIXELS/3),l.attributes.y=new A.Property("y",-A.MAX_VIRTUAL_PIXELS/3),l.attributes.width=new A.Property("width",A.MAX_VIRTUAL_PIXELS),l.attributes.height=new A.Property("height",A.MAX_VIRTUAL_PIXELS);var h=new A.Element.g;h.attributes.transform=new A.Property("transform",this.attribute("gradientTransform").value),h.children=[l];var u=new A.Element.svg;u.attributes.x=new A.Property("x",0),u.attributes.y=new A.Property("y",0),u.attributes.width=new A.Property("width",o.width),u.attributes.height=new A.Property("height",o.height),u.children=[h];var c=p();c.width=o.width,c.height=o.height;var f=c.getContext("2d");return f.fillStyle=a,u.render(f),f.createPattern(c,"no-repeat")}return a}},A.Element.GradientBase.prototype=new A.Element.ElementBase,A.Element.linearGradient=function(t){this.base=A.Element.GradientBase,this.base(t),this.attributesToInherit.push("x1"),this.attributesToInherit.push("y1"),this.attributesToInherit.push("x2"),this.attributesToInherit.push("y2"),this.getGradient=function(t,e){var i="objectBoundingBox"==this.gradientUnits()?e.getBoundingBox(t):null;this.attribute("x1").hasValue()||this.attribute("y1").hasValue()||this.attribute("x2").hasValue()||this.attribute("y2").hasValue()||(this.attribute("x1",!0).value=0,this.attribute("y1",!0).value=0,this.attribute("x2",!0).value=1,this.attribute("y2",!0).value=0);var n="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("x1").numValue():this.attribute("x1").toPixels("x"),s="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("y1").numValue():this.attribute("y1").toPixels("y"),a="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("x2").numValue():this.attribute("x2").toPixels("x"),r="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("y2").numValue():this.attribute("y2").toPixels("y");return n==a&&s==r?null:t.createLinearGradient(n,s,a,r)}},A.Element.linearGradient.prototype=new A.Element.GradientBase,A.Element.radialGradient=function(t){this.base=A.Element.GradientBase,this.base(t),this.attributesToInherit.push("cx"),this.attributesToInherit.push("cy"),this.attributesToInherit.push("r"),this.attributesToInherit.push("fx"),this.attributesToInherit.push("fy"),this.getGradient=function(t,e){var i=e.getBoundingBox(t);this.attribute("cx").hasValue()||(this.attribute("cx",!0).value="50%"),this.attribute("cy").hasValue()||(this.attribute("cy",!0).value="50%"),this.attribute("r").hasValue()||(this.attribute("r",!0).value="50%");var n="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("cx").numValue():this.attribute("cx").toPixels("x"),s="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("cy").numValue():this.attribute("cy").toPixels("y"),a=n,r=s;this.attribute("fx").hasValue()&&(a="objectBoundingBox"==this.gradientUnits()?i.x()+i.width()*this.attribute("fx").numValue():this.attribute("fx").toPixels("x")),this.attribute("fy").hasValue()&&(r="objectBoundingBox"==this.gradientUnits()?i.y()+i.height()*this.attribute("fy").numValue():this.attribute("fy").toPixels("y"));var o="objectBoundingBox"==this.gradientUnits()?(i.width()+i.height())/2*this.attribute("r").numValue():this.attribute("r").toPixels();return t.createRadialGradient(a,r,0,n,s,o)}},A.Element.radialGradient.prototype=new A.Element.GradientBase,A.Element.stop=function(t){this.base=A.Element.ElementBase,this.base(t),this.offset=this.attribute("offset").numValue(),this.offset<0&&(this.offset=0),1<this.offset&&(this.offset=1);var e=this.style("stop-color",!0);""===e.value&&(e.value="#000"),this.style("stop-opacity").hasValue()&&(e=e.addOpacity(this.style("stop-opacity"))),this.color=e.value},A.Element.stop.prototype=new A.Element.ElementBase,A.Element.AnimateBase=function(t){this.base=A.Element.ElementBase,this.base(t),A.Animations.push(this),this.duration=0,this.begin=this.attribute("begin").toMilliseconds(),this.maxDuration=this.begin+this.attribute("dur").toMilliseconds(),this.getProperty=function(){var t=this.attribute("attributeType").value,e=this.attribute("attributeName").value;return"CSS"==t?this.parent.style(e,!0):this.parent.attribute(e,!0)},this.initialValue=null,this.initialUnits="",this.removed=!1,this.calcValue=function(){return""},this.update=function(t){if(null==this.initialValue&&(this.initialValue=this.getProperty().value,this.initialUnits=this.getProperty().getUnits()),this.duration>this.maxDuration){if("indefinite"==this.attribute("repeatCount").value||"indefinite"==this.attribute("repeatDur").value)this.duration=0;else if("freeze"!=this.attribute("fill").valueOrDefault("remove")||this.frozen){if("remove"==this.attribute("fill").valueOrDefault("remove")&&!this.removed)return this.removed=!0,this.getProperty().value=this.parent.animationFrozen?this.parent.animationFrozenValue:this.initialValue,!0}else this.frozen=!0,this.parent.animationFrozen=!0,this.parent.animationFrozenValue=this.getProperty().value;return!1}this.duration=this.duration+t;var e=!1;if(this.begin<this.duration){var i=this.calcValue();this.attribute("type").hasValue()&&(i=this.attribute("type").value+"("+i+")"),this.getProperty().value=i,e=!0}return e},this.from=this.attribute("from"),this.to=this.attribute("to"),this.values=this.attribute("values"),this.values.hasValue()&&(this.values.value=this.values.value.split(";")),this.progress=function(){var t={progress:(this.duration-this.begin)/(this.maxDuration-this.begin)};if(this.values.hasValue()){var e=t.progress*(this.values.value.length-1),i=Math.floor(e),n=Math.ceil(e);t.from=new A.Property("from",parseFloat(this.values.value[i])),t.to=new A.Property("to",parseFloat(this.values.value[n])),t.progress=(e-i)/(n-i)}else t.from=this.from,t.to=this.to;return t}},A.Element.AnimateBase.prototype=new A.Element.ElementBase,A.Element.animate=function(t){this.base=A.Element.AnimateBase,this.base(t),this.calcValue=function(){var t=this.progress();return t.from.numValue()+(t.to.numValue()-t.from.numValue())*t.progress+this.initialUnits}},A.Element.animate.prototype=new A.Element.AnimateBase,A.Element.animateColor=function(t){this.base=A.Element.AnimateBase,this.base(t),this.calcValue=function(){var t=this.progress(),e=new m(t.from.value),i=new m(t.to.value);if(e.ok&&i.ok){var n=e.r+(i.r-e.r)*t.progress,s=e.g+(i.g-e.g)*t.progress,a=e.b+(i.b-e.b)*t.progress;return"rgb("+parseInt(n,10)+","+parseInt(s,10)+","+parseInt(a,10)+")"}return this.attribute("from").value}},A.Element.animateColor.prototype=new A.Element.AnimateBase,A.Element.animateTransform=function(t){this.base=A.Element.AnimateBase,this.base(t),this.calcValue=function(){for(var t=this.progress(),e=A.ToNumberArray(t.from.value),i=A.ToNumberArray(t.to.value),n="",s=0;s<e.length;s++)n+=e[s]+(i[s]-e[s])*t.progress+" ";return n}},A.Element.animateTransform.prototype=new A.Element.animate,A.Element.font=function(t){this.base=A.Element.ElementBase,this.base(t),this.horizAdvX=this.attribute("horiz-adv-x").numValue(),this.isRTL=!1,this.isArabic=!1,this.fontFace=null,this.missingGlyph=null,this.glyphs=[];for(var e=0;e<this.children.length;e++){var i=this.children[e];"font-face"==i.type?(this.fontFace=i).style("font-family").hasValue()&&(A.Definitions[i.style("font-family").value]=this):"missing-glyph"==i.type?this.missingGlyph=i:"glyph"==i.type&&(""!=i.arabicForm?(this.isRTL=!0,this.isArabic=!0,void 0===this.glyphs[i.unicode]&&(this.glyphs[i.unicode]=[]),this.glyphs[i.unicode][i.arabicForm]=i):this.glyphs[i.unicode]=i)}},A.Element.font.prototype=new A.Element.ElementBase,A.Element.fontface=function(t){this.base=A.Element.ElementBase,this.base(t),this.ascent=this.attribute("ascent").value,this.descent=this.attribute("descent").value,this.unitsPerEm=this.attribute("units-per-em").numValue()},A.Element.fontface.prototype=new A.Element.ElementBase,A.Element.missingglyph=function(t){this.base=A.Element.path,this.base(t),this.horizAdvX=0},A.Element.missingglyph.prototype=new A.Element.path,A.Element.glyph=function(t){this.base=A.Element.path,this.base(t),this.horizAdvX=this.attribute("horiz-adv-x").numValue(),this.unicode=this.attribute("unicode").value,this.arabicForm=this.attribute("arabic-form").value},A.Element.glyph.prototype=new A.Element.path,A.Element.text=function(t){this.captureTextNodes=!0,this.base=A.Element.RenderedElementBase,this.base(t),this.baseSetContext=this.setContext,this.setContext=function(t){this.baseSetContext(t);var e=this.style("dominant-baseline").toTextBaseline();null==e&&(e=this.style("alignment-baseline").toTextBaseline()),null!=e&&(t.textBaseline=e)},this.initializeCoordinates=function(t){this.x=this.attribute("x").toPixels("x"),this.y=this.attribute("y").toPixels("y"),this.attribute("dx").hasValue()&&(this.x+=this.attribute("dx").toPixels("x")),this.attribute("dy").hasValue()&&(this.y+=this.attribute("dy").toPixels("y")),this.x+=this.getAnchorDelta(t,this,0)},this.getBoundingBox=function(t){this.initializeCoordinates(t);for(var e=null,i=0;i<this.children.length;i++){var n=this.getChildBoundingBox(t,this,this,i);null==e?e=n:e.addBoundingBox(n)}return e},this.renderChildren=function(t){this.initializeCoordinates(t);for(var e=0;e<this.children.length;e++)this.renderChild(t,this,this,e)},this.getAnchorDelta=function(t,e,i){var n=this.style("text-anchor").valueOrDefault("start");if("start"!=n){for(var s=0,a=i;a<e.children.length;a++){var r=e.children[a];if(i<a&&r.attribute("x").hasValue())break;s+=r.measureTextRecursive(t)}return-1*("end"==n?s:s/2)}return 0},this.adjustChildCoordinates=function(t,e,i,n){var s=i.children[n];return s.attribute("x").hasValue()?(s.x=s.attribute("x").toPixels("x")+e.getAnchorDelta(t,i,n),s.attribute("dx").hasValue()&&(s.x+=s.attribute("dx").toPixels("x"))):(s.attribute("dx").hasValue()&&(e.x+=s.attribute("dx").toPixels("x")),s.x=e.x),e.x=s.x+s.measureText(t),s.attribute("y").hasValue()?(s.y=s.attribute("y").toPixels("y"),s.attribute("dy").hasValue()&&(s.y+=s.attribute("dy").toPixels("y"))):(s.attribute("dy").hasValue()&&(e.y+=s.attribute("dy").toPixels("y")),s.y=e.y),e.y=s.y,s},this.getChildBoundingBox=function(t,e,i,n){var s=this.adjustChildCoordinates(t,e,i,n),a=s.getBoundingBox(t);for(n=0;n<s.children.length;n++){var r=e.getChildBoundingBox(t,e,s,n);a.addBoundingBox(r)}return a},this.renderChild=function(t,e,i,n){var s=this.adjustChildCoordinates(t,e,i,n);for(s.render(t),n=0;n<s.children.length;n++)e.renderChild(t,e,s,n)}},A.Element.text.prototype=new A.Element.RenderedElementBase,A.Element.TextElementBase=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.getGlyph=function(t,e,i){var n=e[i],s=null;if(t.isArabic){var a="isolated";(0==i||" "==e[i-1])&&i<e.length-2&&" "!=e[i+1]&&(a="terminal"),0<i&&" "!=e[i-1]&&i<e.length-2&&" "!=e[i+1]&&(a="medial"),0<i&&" "!=e[i-1]&&(i==e.length-1||" "==e[i+1])&&(a="initial"),void 0!==t.glyphs[n]&&null==(s=t.glyphs[n][a])&&"glyph"==t.glyphs[n].type&&(s=t.glyphs[n])}else s=t.glyphs[n];return null==s&&(s=t.missingGlyph),s},this.renderChildren=function(t){var e=this.parent.style("font-family").getDefinition();if(null==e)"stroke"==t.paintOrder?(""!=t.strokeStyle&&t.strokeText(A.compressSpaces(this.getText()),this.x,this.y),""!=t.fillStyle&&t.fillText(A.compressSpaces(this.getText()),this.x,this.y)):(""!=t.fillStyle&&t.fillText(A.compressSpaces(this.getText()),this.x,this.y),""!=t.strokeStyle&&t.strokeText(A.compressSpaces(this.getText()),this.x,this.y));else{var i=this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize),n=this.parent.style("font-style").valueOrDefault(A.Font.Parse(A.ctx.font).fontStyle),s=this.getText();e.isRTL&&(s=s.split("").reverse().join(""));for(var a=A.ToNumberArray(this.parent.attribute("dx").value),r=0;r<s.length;r++){var o=this.getGlyph(e,s,r),l=i/e.fontFace.unitsPerEm;t.translate(this.x,this.y),t.scale(l,-l);var h=t.lineWidth;t.lineWidth=t.lineWidth*e.fontFace.unitsPerEm/i,"italic"==n&&t.transform(1,0,.4,1,0,0),o.render(t),"italic"==n&&t.transform(1,0,-.4,1,0,0),t.lineWidth=h,t.scale(1/l,-1/l),t.translate(-this.x,-this.y),this.x+=i*(o.horizAdvX||e.horizAdvX)/e.fontFace.unitsPerEm,void 0===a[r]||isNaN(a[r])||(this.x+=a[r])}}},this.getText=function(){},this.measureTextRecursive=function(t){for(var e=this.measureText(t),i=0;i<this.children.length;i++)e+=this.children[i].measureTextRecursive(t);return e},this.measureText=function(t){var e=this.parent.style("font-family").getDefinition();if(null!=e){var i=this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize),n=0,s=this.getText();e.isRTL&&(s=s.split("").reverse().join(""));for(var a=A.ToNumberArray(this.parent.attribute("dx").value),r=0;r<s.length;r++)n+=(this.getGlyph(e,s,r).horizAdvX||e.horizAdvX)*i/e.fontFace.unitsPerEm,void 0===a[r]||isNaN(a[r])||(n+=a[r]);return n}var o=A.compressSpaces(this.getText());if(!t.measureText)return 10*o.length;t.save(),this.setContext(t,!0);var l=t.measureText(o).width;return t.restore(),l},this.getBoundingBox=function(t){var e=this.parent.style("font-size").numValueOrDefault(A.Font.Parse(A.ctx.font).fontSize);return new A.BoundingBox(this.x,this.y-e,this.x+this.measureText(t),this.y)}},A.Element.TextElementBase.prototype=new A.Element.RenderedElementBase,A.Element.tspan=function(t){this.captureTextNodes=!0,this.base=A.Element.TextElementBase,this.base(t),this.text=A.compressSpaces(t.value||t.text||t.textContent||""),this.getText=function(){return 0<this.children.length?"":this.text}},A.Element.tspan.prototype=new A.Element.TextElementBase,A.Element.tref=function(t){this.base=A.Element.TextElementBase,this.base(t),this.getText=function(){var t=this.getHrefAttribute().getDefinition();if(null!=t)return t.children[0].getText()}},A.Element.tref.prototype=new A.Element.TextElementBase,A.Element.a=function(t){this.base=A.Element.TextElementBase,this.base(t),this.hasText=0<t.childNodes.length;for(var e=0;e<t.childNodes.length;e++)3!=t.childNodes[e].nodeType&&(this.hasText=!1);this.text=this.hasText?t.childNodes[0].value||t.childNodes[0].data:"",this.getText=function(){return this.text},this.baseRenderChildren=this.renderChildren,this.renderChildren=function(t){if(this.hasText){this.baseRenderChildren(t);var e=new A.Property("fontSize",A.Font.Parse(A.ctx.font).fontSize);A.Mouse.checkBoundingBox(this,new A.BoundingBox(this.x,this.y-e.toPixels("y"),this.x+this.measureText(t),this.y))}else if(0<this.children.length){var i=new A.Element.g;i.children=this.children,i.parent=this,i.render(t)}},this.onclick=function(){u.open(this.getHrefAttribute().value)},this.onmousemove=function(){A.ctx.canvas.style.cursor="pointer"}},A.Element.a.prototype=new A.Element.TextElementBase,A.Element.image=function(t){this.base=A.Element.RenderedElementBase,this.base(t);var e=this.getHrefAttribute().value;if(""!=e){var a=e.match(/\.svg$/);if(A.Images.push(this),this.loaded=!1,a)this.img=A.ajax(e),this.loaded=!0;else{this.img=document.createElement("img"),1==A.opts.useCORS&&(this.img.crossOrigin="Anonymous");var r=this;this.img.onload=function(){r.loaded=!0},this.img.onerror=function(){A.log('ERROR: image "'+e+'" not found'),r.loaded=!0},this.img.src=e}this.renderChildren=function(t){var e=this.attribute("x").toPixels("x"),i=this.attribute("y").toPixels("y"),n=this.attribute("width").toPixels("x"),s=this.attribute("height").toPixels("y");0!=n&&0!=s&&(t.save(),a?t.drawSvg(this.img,e,i,n,s):(t.translate(e,i),A.AspectRatio(t,this.attribute("preserveAspectRatio").value,n,this.img.width,s,this.img.height,0,0),r.loaded&&(void 0===this.img.complete||this.img.complete)&&t.drawImage(this.img,0,0)),t.restore())},this.getBoundingBox=function(){var t=this.attribute("x").toPixels("x"),e=this.attribute("y").toPixels("y"),i=this.attribute("width").toPixels("x"),n=this.attribute("height").toPixels("y");return new A.BoundingBox(t,e,t+i,e+n)}}},A.Element.image.prototype=new A.Element.RenderedElementBase,A.Element.g=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.getBoundingBox=function(t){for(var e=new A.BoundingBox,i=0;i<this.children.length;i++)e.addBoundingBox(this.children[i].getBoundingBox(t));return e}},A.Element.g.prototype=new A.Element.RenderedElementBase,A.Element.symbol=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.render=function(t){}},A.Element.symbol.prototype=new A.Element.RenderedElementBase,A.Element.style=function(t){this.base=A.Element.ElementBase,this.base(t);for(var e="",i=0;i<t.childNodes.length;i++)e+=t.childNodes[i].data;e=e.replace(/(\/\*([^*]|[\r\n]|(\*+([^*\/]|[\r\n])))*\*+\/)|(^[\s]*\/\/.*)/gm,"");var n=(e=A.compressSpaces(e)).split("}");for(i=0;i<n.length;i++)if(""!=A.trim(n[i]))for(var s=n[i].split("{"),a=s[0].split(","),r=s[1].split(";"),o=0;o<a.length;o++){var l=A.trim(a[o]);if(""!=l){for(var h=A.Styles[l]||{},u=0;u<r.length;u++){var c=r[u].indexOf(":"),f=r[u].substr(0,c),m=r[u].substr(c+1,r[u].length-c);null!=f&&null!=m&&(h[A.trim(f)]=new A.Property(A.trim(f),A.trim(m)))}if(A.Styles[l]=h,A.StylesSpecificity[l]=w(l),"@font-face"==l)for(var p=h["font-family"].value.replace(/"/g,""),d=h.src.value.split(","),y=0;y<d.length;y++)if(0<d[y].indexOf('format("svg")'))for(var v=d[y].indexOf("url"),g=d[y].indexOf(")",v),x=d[y].substr(v+5,g-v-6),b=A.parseXml(A.ajax(x)).getElementsByTagName("font"),P=0;P<b.length;P++){var E=A.CreateElement(b[P]);A.Definitions[p]=E}}}},A.Element.style.prototype=new A.Element.ElementBase,A.Element.use=function(t){this.base=A.Element.RenderedElementBase,this.base(t),this.baseSetContext=this.setContext,this.setContext=function(t){this.baseSetContext(t),this.attribute("x").hasValue()&&t.translate(this.attribute("x").toPixels("x"),0),this.attribute("y").hasValue()&&t.translate(0,this.attribute("y").toPixels("y"))};var n=this.getHrefAttribute().getDefinition();this.path=function(t){null!=n&&n.path(t)},this.elementTransform=function(){if(null!=n&&n.style("transform",!1,!0).hasValue())return new A.Transform(n.style("transform",!1,!0).value)},this.getBoundingBox=function(t){if(null!=n)return n.getBoundingBox(t)},this.renderChildren=function(t){if(null!=n){var e=n;"symbol"==n.type&&((e=new A.Element.svg).type="svg",e.attributes.viewBox=new A.Property("viewBox",n.attribute("viewBox").value),e.attributes.preserveAspectRatio=new A.Property("preserveAspectRatio",n.attribute("preserveAspectRatio").value),e.attributes.overflow=new A.Property("overflow",n.attribute("overflow").value),e.children=n.children),"svg"==e.type&&(this.attribute("width").hasValue()&&(e.attributes.width=new A.Property("width",this.attribute("width").value)),this.attribute("height").hasValue()&&(e.attributes.height=new A.Property("height",this.attribute("height").value)));var i=e.parent;e.parent=null,e.render(t),e.parent=i}}},A.Element.use.prototype=new A.Element.RenderedElementBase,A.Element.mask=function(t){this.base=A.Element.ElementBase,this.base(t),this.apply=function(t,e){var i=this.attribute("x").toPixels("x"),n=this.attribute("y").toPixels("y"),s=this.attribute("width").toPixels("x"),a=this.attribute("height").toPixels("y");if(0==s&&0==a){for(var r=new A.BoundingBox,o=0;o<this.children.length;o++)r.addBoundingBox(this.children[o].getBoundingBox(t));i=Math.floor(r.x1),n=Math.floor(r.y1),s=Math.floor(r.width()),a=Math.floor(r.height())}var l=e.attribute("mask").value;e.attribute("mask").value="";var h=p();h.width=i+s,h.height=n+a;var u=h.getContext("2d");this.renderChildren(u);var c=p();c.width=i+s,c.height=n+a;var f=c.getContext("2d");e.render(f),f.globalCompositeOperation="destination-in",f.fillStyle=u.createPattern(h,"no-repeat"),f.fillRect(0,0,i+s,n+a),t.fillStyle=f.createPattern(c,"no-repeat"),t.fillRect(0,0,i+s,n+a),e.attribute("mask").value=l},this.render=function(t){}},A.Element.mask.prototype=new A.Element.ElementBase,A.Element.clipPath=function(t){this.base=A.Element.ElementBase,this.base(t),this.apply=function(t){var e="undefined"!=typeof CanvasRenderingContext2D,i=t.beginPath,n=t.closePath;e&&(CanvasRenderingContext2D.prototype.beginPath=function(){},CanvasRenderingContext2D.prototype.closePath=function(){}),i.call(t);for(var s=0;s<this.children.length;s++){var a=this.children[s];if(void 0!==a.path){var r=void 0!==a.elementTransform&&a.elementTransform();!r&&a.style("transform",!1,!0).hasValue()&&(r=new A.Transform(a.style("transform",!1,!0).value)),r&&r.apply(t),a.path(t),e&&(CanvasRenderingContext2D.prototype.closePath=n),r&&r.unapply(t)}}n.call(t),t.clip(),e&&(CanvasRenderingContext2D.prototype.beginPath=i,CanvasRenderingContext2D.prototype.closePath=n)},this.render=function(t){}},A.Element.clipPath.prototype=new A.Element.ElementBase,A.Element.filter=function(t){this.base=A.Element.ElementBase,this.base(t),this.apply=function(t,e){var i=e.getBoundingBox(t),n=Math.floor(i.x1),s=Math.floor(i.y1),a=Math.floor(i.width()),r=Math.floor(i.height()),o=e.style("filter").value;e.style("filter").value="";for(var l=0,h=0,u=0;u<this.children.length;u++){var c=this.children[u].extraFilterDistance||0;l=Math.max(l,c),h=Math.max(h,c)}var f=p();f.width=a+2*l,f.height=r+2*h;var m=f.getContext("2d");for(m.translate(-n+l,-s+h),e.render(m),u=0;u<this.children.length;u++)"function"==typeof this.children[u].apply&&this.children[u].apply(m,0,0,a+2*l,r+2*h);t.drawImage(f,0,0,a+2*l,r+2*h,n-l,s-h,a+2*l,r+2*h),e.style("filter",!0).value=o},this.render=function(t){}},A.Element.filter.prototype=new A.Element.ElementBase,A.Element.feMorphology=function(t){this.base=A.Element.ElementBase,this.base(t),this.apply=function(t,e,i,n,s){}},A.Element.feMorphology.prototype=new A.Element.ElementBase,A.Element.feComposite=function(t){this.base=A.Element.ElementBase,this.base(t),this.apply=function(t,e,i,n,s){}},A.Element.feComposite.prototype=new A.Element.ElementBase,A.Element.feColorMatrix=function(t){this.base=A.Element.ElementBase,this.base(t);var n=A.ToNumberArray(this.attribute("values").value);switch(this.attribute("type").valueOrDefault("matrix")){case"saturate":var e=n[0];n=[.213+.787*e,.715-.715*e,.072-.072*e,0,0,.213-.213*e,.715+.285*e,.072-.072*e,0,0,.213-.213*e,.715-.715*e,.072+.928*e,0,0,0,0,0,1,0,0,0,0,0,1];break;case"hueRotate":var s=n[0]*Math.PI/180,i=function(t,e,i){return t+Math.cos(s)*e+Math.sin(s)*i};n=[i(.213,.787,-.213),i(.715,-.715,-.715),i(.072,-.072,.928),0,0,i(.213,-.213,.143),i(.715,.285,.14),i(.072,-.072,-.283),0,0,i(.213,-.213,-.787),i(.715,-.715,.715),i(.072,.928,.072),0,0,0,0,0,1,0,0,0,0,0,1];break;case"luminanceToAlpha":n=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,.2125,.7154,.0721,0,0,0,0,0,0,1]}function u(t,e,i,n,s,a){return t[i*n*4+4*e+a]}function c(t,e,i,n,s,a,r){t[i*n*4+4*e+a]=r}function f(t,e){var i=n[t];return i*(i<0?e-255:e)}this.apply=function(t,e,i,n,s){var a=t.getImageData(0,0,n,s);for(i=0;i<s;i++)for(e=0;e<n;e++){var r=u(a.data,e,i,n,0,0),o=u(a.data,e,i,n,0,1),l=u(a.data,e,i,n,0,2),h=u(a.data,e,i,n,0,3);c(a.data,e,i,n,0,0,f(0,r)+f(1,o)+f(2,l)+f(3,h)+f(4,1)),c(a.data,e,i,n,0,1,f(5,r)+f(6,o)+f(7,l)+f(8,h)+f(9,1)),c(a.data,e,i,n,0,2,f(10,r)+f(11,o)+f(12,l)+f(13,h)+f(14,1)),c(a.data,e,i,n,0,3,f(15,r)+f(16,o)+f(17,l)+f(18,h)+f(19,1))}t.clearRect(0,0,n,s),t.putImageData(a,0,0)}},A.Element.feColorMatrix.prototype=new A.Element.ElementBase,A.Element.feGaussianBlur=function(t){this.base=A.Element.ElementBase,this.base(t),this.blurRadius=Math.floor(this.attribute("stdDeviation").numValue()),this.extraFilterDistance=this.blurRadius,this.apply=function(t,e,i,n,s){d&&void 0!==d.canvasRGBA?(t.canvas.id=A.UniqueId(),t.canvas.style.display="none",document.body.appendChild(t.canvas),d.canvasRGBA(t.canvas,e,i,n,s,this.blurRadius),document.body.removeChild(t.canvas)):A.log("ERROR: StackBlur.js must be included for blur to work")}},A.Element.feGaussianBlur.prototype=new A.Element.ElementBase,A.Element.title=function(t){},A.Element.title.prototype=new A.Element.ElementBase,A.Element.desc=function(t){},A.Element.desc.prototype=new A.Element.ElementBase,A.Element.MISSING=function(t){A.log("ERROR: Element '"+t.nodeName+"' not yet implemented.")},A.Element.MISSING.prototype=new A.Element.ElementBase,A.CreateElement=function(t){var e=t.nodeName.replace(/^[^:]+:/,"");e=e.replace(/\-/g,"");var i=null;return(i=void 0!==A.Element[e]?new A.Element[e](t):new A.Element.MISSING(t)).type=t.nodeName,i},A.load=function(t,e){A.loadXml(t,A.ajax(e))},A.loadXml=function(t,e){A.loadXmlDoc(t,A.parseXml(e))},A.loadXmlDoc=function(a,r){A.init(a);var i=function(t){for(var e=a.canvas;e;)t.x-=e.offsetLeft,t.y-=e.offsetTop,e=e.offsetParent;return u.scrollX&&(t.x+=u.scrollX),u.scrollY&&(t.y+=u.scrollY),t};1!=A.opts.ignoreMouse&&(a.canvas.onclick=function(t){var e=i(new A.Point(null!=t?t.clientX:event.clientX,null!=t?t.clientY:event.clientY));A.Mouse.onclick(e.x,e.y)},a.canvas.onmousemove=function(t){var e=i(new A.Point(null!=t?t.clientX:event.clientX,null!=t?t.clientY:event.clientY));A.Mouse.onmousemove(e.x,e.y)});var o=A.CreateElement(r.documentElement);o.root=!0,o.addStylesFromStyleDefinition();var l=!0,n=function(){A.ViewPort.Clear(),a.canvas.parentNode?A.ViewPort.SetCurrent(a.canvas.parentNode.clientWidth,a.canvas.parentNode.clientHeight):A.ViewPort.SetCurrent(800,600),1!=A.opts.ignoreDimensions&&(o.style("width").hasValue()&&(a.canvas.width=o.style("width").toPixels("x"),a.canvas.style&&(a.canvas.style.width=a.canvas.width+"px")),o.style("height").hasValue()&&(a.canvas.height=o.style("height").toPixels("y"),a.canvas.style&&(a.canvas.style.height=a.canvas.height+"px")));var t=a.canvas.clientWidth||a.canvas.width,e=a.canvas.clientHeight||a.canvas.height;if(1==A.opts.ignoreDimensions&&o.style("width").hasValue()&&o.style("height").hasValue()&&(t=o.style("width").toPixels("x"),e=o.style("height").toPixels("y")),A.ViewPort.SetCurrent(t,e),null!=A.opts.offsetX&&(o.attribute("x",!0).value=A.opts.offsetX),null!=A.opts.offsetY&&(o.attribute("y",!0).value=A.opts.offsetY),null!=A.opts.scaleWidth||null!=A.opts.scaleHeight){var i=null,n=null,s=A.ToNumberArray(o.attribute("viewBox").value);null!=A.opts.scaleWidth&&(o.attribute("width").hasValue()?i=o.attribute("width").toPixels("x")/A.opts.scaleWidth:isNaN(s[2])||(i=s[2]/A.opts.scaleWidth)),null!=A.opts.scaleHeight&&(o.attribute("height").hasValue()?n=o.attribute("height").toPixels("y")/A.opts.scaleHeight:isNaN(s[3])||(n=s[3]/A.opts.scaleHeight)),null==i&&(i=n),null==n&&(n=i),o.attribute("width",!0).value=A.opts.scaleWidth,o.attribute("height",!0).value=A.opts.scaleHeight,o.style("transform",!0,!0).value+=" scale("+1/i+","+1/n+")"}1!=A.opts.ignoreClear&&a.clearRect(0,0,t,e),o.render(a),l&&(l=!1,"function"==typeof A.opts.renderCallback&&A.opts.renderCallback(r))},s=!0;A.ImagesLoaded()&&(s=!1,n()),A.intervalID=setInterval(function(){var t=!1;if(s&&A.ImagesLoaded()&&(t=!(s=!1)),1!=A.opts.ignoreMouse&&(t|=A.Mouse.hasEvents()),1!=A.opts.ignoreAnimation)for(var e=0;e<A.Animations.length;e++)t|=A.Animations[e].update(1e3/A.FRAMERATE);"function"==typeof A.opts.forceRedraw&&1==A.opts.forceRedraw()&&(t=!0),t&&(n(),A.Mouse.runEvents())},1e3/A.FRAMERATE)},A.stop=function(){A.intervalID&&clearInterval(A.intervalID)},A.Mouse=new function(){this.events=[],this.hasEvents=function(){return 0!=this.events.length},this.onclick=function(t,e){this.events.push({type:"onclick",x:t,y:e,run:function(t){t.onclick&&t.onclick()}})},this.onmousemove=function(t,e){this.events.push({type:"onmousemove",x:t,y:e,run:function(t){t.onmousemove&&t.onmousemove()}})},this.eventElements=[],this.checkPath=function(t,e){for(var i=0;i<this.events.length;i++){var n=this.events[i];e.isPointInPath&&e.isPointInPath(n.x,n.y)&&(this.eventElements[i]=t)}},this.checkBoundingBox=function(t,e){for(var i=0;i<this.events.length;i++){var n=this.events[i];e.isPointInBox(n.x,n.y)&&(this.eventElements[i]=t)}},this.runEvents=function(){A.ctx.canvas.style.cursor="";for(var t=0;t<this.events.length;t++)for(var e=this.events[t],i=this.eventElements[t];i;)e.run(i),i=i.parent;this.events=[],this.eventElements=[]}},A}(i||{});"string"==typeof t&&(t=document.getElementById(t)),null!=t.svg&&t.svg.stop(),t.childNodes&&1==t.childNodes.length&&"OBJECT"==t.childNodes[0].nodeName||(t.svg=n);var s=t.getContext("2d");void 0!==e.documentElement?n.loadXmlDoc(s,e):"<"==e.substr(0,1)?n.loadXml(s,e):n.load(s,e)}else for(var a=document.querySelectorAll("svg"),r=0;r<a.length;r++){var o=a[r],l=document.createElement("canvas");l.width=o.clientWidth,l.height=o.clientHeight,o.parentNode.insertBefore(l,o),o.parentNode.removeChild(o);var h=document.createElement("div");h.appendChild(o),c(l,h.innerHTML)}};"undefined"==typeof Element||(void 0!==Element.prototype.matches?f=function(t,e){return t.matches(e)}:void 0!==Element.prototype.webkitMatchesSelector?f=function(t,e){return t.webkitMatchesSelector(e)}:void 0!==Element.prototype.mozMatchesSelector?f=function(t,e){return t.mozMatchesSelector(e)}:void 0!==Element.prototype.msMatchesSelector?f=function(t,e){return t.msMatchesSelector(e)}:void 0!==Element.prototype.oMatchesSelector?f=function(t,e){return t.oMatchesSelector(e)}:("function"!=typeof jQuery&&"function"!=typeof Zepto||(f=function(t,e){return $(t).is(e)}),void 0===f&&"undefined"!=typeof Sizzle&&(f=Sizzle.matchesSelector)));var e=/(\[[^\]]+\])/g,i=/(#[^\s\+>~\.\[:]+)/g,a=/(\.[^\s\+>~\.\[:]+)/g,r=/(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi,o=/(:[\w-]+\([^\)]*\))/gi,l=/(:[^\s\+>~\.\[:]+)/g,h=/([^\s\+>~\.\[:]+)/g;function w(n){var s=[0,0,0],t=function(t,e){var i=n.match(t);null!=i&&(s[e]+=i.length,n=n.replace(t," "))};return n=(n=n.replace(/:not\(([^\)]*)\)/g,"     $1 ")).replace(/{[\s\S]*/gm," "),t(e,1),t(i,0),t(a,1),t(r,2),t(o,1),t(l,1),n=(n=n.replace(/[\*\s\+>~]/g," ")).replace(/[#\.]/g," "),t(h,2),s.join("")}"undefined"!=typeof CanvasRenderingContext2D&&(CanvasRenderingContext2D.prototype.drawSvg=function(t,e,i,n,s,a){var r={ignoreMouse:!0,ignoreAnimation:!0,ignoreDimensions:!0,ignoreClear:!0,offsetX:e,offsetY:i,scaleWidth:n,scaleHeight:s};for(var o in a)a.hasOwnProperty(o)&&(r[o]=a[o]);c(this.canvas,t,r)}),t.exports=c}(t={exports:{}},t.exports),t.exports});

/***/ }),

/***/ "AzSJ":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_AzSJ__;

/***/ }),

/***/ "B8n6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'SmIcon',
  mixins: [_theme.default],
  props: {
    type: {
      type: String,
      default: 'info'
    },
    iconStyle: {
      type: Object
    },
    theme: {
      type: String,
      default: 'outlined'
    },
    twoToneColor: {
      type: String
    },
    iconClass: {
      type: String
    },
    component: {
      type: Object
    },
    autoPrefix: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    colorStyle: function colorStyle() {
      return !this.iconStyle || !this.iconStyle.color ? this.getColorStyle(0) : {
        color: this.iconStyle.color
      };
    },
    customIconClass: function customIconClass() {
      return this.autoPrefix ? 'sm-components-icons-' + this.iconClass : this.iconClass;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "BFO0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _leaflet = _interopRequireDefault(__webpack_require__("hgx0"));

__webpack_require__("17FK");

var _propsBinder = __webpack_require__("hS5c");

var RasterTileLayerViewModel =
/*#__PURE__*/
function (_L$Evented) {
  (0, _inherits2.default)(RasterTileLayerViewModel, _L$Evented);

  function RasterTileLayerViewModel(options) {
    var _this;

    (0, _classCallCheck2.default)(this, RasterTileLayerViewModel);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RasterTileLayerViewModel).call(this));
    _this.defaultOptions = {
      minZoom: 0,
      maxZoom: 22,
      opacity: 1,
      tileSize: 256
    };

    var _loop = function _loop(key) {
      var setMethodName = 'set' + (0, _propsBinder.capitalizeFirstLetter)(key);

      _this[setMethodName] = function (newVal) {
        if (this.layer) {
          this.layer._paramsChanged = true;

          if (key === 'url') {
            this.layer.setUrl(newVal);
          } else if (key === 'bounds') {
            this.layer.options[key] = this._setBounds(newVal);
          } else {
            this.layer.options[key] = newVal;
            this.layer.redraw();
          }
        }
      };
    };

    for (var key in options) {
      _loop(key);
    }

    Object.assign(_this.defaultOptions, options);
    _this.defaultOptions.bounds && (_this.defaultOptions.bounds = _this._setBounds(_this.defaultOptions.bounds));

    _this._init();

    return _this;
  }

  (0, _createClass2.default)(RasterTileLayerViewModel, [{
    key: "_setBounds",
    value: function _setBounds(bounds) {
      return _leaflet.default.latLngBounds(_leaflet.default.latLng(bounds[1], bounds[0]), _leaflet.default.latLng(bounds[3], bounds[2]));
    }
  }, {
    key: "_init",
    value: function _init() {
      this._addLayer();
    }
  }, {
    key: "_addLayer",
    value: function _addLayer() {
      this.layer = _leaflet.default.supermap.tiledMapLayer(this.defaultOptions.url, this.defaultOptions);
    }
  }, {
    key: "getLayer",
    value: function getLayer() {
      return this.layer;
    }
  }, {
    key: "addTo",
    value: function addTo(map) {
      this.map = map;
      this.map.addLayer(this.layer);
    }
  }, {
    key: "clear",
    value: function clear() {
      var map = this.map,
          layer = this.layer;

      if (map && layer && map.hasLayer(this.layer)) {
        map.removeLayer(layer);
      }
    }
  }]);
  return RasterTileLayerViewModel;
}(_leaflet.default.Evented);

exports.default = RasterTileLayerViewModel;

/***/ }),

/***/ "BtDp":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ydGV");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "C/aJ":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "C07L":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _CountTo_vue_vue_type_template_id_53dff5c7___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3DSN");
/* harmony import */ var _CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("1Mc+");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _CountTo_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _CountTo_vue_vue_type_template_id_53dff5c7___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _CountTo_vue_vue_type_template_id_53dff5c7___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "C55n":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/border/Border.vue?vue&type=template&id=52e77cab&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:_vm.borderId,staticClass:"sm-component-border",style:(_vm.borderStyle)},[_c('div',{staticClass:"sm-component-border__content",style:(_vm.contentStyle)},[_vm._t("default")],2)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/border/Border.vue?vue&type=template&id=52e77cab&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "Cb6A":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "DMW1":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAADf1JREFUeAHt3N1tnIUahdFxRA2UkAboIog2aMJI5IJUhJLyPGcGGJ+J5QTHCG/xeHHjfP5hs9cbKVseh5ub20/Hg38IECBAgAABAo8IHD+8u3nk3V9815svfsQHCBAgQIAAAQLfKPDd5fO/dZFcvs5bAgQIECBAoCfw3Fc0fMei93tBIwIECBAgMBMwLGb0ggkQIECAQE/AsOjdVCMCBAgQIDATuP8Zi4f/BTe3H39/+D7PBAgQIECAwCsROP75l0Yf7oHjhx9/+prAF4fF+Yv+7ou/9i/2MQIECBAgQOC/K3D54c3TX+64HxIPR8Zj7bwU8piK9xEgQIAAAQLPEjAsnsXmiwgQIECAAIHHBL76Usj1F7z55eP762e/JkCAAAECBLoCx79+xuL6z//j3eHt9fO5/d1vP76/VnjysHjsi6//RX5NgAABAgQIdAROP2Px67nN3W/v3l9anX7G4ofrIfFwZJw/z0shFy1vCRAgQIAAgX8s8E3fsfgs7fbT/U+JfvZ+DwQIECBAgMB/XuCvV0IOh6s/74+H4/fXz3fH49vr53Pp5w+L81d/eOf/dXF28A8BAgQIEIgJnF4K+aPR6a+b3v9Zf3op5Ofr59NLIaeXRv7/8fPI8FJI7DeCOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYgGERO6g6BAgQIEBgKWBYLPVlEyBAgACBmIBhETuoOgQIECBAYClgWCz1ZRMgQIAAgZiAYRE7qDoECBAgQGApYFgs9WUTIECAAIGYwHeXPje3n46XX//x9ng8XL/v+Ofzr5fPOT2eP3559JYAAQIECBAgcPAdC78JCBAgQIAAgX9f4Ob24+/XKW9++fj++vlw++mnz549ECBAgAABAmmBp2wD37FI/xZQjgABAgQIvKzA/c9YPBZ7vUyOd4e3p+cfLp93PBy/Pz3/fHn2lgABAgQIECDwZAEvhTyZyicSIECAAIFXIfDYNvBSyKs4vZIECBAgQOBlBAyLl3GWQoAAAQIEXoXAV3/G4qHA9bc87o7Ht6fn+5+5ePi5ngkQIECAAAECTxfw102fbuUzCRAgQIDAaxA4bQMvhbyGQ+tIgAABAgReSMCweCFoMQQIECBA4DUI3Dy7pJdCnk3nCwkQIECAQFXgf58egNySoaJ8AAAAAElFTkSuQmCC"

/***/ }),

/***/ "DSM6":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLanguage = getLanguage;
exports.geti18n = geti18n;
exports.setLocale = setLocale;
exports.initi18n = initi18n;
exports.default = exports.lang = void 0;

var _objectSpread2 = _interopRequireDefault(__webpack_require__("MVZn"));

var _jsCookie = _interopRequireDefault(__webpack_require__("p46w"));

var _en = _interopRequireDefault(__webpack_require__("W1yv"));

var _zh = _interopRequireDefault(__webpack_require__("ORi+"));

var _lodash = _interopRequireDefault(__webpack_require__("zT9C"));

var _vueI18n = _interopRequireDefault(__webpack_require__("qSUR"));

// import Vue from 'vue';
var dateTimeFormats = {
  en: _en.default.dateTimeFormat,
  zh: _zh.default.dateTimeFormat
};
var i18n = {};
var rooti18n;
var messages = {
  en: (0, _objectSpread2.default)({}, _en.default),
  zh: (0, _objectSpread2.default)({}, _zh.default)
};

function getLanguage() {
  var lang = _jsCookie.default.get('language');

  if (!lang) {
    if (navigator.appName === 'Netscape') {
      lang = navigator.language;
    } else {
      lang = navigator.browserLanguage;
    }
  }

  if (lang) {
    if (lang.indexOf('zh') === 0) {
      return 'zh';
    }

    if (lang.indexOf('en') === 0) {
      return 'en';
    }
  }

  return 'zh';
}

function geti18n(n) {
  return rooti18n || i18n;
}

function setLocale(locales) {
  i18n.mergeLocaleMessage && i18n.mergeLocaleMessage(i18n.locale, locales);
}

var lang = {
  en: (0, _lodash.default)(_en.default),
  zh: (0, _lodash.default)(_zh.default)
};
exports.lang = lang;

function initi18n(Vue, config) {
  config = config || {};

  if (config.i18n) {
    i18n = config.i18n;

    if (!i18n.getDateTimeFormat().hasOwnProperty()) {
      i18n.setDateTimeFormat('en', _en.default.dateTimeFormat);
      i18n.setDateTimeFormat('zh', _zh.default.dateTimeFormat);
    }

    i18n.mergeLocaleMessage && i18n.mergeLocaleMessage('en', _en.default);
    i18n.mergeLocaleMessage && i18n.mergeLocaleMessage('zh', _zh.default);
  } else if (!Vue.prototype.hasOwnProperty('$i18n')) {
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get() {
        if (!rooti18n && this.$root && this.$root.$options.i18n) {
          rooti18n = this.$root.$options.i18n;
        }

        return rooti18n || i18n;
      }
    });
    Vue.use(_vueI18n.default);
    i18n = new _vueI18n.default({
      dateTimeFormats: dateTimeFormats,
      locale: getLanguage(),
      fallbackLocale: 'zh',
      messages: messages
    });
  }

  if (config.locale) {
    setLocale(config.locale);
  }
}

var _default = i18n;
/*
Example
假设国际化资源配置为：
layerList: {
    title: "图层",
    hello: '{msg} world',
    hello1: '{0} world',
    theWorld: 'the world',
    dio: 'DIO:',
    linked: '@:(message.dio) @:(message.theWorld) !!!!'，
    apple: 'no apples | one apple | {count} apples'
},
vue中调用：
this.$tc('layerList.apple',10,{ count: 20 })

文本模板调用：
$t方法：
<span>{{$t("layerList.title")}}</span>
==>
<span>图层</span>

<span>{{$t("layerList.hello",{msg:"hello"})}}</span>
==>
<span>hello world</span>

<span>{{$t("layerList.hello1",["bye"])}}</span>
==>
<span>bye world</span>

<span>{{$t("layerList.linked")}}</span>
==>
<span>DIO: the world !!!!</span>

$tc方法：
<p>{{ $tc('layerList.apple', 0) }}</p>
==>
<p>no apples</p>

<p>{{ $tc('layerList.apple', 1) }}</p>
==>
<p>one apple</p>

<p>{{ $tc('layerList.apple', 10}}</p>
==>
<p>10 apples</p>

<p>{{ $tc('layerList.apple', 10, { count: 20 }) }}</p>
==>
<p>20 apples</p>

日期格式处理（$d）：https://kazupon.github.io/vue-i18n/guide/datetime.html
数字格式处理（$n）：https://kazupon.github.io/vue-i18n/guide/number.html
*/

exports.default = _default;

/***/ }),

/***/ "ExA7":
/***/ (function(module, exports) {

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

module.exports = isObjectLike;


/***/ }),

/***/ "FHWo":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("TTB2");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "Fk5u":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_Fk5u__;

/***/ }),

/***/ "G9Sk":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("UJ84");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("KHd+");
var render, staticRenderFns




/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"])(
  _SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"],
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "GoyQ":
/***/ (function(module, exports) {

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

module.exports = isObject;


/***/ }),

/***/ "HVJS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mapGetter = _interopRequireDefault(__webpack_require__("KP9C"));

var _SmTileLayerViewModel = _interopRequireDefault(__webpack_require__("BFO0"));

var _propsBinder = __webpack_require__("hS5c");

var _TileLayer = _interopRequireDefault(__webpack_require__("T3Jp"));

var _default = {
  name: 'SmTileLayer',
  mixins: [_mapGetter.default, _TileLayer.default],
  props: {
    layersID: {
      type: String
    },
    redirect: {
      type: Boolean,
      default: false
    },
    cacheEnabled: {
      type: Boolean,
      default: true
    },
    clipRegionEnabled: {
      type: Boolean,
      default: false
    },
    prjCoordSys: {
      type: Object
    },
    overlapDisplayed: {
      type: Boolean,
      default: false
    },
    overlapDisplayedOptions: {
      type: String
    },
    tileversion: {
      type: String
    },
    serverType: {
      type: String,
      default: 'iServer'
    },
    tileProxy: {
      type: String
    },
    format: {
      type: String,
      default: 'png',
      validator: function validator(val) {
        return ['png', 'jpg', 'bmp', 'gif'].indexOf(val) !== -1;
      }
    },
    tileSize: {
      type: Number,
      default: 256
    },
    url: {
      type: String
    },
    transparent: {
      type: Boolean,
      default: true
    },
    clipRegion: {
      type: Object
    },
    crs: {
      type: Object
    }
  },
  created: function created() {
    var _this = this;

    var _loop = function _loop(key) {
      var setMethodName = 'set' + (0, _propsBinder.capitalizeFirstLetter)(key);

      if (!_this[setMethodName]) {
        _this[setMethodName] = function (newValue) {
          this.viewModel && this.viewModel[setMethodName](newValue);
        };
      }
    };

    for (var key in this.$props) {
      _loop(key);
    }

    this.viewModel = new _SmTileLayerViewModel.default(this.$props);
    this.layer = this.viewModel.getLayer();
  },
  loaded: function loaded() {
    this.viewModel.addTo(this.map);
  },
  render: function render() {}
};
exports.default = _default;

/***/ }),

/***/ "HatH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  props: {
    startTiming: {
      type: Boolean,
      default: false
    },
    frequency: {
      type: [Number, String],
      default: 3
    }
  },
  watch: {
    startTiming: {
      handler: function handler(val) {
        if (val) {
          this._start();
        } else {
          this._close();
        }
      },
      immediate: true
    },
    frequency: function frequency() {
      this.resetTimer();
    }
  },
  data: function data() {
    return {
      timer: null
    };
  },
  beforeDestroy: function beforeDestroy() {
    this.startTiming && this._close();
  },
  methods: {
    _close: function _close() {
      this.timer && clearInterval(this.timer);
      this.closeTimer();
    },
    _start: function _start() {
      var _this = this;

      var time = this.frequency * 1000 || 3000;
      this.startTimer();
      this.timer = setInterval(function () {
        _this.timing();
      }, time);
    },
    startTimer: function startTimer() {},
    timing: function timing() {},
    closeTimer: function closeTimer() {},
    resetTimer: function resetTimer() {
      this._close();

      this._start();
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "II3L":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

var _timer = _interopRequireDefault(__webpack_require__("HatH"));

var _RestService = _interopRequireDefault(__webpack_require__("w4Wy"));

//
//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'SmText',
  mixins: [_theme.default, _timer.default],
  props: {
    fontStyle: {
      type: Object
    },
    title: {
      type: String
    },
    url: {
      type: String
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  data: function data() {
    return {
      finalTitle: this.title
    };
  },
  computed: {
    customStyle: function customStyle() {
      var style = Object.assign({}, this.fontStyle);

      if (style.textAlign && !style.justifyContent) {
        var textAlign = style.textAlign;
        style.justifyContent = textAlign === 'left' ? 'flex-start' : textAlign === 'right' ? 'flex-end' : 'center';
        delete style.textAlign;
      }

      return style;
    }
  },
  watch: {
    title: function title(val) {
      this.finalTitle = val;
    },
    url: {
      handler: function handler(val) {
        if (val) {
          this.getData();
        } else {
          this.finalTitle = this.title;
        }
      },
      immediate: true
    }
  },
  mounted: function mounted() {
    this.restService = new _RestService.default();
    this.restService.on({
      'getdatasucceeded': this.fetchData
    });
  },
  beforeDestroy: function beforeDestroy() {
    this.restService.remove('getdatasucceeded');
  },
  methods: {
    timing: function timing() {
      this.getData();
    },
    fetchData: function fetchData(data) {
      this.finalTitle = data.data;
    },
    getData: function getData() {
      this.restService && this.restService.getData(this.url);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "ImIo":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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gAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cAAQIECBAg0JqAYNEapYoIECBAgAABwcI1QIAAAQIECLQmIFi0RqkiAgQIECBAQLBwDRAgQIAAAQKtCQgWrVGqiAABAgQIEBAsXAMECBAgQIBAawKCRWuUKiJAgAABAgQEC9cA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"

/***/ }),

/***/ "J4zp":
/***/ (function(module, exports, __webpack_require__) {

var arrayWithHoles = __webpack_require__("wTVA");

var iterableToArrayLimit = __webpack_require__("m0LI");

var nonIterableRest = __webpack_require__("wkBT");

function _slicedToArray(arr, i) {
  return arrayWithHoles(arr) || iterableToArrayLimit(arr, i) || nonIterableRest();
}

module.exports = _slicedToArray;

/***/ }),

/***/ "JBR1":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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artXAgQIECCwWOBzEeFzVy3+pTQkQIAAAQIEahIQLGp6td0rAQIECBDYWUCw2BlY9wQIECBAoCYBwaKmV9u9EiBAgACBnQUEi52BdU+AAAECBGoSECxqerXdKwECBAgQ2FlAsNgZWPcECBAgQKAmAcGiplfbvRIgQIAAgYcEhviPx+YXwWLex1kCBAgQIEBghYBgsQJLUwIECBAgQGBeQLCY93GWAAECBAgQWCEgWKzA0pQAAQIECBCYFxAs5n2cJUCAAAECBFYICBYrsDQlQIAAAQIE5gUEi3kfZwkQIECAAIElAtMHUQWLJVjaECBAgAABAosEBItFTBoRIECAAAECSwQEiyVK2hAgQIAAAQKLBASLRUwaESBAgAABAksEBIslStoQIECAAAEC1wWG48X/HyJYXGdylAABAgQIEPiEgGDxCTSXECBAgAABAtcFBIvrLo4SIECAAAECnxAQLD6B5hICBAgQIEDguoBgcd3FUQIECBAgQOATAoLFJ9BcQoAAAQIE6hJYHheWt6xL0N0SIECAAAECnxAQLD6B5hICBAgQIEDguoBgcd3FUQIECBAgUJ1Av8EdCxYbIOqCAAECBAjUIzAfHebP1qPkTgkQIECAAIENBASLDRB1QYAAAQIE6hbo3v+/EMGi7neCuydAgAABApsKCBabcuqMAAECBAjULSBY1P36u3sCBAgQILCpgGCxKafOCBAgQIBA3QKCRd2vv7snQIAAAQKbCggWm3LqjAABAgQI1C0gWNT9+rt7AgQIECCwqYBgsSmnzggQIECAwBcWWJAaFjT5wkBujQABAgQIENhUQLDYlFNnBAgQIECgbgHBou7X390TIECAAIFNBQSLTTl1RoAAAQIE6hYQLOp+/d09AQIECBDYVECw2JRTZwQIECBAoG4BwaLu19/dEyBAgACBTQUEi005dUaAAAECBOoWECzqfv3dPQECBAgQ2FRAsNiUU2cECBAgQKBuAcGi7tff3RMgQIAAgU0FBItNOXVGgAABAgTqFhAs6n793T0BAgQIENhUQLDYlFNnBAgQIECgVoExUggWtb7+7psAAQIECOwgIFjsgKpLAgQIECBQq4BgUesr774JECBAgMAOAoLFDqi6JECAAAECtQoIFrW+8u6bAAECBAjsICBY7ICqSwIECBAgUIXAlRRx5VAVFG6SAAECBAgQ2EFA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"

/***/ }),

/***/ "KHd+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "KP9C":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _mapEvent = _interopRequireDefault(__webpack_require__("Whz7"));

var _globalEvent = _interopRequireDefault(__webpack_require__("qF08"));

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _vuePropertyDecorator = __webpack_require__("YKMj");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

function callHook(vm, hook) {
  var options = vm.constructor.options;
  options.mixins && options.mixins.forEach(function (mixin) {
    mixin[hook] && mixin[hook].call(vm, vm.$options.name);
  });
  options[hook] && options[hook].call(vm, vm);
}

var MapGetter =
/*#__PURE__*/
function (_Vue) {
  (0, _inherits2.default)(MapGetter, _Vue);

  function MapGetter() {
    (0, _classCallCheck2.default)(this, MapGetter);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(MapGetter).apply(this, arguments));
  }

  (0, _createClass2.default)(MapGetter, [{
    key: "mapTargetChanged",
    value: function mapTargetChanged(newVal, oldVal) {
      if (newVal && oldVal && newVal !== oldVal) {
        callHook(this, 'removed');

        if (_mapEvent.default.$options.getMap(newVal)) {
          this.loadMap(newVal);
        }
      }
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var targetName = this.getTargetName();

      if (_mapEvent.default.$options.getMap(targetName)) {
        this.loadMap(targetName);
      }

      _mapEvent.default.$on('load-map', this.loadMapSucceed);

      _globalEvent.default.$on('delete-map', this.deleteMapSucceed);
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      _mapEvent.default.$off('load-map', this.loadMapSucceed);

      _globalEvent.default.$off('delete-map', this.deleteMapSucceed);
    }
  }, {
    key: "loadMapSucceed",
    value: function loadMapSucceed(map, target) {
      var targetName = this.getTargetName();

      if (target === targetName) {
        this.loadMap(target);
      }
    }
  }, {
    key: "getTargetName",
    value: function getTargetName() {
      var selfParent = this.$parent;
      var parentTarget = selfParent && selfParent.$options.name && selfParent.$options.name.toLowerCase() === 'smwebmap' && selfParent.target;
      return this.mapTarget || parentTarget || Object.keys(_mapEvent.default.$options.getAllMaps())[0];
    }
  }, {
    key: "loadMap",
    value: function loadMap(targetName) {
      var _this = this;

      this.map = _mapEvent.default.$options.getMap(targetName);
      this.webmap = _mapEvent.default.$options.getWebMap(targetName);
      callHook(this, 'loaded');
      this.$nextTick(function () {
        _this.$emit('loaded');
      });
    }
  }, {
    key: "deleteMapSucceed",
    value: function deleteMapSucceed(target) {
      var targetName = this.getTargetName();

      if (target === targetName) {
        callHook(this, 'removed');
        this.map = null;
        this.webmap = null;
        this.viewModel && (this.viewModel = null);
      }
    }
  }, {
    key: "mapNotLoadedTip",
    value: function mapNotLoadedTip() {
      if (!this.map) {
        this.$message.destroy();
        this.$message.warning(this.$t('warning.unassociatedMap'));
        return true;
      }

      return false;
    }
  }]);
  return MapGetter;
}(_vue.default);

__decorate([(0, _vuePropertyDecorator.Prop)()], MapGetter.prototype, "mapTarget", void 0);

__decorate([(0, _vuePropertyDecorator.Watch)('mapTarget')], MapGetter.prototype, "mapTargetChanged", null);

MapGetter = __decorate([_vuePropertyDecorator.Component], MapGetter);
var _default = MapGetter;
exports.default = _default;

/***/ }),

/***/ "KS6f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _propsBinder = __webpack_require__("hS5c");

var _default = {
  props: {
    pane: {
      type: String,
      default: 'overlayPane'
    },
    name: {
      type: String,
      default: undefined
    },
    attribution: {
      type: String,
      default: null
    }
  },
  mounted: function mounted() {
    var _this = this;

    if (this.layer) {
      this.layer.on('add', function (e) {
        _this.$emit('load', e);
      });
    }

    (0, _propsBinder.propsBinder)(this, this.$props);
  }
};
exports.default = _default;

/***/ }),

/***/ "KUEp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _lang = __webpack_require__("DSM6");

var RestParameter = function RestParameter(options) {
  (0, _classCallCheck2.default)(this, RestParameter);
  this.url = options.url;
  this.type = 'rest';
  this.attributeFilter = options.attributeFilter || null;
  this.maxFeatures = options.maxFeatures || 20;
  this.name = options.name || (0, _lang.geti18n)().t('commontypes.restData');
};

exports.default = RestParameter;

/***/ }),

/***/ "KfNM":
/***/ (function(module, exports) {

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

module.exports = objectToString;


/***/ }),

/***/ "KtZj":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function () {

    // Make sure it does not throw in a SSR (Server Side Rendering) situation
    if (typeof window === "undefined") {
        return null;
    }
    // https://github.com/Semantic-Org/Semantic-UI/issues/3855
    // https://github.com/marcj/css-element-queries/issues/257
    var globalWindow = typeof window != 'undefined' && window.Math == Math
        ? window
        : typeof self != 'undefined' && self.Math == Math
            ? self
            : Function('return this')();
    // Only used for the dirty checking, so the event callback count is limited to max 1 call per fps per sensor.
    // In combination with the event based resize sensor this saves cpu time, because the sensor is too fast and
    // would generate too many unnecessary events.
    var requestAnimationFrame = globalWindow.requestAnimationFrame ||
        globalWindow.mozRequestAnimationFrame ||
        globalWindow.webkitRequestAnimationFrame ||
        function (fn) {
            return globalWindow.setTimeout(fn, 20);
        };

    /**
     * Iterate over each of the provided element(s).
     *
     * @param {HTMLElement|HTMLElement[]} elements
     * @param {Function}                  callback
     */
    function forEachElement(elements, callback){
        var elementsType = Object.prototype.toString.call(elements);
        var isCollectionTyped = ('[object Array]' === elementsType
            || ('[object NodeList]' === elementsType)
            || ('[object HTMLCollection]' === elementsType)
            || ('[object Object]' === elementsType)
            || ('undefined' !== typeof jQuery && elements instanceof jQuery) //jquery
            || ('undefined' !== typeof Elements && elements instanceof Elements) //mootools
        );
        var i = 0, j = elements.length;
        if (isCollectionTyped) {
            for (; i < j; i++) {
                callback(elements[i]);
            }
        } else {
            callback(elements);
        }
    }

    /**
    * Get element size
    * @param {HTMLElement} element
    * @returns {Object} {width, height}
    */
    function getElementSize(element) {
        if (!element.getBoundingClientRect) {
            return {
                width: element.offsetWidth,
                height: element.offsetHeight
            }
        }

        var rect = element.getBoundingClientRect();
        return {
            width: Math.round(rect.width),
            height: Math.round(rect.height)
        }
    }

    /**
     * Apply CSS styles to element.
     *
     * @param {HTMLElement} element
     * @param {Object} style
     */
    function setStyle(element, style) {
        Object.keys(style).forEach(function(key) {
            element.style[key] = style[key];
        });
    }

    /**
     * Class for dimension change detection.
     *
     * @param {Element|Element[]|Elements|jQuery} element
     * @param {Function} callback
     *
     * @constructor
     */
    var ResizeSensor = function(element, callback) {
        /**
         *
         * @constructor
         */
        function EventQueue() {
            var q = [];
            this.add = function(ev) {
                q.push(ev);
            };

            var i, j;
            this.call = function(sizeInfo) {
                for (i = 0, j = q.length; i < j; i++) {
                    q[i].call(this, sizeInfo);
                }
            };

            this.remove = function(ev) {
                var newQueue = [];
                for(i = 0, j = q.length; i < j; i++) {
                    if(q[i] !== ev) newQueue.push(q[i]);
                }
                q = newQueue;
            };

            this.length = function() {
                return q.length;
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {Function}    resized
         */
        function attachResizeEvent(element, resized) {
            if (!element) return;
            if (element.resizedAttached) {
                element.resizedAttached.add(resized);
                return;
            }

            element.resizedAttached = new EventQueue();
            element.resizedAttached.add(resized);

            element.resizeSensor = document.createElement('div');
            element.resizeSensor.dir = 'ltr';
            element.resizeSensor.className = 'resize-sensor';

            var style = {
                pointerEvents: 'none',
                position: 'absolute',
                left: '0px',
                top: '0px',
                right: '0px',
                bottom: '0px',
                overflow: 'hidden',
                zIndex: '-1',
                visibility: 'hidden',
                maxWidth: '100%'
            };
            var styleChild = {
                position: 'absolute',
                left: '0px',
                top: '0px',
                transition: '0s',
            };

            setStyle(element.resizeSensor, style);

            var expand = document.createElement('div');
            expand.className = 'resize-sensor-expand';
            setStyle(expand, style);

            var expandChild = document.createElement('div');
            setStyle(expandChild, styleChild);
            expand.appendChild(expandChild);

            var shrink = document.createElement('div');
            shrink.className = 'resize-sensor-shrink';
            setStyle(shrink, style);

            var shrinkChild = document.createElement('div');
            setStyle(shrinkChild, styleChild);
            setStyle(shrinkChild, { width: '200%', height: '200%' });
            shrink.appendChild(shrinkChild);

            element.resizeSensor.appendChild(expand);
            element.resizeSensor.appendChild(shrink);
            element.appendChild(element.resizeSensor);

            var computedStyle = window.getComputedStyle(element);
            var position = computedStyle ? computedStyle.getPropertyValue('position') : null;
            if ('absolute' !== position && 'relative' !== position && 'fixed' !== position) {
                element.style.position = 'relative';
            }

            var dirty, rafId;
            var size = getElementSize(element);
            var lastWidth = 0;
            var lastHeight = 0;
            var initialHiddenCheck = true;
            var lastAnimationFrame = 0;

            var resetExpandShrink = function () {
                var width = element.offsetWidth;
                var height = element.offsetHeight;

                expandChild.style.width = (width + 10) + 'px';
                expandChild.style.height = (height + 10) + 'px';

                expand.scrollLeft = width + 10;
                expand.scrollTop = height + 10;

                shrink.scrollLeft = width + 10;
                shrink.scrollTop = height + 10;
            };

            var reset = function() {
                // Check if element is hidden
                if (initialHiddenCheck) {
                    var invisible = element.offsetWidth === 0 && element.offsetHeight === 0;
                    if (invisible) {
                        // Check in next frame
                        if (!lastAnimationFrame){
                            lastAnimationFrame = requestAnimationFrame(function(){
                                lastAnimationFrame = 0;

                                reset();
                            });
                        }

                        return;
                    } else {
                        // Stop checking
                        initialHiddenCheck = false;
                    }
                }

                resetExpandShrink();
            };
            element.resizeSensor.resetSensor = reset;

            var onResized = function() {
                rafId = 0;

                if (!dirty) return;

                lastWidth = size.width;
                lastHeight = size.height;

                if (element.resizedAttached) {
                    element.resizedAttached.call(size);
                }
            };

            var onScroll = function() {
                size = getElementSize(element);
                dirty = size.width !== lastWidth || size.height !== lastHeight;

                if (dirty && !rafId) {
                    rafId = requestAnimationFrame(onResized);
                }

                reset();
            };

            var addEvent = function(el, name, cb) {
                if (el.attachEvent) {
                    el.attachEvent('on' + name, cb);
                } else {
                    el.addEventListener(name, cb);
                }
            };

            addEvent(expand, 'scroll', onScroll);
            addEvent(shrink, 'scroll', onScroll);

            // Fix for custom Elements
            requestAnimationFrame(reset);
        }

        forEachElement(element, function(elem){
            attachResizeEvent(elem, callback);
        });

        this.detach = function(ev) {
            ResizeSensor.detach(element, ev);
        };

        this.reset = function() {
            element.resizeSensor.resetSensor();
        };
    };

    ResizeSensor.reset = function(element) {
        forEachElement(element, function(elem){
            elem.resizeSensor.resetSensor();
        });
    };

    ResizeSensor.detach = function(element, ev) {
        forEachElement(element, function(elem){
            if (!elem) return;
            if(elem.resizedAttached && typeof ev === "function"){
                elem.resizedAttached.remove(ev);
                if(elem.resizedAttached.length()) return;
            }
            if (elem.resizeSensor) {
                if (elem.contains(elem.resizeSensor)) {
                    elem.removeChild(elem.resizeSensor);
                }
                delete elem.resizeSensor;
                delete elem.resizedAttached;
            }
        });
    };

    if (typeof MutationObserver !== "undefined") {
        var observer = new MutationObserver(function (mutations) {
            for (var i in mutations) {
                if (mutations.hasOwnProperty(i)) {
                    var items = mutations[i].addedNodes;
                    for (var j = 0; j < items.length; j++) {
                        if (items[j].resizeSensor) {
                            ResizeSensor.reset(items[j]);
                        }
                    }
                }
            }
        });

        document.addEventListener("DOMContentLoaded", function (event) {
            observer.observe(document.body, {
                childList: true,
                subtree: true,
            });
        });
    }

    return ResizeSensor;

}));


/***/ }),

/***/ "Kz5y":
/***/ (function(module, exports, __webpack_require__) {

var freeGlobal = __webpack_require__("WFqU");

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

module.exports = root;


/***/ }),

/***/ "MVZn":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("lSNA");

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      defineProperty(target, key, source[key]);
    });
  }

  return target;
}

module.exports = _objectSpread;

/***/ }),

/***/ "NGA9":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "AddressMatchParameter", {
  enumerable: true,
  get: function get() {
    return _AddressMatchParameter.default;
  }
});
Object.defineProperty(exports, "iPortalDataParameter", {
  enumerable: true,
  get: function get() {
    return _iPortalDataParameter.default;
  }
});
Object.defineProperty(exports, "RestDataParameter", {
  enumerable: true,
  get: function get() {
    return _RestDataParameter.default;
  }
});
Object.defineProperty(exports, "RestMapParameter", {
  enumerable: true,
  get: function get() {
    return _RestMapParameter.default;
  }
});
Object.defineProperty(exports, "RestParameter", {
  enumerable: true,
  get: function get() {
    return _RestParameter.default;
  }
});

var _AddressMatchParameter = _interopRequireDefault(__webpack_require__("8XH1"));

var _iPortalDataParameter = _interopRequireDefault(__webpack_require__("m68f"));

var _RestDataParameter = _interopRequireDefault(__webpack_require__("gQum"));

var _RestMapParameter = _interopRequireDefault(__webpack_require__("Qp06"));

var _RestParameter = _interopRequireDefault(__webpack_require__("KUEp"));

/***/ }),

/***/ "NjLH":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "Nsbk":
/***/ (function(module, exports) {

function _getPrototypeOf(o) {
  module.exports = _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

module.exports = _getPrototypeOf;

/***/ }),

/***/ "NykK":
/***/ (function(module, exports, __webpack_require__) {

var Symbol = __webpack_require__("nmnc"),
    getRawTag = __webpack_require__("AP2z"),
    objectToString = __webpack_require__("KfNM");

/** `Object#toString` result references. */
var nullTag = '[object Null]',
    undefinedTag = '[object Undefined]';

/** Built-in value references. */
var symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

module.exports = baseGetTag;


/***/ }),

/***/ "O2Ir":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("jcU1");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_LiquidFill_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "ORi+":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  dateTimeFormat: {
    date: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    date_second: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    date_second_week: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  },
  // messageTemplate
  warning: {
    unsupportedVideoAddress: '视频地址不合法',
    unavailableVideo: '此视频暂无法播放，请稍后再试',
    mapNotLoaded: '关联的地图尚未加载完整，请稍后',
    unassociatedMap: '您需要配置关联地图！'
  },
  success: {},
  info: {
    loading: '加载中',
    pressEscToExit: '按下 ESC 键或点击关闭按钮退出'
  },
  unit: {
    kilometers: '千米',
    miles: '英里',
    meters: '米',
    yards: '码',
    feet: '英尺',
    squarekilometers: '平方千米',
    squaremiles: '平方英里',
    squaremeters: '平方米',
    squareyards: '平方码',
    squarefeet: '平方英尺'
  },
  error: {},
  commontypes: {
    restData: 'SuperMap Rest 数据服务',
    restMap: 'SuperMap Rest 地图服务',
    addressMatch: 'SuperMap 地址匹配服务',
    iportalData: 'SuperMap iPortal 数据',
    onlineLocalSearch: 'SuperMap Online 本地搜索'
  },
  // 组件
  timeText: {
    Year: '年',
    Month: '月',
    Day: '日',
    hour: '时',
    minute: '分',
    second: '秒'
  },
  zoom: {},
  chart: {},
  layerList: {
    title: '图层'
  },
  miniMap: {},
  pan: {},
  scale: {},
  webmap: {
    loadingTip: '地图加载中...',
    crsNotSupport: '不支持当前地图的坐标系！',
    TileMatrixSetNotSuppport: '不支持传入的 TileMatrixSet！',
    getLayerInfoFailed: '获取图层信息失败！',
    crsnotsupport: '不支持的坐标系！'
  },
  legend: {
    themeField: '专题字段',
    title: '图例',
    top: '最高',
    bottom: '最低',
    noMatchLayer: '没有匹配的图层'
  },
  measure: {
    mapMeasure: '量算',
    measureResult: '测量结果',
    distance: '距离',
    area: '面积',
    delete: '清空',
    selectPlaceholder: '请选择',
    startingPoint: '起点'
  },
  search: {
    noResult: '查询结果为空！',
    noKey: '搜索关键字不能为空，请输入搜索条件。',
    inputPlaceHolder: '查找地址或地点',
    attribute: '属性',
    attributeValue: '属性值',
    setSearchSource: '请设置搜索源！',
    address: '地址',
    null: '空',
    illegalFeature: '要素必须包含合法的坐标！'
  },
  query: {
    query: '查询',
    queryJob: '任务',
    queryReuslt: '结果',
    attributeCondition: '属性条件',
    spatialFilter: '空间过滤器',
    mapBounds: '返回地图全图范围的要素',
    currentMapBounds: '返回当前地图范围内的要素',
    applicate: '应用',
    noResult: '无结果',
    resultAlreadyExists: '当前查询结果已经存在!',
    querying: '查询中',
    attribute: '属性',
    attributeValue: '属性值',
    noResults: '查询结果为空！',
    queryFailed: '查询失败!',
    seviceNotSupport: '此服务不支持查询！'
  },
  openFile: {
    fileSizeExceeded: '文件大小超限！文件大小不得超过 10M！',
    fileTypeUnsupported: '不支持该文件格式！',
    openFileFail: '打开文件失败！',
    openFileSuccess: '打开文件成功!',
    selectFile: '选择文件',
    openEmptyFile: '打开文件为空！',
    openFile: '打开文件'
  },
  draw: {
    draw: '绘制'
  },
  indicator: {
    title: '指标标题',
    unit: '单位'
  },
  tdtResults: {
    on: '在',
    station: '站',
    total: '共',
    about: '约',
    // pagination
    homePage: '首页',
    prevPage: '上一页',
    nextPage: '下一页',
    // nothingResult
    searchNoResult: '没有查询到相关结果',
    youCanTry: '您可以尝试',
    enterCorrect: '检查输入是否正确',
    enterOtherKeyWords: '输入其他关键字进行搜索',
    onTdtMap: '在天地图上',
    addThisAddress: '添加该地点',
    uWantTo: '您是否要找',
    // pointResults
    totalFind: '共找到',
    piecesResults: '条结果',
    phone: '电话',
    address: '地址',
    setStartPonint: '设为起点',
    setEndPonint: '设为终点',
    // routePlan
    totalMiles: '总里程',
    distance: '约{distance}公里',
    showDetails: '显示全部详情',
    switchTimes: '换乘{switchTimes}次',
    noSwitch: '无换乘',
    walk: '步行至',
    getOff: '下车',
    getOn: '上车',
    take: '乘坐',
    noSearchResults: '没有查询到线路信息',
    fastRoute: '最快线路',
    shortRoute: '最短线路',
    walkRoute: '少走高速',
    fast: '较快捷',
    noSubway: '不坐地铁',
    lessSwitch: '少换乘',
    lessWalk: '少步行',
    // staticResult
    cityHadResults: '以下城市有结果，请您选择',
    moreCity: '更多城市',
    // LineResult
    allFound: '共为您找到',
    piecesBusRoute: '条公交线路',
    showDetail: '展开详情',
    busEndTime: '首末车时间',
    relateAdress: '点击此处查看 "{keyWord}" 的相关地点',
    // areaResult
    switchTo: '已切换到'
  },
  tdtRoute: {
    title: '路线',
    clearRoute: '清除路线',
    pleaseEnterStartPoint: '请输入起点',
    pleaseEnterEndPoint: '请输入终点',
    search: '搜索',
    startPoint: '起点',
    endPoint: '终点',
    mapLoadedFiled: '地图加载失败',
    busEndTime: '首末车时间',
    about: '约',
    station: '站',
    total: '共',
    hour: '小时',
    minutes: '分钟'
  },
  tdtSearch: {
    phone: '电话',
    address: '地址',
    noData: '暂无',
    transport: '交通'
  },
  tdtMapSwitcher: {
    title: '地图切换',
    image: '影像',
    vector: '矢量',
    terrain: '地形',
    placeName: '地名',
    TiandituVec: '天地图矢量底图',
    TiandituTer: '天地图地形底图',
    TiandituImg: '天地图影像底图',
    TiandituCva: '天地图矢量注记',
    TiandituCta: '天地图地形注记',
    TiandituCia: '天地图影像注记'
  },
  // layer
  dataFlow: {
    dataSubscriptionFailed: '数据订阅失败！'
  }
};
exports.default = _default;

/***/ }),

/***/ "PJYZ":
/***/ (function(module, exports) {

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

module.exports = _assertThisInitialized;

/***/ }),

/***/ "QG5D":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addListener = addListener;
exports.removeListener = removeListener;
var raf = null;

function requestAnimationFrame(callback) {
  if (!raf) {
    raf = (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
      return setTimeout(callback, 16);
    }).bind(window);
  }

  return raf(callback);
}

var caf = null;

function cancelAnimationFrame(id) {
  if (!caf) {
    caf = (window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || function (id) {
      clearTimeout(id);
    }).bind(window);
  }

  caf(id);
}

function createStyles(styleText) {
  var style = document.createElement('style');
  style.type = 'text/css';

  if (style.styleSheet) {
    style.styleSheet.cssText = styleText;
  } else {
    style.appendChild(document.createTextNode(styleText));
  }

  (document.querySelector('head') || document.body).appendChild(style);
  return style;
}

function createElement(tagName) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var elem = document.createElement(tagName);
  Object.keys(props).forEach(function (key) {
    elem[key] = props[key];
  });
  return elem;
}

function getComputedStyle(elem, prop, pseudo) {
  // for older versions of Firefox, `getComputedStyle` required
  // the second argument and may return `null` for some elements
  // when `display: none`
  var computedStyle = window.getComputedStyle(elem, pseudo || null) || {
    display: 'none'
  };
  return computedStyle[prop];
}

function getRenderInfo(elem) {
  if (!document.documentElement.contains(elem)) {
    return {
      detached: true,
      rendered: false
    };
  }

  var current = elem;

  while (current !== document) {
    if (getComputedStyle(current, 'display') === 'none') {
      return {
        detached: false,
        rendered: false
      };
    }

    current = current.parentNode;
  }

  return {
    detached: false,
    rendered: true
  };
}

var css = ".resize-triggers{visibility:hidden;opacity:0}.resize-contract-trigger,.resize-contract-trigger:before,.resize-expand-trigger,.resize-triggers{content:\"\";position:absolute;top:0;left:0;height:100%;width:100%;overflow:hidden}.resize-contract-trigger,.resize-expand-trigger{background:#eee;overflow:auto}.resize-contract-trigger:before{width:200%;height:200%}";
var total = 0;
var style = null;

function addListener(elem, callback) {
  if (!elem.__resize_mutation_handler__) {
    elem.__resize_mutation_handler__ = handleMutation.bind(elem);
  }

  var listeners = elem.__resize_listeners__;

  if (!listeners) {
    elem.__resize_listeners__ = [];

    if (window.ResizeObserver) {
      var offsetWidth = elem.offsetWidth,
          offsetHeight = elem.offsetHeight;
      var ro = new ResizeObserver(function () {
        if (!elem.__resize_observer_triggered__) {
          elem.__resize_observer_triggered__ = true;

          if (elem.offsetWidth === offsetWidth && elem.offsetHeight === offsetHeight) {
            return;
          }
        }

        runCallbacks(elem);
      }); // initially display none won't trigger ResizeObserver callback

      var _getRenderInfo = getRenderInfo(elem),
          detached = _getRenderInfo.detached,
          rendered = _getRenderInfo.rendered;

      elem.__resize_observer_triggered__ = detached === false && rendered === false;
      elem.__resize_observer__ = ro;
      ro.observe(elem);
    } else if (elem.attachEvent && elem.addEventListener) {
      // targeting IE9/10
      elem.__resize_legacy_resize_handler__ = function handleLegacyResize() {
        runCallbacks(elem);
      };

      elem.attachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.addEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
    } else {
      if (!total) {
        style = createStyles(css);
      }

      initTriggers(elem);
      elem.__resize_rendered__ = getRenderInfo(elem).rendered;

      if (window.MutationObserver) {
        var mo = new MutationObserver(elem.__resize_mutation_handler__);
        mo.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
        elem.__resize_mutation_observer__ = mo;
      }
    }
  }

  elem.__resize_listeners__.push(callback);

  total++;
}

function removeListener(elem, callback) {
  var listeners = elem.__resize_listeners__;

  if (!listeners) {
    return;
  }

  if (callback) {
    listeners.splice(listeners.indexOf(callback), 1);
  } // no listeners exist, or removing all listeners


  if (!listeners.length || !callback) {
    // targeting IE9/10
    if (elem.detachEvent && elem.removeEventListener) {
      elem.detachEvent('onresize', elem.__resize_legacy_resize_handler__);
      document.removeEventListener('DOMSubtreeModified', elem.__resize_mutation_handler__);
      return;
    }

    if (elem.__resize_observer__) {
      elem.__resize_observer__.unobserve(elem);

      elem.__resize_observer__.disconnect();

      elem.__resize_observer__ = null;
    } else {
      if (elem.__resize_mutation_observer__) {
        elem.__resize_mutation_observer__.disconnect();

        elem.__resize_mutation_observer__ = null;
      }

      elem.removeEventListener('scroll', handleScroll);
      elem.removeChild(elem.__resize_triggers__.triggers);
      elem.__resize_triggers__ = null;
    }

    elem.__resize_listeners__ = null;
  }

  if (! --total && style) {
    style.parentNode.removeChild(style);
  }
}

function getUpdatedSize(elem) {
  var _elem$__resize_last__ = elem.__resize_last__,
      width = _elem$__resize_last__.width,
      height = _elem$__resize_last__.height;
  var offsetWidth = elem.offsetWidth,
      offsetHeight = elem.offsetHeight;

  if (offsetWidth !== width || offsetHeight !== height) {
    return {
      width: offsetWidth,
      height: offsetHeight
    };
  }

  return null;
}

function handleMutation() {
  // `this` denotes the scrolling element
  var _getRenderInfo2 = getRenderInfo(this),
      rendered = _getRenderInfo2.rendered,
      detached = _getRenderInfo2.detached;

  if (rendered !== this.__resize_rendered__) {
    if (!detached && this.__resize_triggers__) {
      resetTriggers(this);
      this.addEventListener('scroll', handleScroll, true);
    }

    this.__resize_rendered__ = rendered;
    runCallbacks(this);
  }
}

function handleScroll() {
  var _this = this;

  // `this` denotes the scrolling element
  resetTriggers(this);

  if (this.__resize_raf__) {
    cancelAnimationFrame(this.__resize_raf__);
  }

  this.__resize_raf__ = requestAnimationFrame(function () {
    var updated = getUpdatedSize(_this);

    if (updated) {
      _this.__resize_last__ = updated;
      runCallbacks(_this);
    }
  });
}

function runCallbacks(elem) {
  if (!elem || !elem.__resize_listeners__) {
    return;
  }

  elem.__resize_listeners__.forEach(function (callback) {
    callback.call(elem);
  });
}

function initTriggers(elem) {
  var position = getComputedStyle(elem, 'position');

  if (!position || position === 'static') {
    elem.style.position = 'relative';
  }

  elem.__resize_old_position__ = position;
  elem.__resize_last__ = {};
  var triggers = createElement('div', {
    className: 'resize-triggers'
  });
  var expand = createElement('div', {
    className: 'resize-expand-trigger'
  });
  var expandChild = createElement('div');
  var contract = createElement('div', {
    className: 'resize-contract-trigger'
  });
  expand.appendChild(expandChild);
  triggers.appendChild(expand);
  triggers.appendChild(contract);
  elem.appendChild(triggers);
  elem.__resize_triggers__ = {
    triggers: triggers,
    expand: expand,
    expandChild: expandChild,
    contract: contract
  };
  resetTriggers(elem);
  elem.addEventListener('scroll', handleScroll, true);
  elem.__resize_last__ = {
    width: elem.offsetWidth,
    height: elem.offsetHeight
  };
}

function resetTriggers(elem) {
  var _elem$__resize_trigge = elem.__resize_triggers__,
      expand = _elem$__resize_trigge.expand,
      expandChild = _elem$__resize_trigge.expandChild,
      contract = _elem$__resize_trigge.contract; // batch read

  var csw = contract.scrollWidth,
      csh = contract.scrollHeight;
  var eow = expand.offsetWidth,
      eoh = expand.offsetHeight,
      esw = expand.scrollWidth,
      esh = expand.scrollHeight; // batch write

  contract.scrollLeft = csw;
  contract.scrollTop = csh;
  expandChild.style.width = eow + 1 + 'px';
  expandChild.style.height = eoh + 1 + 'px';
  expand.scrollLeft = esw;
  expand.scrollTop = esh;
}

/***/ }),

/***/ "QIyF":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("Kz5y");

/**
 * Gets the timestamp of the number of milliseconds that have elapsed since
 * the Unix epoch (1 January 1970 00:00:00 UTC).
 *
 * @static
 * @memberOf _
 * @since 2.4.0
 * @category Date
 * @returns {number} Returns the timestamp.
 * @example
 *
 * _.defer(function(stamp) {
 *   console.log(_.now() - stamp);
 * }, _.now());
 * // => Logs the number of milliseconds it took for the deferred invocation.
 */
var now = function() {
  return root.Date.now();
};

module.exports = now;


/***/ }),

/***/ "QJ+7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var meta_1 = __webpack_require__("cWyK");
/**
 * Takes a set of features, calculates the bbox of all input features, and returns a bounding box.
 *
 * @name bbox
 * @param {GeoJSON} geojson any GeoJSON object
 * @returns {BBox} bbox extent in [minX, minY, maxX, maxY] order
 * @example
 * var line = turf.lineString([[-74, 40], [-78, 42], [-82, 35]]);
 * var bbox = turf.bbox(line);
 * var bboxPolygon = turf.bboxPolygon(bbox);
 *
 * //addToMap
 * var addToMap = [line, bboxPolygon]
 */
function bbox(geojson) {
    var result = [Infinity, Infinity, -Infinity, -Infinity];
    meta_1.coordEach(geojson, function (coord) {
        if (result[0] > coord[0]) {
            result[0] = coord[0];
        }
        if (result[1] > coord[1]) {
            result[1] = coord[1];
        }
        if (result[2] < coord[0]) {
            result[2] = coord[0];
        }
        if (result[3] < coord[1]) {
            result[3] = coord[1];
        }
    });
    return result;
}
exports.default = bbox;


/***/ }),

/***/ "QmiY":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vueCountTo = _interopRequireDefault(__webpack_require__("7BsA"));

var _util = __webpack_require__("e7LN");

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default2 = {
  name: 'SmCountTo',
  extends: _vueCountTo.default,
  props: {
    fontSize: {
      type: [String, Number]
    },
    numBackground: {
      type: Object,
      default: function _default() {
        return {
          color: 'rgba(0, 0, 0, 0)',
          image: ''
        };
      }
    },
    numSpacing: {
      type: Number,
      default: 0
    },
    separatorBackground: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    calNumBackground: function calNumBackground() {
      var _this = this;

      return function (value) {
        if (!_this.numBackground) {
          return {};
        }

        if (value && !_this.separatorBackground && (value === _this.separator || value === _this.decimal)) {
          return {};
        }

        var reg = /\d+(\.\d+)?([a-z]+)/gi;
        var fontUnit = _this.fontSize ? _this.fontSize.replace(reg, '$2') : '';
        var styleObj = {
          backgroundColor: _this.numBackground.color
        };

        if (_this.numBackground.image) {
          styleObj = Object.assign(styleObj, {
            backgroundImage: "url(".concat(_this.numBackground.image, ")"),
            backgroundSize: '100% 100%'
          });
        }

        if (_this.numBackground.image || !(0, _util.isTransparent)(_this.numBackground.color)) {
          styleObj = Object.assign(styleObj, {
            textIndent: "".concat(parseFloat(_this.fontSize) * 0.16).concat(fontUnit),
            letterSpacing: "".concat(parseFloat(_this.fontSize) * 0.16).concat(fontUnit)
          });
        } else {
          styleObj = Object.assign(styleObj, {
            textIndent: "".concat(parseFloat(_this.fontSize) * 0.06).concat(fontUnit),
            letterSpacing: "".concat(parseFloat(_this.fontSize) * 0.06).concat(fontUnit)
          });
        }

        return styleObj;
      };
    },
    numInterval: function numInterval() {
      return {
        marginRight: "".concat(this.numSpacing, "px")
      };
    },
    numStyle: function numStyle() {
      return {
        fontSize: this.fontSize
      };
    },
    numDataList: function numDataList() {
      return this.displayValue.split('').map(function (num) {
        return num;
      });
    }
  },
  watch: {
    separator: function separator() {
      this.start();
    },
    decimals: function decimals() {
      this.start();
    }
  }
};
exports.default = _default2;

/***/ }),

/***/ "Qp06":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _lang = __webpack_require__("DSM6");

var RestMapParameter = function RestMapParameter(options) {
  (0, _classCallCheck2.default)(this, RestMapParameter);
  this.type = 'iServer';
  this.url = options.url;
  this.layerName = options.layerName;
  this.attributeFilter = options.attributeFilter || null;
  this.maxFeatures = options.maxFeatures || 20;
  this.name = options.name || (0, _lang.geti18n)().t('commontypes.restMap');
};

exports.default = RestMapParameter;

/***/ }),

/***/ "Qu5F":
/***/ (function(module, exports) {

/*
    StackBlur - a fast almost Gaussian Blur For Canvas

    Version:     0.5
    Author:        Mario Klingemann
    Contact:     mario@quasimondo.com
    Website:    http://www.quasimondo.com/StackBlurForCanvas
    Twitter:    @quasimondo

    In case you find this class useful - especially in commercial projects -
    I am not totally unhappy for a small donation to my PayPal account
    mario@quasimondo.de

    Or support me on flattr:
    https://flattr.com/thing/72791/StackBlur-a-fast-almost-Gaussian-Blur-Effect-for-CanvasJavascript

    Copyright (c) 2010 Mario Klingemann

    Permission is hereby granted, free of charge, to any person
    obtaining a copy of this software and associated documentation
    files (the "Software"), to deal in the Software without
    restriction, including without limitation the rights to use,
    copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the
    Software is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice shall be
    included in all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
    EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
    OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
    NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
    HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
    WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
    OTHER DEALINGS IN THE SOFTWARE.
    */


var mul_table = [
    512,512,456,512,328,456,335,512,405,328,271,456,388,335,292,512,
    454,405,364,328,298,271,496,456,420,388,360,335,312,292,273,512,
    482,454,428,405,383,364,345,328,312,298,284,271,259,496,475,456,
    437,420,404,388,374,360,347,335,323,312,302,292,282,273,265,512,
    497,482,468,454,441,428,417,405,394,383,373,364,354,345,337,328,
    320,312,305,298,291,284,278,271,265,259,507,496,485,475,465,456,
    446,437,428,420,412,404,396,388,381,374,367,360,354,347,341,335,
    329,323,318,312,307,302,297,292,287,282,278,273,269,265,261,512,
    505,497,489,482,475,468,461,454,447,441,435,428,422,417,411,405,
    399,394,389,383,378,373,368,364,359,354,350,345,341,337,332,328,
    324,320,316,312,309,305,301,298,294,291,287,284,281,278,274,271,
    268,265,262,259,257,507,501,496,491,485,480,475,470,465,460,456,
    451,446,442,437,433,428,424,420,416,412,408,404,400,396,392,388,
    385,381,377,374,370,367,363,360,357,354,350,347,344,341,338,335,
    332,329,326,323,320,318,315,312,310,307,304,302,299,297,294,292,
    289,287,285,282,280,278,275,273,271,269,267,265,263,261,259];


var shg_table = [
    9, 11, 12, 13, 13, 14, 14, 15, 15, 15, 15, 16, 16, 16, 16, 17,
    17, 17, 17, 17, 17, 17, 18, 18, 18, 18, 18, 18, 18, 18, 18, 19,
    19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 19, 20, 20, 20,
    20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 20, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 21,
    21, 21, 21, 21, 21, 21, 21, 21, 21, 21, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22,
    22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 22, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23, 23,
    23, 23, 23, 23, 23, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24,
    24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24, 24 ];


function processImage(img, canvas, radius, blurAlphaChannel)
{
    if (typeof(img) == 'string') {
        var img = document.getElementById(img);
    }
    else if (typeof HTMLImageElement !== 'undefined' && !img instanceof HTMLImageElement) {
        return;
    }
    var w = img.naturalWidth;
    var h = img.naturalHeight;

    if (typeof(canvas) == 'string') {
        var canvas = document.getElementById(canvas);
    }
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement) {
        return;
    }

    canvas.style.width  = w + 'px';
    canvas.style.height = h + 'px';
    canvas.width = w;
    canvas.height = h;

    var context = canvas.getContext('2d');
    context.clearRect(0, 0, w, h);
    context.drawImage(img, 0, 0);

    if (isNaN(radius) || radius < 1) return;

    if (blurAlphaChannel)
        processCanvasRGBA(canvas, 0, 0, w, h, radius);
    else
        processCanvasRGB(canvas, 0, 0, w, h, radius);
}

function getImageDataFromCanvas(canvas, top_x, top_y, width, height)
{
    if (typeof(canvas) == 'string')
        var canvas  = document.getElementById(canvas);
    else if (typeof HTMLCanvasElement !== 'undefined' && !canvas instanceof HTMLCanvasElement)
        return;

    var context = canvas.getContext('2d');
    var imageData;

    try {
        try {
            imageData = context.getImageData(top_x, top_y, width, height);
        } catch(e) {
            throw new Error("unable to access local image data: " + e);
            return;
        }
    } catch(e) {
        throw new Error("unable to access image data: " + e);
    }

    return imageData;
}

function processCanvasRGBA(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);

    imageData = processImageDataRGBA(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGBA(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum, a_sum,
        r_out_sum, g_out_sum, b_out_sum, a_out_sum,
        r_in_sum, g_in_sum, b_in_sum, a_in_sum,
        pr, pg, pb, pa, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = a_in_sum = r_sum = g_sum = b_sum = a_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[p+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa != 0)
            {
                pa = 255 / pa;
                pixels[yi]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[yi+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[yi] = pixels[yi+1] = pixels[yi+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);
            a_in_sum += (stackIn.a = pixels[p+3]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;
            a_sum += a_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = a_in_sum = r_in_sum = g_sum = b_sum = a_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);
        a_out_sum = radiusPlus1 * (pa = pixels[yi+3]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;
        a_sum += sumFactor * pa;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack.a = pa;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;
            a_sum += (stack.a = (pa = pixels[yi+3])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;
            a_in_sum += pa;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p+3] = pa = (a_sum * mul_sum) >> shg_sum;
            if (pa > 0)
            {
                pa = 255 / pa;
                pixels[p]   = ((r_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+1] = ((g_sum * mul_sum) >> shg_sum) * pa;
                pixels[p+2] = ((b_sum * mul_sum) >> shg_sum) * pa;
            } else {
                pixels[p] = pixels[p+1] = pixels[p+2] = 0;
            }

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;
            a_sum -= a_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;
            a_out_sum -= stackIn.a;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));
            a_sum += (a_in_sum += (stackIn.a = pixels[p+3]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);
            a_out_sum += (pa = stackOut.a);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;
            a_in_sum -= pa;

            stackOut = stackOut.next;

            yi += width;
        }
    }
    return imageData;
}

function processCanvasRGB(canvas, top_x, top_y, width, height, radius)
{
    if (isNaN(radius) || radius < 1) return;
    radius |= 0;

    var imageData = getImageDataFromCanvas(canvas, top_x, top_y, width, height);
    imageData = processImageDataRGB(imageData, top_x, top_y, width, height, radius);

    canvas.getContext('2d').putImageData(imageData, top_x, top_y);
}

function processImageDataRGB(imageData, top_x, top_y, width, height, radius)
{
    var pixels = imageData.data;

    var x, y, i, p, yp, yi, yw, r_sum, g_sum, b_sum,
        r_out_sum, g_out_sum, b_out_sum,
        r_in_sum, g_in_sum, b_in_sum,
        pr, pg, pb, rbs;

    var div = radius + radius + 1;
    var w4 = width << 2;
    var widthMinus1  = width - 1;
    var heightMinus1 = height - 1;
    var radiusPlus1  = radius + 1;
    var sumFactor = radiusPlus1 * (radiusPlus1 + 1) / 2;

    var stackStart = new BlurStack();
    var stack = stackStart;
    for (i = 1; i < div; i++)
    {
        stack = stack.next = new BlurStack();
        if (i == radiusPlus1) var stackEnd = stack;
    }
    stack.next = stackStart;
    var stackIn = null;
    var stackOut = null;

    yw = yi = 0;

    var mul_sum = mul_table[radius];
    var shg_sum = shg_table[radius];

    for (y = 0; y < height; y++)
    {
        r_in_sum = g_in_sum = b_in_sum = r_sum = g_sum = b_sum = 0;

        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        for (i = 1; i < radiusPlus1; i++)
        {
            p = yi + ((widthMinus1 < i ? widthMinus1 : i) << 2);
            r_sum += (stack.r = (pr = pixels[p])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[p+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[p+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;
        }


        stackIn = stackStart;
        stackOut = stackEnd;
        for (x = 0; x < width; x++)
        {
            pixels[yi]   = (r_sum * mul_sum) >> shg_sum;
            pixels[yi+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[yi+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p =  (yw + ((p = x + radius + 1) < widthMinus1 ? p : widthMinus1)) << 2;

            r_in_sum += (stackIn.r = pixels[p]);
            g_in_sum += (stackIn.g = pixels[p+1]);
            b_in_sum += (stackIn.b = pixels[p+2]);

            r_sum += r_in_sum;
            g_sum += g_in_sum;
            b_sum += b_in_sum;

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += 4;
        }
        yw += width;
    }


    for (x = 0; x < width; x++)
    {
        g_in_sum = b_in_sum = r_in_sum = g_sum = b_sum = r_sum = 0;

        yi = x << 2;
        r_out_sum = radiusPlus1 * (pr = pixels[yi]);
        g_out_sum = radiusPlus1 * (pg = pixels[yi+1]);
        b_out_sum = radiusPlus1 * (pb = pixels[yi+2]);

        r_sum += sumFactor * pr;
        g_sum += sumFactor * pg;
        b_sum += sumFactor * pb;

        stack = stackStart;

        for (i = 0; i < radiusPlus1; i++)
        {
            stack.r = pr;
            stack.g = pg;
            stack.b = pb;
            stack = stack.next;
        }

        yp = width;

        for (i = 1; i <= radius; i++)
        {
            yi = (yp + x) << 2;

            r_sum += (stack.r = (pr = pixels[yi])) * (rbs = radiusPlus1 - i);
            g_sum += (stack.g = (pg = pixels[yi+1])) * rbs;
            b_sum += (stack.b = (pb = pixels[yi+2])) * rbs;

            r_in_sum += pr;
            g_in_sum += pg;
            b_in_sum += pb;

            stack = stack.next;

            if(i < heightMinus1)
            {
                yp += width;
            }
        }

        yi = x;
        stackIn = stackStart;
        stackOut = stackEnd;
        for (y = 0; y < height; y++)
        {
            p = yi << 2;
            pixels[p]   = (r_sum * mul_sum) >> shg_sum;
            pixels[p+1] = (g_sum * mul_sum) >> shg_sum;
            pixels[p+2] = (b_sum * mul_sum) >> shg_sum;

            r_sum -= r_out_sum;
            g_sum -= g_out_sum;
            b_sum -= b_out_sum;

            r_out_sum -= stackIn.r;
            g_out_sum -= stackIn.g;
            b_out_sum -= stackIn.b;

            p = (x + (((p = y + radiusPlus1) < heightMinus1 ? p : heightMinus1) * width)) << 2;

            r_sum += (r_in_sum += (stackIn.r = pixels[p]));
            g_sum += (g_in_sum += (stackIn.g = pixels[p+1]));
            b_sum += (b_in_sum += (stackIn.b = pixels[p+2]));

            stackIn = stackIn.next;

            r_out_sum += (pr = stackOut.r);
            g_out_sum += (pg = stackOut.g);
            b_out_sum += (pb = stackOut.b);

            r_in_sum -= pr;
            g_in_sum -= pg;
            b_in_sum -= pb;

            stackOut = stackOut.next;

            yi += width;
        }
    }

    return imageData;
}

function BlurStack()
{
    this.r = 0;
    this.g = 0;
    this.b = 0;
    this.a = 0;
    this.next = null;
}

module.exports = {
    image: processImage,
    canvasRGBA: processCanvasRGBA,
    canvasRGB: processCanvasRGB,
    imageDataRGBA: processImageDataRGBA,
    imageDataRGB: processImageDataRGB
};


/***/ }),

/***/ "SPBs":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var bbox_1 = __webpack_require__("QJ+7");
var helpers_1 = __webpack_require__("/rf6");
/**
 * Takes a {@link Feature} or {@link FeatureCollection} and returns the absolute center point of all features.
 *
 * @name center
 * @param {GeoJSON} geojson GeoJSON to be centered
 * @param {Object} [options={}] Optional parameters
 * @param {Object} [options.properties={}] Translate GeoJSON Properties to Point
 * @param {Object} [options.bbox={}] Translate GeoJSON BBox to Point
 * @param {Object} [options.id={}] Translate GeoJSON Id to Point
 * @returns {Feature<Point>} a Point feature at the absolute center point of all input features
 * @example
 * var features = turf.points([
 *   [-97.522259, 35.4691],
 *   [-97.502754, 35.463455],
 *   [-97.508269, 35.463245]
 * ]);
 *
 * var center = turf.center(features);
 *
 * //addToMap
 * var addToMap = [features, center]
 * center.properties['marker-size'] = 'large';
 * center.properties['marker-color'] = '#000';
 */
function center(geojson, options) {
    if (options === void 0) { options = {}; }
    var ext = bbox_1.default(geojson);
    var x = (ext[0] + ext[2]) / 2;
    var y = (ext[1] + ext[3]) / 2;
    return helpers_1.point([x, y], options.properties, options);
}
exports.default = center;


/***/ }),

/***/ "Sacq":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("p1EF");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "SksO":
/***/ (function(module, exports) {

function _setPrototypeOf(o, p) {
  module.exports = _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

module.exports = _setPrototypeOf;

/***/ }),

/***/ "T016":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
	"aliceblue": [240, 248, 255],
	"antiquewhite": [250, 235, 215],
	"aqua": [0, 255, 255],
	"aquamarine": [127, 255, 212],
	"azure": [240, 255, 255],
	"beige": [245, 245, 220],
	"bisque": [255, 228, 196],
	"black": [0, 0, 0],
	"blanchedalmond": [255, 235, 205],
	"blue": [0, 0, 255],
	"blueviolet": [138, 43, 226],
	"brown": [165, 42, 42],
	"burlywood": [222, 184, 135],
	"cadetblue": [95, 158, 160],
	"chartreuse": [127, 255, 0],
	"chocolate": [210, 105, 30],
	"coral": [255, 127, 80],
	"cornflowerblue": [100, 149, 237],
	"cornsilk": [255, 248, 220],
	"crimson": [220, 20, 60],
	"cyan": [0, 255, 255],
	"darkblue": [0, 0, 139],
	"darkcyan": [0, 139, 139],
	"darkgoldenrod": [184, 134, 11],
	"darkgray": [169, 169, 169],
	"darkgreen": [0, 100, 0],
	"darkgrey": [169, 169, 169],
	"darkkhaki": [189, 183, 107],
	"darkmagenta": [139, 0, 139],
	"darkolivegreen": [85, 107, 47],
	"darkorange": [255, 140, 0],
	"darkorchid": [153, 50, 204],
	"darkred": [139, 0, 0],
	"darksalmon": [233, 150, 122],
	"darkseagreen": [143, 188, 143],
	"darkslateblue": [72, 61, 139],
	"darkslategray": [47, 79, 79],
	"darkslategrey": [47, 79, 79],
	"darkturquoise": [0, 206, 209],
	"darkviolet": [148, 0, 211],
	"deeppink": [255, 20, 147],
	"deepskyblue": [0, 191, 255],
	"dimgray": [105, 105, 105],
	"dimgrey": [105, 105, 105],
	"dodgerblue": [30, 144, 255],
	"firebrick": [178, 34, 34],
	"floralwhite": [255, 250, 240],
	"forestgreen": [34, 139, 34],
	"fuchsia": [255, 0, 255],
	"gainsboro": [220, 220, 220],
	"ghostwhite": [248, 248, 255],
	"gold": [255, 215, 0],
	"goldenrod": [218, 165, 32],
	"gray": [128, 128, 128],
	"green": [0, 128, 0],
	"greenyellow": [173, 255, 47],
	"grey": [128, 128, 128],
	"honeydew": [240, 255, 240],
	"hotpink": [255, 105, 180],
	"indianred": [205, 92, 92],
	"indigo": [75, 0, 130],
	"ivory": [255, 255, 240],
	"khaki": [240, 230, 140],
	"lavender": [230, 230, 250],
	"lavenderblush": [255, 240, 245],
	"lawngreen": [124, 252, 0],
	"lemonchiffon": [255, 250, 205],
	"lightblue": [173, 216, 230],
	"lightcoral": [240, 128, 128],
	"lightcyan": [224, 255, 255],
	"lightgoldenrodyellow": [250, 250, 210],
	"lightgray": [211, 211, 211],
	"lightgreen": [144, 238, 144],
	"lightgrey": [211, 211, 211],
	"lightpink": [255, 182, 193],
	"lightsalmon": [255, 160, 122],
	"lightseagreen": [32, 178, 170],
	"lightskyblue": [135, 206, 250],
	"lightslategray": [119, 136, 153],
	"lightslategrey": [119, 136, 153],
	"lightsteelblue": [176, 196, 222],
	"lightyellow": [255, 255, 224],
	"lime": [0, 255, 0],
	"limegreen": [50, 205, 50],
	"linen": [250, 240, 230],
	"magenta": [255, 0, 255],
	"maroon": [128, 0, 0],
	"mediumaquamarine": [102, 205, 170],
	"mediumblue": [0, 0, 205],
	"mediumorchid": [186, 85, 211],
	"mediumpurple": [147, 112, 219],
	"mediumseagreen": [60, 179, 113],
	"mediumslateblue": [123, 104, 238],
	"mediumspringgreen": [0, 250, 154],
	"mediumturquoise": [72, 209, 204],
	"mediumvioletred": [199, 21, 133],
	"midnightblue": [25, 25, 112],
	"mintcream": [245, 255, 250],
	"mistyrose": [255, 228, 225],
	"moccasin": [255, 228, 181],
	"navajowhite": [255, 222, 173],
	"navy": [0, 0, 128],
	"oldlace": [253, 245, 230],
	"olive": [128, 128, 0],
	"olivedrab": [107, 142, 35],
	"orange": [255, 165, 0],
	"orangered": [255, 69, 0],
	"orchid": [218, 112, 214],
	"palegoldenrod": [238, 232, 170],
	"palegreen": [152, 251, 152],
	"paleturquoise": [175, 238, 238],
	"palevioletred": [219, 112, 147],
	"papayawhip": [255, 239, 213],
	"peachpuff": [255, 218, 185],
	"peru": [205, 133, 63],
	"pink": [255, 192, 203],
	"plum": [221, 160, 221],
	"powderblue": [176, 224, 230],
	"purple": [128, 0, 128],
	"rebeccapurple": [102, 51, 153],
	"red": [255, 0, 0],
	"rosybrown": [188, 143, 143],
	"royalblue": [65, 105, 225],
	"saddlebrown": [139, 69, 19],
	"salmon": [250, 128, 114],
	"sandybrown": [244, 164, 96],
	"seagreen": [46, 139, 87],
	"seashell": [255, 245, 238],
	"sienna": [160, 82, 45],
	"silver": [192, 192, 192],
	"skyblue": [135, 206, 235],
	"slateblue": [106, 90, 205],
	"slategray": [112, 128, 144],
	"slategrey": [112, 128, 144],
	"snow": [255, 250, 250],
	"springgreen": [0, 255, 127],
	"steelblue": [70, 130, 180],
	"tan": [210, 180, 140],
	"teal": [0, 128, 128],
	"thistle": [216, 191, 216],
	"tomato": [255, 99, 71],
	"turquoise": [64, 224, 208],
	"violet": [238, 130, 238],
	"wheat": [245, 222, 179],
	"white": [255, 255, 255],
	"whitesmoke": [245, 245, 245],
	"yellow": [255, 255, 0],
	"yellowgreen": [154, 205, 50]
};


/***/ }),

/***/ "T3Jp":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _GridLayer = _interopRequireDefault(__webpack_require__("mkpX"));

var _default = {
  mixins: [_GridLayer.default],
  props: {
    tms: {
      type: Boolean,
      default: false
    },
    detectRetina: {
      type: Boolean,
      default: false
    }
  },
  render: function render() {
    return null;
  }
};
exports.default = _default;

/***/ }),

/***/ "TTB2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _util = __webpack_require__("e7LN");

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

//
//
//
//
//
//
var _default = {
  name: 'SmTimeText',
  mixins: [_theme.default],
  props: {
    timeType: {
      type: String,
      default: 'date' // "date+second" "date+second+week"

    },
    fontStyle: {
      type: Object
    }
  },
  data: function data() {
    return {
      time: '',
      timeInterval: null
    };
  },
  watch: {
    timeType: function timeType() {
      this.initTime(this.timeType);
    }
  },
  mounted: function mounted() {
    this.initTime(this.timeType);
  },
  destroyed: function destroyed() {
    clearInterval(this.timeInterval);
  },
  methods: {
    // 初始化
    initTime: function initTime(timeType) {
      var _this = this;

      clearInterval(this.timeInterval);
      this.time = (0, _util.getDateTime)(timeType);
      this.timeInterval = setInterval(function () {
        _this.time = (0, _util.getDateTime)(timeType);
      }, 1000);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "TVTA":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

var _util = __webpack_require__("e7LN");

//
//
//
//
//
//
//
//
//
//
//
//
//
var _default = {
  name: 'SmImage',
  mixins: [_theme.default],
  props: {
    src: {
      type: String
    },
    repeat: {
      type: String,
      default: 'center'
    },
    href: {
      type: String,
      default: ''
    },
    target: {
      type: String,
      default: '_self'
    }
  },
  data: function data() {
    return {
      repeatOption: {
        center: {
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        },
        noRepeat: {
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat'
        },
        repeatX: {
          backgroundRepeat: 'repeat-x',
          backgroundSize: 'auto 100%'
        },
        repeatY: {
          backgroundRepeat: 'repeat-Y',
          backgroundSize: '100% auto'
        },
        repeatXY: {
          backgroundRepeat: 'repeat',
          backgroundSize: 'auto'
        }
      }
    };
  },
  computed: {
    repeatStyle: function repeatStyle() {
      return this.repeatOption[this.repeat];
    },
    imgUrl: function imgUrl() {
      return {
        backgroundImage: "url(".concat(this.src, ")")
      };
    },
    realHref: function realHref() {
      var href = this.href.replace(/ /g, '');

      if (href && !(0, _util.parseUrl)(href)) {
        return "http://".concat(href);
      }

      return href;
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "TnLG":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_TnLG__;

/***/ }),

/***/ "TqRt":
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "U4oE":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Border_vue_vue_type_template_id_52e77cab___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("C55n");
/* harmony import */ var _Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("BtDp");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Border_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Border_vue_vue_type_template_id_52e77cab___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Border_vue_vue_type_template_id_52e77cab___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "UJ84":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("HVJS");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_SmTileLayer_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "UYA6":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/liquidfill/LiquidFill.vue?vue&type=template&id=27347d93&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"chart",staticClass:"sm-component-liquidFill",style:([_vm.background && _vm.getBackgroundStyle]),attrs:{"id":"chart"}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/liquidfill/LiquidFill.vue?vue&type=template&id=27347d93&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "VEr5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VideoPlayer_vue_vue_type_template_id_6a6899a8___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("iPb/");
/* harmony import */ var _VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("Sacq");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _VideoPlayer_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VideoPlayer_vue_vue_type_template_id_6a6899a8___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _VideoPlayer_vue_vue_type_template_id_6a6899a8___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "VgK+":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeText_vue_vue_type_template_id_6da009bc___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("WYr/");
/* harmony import */ var _TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("FHWo");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _TimeText_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _TimeText_vue_vue_type_template_id_6da009bc___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _TimeText_vue_vue_type_template_id_6da009bc___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "W1yv":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = {
  dateTimeFormat: {
    date: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    date_second: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    },
    date_second_week: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
  },
  // messageTemplate
  warning: {
    unsupportedVideoAddress: 'The video address is illegal',
    unavailableVideo: 'This video is temporarily unavailable, please try again later',
    mapNotLoaded: 'The associated map has not been loaded yet, please wait for a second',
    unassociatedMap: 'You need to configure the associated map!'
  },
  success: {},
  info: {
    loading: 'Loading...',
    pressEscToExit: 'Press the ESC key or click the close button to exit'
  },
  unit: {
    kilometers: 'km',
    miles: 'mi',
    meters: 'm',
    yards: 'yd',
    feet: 'ft',
    squarekilometers: 'sq km',
    squaremiles: 'sq mi',
    squaremeters: 'sq m',
    squareyards: 'sq yd',
    squarefeet: 'sq ft'
  },
  error: {},
  commontypes: {
    restData: 'SuperMap Rest Data Service',
    restMap: 'SuperMap Rest Map Service',
    addressMatch: 'SuperMap Address Matching Service',
    iportalData: 'SuperMap iPortal Data',
    onlineLocalSearch: 'SuperMap Online Local Search'
  },
  // 微件
  timeText: {
    Year: 'year',
    Month: 'month',
    Day: 'd',
    hour: 'h',
    minute: 'min',
    second: 's'
  },
  zoom: {},
  chart: {},
  layerList: {
    title: 'Layer'
  },
  miniMap: {},
  pan: {},
  scale: {},
  webmap: {
    loadingTip: 'Map is loading...',
    crsNotSupport: 'The coordinate system of the current map is not supported!',
    TileMatrixSetNotSuppport: 'Incoming TileMatrixSet is not supported!',
    getLayerInfoFailed: 'Failed to get layer information!',
    crsnotsupport: 'Unsupported coordinate system!'
  },
  legend: {
    themeField: 'Thematic Field',
    title: 'Legend',
    top: 'Highest',
    bottom: 'Lowest',
    noMatchLayer: 'No matching layer'
  },
  measure: {
    mapMeasure: 'Measure',
    measureResult: 'Measurement Result',
    distance: 'Distance',
    area: 'Area',
    delete: 'Empty',
    selectPlaceholder: 'Please Select',
    startingPoint: 'Starting Point'
  },
  search: {
    noResult: 'The query result is empty!',
    noKey: 'The search keyword cannot be empty. Please enter the search condition.',
    inputPlaceHolder: 'Find an address or location',
    attribute: 'Attribute',
    attributeValue: 'Attribute Value',
    setSearchSource: 'Please set the search source!',
    address: 'Address',
    null: 'Null',
    illegalFeature: 'Features must contain legal coordinates!'
  },
  query: {
    query: 'Query',
    queryJob: 'Task',
    queryReuslt: 'Reuslt',
    attributeCondition: 'Attribute Condition',
    spatialFilter: 'Spatial Filter',
    mapBounds: 'Query within the whole map extent',
    currentMapBounds: 'Query within current viewbound',
    applicate: 'Apply',
    noResult: 'No Result',
    resultAlreadyExists: 'The current query result already exists!',
    querying: 'Querying...',
    attribute: 'Attribute',
    attributeValue: 'Attribute Value',
    noResults: 'The query result is empty!',
    queryFailed: 'Query failed!',
    seviceNotSupport: 'This service does not support queries!'
  },
  openFile: {
    fileSizeExceeded: "The file size is too big! The file size can't exceed 10M!",
    fileTypeUnsupported: 'This file format is not supported!',
    openFileFail: 'File open failed!',
    openFileSuccess: 'File open succeeded!',
    selectFile: 'Select File',
    openEmptyFile: 'The opened file is empty!',
    openFile: 'Open File'
  },
  draw: {
    draw: 'Draw'
  },
  indicator: {
    title: 'Indicator Title',
    unit: 'Unit'
  },
  tdtResults: {
    on: 'on ',
    station: ' station',
    total: 'total',
    about: 'about ',
    // pagination
    homePage: 'Home',
    prevPage: 'Previous',
    nextPage: 'Next',
    // nothingResult
    searchNoResult: 'No related results were found',
    youCanTry: 'You can try',
    enterCorrect: 'Check if the input is correct',
    enterOtherKeyWords: 'Enter another keyword to search',
    onTdtMap: 'On the map of the sky',
    addThisAddress: 'Add this address',
    uWantTo: 'Are you looking for',
    // pointResults
    totalFind: 'found',
    piecesResults: 'result',
    phone: 'Tell',
    address: 'Address',
    setStartPonint: 'Set as starting point',
    setEndPonint: 'Set as end point',
    // routePlan
    totalMiles: 'total mileage',
    distance: 'About {distance} km',
    showDetails: 'Show full details',
    switchTimes: 'Transfer {switchTimes} times',
    noSwitch: 'No transfer',
    walk: 'Walk to',
    getOff: 'get off',
    getOn: 'boarding',
    take: 'take ',
    noSearchResults: 'No line information was found',
    fastRoute: 'Fastest line',
    shortRoute: 'Shortest line',
    walkRoute: 'Less high speed',
    fast: 'Faster',
    noSubway: 'No subway',
    lessSwitch: 'Less transfer',
    lessWalk: 'Less walking',
    // staticResult
    cityHadResults: 'The following cities have results, please choose',
    moreCity: 'More cities',
    // LineResult
    allFound: 'Found for you',
    piecesBusRoute: 'bus route',
    showDetail: 'Expand details',
    busEndTime: 'First and last bus time',
    relateAdress: 'Click here to see the location of "{keyWord}"',
    // areaResult
    switchTo: 'Switched to'
  },
  tdtRoute: {
    title: 'Route',
    clearRoute: 'Clear route',
    pleaseEnterStartPoint: 'Please enter the starting address',
    pleaseEnterEndPoint: 'Please enter the destination address',
    search: 'Search',
    startPoint: 'Starting address',
    endPoint: 'Destination address',
    mapLoadedFiled: 'Map failed to load',
    busEndTime: 'First and last bus time',
    about: 'about ',
    station: ' station',
    total: 'total',
    hour: ' hour',
    minutes: ' minutes'
  },
  tdtSearch: {
    phone: 'Tell',
    address: 'Address',
    noData: 'No data',
    transport: 'traffic'
  },
  tdtMapSwitcher: {
    title: 'Map Switcher',
    image: 'image',
    vector: 'vector',
    terrain: 'terrain',
    placeName: 'placeName',
    TiandituVec: 'TiandituVecLayer',
    TiandituTer: 'TiandituTerLayer',
    TiandituImg: 'TiandituImgLayer',
    TiandituCva: 'TiandituCvaLabel',
    TiandituCta: 'TiandituCtaLabel',
    TiandituCia: 'TiandituCiaLabel'
  },
  // layer
  dataFlow: {
    dataSubscriptionFailed: 'Data subscription failed!'
  }
};
exports.default = _default;

/***/ }),

/***/ "W6Z/":
/***/ (function(module) {

module.exports = JSON.parse("{\"border1\":{\"type\":\"1\",\"borderWidth\":[12,12,12,12],\"borderEdge\":{\"top\":12,\"left\":12,\"right\":12,\"bottom\":12}},\"border2\":{\"type\":\"2\",\"borderWidth\":[12,12,12,12],\"borderEdge\":{\"top\":12,\"left\":12,\"right\":12,\"bottom\":12}},\"border3\":{\"type\":\"3\",\"borderWidth\":[19,19,19,19],\"borderEdge\":{\"top\":19,\"left\":19,\"right\":19,\"bottom\":19}},\"border4\":{\"type\":\"4\",\"borderWidth\":[20,40,20,40],\"borderEdge\":{\"top\":20,\"left\":20,\"right\":20,\"bottom\":20}},\"border5\":{\"type\":\"5\",\"borderWidth\":[12,135,12,160],\"borderEdge\":{\"top\":12,\"left\":12,\"right\":12,\"bottom\":12}},\"border6\":{\"type\":\"6\",\"borderWidth\":[12,12,12,12],\"borderEdge\":{\"top\":12,\"left\":12,\"right\":12,\"bottom\":12}},\"border7\":{\"type\":\"7\",\"borderWidth\":[88,138,134,130],\"borderEdge\":{\"top\":30,\"left\":30,\"right\":32,\"bottom\":32}},\"border8\":{\"type\":\"8\",\"borderWidth\":[24,100,24,100],\"borderEdge\":{\"top\":17,\"left\":17,\"right\":17,\"bottom\":17}},\"border9\":{\"type\":\"9\",\"borderWidth\":[100,90,70,75],\"borderEdge\":{\"top\":32,\"left\":32,\"right\":32,\"bottom\":32}},\"border10\":{\"type\":\"10\",\"borderWidth\":[27,104,100,52],\"borderEdge\":{\"top\":27,\"left\":23,\"right\":60,\"bottom\":44}},\"border11\":{\"type\":\"11\",\"borderWidth\":[26,52,26,52],\"borderEdge\":{\"top\":12,\"left\":12,\"right\":12,\"bottom\":12}},\"border12\":{\"type\":\"12\",\"borderWidth\":[109,271,100,180],\"borderEdge\":{\"top\":30,\"left\":12,\"right\":12,\"bottom\":25}},\"border13\":{\"type\":\"13\",\"borderWidth\":[20,24,20,24],\"borderEdge\":{\"top\":20,\"left\":22,\"right\":24,\"bottom\":20}}}");

/***/ }),

/***/ "W8MJ":
/***/ (function(module, exports) {

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

module.exports = _createClass;

/***/ }),

/***/ "WFqU":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

module.exports = freeGlobal;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "WOGj":
/***/ (function(module, exports) {

/*
	Based on rgbcolor.js by Stoyan Stefanov <sstoo@gmail.com>
	http://www.phpied.com/rgb-color-parser-in-javascript/
*/

module.exports = function(color_string) {
    this.ok = false;
    this.alpha = 1.0;

    // strip any leading #
    if (color_string.charAt(0) == '#') { // remove # if any
        color_string = color_string.substr(1,6);
    }

    color_string = color_string.replace(/ /g,'');
    color_string = color_string.toLowerCase();

    // before getting into regexps, try simple matches
    // and overwrite the input
    var simple_colors = {
        aliceblue: 'f0f8ff',
        antiquewhite: 'faebd7',
        aqua: '00ffff',
        aquamarine: '7fffd4',
        azure: 'f0ffff',
        beige: 'f5f5dc',
        bisque: 'ffe4c4',
        black: '000000',
        blanchedalmond: 'ffebcd',
        blue: '0000ff',
        blueviolet: '8a2be2',
        brown: 'a52a2a',
        burlywood: 'deb887',
        cadetblue: '5f9ea0',
        chartreuse: '7fff00',
        chocolate: 'd2691e',
        coral: 'ff7f50',
        cornflowerblue: '6495ed',
        cornsilk: 'fff8dc',
        crimson: 'dc143c',
        cyan: '00ffff',
        darkblue: '00008b',
        darkcyan: '008b8b',
        darkgoldenrod: 'b8860b',
        darkgray: 'a9a9a9',
        darkgreen: '006400',
        darkkhaki: 'bdb76b',
        darkmagenta: '8b008b',
        darkolivegreen: '556b2f',
        darkorange: 'ff8c00',
        darkorchid: '9932cc',
        darkred: '8b0000',
        darksalmon: 'e9967a',
        darkseagreen: '8fbc8f',
        darkslateblue: '483d8b',
        darkslategray: '2f4f4f',
        darkturquoise: '00ced1',
        darkviolet: '9400d3',
        deeppink: 'ff1493',
        deepskyblue: '00bfff',
        dimgray: '696969',
        dodgerblue: '1e90ff',
        feldspar: 'd19275',
        firebrick: 'b22222',
        floralwhite: 'fffaf0',
        forestgreen: '228b22',
        fuchsia: 'ff00ff',
        gainsboro: 'dcdcdc',
        ghostwhite: 'f8f8ff',
        gold: 'ffd700',
        goldenrod: 'daa520',
        gray: '808080',
        green: '008000',
        greenyellow: 'adff2f',
        honeydew: 'f0fff0',
        hotpink: 'ff69b4',
        indianred : 'cd5c5c',
        indigo : '4b0082',
        ivory: 'fffff0',
        khaki: 'f0e68c',
        lavender: 'e6e6fa',
        lavenderblush: 'fff0f5',
        lawngreen: '7cfc00',
        lemonchiffon: 'fffacd',
        lightblue: 'add8e6',
        lightcoral: 'f08080',
        lightcyan: 'e0ffff',
        lightgoldenrodyellow: 'fafad2',
        lightgrey: 'd3d3d3',
        lightgreen: '90ee90',
        lightpink: 'ffb6c1',
        lightsalmon: 'ffa07a',
        lightseagreen: '20b2aa',
        lightskyblue: '87cefa',
        lightslateblue: '8470ff',
        lightslategray: '778899',
        lightsteelblue: 'b0c4de',
        lightyellow: 'ffffe0',
        lime: '00ff00',
        limegreen: '32cd32',
        linen: 'faf0e6',
        magenta: 'ff00ff',
        maroon: '800000',
        mediumaquamarine: '66cdaa',
        mediumblue: '0000cd',
        mediumorchid: 'ba55d3',
        mediumpurple: '9370d8',
        mediumseagreen: '3cb371',
        mediumslateblue: '7b68ee',
        mediumspringgreen: '00fa9a',
        mediumturquoise: '48d1cc',
        mediumvioletred: 'c71585',
        midnightblue: '191970',
        mintcream: 'f5fffa',
        mistyrose: 'ffe4e1',
        moccasin: 'ffe4b5',
        navajowhite: 'ffdead',
        navy: '000080',
        oldlace: 'fdf5e6',
        olive: '808000',
        olivedrab: '6b8e23',
        orange: 'ffa500',
        orangered: 'ff4500',
        orchid: 'da70d6',
        palegoldenrod: 'eee8aa',
        palegreen: '98fb98',
        paleturquoise: 'afeeee',
        palevioletred: 'd87093',
        papayawhip: 'ffefd5',
        peachpuff: 'ffdab9',
        peru: 'cd853f',
        pink: 'ffc0cb',
        plum: 'dda0dd',
        powderblue: 'b0e0e6',
        purple: '800080',
        rebeccapurple: '663399',
        red: 'ff0000',
        rosybrown: 'bc8f8f',
        royalblue: '4169e1',
        saddlebrown: '8b4513',
        salmon: 'fa8072',
        sandybrown: 'f4a460',
        seagreen: '2e8b57',
        seashell: 'fff5ee',
        sienna: 'a0522d',
        silver: 'c0c0c0',
        skyblue: '87ceeb',
        slateblue: '6a5acd',
        slategray: '708090',
        snow: 'fffafa',
        springgreen: '00ff7f',
        steelblue: '4682b4',
        tan: 'd2b48c',
        teal: '008080',
        thistle: 'd8bfd8',
        tomato: 'ff6347',
        turquoise: '40e0d0',
        violet: 'ee82ee',
        violetred: 'd02090',
        wheat: 'f5deb3',
        white: 'ffffff',
        whitesmoke: 'f5f5f5',
        yellow: 'ffff00',
        yellowgreen: '9acd32'
    };
    color_string = simple_colors[color_string] || color_string;
    // emd of simple type-in colors

    // array of color definition objects
    var color_defs = [
        {
            re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*((?:\d?\.)?\d)\)$/,
            example: ['rgba(123, 234, 45, 0.8)', 'rgba(255,234,245,1.0)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3]),
                    parseFloat(bits[4])
                ];
            }
        },
        {
            re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
            example: ['rgb(123, 234, 45)', 'rgb(255,234,245)'],
            process: function (bits){
                return [
                    parseInt(bits[1]),
                    parseInt(bits[2]),
                    parseInt(bits[3])
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
            example: ['#00ff00', '336699'],
            process: function (bits){
                return [
                    parseInt(bits[1], 16),
                    parseInt(bits[2], 16),
                    parseInt(bits[3], 16)
                ];
            }
        },
        {
            re: /^([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
            example: ['#fb0', 'f0f'],
            process: function (bits){
                return [
                    parseInt(bits[1] + bits[1], 16),
                    parseInt(bits[2] + bits[2], 16),
                    parseInt(bits[3] + bits[3], 16)
                ];
            }
        }
    ];

    // search through the definitions to find a match
    for (var i = 0; i < color_defs.length; i++) {
        var re = color_defs[i].re;
        var processor = color_defs[i].process;
        var bits = re.exec(color_string);
        if (bits) {
            var channels = processor(bits);
            this.r = channels[0];
            this.g = channels[1];
            this.b = channels[2];
            if (channels.length > 3) {
                this.alpha = channels[3];
            }
            this.ok = true;
        }

    }

    // validate/cleanup values
    this.r = (this.r < 0 || isNaN(this.r)) ? 0 : ((this.r > 255) ? 255 : this.r);
    this.g = (this.g < 0 || isNaN(this.g)) ? 0 : ((this.g > 255) ? 255 : this.g);
    this.b = (this.b < 0 || isNaN(this.b)) ? 0 : ((this.b > 255) ? 255 : this.b);
    this.alpha = (this.alpha < 0) ? 0 : ((this.alpha > 1.0 || isNaN(this.alpha)) ? 1.0 : this.alpha);

    // some getters
    this.toRGB = function () {
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }
    this.toRGBA = function () {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.alpha + ')';
    }
    this.toHex = function () {
        var r = this.r.toString(16);
        var g = this.g.toString(16);
        var b = this.b.toString(16);
        if (r.length == 1) r = '0' + r;
        if (g.length == 1) g = '0' + g;
        if (b.length == 1) b = '0' + b;
        return '#' + r + g + b;
    }

    // help
    this.getHelpXML = function () {

        var examples = new Array();
        // add regexps
        for (var i = 0; i < color_defs.length; i++) {
            var example = color_defs[i].example;
            for (var j = 0; j < example.length; j++) {
                examples[examples.length] = example[j];
            }
        }
        // add type-in colors
        for (var sc in simple_colors) {
            examples[examples.length] = sc;
        }

        var xml = document.createElement('ul');
        xml.setAttribute('id', 'rgbcolor-examples');
        for (var i = 0; i < examples.length; i++) {
            try {
                var list_item = document.createElement('li');
                var list_color = new RGBColor(examples[i]);
                var example_div = document.createElement('div');
                example_div.style.cssText =
                        'margin: 3px; '
                        + 'border: 1px solid black; '
                        + 'background:' + list_color.toHex() + '; '
                        + 'color:' + list_color.toHex()
                ;
                example_div.appendChild(document.createTextNode('test'));
                var list_item_value = document.createTextNode(
                    ' ' + examples[i] + ' -> ' + list_color.toRGB() + ' -> ' + list_color.toHex()
                );
                list_item.appendChild(example_div);
                list_item.appendChild(list_item_value);
                xml.appendChild(list_item);

            } catch(e){}
        }
        return xml;

    }

}


/***/ }),

/***/ "WYr/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/time-text/TimeText.vue?vue&type=template&id=6da009bc&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-time-text",style:([_vm.fontStyle, _vm.getBackgroundStyle, _vm.getTextColorStyle])},[_c('span',[_vm._v(_vm._s(_vm.time))])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/time-text/TimeText.vue?vue&type=template&id=6da009bc&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "Whz7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _globalEvent = _interopRequireDefault(__webpack_require__("qF08"));

var _default = new _vue.default({
  mapCache: {},
  webMapCache: {},
  getMap: function getMap(mapTarget) {
    return this.mapCache[mapTarget];
  },
  getAllMaps: function getAllMaps() {
    return this.mapCache;
  },
  setMap: function setMap(mapTarget, map) {
    this.mapCache[mapTarget] = map;
  },
  deleteMap: function deleteMap(mapTarget) {
    _globalEvent.default.$emit('delete-map', mapTarget);

    delete this.mapCache[mapTarget];
  },
  getWebMap: function getWebMap(webmapTarget) {
    return this.webMapCache[webmapTarget];
  },
  getAllWebMap: function getAllWebMap() {
    return this.webMapCache;
  },
  setWebMap: function setWebMap(webmapTarget, webmap) {
    this.webMapCache[webmapTarget] = webmap;
  },
  deleteWebMap: function deleteWebMap(webmapTarget) {
    delete this.webMapCache[webmapTarget];
  }
});

exports.default = _default;

/***/ }),

/***/ "X7Q1":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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BHoSECx6grYbAgQIECAwBQHBYgqrrEYCBAgQINCTgGDRE7TdECBAgACBKQgIFlNYZTUSIECAAIGeBASLnqDthgABAgQITEFAsJjCKquRAAECBAj0JCBY9ARtNwQIECBAYAoCgsUUVlmNBAgQIECgJwHBoidouyFAgAABAlMQECymsMpqJECAAAECPQkIFj1B2w0BAgQIEJiCgGAxhVVWIwECBAgQ6ElAsOgJ2m4IECBAgMAUBASLKayyGgkQIECAQE8CgkVP0HZDgAABAgSmICBYTGGV1UiAAAECBHoSECx6grYbAgQIECAwBQHBYgqrrEYCBAgQINCTgGDRE7TdECBAgACBKQgIFlNYZTUSIECAAIGeBASLnqDthgABAgQITEFAsJjCKquRAAECBAj0JCBY9ARtNwQIECBAYAoCgsUUVlmNBAgQIECgJwHBoidouyFAgAABAlMQECymsMpqJECAAAECPQkIFj1B2w0BAgQIEJiCgGAxhVVWIwECBAgQ6ElAsOgJ2m4IECBAgMAUBASLKayyGgkQIECAQE8CgkVP0HZDgAABAgSmICBYTGGV1UiAAAECBHoSECx6grYbAgQIECAwBQHBYgqrrEYCBAgQINCTgGDRE7TdECBAgACBKQgIFlNYZTUSIECAAIGeBASLnqDthgABAgQITEFAsJjCKquRAAECBAj0JCBY9ARtNwQIECBAYAoCgsUUVlmNBAgQIECgJwHBoidouyFAgAABAlMQECymsMpqJECAAAECPQkIFj1B2w0BAgQIEJiCgGAxhVVWIwECBAgQ6ElAsOgJ2m4IECBAgMAUBASLKayyGgkQIECAQE8CgkVP0HZDgAABAgSmICBYTGGV1UiAAAECBHoSECx6grYbAgQIECAwBQHBYgqrrEYCBAgQINCTgGDRE7TdECBAgACBKQhsLYqcvfP986vvfKGsruycPFEs2vwmQIAAAQIECOQIOGKRo6QPAQIECBAgkCUgWGQx6USAAAECBAjkCAgWOUr6ECBAgAABAlkCW7NH5+dUZPXWiQABAgQIECCQEHDEIoGjiQABAgQIEGgnIFi089KbAAECBAgQSAgIFgkcTQQIECBAgEA7AcGinZfeBAgQIECAQEJAsEjgaCJAgAABAgTaCQgW7bz0JkCAAAECBBICgkUCRxMBAgQIECDQTkCwaOelNwECBAgQ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"

/***/ }),

/***/ "XDrB":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/progress/Progress.vue?vue&type=template&id=045762fb&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-progress",style:([_vm.background && _vm.getBackgroundStyle])},[_c('a-progress',{attrs:{"percent":parseFloat(_vm.finalPercent),"type":_vm.type,"stroke-width":parseFloat(_vm.strokeWidth),"show-info":_vm.showInfo,"width":_vm.calWidth,"stroke-color":_vm.colorData,"status":_vm.status,"gap-degree":_vm.type==='circle' ? _vm.gapDegree : null,"gap-position":_vm.gapPosition,"stroke-linecap":_vm.strokeLinecap}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/progress/Progress.vue?vue&type=template&id=045762fb&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "XaGS":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * Lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright JS Foundation and other contributors <https://js.foundation/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used to compose bitmasks for value comparisons. */
var COMPARE_PARTIAL_FLAG = 1,
    COMPARE_UNORDERED_FLAG = 2;

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    asyncTag = '[object AsyncFunction]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    nullTag = '[object Null]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    proxyTag = '[object Proxy]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    undefinedTag = '[object Undefined]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
typedArrayTags[errorTag] = typedArrayTags[funcTag] =
typedArrayTags[mapTag] = typedArrayTags[numberTag] =
typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
typedArrayTags[setTag] = typedArrayTags[stringTag] =
typedArrayTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/** Detect free variable `process` from Node.js. */
var freeProcess = moduleExports && freeGlobal.process;

/** Used to access faster Node.js helpers. */
var nodeUtil = (function() {
  try {
    return freeProcess && freeProcess.binding && freeProcess.binding('util');
  } catch (e) {}
}());

/* Node.js helper references. */
var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

/**
 * A specialized version of `_.filter` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {Array} Returns the new filtered array.
 */
function arrayFilter(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length,
      resIndex = 0,
      result = [];

  while (++index < length) {
    var value = array[index];
    if (predicate(value, index, array)) {
      result[resIndex++] = value;
    }
  }
  return result;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.some` for arrays without support for iteratee
 * shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} predicate The function invoked per iteration.
 * @returns {boolean} Returns `true` if any element passes the predicate check,
 *  else `false`.
 */
function arraySome(array, predicate) {
  var index = -1,
      length = array == null ? 0 : array.length;

  while (++index < length) {
    if (predicate(array[index], index, array)) {
      return true;
    }
  }
  return false;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * The base implementation of `_.unary` without support for storing metadata.
 *
 * @private
 * @param {Function} func The function to cap arguments for.
 * @returns {Function} Returns the new capped function.
 */
function baseUnary(func) {
  return function(value) {
    return func(value);
  };
}

/**
 * Checks if a `cache` value for `key` exists.
 *
 * @private
 * @param {Object} cache The cache to query.
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function cacheHas(cache, key) {
  return cache.has(key);
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var nativeObjectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice,
    symToStringTag = Symbol ? Symbol.toStringTag : undefined;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
  this.size = 0;
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  var result = this.has(key) && delete this.__data__[key];
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? (data[key] !== undefined) : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  this.size += this.has(key) ? 0 : 1;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
  this.size = 0;
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  --this.size;
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    ++this.size;
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries == null ? 0 : entries.length;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.size = 0;
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  var result = getMapData(this, key)['delete'](key);
  this.size -= result ? 1 : 0;
  return result;
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  var data = getMapData(this, key),
      size = data.size;

  data.set(key, value);
  this.size += data.size == size ? 0 : 1;
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 *
 * Creates an array cache object to store unique values.
 *
 * @private
 * @constructor
 * @param {Array} [values] The values to cache.
 */
function SetCache(values) {
  var index = -1,
      length = values == null ? 0 : values.length;

  this.__data__ = new MapCache;
  while (++index < length) {
    this.add(values[index]);
  }
}

/**
 * Adds `value` to the array cache.
 *
 * @private
 * @name add
 * @memberOf SetCache
 * @alias push
 * @param {*} value The value to cache.
 * @returns {Object} Returns the cache instance.
 */
function setCacheAdd(value) {
  this.__data__.set(value, HASH_UNDEFINED);
  return this;
}

/**
 * Checks if `value` is in the array cache.
 *
 * @private
 * @name has
 * @memberOf SetCache
 * @param {*} value The value to search for.
 * @returns {number} Returns `true` if `value` is found, else `false`.
 */
function setCacheHas(value) {
  return this.__data__.has(value);
}

// Add methods to `SetCache`.
SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
SetCache.prototype.has = setCacheHas;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  var data = this.__data__ = new ListCache(entries);
  this.size = data.size;
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
  this.size = 0;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  var data = this.__data__,
      result = data['delete'](key);

  this.size = data.size;
  return result;
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var data = this.__data__;
  if (data instanceof ListCache) {
    var pairs = data.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      this.size = ++data.size;
      return this;
    }
    data = this.__data__ = new MapCache(pairs);
  }
  data.set(key, value);
  this.size = data.size;
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  var isArr = isArray(value),
      isArg = !isArr && isArguments(value),
      isBuff = !isArr && !isArg && isBuffer(value),
      isType = !isArr && !isArg && !isBuff && isTypedArray(value),
      skipIndexes = isArr || isArg || isBuff || isType,
      result = skipIndexes ? baseTimes(value.length, String) : [],
      length = result.length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (
           // Safari 9 has enumerable `arguments.length` in strict mode.
           key == 'length' ||
           // Node.js 0.10 has enumerable non-index properties on buffers.
           (isBuff && (key == 'offset' || key == 'parent')) ||
           // PhantomJS 2 has enumerable non-index properties on typed arrays.
           (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
           // Skip index properties.
           isIndex(key, length)
        ))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag` without fallbacks for buggy environments.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  if (value == null) {
    return value === undefined ? undefinedTag : nullTag;
  }
  return (symToStringTag && symToStringTag in Object(value))
    ? getRawTag(value)
    : objectToString(value);
}

/**
 * The base implementation of `_.isArguments`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 */
function baseIsArguments(value) {
  return isObjectLike(value) && baseGetTag(value) == argsTag;
}

/**
 * The base implementation of `_.isEqual` which supports partial comparisons
 * and tracks traversed objects.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {boolean} bitmask The bitmask flags.
 *  1 - Unordered comparison
 *  2 - Partial comparison
 * @param {Function} [customizer] The function to customize comparisons.
 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, bitmask, customizer, stack) {
  if (value === other) {
    return true;
  }
  if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
}

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = objIsArr ? arrayTag : getTag(object),
      othTag = othIsArr ? arrayTag : getTag(other);

  objTag = objTag == argsTag ? objectTag : objTag;
  othTag = othTag == argsTag ? objectTag : othTag;

  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && isBuffer(object)) {
    if (!isBuffer(other)) {
      return false;
    }
    objIsArr = true;
    objIsObj = false;
  }
  if (isSameTag && !objIsObj) {
    stack || (stack = new Stack);
    return (objIsArr || isTypedArray(object))
      ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
      : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
  }
  if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

    if (objIsWrapped || othIsWrapped) {
      var objUnwrapped = objIsWrapped ? object.value() : object,
          othUnwrapped = othIsWrapped ? other.value() : other;

      stack || (stack = new Stack);
      return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
    }
  }
  if (!isSameTag) {
    return false;
  }
  stack || (stack = new Stack);
  return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.isTypedArray` without Node.js optimizations.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 */
function baseIsTypedArray(value) {
  return isObjectLike(value) &&
    isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `array` and `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      arrLength = array.length,
      othLength = other.length;

  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
    return false;
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(array);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var index = -1,
      result = true,
      seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined;

  stack.set(array, other);
  stack.set(other, array);

  // Ignore non-index properties.
  while (++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, arrValue, index, other, array, stack)
        : customizer(arrValue, othValue, index, array, other, stack);
    }
    if (compared !== undefined) {
      if (compared) {
        continue;
      }
      result = false;
      break;
    }
    // Recursively compare arrays (susceptible to call stack limits).
    if (seen) {
      if (!arraySome(other, function(othValue, othIndex) {
            if (!cacheHas(seen, othIndex) &&
                (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
        result = false;
        break;
      }
    } else if (!(
          arrValue === othValue ||
            equalFunc(arrValue, othValue, bitmask, customizer, stack)
        )) {
      result = false;
      break;
    }
  }
  stack['delete'](array);
  stack['delete'](other);
  return result;
}

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
  switch (tag) {
    case dataViewTag:
      if ((object.byteLength != other.byteLength) ||
          (object.byteOffset != other.byteOffset)) {
        return false;
      }
      object = object.buffer;
      other = other.buffer;

    case arrayBufferTag:
      if ((object.byteLength != other.byteLength) ||
          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
        return false;
      }
      return true;

    case boolTag:
    case dateTag:
    case numberTag:
      // Coerce booleans to `1` or `0` and dates to milliseconds.
      // Invalid dates are coerced to `NaN`.
      return eq(+object, +other);

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings, primitives and objects,
      // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
      // for more details.
      return object == (other + '');

    case mapTag:
      var convert = mapToArray;

    case setTag:
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
      convert || (convert = setToArray);

      if (object.size != other.size && !isPartial) {
        return false;
      }
      // Assume cyclic values are equal.
      var stacked = stack.get(object);
      if (stacked) {
        return stacked == other;
      }
      bitmask |= COMPARE_UNORDERED_FLAG;

      // Recursively compare objects (susceptible to call stack limits).
      stack.set(object, other);
      var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
      stack['delete'](object);
      return result;

    case symbolTag:
      if (symbolValueOf) {
        return symbolValueOf.call(object) == symbolValueOf.call(other);
      }
  }
  return false;
}

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
 * @param {Function} customizer The function to customize comparisons.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Object} stack Tracks traversed `object` and `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
  var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
      objProps = getAllKeys(object),
      objLength = objProps.length,
      othProps = getAllKeys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isPartial) {
    return false;
  }
  var index = objLength;
  while (index--) {
    var key = objProps[index];
    if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
      return false;
    }
  }
  // Assume cyclic values are equal.
  var stacked = stack.get(object);
  if (stacked && stack.get(other)) {
    return stacked == other;
  }
  var result = true;
  stack.set(object, other);
  stack.set(other, object);

  var skipCtor = isPartial;
  while (++index < objLength) {
    key = objProps[index];
    var objValue = object[key],
        othValue = other[key];

    if (customizer) {
      var compared = isPartial
        ? customizer(othValue, objValue, key, other, object, stack)
        : customizer(objValue, othValue, key, object, other, stack);
    }
    // Recursively compare objects (susceptible to call stack limits).
    if (!(compared === undefined
          ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
          : compared
        )) {
      result = false;
      break;
    }
    skipCtor || (skipCtor = key == 'constructor');
  }
  if (result && !skipCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor &&
        ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      result = false;
    }
  }
  stack['delete'](object);
  stack['delete'](other);
  return result;
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the raw `toStringTag`.
 */
function getRawTag(value) {
  var isOwn = hasOwnProperty.call(value, symToStringTag),
      tag = value[symToStringTag];

  try {
    value[symToStringTag] = undefined;
    var unmasked = true;
  } catch (e) {}

  var result = nativeObjectToString.call(value);
  if (unmasked) {
    if (isOwn) {
      value[symToStringTag] = tag;
    } else {
      delete value[symToStringTag];
    }
  }
  return result;
}

/**
 * Creates an array of the own enumerable symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
  if (object == null) {
    return [];
  }
  object = Object(object);
  return arrayFilter(nativeGetSymbols(object), function(symbol) {
    return propertyIsEnumerable.call(object, symbol);
  });
};

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = baseGetTag(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : '';

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `value` to a string using `Object.prototype.toString`.
 *
 * @private
 * @param {*} value The value to convert.
 * @returns {string} Returns the converted string.
 */
function objectToString(value) {
  return nativeObjectToString.call(value);
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to convert.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
  return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
    !propertyIsEnumerable.call(value, 'callee');
};

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Performs a deep comparison between two values to determine if they are
 * equivalent.
 *
 * **Note:** This method supports comparing arrays, array buffers, booleans,
 * date objects, error objects, maps, numbers, `Object` objects, regexes,
 * sets, strings, symbols, and typed arrays. `Object` objects are compared
 * by their own, not inherited, enumerable properties. Functions and DOM
 * nodes are compared by strict equality, i.e. `===`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.isEqual(object, other);
 * // => true
 *
 * object === other;
 * // => false
 */
function isEqual(value, other) {
  return baseIsEqual(value, other);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  if (!isObject(value)) {
    return false;
  }
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 9 which returns 'object' for typed arrays and other constructors.
  var tag = baseGetTag(value);
  return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return value != null && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return value != null && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = isEqual;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("YuTi")(module)))

/***/ }),

/***/ "YKMj":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external {"root":"Vue","commonjs":"vue","commonjs2":"vue","amd":"vue"}
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_ = __webpack_require__("i7/w");
var external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default = /*#__PURE__*/__webpack_require__.n(external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_);

// CONCATENATED MODULE: ./node_modules/vue-class-component/dist/vue-class-component.esm.js
/**
  * vue-class-component v7.1.0
  * (c) 2015-present Evan You
  * @license MIT
  */


// The rational behind the verbose Reflect-feature check below is the fact that there are polyfills
// which add an implementation for Reflect.defineMetadata but not for Reflect.getOwnMetadataKeys.
// Without this check consumers will encounter hard to track down runtime errors.
var reflectionIsSupported = typeof Reflect !== 'undefined' && Reflect.defineMetadata && Reflect.getOwnMetadataKeys;
function copyReflectionMetadata(to, from) {
    forwardMetadata(to, from);
    Object.getOwnPropertyNames(from.prototype).forEach(function (key) {
        forwardMetadata(to.prototype, from.prototype, key);
    });
    Object.getOwnPropertyNames(from).forEach(function (key) {
        forwardMetadata(to, from, key);
    });
}
function forwardMetadata(to, from, propertyKey) {
    var metaKeys = propertyKey
        ? Reflect.getOwnMetadataKeys(from, propertyKey)
        : Reflect.getOwnMetadataKeys(from);
    metaKeys.forEach(function (metaKey) {
        var metadata = propertyKey
            ? Reflect.getOwnMetadata(metaKey, from, propertyKey)
            : Reflect.getOwnMetadata(metaKey, from);
        if (propertyKey) {
            Reflect.defineMetadata(metaKey, metadata, to, propertyKey);
        }
        else {
            Reflect.defineMetadata(metaKey, metadata, to);
        }
    });
}

var fakeArray = { __proto__: [] };
var hasProto = fakeArray instanceof Array;
function createDecorator(factory) {
    return function (target, key, index) {
        var Ctor = typeof target === 'function'
            ? target
            : target.constructor;
        if (!Ctor.__decorators__) {
            Ctor.__decorators__ = [];
        }
        if (typeof index !== 'number') {
            index = undefined;
        }
        Ctor.__decorators__.push(function (options) { return factory(options, key, index); });
    };
}
function mixins() {
    var Ctors = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        Ctors[_i] = arguments[_i];
    }
    return external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a.extend({ mixins: Ctors });
}
function isPrimitive(value) {
    var type = typeof value;
    return value == null || (type !== 'object' && type !== 'function');
}
function warn(message) {
    if (typeof console !== 'undefined') {
        console.warn('[vue-class-component] ' + message);
    }
}

function collectDataFromConstructor(vm, Component) {
    // override _init to prevent to init as Vue instance
    var originalInit = Component.prototype._init;
    Component.prototype._init = function () {
        var _this = this;
        // proxy to actual vm
        var keys = Object.getOwnPropertyNames(vm);
        // 2.2.0 compat (props are no longer exposed as self properties)
        if (vm.$options.props) {
            for (var key in vm.$options.props) {
                if (!vm.hasOwnProperty(key)) {
                    keys.push(key);
                }
            }
        }
        keys.forEach(function (key) {
            if (key.charAt(0) !== '_') {
                Object.defineProperty(_this, key, {
                    get: function () { return vm[key]; },
                    set: function (value) { vm[key] = value; },
                    configurable: true
                });
            }
        });
    };
    // should be acquired class property values
    var data = new Component();
    // restore original _init to avoid memory leak (#209)
    Component.prototype._init = originalInit;
    // create plain data object
    var plainData = {};
    Object.keys(data).forEach(function (key) {
        if (data[key] !== undefined) {
            plainData[key] = data[key];
        }
    });
    if (false) {}
    return plainData;
}

var $internalHooks = [
    'data',
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeDestroy',
    'destroyed',
    'beforeUpdate',
    'updated',
    'activated',
    'deactivated',
    'render',
    'errorCaptured',
    'serverPrefetch' // 2.6
];
function componentFactory(Component, options) {
    if (options === void 0) { options = {}; }
    options.name = options.name || Component._componentTag || Component.name;
    // prototype props.
    var proto = Component.prototype;
    Object.getOwnPropertyNames(proto).forEach(function (key) {
        if (key === 'constructor') {
            return;
        }
        // hooks
        if ($internalHooks.indexOf(key) > -1) {
            options[key] = proto[key];
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(proto, key);
        if (descriptor.value !== void 0) {
            // methods
            if (typeof descriptor.value === 'function') {
                (options.methods || (options.methods = {}))[key] = descriptor.value;
            }
            else {
                // typescript decorated data
                (options.mixins || (options.mixins = [])).push({
                    data: function () {
                        var _a;
                        return _a = {}, _a[key] = descriptor.value, _a;
                    }
                });
            }
        }
        else if (descriptor.get || descriptor.set) {
            // computed properties
            (options.computed || (options.computed = {}))[key] = {
                get: descriptor.get,
                set: descriptor.set
            };
        }
    });
    (options.mixins || (options.mixins = [])).push({
        data: function () {
            return collectDataFromConstructor(this, Component);
        }
    });
    // decorate options
    var decorators = Component.__decorators__;
    if (decorators) {
        decorators.forEach(function (fn) { return fn(options); });
        delete Component.__decorators__;
    }
    // find super
    var superProto = Object.getPrototypeOf(Component.prototype);
    var Super = superProto instanceof external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a
        ? superProto.constructor
        : external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a;
    var Extended = Super.extend(options);
    forwardStaticMembers(Extended, Component, Super);
    if (reflectionIsSupported) {
        copyReflectionMetadata(Extended, Component);
    }
    return Extended;
}
var reservedPropertyNames = [
    // Unique id
    'cid',
    // Super Vue constructor
    'super',
    // Component options that will be used by the component
    'options',
    'superOptions',
    'extendOptions',
    'sealedOptions',
    // Private assets
    'component',
    'directive',
    'filter'
];
var shouldIgnore = {
    prototype: true,
    arguments: true,
    callee: true,
    caller: true
};
function forwardStaticMembers(Extended, Original, Super) {
    // We have to use getOwnPropertyNames since Babel registers methods as non-enumerable
    Object.getOwnPropertyNames(Original).forEach(function (key) {
        // Skip the properties that should not be overwritten
        if (shouldIgnore[key]) {
            return;
        }
        // Some browsers does not allow reconfigure built-in properties
        var extendedDescriptor = Object.getOwnPropertyDescriptor(Extended, key);
        if (extendedDescriptor && !extendedDescriptor.configurable) {
            return;
        }
        var descriptor = Object.getOwnPropertyDescriptor(Original, key);
        // If the user agent does not support `__proto__` or its family (IE <= 10),
        // the sub class properties may be inherited properties from the super class in TypeScript.
        // We need to exclude such properties to prevent to overwrite
        // the component options object which stored on the extended constructor (See #192).
        // If the value is a referenced value (object or function),
        // we can check equality of them and exclude it if they have the same reference.
        // If it is a primitive value, it will be forwarded for safety.
        if (!hasProto) {
            // Only `cid` is explicitly exluded from property forwarding
            // because we cannot detect whether it is a inherited property or not
            // on the no `__proto__` environment even though the property is reserved.
            if (key === 'cid') {
                return;
            }
            var superDescriptor = Object.getOwnPropertyDescriptor(Super, key);
            if (!isPrimitive(descriptor.value) &&
                superDescriptor &&
                superDescriptor.value === descriptor.value) {
                return;
            }
        }
        // Warn if the users manually declare reserved properties
        if (false) {}
        Object.defineProperty(Extended, key, descriptor);
    });
}

function vue_class_component_esm_Component(options) {
    if (typeof options === 'function') {
        return componentFactory(options);
    }
    return function (Component) {
        return componentFactory(Component, options);
    };
}
vue_class_component_esm_Component.registerHooks = function registerHooks(keys) {
    $internalHooks.push.apply($internalHooks, keys);
};

/* harmony default export */ var vue_class_component_esm = (vue_class_component_esm_Component);


// CONCATENATED MODULE: ./node_modules/vue-property-decorator/lib/vue-property-decorator.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Inject", function() { return Inject; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InjectReactive", function() { return InjectReactive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Provide", function() { return Provide; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProvideReactive", function() { return ProvideReactive; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Model", function() { return Model; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Prop", function() { return Prop; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PropSync", function() { return PropSync; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Watch", function() { return Watch; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Emit", function() { return Emit; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Ref", function() { return Ref; });
/* concated harmony reexport Component */__webpack_require__.d(__webpack_exports__, "Component", function() { return vue_class_component_esm; });
/* concated harmony reexport Vue */__webpack_require__.d(__webpack_exports__, "Vue", function() { return external_root_Vue_commonjs_vue_commonjs2_vue_amd_vue_default.a; });
/* concated harmony reexport Mixins */__webpack_require__.d(__webpack_exports__, "Mixins", function() { return mixins; });
/** vue-property-decorator verson 8.2.1 MIT LICENSE copyright 2019 kaorun343 */
/// <reference types='reflect-metadata'/>




/** Used for keying reactive provide/inject properties */
var reactiveInjectKey = '__reactiveInject__';
/**
 * decorator of an inject
 * @param from key
 * @return PropertyDecorator
 */
function Inject(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            componentOptions.inject[key] = options || key;
        }
    });
}
/**
 * decorator of a reactive inject
 * @param from key
 * @return PropertyDecorator
 */
function InjectReactive(options) {
    return createDecorator(function (componentOptions, key) {
        if (typeof componentOptions.inject === 'undefined') {
            componentOptions.inject = {};
        }
        if (!Array.isArray(componentOptions.inject)) {
            var fromKey_1 = !!options ? options.from || options : key;
            var defaultVal_1 = (!!options && options.default) || undefined;
            if (!componentOptions.computed)
                componentOptions.computed = {};
            componentOptions.computed[key] = function () {
                var obj = this[reactiveInjectKey];
                return obj ? obj[fromKey_1] : defaultVal_1;
            };
            componentOptions.inject[reactiveInjectKey] = reactiveInjectKey;
        }
    });
}
/**
 * decorator of a provide
 * @param key key
 * @return PropertyDecorator | void
 */
function Provide(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_1 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var rv = Object.create((typeof original_1 === 'function' ? original_1.call(this) : original_1) ||
                    null);
                for (var i in provide.managed)
                    rv[provide.managed[i]] = this[i];
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/**
 * decorator of a reactive provide
 * @param key key
 * @return PropertyDecorator | void
 */
function ProvideReactive(key) {
    return createDecorator(function (componentOptions, k) {
        var provide = componentOptions.provide;
        if (typeof provide !== 'function' || !provide.managed) {
            var original_2 = componentOptions.provide;
            provide = componentOptions.provide = function () {
                var _this = this;
                var rv = Object.create((typeof original_2 === 'function' ? original_2.call(this) : original_2) ||
                    null);
                rv[reactiveInjectKey] = {};
                var _loop_1 = function (i) {
                    rv[provide.managed[i]] = this_1[i]; // Duplicates the behavior of `@Provide`
                    Object.defineProperty(rv[reactiveInjectKey], provide.managed[i], {
                        enumerable: true,
                        get: function () { return _this[i]; },
                    });
                };
                var this_1 = this;
                for (var i in provide.managed) {
                    _loop_1(i);
                }
                return rv;
            };
            provide.managed = {};
        }
        provide.managed[k] = key || k;
    });
}
/** @see {@link https://github.com/vuejs/vue-class-component/blob/master/src/reflect.ts} */
var reflectMetadataIsSupported = typeof Reflect !== 'undefined' && typeof Reflect.getMetadata !== 'undefined';
function applyMetadata(options, target, key) {
    if (reflectMetadataIsSupported) {
        if (!Array.isArray(options) &&
            typeof options !== 'function' &&
            typeof options.type === 'undefined') {
            options.type = Reflect.getMetadata('design:type', target, key);
        }
    }
}
/**
 * decorator of model
 * @param  event event name
 * @param options options
 * @return PropertyDecorator
 */
function Model(event, options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
            componentOptions.model = { prop: k, event: event || k };
        })(target, key);
    };
}
/**
 * decorator of a prop
 * @param  options the options for the prop
 * @return PropertyDecorator | void
 */
function Prop(options) {
    if (options === void 0) { options = {}; }
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[k] = options;
        })(target, key);
    };
}
/**
 * decorator of a synced prop
 * @param propName the name to interface with from outside, must be different from decorated property
 * @param options the options for the synced prop
 * @return PropertyDecorator | void
 */
function PropSync(propName, options) {
    if (options === void 0) { options = {}; }
    // @ts-ignore
    return function (target, key) {
        applyMetadata(options, target, key);
        createDecorator(function (componentOptions, k) {
            ;
            (componentOptions.props || (componentOptions.props = {}))[propName] = options;
            (componentOptions.computed || (componentOptions.computed = {}))[k] = {
                get: function () {
                    return this[propName];
                },
                set: function (value) {
                    // @ts-ignore
                    this.$emit("update:" + propName, value);
                },
            };
        })(target, key);
    };
}
/**
 * decorator of a watch function
 * @param  path the path or the expression to observe
 * @param  WatchOption
 * @return MethodDecorator
 */
function Watch(path, options) {
    if (options === void 0) { options = {}; }
    var _a = options.deep, deep = _a === void 0 ? false : _a, _b = options.immediate, immediate = _b === void 0 ? false : _b;
    return createDecorator(function (componentOptions, handler) {
        if (typeof componentOptions.watch !== 'object') {
            componentOptions.watch = Object.create(null);
        }
        var watch = componentOptions.watch;
        if (typeof watch[path] === 'object' && !Array.isArray(watch[path])) {
            watch[path] = [watch[path]];
        }
        else if (typeof watch[path] === 'undefined') {
            watch[path] = [];
        }
        watch[path].push({ handler: handler, deep: deep, immediate: immediate });
    });
}
// Code copied from Vue/src/shared/util.js
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = function (str) { return str.replace(hyphenateRE, '-$1').toLowerCase(); };
/**
 * decorator of an event-emitter function
 * @param  event The name of the event
 * @return MethodDecorator
 */
function Emit(event) {
    return function (_target, key, descriptor) {
        key = hyphenate(key);
        var original = descriptor.value;
        descriptor.value = function emitter() {
            var _this = this;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var emit = function (returnValue) {
                if (returnValue !== undefined)
                    args.unshift(returnValue);
                _this.$emit.apply(_this, [event || key].concat(args));
            };
            var returnValue = original.apply(this, args);
            if (isPromise(returnValue)) {
                returnValue.then(function (returnValue) {
                    emit(returnValue);
                });
            }
            else {
                emit(returnValue);
            }
            return returnValue;
        };
    };
}
/**
 * decorator of a ref prop
 * @param refKey the ref key defined in template
 */
function Ref(refKey) {
    return createDecorator(function (options, key) {
        options.computed = options.computed || {};
        options.computed[key] = {
            cache: false,
            get: function () {
                return this.$refs[refKey || key];
            },
        };
    });
}
function isPromise(obj) {
    return obj instanceof Promise || (obj && typeof obj.then === 'function');
}


/***/ }),

/***/ "YuTi":
/***/ (function(module, exports) {

module.exports = function(module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function() {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),

/***/ "Z94/":
/***/ (function(module, exports) {

/**
 * lodash 3.0.3 (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright 2012-2016 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2016 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <https://lodash.com/license>
 */

/** `Object#toString` result references. */
var numberTag = '[object Number]';

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Number` primitive or object.
 *
 * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are classified
 * as numbers, use the `_.isFinite` method.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isNumber(3);
 * // => true
 *
 * _.isNumber(Number.MIN_VALUE);
 * // => true
 *
 * _.isNumber(Infinity);
 * // => true
 *
 * _.isNumber('3');
 * // => false
 */
function isNumber(value) {
  return typeof value == 'number' ||
    (isObjectLike(value) && objectToString.call(value) == numberTag);
}

module.exports = isNumber;


/***/ }),

/***/ "a1gu":
/***/ (function(module, exports, __webpack_require__) {

var _typeof = __webpack_require__("cDf5");

var assertThisInitialized = __webpack_require__("PJYZ");

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return assertThisInitialized(self);
}

module.exports = _possibleConstructorReturn;

/***/ }),

/***/ "bCOg":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _vuePropertyDecorator = __webpack_require__("YKMj");

var _globalEvent = _interopRequireDefault(__webpack_require__("qF08"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var Theme =
/*#__PURE__*/
function (_Vue) {
  (0, _inherits2.default)(Theme, _Vue);

  function Theme() {
    var _this;

    (0, _classCallCheck2.default)(this, Theme);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(Theme).apply(this, arguments));
    _this.backgroundData = '';
    _this.textColorsData = '';
    _this.colorGroupsData = [];
    return _this;
  }

  (0, _createClass2.default)(Theme, [{
    key: "backgroundChanged",
    value: function backgroundChanged(newValue) {
      this.backgroundData = newValue;
    }
  }, {
    key: "textColorChanged",
    value: function textColorChanged(newValue) {
      this.textColorsData = newValue;
    }
  }, {
    key: "colorGroupChanged",
    value: function colorGroupChanged(newValue) {
      this.colorGroupsData = newValue;
    }
  }, {
    key: "created",
    value: function created() {
      var theme = _globalEvent.default.$options.theme;
      this.backgroundData = this.background || theme && theme.background;
      this.textColorsData = this.textColor || theme && theme.textColor;
      this.colorGroupsData = this.colorGroup || theme && theme.colorGroup;
    }
  }, {
    key: "themeStyleChanged",
    value: function themeStyleChanged(value) {
      return value;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      var _this2 = this;

      _globalEvent.default.$on('change-theme', function (themeStyle) {
        _this2.backgroundData = themeStyle.background;
        _this2.textColorsData = themeStyle.textColor;
        _this2.colorGroupsData = themeStyle.colorGroup;

        _this2.themeStyleChanged();
      });
    }
  }, {
    key: "getBackgroundStyle",
    get: function get() {
      return {
        background: this.backgroundData
      };
    }
  }, {
    key: "getTextColorStyle",
    get: function get() {
      return {
        color: this.textColorsData
      };
    }
  }, {
    key: "getBackground",
    get: function get() {
      return this.backgroundData;
    }
  }, {
    key: "getTextColor",
    get: function get() {
      return this.textColorsData;
    }
  }, {
    key: "getColorStyle",
    get: function get() {
      return function (index) {
        return {
          color: this.colorGroupsData[index]
        };
      };
    }
  }, {
    key: "getColor",
    get: function get() {
      return function (index) {
        return this.colorGroupsData[index];
      };
    }
  }]);
  return Theme;
}(_vue.default);

__decorate([(0, _vuePropertyDecorator.Prop)()], Theme.prototype, "background", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], Theme.prototype, "textColor", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], Theme.prototype, "colorGroup", void 0);

__decorate([(0, _vuePropertyDecorator.Watch)('background')], Theme.prototype, "backgroundChanged", null);

__decorate([(0, _vuePropertyDecorator.Watch)('textColor')], Theme.prototype, "textColorChanged", null);

__decorate([(0, _vuePropertyDecorator.Watch)('colorGroup')], Theme.prototype, "colorGroupChanged", null);

__decorate([(0, _vuePropertyDecorator.Emit)()], Theme.prototype, "themeStyleChanged", null);

Theme = __decorate([_vuePropertyDecorator.Component], Theme);
var _default = Theme;
exports.default = _default;

/***/ }),

/***/ "bD5U":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__("284h");

var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _globalEvent = _interopRequireDefault(__webpack_require__("qF08"));

var _antDesignVue = __webpack_require__("TnLG");

var _lang = __webpack_require__("DSM6");

var _theme = _interopRequireDefault(__webpack_require__("2Zn6"));

var components = _interopRequireWildcard(__webpack_require__("jUok"));

__webpack_require__("1P0Z");

var commontypes = _interopRequireWildcard(__webpack_require__("NGA9"));

var setTheme = function setTheme() {
  var themeStyle = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  if (typeof themeStyle === 'string') {
    themeStyle = _theme.default.filter(function (item) {
      return item.label === themeStyle;
    })[0] || {};
  }

  _globalEvent.default.$options.theme = themeStyle;

  _globalEvent.default.$emit('change-theme', themeStyle);
};

var install = function install(Vue) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var theme = opts.theme || 'light';

  __webpack_require__("utZJ")("./".concat(theme, ".scss"));

  __webpack_require__("jsF9");

  setTheme(theme);
  Vue.use(_antDesignVue.Button);
  Vue.use(_antDesignVue.Checkbox);
  Vue.use(_antDesignVue.Card);
  Vue.use(_antDesignVue.Slider);
  Vue.use(_antDesignVue.Select);
  Vue.use(_antDesignVue.Collapse);
  Vue.use(_antDesignVue.Input);
  Vue.use(_antDesignVue.Table);
  Vue.use(_antDesignVue.Progress);
  Vue.use(_antDesignVue.Icon);
  Vue.use(_antDesignVue.Spin);
  Vue.use(_antDesignVue.Modal);
  Vue.use(_antDesignVue.Tree);
  Vue.use(_antDesignVue.Tabs);
  Vue.prototype.$message = _antDesignVue.message;
  (0, _lang.initi18n)(Vue, opts);

  for (var component in components) {
    var com = components[component];
    Vue.component(com.options ? com.options.name : com.name, com);
  }
};

if (typeof window !== 'undefined' && window['Vue']) {
  install(window['Vue'], {
    theme: 'light'
  });
}

var _default = {
  setTheme: setTheme,
  commontypes: commontypes,
  lang: _lang.lang,
  locale: _lang.setLocale,
  install: install
};
exports.default = _default;

/***/ }),

/***/ "cDf5":
/***/ (function(module, exports) {

function _typeof2(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof2(obj); }

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;

/***/ }),

/***/ "cV8Z":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./border1.png": "JBR1",
	"./border10.png": "Cb6A",
	"./border11.png": "9pJD",
	"./border12.png": "X7Q1",
	"./border13.png": "DMW1",
	"./border2.png": "ifxw",
	"./border3.png": "usAy",
	"./border4.png": "9rNx",
	"./border5.png": "3N2c",
	"./border6.png": "4EGE",
	"./border7.png": "riVy",
	"./border8.png": "vsHO",
	"./border9.png": "ImIo"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "cV8Z";

/***/ }),

/***/ "cWyK":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, '__esModule', { value: true });

var helpers = __webpack_require__("/rf6");

/**
 * Callback for coordEach
 *
 * @callback coordEachCallback
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Iterate over coordinates in any GeoJSON object, similar to Array.forEach()
 *
 * @name coordEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentCoord, coordIndex, featureIndex, multiFeatureIndex)
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordEach(features, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function coordEach(geojson, callback, excludeWrapCoord) {
    // Handles null Geometry -- Skips this GeoJSON
    if (geojson === null) return;
    var j, k, l, geometry, stopG, coords,
        geometryMaybeCollection,
        wrapShrink = 0,
        coordIndex = 0,
        isGeometryCollection,
        type = geojson.type,
        isFeatureCollection = type === 'FeatureCollection',
        isFeature = type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (var featureIndex = 0; featureIndex < stop; featureIndex++) {
        geometryMaybeCollection = (isFeatureCollection ? geojson.features[featureIndex].geometry :
            (isFeature ? geojson.geometry : geojson));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (var geomIndex = 0; geomIndex < stopG; geomIndex++) {
            var multiFeatureIndex = 0;
            var geometryIndex = 0;
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[geomIndex] : geometryMaybeCollection;

            // Handles null Geometry -- Skips this geometry
            if (geometry === null) continue;
            coords = geometry.coordinates;
            var geomType = geometry.type;

            wrapShrink = (excludeWrapCoord && (geomType === 'Polygon' || geomType === 'MultiPolygon')) ? 1 : 0;

            switch (geomType) {
            case null:
                break;
            case 'Point':
                if (callback(coords, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                coordIndex++;
                multiFeatureIndex++;
                break;
            case 'LineString':
            case 'MultiPoint':
                for (j = 0; j < coords.length; j++) {
                    if (callback(coords[j], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                    coordIndex++;
                    if (geomType === 'MultiPoint') multiFeatureIndex++;
                }
                if (geomType === 'LineString') multiFeatureIndex++;
                break;
            case 'Polygon':
            case 'MultiLineString':
                for (j = 0; j < coords.length; j++) {
                    for (k = 0; k < coords[j].length - wrapShrink; k++) {
                        if (callback(coords[j][k], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                        coordIndex++;
                    }
                    if (geomType === 'MultiLineString') multiFeatureIndex++;
                    if (geomType === 'Polygon') geometryIndex++;
                }
                if (geomType === 'Polygon') multiFeatureIndex++;
                break;
            case 'MultiPolygon':
                for (j = 0; j < coords.length; j++) {
                    geometryIndex = 0;
                    for (k = 0; k < coords[j].length; k++) {
                        for (l = 0; l < coords[j][k].length - wrapShrink; l++) {
                            if (callback(coords[j][k][l], coordIndex, featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
                            coordIndex++;
                        }
                        geometryIndex++;
                    }
                    multiFeatureIndex++;
                }
                break;
            case 'GeometryCollection':
                for (j = 0; j < geometry.geometries.length; j++)
                    if (coordEach(geometry.geometries[j], callback, excludeWrapCoord) === false) return false;
                break;
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
    }
}

/**
 * Callback for coordReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback coordReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Array<number>} currentCoord The current coordinate being processed.
 * @param {number} coordIndex The current index of the coordinate being processed.
 * Starts at index 0, if an initialValue is provided, and at index 1 otherwise.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 */

/**
 * Reduce coordinates in any GeoJSON object, similar to Array.reduce()
 *
 * @name coordReduce
 * @param {FeatureCollection|Geometry|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentCoord, coordIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @param {boolean} [excludeWrapCoord=false] whether or not to include the final coordinate of LinearRings that wraps the ring in its iteration.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.coordReduce(features, function (previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentCoord
 *   //=coordIndex
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentCoord;
 * });
 */
function coordReduce(geojson, callback, initialValue, excludeWrapCoord) {
    var previousValue = initialValue;
    coordEach(geojson, function (currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex) {
        if (coordIndex === 0 && initialValue === undefined) previousValue = currentCoord;
        else previousValue = callback(previousValue, currentCoord, coordIndex, featureIndex, multiFeatureIndex, geometryIndex);
    }, excludeWrapCoord);
    return previousValue;
}

/**
 * Callback for propEach
 *
 * @callback propEachCallback
 * @param {Object} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over properties in any GeoJSON object, similar to Array.forEach()
 *
 * @name propEach
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentProperties, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propEach(features, function (currentProperties, featureIndex) {
 *   //=currentProperties
 *   //=featureIndex
 * });
 */
function propEach(geojson, callback) {
    var i;
    switch (geojson.type) {
    case 'FeatureCollection':
        for (i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i].properties, i) === false) break;
        }
        break;
    case 'Feature':
        callback(geojson.properties, 0);
        break;
    }
}


/**
 * Callback for propReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback propReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {*} currentProperties The current Properties being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce properties in any GeoJSON object into a single value,
 * similar to how Array.reduce works. However, in this case we lazily run
 * the reduction, so an array of all properties is unnecessary.
 *
 * @name propReduce
 * @param {FeatureCollection|Feature} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentProperties, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.propReduce(features, function (previousValue, currentProperties, featureIndex) {
 *   //=previousValue
 *   //=currentProperties
 *   //=featureIndex
 *   return currentProperties
 * });
 */
function propReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    propEach(geojson, function (currentProperties, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentProperties;
        else previousValue = callback(previousValue, currentProperties, featureIndex);
    });
    return previousValue;
}

/**
 * Callback for featureEach
 *
 * @callback featureEachCallback
 * @param {Feature<any>} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Iterate over features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name featureEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.featureEach(features, function (currentFeature, featureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 * });
 */
function featureEach(geojson, callback) {
    if (geojson.type === 'Feature') {
        callback(geojson, 0);
    } else if (geojson.type === 'FeatureCollection') {
        for (var i = 0; i < geojson.features.length; i++) {
            if (callback(geojson.features[i], i) === false) break;
        }
    }
}

/**
 * Callback for featureReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback featureReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name featureReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {"foo": "bar"}),
 *   turf.point([36, 53], {"hello": "world"})
 * ]);
 *
 * turf.featureReduce(features, function (previousValue, currentFeature, featureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   return currentFeature
 * });
 */
function featureReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    featureEach(geojson, function (currentFeature, featureIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex);
    });
    return previousValue;
}

/**
 * Get all coordinates from any GeoJSON object.
 *
 * @name coordAll
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @returns {Array<Array<number>>} coordinate position array
 * @example
 * var features = turf.featureCollection([
 *   turf.point([26, 37], {foo: 'bar'}),
 *   turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * var coords = turf.coordAll(features);
 * //= [[26, 37], [36, 53]]
 */
function coordAll(geojson) {
    var coords = [];
    coordEach(geojson, function (coord) {
        coords.push(coord);
    });
    return coords;
}

/**
 * Callback for geomEach
 *
 * @callback geomEachCallback
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Iterate over each geometry in any GeoJSON object, similar to Array.forEach()
 *
 * @name geomEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @returns {void}
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomEach(features, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 * });
 */
function geomEach(geojson, callback) {
    var i, j, g, geometry, stopG,
        geometryMaybeCollection,
        isGeometryCollection,
        featureProperties,
        featureBBox,
        featureId,
        featureIndex = 0,
        isFeatureCollection = geojson.type === 'FeatureCollection',
        isFeature = geojson.type === 'Feature',
        stop = isFeatureCollection ? geojson.features.length : 1;

    // This logic may look a little weird. The reason why it is that way
    // is because it's trying to be fast. GeoJSON supports multiple kinds
    // of objects at its root: FeatureCollection, Features, Geometries.
    // This function has the responsibility of handling all of them, and that
    // means that some of the `for` loops you see below actually just don't apply
    // to certain inputs. For instance, if you give this just a
    // Point geometry, then both loops are short-circuited and all we do
    // is gradually rename the input until it's called 'geometry'.
    //
    // This also aims to allocate as few resources as possible: just a
    // few numbers and booleans, rather than any temporary arrays as would
    // be required with the normalization approach.
    for (i = 0; i < stop; i++) {

        geometryMaybeCollection = (isFeatureCollection ? geojson.features[i].geometry :
            (isFeature ? geojson.geometry : geojson));
        featureProperties = (isFeatureCollection ? geojson.features[i].properties :
            (isFeature ? geojson.properties : {}));
        featureBBox = (isFeatureCollection ? geojson.features[i].bbox :
            (isFeature ? geojson.bbox : undefined));
        featureId = (isFeatureCollection ? geojson.features[i].id :
            (isFeature ? geojson.id : undefined));
        isGeometryCollection = (geometryMaybeCollection) ? geometryMaybeCollection.type === 'GeometryCollection' : false;
        stopG = isGeometryCollection ? geometryMaybeCollection.geometries.length : 1;

        for (g = 0; g < stopG; g++) {
            geometry = isGeometryCollection ?
                geometryMaybeCollection.geometries[g] : geometryMaybeCollection;

            // Handle null Geometry
            if (geometry === null) {
                if (callback(null, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                continue;
            }
            switch (geometry.type) {
            case 'Point':
            case 'LineString':
            case 'MultiPoint':
            case 'Polygon':
            case 'MultiLineString':
            case 'MultiPolygon': {
                if (callback(geometry, featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                break;
            }
            case 'GeometryCollection': {
                for (j = 0; j < geometry.geometries.length; j++) {
                    if (callback(geometry.geometries[j], featureIndex, featureProperties, featureBBox, featureId) === false) return false;
                }
                break;
            }
            default:
                throw new Error('Unknown Geometry Type');
            }
        }
        // Only increase `featureIndex` per each feature
        featureIndex++;
    }
}

/**
 * Callback for geomReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback geomReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Geometry} currentGeometry The current Geometry being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {Object} featureProperties The current Feature Properties being processed.
 * @param {Array<number>} featureBBox The current Feature BBox being processed.
 * @param {number|string} featureId The current Feature Id being processed.
 */

/**
 * Reduce geometry in any GeoJSON object, similar to Array.reduce().
 *
 * @name geomReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.point([36, 53], {hello: 'world'})
 * ]);
 *
 * turf.geomReduce(features, function (previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
 *   //=previousValue
 *   //=currentGeometry
 *   //=featureIndex
 *   //=featureProperties
 *   //=featureBBox
 *   //=featureId
 *   return currentGeometry
 * });
 */
function geomReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    geomEach(geojson, function (currentGeometry, featureIndex, featureProperties, featureBBox, featureId) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentGeometry;
        else previousValue = callback(previousValue, currentGeometry, featureIndex, featureProperties, featureBBox, featureId);
    });
    return previousValue;
}

/**
 * Callback for flattenEach
 *
 * @callback flattenEachCallback
 * @param {Feature} currentFeature The current flattened feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Iterate over flattened features in any GeoJSON object, similar to
 * Array.forEach.
 *
 * @name flattenEach
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (currentFeature, featureIndex, multiFeatureIndex)
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenEach(features, function (currentFeature, featureIndex, multiFeatureIndex) {
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 * });
 */
function flattenEach(geojson, callback) {
    geomEach(geojson, function (geometry, featureIndex, properties, bbox, id) {
        // Callback for single geometry
        var type = (geometry === null) ? null : geometry.type;
        switch (type) {
        case null:
        case 'Point':
        case 'LineString':
        case 'Polygon':
            if (callback(helpers.feature(geometry, properties, {bbox: bbox, id: id}), featureIndex, 0) === false) return false;
            return;
        }

        var geomType;

        // Callback for multi-geometry
        switch (type) {
        case 'MultiPoint':
            geomType = 'Point';
            break;
        case 'MultiLineString':
            geomType = 'LineString';
            break;
        case 'MultiPolygon':
            geomType = 'Polygon';
            break;
        }

        for (var multiFeatureIndex = 0; multiFeatureIndex < geometry.coordinates.length; multiFeatureIndex++) {
            var coordinate = geometry.coordinates[multiFeatureIndex];
            var geom = {
                type: geomType,
                coordinates: coordinate
            };
            if (callback(helpers.feature(geom, properties), featureIndex, multiFeatureIndex) === false) return false;
        }
    });
}

/**
 * Callback for flattenReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback flattenReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature} currentFeature The current Feature being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 */

/**
 * Reduce flattened features in any GeoJSON object, similar to Array.reduce().
 *
 * @name flattenReduce
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON object
 * @param {Function} callback a method that takes (previousValue, currentFeature, featureIndex, multiFeatureIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var features = turf.featureCollection([
 *     turf.point([26, 37], {foo: 'bar'}),
 *     turf.multiPoint([[40, 30], [36, 53]], {hello: 'world'})
 * ]);
 *
 * turf.flattenReduce(features, function (previousValue, currentFeature, featureIndex, multiFeatureIndex) {
 *   //=previousValue
 *   //=currentFeature
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   return currentFeature
 * });
 */
function flattenReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    flattenEach(geojson, function (currentFeature, featureIndex, multiFeatureIndex) {
        if (featureIndex === 0 && multiFeatureIndex === 0 && initialValue === undefined) previousValue = currentFeature;
        else previousValue = callback(previousValue, currentFeature, featureIndex, multiFeatureIndex);
    });
    return previousValue;
}

/**
 * Callback for segmentEach
 *
 * @callback segmentEachCallback
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 * @returns {void}
 */

/**
 * Iterate over 2-vertex line segment in any GeoJSON object, similar to Array.forEach()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex)
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentEach(polygon, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //=currentSegment
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   //=segmentIndex
 * });
 *
 * // Calculate the total number of segments
 * var total = 0;
 * turf.segmentEach(polygon, function () {
 *     total++;
 * });
 */
function segmentEach(geojson, callback) {
    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        var segmentIndex = 0;

        // Exclude null Geometries
        if (!feature.geometry) return;
        // (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
        var type = feature.geometry.type;
        if (type === 'Point' || type === 'MultiPoint') return;

        // Generate 2-vertex line segments
        var previousCoords;
        var previousFeatureIndex = 0;
        var previousMultiIndex = 0;
        var prevGeomIndex = 0;
        if (coordEach(feature, function (currentCoord, coordIndex, featureIndexCoord, multiPartIndexCoord, geometryIndex) {
            // Simulating a meta.coordReduce() since `reduce` operations cannot be stopped by returning `false`
            if (previousCoords === undefined || featureIndex > previousFeatureIndex || multiPartIndexCoord > previousMultiIndex || geometryIndex > prevGeomIndex) {
                previousCoords = currentCoord;
                previousFeatureIndex = featureIndex;
                previousMultiIndex = multiPartIndexCoord;
                prevGeomIndex = geometryIndex;
                segmentIndex = 0;
                return;
            }
            var currentSegment = helpers.lineString([previousCoords, currentCoord], feature.properties);
            if (callback(currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) === false) return false;
            segmentIndex++;
            previousCoords = currentCoord;
        }) === false) return false;
    });
}

/**
 * Callback for segmentReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback segmentReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentSegment The current Segment being processed.
 * @param {number} featureIndex The current index of the Feature being processed.
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed.
 * @param {number} geometryIndex The current index of the Geometry being processed.
 * @param {number} segmentIndex The current index of the Segment being processed.
 */

/**
 * Reduce 2-vertex line segment in any GeoJSON object, similar to Array.reduce()
 * (Multi)Point geometries do not contain segments therefore they are ignored during this operation.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson any GeoJSON
 * @param {Function} callback a method that takes (previousValue, currentSegment, currentIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {void}
 * @example
 * var polygon = turf.polygon([[[-50, 5], [-40, -10], [-50, -10], [-40, 5], [-50, 5]]]);
 *
 * // Iterate over GeoJSON by 2-vertex segments
 * turf.segmentReduce(polygon, function (previousSegment, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
 *   //= previousSegment
 *   //= currentSegment
 *   //= featureIndex
 *   //= multiFeatureIndex
 *   //= geometryIndex
 *   //= segmentInex
 *   return currentSegment
 * });
 *
 * // Calculate the total number of segments
 * var initialValue = 0
 * var total = turf.segmentReduce(polygon, function (previousValue) {
 *     previousValue++;
 *     return previousValue;
 * }, initialValue);
 */
function segmentReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    var started = false;
    segmentEach(geojson, function (currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex) {
        if (started === false && initialValue === undefined) previousValue = currentSegment;
        else previousValue = callback(previousValue, currentSegment, featureIndex, multiFeatureIndex, geometryIndex, segmentIndex);
        started = true;
    });
    return previousValue;
}

/**
 * Callback for lineEach
 *
 * @callback lineEachCallback
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Iterate over line or ring coordinates in LineString, Polygon, MultiLineString, MultiPolygon Features or Geometries,
 * similar to Array.forEach.
 *
 * @name lineEach
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @example
 * var multiLine = turf.multiLineString([
 *   [[26, 37], [35, 45]],
 *   [[36, 53], [38, 50], [41, 55]]
 * ]);
 *
 * turf.lineEach(multiLine, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 * });
 */
function lineEach(geojson, callback) {
    // validation
    if (!geojson) throw new Error('geojson is required');

    flattenEach(geojson, function (feature, featureIndex, multiFeatureIndex) {
        if (feature.geometry === null) return;
        var type = feature.geometry.type;
        var coords = feature.geometry.coordinates;
        switch (type) {
        case 'LineString':
            if (callback(feature, featureIndex, multiFeatureIndex, 0, 0) === false) return false;
            break;
        case 'Polygon':
            for (var geometryIndex = 0; geometryIndex < coords.length; geometryIndex++) {
                if (callback(helpers.lineString(coords[geometryIndex], feature.properties), featureIndex, multiFeatureIndex, geometryIndex) === false) return false;
            }
            break;
        }
    });
}

/**
 * Callback for lineReduce
 *
 * The first time the callback function is called, the values provided as arguments depend
 * on whether the reduce method has an initialValue argument.
 *
 * If an initialValue is provided to the reduce method:
 *  - The previousValue argument is initialValue.
 *  - The currentValue argument is the value of the first element present in the array.
 *
 * If an initialValue is not provided:
 *  - The previousValue argument is the value of the first element present in the array.
 *  - The currentValue argument is the value of the second element present in the array.
 *
 * @callback lineReduceCallback
 * @param {*} previousValue The accumulated value previously returned in the last invocation
 * of the callback, or initialValue, if supplied.
 * @param {Feature<LineString>} currentLine The current LineString|LinearRing being processed.
 * @param {number} featureIndex The current index of the Feature being processed
 * @param {number} multiFeatureIndex The current index of the Multi-Feature being processed
 * @param {number} geometryIndex The current index of the Geometry being processed
 */

/**
 * Reduce features in any GeoJSON object, similar to Array.reduce().
 *
 * @name lineReduce
 * @param {Geometry|Feature<LineString|Polygon|MultiLineString|MultiPolygon>} geojson object
 * @param {Function} callback a method that takes (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex)
 * @param {*} [initialValue] Value to use as the first argument to the first call of the callback.
 * @returns {*} The value that results from the reduction.
 * @example
 * var multiPoly = turf.multiPolygon([
 *   turf.polygon([[[12,48],[2,41],[24,38],[12,48]], [[9,44],[13,41],[13,45],[9,44]]]),
 *   turf.polygon([[[5, 5], [0, 0], [2, 2], [4, 4], [5, 5]]])
 * ]);
 *
 * turf.lineReduce(multiPoly, function (previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
 *   //=previousValue
 *   //=currentLine
 *   //=featureIndex
 *   //=multiFeatureIndex
 *   //=geometryIndex
 *   return currentLine
 * });
 */
function lineReduce(geojson, callback, initialValue) {
    var previousValue = initialValue;
    lineEach(geojson, function (currentLine, featureIndex, multiFeatureIndex, geometryIndex) {
        if (featureIndex === 0 && initialValue === undefined) previousValue = currentLine;
        else previousValue = callback(previousValue, currentLine, featureIndex, multiFeatureIndex, geometryIndex);
    });
    return previousValue;
}

/**
 * Finds a particular 2-vertex LineString Segment from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 * Point & MultiPoint will always return null.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.segmentIndex=0] Segment Index
 * @param {Object} [options.properties={}] Translate Properties to output LineString
 * @param {BBox} [options.bbox={}] Translate BBox to output LineString
 * @param {number|string} [options.id={}] Translate Id to output LineString
 * @returns {Feature<LineString>} 2-vertex GeoJSON Feature LineString
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findSegment(multiLine);
 * // => Feature<LineString<[[10, 10], [50, 30]]>>
 *
 * // First Segment of 2nd Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: 1});
 * // => Feature<LineString<[[-10, -10], [-50, -30]]>>
 *
 * // Last Segment of Last Multi Feature
 * turf.findSegment(multiLine, {multiFeatureIndex: -1, segmentIndex: -1});
 * // => Feature<LineString<[[-50, -30], [-30, -40]]>>
 */
function findSegment(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var segmentIndex = options.segmentIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find SegmentIndex
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
        if (segmentIndex < 0) segmentIndex = coords.length + segmentIndex - 1;
        return helpers.lineString([coords[segmentIndex], coords[segmentIndex + 1]], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[geometryIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[geometryIndex][segmentIndex], coords[geometryIndex][segmentIndex + 1]], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex].length + segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][segmentIndex], coords[multiFeatureIndex][segmentIndex + 1]], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (segmentIndex < 0) segmentIndex = coords[multiFeatureIndex][geometryIndex].length - segmentIndex - 1;
        return helpers.lineString([coords[multiFeatureIndex][geometryIndex][segmentIndex], coords[multiFeatureIndex][geometryIndex][segmentIndex + 1]], properties, options);
    }
    throw new Error('geojson is invalid');
}

/**
 * Finds a particular Point from a GeoJSON using `@turf/meta` indexes.
 *
 * Negative indexes are permitted.
 *
 * @param {FeatureCollection|Feature|Geometry} geojson Any GeoJSON Feature or Geometry
 * @param {Object} [options={}] Optional parameters
 * @param {number} [options.featureIndex=0] Feature Index
 * @param {number} [options.multiFeatureIndex=0] Multi-Feature Index
 * @param {number} [options.geometryIndex=0] Geometry Index
 * @param {number} [options.coordIndex=0] Coord Index
 * @param {Object} [options.properties={}] Translate Properties to output Point
 * @param {BBox} [options.bbox={}] Translate BBox to output Point
 * @param {number|string} [options.id={}] Translate Id to output Point
 * @returns {Feature<Point>} 2-vertex GeoJSON Feature Point
 * @example
 * var multiLine = turf.multiLineString([
 *     [[10, 10], [50, 30], [30, 40]],
 *     [[-10, -10], [-50, -30], [-30, -40]]
 * ]);
 *
 * // First Segment (defaults are 0)
 * turf.findPoint(multiLine);
 * // => Feature<Point<[10, 10]>>
 *
 * // First Segment of the 2nd Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: 1});
 * // => Feature<Point<[-10, -10]>>
 *
 * // Last Segment of last Multi-Feature
 * turf.findPoint(multiLine, {multiFeatureIndex: -1, coordIndex: -1});
 * // => Feature<Point<[-30, -40]>>
 */
function findPoint(geojson, options) {
    // Optional Parameters
    options = options || {};
    if (!helpers.isObject(options)) throw new Error('options is invalid');
    var featureIndex = options.featureIndex || 0;
    var multiFeatureIndex = options.multiFeatureIndex || 0;
    var geometryIndex = options.geometryIndex || 0;
    var coordIndex = options.coordIndex || 0;

    // Find FeatureIndex
    var properties = options.properties;
    var geometry;

    switch (geojson.type) {
    case 'FeatureCollection':
        if (featureIndex < 0) featureIndex = geojson.features.length + featureIndex;
        properties = properties || geojson.features[featureIndex].properties;
        geometry = geojson.features[featureIndex].geometry;
        break;
    case 'Feature':
        properties = properties || geojson.properties;
        geometry = geojson.geometry;
        break;
    case 'Point':
    case 'MultiPoint':
        return null;
    case 'LineString':
    case 'Polygon':
    case 'MultiLineString':
    case 'MultiPolygon':
        geometry = geojson;
        break;
    default:
        throw new Error('geojson is invalid');
    }

    // Find Coord Index
    if (geometry === null) return null;
    var coords = geometry.coordinates;
    switch (geometry.type) {
    case 'Point':
        return helpers.point(coords, properties, options);
    case 'MultiPoint':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        return helpers.point(coords[multiFeatureIndex], properties, options);
    case 'LineString':
        if (coordIndex < 0) coordIndex = coords.length + coordIndex;
        return helpers.point(coords[coordIndex], properties, options);
    case 'Polygon':
        if (geometryIndex < 0) geometryIndex = coords.length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[geometryIndex].length + coordIndex;
        return helpers.point(coords[geometryIndex][coordIndex], properties, options);
    case 'MultiLineString':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex].length + coordIndex;
        return helpers.point(coords[multiFeatureIndex][coordIndex], properties, options);
    case 'MultiPolygon':
        if (multiFeatureIndex < 0) multiFeatureIndex = coords.length + multiFeatureIndex;
        if (geometryIndex < 0) geometryIndex = coords[multiFeatureIndex].length + geometryIndex;
        if (coordIndex < 0) coordIndex = coords[multiFeatureIndex][geometryIndex].length - coordIndex;
        return helpers.point(coords[multiFeatureIndex][geometryIndex][coordIndex], properties, options);
    }
    throw new Error('geojson is invalid');
}

exports.coordEach = coordEach;
exports.coordReduce = coordReduce;
exports.propEach = propEach;
exports.propReduce = propReduce;
exports.featureEach = featureEach;
exports.featureReduce = featureReduce;
exports.coordAll = coordAll;
exports.geomEach = geomEach;
exports.geomReduce = geomReduce;
exports.flattenEach = flattenEach;
exports.flattenReduce = flattenReduce;
exports.segmentEach = segmentEach;
exports.segmentReduce = segmentReduce;
exports.lineEach = lineEach;
exports.lineReduce = lineReduce;
exports.findSegment = findSegment;
exports.findPoint = findPoint;


/***/ }),

/***/ "dZA3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("hB31");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_ts_loader_index_js_ref_1_1_node_modules_vue_loader_lib_index_js_vue_loader_options_WebMap_vue_vue_type_script_lang_ts___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e/Qi":
/***/ (function(module, exports, __webpack_require__) {

/**
* geostats() is a tiny and standalone javascript library for classification 
* Project page - https://github.com/simogeo/geostats
* Copyright (c) 2011 Simon Georget, http://www.empreinte-urbaine.eu
* Licensed under the MIT license
*/


(function (definition) {
    // This file will function properly as a <script> tag, or a module
    // using CommonJS and NodeJS or RequireJS module formats.

    // CommonJS
    if (true) {
        module.exports = definition();

    // RequireJS
    } else {}

})(function () {

var isInt = function(n) {
   return typeof n === 'number' && parseFloat(n) == parseInt(n, 10) && !isNaN(n);
} // 6 characters

var _t = function(str) {
	return str;
};

//taking from http://stackoverflow.com/questions/18082/validate-decimal-numbers-in-javascript-isnumeric
var isNumber = function(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
}



//indexOf polyfill
// from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function (searchElement, fromIndex) {
      if ( this === undefined || this === null ) {
        throw new TypeError( '"this" is null or not defined' );
      }

      var length = this.length >>> 0; // Hack to convert object.length to a UInt32

      fromIndex = +fromIndex || 0;

      if (Math.abs(fromIndex) === Infinity) {
        fromIndex = 0;
      }

      if (fromIndex < 0) {
        fromIndex += length;
        if (fromIndex < 0) {
          fromIndex = 0;
        }
      }

      for (;fromIndex < length; fromIndex++) {
        if (this[fromIndex] === searchElement) {
          return fromIndex;
        }
      }

      return -1;
    };
  }

var geostats = function(a) {

	this.objectID = '';
	this.separator = ' - ';
	this.legendSeparator = this.separator;
	this.method  = '';
	this.precision = 0;
	this.precisionflag = 'auto';
	this.roundlength 	= 2; // Number of decimals, round values
	this.is_uniqueValues = false;
	this.debug =  false;
	this.silent = false;
	
	this.bounds  = Array();
	this.ranges  = Array();
	this.inner_ranges  = null;
	this.colors  = Array();
	this.counter = Array();
	
	// statistics information
	this.stat_sorted	= null;
	this.stat_mean 		= null;
	this.stat_median 	= null;
	this.stat_sum 		= null;
	this.stat_max 		= null;
	this.stat_min 		= null;
	this.stat_pop 		= null;
	this.stat_variance	= null;
	this.stat_stddev	= null;
	this.stat_cov		= null;

	
	/**
	 * logging method
	 */
	this.log = function(msg, force) {
	
		if(this.debug == true || force != null)
			console.log(this.objectID + "(object id) :: " + msg);
		
	};
	
	/**
	 * Set bounds
	 */
	this.setBounds = function(a) {
		
		this.log('Setting bounds (' + a.length + ') : ' + a.join());
	
		this.bounds = Array() // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))
		
		this.bounds = a;
		//this.bounds = this.decimalFormat(a);
		
	};
	
	/**
	 * Set a new serie
	 */
	this.setSerie = function(a) {
		
		this.log('Setting serie (' + a.length + ') : ' + a.join());
	
		this.serie = Array() // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))
		this.serie = a;
		
		//reset statistics after changing serie
	    this.resetStatistics();
	    
		this.setPrecision();
		
	};
	
	/**
	 * Set colors
	 */
	this.setColors = function(colors) {
		
		this.log('Setting color ramp (' + colors.length + ') : '  + colors.join());
		
		this.colors = colors;
		
	};
	
	/**
	 * Get feature count
	 * With bounds array(0, 0.75, 1.5, 2.25, 3); 
	 * should populate this.counter with 5 keys
	 * and increment counters for each key
	 */
	this.doCount = function() {

		if (this._nodata())
			return;
		

		var tmp = this.sorted();
		
		this.counter = new Array();
		
		// we init counter with 0 value
		for(i = 0; i < this.bounds.length -1; i++) {
			this.counter[i]= 0;
		}
		
		for(j=0; j < tmp.length; j++) {
			
			// get current class for value to increment the counter
			var cclass = this.getClass(tmp[j]);
			this.counter[cclass]++;

		}

	};
	
	/**
	 * Set decimal precision according to user input
	 * or automatcally determined according
	 * to the given serie.
	 */
	this.setPrecision = function(decimals) {
		
		// only when called from user
		if(typeof decimals !== "undefined") {
			this.precisionflag = 'manual';
			this.precision = decimals;
		}
		
		// we calculate the maximal decimal length on given serie
		if(this.precisionflag == 'auto') {
			
			for (var i = 0; i < this.serie.length; i++) {
				
				// check if the given value is a number and a float
				if (!isNaN((this.serie[i]+"")) && (this.serie[i]+"").toString().indexOf('.') != -1) {
					var precision = (this.serie[i] + "").split(".")[1].length;
				} else {
					var precision = 0;
				}
				
				if(precision > this.precision) {
					this.precision = precision;
				}
				
			}
			
		}
		if(this.precision > 20) {
			// prevent "Uncaught RangeError: toFixed() digits argument must be between 0 and 20" bug. See https://github.com/simogeo/geostats/issues/34
			this.log('this.precision value (' + this.precision + ') is greater than max value. Automatic set-up to 20 to prevent "Uncaught RangeError: toFixed()" when calling decimalFormat() method.');
			this.precision = 20;
		}

		this.log('Calling setPrecision(). Mode : ' + this.precisionflag + ' - Decimals : '+ this.precision);
		
		this.serie = this.decimalFormat(this.serie);
		
	};
	
	/**
	 * Format array numbers regarding to precision
	 */
	this.decimalFormat = function(a) {
		
		var b = new Array();
		
		for (var i = 0; i < a.length; i++) {
			// check if the given value is a number
			if (isNumber(a[i])) {
				b[i] = parseFloat(parseFloat(a[i]).toFixed(this.precision));
			} else {
				b[i] = a[i];
			}
		}
		
		return b;
	}
	
	/**
	 * Transform a bounds array to a range array the following array : array(0,
	 * 0.75, 1.5, 2.25, 3); becomes : array('0-0.75', '0.75-1.5', '1.5-2.25',
	 * '2.25-3');
	 */
	this.setRanges = function() {
	
		this.ranges = Array(); // init empty array to prevent bug when calling classification after another with less items (sample getQuantile(6) and getQuantile(4))
		
		for (i = 0; i < (this.bounds.length - 1); i++) {
			this.ranges[i] = this.bounds[i] + this.separator + this.bounds[i + 1];
		}
	};

	/** return min value */
	this.min = function() {
		
		if (this._nodata())
			return;
		
		this.stat_min = this.serie[0];
		
		for (i = 0; i < this.pop(); i++) {
			if (this.serie[i] < this.stat_min) {
				this.stat_min = this.serie[i];
			}
		}

		return this.stat_min;
	};

	/** return max value */
	this.max = function() {
		
		if (this._nodata())
			return;
		
		this.stat_max = this.serie[0];
		for (i = 0; i < this.pop(); i++) {
			if (this.serie[i] > this.stat_max) {
				this.stat_max = this.serie[i];
			}
		}
		
		return this.stat_max;
	};

	/** return sum value */
	this.sum = function() {
		
		if (this._nodata())
			return;
		
		if (this.stat_sum  == null) {
			
			this.stat_sum = 0;
			for (i = 0; i < this.pop(); i++) {
				this.stat_sum += parseFloat(this.serie[i]);
			}
			
		}
		
		return this.stat_sum;
	};

	/** return population number */
	this.pop = function() {
		
		if (this._nodata())
			return;
		
		if (this.stat_pop  == null) {
			
			this.stat_pop = this.serie.length;
			
		}
		
		return this.stat_pop;
	};

	/** return mean value */
	this.mean = function() {
		
		if (this._nodata())
			return;

		if (this.stat_mean  == null) {
			
			this.stat_mean = parseFloat(this.sum() / this.pop());
			
		}
		
		return this.stat_mean;
	};

	/** return median value */
	this.median = function() {
		
		if (this._nodata())
			return;
		
		if (this.stat_median  == null) {
			
			this.stat_median = 0;
			var tmp = this.sorted();
			
			// serie pop is odd
			if (tmp.length % 2) {
				this.stat_median = parseFloat(tmp[(Math.ceil(tmp.length / 2) - 1)]);
				
			// serie pop is even
			} else {
				this.stat_median = ( parseFloat(tmp[((tmp.length / 2) - 1)]) + parseFloat(tmp[(tmp.length / 2)]) ) / 2;
			}
			
		}
		
		return this.stat_median;
	};

	/** return variance value */
	this.variance = function() {
		
		round = (typeof round === "undefined") ? true : false;
		
		if (this._nodata())
			return;
		
		if (this.stat_variance  == null) {

			var tmp = 0, serie_mean = this.mean();
			for (var i = 0; i < this.pop(); i++) {
				tmp += Math.pow( (this.serie[i] - serie_mean), 2 );
			}

			this.stat_variance =  tmp / this.pop();
			
			if(round == true) {
				this.stat_variance = Math.round(this.stat_variance * Math.pow(10,this.roundlength) )/ Math.pow(10,this.roundlength);
			}
			
		}
		
		return this.stat_variance;
	};
	
	/** return standard deviation value */
	this.stddev = function(round) {
		
		round = (typeof round === "undefined") ? true : false;
		
		if (this._nodata())
			return;
		
		if (this.stat_stddev  == null) {
			
			this.stat_stddev = Math.sqrt(this.variance());
			
			if(round == true) {
				this.stat_stddev = Math.round(this.stat_stddev * Math.pow(10,this.roundlength) )/ Math.pow(10,this.roundlength);
			}
			
		}
		
		return this.stat_stddev;
	};
	
	/** coefficient of variation - measure of dispersion */
	this.cov = function(round) {
		
		round = (typeof round === "undefined") ? true : false;
		
		if (this._nodata())
			return;
		
		if (this.stat_cov  == null) {
			
			this.stat_cov = this.stddev() / this.mean();
			
			if(round == true) {
				this.stat_cov = Math.round(this.stat_cov * Math.pow(10,this.roundlength) )/ Math.pow(10,this.roundlength);
			}
			
		}
		
		return this.stat_cov;
	};
	
	/** reset all attributes after setting a new serie */
	this.resetStatistics = function() {
	    this.stat_sorted    = null;
	    this.stat_mean  = null;
	    this.stat_median    = null;
	    this.stat_sum       = null;
	    this.stat_max       = null;
	    this.stat_min       = null;
	    this.stat_pop       = null;
	    this.stat_variance  = null;
	    this.stat_stddev    = null;
	    this.stat_cov       = null;
	}
	
	/** data test */
	this._nodata = function() {
		if (this.serie.length == 0) {
			
			if(this.silent) this.log("[silent mode] Error. You should first enter a serie!", true);
			else throw new TypeError("Error. You should first enter a serie!");
			return 1;
		} else
			return 0;
		
	};
	
	/** check if the serie contains negative value */
	this._hasNegativeValue = function() {
		
		for (i = 0; i < this.serie.length; i++) {
	    	if(this.serie[i] < 0)
	    		return true;
	    }

		return false;
	};
	
	/** check if the serie contains zero value */
	this._hasZeroValue = function() {
		
		for (i = 0; i < this.serie.length; i++) {
	    	if(parseFloat(this.serie[i]) === 0)
	    		return true;
	    }

		return false;
	};

	/** return sorted values (as array) */
	this.sorted = function() {
		
		if (this.stat_sorted  == null) {
			
			if(this.is_uniqueValues == false) {
				this.stat_sorted = this.serie.sort(function(a, b) {
					return a - b;
				});
			} else {
				this.stat_sorted = this.serie.sort(function(a,b){
					var nameA=a.toString().toLowerCase(), nameB=b.toString().toLowerCase();
				    if(nameA < nameB) return -1;
				    if(nameA > nameB) return 1;
				    return 0;
				})
			}
		}
		
		return this.stat_sorted;
		
	};

	/** return all info */
	this.info = function() {
		
		if (this._nodata())
			return;
		
		var content = '';
		content += _t('Population') + ' : ' + this.pop() + ' - [' + _t('Min')
				+ ' : ' + this.min() + ' | ' + _t('Max') + ' : ' + this.max()
				+ ']' + "\n";
		content += _t('Mean') + ' : ' + this.mean() + ' - ' + _t('Median')	+ ' : ' + this.median() + "\n";
		content += _t('Variance') + ' : ' + this.variance() + ' - ' + _t('Standard deviation')	+ ' : ' + this.stddev()  
				+ ' - ' + _t('Coefficient of variation')	+ ' : ' + this.cov() + "\n";

		return content;
	};
	
	/**
	 * Set Manual classification Return an array with bounds : ie array(0,
	 * 0.75, 1.5, 2.25, 3);
	 * Set ranges and prepare data for displaying legend
	 * 
	 */
	this.setClassManually = function(array) {

		if (this._nodata())
	        return;

	    if(array[0] !== this.min() || array[array.length-1] !== this.max()) {
	    	if(this.silent) this.log("[silent mode] " + t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()), true);
			else throw new TypeError(_t('Given bounds may not be correct! please check your input.\nMin value : ' + this.min() + ' / Max value : ' + this.max()));
	    	return; 
	    }

	    this.setBounds(array);
	    this.setRanges();
	    
	    // we specify the classification method
	    this.method = _t('manual classification') + ' (' + (array.length -1) + ' ' + _t('classes') + ')';

	    return this.bounds;
	};

	/**
	 * Equal intervals classification Return an array with bounds : ie array(0,
	 * 0.75, 1.5, 2.25, 3);
	 */
	this.getClassEqInterval = function(nbClass, forceMin, forceMax) {

		if (this._nodata())
	        return;

		var tmpMin = (typeof forceMin === "undefined") ? this.min() : forceMin;
		var tmpMax = (typeof forceMax === "undefined") ? this.max() : forceMax;
		
	    var a = Array();
	    var val = tmpMin;
	    var interval = (tmpMax - tmpMin) / nbClass;

	    for (i = 0; i <= nbClass; i++) {
	        a[i] = val;
	        val += interval;
	    }

	    //-> Fix last bound to Max of values
	    a[nbClass] = tmpMax;

	    this.setBounds(a);
	    this.setRanges();
	    
	    // we specify the classification method
	    this.method = _t('eq. intervals') + ' (' + nbClass + ' ' + _t('classes') + ')';

	    return this.bounds;
	};
	

	this.getQuantiles = function(nbClass) {
		var tmp = this.sorted();
		var quantiles = [];

		var step = this.pop() / nbClass;
		for (var i = 1; i < nbClass; i++) {
			var qidx = Math.round(i*step+0.49);
			quantiles.push(tmp[qidx-1]); // zero-based
		}

		return quantiles;
	};

	/**
	 * Quantile classification Return an array with bounds : ie array(0, 0.75,
	 * 1.5, 2.25, 3);
	 */
	this.getClassQuantile = function(nbClass) {

		if (this._nodata())
			return;

		var tmp = this.sorted();
		var bounds = this.getQuantiles(nbClass);
		bounds.unshift(tmp[0]);

		if (bounds[tmp.length - 1] !== tmp[tmp.length - 1])
			bounds.push(tmp[tmp.length - 1]);

		this.setBounds(bounds);
		this.setRanges();

		// we specify the classification method
		this.method = _t('quantile') + ' (' + nbClass + ' ' + _t('classes') + ')';

		return this.bounds;

	};
	
	/**
	 * Standard Deviation classification
	 * Return an array with bounds : ie array(0,
	 * 0.75, 1.5, 2.25, 3);
	 */
	this.getClassStdDeviation = function(nbClass, matchBounds) {

		if (this._nodata())
	        return;

	    var tmpMax = this.max();
	    var tmpMin = this.min();
	    
	    var a = Array();
	    
	    // number of classes is odd
	    if(nbClass % 2 == 1) {

	    	// Euclidean division to get the inferior bound
	    	var infBound = Math.floor(nbClass / 2);
	    	
	    	var supBound = infBound + 1;
	    	
	    	// we set the central bounds
	    	a[infBound] = this.mean() - ( this.stddev() / 2);
	    	a[supBound] = this.mean() + ( this.stddev() / 2);
	    	
	    	// Values < to infBound, except first one
	    	for (i = infBound - 1; i > 0; i--) {
	    		var val = a[i+1] - this.stddev();
		        a[i] = val;
		    }
	    	
	    	// Values > to supBound, except last one
	    	for (i = supBound + 1; i < nbClass; i++) {
	    		var val = a[i-1] + this.stddev();
		        a[i] = val;
		    }
	    	
	    	// number of classes is even
	    } else {
	    	
	    	var meanBound = nbClass / 2;
	    	
	    	// we get the mean value
	    	a[meanBound] = this.mean();
	    	
	    	// Values < to the mean, except first one
	    	for (i = meanBound - 1; i > 0; i--) {
	    		var val = a[i+1] - this.stddev();
		        a[i] = val;
		    }
	    	
	    	// Values > to the mean, except last one
	    	for (i = meanBound + 1; i < nbClass; i++) {
	    		var val = a[i-1] + this.stddev();
		        a[i] = val;
		    }
	    }
	    
	    
	    // we finally set the first value
	    // do we excatly match min value or not ? 
	    a[0] = (typeof matchBounds === "undefined") ? a[1]-this.stddev() : this.min();
    	
    	// we finally set the last value
	    // do we excatly match max value or not ? 
    	a[nbClass] = (typeof matchBounds === "undefined") ? a[nbClass-1]+this.stddev() : this.max();

	    this.setBounds(a);
	    this.setRanges();
	    
	    // we specify the classification method
	    this.method = _t('std deviation') + ' (' + nbClass + ' ' + _t('classes')+ ')'; 
	    
	    return this.bounds;
	};
	
	
	/**
	 * Geometric Progression classification 
	 * http://en.wikipedia.org/wiki/Geometric_progression
	 * Return an array with bounds : ie array(0,
	 * 0.75, 1.5, 2.25, 3);
	 */
	this.getClassGeometricProgression = function(nbClass) {

		if (this._nodata())
	        return;

	    if(this._hasNegativeValue() || this._hasZeroValue()) {
	    	if(this.silent) this.log("[silent mode] " + _t('geometric progression can\'t be applied with a serie containing negative or zero values.'), true);
			else throw new TypeError(_t('geometric progression can\'t be applied with a serie containing negative or zero values.'));
	    	return;
	    }
	    
	    var a = Array();
	    var tmpMin = this.min();
	    var tmpMax = this.max();
	    
	    var logMax = Math.log(tmpMax) / Math.LN10; // max decimal logarithm (or base 10)
	    var logMin = Math.log(tmpMin) / Math.LN10;; // min decimal logarithm (or base 10)
	    
	    var interval = (logMax - logMin) / nbClass;
	    
	    // we compute log bounds
	    for (i = 0; i < nbClass; i++) {
	    	if(i == 0) {
	    		a[i] = logMin;
	    	} else {
	    		a[i] = a[i-1] + interval;
	    	}
	    }
	    
	    // we compute antilog
	    a = a.map(function(x) { return Math.pow(10, x); });
	    
	    // and we finally add max value
	    a.push(this.max());
	    
	    this.setBounds(a);
	    this.setRanges();
	    
	    // we specify the classification method
	    this.method = _t('geometric progression') + ' (' + nbClass + ' ' + _t('classes') + ')';

	    return this.bounds;
	};
	
	/**
	 * Arithmetic Progression classification 
	 * http://en.wikipedia.org/wiki/Arithmetic_progression
	 * Return an array with bounds : ie array(0,
	 * 0.75, 1.5, 2.25, 3);
	 */
	this.getClassArithmeticProgression = function(nbClass) {

		if (this._nodata())
	        return;
	    
	    var denominator = 0;
	    
	    // we compute the (french) "Raison"
	    for (i = 1; i <= nbClass; i++) {
	        denominator += i;
	    }

	    var a = Array();
	    var tmpMin = this.min();
	    var tmpMax = this.max();
	    
	    var interval = (tmpMax - tmpMin) / denominator;

	    for (i = 0; i <= nbClass; i++) {
	    	if(i == 0) {
	    		a[i] = tmpMin;
	    	} else {
	    		a[i] = a[i-1] + (i * interval);
	    	}
	    }

	    this.setBounds(a);
	    this.setRanges();
	    
	    // we specify the classification method
	    this.method = _t('arithmetic progression') + ' (' + nbClass + ' ' + _t('classes') + ')';

	    return this.bounds;
	};
	
	/**
	 * Credits : Doug Curl (javascript) and Daniel J Lewis (python implementation)
	 * http://www.arcgis.com/home/item.html?id=0b633ff2f40d412995b8be377211c47b
	 * http://danieljlewis.org/2010/06/07/jenks-natural-breaks-algorithm-in-python/
	 */
	this.getClassJenks = function(nbClass) {
	
		if (this._nodata())
			return;
		
		dataList = this.sorted();

		// now iterate through the datalist:
		// determine mat1 and mat2
		// really not sure how these 2 different arrays are set - the code for
		// each seems the same!
		// but the effect are 2 different arrays: mat1 and mat2
		var mat1 = []
		for ( var x = 0, xl = dataList.length + 1; x < xl; x++) {
			var temp = []
			for ( var j = 0, jl = nbClass + 1; j < jl; j++) {
				temp.push(0)
			}
			mat1.push(temp)
		}

		var mat2 = []
		for ( var i = 0, il = dataList.length + 1; i < il; i++) {
			var temp2 = []
			for ( var c = 0, cl = nbClass + 1; c < cl; c++) {
				temp2.push(0)
			}
			mat2.push(temp2)
		}

		// absolutely no idea what this does - best I can tell, it sets the 1st
		// group in the
		// mat1 and mat2 arrays to 1 and 0 respectively
		for ( var y = 1, yl = nbClass + 1; y < yl; y++) {
			mat1[0][y] = 1
			mat2[0][y] = 0
			for ( var t = 1, tl = dataList.length + 1; t < tl; t++) {
				mat2[t][y] = Infinity
			}
			var v = 0.0
		}

		// and this part - I'm a little clueless on - but it works
		// pretty sure it iterates across the entire dataset and compares each
		// value to
		// one another to and adjust the indices until you meet the rules:
		// minimum deviation
		// within a class and maximum separation between classes
		for ( var l = 2, ll = dataList.length + 1; l < ll; l++) {
			var s1 = 0.0
			var s2 = 0.0
			var w = 0.0
			for ( var m = 1, ml = l + 1; m < ml; m++) {
				var i3 = l - m + 1
				var val = parseFloat(dataList[i3 - 1])
				s2 += val * val
				s1 += val
				w += 1
				v = s2 - (s1 * s1) / w
				var i4 = i3 - 1
				if (i4 != 0) {
					for ( var p = 2, pl = nbClass + 1; p < pl; p++) {
						if (mat2[l][p] >= (v + mat2[i4][p - 1])) {
							mat1[l][p] = i3
							mat2[l][p] = v + mat2[i4][p - 1]
						}
					}
				}
			}
			mat1[l][1] = 1
			mat2[l][1] = v
		}

		var k = dataList.length
		var kclass = []

		// fill the kclass (classification) array with zeros:
		for (i = 0; i <= nbClass; i++) {
			kclass.push(0);
		}

		// this is the last number in the array:
		kclass[nbClass] = parseFloat(dataList[dataList.length - 1])
		// this is the first number - can set to zero, but want to set to lowest
		// to use for legend:
		kclass[0] = parseFloat(dataList[0])
		var countNum = nbClass
		while (countNum >= 2) {
			var id = parseInt((mat1[k][countNum]) - 2)
			kclass[countNum - 1] = dataList[id]
			k = parseInt((mat1[k][countNum] - 1))
			// spits out the rank and value of the break values:
			// console.log("id="+id,"rank = " + String(mat1[k][countNum]),"val =
			// " + String(dataList[id]))
			// count down:
			countNum -= 1
		}
		// check to see if the 0 and 1 in the array are the same - if so, set 0
		// to 0:
		if (kclass[0] == kclass[1]) {
			kclass[0] = 0
		}

		this.setBounds(kclass);
		this.setRanges();

		
		this.method = _t('Jenks') + ' (' + nbClass + ' ' + _t('classes') + ')';
		
		return this.bounds; //array of breaks
	}
	
	
	/**
	 * Quantile classification Return an array with bounds : ie array(0, 0.75,
	 * 1.5, 2.25, 3);
	 */
	this.getClassUniqueValues = function() {

		if (this._nodata())
			return;
		
		this.is_uniqueValues = true;
		
		var tmp = this.sorted(); // display in alphabetical order

		var a = Array();

		for (i = 0; i < this.pop(); i++) {
			if(a.indexOf(tmp[i]) === -1)
				a.push(tmp[i]);
		}
		
		this.bounds = a;
		
		// we specify the classification method
		this.method = _t('unique values');
		
		return a;

	};
	
	
	/**
	 * Return the class of a given value.
	 * For example value : 6
	 * and bounds array = (0, 4, 8, 12);
	 * Return 2
	 */
	this.getClass = function(value) {

		for(i = 0; i < this.bounds.length; i++) {
			
			
			if(this.is_uniqueValues == true) {
				if(value == this.bounds[i])
					return i;
			} else {
				// parseFloat() is necessary
				if(parseFloat(value) <= this.bounds[i + 1]) {
					return i;
				}
			}
		}
		
		return _t("Unable to get value's class.");
		
	};

	/**
	 * Return the ranges array : array('0-0.75', '0.75-1.5', '1.5-2.25',
	 * '2.25-3');
	 */
	this.getRanges = function() {
		
		return this.ranges;
		
	};

	/**
	 * Returns the number/index of this.ranges that value falls into
	 */
	this.getRangeNum = function(value) {
		
		var bounds, i;

		for (i = 0; i < this.ranges.length; i++) {
			bounds = this.ranges[i].split(/ - /);
			if (value <= parseFloat(bounds[1])) {
				return i;
			}
		}
	}
	
	/*
	 * Compute inner ranges based on serie. 
	 * Produce discontinous ranges used for legend - return an array similar to : 
	 * array('0.00-0.74', '0.98-1.52', '1.78-2.25', '2.99-3.14');
	 * If inner ranges already computed, return array values.
	 */
	this.getInnerRanges = function() {
		
		// if already computed, we return the result
		if(this.inner_ranges != null)
			return this.inner_ranges;

		
		var a = new Array();
		var tmp = this.sorted();
		
		var cnt = 1; // bounds array counter
		
		for (i = 0; i < tmp.length; i++) {
			
			if(i == 0) var range_firstvalue = tmp[i]; // we init first range value
			
			if(parseFloat(tmp[i]) > parseFloat(this.bounds[cnt])) {
				
				a[cnt - 1] = '' + range_firstvalue + this.separator + tmp[i-1];
				
				var range_firstvalue =  tmp[i];
				
				cnt++;

			}
			
			// we reach the last range, we finally complete manually
			// and return the array
			if(cnt == (this.bounds.length - 1)) {
				// we set the last value
				a[cnt - 1] = '' + range_firstvalue + this.separator + tmp[tmp.length-1];
				
				this.inner_ranges = a;
				return this.inner_ranges;
			}
			

		}
		
	};
	
	this.getSortedlist = function() {
		
		return this.sorted().join(', ');
		
	};
	
	/**
	 * Return an html legend
	 * colors : specify an array of color (hexadecimal values)
	 * legend :  specify a text input for the legend. By default, just displays 'legend'
	 * counter : if not null, display counter value
	 * callback : if not null, callback function applied on legend boundaries
	 * mode : 	null, 'default', 'distinct', 'discontinuous' : 
	 * 			- if mode is null, will display legend as 'default mode'
	 * 			- 'default' : displays ranges like in ranges array (continuous values), sample :  29.26 - 378.80 / 378.80 - 2762.25 /  2762.25 - 6884.84
	 * 			- 'distinct' : Add + 1 according to decimal precision to distinguish classes (discrete values), sample :  29.26 - 378.80 / 378.81 - 2762.25 /  2762.26 - 6884.84 
	 * 			- 'discontinuous' : indicates the range of data actually falling in each class , sample :  29.26 - 225.43 / 852.12 - 2762.20 /  3001.25 - 6884.84 / not implemented yet
	 * order : 	null, 'ASC', 'DESC'
	 */
	this.getHtmlLegend = function(colors, legend, counter, callback, mode, order) {
		
		var cnt= '';
		var elements = new Array();
		
		this.doCount(); // we do count, even if not displayed
		
		if(colors != null) {
			ccolors = colors;
		}
		else {
			ccolors = this.colors;
		}
		
		if(legend != null) {
			lg = legend;
		}
		else {
			lg =  'Legend';
		}
		
		if(counter != null) {
			getcounter = true;
		}
		else {
			getcounter = false;
		}
		
		if(callback != null) {
			fn = callback;
		}
		else {
			fn = function(o) {return o;};
		}
		if(mode == null) {
			mode = 'default';
		}
		if(mode == 'discontinuous') {
			this.getInnerRanges();
			// check if some classes are not populated / equivalent of in_array function
			if(this.counter.indexOf(0) !== -1) {
		    	if(this.silent) this.log("[silent mode] " + _t("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!"), true);
				else throw new TypeError(_t("Geostats cannot apply 'discontinuous' mode to the getHtmlLegend() method because some classes are not populated.\nPlease switch to 'default' or 'distinct' modes. Exit!"));
				return;
			}

		}
		if(order !== 'DESC') order = 'ASC';
		
		if(ccolors.length < this.ranges.length) {
			if(this.silent) this.log("[silent mode] " + _t('The number of colors should fit the number of ranges. Exit!'), true);
			else throw new TypeError(_t('The number of colors should fit the number of ranges. Exit!'));
			return;
		}
		
		if(this.is_uniqueValues == false) {
			
			for (i = 0; i < (this.ranges.length); i++) {
				if(getcounter===true) {
					cnt = ' <span class="geostats-legend-counter">(' + this.counter[i] + ')</span>';
				}
				//console.log("Ranges : " + this.ranges[i]);
				
				// default mode 
				var tmp = this.ranges[i].split(this.separator);
					
				var start_value = parseFloat(tmp[0]).toFixed(this.precision);
				var end_value = parseFloat(tmp[1]).toFixed(this.precision);
					
				
				// if mode == 'distinct' and we are not working on the first value
				if(mode == 'distinct' && i != 0) {

					if(isInt(start_value)) {
						start_value = parseInt(start_value) + 1;
						// format to float if necessary
						if(this.precisionflag == 'manual' && this.precision != 0) start_value = parseFloat(start_value).toFixed(this.precision);
					} else {

						start_value = parseFloat(start_value) + (1 / Math.pow(10,this.precision));
						// strangely the formula above return sometimes long decimal values, 
						// the following instruction fix it
						start_value = parseFloat(start_value).toFixed(this.precision);
					}
				}
				
				// if mode == 'discontinuous'
				if(mode == 'discontinuous') {
										
					var tmp = this.inner_ranges[i].split(this.separator);
					// console.log("Ranges : " + this.inner_ranges[i]);
					
					var start_value = parseFloat(tmp[0]).toFixed(this.precision);
					var end_value = parseFloat(tmp[1]).toFixed(this.precision);
					
				}
				
				// we apply callback function
				var el = fn(start_value) + this.legendSeparator + fn(end_value);
					
				var block = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[i] + '"></div> ' + el + cnt + '</div>';
				elements.push(block);
			}
			
		} else {
			
			// only if classification is done on unique values
			for (i = 0; i < (this.bounds.length); i++) {
				if(getcounter===true) {
					cnt = ' <span class="geostats-legend-counter">(' + this.counter[i] + ')</span>';
				}
				var el = fn(this.bounds[i]);
				var block = '<div><div class="geostats-legend-block" style="background-color:' + ccolors[i] + '"></div> ' + el + cnt + '</div>';

				elements.push(block);
			}
			
		}
		
		// do we reverse the return legend ?
		if(order === 'DESC') elements.reverse(); 
		
		// finally we create HTML and return it
		var content  = '<div class="geostats-legend"><div class="geostats-legend-title">' + _t(lg) + '</div>';
		for (i = 0; i < (elements.length); i++) {
			content += elements[i];
		}
		content += '</div>';
    
		return content;
	};

	
	
	// object constructor
	// At the end of script. If not setPrecision() method is not known
	
	// we create an object identifier for debugging
	this.objectID = new Date().getUTCMilliseconds();
	this.log('Creating new geostats object');
	
	if(typeof a !== 'undefined' && a.length > 0) {
		this.serie = a;
		this.setPrecision();
		this.log('Setting serie (' + a.length + ') : ' + a.join());
	} else {
		this.serie = Array();

	};
	
	// creating aliases on classification function for backward compatibility
	this.getJenks = this.getClassJenks;
	this.getGeometricProgression = this.getClassGeometricProgression;
	this.getEqInterval = this.getClassEqInterval;
	this.getQuantile = this.getClassQuantile;
	this.getStdDeviation = this.getClassStdDeviation;
	this.getUniqueValues = this.getClassUniqueValues;
	this.getArithmeticProgression = this.getClassArithmeticProgression;

};

window.geostats = geostats;
return geostats;
});

/***/ }),

/***/ "e6PS":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Pixel = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */

/**
 * @class Pixel
 * @category BaseTypes Geometry
 * @classdesc 此类用 x,y 坐标描绘屏幕坐标（像素点）。
 * @param {number} [x=0.0] - x 坐标。
 * @param {number} [y=0.0] - y 坐标。
 * @param {Pixel.Mode} [mode=Pixel.Mode.LeftTop] - 坐标模式。
 *
 * @example
 * //单独创建一个对象
 * var pixcel = new Pixel(100,50);
 *
 * //依据 size 创建
 *  var size = new Size(21,25);
 *  var offset = new Pixel(-(size.w/2), -size.h);
 */
var Pixel =
/*#__PURE__*/
function () {
  function Pixel(x, y, mode) {
    (0, _classCallCheck2.default)(this, Pixel);

    /**
     * @member {number} [Pixel.prototype.x=0.0]
     * @description x 坐标。
     */
    this.x = x ? parseFloat(x) : 0.0;
    /**
     * @member {number} [Pixel.prototype.y=0.0]
     * @description y 坐标。
     */

    this.y = y ? parseFloat(y) : 0.0;
    /**
     * @member {Pixel.Mode} [Pixel.prototype.mode=Pixel.Mode.LeftTop]
     * @description 坐标模式，有左上、右上、右下、左下这几种模式，分别表示相对于左上角、右上角、右下角、左下角的坐标。
     */

    this.mode = mode;
    this.CLASS_NAME = 'Pixel';
    /**
     * @enum Pixel.Mode
     * @readonly
     * @description 模式。
     * @type {string}
     */

    Pixel.Mode = {
      /** 左上模式。 */
      LeftTop: 'lefttop',

      /** 右上模式。 */
      RightTop: 'righttop',

      /** 右下模式。 */
      RightBottom: 'rightbottom',

      /** 左下模式。 */
      LeftBottom: 'leftbottom'
    };
  }
  /**
   * @function Pixel.prototype.toString
   * @description 返回此对象的字符串形式。
   * @example
   *
   * var pixcel = new Pixel(100,50);
   * var str = pixcel.toString();
   *
   * @returns {string} 例如: "x=200.4,y=242.2"
   */


  (0, _createClass2.default)(Pixel, [{
    key: "toString",
    value: function toString() {
      return 'x=' + this.x + ',y=' + this.y;
    }
    /**
     * @function Pixel.prototype.clone
     * @description 克隆当前的 pixel 对象。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = pixcel.clone();
     * @returns {Pixel} 返回一个新的与当前 pixel 对象有相同 x、y 坐标的 pixel 对象。
     */

  }, {
    key: "clone",
    value: function clone() {
      return new Pixel(this.x, this.y, this.mode);
    }
    /**
     * @function Pixel.prototype.equals
     * @description 比较两 pixel 是否相等。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(100,50);
     * var isEquals = pixcel.equals(pixcel2);
     *
     * @param {Pixel} px - 用于比较相等的 pixel 对象。
     * @returns {boolean} 如果传入的像素点和当前像素点相同返回 true，如果不同或传入参数为 NULL 则返回 false。
     */

  }, {
    key: "equals",
    value: function equals(px) {
      var equals = false;

      if (px != null) {
        equals = this.x === px.x && this.y === px.y || isNaN(this.x) && isNaN(this.y) && isNaN(px.x) && isNaN(px.y);
      }

      return equals;
    }
    /**
     * @function Pixel.prototype.distanceTo
     * @description 返回两个 pixel 的距离。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(110,30);
     * var distance = pixcel.distanceTo(pixcel2);
     *
     * @param {Pixel} px - 用于计算的一个 pixel。
     * @returns {float} 作为参数传入的像素与当前像素点的距离。
     */

  }, {
    key: "distanceTo",
    value: function distanceTo(px) {
      return Math.sqrt(Math.pow(this.x - px.x, 2) + Math.pow(this.y - px.y, 2));
    }
    /**
     * @function Pixel.prototype.add
     * @description 在原来像素坐标基础上，x 值加上传入的 x 参数，y 值加上传入的 y 参数。
     * @example
     * var pixcel = new Pixel(100,50);
     * //pixcel2是新的对象
     * var pixcel2 = pixcel.add(20,30);
     *
     * @param {number} x - 传入的 x 值。
     * @param {number} y - 传入的 y 值。
     * @returns {Pixel} 返回一个新的 pixel 对象，该 pixel 是由当前的 pixel 与传入的 x，y 相加得到。
     */

  }, {
    key: "add",
    value: function add(x, y) {
      if (x == null || y == null) {
        throw new TypeError('Pixel.add cannot receive null values');
      }

      return new Pixel(this.x + x, this.y + y);
    }
    /**
     * @function Pixel.prototype.offset
     * @description 通过传入的 {@link Pixel} 参数对原屏幕坐标进行偏移。
     * @example
     * var pixcel = new Pixel(100,50);
     * var pixcel2 = new Pixel(130,20);
     * //pixcel3 是新的对象
     * var pixcel3 = pixcel.offset(pixcel2);
     *
     * @param {Pixel} px - 传入的 <Pixel> 对象。
     * @returns {Pixel} 返回一个新的 pixel，该 pixel 是由当前的 pixel 对象的 x，y 值与传入的 Pixel 对象的 x，y 值相加得到。
     */

  }, {
    key: "offset",
    value: function offset(px) {
      var newPx = this.clone();

      if (px) {
        newPx = this.add(px.x, px.y);
      }

      return newPx;
    }
    /**
     *
     * @function Pixel.prototype.destroy
     * @description 销毁此对象。销毁后此对象的所有属性为 null，而不是初始值。
     * @example
     * var pixcel = new Pixel(100,50);
     * pixcel.destroy();
     */

  }, {
    key: "destroy",
    value: function destroy() {
      this.x = null;
      this.y = null;
      this.mode = null;
    }
  }]);
  return Pixel;
}();

exports.Pixel = Pixel;

/***/ }),

/***/ "e7LN":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDateTime = getDateTime;
exports.hexToRgba = hexToRgba;
exports.isTransparent = isTransparent;
exports.reservedDecimal = reservedDecimal;
exports.clearNumberComma = clearNumberComma;
exports.isXField = isXField;
exports.isYField = isYField;
exports.getColorWithOpacity = getColorWithOpacity;
exports.parseUrl = parseUrl;

var _lang = __webpack_require__("DSM6");

var _colorcolor = _interopRequireDefault(__webpack_require__("rn/G"));

// 获取当前时间返回置顶格式
function getDateTime(timeType) {
  return (0, _lang.geti18n)().d(new Date(), timeType.replace(/\+/g, '_'), (0, _lang.getLanguage)());
} // hex -> rgba


function hexToRgba(hex, opacity) {
  return 'rgba(' + parseInt('0x' + hex.slice(1, 3)) + ',' + parseInt('0x' + hex.slice(3, 5)) + ',' + parseInt('0x' + hex.slice(5, 7)) + ',' + opacity + ')';
}

function isTransparent(color) {
  var rgba = (0, _colorcolor.default)(color, 'rgba');
  return +rgba.match(/(\d(\.\d+)?)+/g)[3] === 0;
} // 保留指定位数的小数


function reservedDecimal(val, precise) {
  return Number(val).toFixed(precise);
} // 清除数字（字符串型的）的逗号


function clearNumberComma(num) {
  if (num.replace) {
    num = num.replace(/,/g, '');
  }

  return num;
}
/**
 * 判断是否地理X坐标
 * @param data
 */


function isXField(data) {
  var lowerdata = data.toLowerCase();
  return lowerdata === 'x' || lowerdata === 'smx' || lowerdata === 'jd' || lowerdata === '经度' || lowerdata === '东经' || lowerdata === 'longitude' || lowerdata === 'lot' || lowerdata === 'lon' || lowerdata === 'lng' || lowerdata === 'x坐标';
}
/**
 * 判断是否地理Y坐标
 * @param data
 */


function isYField(data) {
  var lowerdata = data.toLowerCase();
  return lowerdata === 'y' || lowerdata === 'smy' || lowerdata === 'wd' || lowerdata === '纬度' || lowerdata === '北纬' || lowerdata === 'latitude' || lowerdata === 'lat' || lowerdata === 'y坐标';
}

function getColorWithOpacity(color, opacity) {
  if (color.indexOf('rgba') > -1) {
    return color.substring(0, color.lastIndexOf(',') + 1) + opacity + ')';
  }

  var newColor = (0, _colorcolor.default)(color, 'rgb');
  return 'rgba' + newColor.substring(3, newColor.length - 1) + ",".concat(opacity, ")");
}

function parseUrl(url) {
  var urlRe = /^(\w+):\/\/([^/?]*)(\/[^?]+)?\??(.+)?/;
  return url.match(urlRe);
}

/***/ }),

/***/ "ekee":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("II3L");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Text_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "gQum":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _lang = __webpack_require__("DSM6");

var RestDataParameter = function RestDataParameter(options) {
  (0, _classCallCheck2.default)(this, RestDataParameter);
  this.type = 'iServer';
  this.url = options.url;
  this.dataName = options.dataName;
  this.attributeFilter = options.attributeFilter || null;
  this.maxFeatures = options.maxFeatures || 20;
  this.name = options.name || (0, _lang.geti18n)().t('commontypes.restData');
};

exports.default = RestDataParameter;

/***/ }),

/***/ "h9Sk":
/***/ (function(module, exports, __webpack_require__) {

module.exports = {
    ResizeSensor: __webpack_require__("KtZj"),
    ElementQueries: __webpack_require__("rnKy")
};


/***/ }),

/***/ "hB31":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _WebMapViewModel = _interopRequireDefault(__webpack_require__("0F1z"));

var _vmUpdater = _interopRequireDefault(__webpack_require__("w286"));

var _mapEvent = _interopRequireDefault(__webpack_require__("Whz7"));

var _vuePropertyDecorator = __webpack_require__("YKMj");

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SmWebMap =
/*#__PURE__*/
function (_Mixins) {
  (0, _inherits2.default)(SmWebMap, _Mixins);

  function SmWebMap() {
    var _this;

    (0, _classCallCheck2.default)(this, SmWebMap);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SmWebMap).apply(this, arguments));
    _this.spinning = true;
    return _this;
  }

  (0, _createClass2.default)(SmWebMap, [{
    key: "mapIdChanged",
    value: function mapIdChanged() {
      this.spinning = true;
    }
  }, {
    key: "mounted",
    value: function mounted() {
      this.initializeWebMap();
      this.registerEvents();
    }
  }, {
    key: "beforeDestroy",
    value: function beforeDestroy() {
      this.destory();

      _mapEvent.default.$options.deleteMap(this.target);

      _mapEvent.default.$options.deleteWebMap(this.target);
    }
  }, {
    key: "load",
    value: function load(value) {
      return value;
    }
  }, {
    key: "getMapFailed",
    value: function getMapFailed(value) {
      return value;
    }
  }, {
    key: "getLayerDatasourceFailed",
    value: function getLayerDatasourceFailed(value) {
      return value;
    }
  }, {
    key: "initializeWebMap",
    value: function initializeWebMap() {
      var _this$$props = this.$props,
          target = _this$$props.target,
          serverUrl = _this$$props.serverUrl,
          accessToken = _this$$props.accessToken,
          accessKey = _this$$props.accessKey,
          tiandituKey = _this$$props.tiandituKey,
          withCredentials = _this$$props.withCredentials,
          excludePortalProxyUrl = _this$$props.excludePortalProxyUrl,
          isSuperMapOnline = _this$$props.isSuperMapOnline,
          mapOptions = _this$$props.mapOptions;
      this.viewModel = new _WebMapViewModel.default(this.mapId, {
        target: target,
        serverUrl: serverUrl,
        accessToken: accessToken,
        accessKey: accessKey,
        tiandituKey: tiandituKey,
        withCredentials: withCredentials,
        excludePortalProxyUrl: excludePortalProxyUrl,
        isSuperMapOnline: isSuperMapOnline
      }, mapOptions);
    }
  }, {
    key: "registerEvents",
    value: function registerEvents() {
      var _this2 = this;

      this.viewModel.on('addlayerssucceeded', function (e) {
        _this2.spinning = false;

        _mapEvent.default.$options.setMap(_this2.target, e.map);

        _this2.viewModel && _mapEvent.default.$options.setWebMap(_this2.target, _this2.viewModel);

        _mapEvent.default.$emit('load-map', e.map, _this2.target);

        _this2.map = e.map;

        _this2.load({
          map: e.map
        });
      });
      this.viewModel.on('getmapinfofailed', function (e) {
        _this2.getMapFailed({
          error: e.error
        });

        _this2.$message.error(e.error.message);

        _this2.spinning = false;
      });
      this.viewModel.on('getlayerdatasourcefailed', function (e) {
        _this2.getLayerDatasourceFailed({
          error: e.error,
          layer: e.layer,
          map: e.map
        });

        _this2.$message.error(_this2.$t('webmap.getLayerInfoFailed'));
      });
      this.viewModel.on('crsnotsupport', function () {
        _this2.$message.error(_this2.$t('webmap.crsnotsupport'));
      });
    }
  }, {
    key: "destory",
    value: function destory() {}
  }, {
    key: "getMapTarget",
    get: function get() {
      return this.target;
    }
  }]);
  return SmWebMap;
}((0, _vuePropertyDecorator.Mixins)(_vmUpdater.default));

__decorate([(0, _vuePropertyDecorator.Provide)()], SmWebMap.prototype, "__resizeHandler", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "mapId", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)({
  default: 'map'
})], SmWebMap.prototype, "target", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)({
  default: 'http://www.supermapol.com'
})], SmWebMap.prototype, "serverUrl", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "accessToken", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "accessKey", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "tiandituKey", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)({
  default: false
})], SmWebMap.prototype, "withCredentials", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "excludePortalProxyUrl", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "isSuperMapOnline", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmWebMap.prototype, "mapOptions", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)({
  default: true
})], SmWebMap.prototype, "autoresize", void 0);

__decorate([(0, _vuePropertyDecorator.Watch)('mapId')], SmWebMap.prototype, "mapIdChanged", null);

__decorate([(0, _vuePropertyDecorator.Emit)()], SmWebMap.prototype, "load", null);

__decorate([(0, _vuePropertyDecorator.Emit)()], SmWebMap.prototype, "getMapFailed", null);

__decorate([(0, _vuePropertyDecorator.Emit)()], SmWebMap.prototype, "getLayerDatasourceFailed", null);

SmWebMap = __decorate([(0, _vuePropertyDecorator.Component)({
  name: 'SmWebMap',
  viewModelProps: ['mapId', 'serverUrl', 'mapOptions.center', 'mapOptions.zoom', 'mapOptions.minZoom', 'mapOptions.maxZoom', 'mapOptions.maxBounds', 'withCredentials']
})], SmWebMap);
var _default = SmWebMap;
exports.default = _default;

/***/ }),

/***/ "hQXD":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hQXD__;

/***/ }),

/***/ "hS5c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propsBinder = exports.capitalizeFirstLetter = void 0;

var capitalizeFirstLetter = function capitalizeFirstLetter(string) {
  if (!string || typeof string.charAt !== 'function') {
    return string;
  }

  return string.charAt(0).toUpperCase() + string.slice(1);
};

exports.capitalizeFirstLetter = capitalizeFirstLetter;

var propsBinder = function propsBinder(vueElement, props) {
  var _loop = function _loop(key) {
    var setMethodName = 'set' + capitalizeFirstLetter(key);

    if (vueElement[setMethodName]) {
      vueElement.$watch(key, function (newVal) {
        vueElement[setMethodName](newVal);
      }, {
        deep: true
      });
    }
  };

  for (var key in props) {
    _loop(key);
  }
};

exports.propsBinder = propsBinder;

/***/ }),

/***/ "hgx0":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_hgx0__;

/***/ }),

/***/ "i7/w":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_i7_w__;

/***/ }),

/***/ "i7K5":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("B8n6");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Icon_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "iPb/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/video-player/VideoPlayer.vue?vue&type=template&id=6a6899a8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-video-player"},[_c('video-player',{ref:"videoPlayer",staticClass:"sm-component-video-player__player sm-component-video-player__player--main",attrs:{"options":_vm.playerOptions,"playsinline":true},on:{"play":function($event){_vm.onPlayerPlay($event)},"ended":function($event){_vm.onPlayerEnded($event)},"loadeddata":function($event){_vm.onPlayerLoadeddata($event)}}},[_vm._v(">")]),_vm._v(" "),(_vm.url)?_c('a-modal',{attrs:{"wrapClassName":"sm-component-video-player-modal","footer":null,"width":"60%","maskClosable":false},model:{value:(_vm.modalVisible),callback:function ($$v) {_vm.modalVisible=$$v},expression:"modalVisible"}},[_c('video-player',{ref:"modalVideoPlayer",staticClass:"sm-component-video-player__player",attrs:{"options":_vm.modalPlayerOptions,"playsinline":true},on:{"play":function($event){_vm.onModalPlayerPlay($event)},"loadeddata":function($event){_vm.onModalPlayerLoadeddata($event)}}})],1):_vm._e()],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/video-player/VideoPlayer.vue?vue&type=template&id=6a6899a8&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "ifxw":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAADWBJREFUeAHt3VFqkwkUhmFbstfBBYyL8MJbcS3euqySam+knZgOxeSD5n0GBpx2zOE8R/DlD9G7D99/PH7wDwECBAgQIEDgIgLC4iKMXoQAAQIECOQFfjXFfR4BAAECBAgQIHAxgcPzV7r//PVNb4scP328e/7z/ZgAAQIECBB4/wJ/0wMvwuKJ4vjvP6+L3N2LideFfJcAAQIECLxrgecPDg4Px1cfOhy/fHuxq7dCXnD4DwIECBAgQOBvBE6eWPx+MU8mflP4AQECBAgQqAo8HP78TsW5JxmeWFR/pdibAAECBAhcQUBYXAHVSxIgQIAAgaqAsKhe3t4ECBAgQOAKAsLiCqhekgABAgQIVAWERfXy9iZAgAABAlcQOA2Lp0+D+ETIFai9JAECBAgQuB2Bp0+L/OkTI6dhcTs724QAAQIECBAYCwiLMbhxBAgQIEDgtgX87aa3fV/bESBAgACBlYC/3XQlbQ4BAgQIEGgIeCukcWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAsKicWdbEiBAgACBiYCwmDAbQoAAAQIEGgLConFnWxIgQIAAgYmAsJgwG0KAAAECBBoCwqJxZ1sSIECAAIGJgLCYMBtCgAABAgQaAi/C4v7z18fG2rYkQIAAAQIELiHw33Z4ERaXGOA1CBAgQIAAga6AsOje3uYECBAgQODiAidhcXg4Pj79e/FJXpAAAQIECBC4GYFzvXASFjezsUUIECBAgACBuYCwmJMbSIAAAQIEbldAWNzubW1GgAABAgTmAsJiTm4gAQIECBC4XQFhcbu3tRkBAgQIEJgLHM5NPPfJkIfD/d25n+PrBAgQIECAwG0JnOuBc1t6YnFOxtcJECBAgACBNwucPLE4fvn26os8/6M7j58+enrxqpZvEiBAgACB9yfw4vf6/+mC0+2+//CHYZ2q+AoBAgQIECDwVoFfTeGtkLei+f8JECBAgACBswJ3HzyxOIvjGwQIECBAgMDbBH4C+z9OgLhU6J4AAAAASUVORK5CYII="

/***/ }),

/***/ "j+GC":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Indicator_vue_vue_type_template_id_c8ef0250___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("nvcL");
/* harmony import */ var _Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("07ub");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Indicator_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Indicator_vue_vue_type_template_id_c8ef0250___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Indicator_vue_vue_type_template_id_c8ef0250___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "j/f9":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Progress_vue_vue_type_template_id_045762fb___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("XDrB");
/* harmony import */ var _Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("0Tzf");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Progress_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Progress_vue_vue_type_template_id_045762fb___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Progress_vue_vue_type_template_id_045762fb___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "jUok":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Icon", {
  enumerable: true,
  get: function get() {
    return _Icon.default;
  }
});
Object.defineProperty(exports, "Indicator", {
  enumerable: true,
  get: function get() {
    return _Indicator.default;
  }
});
Object.defineProperty(exports, "LiquidFill", {
  enumerable: true,
  get: function get() {
    return _LiquidFill.default;
  }
});
Object.defineProperty(exports, "Progress", {
  enumerable: true,
  get: function get() {
    return _Progress.default;
  }
});
Object.defineProperty(exports, "Text", {
  enumerable: true,
  get: function get() {
    return _Text.default;
  }
});
Object.defineProperty(exports, "TimeText", {
  enumerable: true,
  get: function get() {
    return _TimeText.default;
  }
});
Object.defineProperty(exports, "Border", {
  enumerable: true,
  get: function get() {
    return _Border.default;
  }
});
Object.defineProperty(exports, "Image", {
  enumerable: true,
  get: function get() {
    return _Image.default;
  }
});
Object.defineProperty(exports, "VideoPlayer", {
  enumerable: true,
  get: function get() {
    return _VideoPlayer.default;
  }
});
Object.defineProperty(exports, "Iframe", {
  enumerable: true,
  get: function get() {
    return _Iframe.default;
  }
});
Object.defineProperty(exports, "WebMap", {
  enumerable: true,
  get: function get() {
    return _WebMap.default;
  }
});
Object.defineProperty(exports, "SmTileLayer", {
  enumerable: true,
  get: function get() {
    return _SmTileLayer.default;
  }
});

var _Icon = _interopRequireDefault(__webpack_require__("8HGC"));

var _Indicator = _interopRequireDefault(__webpack_require__("j+GC"));

var _LiquidFill = _interopRequireDefault(__webpack_require__("50+k"));

var _Progress = _interopRequireDefault(__webpack_require__("j/f9"));

var _Text = _interopRequireDefault(__webpack_require__("2a28"));

var _TimeText = _interopRequireDefault(__webpack_require__("VgK+"));

var _Border = _interopRequireDefault(__webpack_require__("U4oE"));

var _Image = _interopRequireDefault(__webpack_require__("n4aT"));

var _VideoPlayer = _interopRequireDefault(__webpack_require__("VEr5"));

var _Iframe = _interopRequireDefault(__webpack_require__("81VL"));

var _WebMap = _interopRequireDefault(__webpack_require__("8Wwx"));

var _SmTileLayer = _interopRequireDefault(__webpack_require__("G9Sk"));

/***/ }),

/***/ "jcU1":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _echarts = _interopRequireDefault(__webpack_require__("Fk5u"));

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

__webpack_require__("hQXD");

var _cssElementQueries = __webpack_require__("h9Sk");

var _timer = _interopRequireDefault(__webpack_require__("HatH"));

var _RestService = _interopRequireDefault(__webpack_require__("w4Wy"));

//
//
//
//
//
//
//
//
var _default = {
  name: 'SmLiquidFill',
  mixins: [_theme.default, _timer.default],
  props: {
    // 百分比的值
    value: {
      type: [Number, String],
      default: 0
    },
    // 波浪数
    waveCount: {
      type: Number,
      default: 1
    },
    // 字体
    fontSize: {
      type: [Number, String]
    },
    // 波浪颜色
    waveColor: {
      type: String
    },
    // 边框颜色
    borderColor: {
      type: String
    },
    // 数字在波浪外的颜色
    labelColor: {
      type: String,
      default: '#626c91'
    },
    // 背景色
    backgroundColor: {
      type: String
    },
    // 数字在波浪内的颜色
    insideLabelColor: {
      type: String,
      default: '#fff'
    },
    // 是否开启波浪动画
    waveAnimation: {
      type: Boolean,
      default: false
    },
    url: {
      type: String
    }
  },
  data: function data() {
    return {
      waveColorData: '',
      labelColorData: '',
      borderColorData: '',
      backgroundColorData: '',
      finalValue: this.value
    };
  },
  computed: {
    // 根据波浪数渲染数据
    calcData: function calcData() {
      var data = [];
      var formatValue = isNaN(this.finalValue) ? 0 : parseFloat(this.finalValue);

      for (var i = 0; i < this.waveCount; i++) {
        data.push(formatValue - i * 0.05);
      }

      return data;
    }
  },
  watch: {
    url: {
      handler: function handler(val) {
        if (val) {
          this.getData();
        } else {
          this.finalValue = this.value;
        }
      },
      immediate: true
    },
    waveColor: function waveColor(val) {
      this.waveColorData = val;
      this.updateChart();
    },
    labelColor: function labelColor(val) {
      this.labelColorData = val;
      this.updateChart();
    },
    borderColor: function borderColor(val) {
      this.borderColorData = val;
      this.updateChart();
    },
    backgroundColor: function backgroundColor(val) {
      this.backgroundColorData = val;
      this.updateChart();
    },
    finalValue: function finalValue() {
      this.updateChart();
    },
    fontSize: function fontSize() {
      this.updateChart();
    },
    waveCount: function waveCount() {
      this.updateChart();
    },
    waveAnimation: function waveAnimation() {
      this.updateChart();
    },
    value: function value(val) {
      this.finalValue = val;
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.waveColorData = this.waveColor || this.getColor(0);
    this.labelColorData = this.labelColor || this.getTextColor;
    this.borderColorData = this.borderColor || this.waveColorData;
    this.backgroundColorData = this.backgroundColor || this.getBackground;
    this.restService = new _RestService.default();
    this.restService.on({
      'getdatasucceeded': this.fetchData
    });
    setTimeout(function () {
      _this.initializeChart();

      _this.resize();
    }, 0);
  },
  beforeDestroy: function beforeDestroy() {
    this.restService.remove('getdatasucceeded');
  },
  methods: {
    resize: function resize() {
      this.chart && this.chart.resize();
    },
    initializeChart: function initializeChart() {
      var _this2 = this;

      this.chart = _echarts.default.init(this.$refs.chart);
      this.updateChart();
      this.$on('theme-style-changed', function () {
        _this2.waveColorData = _this2.getColor(0);
        _this2.labelColorData = _this2.getTextColor;
        _this2.borderColorData = _this2.getColor(0);
        _this2.backgroundColorData = _this2.getBackground;

        _this2.updateChart(true);
      });
      this.resizeObsever = new _cssElementQueries.ResizeSensor(this.$el, function () {
        _this2.resize();
      });
    },
    updateChart: function updateChart() {
      var propsUpdate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      this.chart.setOption({
        series: [{
          color: [this.waveColorData],
          type: 'liquidFill',
          waveAnimation: this.waveAnimation,
          animation: false,
          radius: '95%',
          data: this.calcData,
          label: {
            fontSize: parseFloat(this.fontSize),
            color: this.labelColorData,
            insideColor: this.insideLabelColor
          },
          backgroundStyle: {
            color: this.backgroundColorData
          },
          itemStyle: {
            shadowColor: '#fff'
          },
          outline: {
            borderDistance: 3,
            itemStyle: {
              borderColor: this.borderColorData,
              borderWidth: 3,
              shadowBlur: 0,
              shadowColor: '#fff'
            }
          }
        }]
      });
    },
    timing: function timing() {
      this.getData();
    },
    fetchData: function fetchData(data) {
      this.finalValue = data.data;
    },
    getData: function getData() {
      this.restService && this.restService.getData(this.url);
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "jsF9":
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "kokw":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

//
//
//
//
var _default = {
  name: 'SmIframe',
  mixins: [_theme.default],
  props: {
    src: {
      type: String
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "lSNA":
/***/ (function(module, exports) {

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

module.exports = _defineProperty;

/***/ }),

/***/ "lsho":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/text/Text.vue?vue&type=template&id=3be1953c&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-text",style:([_vm.customStyle, _vm.getBackgroundStyle, _vm.getTextColorStyle])},[(_vm.href)?_c('span',[_c('a',{staticClass:"sm-component-text__href",style:([_vm.getTextColorStyle]),attrs:{"target":_vm.target,"href":_vm.href}},[_vm._v(_vm._s(_vm.finalTitle))])]):_c('span',[_vm._v(_vm._s(_vm.finalTitle))])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/text/Text.vue?vue&type=template&id=3be1953c&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "lwsE":
/***/ (function(module, exports) {

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

module.exports = _classCallCheck;

/***/ }),

/***/ "m0LI":
/***/ (function(module, exports) {

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

module.exports = _iterableToArrayLimit;

/***/ }),

/***/ "m5z/":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/icon/Icon.vue?vue&type=template&id=3522372a&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-icon",style:([_vm.background && _vm.getBackgroundStyle])},[(!!_vm.iconClass)?_c('i',{class:_vm.customIconClass,style:([_vm.iconStyle, _vm.colorStyle]),attrs:{"theme":_vm.theme,"twoToneColor":_vm.twoToneColor,"component":_vm.component}}):_c('a-icon',{style:([_vm.iconStyle, _vm.colorStyle]),attrs:{"type":_vm.type,"theme":_vm.theme,"twoToneColor":_vm.twoToneColor,"component":_vm.component}})],1)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/icon/Icon.vue?vue&type=template&id=3522372a&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "m68f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _lang = __webpack_require__("DSM6");

var iPortalDataParameter = function iPortalDataParameter(options) {
  (0, _classCallCheck2.default)(this, iPortalDataParameter);
  this.type = 'iPortal';
  this.url = options.url;
  this.attributeFilter = options.attributeFilter || null;
  this.maxFeatures = options.maxFeatures || 20;
  this.name = options.name || (0, _lang.geti18n)().t('commontypes.iportalData');
  this.withCredentials = options.withCredentials || false;
};

exports.default = iPortalDataParameter;

/***/ }),

/***/ "mLhc":
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
   true ? module.exports : undefined
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}


/***/ }),

/***/ "mkpX":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Layer = _interopRequireDefault(__webpack_require__("KS6f"));

var _default = {
  mixins: [_Layer.default],
  props: {
    pane: {
      type: String,
      default: 'tilePane'
    },
    opacity: {
      type: Number,
      default: 1,
      validator: function validator(opacity) {
        return opacity >= 0 && opacity <= 1;
      }
    },
    bounds: {
      type: Array
    },
    zIndex: {
      type: Number,
      default: 1
    },
    tileSize: {
      type: Number,
      default: 256
    },
    noWrap: {
      type: Boolean,
      default: false
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "n4aT":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Image_vue_vue_type_template_id_452a2bc2___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0Z9T");
/* harmony import */ var _Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("tA+t");
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("KHd+");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"])(
  _Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _Image_vue_vue_type_template_id_452a2bc2___WEBPACK_IMPORTED_MODULE_0__[/* render */ "a"],
  _Image_vue_vue_type_template_id_452a2bc2___WEBPACK_IMPORTED_MODULE_0__[/* staticRenderFns */ "b"],
  false,
  null,
  null,
  null
  
)

/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "nmnc":
/***/ (function(module, exports, __webpack_require__) {

var root = __webpack_require__("Kz5y");

/** Built-in value references. */
var Symbol = root.Symbol;

module.exports = Symbol;


/***/ }),

/***/ "nvcL":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/common/indicator/Indicator.vue?vue&type=template&id=c8ef0250&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-indicator",style:([_vm.getBackgroundStyle,{'flex-direction':_vm.direction}])},[_c('div',{staticClass:"sm-component-indicator__head"},[_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showTitleUnit),expression:"showTitleUnit"}],staticClass:"sm-component-indicator__title",style:([_vm.unit_titleStyle, _vm.getTextColorStyle])},[_vm._v(_vm._s(_vm.titleData))])]),_vm._v(" "),_c('div',{staticClass:"sm-component-indicator__content"},[_c('span',{staticClass:"sm-component-indicator__num",style:([_vm.indicatorStyle])},[(_vm.isNumber(_vm.num))?_c('countTo',{attrs:{"decimals":_vm.calDecimals,"startVal":_vm.startData,"endVal":_vm.numData,"duration":Number(_vm.duration) || 1000,"separator":_vm.separator,"numBackground":_vm.numBackground,"numSpacing":_vm.numSpacing,"separatorBackground":_vm.separatorBackground,"fontSize":_vm.fontSize}}):_vm._e(),_vm._v("\n      "+_vm._s(_vm.isNumber(_vm.num) ? '' : _vm.num)+"\n    ")],1),_vm._v(" "),_c('span',{directives:[{name:"show",rawName:"v-show",value:(_vm.showTitleUnit),expression:"showTitleUnit"}],staticClass:"sm-component-indicator__unit",style:([_vm.unit_titleStyle, _vm.getTextColorStyle])},[_vm._v(_vm._s(_vm.unitData))])])])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/common/indicator/Indicator.vue?vue&type=template&id=c8ef0250&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "o0o1":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("mLhc");


/***/ }),

/***/ "p1EF":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _vuePropertyDecorator = __webpack_require__("YKMj");

__webpack_require__("/aIJ");

var _vueVideoPlayer = __webpack_require__("1tPa");

var _lodash = _interopRequireDefault(__webpack_require__("zT9C"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SmVideoPlayer =
/*#__PURE__*/
function (_Vue) {
  (0, _inherits2.default)(SmVideoPlayer, _Vue);

  function SmVideoPlayer() {
    var _this;

    (0, _classCallCheck2.default)(this, SmVideoPlayer);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(SmVideoPlayer).apply(this, arguments));
    _this.isFirst = true;
    _this.modalVisible = false;
    _this.playerOptions = {};
    _this.modalPlayerOptions = {};
    return _this;
  }

  (0, _createClass2.default)(SmVideoPlayer, [{
    key: "modalVisibleChanged",
    value: function modalVisibleChanged() {
      if (this.modalVisible && this.modalVideoPlayer) {
        this.modalVideoPlayer.currentTime(0);
        this.modalVideoPlayer.play();
      }
    }
  }, {
    key: "urlChanged",
    value: function urlChanged() {
      this.handlePlayerOptions();
    }
  }, {
    key: "optionsChanged",
    value: function optionsChanged() {
      this.handlePlayerOptions();
    }
  }, {
    key: "created",
    value: function created() {
      this.handlePlayerOptions();
    }
  }, {
    key: "handlePlayerOptions",
    value: function handlePlayerOptions() {
      if (!this.url) {
        return;
      }

      if (!this.checkUrl(this.url)) {
        this.$message.warning(this.$t('warning.unsupportedVideoAddress'), 1);

        if (this.playerOptions.sources) {
          this.playerOptions.sources[0].src = '';
          this.modalPlayerOptions.sources[0].src = '';
        }

        return;
      }

      var sourcesType = this.url.split('.');
      var commonOptions = {
        height: '100%',
        autoplay: this.options.autoplay !== null ? this.options.autoplay : false,
        muted: this.options.muted !== null ? this.options.muted : true,
        loop: this.options.loop !== null ? this.options.loop : false,
        fluid: false,
        language: 'zh-CN',
        playbackRates: [0.7, 1.0, 1.5, 2.0],
        sources: [{
          type: "video/".concat(sourcesType[sourcesType.length - 1]),
          src: "".concat(this.options.autoplay && !this.options.popupToPlay ? this.url : this.url + '#t=0.8')
        }],
        preload: 'metadata',
        poster: '',
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
          remainingTimeDisplay: false,
          fullscreenToggle: true
        },
        notSupportedMessage: this.$t('warning.unavailableVideo')
      };
      this.playerOptions = (0, _lodash.default)(commonOptions);
      this.modalPlayerOptions = (0, _lodash.default)(commonOptions);
      this.modalPlayerOptions.sources[0].src = this.url;
      this.modalPlayerOptions.autoplay = true;
      this.modalPlayerOptions.preload = 'none';
      this.modalPlayerOptions.height = '600';
    }
  }, {
    key: "onPlayerPlay",
    value: function onPlayerPlay(player) {
      if (!this.checkUrl(this.url)) {
        return;
      }

      if (this.isFirst && this.options.popupToPlay) {
        this.$message.info(this.$t('info.pressEscToExit'), 3);
      }

      if (this.isFirst && !this.options.popupToPlay && !this.options.autoplay) {
        player.currentTime(0);
        this.isFirst = false;
      }

      if (this.options.popupToPlay) {
        player.pause();
        player.currentTime(1);
        player.controlBar.el_.style.visibility = 'hidden';
        this.modalVisible = true;
      } else {
        this.handleControlBar(player);
      }
    }
  }, {
    key: "onModalPlayerPlay",
    value: function onModalPlayerPlay(player) {
      this.handleControlBar(player);
    }
  }, {
    key: "onModalPlayerLoadeddata",
    value: function onModalPlayerLoadeddata(player) {
      this.modalVideoPlayer = player;
      player.play();
      this.handleControlBar(player);
    }
  }, {
    key: "onPlayerEnded",
    value: function onPlayerEnded(player) {
      if (!this.options.autoplay && !this.options.popupToPlay) {
        player.currentTime(1);
        this.isFirst = true;
      }
    }
  }, {
    key: "onPlayerLoadeddata",
    value: function onPlayerLoadeddata(player) {
      if (!this.checkUrl(this.url)) {
        return;
      }

      this.options.popupToPlay && player.pause();
      !this.options.popupToPlay && this.options.autoplay && player.play();
    }
  }, {
    key: "handleControlBar",
    value: function handleControlBar(player) {
      var isControlBarShow = this.options.controlBar === null ? true : this.options.controlBar;

      if (isControlBarShow) {
        player.controlBar.el_.style.visibility = 'visible';
      } else {
        player.controlBar.el_.style.visibility = 'hidden';
      }
    }
  }, {
    key: "checkUrl",
    value: function checkUrl(url) {
      var match;

      if (url === '' || !this.isMatchUrl(url) || url.indexOf('ogg') < 0 && url.indexOf('mp4') < 0 && url.indexOf('webm') < 0) {
        match = false;
      } else {
        match = true;
      }

      return match;
    }
  }, {
    key: "isMatchUrl",
    value: function isMatchUrl(str) {
      var reg = new RegExp('(https?|http|file|ftp)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]');
      return reg.test(str);
    }
  }, {
    key: "player",
    get: function get() {
      return this.$refs.videoPlayer.player;
    }
  }]);
  return SmVideoPlayer;
}(_vue.default);

__decorate([(0, _vuePropertyDecorator.Prop)()], SmVideoPlayer.prototype, "url", void 0);

__decorate([(0, _vuePropertyDecorator.Prop)({
  default: function _default() {
    return {
      muted: true,
      loop: false,
      popupToPlay: false,
      autoplay: false,
      controlBar: true
    };
  }
})], SmVideoPlayer.prototype, "options", void 0);

__decorate([(0, _vuePropertyDecorator.Watch)('modalVisible')], SmVideoPlayer.prototype, "modalVisibleChanged", null);

__decorate([(0, _vuePropertyDecorator.Watch)('url')], SmVideoPlayer.prototype, "urlChanged", null);

__decorate([(0, _vuePropertyDecorator.Watch)('options')], SmVideoPlayer.prototype, "optionsChanged", null);

SmVideoPlayer = __decorate([(0, _vuePropertyDecorator.Component)({
  name: 'SmVideoPlayer',
  components: {
    videoPlayer: _vueVideoPlayer.videoPlayer
  }
})], SmVideoPlayer);
var _default2 = SmVideoPlayer;
exports.default = _default2;

/***/ }),

/***/ "p46w":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
;(function (factory) {
	var registeredInModuleLoader = false;
	if (true) {
		!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) :
				__WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		registeredInModuleLoader = true;
	}
	if (true) {
		module.exports = factory();
		registeredInModuleLoader = true;
	}
	if (!registeredInModuleLoader) {
		var OldCookies = window.Cookies;
		var api = window.Cookies = factory();
		api.noConflict = function () {
			window.Cookies = OldCookies;
			return api;
		};
	}
}(function () {
	function extend () {
		var i = 0;
		var result = {};
		for (; i < arguments.length; i++) {
			var attributes = arguments[ i ];
			for (var key in attributes) {
				result[key] = attributes[key];
			}
		}
		return result;
	}

	function init (converter) {
		function api (key, value, attributes) {
			var result;
			if (typeof document === 'undefined') {
				return;
			}

			// Write

			if (arguments.length > 1) {
				attributes = extend({
					path: '/'
				}, api.defaults, attributes);

				if (typeof attributes.expires === 'number') {
					var expires = new Date();
					expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
					attributes.expires = expires;
				}

				// We're using "expires" because "max-age" is not supported by IE
				attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

				try {
					result = JSON.stringify(value);
					if (/^[\{\[]/.test(result)) {
						value = result;
					}
				} catch (e) {}

				if (!converter.write) {
					value = encodeURIComponent(String(value))
						.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
				} else {
					value = converter.write(value, key);
				}

				key = encodeURIComponent(String(key));
				key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
				key = key.replace(/[\(\)]/g, escape);

				var stringifiedAttributes = '';

				for (var attributeName in attributes) {
					if (!attributes[attributeName]) {
						continue;
					}
					stringifiedAttributes += '; ' + attributeName;
					if (attributes[attributeName] === true) {
						continue;
					}
					stringifiedAttributes += '=' + attributes[attributeName];
				}
				return (document.cookie = key + '=' + value + stringifiedAttributes);
			}

			// Read

			if (!key) {
				result = {};
			}

			// To prevent the for loop in the first place assign an empty array
			// in case there are no cookies at all. Also prevents odd result when
			// calling "get()"
			var cookies = document.cookie ? document.cookie.split('; ') : [];
			var rdecode = /(%[0-9A-Z]{2})+/g;
			var i = 0;

			for (; i < cookies.length; i++) {
				var parts = cookies[i].split('=');
				var cookie = parts.slice(1).join('=');

				if (!this.json && cookie.charAt(0) === '"') {
					cookie = cookie.slice(1, -1);
				}

				try {
					var name = parts[0].replace(rdecode, decodeURIComponent);
					cookie = converter.read ?
						converter.read(cookie, name) : converter(cookie, name) ||
						cookie.replace(rdecode, decodeURIComponent);

					if (this.json) {
						try {
							cookie = JSON.parse(cookie);
						} catch (e) {}
					}

					if (key === name) {
						result = cookie;
						break;
					}

					if (!key) {
						result[name] = cookie;
					}
				} catch (e) {}
			}

			return result;
		}

		api.set = api;
		api.get = function (key) {
			return api.call(api, key);
		};
		api.getJSON = function () {
			return api.apply({
				json: true
			}, [].slice.call(arguments));
		};
		api.defaults = {};

		api.remove = function (key, attributes) {
			api(key, '', extend(attributes, {
				expires: -1
			}));
		};

		api.withConverter = init;

		return api;
	}

	return init(function () {});
}));


/***/ }),

/***/ "peoL":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Events = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _Pixel = __webpack_require__("e6PS");

var _Event = __webpack_require__("x2TH");

var _BaseTypes = __webpack_require__("tW0q");

var _Util = __webpack_require__("yW8N");

/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */

/**
 * @class Events
 * @classdesc 事件类。
 * @param {Object} object - 当前事件对象被添加到的 JS 对象。
 * @param {HTMLElement} element - 响应浏览器事件的 DOM 元素。
 * @param {Array.<string>} eventTypes - 自定义应用事件的数组。
 * @param {boolean} [fallThrough=false] - 是否允许事件处理之后向上传递（冒泡），为 false 的时候阻止事件冒泡。
 * @param {Object} options - 事件对象选项。
 */
var Events =
/*#__PURE__*/
function () {
  function Events(object, element, eventTypes, fallThrough, options) {
    (0, _classCallCheck2.default)(this, Events);

    /**
     * @member {Array.<string>} Events.prototype.BROWSER_EVENTS
     * @description 支持的事件。
     * @constant
     * @default [
     "mouseover", "mouseout","mousedown", "mouseup", "mousemove",
     "click", "dblclick", "rightclick", "dblrightclick","resize",
     "focus", "blur","touchstart", "touchmove", "touchend","keydown",
     "MSPointerDown", "MSPointerUp", "pointerdown", "pointerup",
     "MSGestureStart", "MSGestureChange", "MSGestureEnd","contextmenu"
     ]
     */
    this.BROWSER_EVENTS = ['mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'rightclick', 'dblrightclick', 'resize', 'focus', 'blur', 'touchstart', 'touchmove', 'touchend', 'keydown', 'MSPointerDown', 'MSPointerUp', 'pointerdown', 'pointerup', 'MSGestureStart', 'MSGestureChange', 'MSGestureEnd', 'contextmenu'];
    this.listeners = {};
    this.object = object;
    this.element = null;
    this.eventTypes = [];
    this.eventHandler = null;
    this.fallThrough = fallThrough;
    this.includeXY = false;
    this.extensions = {};
    this.extensionCount = {};
    this.clearMouseListener = null;

    _Util.Util.extend(this, options);

    if (eventTypes != null) {
      for (var i = 0, len = eventTypes.length; i < len; i++) {
        this.addEventType(eventTypes[i]);
      }
    }

    if (element != null) {
      this.attachToElement(element);
    }

    this.CLASS_NAME = 'Events';
  }
  /**
   * @function Events.prototype.destroy
   * @description 移除当前要素 element 上的所有事件监听和处理。
   */


  (0, _createClass2.default)(Events, [{
    key: "destroy",
    value: function destroy() {
      for (var e in this.extensions) {
        if (typeof this.extensions[e] !== 'boolean') {
          this.extensions[e].destroy();
        }
      }

      this.extensions = null;

      if (this.element) {
        _Event.Event.stopObservingElement(this.element);

        if (this.element.hasScrollEvent) {
          _Event.Event.stopObserving(window, 'scroll', this.clearMouseListener);
        }
      }

      this.element = null;
      this.listeners = null;
      this.object = null;
      this.eventTypes = null;
      this.fallThrough = null;
      this.eventHandler = null;
    }
    /**
     * @function Events.prototype.addEventType
     * @description 在此事件对象中添加新的事件类型，如果这个事件类型已经添加过了，则不做任何事情。
     * @param {string} eventName - 事件名。
     */

  }, {
    key: "addEventType",
    value: function addEventType(eventName) {
      if (!this.listeners[eventName]) {
        this.eventTypes.push(eventName);
        this.listeners[eventName] = [];
      }
    }
    /**
     * @function Events.prototype.attachToElement
     * @description 给 DOM 元素绑定浏览器事件。
     * @param {HTMLDOMElement} element - 绑定浏览器事件的 DOM 元素。
     */

  }, {
    key: "attachToElement",
    value: function attachToElement(element) {
      if (this.element) {
        _Event.Event.stopObservingElement(this.element);
      } else {
        // keep a bound copy of handleBrowserEvent() so that we can
        // pass the same function to both Event.observe() and .stopObserving()
        this.eventHandler = _BaseTypes.FunctionExt.bindAsEventListener(this.handleBrowserEvent, this); // to be used with observe and stopObserving

        this.clearMouseListener = _BaseTypes.FunctionExt.bind(this.clearMouseCache, this);
      }

      this.element = element;

      for (var i = 0, len = this.BROWSER_EVENTS.length; i < len; i++) {
        var eventType = this.BROWSER_EVENTS[i]; // every browser event has a corresponding application event
        // (whether it's listened for or not).

        this.addEventType(eventType); // use Prototype to register the event cross-browser

        _Event.Event.observe(element, eventType, this.eventHandler);
      } // disable dragstart in IE so that mousedown/move/up works normally


      _Event.Event.observe(element, 'dragstart', _Event.Event.stop);
    }
  }, {
    key: "on",
    value: function on(object) {
      for (var type in object) {
        if (type !== 'scope' && object.hasOwnProperty(type)) {
          this.register(type, object.scope, object[type]);
        }
      }
    }
  }, {
    key: "register",
    value: function register(type, obj, func, priority) {
      if (type in Events && !this.extensions[type]) {
        this.extensions[type] = new Events[type](this);
      }

      if (func != null && _Util.Util.indexOf(this.eventTypes, type) !== -1) {
        if (obj == null) {
          obj = this.object;
        }

        var listeners = this.listeners[type];

        if (!listeners) {
          listeners = [];
          this.listeners[type] = listeners;
          this.extensionCount[type] = 0;
        }

        var listener = {
          obj: obj,
          func: func
        };

        if (priority) {
          listeners.splice(this.extensionCount[type], 0, listener);

          if ((0, _typeof2.default)(priority) === 'object' && priority.extension) {
            this.extensionCount[type]++;
          }
        } else {
          listeners.push(listener);
        }
      }
    }
  }, {
    key: "registerPriority",
    value: function registerPriority(type, obj, func) {
      this.register(type, obj, func, true);
    }
  }, {
    key: "un",
    value: function un(object) {
      for (var type in object) {
        if (type !== 'scope' && object.hasOwnProperty(type)) {
          this.unregister(type, object.scope, object[type]);
        }
      }
    }
  }, {
    key: "unregister",
    value: function unregister(type, obj, func) {
      if (obj == null) {
        obj = this.object;
      }

      var listeners = this.listeners[type];

      if (listeners != null) {
        for (var i = 0, len = listeners.length; i < len; i++) {
          if (listeners[i].obj === obj && listeners[i].func === func) {
            listeners.splice(i, 1);
            break;
          }
        }
      }
    }
    /**
     * @function Events.prototype.remove
     * @description 删除某个事件类型的所有监听，如果该事件类型没有注册，则不做任何操作。
     * @param {string} type - 事件类型。
     */

  }, {
    key: "remove",
    value: function remove(type) {
      if (this.listeners[type] != null) {
        this.listeners[type] = [];
      }
    }
    /**
     * @function Events.prototype.triggerEvent
     * @description 触发一个特定的注册事件。
     * @param {string} type - 触发事件类型。
     * @param {Event} evt - 事件对象。
     * @returns {boolean} 返回监听对象，如果返回是 false，则停止监听。
     */

  }, {
    key: "triggerEvent",
    value: function triggerEvent(type, evt) {
      var listeners = this.listeners[type]; // fast path

      if (!listeners || listeners.length === 0) {
        return undefined;
      } // prep evt object with object & div references


      if (evt == null) {
        evt = {};
      }

      evt.object = this.object;
      evt.element = this.element;

      if (!evt.type) {
        evt.type = type;
      } // execute all callbacks registered for specified type
      // get a clone of the listeners array to
      // allow for splicing during callbacks


      listeners = listeners.slice();
      var continueChain;

      for (var i = 0, len = listeners.length; i < len; i++) {
        var callback = listeners[i]; // bind the context to callback.obj

        continueChain = callback.func.apply(callback.obj, [evt]);

        if (continueChain !== undefined && continueChain === false) {
          // if callback returns false, execute no more callbacks.
          break;
        }
      } // don't fall through to other DOM elements


      if (!this.fallThrough) {
        _Event.Event.stop(evt, true);
      }

      return continueChain;
    }
    /**
     * @function Events.prototype.handleBrowserEvent
     * @description 对 triggerEvent 函数的包装，给事件对象设置了 xy 属性（即当前鼠标点的 xy 坐标）。
     * @param {Event} evt - 事件对象。
     */

  }, {
    key: "handleBrowserEvent",
    value: function handleBrowserEvent(evt) {
      var type = evt.type;
      var listeners = this.listeners[type];

      if (!listeners || listeners.length === 0) {
        // noone's listening, bail out
        return;
      } // add clientX & clientY to all events - corresponds to average x, y


      var touches = evt.touches;

      if (touches && touches[0]) {
        var x = 0;
        var y = 0;
        var num = touches.length;
        var touch;

        for (var i = 0; i < num; ++i) {
          touch = touches[i];
          x += touch.clientX;
          y += touch.clientY;
        }

        evt.clientX = x / num;
        evt.clientY = y / num;
      }

      if (this.includeXY) {
        evt.xy = this.getMousePosition(evt);
      }

      this.triggerEvent(type, evt);
    }
    /**
     * @function Events.prototype.clearMouseCache
     * @description 清除鼠标缓存。
     */

  }, {
    key: "clearMouseCache",
    value: function clearMouseCache() {
      this.element.scrolls = null;
      this.element.lefttop = null;
      var body = document.body;

      if (body && !((body.scrollTop !== 0 || body.scrollLeft !== 0) && navigator.userAgent.match(/iPhone/i))) {
        this.element.offsets = null;
      }
    }
    /**
     * @function Events.prototype.getMousePosition
     * @param {Event} evt - 事件对象。
     * @returns {Pixel} 当前的鼠标的 xy 坐标点。
     */

  }, {
    key: "getMousePosition",
    value: function getMousePosition(evt) {
      if (!this.includeXY) {
        this.clearMouseCache();
      } else if (!this.element.hasScrollEvent) {
        _Event.Event.observe(window, 'scroll', this.clearMouseListener);

        this.element.hasScrollEvent = true;
      }

      if (!this.element.scrolls) {
        var viewportElement = _Util.Util.getViewportElement();

        this.element.scrolls = [viewportElement.scrollLeft, viewportElement.scrollTop];
      }

      if (!this.element.lefttop) {
        this.element.lefttop = [document.documentElement.clientLeft || 0, document.documentElement.clientTop || 0];
      }

      if (!this.element.offsets) {
        this.element.offsets = _Util.Util.pagePosition(this.element);
      }

      return new _Pixel.Pixel(evt.clientX + this.element.scrolls[0] - this.element.offsets[0] - this.element.lefttop[0], evt.clientY + this.element.scrolls[1] - this.element.offsets[1] - this.element.lefttop[1]);
    }
  }]);
  return Events;
}();

exports.Events = Events;
Events.prototype.BROWSER_EVENTS = ['mouseover', 'mouseout', 'mousedown', 'mouseup', 'mousemove', 'click', 'dblclick', 'rightclick', 'dblrightclick', 'resize', 'focus', 'blur', 'touchstart', 'touchmove', 'touchend', 'keydown', 'MSPointerDown', 'MSPointerUp', 'pointerdown', 'pointerup', 'MSGestureStart', 'MSGestureChange', 'MSGestureEnd', 'contextmenu'];

/***/ }),

/***/ "qF08":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _theme = _interopRequireDefault(__webpack_require__("2Zn6"));

var _default = new _vue.default({
  theme: _theme.default[1]
});

exports.default = _default;

/***/ }),

/***/ "qSUR":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*!
 * vue-i18n v8.11.2 
 * (c) 2019 kazuya kawaguchi
 * Released under the MIT License.
 */
/*  */

/**
 * constants
 */

var numberFormatKeys = [
  'style',
  'currency',
  'currencyDisplay',
  'useGrouping',
  'minimumIntegerDigits',
  'minimumFractionDigits',
  'maximumFractionDigits',
  'minimumSignificantDigits',
  'maximumSignificantDigits',
  'localeMatcher',
  'formatMatcher'
];

/**
 * utilities
 */

function warn (msg, err) {
  if (typeof console !== 'undefined') {
    console.warn('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.warn(err.stack);
    }
  }
}

function error (msg, err) {
  if (typeof console !== 'undefined') {
    console.error('[vue-i18n] ' + msg);
    /* istanbul ignore if */
    if (err) {
      console.error(err.stack);
    }
  }
}

function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

function isNull (val) {
  return val === null || val === undefined
}

function parseArgs () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  var locale = null;
  var params = null;
  if (args.length === 1) {
    if (isObject(args[0]) || Array.isArray(args[0])) {
      params = args[0];
    } else if (typeof args[0] === 'string') {
      locale = args[0];
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      locale = args[0];
    }
    /* istanbul ignore if */
    if (isObject(args[1]) || Array.isArray(args[1])) {
      params = args[1];
    }
  }

  return { locale: locale, params: params }
}

function looseClone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

function merge (target) {
  var arguments$1 = arguments;

  var output = Object(target);
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments$1[i];
    if (source !== undefined && source !== null) {
      var key = (void 0);
      for (key in source) {
        if (hasOwn(source, key)) {
          if (isObject(source[key])) {
            output[key] = merge(output[key], source[key]);
          } else {
            output[key] = source[key];
          }
        }
      }
    }
  }
  return output
}

function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/*  */

function extend (Vue) {
  if (!Vue.prototype.hasOwnProperty('$i18n')) {
    // $FlowFixMe
    Object.defineProperty(Vue.prototype, '$i18n', {
      get: function get () { return this._i18n }
    });
  }

  Vue.prototype.$t = function (key) {
    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];

    var i18n = this.$i18n;
    return i18n._t.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this ].concat( values ))
  };

  Vue.prototype.$tc = function (key, choice) {
    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];

    var i18n = this.$i18n;
    return i18n._tc.apply(i18n, [ key, i18n.locale, i18n._getMessages(), this, choice ].concat( values ))
  };

  Vue.prototype.$te = function (key, locale) {
    var i18n = this.$i18n;
    return i18n._te(key, i18n.locale, i18n._getMessages(), locale)
  };

  Vue.prototype.$d = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).d.apply(ref, [ value ].concat( args ))
  };

  Vue.prototype.$n = function (value) {
    var ref;

    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];
    return (ref = this.$i18n).n.apply(ref, [ value ].concat( args ))
  };
}

/*  */

var mixin = {
  beforeCreate: function beforeCreate () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages = {};
            options.__i18n.forEach(function (resource) {
              localeMessages = merge(localeMessages, JSON.parse(resource));
            });
            Object.keys(localeMessages).forEach(function (locale) {
              options.i18n.mergeLocaleMessage(locale, localeMessages[locale]);
            });
          } catch (e) {
            if (false) {}
          }
        }
        this._i18n = options.i18n;
        this._i18nWatcher = this._i18n.watchI18nData();
      } else if (isPlainObject(options.i18n)) {
        // component local i18n
        if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
          options.i18n.root = this.$root;
          options.i18n.formatter = this.$root.$i18n.formatter;
          options.i18n.fallbackLocale = this.$root.$i18n.fallbackLocale;
          options.i18n.silentTranslationWarn = this.$root.$i18n.silentTranslationWarn;
          options.i18n.silentFallbackWarn = this.$root.$i18n.silentFallbackWarn;
          options.i18n.pluralizationRules = this.$root.$i18n.pluralizationRules;
          options.i18n.preserveDirectiveContent = this.$root.$i18n.preserveDirectiveContent;
        }

        // init locale messages via custom blocks
        if (options.__i18n) {
          try {
            var localeMessages$1 = {};
            options.__i18n.forEach(function (resource) {
              localeMessages$1 = merge(localeMessages$1, JSON.parse(resource));
            });
            options.i18n.messages = localeMessages$1;
          } catch (e) {
            if (false) {}
          }
        }

        this._i18n = new VueI18n(options.i18n);
        this._i18nWatcher = this._i18n.watchI18nData();

        if (options.i18n.sync === undefined || !!options.i18n.sync) {
          this._localeWatcher = this.$i18n.watchLocale();
        }
      } else {
        if (false) {}
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      // root i18n
      this._i18n = this.$root.$i18n;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      // parent i18n
      this._i18n = options.parent.$i18n;
    }
  },

  beforeMount: function beforeMount () {
    var options = this.$options;
    options.i18n = options.i18n || (options.__i18n ? {} : null);

    if (options.i18n) {
      if (options.i18n instanceof VueI18n) {
        // init locale messages via custom blocks
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else if (isPlainObject(options.i18n)) {
        this._i18n.subscribeDataChanging(this);
        this._subscribing = true;
      } else {
        if (false) {}
      }
    } else if (this.$root && this.$root.$i18n && this.$root.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    } else if (options.parent && options.parent.$i18n && options.parent.$i18n instanceof VueI18n) {
      this._i18n.subscribeDataChanging(this);
      this._subscribing = true;
    }
  },

  beforeDestroy: function beforeDestroy () {
    if (!this._i18n) { return }

    var self = this;
    this.$nextTick(function () {
      if (self._subscribing) {
        self._i18n.unsubscribeDataChanging(self);
        delete self._subscribing;
      }

      if (self._i18nWatcher) {
        self._i18nWatcher();
        self._i18n.destroyVM();
        delete self._i18nWatcher;
      }

      if (self._localeWatcher) {
        self._localeWatcher();
        delete self._localeWatcher;
      }

      self._i18n = null;
    });
  }
};

/*  */

var interpolationComponent = {
  name: 'i18n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    path: {
      type: String,
      required: true
    },
    locale: {
      type: String
    },
    places: {
      type: [Array, Object]
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var data = ref.data;
    var children = ref.children;
    var parent = ref.parent;

    var i18n = parent.$i18n;

    children = (children || []).filter(function (child) {
      return child.tag || (child.text = child.text.trim())
    });

    if (!i18n) {
      if (false) {}
      return children
    }

    var path = props.path;
    var locale = props.locale;

    var params = {};
    var places = props.places || {};

    var hasPlaces = Array.isArray(places)
      ? places.length > 0
      : Object.keys(places).length > 0;

    var everyPlace = children.every(function (child) {
      if (child.data && child.data.attrs) {
        var place = child.data.attrs.place;
        return (typeof place !== 'undefined') && place !== ''
      }
    });

    if (false) {}

    if (Array.isArray(places)) {
      places.forEach(function (el, i) {
        params[i] = el;
      });
    } else {
      Object.keys(places).forEach(function (key) {
        params[key] = places[key];
      });
    }

    children.forEach(function (child, i) {
      var key = everyPlace
        ? ("" + (child.data.attrs.place))
        : ("" + i);
      params[key] = child;
    });

    return h(props.tag, data, i18n.i(path, locale, params))
  }
};

/*  */

var numberComponent = {
  name: 'i18n-n',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    value: {
      type: Number,
      required: true
    },
    format: {
      type: [String, Object]
    },
    locale: {
      type: String
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var parent = ref.parent;
    var data = ref.data;

    var i18n = parent.$i18n;

    if (!i18n) {
      if (false) {}
      return null
    }

    var key = null;
    var options = null;

    if (typeof props.format === 'string') {
      key = props.format;
    } else if (isObject(props.format)) {
      if (props.format.key) {
        key = props.format.key;
      }

      // Filter out number format options only
      options = Object.keys(props.format).reduce(function (acc, prop) {
        var obj;

        if (numberFormatKeys.includes(prop)) {
          return Object.assign({}, acc, ( obj = {}, obj[prop] = props.format[prop], obj ))
        }
        return acc
      }, null);
    }

    var locale = props.locale || i18n.locale;
    var parts = i18n._ntp(props.value, locale, key, options);

    var values = parts.map(function (part, index) {
      var obj;

      var slot = data.scopedSlots && data.scopedSlots[part.type];
      return slot ? slot(( obj = {}, obj[part.type] = part.value, obj.index = index, obj.parts = parts, obj )) : part.value
    });

    return h(props.tag, {
      attrs: data.attrs,
      'class': data['class'],
      staticClass: data.staticClass
    }, values)
  }
};

/*  */

function bind (el, binding, vnode) {
  if (!assert(el, vnode)) { return }

  t(el, binding, vnode);
}

function update (el, binding, vnode, oldVNode) {
  if (!assert(el, vnode)) { return }

  var i18n = vnode.context.$i18n;
  if (localeEqual(el, vnode) &&
    (looseEqual(binding.value, binding.oldValue) &&
     looseEqual(el._localeMessage, i18n.getLocaleMessage(i18n.locale)))) { return }

  t(el, binding, vnode);
}

function unbind (el, binding, vnode, oldVNode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return
  }

  var i18n = vnode.context.$i18n || {};
  if (!binding.modifiers.preserve && !i18n.preserveDirectiveContent) {
    el.textContent = '';
  }
  el._vt = undefined;
  delete el['_vt'];
  el._locale = undefined;
  delete el['_locale'];
  el._localeMessage = undefined;
  delete el['_localeMessage'];
}

function assert (el, vnode) {
  var vm = vnode.context;
  if (!vm) {
    warn('Vue instance does not exists in VNode context');
    return false
  }

  if (!vm.$i18n) {
    warn('VueI18n instance does not exists in Vue instance');
    return false
  }

  return true
}

function localeEqual (el, vnode) {
  var vm = vnode.context;
  return el._locale === vm.$i18n.locale
}

function t (el, binding, vnode) {
  var ref$1, ref$2;

  var value = binding.value;

  var ref = parseValue(value);
  var path = ref.path;
  var locale = ref.locale;
  var args = ref.args;
  var choice = ref.choice;
  if (!path && !locale && !args) {
    warn('value type not supported');
    return
  }

  if (!path) {
    warn('`path` is required in v-t directive');
    return
  }

  var vm = vnode.context;
  if (choice) {
    el._vt = el.textContent = (ref$1 = vm.$i18n).tc.apply(ref$1, [ path, choice ].concat( makeParams(locale, args) ));
  } else {
    el._vt = el.textContent = (ref$2 = vm.$i18n).t.apply(ref$2, [ path ].concat( makeParams(locale, args) ));
  }
  el._locale = vm.$i18n.locale;
  el._localeMessage = vm.$i18n.getLocaleMessage(vm.$i18n.locale);
}

function parseValue (value) {
  var path;
  var locale;
  var args;
  var choice;

  if (typeof value === 'string') {
    path = value;
  } else if (isPlainObject(value)) {
    path = value.path;
    locale = value.locale;
    args = value.args;
    choice = value.choice;
  }

  return { path: path, locale: locale, args: args, choice: choice }
}

function makeParams (locale, args) {
  var params = [];

  locale && params.push(locale);
  if (args && (Array.isArray(args) || isPlainObject(args))) {
    params.push(args);
  }

  return params
}

var Vue;

function install (_Vue) {
  /* istanbul ignore if */
  if (false) {}
  install.installed = true;

  Vue = _Vue;

  var version = (Vue.version && Number(Vue.version.split('.')[0])) || -1;
  /* istanbul ignore if */
  if (false) {}

  extend(Vue);
  Vue.mixin(mixin);
  Vue.directive('t', { bind: bind, update: update, unbind: unbind });
  Vue.component(interpolationComponent.name, interpolationComponent);
  Vue.component(numberComponent.name, numberComponent);

  // use simple mergeStrategies to prevent i18n instance lose '__proto__'
  var strats = Vue.config.optionMergeStrategies;
  strats.i18n = function (parentVal, childVal) {
    return childVal === undefined
      ? parentVal
      : childVal
  };
}

/*  */

var BaseFormatter = function BaseFormatter () {
  this._caches = Object.create(null);
};

BaseFormatter.prototype.interpolate = function interpolate (message, values) {
  if (!values) {
    return [message]
  }
  var tokens = this._caches[message];
  if (!tokens) {
    tokens = parse(message);
    this._caches[message] = tokens;
  }
  return compile(tokens, values)
};



var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;

function parse (format) {
  var tokens = [];
  var position = 0;

  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === '{') {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }

      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== '}') {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === '}';

      var type = RE_TOKEN_LIST_VALUE.test(sub)
        ? 'list'
        : isClosed && RE_TOKEN_NAMED_VALUE.test(sub)
          ? 'named'
          : 'unknown';
      tokens.push({ value: sub, type: type });
    } else if (char === '%') {
      // when found rails i18n syntax, skip text capture
      if (format[(position)] !== '{') {
        text += char;
      }
    } else {
      text += char;
    }
  }

  text && tokens.push({ type: 'text', value: text });

  return tokens
}

function compile (tokens, values) {
  var compiled = [];
  var index = 0;

  var mode = Array.isArray(values)
    ? 'list'
    : isObject(values)
      ? 'named'
      : 'unknown';
  if (mode === 'unknown') { return compiled }

  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break
      case 'named':
        if (mode === 'named') {
          compiled.push((values)[token.value]);
        } else {
          if (false) {}
        }
        break
      case 'unknown':
        if (false) {}
        break
    }
    index++;
  }

  return compiled
}

/*  */

/**
 *  Path parser
 *  - Inspired:
 *    Vue.js Path parser
 */

// actions
var APPEND = 0;
var PUSH = 1;
var INC_SUB_PATH_DEPTH = 2;
var PUSH_SUB_PATH = 3;

// states
var BEFORE_PATH = 0;
var IN_PATH = 1;
var BEFORE_IDENT = 2;
var IN_IDENT = 3;
var IN_SUB_PATH = 4;
var IN_SINGLE_QUOTE = 5;
var IN_DOUBLE_QUOTE = 6;
var AFTER_PATH = 7;
var ERROR = 8;

var pathStateMachine = [];

pathStateMachine[BEFORE_PATH] = {
  'ws': [BEFORE_PATH],
  'ident': [IN_IDENT, APPEND],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[IN_PATH] = {
  'ws': [IN_PATH],
  '.': [BEFORE_IDENT],
  '[': [IN_SUB_PATH],
  'eof': [AFTER_PATH]
};

pathStateMachine[BEFORE_IDENT] = {
  'ws': [BEFORE_IDENT],
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND]
};

pathStateMachine[IN_IDENT] = {
  'ident': [IN_IDENT, APPEND],
  '0': [IN_IDENT, APPEND],
  'number': [IN_IDENT, APPEND],
  'ws': [IN_PATH, PUSH],
  '.': [BEFORE_IDENT, PUSH],
  '[': [IN_SUB_PATH, PUSH],
  'eof': [AFTER_PATH, PUSH]
};

pathStateMachine[IN_SUB_PATH] = {
  "'": [IN_SINGLE_QUOTE, APPEND],
  '"': [IN_DOUBLE_QUOTE, APPEND],
  '[': [IN_SUB_PATH, INC_SUB_PATH_DEPTH],
  ']': [IN_PATH, PUSH_SUB_PATH],
  'eof': ERROR,
  'else': [IN_SUB_PATH, APPEND]
};

pathStateMachine[IN_SINGLE_QUOTE] = {
  "'": [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_SINGLE_QUOTE, APPEND]
};

pathStateMachine[IN_DOUBLE_QUOTE] = {
  '"': [IN_SUB_PATH, APPEND],
  'eof': ERROR,
  'else': [IN_DOUBLE_QUOTE, APPEND]
};

/**
 * Check if an expression is a literal value.
 */

var literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
function isLiteral (exp) {
  return literalValueRE.test(exp)
}

/**
 * Strip quotes from a string
 */

function stripQuotes (str) {
  var a = str.charCodeAt(0);
  var b = str.charCodeAt(str.length - 1);
  return a === b && (a === 0x22 || a === 0x27)
    ? str.slice(1, -1)
    : str
}

/**
 * Determine the type of a character in a keypath.
 */

function getPathCharType (ch) {
  if (ch === undefined || ch === null) { return 'eof' }

  var code = ch.charCodeAt(0);

  switch (code) {
    case 0x5B: // [
    case 0x5D: // ]
    case 0x2E: // .
    case 0x22: // "
    case 0x27: // '
      return ch

    case 0x5F: // _
    case 0x24: // $
    case 0x2D: // -
      return 'ident'

    case 0x09: // Tab
    case 0x0A: // Newline
    case 0x0D: // Return
    case 0xA0:  // No-break space
    case 0xFEFF:  // Byte Order Mark
    case 0x2028:  // Line Separator
    case 0x2029:  // Paragraph Separator
      return 'ws'
  }

  return 'ident'
}

/**
 * Format a subPath, return its plain form if it is
 * a literal string or number. Otherwise prepend the
 * dynamic indicator (*).
 */

function formatSubPath (path) {
  var trimmed = path.trim();
  // invalid leading 0
  if (path.charAt(0) === '0' && isNaN(path)) { return false }

  return isLiteral(trimmed) ? stripQuotes(trimmed) : '*' + trimmed
}

/**
 * Parse a string path into an array of segments
 */

function parse$1 (path) {
  var keys = [];
  var index = -1;
  var mode = BEFORE_PATH;
  var subPathDepth = 0;
  var c;
  var key;
  var newChar;
  var type;
  var transition;
  var action;
  var typeMap;
  var actions = [];

  actions[PUSH] = function () {
    if (key !== undefined) {
      keys.push(key);
      key = undefined;
    }
  };

  actions[APPEND] = function () {
    if (key === undefined) {
      key = newChar;
    } else {
      key += newChar;
    }
  };

  actions[INC_SUB_PATH_DEPTH] = function () {
    actions[APPEND]();
    subPathDepth++;
  };

  actions[PUSH_SUB_PATH] = function () {
    if (subPathDepth > 0) {
      subPathDepth--;
      mode = IN_SUB_PATH;
      actions[APPEND]();
    } else {
      subPathDepth = 0;
      key = formatSubPath(key);
      if (key === false) {
        return false
      } else {
        actions[PUSH]();
      }
    }
  };

  function maybeUnescapeQuote () {
    var nextChar = path[index + 1];
    if ((mode === IN_SINGLE_QUOTE && nextChar === "'") ||
      (mode === IN_DOUBLE_QUOTE && nextChar === '"')) {
      index++;
      newChar = '\\' + nextChar;
      actions[APPEND]();
      return true
    }
  }

  while (mode !== null) {
    index++;
    c = path[index];

    if (c === '\\' && maybeUnescapeQuote()) {
      continue
    }

    type = getPathCharType(c);
    typeMap = pathStateMachine[mode];
    transition = typeMap[type] || typeMap['else'] || ERROR;

    if (transition === ERROR) {
      return // parse error
    }

    mode = transition[0];
    action = actions[transition[1]];
    if (action) {
      newChar = transition[2];
      newChar = newChar === undefined
        ? c
        : newChar;
      if (action() === false) {
        return
      }
    }

    if (mode === AFTER_PATH) {
      return keys
    }
  }
}





var I18nPath = function I18nPath () {
  this._cache = Object.create(null);
};

/**
 * External parse that check for a cache hit first
 */
I18nPath.prototype.parsePath = function parsePath (path) {
  var hit = this._cache[path];
  if (!hit) {
    hit = parse$1(path);
    if (hit) {
      this._cache[path] = hit;
    }
  }
  return hit || []
};

/**
 * Get path value from path string
 */
I18nPath.prototype.getPathValue = function getPathValue (obj, path) {
  if (!isObject(obj)) { return null }

  var paths = this.parsePath(path);
  if (paths.length === 0) {
    return null
  } else {
    var length = paths.length;
    var last = obj;
    var i = 0;
    while (i < length) {
      var value = last[paths[i]];
      if (value === undefined) {
        return null
      }
      last = value;
      i++;
    }

    return last
  }
};

/*  */



var htmlTagMatcher = /<\/?[\w\s="/.':;#-\/]+>/;
var linkKeyMatcher = /(?:@(?:\.[a-z]+)?:(?:[\w\-_|.]+|\([\w\-_|.]+\)))/g;
var linkKeyPrefixMatcher = /^@(?:\.([a-z]+))?:/;
var bracketsMatcher = /[()]/g;
var formatters = {
  'upper': function (str) { return str.toLocaleUpperCase(); },
  'lower': function (str) { return str.toLocaleLowerCase(); }
};

var defaultFormatter = new BaseFormatter();

var VueI18n = function VueI18n (options) {
  var this$1 = this;
  if ( options === void 0 ) options = {};

  // Auto install if it is not done yet and `window` has `Vue`.
  // To allow users to avoid auto-installation in some cases,
  // this code should be placed here. See #290
  /* istanbul ignore if */
  if (!Vue && typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
  }

  var locale = options.locale || 'en-US';
  var fallbackLocale = options.fallbackLocale || 'en-US';
  var messages = options.messages || {};
  var dateTimeFormats = options.dateTimeFormats || {};
  var numberFormats = options.numberFormats || {};

  this._vm = null;
  this._formatter = options.formatter || defaultFormatter;
  this._missing = options.missing || null;
  this._root = options.root || null;
  this._sync = options.sync === undefined ? true : !!options.sync;
  this._fallbackRoot = options.fallbackRoot === undefined
    ? true
    : !!options.fallbackRoot;
  this._silentTranslationWarn = options.silentTranslationWarn === undefined
    ? false
    : !!options.silentTranslationWarn;
  this._silentFallbackWarn = options.silentFallbackWarn === undefined
    ? false
    : !!options.silentFallbackWarn;
  this._dateTimeFormatters = {};
  this._numberFormatters = {};
  this._path = new I18nPath();
  this._dataListeners = [];
  this._preserveDirectiveContent = options.preserveDirectiveContent === undefined
    ? false
    : !!options.preserveDirectiveContent;
  this.pluralizationRules = options.pluralizationRules || {};
  this._warnHtmlInMessage = options.warnHtmlInMessage || 'off';

  this._exist = function (message, key) {
    if (!message || !key) { return false }
    if (!isNull(this$1._path.getPathValue(message, key))) { return true }
    // fallback for flat key
    if (message[key]) { return true }
    return false
  };

  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }

  this._initVM({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    dateTimeFormats: dateTimeFormats,
    numberFormats: numberFormats
  });
};

var prototypeAccessors = { vm: { configurable: true },messages: { configurable: true },dateTimeFormats: { configurable: true },numberFormats: { configurable: true },availableLocales: { configurable: true },locale: { configurable: true },fallbackLocale: { configurable: true },missing: { configurable: true },formatter: { configurable: true },silentTranslationWarn: { configurable: true },silentFallbackWarn: { configurable: true },preserveDirectiveContent: { configurable: true },warnHtmlInMessage: { configurable: true } };

VueI18n.prototype._checkLocaleMessage = function _checkLocaleMessage (locale, level, message) {
  var paths = [];

  var fn = function (level, locale, message, paths) {
    if (isPlainObject(message)) {
      Object.keys(message).forEach(function (key) {
        var val = message[key];
        if (isPlainObject(val)) {
          paths.push(key);
          paths.push('.');
          fn(level, locale, val, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(key);
          fn(level, locale, val, paths);
          paths.pop();
        }
      });
    } else if (Array.isArray(message)) {
      message.forEach(function (item, index) {
        if (isPlainObject(item)) {
          paths.push(("[" + index + "]"));
          paths.push('.');
          fn(level, locale, item, paths);
          paths.pop();
          paths.pop();
        } else {
          paths.push(("[" + index + "]"));
          fn(level, locale, item, paths);
          paths.pop();
        }
      });
    } else if (typeof message === 'string') {
      var ret = htmlTagMatcher.test(message);
      if (ret) {
        var msg = "Detected HTML in message '" + message + "' of keypath '" + (paths.join('')) + "' at '" + locale + "'. Consider component interpolation with '<i18n>' to avoid XSS. See https://bit.ly/2ZqJzkp";
        if (level === 'warn') {
          warn(msg);
        } else if (level === 'error') {
          error(msg);
        }
      }
    }
  };

  fn(level, locale, message, paths);
};

VueI18n.prototype._initVM = function _initVM (data) {
  var silent = Vue.config.silent;
  Vue.config.silent = true;
  this._vm = new Vue({ data: data });
  Vue.config.silent = silent;
};

VueI18n.prototype.destroyVM = function destroyVM () {
  this._vm.$destroy();
};

VueI18n.prototype.subscribeDataChanging = function subscribeDataChanging (vm) {
  this._dataListeners.push(vm);
};

VueI18n.prototype.unsubscribeDataChanging = function unsubscribeDataChanging (vm) {
  remove(this._dataListeners, vm);
};

VueI18n.prototype.watchI18nData = function watchI18nData () {
  var self = this;
  return this._vm.$watch('$data', function () {
    var i = self._dataListeners.length;
    while (i--) {
      Vue.nextTick(function () {
        self._dataListeners[i] && self._dataListeners[i].$forceUpdate();
      });
    }
  }, { deep: true })
};

VueI18n.prototype.watchLocale = function watchLocale () {
  /* istanbul ignore if */
  if (!this._sync || !this._root) { return null }
  var target = this._vm;
  return this._root.$i18n.vm.$watch('locale', function (val) {
    target.$set(target, 'locale', val);
    target.$forceUpdate();
  }, { immediate: true })
};

prototypeAccessors.vm.get = function () { return this._vm };

prototypeAccessors.messages.get = function () { return looseClone(this._getMessages()) };
prototypeAccessors.dateTimeFormats.get = function () { return looseClone(this._getDateTimeFormats()) };
prototypeAccessors.numberFormats.get = function () { return looseClone(this._getNumberFormats()) };
prototypeAccessors.availableLocales.get = function () { return Object.keys(this.messages).sort() };

prototypeAccessors.locale.get = function () { return this._vm.locale };
prototypeAccessors.locale.set = function (locale) {
  this._vm.$set(this._vm, 'locale', locale);
};

prototypeAccessors.fallbackLocale.get = function () { return this._vm.fallbackLocale };
prototypeAccessors.fallbackLocale.set = function (locale) {
  this._vm.$set(this._vm, 'fallbackLocale', locale);
};

prototypeAccessors.missing.get = function () { return this._missing };
prototypeAccessors.missing.set = function (handler) { this._missing = handler; };

prototypeAccessors.formatter.get = function () { return this._formatter };
prototypeAccessors.formatter.set = function (formatter) { this._formatter = formatter; };

prototypeAccessors.silentTranslationWarn.get = function () { return this._silentTranslationWarn };
prototypeAccessors.silentTranslationWarn.set = function (silent) { this._silentTranslationWarn = silent; };

prototypeAccessors.silentFallbackWarn.get = function () { return this._silentFallbackWarn };
prototypeAccessors.silentFallbackWarn.set = function (silent) { this._silentFallbackWarn = silent; };

prototypeAccessors.preserveDirectiveContent.get = function () { return this._preserveDirectiveContent };
prototypeAccessors.preserveDirectiveContent.set = function (preserve) { this._preserveDirectiveContent = preserve; };

prototypeAccessors.warnHtmlInMessage.get = function () { return this._warnHtmlInMessage };
prototypeAccessors.warnHtmlInMessage.set = function (level) {
    var this$1 = this;

  var orgLevel = this._warnHtmlInMessage;
  this._warnHtmlInMessage = level;
  if (orgLevel !== level && (level === 'warn' || level === 'error')) {
    var messages = this._getMessages();
    Object.keys(messages).forEach(function (locale) {
      this$1._checkLocaleMessage(locale, this$1._warnHtmlInMessage, messages[locale]);
    });
  }
};

VueI18n.prototype._getMessages = function _getMessages () { return this._vm.messages };
VueI18n.prototype._getDateTimeFormats = function _getDateTimeFormats () { return this._vm.dateTimeFormats };
VueI18n.prototype._getNumberFormats = function _getNumberFormats () { return this._vm.numberFormats };

VueI18n.prototype._warnDefault = function _warnDefault (locale, key, result, vm, values) {
  if (!isNull(result)) { return result }
  if (this._missing) {
    var missingRet = this._missing.apply(null, [locale, key, vm, values]);
    if (typeof missingRet === 'string') {
      return missingRet
    }
  } else {
    if (false) {}
  }
  return key
};

VueI18n.prototype._isFallbackRoot = function _isFallbackRoot (val) {
  return !val && !isNull(this._root) && this._fallbackRoot
};

VueI18n.prototype._isSilentFallback = function _isSilentFallback (locale) {
  return this._silentFallbackWarn && (this._isFallbackRoot() || locale !== this.fallbackLocale)
};

VueI18n.prototype._interpolate = function _interpolate (
  locale,
  message,
  key,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  if (!message) { return null }

  var pathRet = this._path.getPathValue(message, key);
  if (Array.isArray(pathRet) || isPlainObject(pathRet)) { return pathRet }

  var ret;
  if (isNull(pathRet)) {
    /* istanbul ignore else */
    if (isPlainObject(message)) {
      ret = message[key];
      if (typeof ret !== 'string') {
        if (false) {}
        return null
      }
    } else {
      return null
    }
  } else {
    /* istanbul ignore else */
    if (typeof pathRet === 'string') {
      ret = pathRet;
    } else {
      if (false) {}
      return null
    }
  }

  // Check for the existence of links within the translated string
  if (ret.indexOf('@:') >= 0 || ret.indexOf('@.') >= 0) {
    ret = this._link(locale, message, ret, host, 'raw', values, visitedLinkStack);
  }

  return this._render(ret, interpolateMode, values, key)
};

VueI18n.prototype._link = function _link (
  locale,
  message,
  str,
  host,
  interpolateMode,
  values,
  visitedLinkStack
) {
  var ret = str;

  // Match all the links within the local
  // We are going to replace each of
  // them with its translation
  var matches = ret.match(linkKeyMatcher);
  for (var idx in matches) {
    // ie compatible: filter custom array
    // prototype method
    if (!matches.hasOwnProperty(idx)) {
      continue
    }
    var link = matches[idx];
    var linkKeyPrefixMatches = link.match(linkKeyPrefixMatcher);
    var linkPrefix = linkKeyPrefixMatches[0];
      var formatterName = linkKeyPrefixMatches[1];

    // Remove the leading @:, @.case: and the brackets
    var linkPlaceholder = link.replace(linkPrefix, '').replace(bracketsMatcher, '');

    if (visitedLinkStack.includes(linkPlaceholder)) {
      if (false) {}
      return ret
    }
    visitedLinkStack.push(linkPlaceholder);

    // Translate the link
    var translated = this._interpolate(
      locale, message, linkPlaceholder, host,
      interpolateMode === 'raw' ? 'string' : interpolateMode,
      interpolateMode === 'raw' ? undefined : values,
      visitedLinkStack
    );

    if (this._isFallbackRoot(translated)) {
      if (false) {}
      /* istanbul ignore if */
      if (!this._root) { throw Error('unexpected error') }
      var root = this._root.$i18n;
      translated = root._translate(
        root._getMessages(), root.locale, root.fallbackLocale,
        linkPlaceholder, host, interpolateMode, values
      );
    }
    translated = this._warnDefault(
      locale, linkPlaceholder, translated, host,
      Array.isArray(values) ? values : [values]
    );
    if (formatters.hasOwnProperty(formatterName)) {
      translated = formatters[formatterName](translated);
    }

    visitedLinkStack.pop();

    // Replace the link with the translated
    ret = !translated ? ret : ret.replace(link, translated);
  }

  return ret
};

VueI18n.prototype._render = function _render (message, interpolateMode, values, path) {
  var ret = this._formatter.interpolate(message, values, path);

  // If the custom formatter refuses to work - apply the default one
  if (!ret) {
    ret = defaultFormatter.interpolate(message, values, path);
  }

  // if interpolateMode is **not** 'string' ('row'),
  // return the compiled data (e.g. ['foo', VNode, 'bar']) with formatter
  return interpolateMode === 'string' ? ret.join('') : ret
};

VueI18n.prototype._translate = function _translate (
  messages,
  locale,
  fallback,
  key,
  host,
  interpolateMode,
  args
) {
  var res =
    this._interpolate(locale, messages[locale], key, host, interpolateMode, args, [key]);
  if (!isNull(res)) { return res }

  res = this._interpolate(fallback, messages[fallback], key, host, interpolateMode, args, [key]);
  if (!isNull(res)) {
    if (false) {}
    return res
  } else {
    return null
  }
};

VueI18n.prototype._t = function _t (key, _locale, messages, host) {
    var ref;

    var values = [], len = arguments.length - 4;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 4 ];
  if (!key) { return '' }

  var parsedArgs = parseArgs.apply(void 0, values);
  var locale = parsedArgs.locale || _locale;

  var ret = this._translate(
    messages, locale, this.fallbackLocale, key,
    host, 'string', parsedArgs.params
  );
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return (ref = this._root).$t.apply(ref, [ key ].concat( values ))
  } else {
    return this._warnDefault(locale, key, ret, host, values)
  }
};

VueI18n.prototype.t = function t (key) {
    var ref;

    var values = [], len = arguments.length - 1;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 1 ];
  return (ref = this)._t.apply(ref, [ key, this.locale, this._getMessages(), null ].concat( values ))
};

VueI18n.prototype._i = function _i (key, locale, messages, host, values) {
  var ret =
    this._translate(messages, locale, this.fallbackLocale, key, host, 'raw', values);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.i(key, locale, values)
  } else {
    return this._warnDefault(locale, key, ret, host, [values])
  }
};

VueI18n.prototype.i = function i (key, locale, values) {
  /* istanbul ignore if */
  if (!key) { return '' }

  if (typeof locale !== 'string') {
    locale = this.locale;
  }

  return this._i(key, locale, this._getMessages(), null, values)
};

VueI18n.prototype._tc = function _tc (
  key,
  _locale,
  messages,
  host,
  choice
) {
    var ref;

    var values = [], len = arguments.length - 5;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 5 ];
  if (!key) { return '' }
  if (choice === undefined) {
    choice = 1;
  }

  var predefined = { 'count': choice, 'n': choice };
  var parsedArgs = parseArgs.apply(void 0, values);
  parsedArgs.params = Object.assign(predefined, parsedArgs.params);
  values = parsedArgs.locale === null ? [parsedArgs.params] : [parsedArgs.locale, parsedArgs.params];
  return this.fetchChoice((ref = this)._t.apply(ref, [ key, _locale, messages, host ].concat( values )), choice)
};

VueI18n.prototype.fetchChoice = function fetchChoice (message, choice) {
  /* istanbul ignore if */
  if (!message && typeof message !== 'string') { return null }
  var choices = message.split('|');

  choice = this.getChoiceIndex(choice, choices.length);
  if (!choices[choice]) { return message }
  return choices[choice].trim()
};

/**
 * @param choice {number} a choice index given by the input to $tc: `$tc('path.to.rule', choiceIndex)`
 * @param choicesLength {number} an overall amount of available choices
 * @returns a final choice index
*/
VueI18n.prototype.getChoiceIndex = function getChoiceIndex (choice, choicesLength) {
  // Default (old) getChoiceIndex implementation - english-compatible
  var defaultImpl = function (_choice, _choicesLength) {
    _choice = Math.abs(_choice);

    if (_choicesLength === 2) {
      return _choice
        ? _choice > 1
          ? 1
          : 0
        : 1
    }

    return _choice ? Math.min(_choice, 2) : 0
  };

  if (this.locale in this.pluralizationRules) {
    return this.pluralizationRules[this.locale].apply(this, [choice, choicesLength])
  } else {
    return defaultImpl(choice, choicesLength)
  }
};

VueI18n.prototype.tc = function tc (key, choice) {
    var ref;

    var values = [], len = arguments.length - 2;
    while ( len-- > 0 ) values[ len ] = arguments[ len + 2 ];
  return (ref = this)._tc.apply(ref, [ key, this.locale, this._getMessages(), null, choice ].concat( values ))
};

VueI18n.prototype._te = function _te (key, locale, messages) {
    var args = [], len = arguments.length - 3;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 3 ];

  var _locale = parseArgs.apply(void 0, args).locale || locale;
  return this._exist(messages[_locale], key)
};

VueI18n.prototype.te = function te (key, locale) {
  return this._te(key, this.locale, this._getMessages(), locale)
};

VueI18n.prototype.getLocaleMessage = function getLocaleMessage (locale) {
  return looseClone(this._vm.messages[locale] || {})
};

VueI18n.prototype.setLocaleMessage = function setLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
    if (this._warnHtmlInMessage === 'error') { return }
  }
  this._vm.$set(this._vm.messages, locale, message);
};

VueI18n.prototype.mergeLocaleMessage = function mergeLocaleMessage (locale, message) {
  if (this._warnHtmlInMessage === 'warn' || this._warnHtmlInMessage === 'error') {
    this._checkLocaleMessage(locale, this._warnHtmlInMessage, message);
    if (this._warnHtmlInMessage === 'error') { return }
  }
  this._vm.$set(this._vm.messages, locale, merge(this._vm.messages[locale] || {}, message));
};

VueI18n.prototype.getDateTimeFormat = function getDateTimeFormat (locale) {
  return looseClone(this._vm.dateTimeFormats[locale] || {})
};

VueI18n.prototype.setDateTimeFormat = function setDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, format);
};

VueI18n.prototype.mergeDateTimeFormat = function mergeDateTimeFormat (locale, format) {
  this._vm.$set(this._vm.dateTimeFormats, locale, merge(this._vm.dateTimeFormats[locale] || {}, format));
};

VueI18n.prototype._localizeDateTime = function _localizeDateTime (
  value,
  locale,
  fallback,
  dateTimeFormats,
  key
) {
  var _locale = locale;
  var formats = dateTimeFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    if (false) {}
    _locale = fallback;
    formats = dateTimeFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];
    var id = _locale + "__" + key;
    var formatter = this._dateTimeFormatters[id];
    if (!formatter) {
      formatter = this._dateTimeFormatters[id] = new Intl.DateTimeFormat(_locale, format);
    }
    return formatter.format(value)
  }
};

VueI18n.prototype._d = function _d (value, locale, key) {
  /* istanbul ignore if */
  if (false) {}

  if (!key) {
    return new Intl.DateTimeFormat(locale).format(value)
  }

  var ret =
    this._localizeDateTime(value, locale, this.fallbackLocale, this._getDateTimeFormats(), key);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.d(value, key, locale)
  } else {
    return ret || ''
  }
};

VueI18n.prototype.d = function d (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._d(value, locale, key)
};

VueI18n.prototype.getNumberFormat = function getNumberFormat (locale) {
  return looseClone(this._vm.numberFormats[locale] || {})
};

VueI18n.prototype.setNumberFormat = function setNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, format);
};

VueI18n.prototype.mergeNumberFormat = function mergeNumberFormat (locale, format) {
  this._vm.$set(this._vm.numberFormats, locale, merge(this._vm.numberFormats[locale] || {}, format));
};

VueI18n.prototype._getNumberFormatter = function _getNumberFormatter (
  value,
  locale,
  fallback,
  numberFormats,
  key,
  options
) {
  var _locale = locale;
  var formats = numberFormats[_locale];

  // fallback locale
  if (isNull(formats) || isNull(formats[key])) {
    if (false) {}
    _locale = fallback;
    formats = numberFormats[_locale];
  }

  if (isNull(formats) || isNull(formats[key])) {
    return null
  } else {
    var format = formats[key];

    var formatter;
    if (options) {
      // If options specified - create one time number formatter
      formatter = new Intl.NumberFormat(_locale, Object.assign({}, format, options));
    } else {
      var id = _locale + "__" + key;
      formatter = this._numberFormatters[id];
      if (!formatter) {
        formatter = this._numberFormatters[id] = new Intl.NumberFormat(_locale, format);
      }
    }
    return formatter
  }
};

VueI18n.prototype._n = function _n (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (false) {}
    return ''
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.format(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.format(value);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n.n(value, Object.assign({}, { key: key, locale: locale }, options))
  } else {
    return ret || ''
  }
};

VueI18n.prototype.n = function n (value) {
    var args = [], len = arguments.length - 1;
    while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

  var locale = this.locale;
  var key = null;
  var options = null;

  if (args.length === 1) {
    if (typeof args[0] === 'string') {
      key = args[0];
    } else if (isObject(args[0])) {
      if (args[0].locale) {
        locale = args[0].locale;
      }
      if (args[0].key) {
        key = args[0].key;
      }

      // Filter out number format options only
      options = Object.keys(args[0]).reduce(function (acc, key) {
          var obj;

        if (numberFormatKeys.includes(key)) {
          return Object.assign({}, acc, ( obj = {}, obj[key] = args[0][key], obj ))
        }
        return acc
      }, null);
    }
  } else if (args.length === 2) {
    if (typeof args[0] === 'string') {
      key = args[0];
    }
    if (typeof args[1] === 'string') {
      locale = args[1];
    }
  }

  return this._n(value, locale, key, options)
};

VueI18n.prototype._ntp = function _ntp (value, locale, key, options) {
  /* istanbul ignore if */
  if (!VueI18n.availabilities.numberFormat) {
    if (false) {}
    return []
  }

  if (!key) {
    var nf = !options ? new Intl.NumberFormat(locale) : new Intl.NumberFormat(locale, options);
    return nf.formatToParts(value)
  }

  var formatter = this._getNumberFormatter(value, locale, this.fallbackLocale, this._getNumberFormats(), key, options);
  var ret = formatter && formatter.formatToParts(value);
  if (this._isFallbackRoot(ret)) {
    if (false) {}
    /* istanbul ignore if */
    if (!this._root) { throw Error('unexpected error') }
    return this._root.$i18n._ntp(value, locale, key, options)
  } else {
    return ret || []
  }
};

Object.defineProperties( VueI18n.prototype, prototypeAccessors );

var availabilities;
// $FlowFixMe
Object.defineProperty(VueI18n, 'availabilities', {
  get: function get () {
    if (!availabilities) {
      var intlDefined = typeof Intl !== 'undefined';
      availabilities = {
        dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
        numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
      };
    }

    return availabilities
  }
});

VueI18n.install = install;
VueI18n.version = '8.11.2';

/* harmony default export */ __webpack_exports__["default"] = (VueI18n);


/***/ }),

/***/ "riVy":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "rn/G":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

var _interopRequireDefault = __webpack_require__("TqRt");

var _slicedToArray2 = _interopRequireDefault(__webpack_require__("J4zp"));

/*jshint esversion: 6 */
function colorcolor(color) {
  var newColor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "rgba";
  var calculateOpacity = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  color = color.toLowerCase();
  newColor = newColor.toLowerCase();
  var returnedColor = color;

  var namedColor = __webpack_require__("T016");

  var r, g, b, a;
  var roundTo = 4;
  var colorDefinitions = {
    rgb: {
      re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
      example: ["rgb(123, 234, 45)", "rgb(255,234,245)"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1], 10), parseInt(bits[2], 10), parseInt(bits[3], 10), 1];
      }
    },
    rgba: {
      re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/,
      example: ["rgba(123, 234, 45, 1)", "rgba(255,234,245, 0.5)"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1], 10), parseInt(bits[2], 10), parseInt(bits[3], 10), parseFloat(bits[4])];
      }
    },
    hex: {
      re: /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      example: ["00ff00", "336699"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16), 1];
      }
    },
    hex3: {
      re: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      example: ["fb0", "f0f"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16), 1];
      }
    },
    hexa: {
      re: /^#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
      example: ["00ff00ff", "336699a0"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1], 16), parseInt(bits[2], 16), parseInt(bits[3], 16), parseInt(bits[4], 16) / 255];
      }
    },
    hex4a: {
      re: /^#([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
      example: ["fb0f", "f0f8"],
      toRGBA: function toRGBA(bits) {
        return [parseInt(bits[1] + bits[1], 16), parseInt(bits[2] + bits[2], 16), parseInt(bits[3] + bits[3], 16), parseInt(bits[4] + bits[4], 16) / 255];
      }
    },
    hsl: {
      re: /^hsl\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
      example: ["hsl(120, 100%, 25%)", "hsl(0, 100%, 50%)"],
      toRGBA: function toRGBA(bits) {
        bits[4] = 1;
        var rgba = hslToRgb(bits);
        return [rgba.r, rgba.g, rgba.b, rgba.a];
      }
    },
    hsla: {
      re: /^hsla\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%,\s*(\d+(?:\.\d+)?|\.\d+)\s*\)/,
      example: ["hsla(120, 100%, 25%, 1)", "hsla(0, 100%, 50%, 0.5)"],
      toRGBA: function toRGBA(bits) {
        var rgba = hslToRgb(bits);
        return [rgba.r, rgba.g, rgba.b, rgba.a];
      }
    },
    hsv: {
      re: /^hsv\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
      example: ["hsv(120, 100%, 25%)", "hsv(0, 100%, 50%)"],
      toRGBA: function toRGBA(bits) {
        var rgb = hsvToRgb(bits);
        return [rgb.r, rgb.g, rgb.b, 1];
      }
    },
    hsb: {
      re: /^hsb\((\d{1,3}),\s*(\d{1,3})%,\s*(\d{1,3})%\)$/,
      example: ["hsb(120, 100%, 25%)", "hsb(0, 100%, 50%)"],
      toRGBA: function toRGBA(bits) {
        var rgb = hsvToRgb(bits);
        return [rgb.r, rgb.g, rgb.b, 1];
      }
    }
  }; // If this is a named color, convert it to hex

  if (namedColor.hasOwnProperty(color)) {
    color = namedColor[color];
    color.forEach(function (piece, index) {
      "use strict";

      color[index] = ("0" + piece.toString(16)).slice(-2);
    });
    color = "#" + color.join('');
  } // Search the color definitions for a match


  for (var colorDefinition in colorDefinitions) {
    var re = colorDefinitions[colorDefinition].re;
    var processor = colorDefinitions[colorDefinition].toRGBA;
    var bits = re.exec(color);

    if (bits) {
      var channels = processor(bits);
      r = channels[0];
      g = channels[1];
      b = channels[2];
      a = +(Math.round(channels[3] + ("e+" + roundTo)) + ("e-" + roundTo));
    }
  }

  r = Math.round(r < 0 || isNaN(r) ? 0 : r > 255 ? 255 : r);
  g = Math.round(g < 0 || isNaN(g) ? 0 : g > 255 ? 255 : g);
  b = Math.round(b < 0 || isNaN(b) ? 0 : b > 255 ? 255 : b);
  a = a < 0 || isNaN(a) ? 0 : a > 1 ? 1 : a;

  switch (newColor) {
    case "hex":
      returnedColor = "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2);
      break;

    case "hexa":
      if (calculateOpacity) {
        var _calculateOpacityFrom = calculateOpacityFromWhite(r, g, b, a);

        var _calculateOpacityFrom2 = (0, _slicedToArray2.default)(_calculateOpacityFrom, 4);

        r = _calculateOpacityFrom2[0];
        g = _calculateOpacityFrom2[1];
        b = _calculateOpacityFrom2[2];
        a = _calculateOpacityFrom2[3];
      }

      returnedColor = "#" + ("0" + r.toString(16)).slice(-2) + ("0" + g.toString(16)).slice(-2) + ("0" + b.toString(16)).slice(-2) + ("0" + Math.round(255 * a).toString(16)).slice(-2);
      break;

    case "hsl":
      var hsl = rgbToHsl({
        "r": r,
        "g": g,
        "b": b
      });
      returnedColor = "hsl(".concat(hsl.h, ",").concat(hsl.s, "%,").concat(hsl.l, "%)");
      break;

    case "hsla":
      if (calculateOpacity) {
        var _calculateOpacityFrom3 = calculateOpacityFromWhite(r, g, b, a);

        var _calculateOpacityFrom4 = (0, _slicedToArray2.default)(_calculateOpacityFrom3, 4);

        r = _calculateOpacityFrom4[0];
        g = _calculateOpacityFrom4[1];
        b = _calculateOpacityFrom4[2];
        a = _calculateOpacityFrom4[3];
      }

      var hsla = rgbToHsl({
        "r": r,
        "g": g,
        "b": b,
        "a": a
      });
      returnedColor = "hsla(".concat(hsla.h, ",").concat(hsla.s, "%,").concat(hsla.l, "%,").concat(hsla.a, ")");
      break;

    case "hsb":
      /* Same as `hsv` */
      var hsb = rgbToHsv({
        "r": r,
        "g": g,
        "b": b
      });
      returnedColor = "hsb(".concat(hsb.h, ",").concat(hsb.s, "%,").concat(hsb.v, "%)");
      break;

    case "hsv":
      var hsv = rgbToHsv({
        "r": r,
        "g": g,
        "b": b
      });
      returnedColor = "hsv(".concat(hsv.h, ",").concat(hsv.s, "%,").concat(hsv.v, "%)");
      break;

    case "rgb":
      returnedColor = "rgb(".concat(r, ",").concat(g, ",").concat(b, ")");
      break;

    case "rgba":
    /* falls through */

    default:
      if (calculateOpacity) {
        var _calculateOpacityFrom5 = calculateOpacityFromWhite(r, g, b, a);

        var _calculateOpacityFrom6 = (0, _slicedToArray2.default)(_calculateOpacityFrom5, 4);

        r = _calculateOpacityFrom6[0];
        g = _calculateOpacityFrom6[1];
        b = _calculateOpacityFrom6[2];
        a = _calculateOpacityFrom6[3];
      }

      returnedColor = "rgba(".concat(r, ",").concat(g, ",").concat(b, ",").concat(a, ")");
      break;
  }

  return returnedColor;
}

function calculateOpacityFromWhite(r, g, b, a) {
  "use strict";

  var min = 0;
  a = (255 - (min = Math.min(r, g, b))) / 255;
  r = ( false || (r - min) / a).toFixed(0);
  g = ( false || (g - min) / a).toFixed(0);
  b = ( false || (b - min) / a).toFixed(0);
  a = parseFloat(a.toFixed(4));
  return [r, g, b, a];
}

function hslToRgb(bits) {
  var rgba = {},
      hsl = {
    h: bits[1] / 360,
    s: bits[2] / 100,
    l: bits[3] / 100,
    a: parseFloat(bits[4])
  };

  if (hsl.s === 0) {
    var v = 255 * hsl.l;
    rgba = {
      r: v,
      g: v,
      b: v,
      a: hsl.a
    };
  } else {
    var q = hsl.l < 0.5 ? hsl.l * (1 + hsl.s) : hsl.l + hsl.s - hsl.l * hsl.s;
    var p = 2 * hsl.l - q;
    rgba.r = hueToRgb(p, q, hsl.h + 1 / 3) * 255;
    rgba.g = hueToRgb(p, q, hsl.h) * 255;
    rgba.b = hueToRgb(p, q, hsl.h - 1 / 3) * 255;
    rgba.a = hsl.a;
  }

  return rgba;
}

function rgbToHsl(rgba) {
  rgba.r = rgba.r / 255;
  rgba.g = rgba.g / 255;
  rgba.b = rgba.b / 255;
  var max = Math.max(rgba.r, rgba.g, rgba.b),
      min = Math.min(rgba.r, rgba.g, rgba.b),
      hsl = [],
      d;
  hsl.a = rgba.a;
  hsl.l = (max + min) / 2;

  if (max === min) {
    hsl.h = 0;
    hsl.s = 0;
  } else {
    d = max - min;
    hsl.s = hsl.l >= 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case rgba.r:
        hsl.h = (rgba.g - rgba.b) / d + (rgba.g < rgba.b ? 6 : 0);
        break;

      case rgba.g:
        hsl.h = (rgba.b - rgba.r) / d + 2;
        break;

      case rgba.b:
        hsl.h = (rgba.r - rgba.g) / d + 4;
        break;
    }

    hsl.h /= 6;
  }

  hsl.h = parseInt((hsl.h * 360).toFixed(0), 10);
  hsl.s = parseInt((hsl.s * 100).toFixed(0), 10);
  hsl.l = parseInt((hsl.l * 100).toFixed(0), 10);
  return hsl;
}

function hsvToRgb(bits) {
  var rgb = {},
      hsv = {
    h: bits[1] / 360,
    s: bits[2] / 100,
    v: bits[3] / 100
  },
      i = Math.floor(hsv.h * 6),
      f = hsv.h * 6 - i,
      p = hsv.v * (1 - hsv.s),
      q = hsv.v * (1 - f * hsv.s),
      t = hsv.v * (1 - (1 - f) * hsv.s);

  switch (i % 6) {
    case 0:
      rgb.r = hsv.v;
      rgb.g = t;
      rgb.b = p;
      break;

    case 1:
      rgb.r = q;
      rgb.g = hsv.v;
      rgb.b = p;
      break;

    case 2:
      rgb.r = p;
      rgb.g = hsv.v;
      rgb.b = t;
      break;

    case 3:
      rgb.r = p;
      rgb.g = q;
      rgb.b = hsv.v;
      break;

    case 4:
      rgb.r = t;
      rgb.g = p;
      rgb.b = hsv.v;
      break;

    case 5:
      rgb.r = hsv.v;
      rgb.g = p;
      rgb.b = q;
      break;
  }

  rgb.r = rgb.r * 255;
  rgb.g = rgb.g * 255;
  rgb.b = rgb.b * 255;
  return rgb;
}

function rgbToHsv(rgba) {
  rgba.r = toPercent(parseInt(rgba.r, 10) % 256, 256);
  rgba.g = toPercent(parseInt(rgba.g, 10) % 256, 256);
  rgba.b = toPercent(parseInt(rgba.b, 10) % 256, 256);
  var max = Math.max(rgba.r, rgba.g, rgba.b),
      min = Math.min(rgba.r, rgba.g, rgba.b),
      d = max - min,
      hsv = {
    "h": 0,
    "s": max === 0 ? 0 : d / max,
    "v": max
  };

  if (max !== min) {
    switch (max) {
      case rgba.r:
        hsv.h = (rgba.g - rgba.b) / d + (rgba.g < rgba.b ? 6 : 0);
        break;

      case rgba.g:
        hsv.h = (rgba.b - rgba.r) / d + 2;
        break;

      case rgba.b:
        hsv.h = (rgba.r - rgba.g) / d + 4;
        break;
    }

    hsv.h /= 6;
  }

  hsv.h = parseInt((hsv.h * 360).toFixed(0), 10);
  hsv.s = parseInt((hsv.s * 100).toFixed(0), 10);
  hsv.v = parseInt((hsv.v * 100).toFixed(0), 10);
  return hsv;
}

function hueToRgb(p, q, t) {
  if (t < 0) {
    t += 1;
  }

  if (t > 1) {
    t -= 1;
  }

  if (t < 1 / 6) {
    return p + (q - p) * 6 * t;
  }

  if (t < 1 / 2) {
    return q;
  }

  if (t < 2 / 3) {
    return p + (q - p) * ((2 / 3 - t) * 6);
  }

  return p;
}

function toPercent(amount, limit) {
  return amount / limit;
}

module.exports = colorcolor;
global.colorcolor = module.exports;
/* ew */
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj")))

/***/ }),

/***/ "rnKy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

/**
 * Copyright Marc J. Schmidt. See the LICENSE file at the top-level
 * directory of this distribution and at
 * https://github.com/marcj/css-element-queries/blob/master/LICENSE.
 */
(function (root, factory) {
    if (true) {
        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__("KtZj")], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
}(typeof window !== 'undefined' ? window : this, function (ResizeSensor) {

    /**
     *
     * @type {Function}
     * @constructor
     */
    var ElementQueries = function () {
        //<style> element with our dynamically created styles
        var cssStyleElement;

        //all rules found for element queries
        var allQueries = {};

        //association map to identify which selector belongs to a element from the animationstart event.
        var idToSelectorMapping = [];

        /**
         *
         * @param element
         * @returns {Number}
         */
        function getEmSize(element) {
            if (!element) {
                element = document.documentElement;
            }
            var fontSize = window.getComputedStyle(element, null).fontSize;
            return parseFloat(fontSize) || 16;
        }

        /**
         * Get element size
         * @param {HTMLElement} element
         * @returns {Object} {width, height}
         */
        function getElementSize(element) {
            if (!element.getBoundingClientRect) {
                return {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                }
            }

            var rect = element.getBoundingClientRect();
            return {
                width: Math.round(rect.width),
                height: Math.round(rect.height)
            }
        }

        /**
         *
         * @copyright https://github.com/Mr0grog/element-query/blob/master/LICENSE
         *
         * @param {HTMLElement} element
         * @param {*} value
         * @returns {*}
         */
        function convertToPx(element, value) {
            var numbers = value.split(/\d/);
            var units = numbers[numbers.length - 1];
            value = parseFloat(value);
            switch (units) {
                case "px":
                    return value;
                case "em":
                    return value * getEmSize(element);
                case "rem":
                    return value * getEmSize();
                // Viewport units!
                // According to http://quirksmode.org/mobile/tableViewport.html
                // documentElement.clientWidth/Height gets us the most reliable info
                case "vw":
                    return value * document.documentElement.clientWidth / 100;
                case "vh":
                    return value * document.documentElement.clientHeight / 100;
                case "vmin":
                case "vmax":
                    var vw = document.documentElement.clientWidth / 100;
                    var vh = document.documentElement.clientHeight / 100;
                    var chooser = Math[units === "vmin" ? "min" : "max"];
                    return value * chooser(vw, vh);
                default:
                    return value;
                // for now, not supporting physical units (since they are just a set number of px)
                // or ex/ch (getting accurate measurements is hard)
            }
        }

        /**
         *
         * @param {HTMLElement} element
         * @param {String} id
         * @constructor
         */
        function SetupInformation(element, id) {
            this.element = element;
            var key, option, elementSize, value, actualValue, attrValues, attrValue, attrName;

            var attributes = ['min-width', 'min-height', 'max-width', 'max-height'];

            /**
             * Extracts the computed width/height and sets to min/max- attribute.
             */
            this.call = function () {
                // extract current dimensions
                elementSize = getElementSize(this.element);

                attrValues = {};

                for (key in allQueries[id]) {
                    if (!allQueries[id].hasOwnProperty(key)) {
                        continue;
                    }
                    option = allQueries[id][key];

                    value = convertToPx(this.element, option.value);

                    actualValue = option.property === 'width' ? elementSize.width : elementSize.height;
                    attrName = option.mode + '-' + option.property;
                    attrValue = '';

                    if (option.mode === 'min' && actualValue >= value) {
                        attrValue += option.value;
                    }

                    if (option.mode === 'max' && actualValue <= value) {
                        attrValue += option.value;
                    }

                    if (!attrValues[attrName]) attrValues[attrName] = '';
                    if (attrValue && -1 === (' ' + attrValues[attrName] + ' ').indexOf(' ' + attrValue + ' ')) {
                        attrValues[attrName] += ' ' + attrValue;
                    }
                }

                for (var k in attributes) {
                    if (!attributes.hasOwnProperty(k)) continue;

                    if (attrValues[attributes[k]]) {
                        this.element.setAttribute(attributes[k], attrValues[attributes[k]].substr(1));
                    } else {
                        this.element.removeAttribute(attributes[k]);
                    }
                }
            };
        }

        /**
         * @param {HTMLElement} element
         * @param {Object}      id
         */
        function setupElement(element, id) {
            if (!element.elementQueriesSetupInformation) {
                element.elementQueriesSetupInformation = new SetupInformation(element, id);
            }

            if (!element.elementQueriesSensor) {
                element.elementQueriesSensor = new ResizeSensor(element, function () {
                    element.elementQueriesSetupInformation.call();
                });
            }
        }

        /**
         * Stores rules to the selector that should be applied once resized.
         *
         * @param {String} selector
         * @param {String} mode min|max
         * @param {String} property width|height
         * @param {String} value
         */
        function queueQuery(selector, mode, property, value) {
            if (typeof(allQueries[selector]) === 'undefined') {
                allQueries[selector] = [];
                // add animation to trigger animationstart event, so we know exactly when a element appears in the DOM

                var id = idToSelectorMapping.length;
                cssStyleElement.innerHTML += '\n' + selector + ' {animation: 0.1s element-queries;}';
                cssStyleElement.innerHTML += '\n' + selector + ' > .resize-sensor {min-width: '+id+'px;}';
                idToSelectorMapping.push(selector);
            }

            allQueries[selector].push({
                mode: mode,
                property: property,
                value: value
            });
        }

        function getQuery(container) {
            var query;
            if (document.querySelectorAll) query = (container) ? container.querySelectorAll.bind(container) : document.querySelectorAll.bind(document);
            if (!query && 'undefined' !== typeof $$) query = $$;
            if (!query && 'undefined' !== typeof jQuery) query = jQuery;

            if (!query) {
                throw 'No document.querySelectorAll, jQuery or Mootools\'s $$ found.';
            }

            return query;
        }

        /**
         * If animationStart didn't catch a new element in the DOM, we can manually search for it
         */
        function findElementQueriesElements(container) {
            var query = getQuery(container);

            for (var selector in allQueries) if (allQueries.hasOwnProperty(selector)) {
                // find all elements based on the extract query selector from the element query rule
                var elements = query(selector, container);

                for (var i = 0, j = elements.length; i < j; i++) {
                    setupElement(elements[i], selector);
                }
            }
        }

        /**
         *
         * @param {HTMLElement} element
         */
        function attachResponsiveImage(element) {
            var children = [];
            var rules = [];
            var sources = [];
            var defaultImageId = 0;
            var lastActiveImage = -1;
            var loadedImages = [];

            for (var i in element.children) {
                if (!element.children.hasOwnProperty(i)) continue;

                if (element.children[i].tagName && element.children[i].tagName.toLowerCase() === 'img') {
                    children.push(element.children[i]);

                    var minWidth = element.children[i].getAttribute('min-width') || element.children[i].getAttribute('data-min-width');
                    //var minHeight = element.children[i].getAttribute('min-height') || element.children[i].getAttribute('data-min-height');
                    var src = element.children[i].getAttribute('data-src') || element.children[i].getAttribute('url');

                    sources.push(src);

                    var rule = {
                        minWidth: minWidth
                    };

                    rules.push(rule);

                    if (!minWidth) {
                        defaultImageId = children.length - 1;
                        element.children[i].style.display = 'block';
                    } else {
                        element.children[i].style.display = 'none';
                    }
                }
            }

            lastActiveImage = defaultImageId;

            function check() {
                var imageToDisplay = false, i;

                for (i in children) {
                    if (!children.hasOwnProperty(i)) continue;

                    if (rules[i].minWidth) {
                        if (element.offsetWidth > rules[i].minWidth) {
                            imageToDisplay = i;
                        }
                    }
                }

                if (!imageToDisplay) {
                    //no rule matched, show default
                    imageToDisplay = defaultImageId;
                }

                if (lastActiveImage !== imageToDisplay) {
                    //image change

                    if (!loadedImages[imageToDisplay]) {
                        //image has not been loaded yet, we need to load the image first in memory to prevent flash of
                        //no content

                        var image = new Image();
                        image.onload = function () {
                            children[imageToDisplay].src = sources[imageToDisplay];

                            children[lastActiveImage].style.display = 'none';
                            children[imageToDisplay].style.display = 'block';

                            loadedImages[imageToDisplay] = true;

                            lastActiveImage = imageToDisplay;
                        };

                        image.src = sources[imageToDisplay];
                    } else {
                        children[lastActiveImage].style.display = 'none';
                        children[imageToDisplay].style.display = 'block';
                        lastActiveImage = imageToDisplay;
                    }
                } else {
                    //make sure for initial check call the .src is set correctly
                    children[imageToDisplay].src = sources[imageToDisplay];
                }
            }

            element.resizeSensorInstance = new ResizeSensor(element, check);
            check();
        }

        function findResponsiveImages() {
            var query = getQuery();

            var elements = query('[data-responsive-image],[responsive-image]');
            for (var i = 0, j = elements.length; i < j; i++) {
                attachResponsiveImage(elements[i]);
            }
        }

        var regex = /,?[\s\t]*([^,\n]*?)((?:\[[\s\t]*?(?:min|max)-(?:width|height)[\s\t]*?[~$\^]?=[\s\t]*?"[^"]*?"[\s\t]*?])+)([^,\n\s\{]*)/mgi;
        var attrRegex = /\[[\s\t]*?(min|max)-(width|height)[\s\t]*?[~$\^]?=[\s\t]*?"([^"]*?)"[\s\t]*?]/mgi;

        /**
         * @param {String} css
         */
        function extractQuery(css) {
            var match, smatch, attrs, attrMatch;

            css = css.replace(/'/g, '"');
            while (null !== (match = regex.exec(css))) {
                smatch = match[1] + match[3];
                attrs = match[2];

                while (null !== (attrMatch = attrRegex.exec(attrs))) {
                    queueQuery(smatch, attrMatch[1], attrMatch[2], attrMatch[3]);
                }
            }
        }

        /**
         * @param {CssRule[]|String} rules
         */
        function readRules(rules) {
            var selector = '';

            if (!rules) {
                return;
            }

            if ('string' === typeof rules) {
                rules = rules.toLowerCase();
                if (-1 !== rules.indexOf('min-width') || -1 !== rules.indexOf('max-width')) {
                    extractQuery(rules);
                }
            } else {
                for (var i = 0, j = rules.length; i < j; i++) {
                    if (1 === rules[i].type) {
                        selector = rules[i].selectorText || rules[i].cssText;
                        if (-1 !== selector.indexOf('min-height') || -1 !== selector.indexOf('max-height')) {
                            extractQuery(selector);
                        } else if (-1 !== selector.indexOf('min-width') || -1 !== selector.indexOf('max-width')) {
                            extractQuery(selector);
                        }
                    } else if (4 === rules[i].type) {
                        readRules(rules[i].cssRules || rules[i].rules);
                    } else if (3 === rules[i].type) {
                        if(rules[i].styleSheet.hasOwnProperty("cssRules")) {
                            readRules(rules[i].styleSheet.cssRules);
                        }
                    }
                }
            }
        }

        var defaultCssInjected = false;

        /**
         * Searches all css rules and setups the event listener to all elements with element query rules..
         */
        this.init = function () {
            var animationStart = 'animationstart';
            if (typeof document.documentElement.style['webkitAnimationName'] !== 'undefined') {
                animationStart = 'webkitAnimationStart';
            } else if (typeof document.documentElement.style['MozAnimationName'] !== 'undefined') {
                animationStart = 'mozanimationstart';
            } else if (typeof document.documentElement.style['OAnimationName'] !== 'undefined') {
                animationStart = 'oanimationstart';
            }

            document.body.addEventListener(animationStart, function (e) {
                var element = e.target;
                var styles = element && window.getComputedStyle(element, null);
                var animationName = styles && styles.getPropertyValue('animation-name');
                var requiresSetup = animationName && (-1 !== animationName.indexOf('element-queries'));

                if (requiresSetup) {
                    element.elementQueriesSensor = new ResizeSensor(element, function () {
                        if (element.elementQueriesSetupInformation) {
                            element.elementQueriesSetupInformation.call();
                        }
                    });

                    var sensorStyles = window.getComputedStyle(element.resizeSensor, null);
                    var id = sensorStyles.getPropertyValue('min-width');
                    id = parseInt(id.replace('px', ''));
                    setupElement(e.target, idToSelectorMapping[id]);
                }
            });

            if (!defaultCssInjected) {
                cssStyleElement = document.createElement('style');
                cssStyleElement.type = 'text/css';
                cssStyleElement.innerHTML = '[responsive-image] > img, [data-responsive-image] {overflow: hidden; padding: 0; } [responsive-image] > img, [data-responsive-image] > img {width: 100%;}';

                //safari wants at least one rule in keyframes to start working
                cssStyleElement.innerHTML += '\n@keyframes element-queries { 0% { visibility: inherit; } }';
                document.getElementsByTagName('head')[0].appendChild(cssStyleElement);
                defaultCssInjected = true;
            }

            for (var i = 0, j = document.styleSheets.length; i < j; i++) {
                try {
                    if (document.styleSheets[i].href && 0 === document.styleSheets[i].href.indexOf('file://')) {
                        console.warn("CssElementQueries: unable to parse local css files, " + document.styleSheets[i].href);
                    }

                    readRules(document.styleSheets[i].cssRules || document.styleSheets[i].rules || document.styleSheets[i].cssText);
                } catch (e) {
                }
            }

            findResponsiveImages();
        };

        /**
         * Go through all collected rules (readRules()) and attach the resize-listener.
         * Not necessary to call it manually, since we detect automatically when new elements
         * are available in the DOM. However, sometimes handy for dirty DOM modifications.
         *
         * @param {HTMLElement} container only elements of the container are considered (document.body if not set)
         */
        this.findElementQueriesElements = function (container) {
            findElementQueriesElements(container);
        };

        this.update = function () {
            this.init();
        };
    };

    ElementQueries.update = function () {
        ElementQueries.instance.update();
    };

    /**
     * Removes all sensor and elementquery information from the element.
     *
     * @param {HTMLElement} element
     */
    ElementQueries.detach = function (element) {
        if (element.elementQueriesSetupInformation) {
            //element queries
            element.elementQueriesSensor.detach();
            delete element.elementQueriesSetupInformation;
            delete element.elementQueriesSensor;

        } else if (element.resizeSensorInstance) {
            //responsive image

            element.resizeSensorInstance.detach();
            delete element.resizeSensorInstance;
        }
    };

    ElementQueries.init = function () {
        if (!ElementQueries.instance) {
            ElementQueries.instance = new ElementQueries();
        }

        ElementQueries.instance.init();
    };

    var domLoaded = function (callback) {
        /* Mozilla, Chrome, Opera */
        if (document.addEventListener) {
            document.addEventListener('DOMContentLoaded', callback, false);
        }
        /* Safari, iCab, Konqueror */
        else if (/KHTML|WebKit|iCab/i.test(navigator.userAgent)) {
            var DOMLoadTimer = setInterval(function () {
                if (/loaded|complete/i.test(document.readyState)) {
                    callback();
                    clearInterval(DOMLoadTimer);
                }
            }, 10);
        }
        /* Other web browsers */
        else window.onload = callback;
    };

    ElementQueries.findElementQueriesElements = function (container) {
        ElementQueries.instance.findElementQueriesElements(container);
    };

    ElementQueries.listen = function () {
        domLoaded(ElementQueries.init);
    };

    return ElementQueries;

}));


/***/ }),

/***/ "s544":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
 * JsonSQL
 * By: Trent Richardson [http://trentrichardson.com]
 * Version 0.1
 * Last Modified: 1/1/2008
 *
 * Copyright 2008 Trent Richardson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
window.jsonsql = {
  query: function query(sql, json) {
    var returnfields = sql.match(/^(select)\s+([a-z0-9_\,\.\s\*]+)\s+from\s+([a-z0-9_\.]+)(?: where\s+\((.+)\))?\s*(?:order\sby\s+([a-z0-9_\,]+))?\s*(asc|desc|ascnum|descnum)?\s*(?:limit\s+([0-9_\,]+))?/i);
    var ops = {
      fields: returnfields[2].replace(' ', '').split(','),
      from: returnfields[3].replace(' ', ''),
      where: returnfields[4] == undefined ? 'true' : returnfields[4],
      orderby: returnfields[5] == undefined ? [] : returnfields[5].replace(' ', '').split(','),
      order: returnfields[6] == undefined ? 'asc' : returnfields[6],
      limit: returnfields[7] == undefined ? [] : returnfields[7].replace(' ', '').split(',')
    };
    return this.parse(json, ops);
  },
  parse: function parse(json, ops) {
    var o = {
      fields: ['*'],
      from: 'json',
      where: '',
      orderby: [],
      order: 'asc',
      limit: []
    };

    for (var i in ops) {
      o[i] = ops[i];
    }

    var result = [];
    result = this.returnFilter(json, o);
    result = this.returnOrderBy(result, o.orderby, o.order);
    result = this.returnLimit(result, o.limit);
    return result;
  },
  returnFilter: function returnFilter(json, jsonsql_o) {
    var jsonsql_scope = eval(jsonsql_o.from);
    var jsonsql_result = [];
    var jsonsql_rc = 0;
    if (jsonsql_o.where == '') jsonsql_o.where = 'true';

    for (var jsonsql_i in jsonsql_scope) {
      // with(jsonsql_scope[jsonsql_i]){
      //     if(eval(jsonsql_o.where)){
      //         jsonsql_result[jsonsql_rc++] = this.returnFields(jsonsql_scope[jsonsql_i],jsonsql_o.fields);
      //     }
      // }
      //  fix with -- stric mode
      if (this.functionreplaceWith(jsonsql_scope[jsonsql_i], jsonsql_o.where)) {
        jsonsql_result[jsonsql_rc++] = this.returnFields(jsonsql_scope[jsonsql_i], jsonsql_o.fields);
      }
    }

    return jsonsql_result;
  },
  functionreplaceWith: function functionreplaceWith(scope, exp) {
    exp = ' ' + exp.trim();
    var quickRegex = /([\s\+\-\*\/%&\|\^!\*~]\s*?)([a-zA-Z_$][a-zA-Z_$0-9]*?)/g;
    exp = exp.replace(quickRegex, function (a, b, c) {
      return b + 'scope.' + c;
    });
    var func = new Function('scope', 'return ' + exp);
    return func(scope);
  },
  returnFields: function returnFields(scope, fields) {
    if (fields.length == 0) fields = ['*'];
    if (fields[0] == '*') return scope;
    var returnobj = {};

    for (var i in fields) {
      returnobj[fields[i]] = scope[fields[i]];
    }

    return returnobj;
  },
  returnOrderBy: function returnOrderBy(result, orderby, order) {
    if (orderby.length == 0) return result;
    result.sort(function (a, b) {
      switch (order.toLowerCase()) {
        case 'desc':
          return eval('a.' + orderby[0] + ' < b.' + orderby[0]) ? 1 : -1;

        case 'asc':
          return eval('a.' + orderby[0] + ' > b.' + orderby[0]) ? 1 : -1;

        case 'descnum':
          return eval('a.' + orderby[0] + ' - b.' + orderby[0]);

        case 'ascnum':
          return eval('b.' + orderby[0] + ' - a.' + orderby[0]);
      }
    });
    return result;
  },
  returnLimit: function returnLimit(result, limit) {
    switch (limit.length) {
      case 0:
        return result;

      case 1:
        return result.splice(0, limit[0]);

      case 2:
        return result.splice(limit[0] - 1, limit[1]);
    }
  }
};

/***/ }),

/***/ "sEfC":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("GoyQ"),
    now = __webpack_require__("QIyF"),
    toNumber = __webpack_require__("tLB3");

/** Error message constants. */
var FUNC_ERROR_TEXT = 'Expected a function';

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max,
    nativeMin = Math.min;

/**
 * Creates a debounced function that delays invoking `func` until after `wait`
 * milliseconds have elapsed since the last time the debounced function was
 * invoked. The debounced function comes with a `cancel` method to cancel
 * delayed `func` invocations and a `flush` method to immediately invoke them.
 * Provide `options` to indicate whether `func` should be invoked on the
 * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
 * with the last arguments provided to the debounced function. Subsequent
 * calls to the debounced function return the result of the last `func`
 * invocation.
 *
 * **Note:** If `leading` and `trailing` options are `true`, `func` is
 * invoked on the trailing edge of the timeout only if the debounced function
 * is invoked more than once during the `wait` timeout.
 *
 * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
 * until to the next tick, similar to `setTimeout` with a timeout of `0`.
 *
 * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
 * for details over the differences between `_.debounce` and `_.throttle`.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Function
 * @param {Function} func The function to debounce.
 * @param {number} [wait=0] The number of milliseconds to delay.
 * @param {Object} [options={}] The options object.
 * @param {boolean} [options.leading=false]
 *  Specify invoking on the leading edge of the timeout.
 * @param {number} [options.maxWait]
 *  The maximum time `func` is allowed to be delayed before it's invoked.
 * @param {boolean} [options.trailing=true]
 *  Specify invoking on the trailing edge of the timeout.
 * @returns {Function} Returns the new debounced function.
 * @example
 *
 * // Avoid costly calculations while the window size is in flux.
 * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
 *
 * // Invoke `sendMail` when clicked, debouncing subsequent calls.
 * jQuery(element).on('click', _.debounce(sendMail, 300, {
 *   'leading': true,
 *   'trailing': false
 * }));
 *
 * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
 * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
 * var source = new EventSource('/stream');
 * jQuery(source).on('message', debounced);
 *
 * // Cancel the trailing debounced invocation.
 * jQuery(window).on('popstate', debounced.cancel);
 */
function debounce(func, wait, options) {
  var lastArgs,
      lastThis,
      maxWait,
      result,
      timerId,
      lastCallTime,
      lastInvokeTime = 0,
      leading = false,
      maxing = false,
      trailing = true;

  if (typeof func != 'function') {
    throw new TypeError(FUNC_ERROR_TEXT);
  }
  wait = toNumber(wait) || 0;
  if (isObject(options)) {
    leading = !!options.leading;
    maxing = 'maxWait' in options;
    maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
    trailing = 'trailing' in options ? !!options.trailing : trailing;
  }

  function invokeFunc(time) {
    var args = lastArgs,
        thisArg = lastThis;

    lastArgs = lastThis = undefined;
    lastInvokeTime = time;
    result = func.apply(thisArg, args);
    return result;
  }

  function leadingEdge(time) {
    // Reset any `maxWait` timer.
    lastInvokeTime = time;
    // Start the timer for the trailing edge.
    timerId = setTimeout(timerExpired, wait);
    // Invoke the leading edge.
    return leading ? invokeFunc(time) : result;
  }

  function remainingWait(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime,
        timeWaiting = wait - timeSinceLastCall;

    return maxing
      ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
      : timeWaiting;
  }

  function shouldInvoke(time) {
    var timeSinceLastCall = time - lastCallTime,
        timeSinceLastInvoke = time - lastInvokeTime;

    // Either this is the first call, activity has stopped and we're at the
    // trailing edge, the system time has gone backwards and we're treating
    // it as the trailing edge, or we've hit the `maxWait` limit.
    return (lastCallTime === undefined || (timeSinceLastCall >= wait) ||
      (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
  }

  function timerExpired() {
    var time = now();
    if (shouldInvoke(time)) {
      return trailingEdge(time);
    }
    // Restart the timer.
    timerId = setTimeout(timerExpired, remainingWait(time));
  }

  function trailingEdge(time) {
    timerId = undefined;

    // Only invoke if we have `lastArgs` which means `func` has been
    // debounced at least once.
    if (trailing && lastArgs) {
      return invokeFunc(time);
    }
    lastArgs = lastThis = undefined;
    return result;
  }

  function cancel() {
    if (timerId !== undefined) {
      clearTimeout(timerId);
    }
    lastInvokeTime = 0;
    lastArgs = lastCallTime = lastThis = timerId = undefined;
  }

  function flush() {
    return timerId === undefined ? result : trailingEdge(now());
  }

  function debounced() {
    var time = now(),
        isInvoking = shouldInvoke(time);

    lastArgs = arguments;
    lastThis = this;
    lastCallTime = time;

    if (isInvoking) {
      if (timerId === undefined) {
        return leadingEdge(lastCallTime);
      }
      if (maxing) {
        // Handle invocations in a tight loop.
        timerId = setTimeout(timerExpired, wait);
        return invokeFunc(lastCallTime);
      }
    }
    if (timerId === undefined) {
      timerId = setTimeout(timerExpired, wait);
    }
    return result;
  }
  debounced.cancel = cancel;
  debounced.flush = flush;
  return debounced;
}

module.exports = debounce;


/***/ }),

/***/ "tA+t":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("TVTA");
/* harmony import */ var _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return _node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__[key]; }) }(__WEBPACK_IMPORT_KEY__));
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_node_modules_vue_loader_lib_index_js_vue_loader_options_Image_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "tLB3":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("GoyQ"),
    isSymbol = __webpack_require__("/9aa");

/** Used as references for various `Number` constants. */
var NAN = 0 / 0;

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

module.exports = toNumber;


/***/ }),

/***/ "tW0q":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ArrayExt = exports.FunctionExt = exports.NumberExt = exports.StringExt = void 0;

/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */
var StringExt = {
  startsWith: function startsWith(str, sub) {
    return str.indexOf(sub) === 0;
  },
  contains: function contains(str, sub) {
    return str.indexOf(sub) !== -1;
  },
  trim: function trim(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },
  camelize: function camelize(str) {
    var oStringList = str.split('-');
    var camelizedString = oStringList[0];

    for (var i = 1, len = oStringList.length; i < len; i++) {
      var s = oStringList[i];
      camelizedString += s.charAt(0).toUpperCase() + s.substring(1);
    }

    return camelizedString;
  },
  format: function format(template, context, args) {
    if (!context) {
      context = window;
    } // Example matching:
    // str   = ${foo.bar}
    // match = foo.bar


    var replacer = function replacer(str, match) {
      var replacement; // Loop through all subs. Example: ${a.b.c}
      // 0 -> replacement = context[a];
      // 1 -> replacement = context[a][b];
      // 2 -> replacement = context[a][b][c];

      var subs = match.split(/\.+/);

      for (var i = 0; i < subs.length; i++) {
        if (i === 0) {
          replacement = context;
        }

        replacement = replacement[subs[i]];
      }

      if (typeof replacement === 'function') {
        replacement = args ? replacement.apply(null, args) : replacement();
      } // If replacement is undefined, return the string 'undefined'.
      // This is a workaround for a bugs in browsers not properly
      // dealing with non-participating groups in regular expressions:
      // http://blog.stevenlevithan.com/archives/npcg-javascript


      if (typeof replacement === 'undefined') {
        return 'undefined';
      } else {
        return replacement;
      }
    };

    return template.replace(String.tokenRegEx, replacer);
  },

  /**
   * @member {RegExp} [String.tokenRegEx]
   * @description 寻找带 token 的字符串，默认为 tokenRegEx=/\$\{([\w.]+?)\}/g。
   * @example
   * Examples: ${a}, ${a.b.c}, ${a-b}, ${5}
   */
  tokenRegEx: /\$\{([\w.]+?)\}/g,

  /**
   * @member {RegExp} [String.numberRegEx]
   * @description 判断一个字符串是否只包含一个数值，默认为 numberRegEx=/^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/。
   */
  numberRegEx: /^([+-]?)(?=\d|\.\d)\d*(\.\d*)?([Ee]([+-]?\d+))?$/,

  /**
   * @function String.isNumeric
   * @description 判断一个字符串是否只包含一个数值。
   * @example
   * (code)
   * String.isNumeric("6.02e23") // true
   * String.isNumeric("12 dozen") // false
   * String.isNumeric("4") // true
   * String.isNumeric(" 4 ") // false
   * (end)
   * @returns {boolean} 字符串包含唯一的数值，返回 true；否则返回 false。
   */
  isNumeric: function isNumeric(value) {
    return String.numberRegEx.test(value);
  },

  /**
   * @function String.numericIf
   * @description 把一个看似数值型的字符串转化为一个数值。
   * @returns {(number|string)} 如果能转换为数值则返回数值，否则返回字符串本身。
   */
  numericIf: function numericIf(value) {
    return String.isNumeric(value) ? parseFloat(value) : value;
  }
};
/**
 * @name Number
 * @namespace
 * @category BaseTypes Util
 * @description 数值操作的一系列常用扩展函数。
 */

exports.StringExt = StringExt;
var NumberExt = {
  decimalSeparator: '.',
  thousandsSeparator: ',',
  limitSigDigs: function limitSigDigs(num, sig) {
    var fig = 0;

    if (sig > 0) {
      fig = parseFloat(num.toPrecision(sig));
    }

    return fig;
  },
  format: function format(num, dec, tsep, dsep) {
    dec = typeof dec !== 'undefined' ? dec : 0;
    tsep = typeof tsep !== 'undefined' ? tsep : Number.thousandsSeparator;
    dsep = typeof dsep !== 'undefined' ? dsep : Number.decimalSeparator;

    if (dec != null) {
      num = parseFloat(num.toFixed(dec));
    }

    var parts = num.toString().split('.');

    if (parts.length === 1 && dec == null) {
      // integer where we do not want to touch the decimals
      dec = 0;
    }

    var integer = parts[0];

    if (tsep) {
      var thousands = /(-?[0-9]+)([0-9]{3})/;

      while (thousands.test(integer)) {
        integer = integer.replace(thousands, '$1' + tsep + '$2');
      }
    }

    var str;

    if (dec === 0) {
      str = integer;
    } else {
      var rem = parts.length > 1 ? parts[1] : '0';

      if (dec != null) {
        rem = rem + new Array(dec - rem.length + 1).join('0');
      }

      str = integer + dsep + rem;
    }

    return str;
  }
}; // if (!NumberExt.prototype.limitSigDigs) {
//   /**
//    * APIMethod: Number.limitSigDigs
//    * 限制浮点数的有效数字位数.
//    * @param {integer} sig -有效位数。
//    * @returns {integer} 将数字四舍五入到指定数量的有效位数。
//    *           如果传入值 为 null、0、或者是负数, 返回值 0。
//    */
//   NumberExt.prototype.limitSigDigs = function (sig) {
//     return NumberExt.limitSigDigs(this, sig);
//   };
// }

exports.NumberExt = NumberExt;
var FunctionExt = {
  bind: function bind(func, object) {
    // create a reference to all arguments past the second one
    var args = Array.prototype.slice.apply(arguments, [2]);
    return function () {
      // Push on any additional arguments from the actual function call.
      // These will come after those sent to the bind call.
      var newArgs = args.concat(Array.prototype.slice.apply(arguments, [0]));
      return func.apply(object, newArgs);
    };
  },
  bindAsEventListener: function bindAsEventListener(func, object) {
    return function (event) {
      return func.call(object, event || window.event);
    };
  },
  False: function False() {
    return false;
  },
  True: function True() {
    return true;
  },
  Void: function Void() {}
};
exports.FunctionExt = FunctionExt;
var ArrayExt = {
  /**
   * @function Array.filter
   * @description 过滤数组，提供了 ECMA-262 标准中 Array.prototype.filter 函数的扩展。详见：{@link http://developer.mozilla.org/en/Core_JavaScript_1.5_Reference/Global_Objects/Array/filter}
   * @param {Array} array - 要过滤的数组。
   * @param {function} callback - 数组中的每一个元素调用该函数。</br>
   *     如果函数的返回值为 true，该元素将包含在返回的数组中。该函数有三个参数: 数组中的元素，元素的索引，数组自身。</br>
   *     如果设置了可选参数 caller，在调用 callback 时，使用可选参数 caller 设置为 callback 的参数。</br>
   * @param {Object} [caller] - 在调用 callback 时，使用参数 caller 设置为 callback 的参数。
   * @returns {Array} callback 函数返回 true 时的元素将作为返回数组中的元素。
   */
  filter: function filter(array, callback, caller) {
    var selected = [];

    if (Array.prototype.filter) {
      selected = array.filter(callback, caller);
    } else {
      var len = array.length;

      if (typeof callback !== 'function') {
        throw new TypeError();
      }

      for (var i = 0; i < len; i++) {
        if (i in array) {
          var val = array[i];

          if (callback.call(caller, val, i, array)) {
            selected.push(val);
          }
        }
      }
    }

    return selected;
  }
};
exports.ArrayExt = ArrayExt;

/***/ }),

/***/ "usAy":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAADVFJREFUeAHt2zFuEwEARFGCOExuRoGoEF3KtFSIIpyC43AbUIpIabzJSpaYT16aWNn1ZvzGxcgr33z9+evPOz8ECBAgQIAAgWsIGBbXUHQNAgQIECBA4HFTvMdAgAABAgQIELiWgGFxLUnXIUCAAAECBN4ZFt4EBAgQIECAwNUEDIurUboQAQIECBAgYFh4DxAgQIAAAQJXE/hwdKVvt598FfUIyDECBAgQIPAGBb78/nFz6WUfDovHJx09+dJF/Z0AAQIECBD4PwVe+tDBrZD/s3evigABAgQI/BOBFz+xeEr1+f7BbZEnDL8JECBAgMAbE/h+9/Hi7Y/nFK8eFo9Peu1Fn/8DjwkQIECAAIG2wJkPF9wKaXctPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpAcNiqg5hCBAgQIBAW8CwaPcnPQECBAgQmBIwLKbqEIYAAQIECLQFDIt2f9ITIECAAIEpgQ9n0ny+f/hz5nznEiBAgAABAm9L4NXD4vvdx5u3RePVEiBAgAABAmcF3Ao5K+Z8AgQIECBA4KLAi59YfLv95PbHRT4HCBAgQIAAgecCh8Piy+8fbn881/KYAAECBAgQOBRwK+SQx0ECBAgQIEDgjIBhcUbLuQQIECBAgMChgGFxyOMgAQIECBAgcEbAsDij5VwCBAgQIEDgUMCwOORxkAABAgQIEDgjcPP15y9fJz0j5lwCBAgQIEDgosBfCPklARb6dIIAAAAASUVORK5CYII="

/***/ }),

/***/ "utZJ":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./dark.scss": "C/aJ",
	"./light.scss": "NjLH"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "utZJ";

/***/ }),

/***/ "vsHO":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAhYAAAD+CAYAAABmz0wVAAAABGdBTUEAALGPC/xhBQAAG6VJREFUeAHt3XuwXmV9L/BnvZd9yYUUZEqwGEASSRCOLUJFLgZbUoFIpVWjE7zM1On0j17m/NWZetrpae3Y6eWPTm9qO/SiklOjnhZDBEusoAhSwBt4FEOQ62lQBBKS7Oz32t+z3r3TvWEDIXmsQj5v9s673met57fW+uSZeb55L+ut0mHejr36pqW79u5623A4fGOV0unDYVqe0nDxYZbVnQABAgQIEPiBClR7qyrtHKZ0V1VV1yxbvOxjj77p/CcPd5eRBQ791r5qy7vigP44DdNxh15FTwIECBAgQOCHLlClRyIU/Gb3iss+fDjHcsjBonXV1t9Ow8H72s1GWv3jx6aTj/mxdOySyTQ5NpbajUYaxFMX8ZP6w0F9nx8PZpa7g1iX/wwGaRBHHw9H62K518/bj/rmbXK/fmxQ18vbzvTJ2+T26Pr0tty/7hvPncTyaN+jbePhaF+5PfoOZ2vkY4vHuWa+5f3U93X/3GfUXh/bTO18Yrl5dl/1Mc5ul1tjefa4636jEgfacv3c7kaAAAECBH5kBKrG7/SuWP8Hh3o8hxQsxjZtfX9MvL+15rhj03kvX5GWtFspxfMpVZ5w80Qdy6NJNk/Uowk7T6D9AxPtzGQfc3ee3vNcXq+rJ/mZGnFGuVYOJnmOz9Pv7MSda/VyEKjbR7Xy/FyHmJnt6uOol6NvfQx5u1wn/5k5ruiU++UIkWvOHvMoDOR1o/ASq+ftPz+Yu03ebpjPvg4nuU5ejo1CdxRUYvlpfbJWNLoRIECAAIEfMYFGo/GHnY3r33soh/W8gkVMltXYpmv+IubMXz1rxUvTOSf+RL3POIB+YzDoDvv9iBR5vhxUMfHGPBs/eSHP8nlF3GKizX/lW6yOB3VDfuIgokXePv8VFXrdXvydu0ZLLpJ/o6Hf680sjNrz1rEy9Tu9On/EMeQpfTjI93llP+8slvMtasSjXC+aIobk9fFXTi55mygdG/Rn9pv7R51o7PfzseSd93OgiDPtRcfoX5fop3yycbxRIrfH7uOc8n7SMLYPlcFgtr2f+r2oG0/L1NvmAqPkcSj/dvoQIECAAIFDFmi0mo3hjx29qLFq5fHVmtWnpomJJXOLxYT+V52Nb/z1eP/F8/pf8EEHi7duHjb/pbP1ypgt3/2aCBRnnnB8asRem81qqtHNs3Q/nrbI+45nK/KMHUv1xB7TdizF3Jtn4Tp05Al5FB9irh5N8HWESP241TNz3NXzbWxV14rGPAEP8sQfU3vdP0/xB9q7de36cV6Z+9V3/SifJ/g80dcb1zVibWwSvzMZIhpjwo+Gevczd/l4c1aI5iqvqrePor3eaDlq5EOIPeTdDYcRLPoRIOoziRyRg8rMtjm15FAyOpfcP7JRivV52whKz+sfbO4/umUCBAgQIFBCoNFuN6o3rDuzWrFi5dx68VrEP14+tv49H99Q9ee2P9vyQQWLV99+e/tr39q5KQLCW849+WXplfESSBXvoxhvNndX3W5j7+NPdL5x05e23/3vt333if//yFS3282vLrgRIECAAAECLyCB1uvXvjKtWXPG/EOuPvGq1cs33nHWWd357Qs/es5gccLmmyd3dr//ydjwkvNPXpFO/fGX5P9op8l2e/dwen9131fveujaD155Z2e6I0wsbKyVAAECBAi8YARaF649PZ225vR5B1yla5e3X/LmhzacOzWvfYEHzxos6mtU7HnimkgSr3vdqpPSyUcvS41Glcaq5q5qen/jrhtv2v65j3zs2wvU1USAAAECBAi8QAUWChfx7ocbly05+rLnutbFMwaLozZfd8xUp3tdvI/i7AtXnpSOX7a0DhXjVbW7mppK37zplu2f++jm7S9QM4dNgAABAgQIPIvAguEipdsmx9oX795w8WPP1HXBYLF407bjOsP91zer6owLV56YjlsabxSNLceGwyebne7gm1+4efuNmz5+zzMV1U6AAAECBAi88AUWDBdVdedYNbFu78aLHlnoDJ8WLCY3X7+i153eFhe5WrV21YnpmEWT8emPRmr3u3siVHTv/uKXdnz+/3xSqFhIUxsBAgQIEHiRCTxDuNjeao9fNLVh3QNPPd15wWL8qi2r4oOQ28ZarRVr45mKoybG6o+UtvuDPc3909N333zrvV/c/H93PLWIxwQIECBAgMCLV2DBcJHSA/G2y4umr7hs3tsiDgSLsY9uPSMua3X9ZKt13PlxNc2lE+O10Fi3u7fd7Uzd/cVb7735E1ff++Jlc2YECBAgQIDAMwksFC7ibRKPNIaNdZ13rL9ztl8dLNr/dO3ZcQGn6xa328ecd/IJaVF830dcaSu1utN72tOdfdtvufW+Wz65RaiYVXNPgAABAgSOQIGFw0X1WNVsXtx9+yW3ZZKqtenTa+MqkFviGYqlrz3phHzRq7j4VZXanQgVU/v3bL/1tvtv/eet3zkC/ZwyAQIECBAg8BSBBcNFSk+mRvOy3sZLb6xaV23Zt2xiYvLsl/1EGm836qtytzudJ8en9+/dfstt9/37pz5931NqekiAAAECBAgcwQILhosqTTWHzTe3jp6YnDzzZctTfBdJfPVFSq39U7ubU1N7vn37l++/7VPX3n8Euzl1AgQIECBAYAGB3g033hVfEJbmXaEzLsodX715deunTlhef/IjvpgrtaciVOzdt3v77V958MtbPyNULICpiQABAgQIEEhpwXCRhu1W/obS+O7NNL5valdr/77dO2778oNf+fT1T/tcKkQCBAgQIECAwFyBhcJFK4eK9tS+Jxp79+zaccfXHvrqddsenNvJMgECBAgQIEDgmQSeGi5azX17H2/u3v3EvV/5+sNf/9d/e+iZOmonQIAAAQIECCwkMDdctCJUPL7jjq88/I1tNz680MbaCBAgQIAAAQLPJTAbLprtVae/5Ruf/bxQ8Vxi1hMgQIAAAQLPKjC47/7vNr/XG/+5Z93KSgIECBAgQIDAQQrEFbHcCBAgQIAAAQJlBASLMo6qECBAgAABAiEgWBgGBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCAAAECBAgUExAsilEqRIAAAQIECAgWxgABAgQIECBQTECwKEapEAECBAgQICBYGAMECBAgQIBAMQHBohilQgQIECBAgIBgYQwQIECAAAECxQQEi2KUChEgQIAAAQKChTFAgAABAgQIFBMQLIpRKkSAAAECBAgIFsYAAQIECBAgUExAsChGqRABAgQIECAgWBgDBAgQIECAQDEBwaIYpUIECBAgQICAYGEMECBAgAABAsUEBItilAoRIECAAAECgoUxQIAAAQIECBQTECyKUSpEgAABAgQICBbGAAECBAgQIFBMQLAoRqkQAQIECBAgIFgYAwQIECBAgEAxAcGiGKVCBAgQIECAgGBhDBAgQIAAAQLFBASLYpQKESBAgAABAoKFMUCA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"

/***/ }),

/***/ "w286":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

var _vue = _interopRequireDefault(__webpack_require__("i7/w"));

var _vuePropertyDecorator = __webpack_require__("YKMj");

var _lodash = _interopRequireDefault(__webpack_require__("XaGS"));

var __decorate = void 0 && (void 0).__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : (0, _typeof2.default)(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var VmUpdater =
/*#__PURE__*/
function (_Vue) {
  (0, _inherits2.default)(VmUpdater, _Vue);

  function VmUpdater() {
    (0, _classCallCheck2.default)(this, VmUpdater);
    return (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(VmUpdater).apply(this, arguments));
  }

  (0, _createClass2.default)(VmUpdater, [{
    key: "mounted",
    value: function mounted() {
      if (this.$options.viewModelProps) {
        this.watchViewModelOptions(this.$options.viewModelProps);
      }
    }
  }, {
    key: "setViewModel",
    value: function setViewModel(viewModel) {
      this.viewModel = viewModel;
    }
  }, {
    key: "watchViewModelOptions",
    value: function watchViewModelOptions(viewModelProps) {
      var _this = this;

      viewModelProps.map(function (item) {
        _this.$watch(item, function (newVal, oldVal) {
          if (!(0, _lodash.default)(newVal, oldVal)) {
            if (item.includes('.')) {
              var itemArr = item.split('.');
              item = itemArr[itemArr.length - 1];
            }

            var setFun = 'set' + item.replace(item[0], item[0].toUpperCase());
            this.viewModel && this.viewModel[setFun](newVal);
          }
        }, {
          deep: true
        });
      });
    }
  }]);
  return VmUpdater;
}(_vue.default);

VmUpdater = __decorate([_vuePropertyDecorator.Component], VmUpdater);
var _default = VmUpdater;
exports.default = _default;

/***/ }),

/***/ "w4Wy":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(__webpack_require__("lwsE"));

var _createClass2 = _interopRequireDefault(__webpack_require__("W8MJ"));

var _possibleConstructorReturn2 = _interopRequireDefault(__webpack_require__("a1gu"));

var _getPrototypeOf2 = _interopRequireDefault(__webpack_require__("Nsbk"));

var _inherits2 = _interopRequireDefault(__webpack_require__("7W2i"));

var _Events2 = __webpack_require__("peoL");

var RestService =
/*#__PURE__*/
function (_Events) {
  (0, _inherits2.default)(RestService, _Events);

  function RestService() {
    var _this;

    (0, _classCallCheck2.default)(this, RestService);
    _this = (0, _possibleConstructorReturn2.default)(this, (0, _getPrototypeOf2.default)(RestService).call(this));
    _this.eventTypes = ['getdatafailed', 'getdatasucceeded'];
    return _this;
  }
  /**
   * @function RestService.prototype.getData
   * @description 请求数据。
   */


  (0, _createClass2.default)(RestService, [{
    key: "getData",
    value: function getData(url, queryInfo) {
      var _this2 = this;

      if (!url) {
        return;
      }

      SuperMap.FetchRequest.get(url, null, {
        withoutFormatSuffix: true
      }).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (!data || !data.data) {
          // 请求失败
          _this2.triggerEvent('getdatafailed', {
            data: data
          });
        } else if (data.data) {
          var res = {};

          if (queryInfo && queryInfo.maxFeatures) {
            var length = queryInfo.maxFeatures;

            if (Object.keys(data.data).length > length) {
              Object.entries(data.data).slice(0, length).forEach(function (item) {
                res[item[0]] = item[1];
              });
            } else {
              res = data.data;
            }
          } else {
            res = data.data;
          }

          _this2.triggerEvent('getdatasucceeded', {
            data: res
          });
        }
      }).catch(function (error) {
        console.log(error);

        _this2.triggerEvent('getdatafailed', {
          error: error
        });
      });
    }
  }]);
  return RestService;
}(_Events2.Events);

exports.default = RestService;

/***/ }),

/***/ "w5PQ":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/vue-loader/lib??vue-loader-options!./src/leaflet/web-map/WebMap.vue?vue&type=template&id=0d7d2bd8&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"sm-component-web-map",attrs:{"id":_vm.target}},[_vm._t("default"),_vm._v(" "),(_vm.spinning)?_c('a-spin',{attrs:{"size":"large","tip":_vm.$t('webmap.loadingTip'),"spinning":_vm.spinning}}):_vm._e()],2)}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/leaflet/web-map/WebMap.vue?vue&type=template&id=0d7d2bd8&
/* concated harmony reexport render */__webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* concated harmony reexport staticRenderFns */__webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });


/***/ }),

/***/ "wTVA":
/***/ (function(module, exports) {

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

module.exports = _arrayWithHoles;

/***/ }),

/***/ "wkBT":
/***/ (function(module, exports) {

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

module.exports = _nonIterableRest;

/***/ }),

/***/ "x2TH":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Event = void 0;

var _Util = __webpack_require__("yW8N");

/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */

/**
 * @name Event
 * @namespace
 * @description 事件处理函数.
 */
var Event = {
  /**
   * @description  A hash table cache of the event observers. Keyed by element._eventCacheID
   * @type {boolean}
   * @default false
   */
  observers: false,

  /**
   * @description KEY_SPACE
   * @type {number}
   * @default 32
   */
  KEY_SPACE: 32,

  /**
   * @description KEY_BACKSPACE
   * @type {number}
   * @default 8
   */
  KEY_BACKSPACE: 8,

  /**
   * @description KEY_TAB
   * @type {number}
   * @default 9
   */
  KEY_TAB: 9,

  /**
   * @description KEY_RETURN
   * @type {number}
   * @default 13
   */
  KEY_RETURN: 13,

  /**
   * @description KEY_ESC
   * @type {number}
   * @default 27
   */
  KEY_ESC: 27,

  /**
   * @description KEY_LEFT
   * @type {number}
   * @default 37
   */
  KEY_LEFT: 37,

  /**
   * @description KEY_UP
   * @type {number}
   * @default 38
   */
  KEY_UP: 38,

  /**
   * @description KEY_RIGHT
   * @type {number}
   * @default 39
   */
  KEY_RIGHT: 39,

  /**
   * @description KEY_DOWN
   * @type {number}
   * @default 40
   */
  KEY_DOWN: 40,

  /**
   * @description KEY_DELETE
   * @type {number}
   * @default 46
   */
  KEY_DELETE: 46,

  /**
   * @description Cross browser event element detection.
   * @param {Event} event - The event
   * @returns {HTMLElement} The element that caused the event
   */
  element: function element(event) {
    return event.target || event.srcElement;
  },

  /**
   * @description Determine whether event was caused by a single touch
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isSingleTouch: function isSingleTouch(event) {
    return event.touches && event.touches.length === 1;
  },

  /**
   * @description Determine whether event was caused by a multi touch
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isMultiTouch: function isMultiTouch(event) {
    return event.touches && event.touches.length > 1;
  },

  /**
   * @description Determine whether event was caused by a left click.
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isLeftClick: function isLeftClick(event) {
    return event.which && event.which === 1 || event.button && event.button === 1;
  },

  /**
   * @description Determine whether event was caused by a right mouse click.
   * @param {Event} event - The event
   * @returns {boolean}
   */
  isRightClick: function isRightClick(event) {
    return event.which && event.which === 3 || event.button && event.button === 2;
  },

  /**
   * @description Stops an event from propagating.
   * @param {Event} event - The event
   * @param {boolean} allowDefault - If true, we stop the event chain but still allow the default browser  behaviour (text selection, radio-button clicking, etc) Default false
   */
  stop: function stop(event, allowDefault) {
    if (!allowDefault) {
      if (event.preventDefault) {
        event.preventDefault();
      } else {
        event.returnValue = false;
      }
    }

    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },

  /**
   * @param {Event} event - The event。
   * @param {string} tagName - html 标签名。
   * @returns {HTMLElement} The first node with the given tagName, starting from the node the event was triggered on and traversing the DOM upwards
   */
  findElement: function findElement(event, tagName) {
    var element = Event.element(event);

    while (element.parentNode && (!element.tagName || element.tagName.toUpperCase() !== tagName.toUpperCase())) {
      element = element.parentNode;
    }

    return element;
  },

  /**
   * @description 监听事件，注册事件处理方法。
   * @param {(HTMLElement|string)} elementParam - 待监听的 DOM 对象或者其 ID 标识。
   * @param {string} name - 监听事件的类别名称。
   * @param {function} observer - 注册的事件处理方法。
   * @param {boolean} [useCapture=false] - 是否捕获。
   */
  observe: function observe(elementParam, name, observer, useCapture) {
    var element = _Util.Util.getElement(elementParam);

    useCapture = useCapture || false;

    if (name === 'keypress' && (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.attachEvent)) {
      name = 'keydown';
    }

    if (!this.observers) {
      this.observers = {};
    }

    if (!element._eventCacheID) {
      var idPrefix = 'eventCacheID_';

      if (element.id) {
        idPrefix = element.id + '_' + idPrefix;
      }

      element._eventCacheID = _Util.Util.createUniqueID(idPrefix);
    }

    var cacheID = element._eventCacheID;

    if (!this.observers[cacheID]) {
      this.observers[cacheID] = [];
    }

    this.observers[cacheID].push({
      element: element,
      name: name,
      observer: observer,
      useCapture: useCapture
    });

    if (element.addEventListener) {
      if (name === 'mousewheel') {
        // https://www.chromestatus.com/features/6662647093133312
        element.addEventListener(name, observer, {
          useCapture: useCapture,
          passive: false
        });
      } else {
        element.addEventListener(name, observer, useCapture);
      }
    } else if (element.attachEvent) {
      element.attachEvent('on' + name, observer);
    }
  },

  /**
   * @description Given the id of an element to stop observing, cycle through the
   *   element's cached observers, calling stopObserving on each one,
   *   skipping those entries which can no longer be removed.
   *
   * @param {(HTMLElement|string)} elementParam -
   */
  stopObservingElement: function stopObservingElement(elementParam) {
    var element = _Util.Util.getElement(elementParam);

    var cacheID = element._eventCacheID;

    this._removeElementObservers(Event.observers[cacheID]);
  },

  /**
   * @param {Array.<Object>} elementObservers - Array of (element, name,
   *                                         observer, usecapture) objects,
   *                                         taken directly from hashtable
   */
  _removeElementObservers: function _removeElementObservers(elementObservers) {
    if (elementObservers) {
      for (var i = elementObservers.length - 1; i >= 0; i--) {
        var entry = elementObservers[i];
        var args = [entry.element, entry.name, entry.observer, entry.useCapture];
        Event.stopObserving.apply(this, args);
      }
    }
  },

  /**
   * @description 移除事件监听和注册的事件处理方法。注意：事件的移除和监听相对应，移除时的各属性信息必须监听时
   * 保持一致才能确保事件移除成功。
   * @param {(HTMLElement|string)} elementParam - 被监听的 DOM 元素或者其 ID。
   * @param {string} name - 需要移除的被监听事件名称。
   * @param {function} observer - 需要移除的事件处理方法。
   * @param {boolean} [useCapture=false] - 是否捕获。
   * @returns {boolean} Whether or not the event observer was removed
   */
  stopObserving: function stopObserving(elementParam, name, observer, useCapture) {
    useCapture = useCapture || false;

    var element = _Util.Util.getElement(elementParam);

    var cacheID = element._eventCacheID;

    if (name === 'keypress') {
      if (navigator.appVersion.match(/Konqueror|Safari|KHTML/) || element.detachEvent) {
        name = 'keydown';
      }
    } // find element's entry in this.observers cache and remove it


    var foundEntry = false;
    var elementObservers = Event.observers[cacheID];

    if (elementObservers) {
      // find the specific event type in the element's list
      var i = 0;

      while (!foundEntry && i < elementObservers.length) {
        var cacheEntry = elementObservers[i];

        if (cacheEntry.name === name && cacheEntry.observer === observer && cacheEntry.useCapture === useCapture) {
          elementObservers.splice(i, 1);

          if (elementObservers.length === 0) {
            delete Event.observers[cacheID];
          }

          foundEntry = true;
          break;
        }

        i++;
      }
    } // actually remove the event listener from browser


    if (foundEntry) {
      if (element.removeEventListener) {
        element.removeEventListener(name, observer, useCapture);
      } else if (element && element.detachEvent) {
        element.detachEvent('on' + name, observer);
      }
    }

    return foundEntry;
  },

  /**
   * @description Cycle through all the element entries in the events cache and call
   *   stopObservingElement on each.
   */
  unloadCache: function unloadCache() {
    // created
    if (Event && Event.observers) {
      for (var cacheID in Event.observers) {
        var elementObservers = Event.observers[cacheID];

        Event._removeElementObservers.apply(this, [elementObservers]);
      }

      Event.observers = false;
    }
  },
  CLASS_NAME: 'Event'
};
/* prevent memory leaks in IE */

exports.Event = Event;
Event.observe(window, 'unload', Event.unloadCache, false);

/***/ }),

/***/ "yLpj":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "yW8N":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Util = void 0;

var _typeof2 = _interopRequireDefault(__webpack_require__("cDf5"));

/* Copyright© 2000 - 2019 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html. */
var Util = {};
/**
 * @name Util
 * @namespace
 * @category BaseTypes Util
 * @description common 工具类。
 */

exports.Util = Util;

Util.extend = function (destination, source) {
  destination = destination || {};

  if (source) {
    for (var property in source) {
      var value = source[property];

      if (value !== undefined) {
        destination[property] = value;
      }
    }

    var sourceIsEvt = typeof window.Event === 'function' && source instanceof window.Event;

    if (!sourceIsEvt && source.hasOwnProperty && source.hasOwnProperty('toString')) {
      destination.toString = source.toString;
    }
  }

  return destination;
};
/**
 * @description 对象拷贝。
 * @param {Object} [des] - 目标对象。
 * @param {Object} soc - 源对象。
 */


Util.copy = function (des, soc) {
  des = des || {};
  var v;

  if (soc) {
    for (var p in des) {
      v = soc[p];

      if (typeof v !== 'undefined') {
        des[p] = v;
      }
    }
  }
};
/**
 * @description 销毁对象，将其属性置空。
 * @param {Object} [obj] - 目标对象。
 */


Util.reset = function (obj) {
  obj = obj || {};

  for (var p in obj) {
    if (obj.hasOwnProperty(p)) {
      if ((0, _typeof2.default)(obj[p]) === 'object' && obj[p] instanceof Array) {
        for (var i in obj[p]) {
          if (obj[p][i].destroy) {
            obj[p][i].destroy();
          }
        }

        obj[p].length = 0;
      } else if ((0, _typeof2.default)(obj[p]) === 'object' && obj[p] instanceof Object) {
        if (obj[p].destroy) {
          obj[p].destroy();
        }
      }

      obj[p] = null;
    }
  }
};
/**
 * @description 获取 HTML 元素数组。
 * @returns {Array.<HTMLElement>} HTML 元素数组。
 */


Util.getElement = function () {
  var elements = [];

  for (var i = 0, len = arguments.length; i < len; i++) {
    var element = arguments[i];

    if (typeof element === 'string') {
      element = document.getElementById(element);
    }

    if (arguments.length === 1) {
      return element;
    }

    elements.push(element);
  }

  return elements;
};
/**
 * @description instance of 的跨浏览器实现。
 * @param {Object} o - 对象。
 * @returns {boolean} 是否是页面元素。
 */


Util.isElement = function (o) {
  return !!(o && o.nodeType === 1);
};
/**
 * @description 判断一个对象是否是数组。
 * @param {Object} a - 对象。
 * @returns {boolean} 是否是数组。
 */


Util.isArray = function (a) {
  return Object.prototype.toString.call(a) === '[object Array]';
};
/**
 * @description 从数组中删除某一项。
 * @param {Array} array - 数组。
 * @param {Object} item - 数组中要删除的一项。
 * @returns {Array} 执行删除操作后的数组。
 */


Util.removeItem = function (array, item) {
  for (var i = array.length - 1; i >= 0; i--) {
    if (array[i] === item) {
      array.splice(i, 1);
    }
  }

  return array;
};
/**
 * @description 获取某对象再数组中的索引值。
 * @param {Array} array - 数组。
 * @param {Object} obj - 对象。
 * @returns {number} 某对象再数组中的索引值。
 */


Util.indexOf = function (array, obj) {
  if (array == null) {
    return -1;
  } else {
    // use the build-in function if available.
    if (typeof array.indexOf === 'function') {
      return array.indexOf(obj);
    } else {
      for (var i = 0, len = array.length; i < len; i++) {
        if (array[i] === obj) {
          return i;
        }
      }

      return -1;
    }
  }
};

Util.getElement = function () {
  var elements = [];

  for (var i = 0, len = arguments.length; i < len; i++) {
    var element = arguments[i];

    if (typeof element === 'string') {
      element = document.getElementById(element);
    }

    if (arguments.length === 1) {
      return element;
    }

    elements.push(element);
  }

  return elements;
};

Util.lastSeqID = 0;

Util.createUniqueID = function (prefix) {
  if (prefix == null) {
    prefix = 'id_';
  }

  Util.lastSeqID += 1;
  return prefix + Util.lastSeqID;
};

/***/ }),

/***/ "ydGV":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__("TqRt");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _theme = _interopRequireDefault(__webpack_require__("bCOg"));

var _borderConfig = _interopRequireDefault(__webpack_require__("W6Z/"));

var _lodash = _interopRequireDefault(__webpack_require__("9csQ"));

var _resizeDetector = __webpack_require__("QG5D");

var _debounce = _interopRequireDefault(__webpack_require__("sEfC"));

//
//
//
//
//
//
//
//
var _default = {
  name: 'SmBorder',
  mixins: [_theme.default],
  props: {
    // border的类型
    type: {
      type: [String],
      default: 'border1'
    }
  },
  data: function data() {
    return {
      borderId: (0, _lodash.default)("".concat(this.$options.name.toLowerCase(), "-")),
      // content的位置大小
      position: {
        top: 0,
        left: 0,
        width: 0,
        height: 0
      },
      // 上右下左的边距
      borderEdge: [],
      // border的宽度
      borderWidth: [],
      // border组件的宽高
      width: 0,
      height: 0
    };
  },
  computed: {
    borderStyle: function borderStyle() {
      var borderImageSlice = this.borderWidth.join(' ') + ' fill';
      var borderWidth = this.borderWidth.join('px ') + 'px';

      var borderImage = __webpack_require__("cV8Z")("./".concat(this.type, ".png"));

      return {
        borderWidth: borderWidth,
        // 当图片大小超过8KB, webpack就不会转换成base64, 直接引入时路径出错（此时的图片路径在index.html下？）
        // borderImage: `url(./assets/image/${this.type}.png)`,
        borderImage: 'url(' + borderImage + ') ' + borderImageSlice + ' / 1 / 0 stretch'
      };
    },
    contentStyle: function contentStyle() {
      var contentStyle = Object.assign({}, this.position);

      for (var key in contentStyle) {
        contentStyle[key] = contentStyle[key] + 'px';
      }

      return contentStyle;
    }
  },
  watch: {
    // type变化了，需要读取对应的配置，重新计算位置大小
    type: function type() {
      this.setPosition();
    }
  },
  mounted: function mounted() {
    this.setPosition();
    this.resizeHanlder = (0, _debounce.default)(this.calcPosition.bind(this), 500);
    (0, _resizeDetector.addListener)(this.$el, this.resizeHanlder);
  },
  updated: function updated() {
    // 避免style.width< borderWidth，引起的dom重绘, 宽高会改变, 需要重新计算组件的位置大小
    this.calcPosition();
  },
  beforeDestroy: function beforeDestroy() {
    (0, _resizeDetector.removeListener)(this.$el, this.resizeHandler);
  },
  methods: {
    // 设置content的位置大小
    setPosition: function setPosition() {
      var borderConfig = _borderConfig.default[this.type];
      this.borderEdge = borderConfig.borderEdge;
      this.borderWidth = borderConfig.borderWidth;
      this.calcPosition();
    },
    // 计算content的top,left,width,height
    calcPosition: function calcPosition() {
      // 设置总宽高
      this.setWidthHeight();
      var _this$borderEdge = this.borderEdge,
          top = _this$borderEdge.top,
          left = _this$borderEdge.left,
          bottom = _this$borderEdge.bottom,
          right = _this$borderEdge.right; // 由于定位是相当于content-width来定位， 所以要减去border的宽度(left和 top)

      this.position.left = left - this.borderWidth[3];
      this.position.top = top - this.borderWidth[0]; // 内容的宽度 = 总的宽度 - 总的边距

      this.position.width = this.width - left - right;
      this.position.height = this.height - top - bottom;
    },
    // 设置宽高
    setWidthHeight: function setWidthHeight() {
      if (this.$refs[this.borderId]) {
        this.width = this.$refs[this.borderId].offsetWidth;
        this.height = this.$refs[this.borderId].offsetHeight;
      }
    }
  }
};
exports.default = _default;

/***/ }),

/***/ "zT9C":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, module) {/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as the size to enable large array optimizations. */
var LARGE_ARRAY_SIZE = 200;

/** Used to stand-in for `undefined` hash values. */
var HASH_UNDEFINED = '__lodash_hash_undefined__';

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    promiseTag = '[object Promise]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    symbolTag = '[object Symbol]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    dataViewTag = '[object DataView]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/**
 * Used to match `RegExp`
 * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
 */
var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/** Used to detect host constructors (Safari). */
var reIsHostCtor = /^\[object .+?Constructor\]$/;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
cloneableTags[boolTag] = cloneableTags[dateTag] =
cloneableTags[float32Tag] = cloneableTags[float64Tag] =
cloneableTags[int8Tag] = cloneableTags[int16Tag] =
cloneableTags[int32Tag] = cloneableTags[mapTag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[setTag] =
cloneableTags[stringTag] = cloneableTags[symbolTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[weakMapTag] = false;

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/** Detect free variable `exports`. */
var freeExports =  true && exports && !exports.nodeType && exports;

/** Detect free variable `module`. */
var freeModule = freeExports && typeof module == 'object' && module && !module.nodeType && module;

/** Detect the popular CommonJS extension `module.exports`. */
var moduleExports = freeModule && freeModule.exports === freeExports;

/**
 * Adds the key-value `pair` to `map`.
 *
 * @private
 * @param {Object} map The map to modify.
 * @param {Array} pair The key-value pair to add.
 * @returns {Object} Returns `map`.
 */
function addMapEntry(map, pair) {
  // Don't return `map.set` because it's not chainable in IE 11.
  map.set(pair[0], pair[1]);
  return map;
}

/**
 * Adds `value` to `set`.
 *
 * @private
 * @param {Object} set The set to modify.
 * @param {*} value The value to add.
 * @returns {Object} Returns `set`.
 */
function addSetEntry(set, value) {
  // Don't return `set.add` because it's not chainable in IE 11.
  set.add(value);
  return set;
}

/**
 * A specialized version of `_.forEach` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array ? array.length : 0;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

/**
 * Appends the elements of `values` to `array`.
 *
 * @private
 * @param {Array} array The array to modify.
 * @param {Array} values The values to append.
 * @returns {Array} Returns `array`.
 */
function arrayPush(array, values) {
  var index = -1,
      length = values.length,
      offset = array.length;

  while (++index < length) {
    array[offset + index] = values[index];
  }
  return array;
}

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Gets the value at `key` of `object`.
 *
 * @private
 * @param {Object} [object] The object to query.
 * @param {string} key The key of the property to get.
 * @returns {*} Returns the property value.
 */
function getValue(object, key) {
  return object == null ? undefined : object[key];
}

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Converts `map` to its key-value pairs.
 *
 * @private
 * @param {Object} map The map to convert.
 * @returns {Array} Returns the key-value pairs.
 */
function mapToArray(map) {
  var index = -1,
      result = Array(map.size);

  map.forEach(function(value, key) {
    result[++index] = [key, value];
  });
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/**
 * Converts `set` to an array of its values.
 *
 * @private
 * @param {Object} set The set to convert.
 * @returns {Array} Returns the values.
 */
function setToArray(set) {
  var index = -1,
      result = Array(set.size);

  set.forEach(function(value) {
    result[++index] = value;
  });
  return result;
}

/** Used for built-in method references. */
var arrayProto = Array.prototype,
    funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to detect overreaching core-js shims. */
var coreJsData = root['__core-js_shared__'];

/** Used to detect methods masquerading as native. */
var maskSrcKey = (function() {
  var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
  return uid ? ('Symbol(src)_1.' + uid) : '';
}());

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Used to detect if a method is native. */
var reIsNative = RegExp('^' +
  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/** Built-in value references. */
var Buffer = moduleExports ? root.Buffer : undefined,
    Symbol = root.Symbol,
    Uint8Array = root.Uint8Array,
    getPrototype = overArg(Object.getPrototypeOf, Object),
    objectCreate = Object.create,
    propertyIsEnumerable = objectProto.propertyIsEnumerable,
    splice = arrayProto.splice;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeGetSymbols = Object.getOwnPropertySymbols,
    nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined,
    nativeKeys = overArg(Object.keys, Object);

/* Built-in method references that are verified to be native. */
var DataView = getNative(root, 'DataView'),
    Map = getNative(root, 'Map'),
    Promise = getNative(root, 'Promise'),
    Set = getNative(root, 'Set'),
    WeakMap = getNative(root, 'WeakMap'),
    nativeCreate = getNative(Object, 'create');

/** Used to detect maps, sets, and weakmaps. */
var dataViewCtorString = toSource(DataView),
    mapCtorString = toSource(Map),
    promiseCtorString = toSource(Promise),
    setCtorString = toSource(Set),
    weakMapCtorString = toSource(WeakMap);

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;

/**
 * Creates a hash object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Hash(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the hash.
 *
 * @private
 * @name clear
 * @memberOf Hash
 */
function hashClear() {
  this.__data__ = nativeCreate ? nativeCreate(null) : {};
}

/**
 * Removes `key` and its value from the hash.
 *
 * @private
 * @name delete
 * @memberOf Hash
 * @param {Object} hash The hash to modify.
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function hashDelete(key) {
  return this.has(key) && delete this.__data__[key];
}

/**
 * Gets the hash value for `key`.
 *
 * @private
 * @name get
 * @memberOf Hash
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function hashGet(key) {
  var data = this.__data__;
  if (nativeCreate) {
    var result = data[key];
    return result === HASH_UNDEFINED ? undefined : result;
  }
  return hasOwnProperty.call(data, key) ? data[key] : undefined;
}

/**
 * Checks if a hash value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Hash
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function hashHas(key) {
  var data = this.__data__;
  return nativeCreate ? data[key] !== undefined : hasOwnProperty.call(data, key);
}

/**
 * Sets the hash `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Hash
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the hash instance.
 */
function hashSet(key, value) {
  var data = this.__data__;
  data[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
  return this;
}

// Add methods to `Hash`.
Hash.prototype.clear = hashClear;
Hash.prototype['delete'] = hashDelete;
Hash.prototype.get = hashGet;
Hash.prototype.has = hashHas;
Hash.prototype.set = hashSet;

/**
 * Creates an list cache object.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function ListCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the list cache.
 *
 * @private
 * @name clear
 * @memberOf ListCache
 */
function listCacheClear() {
  this.__data__ = [];
}

/**
 * Removes `key` and its value from the list cache.
 *
 * @private
 * @name delete
 * @memberOf ListCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function listCacheDelete(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    return false;
  }
  var lastIndex = data.length - 1;
  if (index == lastIndex) {
    data.pop();
  } else {
    splice.call(data, index, 1);
  }
  return true;
}

/**
 * Gets the list cache value for `key`.
 *
 * @private
 * @name get
 * @memberOf ListCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function listCacheGet(key) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  return index < 0 ? undefined : data[index][1];
}

/**
 * Checks if a list cache value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf ListCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function listCacheHas(key) {
  return assocIndexOf(this.__data__, key) > -1;
}

/**
 * Sets the list cache `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf ListCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the list cache instance.
 */
function listCacheSet(key, value) {
  var data = this.__data__,
      index = assocIndexOf(data, key);

  if (index < 0) {
    data.push([key, value]);
  } else {
    data[index][1] = value;
  }
  return this;
}

// Add methods to `ListCache`.
ListCache.prototype.clear = listCacheClear;
ListCache.prototype['delete'] = listCacheDelete;
ListCache.prototype.get = listCacheGet;
ListCache.prototype.has = listCacheHas;
ListCache.prototype.set = listCacheSet;

/**
 * Creates a map cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function MapCache(entries) {
  var index = -1,
      length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    var entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

/**
 * Removes all key-value entries from the map.
 *
 * @private
 * @name clear
 * @memberOf MapCache
 */
function mapCacheClear() {
  this.__data__ = {
    'hash': new Hash,
    'map': new (Map || ListCache),
    'string': new Hash
  };
}

/**
 * Removes `key` and its value from the map.
 *
 * @private
 * @name delete
 * @memberOf MapCache
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function mapCacheDelete(key) {
  return getMapData(this, key)['delete'](key);
}

/**
 * Gets the map value for `key`.
 *
 * @private
 * @name get
 * @memberOf MapCache
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function mapCacheGet(key) {
  return getMapData(this, key).get(key);
}

/**
 * Checks if a map value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf MapCache
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function mapCacheHas(key) {
  return getMapData(this, key).has(key);
}

/**
 * Sets the map `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf MapCache
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the map cache instance.
 */
function mapCacheSet(key, value) {
  getMapData(this, key).set(key, value);
  return this;
}

// Add methods to `MapCache`.
MapCache.prototype.clear = mapCacheClear;
MapCache.prototype['delete'] = mapCacheDelete;
MapCache.prototype.get = mapCacheGet;
MapCache.prototype.has = mapCacheHas;
MapCache.prototype.set = mapCacheSet;

/**
 * Creates a stack cache object to store key-value pairs.
 *
 * @private
 * @constructor
 * @param {Array} [entries] The key-value pairs to cache.
 */
function Stack(entries) {
  this.__data__ = new ListCache(entries);
}

/**
 * Removes all key-value entries from the stack.
 *
 * @private
 * @name clear
 * @memberOf Stack
 */
function stackClear() {
  this.__data__ = new ListCache;
}

/**
 * Removes `key` and its value from the stack.
 *
 * @private
 * @name delete
 * @memberOf Stack
 * @param {string} key The key of the value to remove.
 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
 */
function stackDelete(key) {
  return this.__data__['delete'](key);
}

/**
 * Gets the stack value for `key`.
 *
 * @private
 * @name get
 * @memberOf Stack
 * @param {string} key The key of the value to get.
 * @returns {*} Returns the entry value.
 */
function stackGet(key) {
  return this.__data__.get(key);
}

/**
 * Checks if a stack value for `key` exists.
 *
 * @private
 * @name has
 * @memberOf Stack
 * @param {string} key The key of the entry to check.
 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
 */
function stackHas(key) {
  return this.__data__.has(key);
}

/**
 * Sets the stack `key` to `value`.
 *
 * @private
 * @name set
 * @memberOf Stack
 * @param {string} key The key of the value to set.
 * @param {*} value The value to set.
 * @returns {Object} Returns the stack cache instance.
 */
function stackSet(key, value) {
  var cache = this.__data__;
  if (cache instanceof ListCache) {
    var pairs = cache.__data__;
    if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
      pairs.push([key, value]);
      return this;
    }
    cache = this.__data__ = new MapCache(pairs);
  }
  cache.set(key, value);
  return this;
}

// Add methods to `Stack`.
Stack.prototype.clear = stackClear;
Stack.prototype['delete'] = stackDelete;
Stack.prototype.get = stackGet;
Stack.prototype.has = stackHas;
Stack.prototype.set = stackSet;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * Gets the index at which the `key` is found in `array` of key-value pairs.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {*} key The key to search for.
 * @returns {number} Returns the index of the matched value, else `-1`.
 */
function assocIndexOf(array, key) {
  var length = array.length;
  while (length--) {
    if (eq(array[length][0], key)) {
      return length;
    }
  }
  return -1;
}

/**
 * The base implementation of `_.assign` without support for multiple sources
 * or `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @returns {Object} Returns `object`.
 */
function baseAssign(object, source) {
  return object && copyObject(source, keys(source), object);
}

/**
 * The base implementation of `_.clone` and `_.cloneDeep` which tracks
 * traversed objects.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {boolean} [isFull] Specify a clone including symbols.
 * @param {Function} [customizer] The function to customize cloning.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The parent object of `value`.
 * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, isFull, customizer, key, object, stack) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object, stack) : customizer(value);
  }
  if (result !== undefined) {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return copyArray(value, result);
    }
  } else {
    var tag = getTag(value),
        isFunc = tag == funcTag || tag == genTag;

    if (isBuffer(value)) {
      return cloneBuffer(value, isDeep);
    }
    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      if (isHostObject(value)) {
        return object ? value : {};
      }
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return copySymbols(value, baseAssign(result, value));
      }
    } else {
      if (!cloneableTags[tag]) {
        return object ? value : {};
      }
      result = initCloneByTag(value, tag, baseClone, isDeep);
    }
  }
  // Check for circular references and return its corresponding clone.
  stack || (stack = new Stack);
  var stacked = stack.get(value);
  if (stacked) {
    return stacked;
  }
  stack.set(value, result);

  if (!isArr) {
    var props = isFull ? getAllKeys(value) : keys(value);
  }
  arrayEach(props || value, function(subValue, key) {
    if (props) {
      key = subValue;
      subValue = value[key];
    }
    // Recursively populate clone (susceptible to call stack limits).
    assignValue(result, key, baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
  });
  return result;
}

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(proto) {
  return isObject(proto) ? objectCreate(proto) : {};
}

/**
 * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
 * `keysFunc` and `symbolsFunc` to get the enumerable property names and
 * symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @param {Function} symbolsFunc The function to get the symbols of `object`.
 * @returns {Array} Returns the array of property names and symbols.
 */
function baseGetAllKeys(object, keysFunc, symbolsFunc) {
  var result = keysFunc(object);
  return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
}

/**
 * The base implementation of `getTag`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
function baseGetTag(value) {
  return objectToString.call(value);
}

/**
 * The base implementation of `_.isNative` without bad shim checks.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function,
 *  else `false`.
 */
function baseIsNative(value) {
  if (!isObject(value) || isMasked(value)) {
    return false;
  }
  var pattern = (isFunction(value) || isHostObject(value)) ? reIsNative : reIsHostCtor;
  return pattern.test(toSource(value));
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a clone of  `buffer`.
 *
 * @private
 * @param {Buffer} buffer The buffer to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Buffer} Returns the cloned buffer.
 */
function cloneBuffer(buffer, isDeep) {
  if (isDeep) {
    return buffer.slice();
  }
  var result = new buffer.constructor(buffer.length);
  buffer.copy(result);
  return result;
}

/**
 * Creates a clone of `arrayBuffer`.
 *
 * @private
 * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function cloneArrayBuffer(arrayBuffer) {
  var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
  new Uint8Array(result).set(new Uint8Array(arrayBuffer));
  return result;
}

/**
 * Creates a clone of `dataView`.
 *
 * @private
 * @param {Object} dataView The data view to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned data view.
 */
function cloneDataView(dataView, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
  return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
}

/**
 * Creates a clone of `map`.
 *
 * @private
 * @param {Object} map The map to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned map.
 */
function cloneMap(map, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(mapToArray(map), true) : mapToArray(map);
  return arrayReduce(array, addMapEntry, new map.constructor);
}

/**
 * Creates a clone of `regexp`.
 *
 * @private
 * @param {Object} regexp The regexp to clone.
 * @returns {Object} Returns the cloned regexp.
 */
function cloneRegExp(regexp) {
  var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

/**
 * Creates a clone of `set`.
 *
 * @private
 * @param {Object} set The set to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned set.
 */
function cloneSet(set, isDeep, cloneFunc) {
  var array = isDeep ? cloneFunc(setToArray(set), true) : setToArray(set);
  return arrayReduce(array, addSetEntry, new set.constructor);
}

/**
 * Creates a clone of the `symbol` object.
 *
 * @private
 * @param {Object} symbol The symbol object to clone.
 * @returns {Object} Returns the cloned symbol object.
 */
function cloneSymbol(symbol) {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

/**
 * Creates a clone of `typedArray`.
 *
 * @private
 * @param {Object} typedArray The typed array to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the cloned typed array.
 */
function cloneTypedArray(typedArray, isDeep) {
  var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
  return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
}

/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function copyArray(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Copies own symbol properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy symbols from.
 * @param {Object} [object={}] The object to copy symbols to.
 * @returns {Object} Returns `object`.
 */
function copySymbols(source, object) {
  return copyObject(source, getSymbols(source), object);
}

/**
 * Creates an array of own enumerable property names and symbols of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names and symbols.
 */
function getAllKeys(object) {
  return baseGetAllKeys(object, keys, getSymbols);
}

/**
 * Gets the data for `map`.
 *
 * @private
 * @param {Object} map The map to query.
 * @param {string} key The reference key.
 * @returns {*} Returns the map data.
 */
function getMapData(map, key) {
  var data = map.__data__;
  return isKeyable(key)
    ? data[typeof key == 'string' ? 'string' : 'hash']
    : data.map;
}

/**
 * Gets the native function at `key` of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {string} key The key of the method to get.
 * @returns {*} Returns the function if it's native, else `undefined`.
 */
function getNative(object, key) {
  var value = getValue(object, key);
  return baseIsNative(value) ? value : undefined;
}

/**
 * Creates an array of the own enumerable symbol properties of `object`.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of symbols.
 */
var getSymbols = nativeGetSymbols ? overArg(nativeGetSymbols, Object) : stubArray;

/**
 * Gets the `toStringTag` of `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @returns {string} Returns the `toStringTag`.
 */
var getTag = baseGetTag;

// Fallback for data views, maps, sets, and weak maps in IE 11,
// for data views in Edge < 14, and promises in Node.js.
if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
    (Map && getTag(new Map) != mapTag) ||
    (Promise && getTag(Promise.resolve()) != promiseTag) ||
    (Set && getTag(new Set) != setTag) ||
    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
  getTag = function(value) {
    var result = objectToString.call(value),
        Ctor = result == objectTag ? value.constructor : undefined,
        ctorString = Ctor ? toSource(Ctor) : undefined;

    if (ctorString) {
      switch (ctorString) {
        case dataViewCtorString: return dataViewTag;
        case mapCtorString: return mapTag;
        case promiseCtorString: return promiseTag;
        case setCtorString: return setTag;
        case weakMapCtorString: return weakMapTag;
      }
    }
    return result;
  };
}

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = array.constructor(length);

  // Add properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  return (typeof object.constructor == 'function' && !isPrototype(object))
    ? baseCreate(getPrototype(object))
    : {};
}

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {Function} cloneFunc The function to clone values.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, cloneFunc, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return cloneArrayBuffer(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case dataViewTag:
      return cloneDataView(object, isDeep);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      return cloneTypedArray(object, isDeep);

    case mapTag:
      return cloneMap(object, isDeep, cloneFunc);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      return cloneRegExp(object);

    case setTag:
      return cloneSet(object, isDeep, cloneFunc);

    case symbolTag:
      return cloneSymbol(object);
  }
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is suitable for use as unique object key.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
 */
function isKeyable(value) {
  var type = typeof value;
  return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
    ? (value !== '__proto__')
    : (value === null);
}

/**
 * Checks if `func` has its source masked.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is masked, else `false`.
 */
function isMasked(func) {
  return !!maskSrcKey && (maskSrcKey in func);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Converts `func` to its source code.
 *
 * @private
 * @param {Function} func The function to process.
 * @returns {string} Returns the source code.
 */
function toSource(func) {
  if (func != null) {
    try {
      return funcToString.call(func);
    } catch (e) {}
    try {
      return (func + '');
    } catch (e) {}
  }
  return '';
}

/**
 * This method is like `_.clone` except that it recursively clones `value`.
 *
 * @static
 * @memberOf _
 * @since 1.0.0
 * @category Lang
 * @param {*} value The value to recursively clone.
 * @returns {*} Returns the deep cloned value.
 * @see _.clone
 * @example
 *
 * var objects = [{ 'a': 1 }, { 'b': 2 }];
 *
 * var deep = _.cloneDeep(objects);
 * console.log(deep[0] === objects[0]);
 * // => false
 */
function cloneDeep(value) {
  return baseClone(value, true, true);
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is a buffer.
 *
 * @static
 * @memberOf _
 * @since 4.3.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
 * @example
 *
 * _.isBuffer(new Buffer(2));
 * // => true
 *
 * _.isBuffer(new Uint8Array(2));
 * // => false
 */
var isBuffer = nativeIsBuffer || stubFalse;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns a new empty array.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {Array} Returns the new empty array.
 * @example
 *
 * var arrays = _.times(2, _.stubArray);
 *
 * console.log(arrays);
 * // => [[], []]
 *
 * console.log(arrays[0] === arrays[1]);
 * // => false
 */
function stubArray() {
  return [];
}

/**
 * This method returns `false`.
 *
 * @static
 * @memberOf _
 * @since 4.13.0
 * @category Util
 * @returns {boolean} Returns `false`.
 * @example
 *
 * _.times(2, _.stubFalse);
 * // => [false, false]
 */
function stubFalse() {
  return false;
}

module.exports = cloneDeep;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("yLpj"), __webpack_require__("YuTi")(module)))

/***/ })

/******/ })["default"];
});