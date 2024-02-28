/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import {ServiceBase} from './ServiceBase';
import { TrafficTransferAnalystService as CommonTrafficTransferAnalystService } from '@supermap/iclient-common/iServer/TrafficTransferAnalystService';
import Point from 'ol/geom/Point';

/**
 * @class TrafficTransferAnalystService
 * @extends {ServiceBase}
 * @category  iServer TrafficTransferAnalyst
 * @classdesc 交通换乘分析服务类。交通换乘分析支持按照指定的公交站点和公交换乘策略进行换乘分析，
 * 返回相应的换乘方案，以及指定的某条换乘路线的详细信息。其中，支持的换乘策略包括时间最短、距离最短、最少换乘、少步行等。
 * 此外，交通换乘分析还支持通过关键字查询站点信息，这样客户端可以先查询站点，再根据合适的站点进行换乘分析。
 * @modulecategory Services
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
export class TrafficTransferAnalystService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
        this._commonTrafficTransferAnalystService = new CommonTrafficTransferAnalystService(url, options);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。<br>
     * 根据传入的关键词进行公交站点查询，返回名称与关键词相关的公交站点。
     * @param {StopQueryParameters} params - 站点查询参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    queryStop(params, callback) {
      return this._commonTrafficTransferAnalystService.queryStop(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。<br>
     * 根据换乘分段内可乘车的路线集合，查询得到某一条乘车路线的详细信息。
     * @param {TransferPathParameters} params - 交通换乘线路查询参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferPath(params, callback) {
      params = this._processParams(params);
      return this._commonTrafficTransferAnalystService.analysisTransferPath(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。<br>
     * 根据换乘策略、乘车偏好、避让站点、出行时间等参数查询交通换乘方案，根据换乘方案中的介绍信息可以获取具体的乘车路线。
     * @param {TransferSolutionParameters} params - 交通换乘方案查询参数类。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferSolution(params, callback) {
      params = this._processParams(params);
      return this._commonTrafficTransferAnalystService.analysisTransferSolution(params, callback);
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        if (params.transferLines && !Util.isArray(params.transferLines)) {
            params.transferLines = [params.transferLines];
        }
        if (params.points && Util.isArray(params.points)) {
            params.points.map(function (point, key) {
                params.points[key] = (point instanceof Point) ? {
                    x: point.getCoordinates()[0],
                    y: point.getCoordinates()[1]
                } : point;
                return params.points[key];
            });
        }
        return params;
    }

}
