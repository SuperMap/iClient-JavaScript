/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {Util} from '../core/Util';
import { Bounds } from '@supermap/iclient-common/commontypes/Bounds';
import { DataFormat } from '@supermap/iclient-common/REST';
import {ServiceBase} from './ServiceBase';
import { ChartService as CommonChartService } from '@supermap/iclient-common/iServer/ChartService';

/**
 * @class ChartService
 * @category  iServer Map Chart
 * @classdesc 海图服务类。海图是一种以海洋水域及沿岸地物为主要绘制对象的地图，为航海的安全性提供必备的数据基础。<br>
  * 此类提供方法：获取海图物标信息、查询海图服务。海图物标信息指的是描述各产品规范的物标的基本信息，包括物标的名称、类型及与该物标相关的属性等。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @example
 * new ChartService(url,{
 *    fieldNameFormatter: function(fieldName){
 *      return fieldName + 'test'
 *    }
 * }).queryChart(param,function(result){
 *     //doSomething
 * })
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @param {function} [options.fieldNameFormatter] - 对查询返回结果的字段名进行自定义。
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
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @param {DataFormat} resultFormat - 返回结果类型。
     * @returns {Promise} Promise 对象。
     */
    queryChart(params, callback, resultFormat) {
      params = this._processParams(params);
      return this._chartService.queryChart(params, callback, resultFormat);
    }

    /**
     * @function ChartService.prototype.getChartFeatureInfo
     * @description 获取海图物标信息服务。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getChartFeatureInfo(callback) {
      return this._chartService.getChartFeatureInfo(callback);
    }

    /**
     * @function ChartService.prototype.getChartAcronymClassify
     * @version 11.2.0
     * @description 获取海图产品规范物标分组信息服务。
     * @param {RequestCallback} [callback] 回调函数，该参数未传时可通过返回的promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getChartAcronymClassify(callback) {
      return this._chartService.getChartAcronymClassify(callback);
    }

    _processFormat(resultFormat) {
      return resultFormat ? resultFormat : DataFormat.GEOJSON;
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
        return params;
    }
}
