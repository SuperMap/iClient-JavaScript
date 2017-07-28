require('./ServiceBase');
require('./StopQueryParameters');
var SuperMap = require('../SuperMap');


SuperMap.StopQueryService = SuperMap.Class(SuperMap.ServiceBase, {
    /**
     * @class SuperMap.StopQueryService
     * @constructs SuperMap.StopQueryService
     * @classdesc
     * 站点查询服务类。
     * 返回结果通过该类支持的事件的监听函数参数获取
     * @extends {SuperMap.ServiceBase}
     * @api
     * @param url - {String} 与客户端交互的站点查询服务地址。
     * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
     * @param options - {Object} 参数。
     *
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。
     *
     * @example 例如：
     * (start code)
     * var myService = new SuperMap.StopQueryService(url, {eventListeners: {
     *     "processCompleted": StopQueryCompleted,
     *     "processFailed": StopQueryError
     *     }
     * };
     * (end)
     *
     *
     */

    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
        options = options || {};
        SuperMap.Util.extend(this, options);
    },

    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
        SuperMap.Util.reset(this);
    },

    /**
     * @method SuperMap.StopQueryService.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {SuperMap.StopQueryParameters} 交通换乘参数。
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

    CLASS_NAME: "SuperMap.StopQueryService"
});

module.exports = SuperMap.StopQueryService;