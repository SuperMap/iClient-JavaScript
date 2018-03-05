import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {TransferPathParameters} from './TransferPathParameters';

/**
 * @class SuperMap.TransferPathService
 * @category  iServer TrafficTransferAnalyst TransferPath
 * @classdesc 交通换乘线路查询服务类，根据交通换乘分析结果(TransferSolutionResult)，获取某一条乘车路线的详细信息。
 *            返回结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.CommonServiceBase
 * @example 例如：
 * var myService = new SuperMap.TransferPathService(url, {eventListeners: {
 *     "processCompleted": TrafficTransferCompleted,
 *     "processFailed": TrafficTransferError
 *     }
 * };
 * @param url - {string} 与客户端交互的交通换乘线路查询服务地址。
 * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param options - {Object} 可選参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
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
     * @param params - {SuperMap.TransferPathParameters} 交通换乘参数。
     */
    processAsync(params) {
        if (!(params instanceof TransferPathParameters)) {
            return;
        }
        var me = this,
            method = "GET",
            jsonParameters,
            end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += "path.json?";

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
