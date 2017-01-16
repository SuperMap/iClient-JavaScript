/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * @requires SuperMap/Layer.js
 */

/**
 * Class: SuperMap.Layer.HTTPRequest
 * 
 * Inherits from: 
 *  - <SuperMap.Layer>
 */
SuperMap.Layer.HTTPRequest = SuperMap.Class(SuperMap.Layer, {

    /** 
     * Constant: URL_HASH_FACTOR
     * {Float} 用于多WMS服务器的url参数字符串的选择。
     */
    URL_HASH_FACTOR: (Math.sqrt(5) - 1) / 2,

    /** 
     * Property: url
     * {Array(String) or String} This is either an array of url strings or 
     *                           a single url string.
     * url数组或者单个的url。
     */
    url: null,

    /** 
     * Property: params
     * {Object} Hashtable of key/value parameters
     * 设置到url上的可选参数。
     */
    params: null,
    
    /** 
     * APIProperty: reproject
     * 是否进行投影转换，默认为false。
     * *Deprecated*.不赞成使用
     * {Boolean} 
     */
    reproject: false,

    /**
     * Constructor: SuperMap.Layer.HTTPRequest
     * 
     * Parameters:
     * name - {String}图层名称
     * url - {Array(String) or String} 图层的服务地址。
     * params - {Object} 设置到url上的可选参数。
     * options - {Object} 该类及其父类开放的属性。
     */
    initialize: function(name, url, params, options) {
        SuperMap.Layer.prototype.initialize.apply(this, [name, options]);
        this.url = url;
        this.params = SuperMap.Util.extend( {}, params);
    },

    /**
     * APIMethod: destroy
     * 解构HTTPRequest类，释放资源。
     */
    destroy: function() {
        this.url = null;
        this.params = null;
        SuperMap.Layer.prototype.destroy.apply(this, arguments); 
    },
    
    /**
     * APIMethod: clone
     * 克隆此图层。
     * Parameters:
     * obj - {Object}
     * 
     * Returns:
     * {<SuperMap.Layer.HTTPRequest>} 克隆后的HTTPRequest图层。
     */
    clone: function (obj) {
        
        if (obj == null) {
            obj = new SuperMap.Layer.HTTPRequest(this.name,
                                                   this.url,
                                                   this.params,
                                                   this.getOptions());
        }
        
        //get all additions from superclasses
        obj = SuperMap.Layer.prototype.clone.apply(this, [obj]);

        // copy/set any non-init, non-simple values here
        
        return obj;
    },

    /** 
     * APIMethod: setUrl
     * 设置url。
     * Parameters:
     * newUrl - {String}新的url。
     */
    setUrl: function(newUrl) {
        this.url = newUrl;
    },

    /**
     * APIMethod: mergeNewParams
     * 设置新的参数并重新绘制图层。重绘时会触发changelayer事件。
     * 
     * Parameters:
     * newParams - {Object}新的参数。
     *
     * Returns:
     * redrawn: {Boolean} 图层是否重绘。
     */
    mergeNewParams:function(newParams) {
        this.params = SuperMap.Util.extend(this.params, newParams);
        var ret = this.redraw();
        if(this.map != null) {
            this.map.events.triggerEvent("changelayer", {
                layer: this,
                property: "params"
            });
        }
        return ret;
    },

    /**
     * APIMethod: redraw
     * 重新绘制这个图层，如果这个图层被重绘过就返回真，否则为假。
     *
     * Parameters:
     * force - {Boolean} 重新加入随机参数。
     *
     * Returns:
     * {Boolean} 图层是否被重绘。
     */
    redraw: function(force) { 
        if (force) {
            return this.mergeNewParams({"_olSalt": Math.random()});
        } else {
            return SuperMap.Layer.prototype.redraw.apply(this, []);
        }
    },
    
    /**
     * Method: selectUrl
     * selectUrl() implements the standard floating-point multiplicative
     *     hash function described by Knuth, and hashes the contents of the 
     *     given param string into a float between 0 and 1. This float is then
     *     scaled to the size of the provided urls array, and used to select
     *     a URL.
     *
     * Parameters:
     * paramString - {String}
     * urls - {Array(String)}
     * 
     * Returns:
     * {String} An entry from the urls array, deterministically selected based
     *          on the paramString.
     */
    selectUrl: function(paramString, urls) {
        var product = 1;
        for (var i=0, len=paramString.length; i<len; i++) { 
            product *= paramString.charCodeAt(i) * this.URL_HASH_FACTOR; 
            product -= Math.floor(product); 
        }

        this._attempts = (this._attempts) ? (this._attempts) : 0;
        return urls[(Math.floor(product * urls.length)+this._attempts)%urls.length];
    },

    /** 
     * Method: getFullRequestString
     * Combine url with layer's params and these newParams. 
     *   
     *    does checking on the serverPath variable, allowing for cases when it 
     *     is supplied with trailing ? or &, as well as cases where not. 
     *
     *    return in formatted string like this:
     *        "server?key1=value1&key2=value2&key3=value3"
     * 
     * WARNING: The altUrl parameter is deprecated and will be removed in 3.0.
     *
     * Parameters:
     * newParams - {Object}
     * altUrl - {String} Use this as the url instead of the layer's url
     *   
     * Returns: 
     * {String}
     */
    getFullRequestString:function(newParams, altUrl) {

        // if not altUrl passed in, use layer's url
        var url = altUrl || this.url;
        
        // create a new params hashtable with all the layer params and the 
        // new params together. then convert to string
        var allParams = SuperMap.Util.extend({}, this.params);
        allParams = SuperMap.Util.extend(allParams, newParams);
        var paramsString = SuperMap.Util.getParameterString(allParams);
        
        // if url is not a string, it should be an array of strings, 
        // in which case we will deterministically select one of them in 
        // order to evenly distribute requests to different urls.
        //
        if (SuperMap.Util.isArray(url)) {
            url = this.selectUrl(paramsString, url);
        }   
 
        // ignore parameters that are already in the url search string
        var urlParams = 
            SuperMap.Util.upperCaseObject(SuperMap.Util.getParameters(url));
        for(var key in allParams) {
            if(key.toUpperCase() in urlParams) {
                delete allParams[key];
            }
        }
        paramsString = SuperMap.Util.getParameterString(allParams);
        
        return SuperMap.Util.urlAppend(url, paramsString);
    },

    CLASS_NAME: "SuperMap.Layer.HTTPRequest"
});
