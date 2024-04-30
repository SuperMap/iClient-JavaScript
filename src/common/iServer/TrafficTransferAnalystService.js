/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { StopQueryService } from './StopQueryService';
import { TransferPathService } from './TransferPathService';
import { TransferSolutionService } from './TransferSolutionService';

/**
 * @class TrafficTransferAnalystService
 * @extends {ServiceBase}
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类。交通换乘分析支持按照指定的公交站点和公交换乘策略进行换乘分析，
 * 返回相应的换乘方案，以及指定的某条换乘路线的详细信息。其中，支持的换乘策略包括时间最短、距离最短、最少换乘、少步行等。
 * 此外，交通换乘分析还支持通过关键字查询站点信息，这样客户端可以先查询站点，再根据合适的站点进行换乘分析。
 * @example
 *      new TrafficTransferAnalystService(url).queryStop(params,function(result){
 *           //doSomething
 *      })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class TrafficTransferAnalystService {

    constructor(url, options) {
      this.url = url;
      this.options = options || {};
    }

    /**
     * @function TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。<br>
     * 根据传入的关键词进行公交站点查询，返回名称与关键词相关的公交站点。
     * @param {StopQueryParameters} params - 查询相关参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    queryStop(params, callback) {
        var me = this;
        var stopQueryService = new StopQueryService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return stopQueryService.processAsync(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。<br>
     * 根据换乘分段内可乘车的路线集合，查询得到某一条乘车路线的详细信息。
     * @param {TransferPathParameters} params - 查询相关参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferPath(params, callback) {
        var me = this;
        var transferPathService = new TransferPathService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return transferPathService.processAsync(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。<br>
     * 根据换乘策略、乘车偏好、避让站点、出行时间等参数查询交通换乘方案，根据换乘方案中的介绍信息可以获取具体的乘车路线。
     * @param {TransferSolutionParameters} params - 查询相关参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferSolution(params, callback) {
        var me = this;
        var transferSolutionService = new TransferSolutionService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return transferSolutionService.processAsync(params, callback);
    }
}
