/* Copyright© 2000 - 2022 SuperMap Software Co.Ltd. All rights reserved.
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
 * @classdesc 交通换乘分析服务类。
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
     * @description 站点查询服务。
     * @param {StopQueryParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    queryStop(params, callback) {
      this._commonTrafficTransferAnalystService.queryStop(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。
     * @param {TransferPathParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferPath(params, callback) {
      params = this._processParams(params);
      this._commonTrafficTransferAnalystService.analysisTransferPath(params, callback);
    }

    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。
     * @param {TransferSolutionParameters} params - 查询相关参数类。
     * @param {RequestCallback} callback - 回调函数。
     */
    analysisTransferSolution(params, callback) {
      params = this._processParams(params);
      this._commonTrafficTransferAnalystService.analysisTransferSolution(params, callback);
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
