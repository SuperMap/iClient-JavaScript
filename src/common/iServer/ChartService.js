/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { Util as CommonUtil} from '../commontypes/Util';
 import { DataFormat } from '../REST';
 import { ChartQueryService } from './ChartQueryService';
 import { ChartFeatureInfoSpecsService } from './ChartFeatureInfoSpecsService';
 
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
 export class ChartService {
 
     constructor(url, options) {
      this.url = url;
      this.options = options || {};
     }
 
     /**
      * @function ChartService.prototype.queryChart
      * @description 查询海图服务。
      * @param {ChartQueryParameters} params - 海图查询所需参数类。
      * @param {RequestCallback} callback - 回调函数。
      * @param {DataFormat} resultFormat - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     queryChart(params, callback, resultFormat) {
         var me = this,
             param = params,
             format = me._processFormat(resultFormat);
         var chartQueryService = new ChartQueryService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: format
         });
 
         return chartQueryService.processAsync(param, callback);
     }
 
     /**
      * @function ChartService.prototype.getChartFeatureInfo
      * @description 获取海图物标信息服务。
      * @param {RequestCallback} callback 回调函数。
      * @returns {Promise} Promise 对象。
      */
     getChartFeatureInfo(callback) {
         var me = this;
         var url = CommonUtil.urlPathAppend(me.url, 'chartFeatureInfoSpecs');
         var chartFeatureInfoSpecsService = new ChartFeatureInfoSpecsService(url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers
         });
         return chartFeatureInfoSpecsService.processAsync(callback);
     }
 
     _processFormat(resultFormat) {
         return (resultFormat) ? resultFormat : DataFormat.GEOJSON;
     }
 }
 