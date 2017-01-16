/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Format.js
 */

/**
 * Class: SuperMap.Format.XML
 * 用于读写XML格式的格式类。 如果想生成跨浏览器的XML，应该使用
 *     XML格式类实例方法而不是使用HTML文档的方式。
 *     这里的DOM创建以及转换方法全部是模仿W3C XML DOM 方法。
 *     使用 <SuperMap.Format.XML> 构造函数创建解析实例。
 *
 * Inherits from:
 *  - <SuperMap.Format>
 */
SuperMap.Format.XML = SuperMap.Class(SuperMap.Format, {
    
    /**
     * Property: namespaces
     * {Object} Mapping of namespace aliases to namespace URIs.  Properties
     *     of this object should not be set individually.  Read-only.  All
     *     XML subclasses should have their own namespaces object.  Use
     *     <setNamespace> to add or set a namespace alias after construction.
     */
    namespaces: null,
    
    /**
     * Property: namespaceAlias
     * {Object} Mapping of namespace URI to namespace alias.  This object
     *     is read-only.  Use <setNamespace> to add or set a namespace alias.
     */
    namespaceAlias: null,
    
    /**
     * Property: defaultPrefix
     * {String} The default namespace alias for creating element nodes.
     */
    defaultPrefix: null,
    
    /**
     * Property: readers
     * Contains public functions, grouped by namespace prefix, that will
     *     be applied when a namespaced node is found matching the function
     *     name.  The function will be applied in the scope of this parser
     *     with two arguments: the node being read and a context object passed
     *     from the parent.
     */
    readers: {},
    
    /**
     * Property: writers
     * As a compliment to the <readers> property, this structure contains public
     *     writing functions grouped by namespace alias and named like the
     *     node names they produce.
     */
    writers: {},

    /**
     * Property: xmldom
     * {XMLDom} If this browser uses ActiveX, this will be set to a XMLDOM
     *     object.  It is not intended to be a browser sniffing property.
     *     Instead, the xmldom property is used instead of <code>document<end>
     *     where namespaced node creation methods are not supported. In all
     *     other browsers, this remains null.
     */
    xmldom: null,

    /**
     * Constructor: SuperMap.Format.XML
     * 构造一个XML解析器。该解析器用来读取和写出XML格式的文档。
     *     读取字符串来解析XML返回的是DOM元素。写出根据DOM元素写出XML返回
	 *     的是一个字符串。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性会被直接设置到实例对象上。
     */
    initialize: function(options) {
        if(window.ActiveXObject) {
            this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
        }
        SuperMap.Format.prototype.initialize.apply(this, [options]);
        // clone the namespace object and set all namespace aliases
        this.namespaces = SuperMap.Util.extend({}, this.namespaces);
        this.namespaceAlias = {};
        for(var alias in this.namespaces) {
            this.namespaceAlias[this.namespaces[alias]] = alias;
        }
    },
    
    /**
     * APIMethod: destroy
     * 清除。
     */
    destroy: function() {
        this.xmldom = null;
        SuperMap.Format.prototype.destroy.apply(this, arguments);
    },
    
    /**
     * Method: setNamespace
     * Set a namespace alias and URI for the format.
     *
     * Parameters:
     * alias - {String} The namespace alias (prefix).
     * uri - {String} The namespace URI.
     */
    setNamespace: function(alias, uri) {
        this.namespaces[alias] = uri;
        this.namespaceAlias[uri] = alias;
    },

    /**
     * APIMethod: read
	 * 反序列化一个XML字符串，并返回一个DOM节点。
     *
     * Parameters:
     * text - {String} XML字符串。
     
     * Returns:
     * {DOMElement} DOM节点。
     */
    read: function(text) {
        var index = text.indexOf('<');
        if(index > 0) {
            text = text.substring(index);
        }
        var node = SuperMap.Util.Try(
            SuperMap.Function.bind((
                function() {
                    var xmldom;
                    /**
                     * Since we want to be able to call this method on the prototype
                     * itself, this.xmldom may not exist even if in IE.
                     */
                    if(window.ActiveXObject && !this.xmldom) {
                        xmldom = new ActiveXObject("Microsoft.XMLDOM");
                    } else {
                        xmldom = this.xmldom;
                        
                    }
                    xmldom.loadXML(text);
                    return xmldom;
                }
            ), this),
            function() {
                return new DOMParser().parseFromString(text, 'text/xml');
            },
            function() {
                var req = new XMLHttpRequest();
                req.open("GET", "data:" + "text/xml" +
                         ";charset=utf-8," + encodeURIComponent(text), false);
                if(req.overrideMimeType) {
                    req.overrideMimeType("text/xml");
                }
                req.send(null);
                return req.responseXML;
            }
        );

        if(this.keepData) {
            this.data = node;
        }

        return node;
    },

    /**
     * APIMethod: write
	 * 一个DOM节点序列化成XML字符串。
     * 
     * Parameters:
     * node - {DOMElement} DOM节点。
     *
     * Returns:
     * {String} 用来表示传入节点的XML字符串。
     */
    write: function(node) {
        var data;
        if(this.xmldom) {
            data = node.xml;
        } else {
            var serializer = new XMLSerializer();
            if (node.nodeType === 1) {
                // Add nodes to a document before serializing. Everything else
                // is serialized as is. This may need more work. See #1218 .
                var doc = document.implementation.createDocument("", "", null);
                if (doc.importNode) {
                    node = doc.importNode(node, true);
                }
                doc.appendChild(node);
                data = serializer.serializeToString(doc);
                //这里需要对data进行字符串验证，确保是正确的xml字符串
                //在IE11下生成的字符串会出现莫名其妙的增加属性，如
                //xmlns:NS1="" NS1:xmlns:World="http://www.supermap.com/World"
                //这里的xmlns:NS1=""为莫名其妙增加的，并且为空，服务器会报错
                //xmlns:World前面也莫名其妙增加了NS1:，导致错误

                //删除xmlns:...=""
                var regx1=/xmlns:[^=]+?=""/g;
                data=data.replace(regx1,"");
                //删除NS1:xmlns:World的多余部分
                var regx1=/\s[^:]+?:xmlns:/g;
                data=data.replace(regx1," xmlns:");

            } else {
                data = serializer.serializeToString(node);
            }
        }
        return data;
    },

    /**
     * APIMethod: createElementNS
     * 返回一个带命名空间的新元素。这个节点可以被添加到另一个可以使用appendChild方法的
	 *     节点之中。由于需要支持跨浏览器，这个方法必须被使用，用以替换和扩展
	 *     document.createElementNS方法。
     *
     * Parameters:
     * uri - {String} 元素的命名空间URI。
     * name - {String} 被创建元素的描述性名称。
     * 
     * Returns:
     * {Element} 包含命名空间的DOM元素。
     */
    createElementNS: function(uri, name) {
        var element;
        if(this.xmldom) {
            if(typeof uri === "string") {
                element = this.xmldom.createNode(1, name, uri);
            } else {
                element = this.xmldom.createNode(1, name, "");
            }
        } else {
            element = document.createElementNS(uri, name);
        }
        return element;
    },

    /**
     * APIMethod: createTextNode
     * 创建文本节点。这个节点能够被添加到另一个可以使用appendChild方法的节点之中。
	 *     由于需要支持跨浏览器，这个方法必须被用来代替与扩展document.createTextNode
	 *     方法。
     * 
     * Parameters:
     * text - {String} 节点的文本。
     * 
     * Returns: 
     * {DOMElement} DOM格式的文本节点。
     */
    createTextNode: function(text) {
        var node;
        if (typeof text !== "string") {
            text = String(text);
        }
        if(this.xmldom) {
            node = this.xmldom.createTextNode(text);
        } else {
            node = document.createTextNode(text);
        }
        return node;
    },

    /**
     * APIMethod: getElementsByTagNameNS
     * 通过给定的命名空间URI和描述名称得到元素数组。
     *     要返回给定命名空间内的所有节点，使用'*'作为name参数即可。
     *     要返回给定描述名称并忽略命名空间的所有节点，使用'*'作为
	 *     uri参数。
     * 
     * Parameters:
     * node - {Element} 指定节点搜索的父节点。
     * uri - {String} 命名空间URI。
     * name - {String} 标签名称。
     * 
     * Returns:
     * {NodeList} 节点集合或元素数组。
     */
    getElementsByTagNameNS: function(node, uri, name) {
        var elements = [];
        if(node.getElementsByTagNameNS) {
            elements = node.getElementsByTagNameNS(uri, name);
        } else {
            // brute force method
            var allNodes = node.getElementsByTagName("*");
            var potentialNode, fullName;
            for(var i=0, len=allNodes.length; i<len; ++i) {
                potentialNode = allNodes[i];
                fullName = (potentialNode.prefix) ?
                           (potentialNode.prefix + ":" + name) : name;
                if((name === "*") || (fullName === potentialNode.nodeName)) {
                    if((uri === "*") || (uri === potentialNode.namespaceURI)) {
                        elements.push(potentialNode);
                    }
                }
            }
        }
        return elements;
    },

    /**
     * APIMethod: getAttributeNodeNS
     * 获取一个给定命名空间uri和描述名称的带属性节点。
     * 
     * Parameters:
     * node - {Element} 指定节点搜索的父节点。
     * uri - {String} 命名空间URI.
     * name - {String} 属性的描述名称。
     * 
     * Returns:
     * {DOMElement} 一个属性节点，当没找到时返回null。
     */
    getAttributeNodeNS: function(node, uri, name) {
        var attributeNode = null;
        if(node.getAttributeNodeNS) {
            attributeNode = node.getAttributeNodeNS(uri, name);
        } else {
            var attributes = node.attributes;
            var potentialNode, fullName;
            for(var i=0, len=attributes.length; i<len; ++i) {
                potentialNode = attributes[i];
                if(potentialNode.namespaceURI === uri) {
                    fullName = (potentialNode.prefix) ?
                               (potentialNode.prefix + ":" + name) : name;
                    if(fullName === potentialNode.nodeName) {
                        attributeNode = potentialNode;
                        break;
                    }
                }
            }
        }
        return attributeNode;
    },

    /**
     * APIMethod: getAttributeNS
     * 通过指定的命名空间uri和描述名称获取节点属性值。
     * 
     * Parameters:
     * node - {Element} 指定节点搜索的父节点。
     * uri - {String} 命名空间URI。
     * name - {String} 属性的描述名称（不带前缀）。
     * 
     * Returns:
     * {String} 属性值或者空字符串（当没有找到对应节点）。
     */
    getAttributeNS: function(node, uri, name) {
        var attributeValue = "";
        if(node.getAttributeNS) {
            attributeValue = node.getAttributeNS(uri, name) || "";
        } else {
            var attributeNode = this.getAttributeNodeNS(node, uri, name);
            if(attributeNode) {
                attributeValue = attributeNode.nodeValue;
            }
        }
        return attributeValue;
    },
    
    /**
     * APIMethod: getChildValue
     * 如果存在则获取节点中的文本，或返回一个可选的默认字符串。
     *     如果没有第一个孩子元素存在并且没有指定默认值，则返回空字符串。
     *
     * Parameters:
     * node - {DOMElement} 用于查看第一个孩子元素值的DOM元素。
     * def - {String} 当没有子元素值存在的时候返回的默认字符串。它是可选的，当没有
	 *     指定的时候则返回空字符串。
     *
     * Returns:
     * {String} 给定节点的第一个孩子元素的值。
     */
    getChildValue: function(node, def) {
        var value = def || "";
        if(node) {
            for(var child=node.firstChild; child; child=child.nextSibling) {
                switch(child.nodeType) {
                    case 3: // text node
                    case 4: // cdata section
                        value += child.nodeValue;
                }
            }
        }
        return value;
    },

    /**
     * APIMethod: isSimpleContent
     * 检测给定节点是否只包含简单内容(例如：没有孩子节点).
     *
     * Parameters:
     * node - {DOMElement} 节点元素。
     *
     * Returns:
     * {Boolean} 节点是否含有子节点(节点类型为1). 
     */
    isSimpleContent: function(node) {
        var simple = true;
        for(var child=node.firstChild; child; child=child.nextSibling) {
            if(child.nodeType === 1) {
                simple = false;
                break;
            }
        }
        return simple;
    },
    
    /**
     * APIMethod: contentType
     * 判定给定的节点类型。
     *
     * Parameters:
     * node - {DOMElement}
     *
     * Returns:
     * {Integer} 返回SuperMap.Format.XML.CONTENT_TYPE
	 *     {EMPTY,SIMPLE,COMPLEX,MIXED}其中之一
     */
    contentType: function(node) {
        var simple = false,
            complex = false;
            
        var type = SuperMap.Format.XML.CONTENT_TYPE.EMPTY;

        for(var child=node.firstChild; child; child=child.nextSibling) {
            switch(child.nodeType) {
                case 1: // element
                    complex = true;
                    break;
                case 8: // comment
                    break;
                default:
                    simple = true;
            }
            if(complex && simple) {
                break;
            }
        }
        
        if(complex && simple) {
            type = SuperMap.Format.XML.CONTENT_TYPE.MIXED;
        } else if(complex) {
            return SuperMap.Format.XML.CONTENT_TYPE.COMPLEX;
        } else if(simple) {
            return SuperMap.Format.XML.CONTENT_TYPE.SIMPLE;
        }
        return type;
    },

    /**
     * APIMethod: hasAttributeNS
     * 检测一个节点是否具有给定名称和名称空间所匹配的特有属性。
     *	 
     * Parameters:
     * node - {Element} 用于查询属性的节点。
     * uri - {String} 命名空间 URI。
     * name - {String} 属性的描述名称(没有前缀).
     * 
     * Returns:
     * {Boolean} 节点是否具有给定名称和命名空间所匹配的特有属性。
     */
    hasAttributeNS: function(node, uri, name) {
        var found = false;
        if(node.hasAttributeNS) {
            found = node.hasAttributeNS(uri, name);
        } else {
            found = !!this.getAttributeNodeNS(node, uri, name);
        }
        return found;
    },
    
    /**
     * APIMethod: setAttributeNS
     * 添加新属性或改变给定命名空间和描述名称对应的属性值。
     *
     * Parameters:
     * node - {Element} 用于设置属性的元素节点。
     * uri - {String} 属性的命名空间。
     * name - {String} 属性的描述性的名称。
     * value - {String} 属性值。
     */
    setAttributeNS: function(node, uri, name, value) {
        if(node.setAttributeNS) {
            node.setAttributeNS(uri, name, value);
        } else {
            if(this.xmldom) {
                if(uri) {
                    var attribute = node.ownerDocument.createNode(
                        2, name, uri
                    );
                    attribute.nodeValue = value;
                    node.setAttributeNode(attribute);
                } else {
                    node.setAttribute(name, value);
                }
            } else {
                throw "setAttributeNS not implemented";
            }
        }
    },

    /**
     * Method: createElementNSPlus
     * Shorthand for creating namespaced elements with optional attributes and
     *     child text nodes.
     *
     * Parameters:
     * name - {String} The qualified node name.
     * options - {Object} Optional object for node configuration.
     *
     * Valid options:
     * uri - {String} Optional namespace uri for the element - supply a prefix
     *     instead if the namespace uri is a property of the format's namespace
     *     object.
     * attributes - {Object} Optional attributes to be set using the
     *     <setAttributes> method.
     * value - {String} Optional text to be appended as a text node.
     *
     * Returns:
     * {Element} An element node.
     */
    createElementNSPlus: function(name, options) {
        options = options || {};
        // order of prefix preference
        // 1. in the uri option
        // 2. in the prefix option
        // 3. in the qualified name
        // 4. from the defaultPrefix
        var uri = options.uri || this.namespaces[options.prefix];
        if(!uri) {
            var loc = name.indexOf(":");
            uri = this.namespaces[name.substring(0, loc)];
        }
        if(!uri) {
            uri = this.namespaces[this.defaultPrefix];
        }
        var node = this.createElementNS(uri, name);
        if(options.attributes) {
            this.setAttributes(node, options.attributes);
        }
        var value = options.value;
        if(value != null) {
            node.appendChild(this.createTextNode(value));
        }
        return node;
    },
    
    /**
     * Method: setAttributes
     * Set multiple attributes given key value pairs from an object.
     *
     * Parameters:
     * node - {Element} An element node.
     * obj - {Object || Array} An object whose properties represent attribute
     *     names and values represent attribute values.  If an attribute name
     *     is a qualified name ("prefix:local"), the prefix will be looked up
     *     in the parsers {namespaces} object.  If the prefix is found,
     *     setAttributeNS will be used instead of setAttribute.
     */
    setAttributes: function(node, obj) {
        var value, uri;
        for(var name in obj) {
            if(obj[name] != null && obj[name].toString) {
                value = obj[name].toString();
                // check for qualified attribute name ("prefix:local")
                uri = this.namespaces[name.substring(0, name.indexOf(":"))] || null;
                this.setAttributeNS(node, uri, name, value);
            }
        }
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
     *
     * Returns:
     * {Object} The input object, modified (or a new one if none was provided).
     */
    readNode: function(node, obj) {
        if(!obj) {
            obj = {};
        }
        var group = this.readers[node.namespaceURI ? this.namespaceAlias[node.namespaceURI]: this.defaultPrefix];
        if(group) {
            var local = node.localName || node.nodeName.split(":").pop();
            var reader = group[local] || group["*"];
//            //~此处进行了修改，增对此项目，gml不支持“SHAPE”，所以需要使用自定义的解析
//            if(!reader )
//            {
//                reader = this.readers["feature"]["*"];
//            }
            if(reader) {
                reader.apply(this, [node, obj]);
            }
        }
        return obj;
    },

    /**
     * Method: readChildNodes
     * Shorthand for applying the named readers to all children of a node.
     *     For each child of type 1 (element), <readSelf> is called.
     *
     * Parameters:
     * node - {DOMElement} The node to be read (required).
     * obj - {Object} The object to be modified (optional).
     *
     * Returns:
     * {Object} The input object, modified.
     */
    readChildNodes: function(node, obj) {
        if(!obj) {
            obj = {};
        }
        var children = node.childNodes;
        var child;
        for(var i=0, len=children.length; i<len; ++i) {
            child = children[i];
            if(child.nodeType === 1) {
                this.readNode(child, obj);
            }
        }
        return obj;
    },

    /**
     * Method: writeNode
     * Shorthand for applying one of the named writers and appending the
     *     results to a node.  If a qualified name is not provided for the
     *     second argument (and a local name is used instead), the namespace
     *     of the parent node will be assumed.
     *
     * Parameters:
     * name - {String} The name of a node to generate.  If a qualified name
     *     (e.g. "pre:Name") is used, the namespace prefix is assumed to be
     *     in the <writers> group.  If a local name is used (e.g. "Name") then
     *     the namespace of the parent is assumed.  If a local name is used
     *     and no parent is supplied, then the default namespace is assumed.
     * obj - {Object} Structure containing data for the writer.
     * parent - {DOMElement} Result will be appended to this node.  If no parent
     *     is supplied, the node will not be appended to anything.
     *
     * Returns:
     * {DOMElement} The child node.
     */
    writeNode: function(name, obj, parent) {
        var prefix, local;
        var split = name.indexOf(":");
        if(split > 0) {
            prefix = name.substring(0, split);
            local = name.substring(split + 1);
        } else {
            if(parent) {
                prefix = this.namespaceAlias[parent.namespaceURI];
            } else {
                prefix = this.defaultPrefix;
            }
            local = name;
        }
        var child = this.writers[prefix][local].apply(this, [obj]);
        if(parent) {
            parent.appendChild(child);
        }
        return child;
    },

    /**
     * APIMethod: getChildEl
     * 获取第一个孩子元素。返回第一个匹配给定描述名称和命名空间URI的
	 *     孩子元素。
     *
     * Parameters:
     * node - {DOMElement} 父节点。
     * name - {String} 用于搜索的可选的描述名称。
     * uri - {String} 用于搜索的可选的命名空间URI。
     *
     * Returns:
     * {DOMElement} 第一个孩子元素。如果没有找到相应的元素则返回null。
     */
    getChildEl: function(node, name, uri) {
        return node && this.getThisOrNextEl(node.firstChild, name, uri);
    },
    
    /**
     * APIMethod: getNextEl
     * 获得兄弟元素。返回第一个匹配给定描述名称和命名空间URI的
	 *     兄弟元素。
     *
     * Parameters:
     * node - {DOMElement} 节点.
     * name - {String}用于搜索兄弟元素的可选的描述名称。
     * uri - {String} 用于搜索兄弟元素的可选的命名空间URI。
     *
     * Returns:
     * {DOMElement} 兄弟元素。如果没有找到对应的元素则返回null。
     */
    getNextEl: function(node, name, uri) {
        return node && this.getThisOrNextEl(node.nextSibling, name, uri);
    },
    
    /**
     * Method: getThisOrNextEl
     * Return this node or the next element node.  Optionally get the first
     *     sibling with the given local name or namespace URI.
     *
     * Parameters:
     * node - {DOMElement} The node.
     * name - {String} Optional local name of the sibling to search for.
     * uri - {String} Optional namespace URI of the sibling to search for.
     *
     * Returns:
     * {DOMElement} The next sibling element.  Returns null if no element is
     *     found, something significant besides an element is found, or the
     *     found element does not match the query.
     */
    getThisOrNextEl: function(node, name, uri) {
        outer: for(var sibling=node; sibling; sibling=sibling.nextSibling) {
            switch(sibling.nodeType) {
                case 1: // Element
                    if((!name || name === (sibling.localName || sibling.nodeName.split(":").pop())) &&
                       (!uri || uri === sibling.namespaceURI)) {
                        // matches
                        break outer;
                    }
                    sibling = null;
                    break outer;
                case 3: // Text
                    if(/^\s*$/.test(sibling.nodeValue)) {
                        break;
                    }
                case 4: // CDATA
                case 6: // ENTITY_NODE
                case 12: // NOTATION_NODE
                case 10: // DOCUMENT_TYPE_NODE
                case 11: // DOCUMENT_FRAGMENT_NODE
                    sibling = null;
                    break outer;
            } // ignore comments and processing instructions
        }
        return sibling || null;
    },
    
    /**
     * APIMethod: lookupNamespaceURI
     * 在给定的节点根据提供的前缀查找并返回与之关联的命名空间URI（未找到
     *     返回null）。提供null作为前缀将返回默认的名称空间。
     *
     * 为了让浏览器支持这个方法，这个方法调用了原生的lookupNamesapceURI方法，在其他浏览器
     *     这是对http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI.
     *     的一个实现。
     *
     * 对于不支持该属性的浏览器。ownerElement 方法在属性节点被调用。
     *     
     * Parameters:
     * node - {DOMElement} 开始寻找的起始节点。
     * prefix - {String} 用于查找的前缀，当该值为null的时候返回的是默认命名空间。
     * 
     * Returns:
     * {String} 返回与给定前缀关联的命名空间URI。  如果给定前缀没有找到或节点为错误类型
     *     返回值为null。
     */
    lookupNamespaceURI: function(node, prefix) {
        var uri = null;
        if(node) {
            if(node.lookupNamespaceURI) {
                uri = node.lookupNamespaceURI(prefix);
            } else {
                outer: switch(node.nodeType) {
                    case 1: // ELEMENT_NODE
                        if(node.namespaceURI !== null && node.prefix === prefix) {
                            uri = node.namespaceURI;
                            break outer;
                        }
                        var len = node.attributes.length;
                        if(len) {
                            var attr;
                            for(var i=0; i<len; ++i) {
                                attr = node.attributes[i];
                                if(attr.prefix === "xmlns" && attr.name === "xmlns:" + prefix) {
                                    uri = attr.value || null;
                                    break outer;
                                } else if(attr.name === "xmlns" && prefix === null) {
                                    uri = attr.value || null;
                                    break outer;
                                }
                            }
                        }
                        uri = this.lookupNamespaceURI(node.parentNode, prefix);
                        break outer;
                    case 2: // ATTRIBUTE_NODE
                        uri = this.lookupNamespaceURI(node.ownerElement, prefix);
                        break outer;
                    case 9: // DOCUMENT_NODE
                        uri = this.lookupNamespaceURI(node.documentElement, prefix);
                        break outer;
                    case 6: // ENTITY_NODE
                    case 12: // NOTATION_NODE
                    case 10: // DOCUMENT_TYPE_NODE
                    case 11: // DOCUMENT_FRAGMENT_NODE
                        break outer;
                    default: 
                        // TEXT_NODE (3), CDATA_SECTION_NODE (4), ENTITY_REFERENCE_NODE (5),
                        // PROCESSING_INSTRUCTION_NODE (7), COMMENT_NODE (8)
                        uri =  this.lookupNamespaceURI(node.parentNode, prefix);
                        break outer;
                }
            }
        }
        return uri;
    },
    
    /**
     * Method: getXMLDoc
     * Get an XML document for nodes that are not supported in HTML (e.g.
     * createCDATASection). On IE, this will either return an existing or
     * create a new <xmldom> on the instance. On other browsers, this will
     * either return an existing or create a new shared document (see
     * <SuperMap.Format.XML.document>).
     *
     * Returns:
     * {XMLDocument}
     */
    getXMLDoc: function() {
        if (!SuperMap.Format.XML.document && !this.xmldom) {
            if (document.implementation && document.implementation.createDocument) {
                SuperMap.Format.XML.document =
                    document.implementation.createDocument("", "", null);
            } else if (!this.xmldom && window.ActiveXObject) {
                this.xmldom = new ActiveXObject("Microsoft.XMLDOM");
            }
        }
        return SuperMap.Format.XML.document || this.xmldom;
    },

    CLASS_NAME: "SuperMap.Format.XML"

});     

SuperMap.Format.XML.CONTENT_TYPE = {EMPTY: 0, SIMPLE: 1, COMPLEX: 2, MIXED: 3};

/**
 * APIFunction: SuperMap.Format.XML.lookupNamespaceURI
 * 在给定的节点根据提供的前缀查找并返回与之关联的命名空间URI（未找到
 *     返回null）。提供null作为前缀将返回默认的名称空间。
 *
 * 为了让浏览器支持这个方法，这个方法调用了原生的lookupNamesapceURI方法，在其他浏览器
 *     这是对http://www.w3.org/TR/DOM-Level-3-Core/core.html#Node3-lookupNamespaceURI.
 *     的一个实现。
 *
 * 对于不支持该属性的浏览器。ownerElement 方法在属性节点被调用。
 *
 * Parameters:
 * node - {DOMElement} 开始寻找的起始节点。
 * prefix - {String} 用于查找的前缀，当该值为null的时候返回的是默认命名空间。
 *
 * Returns:
 * {String} 返回与给定前缀关联的命名空间URI。  如果给定前缀没有找到或节点为错误类型
 *     返回值为null。
 */
SuperMap.Format.XML.lookupNamespaceURI = SuperMap.Function.bind(
    SuperMap.Format.XML.prototype.lookupNamespaceURI,
    SuperMap.Format.XML.prototype
);

/**
 * Property: SuperMap.Format.XML.document
 * {XMLDocument} XML document to reuse for creating non-HTML compliant nodes,
 * like document.createCDATASection.
 */
SuperMap.Format.XML.document = null;
