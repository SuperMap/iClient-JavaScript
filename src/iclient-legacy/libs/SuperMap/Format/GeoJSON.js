/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/JSON.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Geometry/Point.js
 * @requires SuperMap/Geometry/MultiPoint.js
 * @requires SuperMap/Geometry/LineString.js
 * @requires SuperMap/Geometry/MultiLineString.js
 * @requires SuperMap/Geometry/Polygon.js
 * @requires SuperMap/Geometry/MultiPolygon.js
 * @requires SuperMap/Console.js
 */

/**
 * Class: SuperMap.Format.GeoJSON
 * GeoJSON 的读和写。使用 <SuperMap.Format.GeoJSON> 构造器创建一个GeoJSON解析器.
 *
 * Inherits from:
 *  - <SuperMap.Format.JSON>
 */
SuperMap.Format.GeoJSON = SuperMap.Class(SuperMap.Format.JSON, {

    /**
     * APIProperty: ignoreExtraDims
     * {Boolean} 忽略维度超过2的几何要素
     */ 
    ignoreExtraDims: false,
    
    /**
     * Constructor: SuperMap.Format.GeoJSON
     * 创建一个 GeoJSON解析器
     *
     * Parameters:
     * options - {Object} 一个可选参数，其属性会被赋值到本对象
     */

    /**
     * APIMethod: read
     * 反序列化一个 GeoJSON 字符串.
     *
     * Parameters:
     * json - {String}  GeoJSON 字符串
     * type - {String} 可选的字符串，它决定了输出的格式。
     *     支持的值有："Geometry","Feature",和"FeatureCollection",
     *     如果此值为null，则会使用默认值"FeaureCollection"。
     * filter - {Function} 对象中每个层次每个键值对都会调用此函数得出一个结果。
     *     每个值都会被filter函数的结果所替换掉。这个函数可被用来将某些对象转化成
     *     某个类相应的对象，或者将日期字符串转化成Date对象。
     *
     * Returns: 
     * {Object} 返回值依赖于type参数的值。如果type等于"FeatureCollection"（默认值），
     *     返回值将会是 <SuperMap.Feature.Vector> 数组。如果type为"Geometry",
     *     输入的json对象必须表示一个唯一的几何体，然后返回值就会是 <SuperMap.Feature.Geometry>
     *     如果type为"Feature"，输入的json对象也必须表示的一个要素，这样返回值才会是
     *      <SuperMap.Feature.Vector> 。
     */
    read: function(json, type, filter) {
        type = (type) ? type : "FeatureCollection";
        var results = null;
        var obj = null;
        if (typeof json == "string") {
            obj = SuperMap.Format.JSON.prototype.read.apply(this,
                                                              [json, filter]);
        } else { 
            obj = json;
        }    
        if(!obj) {
            //SuperMap.Console.error("Bad JSON: " + json);
        } else if(typeof(obj.type) != "string") {
            //SuperMap.Console.error("Bad GeoJSON - no type: " + json);
        } else if(this.isValidType(obj, type)) {
            switch(type) {
                case "Geometry":
                    try {
                        results = this.parseGeometry(obj);
                    } catch(err) {
                        //SuperMap.Console.error(err);
                    }
                    break;
                case "Feature":
                    try {
                        results = this.parseFeature(obj);
                        results.type = "Feature";
                    } catch(err) {
                        //SuperMap.Console.error(err);
                    }
                    break;
                case "FeatureCollection":
                    // for type FeatureCollection, we allow input to be any type
                    results = [];
                    switch(obj.type) {
                        case "Feature":
                            try {
                                results.push(this.parseFeature(obj));
                            } catch(err) {
                                results = null;
                                //SuperMap.Console.error(err);
                            }
                            break;
                        case "FeatureCollection":
                            for(var i=0, len=obj.features.length; i<len; ++i) {
                                try {
                                    results.push(this.parseFeature(obj.features[i]));
                                } catch(err) {
                                    results = null;
                                   // SuperMap.Console.error(err);
                                }
                            }
                            break;
                        default:
                            try {
                                var geom = this.parseGeometry(obj);
                                results.push(new SuperMap.Feature.Vector(geom));
                            } catch(err) {
                                results = null;
                                //SuperMap.Console.error(err);
                            }
                    }
                break;
            }
        }
        return results;
    },
    
    /**
     * Method: isValidType
     * 检查一个GeoJSON对象是否和给定的类型相符的合法的对象。
     *
     * Returns:
     * {Boolean} GeoJSON是否是给定类型的合法对象。
     */
    isValidType: function(obj, type) {
        var valid = false;
        switch(type) {
            case "Geometry":
                if(SuperMap.Util.indexOf(
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
                if(obj.type == type) {
                    valid = true;
                } else {
                    //SuperMap.Console.error("Cannot convert types from " +
                                              //obj.type + " to " + type);
                }
        }
        return valid;
    },
    
    /**
     * Method: parseFeature
     * 将一个GeoJSON中的feature转化成<SuperMap.Feature.Vector>对象。
     *
     * Parameters:
     * obj - {Object} 从GeoJSON对象中创建一个对象。
     *
     * Returns:
     * {<SuperMap.Feature.Vector>} 一个要素。
     */
    parseFeature: function(obj) {
        var feature, geometry, attributes, bbox;
        attributes = (obj.properties) ? obj.properties : {};
        bbox = (obj.geometry && obj.geometry.bbox) || obj.bbox;
        try {
            geometry = this.parseGeometry(obj.geometry);
        } catch(err) {
            // deal with bad geometries
            throw err;
        }
        feature = new SuperMap.Feature.Vector(geometry, attributes);
        if(bbox) {
            feature.bounds = SuperMap.Bounds.fromArray(bbox);
        }
        if(obj.id) {
            feature.fid = obj.id;
        }
        return feature;
    },
    
    /**
     * Method: parseGeometry
     * 将一个GeoJSON中的几何要素转化成<SuperMap.Geometry>对象。
     *
     * Parameters:
     * obj - {Object} 从GeoJSON对象中创建一个对象。
     *
     * Returns: 
     * {<SuperMap.Geometry>} 一个几何要素。
     */
    parseGeometry: function(obj) {
        if (obj == null) {
            return null;
        }
        var geometry, collection = false;
        if(obj.type == "GeometryCollection") {
            if(!(SuperMap.Util.isArray(obj.geometries))) {
                throw "GeometryCollection must have geometries array: " + obj;
            }
            var numGeom = obj.geometries.length;
            var components = new Array(numGeom);
            for(var i=0; i<numGeom; ++i) {
                components[i] = this.parseGeometry.apply(
                    this, [obj.geometries[i]]
                );
            }
            geometry = new SuperMap.Geometry.Collection(components);
            collection = true;
        } else {
            if(!(SuperMap.Util.isArray(obj.coordinates))) {
                throw "Geometry must have coordinates array: " + obj;
            }
            if(!this.parseCoords[obj.type.toLowerCase()]) {
                throw "Unsupported geometry type: " + obj.type;
            }
            try {
                geometry = this.parseCoords[obj.type.toLowerCase()].apply(
                    this, [obj.coordinates]
                );
            } catch(err) {
                // deal with bad coordinates
                throw err;
            }
        }
        // We don't reproject collections because the children are reprojected
        // for us when they are created.
        if (this.internalProjection && this.externalProjection && !collection) {
            geometry.transform(this.externalProjection, 
                               this.internalProjection); 
        }                       
        return geometry;
    },
    
    /**
     * Property: parseCoords
     * 一个属性名对应着GeoJSON对象的几何类型的对象。每个属性其实都是一个实际上做解析用的方法。
     */
    parseCoords: {
        /**
         * Method: parseCoords.point
         * 将一组坐标成一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的一组坐标。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "point": function(array) {
            if (this.ignoreExtraDims == false && 
                  array.length != 2) {
                    throw "Only 2D points are supported: " + array;
            }
            return new SuperMap.Geometry.Point(array[0], array[1]);
        },
        
        /**
         * Method: parseCoords.multipoint
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的坐标组数组。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "multipoint": function(array) {
            var points = [];
            var p = null;
            for(var i=0, len=array.length; i<len; ++i) {
                try {
                    p = this.parseCoords["point"].apply(this, [array[i]]);
                } catch(err) {
                    throw err;
                }
                points.push(p);
            }
            return new SuperMap.Geometry.MultiPoint(points);
        },

        /**
         * Method: parseCoords.linestring
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的坐标组数组。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "linestring": function(array) {
            var points = [];
            var p = null;
            for(var i=0, len=array.length; i<len; ++i) {
                try {
                    p = this.parseCoords["point"].apply(this, [array[i]]);
                } catch(err) {
                    throw err;
                }
                points.push(p);
            }
            return new SuperMap.Geometry.LineString(points);
        },
        
        /**
         * Method: parseCoords.multilinestring
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的坐标组数组。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "multilinestring": function(array) {
            var lines = [];
            var l = null;
            for(var i=0, len=array.length; i<len; ++i) {
                try {
                    l = this.parseCoords["linestring"].apply(this, [array[i]]);
                } catch(err) {
                    throw err;
                }
                lines.push(l);
            }
            return new SuperMap.Geometry.MultiLineString(lines);
        },
        
        /**
         * Method: parseCoords.polygon
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "polygon": function(array) {
            var rings = [];
            var r, l;
            for(var i=0, len=array.length; i<len; ++i) {
                try {
                    l = this.parseCoords["linestring"].apply(this, [array[i]]);
                } catch(err) {
                    throw err;
                }
                r = new SuperMap.Geometry.LinearRing(l.components);
                rings.push(r);
            }
            return new SuperMap.Geometry.Polygon(rings);
        },

        /**
         * Method: parseCoords.multipolygon
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的坐标组数组。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "multipolygon": function(array) {
            var polys = [];
            var p = null;
            for(var i=0, len=array.length; i<len; ++i) {
                try {
                    p = this.parseCoords["polygon"].apply(this, [array[i]]);
                } catch(err) {
                    throw err;
                }
                polys.push(p);
            }
            return new SuperMap.Geometry.MultiPolygon(polys);
        },

        /**
         * Method: parseCoords.box
         * 将坐标组数组转化成为一个<SuperMap.Geometry>对象。
         *
         * Parameters:
         * array - {Object} GeoJSON片段中的坐标组数组。
         *
         * Returns:
         * {<SuperMap.Geometry>} 一个几何对象。
         */
        "box": function(array) {
            if(array.length != 2) {
                throw "GeoJSON box coordinates must have 2 elements";
            }
            return new SuperMap.Geometry.Polygon([
                new SuperMap.Geometry.LinearRing([
                    new SuperMap.Geometry.Point(array[0][0], array[0][1]),
                    new SuperMap.Geometry.Point(array[1][0], array[0][1]),
                    new SuperMap.Geometry.Point(array[1][0], array[1][1]),
                    new SuperMap.Geometry.Point(array[0][0], array[1][1]),
                    new SuperMap.Geometry.Point(array[0][0], array[0][1])
                ])
            ]);
        }

    },

    /**
     * APIMethod: write
     * 序列化一个要素对象，几何对象，要素对象数组为一个GeoJSON字符串。
     *
     * Parameters:
     * obj - {Object} 一个 <SuperMap.Feature.Vector> 对象，一个 <SuperMap.Geometry> 对象，
     *     或者一个要素对象数组。
     * pretty - {Boolean} 是否使用换行和缩进来控制输出。默认值为false。
     *
     * Returns:
     * {String} 一个GeoJSON字符串，它表示了输入的几何对象，要素对象，或者要素对象数组。
     */
    write: function(obj, pretty) {
        var geojson = {
            "type": null
        };
        if(SuperMap.Util.isArray(obj)) {
            geojson.type = "FeatureCollection";
            var numFeatures = obj.length;
            geojson.features = new Array(numFeatures);
            for(var i=0; i<numFeatures; ++i) {
                var element = obj[i];
                if(!element instanceof SuperMap.Feature.Vector) {
                    var msg = "FeatureCollection only supports collections " +
                              "of features: " + element;
                    throw msg;
                }
                geojson.features[i] = this.extract.feature.apply(
                    this, [element]
                );
            }
        } else if (obj.CLASS_NAME.indexOf("SuperMap.Geometry") == 0) {
            geojson = this.extract.geometry.apply(this, [obj]);
        } else if (obj instanceof SuperMap.Feature.Vector) {
            geojson = this.extract.feature.apply(this, [obj]);
            if(obj.layer && obj.layer.projection) {
                geojson.crs = this.createCRSObject(obj);
            }
        }
        return SuperMap.Format.JSON.prototype.write.apply(this,
                                                            [geojson, pretty]);
    },

    /**
     * Method: createCRSObject
     * 从一个要素对象中创建一个坐标参考系对象。
     *
     * Parameters:
     * object - {<SuperMap.Feature.Vector>} 要素对象
     *
     * Returns:
     * {Object} 一个可作为GeoJSON对象的crs属性使用的对象。
     */
    createCRSObject: function(object) {
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
    },
    
    /**
     * Property: extract
     * 一个属性名对应着GeoJSON类型的对象。其值为相应的实际的解析方法。
     */
    extract: {
        /**
         * Method: extract.feature
         * 返回一个表示单个要素对象的GeoJSON的一部分。
         *
         * Parameters:
         * feature - {<SuperMap.Feature.Vector>} 要素对象
         *
         * Returns:
         * {Object} 一个表示点的对象。
         */
        'feature': function(feature) {
            var geom = this.extract.geometry.apply(this, [feature.geometry]);
            var json = {
                "type": "Feature",
                "properties": feature.attributes,
                "geometry": geom
            };
            if (feature.fid != null) {
                json.id = feature.fid;
            }
            return json;
        },
        
        /**
         * Method: extract.geometry
         * 返回一个表示单个几何对象的GeoJSON的一部分。
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry>} 几何对象
         *
         * Returns:
         * {Object} 一个表示几何体的对象。
         */
        'geometry': function(geometry) {
            if (geometry == null) {
                return null;
            }
            if (this.internalProjection && this.externalProjection) {
                geometry = geometry.clone();
                geometry.transform(this.internalProjection, 
                                   this.externalProjection);
            }                       
            var geometryType = geometry.CLASS_NAME.split('.')[2];
            var data = this.extract[geometryType.toLowerCase()].apply(this, [geometry]);
            var json;
            if(geometryType == "Collection") {
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
         * Method: extract.point
         * 从一个点对象中返回一个坐标组。
         *
         * Parameters:
         * point - {<SuperMap.Geometry.Point>} 一个点对象。
         *
         * Returns: 
         * {Array} 一个表示一个点的坐标组。
         */
        'point': function(point) {
            return [point.x, point.y];
        },

        /**
         * Method: extract.multipoint
         * 从一个多点对象中返一个坐标组数组。
         *
         * Parameters:
         * multipoint - {<SuperMap.Geometry.MultiPoint>} 多点对象。
         *
         * Returns:
         * {Array} 一个表示多点的坐标组数组。
         */
        'multipoint': function(multipoint) {
            var array = [];
            for(var i=0, len=multipoint.components.length; i<len; ++i) {
                array.push(this.extract.point.apply(this, [multipoint.components[i]]));
            }
            return array;
        },
        
        /**
         * Method: extract.linestring
         * 从一个线对象中返回一个坐标组数组。
         *
         * Parameters:
         * linestring - {<SuperMap.Geometry.LineString>} 线对象。
         *
         * Returns:
         * {Array} 一个表示线对象的坐标组数组。
         */
        'linestring': function(linestring) {
            var array = [];
            for(var i=0, len=linestring.components.length; i<len; ++i) {
                array.push(this.extract.point.apply(this, [linestring.components[i]]));
            }
            return array;
        },

        /**
         * Method: extract.multilinestring
         * 从一个多线对象中返回一个线数组。
         * 
         * Parameters:
         * multilinestring - {<SuperMap.Geometry.MultiLineString>} 多线对象
         * 
         * Returns:
         * {Array} 一个表示多线的线数组。
         */
        'multilinestring': function(multilinestring) {
            var array = [];
            for(var i=0, len=multilinestring.components.length; i<len; ++i) {
                array.push(this.extract.linestring.apply(this, [multilinestring.components[i]]));
            }
            return array;
        },
        
        /**
         * Method: extract.polygon
         * 从一个面对象中返回一组线环。
         *
         * Parameters:
         * polygon - {<SuperMap.Geometry.Polygon> 面对象。
         * 
         * Returns:
         * {Array} 一组表示面的线环。
         */
        'polygon': function(polygon) {
            var array = [];
            for(var i=0, len=polygon.components.length; i<len; ++i) {
                array.push(this.extract.linestring.apply(this, [polygon.components[i]]));
            }
            return array;
        },

        /**
         * Method: extract.multipolygon
         * 从一个多面对象中返回一组面。
         * 
         * Parameters:
         * multipolygon - {<SuperMap.Geometry.MultiPolygon>} 多面对象。
         * 
         * Returns:
         * {Array} 一组表示多面的面。
         */
        'multipolygon': function(multipolygon) {
            var array = [];
            for(var i=0, len=multipolygon.components.length; i<len; ++i) {
                array.push(this.extract.polygon.apply(this, [multipolygon.components[i]]));
            }
            return array;
        },
        
        /**
         * Method: extract.collection
         * 从一个几何要素集合中一组几何要素数组。
         *
         * Parameters:
         * collection - {<SuperMap.Geometry.Collection>} 几何要素集合。
         * 
         * Returns:
         * {Array} 一组表示几何要素集合的几何要素数组。
         */
        'collection': function(collection) {
            var len = collection.components.length;
            var array = new Array(len);
            for(var i=0; i<len; ++i) {
                array[i] = this.extract.geometry.apply(
                    this, [collection.components[i]]
                );
            }
            return array;
        }
        

    },

    CLASS_NAME: "SuperMap.Format.GeoJSON" 

});     
