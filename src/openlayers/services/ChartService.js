/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import { Bounds } from '@supermap/iclient-common/commontypes/Bounds';
import {ServiceBase} from './ServiceBase';
import { ChartService as CommonChartService } from '@supermap/iclient-common/iServer/ChartService';

/**
 * @class ChartService
 * @category  iServer Map Chart
 * @classdesc 海图服务。
 * @extends {ServiceBase}
 * @example
 *      new ChartService(url).queryChart(param,function(result){
 *          //doSomething
 *      })
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
     * @param {ChartQueryParameters} params - 海图查询所需参数类。
     * @param {RequestCallback} callback - 回调函数。
     * @param {DataFormat} resultFormat - 返回结果类型。
     */
    queryChart(params, callback, resultFormat) {
      params = this._processParams(params),
      this._chartService.queryChart(params, callback, resultFormat);
    }

    /**
     * @function ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param {RequestCallback} callback 回调函数。
     */
    getChartFeatureInfo(callback) {
      this._chartService.getChartFeatureInfo(callback);
    }

    _processParams(params) {
        if (!params) {
            return {};
        }
        params.returnContent = (params.returnContent == null) ? true : params.returnContent;
        if (params.filter) {
            params.chartQueryFilterParameters = Util.isArray(params.filter) ? params.filter : [params.filter];
        }
        if (params.bounds) {
            params.bounds = new Bounds(
                params.bounds[0],
                params.bounds[1],
                params.bounds[2],
                params.bounds[3]
            );
        }
    }
}
