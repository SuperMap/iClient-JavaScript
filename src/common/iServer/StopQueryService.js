import {SuperMap} from '../SuperMap';
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {StopQueryParameters} from './StopQueryParameters'

/**
 * @class SuperMap.StopQueryService
 * @category  iServer TrafficTransferAnalyst TransferStops
 * @classdesc
 * 站点查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取
 * @extends SuperMap.CommonServiceBase
 * @param url - {string} 与客户端交互的站点查询服务地址。
 * 例如:</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param options - {Object} 可選参数。如:</br>
 *        eventListeners - {Object} 需要被注册的监听器对象。
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

export class StopQueryService extends CommonServiceBase {


    constructor(url, options) {
        super(url, options);
        options = options || {};
        Util.extend(this, options);
        this.CLASS_NAME = "SuperMap.StopQueryService";
    }

    /**
     *@override
     */
    destroy() {
        super.destroy();
        Util.reset(this);
    }

    /**
     * @function SuperMap.StopQueryService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param params - {SuperMap.StopQueryParameters} 交通换乘参数。
     */
    processAsync(params) {
        if (!(params instanceof StopQueryParameters)) {
            return;
        }
        var me = this, end;

        end = me.url.substr(me.url.length - 1, 1);
        me.url += (end === "/") ? '' : '/';
        me.url += "stops/keyword/" + params.keyWord;
        me.url += ".json?";

        me.request({
            method: "GET",
            params: {returnPosition: params.returnPosition},
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}

SuperMap.StopQueryService = StopQueryService;