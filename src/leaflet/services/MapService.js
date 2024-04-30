/* Copyright© 2000 - 2024 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {
    ServiceBase
} from './ServiceBase';
import { MapService as CommonMapService } from '@supermap/iclient-common/iServer/MapService';
import { TilesetsService } from '@supermap/iclient-common/iServer/TilesetsService';
/**
 * @class  MapService
 * @deprecatedclassinstance L.supermap.mapService
 * @classdesc 地图信息服务类。通过该类可以获得地图的基本信息、投影信息、切片列表信息等等。
 * @category  iServer Map
 * @modulecategory Services
 * @extends {ServiceBase}
 * @param {string} url - 服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * new MapService(url)
 *  .getMapInfo(function(result){
 *     //doSomething
 * })
 * @usage
 */
export var MapService = ServiceBase.extend({

    options: {
        projection: null
    },

    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        if (options.projection) {
            this.options.projection = options.projection;
        }
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function MapService.prototype.getMapInfo
     * @description 获取地图信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getMapInfo: function (callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            projection: me.options.projection
        });
        return getMapStatusService.processAsync(callback);
    },

    /**
     * @function MapService.prototype.getWKT
     * @description 获取WKT。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
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
      return getMapStatusService.processAsync(callback);
    },

    /**
     * @function MapService.prototype.getTilesets
     * @description 获取切片列表信息。
     * @param {RequestCallback} [callback] - 回调函数，该参数未传时可通过返回的 promise 获取结果。
     * @returns {Promise} Promise 对象。
     */
    getTilesets: function (callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers
        });
        return tilesetsService.processAsync(callback);
    }
});

export var mapService = function (url, options) {
    return new MapService(url, options);
};
