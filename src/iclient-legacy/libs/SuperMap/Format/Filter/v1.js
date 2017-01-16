/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/
/**
 * @requires SuperMap/Format/Filter.js
 * @requires SuperMap/Format/XML.js
 * @requires SuperMap/Filter/Function.js
 */

/**
 * Class: SuperMap.Format.Filter.v1
 * 过滤器版本为1的解析器的父类。
 *
 * Inherits from:
 *  - <SuperMap.Format.XML>
 */
SuperMap.Format.Filter.v1 = SuperMap.Class(SuperMap.Format.XML, {
    
    /**
     * Property: namespaces
     * {Object} 命名空间别名与命名空间URI之间的映射。
     */
    namespaces: {
        ogc: "http://www.opengis.net/ogc",
        gml: "http://www.opengis.net/gml",
        xlink: "http://www.w3.org/1999/xlink",
        xsi: "http://www.w3.org/2001/XMLSchema-instance"
    },
    
    /**
     * Property: defaultPrefix
     */
    defaultPrefix: "ogc",

    /**
     * Property: schemaLocation
     * {String} Schema location for a particular minor version.
     */
    schemaLocation: null,
    
    /**
     * Constructor: SuperMap.Format.Filter.v1
     * 这个类的实例不直接创建。应该使用 <SuperMap.Format.Filter> 构造函数。
     *
     * Parameters:
     * options - {Object} 可选选项对象，其属性将被设置到实例。
     */
    initialize: function(options) {
        SuperMap.Format.XML.prototype.initialize.apply(this, [options]);
    },
    
    /**
     * Method: read
     *
     * Parameters:
     * data - {DOMElement} A Filter document element.
     *
     * Returns:
     * {<SuperMap.Filter>} A filter object.
     */
    read: function(data) {
        var obj = {};
        this.readers.ogc["Filter"].apply(this, [data, obj]);
        return obj.filter;
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
        "ogc": {
            "_expression": function(node) {
                // only the simplest of ogc:expression handled
                // "some text and an <PropertyName>attribute</PropertyName>"}
                var obj, value = "";
                for(var child=node.firstChild; child; child=child.nextSibling) {
                    switch(child.nodeType) {
                        case 1:
                            obj = this.readNode(child);
                            if (obj.property) {
                                value += "${" + obj.property + "}";
                            } else if (obj.value !== undefined) {
                                value += obj.value;
                            }
                            break;
                        case 3: // text node
                        case 4: // cdata section
                            value += child.nodeValue;
                    }
                }
                return value;
            },
            "Filter": function(node, parent) {
                // Filters correspond to subclasses of SuperMap.Filter.
                // Since they contain information we don't persist, we
                // create a temporary object and then pass on the filter
                // (ogc:Filter) to the parent obj.
                var obj = {
                    fids: [],
                    filters: []
                };
                this.readChildNodes(node, obj);
                if(obj.fids.length > 0) {
                    parent.filter = new SuperMap.Filter.FeatureId({
                        fids: obj.fids
                    });
                } else if(obj.filters.length > 0) {
                    parent.filter = obj.filters[0];
                }
            },
            "FeatureId": function(node, obj) {
                var fid = node.getAttribute("fid");
                if(fid) {
                    obj.fids.push(fid);
                }
            },
            "And": function(node, obj) {
                var filter = new SuperMap.Filter.Logical({
                    type: SuperMap.Filter.Logical.AND
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "Or": function(node, obj) {
                var filter = new SuperMap.Filter.Logical({
                    type: SuperMap.Filter.Logical.OR
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "Not": function(node, obj) {
                var filter = new SuperMap.Filter.Logical({
                    type: SuperMap.Filter.Logical.NOT
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsLessThan": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.LESS_THAN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsGreaterThan": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.GREATER_THAN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsLessThanOrEqualTo": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.LESS_THAN_OR_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsGreaterThanOrEqualTo": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.GREATER_THAN_OR_EQUAL_TO
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "PropertyIsBetween": function(node, obj) {
                var filter = new SuperMap.Filter.Comparison({
                    type: SuperMap.Filter.Comparison.BETWEEN
                });
                this.readChildNodes(node, filter);
                obj.filters.push(filter);
            },
            "Literal": function(node, obj) {
                obj.value = SuperMap.String.numericIf(
                    this.getChildValue(node));
            },
            "PropertyName": function(node, filter) {
                filter.property = this.getChildValue(node);
            },
            "LowerBoundary": function(node, filter) {
                filter.lowerBoundary = SuperMap.String.numericIf(
                    this.readers.ogc._expression.call(this, node));
            },
            "UpperBoundary": function(node, filter) {
                filter.upperBoundary = SuperMap.String.numericIf(
                    this.readers.ogc._expression.call(this, node));
            },
            "Intersects": function(node, obj) {
                this.readSpatial(node, obj, SuperMap.Filter.Spatial.INTERSECTS);
            },
            "Within": function(node, obj) {
                this.readSpatial(node, obj, SuperMap.Filter.Spatial.WITHIN);
            },
            "Contains": function(node, obj) {
                this.readSpatial(node, obj, SuperMap.Filter.Spatial.CONTAINS);
            },
            "DWithin": function(node, obj) {
                this.readSpatial(node, obj, SuperMap.Filter.Spatial.DWITHIN);
            },
            "Distance": function(node, obj) {
                obj.distance = parseInt(this.getChildValue(node));
                obj.distanceUnits = node.getAttribute("units");
            },
            "Function": function(node, obj) {
                //TODO write decoder for it
                return;
            }
        }
    },
    
    /**
     * Method: readSpatial
     *
     * Read a {<SuperMap.Filter.Spatial>} filter.
     * 
     * Parameters:
     * node - {DOMElement} A DOM element that contains an ogc:expression.
     * obj - {Object} The target object.
     * type - {String} One of the SuperMap.Filter.Spatial.* constants.
     *
     * Returns:
     * {<SuperMap.Filter.Spatial>} The created filter.
     */
    readSpatial: function(node, obj, type) {
        var filter = new SuperMap.Filter.Spatial({
            type: type
        });
        this.readChildNodes(node, filter);
        filter.value = filter.components[0];
        delete filter.components;
        obj.filters.push(filter);
    },

    /**
     * Method: writeOgcExpression
     * Limited support for writing OGC expressions. Currently it supports
     * (<SuperMap.Filter.Function> || String || Number)
     *
     * Parameters:
     * value - (<SuperMap.Filter.Function> || String || Number)
     * node - {DOMElement} A parent DOM element 
     *
     * Returns:
     * {DOMElement} Updated node element.
     */
    writeOgcExpression: function(value, node) {
//        if(value instanceof SuperMap.Filter.Function){
//            var child = this.writeNode("Function", value, node);
//            node.appendChild(child);
//        } else {
            this.writeNode("Literal", value, node);
//        }
        return node;
    },    
    
    /**
     * Method: write
     *
     * Parameters:
     * filter - {<SuperMap.Filter>} A filter object.
     *
     * Returns:
     * {DOMElement} An ogc:Filter element.
     */
    write: function(filter) {
        return this.writers.ogc["Filter"].apply(this, [filter]);
    },
    
    /**
     * Method: writeFeatureIdNodes
     * 
     * Parameters:
     * filter - {<SuperMap.Filter.FeatureId}
     * node - {DOMElement}
     */
    writeFeatureIdNodes: function(filter, node) {
        for (var i=0, ii=filter.fids.length; i<ii; ++i) {
            this.writeNode("FeatureId", filter.fids[i], node);
        }
    },
    
    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "ogc": {
            "Filter": function(filter) {
                var node = this.createElementNSPlus("ogc:Filter");
                if (filter.type === "FID") {
                    SuperMap.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, filter, node);
                } else {
                    this.writeNode(this.getFilterType(filter), filter, node);
                }
                return node;
            },
            "FeatureId": function(fid) {
                return this.createElementNSPlus("ogc:FeatureId", {
                    attributes: {fid: fid}
                });
            },
            "And": function(filter) {
                var node = this.createElementNSPlus("ogc:And");
                var childFilter;
                for (var i=0, ii=filter.filters.length; i<ii; ++i) {
                    childFilter = filter.filters[i];
                    if (childFilter.type === "FID") {
                        SuperMap.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, childFilter, node);
                    } else {
                    this.writeNode(
                        this.getFilterType(childFilter), childFilter, node
                    );
                }
                }
                return node;
            },
            "Or": function(filter) {
                var node = this.createElementNSPlus("ogc:Or");
                var childFilter;
                for (var i=0, ii=filter.filters.length; i<ii; ++i) {
                    childFilter = filter.filters[i];
                    if (childFilter.type === "FID") {
                        SuperMap.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, childFilter, node);
                    } else {
                    this.writeNode(
                        this.getFilterType(childFilter), childFilter, node
                    );
                }
                }
                return node;
            },
            "Not": function(filter) {
                var node = this.createElementNSPlus("ogc:Not");
                var childFilter = filter.filters[0];
                if (childFilter.type === "FID") {
                    SuperMap.Format.Filter.v1.prototype.writeFeatureIdNodes.call(this, childFilter, node);
                } else {
                this.writeNode(
                    this.getFilterType(childFilter), childFilter, node
                );
                }
                return node;
            },
            "PropertyIsLessThan": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsLessThan");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsGreaterThan": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsGreaterThan");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsLessThanOrEqualTo": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsLessThanOrEqualTo");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsGreaterThanOrEqualTo": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsGreaterThanOrEqualTo");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                // handle Literals or Functions for now
                this.writeOgcExpression(filter.value, node);
                return node;
            },
            "PropertyIsBetween": function(filter) {
                var node = this.createElementNSPlus("ogc:PropertyIsBetween");
                // no ogc:expression handling for PropertyName for now
                this.writeNode("PropertyName", filter, node);
                this.writeNode("LowerBoundary", filter, node);
                this.writeNode("UpperBoundary", filter, node);
                return node;
            },
            "PropertyName": function(filter) {
                // no ogc:expression handling for now
                return this.createElementNSPlus("ogc:PropertyName", {
                    value: filter.property
                });
            },
            "Literal": function(value) {
                // no ogc:expression handling for now
                return this.createElementNSPlus("ogc:Literal", {
                    value: value
                });
            },
            "LowerBoundary": function(filter) {
                // handle Literals or Functions for now
                var node = this.createElementNSPlus("ogc:LowerBoundary");
                this.writeOgcExpression(filter.lowerBoundary, node);
                return node;
            },
            "UpperBoundary": function(filter) {
                // handle Literals or Functions for now
                var node = this.createElementNSPlus("ogc:UpperBoundary");
                this.writeNode("Literal", filter.upperBoundary, node);
                return node;
            },
            "INTERSECTS": function(filter) {
                return this.writeSpatial(filter, "Intersects");
            },
            "WITHIN": function(filter) {
                return this.writeSpatial(filter, "Within");
            },
            "CONTAINS": function(filter) {
                return this.writeSpatial(filter, "Contains");
            },
            "DWITHIN": function(filter) {
                var node = this.writeSpatial(filter, "DWithin");
                this.writeNode("Distance", filter, node);
                return node;
            },
            "Distance": function(filter) {
                return this.createElementNSPlus("ogc:Distance", {
                    attributes: {
                        units: filter.distanceUnits
                    },
                    value: filter.distance
                });
            },
            "Function": function(filter) {
                var node = this.createElementNSPlus("ogc:Function", {
                    attributes: {
                        name: filter.name
                    }
                });
                var params = filter.params;
                for(var i=0, len=params.length; i<len; i++){
                    this.writeOgcExpression(params[i], node);
                }
                return node;
            }
        }
    },

    /**
     * Method: getFilterType
     */
    getFilterType: function(filter) {
        var filterType = this.filterMap[filter.type];
        if(!filterType) {
            throw "Filter writing not supported for rule type: " + filter.type;
        }
        return filterType;
    },
    
    /**
     * Property: filterMap
     * {Object} Contains a member for each filter type.  Values are node names
     *     for corresponding OGC Filter child elements.
     */
    filterMap: {
        "&&": "And",
        "||": "Or",
        "!": "Not",
        "==": "PropertyIsEqualTo",
        "!=": "PropertyIsNotEqualTo",
        "<": "PropertyIsLessThan",
        ">": "PropertyIsGreaterThan",
        "<=": "PropertyIsLessThanOrEqualTo",
        ">=": "PropertyIsGreaterThanOrEqualTo",
        "..": "PropertyIsBetween",
        "~": "PropertyIsLike",
        "BBOX": "BBOX",
        "DWITHIN": "DWITHIN",
        "WITHIN": "WITHIN",
        "CONTAINS": "CONTAINS",
        "INTERSECTS": "INTERSECTS",
        "FID": "FeatureId"
    },

    CLASS_NAME: "SuperMap.Format.Filter.v1" 

});
