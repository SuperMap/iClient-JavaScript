import SuperMap from '../SuperMap';
import CommonServiceBase from './CommonServiceBase';
import TransferSolutionParameters from './TransferSolutionParameters';

/**
 * @class SuperMap.TransferSolutionService
 * @classdesc
 * 交通换乘方案查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取。
 * @param url - {string} 与客户端交互的交通换乘方案查询服务地址。
 * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param options - {Object} 参数。如</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。</br>
 * @extends SuperMap.CommonServiceBase
 * @example 例如：
 * (start code)
 * var myService = new SuperMap.TransferSolutionService(url, {eventListeners: {
     *     "processCompleted": trafficTransferCompleted,
     *     "processFailed": trafficTransferError
     *     }
     * };
 * (end)
 *
 */
export default  class TransferSolutionService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.TransferSolutionService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {SuperMap.TransferSolutionParameters} 交通换乘参数。
     */
    processAsync(params) {
        if (!params) {
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters,
            end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += "solutions.json?";

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
    }

    CLASS_NAME = "SuperMap.TransferSolutionService"
}

SuperMap.TransferSolutionService = TransferSolutionService;

