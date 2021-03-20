/* Copyright© 2000 - 2021 SuperMap Software Co.Ltd. All rights reserved.
 * This program are made available under the terms of the Apache License, Version 2.0
 * which accompanies this distribution and is available at http://www.apache.org/licenses/LICENSE-2.0.html.*/
import L from "leaflet";
import '../core/Base';
import {
    ServiceBase
} from './ServiceBase';
import {
    MapService as CommonMapService,
    TilesetsService
} from '@supermap/iclient-common';

/**
 * @class  L.supermap.mapService
 * @classdesc 地图信息服务类。
 * @category  iServer Map
 * @extends {L.supermap.ServiceBase}
 * @param {string} url - 地图服务地址。
 * @param {Object} options - 参数。
 * @param {string} [options.proxy] - 服务代理地址。
 * @param {boolean} [options.withCredentials=false] - 请求是否携带 cookie。
 * @param {boolean} [options.crossOrigin] - 是否允许跨域请求。
 * @param {Object} [options.headers] - 请求头。
 * @example
 * L.supermap.mapService(url)
 *  .getMapInfo(function(result){
 *     //doSomething
 * })
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
     * @function  L.supermap.mapService.prototype.getMapInfo
     * @description 获取地图信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getMapInfo: function (callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            proxy: me.options.proxy,
            withCredentials: me.options.withCredentials,
            crossOrigin: me.options.crossOrigin,
            headers: me.options.headers,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            },
            projection: me.options.projection
        });
        getMapStatusService.processAsync();
    },

    /**
     * @function  L.supermap.mapService.prototype.getTilesets
     * @description 获取切片列表信息。
     * @param {RequestCallback} callback - 回调函数。
     */
    getTilesets: function (callback) {
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
});

export var mapService = function (url, options) {
    return new MapService(url, options);
};

L.supermap.mapService = mapService;