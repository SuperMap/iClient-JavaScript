import {SuperMap} from '../SuperMap';
import {Vector} from '../commontypes/Vector';
import {Util} from '../commontypes/Util';
import {Bounds} from '../commontypes/Bounds';
import {Collection} from '../commontypes/geometry/Collection';
import {JSONFormat} from './JSON';
import {Point} from '../commontypes/geometry/Point';
import {MultiPoint} from '../commontypes/geometry/MultiPoint';
import {LineString} from '../commontypes/geometry/LineString';
import {MultiLineString} from '../commontypes/geometry/MultiLineString';
import {LinearRing} from '../commontypes/geometry/LinearRing';
import {Polygon} from '../commontypes/geometry/Polygon';
import {MultiPolygon} from '../commontypes/geometry/MultiPolygon';
import {GeometryType} from '../REST';

/**
 * @class SuperMap.Format.GeoJSON
 * @classdesc  GeoJSON 的读和写。使用 <SuperMap.Format.GeoJSON> 构造器创建一个GeoJSON解析器。
 * @category BaseTypes Format
 * @extends SuperMap.Format.JSON。
 */
export class GeoJSON extends JSONFormat {


    constructor(options) {
        super(options);
        /**
         * @member SuperMap.Format.GeoJSON.prototype.ignoreExtraDims - {boolean}
         * @description 忽略维度超过2的几何要素。
         */
        this.ignoreExtraDims = false;

        this.CLASS_NAME = "SuperMap.Format.GeoJSON";
        /**
         * @member SuperMap.Format.GeoJSON.prototype.parseCoords - {Object}
         * @description 一个属性名对应着GeoJSON对象的几何类型的对象。每个属性其实都是一个实际上做解析用的方法。
         */
        this.parseCoords = {
            /**
             * @function SuperMap.Format.GeoJSON.parseCoords.point
             * @description 将一组坐标成一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的一组坐标。
             * @return {SuperMap.Geometry} 一个几何对象。
             */
            "point": function (array) {
                if (this.ignoreExtraDims == false &&
                    array.length != 2) {
                    throw "Only 2D points are supported: " + array;
                }
                return new Point(array[0], array[1]);
            },

            /**
             * @function SuperMap.Format.GeoJSON.parseCoords.multipoint
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的坐标组数组。
             * @return {SuperMap.Geometry} 一个几何对象。
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
             * @function SuperMap.Format.GeoJSON.parseCoords.linestring
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的坐标组数组。
             * @return {SuperMap.Geometry} 一个几何对象。
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
             * @function SuperMap.Format.GeoJSON.parseCoords.multilinestring
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的坐标组数组。
             * @return {SuperMap.Geometry} 一个几何对象。
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
             * @function SuperMap.Format.GeoJSON.parseCoords.polygon
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @return {SuperMap.Geometry} 一个几何对象。
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
             * @function SuperMap.Format.GeoJSON.parseCoords.multipolygon
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的坐标组数组。
             * @return {SuperMap.Geometry} 一个几何对象。
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
             * @function SuperMap.Format.GeoJSON.parseCoords.box
             * @description 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
             * @param array - {Object} GeoJSON片段中的坐标组数组。
             * @return {SuperMap.Geometry} 一个几何对象。
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
         * Property: extract
         * 一个属性名对应着GeoJSON类型的对象。其值为相应的实际的解析方法。
         */
        this.extract = {
            /**
             * @function SuperMap.Format.GeoJSON.extract.feature
             * @description 返回一个表示单个要素对象的GeoJSON的一部分。
             * @param feature - iServer要素对象
             * @return {Object} 一个表示点的对象。
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
                if (feature.fid !== null) {
                    json.id = feature.fid;
                }
                if (feature.ID !== null) {
                    json.id = feature.ID;
                }
                return json;
            },


            /**
             * @function SuperMap.Format.GeoJSON.extract.geometry
             * @description 返回一个表示单个几何对象的GeoJSON的一部分。
             * @param geometry -iServer 几何对象
             * @return {Object} 一个表示几何体的对象。
             */
            'geometry': function (geometry) {
                if (geometry == null) {
                    return null;
                }
                var geo = this.toGeometry(geometry);
                var geometryType = geo.type;
                var data = this.extract[geometryType.toLowerCase()].apply(this, [geo]);
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
             * @function SuperMap.Format.GeoJSON.extract.point
             * @description 从一个点对象中返回一个坐标组。
             * @param point - {SuperMap.Geometry.Point} 一个点对象。
             * @return {Array} 一个表示一个点的坐标组。
             */
            'point': function (point) {
                var p = [point.x, point.y];
                for (var name in point) {
                    if (name !== "x" && name !== "y" && !isNaN(point[name])) {
                        p.push(point[name]);
                    }
                }
                return p;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.point
             * @description 从一个文本对象中返回一个坐标组。
             * @param geo 一个文本对象。
             * @return {Array} 一个表示一个点的坐标组。
             */
            'text': function (geo) {
                return [geo.points[0].x, geo.points[0].y];
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.multipoint
             * @description 从一个多点对象中返一个坐标组数组。
             * @param multipoint - {SuperMap.Geometry.MultiPoint} 多点对象。
             * @return {Array} 一个表示多点的坐标组数组。
             */
            'multipoint': function (multipoint) {
                var array = [];
                for (var i = 0, len = multipoint.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [multipoint.components[i]]));
                }
                return array;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.linestring
             * @description 从一个线对象中返回一个坐标组数组。
             * @param linestring - {SuperMap.Geometry.Linestring} 线对象。
             * @return {Array} 一个表示线对象的坐标组数组。
             */
            'linestring': function (linestring) {
                var array = [];
                for (var i = 0, len = linestring.components.length; i < len; ++i) {
                    array.push(this.extract.point.apply(this, [linestring.components[i]]));
                }
                return array;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.multilinestring
             * @description 从一个多线对象中返回一个线数组。
             * @param multilinestring - {SuperMap.Geometry.MultiLinestring} 多线对象
             *
             * @return {Array} 一个表示多线的线数组。
             */
            'multilinestring': function (multilinestring) {
                var array = [];
                for (var i = 0, len = multilinestring.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [{components: multilinestring.components[i]}]));
                }
                return array;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.polygon
             * @description 从一个面对象中返回一组线环。
             * @polygon - {SuperMap.Geometry.Polygon} 面对象。
             * @return {Array} 一组表示面的线环。
             */
            'polygon': function (polygon) {
                var array = [];
                for (var i = 0, len = polygon.components.length; i < len; ++i) {
                    array.push(this.extract.linestring.apply(this, [{components: polygon.components[i]}]));
                }
                return array;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.multipolygon
             * @description 从一个多面对象中返回一组面。
             * @param multipolygon - {SuperMap.Geometry.MultiPolygon} 多面对象。
             * @return {Array} 一组表示多面的面。
             */
            'multipolygon': function (multipolygon) {
                var array = [];
                for (var i = 0, len = multipolygon.components.length; i < len; ++i) {
                    array.push(this.extract.polygon.apply(this, [{components: multipolygon.components[i]}]));
                }
                return array;
            },

            /**
             * @function SuperMap.Format.GeoJSON.extract.collection
             * @description 从一个几何要素集合中一组几何要素数组。
             * @param collection - {SuperMap.Geometry.Collection} 几何要素集合。
             * @return {Array} 一组表示几何要素集合的几何要素数组。
             */
            'collection': function (collection) {
                var len = collection.components.length;
                var array = new Array(len);
                for (var i = 0; i < len; ++i) {
                    array[i] = this.extract.geometry.apply(this, [{
                        type: "Collection",
                        components: collection.components[i]
                    }]);
                }
                return array;
            }
        };
    }

    /**
     * @function SuperMap.Format.GeoJSON.prototype.read
     * @description 反序列化一个 GeoJSON 字符串。
     * @param json - {string}  GeoJSON 字符串
     * @param type - {string} 可选的字符串，它决定了输出的格式。
     *     支持的值有："Geometry","Feature",和"FeatureCollection",
     *     如果此值为null，则会使用默认值"FeaureCollection"。
     * @param filter - {function} 对象中每个层次每个键值对都会调用此函数得出一个结果。
     *     每个值都会被filter函数的结果所替换掉。这个函数可被用来将某些对象转化成
     *     某个类相应的对象，或者将日期字符串转化成Date对象。
     *
     * @return {Object}    返回值依赖于type参数的值。<br>
     *     如果type等于"FeatureCollection"（默认值），返回值将会是 <SuperMap.Feature.Vector> 数组。<br>
     *     如果type为"Geometry",输入的json对象必须表示一个唯一的几何体，然后返回值就会是 <SuperMap.Feature.Geometry>。 <br>
     *     如果type为"Feature"，输入的json对象也必须表示的一个要素，这样返回值才会是<SuperMap.Feature.Vector> 。
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
            //SuperMap.Console.error("Bad JSON: " + json);
        } else if (typeof(obj.type) != "string") {
            //SuperMap.Console.error("Bad GeoJSON - no type: " + json);
        } else if (this.isValidType(obj, type)) {
            switch (type) {
                case "Geometry":
                    try {
                        results = this.parseGeometry(obj);
                    } catch (err) {
                        //SuperMap.Console.error(err);
                    }
                    break;
                case "Feature":
                    try {
                        results = this.parseFeature(obj);
                        results.type = "Feature";
                    } catch (err) {
                        //SuperMap.Console.error(err);
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
                                //SuperMap.Console.error(err);
                            }
                            break;
                        case "FeatureCollection":
                            for (var i = 0, len = obj.features.length; i < len; ++i) {
                                try {
                                    results.push(this.parseFeature(obj.features[i]));
                                } catch (err) {
                                    results = null;
                                    // SuperMap.Console.error(err);
                                }
                            }
                            break;
                        default:
                            try {
                                var geom = this.parseGeometry(obj);
                                results.push(new Vector(geom));
                            } catch (err) {
                                results = null;
                                //SuperMap.Console.error(err);
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
     *  @function SuperMap.Format.GeoJSON.prototype.isValidType
     *  @description 检查一个GeoJSON对象是否和给定的类型相符的合法的对象。
     *  @return {boolean} GeoJSON是否是给定类型的合法对象。
     */
    isValidType(obj, type) {
        var valid = false;
        switch (type) {
            case "Geometry":
                if (Util.indexOf(
                        ["Point", "MultiPoint", "LineString", "MultiLineString",
                            "Polygon", "MultiPolygon", "Box", "GeometryCollection"],
                        obj.type) == -1) {
                    // unsupported geometry type
                    //SuperMap.Console.error("Unsupported geometry type: " +
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
                    //SuperMap.Console.error("Cannot convert types from " +
                    //obj.type + " to " + type);
                }
        }
        return valid;
    }

    /**
     * @function SuperMap.Format.GeoJSON.prototype.parseFeature
     * @description 将一个GeoJSON中的feature转化成<SuperMap.Feature.Vector>对象。
     * @param obj - {Object} 从GeoJSON对象中创建一个对象。
     * @return {SuperMap.Feature.Vector} 一个要素。
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
            feature.fid = obj.id;
        }
        return feature;
    }


    /**
     * @function SuperMap.Format.GeoJSON.prototype.parseGeometry
     * @description 将一个GeoJSON中的几何要素转化成<SuperMap.Geometry>对象。
     * @param obj - {Object} 从GeoJSON对象中创建一个对象。
     * @return {SuperMap.Geometry} 一个几何要素。
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
     * @function SuperMap.Format.GeoJSON.write
     * @description 序列化一个要素对象，几何对象，要素对象数组为一个GeoJSON字符串。
     * @param obj - {Object} 一个 <SuperMap.Feature.Vector> 对象，一个 <SuperMap.Geometry> 对象或者一个要素对象数组。
     * @param pretty - {boolean} 是否使用换行和缩进来控制输出。默认值为false。
     * @return {string} 一个GeoJSON字符串，它表示了输入的几何对象，要素对象，或者要素对象数组。
     */
    write(obj, pretty) {
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
        }

        function isGeometry(input) {
            return input.hasOwnProperty("parts") && input.hasOwnProperty("points");
        }

        return super.write(geojson, pretty);
    }


    /**
     * @function SuperMap.Format.GeoJSON.createCRSObject
     * @description 从一个要素对象中创建一个坐标参考系对象。
     * @param object - {SuperMap.Feature.Vector} 要素对象
     * @return {Object} 一个可作为GeoJSON对象的crs属性使用的对象。
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

    createAttributes(feature) {
        if (!feature) {
            return null;
        }
        var attr = {};
        processFieldsAttributes(feature, attr);
        var exceptKeys = ["fieldNames", "fieldValues", "geometry"];
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


    toGeometry(geometry) {
        var me = this,
            geoType = geometry.type;
        if (geoType === 'polygon') {
            geoType = GeometryType.REGION;
        }
        switch (geoType.toUpperCase()) {
            case GeometryType.POINT:
                return me.toGeoPoint(geometry);
            case GeometryType.LINE:
                return me.toGeoLine(geometry);
            case GeometryType.LINEM:
                return me.toGeoLinem(geometry);
            case GeometryType.REGION:
                return me.toGeoRegion(geometry);
            case GeometryType.POINTEPS:
                return me.toGeoPoint(geometry);
            // case GeometryType.LINEEPS:
            //     return me.toGeoLineEPS();
            // case GeometryType.REGIONEPS:
            //     return me.toGeoRegionEPS();
            default:
                return geometry;
        }
    }

    /**
     * @function SuperMap.Format.GeoJSON.toGeoPoint
     * @description 将服务端的点几何对象转换为几何对象
     */
    toGeoPoint(geometry) {
        var geoPoints = geometry.points || [{x: geometry.x, y: geometry.y}],
            geoParts = geometry.parts || [geoPoints.length],
            len = geoParts.length;
        if (len < 1) {
            return null;
        }
        if (len === 1) {
            return {type: "Point", x: parseFloat(geoPoints[0].x), y: parseFloat(geoPoints[0].y)};
        } else {
            for (var i = 0, pointList = []; i < len; i++) {
                pointList.push({x: parseFloat(geoPoints[i].x), y: parseFloat(geoPoints[i].y)});
            }
            return {type: "MultiPoint", components: pointList};
        }

    }


    /**
     *
     * @function SuperMap.Format.GeoJSON.toGeoPoint
     * @description 将服务端的线几何对象转换为几何对象。
     */
    toGeoLine(geometry) {
        var me = this,
            geoPoints = geometry.points || [],
            geoParts = geometry.parts || [geoPoints.length],
            len = geoParts.length;
        if (len < 1) {
            return null;
        }
        if (len === 1) {
            for (var i = 0, pointList = []; i < geoParts[0]; i++) {
                pointList.push({x: parseFloat(geoPoints[i].x), y: parseFloat(geoPoints[i].y)});
            }
            //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
            if (me.isPointsEquals(pointList[0], pointList[geoParts[0] - 1])) {
                pointList.pop();
                pointList.push(pointList[0]);
            }
            return {type: "LineString", components: pointList};
        } else {
            for (var k = 0, lineList = []; k < len; k++) {
                for (var j = 0, pointArr = []; j < geoParts[k]; j++) {
                    pointArr.push({x: parseFloat(geoPoints[j].x), y: parseFloat(geoPoints[j].y)});
                }
                lineList.push(pointArr);
                geoPoints.splice(0, geoParts[k]);
            }
            return {type: "MultiLineString", components: lineList};
        }

    }


    /**
     *
     * @function SuperMap.Format.GeoJSON.toGeoLinem
     * @description 将服务端的路由线几何对象转换为几何对象。
     */
    toGeoLinem(geometry) {
        var me = this,
            geoPoints = geometry.points || [],
            geoParts = geometry.parts || [geoPoints.length],
            len = geoParts.length,
            lineList = [];
        if (len < 1) {
            return null;
        }
        for (var i = 0, pointIndex = 0, pointList = []; i < len; i++) {
            for (var j = 0; j < geoParts[i]; j++) {
                pointList.push({
                    x: parseFloat(geoPoints[pointIndex + j].x),
                    y: parseFloat(geoPoints[pointIndex + j].y),
                    measure: parseFloat(geoPoints[pointIndex + j].measure)
                });
            }
            pointIndex += geoParts[i];
            //判断线是否闭合，如果闭合，则返回LinearRing，否则返回LineString
            if (me.isPointsEquals(pointList[0], pointList[geoParts[0] - 1])) {
                pointList.pop();
                pointList.push(pointList[0]);
            }
            lineList.push(pointList);
            pointList = [];
        }
        return {type: "MultiLineString", components: lineList};
    }

    /**
     *
     * @function SuperMap.Format.GeoJSON.toGeoRegion
     * @description 将服务端的面几何对象转换为几何对象。
     */
    toGeoRegion(geometry) {
        var CCWArray = [],
            geoPoints = geometry.points || [],
            geoParts = geometry.parts || [geoPoints.length],
            len = geoParts.length;
        if (len < 1) {
            return null;
        }
        var polygonArray = new Array();
        for (var i = 0, pointIndex = 0, pointList = []; i < len; i++) {
            for (var j = 0; j < geoParts[i]; j++) {
                pointList.push({
                    x: parseFloat(geoPoints[pointIndex + j].x),
                    y: parseFloat(geoPoints[pointIndex + j].y)
                });
            }

            pointIndex += geoParts[i];
            var linearRing = pointList.concat();
            linearRing.pop();
            linearRing.push(linearRing[0]);

            if (this.isClockWise(linearRing) > 0) {
                CCWArray.push(linearRing);
            } else {
                polygonArray.push([linearRing]);
            }

            if (i === len - 1) {
                var polyLength = polygonArray.length;
                if (polyLength) {
                    polygonArray[polyLength - 1] = polygonArray[polyLength - 1].concat(CCWArray);
                } else {
                    for (var k = 0, length = CCWArray.length; k < length; k++) {
                        polygonArray.push([CCWArray[k]].concat());
                    }
                }
            }
            pointList = [];
        }
        return {type: "MultiPolygon", components: polygonArray};
    }

    isClockWise(points) {
        var length = points.length;
        if (length < 3) {
            return 0.0;
        }
        var s = points[0].y * (points[length - 1].x - points[1].x);
        points.push(points[0]);
        for (var i = 1; i < length; i++) {
            s += points[i].y * (points[i - 1].x - points[i + 1].x);
        }
        return s * 0.5;
    }

    isPointsEquals(point1, point2) {
        return (point1.x === point2.x && point1.y === point2.y);
    }
}

SuperMap.Format.GeoJSON = GeoJSON;