/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/XML.js
 * @requires SuperMap/Feature/Vector.js
 * @requires SuperMap/Geometry/Point.js
 * @requires SuperMap/Geometry/MultiPoint.js
 * @requires SuperMap/Geometry/LineString.js
 * @requires SuperMap/Geometry/MultiLineString.js
 * @requires SuperMap/Geometry/Polygon.js
 * @requires SuperMap/Geometry/MultiPolygon.js
 */

/**
 * Class: SuperMap.Format.GML
 * 读写GML类。 通过 <SuperMap.Format.GML> 构造器创建新实例。
 * 
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.GML = SuperMap.Class(SuperMap.Format.XML, {
    
    /**
     * APIProperty: featureNS
     * {String} 要素属性使用的命名空间。默认值是：
     *     "http://mapserver.gis.umn.edu/mapserver"。
     */
    featureNS: "http://mapserver.gis.umn.edu/mapserver",
    
    /**
     * APIProperty: featurePrefix
     * {String} 要素节点的命名空间别名（或前缀）。默认值是"feature"。
     */
    featurePrefix: "feature",
    
    /**
     * APIProperty: featureName
     * {String} 要素的元素名称。默认值是 "featureMember"。
     */
    featureName: "featureMember", 
    
    /**
     * APIProperty: layerName
     * {String} 数据图层名称。默认值是"features"。
     */
    layerName: "features",
    
    /**
     * APIProperty: geometryName
     * {String} 几何要素名称，默认值是"geometry"。
     */
    geometryName: "geometry",
    
    /** 
     * APIProperty: collectionName
     * {String} featureCollection 元素的名称。
     */
    collectionName: "FeatureCollection",
    
    /**
     * APIProperty: gmlns
     * {String} GML 的命名空间。
     */
    gmlns: "http://www.opengis.net/gml",

    /**
     * APIProperty: extractAttributes
     * {Boolean} 从GML数据中提取属性。
     */
    extractAttributes: true,
    
    /**
     * APIProperty: xy
     * {Boolean} GML中坐标数据x值与y值顺序。true:(x,y) 或 false:(y,x)
     * 不推荐改变此属性值。
     */ 
    xy: true,
    
    /**
     * Constructor: SuperMap.Format.GML
     * 创建GML解析器。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性被直接设置为实例属性。
     */
    initialize: function(options) {
        // compile regular expressions once instead of every time they are used
        this.regExes = {
            trimSpace: (/^\s*|\s*$/g),
            removeSpace: (/\s*/g),
            splitSpace: (/\s+/),
            trimComma: (/\s*,\s*/g)
        };
        SuperMap.Format.XML.prototype.initialize.apply(this, [options]);
    },

    /**
     * APIMethod: read
     * 从字符串中读取数据，返回要素数组。 
     * 
     * Parameters:
     * data - {String} 或 {DOMElement} 被读取或解析的数据。
     *
     * Returns:
     * {Array(<SuperMap.Feature.Vector>)} 要素数组。
     */
    read: function(data) {
        if(typeof data === "string") { 
            data = SuperMap.Format.XML.prototype.read.apply(this, [data]);
        }
        var featureNodes = this.getElementsByTagNameNS(data.documentElement,
                                                       this.gmlns,
                                                       this.featureName);
        var features = [];
        for(var i=0; i<featureNodes.length; i++) {
            var feature = this.parseFeature(featureNodes[i]);
            if(feature) {
                features.push(feature);
            }
        }
        return features;
    },
    
    /**
     * Method: parseFeature
     * This function is the core of the GML parsing code in SuperMap.
     *    It creates the geometries that are then attached to the returned
     *    feature, and calls parseAttributes() to get attribute data out.
     *    
     * Parameters:
     * node - {DOMElement} A GML feature node. 
     */
    parseFeature: function(node) {
        // only accept one geometry per feature - look for highest "order"
        var order = ["MultiPolygon", "Polygon",
                     "MultiLineString", "LineString",
                     "MultiPoint", "Point", "Envelope"];
        // FIXME: In case we parse a feature with no geometry, but boundedBy an Envelope,
        // this code creates a geometry derived from the Envelope. This is not correct.
        var type, nodeList, geometry, parser;
        for(var i=0; i<order.length; ++i) {
            type = order[i];
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, type);
            if(nodeList.length > 0) {
                // only deal with first geometry of this type
                parser = this.parseGeometry[type.toLowerCase()];
                if(parser) {
                    geometry = parser.apply(this, [nodeList[0]]);
                    if (this.internalProjection && this.externalProjection) {
                        geometry.transform(this.externalProjection, 
                                           this.internalProjection); 
                    }                       
                } else {
                    throw new TypeError("Unsupported geometry type: " + type);
                }
                // stop looking for different geometry types
                break;
            }
        }

        var bounds;
        var boxNodes = this.getElementsByTagNameNS(node, this.gmlns, "Box");
        for(i=0; i<boxNodes.length; ++i) {
            var boxNode = boxNodes[i];
            var box = this.parseGeometry["box"].apply(this, [boxNode]);
            var parentNode = boxNode.parentNode;
            var parentName = parentNode.localName ||
                             parentNode.nodeName.split(":").pop();
            if(parentName === "boundedBy") {
                bounds = box;
            } else {
                geometry = box.toGeometry();
            }
        }
        
        // construct feature (optionally with attributes)
        var attributes;
        if(this.extractAttributes) {
            attributes = this.parseAttributes(node);
        }
        var feature = new SuperMap.Feature.Vector(geometry, attributes);
        feature.bounds = bounds;
        
        feature.gml = {
            featureType: node.firstChild.nodeName.split(":")[1],
            featureNS: node.firstChild.namespaceURI,
            featureNSPrefix: node.firstChild.prefix
        };
                
        // assign fid - this can come from a "fid" or "id" attribute
        var childNode = node.firstChild;
        var fid;
        while(childNode) {
            if(childNode.nodeType === 1) {
                fid = childNode.getAttribute("fid") ||
                      childNode.getAttribute("id");
                if(fid) {
                    break;
                }
            }
            childNode = childNode.nextSibling;
        }
        feature.fid = fid;
        return feature;
    },
    
    /**
     * Property: parseGeometry
     * Properties of this object are the functions that parse geometries based
     *     on their type.
     */
    parseGeometry: {
        
        /**
         * Method: parseGeometry.point
         * Given a GML node representing a point geometry, create an SuperMap
         *     point geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.Point>} A point geometry.
         */
        point: function(node) {
            /**
             * Three coordinate variations to consider:
             * 1) <gml:pos>x y z</gml:pos>
             * 2) <gml:coordinates>x, y, z</gml:coordinates>
             * 3) <gml:coord><gml:X>x</gml:X><gml:Y>y</gml:Y></gml:coord>
             */
            var nodeList, coordString;
            var coords = [];

            // look for <gml:pos>
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns, "pos");
            if(nodeList.length > 0) {
                coordString = nodeList[0].firstChild.nodeValue;
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace);
            }

            // look for <gml:coordinates>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coordinates");
                if(nodeList.length > 0) {
                    coordString = nodeList[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.removeSpace,
                                                      "");
                    coords = coordString.split(",");
                }
            }

            // look for <gml:coord>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coord");
                if(nodeList.length > 0) {
                    var xList = this.getElementsByTagNameNS(nodeList[0],
                                                            this.gmlns, "X");
                    var yList = this.getElementsByTagNameNS(nodeList[0],
                                                            this.gmlns, "Y");
                    if(xList.length > 0 && yList.length > 0) {
                        coords = [xList[0].firstChild.nodeValue,
                                  yList[0].firstChild.nodeValue];
                    }
                }
            }
                
            // preserve third dimension
            if(coords.length === 2) {
                coords[2] = null;
            }
            
            if (this.xy) {
                return new SuperMap.Geometry.Point(coords[0], coords[1],
                                                 coords[2]);
            }
            else{
                return new SuperMap.Geometry.Point(coords[1], coords[0],
                                                 coords[2]);
            }
        },
        
        /**
         * Method: parseGeometry.multipoint
         * Given a GML node representing a multipoint geometry, create an
         *     SuperMap multipoint geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.MultiPoint>} A multipoint geometry.
         */
        multipoint: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "Point");
            var components = [];
            if(nodeList.length > 0) {
                var point;
                for(var i=0; i<nodeList.length; ++i) {
                    point = this.parseGeometry.point.apply(this, [nodeList[i]]);
                    if(point) {
                        components.push(point);
                    }
                }
            }
            return new SuperMap.Geometry.MultiPoint(components);
        },
        
        /**
         * Method: parseGeometry.linestring
         * Given a GML node representing a linestring geometry, create an
         *     SuperMap linestring geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.LineString>} A linestring geometry.
         */
        linestring: function(node, ring) {
            /**
             * Two coordinate variations to consider:
             * 1) <gml:posList dimension="d">x0 y0 z0 x1 y1 z1</gml:posList>
             * 2) <gml:coordinates>x0, y0, z0 x1, y1, z1</gml:coordinates>
             */
            var nodeList, coordString;
            var coords = [];
            var points = [];

            // look for <gml:posList>
            nodeList = this.getElementsByTagNameNS(node, this.gmlns, "posList");
            if(nodeList.length > 0) {
                coordString = this.getChildValue(nodeList[0]);
                coordString = coordString.replace(this.regExes.trimSpace, "");
                coords = coordString.split(this.regExes.splitSpace);
                var dim = parseInt(nodeList[0].getAttribute("dimension"));
                var j, x, y, z;
                for(var i=0; i<coords.length/dim; ++i) {
                    j = i * dim;
                    x = coords[j];
                    y = coords[j+1];
                    z = (dim === 2) ? null : coords[j+2];
                    if (this.xy) {
                        points.push(new SuperMap.Geometry.Point(x, y, z));
                    } else {
                        points.push(new SuperMap.Geometry.Point(y, x, z));
                    }
                }
            }

            // look for <gml:coordinates>
            if(coords.length == 0) {
                nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "coordinates");
                if(nodeList.length > 0) {
                    coordString = this.getChildValue(nodeList[0]);
                    coordString = coordString.replace(this.regExes.trimSpace,
                                                      "");
                    coordString = coordString.replace(this.regExes.trimComma,
                                                      ",");
                    var pointList = coordString.split(this.regExes.splitSpace);
                    for(var i=0; i<pointList.length; ++i) {
                        coords = pointList[i].split(",");
                        if(coords.length === 2) {
                            coords[2] = null;
                        }
                        if (this.xy) {
                            points.push(new SuperMap.Geometry.Point(coords[0],
                                                                  coords[1],
                                                                  coords[2]));
                        } else {
                            points.push(new SuperMap.Geometry.Point(coords[1],
                                                                  coords[0],
                                                                  coords[2]));
                        }
                    }
                }
            }

            var line = null;
            if(points.length != 0) {
                if(ring) {
                    line = new SuperMap.Geometry.LinearRing(points);
                } else {
                    line = new SuperMap.Geometry.LineString(points);
                }
            }
            return line;
        },
        
        /**
         * Method: parseGeometry.multilinestring
         * Given a GML node representing a multilinestring geometry, create an
         *     SuperMap multilinestring geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.MultiLineString>} A multilinestring geometry.
         */
        multilinestring: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "LineString");
            var components = [];
            if(nodeList.length > 0) {
                var line;
                for(var i=0; i<nodeList.length; ++i) {
                    line = this.parseGeometry.linestring.apply(this,
                                                               [nodeList[i]]);
                    if(line) {
                        components.push(line);
                    }
                }
            }
            return new SuperMap.Geometry.MultiLineString(components);
        },
        
        /**
         * Method: parseGeometry.polygon
         * Given a GML node representing a polygon geometry, create an
         *     SuperMap polygon geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.Polygon>} A polygon geometry.
         */
        polygon: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "LinearRing");
            var components = [];
            if(nodeList.length > 0) {
                // this assumes exterior ring first, inner rings after
                var ring;
                for(var i=0; i<nodeList.length; ++i) {
                    ring = this.parseGeometry.linestring.apply(this,
                                                        [nodeList[i], true]);
                    if(ring) {
                        components.push(ring);
                    }
                }
            }
            return new SuperMap.Geometry.Polygon(components);
        },
        
        /**
         * Method: parseGeometry.multipolygon
         * Given a GML node representing a multipolygon geometry, create an
         *     SuperMap multipolygon geometry.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Geometry.MultiPolygon>} A multipolygon geometry.
         */
        multipolygon: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                       "Polygon");
            var components = [];
            if(nodeList.length > 0) {
                var polygon;
                for(var i=0; i<nodeList.length; ++i) {
                    polygon = this.parseGeometry.polygon.apply(this,
                                                               [nodeList[i]]);
                    if(polygon) {
                        components.push(polygon);
                    }
                }
            }
            return new SuperMap.Geometry.MultiPolygon(components);
        },
        
        envelope: function(node) {
            var components = [];
            var coordString;
            var envelope;
            
            var lpoint = this.getElementsByTagNameNS(node, this.gmlns, "lowerCorner");
            if (lpoint.length > 0) {
                var coords = [];
                
                if(lpoint.length > 0) {
                    coordString = lpoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace);
                }
                
                if(coords.length === 2) {
                    coords[2] = null;
                }
                if (this.xy) {
                    var lowerPoint = new SuperMap.Geometry.Point(coords[0], coords[1],coords[2]);
                } else {
                    var lowerPoint = new SuperMap.Geometry.Point(coords[1], coords[0],coords[2]);
                }
            }
            
            var upoint = this.getElementsByTagNameNS(node, this.gmlns, "upperCorner");
            if (upoint.length > 0) {
                var coords = [];
                
                if(upoint.length > 0) {
                    coordString = upoint[0].firstChild.nodeValue;
                    coordString = coordString.replace(this.regExes.trimSpace, "");
                    coords = coordString.split(this.regExes.splitSpace);
                }
                
                if(coords.length === 2) {
                    coords[2] = null;
                }
                if (this.xy) {
                    var upperPoint = new SuperMap.Geometry.Point(coords[0], coords[1],coords[2]);
                } else {
                    var upperPoint = new SuperMap.Geometry.Point(coords[1], coords[0],coords[2]);
                }
            }
            
            if (lowerPoint && upperPoint) {
                components.push(new SuperMap.Geometry.Point(lowerPoint.x, lowerPoint.y));
                components.push(new SuperMap.Geometry.Point(upperPoint.x, lowerPoint.y));
                components.push(new SuperMap.Geometry.Point(upperPoint.x, upperPoint.y));
                components.push(new SuperMap.Geometry.Point(lowerPoint.x, upperPoint.y));
                components.push(new SuperMap.Geometry.Point(lowerPoint.x, lowerPoint.y));
                
                var ring = new SuperMap.Geometry.LinearRing(components);
                envelope = new SuperMap.Geometry.Polygon([ring]);
            }
            return envelope; 
        },

        /**
         * Method: parseGeometry.box
         * Given a GML node representing a box geometry, create an
         *     SuperMap.Bounds.
         *
         * Parameters:
         * node - {DOMElement} A GML node.
         *
         * Returns:
         * {<SuperMap.Bounds>} A bounds representing the box.
         */
        box: function(node) {
            var nodeList = this.getElementsByTagNameNS(node, this.gmlns,
                                                   "coordinates");
            var coordString;
            var coords, beginPoint = null, endPoint = null;
            if (nodeList.length > 0) {
                coordString = nodeList[0].firstChild.nodeValue;
                coords = coordString.split(" ");
                if (coords.length === 2) {
                    beginPoint = coords[0].split(",");
                    endPoint = coords[1].split(",");
                }
            }
            if (beginPoint !== null && endPoint !== null) {
                return new SuperMap.Bounds(parseFloat(beginPoint[0]),
                    parseFloat(beginPoint[1]),
                    parseFloat(endPoint[0]),
                    parseFloat(endPoint[1]) );
            }
        }
        
    },
    
    /**
     * Method: parseAttributes
     *
     * Parameters:
     * node - {DOMElement}
     *
     * Returns:
     * {Object} An attributes object.
     */
    parseAttributes: function(node) {
        var attributes = {};
        // assume attributes are children of the first type 1 child
        var childNode = node.firstChild;
        var children, i, child, grandchildren, grandchild, name, value;
        while(childNode) {
            if(childNode.nodeType === 1) {
                // attributes are type 1 children with one type 3 child
                children = childNode.childNodes;
                for(i=0; i<children.length; ++i) {
                    child = children[i];
                    if(child.nodeType === 1) {
                        grandchildren = child.childNodes;
                        if(grandchildren.length === 1) {
                            grandchild = grandchildren[0];
                            if(grandchild.nodeType === 3 ||
                               grandchild.nodeType === 4) {
                                name = (child.prefix) ?
                                        child.nodeName.split(":")[1] :
                                        child.nodeName;
                                value = grandchild.nodeValue.replace(
                                                this.regExes.trimSpace, "");
                                attributes[name] = value;
                            }
                        } else {
                            // If child has no childNodes (grandchildren),
                            // set an attribute with null value.
                            // e.g. <prefix:fieldname/> becomes
                            // {fieldname: null}
                            attributes[child.nodeName.split(":").pop()] = null;
                        }
                    }
                }
                break;
            }
            childNode = childNode.nextSibling;
        }
        return attributes;
    },
    
    /**
     * APIMethod: write
     * 生成一个包含一组要素的GML文档字符串。
     * 
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)} 需要被序列化成字符串的一组要素。
     *
     * Returns:
     * {String} 表示GML文档的字符串。
     */
    write: function(features) {
        if(!(SuperMap.Util.isArray(features))) {
            features = [features];
        }
        var gml = this.createElementNS("http://www.opengis.net/wfs",
                                       "wfs:" + this.collectionName);
        for(var i=0; i<features.length; i++) {
            gml.appendChild(this.createFeatureXML(features[i]));
        }
        return SuperMap.Format.XML.prototype.write.apply(this, [gml]);
    },

    /** 
     * Method: createFeatureXML
     * Accept an SuperMap.Feature.Vector, and build a GML node for it.
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>} The feature to be built as GML.
     *
     * Returns:
     * {DOMElement} A node reprensting the feature in GML.
     */
    createFeatureXML: function(feature) {
        var geometry = feature.geometry;
        var geometryNode = this.buildGeometryNode(geometry);
        var geomContainer = this.createElementNS(this.featureNS,
                                                 this.featurePrefix + ":" +
                                                 this.geometryName);
        geomContainer.appendChild(geometryNode);
        var featureNode = this.createElementNS(this.gmlns,
                                               "gml:" + this.featureName);
        var featureContainer = this.createElementNS(this.featureNS,
                                                    this.featurePrefix + ":" +
                                                    this.layerName);
        var fid = feature.fid || feature.id;
        featureContainer.setAttribute("fid", fid);
        featureContainer.appendChild(geomContainer);
        for(var attr in feature.attributes) {
            var attrText = this.createTextNode(feature.attributes[attr]); 
            var nodename = attr.substring(attr.lastIndexOf(":") + 1);
            var attrContainer = this.createElementNS(this.featureNS,
                                                     this.featurePrefix + ":" +
                                                     nodename);
            attrContainer.appendChild(attrText);
            featureContainer.appendChild(attrContainer);
        }    
        featureNode.appendChild(featureContainer);
        return featureNode;
    },
    
    /**
     * APIMethod: buildGeometryNode
     */
    buildGeometryNode: function(geometry) {
        if (this.externalProjection && this.internalProjection) {
            geometry = geometry.clone();
            geometry.transform(this.internalProjection, 
                               this.externalProjection);
        }    
        var className = geometry.CLASS_NAME;
        var type = className.substring(className.lastIndexOf(".") + 1);
        var builder = this.buildGeometry[type.toLowerCase()];
        return builder.apply(this, [geometry]);
    },

    /**
     * Property: buildGeometry
     * Object containing methods to do the actual geometry node building
     *     based on geometry type.
     */
    buildGeometry: {
        // TBD retrieve the srs from layer
        // srsName is non-standard, so not including it until it's right.
        // gml.setAttribute("srsName",
        //                  "http://www.opengis.net/gml/srs/epsg.xml#4326");

        /**
         * Method: buildGeometry.point
         * Given an SuperMap point geometry, create a GML point.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.Point>} A point geometry.
         *
         * Returns:
         * {DOMElement} A GML point node.
         */
        point: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Point");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.multipoint
         * Given an SuperMap multipoint geometry, create a GML multipoint.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.MultiPoint>} A multipoint geometry.
         *
         * Returns:
         * {DOMElement} A GML multipoint node.
         */
        multipoint: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPoint");
            var points = geometry.components;
            var pointMember, pointGeom;
            for(var i=0; i<points.length; i++) { 
                pointMember = this.createElementNS(this.gmlns,
                                                   "gml:pointMember");
                pointGeom = this.buildGeometry.point.apply(this,
                                                               [points[i]]);
                pointMember.appendChild(pointGeom);
                gml.appendChild(pointMember);
            }
            return gml;            
        },
        
        /**
         * Method: buildGeometry.linestring
         * Given an SuperMap linestring geometry, create a GML linestring.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.LineString>} A linestring geometry.
         *
         * Returns:
         * {DOMElement} A GML linestring node.
         */
        linestring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LineString");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.multilinestring
         * Given an SuperMap multilinestring geometry, create a GML
         *     multilinestring.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.MultiLineString>} A multilinestring
         *     geometry.
         *
         * Returns:
         * {DOMElement} A GML multilinestring node.
         */
        multilinestring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiLineString");
            var lines = geometry.components;
            var lineMember, lineGeom;
            for(var i=0; i<lines.length; ++i) {
                lineMember = this.createElementNS(this.gmlns,
                                                  "gml:lineStringMember");
                lineGeom = this.buildGeometry.linestring.apply(this,
                                                                   [lines[i]]);
                lineMember.appendChild(lineGeom);
                gml.appendChild(lineMember);
            }
            return gml;
        },
        
        /**
         * Method: buildGeometry.linearring
         * Given an SuperMap linearring geometry, create a GML linearring.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.LinearRing>} A linearring geometry.
         *
         * Returns:
         * {DOMElement} A GML linearring node.
         */
        linearring: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:LinearRing");
            gml.appendChild(this.buildCoordinatesNode(geometry));
            return gml;
        },
        
        /**
         * Method: buildGeometry.polygon
         * Given an SuperMap polygon geometry, create a GML polygon.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.Polygon>} A polygon geometry.
         *
         * Returns:
         * {DOMElement} A GML polygon node.
         */
        polygon: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:Polygon");
            var rings = geometry.components;
            var ringMember, ringGeom, type;
            for(var i=0; i<rings.length; ++i) {
                type = (i==0) ? "outerBoundaryIs" : "innerBoundaryIs";
                ringMember = this.createElementNS(this.gmlns,
                                                  "gml:" + type);
                ringGeom = this.buildGeometry.linearring.apply(this,
                                                                   [rings[i]]);
                ringMember.appendChild(ringGeom);
                gml.appendChild(ringMember);
            }
            return gml;
        },
        
        /**
         * Method: buildGeometry.multipolygon
         * Given an SuperMap multipolygon geometry, create a GML multipolygon.
         *
         * Parameters:
         * geometry - {<SuperMap.Geometry.MultiPolygon>} A multipolygon
         *     geometry.
         *
         * Returns:
         * {DOMElement} A GML multipolygon node.
         */
        multipolygon: function(geometry) {
            var gml = this.createElementNS(this.gmlns, "gml:MultiPolygon");
            var polys = geometry.components;
            var polyMember, polyGeom;
            for(var i=0; i<polys.length; ++i) {
                polyMember = this.createElementNS(this.gmlns,
                                                  "gml:polygonMember");
                polyGeom = this.buildGeometry.polygon.apply(this,
                                                                [polys[i]]);
                polyMember.appendChild(polyGeom);
                gml.appendChild(polyMember);
            }
            return gml;

        },
 
        /**
         * Method: buildGeometry.bounds
         * Given an SuperMap bounds, create a GML box.
         *
         * Parameters:
         * bounds - {<SuperMap.Geometry.Bounds>} A bounds object.
         *
         * Returns:
         * {DOMElement} A GML box node.
         */
        bounds: function(bounds) {
            var gml = this.createElementNS(this.gmlns, "gml:Box");
            gml.appendChild(this.buildCoordinatesNode(bounds));
            return gml;
        }
    },

    /**
     * Method: buildCoordinates
     * builds the coordinates XmlNode
     * (code)
     * <gml:coordinates decimal="." cs="," ts=" ">...</gml:coordinates>
     * (end)
     *
     * Parameters: 
     * geometry - {<SuperMap.Geometry>} 
     *
     * Returns:
     * {XmlNode} created xmlNode
     */
    buildCoordinatesNode: function(geometry) {
        var coordinatesNode = this.createElementNS(this.gmlns,
                                                   "gml:coordinates");
        coordinatesNode.setAttribute("decimal", ".");
        coordinatesNode.setAttribute("cs", ",");
        coordinatesNode.setAttribute("ts", " ");

        var parts = [];

        if(geometry instanceof SuperMap.Bounds){
            parts.push(geometry.left + "," + geometry.bottom);
            parts.push(geometry.right + "," + geometry.top);
        } else {
            var points = (geometry.components) ? geometry.components : [geometry];
            for(var i=0; i<points.length; i++) {
                parts.push(points[i].x + "," + points[i].y);                
            }            
        }

        var txtNode = this.createTextNode(parts.join(" "));
        coordinatesNode.appendChild(txtNode);
        
        return coordinatesNode;
    },

    CLASS_NAME: "SuperMap.Format.GML" 
});
