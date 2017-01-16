/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 */

/**
 * Namespace: SuperMap.Request
 * SuperMap.Request命名空间包含了方便使用XMLHttpRequest请求的方法。
 * 这些方法使用跨浏览器的W3C兼容类 <SuperMap.Request.XMLHttpRequest> 来辅助工作。
 */
SuperMap.Request = {
    
    /**
     * Constant: DEFAULT_CONFIG
     * {Object} 所有请求的默认配置。
     */
    DEFAULT_CONFIG: {
        method: "GET",
        url: window.location.href,
        async: true,
        user: undefined,
        password: undefined,
        params: null,
        proxy: SuperMap.ProxyHost,
        headers: {},
        data: null,
        callback: function() {},
        success: null,
        failure: null,
        scope: null
    },
    
    /**
     * Constant: URL_SPLIT_REGEX
     */
    URL_SPLIT_REGEX: /([^:]*:)\/\/([^:]*:?[^@]*@)?([^:\/\?]*):?([^\/\?]*)/,
    
    /**
     * APIProperty: events
     * 用来处理 <SuperMap.Request> 类的对象上的所有事件。
     *
     * 监听器发送的event对象带有以下三个属性：
     * 	 
     * request - {<SuperMap.Request.XMLHttpRequest>} 的请求对象。
     * config - {Object} 发送指定请求方法的配置对象。
     * requestUrl - {String} 请求的url。
     * 
     * Supported event types:
     * complete - 当发送的请求得到响应时触发。
     * success - HTTP获得成功状态码(200-299)时触发。
     * failure - HTTP没有获得成功状态码时触发。
     */
    events: new SuperMap.Events(this, null, ["complete", "success", "failure"]),
    
    /**
     * APIMethod: issue
     * 创建XMLHttpRequest，打开设置header,绑定一个回调函数返回完成状态，并且可以发送数据。建议使用以下几种请求方式：
     * <GET>, <POST>, <PUT>, <DELETE>, <OPTIONS>, 或 <HEAD> 。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     *
     * config属性可以设为:
     * method - {String}  可以为GET, POST, PUT, DELETE, HEAD, OPTIONS。默认为GET。
     * url - {String} 请求的url。
     * async - {Boolean} 异步请求，默认为true。
     * user - {String} 验证通过的用户，清除当前的用户设置为null 。
     * password - {String} 身份验证的密码。清除当前的密码则设为null 。
     * proxy - {String} 代理。
     * params - {Object} 添加到作为请求字符串的url上的key:value。
     * headers - {Object} 设置在请求上的带有header:value的对象。
     * data - {String | Document} 请求发送的数据，仅仅适用于 <POST> 和 <PUT> 请求。
     * callback - {Function} 请求完成时调用函数。
     *     判断请求是否失败，检查request的status属性。
     * success - {Function} 如果请求的状态是在200到299，则调用此函数。
     * failure - {Function} 如果请求的状态是不在200到299，则调用此函数。
     * scope - {Object} 如果回调函数是对象上的公共方法，则在此对象上设置该函数。
     *
     * Returns:
     * {XMLHttpRequest} 请求的对象。如要在响应之前中止请求，调用请求对象的abort方法
     */
    issue: function(config) {        
        // apply default config - proxy host may have changed
        var defaultConfig = SuperMap.Util.extend(
            this.DEFAULT_CONFIG,
            {proxy: SuperMap.ProxyHost}
        );
        config = SuperMap.Util.applyDefaults(config, defaultConfig);

        // create request, open, and set headers
        var request = new SuperMap.Request.XMLHttpRequest();
        var url = SuperMap.Util.urlAppend(config.url, 
            SuperMap.Util.getParameterString(config.params || {}));
        var sameOrigin = !(url.indexOf("http") == 0);
        var urlParts = !sameOrigin && url.match(this.URL_SPLIT_REGEX);
        if (urlParts) {
            var location = window.location;
            sameOrigin =
                urlParts[1] === location.protocol &&
                urlParts[3] === location.hostname;
            var uPort = urlParts[4], lPort = location.port;
            if (uPort !== 80 && uPort != "" || lPort !== "80" && lPort != "") {
                sameOrigin = sameOrigin && uPort === lPort;
            }
        }
        if (!sameOrigin) {
            if (config.proxy) {
                if (typeof config.proxy === "function") {
                    url = config.proxy(url);
                } else {
                    url = config.proxy + encodeURIComponent(url);
                }
            }
        }
        request.open(
            config.method, url, config.async, config.user, config.password
        );
        for(var header in config.headers) {
            request.setRequestHeader(header, config.headers[header]);
        }
        if(config.withCredentials!=null){
            request.setCredentials(config.withCredentials);
        }

        var events = this.events;

        // we want to execute runCallbacks with "this" as the
        // execution scope
        var self = this;
        
        request.onreadystatechange = function() {
            if(request.readyState === SuperMap.Request.XMLHttpRequest.DONE) {
                var proceed = events.triggerEvent(
                    "complete",
                    {request: request, config: config, requestUrl: url}
                );
                if(proceed !== false) {
                    self.runCallbacks(
                        {request: request, config: config, requestUrl: url}
                    );
                }
            }
        };
        
        // send request (optionally with data) and return
        // call in a timeout for asynchronous requests so the return is
        // available before readyState == 4 for cached docs
        if(config.async === false) {
            request.send(config.data);
        } else {
            window.setTimeout(function(){
                if (request.readyState !== 0) { // W3C: 0-UNSENT
                    request.send(config.data);
                }
            }, 0);
        }
        return request;
    },
    
    /**
     * Method: runCallbacks
     * Calls the complete, success and failure callbacks. Application
     *    can listen to the "complete" event, have the listener 
     *    display a confirm window and always return false, and
     *    execute SuperMap.Request.runCallbacks if the user
     *    hits "yes" in the confirm window.
     *
     * Parameters:
     * options - {Object} Hash containing request, config and requestUrl keys
     */
    runCallbacks: function(options) {
        var request = options.request;
        var config = options.config;
        
        // bind callbacks to readyState 4 (done)
        var complete = (config.scope) ?
            SuperMap.Function.bind(config.callback, config.scope) :
            config.callback;
        
        // optional success callback
        var success;
        if(config.success) {
            success = (config.scope) ?
                SuperMap.Function.bind(config.success, config.scope) :
                config.success;
        }

        // optional failure callback
        var failure;
        if(config.failure) {
            failure = (config.scope) ?
                SuperMap.Function.bind(config.failure, config.scope) :
                config.failure;
        }

        if (SuperMap.Util.createUrlObject(config.url).protocol === "file:" &&
                                                        request.responseText) {
            request.status = 200;
        }
        complete(request);

        if (!request.status || (request.status >= 200 && request.status < 300)) {
            this.events.triggerEvent("success", options);
            if(success) {
                success(request);
            }
        }
        if(request.status && (request.status < 200 || request.status >= 300)) {                    
            this.events.triggerEvent("failure", options);
            if(failure) {
                failure(request);
            }
        }
    },
    
    /**
     * APIMethod: GET
     * 发送GET请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为 GET 。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    GET: function(config) {
        config = SuperMap.Util.extend(config, {method: "GET"});
        return SuperMap.Request.issue(config);
    },
    
    /**
     * APIMethod: POST
     * 发送POST的请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为 POST ，Content-Type设置为application/xml。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    POST: function(config) {
        config = SuperMap.Util.extend(config, {method: "POST"});
        // set content type to application/xml if it isn't already set
        config.headers = config.headers ? config.headers : {};
        if(!("CONTENT-TYPE" in SuperMap.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return SuperMap.Request.issue(config);
    },
    
    /**
     * APIMethod: PUT
     * 发送POST的请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为 PUT ，Content-Type设置为application/xml。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    PUT: function(config) {
        config = SuperMap.Util.extend(config, {method: "PUT"});
        // set content type to application/xml if it isn't already set
        config.headers = config.headers ? config.headers : {};
        if(!("CONTENT-TYPE" in SuperMap.Util.upperCaseObject(config.headers))) {
            config.headers["Content-Type"] = "application/xml";
        }
        return SuperMap.Request.issue(config);
    },
    
    /**
     * APIMethod: DELETE
     * 发送POST的请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为 DELETE。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    DELETE: function(config) {
        config = SuperMap.Util.extend(config, {method: "DELETE"});
        return SuperMap.Request.issue(config);
    },
  
    /**
     * APIMethod: HEAD
     * 发送HTTP HEAD请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为HEAD。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    HEAD: function(config) {
        config = SuperMap.Util.extend(config, {method: "HEAD"});
        return SuperMap.Request.issue(config);
    },
    
    /**
     * APIMethod: OPTIONS
     * 发送HTTP OPTIONS请求。附加的配置属性记录在 <issue> 方法中，方法属性设置为 OPTIONS。
     *
     * Parameters:
     * config - {Object} 发送请求的配置属性。
     * 
     * Returns:
     * {XMLHttpRequest} 请求对象。
     */
    OPTIONS: function(config) {
        config = SuperMap.Util.extend(config, {method: "OPTIONS"});
        return SuperMap.Request.issue(config);
    }

};
