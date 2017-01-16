/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Protocol/WFS.js
 */

/**
 * Class: SuperMap.Protocol.WFS.v1
 * v1.0.0和v1.1.0 版本协议的抽象类。
 *
 * Inherits from:
 *  - <SuperMap.Protocol>
 */
SuperMap.Protocol.WFS.v1 = SuperMap.Class(SuperMap.Protocol, {
    
    /**
     * Property: version
     * {String} WFS version number.
     */
    version: null,
    
    /**
     * Property: srsName
     * {String} Name of spatial reference system.  Default is "EPSG:4326".
     */
    srsName: "EPSG:4326",
    
    /**
     * Property: featureType
     * {String} Local feature typeName.
     */
    featureType: null,
    
    /**
     * Property: featureNS
     * {String} Feature namespace.
     */
    featureNS: null,
    
    /**
     * Property: geometryName
     * {String} Name of the geometry attribute for features.  Default is
     *     "the_geom" for WFS <version> 1.0, and null for higher versions.
     */
    geometryName: "the_geom",
    
    /**
     * Property: schema
     * {String} Optional schema location that will be included in the
     *     schemaLocation attribute value.  Note that the feature type schema
     *     is required for a strict XML validator (on transactions with an
     *     insert for example), but is *not* required by the WFS specification
     *     (since the server is supposed to know about feature type schemas).
     */
    schema: null,

    /**
     * Property: featurePrefix
     * {String} Namespace alias for feature type.  Default is "feature".
     */
    featurePrefix: "feature",
    
    /**
     * Property: formatOptions
     * {Object} Optional options for the format.  If a format is not provided,
     *     this property can be used to extend the default format options.
     */
    formatOptions: null,

    /** 
     * Property: readFormat 
     * {<SuperMap.Format>} For WFS requests it is possible to get a  
     *     different output format than GML. In that case, we cannot parse  
     *     the response with the default format (WFST) and we need a different 
     *     format for reading. 
     */ 
    readFormat: null,
    
    /**
     * Property: readOptions
     * {Object} Optional object to pass to format's read.
     */
    readOptions: null,
    
    /**
     * Constructor: SuperMap.Protocol.WFS
     * 给定图层的WFS协议类。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性将被设置到实例。
     *
     * 有效的options属性:
     * url - {String} 接收请求的URL。
     * featureType - {String} 要素类型名(必要的)，可以理解成数据集（不带数据
     *      源前缀）。
     * featureNS - {String} 要素的命名空间 (必要的，但是如果GML被解析同时
     *      featurePrefix提供并匹配服务器端用于featureType的prefix，那它就能够被
     *      自动检测到。).
     * featurePrefix - {String} 要素的命名空间别名 (可选 - 只有当featureNS被提供
     *     了才会被使用)。 默认值是 'feature'。可以理解成“数据源”。
     * geometryName - {String} 几何图形属性名称。 对于WFS版本1.0默认值是
     *     'the_geom' ，对于高版本为null。当为null的时候它将被设置成read操作读
     *     到的第一个几何图形属性名称。
     * multi - {Boolean} 如果设置为true， 绘制的对象由多个部分组成。当多次绘
     *     制时，程序会将绘制的要素组合成一个要素。
     */
    initialize: function(options) {
        SuperMap.Protocol.prototype.initialize.apply(this, [options]);
        if(!options.format) {
            this.format = SuperMap.Format.WFST(SuperMap.Util.extend({
                version: this.version,
                featureType: this.featureType,
                featureNS: this.featureNS,
                featurePrefix: this.featurePrefix,
                geometryName: this.geometryName,
                srsName: this.srsName,
                schema: this.schema
            }, this.formatOptions));
        }
        if (!options.geometryName && parseFloat(this.format.version) > 1.0) {
            this.setGeometryName(null);
        }
    },
    
    /**
     * APIMethod: destroy
     * 清除协议。
     */
    destroy: function() {
        if(this.options && !this.options.format) {
            this.format.destroy();
        }
        this.format = null;
        SuperMap.Protocol.prototype.destroy.apply(this);
    },

    /**
     * APIMethod: read
     * 为读取新要素构造一个请求。 WFS将基本的增删改查操作分为GetFeature请求(用来读取)
     *     和Transactions（其他操作）。
     *
     * Parameters:
     * options - {Object} 除了在实例设置的选项对象以外(设置在实例的选项对象具有较高
     *      优先级)read操作的选项对象。
     *
     * 使用一个配置好的协议(protocol)来获取要素，应用程序可以像下边这样做：
     *
     * (code)
     *    //属性过滤器
     *   var filter = new SuperMap.Filter.Comparison({
     *        type:SuperMap.Filter.Comparison.EQUAL_TO,
     *        property:"CAPITAL",
     *        value:"北京"
     *    });
     *
     *   // 空间过滤器，可以通过DrawFeature控件来获取geometry
     *  //     var geometry = event.feature.geometry;
     *  //     filter = new SuperMap.Filter.Spatial({
     *  //            type: SuperMap.Filter.Spatial.INTERSECTS,
     *  //            value: geometry
     *  //        });
     *
     * var  protocolRead = new SuperMap.Protocol.WFS({
     *       version:"1.0.0",
     *       url:"http://localhost:8090/iserver/services/data-world/wfs100",
     *       featureType:"Capitals",
     *       featureNS:"http://www.supermap.com/World",
     *       featurePrefix:"World",
     *       geometryName:"the_geom"
     *   });
     *
     * protocolRead.read({
     *     readOptions: {output: "object"},
     *     filter:filter,
     *     maxFeatures: null,
     *     callback: queryCompleted
     * });
     *
     * //定义回调函数，这里将返回的要素添加到定义好的vectorLayer里边，也可以进行其他操作
     * function queryCompleted(resp) {
     *   if (resp.features) {
     *       for (var j=0; j<resp.features.length; j++) {
     *           feature = resp.features[j];
     *           vectorLayer.addFeatures(feature);
     *       }
     *   }
     * }
     *
     * (end)
     */
    read: function(options) {
        SuperMap.Protocol.prototype.read.apply(this, arguments);
        options = SuperMap.Util.extend({}, options);
        SuperMap.Util.applyDefaults(options, this.options || {});
        var response = new SuperMap.Protocol.Response({requestType: "read"});
        
        var data = SuperMap.Format.XML.prototype.write.apply(
            this.format, [this.format.writeNode("wfs:GetFeature", options)]
        );
        if (SuperMap.Credential.CREDENTIAL) {
            options.url += options.url.indexOf("?") > -1 ? "&" : "?";
            options.url += SuperMap.Credential.CREDENTIAL.getUrlParameters();
        }
        response.priv = SuperMap.Request.POST({
            url: options.url,
            callback: this.createCallback(this.handleRead, response, options),
            params: options.params,
            headers: options.headers,
            data: data
        });

        return response;
    },

    /**
     * APIMethod: setFeatureType
     * 动态改变要素(feature)类型。
     *
     * Parameters:
     * featureType - {String} 要素类型名，可以理解成数据集(不带数据源前缀)。
     */
    setFeatureType: function(featureType) {
        this.featureType = featureType;
        this.format.featureType = featureType;
    },
 
    /**
     * APIMethod: setGeometryName
     * 在实例化以后设置geometryName选项(option)。
     *
     * Parameters:
     * geometryName - {String} 几何图形属性名称。
     */
    setGeometryName: function(geometryName) {
        this.geometryName = geometryName;
        this.format.geometryName = geometryName;
    },
    
    /**
     * Method: handleRead
     * 处理read请求的响应。
     *
     * Parameters:
     * response - {<SuperMap.Protocol.Response>} 传递到用户回调(callback)的响
     *     应对象。
     * options - {Object} 要传递到read请求(call)的用户选项(options)。
     */
    handleRead: function(response, options) {
        options = SuperMap.Util.extend({}, options);
        SuperMap.Util.applyDefaults(options, this.options);

        if(options.callback) {
            var request = response.priv;
            if(request.status >= 200 && request.status < 300) {
                // success
                var result = this.parseResponse(request, options.readOptions);
                if (result && result.success !== false) { 
                    if (options.readOptions && options.readOptions.output === "object") {
                        SuperMap.Util.extend(response, result);
                    } else {
                        response.features = result;
                    }
                    response.code = SuperMap.Protocol.Response.SUCCESS;
                } else {
                    // failure (service exception)
                    response.code = SuperMap.Protocol.Response.FAILURE;
                    response.error = result;
                }
            } else {
                // failure
                response.code = SuperMap.Protocol.Response.FAILURE;
            }
            options.callback.call(options.scope, response);
        }
    },

    /**
     * Method: parseResponse
     * Read HTTP response body and return features
     *
     * Parameters:
     * request - {XMLHttpRequest} The request object
     * options - {Object} Optional object to pass to format's read
     *
     * Returns:
     * {Object} or {Array({<SuperMap.Feature.Vector>})} or
     *     {<SuperMap.Feature.Vector>} 
     * An object with a features property, an array of features or a single 
     * feature.
     */
    parseResponse: function(request, options) {
        var doc = request.responseXML;
        if(!doc || !doc.documentElement) {
            doc = request.responseText;
        }
        if(!doc || doc.length <= 0) {
            return null;
        }
        var result = (this.readFormat !== null) ? this.readFormat.read(doc) : 
            this.format.read(doc, options);
        if (!this.featureNS) {
            var format = this.readFormat || this.format;
            this.featureNS = format.featureNS;
            // no need to auto-configure again on subsequent reads
            format.autoConfig = false;
            if (!this.geometryName) {
                this.setGeometryName(format.geometryName);
            }
        }
        return result;
    },

    /**
     * Method: commit
     * Given a list of feature, assemble a batch request for update, create,
     *     and delete transactions.  A commit call on the prototype amounts
     *     to writing a WFS transaction - so the write method on the format
     *     is used.
     *
     * Parameters:
     * features - {Array(<SuperMap.Feature.Vector>)}
     * options - {Object}
     *
     * Valid options properties:
     * nativeElements - {Array({Object})} Array of objects with information for writing
     * out <Native> elements, these objects have vendorId, safeToIgnore and
     * value properties. The <Native> element is intended to allow access to 
     * vendor specific capabilities of any particular web feature server or 
     * datastore.
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} A response object with a features
     *     property containing any insertIds and a priv property referencing
     *     the XMLHttpRequest object.
     */
    commit: function(features, options) {

        options = SuperMap.Util.extend({}, options);
        SuperMap.Util.applyDefaults(options, this.options);
        
        var response = new SuperMap.Protocol.Response({
            requestType: "commit",
            reqFeatures: features
        });
        response.priv = SuperMap.Request.POST({
            url: options.url,
            headers: options.headers,
            data: this.format.write(features, options),
            callback: this.createCallback(this.handleCommit, response, options)
        });
        
        return response;
    },
    
    /**
     * Method: handleCommit
     * Called when the commit request returns.
     * 
     * Parameters:
     * response - {<SuperMap.Protocol.Response>} The response object to pass
     *     to the user callback.
     * options - {Object} The user options passed to the commit call.
     */
    handleCommit: function(response, options) {
        if(options.callback) {
            var request = response.priv;

            // ensure that we have an xml doc
            var data = request.responseXML;
            if(!data || !data.documentElement) {
                data = request.responseText;
            }
            
            var obj = this.format.read(data) || {};
            
            response.insertIds = obj.insertIds || [];
            if (obj.success) {
                response.code = SuperMap.Protocol.Response.SUCCESS;
            } else {
                response.code = SuperMap.Protocol.Response.FAILURE;
                response.error = obj;
            }
            options.callback.call(options.scope, response);
        }
    },
    
    /**
     * Method: filterDelete
     * Send a request that deletes all features by their filter.
     * 
     * Parameters:
     * filter - {<SuperMap.Filter>} filter
     */
    filterDelete: function(filter, options) {
        options = SuperMap.Util.extend({}, options);
        SuperMap.Util.applyDefaults(options, this.options);    
        
        var response = new SuperMap.Protocol.Response({
            requestType: "commit"
        });    
        
        var root = this.format.createElementNSPlus("wfs:Transaction", {
            attributes: {
                service: "WFS",
                version: this.version
            }
        });
        
        var deleteNode = this.format.createElementNSPlus("wfs:Delete", {
            attributes: {
                typeName: (options.featureNS ? this.featurePrefix + ":" : "") +
                    options.featureType
            }
        });       
        
        if(options.featureNS) {
            deleteNode.setAttribute("xmlns:" + this.featurePrefix, options.featureNS);
        }
        var filterNode = this.format.writeNode("ogc:Filter", filter);
        
        deleteNode.appendChild(filterNode);
        
        root.appendChild(deleteNode);
        
        var data = SuperMap.Format.XML.prototype.write.apply(
            this.format, [root]
        );
        
        return SuperMap.Request.POST({
            url: this.url,
            callback : options.callback || function(){},
            data: data
        });   
        
    },

    /**
     * Method: abort
     * Abort an ongoing request, the response object passed to
     * this method must come from this protocol (as a result
     * of a read, or commit operation).
     *
     * Parameters:
     * response - {<SuperMap.Protocol.Response>}
     */
    abort: function(response) {
        if (response) {
            response.priv.abort();
        }
    },
  
    CLASS_NAME: "SuperMap.Protocol.WFS.v1" 
});
