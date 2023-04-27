/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../commontypes/Util';
import {CommonServiceBase} from './CommonServiceBase';
import {StopQueryParameters} from './StopQueryParameters'

/**
 * @class StopQueryService
 * @deprecatedclass SuperMap.StopQueryService
 * @category  iServer TrafficTransferAnalyst TransferStops
 * @classdesc 站点查询服务类。
 * 返回结果通过该类支持的事件的监听函数参数获取
 * @extends {CommonServiceBase}
 * @param {string} url - 服务地址。
 * 例如：</br>"http://localhost:8090/iserver/services/traffictransferanalyst-sample/restjsr/traffictransferanalyst/Traffic-Changchun"。
 * @param {Object} options - 参数。
 * @param {Object} options.eventListeners - 需要被注册的监听器对象。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example 例如：
 * (start code)
 * var myService = new StopQueryService(url, {eventListeners: {
     *     "processCompleted": StopQueryCompleted,
     *     "processFailed": StopQueryError
     *     }
     * };
 * (end)
 * @usage
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
     * @function StopQueryService.prototype.processAsync
     * @description 负责将客户端的更新参数传递到服务端。
     * @param {StopQueryParameters} params - 交通换乘参数。
     */
    processAsync(params) {
        if (!(params instanceof StopQueryParameters)) {
            return;
        }
        var me = this;
        me.url = Util.urlPathAppend(me.url, 'stops/keyword/' + params.keyWord);
        me.request({
            method: "GET",
            params: {returnPosition: params.returnPosition},
            scope: me,
            success: me.serviceProcessCompleted,
            failure: me.serviceProcessFailed
        });
    }

}
