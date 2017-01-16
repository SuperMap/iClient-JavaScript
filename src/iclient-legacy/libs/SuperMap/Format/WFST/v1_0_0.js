/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format/WFST/v1.js
 * @requires SuperMap/Format/Filter/v1_0_0.js
 */

/**
 * Class: SuperMap.Format.WFST.v1_0_0
 * 创建WFS1.0.0版本处理(transactions)的格式类。
 *      通过 <SuperMap.Format.WFST.v1_0_0> 构造函数创建一个新实例。
 *
 * Inherits from:
 *  - <SuperMap.Format.Filter.v1_0_0>
 *  - <SuperMap.Format.WFST.v1>
 */
SuperMap.Format.WFST.v1_0_0 = SuperMap.Class(
    SuperMap.Format.Filter.v1_0_0, SuperMap.Format.WFST.v1, {
    
    /**
     * Property: version
     * {String} WFS version number.
     */
    version: "1.0.0",

    /**
     * APIProperty: srsNameInQuery
     * {Boolean} 设置为true时，参考系通过"srsName"属性被传递到Query请求的
     *      "wfs:Query"元素节点，这个属性默认为false因为它不被WFS1.0.0版本所
     *      支持。
     */
    srsNameInQuery: false,
    
    /**
     * Property: schemaLocations
     * {Object} Properties are namespace aliases, values are schema locations.
     */
    schemaLocations: {
        "wfs": "http://schemas.opengis.net/wfs/1.0.0/WFS-transaction.xsd"
    },

    /**
     * Constructor: SuperMap.Format.WFST.v1_0_0
     * 用来解析和生成WFS1.0.0版本处理(transactions)的类。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性将被设置到实例。
     *
     * 有效的选项(options)属性:
     * featureType - {String} 要素类型名(必要的)，可以理解成数据集（不带数据
     *      源前缀）。
     * featureNS - {String} 要素的命名空间 (可选)。
     * featurePrefix - {String} 要素的命名空间别名 (可选 - 只有当featureNS被提供
     *     了才会被使用)。 默认值是 'feature'。可以理解成“数据源”。
     * geometryName - {String} 几何图形属性名称。  默认值是 'the_geom'.
     */
    initialize: function(options) {
        SuperMap.Format.Filter.v1_0_0.prototype.initialize.apply(this, [options]);
        SuperMap.Format.WFST.v1.prototype.initialize.apply(this, [options]);
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
        // Not the superclass, only the mixin classes inherit from
        // Format.GML.v2. We need this because we don't want to get readNode
        // from the superclass's superclass, which is SuperMap.Format.XML.
        return SuperMap.Format.GML.v2.prototype.readNode.apply(this, [node, obj]);
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
        "wfs": SuperMap.Util.applyDefaults({
            "WFS_TransactionResponse": function(node, obj) {
                obj.insertIds = [];
                obj.success = false;
                this.readChildNodes(node, obj);
            },
            "InsertResult": function(node, container) {
                var obj = {fids: []};
                this.readChildNodes(node, obj);
                container.insertIds.push(obj.fids[0]);
            },
            "TransactionResult": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "Status": function(node, obj) {
                this.readChildNodes(node, obj);
            },
            "SUCCESS": function(node, obj) {
                obj.success = true;
            }
        }, SuperMap.Format.WFST.v1.prototype.readers["wfs"]),
        "gml": SuperMap.Format.GML.v2.prototype.readers["gml"],
        "feature": SuperMap.Format.GML.v2.prototype.readers["feature"],
        "ogc": SuperMap.Format.Filter.v1_0_0.prototype.readers["ogc"]
    },

    /**
     * Property: writers
     * As a compliment to the readers property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {
        "wfs": SuperMap.Util.applyDefaults({
            "Query": function(options) {
                options = SuperMap.Util.extend({
                    featureNS: this.featureNS,
                    featurePrefix: this.featurePrefix,
                    featureType: this.featureType,
                    srsName: this.srsName,
                    srsNameInQuery: this.srsNameInQuery
                }, options);
                var prefix = options.featurePrefix;
                var node = this.createElementNSPlus("wfs:Query", {
                    attributes: {
                        typeName: (prefix ? prefix + ":" : "") +
                            options.featureType
                    }
                });
                if(options.srsNameInQuery && options.srsName) {
                    node.setAttribute("srsName", options.srsName);
                }
                if(options.featureNS) {
                    node.setAttribute("xmlns:" + prefix, options.featureNS);
                }
                if(options.propertyNames) {
                    for(var i=0,len = options.propertyNames.length; i<len; i++) {
                        this.writeNode(
                            "ogc:PropertyName", 
                            {property: options.propertyNames[i]},
                            node
                        );
                    }
                }
                if(options.filter) {
                    this.setFilterProperty(options.filter);
                    this.writeNode("ogc:Filter", options.filter, node);
                }
                return node;
            }
        }, SuperMap.Format.WFST.v1.prototype.writers["wfs"]),
        "gml": SuperMap.Format.GML.v2.prototype.writers["gml"],
        "feature": SuperMap.Format.GML.v2.prototype.writers["feature"],
        "ogc": SuperMap.Format.Filter.v1_0_0.prototype.writers["ogc"]
    },
   
    CLASS_NAME: "SuperMap.Format.WFST.v1_0_0" 
});
