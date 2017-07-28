require('./ServiceBase');
require('./TransferSolutionParameters');
var SuperMap = require('../SuperMap');
SuperMap.TransferSolutionService = SuperMap.Class(SuperMap.ServiceBase, {
    /**
     * @class SuperMap.TransferSolutionService
     * @constructs SuperMap.TransferSolutionService
     * @classdesc
     * 交通换乘方案查询服务类。
     * 返回结果通过该类支持的事件的监听函数参数获取。
     * @extends {SuperMap.ServiceBase}
     * @api

     * @example 例如：
     * (start code)
     * var myService = new SuperMap.TransferSolutionService(url, {eventListeners: {
     *     "processCompleted": trafficTransferCompleted,
     *     "processFailed": trafficTransferError
     *     }
     * };
     * (end)
     *
     *
     */

    /**
     *
     * @method SuperMap.TransferSolutionService.initialize
     * @param url - {String} 与客户端交互的交通换乘方案查询服务地址。
     * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
     * @param options - {Object} 参数。
     * Allowed options properties:</br>
     * eventListeners - {Object} 需要被注册的监听器对象。</br>
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /*
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * @method SuperMap.TransferSolutionService.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {SuperMap.TransferSolutionParameters} 交通换乘参数。
     */
    processAsync: function (params) {
        if (!params) {
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters,
            end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += me.isInTheSameDomain ? "solutions.json?" : "solutions.jsonp";

        jsonParameters = {
            points: SuperMap.Util.toJSON(params.points),
            walkingRatio: params['walkingRatio'],
            transferTactic: params['transferTactic'],
            solutionCount: params['solutionCount'],
            transferPreference: params["transferPreference"]
        };
        if (params.evadeLines) jsonParameters["evadeLines"] = SuperMap.Util.toJSON(params.evadeLines);
        if (params.evadeStops) jsonParameters["evadeStops"] = SuperMap.Util.toJSON(params.evadeStops);
        if (params.priorLines) jsonParameters["priorLines"] = SuperMap.Util.toJSON(params.priorLines);
        if (params.priorStops) jsonParameters["priorStops"] = SuperMap.Util.toJSON(params.priorStops);
        if (params.travelTime) jsonParameters["travelTime"] = params.travelTime;

        me.request({
            method: method,
            params: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    },
    CLASS_NAME: "SuperMap.TransferSolutionService"
});

module.exports = SuperMap.TransferSolutionService;

