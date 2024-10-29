/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from 'leaflet';
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { TrafficTransferAnalystService as CommonTrafficTransferAnalystService } from '@supermapgis/iclient-common/iServer/TrafficTransferAnalystService';
/**
 * @class TrafficTransferAnalystService
 * @deprecatedclassinstance L.supermap.trafficTransferAnalystService
 * @classdesc 交通换乘分析服务类。
 * @category  iServer TrafficTransferAnalyst
 * @modulecategory Services
 * @example
 * new TrafficTransferAnalystService(url).queryStop(params,function(result){
 *   //doSomething
 * })
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export var TrafficTransferAnalystService = ServiceBase.extend({
    initialize: function(url, options) {
        ServiceBase.prototype.initialize.call(this, url, options);
        this._commonTrafficTransferAnalystService = new CommonTrafficTransferAnalystService(url, options);
    },

    /**
     * @function TrafficTransferAnalystService.prototype.queryStop
     * @description 站点查询服务。
     * @param {StopQueryParameters} params - 站点查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    queryStop: function(params, callback) {
      return this._commonTrafficTransferAnalystService.queryStop(params, callback);
    },
    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferPath
     * @description 交通换乘线路查询服务。
     * @param {TransferPathParameters} params - 交通换乘线路查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferPath: function(params, callback) {
      params = this._processParams(params);
      return this._commonTrafficTransferAnalystService.analysisTransferPath(params, callback);
    },
    /**
     * @function TrafficTransferAnalystService.prototype.analysisTransferSolution
     * @description 交通换乘方案查询服务。
     * @param {TransferSolutionParameters} params - 交通换乘方案查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    analysisTransferSolution: function(params, callback) {
      params = this._processParams(params);
      return this._commonTrafficTransferAnalystService.analysisTransferSolution(params, callback);
    },

    _processParams: function(params) {
        if (!params) {
            return {};
        }

        if (params.points && L.Util.isArray(params.points)) {
            params.points.map(function(point, key) {
                params.points[key] = point instanceof L.LatLng ? { x: point.lng, y: point.lat } : point;
                return params.points[key];
            });
        }
        return params;
    }
});

export var trafficTransferAnalystService = function(url, options) {
    return new TrafficTransferAnalystService(url, options);
};

