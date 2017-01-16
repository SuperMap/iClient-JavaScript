/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/GML/Base.js
 */

/**
 * Class: SuperMap.Format.GML.v2
 * 解析GML版本为2的类。
 *
 * Inherits from:
 *  - <SuperMap.Format.GML.Base>
 */
SuperMap.Format.GML.v2 = SuperMap.Class(SuperMap.Format.GML.Base, {
    
    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: "http://www.opengis.net/gml http://schemas.opengis.net/gml/2.1.2/feature.xsd",

    /**
     * Constructor: SuperMap.Format.GML.v2
     * 为GML版本2创建一个解析器。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     *
     * Valid options properties:
     * featureType - {String} 要素类型名(必要的)，可以理解成数据集（不带数据
     *      源前缀）。
     * featureNS - {String} 要素的命名空间 (必要的)。
     * geometryName - {String} 几何图形名称。
     */
    initialize: function(options) {
        SuperMap.Format.GML.Base.prototype.initialize.apply(this, [options]);
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
        "gml": SuperMap.Util.applyDefaults({
            "outerBoundaryIs": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.outer = obj.components[0];
            },
            "innerBoundaryIs": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                container.inner.push(obj.components[0]);
            },
            "Box": function(node, container) {
                var obj = {};
                this.readChildNodes(node, obj);
                if(!container.components) {
                    container.components = [];
                }
                var min = obj.points[0];
                var max = obj.points[1];
                container.components.push(
                    new SuperMap.Bounds(min.x, min.y, max.x, max.y)
                );
            }
        }, SuperMap.Format.GML.Base.prototype.readers["gml"]),
        "feature": SuperMap.Format.GML.Base.prototype.readers["feature"],
        "wfs": SuperMap.Format.GML.Base.prototype.readers["wfs"]
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
            // GML2 only has abstract feature collections
            // wfs provides a feature collection from a well-known schema
            name = "wfs:FeatureCollection";
        } else {
            name = "gml:featureMember";
        }
        var root = this.writeNode(name, features);
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
        "gml": SuperMap.Util.applyDefaults({
            "Point": function(geometry) {
                var node = this.createElementNSPlus("gml:Point");
                this.writeNode("coordinates", [geometry], node);
                return node;
            },
            "coordinates": function(points) {
                var numPoints = points.length;
                var parts = new Array(numPoints);
                var point;
                for(var i=0; i<numPoints; ++i) {
                    point = points[i];
                    if(this.xy) {
                        parts[i] = point.x + "," + point.y;
                    } else {
                        parts[i] = point.y + "," + point.x;
                    }
                    if(point.z != undefined) { // allow null or undefined
                        parts[i] += "," + point.z;
                    }
                }
                return this.createElementNSPlus("gml:coordinates", {
                    attributes: {
                        decimal: ".", cs: ",", ts: " "
                    },
                    value: (numPoints === 1) ? parts[0] : parts.join(" ")
                });
            },
            "LineString": function(geometry) {
                var node = this.createElementNSPlus("gml:LineString");
                this.writeNode("coordinates", geometry.components, node);
                return node;
            },
            "Polygon": function(geometry) {
                var node = this.createElementNSPlus("gml:Polygon");
                this.writeNode("outerBoundaryIs", geometry.components[0], node);
                for(var i=1; i<geometry.components.length; ++i) {
                    this.writeNode(
                        "innerBoundaryIs", geometry.components[i], node
                    );
                }
                return node;
            },
            "outerBoundaryIs": function(ring) {
                var node = this.createElementNSPlus("gml:outerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "innerBoundaryIs": function(ring) {
                var node = this.createElementNSPlus("gml:innerBoundaryIs");
                this.writeNode("LinearRing", ring, node);
                return node;
            },
            "LinearRing": function(ring) {
                var node = this.createElementNSPlus("gml:LinearRing");
                this.writeNode("coordinates", ring.components, node);
                return node;
            },
            "Box": function(bounds) {
                var node = this.createElementNSPlus("gml:Box");
                this.writeNode("coordinates", [
                    {x: bounds.left, y: bounds.bottom},
                    {x: bounds.right, y: bounds.top}
                ], node);
                // srsName attribute is optional for gml:Box
                if(this.srsName) {
                    node.setAttribute("srsName", this.srsName);
                }
                return node;
            }
        }, SuperMap.Format.GML.Base.prototype.writers["gml"]),
        "feature": SuperMap.Format.GML.Base.prototype.writers["feature"],
        "wfs": SuperMap.Format.GML.Base.prototype.writers["wfs"]
    },
    
    CLASS_NAME: "SuperMap.Format.GML.v2" 

});
