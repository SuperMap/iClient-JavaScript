/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/GML/v2.js
 * @requires SuperMap/Format/Filter/v1.js
 */

/**
 * Class: SuperMap.Format.Filter.v1_0_0
 * ogc标准的版本为1.0.0的过滤器。
 * 
 * Inherits from:
 *  - <SuperMap.Format.GML.v2>
 *  - <SuperMap.Format.Filter.v1>
 */
SuperMap.Format.Filter.v1_0_0 = SuperMap.Class(
    SuperMap.Format.GML.v2, SuperMap.Format.Filter.v1, {
    
    /**
     * Constant: VERSION
     * {String} 1.0.0
     */
    VERSION: "1.0.0",
    
    /**
     * Property: schemaLocation
     * {String} http://www.opengis.net/ogc/filter/1.0.0/filter.xsd
     */
    schemaLocation: "http://www.opengis.net/ogc/filter/1.0.0/filter.xsd",

    /**
     * Constructor: SuperMap.Format.Filter.v1_0_0
     * 这个类的实例不直接创建，而是通过 <SuperMap.Format.Filter> 构造器创建。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     */
    initialize: function(options) {
        SuperMap.Format.GML.v2.prototype.initialize.apply(
            this, [options]
        );
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
        "ogc": SuperMap.Util.applyDefaults({
            "PropertyIsEqualTo": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsNotEqualTo": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.NOT_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsLike": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.LIKE
                });
                this.readChildNodes(node, filter);
                var wildCard = node.getAttribute("wildCard");
                var singleChar = node.getAttribute("singleChar");
                var esc = node.getAttribute("escape");
                filter.value2regex(wildCard, singleChar, esc);
                obj.filters.push(filter);
            }
        }, SuperMap.Format.Filter.v1.prototype.readers["ogc"]),
        "gml": SuperMap.Format.GML.v2.prototype.readers["gml"],
        "feature": SuperMap.Format.GML.v2.prototype.readers["feature"]        
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "ogc": SuperMap.Util.applyDefaults({
            "PropertyIsEqualTo": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsEqualTo");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsNotEqualTo": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsNotEqualTo");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsLike": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsLike", {
                    attributes: {
                        wildCard: "*", singleChar: ".", escape: "!"
                    }
                });
                // no ogc:expression handling for now
                this.writeNode("PropertyName", filter, node);
                // convert regex string to ogc string
                this.writeNode("Literal", filter.regex2value(), node);
                return node;
            },
            "BBOX": function(filter) {
                var node = this.createElementNSPlus("ogc:BBOX");
                // PropertyName is mandatory in 1.0.0, but e.g. GeoServer also
                // accepts filters without it. When this is used with
                // SuperMap.Protocol.WFS, SuperMap.Format.WFST will set a
                // missing filter.property to the geometryName that is
                // configured with the protocol, which defaults to "the_geom".
                // So the only way to omit this mandatory property is to not
                // set the property on the filter and to set the geometryName
                // on the WFS protocol to null. The latter also happens when
                // the protocol is configured without a geometryName and a
                // featureNS.
                filter.property && this.writeNode("PropertyName", filter, node);
                var box = this.writeNode("gml:Box", filter.value, node);
                if(filter.projection) {
                    box.setAttribute("srsName", filter.projection);
                }
                return node;
            }
        }, SuperMap.Format.Filter.v1.prototype.writers["ogc"]),
        "gml": SuperMap.Format.GML.v2.prototype.writers["gml"],
        "feature": SuperMap.Format.GML.v2.prototype.writers["feature"]
    },

    /**
     * Method: writeSpatial
     *
     * Read a {<SuperMap.Filter.Spatial>} filter and converts it into XML.
     *
     * Parameters:
     * filter - {<SuperMap.Filter.Spatial>} The filter.
     * name - {String} Name of the generated XML element.
     *
     * Returns:
     * {DOMElement} The created XML element.
     */
    writeSpatial: function(filter, name) {
        var node = this.createElementNSPlus("ogc:"+name);
        this.writeNode("PropertyName", filter, node);
//        if(filter.value instanceof SuperMap.Filter.Function) {
//            this.writeNode("Function", filter.value, node);
//        } else {
        var child;
        if(filter.value instanceof SuperMap.Geometry) {
            child = this.writeNode("feature:_geometry", filter.value).firstChild;
        } else {
            child = this.writeNode("gml:Box", filter.value);
        }
        if(filter.projection) {
            child.setAttribute("srsName", filter.projection);
        }
        node.appendChild(child);
//        }
        return node;
    },


    CLASS_NAME: "SuperMap.Format.Filter.v1_0_0" 

});