/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
/**
 * @requires SuperMap/Format.js
 * @requires SuperMap/Feature/Vector.js
 */

/**
 * Class: SuperMap.Format.WKT
 * 用于读写常见文本的类。通过 <SuperMap.Format.WKT> 构造器来创建一个新
 *      的实例。
 * 
 * Inherits from:
 *  - <SuperMap.Format>
 */
SuperMap.Format.WKT = SuperMap.Class(SuperMap.Format, {
    
    /**
     * Constructor: SuperMap.Format.WKT
     * 创建一个新的WKT解析器。
     *
     * Parameters:
     * options - {Object} 可选的选项对象，其属性将被设置到实例。
     *
     * Returns:
     * {<SuperMap.Format.WKT>} 新的WKT解析器。
     */
    initialize: function(options) {
        this.regExes = {
            'typeStr': /^\s*(\w+)\s*\(\s*(.*)\s*\)\s*$/,
            'spaces': /\s+/,
            'parenComma': /\)\s*,\s*\(/,
            'doubleParenComma': /\)\s*\)\s*,\s*\(\s*\(/,  // can't use {2} here
            'trimParens': /^\s*\(?(.*?)\)?\s*$/
        };
        SuperMap.Format.prototype.initialize.apply(this, [options]);
    },

    /**
     * Method: read
     * Deserialize a WKT string and return a vector feature or an
     * array of vector features.  Supports WKT for POINT, MULTIPOINT,
     * LINESTRING, MULTILINESTRING, POLYGON, MULTIPOLYGON, and
     * GEOMETRYCOLLECTION.
     *
     * Parameters:
     * wkt - {String} A WKT string
     *
     * Returns:
     * {<SuperMap.Feature.Vector>|Array} A feature or array of features for
     * GEOMETRYCOLLECTION WKT.
     */
    read: function(wkt) {
        var features, type, str;
        wkt = wkt.replace(/[\n\r]/g, " ");
        var matches = this.regExes.typeStr.exec(wkt);
        if(matches) {
            type = matches[1].toLowerCase();
            str = matches[2];
            if(this.parse[type]) {
                features = this.parse[type].apply(this, [str]);
            }
            if (this.internalProjection && this.externalProjection) {
                if (features && 
                    features.CLASS_NAME === "SuperMap.Feature.Vector") {
                    features.geometry.transform(this.externalProjection,
                                                this.internalProjection);
                } else if (features &&
                           type !== "geometrycollection" &&
                           typeof features === "object") {
                    for (var i=0, len=features.length; i<len; i++) {
                        var component = features[i];
                        component.geometry.transform(this.externalProjection,
                                                     this.internalProjection);
                    }
                }
            }
        }    
        return features;
    },

    /**
     * Method: write
     * Serialize a feature or array of features into a WKT string.
     *
     * Parameters:
     * features - {<SuperMap.Feature.Vector>|Array} A feature or array of
     *            features
     *
     * Returns:
     * {String} The WKT string representation of the input geometries
     */
    write: function(features) {
        var collection, geometry, type, data, isCollection;
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
        for (var i=0, len=collection.length; i<len; ++i) {
            if (isCollection && i>0) {
                pieces.push(',');
            }
            geometry = collection[i].geometry;
            pieces.push(this.extractGeometry(geometry));
        }
        if (isCollection) {
            pieces.push(')');
        }
        return pieces.join('');
    },

    /**
     * Method: extractGeometry
     * Entry point to construct the WKT for a single Geometry object.
     *
     * Parameters:
     * geometry - {<SuperMap.Geometry.Geometry>}
     *
     * Returns:
     * {String} A WKT string of representing the geometry
     */
    extractGeometry: function(geometry) {
        var type = geometry.CLASS_NAME.split('.')[2].toLowerCase();
        if (!this.extract[type]) {
            return null;
        }
        if (this.internalProjection && this.externalProjection) {
            geometry = geometry.clone();
            geometry.transform(this.internalProjection, this.externalProjection);
        }                       
        var wktType = type === 'collection' ? 'GEOMETRYCOLLECTION' : type.toUpperCase();
        var data = wktType + '(' + this.extract[type].apply(this, [geometry]) + ')';
        return data;
    },
    
    /**
     * Object with properties corresponding to the geometry types.
     * Property values are functions that do the actual data extraction.
     */
    extract: {
        /**
         * Return a space delimited string of point coordinates.
         * @param {<SuperMap.Geometry.Point>} point
         * @returns {String} A string of coordinates representing the point
         */
        'point': function(point) {
            return point.x + ' ' + point.y;
        },

        /**
         * Return a comma delimited string of point coordinates from a multipoint.
         * @param {<SuperMap.Geometry.MultiPoint>} multipoint
         * @returns {String} A string of point coordinate strings representing
         *                  the multipoint
         */
        'multipoint': function(multipoint) {
            var array = [];
            for(var i=0, len=multipoint.components.length; i<len; ++i) {
                array.push('(' +
                           this.extract.point.apply(this, [multipoint.components[i]]) +
                           ')');
            }
            return array.join(',');
        },
        
        /**
         * Return a comma delimited string of point coordinates from a line.
         * @param {<SuperMap.Geometry.LineString>} linestring
         * @returns {String} A string of point coordinate strings representing
         *                  the linestring
         */
        'linestring': function(linestring) {
            var array = [];
            for(var i=0, len=linestring.components.length; i<len; ++i) {
                array.push(this.extract.point.apply(this, [linestring.components[i]]));
            }
            return array.join(',');
        },

        /**
         * Return a comma delimited string of linestring strings from a multilinestring.
         * @param {<SuperMap.Geometry.MultiLineString>} multilinestring
         * @returns {String} A string of of linestring strings representing
         *                  the multilinestring
         */
        'multilinestring': function(multilinestring) {
            var array = [];
            for(var i=0, len=multilinestring.components.length; i<len; ++i) {
                array.push('(' +
                           this.extract.linestring.apply(this, [multilinestring.components[i]]) +
                           ')');
            }
            return array.join(',');
        },
        
        /**
         * Return a comma delimited string of linear ring arrays from a polygon.
         * @param {<SuperMap.Geometry.Polygon>} polygon
         * @returns {String} An array of linear ring arrays representing the polygon
         */
        'polygon': function(polygon) {
            var array = [];
            for(var i=0, len=polygon.components.length; i<len; ++i) {
                array.push('(' +
                           this.extract.linestring.apply(this, [polygon.components[i]]) +
                           ')');
            }
            return array.join(',');
        },

        /**
         * Return an array of polygon arrays from a multipolygon.
         * @param {<SuperMap.Geometry.MultiPolygon>} multipolygon
         * @returns {String} An array of polygon arrays representing
         *                  the multipolygon
         */
        'multipolygon': function(multipolygon) {
            var array = [];
            for(var i=0, len=multipolygon.components.length; i<len; ++i) {
                array.push('(' +
                           this.extract.polygon.apply(this, [multipolygon.components[i]]) +
                           ')');
            }
            return array.join(',');
        },

        /**
         * Return the WKT portion between 'GEOMETRYCOLLECTION(' and ')' for an <SuperMap.Geometry.Collection>
         * @param {<SuperMap.Geometry.Collection>} collection
         * @returns {String} internal WKT representation of the collection
         */
        'collection': function(collection) {
            var array = [];
            for(var i=0, len=collection.components.length; i<len; ++i) {
                array.push(this.extractGeometry.apply(this, [collection.components[i]]));
            }
            return array.join(',');
        }

    },

    /**
     * Object with properties corresponding to the geometry types.
     * Property values are functions that do the actual parsing.
     */
    parse: {
        /**
         * Return point feature given a point WKT fragment.
         * @param {String} str A WKT fragment representing the point
         * @returns {<SuperMap.Feature.Vector>} A point feature
         * @private
         */
        'point': function(str) {
            var coords = SuperMap.String.trim(str).split(this.regExes.spaces);
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.Point(coords[0], coords[1])
            );
        },

        /**
         * Return a multipoint feature given a multipoint WKT fragment.
         * @param {String} A WKT fragment representing the multipoint
         * @returns {<SuperMap.Feature.Vector>} A multipoint feature
         * @private
         */
        'multipoint': function(str) {
            var point;
            var points = SuperMap.String.trim(str).split(',');
            var components = [];
            for(var i=0, len=points.length; i<len; ++i) {
                point = points[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.point.apply(this, [point]).geometry);
            }
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.MultiPoint(components)
            );
        },
        
        /**
         * Return a linestring feature given a linestring WKT fragment.
         * @param {String} A WKT fragment representing the linestring
         * @returns {<SuperMap.Feature.Vector>} A linestring feature
         * @private
         */
        'linestring': function(str) {
            var points = SuperMap.String.trim(str).split(',');
            var components = [];
            for(var i=0, len=points.length; i<len; ++i) {
                components.push(this.parse.point.apply(this, [points[i]]).geometry);
            }
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.LineString(components)
            );
        },

        /**
         * Return a multilinestring feature given a multilinestring WKT fragment.
         * @param {String} A WKT fragment representing the multilinestring
         * @returns {<SuperMap.Feature.Vector>} A multilinestring feature
         * @private
         */
        'multilinestring': function(str) {
            var line;
            var lines = SuperMap.String.trim(str).split(this.regExes.parenComma);
            var components = [];
            for(var i=0, len=lines.length; i<len; ++i) {
                line = lines[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.linestring.apply(this, [line]).geometry);
            }
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.MultiLineString(components)
            );
        },
        
        /**
         * Return a polygon feature given a polygon WKT fragment.
         * @param {String} A WKT fragment representing the polygon
         * @returns {<SuperMap.Feature.Vector>} A polygon feature
         * @private
         */
        'polygon': function(str) {
            var ring, linestring, linearring;
            var rings = SuperMap.String.trim(str).split(this.regExes.parenComma);
            var components = [];
            for(var i=0, len=rings.length; i<len; ++i) {
                ring = rings[i].replace(this.regExes.trimParens, '$1');
                linestring = this.parse.linestring.apply(this, [ring]).geometry;
                linearring = new SuperMap.Geometry.LinearRing(linestring.components);
                components.push(linearring);
            }
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.Polygon(components)
            );
        },

        /**
         * Return a multipolygon feature given a multipolygon WKT fragment.
         * @param {String} A WKT fragment representing the multipolygon
         * @returns {<SuperMap.Feature.Vector>} A multipolygon feature
         * @private
         */
        'multipolygon': function(str) {
            var polygon;
            var polygons = SuperMap.String.trim(str).split(this.regExes.doubleParenComma);
            var components = [];
            for(var i=0, len=polygons.length; i<len; ++i) {
                polygon = polygons[i].replace(this.regExes.trimParens, '$1');
                components.push(this.parse.polygon.apply(this, [polygon]).geometry);
            }
            return new SuperMap.Feature.Vector(
                new SuperMap.Geometry.MultiPolygon(components)
            );
        },

        /**
         * Return an array of features given a geometrycollection WKT fragment.
         * @param {String} A WKT fragment representing the geometrycollection
         * @returns {Array} An array of SuperMap.Feature.Vector
         * @private
         */
        'geometrycollection': function(str) {
            // separate components of the collection with |
            str = str.replace(/,\s*([A-Za-z])/g, '|$1');
            var wktArray = SuperMap.String.trim(str).split('|');
            var components = [];
            for(var i=0, len=wktArray.length; i<len; ++i) {
                components.push(SuperMap.Format.WKT.prototype.read.apply(this,[wktArray[i]]));
            }
            return components;
        }

    },

    CLASS_NAME: "SuperMap.Format.WKT" 
});     
