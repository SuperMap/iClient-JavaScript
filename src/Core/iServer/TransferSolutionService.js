/* COPYRIGHT 2017 SUPERMAP
 * 本程序只能在有效的授权许可下使用。
 * 未经许可，不得以任何手段擅自使用或传播。*/

/**
 * Class: SuperMap.REST.TransferSolutionService
 * 交通换乘方案查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取
 *
 * Inherits from:
 *  - <SuperMap.ServiceBase>
 */
require('./ServiceBase');
require('./TransferSolutionParameters');
SuperMap.REST.TransferSolutionService = SuperMap.Class(SuperMap.ServiceBase, {

    /**
     * Constructor: SuperMap.REST.TransferSolutionService
     * 交通换乘方案查询服务类构造函数。
     *
     * 例如：
     * (start code)
     * var myService = new SuperMap.REST.TransferSolutionService(url, {eventListeners: {
     *     "processCompleted": trafficTransferCompleted,
     *     "processFailed": trafficTransferError
     *     }
     * };
     * (end)
     *
     * Parameters:
     * url - {String} 与客户端交互的交通换乘方案查询服务地址。
     * 例如:"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
     * options - {Object} 参数。
     *
     * Allowed options properties:
     * eventListeners - {Object} 需要被注册的监听器对象。
     */
    initialize: function (url, options) {
        SuperMap.ServiceBase.prototype.initialize.apply(this, arguments);
    },

    /**
     * APIMethod: destroy
     * 释放资源,将引用资源的属性置空。
     */
    destroy: function () {
        SuperMap.ServiceBase.prototype.destroy.apply(this, arguments);
    },

    /**
     * APIMethod: processAsync
     * 负责将客户端的更新参数传递到服务端。
     *
     * Parameters:
     * params - {<TransferSolutionParameters>} 交通换乘参数。
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
    CLASS_NAME: "SuperMap.REST.TransferSolutionService"
});

module.exports = function (url, options) {
    return new SuperMap.REST.TransferSolutionService(url, options);
};
