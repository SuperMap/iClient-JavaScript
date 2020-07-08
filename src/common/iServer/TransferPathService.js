/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {TransferPathParameters} from './TransferPathParameters';

/**
 * @class SuperMap.TransferPathService
 * @category  iServer TrafficTransferAnalyst TransferPath
 * @classdesc 交通换乘线路查询服务类，根据交通换乘分析结果(TransferSolutionResult)，获取某一条乘车路线的详细信息。
 *            返回结果通过该类支持的事件的监听函数参数获取
 * @extends {SuperMap.CommonServiceBase}
 * @example 例如：
 * var myService = new SuperMap.TransferPathService(url, {eventListeners: {
 *     "processCompleted": TrafficTransferCompleted,
 *     "processFailed": TrafficTransferError
 *     }
 * };
 * @param {string} url - 与客户端交互的交通换乘线路查询服务地址。
 * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param {Object} options - 参数。</br>
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 */
export class TransferPathService extends CommonServiceBase {

    constructor(url, options) {
        super(url, options);
        this.CLASS_NAME = "SuperMap.TransferPathService";
    }

    /**
     * @override
     */
    destroy() {
        super.destroy();
    }

    /**
     * @function SuperMap.TransferPathService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param {SuperMap.TransferPathParameters} params - 交通换乘参数。
     */
    processAsync(params) {
        if (!(params instanceof TransferPathParameters)) {
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters;

        me.url = Util.urlPathAppend(me.url, 'path');
        jsonParameters = {
            points: Util.toJSON(params.points),
            transferLines: Util.toJSON(params['transferLines'])
        };

        me.request({
            method: method,
            params: jsonParameters,
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.TransferPathService = TransferPathService;
