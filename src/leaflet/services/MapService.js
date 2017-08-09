import L from "leaflet";
import SuperMap from '../../common/SuperMap';
import {ServiceBase} from './ServiceBase';
import SuperMapMapService from  '../../common/iServer/MapService';
import TilesetsService from  '../../common/iServer/TilesetsService';
/**
 * @class  L.supermap.MapService
 * @classdesc 地图信息服务类
 * @extends ServiceBase
 * @param url -{String} 地图服务地址
 * @param options -{Object} 地图服务信息相关参数
 * @example
 *     L.supermap.mapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
export var MapService = ServiceBase.extend({
    options: {
        projection: null
    },

    /**
     * @function L.supermap.MapService.prototype.initialize
     * @description leaflet下MapService类的构造函数
     * @param url -{String} 地图服务地址
     * @param options -{Object} 地图服务信息相关参数
     */
    initialize: function (url, options) {
        options = options || {};
        L.setOptions(this, options);
        if (options.projection) {
            this.options.projection = options = new SuperMap.Projection(options.projection);
        }
        ServiceBase.prototype.initialize.call(this, url, options);
    },

    /**
     * @function  L.supermap.MapService.prototype.getMapInfo
     * @description 地图信息查询服务
     * @param callback -{function} 回调函数
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
     * @function  L.supermap.MapService.prototype.getTilesets
     * @description 切片列表信息查询服务
     * @param callback -{function} 回调函数
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