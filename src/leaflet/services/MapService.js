import L from "leaflet";
import {ServiceBase} from './ServiceBase';
import SuperMapMapService from  '../../common/iServer/MapService';
import TilesetsService from  '../../common/iServer/TilesetsService';
/**
 * @class  L.supermap.mapService
 * @classdesc 地图信息服务类
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
            this.options.projection =  options.projection;
        }
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function  L.supermap.mapService.prototype.getMapInfo
     * @description 获取地图信息
     * @param callback -{function} 回调函数
     * @return {this}
     */
    getMapInfo: function (callback) {
        var me = this;
        var getMapStatusService = new SuperMapMapService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }, projection: me.options.projection
        });
        getMapStatusService.processAsync();
        return me;
    },

    /**
     * @function  L.supermap.mapService.prototype.getTilesets
     * @description 获取切片列表信息
     * @param callback -{function} 回调函数
     * @return {this}
     */
    getTilesets: function (callback) {
        var me = this;
        var tilesetsService = new TilesetsService(me.url, {
            serverType: me.options.serverType,
            eventListeners: {
                scope: me,
                processCompleted: callback,
                processFailed: callback
            }
        });

        tilesetsService.processAsync();
        return me;
    }
});

export var mapService = function (url, options) {
    return new MapService(url, options);
};

L.supermap.mapService = mapService;