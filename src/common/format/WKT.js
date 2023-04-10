/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
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
 * @class WKTFormat
 * @aliasclass Format.WKT
 * @deprecatedclass SuperMap.Format.WKT
 * @classdesc 用于读写常见文本的类。通过 {@link WKTFormat} 构造器来创建一个新的实例。
 * @category BaseTypes Format
 * @extends {Format}
 * @param {Object} options - 可选的选项对象，其属性将被设置到实例。option 具体配置项继承自 {@link Format}。
 * @usage
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
            /**
             * @description Return a space delimited string of point coordinates.
             * @param {GeometryPoint} point
             * @returns  {string} A string of coordinates representing the point
             */
            'point': function (point) {
                return point.x + ' ' + point.y;
            },

            /**
             * @description  Return a comma delimited string of point coordinates from a multipoint.
             * @param {GeometryMultiPoint} multipoint
             * @returns  {string} A string of point coordinate strings representing
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

            /**
             * @description  Return a comma delimited string of point coordinates from a line.
             * @param {GeometryLineString} linestring
             * @returns  {string} A string of point coordinate strings representing
             *                  the linestring
             */
            'linestring'(linestring) {
                var array = [];
                for (var i = 0, len = linestring.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [linestring.components[i]]));
                }
                return array.join(',');
            },

            /**
             * @description  Return a comma delimited string of linestring strings from a multilinestring.
             * @param {GeometryMultiLineString} multilinestring
             * @returns  {string} A string of of linestring strings representing
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

            /**
             * @description  Return a comma delimited string of linear ring arrays from a polygon.
             * @param {GeometryPolygon} polygon
             * @returns  {string} An array of linear ring arrays representing the polygon
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

            /**
             * @description  Return an array of polygon arrays from a multipolygon.
             * @param {GeometryMultiPolygon} multipolygon
             * @returns  {string} An array of polygon arrays representing
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

            /**
             * @description  Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an <GeometryCollection>
             * @param {GeometryCollection} collection
             * @returns  {string} internal WKT representation of the collection
             */
            'collection'(collection) {
                var array = [];
                for (var i = 0, len = collection.components.length; i < len; ++i) {
                    array.push(this.extractGeometry.apply(this, [collection.components[i]]));
                }
                return array.join(',');
            }

        };

        /**
         * @private
         * @description Object with properties corresponding to the geometry types.
         * Property values are functions that do the actual parsing.
         */
        this.parse = {
            /**
             * @private
             * @description  Return point feature given a point WKT fragment.
             * @param {string} str A WKT fragment representing the point
             * @returns  {FeatureVector} A point feature
             *
             */
            'point': function (str) {
                var coords = StringExt.trim(str).split(this.regExes.spaces);
                return new Vector(new Point(coords[0], coords[1])
                );
            },

            /**
             * @description  Return a multipoint feature given a multipoint WKT fragment.
             * @param {string} A WKT fragment representing the multipoint
             * @returns  {FeatureVector} A multipoint feature
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

            /**
             * @description  Return a linestring feature given a linestring WKT fragment.
             * @param {string} A WKT fragment representing the linestring
             * @returns  {FeatureVector} A linestring feature
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

            /**
             * @description  Return a multilinestring feature given a multilinestring WKT fragment.
             * @param {string} A WKT fragment representing the multilinestring
             * @returns  {FeatureVector} A multilinestring feature
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

            /**
             * @description  Return a polygon feature given a polygon WKT fragment.
             * @param {string} A WKT fragment representing the polygon
             * @returns  {FeatureVector} A polygon feature
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

            /**
             * @private
             * @description  Return a multipolygon feature given a multipolygon WKT fragment.
             * @param {string} A WKT fragment representing the multipolygon
             * @returns  {FeatureVector} A multipolygon feature
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


            /**
             * @description  Return an array of features given a geometrycollection WKT fragment.
             * @param {string} A WKT fragment representing the geometrycollection
             * @returns  {Array} An array of FeatureVector
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
     * @function WKTFormat.prototype.read
     * @description 反序列化 WKT 字符串并返回向量特征或向量特征数组。支持 POINT、MULTIPOINT、LINESTRING、MULTILINESTRING、POLYGON、MULTIPOLYGON 和 GEOMETRYCOLLECTION 的 WKT。
     * @param {string} wkt - WKT 字符串。
     * @returns {FeatureVector|Array} GEOMETRYCOLLECTION WKT 的矢量要素或者矢量要素数组。
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
     * @function WKTFormat.prototype.write
     * @description 将矢量要素或矢量要素数组序列化为 WKT 字符串。
     * @param {(FeatureVector|Array)} features - 矢量要素或矢量要素数组。
     * @returns {string} 表示几何的 WKT 字符串。
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
     * @function WKTFormat.prototype.extractGeometry
     * @description 为单个 Geometry 对象构造 WKT 的入口点。
     * @param {Geometry} geometry - Geometry 对象。
     * @returns {string} 表示几何的 WKT 字符串。
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
