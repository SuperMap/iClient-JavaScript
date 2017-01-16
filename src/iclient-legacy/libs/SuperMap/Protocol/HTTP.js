/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Protocol.js
 * @requires SuperMap/Request/XMLHttpRequest.js
 */

/**
 * if application uses the query string, for example, for BBOX parameters,
 * SuperMap/Format/QueryStringFilter.js should be included in the build config file
 */

/**
 * Class: SuperMap.Protocol.HTTP
 * 矢量图层HTTP基础协议类。
 *
 * Inherits from:
 *  - <SuperMap.Protocol>
 */
SuperMap.Protocol.HTTP = SuperMap.Class(SuperMap.Protocol, {

    /**
     * Property: url
     * {String} Service URL, read-only, set through the options
     *     passed to constructor.
     */
    url: null,

    /**
     * Property: headers
     * {Object} HTTP request headers, read-only, set through the options
     *     passed to the constructor,
     *     Example: {'Content-Type': 'plain/text'}
     */
    headers: null,

    /**
     * Property: params
     * {Object} Parameters of GET requests, read-only, set through the options
     *     passed to the constructor,
     *     Example: {'bbox': '5,5,5,5'}
     */
    params: null,
    
    /**
     * Property: callback
     * {Object} Function to be called when the <read>, <create>,
     *     <update>, <delete> or <commit> operation completes, read-only,
     *     set through the options passed to the constructor.
     */
    callback: null,

    /**
     * Property: scope
     * {Object} Callback execution scope, read-only, set through the
     *     options passed to the constructor.
     */
    scope: null,

    /**
     * APIProperty: readWithPOST
     * {Boolean} 当read操作为POST请求时，此值为true ，默认为false 。
     */
    readWithPOST: false,

    /**
     * APIProperty: updateWithPOST
     * {Boolean} 当update操作为POST请求时，此值为true ，默认为false。
     */
    updateWithPOST: false,
    
    /**
     * APIProperty: deleteWithPOST
     * {Boolean} 当delete操作为POST请求时，此值为true ，默认为false
     *     当值为true时, POST data 将作为 format.write()的输出。
     */
    deleteWithPOST: false,

    /**
     * Property: wildcarded.
     * {Boolean} If true percent signs are added around values
     *     read from LIKE filters, for example if the protocol
     *     read method is passed a LIKE filter whose property
     *     is "foo" and whose value is "bar" the string
     *     "foo__ilike=%bar%" will be sent in the query string;
     *     defaults to false.
     */
    wildcarded: false,

    /**
     * APIProperty: srsInBBOX
     * {Boolean} BBOX查询字符串参数是否包含SRS标识.默认为false.。
     * 如果此值为true，而且其图层的projection已经被设置了，
     * 则BBOX参数将被序列化为包括空间参照系总共五项字符串参数。例如：bbox=-1000,-1000,1000,1000,EPSG:900913
     */
    srsInBBOX: false,

    /**
     * Constructor: SuperMap.Protocol.HTTP
     * 图层通用的HTTP协议的类。
     *
     * Parameters:
     * options - {Object} 其属性将在实例中设置的可选的对象。
     * Valid options include:
     * url - {String}
     * headers - {Object} 
     * params - {Object} GET请求的URL参数
     * format - {<SuperMap.Format>}
     * callback - {Function}
     * scope - {Object}
     */
    initialize: function(options) {
        options = options || {};
        this.params = {};
        this.headers = {};
        SuperMap.Protocol.prototype.initialize.apply(this, arguments);

        if (!this.filterToParams && SuperMap.Format.QueryStringFilter) {
            var format = new SuperMap.Format.QueryStringFilter({
                wildcarded: this.wildcarded,
                srsInBBOX: this.srsInBBOX
            });
            this.filterToParams = function(filter, params) {
                return format.write(filter, params);
            };
        }
    },
    
    /**
     * APIMethod: destroy
     * 清除协议对象.
     */
    destroy: function() {
        this.params = null;
        this.headers = null;
        SuperMap.Protocol.prototype.destroy.apply(this);
    },

    /**
     * APIMethod: filterToParams
     * 将<SuperMap.Filter>对象序列化成请求的查询字符串的自定义方法。
     * 如果没有提供自定义的方法，该过滤器将使用<SuperMap.Format.QueryStringFilter>来序列化。
     *
     * Parameters:
     * filter - {<SuperMap.Filter>} 过滤转换
     * params - {Object} 参数对象.
     *
     * Returns:
     * {Object} 返回的参数对象
     */
    
    /**
     * APIMethod: read
     * 构建一个读取新要素的请求。
     *
     * Parameters:
     * options - {Object} 配置请求的可选对象。这个对象可被修改，但不应被重用。
     *
     * Valid options:
     * url - {String} 请求url
     * params - {Object} 将被序列化为字符串的参数
     * headers - {Object} 请求的头信息
     * filter - {<SuperMap.Filter>} 序列化字符串时用到的过滤器
     * readWithPOST - {Boolean} 是否使用POST请求
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 响应对象，其“priv”属性引用了HTTP请求。
     * 请求完成时，该对象也被传递给回调函数时，
     * 它的“features”属性也会新添加从服务器端返回的数据
     */
    read: function(options) {
        SuperMap.Protocol.prototype.read.apply(this, arguments);
        options = options || {};
        options.params = SuperMap.Util.applyDefaults(
            options.params, this.options.params);
        options = SuperMap.Util.applyDefaults(options, this.options);
        if (options.filter && this.filterToParams) {
            options.params = this.filterToParams(
                options.filter, options.params
            );
        }
        var readWithPOST = (options.readWithPOST !== undefined) ?
                           options.readWithPOST : this.readWithPOST;
        var resp = new SuperMap.Protocol.Response({requestType: "read"});
        if(readWithPOST) {
            var headers = options.headers || {};
            headers["Content-Type"] = "application/x-www-form-urlencoded";
            resp.priv = SuperMap.Request.POST({
                url: options.url,
                callback: this.createCallback(this.handleRead, resp, options),
                data: SuperMap.Util.getParameterString(options.params),
                headers: headers
            });
        } else {
            resp.priv = SuperMap.Request.GET({
                url: options.url,
                callback: this.createCallback(this.handleRead, resp, options),
                params: options.params,
                headers: options.headers
            });
        }
        return resp;
    },

    /**
     * Method: handleRead
     * Individual callbacks are created for read, create and update, should
     *     a subclass need to override each one separately.
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} The response object to pass to
     *     the user callback.
     * options - {Object} The user options passed to the read call.
     */
    handleRead: function(resp, options) {
        this.handleResponse(resp, options);
    },

    /**
     * APIMethod: create
     * 构建用于创建要素的请求。
     *
     * Parameters:
     * features - {Array({<SuperMap.Feature.Vector>})} or {<SuperMap.Feature.Vector>}
     * options - {Object} 配置新请求的选项。
     * 这个对象可被修改，但不应被重用。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 响应对象，其”priv“属性引用http请求, 在请求完成时，这个对象将被传递给回调函数，
     * 其“features”属性会新增从服务器端返回的features数据。
     */
    create: function(features, options) {
        options = SuperMap.Util.applyDefaults(options, this.options);

        var resp = new SuperMap.Protocol.Response({
            reqFeatures: features,
            requestType: "create"
        });

        resp.priv = SuperMap.Request.POST({
            url: options.url,
            callback: this.createCallback(this.handleCreate, resp, options),
            headers: options.headers,
            data: this.format.write(features)
        });

        return resp;
    },

    /**
     * Method: handleCreate
     * create中的请求回调函数.  可被其子类修改
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} 响应对象，可传递给用户的回调函数
     * options - {Object} 传递给回调函数的可选参数
     */
    handleCreate: function(resp, options) {
        this.handleResponse(resp, options);
    },

    /**
     * APIMethod: update
     * 构建一个更新要素的请求。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}
     * options - {Object} 用来设置请求的可选参数.这个参数可被修改，但不应被重用。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>}  结果类型对象。
     *     其"priv" 属性引用了 HTTP 请求, 当请求完成后，这个参数也将会被传递给回调函数，
     *     其"features" 属性会新增从服务器返回来的数据。
     */
    update: function(feature, options) {
        options = options || {};
        var url = options.url ||
                  feature.url ||
                  this.options.url + "/" + feature.fid;
        options = SuperMap.Util.applyDefaults(options, this.options);

        var resp = new SuperMap.Protocol.Response({
            reqFeatures: feature,
            requestType: "update"
        });

        var method = this.updateWithPOST ? "POST" : "PUT";
        resp.priv = SuperMap.Request[method]({
            url: url,
            callback: this.createCallback(this.handleUpdate, resp, options),
            headers: options.headers,
            data: this.format.write(feature)
        });

        return resp;
    },

    /**
     * Method: handleUpdate
     * 当<update>完成之后，这个函数将会被调用，这个函数可被其子类重写
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} 这个Response对象可被传递给回调函数
     * options - {Object} 用户传递给update函数的参数
     */
    handleUpdate: function(resp, options) {
        this.handleResponse(resp, options);
    },

    /**
     * APIMethod: delete
     * 构建一个删除要素的请求
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}
     * options - {Object} 用来设置请求的可选参数.这个参数可被修改，但不应被重用
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 返回的结果对象。
     *     其"priv" 属性引用了 HTTP请求, 当请求完成后，这个参数也将会被传递给回调函数。
     *     其"features" 属性也将增加从服务器返回来的数据。
     */
    "delete": function(feature, options) {
        options = options || {};
        var url = options.url ||
                  feature.url ||
                  this.options.url + "/" + feature.fid;
        options = SuperMap.Util.applyDefaults(options, this.options);

        var resp = new SuperMap.Protocol.Response({
            reqFeatures: feature,
            requestType: "delete"
        });

        var method = this.deleteWithPOST ? "POST" : "DELETE";
        var requestOptions = {
            url: url,
            callback: this.createCallback(this.handleDelete, resp, options),
            headers: options.headers
        };
        if (this.deleteWithPOST) {
            requestOptions.data = this.format.write(feature);
        }
        resp.priv = SuperMap.Request[method](requestOptions);

        return resp;
    },

    /**
     * Method: handleDelete
     * 当<delete>完成之后，这个函数将会被调用，这个函数可被其子类重写
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} 这个Response对象可被传递给任意的回调函数
     * options - {Object} 用户传递给delete函数的参数.
     */
    handleDelete: function(resp, options) {
        this.handleResponse(resp, options);
    },

    /**
     * Method: handleResponse
     * Called by CRUD specific handlers.
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>} The response object to pass to
     *     any user callback.
     * options - {Object} The user options passed to the create, read, update,
     *     or delete call.
     */
    handleResponse: function(resp, options) {
        var request = resp.priv;
        if(options.callback) {
            if(request.status >= 200 && request.status < 300) {
                // success
                if(resp.requestType !== "delete") {
                    resp.features = this.parseFeatures(request);
                }
                resp.code = SuperMap.Protocol.Response.SUCCESS;
            } else {
                // failure
                resp.code = SuperMap.Protocol.Response.FAILURE;
            }
            options.callback.call(options.scope, resp);
        }
    },

    /**
     * Method: parseFeatures
     * 读取 HTTP response 的主体并返回features对象
     *
     * Parameters:
     * request - {XMLHttpRequest} 请求参数
     *
     * Returns:
     * {Array({<SuperMap.Feature.Vector>})} or
     *     {<SuperMap.Feature.Vector>} features数组或者单个features对象
     */
    parseFeatures: function(request) {
        var doc = request.responseXML;
        if (!doc || !doc.documentElement) {
            doc = request.responseText;
        }
        if (!doc || doc.length <= 0) {
            return null;
        }
        return this.format.read(doc);
    },

    /**
     * APIMethod: commit
     * 遍历所有的 feature 并根据每个feature的状态对其执行不同的操作，例如：create, update and delete.
     *
     * Parameters:
     * features - {Array({<SuperMap.Feature.Vector>})}
     * options - {Object} 设置commit中的回调函数的参数
     *
     * Valid options:
     * create - {Object} 要传递给create函数的可选参数
     * update - {Object} 要传递给update函数的可选参数
     * delete - {Object} 要传递给delete函数的可选参数
     * callback - {Function} 提交完成后的回调函数
     * scope - {Object} 用来设置回调函数的可选域对象
     *
     * Returns:
     * {Array(<SuperMap.Protocol.Response>)} 结果数组，每个对象的“priv”属性都引用相应的http请求。
     */
    commit: function(features, options) {
        options = SuperMap.Util.applyDefaults(options, this.options);
        var resp = [], nResponses = 0;
        
        // Divide up features before issuing any requests.  This properly
        // counts requests in the event that any responses come in before
        // all requests have been issued.
        var types = {};
        types[SuperMap.State.INSERT] = [];
        types[SuperMap.State.UPDATE] = [];
        types[SuperMap.State.DELETE] = [];
        var feature, list, requestFeatures = [];
        for(var i=0, len=features.length; i<len; ++i) {
            feature = features[i];
            list = types[feature.state];
            if(list) {
                list.push(feature);
                requestFeatures.push(feature); 
            }
        }
        // tally up number of requests
        var nRequests = (types[SuperMap.State.INSERT].length > 0 ? 1 : 0) +
            types[SuperMap.State.UPDATE].length +
            types[SuperMap.State.DELETE].length;
        
        // This response will be sent to the final callback after all the others
        // have been fired.
        var success = true;
        var finalResponse = new SuperMap.Protocol.Response({
            reqFeatures: requestFeatures        
        });
        
        function insertCallback(response) {
            var len = response.features ? response.features.length : 0;
            var fids = new Array(len);
            for(var i=0; i<len; ++i) {
                fids[i] = response.features[i].fid;
            }   
            finalResponse.insertIds = fids;
            callback.apply(this, [response]);
        }
 
        function callback(response) {
            this.callUserCallback(response, options);
            success = success && response.success();
            nResponses++;
            if (nResponses >= nRequests) {
                if (options.callback) {
                    finalResponse.code = success ? 
                        SuperMap.Protocol.Response.SUCCESS :
                        SuperMap.Protocol.Response.FAILURE;
                    options.callback.apply(options.scope, [finalResponse]);
                }    
            }
        }

        // start issuing requests
        var queue = types[SuperMap.State.INSERT];
        if(queue.length > 0) {
            resp.push(this.create(
                queue, SuperMap.Util.applyDefaults(
                    {callback: insertCallback, scope: this}, options.create
                )
            ));
        }
        queue = types[SuperMap.State.UPDATE];
        for(var i=queue.length-1; i>=0; --i) {
            resp.push(this.update(
                queue[i], SuperMap.Util.applyDefaults(
                    {callback: callback, scope: this}, options.update
                ))
            );
        }
        queue = types[SuperMap.State.DELETE];
        for(var i=queue.length-1; i>=0; --i) {
            resp.push(this["delete"](
                queue[i], SuperMap.Util.applyDefaults(
                    {callback: callback, scope: this}, options["delete"]
                ))
            );
        }
        return resp;
    },

    /**
     * APIMethod: abort
     * 强行停止一个正在执行的请求，被传递给此函数的参数必须来自此HTTP protocol（必须是create, read, update, delete 或 commit操作的结果）
     *
     * Parameters:
     * response - {<SuperMap.Protocol.Response>}
     */
    abort: function(response) {
        if (response) {
            response.priv.abort();
        }
    },

    /**
     * Method: callUserCallback
     * This method is used from within the commit method each time an
     *     an HTTP response is received from the server, it is responsible
     *     for calling the user-supplied callbacks.
     *
     * Parameters:
     * resp - {<SuperMap.Protocol.Response>}
     * options - {Object} The map of options passed to the commit call.
     */
    callUserCallback: function(resp, options) {
        var opt = options[resp.requestType];
        if(opt && opt.callback) {
            opt.callback.call(opt.scope, resp);
        }
    },

    CLASS_NAME: "SuperMap.Protocol.HTTP" 
});
