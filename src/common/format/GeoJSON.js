/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {
    Vector
} from '../commontypes/Vector';
import {
    Util
} from '../commontypes/Util';
import {
    Bounds
} from '../commontypes/Bounds';
import {
    Collection
} from '../commontypes/geometry/Collection';
import {
    JSONFormat
} from './JSON';
import {
    Point
} from '../commontypes/geometry/Point';
import {
    MultiPoint
} from '../commontypes/geometry/MultiPoint';
import {
    LineString
} from '../commontypes/geometry/LineString';
import {
    MultiLineString
} from '../commontypes/geometry/MultiLineString';
import {
    LinearRing
} from '../commontypes/geometry/LinearRing';
import {
    Polygon
} from '../commontypes/geometry/Polygon';
import {
    MultiPolygon
} from '../commontypes/geometry/MultiPolygon';
import {
    ServerGeometry
} from '../iServer/ServerGeometry';

/**
 * @class GeoJSONFormat
 * @aliasclass Format.GeoJSON
 * @deprecatedclass SuperMap.Format.GeoJSON
 * @classdesc  GeoJSON 的读和写。使用 {@link GeoJSONObject} 构造器创建一个 GeoJSON 解析器。
 * @category BaseTypes Format
 * @param {Object} [options] - 可选参数。
 * @param {string} [options.indent="    "] - 用于格式化输出，indent 字符串会在每次缩进的时候使用一次。
 * @param {string} [options.space=" "] - 用于格式化输出，space 字符串会在名值对的 ":" 后边添加。
 * @param {string} [options.newline="\n"] - 用于格式化输出，newline 字符串会用在每一个名值对或数组项末尾。
 * @param {number} [options.level=0] - 用于格式化输出，表示的是缩进级别。
 * @param {boolean} [options.pretty=false] - 是否在序列化的时候使用额外的空格控制结构。在 write 方法中使用。
 * @param {boolean} [options.nativeJSON] - 需要被注册的监听器对象。
 * @param {boolean} [options.ignoreExtraDims=true] - 忽略维度超过 2 的几何要素。
 * @extends {JSONFormat}
 * @usage
 */
export class GeoJSON extends JSONFormat {


    constructor(options) {
        super(options);
        /**
         * @member {boolean} [GeoJSONFormat.prototype.ignoreExtraDims=true]
         * @description 忽略维度超过 2 的几何要素。
         */
        this.ignoreExtraDims = true;

        this.CLASS_NAME = "SuperMap.Format.GeoJSON";
        /**
         * @member {Object} GeoJSONFormat.prototype.parseCoords
         * @private
         * @description 一个属性名对应着 GeoJSON 对象的几何类型的对象。每个属性其实都是一个实际上做解析用的方法。
         */
        this.parseCoords = {
            /**
             * @function GeoJSONFormat.parseCoords.point
             * @description 将一组坐标转成一个 {@link Geometry} 对象。
             * @param {Object} array - GeoJSON 片段中的一组坐标。
             * @returns {Geometry} 一个几何对象。
             */
            "point": function (array) {
                if (this.ignoreExtraDims === false &&
                    array.length != 2) {
                    throw "Only 2D points are supported: " + array;
                }
                return new Point(array[0], array[1]);
            },

            /**
             * @function GeoJSONFormat.parseCoords.multipoint
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @param {Object} array - GeoJSON 片段中的坐标组数组。
             * @returns {Geometry} 一个几何对象。
             */
            "multipoint": function (array) {
                var points = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["point"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    points.push(p);
                }
                return new MultiPoint(points);
            },

            /**
             * @function GeoJSONFormat.parseCoords.linestring
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @param {Object} array - GeoJSON 片段中的坐标组数组。
             * @returns {Geometry} 一个几何对象。
             */
            "linestring": function (array) {
                var points = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["point"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    points.push(p);
                }
                return new LineString(points);
            },

            /**
             * @function GeoJSONFormat.parseCoords.multilinestring
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @param {Object} array - GeoJSON 片段中的坐标组数组。
             * @returns {Geometry} 一个几何对象。
             */
            "multilinestring": function (array) {
                var lines = [];
                var l = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        l = this.parseCoords["linestring"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    lines.push(l);
                }
                return new MultiLineString(lines);
            },

            /**
             * @function GeoJSONFormat.parseCoords.polygon
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @returns {Geometry} 一个几何对象。
             */
            "polygon": function (array) {
                var rings = [];
                var r, l;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        l = this.parseCoords["linestring"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    r = new LinearRing(l.components);
                    rings.push(r);
                }
                return new Polygon(rings);
            },

            /**
             * @function GeoJSONFormat.parseCoords.multipolygon
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @param {Object} array - GeoJSON 片段中的坐标组数组。
             * @returns {Geometry} 一个几何对象。
             */
            "multipolygon": function (array) {
                var polys = [];
                var p = null;
                for (var i = 0, len = array.length; i < len; ++i) {
                    try {
                        p = this.parseCoords["polygon"].apply(this, [array[i]]);
                    } catch (err) {
                        throw err;
                    }
                    polys.push(p);
                }
                return new MultiPolygon(polys);
            },

            /**
             * @function GeoJSONFormat.parseCoords.box
             * @description 将坐标组数组转化成为一个 {@link Geometry} 对象。
             * @param {Array} array - GeoJSON 片段中的坐标组数组。
             * @returns {Geometry} 一个几何对象。
             */
            "box": function (array) {
                if (array.length != 2) {
                    throw "GeoJSON box coordinates must have 2 elements";
                }
                return new Polygon([
                    new LinearRing([
                        new Point(array[0][0], array[0][1]),
                        new Point(array[1][0], array[0][1]),
                        new Point(array[1][0], array[1][1]),
                        new Point(array[0][0], array[1][1]),
                        new Point(array[0][0], array[0][1])
                    ])
                ]);
            }

        };
        /**
         * @member {Object} GeoJSONFormat.prototype.extract
         * @private
         * @description 一个属性名对应着 GeoJSON 类型的对象。其值为相应的实际的解析方法。
         */
        this.extract = {
            /**
             * @function GeoJSONFormat.extract.feature
             * @description 返回一个表示单个要素对象的 GeoJSON 的一部分。
             * @param {SuperMap.ServerFeature} feature - SuperMap iServer 要素对象。
             * @returns {Object} 一个表示点的对象。
             */
            'feature': function (feature) {
                var geom = this.extract.geometry.apply(this, [feature.geometry]);
                var json = {
                    "type": "Feature",
                    "properties": this.createAttributes(feature),
                    "geometry": geom
                };

                if (feature.geometry && feature.geometry.type === 'TEXT') {
                    json.properties.texts = feature.geometry.texts;
                    json.properties.textStyle = feature.geometry.textStyle;
                }
                if (feature.fid) {
                    json.id = feature.fid;
                }
                if (feature.ID) {
                    json.id = feature.ID;
                }
                return json;
            },


            /**
             * @function GeoJSONFormat.extract.geometry
             * @description 返回一个表示单个几何对象的 GeoJSON 的一部分。
             * @param {Object} geometry - SuperMap iServer 几何对象。
             * @returns {Object} 一个表示几何体的对象。
             */
            'geometry': function (geometry) {
                if (geometry == null) {
                    return null;
                }
                if (!geometry.parts && geometry.points) {
                    geometry.parts = [geometry.points.length];
                }
                var geo = geometry.hasOwnProperty('geometryType')
                    ? geometry
                    : new ServerGeometry(geometry).toGeometry() || geometry;
                var geometryType = geo.geometryType || geo.type;
                var data;
                if (geometryType === "LinearRing") {
                    geometryType = "LineString";
                }
                if (geometryType === "LINEM") {
                    geometryType = "MultiLineString";
                }
                data = this.extract[geometryType.toLowerCase()].apply(this, [geo]);
                geometryType = geometryType === 'TEXT' ? 'Point' : geometryType;
                var json;
                if (geometryType === "Collection") {
                    json = {
                        "type": "GeometryCollection",
                        "geometries": data
                    };
                } else {
                    json = {
                        "type": geometryType,
                        "coordinates": data
                    };
                }
                return json;
            },


            /**
             * @function GeoJSONFormat.extract.point
             * @description 从一个点对象中返回一个坐标组。
             * @param {GeometryPoint} point - 一个点对象。
             * @returns {Array} 一个表示一个点的坐标组。
             */
            'point': function (point) {
                var p = [point.x, point.y];
                for (var name in point) {
                    if (name !== "x" && name !== "y" && point[name] !== null && !isNaN(point[name])) {
                        p.push(point[name]);
                    }
                }
                return p;
            },

            /**
             * @function GeoJSONFormat.extract.point
             * @description 从一个文本对象中返回一个坐标组。
             * @param {Object} geo - 一个文本对象。
             * @returns {Array} 一个表示一个点的坐标组。
             */
            'text': function (geo) {
                return [geo.points[0].x, geo.points[0].y];
            },

            /**
             * @function GeoJSONFormat.extract.multipoint
             * @description 从一个多点对象中返一个坐标组数组。
             * @param {GeometryMultiPoint} multipoint - 多点对象。
             * @returns {Array} 一个表示多点的坐标组数组。
             */
            'multipoint': function (multipoint) {
                var array = [];
                for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [multipoint.components[i]]));
                }
                return array;
            },

            /**
             * @function GeoJSONFormat.extract.linestring
             * @description 从一个线对象中返回一个坐标组数组。
             * @param {Linestring} linestring - 线对象。
             * @returns {Array} 一个表示线对象的坐标组数组。
             */
            'linestring': function (linestring) {
                var array = [];
                for (var i = 0, len = linestring.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [linestring.components[i]]));
                }
                return array;
            },

            /**
             * @function GeoJSONFormat.extract.multilinestring
             * @description 从一个多线对象中返回一个线数组。
             * @param {GeometryMultiLineString} multilinestring - 多线对象。
             *
             * @returns {Array} 一个表示多线的线数组。
             */
            'multilinestring': function (multilinestring) {
                var array = [];
                for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [multilinestring.components[i]]));
                }
                return array;
            },

            /**
             * @function GeoJSONFormat.extract.polygon
             * @description 从一个面对象中返回一组线环。
             * @param {GeometryPolygon} polygon - 面对象。
             * @returns {Array} 一组表示面的线环。
             */
            'polygon': function (polygon) {
                var array = [];
                for (var i = 0, len = polygon.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [polygon.components[i]]));
                }
                return array;
            },

            /**
             * @function GeoJSONFormat.extract.multipolygon
             * @description 从一个多面对象中返回一组面。
             * @param {GeometryMultiPolygon} multipolygon - 多面对象。
             * @returns {Array} 一组表示多面的面。
             */
            'multipolygon': function (multipolygon) {
                var array = [];
                for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                    array.push(this.extract.polygon.apply(this, [multipolygon.components[i]]));
                }
                return array;
            },

            /**
             * @function GeoJSONFormat.extract.collection
             * @description 从一个几何要素集合中一组几何要素数组。
             * @param {GeometryCollection} collection - 几何要素集合。
             * @returns {Array} 一组表示几何要素集合的几何要素数组。
             */
            'collection': function (collection) {
                var len = collection.components.length;
                var array = new Array(len);
                for (var i = 0; i < len; ++i) {
                    array[i] = this.extract.geometry.apply(this, [collection.components[i]]);
                }
                return array;
            }
        };
    }

    /**
     * @function GeoJSONFormat.prototype.read
     * @description 将 GeoJSON 对象或者 GeoJSON 对象字符串转换为 SuperMap Feature 对象。
     * @param {GeoJSONObject} json - GeoJSON 对象。
     * @param {string} [type='FeaureCollection'] - 可选的字符串，它决定了输出的格式。支持的值有："Geometry","Feature"，和 "FeatureCollection"，如果此值为null。
     * @param {function} filter - 对象中每个层次每个键值对都会调用此函数得出一个结果。每个值都会被 filter 函数的结果所替换掉。这个函数可被用来将某些对象转化成某个类相应的对象，或者将日期字符串转化成Date对象。
     * @returns {Object}  返回值依赖于 type 参数的值。<br>
     *     -如果 type 等于 "FeatureCollection"，返回值将会是 {@link FeatureVector} 数组。<br>
     *     -如果 type 为 "Geometry"，输入的 JSON 对象必须表示一个唯一的几何体，然后返回值就会是 {@link Geometry}。<br>
     *     -如果 type 为 "Feature"，输入的 JSON 对象也必须表示的一个要素，这样返回值才会是 {@link FeatureVector}。
     */

    read(json, type, filter) {
        type = (type) ? type : "FeatureCollection";
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = super.read(json, filter);
        } else {
            obj = json;
        }
        if (!obj) {
            //console.error("Bad JSON: " + json);
        } else if (typeof (obj.type) != "string") {
            //console.error("Bad GeoJSON - no type: " + json);
        } else if (this.isValidType(obj, type)) {
            switch (type) {
                case "Geometry":
                    try {
                        results = this.parseGeometry(obj);
                    } catch (err) {
                        //console.error(err);
                    }
                    break;
                case "Feature":
                    try {
                        results = this.parseFeature(obj);
                        results.type = "Feature";
                    } catch (err) {
                        //console.error(err);
                    }
                    break;
                case "FeatureCollection":
                    // for type FeatureCollection, we allow input to be any type
                    results = [];
                    switch (obj.type) {
                        case "Feature":
                            try {
                                results.push(this.parseFeature(obj));
                            } catch (err) {
                                results = null;
                                //console.error(err);
                            }
                            break;
                        case "FeatureCollection":
                            for (var i = 0, len = obj.features.length; i < len; ++i) {
                                try {
                                    results.push(this.parseFeature(obj.features[i]));
                                } catch (err) {
                                    results = null;
                                    // console.error(err);
                                }
                            }
                            break;
                        default:
                            try {
                                var geom = this.parseGeometry(obj);
                                results.push(new Vector(geom));
                            } catch (err) {
                                results = null;
                                //console.error(err);
                            }
                    }
                    break;
                default:
                    break;
            }
        }
        return results;
    }

    /**
     * @function GeoJSONFormat.prototype.write
     * @description SuperMap iServer Geometry JSON 对象 转 GeoJSON 对象字符串。
     * @param {Object} obj - SuperMap iServer Geometry JSON 对象。
     * @param {boolean} [pretty=false] - 是否使用换行和缩进来控制输出。
     * @returns {GeoJSONObject} 一个 GeoJSON 字符串，它表示了输入的几何对象，要素对象，或者要素对象数组。
     */
    write(obj, pretty) {
        return super.write(this.toGeoJSON(obj), pretty);
    }
    /**
     * @function GeoJSONFormat.prototype.fromGeoJSON
     * @version 9.1.1
     * @description 将 GeoJSON 对象或者 GeoJSON 对象字符串转换为 SuperMap iServer Feature JSON。
     * @param {GeoJSONObject} json - GeoJSON 对象。
     * @param {string} [type='FeaureCollection'] - 可选的字符串，它决定了输出的格式。支持的值有："Geometry","Feature"，和 "FeatureCollection"，如果此值为null。
     * @param {function} filter - 对象中每个层次每个键值对都会调用此函数得出一个结果。每个值都会被 filter 函数的结果所替换掉。这个函数可被用来将某些对象转化成某个类相应的对象，或者将日期字符串转化成Date对象。
     * @returns {Object}  SuperMap iServer Feature JSON。
     */
    fromGeoJSON(json, type, filter) {
        let feature = this.read(json, type, filter);
        if (!Util.isArray(feature)) {
            return this._toiSevrerFeature(feature);
        }
        return feature.map((element) => {
            return this._toiSevrerFeature(element);
        })
    }

    /**
     * @function GeoJSONFormat.prototype.toGeoJSON
     * @version 9.1.1
     * @description 将 SuperMap iServer Feature JSON 对象转换为 GeoJSON 对象。
     * @param {Object} obj - SuperMap iServer Feature JSON。
     * @returns {GeoJSONObject}  GeoJSON 对象。
     */
    toGeoJSON(obj) {
        var geojson = {
            "type": null
        };
        if (Util.isArray(obj)) {
            geojson.type = "FeatureCollection";
            var numFeatures = obj.length;
            geojson.features = new Array(numFeatures);
            for (var i = 0; i < numFeatures; ++i) {
                var element = obj[i];
                if (isGeometry(element)) {
                    let feature = {};
                    feature.geometry = element;
                    geojson.features[i] = this.extract.feature.apply(this, [feature]);
                } else {
                    geojson.features[i] = this.extract.feature.apply(this, [element]);
                }
            }
        } else if (isGeometry(obj)) {
            let feature = {};
            feature.geometry = obj;
            geojson = this.extract.feature.apply(this, [feature]);
        } else {
            geojson = this.extract.feature.apply(this, [obj]);
        }

        function isGeometry(input) {
            return (input.hasOwnProperty("parts") && input.hasOwnProperty("points")) || input.hasOwnProperty("geoParts");
        }

        return geojson;

    }
    /**
     *  @function GeoJSONFormat.prototype.isValidType
     *  @description 检查一个 GeoJSON 对象是否和给定的类型相符的合法的对象。
     *  @returns {boolean} GeoJSON 是否是给定类型的合法对象。
     *  @private
     */
    isValidType(obj, type) {
        var valid = false;
        switch (type) {
            case "Geometry":
                if (Util.indexOf(
                    ["Point", "MultiPoint", "LineString", "MultiLineString",
                        "Polygon", "MultiPolygon", "Box", "GeometryCollection"
                    ],
                    obj.type) == -1) {
                    // unsupported geometry type
                    //console.error("Unsupported geometry type: " +
                    // obj.type);
                } else {
                    valid = true;
                }
                break;
            case "FeatureCollection":
                // allow for any type to be converted to a feature collection
                valid = true;
                break;
            default:
                // for Feature types must match
                if (obj.type == type) {
                    valid = true;
                } else {
                    //console.error("Cannot convert types from " +
                    //obj.type + " to " + type);
                }
        }
        return valid;
    }

    /**
     * @function GeoJSONFormat.prototype.parseFeature
     * @description 将一个 GeoJSON 中的 feature 转化成 {@link FeatureVector}> 对象。
     * @private
     * @param {GeoJSONObject} obj - 从 GeoJSON 对象中创建一个对象。
     * @returns {FeatureVector} 一个要素。
     */
    parseFeature(obj) {
        var feature, geometry, attributes, bbox;
        attributes = (obj.properties) ? obj.properties : {};
        bbox = (obj.geometry && obj.geometry.bbox) || obj.bbox;
        try {
            geometry = this.parseGeometry(obj.geometry);
        } catch (err) {
            // deal with bad geometries
            throw err;
        }
        feature = new Vector(geometry, attributes);
        if (bbox) {
            feature.bounds = Bounds.fromArray(bbox);
        }
        if (obj.id) {
            feature.geometry.id = obj.id;
            feature.fid = obj.id;
        }
        return feature;
    }


    /**
     * @function GeoJSONFormat.prototype.parseGeometry
     * @description 将一个 GeoJSON 中的几何要素转化成 {@link Geometry} 对象。
     * @param {GeoJSONObject} obj - 从 GeoJSON 对象中创建一个对象。
     * @returns {Geometry} 一个几何要素。
     * @private
     */
    parseGeometry(obj) {
        if (obj == null) {
            return null;
        }
        var geometry;
        if (obj.type == "GeometryCollection") {
            if (!(Util.isArray(obj.geometries))) {
                throw "GeometryCollection must have geometries array: " + obj;
            }
            var numGeom = obj.geometries.length;
            var components = new Array(numGeom);
            for (var i = 0; i < numGeom; ++i) {
                components[i] = this.parseGeometry.apply(
                    this, [obj.geometries[i]]
                );
            }
            geometry = new Collection(components);
        } else {
            if (!(Util.isArray(obj.coordinates))) {
                throw "Geometry must have coordinates array: " + obj;
            }
            if (!this.parseCoords[obj.type.toLowerCase()]) {
                throw "Unsupported geometry type: " + obj.type;
            }
            try {
                geometry = this.parseCoords[obj.type.toLowerCase()].apply(
                    this, [obj.coordinates]
                );
            } catch (err) {
                // deal with bad coordinates
                throw err;
            }
        }
        return geometry;
    }


    /**
     * @function GeoJSONFormat.prototype.createCRSObject
     * @description 从一个要素对象中创建一个坐标参考系对象。
     * @param {FeatureVector} object - 要素对象。
     * @private
     * @returns {GeoJSONObject} 一个可作为 GeoJSON 对象的 CRS 属性使用的对象。
     */
    createCRSObject(object) {
        var proj = object.layer.projection.toString();
        var crs = {};
        if (proj.match(/epsg:/i)) {
            var code = parseInt(proj.substring(proj.indexOf(":") + 1));
            if (code == 4326) {
                crs = {
                    "type": "name",
                    "properties": {
                        "name": "urn:ogc:def:crs:OGC:1.3:CRS84"
                    }
                };
            } else {
                crs = {
                    "type": "name",
                    "properties": {
                        "name": "EPSG:" + code
                    }
                };
            }
        }
        return crs;
    }
    _toiSevrerFeature(feature) {
        const attributes = feature.attributes;
        const attrNames = [];
        const attrValues = [];
        for (var attr in attributes) {
            attrNames.push(attr);
            attrValues.push(attributes[attr]);
        }
        const newFeature = {
            fieldNames: attrNames,
            fieldValues: attrValues,
            geometry: ServerGeometry.fromGeometry(feature.geometry)
        };
        newFeature.geometry.id = feature.fid;
        return newFeature;
    }
    createAttributes(feature) {
        if (!feature) {
            return null;
        }
        var attr = {};
        processFieldsAttributes(feature, attr);
        var exceptKeys = ["fieldNames", "fieldValues", "geometry", "stringID", "ID"];
        for (var key in feature) {
            if (exceptKeys.indexOf(key) > -1) {
                continue;
            }
            attr[key] = feature[key];
        }

        function processFieldsAttributes(feature, attributes) {
            if (!(feature.hasOwnProperty("fieldNames") && feature.hasOwnProperty("fieldValues"))) {
                return;
            }
            var names = feature.fieldNames,
                values = feature.fieldValues;
            for (var i in names) {
                attributes[names[i]] = values[i];
            }
        }

        return attr;
    }
}
