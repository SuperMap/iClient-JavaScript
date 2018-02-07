import {SuperMap} from '../SuperMap';
import {Format} from './Format';
import {StringExt} from '../commontypes/BaseTypes';
import {Vector} from '../commontypes/Vector';
import {Point} from '../commontypes/geometry/Point';
import {MultiPoint} from '../commontypes/geometry/MultiPoint';
import {LineString} from '../commontypes/geometry/LineString';
import {MultiLineString} from '../commontypes/geometry/MultiLineString';
import {LinearRing} from '../commontypes/geometry/LinearRing';
import {Polygon} from '../commontypes/geometry/Polygon';
import {MultiPolygon} from '../commontypes/geometry/MultiPolygon';

/**
 * @class SuperMap.Format.WKT
 * @classdesc 用于读写常见文本的类。通过 <SuperMap.Format.WKT> 构造器来创建一个新
 *      的实例。
 * @category BaseTypes Format
 * @extends SuperMap.Format
 * @param options - {Object} 可选的选项对象，其属性将被设置到实例。option具体配置项继承自{@link SuperMap.Format}
 */
export class WKT extends Format {

    constructor(options) {
        super(options);
        this.regExes = {
            'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            'spaces': /\s+/,
            'parenComma': /\)\s*,\s*\(/,
            'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,  // can't use {2} here
            'trimParens': /^\s*\(?(.*?)\)?\s*$/
        };
        this.CLASS_NAME = "SuperMap.Format.WKT"; /**
         * @private
         * @description Object with properties corresponding to the geometry types.
         * Property values are functions that do the actual data extraction.
         */
        this.extract = {
            /*
             * @description Return a space delimited string of point coordinates.
             * @param {SuperMap.Geometry.Point} point
             * @returns  {String} A string of coordinates representing the point
             */
            'point': function (point) {
                return point.x + ' ' + point.y;
            },

            /*
             * @description  Return a comma delimited string of point coordinates from a multipoint.
             * @param {SuperMap.Geometry.MultiPoint} multipoint
             * @returns  {String} A string of point coordinate strings representing
             *                  the multipoint
             */
            'multipoint'(multipoint) {
                var array = [];
                for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                    array.push('(' +
                        this.extract.point.apply(this, [multipoint.components[i]]) +
                        ')');
                }
                return array.join(',');
            },

            /*
             * @description  Return a comma delimited string of point coordinates from a line.
             * @param {SuperMap.Geometry.LineString} linestring
             * @returns  {String} A string of point coordinate strings representing
             *                  the linestring
             */
            'linestring'(linestring) {
                var array = [];
                for (var i = 0, len = linestring.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [linestring.components[i]]));
                }
                return array.join(',');
            },

            /*
             * @description  Return a comma delimited string of linestring strings from a multilinestring.
             * @param {SuperMap.Geometry.MultiLineString} multilinestring
             * @returns  {String} A string of of linestring strings representing
             *                  the multilinestring
             */
            'multilinestring'(multilinestring) {
                var array = [];
                for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                    array.push('(' +
                        this.extract.linestring.apply(this, [multilinestring.components[i]]) +
                        ')');
                }
                return array.join(',');
            },

            /*
             * @description  Return a comma delimited string of linear ring arrays from a polygon.
             * @param {SuperMap.Geometry.Polygon} polygon
             * @returns  {String} An array of linear ring arrays representing the polygon
             */
            'polygon'(polygon) {
                var array = [];
                for (var i = 0, len = polygon.components.length; i < len; ++i) {
                    array.push('(' +
                        this.extract.linestring.apply(this, [polygon.components[i]]) +
                        ')');
                }
                return array.join(',');
            },

            /*
             * @description  Return an array of polygon arrays from a multipolygon.
             * @param {SuperMap.Geometry.MultiPolygon} multipolygon
             * @returns  {String} An array of polygon arrays representing
             *                  the multipolygon
             */
            'multipolygon'(multipolygon) {
                var array = [];
                for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                    array.push('(' +
                        this.extract.polygon.apply(this, [multipolygon.components[i]]) +
                        ')');
                }
                return array.join(',');
            },

            /*
             * @description  Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an <SuperMap.Geometry.Collection>
             * @param {SuperMap.Geometry.Collection} collection
             * @returns  {String} internal WKT representation of the collection
             */
            'collection'(collection) {
                var array = [];
                for (var i = 0, len = collection.components.length; i < len; ++i) {
                    array.push(this.extractGeometry.apply(this, [collection.components[i]]));
                }
                return array.join(',');
            }

        };

        /*
         * @private
         * @description Object with properties corresponding to the geometry types.
         * Property values are functions that do the actual parsing.
         */
        this.parse = {
            /*
             * @private
             * @description  Return point feature given a point WKT fragment.
             * @param {String} str A WKT fragment representing the point
             * @returns  {SuperMap.Feature.Vector} A point feature
             *
             */
            'point': function (str) {
                var coords = StringExt.trim(str).split(this.regExes.spaces);
                return new Vector(new Point(coords[0], coords[1])
                );
            },

            /*
             * @description  Return a multipoint feature given a multipoint WKT fragment.
             * @param {String} A WKT fragment representing the multipoint
             * @returns  {SuperMap.Feature.Vector} A multipoint feature
             * @private
             */
            'multipoint': function (str) {
                var point;
                var points = StringExt.trim(str).split(',');
                var components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    point = points[i].replace(this.regExes.trimParens, '$1');
                    components.push(this.parse.point.apply(this, [point]).geometry);
                }
                return new Vector(
                    new MultiPoint(components)
                );
            },

            /*
             * @description  Return a linestring feature given a linestring WKT fragment.
             * @param {String} A WKT fragment representing the linestring
             * @returns  {SuperMap.Feature.Vector} A linestring feature
             * @private
             */
            'linestring': function (str) {
                var points = StringExt.trim(str).split(',');
                var components = [];
                for (var i = 0, len = points.length; i < len; ++i) {
                    components.push(this.parse.point.apply(this, [points[i]]).geometry);
                }
                return new Vector(
                    new LineString(components)
                );
            },

            /*
             * @description  Return a multilinestring feature given a multilinestring WKT fragment.
             * @param {String} A WKT fragment representing the multilinestring
             * @returns  {SuperMap.Feature.Vector} A multilinestring feature
             * @private
             */
            'multilinestring': function (str) {
                var line;
                var lines = StringExt.trim(str).split(this.regExes.parenComma);
                var components = [];
                for (var i = 0, len = lines.length; i < len; ++i) {
                    line = lines[i].replace(this.regExes.trimParens, '$1');
                    components.push(this.parse.linestring.apply(this, [line]).geometry);
                }
                return new Vector(
                    new MultiLineString(components)
                );
            },

            /*
             * @description  Return a polygon feature given a polygon WKT fragment.
             * @param {String} A WKT fragment representing the polygon
             * @returns  {SuperMap.Feature.Vector} A polygon feature
             * @private
             */
            'polygon': function (str) {
                var ring, linestring, linearring;
                var rings = StringExt.trim(str).split(this.regExes.parenComma);
                var components = [];
                for (var i = 0, len = rings.length; i < len; ++i) {
                    ring = rings[i].replace(this.regExes.trimParens, '$1');
                    linestring = this.parse.linestring.apply(this, [ring]).geometry;
                    linearring = new LinearRing(linestring.components);
                    components.push(linearring);
                }
                return new Vector(
                    new Polygon(components)
                );
            },

            /*
             * @private
             * @description  Return a multipolygon feature given a multipolygon WKT fragment.
             * @param {String} A WKT fragment representing the multipolygon
             * @returns  {SuperMap.Feature.Vector} A multipolygon feature
             *
             */
            'multipolygon': function (str) {
                var polygon;
                var polygons = StringExt.trim(str).split(this.regExes.doubleParenComma);
                var components = [];
                for (var i = 0, len = polygons.length; i < len; ++i) {
                    polygon = polygons[i].replace(this.regExes.trimParens, '$1');
                    components.push(this.parse.polygon.apply(this, [polygon]).geometry);
                }
                return new Vector(
                    new MultiPolygon(components)
                );
            },


            /*
             * @description  Return an array of features given a geometrycollection WKT fragment.
             * @param {String} A WKT fragment representing the geometrycollection
             * @returns  {Array} An array of SuperMap.Feature.Vector
             * @private
             */
            'geometrycollection': function (str) {
                // separate components of the collection with |
                str = str.replace(/,\s*([A-Za-z])/g, '|$1');
                var wktArray = StringExt.trim(str).split('|');
                var components = [];
                for (var i = 0, len = wktArray.length; i < len; ++i) {
                    components.push(this.read(wktArray[i]));
                }
                return components;
            }

        };

    }


    /**
     * @function SuperMap.Format.WKT.prototype.read
     * @description Deserialize a WKT string and return a vector feature or an
     * array of vector features.  Supports WKT for POINT, MULTIPOINT,
     * LINESTRING, MULTILINESTRING, POLYGON, MULTIPOLYGON, and
     * GEOMETRYCOLLECTION.
     * @param wkt - {string} A WKT string
     * @returns {SuperMap.Feature.Vector|Array} A feature or array of features for
     * GEOMETRYCOLLECTION WKT.
     */
    read(wkt) {
        var features, type, str;
        wkt = wkt.replace(/[\n\r]/g, " ");
        var matches = this.regExes.typeStr.exec(wkt);
        if (matches) {
            type = matches[1].toLowerCase();
            str = matches[2];
            if (this.parse[type]) {
                features = this.parse[type].apply(this, [str]);
            }
        }
        return features;
    }


    /**
     * @function SuperMap.Format.WKT.prototype.write
     * @description Serialize a feature or array of features into a WKT string.
     * @param features - {SuperMap.Feature.Vector|Array} A feature or array of features
     * @returns {string} The WKT string representation of the input geometries
     */
    write(features) {
        var collection, geometry, isCollection;
        if (features.constructor === Array) {
            collection = features;
            isCollection = true;
        } else {
            collection = [features];
            isCollection = false;
        }
        var pieces = [];
        if (isCollection) {
            pieces.push('GEOMETRYCOLLECTION(');
        }
        for (var i = 0, len = collection.length; i < len; ++i) {
            if (isCollection && i > 0) {
                pieces.push(',');
            }
            geometry = collection[i].geometry;
            pieces.push(this.extractGeometry(geometry));
        }
        if (isCollection) {
            pieces.push(')');
        }
        return pieces.join('');
    }

    /**
     * @function SuperMap.Format.WKT.prototype.extractGeometry
     * @description Entry point to construct the WKT for a single Geometry object.
     * @param geometry - {SuperMap.Geometry}
     * @returns {string} A WKT string of representing the geometry
     */
    extractGeometry(geometry) {
        var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
        if (!this.extract[type]) {
            return null;
        }
        var wktType = type === 'collection' ? 'GEOMETRYCOLLECTION' : type.toUpperCase();
        var data = wktType + '(' + this.extract[type].apply(this, [geometry]) + ')';
        return data;
    }
}

SuperMap.Format.WKT = WKT;