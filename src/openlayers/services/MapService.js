/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import { ServiceBase } from './ServiceBase';
import { MapService as CommonMapService } from '@supermap/iclient-common/iServer/MapService';
import { TilesetsService } from '@supermap/iclient-common/iServer/TilesetsService';
/**
 * @class MapService
 * @category  iServer Map
 * @classdesc 地图信息服务类。
 * @modulecategory Services
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 *   new MapService(url).getMapInfo(function(result){
 *           //doSomething
 *      })
 * @usage
 */
export class MapService extends ServiceBase {
  constructor(url, options) {
    super(url, options);
  }

  /**
   * @function MapService.prototype.getMapInfo
   * @description 地图信息查询服务。
   * @param {RequestCallback} callback - 回调函数。
   * @returns {MapService} 获取服务信息。
   */
  getMapInfo(callback) {
    var me = this;
    var getMapStatusService = new CommonMapService(me.url, {
      proxy: me.options.proxy,
      withCredentials: me.options.withCredentials,
      crossOrigin: me.options.crossOrigin,
      headers: me.options.headers,
      projection: me.options.projection
    });
    getMapStatusService.processAsync(callback);
  }

  /**
   * @function  MapService.prototype.getWKT
   * @description 获取WKT。
   * @param {RequestCallback} callback - 回调函数。
   */
  getWKT(callback) {
    var me = this;
    var getMapStatusService = new CommonMapService(`${me.url}/prjCoordSys.wkt`, {
      proxy: me.options.proxy,
      withCredentials: me.options.withCredentials,
      withoutFormatSuffix: true,
      crossOrigin: me.options.crossOrigin,
      headers: me.options.headers,
      projection: me.options.projection
    });
    getMapStatusService.processAsync(callback);
  }

  /**
   * @function MapService.prototype.getTilesets
   * @description 切片列表信息查询服务。
   * @param {RequestCallback} callback - 回调函数。
   * @returns {MapService} 获取服务信息。
   */
  getTilesets(callback) {
    var me = this;
    var tilesetsService = new TilesetsService(me.url, {
      proxy: me.options.proxy,
      withCredentials: me.options.withCredentials,
      crossOrigin: me.options.crossOrigin,
      headers: me.options.headers,
      eventListeners: {
        scope: me,
        processCompleted: callback,
        processFailed: callback
      }
    });
    tilesetsService.processAsync();
  }
}
