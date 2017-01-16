/* COPYRIGHT 2012 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * @requires SuperMap/Events.js
 * @requires SuperMap/ServiceBase.js
 * @requires SuperMap/Util.js
 */

/**
 * Class: SuperMap.ServiceUrls
 * 代理服务类。
 * 该类负责将代理参数传递到服务端，并获取代理服务地址数组。
 * 结果通过该类支持的事件的监听函数参数获取;
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */

SuperMap.REST.ServiceUrls = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constant: EVENT_TYPES
     * {Array(String)}
     * 此类支持的事件类型。
     * - *processCompleted* 服务端返回计算结果触发该事件。
     * - *processFailed* 服务端返回计算结果失败触发该事件。
     */
    EVENT_TYPES: ["processCompleted", "processFailed"],

    /**
     * APIProperty: url
     * {String} 服务访问地址。
     */
    url: null,

    /**
     * Property: isInTheSameDomain
     * {Boolean}
     */
    isInTheSameDomain: null,

    /**
     * Constructor: SuperMap.REST.ServiceUrls
     * 代理服务类构造函数。
     *
     * Examples:
     * (start code)
     * var myServiceUrls = new SuperMap.REST.ServiceUrls(url, {eventListeners:{"processCompleted": getUrlsCompleted}});
     * (end)
     *
     * Parameters:
     * url - {String} 服务访问的地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function(url, options) {
        if(!url) {
            return false;
        }
        if(options) {
            SuperMap.Util.extend(this, options);
        }
        var me = this;
        me.events = new SuperMap.Events(me, null, me.EVENT_TYPES, true);
        if(me.eventListeners instanceof Object) {
            me.events.on(me.eventListeners);
        }
        me.url = url;
        me.isInTheSameDomain = SuperMap.Util.isInTheSameDomain(me.url);
    },

    /**
     * APIMethod: destroy
     * 释放资源，将引用的资源属性置空。
     */
    destroy: function() {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        var me = this;
        me.EVENT_TYPES = null;
        if (me.events) {
            me.events.destroy();
            me.events = null;
        }
        if (me.eventListeners) {
            me.eventListeners = null;
        }
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端参数传递到服务端。
     */
    processAsync: function() {
        var me = this;
        var re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}\/iserver\/services/,
            url = re.exec(me.url)[0] + "/proxyservers.json";
        if(!me.isInTheSameDomain) {
            url = url.replace(/.json/, ".jsonp");
        }
        SuperMap.Util.committer({
            url: url,
            method: "GET",
            scope: me,
            isInTheSameDomain: me.isInTheSameDomain,
            success: me.getServiceUrlsCompleted,
            failure: me.getServiceUrlsFailed
        });
    },

    /**
     * Method: getServiceUrlsCompleted
     * 地址获取完成，执行此方法。
     *
     * Parameters:
     * result - {Object} 服务器返回的结果对象。
     */
    getServiceUrlsCompleted: function(result) {
        var me = this;
        var url,
            obj = {},
            urls = [],
            re = /^http:\/\/([a-z]{9}|(\d+\.){3}\d+):\d{0,4}/,
            index = re.exec(me.url)[0].length,
            urlService = me.url.slice(index);
        if(result.readyState == 4 && result.status == 200) {
            obj = eval(result.responseText);
        } else if(result.succeed) {
            obj = result;
        } else {
            me.events.triggerEvent("processCompleted", [me.url]);
            return ;
        }
        if(data.length == 0) {
            me.events.triggerEvent("processCompleted", [me.url]);
        } else {
            for(var i = 0, len = obj.length; i < len; i ++) {
                url = "http://" + obj[i].address + urlService;
                urls.push(url);
            }
            me.events.triggerEvent("processCompleted", urls);
        }
    },

    /**
     * Method: getServiceUrlsFailed
     * 获取地址失败，执行此方法。
     *
     * Parameters:
     * result -  {Object} 服务器返回的结果对象。
     */
    getServiceUrlsFailed: function(result) {
        var me = this;
        me.events.triggerEvent("processCompleted", [me.url]);
    },

    CLASS_NAME: "SuperMap.REST.ServiceUrls"
});