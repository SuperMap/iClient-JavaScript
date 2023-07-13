/* Copyright© 2000 - 2023 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/

/**
 * @private
 * @class InitMapServiceBase
 * @category iServer Map
 * @classdesc 初始化地图信息服务类。
 * @example
 * var initMapServiceBase = new InitMapServiceBase(url, MapService);
 *
 * @param {string} url - 服务地址。如：http://localhost:8090/iserver/services/map-world/rest/maps/World+Map 。
 * @param {MapService} MapService - 地图信息服务类。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @usage
 */
export class InitMapServiceBase {
  constructor(MapService, url, options) {
    this.MapService = MapService;
    this.url = url;
    this.options = options;

    this.CLASS_NAME = 'SuperMap.InitMapServiceBase';
  }

  /**
   * @function createMapService
   * @description 初始化 MapService。
   * @returns {MapService}
   */
  createMapService() {
    const MapService = this.MapService;
    const url = this.url;
    const options = this.options;
    return new MapService(url, {
      proxy: options.proxy,
      withCredentials: options.withCredentials,
      crossOrigin: options.crossOrigin,
      headers: options.headers,
      projection: options.projection
    });
  }

  /**
   * @function getMapInfo
   * @description 获取地图信息。
   * @returns {Promise}
   */
  getMapInfo(callback) {
    return new Promise((resolve, reject) => {
      const mapService = this.createMapService();
      mapService.getMapInfo((res) => {
        callback(res, resolve, reject);
      });
    });
  }

  /**
   * @function getMapInfo
   * @description 获取坐标投影 WKT。
   * @returns {Promise}
   */
  getWKT() {
    return new Promise((resolve, reject) => {
      const mapService = this.createMapService();
      mapService.getWKT((res) => {
        try {
          const wkt = res.result.data;
          resolve(wkt);
        } catch (error) {
          reject(error);
        }
      });
    });
  }
}

/**
 * @function isPlaneProjection
 * @description 是否是平面坐标系。
 * @param {string} type - 投影坐标系类型
 * @returns {boolean}
 */
export function isPlaneProjection(type) {
  return type === 'PCS_NON_EARTH';
}

/**
 * @function getEpsgCode
 * @description 获取 EPSG Code。
 * @param {Object} prjCoordSys
 * @returns {string}
 */
export function getEpsgCode(prjCoordSys) {
  const { type, epsgCode } = prjCoordSys;
  if (type == 'PCS_NON_EARTH') {
    // 平面投影
    return '';
  }
  return 'EPSG:' + epsgCode;
}
