/*
 * Class: MapService
 * 地图信息服务类
 * 用法：
 *      L.supermap.mapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 *      
 */
var L = require("leaflet");
var ServiceBase = require('./ServiceBase');
var SuperMap = require('../../common/SuperMap');
var SuperMapMapService = require('../../common/iServer/MapService');
var TilesetsService = require('../../common/iServer/TilesetsService');
/**
 * @class  L.supermap.MapService
 * @description 地图信息服务类
 * @augments ServiceBase
 * @param url -{String} 地图服务地址
 * @param options -{Object} 地图服务信息相关参数
 * @example
 *     L.supermap.mapService(url)
 *      .getMapInfo(function(result){
 *           //doSomething
 *      })
 */
var MapService = ServiceBase.extend({
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

L.supermap.mapService = function (url, options) {
    return new MapService(url, options);
};

module.exports = MapService;