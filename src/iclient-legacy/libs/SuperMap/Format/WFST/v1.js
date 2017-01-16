/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML.js
 * @requires SuperMap/Format/WFST.js
 */

/**
 * Class: SuperMap.Format.WFST.v1
 * WFST类型解析器的超类。
 *
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.WFST.v1 = SuperMap.Class(SuperMap.Format.XML, {
    
    /**
     * Property: namespaces
     * {Object} 命名空间别名与命名空间URI之间的映射。
     */
    namespaces: {
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance",
        wfs: "http://www.opengis.net/wfs",
        gml: "http://www.opengis.net/gml",
        ogc: "http://www.opengis.net/ogc",
        ows: "http://www.opengis.net/ows"
    },
    
    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "wfs",

    /**
     * Property: version
     * {String} WFS version number.
     */
    version: null,

    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocations: null,
    
    /**
     * APIProperty: srsName
     * {String} 空间参考系的URI。
     */
    srsName: null,

    /**
     * APIProperty: extractAttributes
     * {Boolean} 是否从GML提取属性。默认值是true。
     */
    extractAttributes: true,
    
    /**
     * APIProperty: xy
     * {Boolean} GML中坐标数据x值与y值顺序。true:(x,y) 或 false:(y,x)
     *      不推荐改变此属性值。
     */
    xy: true,

    /**
     * Property: stateName
     * {Object} 地图要素对应节点赋予的状态。
     */
    stateName: null,
    
    /**
     * Constructor: SuperMap.Format.WFST.v1
     * 这个类的实例不直接创建，而是使用 <SuperMap.Format.WFST.v1_0_0> 或
     *      <SuperMap.Format.WFST.v1_1_0> 构造函数创建。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     */
    initialize: function(options) {
        // set state name mapping
        this.stateName = {};
        this.stateName[SuperMap.State.INSERT] = "wfs:Insert";
        this.stateName[SuperMap.State.UPDATE] = "wfs:Update";
        this.stateName[SuperMap.State.DELETE] = "wfs:Delete";
        SuperMap.Format.XML.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * Method: getSrsName
     */
    getSrsName: function(feature, options) {
        var srsName = options && options.srsName;
        if(!srsName) {
            if(feature && feature.layer) {
                srsName = feature.layer.projection.getCode();
            } else {
                srsName = this.srsName;
            }
        }
        return srsName;
    },

    /**
     * APIMethod: read
     * 从一个事务处理中解析响应。由于WFS分裂成Transaction请求
     *     (create, update, and delete) 和 GetFeature 请求 (read)， 这个方法用于解
     *     析这两种类型的响应。
     *
     * Parameters:
     * data - {String | Document} 要应用read方法的WFST文档。
     * options - {Object} read操作的选项(options)参数。
     *
     * Valid options properties:
     * output - {String} “features" 或 "object" 之一。默认的是"features" ，方法返回
     *      的是要素数组。如果设置成"object"，方法返回的是带有"features"属性和
     *      其他一些被解析器读取到的属性的一个对象。
     *
     * Returns:
     * {Array | Object} 输出取决于输出选项。
     */
    read: function(data, options) {
        options = options || {};
        SuperMap.Util.applyDefaults(options, {
            output: "features"
        });
        
        if(typeof data === "string") { 
            data = SuperMap.Format.XML.prototype.read.apply(this, [data]);
        }
        if(data && data.nodeType === 9) {
            data = data.documentElement;
        }
        var obj = {};
        if(data) {
            this.readNode(data, obj, true);
        }
        if(obj.features && options.output === "features") {
            obj = obj.features;
        }
        return obj;
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
        "wfs": {
            "FeatureCollection": function(node, obj) {
                obj.features = [];
                this.readChildNodes(node, obj);
            }
        }
    },
    
    /**
     * Method: write
     * Given an array of features, write a WFS transaction.  This assumes
     *     the features have a state property that determines the operation
     *     type - insert, update, or delete.
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} A list of features. See
     *     below for a more detailed description of the influence of the
     *     feature's *modified* property.
     * options - {Object}
     *
     * feature.modified rules:
     * If a feature has a modified property set, the following checks will be
     * made before a feature's geometry or attribute is included in an Update
     * transaction:
     * - *modified* is not set at all: The geometry and all attributes will be
     *     included.
     * - *modified.geometry* is set (null or a geometry): The geometry will be
     *     included. If *modified.attributes* is not set, all attributes will
     *     be included.
     * - *modified.attributes* is set: Only the attributes set (i.e. to null or
     *     a value) in *modified.attributes* will be included. 
     *     If *modified.geometry* is not set, the geometry will not be included.
     *
     * Valid options include:
     * - *multi* {Boolean} If set to true, geometries will be casted to
     *   Multi geometries before writing.
     *
     * Returns:
     * {String} A serialized WFS transaction.
     */
    write: function(features, options) {
        var node = this.writeNode("wfs:Transaction", {
            features:features,
            options: options
        });
        var value = this.schemaLocationAttr();
        if(value) {
            this.setAttributeNS(
                node, this.namespaces["xsi"], "xsi:schemaLocation",  value
            );
        }
        return SuperMap.Format.XML.prototype.write.apply(this, [node]);
    },
    
    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "wfs": {
            "GetFeature": function(options) {
                var node = this.createElementNSPlus("wfs:GetFeature", {
                    attributes: {
                        service: "WFS",
                        version: this.version,
                        handle: options && options.handle,
                        outputFormat: options && options.outputFormat,
                        maxFeatures: options && options.maxFeatures,
                        "xsi:schemaLocation": this.schemaLocationAttr(options)
                    }
                });
                if (typeof this.featureType === "string") {
                    this.writeNode("Query", options, node);
                } else {
                    for (var i=0,len = this.featureType.length; i<len; i++) { 
                        options.featureType = this.featureType[i]; 
                        this.writeNode("Query", options, node); 
                    } 
                }
                return node;
            },
            "Transaction": function(obj) {
                obj = obj || {};
                var options = obj.options || {};
                var node = this.createElementNSPlus("wfs:Transaction", {
                    attributes: {
                        service: "WFS",
                        version: this.version,
                        handle: options.handle
                    }
                });
                var i, len;
                var features = obj.features;
                if(features) {
                    // temporarily re-assigning geometry types
                    if (options.multi === true) {
                        SuperMap.Util.extend(this.geometryTypes, {
                            "SuperMap.Geometry.Point": "MultiPoint",
                            "SuperMap.Geometry.LineString": (this.multiCurve === true) ? "MultiCurve": "MultiLineString",
                            "SuperMap.Geometry.Polygon": (this.multiSurface === true) ? "MultiSurface" : "MultiPolygon"
                        });
                    }
                    var name, feature;
                    for(i=0, len=features.length; i<len; ++i) {
                        feature = features[i];
                        name = this.stateName[feature.state];
                        if(name) {
                            this.writeNode(name, {
                                feature: feature, 
                                options: options
                            }, node);
                        }
                    }
                    // switch back to original geometry types assignment
                    if (options.multi === true) {
                        this.setGeometryTypes();
                    }
                }
                if (options.nativeElements) {
                    for (i=0, len=options.nativeElements.length; i<len; ++i) {
                        this.writeNode("wfs:Native", 
                            options.nativeElements[i], node);
                    }
                }
                return node;
            },
            "Native": function(nativeElement) {
                var node = this.createElementNSPlus("wfs:Native", {
                    attributes: {
                        vendorId: nativeElement.vendorId,
                        safeToIgnore: nativeElement.safeToIgnore
                    },
                    value: nativeElement.value
                });
                return node;
            },
            "Insert": function(obj) {
                var feature = obj.feature;
                var options = obj.options;
                var node = this.createElementNSPlus("wfs:Insert", {
                    attributes: {
                        handle: options && options.handle
                    }
                });
                this.srsName = this.getSrsName(feature);
                this.writeNode("feature:_typeName", feature, node);
                return node;
            },
            "Update": function(obj) {
                var feature = obj.feature;
                var options = obj.options;
                var node = this.createElementNSPlus("wfs:Update", {
                    attributes: {
                        handle: options && options.handle,
                        typeName: (this.featureNS ? this.featurePrefix + ":" : "") +
                            this.featureType
                    }
                });
                if(this.featureNS) {
                    node.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
                }
                
                // add in geometry
                var modified = feature.modified;
                if (this.geometryName !== null && (!modified || modified.geometry !== undefined)) {
                    this.srsName = this.getSrsName(feature);
                    this.writeNode(
                        "Property", {name: this.geometryName, value: feature.geometry}, node
                    );
                }
        
                // add in attributes
                for(var key in feature.attributes) {
                    if(feature.attributes[key] !== undefined &&
                                (!modified || !modified.attributes ||
                                (modified.attributes && modified.attributes[key] !== undefined))) {
                        this.writeNode(
                            "Property", {name: key, value: feature.attributes[key]}, node
                        );
                    }
                }
                
                // add feature id filter
                this.writeNode("ogc:Filter", new SuperMap.Filter.FeatureId({
                    fids: [feature.fid]
                }), node);
        
                return node;
            },
            "Property": function(obj) {
                var node = this.createElementNSPlus("wfs:Property");
                this.writeNode("Name", obj.name, node);
                if(obj.value !== null) {
                    this.writeNode("Value", obj.value, node);
                }
                return node;
            },
            "Name": function(name) {
                return this.createElementNSPlus("wfs:Name", {value: name});
            },
            "Value": function(obj) {
                var node;
                if(obj instanceof SuperMap.Geometry) {
                    node = this.createElementNSPlus("wfs:Value");
                    var geom = this.writeNode("feature:_geometry", obj).firstChild;
                    node.appendChild(geom);
                } else {
                    node = this.createElementNSPlus("wfs:Value", {value: obj});                
                }
                return node;
            },
            "Delete": function(obj) {
                var feature = obj.feature;
                var options = obj.options;
                var node = this.createElementNSPlus("wfs:Delete", {
                    attributes: {
                        handle: options && options.handle,
                        typeName: (this.featureNS ? this.featurePrefix + ":" : "") +
                            this.featureType
                    }
                });
                if(this.featureNS) {
                    node.setAttribute("xmlns:" + this.featurePrefix, this.featureNS);
                }
                this.writeNode("ogc:Filter", new SuperMap.Filter.FeatureId({
                    fids: [feature.fid]
                }), node);
                return node;
            }
        }
    },

    /**
     * Method: schemaLocationAttr
     * Generate the xsi:schemaLocation attribute value.
     *
     * Returns:
     * {String} The xsi:schemaLocation attribute or undefined if none.
     */
    schemaLocationAttr: function(options) {
        options = SuperMap.Util.extend({
            featurePrefix: this.featurePrefix,
            schema: this.schema
        }, options);
        var schemaLocations = SuperMap.Util.extend({}, this.schemaLocations);
        if(options.schema) {
            schemaLocations[options.featurePrefix] = options.schema;
        }
        var parts = [];
        var uri;
        for(var key in schemaLocations) {
            uri = this.namespaces[key];
            if(uri) {
                parts.push(uri + " " + schemaLocations[key]);
            }
        }
        var value = parts.join(" ") || undefined;
        return value;
    },
    
    /**
     * Method: setFilterProperty
     * Set the property of each spatial filter.
     *
     * Parameters:
     * filter - {<SuperMap.Filter>}
     */
    setFilterProperty: function(filter) {
        if(filter.filters) {
            for(var i=0, len=filter.filters.length; i<len; ++i) {
                SuperMap.Format.WFST.v1.prototype.setFilterProperty.call(this, filter.filters[i]);
            }
        } else {
            if(filter instanceof SuperMap.Filter.Spatial && !filter.property) {
                // got a spatial filter without property, so set it
                filter.property = this.geometryName;
            }
        }
    },

    CLASS_NAME: "SuperMap.Format.WFST.v1" 

});
