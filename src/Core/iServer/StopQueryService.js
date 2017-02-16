/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/


/**
 * Class: SuperMap.REST.StopQueryService
 * 站点查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.CoreServiceBase>
 */
require('./CoreServiceBase');
SuperMap.REST.StopQueryService = SuperMap.Class(SuperMap.CoreServiceBase, {

    /**
     * Constructor: SuperMap.REST.StopQueryService
     * 站点查询服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.StopQueryService(url, {eventListeners: {
     *     "processCompleted": StopQueryCompleted, 
     *     "processFailed": StopQueryError
     *     }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 与客户端交互的站点查询服务地址。
     * 例如:"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.CoreServiceBase.prototype.initialize.apply(this, arguments);
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.CoreServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {<SuperMap.REST.StopQueryParameters>} 交通换乘参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this, end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += "stops/keyword/" + params.keyWord;
        me.url += me.isInTheSameDomain ? ".json?" : ".jsonp";

        me.request({
            method: "GET",
            params: {returnPosition: params.returnPosition},
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },

    CLASS_NAME: "SuperMap.REST.StopQueryService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.StopQueryService(url, options);
};