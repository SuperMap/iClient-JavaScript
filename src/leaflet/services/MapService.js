import L from "leaflet";
import '../core/Base';
import {ServiceBase} from './ServiceBase';
import {MapService as CommonMapService, TilesetsService} from '@supermap/iclient-common';

/**
 * @class  L.supermap.mapService
 * @classdesc 地图信息服务类
 * @category  iServer Map
 * @extends L.supermap.ServiceBase
 * @param url -{string} 地图服务地址
 * @param options -{Object} 地图服务信息相关参数。如：<br>
 *        serverType - {{@link SuperMap.ServerType}} 服务来源 iServer|iPortal|online
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
     * @description 获取地图信息
     * @param callback -{function} 回调函数
     */
    getMapInfo: function (callback) {
        var me = this;
        var getMapStatusService = new CommonMapService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
    },

    /**
     * @function  L.supermap.mapService.prototype.getTilesets
     * @description 获取切片列表信息
     * @param callback -{function} 回调函数
     */
    getTilesets: function (callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            proxy: me.options.proxy,
            serverType: me.options.serverType,
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