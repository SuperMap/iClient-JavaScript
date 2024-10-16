/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import '../core/Base';
import { ServiceBase } from './ServiceBase';
import { DataFormat } from '@supermap/iclient-common/REST';
import { ChartService as CommonChartService } from '@supermap/iclient-common/iServer/ChartService';

/**
 * @class ChartService
 * @category  iServer Map Chart
 * @classdesc 海图服务类。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 * new ChartService(url)
 *  .queryChart(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class ChartService extends ServiceBase {
    constructor(url, options) {
        super(url, options);
        this._chartService = new CommonChartService(url, options);
    }

    /**
     * @function ChartService.prototype.queryChart
     * @description 查询海图服务。
     * @param {ChartQueryParameters} params - 海图查询参数类。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryChart(params, callback, resultFormat) {
      return this._chartService.queryChart(params, callback, resultFormat);
    }

    /**
     * @function ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getChartFeatureInfo(callback) {
      return this._chartService.getChartFeatureInfo(callback);
    }

    _processFormat(resultFormat) {
      return resultFormat ? resultFormat : DataFormat.GEOJSON;
    }
}

