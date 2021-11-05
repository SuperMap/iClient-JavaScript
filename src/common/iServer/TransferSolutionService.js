/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {TransferSolutionParameters} from './TransferSolutionParameters';

/**
 * @class SuperMap.TransferSolutionService
 * @category  iServer TrafficTransferAnalyst TransferSolutions
 * @classdesc 交通换乘方案查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取。
 * @param {string} url - 与客户端交互的交通换乘方案查询服务地址。
 * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。</br>
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @extends {SuperMap.CommonServiceBase}
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
export class TransferSolutionService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.TransferSolutionService";
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
     * @param {SuperMap.TransferSolutionParameters} params - 交通换乘参数。
     */
    processAsync(params) {
        if (!(params instanceof TransferSolutionParameters)) {
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters;

        me.url = Util.urlPathAppend(me.url, 'solutions');
        jsonParameters = {
            points: Util.toJSON(params.points),
            walkingRatio: params['walkingRatio'],
            transferTactic: params['transferTactic'],
            solutionCount: params['solutionCount'],
            transferPreference: params["transferPreference"]
        };
        if (params.evadeLines) {
            jsonParameters["evadeLines"] = Util.toJSON(params.evadeLines);
        }
        if (params.evadeStops) {
            jsonParameters["evadeStops"] = Util.toJSON(params.evadeStops);
        }
        if (params.priorLines) {
            jsonParameters["priorLines"] = Util.toJSON(params.priorLines);
        }
        if (params.priorStops) {
            jsonParameters["priorStops"] = Util.toJSON(params.priorStops);
        }
        if (params.travelTime) {
            jsonParameters["travelTime"] = params.travelTime;
        }

        me.request({
            method: method,
            params: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}


