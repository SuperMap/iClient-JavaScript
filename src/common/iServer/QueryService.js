/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
 import { DataFormat } from '../REST';
 import { QueryByBoundsService } from './QueryByBoundsService';
 import { QueryByDistanceService } from './QueryByDistanceService';
 import { QueryBySQLService } from './QueryBySQLService';
 import { QueryByGeometryService } from './QueryByGeometryService';
 /**
  * @class QueryService
  * @category  iServer Map QueryResults
  * @classdesc 地图查询服务类。
  *            提供：范围查询，SQL 查询，几何查询，距离查询。
  * @extends {ServiceBase}
  * @param {string} url - 服务地址。
  * @param {Object} options - 参数。
  * @param {string} [options.proxy] - 服务代理地址。
  * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
  * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
  * @param {Object} [options.headers] - 请求头。
  * @example
  * new QueryService(url)
  * .queryByBounds(param,function(result){
  *     //doSomething
  * })
  * @usage
  */
 export class QueryService {
     constructor(url, options) {
        this.options = options || {};
        this.url = url;
     }
 
     /**
      * @function QueryService.prototype.queryByBounds
      * @description Bounds 查询地图服务。
      * @param {QueryByBoundsParameters} params - Bounds 查询参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     queryByBounds(params, callback, resultFormat) {
         var me = this;
         var queryService = new QueryByBoundsService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: me._processFormat(resultFormat)
         });

         return queryService.processAsync(params, callback);
     }
 
     /**
      * @function QueryService.prototype.queryByDistance
      * @description 地图距离查询服务。
      * @param {QueryByDistanceParameters} params - Distance 查询参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型
      * @returns {Promise} Promise 对象。
      */
     queryByDistance(params, callback, resultFormat) {
         var me = this;
         var queryByDistanceService = new QueryByDistanceService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: resultFormat
         });
 
         return queryByDistanceService.processAsync(params, callback);
     }
 
     /**
      * @function QueryService.prototype.queryBySQL
      * @description 地图 SQL 查询服务。
      * @param {QueryBySQLParameters} params - SQL 查询参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     queryBySQL(params, callback, resultFormat) {
         var me = this;
         var queryBySQLService = new QueryBySQLService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: resultFormat
         });
 
         return queryBySQLService.processAsync(params, callback);
     }
 
     /**
      * @function QueryService.prototype.queryByGeometry
      * @description 地图几何查询服务。
      * @param {QueryByGeometryParameters} params - Geometry 查询参数类。
      * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
      * @param {DataFormat} [resultFormat=DataFormat.GEOJSON] - 返回结果类型。
      * @returns {Promise} Promise 对象。
      */
     queryByGeometry(params, callback, resultFormat) {
         var me = this;
         var queryByGeometryService = new QueryByGeometryService(me.url, {
             proxy: me.options.proxy,
             withCredentials: me.options.withCredentials,
             crossOrigin: me.options.crossOrigin,
             headers: me.options.headers,
             format: resultFormat
         });
 
         return queryByGeometryService.processAsync(params, callback);
     }
 
     _processFormat(resultFormat) {
         return resultFormat ? resultFormat : DataFormat.GEOJSON;
     }
 }