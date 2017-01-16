/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/BaseTypes/Class.js
 */

/**
 * Class: SuperMap.Protocol
 * 抽象的矢量图层协议类。它不能够被直接实例化，如果要使用其实例，应该使
 *     用它的一个实现子类。
 */
SuperMap.Protocol = SuperMap.Class({

    /**
     * Property: format
     * {<SuperMap.Format>} 应用于这个协议的format。
     */
    format: null,

    /**
     * Property: options
     * {Object} 发送给构造函数的选项对象。
     */
    options: null,

    /**
     * Property: autoDestroy
     * {Boolean} 协议构造器能后设置autoDestory为false，当协议类销毁的时候能
     *      够完全的控制，默认值为true。
     */
    autoDestroy: true,

    /**
     * Property: defaultFilter
     * {<SuperMap.Filter>} 可选的，用来设置读取请求的默认过滤器。
     */
    defaultFilter: null,

    /**
     * Constructor: SuperMap.Protocol
     * 矢量协议的抽象类，使用时实例化其实现子类。
     *
     * Parameters:
     * options - {Object} 可选对象，其属性会被设置在实例上。
     */
    initialize: function(options) {
        options = options || {};
        SuperMap.Util.extend(this, options);
        this.options = options;
    },

    /**
     * Method: mergeWithDefaultFilter
     * Merge filter passed to the read method with the default one
     *
     * Parameters:
     * filter - {<SuperMap.Filter>}
     */
    mergeWithDefaultFilter: function(filter) {
        var merged;
        if (filter && this.defaultFilter) {
            merged = new SuperMap.Filter.Logical({
                type: SuperMap.Filter.Logical.AND,
                filters: [this.defaultFilter, filter]
            });
        } else {
            merged = filter || this.defaultFilter || undefined;
        }
        return merged;
    },

    /**
     * APIMethod: destroy
     * 清除协议。
     */
    destroy: function() {
        this.options = null;
        this.format = null;
    },

    /**
     * APIMethod: read
     * 为读取新要素构造一个请求。
     *
     * Parameters:
     * options - {Object} 可选对象，用于配置请求。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 一个 <SuperMap.Protocol.Response> 对象,
     *      如果在option对象里已经存在一个，那它将被传递到callback函数。
     */
    read: function(options) {
        options = options || {};
        options.filter = this.mergeWithDefaultFilter(options.filter);
    },


    /**
     * APIMethod: create
     * 构造一个请求用于编写新创建的要素。
     *
     * Parameters:
     * features - {Array({<SuperMap.Feature.Vector>})} 或
     *            {<SuperMap.Feature.Vector>}
     * options - {Object} 可选对象，用于配置请求。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>}  一个 <SuperMap.Protocol.Response> 对
     *      象，如果在option对象里已经存在一个，那它将被传递到callback函数。
     */
    create: function() {
    },

    /**
     * APIMethod: update
     * 构造一个请求更新修改后的要素。
     *
     * Parameters:
     * features - {Array({<SuperMap.Feature.Vector>})} 或
     *            {<SuperMap.Feature.Vector>}
     * options - {Object} 可选对象，用于配置请求。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 一个 <SuperMap.Protocol.Response> 对
     *     象， 如果在option对象里已经存在一个，那它将被传递到callback函数。
     */
    update: function() {
    },

    /**
     * APIMethod: delete
     * 构造一个请求用于删除一个已经被删除的要素。
     *
     * Parameters:
     * feature - {<SuperMap.Feature.Vector>}
     * options - {Object} 可选对象，用于配置请求。
     *
     * Returns:
     * {<SuperMap.Protocol.Response>} 一个 <SuperMap.Protocol.Response> 对
     *     象，  如果在option对象里已经存在一个，那它将被传递到callback函数。
     */
    "delete": function() {
    },

    /**
     * APIMethod: commit
     * 根据要素状态检查每个要素并执行某个动作。能够用到的动作有create，
     *      update和delete。
     *
     * Parameters:
     * features - {Array({<SuperMap.Feature.Vector>})}
     * options - {Object} 关键字可能是"create"， "update"，"delete"， "callback"
     *      或 "scope"的对象。关键字是前三个的对象会被分别传递到"create"，
     *      "update" 和"delete" 方法，关键字是 "callback" 的对象是"scope" 关键字
     *      代表的范围当commit操作结束时被调用的一个方法。
     *
     * Returns:
     * {Array({<SuperMap.Protocol.Response>})}
     *      返回一个 <SuperMap.Protocol.Response> 数组对象。
     */
    commit: function() {
    },

    /**
     * Method: abort
     * Abort an ongoing request.
     *
     * Parameters:
     * response - {<SuperMap.Protocol.Response>}
     */
    abort: function(response) {
    },

    /**
     * Method: createCallback
     * Returns a function that applies the given public method with resp and
     *     options arguments.
     *
     * Parameters:
     * method - {Function} The method to be applied by the callback.
     * response - {<SuperMap.Protocol.Response>} The protocol response object.
     * options - {Object} Options sent to the protocol method
     */
    createCallback: function(method, response, options) {
        return SuperMap.Function.bind(function() {
            method.apply(this, [response, options]);
        }, this);
    },

    CLASS_NAME: "SuperMap.Protocol"
});

/**
 * Class: SuperMap.Protocol.Response
 * 协议向用户返回的响应对象。
 */
SuperMap.Protocol.Response = SuperMap.Class({
    /**
     * Property: code
     * {Number} - SuperMap.Protocol.Response.SUCCESS or
     *            SuperMap.Protocol.Response.FAILURE
     */
    code: null,

    /**
     * Property: requestType
     * {String} The type of request this response corresponds to. Either
     *      "create", "read", "update" or "delete".
     */
    requestType: null,

    /**
     * Property: last
     * {Boolean} - true if this is the last response expected in a commit,
     * false otherwise, defaults to true.
     */
    last: true,

    /**
     * Property: features
     * {Array({<SuperMap.Feature.Vector>})} or {<SuperMap.Feature.Vector>}
     * The features returned in the response by the server. Depending on the
     * protocol's read payload, either features or data will be populated.
     */
    features: null,

    /**
     * Property: data
     * {Object}
     * The data returned in the response by the server. Depending on the
     * protocol's read payload, either features or data will be populated.
     */
    data: null,

    /**
     * Property: reqFeatures
     * {Array({<SuperMap.Feature.Vector>})} or {<SuperMap.Feature.Vector>}
     * The features provided by the user and placed in the request by the
     *      protocol.
     */
    reqFeatures: null,

    /**
     * Property: priv
     */
    priv: null,

    /**
     * Property: error
     * {Object} The error object in case a service exception was encountered.
     */
    error: null,

    /**
     * Constructor: SuperMap.Protocol.Response
     *
     * Parameters:
     * options - {Object} 可选对象，其属性将被设置到实例。
     */
    initialize: function(options) {
        SuperMap.Util.extend(this, options);
    },

    /**
     * Method: success
     *
     * Returns:
     * {Boolean} - true on success, false otherwise
     */
    success: function() {
        return this.code > 0;
    },

    CLASS_NAME: "SuperMap.Protocol.Response"
});

SuperMap.Protocol.Response.SUCCESS = 1;
SuperMap.Protocol.Response.FAILURE = 0;
