/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML.js
 * @requires SuperMap/Format/GML.js
 */

/**
 * 尽管在整体构建的时候要求创建该类，但是如果GML格式类被排除的话，其命
 *     名空间将在这里定义。
 */
if(!SuperMap.Format.GML) {
    SuperMap.Format.GML = {};
}

/**
 * Class: SuperMap.Format.GML.Base
 * GML类型解析器的超类。
 *
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.GML.Base = SuperMap.Class(SuperMap.Format.XML, {
    
    /**
     * Property: namespaces
     * {Object} 命名空间别名与命名空间URI之间的映射。
     */
    namespaces: {
        gml: "http://www.opengis.net/gml",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        wfs: "http://www.opengis.net/wfs" // this is a convenience for reading wfs:FeatureCollection
    },
    
    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "gml",

    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: null,
    
    /**
     * APIProperty: featureType
     * {Array(String) or String} 要素类型名，可以理解成数据集(不带数据源前缀)。
     */
    featureType: null,
    
    /**
     * APIProperty: featureNS
     * {String} 要素的命名空间，必须在构造函数的options参数中进行设置。
     */
    featureNS: null,

    /**
     * APIProperty: geometry
     * {String} 几何图形元素的名称。默认值是 "geometry" 。当为null的时候它将被
     *      设置成 <read> 操作读到的第一个几何图形属性名称。
     */
    geometryName: "geometry",

    /**
     * APIProperty: extractAttributes
     * {Boolean} 从GML数据抽取属性。默认值是true。
     */
    extractAttributes: true,
    
    /**
     * APIProperty: srsName
     * {String} 空间参考系的URI。可选项，用于单个部分的几何图形和强制集合
     *      以及多个部分的几何图形。如果设置了，那srsName属性将赋给所有几何
     *      图形。默认值是null。
     */
    srsName: null,

    /**
     * APIProperty: xy
     * {Boolean} GML中坐标数据x值与y值顺序。true:(x,y) 或 false:(y,x)
     *      不推荐改变此属性值。
     */
    xy: true,

    /**
     * Property: geometryTypes
     * {Object} Maps SuperMap geometry class names to GML element names.
     *     Use <setGeometryTypes> before accessing this property.
     */
    geometryTypes: null,

    /**
     * Property: singleFeatureType
     * {Boolean} True if there is only 1 featureType, and not an array
     *     of featuretypes.
     */
    singleFeatureType: null,
    
    /**
     * Property: autoConfig
     * {Boolean} Indicates if the format was configured without a <featureNS>,
     * but auto-configured <featureNS> and <featureType> during read.
     * Subclasses making use of <featureType> auto-configuration should make
     * the first call to the <readNode> method (usually in the read method)
     * with true as 3rd argument, so the auto-configured featureType can be
     * reset and the format can be reused for subsequent reads with data from
     * different featureTypes. Set to false after read if you want to keep the
     * auto-configured values.
     */

    /**
     * Property: regExes
     * Compiled regular expressions for manipulating strings.
     */
    regExes: {
        trimSpace: (/^\s*|\s*$/g),
        removeSpace: (/\s*/g),
        splitSpace: (/\s+/),
        trimComma: (/\s*,\s*/g),
        featureMember: (/^(.*:)?featureMembers?$/)
    },

    /**
     * Constructor: SuperMap.Format.GML.Base
     * 这个类的实例不直接创建，而是使用 <SuperMap.Format.GML.v2> 或
     *      <SuperMap.Format.GML.v3> 构造函数创建。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     *
     * 有效的选项属性：
     * featureType - {Array(String) or String} 要素类型名(write操作需要)，可以理解
     *      成数据集(不带数据源前缀)。
     * featureNS - {String} 要素的命名空间(write操作需要)。
     * geometryName - {String} 几何图形名称(write操作需要)。
     */
    initialize: function(options) {
        SuperMap.Format.XML.prototype.initialize.apply(this, [options]);
        this.setGeometryTypes();
        if(options && options.featureNS) {
            this.setNamespace("feature", options.featureNS);
        }
        this.singleFeatureType = !options || (typeof options.featureType === "string");
    },
    
    /**
     * Method: read
     *
     * Parameters:
     * data - {DOMElement} A gml:featureMember element, a gml:featureMembers
     *     element, or an element containing either of the above at any level.
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)} An array of features.
     */
    read: function(data) {
        if(typeof data === "string") { 
            data = SuperMap.Format.XML.prototype.read.apply(this, [data]);
        }
        if(data && data.nodeType === 9) {
            data = data.documentElement;
        }
        var features = [];
        this.readNode(data, {features: features}, true);
        if(features.length == 0) {
            // look for gml:featureMember elements
            var elements = this.getElementsByTagNameNS(
                data, this.namespaces.gml, "featureMember"
            );
            if(elements.length) {
                for(var i=0, len=elements.length; i<len; ++i) {
                    this.readNode(elements[i], {features: features}, true);
                }
            } else {
                // look for gml:featureMembers elements (this is v3, but does no harm here)
                var elements = this.getElementsByTagNameNS(
                    data, this.namespaces.gml, "featureMembers"
                );
                if(elements.length) {
                    // there can be only one
                    this.readNode(elements[0], {features: features}, true);
                }
            }
        }
        return features;
    },
    
    /**
     * Method: readNode
     * Shorthand for applying one of the named readers given the node
     *     namespace and local name.  Readers take two args (node, obj) and
     *     generally extend or modify the second.
     *
     * Parameters:
     * node - {DOMElement} The node to be read (required).
     * obj - {Object} The object to be modified (optional).
     * first - {Boolean} Should be set to true for the first node read. This
     *     is usually the readNode call in the read method. Without this being
     *     set, auto-configured properties will stick on subsequent reads.
     *
     * Returns:
     * {Object} The input object, modified (or a new one if none was provided).
     */
    readNode: function(node, obj, first) {
        // on subsequent calls of format.read(), we want to reset auto-
        // configured properties and auto-configure again.
        if (first === true && this.autoConfig === true) {
            this.featureType = null;
            delete this.namespaceAlias[this.featureNS];
            delete this.namespaces["feature"];
            this.featureNS = null;
        }
        // featureType auto-configuration
        if (!this.featureNS && (!(node.prefix in this.namespaces) &&
                node.parentNode.namespaceURI === this.namespaces["gml"] &&
                this.regExes.featureMember.test(node.parentNode.nodeName))) {
            this.featureType = node.nodeName.split(":").pop();
            this.setNamespace("feature", node.namespaceURI);
            this.featureNS = node.namespaceURI;
            this.autoConfig = true;
        }
        return SuperMap.Format.XML.prototype.readNode.apply(this, [node, obj]);
    },

    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {
        "gml": {
            "featureMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "featureMembers": function(node, obj) {
                this.readChildNodes(node, obj);                
            },
            "name": function(node, obj) {
                obj.name = this.getChildValue(node);
            },
            "boundedBy": function(node, obj) {
                var container = {};
                this.readChildNodes(node, container);
                if(container.components && container.components.length > 0) {
                    obj.bounds = container.components[0];
                }
            },
            "Point": function(node, container) {
                var obj = {points: []};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(obj.points[0]);
            },
            "coordinates": function(node, obj) {
                var str = this.getChildValue(node).replace(
                    this.regExes.trimSpace, ""
                );
                str = str.replace(this.regExes.trimComma, ",");
                var pointList = str.split(this.regExes.splitSpace);
                var coords;
                var numPoints = pointList.length;
                var points = new Array(numPoints);
                for(var i=0; i<numPoints; ++i) {
                    coords = pointList[i].split(",");
                    if (this.xy) {
                        points[i] = new SuperMap.Geometry.Point(
                            coords[0], coords[1], coords[2]
                        );
                    } else {
                        points[i] = new SuperMap.Geometry.Point(
                            coords[1], coords[0], coords[2]
                        );
                    }
                }
                obj.points = points;
            },
            "coord": function(node, obj) {
                var coord = {};
                this.readChildNodes(node, coord);
                if(!obj.points) {
                    obj.points = [];
                }
                obj.points.push(new SuperMap.Geometry.Point(
                    coord.x, coord.y, coord.z
                ));
            },
            "X": function(node, coord) {
                coord.x = this.getChildValue(node);
            },
            "Y": function(node, coord) {
                coord.y = this.getChildValue(node);
            },
            "Z": function(node, coord) {
                coord.z = this.getChildValue(node);
            },
            "MultiPoint": function(node, container) {
                var obj = {components: []};
                this.readChildNodes(node, obj);
                container.components = [
                    new SuperMap.Geometry.MultiPoint(obj.components)
                ];
            },
            "pointMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "LineString": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(
                    new SuperMap.Geometry.LineString(obj.points)
                );
            },
            "MultiLineString": function(node, container) {
                var obj = {components: []};
                this.readChildNodes(node, obj);
                container.components = [
                    new SuperMap.Geometry.MultiLineString(obj.components)
                ];
            },
            "lineStringMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Polygon": function(node, container) {
                var obj = {outer: null, inner: []};
                this.readChildNodes(node, obj);
                obj.inner.unshift(obj.outer);
                if(!container.components) {
                    container.components = [];
                }
                container.components.push(
                    new SuperMap.Geometry.Polygon(obj.inner)
                );
            },
            "LinearRing": function(node, obj) {
                var container = {};
                this.readChildNodes(node, container);
                obj.components = [new SuperMap.Geometry.LinearRing(
                    container.points
                )];
            },
            "MultiPolygon": function(node, container) {
                var obj = {components: []};
                this.readChildNodes(node, obj);
                container.components = [
                    new SuperMap.Geometry.MultiPolygon(obj.components)
                ];
            },
            "polygonMember": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "GeometryCollection": function(node, container) {
                var obj = {components: []};
                this.readChildNodes(node, obj);
                container.components = [
                    new SuperMap.Geometry.Collection(obj.components)
                ];
            },
            "geometryMember": function(node, obj) {
                this.readChildNodes(node, obj);
            }
        },
        "feature": {
            "*": function(node, obj) {
                // The node can either be named like the featureType, or it
                // can be a child of the feature:featureType.  Children can be
                // geometry or attributes.
                var name;
                var local = node.localName || node.nodeName.split(":").pop();
                // Since an attribute can have the same name as the feature type
                // we only want to read the node as a feature if the parent
                // node can have feature nodes as children.  In this case, the
                // obj.features property is set.
                if (obj.features) {
                    if (!this.singleFeatureType &&
                        (SuperMap.Util.indexOf(this.featureType, local) !== -1)) {
                        name = "_typeName";
                    } else if(local === this.featureType) {
                        name = "_typeName";
                    }
                } else {
                    // Assume attribute elements have one child node and that the child
                    // is a text node.  Otherwise assume it is a geometry node.
                    if(node.childNodes.length == 0 ||
                       (node.childNodes.length === 1 && node.firstChild.nodeType === 3)) {
                        if(this.extractAttributes) {
                            name = "_attribute";
                        }
                    } else {
                        name = "_geometry";
                    }
                }
                if(name) {
                    this.readers.feature[name].apply(this, [node, obj]);
                }
            },
            "_typeName": function(node, obj) {
                var container = {components: [], attributes: {}};
                this.readChildNodes(node, container);
                // look for common gml namespaced elements
                if(container.name) {
                    container.attributes.name = container.name;
                }
                var feature = new SuperMap.Feature.Vector(
                    container.components[0], container.attributes
                );
                if (!this.singleFeatureType) {
                    feature.type = node.nodeName.split(":").pop();
                    feature.namespace = node.namespaceURI;
                }
                var fid = node.getAttribute("fid") ||
                    this.getAttributeNS(node, this.namespaces["gml"], "id");
                if(fid) {
                    feature.fid = fid;
                }
                if(this.internalProjection && this.externalProjection &&
                   feature.geometry) {
                    feature.geometry.transform(
                        this.externalProjection, this.internalProjection
                    );
                }
                if(container.bounds) {
                    feature.bounds = container.bounds;
                }
                obj.features.push(feature);
            },
            "_geometry": function(node, obj) {
                if (!this.geometryName) {
                    this.geometryName = node.nodeName.split(":").pop();
                }
                this.readChildNodes(node, obj);
            },
            "_attribute": function(node, obj) {
                var local = node.localName || node.nodeName.split(":").pop();
                var value = this.getChildValue(node);
                obj.attributes[local] = value;
            }
        },
        "wfs": {
            "FeatureCollection": function(node, obj) {
                this.readChildNodes(node, obj);
            }
        }
    },
    
    /**
     * Method: write
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>) | SuperMap.Feature.Vector}
     *     An array of features or a single feature.
     *
     * Returns:
     * {String} Given an array of features, a doc with a gml:featureMembers
     *     element will be returned.  Given a single feature, a doc with a
     *     gml:featureMember element will be returned.
     */
    write: function(features) {
        var name;
        if(SuperMap.Util.isArray(features)) {
            name = "featureMembers";
        } else {
            name = "featureMember";
        }
        var root = this.writeNode("gml:" + name, features);
        this.setAttributeNS(
            root, this.namespaces["xsi"],
            "xsi:schemaLocation", this.schemaLocation
        );

        return SuperMap.Format.XML.prototype.write.apply(this, [root]);
    },
    
    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "gml": {
            "featureMember": function(feature) {
                var node = this.createElementNSPlus("gml:featureMember");
                this.writeNode("feature:_typeName", feature, node);
                return node;
            },
            "MultiPoint": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiPoint");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode("pointMember", components[i], node);
                }
                return node;
            },
            "pointMember": function(geometry) {
                var node = this.createElementNSPlus("gml:pointMember");
                this.writeNode("Point", geometry, node);
                return node;
            },
            "MultiLineString": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiLineString");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode("lineStringMember", components[i], node);
                }
                return node;
            },
            "lineStringMember": function(geometry) {
                var node = this.createElementNSPlus("gml:lineStringMember");
                this.writeNode("LineString", geometry, node);
                return node;
            },
            "MultiPolygon": function(geometry) {
                var node = this.createElementNSPlus("gml:MultiPolygon");
                var components = geometry.components || [geometry];
                for(var i=0, ii=components.length; i<ii; ++i) {
                    this.writeNode(
                        "polygonMember", components[i], node
                    );
                }
                return node;
            },
            "polygonMember": function(geometry) {
                var node = this.createElementNSPlus("gml:polygonMember");
                this.writeNode("Polygon", geometry, node);
                return node;
            },
            "GeometryCollection": function(geometry) {
                var node = this.createElementNSPlus("gml:GeometryCollection");
                for(var i=0, len=geometry.components.length; i<len; ++i) {
                    this.writeNode("geometryMember", geometry.components[i], node);
                }
                return node;
            },
            "geometryMember": function(geometry) {
                var node = this.createElementNSPlus("gml:geometryMember");
                var child = this.writeNode("feature:_geometry", geometry);
                node.appendChild(child.firstChild);
                return node;
            }
        },
        "feature": {
            "_typeName": function(feature) {
                var node = this.createElementNSPlus("feature:" + this.featureType, {
                    attributes: {fid: feature.fid}
                });
                if(feature.geometry) {
                    this.writeNode("feature:_geometry", feature.geometry, node);
                }
                for(var name in feature.attributes) {
                    var value = feature.attributes[name];
                    if(value != null) {
                        this.writeNode(
                            "feature:_attribute",
                            {name: name, value: value}, node
                        );
                    }
                }
                return node;
            },
            "_geometry": function(geometry) {
                if(this.externalProjection && this.internalProjection) {
                    geometry = geometry.clone().transform(
                        this.internalProjection, this.externalProjection
                    );
                }    
                var node = this.createElementNSPlus(
                    "feature:" + this.geometryName
                );
                var type = this.geometryTypes[geometry.CLASS_NAME];
                var child = this.writeNode("gml:" + type, geometry, node);
                if(this.srsName) {
                    child.setAttribute("srsName", this.srsName);
                }
                return node;
            },
            "_attribute": function(obj) {
                return this.createElementNSPlus("feature:" + obj.name, {
                    value: obj.value
                });
            }
        },
        "wfs": {
            "FeatureCollection": function(features) {
                /**
                 * This is only here because GML2 only describes abstract
                 * feature collections.  Typically, you would not be using
                 * the GML format to write wfs elements.  This just provides
                 * some way to write out lists of features.  GML3 defines the
                 * featureMembers element, so that is used by default instead.
                 */
                var node = this.createElementNSPlus("wfs:FeatureCollection");
                for(var i=0, len=features.length; i<len; ++i) {
                    this.writeNode("gml:featureMember", features[i], node);
                }
                return node;
            }
        }
    },
    
    /**
     * Method: setGeometryTypes
     * Sets the <geometryTypes> mapping.
     */
    setGeometryTypes: function() {
        this.geometryTypes = {
            "SuperMap.Geometry.Point": "Point",
            "SuperMap.Geometry.MultiPoint": "MultiPoint",
            "SuperMap.Geometry.LineString": "LineString",
            "SuperMap.Geometry.MultiLineString": "MultiLineString",
            "SuperMap.Geometry.Polygon": "Polygon",
            "SuperMap.Geometry.MultiPolygon": "MultiPolygon",
            "SuperMap.Geometry.Collection": "GeometryCollection"
        };
    },

    CLASS_NAME: "SuperMap.Format.GML.Base" 

});
