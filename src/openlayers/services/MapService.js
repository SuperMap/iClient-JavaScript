/* Copyright© 2000 - 2020 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import {ServiceBase} from './ServiceBase';
import {MapService as CommonMapService, TilesetsService} from '@supermap/iclient-common';

/**
 * @class ol.supermap.MapService
 * @category  iServer Map
 * @classdesc 地图信息服务类。
 * @extends {ol.supermap.ServiceBase}
 * @param {string} url - 地图服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {SuperMap.ServerType} [options.serverType=SuperMap.ServerType.ISERVER] - 服务来源 iServer|iPortal|online。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 *   new ol.supermap.MapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
export class MapService extends ServiceBase {

    constructor(url, options) {
        super(url, options);
    }

    /**
     * @function ol.supermap.MapService.prototype.getMapInfo
     * @description 地图信息查询服务。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {ol.supermap.MapService} 获取服务信息。
     */
    getMapInfo(callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
    }

    /**
     * @function ol.supermap.MapService.prototype.getTilesets
     * @description 切片列表信息查询服务。
     * @param {RequestCallback} callback - 回调函数。
     * @returns {ol.supermap.MapService} 获取服务信息。
     */
    getTilesets(callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });
        tilesetsService.processAsync();
    }
}